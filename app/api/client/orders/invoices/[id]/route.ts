import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 },
      );
    }

    const { data: invoice, error } = await supabaseAdmin
      .from("invoices")
      .select(
        "id, domain, amount, currency, status, email, stripe_session_id, created_at",
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !invoice) {
      return NextResponse.json(
        { error: "Facture introuvable." },
        { status: 404 },
      );
    }

    if (invoice.stripe_session_id) {
      const stripeUrl = `https://dashboard.stripe.com/invoices/${invoice.stripe_session_id}`;
      return NextResponse.redirect(stripeUrl, 302);
    }

    return NextResponse.json({
      id: invoice.id,
      domain: invoice.domain,
      amount: Number(invoice.amount) || 0,
      currency: invoice.currency || "EUR",
      status: invoice.status,
      email: invoice.email,
      stripe_session_id: invoice.stripe_session_id ?? null,
      created_at: invoice.created_at,
    });
  } catch (err) {
    console.error("INVOICE DETAIL ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}