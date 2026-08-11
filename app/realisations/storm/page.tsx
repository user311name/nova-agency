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

export default function StormPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="project-page">

      <header className="project-header">

        <Link href="/realisations" className="project-back">
          ← RÉALISATIONS
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
          href="https://storm-peach.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-live"
        >
          VOIR LE SITE ↗
        </a>

      </header>


      <section className="project-intro">

        <p>PROJET • SPORT LIFESTYLE</p>

        <h1>STORM</h1>

        <span>
          Une expérience digitale premium imaginée pour une marque
          sport lifestyle masculine.
        </span>

      </section>


      <section className="project-gallery">

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


      <section className="project-bottom">

        <p>SILENCE BEFORE THE STORM</p>

        <a
          href="https://storm-peach.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="visit-button"
        >
          VISITER LE SITE ↗
        </a>

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