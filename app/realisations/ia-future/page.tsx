"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./page.css";

const images = [
  "/projets/site-ia.png",
  "/projets/site-ia1.png",
  "/projets/site-ia2.png",
];

const siteUrl = "https://site-ia-inky.vercel.app/";

function ArrowIcon({
  direction = "right",
}: {
  direction?: "right" | "left";
}) {
  return (
    <svg
      className={`ia-arrow-icon ${
        direction === "left" ? "ia-arrow-left" : ""
      }`}
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
      className="ia-external-arrow"
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
      className="ia-close-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export default function IAFuturePage() {
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
    <main className="ia-page">
      <div className="ia-background" aria-hidden="true">
        <span className="ia-background-glow" />
        <span className="ia-background-grid" />
        <span className="ia-background-orb ia-orb-one" />
        <span className="ia-background-orb ia-orb-two" />
      </div>

      <header className="ia-topbar">
        <Link href="/realisations" className="ia-back">
          <span className="ia-back-icon">
            <ArrowIcon direction="left" />
          </span>
          <span>RÉALISATIONS</span>
        </Link>

        <div className="ia-project-name">
          <span>IA FUTURE</span>
          <small>03 / 03</small>
        </div>

        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ia-top-link"
        >
          <span>VOIR LA DÉMO</span>
          <ExternalArrowIcon />
        </a>
      </header>

      <section className="ia-hero" aria-labelledby="ia-title">
        <div className="ia-hero-content">
          <div className="ia-kicker">
            <span className="ia-kicker-dot" />
            <span>PROJET CONCEPT</span>
            <span>IA & TECHNOLOGIE</span>
          </div>

          <p className="ia-hero-index">DIGITAL EXPERIENCE / 2025</p>

          <h1 id="ia-title">
            IA
            <span>FUTURE</span>
          </h1>

          <p className="ia-hero-description">
            Un concept digital pensé pour rendre une activité liée à
            l’intelligence artificielle claire, premium et accessible.
          </p>
        </div>

        <div className="ia-hero-line">
          <span>IDENTITÉ</span>
          <span>INTERFACE</span>
          <span>TECHNOLOGIE</span>
        </div>

        <div className="ia-gallery" aria-label="Galerie du projet IA Future">
          <button
            type="button"
            className="ia-image ia-image-main"
            onClick={() => setSelectedImage(images[0])}
            aria-label="Agrandir l'aperçu principal IA Future"
          >
            <Image
              src={images[0]}
              alt="IA Future — page principale"
              fill
              priority
              sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 48px), 720px"
            />

            <span className="ia-image-overlay" />
            <span className="ia-image-label">01 / MAIN EXPERIENCE</span>

            <span className="ia-image-expand" aria-hidden="true">
              <ExternalArrowIcon />
            </span>
          </button>

          <button
            type="button"
            className="ia-image ia-image-secondary"
            onClick={() => setSelectedImage(images[1])}
            aria-label="Agrandir le deuxième aperçu IA Future"
          >
            <Image
              src={images[1]}
              alt="IA Future — interface"
              fill
              sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) 45vw, 430px"
            />

            <span className="ia-image-overlay" />
            <span className="ia-image-label">02 / INTERFACE</span>

            <span className="ia-image-expand" aria-hidden="true">
              <ExternalArrowIcon />
            </span>
          </button>

          <button
            type="button"
            className="ia-image ia-image-third"
            onClick={() => setSelectedImage(images[2])}
            aria-label="Agrandir le troisième aperçu IA Future"
          >
            <Image
              src={images[2]}
              alt="IA Future — présentation"
              fill
              sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) 45vw, 430px"
            />

            <span className="ia-image-overlay" />
            <span className="ia-image-label">03 / PRESENTATION</span>

            <span className="ia-image-expand" aria-hidden="true">
              <ExternalArrowIcon />
            </span>
          </button>
        </div>

        <div className="ia-project-footer">
          <div className="ia-project-caption">
            <span className="ia-caption-line" />
            <span>IA FUTURE / DIGITAL CONCEPT</span>
          </div>

          <div className="ia-project-actions">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ia-visit"
            >
              <span>VOIR LA DÉMO</span>
              <ExternalArrowIcon />
            </a>

            <Link href="/devis" className="ia-devis-link">
              <span>PARLER DE MON PROJET</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="ia-details">
        <div className="ia-detail-label">
          <span>01</span>
          <span>CE QUE CE PROJET DÉMONTRE</span>
        </div>

        <div className="ia-detail-content">
          <div className="ia-detail-heading">
            <span className="ia-small-title">IA FUTURE</span>

            <h2>
              Une présence digitale
              <span>tournée vers le futur.</span>
            </h2>

            <div className="ia-heading-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="ia-detail-text">
            <article>
              <span>01 / LE CONCEPT</span>
              <p>
                Un projet de démonstration imaginé autour de l’intelligence
                artificielle et des nouvelles technologies.
              </p>
            </article>

            <article>
              <span>02 / L&apos;OBJECTIF</span>
              <p>
                Présenter un univers technologique de façon claire, moderne
                et facile à comprendre, même pour un visiteur non spécialiste.
              </p>
            </article>

            <article>
              <span>03 / L&apos;APPROCHE NOVA</span>
              <p>
                Une interface immersive, une information structurée et un
                parcours pensé pour inspirer confiance puis faciliter le
                passage à l’action.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="ia-navigation">
        <Link href="/realisations/noir-barber" className="ia-nav-card">
          <span>PROJET PRÉCÉDENT</span>

          <strong>
            <ArrowIcon direction="left" />
            <span>NOIR BARBER</span>
          </strong>
        </Link>

        <Link href="/realisations" className="ia-nav-center">
          <span className="ia-nav-center-dot" />
          TOUTES LES RÉALISATIONS
          <span className="ia-nav-center-dot" />
        </Link>

        <Link href="/devis" className="ia-nav-card ia-nav-right">
          <span>VOTRE PROJET</span>

          <strong>
            <span>PARLONS-EN</span>
            <ArrowIcon />
          </strong>
        </Link>
      </section>

      {selectedImage && (
        <div
          className="ia-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi du projet IA Future"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="ia-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer l'aperçu"
          >
            <CloseIcon />
          </button>

          <div
            className="ia-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="IA Future — aperçu agrandi"
              fill
              sizes="100vw"
            />
          </div>

          <span className="ia-lightbox-label">
            IA FUTURE / PREVIEW
          </span>
        </div>
      )}
    </main>
  );
}