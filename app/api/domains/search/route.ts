import { NextRequest, NextResponse } from "next/server";
import { checkDomain } from "@/lib/openprovider";

export async function GET(request: NextRequest) {
  try {
    const domain = request.nextUrl.searchParams
      .get("domain")
      ?.trim()
      .toLowerCase();

    if (!domain) {
      return NextResponse.json(
        {
          success: false,
          error: "Nom de domaine manquant.",
        },
        { status: 400 }
      );
    }

    const result = await checkDomain(domain);

    if (!result.available) {
      return NextResponse.json({
        success: true,
        available: false,
        domain: result.domain,
        resellerPrice: result.resellerPrice,
        currency: result.currency,
        premium: result.premium,
        status: result.status,
        results: [
          {
            domain: result.domain,
            available: false,
            price: result.resellerPrice,
            currency: result.currency,
            premium: result.premium,
            status: result.status,
          },
        ],
      });
    }

    if (result.resellerPrice === null) {
      return NextResponse.json(
        {
          success: false,
          error: "Prix fournisseur indisponible.",
        },
        { status: 502 }
      );
    }

    const novaPrice = result.resellerPrice + 5;

    return NextResponse.json({
      success: true,
      available: true,
      domain: result.domain,
      resellerPrice: result.resellerPrice,
      currency: result.currency,
      price: Number(novaPrice.toFixed(2)),
      premium: result.premium,
      status: result.status,
      results: [
        {
          domain: result.domain,
          available: true,
          price: Number(novaPrice.toFixed(2)),
          currency: result.currency,
          premium: result.premium,
          status: result.status,
        },
      ],
    });
  } catch (error) {
    console.error("DOMAIN SEARCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la recherche du domaine.",
      },
      { status: 500 }
    );
  }
}