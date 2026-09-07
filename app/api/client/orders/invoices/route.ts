import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DatabaseStatus = string;

type InvoiceStatus =
  | "paid"
  | "pending"
  | "failed"
  | "refunded";

function mapStatus(
  status: DatabaseStatus,
): InvoiceStatus {
  switch (status) {
    case "active":
      return "paid";

    case "failed":
      return "failed";

    case "pending":
    case "processing":
    case "unavailable":
      return "pending";

    default:
      return "pending";
  }
}

function getStripeClient() {
  const secretKey =
    process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return null;
  }

  return new Stripe(secretKey);
}

export async function GET() {
  try {
    /*
     * ========================================================
     * AUTHENTIFICATION
     * ========================================================
     */

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error:
            "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    /*
     * ========================================================
     * RECUPERATION DES COMMANDES DU CLIENT
     * ========================================================
     *
     * IMPORTANT :
     * On filtre uniquement avec user_id.
     *
     * Le client ne peut donc jamais demander
     * les factures d'un autre utilisateur.
     */

    const {
      data,
      error,
    } = await supabaseAdmin
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
      .eq("user_id", user.id)
      .order(
        "created_at",
        {
          ascending: false,
        },
      );

    if (error) {
      console.error(
        "SUPABASE INVOICES ERROR:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de récupérer vos factures.",
        },
        { status: 500 },
      );
    }

    /*
     * ========================================================
     * STRIPE
     * ========================================================
     */

    const stripe = getStripeClient();

    /*
     * ========================================================
     * CONSTRUCTION DES FACTURES
     * ========================================================
     */

    const invoices = await Promise.all(
      (data || []).map(
        async (invoice) => {
          let amount = 0;
          let currency = "EUR";

          /*
           * On récupère le montant réel
           * depuis Stripe.
           */

          if (
            stripe &&
            invoice.stripe_session_id
          ) {
            try {
              const session =
                await stripe.checkout.sessions.retrieve(
                  invoice.stripe_session_id,
                );

              if (
                typeof session.amount_total ===
                "number"
              ) {
                amount =
                  session.amount_total / 100;
              }

              if (
                typeof session.currency ===
                  "string" &&
                session.currency.trim() !== ""
              ) {
                currency =
                  session.currency.toUpperCase();
              }
            } catch (stripeError) {
              console.error(
                "STRIPE INVOICE ERROR:",
                {
                  sessionId:
                    invoice.stripe_session_id,
                  error: stripeError,
                },
              );
            }
          }

          return {
            id: invoice.id,

            domain:
              invoice.domain,

            amount,

            currency,

            status: mapStatus(
              invoice.status,
            ),

            email:
              invoice.email,

            stripe_session_id:
              invoice.stripe_session_id,

            created_at:
              invoice.created_at,
          };
        },
      ),
    );

    /*
     * ========================================================
     * REPONSE
     * ========================================================
     */

    return NextResponse.json(
      {
        invoices,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "CLIENT INVOICES API ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur.",
      },
      { status: 500 },
    );
  }
}