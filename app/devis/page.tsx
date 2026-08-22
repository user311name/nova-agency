"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import "./page.css";

const projectOptions = [
  "Site vitrine",
  "E-commerce",
  "Portfolio",
  "Réservation",
  "Site personnalisé",
];

const needsOptions = [
  "Présenter mon activité",
  "Vendre en ligne",
  "Prendre des rendez-vous",
  "Générer des demandes",
  "Automatiser certaines tâches",
];

const styleOptions = [
  "Minimal",
  "Premium",
  "Moderne",
  "Élégant",
  "Sur mesure",
];

const budgetOptions = [
  "Moins de 1 000 €",
  "1 000 – 2 000 €",
  "2 000 – 4 000 €",
  "4 000 €+",
];

function SelectionCards({
  name,
  options,
  multiple = false,
}: {
  name: string;
  options: string[];
  multiple?: boolean;
}) {
  return (
    <div className="selection-grid">
      {options.map((option) => (
        <label className="selection-card" key={option}>
          <input
            type={multiple ? "checkbox" : "radio"}
            name={name}
            value={option}
          />

          <span className="selection-card-content">
            <span>{option}</span>
            <strong>+</strong>
          </span>
        </label>
      ))}
    </div>
  );
}

export default function Devis() {
  const formRef = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!formRef.current || sending) return;

    setSending(true);
    setSent(false);

    const form = formRef.current;
    const formData = new FormData(form);

    // =========================================================
    // HONEYPOT ANTI-BOT
    // =========================================================

    const honeypot =
      formData.get("_gotcha")?.toString().trim() || "";

    if (honeypot) {
      setSending(false);
      return;
    }

    // =========================================================
    // RÉCUPÉRATION DES VALEURS
    // =========================================================

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

    // =========================================================
    // DONNÉES CLIENT
    // =========================================================

    const name = getValue("Nom");
    const clientEmail = getValue("Email");

    const company = getValue("Entreprise");
    const phone = getValue("Téléphone");

    const project = getValues("Projet[]");
    const needs = getValues("Besoins[]");
    const style = getValues("Style[]");

    const budget = getValue("Budget");
    const launchDate = getValue("Date souhaitée");
    const message = getValue("Message");

    // =========================================================
    // VALIDATION EMAIL
    // =========================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(clientEmail)) {
      setSending(false);

      alert(
        "Veuillez entrer une adresse e-mail valide."
      );

      return;
    }

    // =========================================================
    // BRIEF COMPLET
    // =========================================================

    const brief = `
NOUVELLE DEMANDE DE DEVIS — NOVA AGENCY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom :
${name}

Entreprise :
${company}

Email :
${clientEmail}

Téléphone :
${phone}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type de projet :
${project.join(", ") || "Non renseigné"}

Besoins :
${needs.join(", ") || "Non renseigné"}

Style :
${style.join(", ") || "Non renseigné"}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET & DÉLAI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Budget :
${budget}

Date de lancement souhaitée :
${launchDate}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE DU CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIN DU BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

    // =========================================================
    // ENVOI API
    // =========================================================

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name,
          email: clientEmail,
          message: brief,

          company,
          phone,

          project,
          needs,
          style,

          budget,
          launchDate,

          website: honeypot,
        }),
      });

      // =======================================================
      // RÉPONSE API
      // =======================================================

      let result: {
        success?: boolean;
        error?: string;
        id?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      // =======================================================
      // ERREUR
      // =======================================================

      if (!response.ok) {
        setSending(false);

        alert(
          result.error ||
            "Une erreur est survenue. Veuillez réessayer."
        );

        return;
      }

      // =======================================================
      // SUCCÈS
      // =======================================================

      setSent(true);

      form.reset();

      window.scrollTo({
        top: formRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du formulaire :",
        error
      );

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
      ====================================================== */}

      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-kicker">
            <span className="contact-kicker-line" />

            <span>DEMANDER UN DEVIS</span>
          </div>

          <h1>
            Votre projet.
            <br />
            <span>Notre expertise.</span>
          </h1>

          <p>
            Quelques choix suffisent pour nous permettre
            de comprendre votre projet et de préparer une
            proposition adaptée.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="contact-container">
        {/* ===================================================
            LEFT
        ==================================================== */}

        <aside className="contact-info">
          <div className="contact-section-label">
            <span>01</span>

            <p>UN CADRE CLAIR</p>
          </div>

          <h2>
            Simple.
            <br />
            <span>Précis.</span>
            <br />
            Sur mesure.
          </h2>

          <p className="contact-intro">
            Pas besoin de maîtriser les détails techniques.
            Expliquez-nous simplement votre besoin : nous
            vous guidons ensuite à chaque étape du projet.
          </p>

          <div className="mini-points">
            <div>
              <span>01</span>

              <p>
                Un premier échange pour comprendre votre
                activité et vos objectifs.
              </p>
            </div>

            <div>
              <span>02</span>

              <p>
                Une proposition claire, adaptée au niveau
                de votre projet.
              </p>
            </div>

            <div>
              <span>03</span>

              <p>
                Des étapes et des validations avant toute
                mise en ligne.
              </p>
            </div>
          </div>
        </aside>

        {/* ===================================================
            FORMULAIRE
        ==================================================== */}

        <div className="contact-form-wrapper">
          <div className="form-top">
            <div>
              <span className="form-label">
                NOVA / DEVIS
              </span>

              <h2>
                Parlons de
                <br />
                <span>votre projet.</span>
              </h2>
            </div>

            <span className="form-index">
              01 — 05
            </span>
          </div>

          <p className="form-description">
            Sélectionnez simplement les options qui
            correspondent à votre projet.
          </p>

          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            {/* =================================================
                HONEYPOT
            ================================================== */}

            <div
              className="honeypot"
              aria-hidden="true"
            >
              <label htmlFor="_gotcha">
                Ne pas remplir
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
                01 — PROJET
            ================================================== */}

            <section className="form-section">
              <div className="form-section-heading">
                <span>01</span>

                <div>
                  <small>VOTRE PROJET</small>

                  <h3>
                    Que souhaitez-vous créer ?
                  </h3>
                </div>
              </div>

              <SelectionCards
                name="Projet[]"
                options={projectOptions}
              />
            </section>

            {/* =================================================
                02 — BESOINS
            ================================================== */}

            <section className="form-section">
              <div className="form-section-heading">
                <span>02</span>

                <div>
                  <small>VOS BESOINS</small>

                  <h3>
                    Quel est votre objectif ?
                  </h3>
                </div>
              </div>

              <SelectionCards
                name="Besoins[]"
                options={needsOptions}
                multiple
              />
            </section>

            {/* =================================================
                03 — STYLE
            ================================================== */}

            <section className="form-section">
              <div className="form-section-heading">
                <span>03</span>

                <div>
                  <small>VOTRE UNIVERS</small>

                  <h3>
                    Quel style vous correspond ?
                  </h3>
                </div>
              </div>

              <SelectionCards
                name="Style[]"
                options={styleOptions}
                multiple
              />
            </section>

            {/* =================================================
                04 — BUDGET / DÉLAI
            ================================================== */}

            <section className="form-section">
              <div className="form-section-heading">
                <span>04</span>

                <div>
                  <small>BUDGET &amp; DÉLAI</small>

                  <h3>
                    Où en êtes-vous ?
                  </h3>
                </div>
              </div>

              <SelectionCards
                name="Budget"
                options={budgetOptions}
              />

              <div className="form-field date-field">
                <label htmlFor="date">
                  DATE DE LANCEMENT SOUHAITÉE
                </label>

                <input
                  id="date"
                  name="Date souhaitée"
                  type="text"
                  placeholder="Ex. Octobre 2026"
                  maxLength={100}
                />
              </div>
            </section>

            {/* =================================================
                05 — INFORMATIONS CLIENT
            ================================================== */}

            <section className="form-section">
              <div className="form-section-heading">
                <span>05</span>

                <div>
                  <small>DERNIÈRE ÉTAPE</small>

                  <h3>
                    Parlons de vous.
                  </h3>
                </div>
              </div>

              {/* NOM / ENTREPRISE */}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="nom">
                    NOM <span>*</span>
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
                    ENTREPRISE
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

              {/* EMAIL / TÉLÉPHONE */}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email">
                    EMAIL <span>*</span>
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
                    TÉLÉPHONE
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

              {/* MESSAGE */}

              <div className="form-field">
                <label htmlFor="message">
                  PARLEZ-NOUS DE VOTRE PROJET
                  <span> *</span>
                </label>

                <textarea
                  id="message"
                  name="Message"
                  placeholder="Votre activité, votre idée, vos objectifs..."
                  maxLength={3000}
                  required
                />
              </div>
            </section>

            {/* =================================================
                MESSAGE SUCCÈS
            ================================================== */}

            {sent && (
              <p
                className="form-success"
                role="status"
              >
                Votre demande a bien été envoyée.
                <br />
                Nous revenons vers vous rapidement.
              </p>
            )}

            {/* =================================================
                BOTTOM
            ================================================== */}

            <div className="form-bottom">
              <p>
                Vos informations sont utilisées uniquement
                pour traiter votre demande.
              </p>

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
              >
                <span>
                  {sending
                    ? "ENVOI EN COURS..."
                    : "DEMANDER MON DEVIS"}
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
          BOTTOM CTA
      ====================================================== */}

      <section className="contact-bottom">
        <div className="bottom-label">
          <span>NOVA</span>

          <p>AGENCE DIGITALE</p>
        </div>

        <h2>
          Une idée.
          <br />
          <span>Un projet.</span>
        </h2>

        <p>
          Commençons simplement par une discussion.
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