"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./page.css";

const images = [
  "/projets/barber-home.png",
  "/projets/barber-reservation.png",
  "/projets/barber-services.png",
];

const siteUrl = "https://noir-barber-weld.vercel.app/#booking";

export default function NoirBarberPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="project-page">
      <header className="project-header">
        <Link href="/realisations" className="project-back">
          <span className="clean-arrow clean-arrow-left" />
          RÉALISATIONS
        </Link>

        <div className="barber-title">NOIR BARBER</div>

        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-live"
        >
          VOIR LA DÉMO
          <span className="clean-arrow" />
        </a>
      </header>

      <section className="project-intro">
        <p>PROJET CONCEPT • BARBER SHOP</p>

        <h1>NOIR BARBER</h1>

        <span>
          Un concept digital imaginé pour un barber moderne, élégant
          et orienté expérience client.
        </span>
      </section>

      <section className="project-gallery">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className="project-image"
            onClick={() => setSelectedImage(image)}
            aria-label={`Agrandir l'image Noir Barber ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Noir Barber projet ${index + 1}`}
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
            <h2>Une image qui inspire confiance.</h2>
            <p>
              Une direction artistique sombre, précise et premium,
              pensée pour différencier un barber et renforcer la
              perception de son savoir-faire.
            </p>
          </article>

          <article>
            <span>L’OBJECTIF</span>
            <h2>Guider le visiteur vers la réservation.</h2>
            <p>
              Le parcours met en avant les services, l’univers de la
              marque et les points de contact importants afin de
              faciliter le passage à l’action.
            </p>
          </article>

          <article>
            <span>L’APPROCHE NOVA</span>
            <h2>Un site aussi clair que visuel.</h2>
            <p>
              Ce concept illustre notre façon de concevoir : une
              expérience sur mesure, cohérente sur mobile et pensée
              autour des futurs clients.
            </p>
          </article>
        </div>
      </section>

      <section className="project-bottom">
        <p>NOIR BARBER • PROJET CONCEPT DIGITAL</p>

        <div className="project-actions">
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
          >
            VOIR LA DÉMO
            <span className="clean-arrow" />
          </a>

          <Link href="/devis" className="project-devis-link">
            PARLER DE MON PROJET
            <span className="clean-arrow" />
          </Link>
        </div>
      </section>

      <footer className="project-footer">
        <span>NOIR BARBER</span>

        <Link href="/realisations">
          RETOUR AUX RÉALISATIONS
        </Link>
      </footer>

      {selectedImage && (
        <div
          className="image-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer"
          >
            ×
          </button>

          <div
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Noir Barber aperçu"
              fill
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </main>
  );
}