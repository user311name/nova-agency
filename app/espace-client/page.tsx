"use client";

import Link from "next/link";
import { useState } from "react";
import "./page.css";

type DomainStatus = "Enregistrement" | "Actif";

type Domain = {
  name: string;
  status: DomainStatus;
  expiresAt?: string;
};

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: string;
  href: string;
};

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

function ShoppingBagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <path d="M5.5 8.5h13l1 11H4.5l1-11Z" />
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <path d="M7 3.5h10v17l-2.5-1.6L12 20.5l-2.5-1.6L7 20.5v-17Z" />
      <path d="M9.5 8h5" />
      <path d="M9.5 11.5h5" />
      <path d="M9.5 15h3.2" />
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
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m5 7 7 5.5L19 7" />
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

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.2 13.5a7.5 7.5 0 0 0 0-3l1.65-1.3-1.8-3.1-2 .75a7.4 7.4 0 0 0-2.6-1.5L14.1 3h-3.6l-.35 2.35a7.4 7.4 0 0 0-2.6 1.5l-2-.75-1.8 3.1 1.65 1.3a7.5 7.5 0 0 0 0 3l-1.65 1.3 1.8 3.1 2-.75a7.4 7.4 0 0 0 2.6 1.5L10.5 21h3.6l.35-2.35a7.4 7.4 0 0 0 2.6-1.5l2 .75 1.8-3.1-1.65-1.3Z" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" />
      <path d="M4.5 13h2.2a1.3 1.3 0 0 1 1.3 1.3v3.2a1.3 1.3 0 0 1-1.3 1.3H5.8a1.3 1.3 0 0 1-1.3-1.3V13Z" />
      <path d="M19.5 13h-2.2a1.3 1.3 0 0 0-1.3 1.3v3.2a1.3 1.3 0 0 0 1.3 1.3h.9a1.3 1.3 0 0 0 1.3-1.3V13Z" />
      <path d="M19.5 18.8c0 1.1-.9 2-2 2h-2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="client-svg"
    >
      <path d="m6.5 12.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function StatCard({
  label,
  value,
  description,
  icon,
  href,
}: StatCardProps) {
  return (
    <Link href={href} className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>

        <span className="stat-arrow">
          <ArrowIcon />
        </span>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-label">{label}</div>

      <p>{description}</p>
    </Link>
  );
}

