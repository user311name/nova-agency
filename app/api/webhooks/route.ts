import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  checkDomain,
  createCustomer,
  registerDomain,
} from "@/lib/openprovider";

import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante." },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquante.");

    return NextResponse.json(
      { error: "Configuration Stripe manquante." },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
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
      { error: "Signature invalide." },
      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session =
        event.data.object as Stripe.Checkout.Session;

      await processDomainOrder(session);
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "DOMAIN PROVISIONING ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue lors de l'enregistrement du domaine.",
      },
      { status: 500 },
    );
  }
}

async function processDomainOrder(
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") {
    console.log(
      "PAIEMENT NON CONFIRME:",
      session.id,
    );

    return;
  }

  const domain = session.metadata?.domain
    ?.trim()
    .toLowerCase();

  if (!domain) {
    throw new Error(
      "Domaine absent des metadata Stripe.",
    );
  }

  /*
   * Vérification du produit.
   */
  const productType =
    session.metadata?.product_type;

  if (
    productType &&
    productType !== "domain_registration"
  ) {
    console.log(
      "SESSION NON DOMAINE:",
      session.id,
    );

    return;
  }

  /*
   * Anti-double traitement.
   */
  const {
    data: existingOrder,
    error: lookupError,
  } = await supabaseAdmin
    .from("domains")
    .select("*")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (lookupError) {
    throw new Error(
      `Erreur Supabase : ${lookupError.message}`,
    );
  }

  if (existingOrder?.status === "active") {
    console.log(
      "COMMANDE DEJA TRAITEE:",
      session.id,
    );

    return;
  }

  /*
   * Informations client Stripe.
   */
  const email =
    session.customer_details?.email;

  const name =
    session.customer_details?.name;

  const phone =
    session.customer_details?.phone;

  const address =
    session.customer_details?.address;

  if (!email || !name || !address) {
    throw new Error(
      "Informations client insuffisantes pour enregistrer le domaine.",
    );
  }

  /*
   * Dernière vérification de disponibilité.
   */
  const availability =
    await checkDomain(domain);

  if (!availability.available) {
    await saveOrder({
      domain,
      status: "unavailable",
      stripeSessionId: session.id,
      email,
    });

    throw new Error(
      `Le domaine ${domain} n'est plus disponible.`,
    );
  }

  /*
   * Séparation prénom / nom.
   */
  const parts = name
    .trim()
    .split(/\s+/);

  const firstName =
    parts.shift() || "Client";

  const lastName =
    parts.join(" ") || firstName;

  /*
   * Adresse.
   */
  const line1 =
    address.line1 || "";

  const addressMatch =
    line1.match(
      /^(\d+[A-Za-z]?)\s+(.+)$/,
    );

  const number =
    addressMatch?.[1] || "1";

  const street =
    addressMatch?.[2] || line1;

  const contact = {
    firstName,
    lastName,
    email,

    phone:
      phone || "+33000000000",

    street,

    number,

    city:
      address.city || "",

    postalCode:
      address.postal_code || "",

    state:
      address.state || "",

    country:
      address.country || "FR",
  };

  /*
   * Création du client Openprovider.
   */
  const handle =
    await createCustomer(contact);

  console.log(
    "OPENPROVIDER CUSTOMER CREATED:",
    {
      domain,
      handle,
    },
  );

  /*
   * Enregistrement du domaine.
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
      registration,
      stripeSession: session.id,
    },
  );

  /*
   * Identifiant Openprovider.
   */
  const openproviderId =
    extractOpenproviderId(
      registration,
    );

  /*
   * Date expiration.
   */
  const expiresAt =
    extractExpirationDate(
      registration,
    );

  /*
   * Enregistrement final.
   */
  await saveOrder({
    domain,
    status: "active",
    stripeSessionId: session.id,
    openproviderId,
    email,
    expiresAt,
  });
}

async function saveOrder({
  domain,
  status,
  stripeSessionId,
  openproviderId,
  email,
  expiresAt,
}: {
  domain: string;
  status: string;
  stripeSessionId: string;
  openproviderId?: string | null;
  email: string;
  expiresAt?: string | null;
}) {
  const { error } =
    await supabaseAdmin
      .from("domains")
      .upsert(
        {
          domain,

          status,

          stripe_session_id:
            stripeSessionId,

          openprovider_id:
            openproviderId || null,

          email,

          expires_at:
            expiresAt || null,
        },
        {
          onConflict:
            "stripe_session_id",
        },
      );

  if (error) {
    throw new Error(
      `Erreur Supabase : ${error.message}`,
    );
  }
}

function extractOpenproviderId(
  registration: any,
): string | null {
  const id =
    registration?.id ??
    registration?.domain?.id ??
    registration?.domain?.domain_id ??
    registration?.id_domain;

  if (
    id === undefined ||
    id === null
  ) {
    return null;
  }

  return String(id);
}

function extractExpirationDate(
  registration: any,
): string | null {
  const date =
    registration?.expiration_date ??
    registration?.domain?.expiration_date ??
    registration?.domain?.expire_date ??
    registration?.expire_date;

  if (!date) {
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