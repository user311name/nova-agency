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

export default function NoirBarberPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="project-page">

      <header className="project-header">

        <Link href="/realisations" className="project-back">
          <span className="clean-arrow clean-arrow-left" />
          RÉALISATIONS
        </Link>


        <div className="barber-title">
          NOIR BARBER
        </div>


        <a
          href="https://noir-barber-weld.vercel.app/#booking"
          target="_blank"
          rel="noopener noreferrer"
          className="project-live"
        >
          VOIR LE SITE
          <span className="clean-arrow" />
        </a>

      </header>


      <section className="project-intro">

        <p>PROJET • BARBER SHOP</p>

        <h1>NOIR BARBER</h1>

        <span>
          Une expérience digitale premium créée pour un barber
          moderne, élégant et orienté expérience client.
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


      <section className="project-bottom">

        <p>NOIR BARBER • CONCEPT DIGITAL</p>

        <a
          href="https://noir-barber-weld.vercel.app/#booking"
          target="_blank"
          rel="noopener noreferrer"
          className="visit-button"
        >
          VISITER LE SITE
          <span className="clean-arrow" />
        </a>

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