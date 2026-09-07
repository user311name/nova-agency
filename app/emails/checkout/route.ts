import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const plans = {
  essential: {
    name: "Email professionnel — Essentiel",
    amount: 1490,
    mailboxes: 1,
    storage_gb: 15,
  },
  business: {
    name: "Email professionnel — Business",
    amount: 3990,
    mailboxes: 3,
    storage_gb: 45,
  },
  team: {
    name: "Email professionnel — Équipe",
    amount: 5990,
    mailboxes: 5,
    storage_gb: 75,
  },
} as const;

type PlanId = keyof typeof plans;

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Vous devez être connecté pour commander un email.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const plan = body?.plan as PlanId;
    const domain = String(body?.domain || "")
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");

    const emailPrefix = String(body?.emailPrefix || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "");

    if (!plan || !plans[plan]) {
      return NextResponse.json(
        { error: "Offre email invalide." },
        { status: 400 },
      );
    }

    if (!domain) {
      return NextResponse.json(
        { error: "Domaine manquant." },
        { status: 400 },
      );
    }

    if (!emailPrefix) {
      return NextResponse.json(
        { error: "Nom de boîte mail manquant." },
        { status: 400 },
      );
    }

    const { data: domainRecord, error: domainError } =
      await supabaseAdmin
        .from("domains")
        .select("id, domain, user_id, status")
        .eq("domain", domain)
        .eq("user_id", user.id)
        .maybeSingle();

    if (domainError) {
      console.error("EMAIL DOMAIN CHECK ERROR:", domainError);

      return NextResponse.json(
        {
          error:
            "Impossible de vérifier votre domaine pour le moment.",
        },
        { status: 500 },
      );
    }

    if (!domainRecord) {
      return NextResponse.json(
        {
          error:
            "Ce domaine n'est pas associé à votre compte NOVA.",
        },
        { status: 403 },
      );
    }

    const selectedPlan = plans[plan];

    const emailAddress = `${emailPrefix}@${domain}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: selectedPlan.amount,
            product_data: {
              name: selectedPlan.name,
              description: `${selectedPlan.mailboxes} boîte${
                selectedPlan.mailboxes > 1 ? "s" : ""
              } mail · ${selectedPlan.storage_gb} Go · ${domain}`,
            },
          },
        },
      ],

      customer_email: user.email || undefined,

      billing_address_collection: "required",

      allow_promotion_codes: true,

      metadata: {
        type: "professional_email",
        plan,
        domain,
        email_prefix: emailPrefix,
        email_address: emailAddress,
        user_id: user.id,
        user_email: user.email || "",
        mailboxes: String(selectedPlan.mailboxes),
        storage_gb: String(selectedPlan.storage_gb),
        domain_id: domainRecord.id,
      },

      success_url:
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-nova.fr"}` +
        `/espace-client/emails/succes?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-nova.fr"}` +
        `/espace-client/emails/acheter?plan=${plan}`,
    });

    if (!session.url) {
      return NextResponse.json(
        {
          error:
            "Stripe n'a pas généré de lien de paiement.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        url: session.url,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("EMAIL CHECKOUT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la création du paiement.",
      },
      { status: 500 },
    );
  }
}