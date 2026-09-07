import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  getDnsZone,
  getDnsRecords,
  createDnsZone,
  updateDnsZone,
} from "@/lib/openprovider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getAuthenticatedDomain(id: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      user: null,
      domain: null,
    };
  }

  const { data: domain, error } = await supabaseAdmin
    .from("domains")
    .select(`
      id,
      domain,
      status,
      openprovider_id,
      user_id
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("DNS DOMAIN LOOKUP ERROR:", error);
    throw new Error("Impossible de récupérer votre domaine.");
  }

  return {
    user,
    domain,
  };
}

function normalizeRecords(data: any) {
  const records =
    data?.results ??
    data?.records ??
    [];

  if (!Array.isArray(records)) {
    return [];
  }

  return records.map(
    (record: any, index: number) => ({
      id:
        record.id ??
        record.record_id ??
        `${record.type || "record"}-${record.name || index}-${index}`,

      type: String(record.type || "").toUpperCase(),

      name: String(record.name || "@"),

      value: String(
        record.value ??
        record.ip ??
        "",
      ),

      ttl:
        Number(record.ttl) ||
        3600,

      priority:
        record.prio !== undefined
          ? Number(record.prio)
          : record.priority !== undefined
            ? Number(record.priority)
            : null,
    }),
  );
}

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Identifiant de domaine manquant.",
        },
        { status: 400 },
      );
    }

    const {
      user,
      domain,
    } = await getAuthenticatedDomain(id);

    if (!user) {
      return NextResponse.json(
        {
          error: "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    if (!domain) {
      return NextResponse.json(
        {
          error:
            "Ce domaine n'existe pas dans votre espace client.",
        },
        { status: 404 },
      );
    }

    const domainName = String(domain.domain)
      .trim()
      .toLowerCase();

    let zone: any = null;
    let records: any = [];

    try {
      zone = await getDnsZone(domainName);

      records =
        await getDnsRecords(domainName);
    } catch (openproviderError) {
      console.error(
        "OPENPROVIDER DNS GET ERROR:",
        openproviderError,
      );

      try {
        zone =
          await createDnsZone(domainName);

        records = [];
      } catch (createError) {
        console.error(
          "OPENPROVIDER DNS ZONE CREATE ERROR:",
          createError,
        );

        throw openproviderError;
      }
    }

    return NextResponse.json(
      {
        domain: {
          id: domain.id,
          domain: domain.domain,
          status: domain.status,
          openprovider_id:
            domain.openprovider_id,
        },

        zone,

        records:
          normalizeRecords(records),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "CLIENT DNS GET ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de récupérer la configuration DNS.",
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Identifiant de domaine manquant.",
        },
        { status: 400 },
      );
    }

    const {
      user,
      domain,
    } = await getAuthenticatedDomain(id);

    if (!user) {
      return NextResponse.json(
        {
          error: "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    if (!domain) {
      return NextResponse.json(
        {
          error:
            "Ce domaine n'existe pas dans votre espace client.",
        },
        { status: 404 },
      );
    }

    const body = await request.json();

    const type = String(body?.type || "")
      .trim()
      .toUpperCase();

    const name = String(
      body?.name || "@",
    ).trim();

    const value = String(
      body?.value || "",
    ).trim();

    const ttl = Number(
      body?.ttl || 3600,
    );

    const priority =
      body?.priority !== null &&
      body?.priority !== undefined &&
      body?.priority !== ""
        ? Number(body.priority)
        : null;

    const allowedTypes = [
      "A",
      "AAAA",
      "CNAME",
      "MX",
      "TXT",
      "NS",
      "SRV",
      "CAA",
    ];

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        {
          error: "Type DNS non autorisé.",
        },
        { status: 400 },
      );
    }

    if (!value) {
      return NextResponse.json(
        {
          error:
            "La valeur DNS est obligatoire.",
        },
        { status: 400 },
      );
    }

    if (
      !Number.isFinite(ttl) ||
      ttl < 60
    ) {
      return NextResponse.json(
        {
          error:
            "Le TTL doit être supérieur ou égal à 60 secondes.",
        },
        { status: 400 },
      );
    }

    if (
      type === "MX" &&
      (
        priority === null ||
        !Number.isFinite(priority)
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Une priorité est obligatoire pour un enregistrement MX.",
        },
        { status: 400 },
      );
    }

    const domainName = String(domain.domain)
      .trim()
      .toLowerCase();

    let zone: any;

    try {
      zone =
        await getDnsZone(domainName);
    } catch {
      zone =
        await createDnsZone(domainName);
    }

    const currentRecords =
      await getDnsRecords(domainName);

    const normalizedCurrent =
      normalizeRecords(currentRecords);

    const nextRecords = [
      ...normalizedCurrent.map(
        (record: any) => ({
          name: record.name,
          ttl: record.ttl,
          type: record.type,
          value: record.value,

          ...(record.priority !== null
            ? {
                prio:
                  record.priority,
              }
            : {}),
        }),
      ),

      {
        name,
        ttl,
        type,
        value,

        ...(priority !== null
          ? {
              prio: priority,
            }
          : {}),
      },
    ];

    const updated =
      await updateDnsZone(
        domainName,
        nextRecords,
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Enregistrement DNS ajouté.",

        zone:
          updated || zone,

        record: {
          type,
          name,
          value,
          ttl,
          priority,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "CLIENT DNS POST ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible d'ajouter l'enregistrement DNS.",
      },
      { status: 500 },
    );
  }
}