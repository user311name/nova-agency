import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/\.$/, "");
}

function isValidDomain(domain: string) {
  if (!domain || domain.length > 253) {
    return false;
  }

  return /^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
    domain,
  );
}

// ========================================================
// GET — DOMAINES DU CLIENT
// ========================================================

export async function GET() {
  try {
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

    const { data, error } = await supabaseAdmin
      .from("domains")
      .select(
        `
          id,
          domain,
          status,
          email,
          expires_at,
          user_id,
          created_at
        `,
      )
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
    console.error("CLIENT DOMAINS GET ERROR:", error);

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

// ========================================================
// POST — AJOUTER UN DOMAINE EXISTANT
// ========================================================

export async function POST(request: Request) {
  try {
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

    let body: { domain?: string };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Données invalides.",
          code: "INVALID_BODY",
        },
        { status: 400 },
      );
    }

    const domain = normalizeDomain(String(body.domain || ""));

    if (!domain) {
      return NextResponse.json(
        {
          error: "Veuillez saisir un nom de domaine.",
          code: "DOMAIN_REQUIRED",
        },
        { status: 400 },
      );
    }

    if (!isValidDomain(domain)) {
      return NextResponse.json(
        {
          error:
            "Le nom de domaine n'est pas valide. Exemple : agency-nova.fr",
          code: "INVALID_DOMAIN",
        },
        { status: 400 },
      );
    }

    const { data: existingDomain, error: existingError } =
      await supabaseAdmin
        .from("domains")
        .select("id, user_id, domain")
        .ilike("domain", domain)
        .maybeSingle();

    if (existingError) {
      console.error("DOMAIN EXISTENCE CHECK ERROR:", {
        message: existingError.message,
        details: existingError.details,
        hint: existingError.hint,
        code: existingError.code,
      });

      return NextResponse.json(
        {
          error:
            "Impossible de vérifier si ce domaine existe déjà.",
          code: "DOMAIN_CHECK_ERROR",
        },
        { status: 500 },
      );
    }

    if (existingDomain) {
      if (existingDomain.user_id === user.id) {
        return NextResponse.json(
          {
            error:
              "Ce domaine est déjà présent dans votre espace client.",
            code: "DOMAIN_ALREADY_YOURS",
          },
          { status: 409 },
        );
      }

      return NextResponse.json(
        {
          error:
            "Ce domaine est déjà associé à un autre compte.",
          code: "DOMAIN_ALREADY_USED",
        },
        { status: 409 },
      );
    }

    const { data: insertedDomain, error: insertError } =
      await supabaseAdmin
        .from("domains")
        .insert({
          domain,
          user_id: user.id,
          status: "active",
        })
        .select(
          `
            id,
            domain,
            status,
            email,
            expires_at,
            user_id,
            created_at
          `,
        )
        .single();

    if (insertError) {
      console.error("SUPABASE DOMAIN INSERT ERROR:", {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code,
      });

      return NextResponse.json(
        {
          error:
            "Impossible d'ajouter ce domaine à votre espace client.",
          code: "DOMAIN_INSERT_ERROR",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        domain: insertedDomain,
        message: "Domaine ajouté à votre espace client.",
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("CLIENT DOMAINS POST ERROR:", error);

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
