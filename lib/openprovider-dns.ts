// lib/openprovider-dns.ts

const API_URL =
  process.env.OPENPROVIDER_API_URL ||
  "https://api.openprovider.eu/v1beta";

type OpenproviderResponse<T> = {
  code?: number;
  data?: T;
  desc?: string;
};

type OpenproviderTokenResponse = {
  token: string;
  reseller_id: number;
};

export type OpenproviderDnsRecord = {
  name?: string;
  type: string;
  value: string;
  ttl?: number | string;
  prio?: number | string;
  priority?: number | string;
};

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function login(): Promise<string> {
  if (
    cachedToken &&
    Date.now() < tokenExpiresAt
  ) {
    return cachedToken;
  }

  const username =
    process.env.OPENPROVIDER_USERNAME;

  const password =
    process.env.OPENPROVIDER_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "OPENPROVIDER_USERNAME ou OPENPROVIDER_PASSWORD manquant.",
    );
  }

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        ip: "0.0.0.0",
      }),
      cache: "no-store",
    },
  );

  const text = await response.text();

  let json: OpenproviderResponse<OpenproviderTokenResponse>;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `Réponse Openprovider invalide (${response.status}).`,
    );
  }

  if (
    !response.ok ||
    json.code !== 0 ||
    !json.data?.token
  ) {
    throw new Error(
      json.desc ||
        `Authentification Openprovider impossible (${response.status}).`,
    );
  }

  cachedToken = json.data.token;

  tokenExpiresAt =
    Date.now() + 20 * 60 * 1000;

  return cachedToken;
}

async function openproviderApi<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const token = await login();

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    },
  );

  const text = await response.text();

  let json: OpenproviderResponse<T>;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `Réponse Openprovider invalide (${response.status}).`,
    );
  }

  if (
    response.status === 401 &&
    retry
  ) {
    cachedToken = null;
    tokenExpiresAt = 0;

    return openproviderApi<T>(
      endpoint,
      options,
      false,
    );
  }

  if (
    !response.ok ||
    (typeof json.code === "number" &&
      json.code !== 0)
  ) {
    throw new Error(
      json.desc ||
        `Erreur Openprovider (${response.status}).`,
    );
  }

  return json.data as T;
}

function cleanDomain(domain: string) {
  return domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function encodeRecordId(
  record: OpenproviderDnsRecord,
) {
  const normalized = {
    name: record.name || "",
    type: String(record.type || "").toUpperCase(),
    value: String(record.value || ""),
    ttl: Number(record.ttl || 86400),
    prio:
      record.prio !== undefined
        ? Number(record.prio)
        : record.priority !== undefined
          ? Number(record.priority)
          : null,
  };

  return Buffer.from(
    JSON.stringify(normalized),
  ).toString("base64url");
}

export function decodeRecordId(
  recordId: string,
): OpenproviderDnsRecord {
  try {
    const decoded = Buffer.from(
      recordId,
      "base64url",
    ).toString("utf8");

    const parsed = JSON.parse(decoded);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      throw new Error();
    }

    return {
      name:
        typeof parsed.name === "string"
          ? parsed.name
          : "",
      type:
        typeof parsed.type === "string"
          ? parsed.type.toUpperCase()
          : "",
      value:
        typeof parsed.value === "string"
          ? parsed.value
          : "",
      ttl: Number(parsed.ttl || 86400),
      prio:
        parsed.prio === null ||
        parsed.prio === undefined
          ? undefined
          : Number(parsed.prio),
    };
  } catch {
    throw new Error(
      "Identifiant DNS invalide.",
    );
  }
}

function extractRecords(
  zone: any,
): OpenproviderDnsRecord[] {
  const candidates = [
    zone?.records,
    zone?.zone?.records,
    zone?.data?.records,
    zone?.data?.zone?.records,
  ];

  const records =
    candidates.find((item) =>
      Array.isArray(item),
    ) || [];

  return records
    .filter(
      (record: any) =>
        record &&
        typeof record === "object" &&
        typeof record.type === "string" &&
        typeof record.value === "string",
    )
    .map((record: any) => ({
      name:
        typeof record.name === "string"
          ? record.name
          : "",
      type: String(
        record.type,
      ).toUpperCase(),
      value: String(
        record.value,
      ),
      ttl: Number(
        record.ttl || 86400,
      ),
      prio:
        record.prio !== undefined
          ? Number(record.prio)
          : record.priority !== undefined
            ? Number(record.priority)
            : undefined,
    }));
}

export async function getDnsZone(
  domain: string,
) {
  const clean = cleanDomain(domain);

  const result = await openproviderApi<any>(
    `/dns/zones/${encodeURIComponent(clean)}?with_records=true`,
    {
      method: "GET",
    },
  );

  const records =
    extractRecords(result);

  return {
    zone: result,
    records,
  };
}

export async function createDnsZone(
  domain: string,
) {
  const clean = cleanDomain(domain);

  const parts = clean.split(".");

  if (parts.length < 2) {
    throw new Error(
      "Nom de domaine invalide.",
    );
  }

  const extension =
    parts.pop()!;

  const name =
    parts.join(".");

  return openproviderApi<any>(
    "/dns/zones",
    {
      method: "POST",
      body: JSON.stringify({
        domain: {
          name,
          extension,
        },
        type: "master",
        records: [],
      }),
    },
  );
}

export async function addDnsRecord(
  domain: string,
  record: OpenproviderDnsRecord,
) {
  const clean = cleanDomain(domain);

  const normalized: OpenproviderDnsRecord =
    {
      name:
        record.name &&
        record.name !== "@"
          ? record.name.trim()
          : undefined,
      type: String(
        record.type,
      ).toUpperCase(),
      value:
        record.value.trim(),
      ttl: Number(
        record.ttl || 3600,
      ),
    };

  if (
    normalized.type === "MX"
  ) {
    normalized.prio = Number(
      record.prio ??
        record.priority ??
        10,
    );
  }

  const result =
    await openproviderApi<any>(
      `/dns/zones/${encodeURIComponent(clean)}`,
      {
        method: "PUT",
        body: JSON.stringify({
          records: {
            add: [
              normalized,
            ],
          },
        }),
      },
    );

  return result;
}

export async function removeDnsRecord(
  domain: string,
  record: OpenproviderDnsRecord,
) {
  const clean = cleanDomain(domain);

  const normalized: OpenproviderDnsRecord =
    {
      name:
        record.name &&
        record.name !== "@"
          ? record.name.trim()
          : undefined,
      type: String(
        record.type,
      ).toUpperCase(),
      value:
        record.value.trim(),
      ttl: Number(
        record.ttl || 86400,
      ),
    };

  if (
    normalized.type === "MX"
  ) {
    normalized.prio = Number(
      record.prio ??
        record.priority ??
        10,
    );
  }

  return openproviderApi<any>(
    `/dns/zones/${encodeURIComponent(clean)}`,
    {
      method: "PUT",
      body: JSON.stringify({
        records: {
          remove: [
            normalized,
          ],
        },
      }),
    },
  );
}

export {
  cleanDomain,
};