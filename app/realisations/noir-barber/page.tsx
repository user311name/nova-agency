"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./page.css";

const images = [
  "/projets/barber-home.png",
  "/projets/barber-reservation.png",
  "/projets/barber-services.png",
];

const siteUrl = "https://noir-barber-weld.vercel.app/#booking";

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg
      className={`arrow-icon ${left ? "arrow-icon-left" : ""}`}
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

export default function NoirBarberPage() {
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
        <span className="background-grid" />
        <span className="background-glow background-glow-one" />
        <span className="background-glow background-glow-two" />
      </div>

      <header className="project-header">
        <Link href="/realisations" className="project-back">
          <span className="back-icon">
            <ArrowIcon left />
          </span>
          <span>RÉALISATIONS</span>
        </Link>

        <div className="barber-title">
          <span className="title-dot" />
          NOIR BARBER
        </div>

        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-live"
        >
          <span>VOIR LA DÉMO</span>
          <ExternalArrowIcon />
        </a>
      </header>

      <section className="project-hero" aria-labelledby="barber-title">
        <div className="hero-meta">
          <span>PROJET CONCEPT</span>
          <span>BARBER SHOP</span>
          <span>2025</span>
        </div>

        <div className="hero-main">
          <div className="hero-index">
            <span>01</span>
            <span>/</span>
            <span>03</span>
          </div>

          <div className="hero-content">
            <p className="hero-kicker">
              NOVA — DIGITAL EXPERIENCE
            </p>

            <h1 id="barber-title">
              NOIR
              <span>BARBER</span>
            </h1>

            <p className="hero-description">
              Un concept digital imaginé pour un barber moderne, élégant
              et orienté expérience client.
            </p>
          </div>

          <div className="hero-side">
            <span>IDENTITÉ</span>
            <span>UX / UI</span>
            <span>WEB DESIGN</span>
          </div>
        </div>

        <div className="hero-line">
          <span>01 — IDENTITÉ</span>
          <span>02 — EXPÉRIENCE</span>
          <span>03 — RÉSERVATION</span>
        </div>
      </section>

      <section className="project-feature">
        <div className="feature-top">
          <span>01 / HOMEPAGE</span>
          <span>NOIR BARBER</span>
        </div>

        <button
          type="button"
          className="feature-image"
          onClick={() => setSelectedImage(images[0])}
          aria-label="Agrandir l'image principale de Noir Barber"
        >
          <Image
            src={images[0]}
            alt="Noir Barber — page principale"
            fill
            priority
            sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 1200px) calc(100vw - 48px), 1280px"
          />

          <span className="feature-shade" />

          <span className="feature-number">01</span>

          <span className="feature-expand">
            <ExternalArrowIcon />
          </span>
        </button>
      </section>

      <section className="project-intro">
        <div className="intro-index">01</div>

        <div className="intro-content">
          <p className="section-label">L&apos;IDÉE</p>

          <h2>
            Une image qui
            <span>inspire confiance.</span>
          </h2>

          <p>
            Une direction artistique sombre, précise et premium, pensée pour
            différencier un barber et renforcer la perception de son
            savoir-faire.
          </p>
        </div>
      </section>

      <section className="project-gallery">
        <div className="gallery-heading">
          <div>
            <p className="section-label">L&apos;EXPÉRIENCE</p>
            <h2>Chaque écran accompagne le parcours.</h2>
          </div>

          <span className="gallery-count">02 — 03</span>
        </div>

        <div className="gallery-grid">
          <button
            type="button"
            className="gallery-image gallery-image-large"
            onClick={() => setSelectedImage(images[1])}
            aria-label="Agrandir l'image réservation de Noir Barber"
          >
            <Image
              src={images[1]}
              alt="Noir Barber — réservation"
              fill
              sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 1100px) 65vw, 60vw"
            />

            <span className="gallery-shade" />
            <span className="gallery-number">02</span>

            <span className="gallery-expand">
              <ExternalArrowIcon />
            </span>
          </button>

          <button
            type="button"
            className="gallery-image gallery-image-small"
            onClick={() => setSelectedImage(images[2])}
            aria-label="Agrandir l'image services de Noir Barber"
          >
            <Image
              src={images[2]}
              alt="Noir Barber — services"
              fill
              sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 1100px) 40vw, 35vw"
            />

            <span className="gallery-shade" />
            <span className="gallery-number">03</span>

            <span className="gallery-expand">
              <ExternalArrowIcon />
            </span>
          </button>
        </div>
      </section>

      <section className="project-case-study">
        <div className="case-study-heading">
          <div>
            <p className="section-label">
              CE QUE CE PROJET DÉMONTRE
            </p>

            <h2>
              Une expérience pensée
              <span>pour convertir.</span>
            </h2>
          </div>

          <span className="case-study-index">02</span>
        </div>

        <div className="case-study-grid">
          <article>
            <div className="case-number">01</div>

            <div>
              <span>LE CONCEPT</span>
              <h3>Une image qui inspire confiance.</h3>

              <p>
                Une direction artistique sombre, précise et premium, pensée
                pour différencier un barber et renforcer la perception de son
                savoir-faire.
              </p>
            </div>
          </article>

          <article>
            <div className="case-number">02</div>

            <div>
              <span>L&apos;OBJECTIF</span>
              <h3>Guider le visiteur vers la réservation.</h3>

              <p>
                Le parcours met en avant les services, l’univers de la marque
                et les points de contact importants afin de faciliter le
                passage à l’action.
              </p>
            </div>
          </article>

          <article>
            <div className="case-number">03</div>

            <div>
              <span>L&apos;APPROCHE NOVA</span>
              <h3>Un site aussi clair que visuel.</h3>

              <p>
                Ce concept illustre notre façon de concevoir : une expérience
                sur mesure, cohérente sur mobile et pensée autour des futurs
                clients.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="project-bottom">
        <p className="bottom-label">NOIR BARBER / NOVA</p>

        <h2>
          Votre activité mérite
          <span>une présence forte.</span>
        </h2>

        <div className="project-actions">
          <a
            href={siteUrl}
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
        <span>NOIR BARBER / NOVA</span>

        <Link href="/realisations" className="footer-back">
          <ArrowIcon left />
          <span>RETOUR AUX RÉALISATIONS</span>
        </Link>

        <span>01 — 2025</span>
      </footer>

      {selectedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi de Noir Barber"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer l'aperçu"
          >
            <CloseIcon />
          </button>

          <div
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Noir Barber — aperçu agrandi"
              fill
              sizes="100vw"
            />
          </div>

          <span className="lightbox-label">
            NOIR BARBER / PREVIEW
          </span>
        </div>
      )}
    </main>
  );
}