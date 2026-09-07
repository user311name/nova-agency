import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // ========================================================
    // AUTHENTIFICATION
    // ========================================================

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("SUPABASE AUTH ERROR:", authError);

      return NextResponse.json(
        {
          error: "Impossible de vérifier votre session.",
          code: "AUTH_ERROR",
        },
        { status: 401 },
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "Vous devez être connecté.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    // ========================================================
    // RÉCUPÉRATION DES DOMAINES DU CLIENT
    // ========================================================

    const { data, error } = await supabaseAdmin
      .from("domains")
      .select(`
        id,
        domain,
        status,
        email,
        expires_at,
        user_id,
        created_at
      `)
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("SUPABASE DOMAINS ERROR:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return NextResponse.json(
        {
          error: "Impossible de récupérer les domaines.",
          code: "DOMAINS_FETCH_ERROR",
        },
        { status: 500 },
      );
    }

    // ========================================================
    // RÉPONSE
    // ========================================================

    return NextResponse.json(
      {
        domains: data ?? [],
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("CLIENT DOMAINS API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur.",
        code: "SERVER_ERROR",
      },
      { status: 500 },
    );
  }
}