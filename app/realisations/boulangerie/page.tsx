"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

const gallery = [
  {
    image: "/projets/Boulangerie-1.png",
    number: "01",
    label: "ACCUEIL",
    title: "Page d’accueil",
    description:
      "Une page d’accueil pensée pour présenter immédiatement l’univers de la boulangerie et mettre ses créations en valeur.",
    alt: "BOULANGERIE — page d’accueil",
  },
  {
    image: "/projets/Boulangerie-2.png",
    number: "02",
    label: "CRÉATIONS",
    title: "Cakes & créations",
    description:
      "Une page dédiée aux cakes et aux créations pour présenter les produits de manière claire et visuelle.",
    alt: "BOULANGERIE — page cakes et créations",
  },
  {
    image: "/projets/Boulangerie-AD.png",
    number: "03",
    label: "ADMINISTRATION",
    title: "Gestion du contenu en temps réel",
    description:
      "Une interface d’administration permettant d’ajouter et de mettre à jour les photos et les produits en temps réel, directement depuis un ordinateur ou un mobile.",
    alt: "BOULANGERIE — interface d’administration sur mobile et PC",
  },
];

export default function BoulangeriePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeAlt, setActiveAlt] = useState("");

  const openLightbox = (image: string, alt: string) => {
    setActiveImage(image);
    setActiveAlt(alt);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
    setActiveAlt("");
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <main className="project-page">
      <div className="project-background" aria-hidden="true">
        <div className="project-grid" />
        <div className="project-glow project-glow-one" />
        <div className="project-glow project-glow-two" />
      </div>

      <div className="project-shell">
        <header className="project-header">
          <Link
            href="/"
            className="project-brand"
            aria-label="Retour à l'accueil NOVA"
          >
            <span className="project-brand-mark">N</span>
            <span className="project-brand-name">NOVA</span>
          </Link>

          <div className="project-header-center">
            <span>RÉALISATIONS</span>
            <span className="project-header-line" />
            <span>03 / 06</span>
          </div>

          <Link href="/devis" className="project-live">
            <span>PARLER DU PROJET</span>
            <ArrowIcon />
          </Link>
        </header>

        <section className="project-hero">
          <div className="project-hero-top">
            <div className="project-eyebrow">
              <span className="project-dot" />
              PROJET CONCEPT
            </div>

            <div className="project-hero-meta">
              <span>2026</span>
              <span>RESTAURATION / BOULANGERIE</span>
            </div>
          </div>

          <div className="project-hero-main">
            <div className="project-hero-index">03</div>

            <div className="project-hero-title-wrap">
              <h1>BOULANGERIE</h1>
              <p>Créations gourmandes.</p>
            </div>
          </div>

          <div className="project-hero-bottom">
            <p className="project-hero-description">
              Un concept digital pensé pour présenter une boulangerie, ses
              créations et une interface d’administration permettant d’ajouter
              et de mettre à jour les photos et les produits en temps réel,
              depuis un ordinateur ou un mobile.
            </p>

            <div className="project-hero-navigation">
              <span>01 — ACCUEIL</span>
              <span>02 — CRÉATIONS</span>
              <span>03 — ADMINISTRATION</span>
            </div>
          </div>
        </section>

        <section className="project-feature">
          <button
            type="button"
            className="project-image-button"
            onClick={() =>
              openLightbox(
                "/projets/Boulangerie-1.png",
                "BOULANGERIE — page d’accueil"
              )
            }
            aria-label="Agrandir la page d'accueil de la boulangerie"
          >
            <div className="project-image-frame">
              <img
                src="/projets/Boulangerie-1.png"
                alt="BOULANGERIE — page d’accueil"
              />

              <span className="project-image-overlay">
                <span>AGRANDIR</span>
                <ArrowIcon />
              </span>
            </div>
          </button>

          <div className="project-feature-caption">
            <span>01</span>
            <span>PAGE D’ACCUEIL</span>
            <span>BOULANGERIE</span>
          </div>
        </section>

        <section className="project-intro">
          <div className="project-section-number">01 /</div>

          <div className="project-intro-content">
            <p className="project-label">L’EXPÉRIENCE</p>

            <h2>
              Une présence qui
              <br />
              met les créations
              <br />
              <span>en valeur.</span>
            </h2>

            <p className="project-intro-text">
              Le projet présente une expérience digitale dédiée à l’univers
              d’une boulangerie. L’accueil pose l’univers du site, la page
              créations permet de présenter les cakes et produits, tandis que
              l’interface d’administration permet de gérer les photos et les
              produits en temps réel.
            </p>
          </div>
        </section>

        <section className="project-gallery">
          <div className="project-gallery-header">
            <div>
              <p className="project-label">LES ÉCRANS</p>

              <h2>
                Trois espaces,
                <br />
                une même <span>expérience.</span>
              </h2>
            </div>

            <p className="project-gallery-intro">
              De la présentation de la boulangerie à la gestion du contenu,
              chaque écran possède son rôle dans l’expérience.
            </p>
          </div>

          <div className="project-gallery-grid">
            {gallery.slice(1).map((item) => (
              <article
                className="project-gallery-item"
                key={item.number}
              >
                <button
                  type="button"
                  className="project-image-button"
                  onClick={() => openLightbox(item.image, item.alt)}
                  aria-label={`Agrandir ${item.title}`}
                >
                  <div className="project-image-frame">
                    <img src={item.image} alt={item.alt} />

                    <span className="project-image-overlay">
                      <span>AGRANDIR</span>
                      <ArrowIcon />
                    </span>
                  </div>
                </button>

                <div className="project-gallery-caption">
                  <div className="project-gallery-caption-top">
                    <span>{item.number}</span>
                    <span>{item.label}</span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="project-case-study">
          <div className="project-case-study-heading">
            <p className="project-label">LE PROJET</p>

            <h2>
              Pensé pour être
              <br />
              <span>simple à présenter.</span>
            </h2>
          </div>

          <div className="project-case-study-grid">
            <article className="project-case-study-card">
              <span className="project-case-number">01</span>

              <p className="project-label">L’ACCUEIL</p>

              <h3>Une première impression claire.</h3>

              <p>
                La page d’accueil présente l’univers de la boulangerie et
                permet de mettre immédiatement les créations en avant.
              </p>
            </article>

            <article className="project-case-study-card">
              <span className="project-case-number">02</span>

              <p className="project-label">LES CRÉATIONS</p>

              <h3>Mettre les produits au premier plan.</h3>

              <p>
                Une page dédiée aux cakes et aux créations permet de présenter
                les produits de manière visuelle et structurée.
              </p>
            </article>

            <article className="project-case-study-card">
              <span className="project-case-number">03</span>

              <p className="project-label">ADMINISTRATION</p>

              <h3>Gérer le contenu en temps réel.</h3>

              <p>
                L’interface d’administration permet d’ajouter et de mettre à
                jour les photos et les produits en temps réel, depuis un PC ou
                un mobile.
              </p>

              <div className="project-admin-tags">
                <span>PC</span>
                <span>MOBILE</span>
                <span>TEMPS RÉEL</span>
              </div>
            </article>
          </div>
        </section>

        <section className="project-cta">
          <div className="project-cta-index">03</div>

          <div className="project-cta-content">
            <p className="project-label">NOVA / BOULANGERIE</p>

            <h2>
              Construisons quelque chose
              <br />
              qui vous <span>ressemble.</span>
            </h2>

            <Link href="/devis" className="project-cta-button">
              <span>PARLER DE MON PROJET</span>
              <ArrowIcon />
            </Link>
          </div>
        </section>

        <footer className="project-footer">
          <div className="project-footer-brand">
            <span className="project-brand-mark">N</span>
            <span>NOVA</span>
          </div>

          <div className="project-footer-center">
            <span>BOULANGERIE</span>
            <span>RESTAURATION / BOULANGERIE</span>
          </div>

          <Link href="/realisations" className="project-footer-back">
            <span>TOUTES LES RÉALISATIONS</span>
            <ArrowIcon />
          </Link>
        </footer>
      </div>

      {lightboxOpen && activeImage && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu du projet"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="project-lightbox-close"
            onClick={closeLightbox}
            aria-label="Fermer l’aperçu"
          >
            <span />
            <span />
          </button>

          <div
            className="project-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeImage} alt={activeAlt} />
          </div>
        </div>
      )}
    </main>
  );
}