import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  checkDomain,
  createCustomer,
  registerDomain,
} from "@/lib/openprovider";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
);

export async function POST(
  request: NextRequest,
) {
  const body = await request.text();

  const signature =
    request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error(
      "STRIPE WEBHOOK SIGNATURE ERROR:",
      error,
    );

    return NextResponse.json(
      { error: "Signature invalide" },
      { status: 400 },
    );
  }

  try {
    if (
      event.type ===
      "checkout.session.completed"
    ) {
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
          "Le paiement est confirmé mais l'enregistrement du domaine doit être traité.",
      },
      { status: 500 },
    );
  }
}

async function processDomainOrder(
  session: Stripe.Checkout.Session,
) {
  const domain =
    session.metadata?.domain;

  if (!domain) {
    throw new Error(
      "Domaine absent des metadata Stripe",
    );
  }

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
      "Informations client insuffisantes pour enregistrer le domaine",
    );
  }

  // On revérifie immédiatement la disponibilité.
  const availability =
    await checkDomain(domain);

  if (!availability.available) {
    throw new Error(
      `Le domaine ${domain} n'est plus disponible.`,
    );
  }

  const parts =
    name.trim().split(/\s+/);

  const firstName =
    parts.shift() || "Client";

  const lastName =
    parts.join(" ") || firstName;

  const line1 =
    address.line1 || "";

  const addressMatch =
    line1.match(
      /^(\d+[A-Za-z]?)\s+(.+)$/,
    );

  const number =
    addressMatch?.[1] || "1";

  const street =
    addressMatch?.[2] ||
    line1;

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

  // Création du contact chez Openprovider.
  const handle =
    await createCustomer(contact);

  // Achat réel du domaine.
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
}