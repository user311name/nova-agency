import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DatabaseStatus =
  | "active"
  | "failed"
  | "pending"
  | "processing"
  | "unavailable"
  | string;

type OrderStatus =
  | "paid"
  | "pending"
  | "failed"
  | "refunded";

function mapStatus(status: DatabaseStatus): OrderStatus {
  switch (status) {
    case "active":
      return "paid";

    case "failed":
      return "failed";

    case "pending":
    case "processing":
    case "unavailable":
    default:
      return "pending";
  }
}

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return null;
  }

  return new Stripe(secretKey);
}

export async function GET(
  _request: NextRequest,
) {
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
          error: "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    /*
     * ========================================================
     * RÉCUPÉRATION DES DOMAINES / COMMANDES
     *
     * La table domains contient les informations liées
     * aux achats de domaines.
     *
     * On ne demande volontairement PAS amount/currency ici :
     * ces colonnes ne sont pas présentes dans la table.
     * ========================================================
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
        "SUPABASE ORDERS ERROR:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de récupérer vos commandes.",
        },
        { status: 500 },
      );
    }

    /*
     * ========================================================
     * STRIPE
     *
     * Le montant réel du paiement vient de Stripe.
     * On utilise stripe_session_id enregistré avec le domaine.
     * ========================================================
     */

    const stripe = getStripeClient();

    const orders = await Promise.all(
      (data || []).map(
        async (order) => {
          let amount = 0;
          let currency = "EUR";

          if (
            stripe &&
            order.stripe_session_id
          ) {
            try {
              const session =
                await stripe.checkout.sessions.retrieve(
                  order.stripe_session_id,
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
                "STRIPE ORDER ERROR:",
                {
                  sessionId:
                    order.stripe_session_id,
                  error: stripeError,
                },
              );
            }
          }

          return {
            id: order.id,

            domain: order.domain,

            amount,

            currency,

            status: mapStatus(
              order.status,
            ),

            email: order.email,

            stripe_session_id:
              order.stripe_session_id,

            created_at:
              order.created_at,
          };
        },
      ),
    );

    /*
     * ========================================================
     * RÉPONSE
     * ========================================================
     */

    return NextResponse.json(
      {
        orders,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "CLIENT ORDERS API ERROR:",
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