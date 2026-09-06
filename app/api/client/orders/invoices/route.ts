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
        {
          error: "Adresse email manquante.",
        },
        {
          status: 400,
        }
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
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "SUPABASE INVOICES ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Impossible de récupérer les factures.",
        },
        {
          status: 500,
        }
      );
    }

    const invoices = (data || []).map((invoice) => ({
      id: invoice.id,
      domain: invoice.domain,
      amount: Number(invoice.amount || 0),
      currency: invoice.currency || "EUR",
      status:
        invoice.status === "active"
          ? "paid"
          : invoice.status === "pending"
            ? "pending"
            : invoice.status === "failed"
              ? "failed"
              : "paid",
      email: invoice.email,
      stripe_session_id:
        invoice.stripe_session_id,
      created_at: invoice.created_at,
    }));

    return NextResponse.json({
      invoices,
    });
  } catch (error) {
    console.error(
      "CLIENT INVOICES API ERROR:",
      error
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
      }
    );
  }
}