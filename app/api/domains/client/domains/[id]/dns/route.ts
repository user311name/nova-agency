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

type DnsRecord = {
  name?: string;
  type?: string;
  value?: string;
  ip?: string;
  ttl?: number;
  prio?: number;
  priority?: number;
};

const ALLOWED_TTLS = [
  900,
  3600,
  10800,
  21600,
  43200,
  86400,
];

const ALLOWED_TYPES = [
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "TXT",
  "NS",
  "SRV",
  "CAA",
];

async function getAuthenticatedDomain(id: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("DNS AUTH ERROR:", authError);

    return {
      user: null,
      domain: null,
    };
  }

  if (!user) {
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

    throw new Error(
      "Impossible de récupérer votre domaine.",
    );
  }

  return {
    user,
    domain,
  };
}

function createRecordId(record: DnsRecord) {
  const payload: {
    name: string;
    type: string;
    value: string;
    ttl: number;
    priority?: number;
  } = {
    name:
      String(record.name ?? "@").trim() ||
      "@",

    type:
      String(record.type ?? "")
        .trim()
        .toUpperCase(),

    value:
      String(
        record.value ??
          record.ip ??
          "",
      ).trim(),

    ttl:
      Number(record.ttl) || 3600,
  };

  const priority =
    record.prio !== undefined &&
    record.prio !== null
      ? Number(record.prio)
      : record.priority !== undefined &&
          record.priority !== null
        ? Number(record.priority)
        : undefined;

  if (
    priority !== undefined &&
    Number.isFinite(priority)
  ) {
    payload.priority = priority;
  }

  return Buffer.from(
    JSON.stringify(payload),
    "utf8",
  ).toString("base64url");
}

function normalizeRecords(data: unknown) {
  const source = data as {
    results?: unknown;
    records?: unknown;
  };

  const records =
    Array.isArray(source?.results)
      ? source.results
      : Array.isArray(source?.records)
        ? source.records
        : Array.isArray(data)
          ? data
          : [];

  return records.map((recordValue) => {
    const record =
      recordValue as DnsRecord;

    const type = String(
      record.type ?? "",
    ).toUpperCase();

    const name =
      String(
        record.name ?? "@",
      ).trim() || "@";

    const value = String(
      record.value ??
        record.ip ??
        "",
    );

    const ttl =
      Number(record.ttl) || 3600;

    const priority =
      record.prio !== undefined &&
      record.prio !== null
        ? Number(record.prio)
        : record.priority !== undefined &&
            record.priority !== null
          ? Number(record.priority)
          : null;

    return {
      id: createRecordId({
        name,
        type,
        value,
        ttl,
        ...(priority !== null
          ? { priority }
          : {}),
      }),

      type,
      name,
      value,
      ttl,
      priority,
    };
  });
}

function getDomainName(domain: {
  domain?: string | null;
}) {
  return String(
    domain.domain ?? "",
  )
    .trim()
    .toLowerCase();
}

function getDomainStatus(status: unknown) {
  return String(
    status ?? "",
  )
    .trim()
    .toLowerCase();
}

function isDomainActive(status: unknown) {
  return getDomainStatus(status) === "active";
}

function getDnsUnavailableResponse(
  status: unknown,
) {
  const normalizedStatus =
    getDomainStatus(status);

  if (
    normalizedStatus === "pending" ||
    normalizedStatus === "processing"
  ) {
    return NextResponse.json(
      {
        error:
          "La configuration DNS sera disponible dès que votre domaine sera activé.",
        code: "DOMAIN_ACTIVATION_PENDING",
        status: normalizedStatus,
      },
      { status: 409 },
    );
  }

  if (normalizedStatus === "failed") {
    return NextResponse.json(
      {
        error:
          "La configuration DNS n'est pas disponible car l'activation de votre domaine n'est pas finalisée.",
        code: "DOMAIN_ACTIVATION_FAILED",
        status: normalizedStatus,
      },
      { status: 409 },
    );
  }

  return NextResponse.json(
    {
      error:
        "La configuration DNS sera disponible dès que votre domaine sera actif.",
      code: "DOMAIN_NOT_ACTIVE",
      status: normalizedStatus || "unknown",
    },
    { status: 409 },
  );
}

