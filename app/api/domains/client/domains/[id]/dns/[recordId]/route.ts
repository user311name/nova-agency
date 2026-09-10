import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  deleteDnsRecord,
  getDnsRecords,
  type DnsRecord,
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
  priority?: number;
};

function decodeRecordId(
  recordId: string,
): DecodedRecord | null {
  try {
    const json = Buffer.from(
      recordId,
      "base64url",
    ).toString("utf8");

    const parsed =
      JSON.parse(json);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
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

    const ttl =
      Number(parsed.ttl);

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
          : Number(
              parsed.priority,
            ),
    };
  } catch {
    return null;
  }
}

function normalizeName(
  value: unknown,
): string {
  const name =
    String(
      value ?? "",
    ).trim();

  if (
    !name ||
    name === "@"
  ) {
    return "@";
  }

  return name
    .replace(/\.$/, "")
    .toLowerCase();
}

function normalizeValue(
  value: unknown,
): string {
  return String(
    value ?? "",
  ).trim();
}

function recordsMatch(
  record: OpenproviderRecord,
  target: DecodedRecord,
): boolean {
  const recordType =
    String(
      record.type ?? "",
    ).toUpperCase();

  const recordValue =
    normalizeValue(
      record.value ??
        record.ip ??
        "",
    );

  const recordName =
    normalizeName(
      record.name,
    );

  const targetName =
    normalizeName(
      target.name,
    );

  const recordTtl =
    Number(record.ttl);

  const targetTtl =
    Number(target.ttl);

  const recordPriority =
    record.prio !== undefined &&
    record.prio !== null
      ? Number(record.prio)
      : record.priority !== undefined &&
          record.priority !== null
        ? Number(record.priority)
        : null;

  const targetPriority =
    target.priority !== undefined &&
    target.priority !== null
      ? Number(target.priority)
      : null;

  return (
    recordType === target.type &&
    recordValue ===
      normalizeValue(
        target.value,
      ) &&
    recordName ===
      targetName &&
    recordTtl ===
      targetTtl &&
    recordPriority ===
      targetPriority
  );
}

/**
 * OpenProvider attend pour "name" uniquement
 * le label du sous-domaine.
 *
 * Exemples :
 *
 * agency-nova.fr
 *   -> pas de name
 *
 * www.agency-nova.fr
 *   -> name: "www"
 *
 * mail.agency-nova.fr
 *   -> name: "mail"
 *
 * Si OpenProvider retourne déjà "www",
 * on conserve "www".
 */
function normalizeOpenProviderRecordName(
  recordName: unknown,
  domainName: string,
): string | undefined {
  const raw =
    String(
      recordName ?? "",
    )
      .trim()
      .replace(/\.$/, "")
      .toLowerCase();

  const cleanDomain =
    String(
      domainName ?? "",
    )
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
      .replace(/\.$/, "")
      .toLowerCase();

  if (
    !raw ||
    raw === "@"
  ) {
    return undefined;
  }

  // Record à la racine du domaine.
  if (
    raw === cleanDomain
  ) {
    return undefined;
  }

  // OpenProvider peut retourner un FQDN complet.
  // On le transforme en simple label relatif.
  const suffix =
    `.${cleanDomain}`;

  if (
    raw.endsWith(suffix)
  ) {
    const relative =
      raw.slice(
        0,
        -suffix.length,
      );

    if (
      !relative ||
      relative === "@"
    ) {
      return undefined;
    }

    return relative;
  }

  // Si OpenProvider retourne déjà
  // le nom relatif, on le conserve.
  return raw;
}

// ========================================================
// DELETE — SUPPRIMER UN ENREGISTREMENT DNS
// ========================================================

export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  try {
    const {
      id,
      recordId,
    } = await context.params;

    if (
      !id ||
      !recordId
    ) {
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
    } =
      await supabase.auth.getUser();

    if (
      authError ||
      !user
    ) {
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
        .select(
          `
            id,
            domain,
            user_id,
            status
          `,
        )
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
          error:
            "Domaine introuvable.",
        },
        { status: 404 },
      );
    }

    const status =
      String(
        domain.status ?? "",
      )
        .trim()
        .toLowerCase();

    if (
      status !== "active"
    ) {
      if (
        status === "pending" ||
        status === "processing"
      ) {
        return NextResponse.json(
          {
            error:
              "La configuration DNS sera disponible dès que votre domaine sera activé.",
            code:
              "DOMAIN_ACTIVATION_PENDING",
            status,
          },
          { status: 409 },
        );
      }

      if (
        status === "failed"
      ) {
        return NextResponse.json(
          {
            error:
              "La configuration DNS n'est pas disponible car l'activation de votre domaine n'est pas finalisée.",
            code:
              "DOMAIN_ACTIVATION_FAILED",
            status,
          },
          { status: 409 },
        );
      }

      return NextResponse.json(
        {
          error:
            "La configuration DNS sera disponible dès que votre domaine sera actif.",
          code:
            "DOMAIN_NOT_ACTIVE",
          status:
            status || "unknown",
        },
        { status: 409 },
      );
    }

    const target =
      decodeRecordId(
        recordId,
      );

    if (!target) {
      return NextResponse.json(
        {
          error:
            "Enregistrement DNS invalide.",
        },
        { status: 400 },
      );
    }

    // ========================================================
    // PROTECTION DES ENREGISTREMENTS SYSTÈME
    // ========================================================

    if (
      target.type === "SOA"
    ) {
      return NextResponse.json(
        {
          error:
            "L'enregistrement SOA principal ne peut pas être supprimé.",
        },
        { status: 400 },
      );
    }

    if (
      target.type === "NS"
    ) {
      return NextResponse.json(
        {
          error:
            "Les enregistrements NS principaux ne peuvent pas être supprimés.",
        },
        { status: 400 },
      );
    }

    // ========================================================
    // RÉCUPÉRATION DES DNS ACTUELS
    // ========================================================

    const rawResult =
      await getDnsRecords(
        domain.domain,
      );

    const records: OpenproviderRecord[] =
      Array.isArray(rawResult)
        ? (
            rawResult as OpenproviderRecord[]
          )
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
      records.find(
        (record) =>
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

    // ========================================================
    // NOM OPENPROVIDER CORRECT
    // ========================================================

    const openProviderName =
      normalizeOpenProviderRecordName(
        matchingRecord.name,
        domain.domain,
      );

    // ========================================================
    // CONSTRUCTION DU DNS ORIGINAL
    // ========================================================

    const originalRecord: DnsRecord = {
      name: openProviderName ?? "",

      type:
        String(
          matchingRecord.type ??
            "",
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
    };

    const matchingPriority =
      matchingRecord.prio !==
        undefined &&
      matchingRecord.prio !==
        null
        ? Number(
            matchingRecord.prio,
          )
        : matchingRecord.priority !==
              undefined &&
            matchingRecord.priority !==
              null
          ? Number(
              matchingRecord.priority,
            )
          : undefined;

    if (
      matchingPriority !==
        undefined &&
      Number.isFinite(
        matchingPriority,
      )
    ) {
      originalRecord.prio =
        matchingPriority;
    }

    // ========================================================
    // DEBUG TEMPORAIRE OPENPROVIDER
    // ========================================================

    console.log(
      "CLIENT DNS DELETE OPENPROVIDER PAYLOAD:",
      {
        domain:
          domain.domain,
        record:
          originalRecord,
      },
    );

    // ========================================================
    // SUPPRESSION OPENPROVIDER
    // ========================================================

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