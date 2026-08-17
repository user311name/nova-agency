"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import "./page.css";

const processSteps = [
  {
    number: "01",
    title: "Demande de devis",
    text: "Vous présentez votre activité et votre projet.",
  },
  {
    number: "02",
    title: "Étude du projet",
    text: "Nous analysons vos besoins et les fonctionnalités souhaitées.",
  },
  {
    number: "03",
    title: "Devis personnalisé",
    text: "Nous établissons une proposition adaptée à votre projet.",
  },
  {
    number: "04",
    title: "Validation",
    text: "Après validation du devis, nous préparons le lancement du projet.",
  },
  {
    number: "05",
    title: "Réalisation",
    text: "Nous créons votre site avec une attention particulière au design et au mobile.",
  },
];

const quoteSections = [
  {
    title: "Type de site",
    name: "Type de site",
    options: [
      "Site vitrine",
      "Site vitrine premium",
      "Site professionnel",
      "Portfolio",
      "Site pour restaurant",
      "Site immobilier",
      "Site pour commerce",
      "Boutique / e-commerce",
      "Site de réservation",
      "Blog",
      "Site personnalisé",
      "Autre",
    ],
  },
  {
    title: "Pages souhaitées",
    name: "Pages souhaitées",
    options: [
      "Accueil",
      "À propos",
      "Présentation de l'entreprise",
      "Services",
      "Prestations",
      "Tarifs",
      "Réalisations / Portfolio",
      "Galerie",
      "Témoignages / Avis",
      "FAQ",
      "Contact",
      "Blog / Actualités",
      "Page personnalisée",
    ],
  },
  {
    title: "Style & identité",
    name: "Style et identité",
    options: [
      "Moderne",
      "Minimaliste",
      "Premium / haut de gamme",
      "Élégant",
      "Sombre / Dark",
      "Coloré",
      "Sobre / professionnel",
      "Entièrement personnalisé",
      "Logo déjà disponible",
      "Création / adaptation du logo",
      "Couleurs déjà définies",
      "NOVA propose les couleurs",
      "Le client fournit les images",
      "Aide pour les images",
      "Aide pour les textes",
    ],
  },
  {
    title: "Fonctionnalités",
    name: "Fonctionnalités",
    options: [
      "Formulaire de contact",
      "Galerie photos",
      "Animations",
      "Effets au survol",
      "Vidéos",
      "Google Maps",
      "Réseaux sociaux",
      "Recherche",
      "Filtres",
      "FAQ interactive",
      "Espace client",
      "Connexion / compte",
      "Tableau de bord",
      "Fonctionnalité personnalisée",
    ],
  },
  {
    title: "Réservation & contact",
    name: "Réservation et contact",
    options: [
      "Formulaire de contact",
      "Demande de devis",
      "Prise de rendez-vous",
      "Calendrier",
      "Choix d'une date",
      "Choix d'une heure",
      "Réservation d'une prestation",
      "Confirmation automatique",
      "E-mail automatique",
      "WhatsApp",
      "Téléphone",
      "Plusieurs moyens de contact",
    ],
  },
  {
    title: "Boutique & paiement",
    name: "Boutique et paiement",
    options: [
      "Pas de boutique",
      "Catalogue de produits",
      "Catégories de produits",
      "Panier",
      "Paiement en ligne",
      "Codes promo",
      "Gestion du stock",
      "Livraison",
      "Paiement d'un acompte",
      "Abonnement",
      "Confirmation automatique",
    ],
  },
  {
    title: "IA & automatisations",
    name: "IA et automatisations",
    options: [
      "Pas d'IA",
      "Chatbot IA",
      "Assistant IA",
      "Réponses automatiques",
      "Génération de contenu",
      "E-mails automatiques",
      "Notifications",
      "Automatisation personnalisée",
      "Connexion à un outil externe",
      "Base de données",
      "API externe",
    ],
  },
  {
    title: "SEO & langues",
    name: "SEO et langues",
    options: [
      "Français",
      "Français + anglais",
      "Plusieurs langues",
      "SEO de base",
      "SEO avancé",
      "Titres et descriptions Google",
      "Optimisation des images",
      "Google Analytics",
      "Google Search Console",
      "Optimisation mobile",
      "Site responsive téléphone / tablette / ordinateur",
    ],
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!formRef.current || sending) {
      return;
    }

    setSending(true);
    setSent(false);

    const form = formRef.current;
    const formData = new FormData(form);

    /* ======================================================
       ANTI-BOT
    ====================================================== */

    const honeypot =
      formData.get("_gotcha")?.toString().trim() || "";

    if (honeypot) {
      setSending(false);
      return;
    }

    /* ======================================================
       OUTILS
    ====================================================== */

    const getValue = (name: string) => {
      const value = formData.get(name);
      return value?.toString().trim() || "Non renseigné";
    };

    const getValues = (name: string) => {
      return formData
        .getAll(name)
        .map((value) => value.toString().trim())
        .filter(Boolean);
    };

    const formatOptions = (name: string) => {
      const values = getValues(name);

      if (values.length === 0) {
        return "Aucun choix";
      }

      return values
        .map((value) => `• ${value}`)
        .join("\n");
    };

    /* ======================================================
       EMAIL
    ====================================================== */

    const clientEmail = getValue("Email");

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(clientEmail)) {
      setSending(false);

      alert(
        "Veuillez entrer une adresse e-mail valide."
      );

      return;
    }

    /* ======================================================
       LIMITES
    ====================================================== */

    const description =
      getValue("Description du projet");

    const autresBesoins =
      getValue("Autres besoins");

    if (description.length > 5000) {
      setSending(false);

      alert(
        "La description du projet est trop longue."
      );

      return;
    }

    if (autresBesoins.length > 1500) {
      setSending(false);

      alert(
        "Le champ des besoins supplémentaires est trop long."
      );

      return;
    }

    /* ======================================================
       INFORMATIONS CLIENT
    ====================================================== */

    const nom = getValue("Nom");
    const entreprise = getValue("Entreprise");
    const telephone = getValue("Téléphone");
    const budget = getValue("Budget approximatif");
    const dateSouhaitee = getValue("Date souhaitée");

    /* ======================================================
       OPTIONS
    ====================================================== */

    const typeSite =
      formatOptions("Type de site[]");

    const pages =
      formatOptions("Pages souhaitées[]");

    const style =
      formatOptions("Style et identité[]");

    const fonctionnalites =
      formatOptions("Fonctionnalités[]");

    const reservation =
      formatOptions("Réservation et contact[]");

    const boutique =
      formatOptions("Boutique et paiement[]");

    const ia =
      formatOptions("IA et automatisations[]");

    const seo =
      formatOptions("SEO et langues[]");

    /* ======================================================
       PROMPT IA COMPLET
    ====================================================== */

    const promptIA = `
IMPORTANT :

Ce prompt est destiné à être copié-collé directement
dans ChatGPT ou dans un autre outil d'intelligence
artificielle capable de générer du code.

Il a pour objectif de générer une PREMIÈRE BASE
COMPLÈTE d'un site internet professionnel à partir
du brief client situé à la fin du prompt.

============================================================
MISSION
============================================================

Tu es un développeur web senior, designer UX/UI,
architecte frontend et expert en création de sites
internet professionnels.

Tu travailles pour une agence digitale appelée NOVA Agency.

Ta mission est de transformer le brief client fourni
à la fin de ce prompt en une première version complète,
professionnelle, moderne et exploitable d'un site web.

Cette version constitue une BASE DE TRAVAIL.

Elle sera ensuite reprise par l'équipe NOVA Agency
afin d'être personnalisée, corrigée, améliorée et
finalisée avant livraison au client.

============================================================
ENVIRONNEMENT DE DÉVELOPPEMENT
============================================================

Le projet doit être développé avec :

- VS Code comme environnement de développement
- Next.js
- React
- TypeScript
- CSS

Utilise une architecture Next.js moderne et propre.

Le projet doit pouvoir être ouvert et développé
facilement dans VS Code.

Lorsque tu fournis le code :

- indique clairement le chemin de chaque fichier
- donne les fichiers COMPLETS
- ne donne jamais uniquement des extraits
- indique lorsqu'un fichier doit être créé
- indique lorsqu'un fichier doit être remplacé
- assure-toi que tous les fichiers fonctionnent ensemble

Exemple :

app/page.tsx
app/page.css

Puis donne le contenu COMPLET de chaque fichier.

============================================================
RÈGLE ABSOLUE — NE PAS INVENTER
============================================================

Tu dois utiliser en priorité les informations
présentes dans le brief.

N'invente jamais comme étant réelles :

- adresse
- téléphone
- e-mail
- prix
- horaires
- témoignages
- chiffres
- statistiques
- partenaires
- certifications
- clients
- années d'expérience
- avis
- réseaux sociaux
- coordonnées
- informations légales

Si une information importante manque :

utilise un placeholder clairement identifiable.

Exemple :

[À REMPLACER — NUMÉRO DE TÉLÉPHONE]

ou

[À REMPLACER — TEXTE DE PRÉSENTATION]

============================================================
ANALYSE DU PROJET
============================================================

Avant d'écrire le code, analyse attentivement
l'intégralité du brief.

Détermine :

1. Le type de site.
2. L'activité du client.
3. Le positionnement.
4. Le public cible lorsque cela peut être déduit
   raisonnablement du brief.
5. Les objectifs du site.
6. Les pages nécessaires.
7. Les sections nécessaires.
8. Les fonctionnalités.
9. La direction artistique.
10. La structure de navigation.
11. Les besoins responsive.
12. Les besoins SEO.
13. Les éventuelles intégrations externes.

Ne pose pas inutilement de questions.

Lorsque des informations manquent, utilise
des placeholders et continue la conception.

============================================================
OBJECTIF DU DESIGN
============================================================

Le site doit donner l'impression d'avoir été conçu
par une véritable agence digitale professionnelle.

Évite absolument :

- les designs génériques
- les interfaces basiques
- les pages trop vides
- les composants répétitifs
- les couleurs utilisées sans logique
- les animations excessives
- les effets inutiles
- les interfaces ressemblant à un template gratuit

Le design doit être cohérent avec :

- l'activité
- le positionnement
- la clientèle
- le style demandé
- les couleurs demandées
- l'identité du client

============================================================
UX / UI
============================================================

Construis une expérience utilisateur claire.

La navigation doit être :

- simple
- intuitive
- rapide à comprendre
- cohérente
- accessible

Les boutons importants doivent être visibles.

Les appels à l'action doivent être placés
à des endroits logiques.

Chaque page doit avoir une hiérarchie visuelle claire.

Utilise correctement :

- titres
- sous-titres
- paragraphes
- boutons
- cartes
- grilles
- espacements
- sections
- séparateurs
- éléments visuels

============================================================
STRUCTURE DU SITE
============================================================

Avant le code, définis clairement :

- Header
- Navigation
- Hero
- Sections principales
- CTA
- Footer

Puis définis la structure de chaque page.

Les pages demandées dans le brief doivent être
réellement prévues dans le projet.

============================================================
RESPONSIVE
============================================================

Le site doit être parfaitement responsive.

Teste mentalement le rendu sur :

- grand écran
- ordinateur portable
- tablette
- téléphone

Aucun élément ne doit provoquer de scroll horizontal.

Sur mobile :

- le menu doit être adapté
- les textes doivent rester lisibles
- les boutons doivent être facilement cliquables
- les images doivent être adaptées
- les grilles doivent devenir responsives
- les espacements doivent être réduits intelligemment
- les sections doivent rester élégantes

Ne te contente pas de réduire la taille du desktop.

La version mobile doit être réellement pensée.

============================================================
ANIMATIONS
============================================================

Les animations doivent être sobres et premium.

Tu peux utiliser :

- transitions
- hover
- apparition progressive
- léger déplacement
- effets de profondeur
- micro-interactions

Mais évite :

- animations permanentes agressives
- effets lourds
- animations inutiles
- ralentissements

Respecte également les préférences
prefers-reduced-motion lorsque nécessaire.

============================================================
IMAGES
============================================================

Si aucune image réelle n'est fournie :

utilise des placeholders clairement identifiés.

Exemple :

[IMAGE À REMPLACER]

Ne prétends jamais qu'une image appartient
au client si elle n'a pas été fournie.

Prévois une structure permettant de remplacer
facilement les images plus tard.

============================================================
FONCTIONNALITÉS
============================================================

Implémente les fonctionnalités demandées
dans le brief lorsque cela est possible.

Si une fonctionnalité nécessite :

- API
- base de données
- paiement
- authentification
- service e-mail
- clé API
- service externe

ne mets JAMAIS de secret directement dans le code.

Utilise des variables d'environnement.

Indique clairement les éléments à configurer.

============================================================
SEO
============================================================

Lorsque le SEO est demandé :

prévois notamment :

- metadata
- title
- description
- structure HTML sémantique
- H1 unique lorsque pertinent
- H2/H3 cohérents
- alt des images
- URLs propres
- responsive
- optimisation des performances

Ne promets jamais un référencement garanti.

============================================================
ACCESSIBILITÉ
============================================================

Le site doit respecter les bonnes pratiques
d'accessibilité.

Prévois notamment :

- labels de formulaires
- boutons accessibles
- textes alternatifs
- contraste suffisant
- navigation clavier lorsque pertinent
- focus visible
- structure HTML correcte

============================================================
CODE
============================================================

Le code doit être :

- propre
- lisible
- organisé
- maintenable
- cohérent
- facilement modifiable

Évite le code inutile.

Évite les dépendances inutiles.

Utilise TypeScript correctement.

============================================================
IMPORTANT — LIVRABLE
============================================================

Tu dois procéder dans cet ordre :

ÉTAPE 1
Analyser le brief.

ÉTAPE 2
Résumer le projet.

ÉTAPE 3
Définir l'arborescence du projet.

ÉTAPE 4
Définir la direction artistique.

ÉTAPE 5
Définir les pages.

ÉTAPE 6
Définir les fonctionnalités.

ÉTAPE 7
Générer les fichiers COMPLETS.

ÉTAPE 8
Vérifier la cohérence entre les fichiers.

ÉTAPE 9
Vérifier le responsive.

ÉTAPE 10
Vérifier les éventuelles erreurs évidentes.

============================================================
IMPORTANT — VS CODE
============================================================

Le projet doit être pensé pour être utilisé
directement dans VS Code.

Indique au début :

1. Comment créer le projet.
2. Quelle commande utiliser.
3. Comment ouvrir le projet dans VS Code.
4. Quels fichiers créer.
5. Quelles dépendances installer si nécessaire.
6. Comment lancer le serveur local.
7. Comment vérifier le site.

Exemple d'environnement :

npm install
npm run dev

Puis :

http://localhost:3000

Adapte les commandes si la structure du projet
nécessite autre chose.

============================================================
IMPORTANT — NOVA AGENCY
============================================================

Cette génération n'est PAS la version finale.

Après génération, NOVA Agency doit :

- vérifier le code
- corriger les éventuelles erreurs
- personnaliser le design
- remplacer les placeholders
- intégrer les vraies images
- adapter les textes
- connecter les services
- vérifier le responsive
- tester les fonctionnalités
- optimiser le SEO
- effectuer les dernières modifications
- valider le site avant livraison

============================================================
BRIEF CLIENT
============================================================

CLIENT

Nom :
${nom}

Entreprise :
${entreprise}

Email :
${clientEmail}

Téléphone :
${telephone}


============================================================
PROJET
============================================================

Budget :
${budget}

Date souhaitée :
${dateSouhaitee}


============================================================
01 — TYPE DE SITE
============================================================

${typeSite}


============================================================
02 — PAGES SOUHAITÉES
============================================================

${pages}


============================================================
03 — STYLE & IDENTITÉ
============================================================

${style}


============================================================
04 — FONCTIONNALITÉS
============================================================

${fonctionnalites}


============================================================
05 — RÉSERVATION & CONTACT
============================================================

${reservation}


============================================================
06 — BOUTIQUE & PAIEMENT
============================================================

${boutique}


============================================================
07 — IA & AUTOMATISATIONS
============================================================

${ia}


============================================================
08 — SEO & LANGUES
============================================================

${seo}


============================================================
AUTRES BESOINS
============================================================

${autresBesoins}


============================================================
DESCRIPTION DU PROJET
============================================================

${description}


============================================================
INSTRUCTION FINALE
============================================================

Maintenant, analyse l'intégralité de ce brief.

Ne saute aucune information.

Commence par expliquer brièvement :

1. ce que veut le client
2. le type de site à construire
3. la structure recommandée
4. la direction artistique
5. les fonctionnalités
6. les éventuels points nécessitant des placeholders

Ensuite, propose l'arborescence complète du projet.

Puis génère la première base complète du site.

IMPORTANT :

Je veux du code directement exploitable dans VS Code.

Donne les fichiers COMPLETS.

Ne donne pas seulement des extraits.

Lorsque plusieurs fichiers sont nécessaires,
présente-les séparément avec leur chemin.

Le résultat doit constituer une véritable première
base de site professionnel que NOVA Agency pourra
ensuite reprendre et personnaliser.

============================================================
FIN DU PROMPT
============================================================
`;

    /* ======================================================
       MESSAGE EMAIL
    ====================================================== */

    const message = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOUVELLE DEMANDE DE DEVIS — NOVA AGENCY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom :
