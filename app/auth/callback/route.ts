import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");

  const next =
    url.searchParams.get("next") ||
    "/espace-client";

  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/connexion",
        url.origin,
      ),
    );
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL manquante.",
    );
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY manquante.",
    );
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              cookieStore.set(
                name,
                value,
                options,
              );
            },
          );
        },
      },
    },
  );

  const {
    error,
  } =
    await supabase.auth.exchangeCodeForSession(
      code,
    );

  if (error) {
    console.error(
      "SUPABASE AUTH CALLBACK ERROR:",
      error,
    );

    return NextResponse.redirect(
      new URL(
        "/connexion?error=auth",
        url.origin,
      ),
    );
  }

  const safeNext =
    next.startsWith("/") &&
    !next.startsWith("//")
      ? next
      : "/espace-client";

  return NextResponse.redirect(
    new URL(
      safeNext,
      url.origin,
    ),
  );
}