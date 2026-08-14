import { NextResponse } from "next/server";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const website = clean(body.website);

    // Honeypot anti-spam
    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Tous les champs obligatoires doivent être remplis.",
        },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Adresse email invalide.",
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          error: "Nom trop long.",
        },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          error: "Adresse email trop longue.",
        },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          error: "Message trop long.",
        },
        { status: 400 }
      );
    }

    /*
      Ici tu branches ton service d'envoi d'email
      (Resend, Brevo, etc.).

      Les clés doivent rester côté serveur.
    */

    return NextResponse.json({
      success: true,
      message: "Message reçu.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur est survenue.",
      },
      { status: 400 }
    );
  }
}