"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./page.css";

const images = [
  "/projets/Site-autopilot.png",
  "/projets/Site-autopilot1.png",
  "/projets/Site-autopilot2.png",
];

const projectUrl = "https://autopilot-solution.vercel.app/";

function ArrowIcon({
  direction = "right",
}: {
  direction?: "right" | "left";
}) {
  return (
    <svg
      className={`arrow-icon ${direction === "left" ? "arrow-left" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg
      className="external-arrow-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="close-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export default function AutopilotPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <main className="project-page">
      <div className="project-background" aria-hidden="true">
        <span className="background-glow" />
        <span className="background-grid" />
      </div>

      <header className="project-header">
        <Link href="/realisations" className="project-back">
          <span className="back-icon">
            <ArrowIcon direction="left" />
          </span>
          <span>RÉALISATIONS</span>
        </Link>

        <div className="project-mark">
          <span>AUTOPILOT</span>
          <small>04 / 06</small>
        </div>

        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-live"
        >
          <span>VOIR LA DÉMO</span>
          <ExternalArrowIcon />
        </a>
      </header>

      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-hero-meta">
          <span>PROJET CONCEPT</span>
          <span>AUTOMATISATION / DIGITAL</span>
          <span>2026</span>
        </div>

        <div className="project-hero-title">
          <p className="project-eyebrow">NOVA — DIGITAL EXPERIENCE</p>

          <h1 id="project-title">
            AUTOPILOT
            <span>Automatiser mieux.</span>
          </h1>

          <p className="project-description">
            Un concept digital pensé pour présenter les possibilités de
            l’automatisation de manière claire, moderne et accessible.
          </p>
        </div>

        <div className="project-hero-footer">
          <span>01 — IDENTITÉ</span>
          <span>02 — AUTOMATISATION</span>
          <span>03 — CONVERSION</span>
        </div>
      </section>

      <section
        className="project-feature"
        aria-label="Présentation visuelle du projet AutoPilot"
      >
        <button
          type="button"
          className="feature-image"
          onClick={() => setSelectedImage(images[0])}
          aria-label="Agrandir la première image du projet AutoPilot"
        >
          <Image
            src={images[0]}
            alt="AutoPilot — aperçu principal du projet"
            fill
            priority
            sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1200px) calc(100vw - 50px), 1280px"
          />

          <span className="image-shade" />
          <span className="image-label">APERÇU / 01</span>

          <span className="image-expand" aria-hidden="true">
            <ExternalArrowIcon />
          </span>
        </button>
      </section>

      <section className="project-intro">
        <div className="project-intro-index">01</div>

        <div className="project-intro-content">
          <p className="section-label">L&apos;IDÉE</p>

          <h2>
            Simplifier ce qui peut être
            <span> automatisé.</span>
          </h2>

          <p>
            AutoPilot présente l’automatisation comme un moyen de simplifier
            les tâches répétitives et de gagner en efficacité. Le site met
            l’accent sur la clarté, les usages et la prise de contact.
          </p>
        </div>
      </section>

      <section className="project-gallery">
        <div className="gallery-heading">
          <div>
            <p className="section-label">L&apos;EXPÉRIENCE</p>
            <h2>Une interface pensée pour expliquer simplement.</h2>
          </div>

          <span className="gallery-count">02 — 03</span>
        </div>

        <div className="gallery-grid">
          <button
            type="button"
            className="gallery-image gallery-image-2"
            onClick={() => setSelectedImage(images[1])}
            aria-label="Agrandir la deuxième image du projet AutoPilot"
          >
            <Image
              src={images[1]}
              alt="AutoPilot — aperçu deuxième écran"
              fill
              sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) 100vw, 55vw"
            />

            <span className="image-shade" />
            <span className="gallery-image-number">02</span>

            <span className="gallery-image-expand" aria-hidden="true">
              <ExternalArrowIcon />
            </span>
          </button>

          <button
            type="button"
            className="gallery-image gallery-image-3"
            onClick={() => setSelectedImage(images[2])}
            aria-label="Agrandir la troisième image du projet AutoPilot"
          >
            <Image
              src={images[2]}
              alt="AutoPilot — aperçu troisième écran"
              fill
              sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) 100vw, 35vw"
            />

            <span className="image-shade" />
            <span className="gallery-image-number">03</span>

            <span className="gallery-image-expand" aria-hidden="true">
              <ExternalArrowIcon />
            </span>
          </button>
        </div>
      </section>

      <section className="project-case-study">
        <div className="case-study-heading">
          <div>
            <p className="section-label">CE QUE CE PROJET DÉMONTRE</p>
            <h2>Une promesse claire. Une expérience orientée action.</h2>
          </div>

          <span className="case-study-number">03</span>
        </div>

        <div className="case-study-grid">
          <article>
            <span>01 / LE CONCEPT</span>

            <h3>Rendre l’automatisation accessible.</h3>

            <p>
              Une présentation pensée pour expliquer simplement l’intérêt des
              automatisations et leurs applications dans une activité.
            </p>
          </article>

          <article>
            <span>02 / L&apos;OBJECTIF</span>

            <h3>Transformer la complexité en simplicité.</h3>

            <p>
              Le parcours met en avant les solutions et les usages afin
              d’aider le visiteur à comprendre rapidement la proposition.
            </p>
          </article>

          <article>
            <span>03 / L&apos;APPROCHE NOVA</span>

            <h3>Une expérience digitale structurée.</h3>

            <p>
              Une hiérarchie visuelle forte, des sections lisibles et une
              navigation conçue pour guider naturellement vers la prise de
              contact.
            </p>
          </article>
        </div>
      </section>

      <section className="project-bottom">
        <p className="project-bottom-label">UN PROJET À VOTRE IMAGE ?</p>

        <h2>
          Construisons quelque chose
          <span> qui vous ressemble.</span>
        </h2>

        <div className="project-actions">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
          >
            <span>VOIR LA DÉMO</span>
            <ExternalArrowIcon />
          </a>

          <Link href="/devis" className="project-devis-link">
            <span>PARLER DE MON PROJET</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <footer className="project-footer">
        <span>AUTOPILOT / NOVA</span>

        <Link href="/realisations">
          <ArrowIcon direction="left" />
          <span>RETOUR AUX RÉALISATIONS</span>
        </Link>

        <span>04 — 2026</span>
      </footer>

      {selectedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu de l'image du projet AutoPilot"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer l’aperçu"
          >
            <CloseIcon />
          </button>

          <div
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="AutoPilot — aperçu agrandi"
              fill
              sizes="100vw"
            />
          </div>

          <span className="lightbox-label">AUTOPILOT / PREVIEW</span>
        </div>
      )}
    </main>
  );
}