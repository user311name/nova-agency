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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-client-svg"
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
      className="domains-client-svg"
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
      className="domains-client-svg"
    >
      <path d="M12 3.5L19 6v5.3c0 4.55-2.8 7.75-7 9.2-4.2-1.45-7-4.65-7-9.2V6l7-2.5Z" />
      <path d="M8.7 12l2.15 2.15L15.6 9.4" />
    </svg>
  );
}

function DnsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-client-svg"
    >
      <rect x="4" y="4" width="16" height="5" rx="1.5" />
      <rect x="4" y="15" width="16" height="5" rx="1.5" />
      <path d="M8 9v6" />
      <path d="M16 9v6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-client-svg"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M5 7l7 5.5L19 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-client-svg"
    >
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.2 4.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-client-svg"
    >
      <path d="m6.5 12.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export default function ClientDomainsPage() {
  const [domains] = useState<Domain[]>([]);
  const [search, setSearch] = useState("");

  const hasDomains = domains.length > 0;

  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="client-domains-page">
      <div className="domains-background" aria-hidden="true">
        <div className="domains-orb domains-orb-one" />
        <div className="domains-orb domains-orb-two" />
        <div className="domains-grid-lines" />
      </div>

      <header className="domains-client-header">
        <div className="domains-header-inner">
          <Link
            href="/"
            className="domains-client-logo"
            aria-label="NOVA - Accueil"
          >
            NOV<span>A</span>
          </Link>

          <nav
            className="domains-client-navigation"
            aria-label="Navigation principale"
          >
            <Link href="/domaines" className="active">
              Domaines
            </Link>

            <Link href="/hebergement">Hébergement</Link>
            <Link href="/emails">Emails</Link>
            <Link href="/securite">Sécurité</Link>
            <Link href="/a-propos">À propos</Link>
          </nav>

          <div className="domains-header-actions">
            <Link href="/contact" className="domains-support-link">
              Support
            </Link>

            <Link
              href="/espace-client"
              className="domains-account-button"
            >
              Espace client
            </Link>
          </div>
        </div>
      </header>

      <div className="domains-client-shell">
        <div className="domains-breadcrumb">
          <Link href="/espace-client">Espace client</Link>
          <span>/</span>
          <strong>Domaines</strong>
        </div>

        <section className="domains-client-hero">
          <div className="domains-hero-copy">
            <div className="domains-client-badge">
              <span />
              GESTION DES DOMAINES
            </div>

            <h1>
              Vos domaines.
              <br />
              <span>Votre identité.</span>
            </h1>

            <p>
              Retrouvez et gérez tous vos noms de domaine depuis votre espace
              NOVA.
            </p>

            <div className="domains-hero-actions">
              <Link href="/domaines" className="domains-primary-button">
                Acheter un domaine
                <ArrowIcon />
              </Link>

              <Link
                href="/espace-client"
                className="domains-secondary-button"
              >
                Retour au tableau de bord
              </Link>
            </div>
          </div>

          <div className="domains-hero-visual" aria-hidden="true">
            <div className="domains-hero-glow" />

            <div className="domains-planet">
              <div className="domains-planet-grid" />

              <div className="domains-planet-core">
                <GlobeIcon />
              </div>
            </div>

            <div className="domains-planet-orbit orbit-one" />
            <div className="domains-planet-orbit orbit-two" />
            <div className="domains-planet-orbit orbit-three" />

            <div className="domains-floating-card floating-card-one">
              <span>DOMAINES</span>
              <strong>{domains.length}</strong>
              <small>enregistré(s)</small>
            </div>

            <div className="domains-floating-card floating-card-two">
              <div className="floating-check">
                <CheckIcon />
              </div>

              <div>
                <strong>Protection active</strong>
                <small>SSL &amp; DNS</small>
              </div>
            </div>
          </div>
        </section>

        <section className="domains-dashboard">
          <div className="domains-dashboard-heading">
            <div>
              <span className="domains-section-label">
                VOTRE PORTEFEUILLE
              </span>

              <h2>Mes domaines</h2>

              <p>
                Gérez vos domaines, leur sécurité et leurs paramètres.
              </p>
            </div>

            <div className="domains-count">
              <span>{domains.length}</span>
              <small>domaine(s)</small>
            </div>
          </div>

          <div className="domains-search-wrapper">
            <div className="domains-search-icon">
              <SearchIcon />
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un domaine..."
              aria-label="Rechercher un domaine"
            />

            {search && (
              <button
                type="button"
                className="domains-search-clear"
                onClick={() => setSearch("")}
                aria-label="Effacer la recherche"
              >
                ×
              </button>
            )}
          </div>

          {hasDomains && filteredDomains.length > 0 ? (
            <div className="domains-list">
              {filteredDomains.map((domain) => (
                <article
                  className="client-domain-card"
                  key={domain.name}
                >
                  <div className="client-domain-main">
                    <div className="client-domain-icon">
                      <GlobeIcon />
                    </div>

                    <div className="client-domain-information">
                      <span className="domain-extension-label">
                        NOM DE DOMAINE
                      </span>

                      <h3>{domain.name}</h3>

                      <div
                        className={
                          domain.status === "Actif"
                            ? "client-domain-status active"
                            : "client-domain-status pending"
                        }
                      >
                        <span />
                        {domain.status}
                      </div>
                    </div>
                  </div>

                  <div className="client-domain-details">
                    <div className="domain-detail">
                      <span>SSL</span>
                      <strong>
                        <CheckIcon />
                        Actif
                      </strong>
                    </div>

                    <div className="domain-detail">
                      <span>DNS</span>
                      <strong>
                        <CheckIcon />
                        Configuré
                      </strong>
                    </div>

                    <div className="domain-detail">
                      <span>Expiration</span>
                      <strong>
                        {domain.expiresAt ?? "En attente"}
                      </strong>
                    </div>
                  </div>

                  <Link
                    href={`/espace-client/domaines/${encodeURIComponent(
                      domain.name,
                    )}`}
                    className="client-domain-manage"
                  >
                    Gérer
                    <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <section className="domains-empty-panel">
              <div className="domains-empty-visual">
                <div className="empty-orbit empty-orbit-one" />
                <div className="empty-orbit empty-orbit-two" />
                <div className="empty-orbit empty-orbit-three" />

                <div className="empty-center">
                  <GlobeIcon />
                </div>
              </div>

              <div className="domains-empty-content">
                <span>VOTRE PORTEFEUILLE EST VIDE</span>

                <h3>
                  {search
                    ? "Aucun domaine trouvé"
                    : "Aucun domaine pour le moment"}
                </h3>

                <p>
                  {search
                    ? "Essayez avec un autre nom de domaine."
                    : "Vos domaines achetés apparaîtront automatiquement ici après leur commande."}
                </p>

                {!search && (
                  <Link
                    href="/domaines"
                    className="domains-empty-button"
                  >
                    Trouver mon domaine
                    <ArrowIcon />
                  </Link>
                )}
              </div>
            </section>
          )}

          <section className="domain-services-section">
            <div className="domains-dashboard-heading small">
              <div>
                <span className="domains-section-label">
                  SERVICES ASSOCIÉS
                </span>

                <h2>Protection &amp; gestion</h2>

                <p>
                  Les outils essentiels pour protéger votre identité en ligne.
                </p>
              </div>
            </div>

            <div className="domain-tools-grid">
              <Link
                href="/espace-client/securite"
                className="domain-tool-card"
              >
                <div className="domain-tool-icon">
                  <ShieldIcon />
                </div>

                <div className="domain-tool-content">
                  <span>SÉCURITÉ</span>
                  <h3>SSL &amp; Protection</h3>
                  <p>
                    Vérifiez la protection et la sécurité de vos domaines.
                  </p>
                </div>

                <div className="domain-tool-arrow">
                  <ArrowIcon />
                </div>
              </Link>

              <Link
                href="/espace-client/dns"
                className="domain-tool-card"
              >
                <div className="domain-tool-icon">
                  <DnsIcon />
                </div>

                <div className="domain-tool-content">
                  <span>DNS</span>
                  <h3>Configuration DNS</h3>
                  <p>
                    Gérez les enregistrements DNS de vos domaines.
                  </p>
                </div>

                <div className="domain-tool-arrow">
                  <ArrowIcon />
                </div>
              </Link>

              <Link
                href="/espace-client/emails"
                className="domain-tool-card"
              >
                <div className="domain-tool-icon">
                  <MailIcon />
                </div>

                <div className="domain-tool-content">
                  <span>EMAILS</span>
                  <h3>E-mails professionnels</h3>
                  <p>
                    Créez et gérez vos adresses e-mail professionnelles.
                  </p>
                </div>

                <div className="domain-tool-arrow">
                  <ArrowIcon />
                </div>
              </Link>
            </div>
          </section>

          <section className="domains-bottom-cta">
            <div className="domains-cta-glow" />

            <div className="domains-cta-content">
              <span className="domains-section-label">
                BESOIN D&apos;UN NOUVEAU DOMAINE ?
              </span>

              <h2>
                Donnez une adresse
                <br />
                à votre projet.
              </h2>

              <p>
                Trouvez un nom de domaine disponible et construisez votre
                présence en ligne avec NOVA.
              </p>

              <Link href="/domaines" className="domains-cta-button">
                Rechercher un domaine
                <ArrowIcon />
              </Link>
            </div>

            <div className="domains-cta-visual" aria-hidden="true">
              <div className="cta-ring cta-ring-one" />
              <div className="cta-ring cta-ring-two" />
              <div className="cta-ring cta-ring-three" />

              <div className="cta-letter">N</div>
            </div>
          </section>
        </section>
      </div>

      <footer className="domains-client-footer">
        <div className="domains-footer-inner">
          <Link href="/" className="domains-footer-logo">
            NOV<span>A</span>
          </Link>

          <div className="domains-footer-links">
            <Link href="/conditions">Conditions</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/contact">Support</Link>
          </div>

          <span className="domains-footer-copy">
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}