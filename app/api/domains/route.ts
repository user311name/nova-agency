import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
     * DOMAINES DU COMPTE
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
        expires_at,
        openprovider_id,
        stripe_session_id,
        amount,
        currency,
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
        "SUPABASE DOMAINS ERROR:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de récupérer les domaines.",
        },
        { status: 500 },
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
      { status: 500 },
    );
  }
}