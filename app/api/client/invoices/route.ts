import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InvoiceRow = {
  id: string;
  domain: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  email: string;
  stripe_session_id?: string | null;
  created_at: string;
};

function mapStatus(status: string | null | undefined): InvoiceRow["status"] {
  switch (String(status || "").toLowerCase()) {
    case "active":
      return "paid";
    case "failed":
      return "failed";
    case "pending":
    case "processing":
    case "unavailable":
    default:
      return "pending";
  }
}

async function fetchFromTable(
  tableName: string,
  userId: string,
): Promise<InvoiceRow[]> {
  const { data, error } = await supabaseAdmin
    .from(tableName)
    .select(
      tableName === "invoices"
        ? "id, domain, amount, currency, status, email, stripe_session_id, created_at"
        : "id, domain, status, email, stripe_session_id, created_at",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    // Si la table n'existe pas, on renvoie un tableau vide
    // pour que le caller puisse tenter le fallback.
    if (error.code === "42P01") {
      return [];
    }
    throw error;
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    domain: row.domain,
    amount: Number(row.amount) || 0,
    currency: row.currency || "EUR",
    status: mapStatus(row.status),
    email: row.email,
    stripe_session_id: row.stripe_session_id ?? null,
    created_at: row.created_at,
  }));
}

export async function GET() {
  try {
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

    // Essayez d'abord la table "invoices", sinon "domains"
    let invoices: InvoiceRow[] = [];
    try {
      invoices = await fetchFromTable("invoices", user.id);
    } catch (err) {
      console.error("INVOICES FETCH ERROR:", err);
    }

    if (invoices.length === 0) {
      try {
        invoices = await fetchFromTable("domains", user.id);
      } catch (err) {
        console.error("DOMAINS FALLBACK ERROR:", err);
        return NextResponse.json(
          { error: "Impossible de récupérer les factures." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ invoices });
  } catch (err) {
    console.error("INVOICES ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}