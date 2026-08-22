"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./page.css";

const images = [
  "/projets/storm-1.png",
  "/projets/storm-2.png",
  "/projets/storm-3.png",
];

const stormUrl = "https://storm-peach.vercel.app/";

export default function StormPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="project-page">
      <header className="project-header">
        <Link href="/realisations" className="project-back">
          <span
            className="clean-arrow clean-arrow-left"
            aria-hidden="true"
          />
          RÉALISATIONS
        </Link>

        <Image
          src="/logo.png.png"
          alt="STORM"
          width={70}
          height={70}
          className="project-logo storm-logo"
          priority
        />

        <a
          href={stormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-live"
        >
          VOIR LA DÉMO
          <span className="clean-arrow" aria-hidden="true" />
        </a>
      </header>

      <section
        className="project-intro"
        aria-labelledby="storm-title"
      >
        <p>PROJET CONCEPT • SPORT LIFESTYLE</p>

        <h1 id="storm-title">STORM</h1>

        <span>
          Un concept digital imaginé pour une marque sport lifestyle
          masculine, forte et immédiatement reconnaissable.
        </span>
      </section>

      <section
        className="project-gallery"
        aria-label="Galerie du projet STORM"
      >
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className="project-image"
            onClick={() => setSelectedImage(image)}
            aria-label={`Agrandir l'image STORM ${index + 1}`}
          >
            <Image
              src={image}
              alt={`STORM projet ${index + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </button>
        ))}
      </section>

      <section className="project-case-study">
        <div className="case-study-heading">
          <span>01</span>
          <p>CE QUE CE PROJET DÉMONTRE</p>
        </div>

        <div className="case-study-grid">
          <article>
            <span>LE CONCEPT</span>

            <h2>Une identité qui marque.</h2>

            <p>
              Un univers visuel direct et premium, pensé pour
              donner à une marque sport lifestyle une présence
              distinctive dès les premières secondes.
            </p>
          </article>

          <article>
            <span>L’OBJECTIF</span>

            <h2>Créer de l’envie avant même l’achat.</h2>

            <p>
              Le site met l’accent sur l’image, la collection et
              l’énergie de la marque pour rendre l’expérience plus
              mémorable et engager le visiteur.
            </p>
          </article>

          <article>
            <span>L’APPROCHE NOVA</span>

            <h2>Un univers cohérent sur chaque écran.</h2>

            <p>
              Ce projet montre notre manière de travailler :
              une direction artistique claire, une navigation fluide
              et une expérience pensée aussi pour le mobile.
            </p>
          </article>
        </div>
      </section>

      <section className="project-bottom">
        <p>STORM • PROJET CONCEPT DIGITAL</p>

        <div className="project-actions">
          <a
            href={stormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
          >
            VOIR LA DÉMO
            <span className="clean-arrow" aria-hidden="true" />
          </a>

          <Link href="/devis" className="project-devis-link">
            PARLER DE MON PROJET
            <span className="clean-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="project-footer">
        <span>STORM</span>

        <Link href="/realisations">
          RETOUR AUX RÉALISATIONS
        </Link>
      </footer>

      {selectedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu de l'image STORM"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer l'aperçu"
          >
            ×
          </button>

          <div
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="STORM aperçu"
              fill
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </main>
  );
}