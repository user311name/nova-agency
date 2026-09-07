"use client";

import Link from "next/link";
import "./page.css";

function ServerIcon() {
  return (
    <svg
      className="client-services-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01" />
      <path d="M8 17h.01" />
      <path d="M12 7h5" />
      <path d="M12 17h5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="client-services-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9-3.5-6.5-3.5-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="client-services-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="client-services-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="client-services-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="client-services-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ClientHostingPage() {
  return (
    <main className="client-services-page">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="client-services-background"
        aria-hidden="true"
      >
        <div className="client-services-orb client-services-orb-one" />
        <div className="client-services-orb client-services-orb-two" />
        <div className="client-services-grid" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="client-services-shell">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="client-services-hero">
          <div className="client-services-hero-copy">
            <div className="client-services-badge">
              <span />
              HÉBERGEMENT NOVA
            </div>

            <div className="client-services-eyebrow">
              <i />
              INFRASTRUCTURE WEB
            </div>

            <h1>
              Votre site.
              <br />
              <span>Notre infrastructure.</span>
            </h1>

            <p>
              Un hébergement pensé pour les sites professionnels qui
              recherchent vitesse, stabilité et simplicité.
            </p>

            <div className="client-services-hero-actions">
              <Link
                href="/contact"
                className="client-services-primary"
              >
                Contacter NOVA
                <ArrowIcon />
              </Link>

              <Link
                href="/espace-client"
                className="client-services-secondary"
              >
                Retour à l&apos;espace client
              </Link>
            </div>
          </div>

          {/* =================================================
              VISUAL
          ================================================= */}

          <div
            className="client-services-visual"
            aria-hidden="true"
          >
            <div className="client-services-visual-glow" />

            <div className="client-services-orbit orbit-one" />
            <div className="client-services-orbit orbit-two" />
            <div className="client-services-orbit orbit-three" />

            <div className="client-services-server-card">
              <div className="server-card-top">
                <span>NOVA INFRASTRUCTURE</span>

                <span className="server-status">
                  <i />
                  ONLINE
                </span>
              </div>

              <div className="server-card-icon">
                <ServerIcon />
              </div>

              <strong>
                Hébergement Web
              </strong>

              <p>
                Infrastructure conçue pour maintenir votre site
                rapide, stable et disponible.
              </p>

              <div className="server-card-line">
                <span>Disponibilité</span>
                <b>99,9 %</b>
              </div>

              <div className="server-card-line">
                <span>SSL</span>
                <b>Activé</b>
              </div>

              <div className="server-card-line">
                <span>Surveillance</span>
                <b>24 / 7</b>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            INTRO
        ================================================= */}

        <section className="client-services-intro">
          <div className="client-services-section-label">
            01 — INFRASTRUCTURE
          </div>

          <div className="client-services-intro-heading">
            <h2>
              L&apos;hébergement
              <br />
              <span>sans complexité.</span>
            </h2>

            <p>
              Votre infrastructure doit simplement fonctionner.
              NOVA vous permet de garder une base technique solide
              pour votre présence en ligne, sans multiplier les
              outils ou les interfaces.
            </p>
          </div>
        </section>

        {/* =================================================
            SERVICES
        ================================================= */}

        <section className="client-services-list-section">
          <div className="client-services-section-heading">
            <div>
              <span>
                CE QUI EST INCLUS
              </span>

              <h2>
                Une infrastructure
                <br />
                <span>professionnelle.</span>
              </h2>
            </div>

            <div className="client-services-heading-number">
              02
            </div>
          </div>

          <div className="client-services-grid-cards">
            {/* =============================================
                PERFORMANCE
            ============================================= */}

            <article className="client-service-card featured">
              <div className="client-service-card-top">
                <div className="client-service-card-icon">
                  <ServerIcon />
                </div>

                <div className="client-service-card-status">
                  <i />
                  ACTIF
                </div>
              </div>

              <div className="client-service-card-content">
                <span className="client-service-card-number">
                  01 / PERFORMANCE
                </span>

                <h3>
                  Rapide et stable.
                </h3>

                <p>
                  Une infrastructure pensée pour offrir de bonnes
                  performances et une expérience fluide à vos
                  visiteurs.
                </p>
              </div>

              <div className="client-service-card-bottom">
                <span>
                  INFRASTRUCTURE NOVA
                </span>

                <span>
                  <CheckIcon />
                </span>
              </div>
            </article>

            {/* =============================================
                SÉCURITÉ
            ============================================= */}

            <article className="client-service-card">
              <div className="client-service-card-top">
                <div className="client-service-card-icon">
                  <ShieldIcon />
                </div>

                <div className="client-service-card-status">
                  <i />
                  PROTÉGÉ
                </div>
              </div>

              <div className="client-service-card-content">
                <span className="client-service-card-number">
                  02 / SÉCURITÉ
                </span>

                <h3>
                  Protégé par défaut.
                </h3>

                <p>
                  SSL et bonnes pratiques de sécurité pour protéger
                  votre site et vos visiteurs au quotidien.
                </p>
              </div>

              <div className="client-service-card-bottom">
                <span>
                  SSL INCLUS
                </span>

                <span>
                  <CheckIcon />
                </span>
              </div>
            </article>

            {/* =============================================
                DISPONIBILITÉ
            ============================================= */}

            <article className="client-service-card">
              <div className="client-service-card-top">
                <div className="client-service-card-icon">
                  <GlobeIcon />
                </div>

                <div className="client-service-card-status">
                  <i />
                  SURVEILLÉ
                </div>
              </div>

              <div className="client-service-card-content">
                <span className="client-service-card-number">
                  03 / DISPONIBILITÉ
                </span>

                <h3>
                  Toujours accessible.
                </h3>

                <p>
                  Votre infrastructure est pensée pour rester
                  disponible et accompagner votre activité en ligne.
                </p>
              </div>

              <div className="client-service-card-bottom">
                <span>
                  SURVEILLANCE 24 / 7
                </span>

                <span>
                  <CheckIcon />
                </span>
              </div>
            </article>

            {/* =============================================
                ÉCOSYSTÈME
            ============================================= */}

            <article className="client-service-card">
              <div className="client-service-card-top">
                <div className="client-service-card-icon">
                  <MailIcon />
                </div>

                <div className="client-service-card-status">
                  <i />
                  NOVA
                </div>
              </div>

              <div className="client-service-card-content">
                <span className="client-service-card-number">
                  04 / ÉCOSYSTÈME
                </span>

                <h3>
                  Tout connecté.
                </h3>

                <p>
                  Votre hébergement s&apos;intègre naturellement avec
                  vos domaines, vos emails professionnels et les
                  autres services NOVA.
                </p>
              </div>

              <div className="client-service-card-bottom">
                <span>
                  ÉCOSYSTÈME NOVA
                </span>

                <span>
                  <CheckIcon />
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section className="client-services-cta">
          <div className="client-services-cta-glow" />

          <div>
            <span>
              BESOIN D&apos;UNE CONFIGURATION ?
            </span>

            <h2>
              Votre projet mérite
              <br />
              <em>la bonne infrastructure.</em>
            </h2>

            <p>
              Vous avez besoin d&apos;un hébergement adapté à votre
              site ou à votre activité ? L&apos;équipe NOVA peut vous
              accompagner dans la configuration.
            </p>
          </div>

          <Link
            href="/contact"
            className="client-services-cta-button"
          >
            Contacter NOVA
            <ArrowIcon />
          </Link>
        </section>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="client-services-footer">
        <div className="client-services-footer-inner">
          <Link
            href="/espace-client"
            className="client-services-footer-logo"
          >
            NOV<span>A</span>
          </Link>

          <div className="client-services-footer-links">
            <Link href="/espace-client/domaines">
              Domaines
            </Link>

            <Link href="/espace-client/services">
              Hébergement
            </Link>

            <Link href="/espace-client/emails">
              Emails
            </Link>

            <Link href="/espace-client/securite">
              Sécurité
            </Link>
          </div>

          <span>
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}