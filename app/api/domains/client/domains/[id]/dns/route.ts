import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  addDnsRecord,
  createDnsZone,
  getDnsZone,
} from "@/lib/openprovider-dns";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

const ALLOWED_TTLS = [
  900,
  3600,
  10800,
  21600,
  43200,
  86400,
];

function jsonError(
  error: string,
  status = 400,
  code?: string,
) {
  return NextResponse.json(
    {
      error,
      ...(code ? { code } : {}),
    },
    { status },
  );
}

async function getAuthenticatedUser() {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } =
    await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

async function getOwnedDomain(
  domainId: string,
  userId: string,
) {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from("domains")
    .select(
      `
        id,
        domain,
        status,
        user_id,
        openprovider_id
      `,
    )
    .eq("id", domainId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Erreur Supabase : ${error.message}`,
    );
  }

  return data;
}

function checkActiveDomain(
  domain: any,
) {
  const status =
    String(
      domain?.status || "",
    )
      .trim()
      .toLowerCase();

  if (status === "active") {
    return null;
  }

  if (
    status === "pending" ||
    status === "processing"
  ) {
    return jsonError(
      "La configuration DNS sera disponible dès que l'activation de votre domaine sera terminée.",
      409,
      "DOMAIN_ACTIVATION_PENDING",
    );
  }

  if (status === "failed") {
    return jsonError(
      "La configuration DNS sera disponible dès que l'activation de votre domaine sera finalisée auprès du registrar.",
      409,
      "DOMAIN_ACTIVATION_FAILED",
    );
  }

  return jsonError(
    "La configuration DNS sera disponible dès que votre domaine sera actif.",
    409,
    "DOMAIN_NOT_ACTIVE",
  );
}

function normalizeRecord(
  record: any,
) {
  const type =
    String(
      record.type || "",
    )
      .trim()
      .toUpperCase();

  const name =
    typeof record.name === "string"
      ? record.name.trim()
      : "";

  const value =
    typeof record.value === "string"
      ? record.value.trim()
      : "";

  const ttl = Number(
    record.ttl || 3600,
  );

  const priority =
    record.priority === null ||
    record.priority === undefined
      ? null
      : Number(record.priority);

  return {
    type,
    name,
    value,
    ttl,
    priority:
      Number.isFinite(priority)
        ? priority
        : null,
  };
}

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const user =
      await getAuthenticatedUser();

    if (!user) {
      return jsonError(
        "Vous devez être connecté.",
        401,
        "UNAUTHORIZED",
      );
    }

    const { id } =
      await context.params;

    const domain =
      await getOwnedDomain(
        id,
        user.id,
      );

    if (!domain) {
      return jsonError(
        "Domaine introuvable.",
        404,
        "DOMAIN_NOT_FOUND",
      );
    }

    const unavailable =
      checkActiveDomain(
        domain,
      );

    if (unavailable) {
      return unavailable;
    }

    let zone;

    try {
      zone =
        await getDnsZone(
          domain.domain,
        );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Zone DNS introuvable.";

      /*
       * Si la zone n'existe pas encore,
       * on la crée automatiquement.
       */
      if (
        /not found|not exist|zone.*found|404/i.test(
          message,
        )
      ) {
        await createDnsZone(
          domain.domain,
        );

        zone =
          await getDnsZone(
            domain.domain,
          );
      } else {
        throw error;
      }
    }

    const records =
      zone.records.map(
        (record, index) => ({
          id: Buffer.from(
            JSON.stringify({
              name:
                record.name || "",
              type:
                record.type,
              value:
                record.value,
              ttl:
                Number(
                  record.ttl ||
                    86400,
                ),
              prio:
                record.prio ??
                record.priority ??
                null,
            }),
          ).toString(
            "base64url",
          ),
          type:
            record.type,
          name:
            record.name || "@",
          value:
            record.value,
          ttl:
            Number(
              record.ttl ||
                86400,
            ),
          priority:
            record.prio ??
            record.priority ??
            null,
          index,
        }),
      );

    return NextResponse.json({
      domain: {
        id: domain.id,
        domain: domain.domain,
        status: domain.status,
      },
      records,
    });
  } catch (error) {
    console.error(
      "DNS GET ERROR:",
      error,
    );

    return jsonError(
      error instanceof Error
        ? error.message
        : "Impossible de récupérer la configuration DNS.",
      500,
      "DNS_GET_ERROR",
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const user =
      await getAuthenticatedUser();

    if (!user) {
      return jsonError(
        "Vous devez être connecté.",
        401,
        "UNAUTHORIZED",
      );
    }

    const { id } =
      await context.params;

    const domain =
      await getOwnedDomain(
        id,
        user.id,
      );

    if (!domain) {
      return jsonError(
        "Domaine introuvable.",
        404,
        "DOMAIN_NOT_FOUND",
      );
    }

    const unavailable =
      checkActiveDomain(
        domain,
      );

    if (unavailable) {
      return unavailable;
    }

    let body: any;

    try {
      body =
        await request.json();
    } catch {
      return jsonError(
        "Corps de requête JSON invalide.",
        400,
        "INVALID_JSON",
      );
    }

    const record =
      normalizeRecord(body);

    if (
      !ALLOWED_TYPES.includes(
        record.type,
      )
    ) {
      return jsonError(
        "Type DNS non autorisé.",
        400,
        "INVALID_DNS_TYPE",
      );
    }

    if (
      !record.value
    ) {
      return jsonError(
        "La valeur DNS est obligatoire.",
        400,
        "INVALID_DNS_VALUE",
      );
    }

    if (
      !ALLOWED_TTLS.includes(
        record.ttl,
      )
    ) {
      return jsonError(
        "TTL DNS invalide.",
        400,
        "INVALID_TTL",
      );
    }

    if (
      record.type === "MX"
    ) {
      if (
        record.priority === null ||
        !Number.isInteger(
          record.priority,
        ) ||
        record.priority < 0 ||
        record.priority > 65535
      ) {
        return jsonError(
          "La priorité MX est invalide.",
          400,
          "INVALID_MX_PRIORITY",
        );
      }
    }

    if (
      record.type === "A"
    ) {
      const ipv4 =
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

      if (
        !ipv4.test(
          record.value,
        )
      ) {
        return jsonError(
          "L'adresse IPv4 est invalide.",
          400,
          "INVALID_IPV4",
        );
      }
    }

    const dnsRecord = {
      name:
        record.name === "@" ||
        !record.name
          ? undefined
          : record.name,
      type:
        record.type,
      value:
        record.value,
      ttl:
        record.ttl,
      ...(record.type === "MX" && record.priority != null
        ? {
            prio:
              record.priority,
          }
        : {}),
    };

    /*
     * Vérifie que la zone existe.
     * Si elle n'existe pas, on la crée.
     */
    try {
      await getDnsZone(
        domain.domain,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "";

      if (
        /not found|not exist|zone.*found|404/i.test(
          message,
        )
      ) {
        await createDnsZone(
          domain.domain,
        );
      } else {
        throw error;
      }
    }

    await addDnsRecord(
      domain.domain,
      dnsRecord,
    );

    return NextResponse.json({
      success: true,
      message:
        "Enregistrement DNS ajouté.",
    });
  } catch (error) {
    console.error(
      "DNS POST ERROR:",
      error,
    );

    return jsonError(
      error instanceof Error
        ? error.message
        : "Impossible d'ajouter l'enregistrement DNS.",
      500,
      "DNS_ADD_ERROR",
    );
  }
}