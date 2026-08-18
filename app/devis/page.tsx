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

export default function Devis() {
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
       RÉCUPÉRATION
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
       CONSTRUCTION DU BRIEF
    ====================================================== */

    const message = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOUVEAU PROJET — NOVA AGENCY
BRIEF DE CRÉATION DE SITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom : ${getValue("Nom")}
Entreprise : ${getValue("Entreprise")}
Email : ${clientEmail}
Téléphone : ${getValue("Téléphone")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Budget : ${getValue("Budget approximatif")}
Date souhaitée : ${getValue("Date souhaitée")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
01 — TYPE DE SITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("Type de site[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
02 — PAGES SOUHAITÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("Pages souhaitées[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
03 — STYLE & IDENTITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("Style et identité[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
04 — FONCTIONNALITÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("Fonctionnalités[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
05 — RÉSERVATION & CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("Réservation et contact[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
06 — BOUTIQUE & PAIEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("Boutique et paiement[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
07 — IA & AUTOMATISATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("IA et automatisations[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
08 — SEO & LANGUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formatOptions("SEO et langues[]")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTRES BESOINS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${autresBesoins}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESCRIPTION DU PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRIEF POUR LA CRÉATION DU SITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Créer un site web complet correspondant
aux besoins décrits dans ce brief.

Respecter précisément :

• Le type de site demandé
• Les pages sélectionnées
• Le style et l'identité visuelle
• Les fonctionnalités demandées
• Les besoins de réservation et de contact
• Les besoins liés à la boutique et au paiement
• Les éventuelles fonctionnalités IA
• Les besoins SEO et les langues
• La description et les objectifs du client

Le site doit être professionnel,
moderne, responsive et optimisé pour
ordinateur, tablette et téléphone.

Ne pas inventer d'informations importantes
sur l'entreprise.

Lorsque certaines informations manquent,
proposer une solution cohérente et
professionnelle.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIN DU BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    /* ======================================================
       ENVOI RESEND
    ====================================================== */

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: getValue("Nom"),
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

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-inner">

          <div className="contact-kicker">

            <span className="contact-kicker-line" />

            <span>
              DEMANDER UN DEVIS
            </span>

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


      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="contact-container">

        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="contact-info">

          <div className="contact-section-label">

            <span>
              01
            </span>

            <p>
              NOTRE APPROCHE
            </p>

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


          {/* PROCESS */}

          <div className="project-process">

            <div className="process-title">

              <div className="contact-section-label">

                <span>
                  02
                </span>

                <p>
                  LE PROCESSUS
                </p>

              </div>

              <h3>
                Une méthode simple.
                <br />
                Un résultat{" "}
                <span>
                  soigné.
                </span>
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

                    <h4>
                      {step.title}
                    </h4>

                    <p>
                      {step.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ===================================================
            FORMULAIRE
        =================================================== */}

        <div className="contact-form-wrapper">

          <div className="form-top">

            <div>

              <span className="form-label">
                DEMANDER UN DEVIS
              </span>

              <h2>
                Parlons de
                <br />
                <span>
                  votre projet.
                </span>
              </h2>

            </div>

            <span className="form-index">
              NOVA / DEVIS
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

            {/* =================================================
                HONEYPOT
            ================================================= */}

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


            {/* =================================================
                NOM / ENTREPRISE
            ================================================= */}

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


            {/* =================================================
                EMAIL / TÉLÉPHONE
            ================================================= */}

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


            {/* =================================================
                BUDGET / DATE
            ================================================= */}

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


            {/* =================================================
                OPTIONS
            ================================================= */}

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

                    {section.options.map(
                      (option) => (

                        <label
                          className="quote-choice"
                          key={option}
                        >

                          <input
                            type="checkbox"
                            name={`${section.name}[]`}
                            value={option}
                          />

                          <span>
                            {option}
                          </span>

                        </label>

                      )
                    )}

                  </div>

                </details>

              ))}

            </div>


            {/* =================================================
                AUTRES BESOINS
            ================================================= */}

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


            {/* =================================================
                DESCRIPTION
            ================================================= */}

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


            {/* =================================================
                SUCCESS
            ================================================= */}

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


            {/* =================================================
                BOTTOM
            ================================================= */}

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


      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <section className="contact-bottom">

        <div className="bottom-label">

          <span>
            03
          </span>

          <p>
            LA SUITE
          </p>

        </div>


        <h2>
          Une idée aujourd&apos;hui.
          <br />
          <span>
            Un projet demain.
          </span>
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