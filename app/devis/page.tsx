"use client";

import { FormEvent, useState } from "react";
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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="devis-arrow"
    >
      <path d="M4 10h11" />
      <path d="M10 5l5 5-5 5" />
    </svg>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`plus-icon ${open ? "is-open" : ""}`}
    >
      <path d="M10 4v12" />
      <path d="M4 10h12" />
    </svg>
  );
}

function AccordionSection({
  number,
  label,
  title,
  open,
  onClick,
  children,
  summary,
}: {
  number: string;
  label: string;
  title: string;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
  summary?: string;
}) {
  return (
    <div className={`devis-accordion ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="devis-accordion-trigger"
        onClick={onClick}
        aria-expanded={open}
      >
        <span className="accordion-number">{number}</span>

        <span className="accordion-main">
          <span className="accordion-label">{label}</span>
          <span className="accordion-title">{title}</span>

          {!open && summary && (
            <span className="accordion-summary">{summary}</span>
          )}
        </span>

        <span className="accordion-action">
          <PlusIcon open={open} />
        </span>
      </button>

      <div
        className="devis-accordion-content"
        aria-hidden={!open}
      >
        <div className="accordion-inner">{children}</div>
      </div>
    </div>
  );
}

function OptionGrid({
  name,
  options,
  multiple = false,
}: {
  name: string;
  options: string[];
  multiple?: boolean;
}) {
  return (
    <div className="option-grid">
      {options.map((option) => (
        <label className="option-pill" key={option}>
          <input
            type={multiple ? "checkbox" : "radio"}
            name={name}
            value={option}
          />

          <span className="option-pill-inner">
            <span className="option-dot" />
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}

export default function Devis() {
  const [openSection, setOpenSection] = useState<string | null>("project");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const honeypot = String(data.get("_gotcha") || "");

    if (honeypot) return;

    const getValue = (name: string) =>
      String(data.get(name) || "").trim();

    const getValues = (name: string) =>
      data.getAll(name).map((value) => String(value).trim());

    const name = getValue("name");
    const email = getValue("email");
    const company = getValue("company");
    const phone = getValue("phone");

    const project = getValues("project");
    const needs = getValues("needs");
    const style = getValues("style");

    const budget = getValue("budget");
    const launchDate = getValue("launchDate");
    const message = getValue("message");

    if (!name || !email) {
      alert("Merci de renseigner votre nom et votre adresse e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Merci de renseigner une adresse e-mail valide.");
      return;
    }

    const brief = `
NOUVELLE DEMANDE DE DEVIS — NOVA

CONTACT
Nom : ${name}
Email : ${email}
Entreprise : ${company || "Non renseignée"}
Téléphone : ${phone || "Non renseigné"}

PROJET
Type : ${project.join(", ") || "Non renseigné"}

BESOINS
${needs.join(", ") || "Non renseigné"}

STYLE
${style.join(", ") || "Non renseigné"}

BUDGET
${budget || "Non renseigné"}

DATE SOUHAITÉE
${launchDate || "Non renseignée"}

MESSAGE
${message || "Aucun message"}
    `.trim();

    try {
      setSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: brief,
          company,
          phone,
          project: project.join(", "),
          needs: needs.join(", "),
          style: style.join(", "),
          budget,
          launchDate,
          website: honeypot,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        alert(
          result?.error ||
            "Une erreur est survenue. Merci de réessayer."
        );
        return;
      }

      form.reset();
      setSent(true);
      setOpenSection(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch {
      alert(
        "Impossible d'envoyer votre demande pour le moment."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="devis-page">
      <div className="devis-background" aria-hidden="true">
        <div className="devis-orb devis-orb-one" />
        <div className="devis-orb devis-orb-two" />
        <div className="devis-grid" />
      </div>

      {/* HERO */}

      <section className="devis-hero">
        <div className="devis-container">
          <div className="devis-kicker">
            <span />
            NOVA — DEVIS
          </div>

          <div className="devis-hero-grid">
            <div>
              <h1>
                Parlons de
                <span> votre projet.</span>
              </h1>

              <p>
                Quelques informations suffisent pour nous donner
                une première vision de votre projet. Pas besoin
                d’avoir tout préparé.
              </p>
            </div>

            <div className="devis-hero-index">
              <strong>01</strong>
              <span>PROJET</span>
            </div>
          </div>

          <div className="devis-progress">
            <div className="progress-item active">
              <span>01</span>
              <p>Projet</p>
            </div>

            <div className="progress-line" />

            <div className="progress-item">
              <span>02</span>
              <p>Besoins</p>
            </div>

            <div className="progress-line" />

            <div className="progress-item">
              <span>03</span>
              <p>Contact</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}

      <section className="devis-main">
        <div className="devis-container devis-layout">
          <aside className="devis-aside">
            <span className="aside-label">
              UNE IDÉE EN TÊTE ?
            </span>

            <h2>
              Faites-nous
              <br />
              <span>part.</span>
            </h2>

            <p>
              Vous n’avez pas besoin de connaître les termes
              techniques. Expliquez-nous simplement ce que vous
              voulez faire.
            </p>

            <div className="aside-points">
              <div>
                <span>01</span>
                <p>Réponse personnalisée</p>
              </div>

              <div>
                <span>02</span>
                <p>Échange sans engagement</p>
              </div>

              <div>
                <span>03</span>
                <p>Projet 100 % sur mesure</p>
              </div>
            </div>

            <Link
              href="/realisations"
              className="aside-link"
            >
              <span>Voir nos projets</span>
              <ArrowIcon />
            </Link>
          </aside>

          <div className="devis-card">
            <div className="devis-card-top">
              <div>
                <span>VOTRE PROJET</span>
                <h2>
                  Quelques questions.
                  <br />
                  <em>Rien de plus.</em>
                </h2>
              </div>

              <span className="card-index">01 / 05</span>
            </div>

            <p className="devis-card-intro">
              Cliquez sur une question pour faire apparaître
              les choix.
            </p>

            <form
              className="devis-form"
              onSubmit={handleSubmit}
            >
              <input
                className="honeypot"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />

              <AccordionSection
                number="01"
                label="VOTRE PROJET"
                title="Quel type de projet souhaitez-vous ?"
                open={openSection === "project"}
                onClick={() => toggleSection("project")}
              >
                <OptionGrid
                  name="project"
                  options={projectOptions}
                />
              </AccordionSection>

              <AccordionSection
                number="02"
                label="VOS OBJECTIFS"
                title="Qu’aimeriez-vous obtenir ?"
                open={openSection === "needs"}
                onClick={() => toggleSection("needs")}
              >
                <OptionGrid
                  name="needs"
                  options={needsOptions}
                  multiple
                />
              </AccordionSection>

              <AccordionSection
                number="03"
                label="VOTRE UNIVERS"
                title="Quel style vous correspond ?"
                open={openSection === "style"}
                onClick={() => toggleSection("style")}
              >
                <OptionGrid
                  name="style"
                  options={styleOptions}
                  multiple
                />
              </AccordionSection>

              <AccordionSection
                number="04"
                label="VOTRE BUDGET"
                title="Quelle enveloppe avez-vous prévue ?"
                open={openSection === "budget"}
                onClick={() => toggleSection("budget")}
              >
                <OptionGrid
                  name="budget"
                  options={budgetOptions}
                />
              </AccordionSection>

              <AccordionSection
                number="05"
                label="VOS COORDONNÉES"
                title="Comment pouvons-nous vous joindre ?"
                open={openSection === "contact"}
                onClick={() => toggleSection("contact")}
              >
                <div className="contact-fields">
                  <div className="field">
                    <label htmlFor="name">
                      NOM <span>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="email">
                      EMAIL <span>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="vous@exemple.fr"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="company">
                      ENTREPRISE
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="phone">
                      TÉLÉPHONE
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="06 00 00 00 00"
                    />
                  </div>

                  <div className="field full">
                    <label htmlFor="launchDate">
                      DATE SOUHAITÉE
                    </label>
                    <input
                      id="launchDate"
                      name="launchDate"
                      type="text"
                      placeholder="Ex. Juin 2026"
                    />
                  </div>

                  <div className="field full">
                    <label htmlFor="message">
                      VOTRE MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre idée en quelques mots..."
                    />
                  </div>
                </div>
              </AccordionSection>

              {sent && (
                <div className="form-success">
                  <span>✓</span>

                  <div>
                    <strong>Demande envoyée.</strong>
                    <p>
                      Merci ! NOVA revient vers vous rapidement.
                    </p>
                  </div>
                </div>
              )}

              <div className="submit-area">
                <div>
                  <span>PRÊT À COMMENCER ?</span>
                  <p>Gratuit · Sans engagement</p>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                >
                  <span>
                    {sending
                      ? "ENVOI..."
                      : "ENVOYER MON PROJET"}
                  </span>

                  {!sending && <ArrowIcon />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM */}

      <section className="devis-bottom">
        <div className="devis-container">
          <span>UNE QUESTION AVANT DE COMMENCER ?</span>

          <h2>
            On peut aussi
            <em> en parler.</em>
          </h2>

          <p>
            Une question, une idée ou simplement envie
            d’échanger ?
          </p>

          <Link href="/contact">
            Nous contacter
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}