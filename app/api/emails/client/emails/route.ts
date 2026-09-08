import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

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

    const { data, error } = await supabase
      .from("emails")
      .select(
        `
        id,
        user_id,
        domain,
        email_prefix,
        email_address,
        plan,
        billing_period,
        amount,
        currency,
        status,
        stripe_session_id,
        provider_id,
        created_at,
        updated_at
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("CLIENT EMAILS FETCH ERROR:", error);
      return NextResponse.json(
        {
          error: "Impossible de récupérer vos emails.",
          code: "EMAILS_FETCH_ERROR",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { emails: data ?? [] },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (err) {
    console.error("CLIENT EMAILS API ERROR:", err);
    return NextResponse.json(
      {
        error: "Erreur serveur.",
        code: "SERVER_ERROR",
      },
      { status: 500 },
    );
  }
}