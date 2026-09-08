import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY manquante.");
  }

  return new Stripe(secretKey);
}

type CheckoutBody = {
  plan?: string;
  domain?: string;
  emailPrefix?: string;
  billingPeriod?: string;
};

const PRICE_PER_PLAN: Record<string, number> = {
  essential: 9.9,
  business: 14.9,
  team: 129.0,
};

const PLAN_NAMES: Record<string, string> = {
  essential: "Essentiel",
  business: "Business",
  team: "Équipe",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const { plan, domain, emailPrefix, billingPeriod = "monthly" } = body;

    if (!plan || !domain || !emailPrefix) {
      return NextResponse.json(
        { error: "Plan, domaine et préfixe email sont requis." },
        { status: 400 },
      );
    }

    const price = PRICE_PER_PLAN[plan];
    if (price === undefined) {
      return NextResponse.json(
        { error: "Plan invalide." },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 },
      );
    }

    // Vérifier la propriété du domaine
    const { data: domainData, error: domainError } = await supabaseAdmin
      .from("domains")
      .select("id, domain, status, user_id")
      .eq("domain", domain)
      .eq("user_id", user.id)
      .maybeSingle();

    if (domainError) {
      console.error("DOMAIN CHECK ERROR:", domainError);
      return NextResponse.json(
        { error: "Impossible de vérifier le domaine." },
        { status: 500 },
      );
    }

    if (!domainData) {
      return NextResponse.json(
        { error: "Ce domaine n'appartient pas à votre compte NOVA." },
        { status: 403 },
      );
    }

    if (domainData.status !== "active") {
      return NextResponse.json(
        { error: "Ce domaine n'est pas encore actif." },
        { status: 400 },
      );
    }

    // Vérifier la disponibilité de l'adresse email
    const emailAddress = `${emailPrefix}@${domain}`;
    const { data: existingEmail, error: emailCheckError } = await supabaseAdmin
      .from("emails")
      .select("id")
      .eq("email_address", emailAddress)
      .maybeSingle();

    if (emailCheckError) {
      console.error("EMAIL CHECK ERROR:", emailCheckError);
      return NextResponse.json(
        { error: "Impossible de vérifier la disponibilité de l'email." },
        { status: 500 },
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        { error: "Cette adresse email existe déjà." },
        { status: 409 },
      );
    }

    // Créer la commande
    const { data: order, error: insertError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        type: "email",
        plan,
        domain,
        email_prefix: emailPrefix,
        email_address: emailAddress,
        billing_period: billingPeriod,
        amount: price,
        currency: "EUR",
        status: "pending",
      })
      .select()
      .single();

    if (insertError || !order) {
      console.error("INSERT ORDER ERROR:", insertError);
      return NextResponse.json(
        { error: "Impossible de créer la commande." },
        { status: 500 },
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            product_data: {
              name: `Email NOVA — ${PLAN_NAMES[plan] ?? plan}`,
              description: `${emailPrefix}@${domain}`,
            },
            unit_amount: Math.round(price * 100),
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/espace-client/emails/success?order=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/espace-client/emails/acheter`,
      metadata: {
        order_id: order.id,
        type: "professional_email",
        user_id: user.id,
        domain,
        email_prefix: emailPrefix,
        email_address: emailAddress,
        plan,
        billing_period: billingPeriod,
        amount: price,
      },
    });

    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("EMAIL CHECKOUT ERROR:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du paiement." },
      { status: 500 },
    );
  }
}