export default function EspaceClientPage() {
  const [domains] = useState<Domain[]>([]);

  const hasDomains = domains.length > 0;

  return (
    <main className="client-page">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="client-background" aria-hidden="true">
        <div className="client-orb client-orb-one" />
        <div className="client-orb client-orb-two" />
        <div className="client-grid-lines" />
      </div>

      {/* =========================================================
          CLIENT HEADER
      ========================================================== */}

      <header className="client-header-bar">
        <div className="client-header-inner">
          <Link href="/" className="client-logo" aria-label="NOVA - Accueil">
            NOV<span>A</span>
          </Link>

          <nav className="client-navigation" aria-label="Navigation principale">
            <Link href="/domaines">Domaines</Link>
            <Link href="/hebergement">Hébergement</Link>
            <Link href="/emails">Emails</Link>
            <Link href="/securite">Sécurité</Link>
            <Link href="/a-propos">À propos</Link>
          </nav>

          <div className="client-header-actions">
            <Link href="/contact" className="client-support-link">
              Support
            </Link>

            <button
              type="button"
              className="client-avatar"
              aria-label="Menu du compte"
            >
              <span>NC</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="client-shell">
        {/* =======================================================
            HERO
        ======================================================== */}

        <section className="client-hero">
          <div className="hero-copy">
            <div className="client-badge">
              <span className="badge-dot" />
              ESPACE CLIENT NOVA
            </div>

            <h1>
              Votre espace
              <br />
              <span>client.</span>
            </h1>

            <p>
              Retrouvez ici vos domaines, commandes et services NOVA.
              <br />
              Tout ce dont vous avez besoin, depuis un seul espace.
            </p>

            <div className="hero-actions">
              <Link href="/domaines" className="primary-client-button">
                <span>Acheter un domaine</span>
                <ArrowIcon />
              </Link>

              <Link href="/contact" className="secondary-client-button">
                Besoin d&apos;aide ?
              </Link>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-glow" />

            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-orbit hero-orbit-three" />

            <div className="hero-core">
              <div className="hero-core-inner">
                <span>N</span>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card-top">
              <span className="floating-label">STATUT</span>

              <div className="floating-status">
                <span />
                Actif
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card-bottom">
              <span className="floating-label">NOVA OS</span>
              <strong>Votre espace.</strong>
              <small>Tout est au même endroit.</small>
            </div>
          </div>
        </section>

        {/* =======================================================
            DASHBOARD INTRO
        ======================================================== */}

        <section className="dashboard-section">
          <div className="dashboard-heading">
            <div>
              <span className="section-label">TABLEAU DE BORD</span>

              <h2>
                Bienvenue chez <span>NOVA</span>
              </h2>

              <p>
                Gérez vos services, suivez vos commandes et retrouvez vos
                informations au même endroit.
              </p>
            </div>

            <div className="dashboard-status">
              <span className="status-dot" />
              <span>Espace sécurisé</span>
            </div>
          </div>

          {/* =====================================================
              STATS
          ====================================================== */}

          <div className="stats-grid">
            <StatCard
              label="Domaines"
              value={hasDomains ? String(domains.length) : "0"}
              description={
                hasDomains
                  ? "Domaines associés à votre compte"
                  : "Aucun domaine actuellement"
              }
              icon="◎"
              href="/espace-client/domaines"
            />

            <StatCard
              label="Commandes"
              value="0"
              description="Votre historique de commandes"
              icon="↗"
              href="/espace-client/commandes"
            />

            <StatCard
              label="Factures"
              value="0"
              description="Factures disponibles"
              icon="▤"
              href="/espace-client/factures"
            />

            <StatCard
              label="Services"
              value="0"
              description="Services actifs sur votre compte"
              icon="✦"
              href="/espace-client/services"
            />
          </div>

          {/* =====================================================
              MAIN GRID
          ====================================================== */}

          <div className="dashboard-grid">
            {/* ===================================================
                DOMAINS
            ==================================================== */}

            <article className="dashboard-card domains-card">
              <div className="card-top">
                <div>
                  <span className="card-label">DOMAINES</span>
                  <h3>Mes domaines</h3>
                </div>

                <Link
                  href="/espace-client/domaines"
                  className="card-round-action"
                  aria-label="Voir mes domaines"
                >
                  <ArrowIcon />
                </Link>
              </div>

              {hasDomains ? (
                <div className="domain-list">
                  {domains.map((domain) => (
                    <div className="domain-item" key={domain.name}>
                      <div className="domain-item-main">
                        <div className="domain-globe">
                          <GlobeIcon />
                        </div>

                        <div className="domain-item-info">
                          <strong>{domain.name}</strong>

                          <span
                            className={
                              domain.status === "Actif"
                                ? "domain-status active"
                                : "domain-status pending"
                            }
                          >
                            <span />
                            {domain.status}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/espace-client/domaines/${encodeURIComponent(
                          domain.name,
                        )}`}
                        className="domain-manage"
                      >
                        Gérer
                        <ArrowIcon />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="domain-empty">
                  <div className="empty-visual">
                    <div className="empty-ring empty-ring-one" />
                    <div className="empty-ring empty-ring-two" />

                    <div className="empty-globe">
                      <GlobeIcon />
                    </div>
                  </div>

                  <div className="empty-content">
                    <span className="empty-kicker">VOTRE PREMIER DOMAINE</span>

                    <h4>Aucun domaine pour le moment</h4>

                    <p>
                      Vos domaines achetés apparaîtront automatiquement ici
                      après votre commande.
                    </p>

                    <Link href="/domaines" className="empty-button">
                      Acheter un domaine
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              )}
            </article>

            {/* ===================================================
                RECENT ORDER
            ==================================================== */}

            <article className="dashboard-card order-card">
              <div className="card-top">
                <div>
                  <span className="card-label">COMMANDES</span>
                  <h3>Mes commandes</h3>
                </div>

                <Link
                  href="/espace-client/commandes"
                  className="card-round-action"
                  aria-label="Voir mes commandes"
                >
                  <ArrowIcon />
                </Link>
              </div>

              <div className="order-empty">
                <div className="order-empty-icon">
                  <ShoppingBagIcon />
                </div>

                <div>
                  <strong>Aucune commande</strong>

                  <p>
                    Vos commandes et leur progression apparaîtront ici.
                  </p>
                </div>
              </div>

              <Link href="/domaines" className="text-action">
                Découvrir les services
                <ArrowIcon />
              </Link>
            </article>

            {/* ===================================================
                INVOICES
            ==================================================== */}

            <article className="dashboard-card invoice-card">
              <div className="card-top">
                <div>
                  <span className="card-label">FACTURES</span>
                  <h3>Mes factures</h3>
                </div>

                <Link
                  href="/espace-client/factures"
                  className="card-round-action"
                  aria-label="Voir mes factures"
                >
                  <ArrowIcon />
                </Link>
              </div>

              <div className="invoice-empty">
                <div className="invoice-icon">
                  <InvoiceIcon />
                </div>

                <div>
                  <strong>Aucune facture</strong>

                  <p>
                    Vos factures seront disponibles après vos achats.
                  </p>
                </div>
              </div>

              <Link href="/espace-client/factures" className="text-action">
                Voir les factures
                <ArrowIcon />
              </Link>
            </article>

            {/* ===================================================
                SERVICES
            ==================================================== */}

            <article className="dashboard-card services-card">
              <div className="card-top">
                <div>
                  <span className="card-label">SERVICES NOVA</span>
                  <h3>Mes services</h3>
                </div>

                <Link
                  href="/espace-client/services"
                  className="card-round-action"
                  aria-label="Voir mes services"
                >
                  <ArrowIcon />
                </Link>
              </div>

              <div className="service-list">
                <Link href="/espace-client/domaines" className="service-item">
                  <div className="service-icon">
                    <GlobeIcon />
                  </div>

                  <div>
                    <strong>Domaines</strong>
                    <span>Gérez vos noms de domaine</span>
                  </div>

                  <ArrowIcon />
                </Link>

                <Link href="/espace-client/emails" className="service-item">
                  <div className="service-icon">
                    <MailIcon />
                  </div>

                  <div>
                    <strong>E-mails professionnels</strong>
                    <span>Vos boîtes professionnelles</span>
                  </div>

                  <ArrowIcon />
                </Link>

                <Link href="/espace-client/securite" className="service-item">
                  <div className="service-icon">
                    <ShieldIcon />
                  </div>

                  <div>
                    <strong>Sécurité &amp; SSL</strong>
                    <span>Protection de vos services</span>
                  </div>

                  <ArrowIcon />
                </Link>
              </div>
            </article>
          </div>

          {/* =====================================================
              QUICK ACCESS
          ====================================================== */}

          <section className="quick-section">
            <div className="quick-heading">
              <div>
                <span className="section-label">ACCÈS RAPIDE</span>
                <h2>Tout gérer depuis NOVA.</h2>
              </div>
            </div>

            <div className="quick-grid">
              <Link href="/espace-client/domaines" className="quick-card">
                <div className="quick-icon">
                  <GlobeIcon />
                </div>

                <div className="quick-content">
                  <span>Domaines</span>
                  <strong>Gérer mes domaines</strong>
                </div>

                <ArrowIcon />
              </Link>

              <Link href="/espace-client/emails" className="quick-card">
                <div className="quick-icon">
                  <MailIcon />
                </div>

                <div className="quick-content">
                  <span>Emails</span>
                  <strong>Gérer mes e-mails</strong>
                </div>

                <ArrowIcon />
              </Link>

              <Link href="/espace-client/securite" className="quick-card">
                <div className="quick-icon">
                  <ShieldIcon />
                </div>

                <div className="quick-content">
                  <span>Sécurité</span>
                  <strong>Protéger mes services</strong>
                </div>

                <ArrowIcon />
              </Link>

              <Link href="/espace-client/parametres" className="quick-card">
                <div className="quick-icon">
                  <SettingsIcon />
                </div>

                <div className="quick-content">
                  <span>Compte</span>
                  <strong>Gérer mes paramètres</strong>
                </div>

                <ArrowIcon />
              </Link>
            </div>
          </section>

          {/* =====================================================
              SUPPORT
          ====================================================== */}

          <section className="client-support-card">
            <div className="support-decoration" aria-hidden="true">
              <div />
              <div />
              <div />
            </div>

            <div className="support-icon">
              <HeadsetIcon />
            </div>

            <div className="support-content">
              <span className="section-label">SUPPORT NOVA</span>

              <h2>Une question ? Nous sommes là.</h2>

              <p>
                Notre équipe peut vous accompagner pour vos domaines,
                services et commandes.
              </p>
            </div>

            <Link href="/contact" className="support-button">
              Contacter NOVA
              <ArrowIcon />
            </Link>
          </section>
        </section>
      </div>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="client-footer">
        <div className="client-footer-inner">
          <Link href="/" className="footer-logo">
            NOV<span>A</span>
          </Link>

          <div className="footer-links">
            <Link href="/conditions">Conditions</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/contact">Support</Link>
          </div>

          <span className="footer-copy">
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}