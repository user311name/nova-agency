"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./page.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="project-arrow-icon"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const projects = [
  {
    number: "01",
    title: "BOULANGERIE",
    category: "SITE PREMIUM • BOULANGERIE & PÂTISSERIE",
    description:
      "Projet concept pensé pour valoriser une boulangerie à travers une identité digitale chaleureuse, une présentation élégante des créations et une interface d’administration permettant de gérer les contenus du site.",
    image: "/projets/boulangerie-1.png",
    href: "/realisations/boulangerie",
    year: "2026",
    tags: ["SITE PREMIUM", "BOULANGERIE"],
  },
  {
    number: "02",
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Projet concept pensé autour de l’image, de la prise de rendez-vous et d’une expérience plus premium pour un barber moderne.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
    year: "2026",
    tags: ["SITE PREMIUM", "BARBER"],
  },
  {
    number: "03",
    title: "SITE TRAITEUR",
    category: "SITE PREMIUM • RESTAURATION & TRAITEUR",
    description:
      "Projet concept pensé pour valoriser une activité de traiteur à travers une identité visuelle élégante, une présentation claire de l’offre et une expérience digitale chaleureuse.",
    image: "/projets/Site-traiteur.png",
    href: "/realisations/site-traiteur",
    year: "2026",
    tags: ["SITE PREMIUM", "TRAITEUR"],
  },
  {
    number: "04",
    title: "AUTOPILOT",
    category: "SITE PREMIUM • AUTOMATISATION",
    description:
      "Projet concept imaginé pour présenter des solutions d’automatisation de manière moderne, claire et accessible, avec une expérience orientée vers la prise de contact.",
    image: "/projets/Site-autopilot.png",
    href: "/realisations/autopilot",
    year: "2026",
    tags: ["SITE PREMIUM", "AUTOMATISATION"],
  },
  {
    number: "05",
    title: "IA FUTURE",
    category: "SITE PREMIUM • IA & TECHNOLOGIE",
    description:
      "Projet concept conçu pour présenter une activité technologique de façon claire, moderne et accessible, sans perdre en crédibilité.",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
    year: "2026",
    tags: ["SITE PREMIUM", "IA & TECHNOLOGIE"],
  },
  {
    number: "06",
    title: "NOVA ASSIST",
    category: "SITE PREMIUM • AGENCE DIGITALE",
    description:
      "Projet concept qui démontre comment structurer une offre de services, mettre en avant un savoir-faire et encourager la prise de contact.",
    image: "/projets/nova-assist.png",
    href: "/realisations/nova-assist",
    year: "2026",
    tags: ["SITE PREMIUM"],
  },
];

const categories = [
  "TOUS",
  "SITE PREMIUM",
  "SPORT",
  "BARBER",
  "IA & TECHNOLOGIE",
  "TRAITEUR",
  "AUTOMATISATION",
  "BOULANGERIE",
];

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("TOUS");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "TOUS") {
      return projects;
    }

    return projects.filter((project) =>
      project.tags.includes(activeCategory)
    );
  }, [activeCategory]);

  return (
    <main className="realisations-page">
      <div className="realisations-background" aria-hidden="true">
        <div className="realisations-grid" />
        <div className="realisations-glow realisations-glow-one" />
        <div className="realisations-glow realisations-glow-two" />
      </div>

      <div className="realisations-shell">
        <section className="realisations-hero">
          <div className="realisations-hero-top">
            <div className="realisations-eyebrow">
              <span className="realisations-dot" />
              NOVA / RÉALISATIONS
            </div>

            <div className="realisations-hero-count">
              <span>N</span>
              <span>/ 06</span>
            </div>
          </div>

          <div className="realisations-hero-main">
            <div className="realisations-hero-index">01 — 06</div>

            <div className="realisations-hero-content">
              <h1>
                DES PROJETS
                <br />
                <span>QUI ONT DU SENS.</span>
              </h1>

              <p>
                Une sélection de projets pensés pour créer une présence
                digitale claire, moderne et mémorable.
              </p>
            </div>
          </div>

          <div className="realisations-hero-bottom">
            <span>SCROLL POUR EXPLORER</span>

            <div className="realisations-scroll-line">
              <span />
            </div>

            <span>2026</span>
          </div>
        </section>

        <section className="realisations-filter-section">
          <div className="realisations-filter-header">
            <span>FILTRER LES PROJETS</span>

            <span>
              {filteredProjects.length.toString().padStart(2, "0")} PROJETS
            </span>
          </div>

          <div className="realisations-filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "realisations-filter active"
                    : "realisations-filter"
                }
                onClick={() => setActiveCategory(category)}
              >
                <span>{category}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="realisations-projects">
          {filteredProjects.map((project, index) => (
            <article
              className="realisations-project"
              key={project.number}
            >
              <div className="realisations-project-number">
                {project.number}
              </div>

              <div className="realisations-project-content">
                <div className="realisations-project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <Link
                  href={project.href}
                  className="realisations-project-image-link"
                >
                  <div className="realisations-project-image">
                    <img
                      src={project.image}
                      alt={`${project.title} — projet NOVA`}
                    />

                    <div className="realisations-project-image-overlay">
                      <span>VOIR LE PROJET</span>
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>

                <div className="realisations-project-info">
                  <div>
                    <h2>{project.title}</h2>

                    <p>{project.description}</p>
                  </div>

                  <Link
                    href={project.href}
                    className="realisations-project-link"
                  >
                    <span>EXPLORER</span>
                    <ArrowIcon />
                  </Link>
                </div>
              </div>

              <div className="realisations-project-side">
                <span>{project.number}</span>

                <span>
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(filteredProjects.length).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="realisations-benefits">
          <div className="realisations-benefits-header">
            <p className="realisations-label">POURQUOI NOVA</p>

            <h2>
              Chaque projet commence
              <br />
              par une <span>bonne intention.</span>
            </h2>
          </div>

          <div className="realisations-benefits-grid">
            <article className="realisations-benefit-card">
              <span>01</span>

              <h3>Clarté</h3>

              <p>
                Une structure pensée pour rendre votre activité
                immédiatement compréhensible.
              </p>
            </article>

            <article className="realisations-benefit-card">
              <span>02</span>

              <h3>Identité</h3>

              <p>
                Une direction visuelle cohérente pour créer une présence
                reconnaissable.
              </p>
            </article>

            <article className="realisations-benefit-card">
              <span>03</span>

              <h3>Performance</h3>

              <p>
                Une expérience rapide, responsive et pensée pour tous les
                écrans.
              </p>
            </article>
          </div>
        </section>

        <section className="realisations-cta">
          <div className="realisations-cta-index">06</div>

          <div className="realisations-cta-content">
            <p className="realisations-label">NOVA / VOTRE PROJET</p>

            <h2>
              Et si le prochain
              <br />
              projet était <span>le vôtre ?</span>
            </h2>

            <Link href="/devis" className="realisations-cta-button">
              <span>PARLER DE MON PROJET</span>
              <ArrowIcon />
            </Link>
          </div>
        </section>

        <footer className="realisations-footer">
          <div className="realisations-footer-brand">
            <span className="realisations-brand-mark">N</span>
            <span>NOVA</span>
          </div>

          <div className="realisations-footer-center">
            <span>RÉALISATIONS</span>
            <span>2026</span>
          </div>

          <Link href="/devis" className="realisations-footer-link">
            <span>PARLER DU PROJET</span>
            <ArrowIcon />
          </Link>
        </footer>
      </div>
    </main>
  );
}