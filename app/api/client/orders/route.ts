import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DatabaseStatus =
  | "active"
  | "failed"
  | "pending"
  | "processing"
  | "unavailable"
  | string;

function mapStatus(
  status: DatabaseStatus,
) {
  switch (status) {
    case "active":
      return "paid";

    case "pending":
      return "pending";

    case "failed":
      return "failed";

    default:
      return "pending";
  }
}

export async function GET(
  _request: NextRequest,
) {
  try {
    /*
     * ========================================================
     * AUTH
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
     * COMMANDES DU CLIENT
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
        amount,
        currency,
        status,
        email,
        stripe_session_id,
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
        "SUPABASE ORDERS ERROR:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Impossible de récupérer vos commandes.",
        },
        { status: 500 },
      );
    }

    const orders = (data || []).map(
      (order) => ({
        id: order.id,

        domain: order.domain,

        amount: Number(
          order.amount || 0,
        ),

        currency:
          order.currency || "EUR",

        status: mapStatus(
          order.status,
        ),

        email: order.email,

        stripe_session_id:
          order.stripe_session_id,

        created_at:
          order.created_at,
      }),
    );

    return NextResponse.json({
      orders,
    });
  } catch (error) {
    console.error(
      "CLIENT ORDERS API ERROR:",
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