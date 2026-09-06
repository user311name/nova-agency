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

  if (!name || !extension) {
    throw new Error("Nom de domaine invalide.");
  }

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

  const text = await response.text();

  let json: ApiResponse<TokenResponse>;

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

  // Le token Openprovider est conservé temporairement.
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

  // Token expiré : on se reconnecte une seule fois.
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

function parsePrice(item: any): number | null {
  const price =
    item?.price?.reseller?.price ??
    item?.price?.reseller ??
    item?.price?.product?.price ??
    item?.reseller_price ??
    item?.price?.price;

  const number = Number(price);

  return Number.isFinite(number)
    ? number
    : null;
}

function parseCurrency(item: any): string {
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

function parsePhone(
  phone: string,
  country: string,
) {
  const clean = phone.replace(/[^\d+]/g, "");
  const countryCode = country.toUpperCase();

  if (!clean) {
    throw new Error("Numéro de téléphone manquant.");
  }

  // Stripe fournit le numéro français au format +33 0X… dans certains cas.
  // Le 0 national ne doit pas être envoyé à Openprovider après +33.
  if (countryCode === "FR") {
    const nationalNumber = clean
      .replace(/^\+?33/, "")
      .replace(/^0/, "");

    if (!/^\d{9}$/.test(nationalNumber)) {
      throw new Error("Numéro de téléphone français invalide.");
    }

    return {
      country_code: "+33",
      area_code: "",
      subscriber_number: nationalNumber,
    };
  }

  const international = clean.match(/^\+(\d{1,3})(\d{4,})$/);

  if (!international) {
    throw new Error("Le téléphone doit être au format international.");
  }

  return {
    country_code: `+${international[1]}`,
    area_code: "",
    subscriber_number: international[2],
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
            contact.country,
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

export async function findDomainByName(
  domain: string,
) {
  const {
    clean,
    name,
    extension,
  } = splitDomain(domain);

  const result = await listDomains(name);
  const domains =
    result?.results ??
    result?.domains ??
    result ??
    [];

  if (!Array.isArray(domains)) {
    return null;
  }

  return (
    domains.find((item: unknown) => {
      if (
        !item ||
        typeof item !== "object"
      ) {
        return false;
      }

      const domainItem = item as {
        domain?:
          | string
          | {
              name?: string;
              extension?: string;
            };
        domain_name?: string;
        extension?: string;
        name?: string;
      };
      const itemName =
        typeof domainItem.domain === "object"
          ? domainItem.domain?.name
          : domainItem.name;
      const itemExtension =
        typeof domainItem.domain === "object"
          ? domainItem.domain?.extension
          : domainItem.extension;
      const fullDomain =
        domainItem.domain_name ??
        domainItem.domain;

      return (
        (String(itemName || "").toLowerCase() ===
          name &&
          String(itemExtension || "").toLowerCase() ===
            extension) ||
        String(fullDomain || "").toLowerCase() ===
          clean
      );
    }) ?? null
  );
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
