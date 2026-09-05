import { NextRequest, NextResponse } from "next/server";
import { checkDomain } from "@/lib/openprovider";

export async function GET(request: NextRequest) {
  try {
    const domain =
      request.nextUrl.searchParams.get("domain");

    if (!domain) {
      return NextResponse.json(
        {
          error: "Nom de domaine manquant.",
        },
        { status: 400 },
      );
    }

    const result = await checkDomain(domain);

    if (!result.available) {
      return NextResponse.json({
        success: true,
        available: false,
        domain: result.domain,
        status: result.status,
      });
    }

    if (result.resellerPrice === null) {
      return NextResponse.json(
        {
          error: "Prix fournisseur indisponible.",
        },
        { status: 502 },
      );
    }

    // Marge fixe Nova sur les domaines : +5 €
    const novaPrice =
      result.resellerPrice + 5;

    return NextResponse.json({
      success: true,
      available: true,
      domain: result.domain,
      currency: result.currency,
      price: Number(
        novaPrice.toFixed(2),
      ),
      premium: result.premium,
    });
  } catch (error) {
    console.error(
      "DOMAIN SEARCH ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la recherche du domaine.",
      },
      { status: 500 },
    );
  }
}