async function ensureDnsZone(
  domainName: string,
) {
  try {
    return await getDnsZone(
      domainName,
    );
  } catch (error) {
    console.error(
      "OPENPROVIDER DNS ZONE LOOKUP ERROR:",
      error,
    );

    return await createDnsZone(
      domainName,
    );
  }
}

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Identifiant de domaine manquant.",
        },
        { status: 400 },
      );
    }

    const {
      user,
      domain,
    } =
      await getAuthenticatedDomain(id);

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Vous devez être connecté.",
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

    /*
     * ========================================================
     * VÉRIFICATION DE L'ACTIVATION DU DOMAINE
     * ========================================================
     */

    if (
      !isDomainActive(
        domain.status,
      )
    ) {
      return getDnsUnavailableResponse(
        domain.status,
      );
    }

    const domainName =
      getDomainName(domain);

    if (!domainName) {
      return NextResponse.json(
        {
          error:
            "Nom de domaine invalide.",
        },
        { status: 400 },
      );
    }

    /*
     * ========================================================
     * RÉCUPÉRATION DE LA ZONE DNS
     * ========================================================
     */

    let zone: unknown = null;
    let records: unknown = [];

    try {
      zone =
        await getDnsZone(
          domainName,
        );

      records =
        await getDnsRecords(
          domainName,
        );
    } catch (openproviderError) {
      console.error(
        "OPENPROVIDER DNS GET ERROR:",
        openproviderError,
      );

      /*
       * Le domaine est actif mais aucune
       * zone n'existe encore.
       *
       * On tente donc de créer la zone.
       */

      try {
        zone =
          await createDnsZone(
            domainName,
          );

        records = [];
      } catch (createError) {
        console.error(
          "OPENPROVIDER DNS ZONE CREATE ERROR:",
          createError,
        );

        return NextResponse.json(
          {
            error:
              "Impossible d'initialiser la zone DNS de votre domaine.",
            code: "DNS_ZONE_UNAVAILABLE",
          },
          { status: 503 },
        );
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
          normalizeRecords(
            records,
          ),
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
    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Identifiant de domaine manquant.",
        },
        { status: 400 },
      );
    }

    const {
      user,
      domain,
    } =
      await getAuthenticatedDomain(id);

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Vous devez être connecté.",
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

    /*
     * ========================================================
     * UN DOMAINE NON ACTIF NE PEUT PAS RECEVOIR DE DNS
     * ========================================================
     */

    if (
      !isDomainActive(
        domain.status,
      )
    ) {
      return getDnsUnavailableResponse(
        domain.status,
      );
    }

    /*
     * ========================================================
     * LECTURE DU FORMULAIRE
     * ========================================================
     */

    const body =
      await request.json();

    const type =
      String(
        body?.type ?? "",
      )
        .trim()
        .toUpperCase();

    const name =
      String(
        body?.name ?? "@",
      ).trim() || "@";

    const value =
      String(
        body?.value ?? "",
      ).trim();

    const ttl =
      Number(
        body?.ttl ?? 3600,
      );

    const priority =
      body?.priority !== null &&
      body?.priority !== undefined &&
      body?.priority !== ""
        ? Number(body.priority)
        : null;

    /*
     * ========================================================
     * VALIDATION DU TYPE
     * ========================================================
     */

    if (
      !ALLOWED_TYPES.includes(
        type,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Type DNS non autorisé.",
        },
        { status: 400 },
      );
    }

    /*
     * ========================================================
     * VALIDATION DE LA VALEUR
     * ========================================================
     */

    if (!value) {
      return NextResponse.json(
        {
          error:
            "La valeur DNS est obligatoire.",
        },
        { status: 400 },
      );
    }

    /*
     * ========================================================
     * VALIDATION DU TTL
     * ========================================================
     */

    if (
      !Number.isFinite(ttl) ||
      !ALLOWED_TTLS.includes(ttl)
    ) {
      return NextResponse.json(
        {
          error:
            "TTL invalide. Utilisez 900, 3600, 10800, 21600, 43200 ou 86400 secondes.",
        },
        { status: 400 },
      );
    }

    /*
     * ========================================================
     * VALIDATION MX
     * ========================================================
     */

    if (
      type === "MX" &&
      (
        priority === null ||
        !Number.isFinite(
          priority,
        )
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

    const domainName =
      getDomainName(domain);

    if (!domainName) {
      return NextResponse.json(
        {
          error:
            "Nom de domaine invalide.",
        },
        { status: 400 },
      );
    }

    /*
     * ========================================================
     * ZONE DNS
     * ========================================================
     */

    const zone =
      await ensureDnsZone(
        domainName,
      );

    /*
     * ========================================================
     * NOUVEL ENREGISTREMENT
     * ========================================================
     */

    const newRecord: {
      name: string;
      ttl: number;
      type: string;
      value: string;
      prio?: number;
    } = {
      name,
      ttl,
      type,
      value,
    };

    if (
      priority !== null &&
      Number.isFinite(priority)
    ) {
      newRecord.prio =
        priority;
    }

    /*
     * ========================================================
     * SYNCHRONISATION OPENPROVIDER
     * ========================================================
     *
     * On envoie uniquement le nouvel
     * enregistrement.
     */

    const updated =
      await updateDnsZone(
        domainName,
        [newRecord],
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Enregistrement DNS ajouté.",

        zone:
          updated || zone,

        record: {
          id: createRecordId({
            name,
            type,
            value,
            ttl,
            ...(priority !== null
              ? { priority }
              : {}),
          }),

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