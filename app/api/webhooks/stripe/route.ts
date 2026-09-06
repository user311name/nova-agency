import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  checkDomain,
  createCustomer,
  findDomainByName,
  registerDomain,
} from "@/lib/openprovider";

import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DomainOrderStatus =
  | "active"
  | "failed"
  | "pending"
  | "processing"
  | "unavailable";

type SavedOrder = {
  status: DomainOrderStatus;
};

function getStripe() {
  const secretKey =
    process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante.",
    );
  }

  return new Stripe(secretKey);
}

export async function POST(
  request: NextRequest,
) {
  const body =
    await request.text();

  const signature =
    request.headers.get(
      "stripe-signature",
    );

  if (!signature) {
    return NextResponse.json(
      {
        error:
          "Signature Stripe manquante.",
      },
      { status: 400 },
    );
  }

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "STRIPE_WEBHOOK_SECRET manquante.",
    );

    return NextResponse.json(
      {
        error:
          "Configuration Stripe manquante.",
      },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    event =
      getStripe().webhooks.constructEvent(
        body,
        signature,
        webhookSecret,
      );
  } catch (error) {
    console.error(
      "STRIPE WEBHOOK SIGNATURE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Signature Stripe invalide.",
      },
      { status: 400 },
    );
  }

  /*
   * ==========================================================
   * EVENEMENT
   * ==========================================================
   */

  if (
    event.type !==
    "checkout.session.completed"
  ) {
    return NextResponse.json({
      received: true,
    });
  }

  try {
    await processDomainOrder(
      event.data.object as Stripe.Checkout.Session,
    );

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    const message =
      getErrorMessage(error);

    console.error(
      "DOMAIN PROVISIONING ERROR:",
      {
        eventId: event.id,
        message,
      },
    );

    /*
     * Stripe doit recevoir une erreur afin
     * de pouvoir relancer automatiquement
     * le webhook.
     */

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}

/*
 * ============================================================
 * TRAITEMENT DE LA COMMANDE
 * ============================================================
 */

