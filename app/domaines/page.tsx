"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./page.css";

type DomainStatus =
  | "active"
  | "pending"
  | "unavailable"
  | string;

type Domain = {
  id: string | number;
  domain: string;
  status: DomainStatus;
  email: string;
  expires_at: string | null;
  openprovider_id: string | null;
  created_at: string | null;
};

function ArrowIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21" />
      <path d="M12 3c-2.5 2.4-3.8 5.4-3.8 9S9.5 18.6 12 21" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3 20 6v6c0 5-3.3 8.2-8 9-4.7-.8-8-4-8-9V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function DnsIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="5"
        rx="1"
      />
      <rect
        x="4"
        y="14"
        width="16"
        height="5"
        rx="1"
      />
      <path d="M8 7.5h.01" />
      <path d="M8 16.5h.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="domains-client-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function formatDate(
  date: string | null,
) {
  if (!date) {
    return "—";
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return "—";
  }

  return parsed.toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );
}

function getStatusLabel(
  status: DomainStatus,
) {
  switch (status) {
    case "active":
      return "Actif";

    case "pending":
      return "En cours";

    case "unavailable":
      return "Indisponible";

    default:
      return status;
  }
}

function getStatusClass(
  status: DomainStatus,
) {
  switch (status) {
    case "active":
      return "active";

    case "pending":
      return "pending";

    default:
      return "pending";
  }
}

