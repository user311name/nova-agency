import { NextResponse } from "next/server";

/*
==========================================================
CONFIGURATION
==========================================================
*/

const FORMSPREE_ENDPOINT =
  "https://formspree.io/f/mgawenka";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
==========================================================
ANTI-SPAM — RATE LIMIT
==========================================================

Limite le nombre de demandes provenant d'une même IP.

3 demandes maximum toutes les 10 minutes.
*/

const rateLimit = new Map<
  string,
  {
    count: number;
    firstRequest: number;
  }
>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000;

/*
==========================================================
NETTOYAGE
==========================================================
*/

function clean(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

/*
==========================================================
POST
==========================================================
*/

export async function POST(request: Request) {
  try {
    /*
    ------------------------------------------------------
    1. PROTECTION TAILLE DE REQUÊTE
    ------------------------------------------------------
    */

    const contentLength =
      request.headers.get("content-length");

    if (
      contentLength &&
      Number(contentLength) > 30000
    ) {
      return NextResponse.json(
        {
          error: "Requête trop volumineuse.",
        },
        {
          status: 413,
        }
      );
    }

    /*
    ------------------------------------------------------
    2. IDENTIFICATION IP
    ------------------------------------------------------
    */

    const forwardedFor =
      request.headers.get("x-forwarded-for");

    const realIp =
      request.headers.get("x-real-ip");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      realIp ||
      "unknown";

    /*
    ------------------------------------------------------
    3. RATE LIMIT
    ------------------------------------------------------
    */

    const now = Date.now();

    const existing = rateLimit.get(ip);

    if (!existing) {
      rateLimit.set(ip, {
        count: 1,
        firstRequest: now,
      });
    } else {
      const elapsed =
        now - existing.firstRequest;

      /*
      Nouvelle fenêtre de 10 minutes
      */

      if (elapsed >= WINDOW_MS) {
        rateLimit.set(ip, {
          count: 1,
          firstRequest: now,
        });
      } else {
        /*
        Trop de demandes
        */

        if (
          existing.count >= MAX_REQUESTS
        ) {
          return NextResponse.json(
            {
              error:
                "Trop de demandes. Veuillez patienter quelques minutes avant de réessayer.",
            },
            {
              status: 429,
              headers: {
                "Retry-After": "600",
              },
            }
          );
        }

        existing.count += 1;
      }
    }

    /*
    ------------------------------------------------------
    4. LECTURE JSON
    ------------------------------------------------------
    */

    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const website = clean(body.website);

    const startedAt = Number(
      body.startedAt || 0
    );

    /*
    ------------------------------------------------------
    5. HONEYPOT
    ------------------------------------------------------

    Si un bot remplit le champ invisible,
    on ne lui renvoie pas d'erreur.

    On fait semblant que tout s'est bien passé.
    */

    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    /*
    ------------------------------------------------------
    6. TEMPS MINIMUM
    ------------------------------------------------------

    Minimum 2,5 secondes avant l'envoi.
    */

    if (
      !startedAt ||
      !Number.isFinite(startedAt)
    ) {
      return NextResponse.json(
        {
          error:
            "Formulaire invalide.",
        },
        {
          status: 400,
        }
      );
    }

    const formTime =
      Date.now() - startedAt;

    if (formTime < 2500) {
      return NextResponse.json(
        {
          error:
            "Veuillez prendre quelques secondes pour remplir le formulaire.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ------------------------------------------------------
    7. CHAMPS OBLIGATOIRES
    ------------------------------------------------------
    */

    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        {
          error:
            "Tous les champs obligatoires doivent être remplis.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ------------------------------------------------------
    8. EMAIL
    ------------------------------------------------------
    */

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error:
            "Adresse e-mail invalide.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ------------------------------------------------------
    9. LIMITES
    ------------------------------------------------------
    */

    if (name.length > 120) {
      return NextResponse.json(
        {
          error:
            "Nom trop long.",
        },
        {
          status: 400,
        }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          error:
            "Adresse e-mail trop longue.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 15000) {
      return NextResponse.json(
        {
          error:
            "Message trop long.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ------------------------------------------------------
    10. ENVOI VERS FORMSPREE
    ------------------------------------------------------
    */

    const formData = new FormData();

    formData.append(
      "_subject",
      "Nouvelle demande de devis — NOVA Agency"
    );

    formData.append(
      "_replyto",
      email
    );

    formData.append(
      "email",
      email
    );

    formData.append(
      "message",
      message
    );

    /*
    ------------------------------------------------------
    11. APPEL FORMSPREE
    ------------------------------------------------------
    */

    const response = await fetch(
      FORMSPREE_ENDPOINT,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept:
            "application/json",
        },
        cache: "no-store",
      }
    );

    /*
    ------------------------------------------------------
    12. ERREUR FORMSPREE
    ------------------------------------------------------
    */

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Impossible d'envoyer la demande pour le moment.",
        },
        {
          status: 502,
        }
      );
    }

    /*
    ------------------------------------------------------
    13. SUCCÈS
    ------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        message:
          "Votre demande a bien été envoyée.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch {
    /*
    ------------------------------------------------------
    ERREUR GÉNÉRALE
    ------------------------------------------------------
    */

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue. Veuillez réessayer.",
      },
      {
        status: 400,
      }
    );
  }
}