async function processDomainOrder(
  session: Stripe.Checkout.Session,
) {
  if (
    session.payment_status !==
    "paid"
  ) {
    throw new Error(
      "Le paiement Stripe n'est pas confirmé.",
    );
  }

  if (
    session.metadata?.product !==
    "domain_registration"
  ) {
    return;
  }

  /*
   * ==========================================================
   * DONNEES STRIPE
   * ==========================================================
   */

  const domain =
    session.metadata.domain
      ?.trim()
      .toLowerCase();

  const userId =
    session.metadata.user_id
      ?.trim();

  const email =
    session.customer_details?.email
      ?.trim()
      .toLowerCase();

  const name =
    session.customer_details?.name
      ?.trim();

  const phone =
    session.customer_details?.phone
      ?.trim();

  const address =
    session.customer_details?.address;

  if (!domain) {
    throw new Error(
      "Domaine absent des metadata Stripe.",
    );
  }

  /*
   * Les anciennes sessions Stripe créées
   * avant cette version n'ont pas forcément
   * user_id.
   *
   * On bloque les nouvelles commandes
   * sans propriétaire pour éviter de créer
   * un domaine sans compte associé.
   */

  if (!userId) {
    throw new Error(
      "Compte NOVA absent des metadata Stripe. Veuillez effectuer une nouvelle commande depuis votre compte.",
    );
  }

  if (
    !email ||
    !name ||
    !phone ||
    !address
  ) {
    throw new Error(
      "Informations client Stripe insuffisantes pour enregistrer le domaine.",
    );
  }

  /*
   * ==========================================================
   * VERIFICATION COMMANDE EXISTANTE
   * ==========================================================
   */

  const existingOrder =
    await getOrder(session.id);

  if (
    [
      "active",
      "pending",
      "unavailable",
    ].includes(
      existingOrder?.status || "",
    )
  ) {
    console.log(
      "DOMAIN ORDER ALREADY FINALIZED:",
      session.id,
    );

    /*
     * On s'assure quand même que user_id
     * est renseigné sur une ancienne ligne
     * compatible.
     */

    await attachUserToOrder(
      session.id,
      userId,
    );

    return;
  }

  /*
   * ==========================================================
   * ENREGISTREMENT INITIAL
   * ==========================================================
   */

  await saveOrder({
    domain,
    email,
    userId,
    amount:
      typeof session.amount_total ===
      "number"
        ? session.amount_total / 100
        : null,
    currency:
      session.currency
        ?.toUpperCase() || "EUR",
    status: "processing",
    stripeSessionId:
      session.id,
  });

  try {
    /*
     * ========================================================
     * VERIFICATION PORTFOLIO OPENPROVIDER
     * ========================================================
     *
     * Si Stripe relance le webhook après
     * une inscription déjà effectuée,
     * on synchronise le domaine au lieu
     * de le réinscrire.
     */

    const ownedDomain =
      await findDomainByName(domain);

    if (ownedDomain) {
      await saveRegisteredOrder({
        domain,
        email,
        userId,
        amount:
          typeof session.amount_total ===
          "number"
            ? session.amount_total / 100
            : null,
        currency:
          session.currency
            ?.toUpperCase() || "EUR",
        registration:
          ownedDomain,
        stripeSessionId:
          session.id,
      });

      return;
    }

    /*
     * ========================================================
     * DISPONIBILITE
     * ========================================================
     */

    const availability =
      await checkDomain(domain);

    if (!availability.available) {
      throw new Error(
        `Le domaine ${domain} n'est plus disponible.`,
      );
    }

    /*
     * ========================================================
     * CONTACT OPENPROVIDER
     * ========================================================
     */

    const handle =
      await createCustomer(
        makeContact({
          address,
          email,
          name,
          phone,
        }),
      );

    /*
     * ========================================================
     * ENREGISTREMENT DOMAINE
     * ========================================================
     */

    const registration =
      await registerDomain(
        domain,
        handle,
        1,
      );

    console.log(
      "DOMAIN REGISTERED:",
      {
        domain,
        handle,
        registrationId:
          extractOpenproviderId(
            registration,
          ),
        stripeSessionId:
          session.id,
        userId,
      },
    );

    /*
     * ========================================================
     * SAUVEGARDE FINALE
     * ========================================================
     */

    await saveRegisteredOrder({
      domain,
      email,
      userId,
      amount:
        typeof session.amount_total ===
        "number"
          ? session.amount_total / 100
          : null,
      currency:
        session.currency
          ?.toUpperCase() || "EUR",
      registration,
      stripeSessionId:
        session.id,
    });
  } catch (error) {
    /*
     * IMPORTANT :
     * on conserve l'erreur afin que Stripe
     * puisse relancer le webhook.
     */

    await saveOrder({
      domain,
      email,
      userId,
      amount:
        typeof session.amount_total ===
        "number"
          ? session.amount_total / 100
          : null,
      currency:
        session.currency
          ?.toUpperCase() || "EUR",
      status: "failed",
      stripeSessionId:
        session.id,
    });

    throw error;
  }
}

/*
 * ============================================================
 * CONTACT OPENPROVIDER
 * ============================================================
 */

function makeContact({
  address,
  email,
  name,
  phone,
}: {
  address: Stripe.Address;
  email: string;
  name: string;
  phone: string;
}) {
  const parts =
    name.split(/\s+/);

  const firstName =
    parts.shift() || "Client";

  const lastName =
    parts.join(" ") ||
    firstName;

  const line1 =
    address.line1?.trim();

  const city =
    address.city?.trim();

  const postalCode =
    address.postal_code?.trim();

  if (
    !line1 ||
    !city ||
    !postalCode ||
    !address.country
  ) {
    throw new Error(
      "Adresse de facturation Stripe incomplète.",
    );
  }

  const addressMatch =
    line1.match(
      /^(\d+[A-Za-z]?)\s+(.+)$/,
    );

  return {
    firstName,
    lastName,
    email,
    phone,

    street:
      addressMatch?.[2] ||
      line1,

    number:
      addressMatch?.[1] ||
      "1",

    city,

    postalCode,

    state:
      address.state || "",

    country:
      address.country,
  };
}

/*
 * ============================================================
 * RECUPERATION COMMANDE
 * ============================================================
 */