export default function ClientDomainsPage() {
  const [domains, setDomains] =
    useState<Domain[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * TEMPORAIRE :
   * email utilisé pour retrouver les domaines.
   *
   * On remplacera ensuite ceci par
   * l'utilisateur authentifié Supabase.
   */
  const clientEmail =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "nova_client_email",
        )
      : null;

  useEffect(() => {
    async function loadDomains() {
      if (!clientEmail) {
        setDomains([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `/api/client/domains?email=${encodeURIComponent(
              clientEmail,
            )}`,
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Impossible de récupérer les domaines.",
          );
        }

        setDomains(
          Array.isArray(data.domains)
            ? data.domains
            : [],
        );
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDomains();
  }, [clientEmail]);

  const filteredDomains =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return domains;
      }

      return domains.filter(
        (item) =>
          item.domain
            .toLowerCase()
            .includes(query),
      );
    }, [domains, search]);

  return (
    <main className="client-domains-page">
      <div className="domains-background">
        <div className="domains-orb domains-orb-one" />
        <div className="domains-orb domains-orb-two" />
        <div className="domains-grid-lines" />
      </div>

      {/* HEADER */}
      <header className="domains-client-header">
        <div className="domains-header-inner">
          <Link
            href="/"
            className="domains-client-logo"
          >
            NOV<span>A</span>
          </Link>

          <nav className="domains-client-navigation">
            <Link
              href="/domaines"
              className="active"
            >
              Domaines
            </Link>

            <Link href="/hebergement">
              Hébergement
            </Link>

            <Link href="/emails">
              Emails
            </Link>

            <Link href="/securite">
              Sécurité
            </Link>

            <Link href="/a-propos">
              À propos
            </Link>
          </nav>

          <div className="domains-header-actions">
            <Link
              href="/contact"
              className="domains-support-link"
            >
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
        {/* BREADCRUMB */}
        <div className="domains-breadcrumb">
          <Link href="/espace-client">
            Espace client
          </Link>

          <span>/</span>

          <strong>
            Domaines
          </strong>
        </div>

        {/* HERO */}
        <section className="domains-client-hero">
          <div className="domains-hero-copy">
            <div className="domains-client-badge">
              <span />
              GESTION DES DOMAINES
            </div>

            <h1>
              Vos domaines.
              <br />
              <span>
                Votre identité.
              </span>
            </h1>

            <p>
              Retrouvez et gérez tous vos
              noms de domaine depuis votre
              espace NOVA.
            </p>

            <div className="domains-hero-actions">
              <Link
                href="/domaines"
                className="domains-primary-button"
              >
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

          <div className="domains-hero-visual">
            <div className="domains-hero-glow" />

            <div className="domains-planet-orbit orbit-one" />
            <div className="domains-planet-orbit orbit-two" />
            <div className="domains-planet-orbit orbit-three" />

            <div className="domains-planet">
              <div className="domains-planet-grid" />

              <div className="domains-planet-core">
                <GlobeIcon />
              </div>
            </div>

            <div className="domains-floating-card floating-card-one">
              <span>
                DOMAINES
              </span>

              <strong>
                {domains.length}
              </strong>

              <small>
                enregistré(s)
              </small>
            </div>

            <div className="domains-floating-card floating-card-two">
              <div className="floating-check">
                <CheckIcon />
              </div>

              <div>
                <strong>
                  Protection active
                </strong>

                <small>
                  SSL & DNS
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* DASHBOARD */}
        <section className="domains-dashboard">
          <div className="domains-dashboard-heading">
            <div>
              <span className="domains-section-label">
                VOTRE PORTEFEUILLE
              </span>

              <h2>
                Mes domaines
              </h2>

              <p>
                Gérez vos domaines, leur
                sécurité et leurs paramètres.
              </p>
            </div>

            <div className="domains-count">
              <span>
                {domains.length}
              </span>

              <small>
                domaine(s)
              </small>
            </div>
          </div>

          {/* SEARCH */}
          <div className="domains-search-wrapper">
            <div className="domains-search-icon">
              <SearchIcon />
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Rechercher un domaine..."
            />

            {search && (
              <button
                type="button"
                className="domains-search-clear"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Effacer la recherche"
              >
                ×
              </button>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <div
              style={{
                padding: "18px",
                marginBottom: "13px",
                border:
                  "1px solid rgba(255,80,80,.2)",
                borderRadius: "15px",
                background:
                  "rgba(255,60,60,.04)",
                color: "#ff9b9b",
                fontSize: "11px",
              }}
            >
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="domains-empty-panel">
              <div className="domains-empty-content">
                <span>
                  CHARGEMENT
                </span>

                <h3>
                  Chargement de vos domaines
                </h3>

                <p>
                  Nous récupérons votre
                  portefeuille NOVA.
                </p>
              </div>
            </div>
          ) : filteredDomains.length > 0 ? (
            <div className="domains-list">
              {filteredDomains.map(
                (item) => (
                  <article
                    key={item.id}
                    className="client-domain-card"
                  >
                    <div className="client-domain-main">
                      <div className="client-domain-icon">
                        <GlobeIcon />
                      </div>

                      <div className="client-domain-information">
                        <span className="domain-extension-label">
                          DOMAINE
                        </span>

                        <h3>
                          {item.domain}
                        </h3>

                        <div
                          className={`client-domain-status ${getStatusClass(
                            item.status,
                          )}`}
                        >
                          <span />
                          {
                            getStatusLabel(
                              item.status,
                            )
                          }
                        </div>
                      </div>
                    </div>

                    <div className="client-domain-details">
                      <div className="domain-detail">
                        <span>
                          EXPIRATION
                        </span>

                        <strong>
                          {formatDate(
                            item.expires_at,
                          )}
                        </strong>
                      </div>

                      <div className="domain-detail">
                        <span>
                          PROTECTION
                        </span>

                        <strong>
                          <ShieldIcon />
                          Active
                        </strong>
                      </div>

                      <div className="domain-detail">
                        <span>
                          DNS
                        </span>

                        <strong>
                          <CheckIcon />
                          Configuré
                        </strong>
                      </div>
                    </div>

                    <Link
                      href={`/espace-client/domaines/${encodeURIComponent(
                        item.domain,
                      )}`}
                      className="client-domain-manage"
                    >
                      Gérer
                      <ArrowIcon />
                    </Link>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="domains-empty-panel">
              <div className="domains-empty-visual">
                <div className="empty-orbit empty-orbit-one" />
                <div className="empty-orbit empty-orbit-two" />
                <div className="empty-orbit empty-orbit-three" />

                <div className="empty-center">
                  <GlobeIcon />
                </div>
              </div>

              <div className="domains-empty-content">
                <span>
                  VOTRE PORTEFEUILLE N&apos;EST PAS VIDE
                </span>

                <h3>
                  Aucun domaine pour le moment
                </h3>

                <p>
                  Vos domaines achetés apparaîtront
                  automatiquement ici après leur
                  commande.
                </p>

                <Link
                  href="/domaines"
                  className="domains-empty-button"
                >
                  Trouver mon domaine
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          )}

          {/* SERVICES */}
          <div className="domain-services-section">
            <div className="domains-dashboard-heading small">
              <div>
                <span className="domains-section-label">
                  SERVICES ASSOCIÉS
                </span>

                <h2>
                  Protection & gestion
                </h2>

                <p>
                  Les outils essentiels pour
                  protéger votre identité en ligne.
                </p>
              </div>
            </div>

            <div className="domain-tools-grid">
              <Link
                href="/securite"
                className="domain-tool-card"
              >
                <div className="domain-tool-icon">
                  <ShieldIcon />
                </div>

                <div className="domain-tool-arrow">
                  <ArrowIcon />
                </div>

                <div className="domain-tool-content">
                  <span>
                    SÉCURITÉ
                  </span>

                  <h3>
                    SSL & Protection
                  </h3>

                  <p>
                    Vérifiez et protégez la
                    sécurité de vos domaines.
                  </p>
                </div>
              </Link>

              <Link
                href="/espace-client/domaines"
                className="domain-tool-card"
              >
                <div className="domain-tool-icon">
                  <DnsIcon />
                </div>

                <div className="domain-tool-arrow">
                  <ArrowIcon />
                </div>

                <div className="domain-tool-content">
                  <span>
                    DNS
                  </span>

                  <h3>
                    Configuration DNS
                  </h3>

                  <p>
                    Gérez les enregistrements DNS
                    de vos domaines.
                  </p>
                </div>
              </Link>

              <Link
                href="/emails"
                className="domain-tool-card"
              >
                <div className="domain-tool-icon">
                  <MailIcon />
                </div>

                <div className="domain-tool-arrow">
                  <ArrowIcon />
                </div>

                <div className="domain-tool-content">
                  <span>
                    EMAILS
                  </span>

                  <h3>
                    Emails professionnels
                  </h3>

                  <p>
                    Créez et gérez vos adresses
                    professionnelles.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* CTA */}
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
                Trouvez le nom parfait pour
                votre entreprise, votre marque
                ou votre prochain projet.
              </p>

              <Link
                href="/domaines"
                className="domains-cta-button"
              >
                Rechercher un domaine
                <ArrowIcon />
              </Link>
            </div>

            <div className="domains-cta-visual">
              <div className="cta-ring cta-ring-one" />
              <div className="cta-ring cta-ring-two" />
              <div className="cta-ring cta-ring-three" />

              <div className="cta-letter">
                N
              </div>
            </div>
          </section>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="domains-client-footer">
        <div className="domains-footer-inner">
          <Link
            href="/"
            className="domains-footer-logo"
          >
            NOV<span>A</span>
          </Link>

          <div className="domains-footer-links">
            <Link href="/mentions-legales">
              Mentions légales
            </Link>

            <Link href="/confidentialite">
              Confidentialité
            </Link>

            <Link href="/contact">
              Support
            </Link>
          </div>

          <span className="domains-footer-copy">
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}