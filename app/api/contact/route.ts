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
    // EMAIL DE RÉCEPTION
    // =========================================================

    const contactEmail = clean(
      process.env.CONTACT_EMAIL
    );

    if (!contactEmail) {
      console.error("CONTACT_EMAIL manquante.");

      return NextResponse.json(
        {
          error:
            "L'adresse de réception n'est pas configurée.",
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
      // RÉPONDRE DIRECTEMENT AU CLIENT
      // =======================================================

      replyTo: email,

      // =======================================================
      // SUJET
      // =======================================================

      subject: `Nouvelle demande de devis — ${name}`,

      // =======================================================
      // CONTENU DU MAIL
      // =======================================================

      text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOVA AGENCY
NOUVELLE DEMANDE DE DEVIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


╔════════════════════════════════════════════╗
║                                            ║
║        01 — BRIEF DU CLIENT                ║
║                                            ║
╚════════════════════════════════════════════╝


Voici le brief complet transmis par le client.

Ce bloc contient toutes les informations
nécessaires pour comprendre le projet.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom :
${name}

Email :
${email}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRIEF CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIN DU BRIEF CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



╔════════════════════════════════════════════╗
║                                            ║
║        02 — PROMPT IA                     ║
║                                            ║
╚════════════════════════════════════════════╝


IMPORTANT :

Le texte ci-dessous est conçu pour être
copié-collé directement dans ChatGPT ou
un autre outil d'intelligence artificielle.

Il permet de générer une première base
du site à partir du brief du client.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT À COPIER-COLLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Tu es un expert senior en conception,
UX/UI, développement web et création de
sites internet professionnels.

Tu travailles pour une agence digitale
appelée NOVA Agency.

Ta mission est de créer une PREMIÈRE BASE
COMPLÈTE d'un site internet à partir du
brief client fourni à la fin de ce prompt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Créer une première version professionnelle,
moderne, cohérente et responsive du site.

Le site doit être pensé comme un véritable
projet client et non comme une simple
démonstration technique.

L'objectif est d'obtenir une base suffisamment
complète pour que l'équipe NOVA puisse ensuite
la reprendre, la modifier et la personnaliser.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÈGLES IMPORTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Respecte précisément les informations
   fournies dans le brief.

2. Respecte le type de site demandé.

3. Respecte les pages demandées.

4. Respecte le style visuel demandé.

5. Respecte les fonctionnalités demandées.

6. Respecte les besoins de réservation,
   contact, paiement, boutique ou espace
   client lorsqu'ils sont demandés.

7. Respecte les besoins liés à l'IA et aux
   automatisations lorsqu'ils sont demandés.

8. Respecte les langues demandées.

9. Prévois une structure responsive complète
   pour ordinateur, tablette et téléphone.

10. Le design doit être professionnel,
    moderne et cohérent avec l'activité.

11. L'expérience utilisateur doit être claire.

12. La navigation doit être simple et intuitive.

13. Les boutons et appels à l'action doivent
    être clairement visibles.

14. Les sections doivent avoir une hiérarchie
    visuelle logique.

15. Ne surcharge pas inutilement le design.

16. N'invente jamais de coordonnées,
    informations légales, prix, statistiques,
    témoignages ou informations importantes
    qui ne figurent pas dans le brief.

17. Lorsque des informations importantes
    manquent, utilise des placeholders
    clairement identifiés.

18. Ne présente jamais une information
    inventée comme une information réelle.

19. Le site doit être facilement modifiable
    par un développeur après génération.

20. Le code doit être propre, organisé,
    lisible et cohérent.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNOLOGIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Utilise de préférence :

- Next.js
- React
- TypeScript
- CSS

Si le projet nécessite une autre technologie
ou une bibliothèque particulière pour une
fonctionnalité précise, explique clairement
pourquoi elle est nécessaire.

Évite les dépendances inutiles.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analyse les indications de style du client
avant de créer l'interface.

Adapte notamment :

- les couleurs
- la typographie
- les espacements
- les boutons
- les cartes
- les sections
- les images
- les animations
- les effets
- la navigation
- la hiérarchie visuelle

Le design doit correspondre à l'activité
et au positionnement du client.

Ne crée pas systématiquement un design
identique pour tous les projets.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le site doit être parfaitement utilisable sur :

- ordinateur
- tablette
- téléphone

Porte une attention particulière à :

- la navigation mobile
- les tailles de texte
- les espacements
- les boutons
- les formulaires
- les images
- les grilles
- les menus
- les sections horizontales

Aucun élément ne doit provoquer de
débordement horizontal sur mobile.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Utilise les informations disponibles
dans le brief.

Lorsque le client a fourni des textes,
respecte-les.

Lorsque certains textes manquent :

- propose du contenu provisoire cohérent
- indique clairement qu'il s'agit d'un
  contenu provisoire
- ne présente pas ce contenu comme venant
  réellement du client

Les coordonnées doivent rester celles
fournies dans le brief.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FONCTIONNALITÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Implémente les fonctionnalités demandées
dans le brief lorsque cela est possible.

Pour les fonctionnalités nécessitant :

- une API
- une clé secrète
- une base de données
- un compte externe
- un service de paiement
- un service d'e-mail
- une configuration serveur

ne mets jamais de véritable clé secrète
dans le code.

Utilise des variables d'environnement et
indique clairement ce qui devra être
configuré plus tard.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lorsque le SEO est demandé :

- prévoir les metadata
- prévoir des titres cohérents
- utiliser une structure HTML sémantique
- optimiser les images
- prévoir les éléments nécessaires
  au référencement

Ne promets jamais un référencement Google
garanti.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Si les images du client ne sont pas fournies :

- utilise des placeholders
- ou indique clairement les emplacements
  où les images devront être ajoutées

Ne prétends pas avoir reçu des images
qui ne sont pas présentes.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE ATTENDU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Commence par analyser le brief.

Ensuite :

1. Résume rapidement le projet.

2. Définis la structure du site.

3. Définis les pages nécessaires.

4. Définis la direction visuelle.

5. Définis les principales fonctionnalités.

6. Crée ensuite le code nécessaire.

Lorsque tu fournis du code :

- donne les fichiers complets
- indique le chemin de chaque fichier
- ne donne pas uniquement des extraits
- assure-toi que les fichiers sont cohérents
  entre eux

Le résultat doit constituer une première base
réellement exploitable du projet.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT — TRAVAIL DE NOVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cette génération constitue uniquement une
PREMIÈRE BASE DE TRAVAIL.

Après génération, l'équipe NOVA Agency
reprendra le projet afin de :

- vérifier le contenu
- corriger le code
- améliorer le design
- ajuster le responsive
- personnaliser les textes
- remplacer les placeholders
- intégrer les vraies images
- connecter les services nécessaires
- tester les fonctionnalités
- améliorer l'expérience utilisateur
- effectuer les dernières modifications
  demandées par le client

Ne considère donc pas la première génération
comme une version finale.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRIEF COMPLET DU CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIN DU BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Maintenant, analyse le brief et commence
par définir précisément la structure du projet
avant de générer la première base du site.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIN DU PROMPT IA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



╔════════════════════════════════════════════╗
║                                            ║
║              NOVA AGENCY                   ║
║                                            ║
║        Brief reçu avec succès              ║
║                                            ║
╚════════════════════════════════════════════╝
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