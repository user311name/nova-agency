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
};

const PRICE_PER_PLAN: Record<string, number> = {
  essential: 14.9,
  business: 39.9,
  team: 59.9,
};

const PLAN_NAMES: Record<string, string> = {
  essential: "Essentiel",
  business: "Business",
  team: "Équipe",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const { plan, domain, emailPrefix } = body;

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

    const { data: order, error: insertError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        type: "email",
        plan,
        domain,
        email_prefix: emailPrefix,
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
        type: "email",
        plan,
        domain,
        email_prefix: emailPrefix,
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