import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function POST(request: Request) {
  try {
    // =========================================================
    // VÉRIFICATION DE LA CLÉ RESEND
    // =========================================================

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY manquante.");

      return NextResponse.json(
        {
          error: "Le service d'envoi n'est pas configuré.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    // =========================================================
    // RÉCUPÉRATION DES DONNÉES
    // =========================================================

    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const website = clean(body.website);

    // =========================================================
    // HONEYPOT ANTI-BOT
    // =========================================================

    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    // =========================================================
    // VALIDATION
    // =========================================================

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Tous les champs obligatoires doivent être remplis.",
        },
        {
          status: 400,
        }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Adresse e-mail invalide.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================================================
    // LIMITES
    // =========================================================

    if (name.length > 100) {
      return NextResponse.json(
        {
          error: "Nom trop long.",
        },
        {
          status: 400,
        }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          error: "Adresse e-mail trop longue.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 20000) {
      return NextResponse.json(
        {
          error: "Message trop long.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================================================
    // EMAIL DE RÉCEPTION
    // =========================================================

    const contactEmail = clean(
      process.env.CONTACT_EMAIL
    );

    if (!contactEmail) {
      console.error("CONTACT_EMAIL manquante.");

      return NextResponse.json(
        {
          error: "L'adresse de réception n'est pas configurée.",
        },
        {
          status: 500,
        }
      );
    }

    if (!emailRegex.test(contactEmail)) {
      console.error(
        "CONTACT_EMAIL invalide :",
        contactEmail
      );

      return NextResponse.json(
        {
          error:
            "L'adresse de réception configurée est invalide.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // ENVOI RESEND
    // =========================================================

    const { data, error } = await resend.emails.send({
      // =======================================================
      // ADRESSE PROFESSIONNELLE NOVA
      // =======================================================

      from: "NOVA Agency <contact@agency-nova.fr>",

      // =======================================================
      // BOÎTE QUI REÇOIT LES DEMANDES
      // =======================================================

      to: [contactEmail],

      // =======================================================
      // QUAND TU CLIQUES SUR "RÉPONDRE"
      // LA RÉPONSE PART DIRECTEMENT AU CLIENT
      // =======================================================

      replyTo: email,

      subject: `Nouvelle demande de devis — ${name}`,

      text: `
NOUVELLE DEMANDE DE DEVIS — NOVA AGENCY

━━━━━━━━━━━━━━━━━━━━

Nom :
${name}

Email :
${email}

━━━━━━━━━━━━━━━━━━━━

MESSAGE :

${message}

━━━━━━━━━━━━━━━━━━━━

FIN DE LA DEMANDE
      `.trim(),
    });

    // =========================================================
    // ERREUR RESEND
    // =========================================================

    if (error) {
      console.error(
        "ERREUR RESEND :",
        JSON.stringify(error, null, 2)
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "Resend n'a pas pu envoyer le message.",
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // SUCCÈS
    // =========================================================

    console.log(
      "Email envoyé avec succès :",
      data?.id
    );

    return NextResponse.json({
      success: true,
      id: data?.id,
    });

  } catch (error) {
    console.error(
      "ERREUR API CONTACT :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi.",
      },
      {
        status: 500,
      }
    );
  }
}