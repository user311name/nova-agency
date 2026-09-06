"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import "./page.css";

type Domain = {
  id: string;
  domain: string;
  status: string;
  email: string;
  expires_at: string | null;
  openprovider_id: string | null;
  created_at: string;
};

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01" />
      <path d="M8 17h.01" />
      <path d="M12 7h5" />
      <path d="M12 17h5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.41 1.41-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.09a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.41-1.41.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7v-2h.84A1.7 1.7 0 0 0 9.4 11a1.7 1.7 0 0 0-.34-1.88L9 9.06l1.41-1.41.06.06A1.7 1.7 0 0 0 12.35 8.05 1.7 1.7 0 0 0 13.38 6.5V6h2v.5a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.41 1.41-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.03H21v2h-.04A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getDomainStatus(status: string) {
  if (
    status === "active" ||
    status === "ACT" ||
    status === "registered"
  ) {
    return {
      label: "Actif",
      className: "active",
    };
  }

  if (
    status === "pending" ||
    status === "REQ" ||
    status === "processing"
  ) {
    return {
      label: "En cours",
      className: "pending",
    };
  }

  return {
    label: "À vérifier",
    className: "neutral",
  };
}

export default function ClientServicesPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = window.localStorage.getItem(
      "nova_client_email"
    );

    if (!storedEmail) {
      setLoading(false);
      return;
    }

    setEmail(storedEmail);

    async function loadDomains() {
      try {
        const response = await fetch(
          `/api/client/domains?email=${encodeURIComponent(
            storedEmail
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Impossible de récupérer vos services."
          );
        }

        setDomains(
          Array.isArray(data.domains)
            ? data.domains
            : []
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDomains();
  }, []);

  const activeDomains = useMemo(() => {
    return domains.filter(
      (domain) =>
        domain.status === "active" ||
        domain.status === "ACT" ||
        domain.status === "registered"
    ).length;
  }, [domains]);

  return (
    <main className="clientServicesPage">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="clientServicesHeader">

        <Link
          href="/"
          className="clientServicesLogo"
        >
          NOV<span>A</span>
        </Link>

        <nav className="clientServicesNav">
          <Link href="/domaines">
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

        <div className="clientServicesHeaderRight">

          <Link
            href="/contact"
            className="serviceSupport"
          >
            Support
          </Link>

          <Link
            href="/espace-client"
            className="serviceAvatar"
          >
            {email
              ? email.charAt(0).toUpperCase()
              : "N"}
          </Link>

        </div>

      </header>


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="servicesContainer">

        {/* BREADCRUMB */}

        <div className="servicesBreadcrumb">

          <Link href="/espace-client">
            Espace client
          </Link>

          <span>/</span>

          <span>
            Mes services
          </span>

        </div>


        {/* HERO */}

        <section className="servicesHero">

          <div className="servicesHeroContent">

            <div className="servicesBadge">
              <span />
              ESPACE CLIENT
            </div>

            <h1>
              Mes
              <br />
              <span>services.</span>
            </h1>

            <p>
              Gérez l'ensemble de vos services NOVA
              depuis un seul espace. Domaines, emails,
              hébergement et sécurité.
            </p>

          </div>


          <div className="servicesHeroVisual">

            <div className="servicesGlow" />

            <div className="servicesOrb">

              <div className="orbRing orbRingOne" />
              <div className="orbRing orbRingTwo" />
              <div className="orbRing orbRingThree" />

              <div className="orbCore">
                N
              </div>

            </div>

            <div className="servicesVerticalText">
              NOVA · DIGITAL INFRASTRUCTURE
            </div>

          </div>

        </section>


        {/* STATS */}

        <section className="servicesStats">

          <div className="serviceStat">

            <div className="serviceStatIcon">
              <GlobeIcon />
            </div>

            <div>
              <span>
                Domaines
              </span>

              <strong>
                {loading ? "—" : domains.length}
              </strong>
            </div>

          </div>


          <div className="serviceStat">

            <div className="serviceStatIcon">
              <CheckIcon />
            </div>

            <div>
              <span>
                Services actifs
              </span>

              <strong>
                {loading ? "—" : activeDomains}
              </strong>
            </div>

          </div>


          <div className="serviceStat">

            <div className="serviceStatIcon">
              <ShieldIcon />
            </div>

            <div>
              <span>
                Infrastructure
              </span>

              <strong>
                NOVA
              </strong>
            </div>

          </div>

        </section>


        {/* SERVICES */}

        <section className="servicesSection">

          <div className="servicesSectionHeading">

            <div>

              <span className="servicesEyebrow">
                VOTRE INFRASTRUCTURE
              </span>

              <h2>
                Tous vos services
              </h2>

            </div>

          </div>


          <div className="servicesGrid">

            {/* DOMAINES */}

            <Link
              href="/espace-client/domaines"
              className="serviceCard serviceCardFeatured"
            >

              <div className="serviceCardTop">

                <div className="serviceIcon">
                  <GlobeIcon />
                </div>

                <span className="serviceArrow">
                  <ArrowIcon />
                </span>

              </div>

              <div className="serviceCardContent">

                <span className="serviceCardLabel">
                  DOMAINE
                </span>

                <h3>
                  Vos domaines
                </h3>

                <p>
                  Gérez vos noms de domaine,
                  leur statut et leurs informations.
                </p>

              </div>

              <div className="serviceCardFooter">

                <span>
                  {loading
                    ? "Chargement..."
                    : `${domains.length} domaine${
                        domains.length > 1
                          ? "s"
                          : ""
                      }`}
                </span>

                <span className="serviceOnline">
                  <i />
                  Disponible
                </span>

              </div>

            </Link>


            {/* EMAILS */}

            <Link
              href="/espace-client/emails"
              className="serviceCard"
            >

              <div className="serviceCardTop">

                <div className="serviceIcon">
                  <MailIcon />
                </div>

                <span className="serviceArrow">
                  <ArrowIcon />
                </span>

              </div>

              <div className="serviceCardContent">

                <span className="serviceCardLabel">
                  COMMUNICATION
                </span>

                <h3>
                  Emails professionnels
                </h3>

                <p>
                  Créez et gérez vos adresses
                  email professionnelles.
                </p>

              </div>

              <div className="serviceCardFooter">

                <span>
                  À configurer
                </span>

                <span className="serviceComing">
                  Bientôt disponible
                </span>

              </div>

            </Link>


            {/* HÉBERGEMENT */}

            <Link
              href="/espace-client/hebergement"
              className="serviceCard"
            >

              <div className="serviceCardTop">

                <div className="serviceIcon">
                  <ServerIcon />
                </div>

                <span className="serviceArrow">
                  <ArrowIcon />
                </span>

              </div>

              <div className="serviceCardContent">

                <span className="serviceCardLabel">
                  INFRASTRUCTURE
                </span>

                <h3>
                  Hébergement web
                </h3>

                <p>
                  Hébergez votre site sur une
                  infrastructure performante.
                </p>

              </div>

              <div className="serviceCardFooter">

                <span>
                  Aucun hébergement
                </span>

                <span className="serviceComing">
                  Disponible bientôt
                </span>

              </div>

            </Link>


            {/* SÉCURITÉ */}

            <Link
              href="/espace-client/securite"
              className="serviceCard"
            >

              <div className="serviceCardTop">

                <div className="serviceIcon">
                  <ShieldIcon />
                </div>

                <span className="serviceArrow">
                  <ArrowIcon />
                </span>

              </div>

              <div className="serviceCardContent">

                <span className="serviceCardLabel">
                  PROTECTION
                </span>

                <h3>
                  Sécurité
                </h3>

                <p>
                  Protégez votre infrastructure
                  et vos services numériques.
                </p>

              </div>

              <div className="serviceCardFooter">

                <span>
                  Protection NOVA
                </span>

                <span className="serviceOnline">
                  <i />
                  Active
                </span>

              </div>

            </Link>

          </div>

        </section>


        {/* DOMAIN LIST */}

        <section className="serviceDomainsSection">

          <div className="servicesSectionHeading">

            <div>

              <span className="servicesEyebrow">
                SERVICES CONNECTÉS
              </span>

              <h2>
                Vos domaines
              </h2>

            </div>

            <Link
              href="/espace-client/domaines"
              className="servicesViewAll"
            >
              Voir tous
              <ArrowIcon />
            </Link>

          </div>


          {loading && (
            <div className="servicesLoading">

              <div className="servicesLoader" />

              <span>
                Chargement de vos services...
              </span>

            </div>
          )}


          {!loading && error && (
            <div className="servicesError">

              <div className="servicesErrorIcon">
                !
              </div>

              <div>
                <strong>
                  Impossible de charger vos services
                </strong>

                <p>
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Réessayer
              </button>

            </div>
          )}


          {!loading &&
            !error &&
            !email && (
              <div className="servicesEmpty">

                <div className="servicesEmptyIcon">
                  <GlobeIcon />
                </div>

                <h3>
                  Connectez-vous à votre espace client
                </h3>

                <p>
                  Vos services apparaîtront ici
                  une fois votre compte configuré.
                </p>

                <Link href="/espace-client">
                  Retour à l'espace client
                  <ArrowIcon />
                </Link>

              </div>
            )}


          {!loading &&
            !error &&
            email &&
            domains.length === 0 && (
              <div className="servicesEmpty">

                <div className="servicesEmptyIcon">
                  <GlobeIcon />
                </div>

                <h3>
                  Aucun domaine pour le moment
                </h3>

                <p>
                  Lorsque vous achèterez un domaine
                  chez NOVA, il apparaîtra automatiquement
                  dans cette section.
                </p>

                <Link href="/domaines">
                  Rechercher un domaine
                  <ArrowIcon />
                </Link>

              </div>
            )}


          {!loading &&
            !error &&
            domains.length > 0 && (

              <div className="serviceDomainList">

                {domains.map((domain) => {

                  const status =
                    getDomainStatus(
                      domain.status
                    );

                  return (
                    <Link
                      href="/espace-client/domaines"
                      className="serviceDomainRow"
                      key={domain.id}
                    >

                      <div className="serviceDomainMain">

                        <div className="serviceDomainIcon">
                          <GlobeIcon />
                        </div>

                        <div>

                          <strong>
                            {domain.domain}
                          </strong>

                          <span>
                            Ajouté le{" "}
                            {formatDate(
                              domain.created_at
                            )}
                          </span>

                        </div>

                      </div>


                      <div
                        className={`serviceDomainStatus ${status.className}`}
                      >
                        <i />
                        {status.label}
                      </div>


                      <div className="serviceDomainExpiry">

                        <span>
                          Expiration
                        </span>

                        <strong>
                          {formatDate(
                            domain.expires_at
                          )}
                        </strong>

                      </div>


                      <span className="serviceDomainArrow">
                        <ArrowIcon />
                      </span>

                    </Link>
                  );
                })}

              </div>

            )}

        </section>


        {/* CTA */}

        <section className="servicesCTA">

          <div className="servicesCTAGlow" />

          <div className="servicesCTAContent">

            <span className="servicesEyebrow">
              BESOIN D'ALLER PLUS LOIN ?
            </span>

            <h2>
              Construisez votre
              <br />
              <span>infrastructure digitale.</span>
            </h2>

            <p>
              Développez votre présence en ligne
              avec l'écosystème NOVA.
            </p>

          </div>

          <div className="servicesCTAActions">

            <Link
              href="/domaines"
              className="servicesPrimaryButton"
            >
              Trouver un domaine
              <ArrowIcon />
            </Link>

            <Link
              href="/contact"
              className="servicesSecondaryButton"
            >
              Contacter NOVA
            </Link>

          </div>

        </section>

      </div>


      {/* FOOTER */}

      <footer className="clientServicesFooter">

        <Link
          href="/"
          className="servicesFooterLogo"
        >
          NOV<span>A</span>
        </Link>

        <p>
          © {new Date().getFullYear()} NOVA.
          Tous droits réservés.
        </p>

        <div>

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

      </footer>

    </main>
  );
}