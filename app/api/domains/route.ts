import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  request: NextRequest,
) {
  try {
    const email =
      request.nextUrl.searchParams.get(
        "email",
      )?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Adresse email manquante.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("domains")
      .select(
        `
          id,
          domain,
          status,
          email,
          expires_at,
          openprovider_id,
          created_at
        `,
      )
      .eq("email", email)
      .order(
        "created_at",
        {
          ascending: false,
        },
      );

    if (error) {
      console.error(
        "SUPABASE DOMAINS ERROR:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de récupérer les domaines.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      domains: data || [],
    });
  } catch (error) {
    console.error(
      "CLIENT DOMAINS API ERROR:",
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