import { NextRequest, NextResponse } from "next/server";
import { checkDomain } from "@/lib/openprovider";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const domain = String(body.domain || "")
      .trim()
      .toLowerCase();

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
        resellerPrice: result.resellerPrice,
        currency: result.currency,
        premium: result.premium,
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

    const novaPrice =
      result.resellerPrice + 5;

    return NextResponse.json({
      success: true,
      available: true,
      domain: result.domain,
      resellerPrice: result.resellerPrice,
      currency: result.currency,
      price: Number(
        novaPrice.toFixed(2),
      ),
      premium: result.premium,
      status: result.status,
    });
  } catch (error) {
    console.error(
      "DOMAIN SEARCH ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la recherche du domaine.",
      },
      { status: 500 },
    );
  }
}