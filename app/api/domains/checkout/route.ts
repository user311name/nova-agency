import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { checkDomain } from "@/lib/openprovider";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY manquante.");
  }

  return new Stripe(secretKey);
}

export async function POST(request: NextRequest) {
  try {
    /*
     * ========================================================
     * AUTHENTIFICATION
     * ========================================================
     */

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Vous devez être connecté pour acheter un domaine.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    /*
     * ========================================================
     * DOMAIN
     * ========================================================
     */

    const body = await request.json();

    const domain = String(body.domain || "")
      .trim()
      .toLowerCase();

    if (!domain) {
      return NextResponse.json(
        {
          error: "Nom de domaine obligatoire.",
        },
        { status: 400 },
      );
    }

    /*
     * ========================================================
     * VERIFICATION OPENPROVIDER
     * ========================================================
     */

    const result = await checkDomain(domain);

    if (!result.available) {
      return NextResponse.json(
        {
          error: "Ce domaine n'est plus disponible.",
        },
        { status: 409 },
      );
    }

    if (result.resellerPrice === null) {
      return NextResponse.json(
        {
          error: "Prix fournisseur indisponible.",
        },
        { status: 502 },
      );
    }

    /*
     * ========================================================
     * PRIX NOVA
     * ========================================================
     */

    const novaPrice = Number(
      (result.resellerPrice + 5).toFixed(2),
    );

    const amount = Math.round(novaPrice * 100);

    /*
     * ========================================================
     * SITE
     * ========================================================
     */

    const site =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    /*
     * ========================================================
     * STRIPE
     * ========================================================
     */

    const stripe = getStripe();

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: [
          {
            quantity: 1,

            price_data: {
              currency:
                result.currency.toLowerCase(),

              unit_amount: amount,

              product_data: {
                name: `Domaine ${domain}`,

                description:
                  "Enregistrement de domaine NOVA",
              },
            },
          },
        ],

        billing_address_collection:
          "required",

        phone_number_collection: {
          enabled: true,
        },

        /*
         * ====================================================
         * IMPORTANT
         * L'utilisateur Supabase est maintenant attaché
         * à la session Stripe.
         * ====================================================
         */

        metadata: {
          product: "domain_registration",
          domain,
          user_id: user.id,
        },

        /*
         * L'email du compte est également conservé
         * comme référence secondaire.
         */

        customer_email:
          user.email || undefined,

        success_url:
          `${site}/domaines/succes?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${site}/domaines`,
      });

    /*
     * ========================================================
     * REPONSE
     * ========================================================
     */

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(
      "DOMAIN_CHECKOUT_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de créer le paiement.",
      },
      { status: 500 },
    );
  }
}