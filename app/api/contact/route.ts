import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function display(value: string): string {
  return value || "Non renseigné";
}

function displayList(values: string[]): string {
  return values.length > 0 ? values.join(", ") : "Non renseigné";
}

export async function POST(request: Request) {
  try {
    // =========================================================
    // CONFIGURATION RESEND
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

    const contactEmail = clean(process.env.CONTACT_EMAIL);

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
      console.error("CONTACT_EMAIL invalide :", contactEmail);

      return NextResponse.json(
        {
          error: "L'adresse de réception configurée est invalide.",
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

    const project = cleanList(body.project);
    const needs = cleanList(body.needs);
    const style = cleanList(body.style);
    const budget = clean(body.budget);
    const launchDate = clean(body.launchDate);
    const company = clean(body.company);
    const phone = clean(body.phone);

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
          error:
            "Tous les champs obligatoires doivent être remplis.",
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
    // LIMITES DE SÉCURITÉ
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

    if (message.length > 30000) {
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
    // PROMPT IA
    // =========================================================

    const aiPrompt = `
Tu es un expert senior en conception, UX/UI,
développement web et création de sites internet
professionnels.

Tu travailles pour une agence digitale appelée
NOVA Agency.

Ta mission est de créer une PREMIÈRE BASE
COMPLÈTE d'un site internet à partir du brief
client fourni ci-dessous.

OBJECTIF

Créer une première version professionnelle,
moderne, cohérente et responsive du site.

Le site doit être pensé comme un véritable
projet client et non comme une simple
démonstration technique.

RÈGLES IMPORTANTES

1. Respecte précisément les informations fournies.
2. Respecte le type de site demandé.
3. Respecte le style visuel demandé.
4. Respecte les fonctionnalités demandées.
5. Respecte les langues demandées.
6. Prévois un responsive complet.
7. Le design doit être professionnel.
8. L'expérience utilisateur doit être claire.
9. La navigation doit être simple et intuitive.
10. N'invente jamais de coordonnées,
    prix, statistiques ou témoignages.
11. Lorsque des informations manquent,
    utilise des placeholders clairement identifiés.
12. Le code doit être propre, organisé et lisible.

TECHNOLOGIES

Utilise de préférence :

- Next.js
- React
- TypeScript
- CSS

RESPONSIVE

Le site doit fonctionner sur :

- ordinateur
- tablette
- téléphone

Aucun élément ne doit provoquer
de débordement horizontal sur mobile.

LIVRABLE

Commence par analyser le brief.

Ensuite :

1. Résume le projet.
2. Définis la structure du site.
3. Définis les pages nécessaires.
4. Définis la direction visuelle.
5. Définis les fonctionnalités.
6. Génère ensuite le code nécessaire.

Lorsque tu fournis du code :

- donne les fichiers complets
- indique le chemin de chaque fichier
- ne donne pas uniquement des extraits
- assure-toi que les fichiers sont cohérents

IMPORTANT

Cette génération constitue uniquement une
PREMIÈRE BASE DE TRAVAIL.

L'équipe NOVA Agency reprendra ensuite le projet
afin de vérifier, corriger, personnaliser,
tester et améliorer le résultat.

==================================================
BRIEF COMPLET DU CLIENT
==================================================

Nom : ${display(name)}
Entreprise : ${display(company)}
Email : ${display(email)}
Téléphone : ${display(phone)}

Type de projet :
${displayList(project)}

Besoins :
${displayList(needs)}

Style :
${displayList(style)}

Budget :
${display(budget)}

Date souhaitée :
${display(launchDate)}

Message / brief :
${display(message)}

==================================================
FIN DU BRIEF
==================================================

Analyse maintenant le brief et commence par
définir précisément la structure du projet.
`.trim();

    // =========================================================
    // EMAIL PROPRE
    // =========================================================

    const emailText = `
NOVA AGENCY
NOUVELLE DEMANDE DE DEVIS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
01 — INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom
${display(name)}

Entreprise
${display(company)}

Email
${display(email)}

Téléphone
${display(phone)}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
02 — PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type de projet
${displayList(project)}

Besoins
${displayList(needs)}

Style souhaité
${displayList(style)}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
03 — BUDGET & DÉLAI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Budget
${display(budget)}

Date de lancement souhaitée
${display(launchDate)}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
04 — BRIEF DU CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${display(message)}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
05 — PROMPT IA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${aiPrompt}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOVA AGENCY
Brief reçu via le formulaire de demande de devis.
`.trim();

    // =========================================================
    // ENVOI
    // =========================================================

    const { data, error } = await resend.emails.send({
      from: "NOVA Agency <contact@agency-nova.fr>",
      to: [contactEmail],
      replyTo: email,
      subject: `Nouvelle demande de devis — ${name}`,
      text: emailText,
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