${nom}

Entreprise :
${entreprise}

Email :
${clientEmail}

Téléphone :
${telephone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Budget :
${budget}

Date souhaitée :
${dateSouhaitee}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
01 — TYPE DE SITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${typeSite}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
02 — PAGES SOUHAITÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${pages}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
03 — STYLE & IDENTITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${style}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
04 — FONCTIONNALITÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${fonctionnalites}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
05 — RÉSERVATION & CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${reservation}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
06 — BOUTIQUE & PAIEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${boutique}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
07 — IA & AUTOMATISATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${ia}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
08 — SEO & LANGUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${seo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTRES BESOINS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${autresBesoins}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESCRIPTION DU PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT IA — À COPIER-COLLER DANS CHATGPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${promptIA}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIN DE LA DEMANDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    /* ======================================================
       ENVOI
    ====================================================== */

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: nom,
          email: clientEmail,
          message,
          website: honeypot,
        }),
      });

      let result: {
        success?: boolean;
        error?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        setSending(false);

        alert(
          result?.error ||
            "Une erreur est survenue. Veuillez réessayer."
        );

        return;
      }

      setSent(true);

      form.reset();

      window.scrollTo({
        top: formRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    } catch {
      alert(
        "Impossible d'envoyer la demande. Vérifiez votre connexion puis réessayez."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="contact-page">

      <section className="contact-hero">
        <div className="contact-hero-inner">

          <div className="contact-kicker">
            <span className="contact-kicker-line" />
            <span>PARLONS DE VOTRE PROJET</span>
          </div>

          <h1>
            Construisons quelque chose
            <span> de remarquable.</span>
          </h1>

          <p>
            Présentez-nous votre projet.
            Sélectionnez simplement vos besoins
            et nous vous proposerons une solution
            adaptée à votre activité.
          </p>

        </div>
      </section>

      <section className="contact-container">

        <div className="contact-info">

          <div className="contact-section-label">
            <span>01</span>
            <p>NOTRE APPROCHE</p>
          </div>

          <h2>
            Pas simplement
            <br />
            <span>un site web.</span>
          </h2>

          <p className="contact-intro">
            Quelques choix suffisent pour nous
            permettre de comprendre votre projet
            et de préparer un devis précis.
          </p>

          <div className="project-process">

            <div className="process-title">

              <div className="contact-section-label">
                <span>02</span>
                <p>LE PROCESSUS</p>
              </div>

              <h3>
                Une méthode simple.
                <br />
                Un résultat{" "}
                <span>soigné.</span>
              </h3>

            </div>

            <div className="process-list">

              {processSteps.map((step) => (
                <div
                  className="process-item"
                  key={step.number}
                >

                  <span className="process-number">
                    {step.number}
                  </span>

                  <div className="process-content">

                    <h4>{step.title}</h4>

                    <p>{step.text}</p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        <div className="contact-form-wrapper">

          <div className="form-top">

            <div>

              <span className="form-label">
                DEMANDER UN DEVIS
              </span>

              <h2>
                Parlons de
                <br />
                <span>votre projet.</span>
              </h2>

            </div>

            <span className="form-index">
              NOVA / 01
            </span>

          </div>

          <p className="form-description">
            Renseignez vos informations puis
            sélectionnez les éléments qui
            correspondent à votre projet.
            Plusieurs choix sont possibles.
          </p>

          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: 0,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              <label htmlFor="_gotcha">
                Ne pas remplir ce champ
              </label>

              <input
                id="_gotcha"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-row">

              <div className="form-field">
                <label htmlFor="nom">
                  Nom <span>*</span>
                </label>

                <input
                  id="nom"
                  name="Nom"
                  type="text"
                  placeholder="Jean Dupont"
                  maxLength={120}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="entreprise">
                  Entreprise
                </label>

                <input
                  id="entreprise"
                  name="Entreprise"
                  type="text"
                  placeholder="Votre entreprise"
                  maxLength={150}
                  autoComplete="organization"
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-field">

                <label htmlFor="email">
                  Email <span>*</span>
                </label>

                <input
                  id="email"
                  name="Email"
                  type="email"
                  placeholder="vous@entreprise.fr"
                  maxLength={254}
                  autoComplete="email"
                  required
                />

              </div>

              <div className="form-field">

                <label htmlFor="telephone">
                  Téléphone
                </label>

                <input
                  id="telephone"
                  name="Téléphone"
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  maxLength={30}
                  autoComplete="tel"
                />

              </div>

            </div>

            <div className="form-row">

              <div className="form-field">

                <label htmlFor="budget">
                  Budget approximatif
                </label>

                <select
                  id="budget"
                  name="Budget approximatif"
                  defaultValue=""
                >

                  <option value="">
                    Je ne sais pas encore
                  </option>

                  <option>
                    Moins de 1 000 €
                  </option>

                  <option>
                    1 000 € à 2 000 €
                  </option>

                  <option>
                    2 000 € à 4 000 €
                  </option>

                  <option>
                    4 000 € à 8 000 €
                  </option>

                  <option>
                    Plus de 8 000 €
                  </option>

                </select>

              </div>

              <div className="form-field">

                <label htmlFor="delai">
                  Date souhaitée
                </label>

                <input
                  id="delai"
                  name="Date souhaitée"
                  type="text"
                  placeholder="Ex. Octobre 2026"
                  maxLength={100}
                />

              </div>

            </div>

            <div className="quote-options">

              <p className="quote-options-title">
                VOS BESOINS
              </p>

              {quoteSections.map((section) => (

                <details
                  className="quote-section"
                  key={section.title}
                >

                  <summary>

                    <span>
                      {section.title}
                    </span>

                    <span
                      className="quote-section-icon"
                      aria-hidden="true"
                    >
                      +
                    </span>

                  </summary>

                  <div className="quote-checkboxes">

                    {section.options.map((option) => (

                      <label
                        className="quote-choice"
                        key={option}
                      >

                        <input
                          type="checkbox"
                          name={`${section.name}[]`}
                          value={option}
                        />

                        <span>{option}</span>

                      </label>

                    ))}

                  </div>

                </details>

              ))}

            </div>

            <div className="form-field">

              <label htmlFor="autre">
                Autres besoins
              </label>

              <input
                id="autre"
                name="Autres besoins"
                type="text"
                placeholder="Une idée ou fonctionnalité particulière..."
                maxLength={1500}
              />

            </div>

            <div className="form-field">

              <label htmlFor="message">
                Décrivez votre projet <span>*</span>
              </label>

              <textarea
                id="message"
                name="Description du projet"
                placeholder="Présentez votre activité, vos objectifs et ce que vous souhaitez obtenir avec votre site..."
                maxLength={5000}
                required
              />

            </div>

            {sent && (
              <p
                className="form-success"
                role="status"
              >
                Votre demande a bien été envoyée.
                Nous reviendrons vers vous
                rapidement.
              </p>
            )}

            <div className="form-bottom">

              <p>
                Vos informations servent
                uniquement à traiter votre
                demande de projet.
              </p>

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
              >

                <span>
                  {sending
                    ? "ENVOI EN COURS..."
                    : "ENVOYER LE DEVIS"}
                </span>

                <strong aria-hidden="true">
                  →
                </strong>

              </button>

            </div>

          </form>

        </div>

      </section>

      <section className="contact-bottom">

        <div className="bottom-label">

          <span>03</span>

          <p>LA SUITE</p>

        </div>

        <h2>
          Une idée aujourd&apos;hui.
          <br />
          <span>Un projet demain.</span>
        </h2>

        <p>
          Commençons simplement par une
          discussion.
        </p>

        <Link href="/">
          RETOUR À L&apos;ACCUEIL
          <span aria-hidden="true">
            →
          </span>
        </Link>

      </section>

    </main>
  );
}