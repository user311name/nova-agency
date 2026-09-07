import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  deleteDnsRecord,
  getDnsRecords,
} from "@/lib/openprovider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
    recordId: string;
  }>;
};

type DecodedRecord = {
  name?: string;
  type: string;
  value: string;
  ttl: number;
  priority?: number | null;
};

type OpenproviderRecord = {
  name?: string;
  type?: string;
  value?: string;
  ip?: string;
  ttl?: number;
  prio?: number;
};

function decodeRecordId(
  recordId: string,
): DecodedRecord | null {
  try {
    const json = Buffer.from(
      recordId,
      "base64url",
    ).toString("utf8");

    const parsed = JSON.parse(json);

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const type =
      typeof parsed.type === "string"
        ? parsed.type.toUpperCase()
        : "";

    const value =
      typeof parsed.value === "string"
        ? parsed.value
        : "";

    const ttl = Number(parsed.ttl);

    if (
      !type ||
      !value ||
      !Number.isFinite(ttl)
    ) {
      return null;
    }

    return {
      name:
        typeof parsed.name === "string"
          ? parsed.name
          : undefined,

      type,

      value,

      ttl,

      priority:
        parsed.priority === null ||
        parsed.priority === undefined
          ? null
          : Number(parsed.priority),
    };
  } catch {
    return null;
  }
}

function normalizeName(
  value: unknown,
): string {
  const name = String(value ?? "").trim();

  if (!name || name === "@") {
    return "@";
  }

  return name
    .replace(/\.$/, "")
    .toLowerCase();
}

function normalizeValue(
  value: unknown,
): string {
  return String(value ?? "").trim();
}

function recordsMatch(
  record: OpenproviderRecord,
  target: DecodedRecord,
): boolean {
  const recordType =
    String(record.type ?? "").toUpperCase();

  const recordValue = normalizeValue(
    record.value ?? record.ip ?? "",
  );

  const recordName = normalizeName(
    record.name,
  );

  const targetName = normalizeName(
    target.name,
  );

  const recordTtl = Number(record.ttl);

  const targetTtl = Number(
    target.ttl,
  );

  const recordPriority =
    record.prio !== undefined &&
    record.prio !== null
      ? Number(record.prio)
      : null;

  const targetPriority =
    target.priority !== undefined &&
    target.priority !== null
      ? Number(target.priority)
      : null;

  return (
    recordType === target.type &&
    recordValue ===
      normalizeValue(target.value) &&
    recordName === targetName &&
    recordTtl === targetTtl &&
    recordPriority === targetPriority
  );
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  try {
    const {
      id,
      recordId,
    } = await context.params;

    if (!id || !recordId) {
      return NextResponse.json(
        {
          error:
            "Identifiant du domaine ou du DNS manquant.",
        },
        { status: 400 },
      );
    }

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error:
            "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    const {
      data: domain,
      error: domainError,
    } =
      await supabaseAdmin
        .from("domains")
        .select(`
          id,
          domain,
          user_id,
          status
        `)
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (domainError) {
      console.error(
        "SUPABASE DNS DELETE DOMAIN ERROR:",
        domainError,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de vérifier votre domaine.",
        },
        { status: 500 },
      );
    }

    if (!domain) {
      return NextResponse.json(
        {
          error: "Domaine introuvable.",
        },
        { status: 404 },
      );
    }

    const target =
      decodeRecordId(recordId);

    if (!target) {
      return NextResponse.json(
        {
          error:
            "Enregistrement DNS invalide.",
        },
        { status: 400 },
      );
    }

    if (target.type === "SOA") {
      return NextResponse.json(
        {
          error:
            "L'enregistrement SOA principal ne peut pas être supprimé.",
        },
        { status: 400 },
      );
    }

    const rawResult =
      await getDnsRecords(
        domain.domain,
      );

    const records: OpenproviderRecord[] =
      Array.isArray(rawResult)
        ? (rawResult as OpenproviderRecord[])
        : Array.isArray(
              (
                rawResult as {
                  results?: unknown[];
                }
              )?.results,
            )
          ? (
              rawResult as {
                results: OpenproviderRecord[];
              }
            ).results
          : Array.isArray(
                (
                  rawResult as {
                    records?: unknown[];
                  }
                )?.records,
              )
            ? (
                rawResult as {
                  records: OpenproviderRecord[];
                }
              ).records
            : [];

    const matchingRecord =
      records.find((record) =>
        recordsMatch(
          record,
          target,
        ),
      );

    if (!matchingRecord) {
      return NextResponse.json(
        {
          error:
            "Cet enregistrement DNS n'existe plus ou a déjà été supprimé.",
        },
        { status: 404 },
      );
    }

    const originalRecord = {
      name:
        matchingRecord.name ?? "",

      type:
        String(
          matchingRecord.type ?? "",
        ).toUpperCase(),

      value:
        String(
          matchingRecord.value ??
            matchingRecord.ip ??
            "",
        ),

      ttl:
        Number(
          matchingRecord.ttl,
        ) || target.ttl,

      ...(matchingRecord.prio !==
        undefined &&
      matchingRecord.prio !== null
        ? {
            prio: Number(
              matchingRecord.prio,
            ),
          }
        : {}),
    };

    await deleteDnsRecord(
      domain.domain,
      originalRecord,
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Enregistrement DNS supprimé.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "CLIENT DNS DELETE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de supprimer l'enregistrement DNS.",
      },
      { status: 500 },
    );
  }
}