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

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="project-header">

        <Link
          href="/realisations"
          className="project-back"
        >
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
          VOIR LE SITE
          <span
            className="clean-arrow"
            aria-hidden="true"
          />
        </a>

      </header>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        className="project-intro"
        aria-labelledby="storm-title"
      >

        <p>PROJET • SPORT LIFESTYLE</p>

        <h1 id="storm-title">
          STORM
        </h1>

        <span>
          Une expérience digitale premium imaginée pour une marque
          sport lifestyle masculine.
        </span>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

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


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="project-bottom">

        <p>
          SILENCE BEFORE THE STORM
        </p>

        <a
          href={stormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-button"
        >
          VISITER LE SITE

          <span
            className="clean-arrow"
            aria-hidden="true"
          />
        </a>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="project-footer">

        <span>
          STORM
        </span>

        <Link href="/realisations">
          RETOUR AUX RÉALISATIONS
        </Link>

      </footer>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

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