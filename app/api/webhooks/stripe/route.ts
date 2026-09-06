import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { checkDomain, createCustomer, findDomainByName, registerDomain } from "@/lib/openprovider";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DomainOrderStatus = "active" | "failed" | "pending" | "processing" | "unavailable";
type SavedOrder = { status: DomainOrderStatus };

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY manquante.");
  return new Stripe(secretKey);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Signature Stripe manquante." }, { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquante.");
    return NextResponse.json({ error: "Configuration Stripe manquante." }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("STRIPE WEBHOOK SIGNATURE ERROR:", error);
    return NextResponse.json({ error: "Signature Stripe invalide." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  try {
    await processDomainOrder(event.data.object as Stripe.Checkout.Session);
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("DOMAIN PROVISIONING ERROR:", { eventId: event.id, message });
    // Stripe doit recevoir un échec pour pouvoir relancer le webhook.
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function processDomainOrder(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    throw new Error("Le paiement Stripe n'est pas confirmé.");
  }
  if (session.metadata?.product !== "domain_registration") return;

  const domain = session.metadata.domain?.trim().toLowerCase();
  const email = session.customer_details?.email?.trim().toLowerCase();
  const name = session.customer_details?.name?.trim();
  const phone = session.customer_details?.phone?.trim();
  const address = session.customer_details?.address;

  if (!domain) throw new Error("Domaine absent des metadata Stripe.");
  if (!email || !name || !phone || !address) {
    throw new Error("Informations client Stripe insuffisantes pour enregistrer le domaine.");
  }

  const existingOrder = await getOrder(session.id);
  if (["active", "pending", "unavailable"].includes(existingOrder?.status || "")) {
    console.log("DOMAIN ORDER ALREADY FINALIZED:", session.id);
    return;
  }

  await saveOrder({ domain, email, status: "processing", stripeSessionId: session.id });

  try {
    // Si Stripe relance après une inscription réussie mais avant Supabase,
    // le domaine existant est synchronisé au lieu d'être inscrit une seconde fois.
    const ownedDomain = await findDomainByName(domain);
    if (ownedDomain) {
      await saveRegisteredOrder({ domain, email, registration: ownedDomain, stripeSessionId: session.id });
      return;
    }

    const availability = await checkDomain(domain);
    if (!availability.available) throw new Error(`Le domaine ${domain} n'est plus disponible.`);

    const handle = await createCustomer(makeContact({ address, email, name, phone }));
    const registration = await registerDomain(domain, handle, 1);
    console.log("DOMAIN REGISTERED:", { domain, handle, registrationId: extractOpenproviderId(registration), stripeSessionId: session.id });
    await saveRegisteredOrder({ domain, email, registration, stripeSessionId: session.id });
  } catch (error) {
    await saveOrder({ domain, email, status: "failed", stripeSessionId: session.id });
    throw error;
  }
}

function makeContact({ address, email, name, phone }: { address: Stripe.Address; email: string; name: string; phone: string }) {
  const parts = name.split(/\s+/);
  const firstName = parts.shift() || "Client";
  const lastName = parts.join(" ") || firstName;
  const line1 = address.line1?.trim();
  const city = address.city?.trim();
  const postalCode = address.postal_code?.trim();
  if (!line1 || !city || !postalCode || !address.country) {
    throw new Error("Adresse de facturation Stripe incomplète.");
  }
  const addressMatch = line1.match(/^(\d+[A-Za-z]?)\s+(.+)$/);
  return {
    firstName, lastName, email, phone,
    street: addressMatch?.[2] || line1,
    number: addressMatch?.[1] || "1",
    city, postalCode, state: address.state || "", country: address.country,
  };
}

async function getOrder(stripeSessionId: string): Promise<SavedOrder | null> {
  const { data, error } = await supabaseAdmin.from("domains").select("status").eq("stripe_session_id", stripeSessionId).maybeSingle();
  if (error) throw new Error(`Erreur Supabase : ${error.message}`);
  return data as SavedOrder | null;
}

async function saveRegisteredOrder({ domain, email, registration, stripeSessionId }: { domain: string; email: string; registration: Record<string, unknown>; stripeSessionId: string }) {
  await saveOrder({
    domain, email, expiresAt: extractExpirationDate(registration),
    openproviderId: extractOpenproviderId(registration),
    status: getProviderStatus(registration) === "ACT" ? "active" : "pending", stripeSessionId,
  });
}

async function saveOrder({ domain, email, expiresAt, openproviderId, status, stripeSessionId }: { domain: string; email: string; expiresAt?: string | null; openproviderId?: string | null; status: DomainOrderStatus; stripeSessionId: string }) {
  const values = { domain, email, expires_at: expiresAt || null, openprovider_id: openproviderId || null, status, stripe_session_id: stripeSessionId };
  const existingOrder = await getOrder(stripeSessionId);
  const query = existingOrder
    ? supabaseAdmin.from("domains").update(values).eq("stripe_session_id", stripeSessionId)
    : supabaseAdmin.from("domains").insert(values);
  const { error } = await query;
  if (error) throw new Error(`Erreur Supabase : ${error.message}`);
}

function getProviderStatus(registration: Record<string, unknown>) {
  const status = registration.status;
  return typeof status === "string" ? status.toUpperCase() : "REQ";
}

function extractOpenproviderId(registration: Record<string, unknown>) {
  const id = registration.id;
  return id === undefined || id === null ? null : String(id);
}

function extractExpirationDate(registration: Record<string, unknown>) {
  const date = registration.expiration_date;
  if (typeof date !== "string" || !date) return null;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Erreur inconnue lors de l'enregistrement du domaine.";
}
