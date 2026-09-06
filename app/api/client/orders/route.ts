import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams
      .get("email")
      ?.trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Adresse email manquante." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("domains")
      .select(`
        id,
        domain,
        amount,
        currency,
        status,
        email,
        stripe_session_id,
        created_at
      `)
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SUPABASE ORDERS ERROR:", error);

      return NextResponse.json(
        {
          error: "Impossible de récupérer les commandes.",
        },
        { status: 500 }
      );
    }

    const orders = (data || []).map((order) => ({
      id: order.id,
      domain: order.domain,
      amount: Number(order.amount || 0),
      currency: order.currency || "EUR",
      status:
        order.status === "active"
          ? "paid"
          : order.status === "pending"
            ? "pending"
            : order.status === "failed"
              ? "failed"
              : "paid",
      email: order.email,
      stripe_session_id: order.stripe_session_id,
      created_at: order.created_at,
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("CLIENT ORDERS API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}