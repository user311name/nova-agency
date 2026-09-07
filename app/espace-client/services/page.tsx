"use client";

import Link from "next/link";
import "./page.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
      <path d="M10 7h6" />
      <path d="M10 17h6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4" />
      <path d="M12 3.5c2.25 2.25 3.45 5.1 3.45 8.5S14.25 18.25 12 20.5" />
      <path d="M12 3.5C9.75 5.75 8.55 8.6 8.55 12S9.75 18.25 12 20.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <path d="M12 3.5 19 6v5.3c0 4.55-2.8 7.75-7 9.2-4.2-1.45-7-4.65-7-9.2V6l7-2.5Z" />
      <path d="m8.7 12 2.15 2.15L15.6 9.4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
      />
      <path d="m5 7 7 5.5L19 7" />
    </svg>
  );
}

export default function ClientServicesPage() {
  return (
    <main className="client-page">
      <div
        className="client-background"
        aria-hidden="true"
      >
        <div className="client-orb client-orb-one" />
        <div className="client-orb client-orb-two" />
        <div className="client-grid-lines" />
      </div>

      <header className="client-header-bar">
        <div className="client-header-inner">
          <Link
            href="/"
            className="client-logo"
            aria-label="NOVA - Accueil"
          >
            NOV<span>A</span>
          </Link>

          <nav
            className="client-navigation"
            aria-label="Navigation principale"
          >
            <Link href="/espace-client/domaines">
              Domaines
            </Link>

            <Link
              href="/espace-client/services"
              aria-current="page"
            >
              Hébergement
            </Link>

            <Link href="/espace-client/emails">
              Emails
            </Link>

            <Link href="/espace-client/securite">
              Sécurité
            </Link>

            <Link href="/a-propos">
              À propos
            </Link>
          </nav>

          <div className="client-header-actions">
            <Link
              href="/contact"
              className="client-support-link"
            >
              Support
            </Link>

            <Link
              href="/espace-client"
              className="client-avatar"
              aria-label="Retour à mon espace client"
            >
              <span>NC</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="client-shell">
        <section className="client-hero">
          <div className="hero-copy">
            <div className="client-badge">
              <span className="badge-dot" />
              HÉBERGEMENT NOVA
            </div>

            <h1>
              Votre hébergement.
              <br />
              <span>Simple. Rapide. Fiable.</span>
            </h1>

            <p>
              Retrouvez ici vos solutions d&apos;hébergement
              et gérez vos services NOVA depuis un seul espace.
            </p>

            <div className="hero-actions">
              <Link
                href="/services"
                className="primary-client-button"
              >
                <span>Découvrir l&apos;hébergement</span>
                <ArrowIcon />
              </Link>

              <Link
                href="/contact"
                className="secondary-client-button"
              >
                Besoin d&apos;aide ?
              </Link>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-hidden="true"
          >
            <div className="hero-visual-glow" />

            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-orbit hero-orbit-three" />

            <div className="hero-core">
              <div className="hero-core-inner">
                <ServerIcon />
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card-top">
              <span className="floating-label">
                INFRASTRUCTURE
              </span>

              <div className="floating-status">
                <span />
                Opérationnelle
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card-bottom">
              <span className="floating-label">
                NOVA OS
              </span>

              <strong>
                Votre infrastructure.
              </strong>

              <small>
                Performante et sécurisée.
              </small>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-heading">
            <div>
              <span className="section-label">
                MES SERVICES
              </span>

              <h2>
                Gérez votre infrastructure
                <span> NOVA.</span>
              </h2>

              <p>
                Retrouvez vos services essentiels et accédez
                rapidement à leur gestion.
              </p>
            </div>

            <div className="dashboard-status">
              <span className="status-dot" />
              <span>Infrastructure sécurisée</span>
            </div>
          </div>

          <div className="dashboard-grid">
            <article className="dashboard-card services-card">
              <div className="card-top">
                <div>
                  <span className="card-label">
                    HÉBERGEMENT WEB
                  </span>

                  <h3>
                    Hébergement NOVA
                  </h3>
                </div>

                <div className="card-round-action">
                  <ArrowIcon />
                </div>
              </div>

              <div className="service-list">
                <div className="service-item">
                  <div className="service-icon">
                    <ServerIcon />
                  </div>

                  <div>
                    <strong>
                      Serveurs performants
                    </strong>

                    <span>
                      Une infrastructure pensée pour
                      la rapidité et la stabilité.
                    </span>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <GlobeIcon />
                  </div>

                  <div>
                    <strong>
                      Disponibilité
                    </strong>

                    <span>
                      Votre site reste accessible
                      à tout moment.
                    </span>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <ShieldIcon />
                  </div>

                  <div>
                    <strong>
                      Sécurité intégrée
                    </strong>

                    <span>
                      Protection de votre infrastructure
                      et de vos données.
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/services"
                className="text-action"
              >
                Voir les offres
                <ArrowIcon />
              </Link>
            </article>

            <article className="dashboard-card domains-card">
              <div className="card-top">
                <div>
                  <span className="card-label">
                    EMAILS
                  </span>

                  <h3>
                    E-mails professionnels
                  </h3>
                </div>

                <Link
                  href="/espace-client/emails"
                  className="card-round-action"
                  aria-label="Gérer mes emails"
                >
                  <ArrowIcon />
                </Link>
              </div>

              <div className="order-empty">
                <div className="order-empty-icon">
                  <MailIcon />
                </div>

                <div>
                  <strong>
                    Vos boîtes professionnelles
                  </strong>

                  <p>
                    Créez et gérez vos adresses e-mail
                    professionnelles depuis votre espace client.
                  </p>
                </div>
              </div>

              <Link
                href="/espace-client/emails"
                className="text-action"
              >
                Gérer mes e-mails
                <ArrowIcon />
              </Link>
            </article>

            <article className="dashboard-card invoice-card">
              <div className="card-top">
                <div>
                  <span className="card-label">
                    SÉCURITÉ
                  </span>

                  <h3>
                    Protection NOVA
                  </h3>
                </div>

                <Link
                  href="/espace-client/securite"
                  className="card-round-action"
                  aria-label="Gérer ma sécurité"
                >
                  <ArrowIcon />
                </Link>
              </div>

              <div className="invoice-empty">
                <div className="invoice-icon">
                  <ShieldIcon />
                </div>

                <div>
                  <strong>
                    Sécurité &amp; SSL
                  </strong>

                  <p>
                    Retrouvez les protections disponibles
                    pour vos services NOVA.
                  </p>
                </div>
              </div>

              <Link
                href="/espace-client/securite"
                className="text-action"
              >
                Gérer la sécurité
                <ArrowIcon />
              </Link>
            </article>
          </div>
        </section>

        <section className="quick-section">
          <div className="quick-heading">
            <div>
              <span className="section-label">
                ACCÈS RAPIDE
              </span>

              <h2>
                Tout gérer depuis NOVA.
              </h2>
            </div>
          </div>

          <div className="quick-grid">
            <Link
              href="/espace-client/domaines"
              className="quick-card"
            >
              <div className="quick-icon">
                <GlobeIcon />
              </div>

              <div className="quick-content">
                <span>Domaines</span>
                <strong>
                  Gérer mes domaines
                </strong>
              </div>

              <ArrowIcon />
            </Link>

            <Link
              href="/espace-client/emails"
              className="quick-card"
            >
              <div className="quick-icon">
                <MailIcon />
              </div>

              <div className="quick-content">
                <span>Emails</span>
                <strong>
                  Gérer mes e-mails
                </strong>
              </div>

              <ArrowIcon />
            </Link>

            <Link
              href="/espace-client/securite"
              className="quick-card"
            >
              <div className="quick-icon">
                <ShieldIcon />
              </div>

              <div className="quick-content">
                <span>Sécurité</span>
                <strong>
                  Protéger mes services
                </strong>
              </div>

              <ArrowIcon />
            </Link>

            <Link
              href="/espace-client"
              className="quick-card"
            >
              <div className="quick-icon">
                <ServerIcon />
              </div>

              <div className="quick-content">
                <span>Espace client</span>
                <strong>
                  Retour au tableau de bord
                </strong>
              </div>

              <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="client-support-card">
          <div
            className="support-decoration"
            aria-hidden="true"
          >
            <div />
            <div />
            <div />
          </div>

          <div className="support-icon">
            <ShieldIcon />
          </div>

          <div className="support-content">
            <span className="section-label">
              SUPPORT NOVA
            </span>

            <h2>
              Une question sur votre hébergement ?
            </h2>

            <p>
              Notre équipe peut vous accompagner pour
              votre infrastructure, vos domaines et vos services.
            </p>
          </div>

          <Link
            href="/contact"
            className="support-button"
          >
            Contacter NOVA
            <ArrowIcon />
          </Link>
        </section>
      </div>

      <footer className="client-footer">
        <div className="client-footer-inner">
          <Link
            href="/"
            className="footer-logo"
          >
            NOV<span>A</span>
          </Link>

          <div className="footer-links">
            <Link href="/conditions">
              Conditions
            </Link>

            <Link href="/confidentialite">
              Confidentialité
            </Link>

            <Link href="/contact">
              Support
            </Link>
          </div>

          <span className="footer-copy">
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}