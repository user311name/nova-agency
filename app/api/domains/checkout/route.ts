import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { checkDomain } from "@/lib/openprovider";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
);

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const domain = String(body.domain || "")
      .trim()
      .toLowerCase();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    if (!domain || !email) {
      return NextResponse.json(
        {
          error: "Domaine et email obligatoires.",
        },
        { status: 400 },
      );
    }

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

    // Prix Nova = prix fournisseur + 5 €
    const novaPrice =
      result.resellerPrice + 5;

    const amount = Math.round(
      novaPrice * 100,
    );

    const site =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email: email,

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
                  "Enregistrement de domaine Nova",
              },
            },
          },
        ],

        billing_address_collection:
          "required",

        phone_number_collection: {
          enabled: true,
        },

        metadata: {
          product: "domain_registration",
          domain,
        },

        success_url:
          `${site}/domaines/succes?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${site}/domaines`,
      });

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