// lib/openprovider.ts

const API_URL =
  process.env.OPENPROVIDER_API_URL ||
  "https://api.openprovider.eu/v1beta";

type ApiResponse<T> = {
  code?: number;
  data?: T;
  desc?: string;
};

type TokenResponse = {
  token: string;
  reseller_id: number;
};

export type DomainContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  state?: string;
  country: string;
  company?: string;
};

export type DomainCheckResult = {
  domain: string;
  name: string;
  extension: string;
  available: boolean;
  status: string;
  resellerPrice: number | null;
  currency: string;
  premium: boolean;
};

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

function cleanDomain(domain: string) {
  return domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function splitDomain(domain: string) {
  const clean = cleanDomain(domain);
  const parts = clean.split(".");

  if (parts.length < 2) {
    throw new Error("Nom de domaine invalide.");
  }

  const extension = parts.pop()!;
  const name = parts.join(".");

  return {
    clean,
    name,
    extension,
  };
}

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

  const json =
    (await response.json()) as ApiResponse<TokenResponse>;

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

async function api<T>(
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

  let json: ApiResponse<T>;

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

    return api<T>(
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

function parsePrice(item: any) {
  const price =
    item?.price?.reseller?.price ??
    item?.price?.product?.price ??
    item?.reseller_price ??
    item?.price?.price;

  const number = Number(price);

  return Number.isFinite(number)
    ? number
    : null;
}

function parseCurrency(item: any) {
  return (
    item?.price?.reseller?.currency ??
    item?.price?.product?.currency ??
    item?.price?.currency ??
    "EUR"
  );
}

export async function checkDomain(
  domain: string,
): Promise<DomainCheckResult> {
  const {
    clean,
    name,
    extension,
  } = splitDomain(domain);

  const result =
    await api<any>("/domains/check", {
      method: "POST",
      body: JSON.stringify({
        domains: [
          {
            name,
            extension,
          },
        ],
        with_price: true,
      }),
    });

  const item =
    result?.results?.[0] ??
    result?.domains?.[0] ??
    result?.[0];

  if (!item) {
    throw new Error(
      "Openprovider n'a retourné aucun résultat.",
    );
  }

  const status = String(
    item.status || "",
  ).toLowerCase();

  const available =
    status === "free" ||
    status === "available" ||
    item.can_register === true;

  return {
    domain: clean,
    name,
    extension,
    available,
    status,
    resellerPrice: parsePrice(item),
    currency: parseCurrency(item),
    premium:
      Boolean(item.is_premium) ||
      Boolean(item.premium),
  };
}

function parsePhone(phone: string) {
  const clean = phone
    .trim()
    .replace(/\s+/g, "");

  if (clean.startsWith("+")) {
    return {
      country_code: clean.slice(0, 3),
      area_code: "",
      subscriber_number: clean.slice(3),
    };
  }

  return {
    country_code: "+33",
    area_code: "",
    subscriber_number:
      clean.replace(/^0/, ""),
  };
}

export async function createCustomer(
  contact: DomainContact,
) {
  const result =
    await api<{ handle: string }>(
      "/customers",
      {
        method: "POST",
        body: JSON.stringify({
          company_name:
            contact.company || undefined,

          name: {
            first_name:
              contact.firstName,
            last_name:
              contact.lastName,
            full_name:
              `${contact.firstName} ${contact.lastName}`,
          },

          address: {
            street: contact.street,
            number:
              contact.number || "1",
            zipcode:
              contact.postalCode,
            city:
              contact.city,
            state:
              contact.state || "",
            country:
              contact.country.toUpperCase(),
          },

          phone: parsePhone(
            contact.phone,
          ),

          email: contact.email,
        }),
      },
    );

  if (!result?.handle) {
    throw new Error(
      "Openprovider n'a pas retourné de handle client.",
    );
  }

  return result.handle;
}

export async function registerDomain(
  domain: string,
  handle: string,
  years = 1,
) {
  const {
    name,
    extension,
  } = splitDomain(domain);

  return api<any>("/domains", {
    method: "POST",
    body: JSON.stringify({
      owner_handle: handle,
      admin_handle: handle,
      billing_handle: handle,
      tech_handle: handle,

      domain: {
        name,
        extension,
      },

      period: years,

      autorenew: "on",
    }),
  });
}

export async function renewDomain(
  domainId: number,
  years = 1,
) {
  return api<any>(
    `/domains/${domainId}/renew`,
    {
      method: "POST",
      body: JSON.stringify({
        period: years,
      }),
    },
  );
}

export async function getDomain(
  domainId: number,
) {
  return api<any>(
    `/domains/${domainId}`,
    {
      method: "GET",
    },
  );
}

export async function listDomains(
  domainNamePattern?: string,
) {
  const params = new URLSearchParams();

  if (domainNamePattern) {
    params.set(
      "domain_name_pattern",
      domainNamePattern,
    );
  }

  params.set("limit", "100");

  return api<any>(
    `/domains?${params.toString()}`,
    {
      method: "GET",
    },
  );
}

export async function updateDomain(
  domainId: number,
  data: Record<string, unknown>,
) {
  return api<any>(
    `/domains/${domainId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
}

export async function getAuthCode(
  domainId: number,
) {
  return api<any>(
    `/domains/${domainId}/authcode`,
    {
      method: "GET",
    },
  );
}