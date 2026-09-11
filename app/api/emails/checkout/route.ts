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

type PlanConfig = {
  name: string;
  priceId: string;
  billingPeriod: "monthly" | "yearly";
};

function getPlanConfig(plan: string): PlanConfig | null {
  const configs: Record<string, PlanConfig> = {
    essential: {
      name: "Essentiel",
      priceId:
        process.env.STRIPE_PRICE_EMAIL_ESSENTIAL_MONTHLY || "",
      billingPeriod: "monthly",
    },

    business: {
      name: "Business",
      priceId:
        process.env.STRIPE_PRICE_EMAIL_BUSINESS_MONTHLY || "",
      billingPeriod: "monthly",
    },

    team: {
      name: "Équipe",
      priceId:
        process.env.STRIPE_PRICE_EMAIL_TEAM_YEARLY || "",
      billingPeriod: "yearly",
    },
  };

  const config = configs[plan];

  if (!config || !config.priceId) {
    return null;
  }

  return config;
}

function cleanDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function cleanEmailPrefix(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "");
}

function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  return siteUrl.replace(/\/+$/, "");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;

    const plan = body.plan?.trim().toLowerCase();
    const domain = cleanDomain(body.domain ?? "");
    const emailPrefix = cleanEmailPrefix(body.emailPrefix ?? "");

    if (!plan || !domain || !emailPrefix) {
      return NextResponse.json(
        {
          error: "Plan, domaine et préfixe email sont requis.",
        },
        { status: 400 },
      );
    }

    /*
     * =========================================================
     * PLAN STRIPE
     * =========================================================
     *
     * IMPORTANT :
     * Le prix n'est jamais envoyé par le navigateur.
     *
     * Le serveur récupère directement le Price ID configuré
     * dans les variables d'environnement Stripe.
     */

    const planConfig = getPlanConfig(plan);

    if (!planConfig) {
      return NextResponse.json(
        {
          error:
            "Ce plan n'est pas correctement configuré dans Stripe.",
          code: "STRIPE_PRICE_NOT_CONFIGURED",
        },
        { status: 500 },
      );
    }

    const supabase = await createSupabaseServerClient();

    /*
     * =========================================================
     * AUTHENTIFICATION
     * =========================================================
     */

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Non authentifié.",
        },
        { status: 401 },
      );
    }

    /*
     * =========================================================
     * VÉRIFICATION DU DOMAINE
     * =========================================================
     *
     * Le domaine peut avoir été :
     *
     * - acheté via NOVA
     * - associé manuellement au compte NOVA
     *
     * Dans les deux cas, il doit appartenir au compte connecté
     * et être actif.
     */

    const { data: domainRows, error: domainError } =
      await supabaseAdmin
        .from("domains")
        .select("id, domain, status, user_id")
        .eq("user_id", user.id)
        .eq("domain", domain)
        .limit(1);

    if (domainError) {
      console.error(
        "DOMAIN CHECK ERROR:",
        domainError,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de vérifier le domaine.",
          code: "DOMAIN_CHECK_ERROR",
        },
        { status: 500 },
      );
    }

    const domainData =
      domainRows?.[0] ?? null;

    if (!domainData) {
      return NextResponse.json(
        {
          error:
            "Ce domaine n'appartient pas à votre compte NOVA.",
          code: "DOMAIN_NOT_FOUND",
        },
        { status: 403 },
      );
    }

    if (domainData.status !== "active") {
      return NextResponse.json(
        {
          error:
            "Ce domaine n'est pas encore actif.",
          code: "DOMAIN_NOT_ACTIVE",
        },
        { status: 400 },
      );
    }

    /*
     * =========================================================
     * ADRESSE EMAIL
     * =========================================================
     */

    const emailAddress =
      `${emailPrefix}@${domain}`;

    /*
     * =========================================================
     * VÉRIFICATION EMAIL EXISTANT
     * =========================================================
     */

    const {
      data: existingEmails,
      error: emailCheckError,
    } = await supabaseAdmin
      .from("emails")
      .select("id, status")
      .eq("email_address", emailAddress)
      .limit(1);

    if (emailCheckError) {
      console.error(
        "EMAIL CHECK ERROR:",
        emailCheckError,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de vérifier la disponibilité de l'email.",
          code: "EMAIL_CHECK_ERROR",
          details:
            process.env.NODE_ENV === "development"
              ? emailCheckError.message
              : undefined,
        },
        { status: 500 },
      );
    }

    if (
      existingEmails &&
      existingEmails.length > 0
    ) {
      return NextResponse.json(
        {
          error:
            "Cette adresse email existe déjà.",
          code: "EMAIL_ALREADY_EXISTS",
        },
        { status: 409 },
      );
    }

    /*
     * =========================================================
     * CRÉATION DE LA COMMANDE
     * =========================================================
     *
     * On garde la table orders existante.
     *
     * Le montant reste informatif côté NOVA.
     * Le véritable prix facturé est celui du Price Stripe.
     */

    const amountByPlan: Record<string, number> = {
      essential: 9.9,
      business: 14.9,
      team: 129,
    };

    const amount =
      amountByPlan[plan];

    if (amount === undefined) {
      return NextResponse.json(
        {
          error: "Plan invalide.",
        },
        { status: 400 },
      );
    }

    const {
      data: order,
      error: insertError,
    } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        type: "email",
        plan,
        domain,
        email_prefix: emailPrefix,
        email_address: emailAddress,
        billing_period:
          planConfig.billingPeriod,
        amount,
        currency: "EUR",
        status: "pending",
      })
      .select()
      .single();

    if (insertError || !order) {
      console.error(
        "INSERT ORDER ERROR:",
        insertError,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de créer la commande.",
          code: "ORDER_CREATE_ERROR",
        },
        { status: 500 },
      );
    }

    /*
     * =========================================================
     * STRIPE
     * =========================================================
     */

    const stripe = getStripe();

    /*
     * =========================================================
     * CLIENT STRIPE
     * =========================================================
     *
     * On réutilise un customer existant si l'utilisateur
     * en possède déjà un.
     *
     * Stripe crée automatiquement le Customer nécessaire
     * à l'abonnement. customer_creation n'est donc pas utilisé
     * ici car cette option est réservée au mode payment.
     */

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      /*
       * IMPORTANT :
       * Ce n'est plus un paiement unique.
       * C'est un abonnement récurrent Stripe.
       */
      mode: "subscription",

      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],

      /*
       * Permet à Stripe de demander l'adresse de facturation.
       */
      billing_address_collection: "required",

      /*
       * Autorise les moyens de paiement enregistrés
       * à être utilisés pour les renouvellements.
       */
      payment_method_collection: "always",

      success_url:
        `${getSiteUrl()}/espace-client/emails/success?order=${order.id}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${getSiteUrl()}/espace-client/emails/acheter`,

      metadata: {
        order_id: order.id,
        type: "professional_email",
        user_id: user.id,
        domain,
        email_prefix: emailPrefix,
        email_address: emailAddress,
        plan,
        billing_period:
          planConfig.billingPeriod,
        amount: String(amount),
      },

      /*
       * Les metadata sont également copiées sur
       * l'abonnement Stripe.
       *
       * Cela permet au webhook de retrouver facilement
       * le compte NOVA lors des renouvellements.
       */
      subscription_data: {
        metadata: {
          order_id: order.id,
          type: "professional_email",
          user_id: user.id,
          domain,
          email_prefix: emailPrefix,
          email_address: emailAddress,
          plan,
          billing_period:
            planConfig.billingPeriod,
        },
      },
    });

    /*
     * =========================================================
     * ENREGISTREMENT SESSION STRIPE
     * =========================================================
     */

    const {
      error: stripeUpdateError,
    } = await supabaseAdmin
      .from("orders")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", order.id);

    if (stripeUpdateError) {
      console.error(
        "STRIPE SESSION UPDATE ERROR:",
        stripeUpdateError,
      );
    }

    /*
     * =========================================================
     * RÉPONSE
     * =========================================================
     */

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      orderId: order.id,
    });
  } catch (err) {
    console.error(
      "EMAIL CHECKOUT ERROR:",
      err,
    );

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Une erreur est survenue lors du paiement.",
      },
      { status: 500 },
    );
  }
}