async function getOrder(
  stripeSessionId: string,
): Promise<SavedOrder | null> {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from("domains")
    .select("status")
    .eq(
      "stripe_session_id",
      stripeSessionId,
    )
    .maybeSingle();

  if (error) {
    throw new Error(
      `Erreur Supabase : ${error.message}`,
    );
  }

  return data as SavedOrder | null;
}

/*
 * ============================================================
 * LIAISON USER
 * ============================================================
 */

async function attachUserToOrder(
  stripeSessionId: string,
  userId: string,
) {
  const {
    error,
  } = await supabaseAdmin
    .from("domains")
    .update({
      user_id: userId,
    })
    .eq(
      "stripe_session_id",
      stripeSessionId,
    )
    .is(
      "user_id",
      null,
    );

  if (error) {
    throw new Error(
      `Erreur Supabase lors de la liaison du compte : ${error.message}`,
    );
  }
}

/*
 * ============================================================
 * SAUVEGARDE DOMAINE ENREGISTRE
 * ============================================================
 */

async function saveRegisteredOrder({
  domain,
  email,
  userId,
  amount,
  currency,
  registration,
  stripeSessionId,
}: {
  domain: string;
  email: string;
  userId: string;
  amount: number | null;
  currency: string;
  registration: Record<
    string,
    unknown
  >;
  stripeSessionId: string;
}) {
  await saveOrder({
    domain,
    email,
    userId,
    amount,
    currency,
    expiresAt:
      extractExpirationDate(
        registration,
      ),
    openproviderId:
      extractOpenproviderId(
        registration,
      ),
    status:
      getProviderStatus(
        registration,
      ) === "ACT"
        ? "active"
        : "pending",
    stripeSessionId,
  });
}

/*
 * ============================================================
 * SAUVEGARDE COMMANDE
 * ============================================================
 */

async function saveOrder({
  domain,
  email,
  userId,
  amount,
  currency,
  expiresAt,
  openproviderId,
  status,
  stripeSessionId,
}: {
  domain: string;
  email: string;
  userId: string;
  amount?: number | null;
  currency?: string;
  expiresAt?: string | null;
  openproviderId?: string | null;
  status: DomainOrderStatus;
  stripeSessionId: string;
}) {
  const values = {
    domain,
    email,
    user_id: userId,

    expires_at:
      expiresAt || null,

    openprovider_id:
      openproviderId || null,

    status,

    stripe_session_id:
      stripeSessionId,

    amount:
      amount ?? null,

    currency:
      currency || "EUR",
  };

  const existingOrder =
    await getOrder(
      stripeSessionId,
    );

  const query = existingOrder
    ? supabaseAdmin
        .from("domains")
        .update(values)
        .eq(
          "stripe_session_id",
          stripeSessionId,
        )
    : supabaseAdmin
        .from("domains")
        .insert(values);

  const {
    error,
  } = await query;

  if (error) {
    throw new Error(
      `Erreur Supabase : ${error.message}`,
    );
  }
}

/*
 * ============================================================
 * STATUS OPENPROVIDER
 * ============================================================
 */

function getProviderStatus(
  registration: Record<
    string,
    unknown
  >,
) {
  const status =
    registration.status;

  return typeof status ===
    "string"
    ? status.toUpperCase()
    : "REQ";
}

/*
 * ============================================================
 * ID OPENPROVIDER
 * ============================================================
 */

function extractOpenproviderId(
  registration: Record<
    string,
    unknown
  >,
) {
  const id =
    registration.id;

  return id === undefined ||
    id === null
    ? null
    : String(id);
}

/*
 * ============================================================
 * DATE EXPIRATION
 * ============================================================
 */

function extractExpirationDate(
  registration: Record<
    string,
    unknown
  >,
) {
  const date =
    registration.expiration_date;

  if (
    typeof date !== "string" ||
    !date
  ) {
    return null;
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return null;
  }

  return parsed.toISOString();
}

/*
 * ============================================================
 * ERREUR
 * ============================================================
 */

function getErrorMessage(
  error: unknown,
) {
  return error instanceof Error
    ? error.message
    : "Erreur inconnue lors de l'enregistrement du domaine.";
}