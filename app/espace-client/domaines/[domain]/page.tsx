"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import "./page.css";

type DomainStatus = "active" | "pending" | "error";

type Domain = {
  id: string;
  domain: string;
  status: DomainStatus;
  email: string | null;
  expires_at: string | null;
  openprovider_id: string | null;
  created_at: string | null;
};

function mapStatus(
  status: string | null | undefined,
): DomainStatus {
  const normalized = String(status || "").toLowerCase();

  if (
    normalized === "active" ||
    normalized === "act" ||
    normalized === "activated"
  ) {
    return "active";
  }

  if (
    normalized === "failed" ||
    normalized === "error" ||
    normalized === "unavailable"
  ) {
    return "error";
  }

  return "pending";
}

function formatDate(value: string | null) {
  if (!value) {
    return "Non définie";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Non définie";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getStatusLabel(status: DomainStatus) {
  switch (status) {
    case "active":
      return "Actif";

    case "error":
      return "Erreur";

    default:
      return "Enregistrement";
  }
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="domain-details-svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.3 2.4 3.5 5.4 3.5 9s-1.2 6.6-3.5 9c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3Z" />
    </svg>
  );
}

function DnsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="domain-details-svg"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="5"
        rx="1.5"
      />
      <rect
        x="4"
        y="15"
        width="16"
        height="5"
        rx="1.5"
      />
      <path d="M8 9v6" />
      <path d="M16 9v6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="domain-details-svg"
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

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="domain-details-svg"
      aria-hidden="true"
    >
      <path d="M12 3 19 6v5c0 4.7-2.9 8.2-7 10-4.1-1.8-7-5.3-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function DomainDetailsPage() {
  const params = useParams();
  const pathname = usePathname();

  const domainParam = Array.isArray(params?.domain)
    ? params.domain[0]
    : params?.domain;

  const domainName = decodeURIComponent(
    String(domainParam || ""),
  );

  const [domain, setDomain] =
    useState<Domain | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!domainName) {
      setError("Domaine introuvable.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadDomain() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/domains/client/domains",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

        if (response.status === 401) {
          window.location.href =
            `/connexion?next=${encodeURIComponent(
              `/espace-client/domaines/${domainName}`,
            )}`;

          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Impossible de récupérer le domaine.",
          );
        }

        const domains = Array.isArray(data?.domains)
          ? data.domains
          : [];

        const found = domains.find(
          (item: {
            id?: string;
            domain?: string;
            status?: string;
            email?: string | null;
            expires_at?: string | null;
            openprovider_id?: string | null;
            created_at?: string | null;
          }) =>
            String(item.domain || "").toLowerCase() ===
            domainName.toLowerCase(),
        );

        if (!found) {
          throw new Error(
            "Ce domaine n'existe pas dans votre espace client.",
          );
        }

        if (cancelled) {
          return;
        }

        setDomain({
          id: String(found.id),
          domain: String(found.domain),
          status: mapStatus(found.status),
          email: found.email ?? null,
          expires_at: found.expires_at ?? null,
          openprovider_id:
            found.openprovider_id ?? null,
          created_at: found.created_at ?? null,
        });
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDomain();

    return () => {
      cancelled = true;
    };
  }, [domainName]);

  if (loading) {
    return (
      <main className="domain-details-page">
        <div className="domain-details-background">
          <div className="domain-details-orb domain-details-orb-one" />
          <div className="domain-details-orb domain-details-orb-two" />
          <div className="domain-details-grid-lines" />
        </div>

        <section className="domain-details-loading">
          <div className="domain-details-spinner" />

          <p>
            Chargement de votre domaine…
          </p>
        </section>
      </main>
    );
  }

  if (error || !domain) {
    return (
      <main className="domain-details-page">
        <div className="domain-details-background">
          <div className="domain-details-orb domain-details-orb-one" />
          <div className="domain-details-orb domain-details-orb-two" />
          <div className="domain-details-grid-lines" />
        </div>

        <section className="domain-details-error">
          <span className="domain-details-error-label">
            DOMAINE INTROUVABLE
          </span>

          <h1>
            Impossible d'afficher ce domaine.
          </h1>

          <p>
            {error ||
              "Ce domaine n'est pas disponible dans votre espace client."}
          </p>

          <Link
            href="/espace-client/domaines"
            className="domain-details-primary-button"
          >
            Retour à mes domaines
          </Link>
        </section>
      </main>
    );
  }

  const statusLabel = getStatusLabel(
    domain.status,
  );

  return (
    <main className="domain-details-page">
      <div className="domain-details-background">
        <div className="domain-details-orb domain-details-orb-one" />
        <div className="domain-details-orb domain-details-orb-two" />
        <div className="domain-details-grid-lines" />
      </div>

      <div className="domain-details-shell">
        <header className="domain-details-header">
          <div className="domain-details-header-inner">
            <Link href="/espace-client/domaines" className="domain-details-logo">
              NOV<span>A</span>
            </Link>

            <nav className="domain-details-navigation" aria-label="Navigation espace client">
              {(() => {
                const currentPath = usePathname();
                return (
                  <>
                    <Link href="/espace-client/domaines" className={currentPath === "/espace-client/domaines" || currentPath?.startsWith("/espace-client/domaines/") ? "active" : ""}>
                      Domaines
                    </Link>
                    <Link href="/espace-client/services" className={currentPath === "/espace-client/services" || currentPath?.startsWith("/espace-client/services/") ? "active" : ""}>
                      Hébergement
                    </Link>
                    <Link href="/espace-client/emails" className={currentPath === "/espace-client/emails" || currentPath?.startsWith("/espace-client/emails/") ? "active" : ""}>
                      Emails
                    </Link>
                    <Link href="/espace-client/securite" className={currentPath === "/espace-client/securite" || currentPath?.startsWith("/espace-client/securite/") ? "active" : ""}>
                      Sécurité
                    </Link>
                  </>
                );
              })()}
            </nav>

            <div className="domain-details-header-actions">
              <Link href="/contact" className="domain-details-support">
                Support
              </Link>
              <Link href="/espace-client/parametres" className="domain-details-account">
                NC
              </Link>
              <Link href="/espace-client" className="domain-details-return-nova">
                Retour NOVA
              </Link>
              <button
                className={`domain-details-mobile-toggle ${mobileMenuOpen ? "is-open" : ""}`}
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="domain-details-mobile-navigation"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </header>

        <div
          id="domain-details-mobile-navigation"
          className={`domain-details-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="domain-details-mobile-glow" />
          <div className="domain-details-mobile-top">
            <span>NOVA / NAVIGATION</span>
            <span>MENU</span>
          </div>
          <nav>
            <Link href="/espace-client/domaines" onClick={() => setMobileMenuOpen(false)}>
              <span className="domain-details-mobile-number">01</span>
              <span className="domain-details-mobile-label">Domaines</span>
              <span className="domain-details-mobile-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/espace-client/services" onClick={() => setMobileMenuOpen(false)}>
              <span className="domain-details-mobile-number">02</span>
              <span className="domain-details-mobile-label">Hébergement</span>
              <span className="domain-details-mobile-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/espace-client/emails" onClick={() => setMobileMenuOpen(false)}>
              <span className="domain-details-mobile-number">03</span>
              <span className="domain-details-mobile-label">Emails</span>
              <span className="domain-details-mobile-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/espace-client/securite" onClick={() => setMobileMenuOpen(false)}>
              <span className="domain-details-mobile-number">04</span>
              <span className="domain-details-mobile-label">Sécurité</span>
              <span className="domain-details-mobile-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/espace-client/parametres" onClick={() => setMobileMenuOpen(false)}>
              <span className="domain-details-mobile-number">05</span>
              <span className="domain-details-mobile-label">Paramètres</span>
              <span className="domain-details-mobile-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <span className="domain-details-mobile-number">06</span>
              <span className="domain-details-mobile-label">Support</span>
              <span className="domain-details-mobile-arrow" aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>

        <div className="domain-details-breadcrumb">
          <Link href="/espace-client">
            Espace client
          </Link>

          <span>/</span>

          <Link href="/espace-client/domaines">
            Domaines
          </Link>

          <span>/</span>

          <strong>{domain.domain}</strong>
        </div>

        <section className="domain-details-hero">
          <div>
            <span className="domain-details-eyebrow">
              GESTION DU DOMAINE
            </span>

            <div className="domain-details-title-row">
              <div className="domain-details-icon">
                <GlobeIcon />
              </div>

              <div>
                <h1>{domain.domain}</h1>

                <div
                  className={`domain-details-status ${domain.status}`}
                >
                  <span />
                  {statusLabel}
                </div>
              </div>
            </div>

            <p className="domain-details-intro">
              Gérez votre domaine depuis votre espace
              NOVA. Retrouvez ici les informations
              essentielles, les services associés et les
              prochaines actions disponibles.
            </p>
          </div>

          <div className="domain-details-hero-card">
            <span>ÉTAT DU DOMAINE</span>

            <strong>{statusLabel}</strong>

            <small>
              Dernière synchronisation avec NOVA
            </small>
          </div>
        </section>

        <section className="domain-details-section">
          <div className="domain-details-section-heading">
            <div>
              <span>INFORMATIONS</span>
              <h2>Votre domaine</h2>
            </div>
          </div>

          <div className="domain-details-info-grid">
            <article className="domain-details-info-card">
              <span>DOMAINE</span>

              <strong>{domain.domain}</strong>

              <small>
                Nom de domaine enregistré
              </small>
            </article>

            <article className="domain-details-info-card">
              <span>STATUT</span>

              <strong>{statusLabel}</strong>

              <small>
                État actuel de l'enregistrement
              </small>
            </article>

            <article className="domain-details-info-card">
              <span>EXPIRATION</span>

              <strong>
                {formatDate(domain.expires_at)}
              </strong>

              <small>
                Date de renouvellement à surveiller
              </small>
            </article>

            <article className="domain-details-info-card">
              <span>CONTACT</span>

              <strong>
                {domain.email || "Non défini"}
              </strong>

              <small>
                Adresse associée au domaine
              </small>
            </article>
          </div>
        </section>

        <section className="domain-details-section">
          <div className="domain-details-section-heading">
            <div>
              <span>SERVICES</span>
              <h2>Gérer votre domaine</h2>
            </div>
          </div>

          <div className="domain-details-tools-grid">
            <Link
              href={`/espace-client/domaines/${encodeURIComponent(
                domain.domain,
              )}/dns`}
              className="domain-details-tool"
            >
              <div className="domain-details-tool-icon">
                <DnsIcon />
              </div>

              <span>CONFIGURATION</span>

              <h3>DNS &amp; serveurs</h3>

              <p>
                Gérez les enregistrements DNS et les
                serveurs associés à votre domaine.
              </p>

              <span className="domain-details-tool-arrow">
                →
              </span>
            </Link>

            <Link
              href="/espace-client/emails"
              className="domain-details-tool"
            >
              <div className="domain-details-tool-icon">
                <MailIcon />
              </div>

              <span>MESSAGERIE</span>

              <h3>Emails professionnels</h3>

              <p>
                Créez et gérez vos adresses email
                professionnelles liées à ce domaine.
              </p>

              <span className="domain-details-tool-arrow">
                →
              </span>
            </Link>

            <Link
              href="/espace-client/securite"
              className="domain-details-tool"
            >
              <div className="domain-details-tool-icon">
                <ShieldIcon />
              </div>

              <span>PROTECTION</span>

              <h3>Sécurité</h3>

              <p>
                Consultez les protections et services
                de sécurité disponibles pour votre
                domaine.
              </p>

              <span className="domain-details-tool-arrow">
                →
              </span>
            </Link>
          </div>
        </section>

        <section className="domain-details-renewal">
          <div className="domain-details-renewal-glow" />

          <div className="domain-details-renewal-content">
            <span>RENOUVELLEMENT</span>

            <h2>
              Gardez votre domaine
              <br />
              toujours actif.
            </h2>

            <p>
              La date d'expiration actuelle de votre
              domaine est le{" "}
              <strong>
                {formatDate(domain.expires_at)}
              </strong>
              .
            </p>

            <button
              type="button"
              className="domain-details-renewal-button"
              disabled
              title="Le renouvellement automatique sera activé prochainement."
            >
              Renouvellement bientôt disponible
            </button>
          </div>

          <div className="domain-details-renewal-visual">
            <div className="domain-renewal-ring ring-one" />
            <div className="domain-renewal-ring ring-two" />
            <div className="domain-renewal-ring ring-three" />

            <div className="domain-renewal-core">
              NOVA
            </div>
          </div>
        </section>

        <div className="domain-details-back">
          <Link href="/espace-client/domaines">
            <span>←</span>
            Retour à mes domaines
          </Link>
        </div>
      </div>

      <footer className="domain-details-footer">
        <div className="domain-details-footer-inner">
          <Link
            href="/espace-client"
            className="domain-details-footer-logo"
          >
            NOVA<span>.</span>
          </Link>

          <div className="domain-details-footer-links">
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

            <Link href="/contact">
              Support
            </Link>
          </div>

          <span className="domain-details-footer-copy">
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}