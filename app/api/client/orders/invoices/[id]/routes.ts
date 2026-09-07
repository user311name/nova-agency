import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY est manquante.");
  }

  return new Stripe(secretKey);
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    /* =========================================================
       1. AUTHENTIFICATION
    ========================================================= */

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        {
          status: 401,
        },
      );
    }

    /* =========================================================
       2. RÉCUPÉRATION DE L'ID
    ========================================================= */

    const { id } = await context.params;

    if (!id || !id.trim()) {
      return NextResponse.json(
        {
          error: "Identifiant de facture invalide.",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================================================
       3. VÉRIFICATION QUE LA FACTURE APPARTIENT AU CLIENT
    ========================================================= */

    const { data: order, error: orderError } = await supabaseAdmin
      .from("domains")
      .select(`
        id,
        domain,
        status,
        email,
        stripe_session_id,
        user_id,
        created_at
      `)
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (orderError) {
      console.error(
        "SUPABASE INVOICE DOWNLOAD ERROR:",
        orderError,
      );

      return NextResponse.json(
        {
          error: "Impossible de récupérer cette facture.",
        },
        {
          status: 500,
        },
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          error: "Facture introuvable.",
        },
        {
          status: 404,
        },
      );
    }

    if (!order.stripe_session_id) {
      return NextResponse.json(
        {
          error:
            "Aucun paiement Stripe associé à cette facture.",
        },
        {
          status: 404,
        },
      );
    }

    /* =========================================================
       4. ON NE PERMET LE TÉLÉCHARGEMENT QUE POUR UNE COMMANDE
          PAYÉE / ACTIVE
    ========================================================= */

    if (order.status !== "active") {
      return NextResponse.json(
        {
          error:
            "Cette facture n'est pas encore disponible car le paiement n'est pas confirmé.",
        },
        {
          status: 409,
        },
      );
    }

    /* =========================================================
       5. STRIPE
    ========================================================= */

    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.retrieve(
      order.stripe_session_id,
    );

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        {
          error:
            "Le paiement associé à cette facture n'est pas confirmé.",
        },
        {
          status: 409,
        },
      );
    }

    /* =========================================================
       6. SI STRIPE A UNE VRAIE FACTURE
          → ON UTILISE DIRECTEMENT SON PDF
    ========================================================= */

    if (session.invoice) {
      const invoiceId =
        typeof session.invoice === "string"
          ? session.invoice
          : session.invoice.id;

      try {
        const invoice =
          await stripe.invoices.retrieve(invoiceId);

        if (invoice.invoice_pdf) {
          return NextResponse.redirect(
            invoice.invoice_pdf,
          );
        }

        if (invoice.hosted_invoice_url) {
          return NextResponse.redirect(
            invoice.hosted_invoice_url,
          );
        }
      } catch (invoiceError) {
        console.error(
          "STRIPE INVOICE RETRIEVE ERROR:",
          invoiceError,
        );
      }
    }

    /* =========================================================
       7. SINON → ON CHERCHE LE REÇU DU PAIEMENT
          Stripe fournit alors un reçu officiel
    ========================================================= */

    if (!session.payment_intent) {
      return NextResponse.json(
        {
          error:
            "Aucun paiement Stripe exploitable n'a été trouvé.",
        },
        {
          status: 404,
        },
      );
    }

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent.id;

    const paymentIntent =
      await stripe.paymentIntents.retrieve(
        paymentIntentId,
      );

    const latestCharge =
      typeof paymentIntent.latest_charge === "string"
        ? await stripe.charges.retrieve(
            paymentIntent.latest_charge,
          )
        : paymentIntent.latest_charge;

    if (latestCharge?.receipt_url) {
      return NextResponse.redirect(
        latestCharge.receipt_url,
      );
    }

    /* =========================================================
       8. AUCUN DOCUMENT DISPONIBLE
    ========================================================= */

    return NextResponse.json(
      {
        error:
          "Le justificatif Stripe n'est pas encore disponible pour cette commande.",
      },
      {
        status: 404,
      },
    );
  } catch (error) {
    console.error(
      "CLIENT INVOICE DOWNLOAD ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur.",
      },
      {
        status: 500,
      },
    );
  }
}