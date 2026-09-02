"use client";

import Link from "next/link";
import "./page.css";

function DiagonalArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-only">
        <div className="contact-intro-section">
          <span>CONTACT / NOVA</span>

          <h1>
            Parlons de
            <br />
            <strong>votre projet.</strong>
          </h1>

          <p>
            Une question, une idée ou un besoin plus précis ? Écrivez-nous
            simplement : nous prendrons le temps de comprendre votre projet.
          </p>

          <Link href="/devis" className="contact-devis-button">
            DEMANDER UN DEVIS
            <DiagonalArrow />
          </Link>
        </div>

        <div className="contact-grid">
          {/* EMAIL */}
          <a
            href="mailto:contactpro@agency-nova.fr"
            className="contact-card email-card"
          >
            <div className="card-glow" />

            <div className="contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 7L12 13L20 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="contact-number">01</div>

            <div className="contact-content">
              <span className="contact-label">E-MAIL</span>

              <h2>contactpro@agency-nova.fr</h2>

              <p>
                Une question, une idée ou un projet à nous présenter ?
                Écrivez-nous directement.
              </p>
            </div>

            <div className="contact-arrow" aria-hidden="true">
              <DiagonalArrow />
            </div>

            <div className="card-line" />
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/novagency75/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card instagram-card"
          >
            <div className="card-glow" />

            <div className="contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="17.3"
                  cy="6.8"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="contact-number">02</div>

            <div className="contact-content">
              <span className="contact-label">INSTAGRAM</span>

              <h2>@novagency75</h2>

              <p>Découvrez l’univers et les projets de NOVA.</p>
            </div>

            <div className="contact-arrow" aria-hidden="true">
              <DiagonalArrow />
            </div>

            <div className="card-line" />
          </a>

          {/* TIKTOK */}
          <a
            href="https://www.tiktok.com/@novagency75"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card tiktok-card"
          >
            <div className="card-glow" />

            <div className="contact-icon tiktok-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M14.5 4C15.1 6.1 16.5 7.4 19 7.6V11C17.2 10.9 15.7 10.3 14.5 9.3V15.2C14.5 18.6 12.2 20.5 9.2 20.5C6.2 20.5 4 18.5 4 15.7C4 12.8 6.2 10.7 9.3 10.7C9.7 10.7 10.1 10.8 10.5 10.9V14.3C10.2 14.2 9.9 14.1 9.5 14.1C8.4 14.1 7.5 14.7 7.5 15.7C7.5 16.6 8.3 17.2 9.2 17.2C10.3 17.2 11 16.5 11 15.1V4H14.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="contact-number">03</div>

            <div className="contact-content">
              <span className="contact-label">TIKTOK</span>

              <h2>@novagency75</h2>

              <p>Retrouvez NOVA et ses inspirations sur TikTok.</p>
            </div>

            <div className="contact-arrow" aria-hidden="true">
              <DiagonalArrow />
            </div>

            <div className="card-line" />
          </a>
        </div>
      </section>
    </main>
  );
}