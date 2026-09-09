"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import "./page.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL manquante.");
}

if (!supabasePublishableKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY manquante.");
}

const supabase = createBrowserClient(supabaseUrl, supabasePublishableKey);

type DomainResult = {
  domain: string;
  available: boolean;
  price?: number | null;
  currency?: string | null;
};

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M3.8 12H20.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M12 3.5C14.2 5.7 15.3 8.55 15.3 12C15.3 15.45 14.2 18.3 12 20.5C9.8 18.3 8.7 15.45 8.7 12C8.7 8.55 9.8 5.7 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5L19 6.2V11.4C19 15.9 16.1 19.2 12 20.5C7.9 19.2 5 15.9 5 11.4V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 12L11 14.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.5 8L12 13L18.5 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="4"
        y="14"
        width="16"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 7H8.01M8 17H8.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.2 3L6.8 12H11L10.8 21L17.2 12H13L13.2 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPrice(
  price: number | null | undefined,
  currency?: string | null
) {
  if (price === null || price === undefined) {
    return "Prix indisponible";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency || "EUR",
  }).format(price);
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Le serveur a renvoyé une réponse invalide.");
  }
}

export default function DomainesPage() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [buyingDomain, setBuyingDomain] = useState<string | null>(null);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  /*
   * IMPORTANT :
   * Cette page est la seule à désactiver le header global NOVA.
   * Quand on quitte /domaines, la classe est automatiquement retirée.
   */
  useEffect(() => {
    document.body.classList.add("domains-page-active");

    return () => {
      document.body.classList.remove("domains-page-active");
    };
  }, []);

  const normalizedQuery = useMemo(() => {
    return query.trim().toLowerCase();
  }, [query]);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!normalizedQuery) {
      setError("Entrez un nom de domaine.");
      setResults([]);
      setSearched(false);
      return;
    }

    setSearching(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(
        `/api/domains/search?domain=${encodeURIComponent(
          normalizedQuery
        )}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de rechercher ce domaine."
        );
      }

      const incomingResults: DomainResult[] =
        Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data?.domains)
            ? data.domains
            : data?.domain
              ? [data.domain]
              : [];

      setResults(incomingResults);
    } catch (searchError) {
      console.error("DOMAIN SEARCH ERROR:", searchError);

      setResults([]);

      setError(
        searchError instanceof Error
          ? searchError.message
          : "Une erreur est survenue pendant la recherche."
      );
    } finally {
      setSearching(false);
    }
  }

  async function handlePurchase(domain: DomainResult) {
    if (!domain.available) {
      return;
    }

    setBuyingDomain(domain.domain);
    setError("");

    try {
      const response = await fetch("/api/domains/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: domain.domain,
          price: domain.price,
          currency: domain.currency || "EUR",
        }),
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de lancer le paiement."
        );
      }

      const checkoutUrl = data?.url || data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error(
          "L'adresse de paiement n'a pas été retournée."
        );
      }

      window.location.href = checkoutUrl;
    } catch (purchaseError) {
      console.error(
        "DOMAIN CHECKOUT ERROR:",
        purchaseError
      );

      setError(
        purchaseError instanceof Error
          ? purchaseError.message
          : "Impossible de lancer le paiement."
      );

      setBuyingDomain(null);
    }
  }

  return (
    <>
      {/* =========================================================
          STYLE GLOBAL UNIQUEMENT POUR /DOMAINES
          Le SiteHeader normal est masqué uniquement sur cette page.
          ========================================================= */}
      <style jsx global>{`
        body.domains-page-active header {
          display: none !important;
        }

        body.domains-page-active {
          padding-top: 0 !important;
        }

        .domainsReturnNova {
          position: absolute;
          top: 28px;
          left: 32px;
          z-index: 100;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 17px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          background: rgba(10, 8, 20, 0.72);
          color: rgba(255, 255, 255, 0.92);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .domainsReturnNova:hover {
          transform: translateY(-1px);
          border-color: rgba(145, 85, 255, 0.65);
          background: rgba(19, 13, 38, 0.9);
        }

        .domainsReturnNovaArrow {
          font-size: 16px;
          line-height: 1;
        }

        @media (max-width: 700px) {
          .domainsReturnNova {
            top: 18px;
            left: 18px;
            padding: 9px 13px;
            font-size: 12px;
          }
        }
      `}</style>

      <main className="domainsPage">

        {/* ================= HERO ================= */}

        <section className="domainsHero">
          <div className="domainsHeroGrid">

            <div className="domainsHeroCopy">

              <div className="domainsBadge">
                <span />
                DOMAINE NOVA
              </div>

              <h1 className="domainsHeroTitle">
                Trouvez le nom
                <br />
                qui donnera
                <br />
                une{" "}
                <span className="domainsHeroAccent">
                  identité
                </span>
                <br />
                à votre projet.
              </h1>

              <p className="domainsHeroDescription">
                Votre domaine est la première pierre de votre
                présence en ligne. Trouvez une adresse unique,
                disponible et prête à devenir votre marque.
              </p>

              <form
                className="domainsSearch"
                onSubmit={handleSearch}
              >
                <div className="domainsSearchInput">
                  <SearchIcon />

                  <input
                    type="text"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    placeholder="exemple.fr"
                    aria-label="Rechercher un domaine"
                  />
                </div>

                <button
                  type="submit"
                  className="domainsSearchButton"
                  disabled={searching}
                >
                  {searching
                    ? "Recherche..."
                    : "Rechercher"}

                  <ArrowIcon />
                </button>
              </form>

              {error && (
                <div className="domainsError">
                  {error}
                </div>
              )}

              {searched && results.length > 0 && (
                <div className="domainsHeroResultWrap">
                  <div className="domainsHeroResultLine" />

                  <article className="domainsHeroResult">
                    <div className="domainsHeroResultOrb">
                      <div className="domainsHeroResultOrbInner">
                        <GlobeIcon />
                      </div>
                    </div>

                    <div className="domainsHeroResultInfo">
                      <div className="domainsHeroResultStatus">
                        <span />
                        {results[0].available
                          ? "DOMAINE DISPONIBLE"
                          : "DOMAINE INDISPONIBLE"}
                      </div>

                      <div className="domainsHeroResultName">
                        {results[0].domain}
                      </div>

                      <div className="domainsHeroResultMeta">
                        {results[0].available
                          ? "Prêt à devenir votre identité en ligne"
                          : "Ce domaine n'est pas disponible"}
                      </div>
                    </div>

                    <div className="domainsHeroResultPrice">
                      {formatPrice(
                        results[0].price,
                        results[0].currency
                      )}
                      {results[0].available && <small>/ an</small>}
                    </div>

                    {results[0].available && (
                      <button
                        type="button"
                        className="domainsHeroResultButton"
                        onClick={() => handlePurchase(results[0])}
                        disabled={buyingDomain === results[0].domain}
                      >
                        {buyingDomain === results[0].domain
                          ? "Chargement..."
                          : "Ajouter au panier"}
                        <span>
                          <ArrowIcon />
                        </span>
                      </button>
                    )}
                  </article>
                </div>
              )}

              <div className="domainsHeroMeta">

                <div className="domainsHeroMetaItem">
                  <strong className="domainsHeroMetaNumber">
                    01
                  </strong>

                  <span className="domainsHeroMetaLabel">
                    Recherche instantanée
                  </span>
                </div>

                <div className="domainsHeroMetaItem">
                  <strong className="domainsHeroMetaNumber">
                    02
                  </strong>

                  <span className="domainsHeroMetaLabel">
                    Paiement sécurisé
                  </span>
                </div>

                <div className="domainsHeroMetaItem">
                  <strong className="domainsHeroMetaNumber">
                    03
                  </strong>

                  <span className="domainsHeroMetaLabel">
                    Activation automatique
                  </span>
                </div>

              </div>
            </div>

            {/* ================= VISUAL ================= */}

            <div className="domainsHeroVisual">

              <div className="domainsGlow" />

              <div className="domainsOrb">

                <div className="domainsOrbCore">
                  <span>N</span>
                  <small>NOVA</small>
                </div>

                <div className="domainsOrbRing" />
                <div className="domainsOrbRingTwo" />

                <div className="domainsOrbSatellite domainsOrbSatelliteOne">
                  .fr
                </div>

                <div className="domainsOrbSatellite domainsOrbSatelliteTwo">
                  .com
                </div>

                <div className="domainsOrbSatellite domainsOrbSatelliteThree">
                  .io
                </div>

              </div>

              <div className="domainsHeroVisualCaption">
                <span>VOTRE IDENTITÉ</span>
                <strong>COMMENCE ICI</strong>
              </div>

            </div>

          </div>
        </section>

        {/* ================= RESULTS ================= */}

        <section
          className={`domainsSection ${
            searched && results.length > 0
              ? "domainsSectionHasHeroResult"
              : ""
          }`}
        >

          <div className="domainsSectionHead">

            <div>

              <div className="domainsBadge domainsBadgeSmall">
                <span />
                DISPONIBILITÉ NOVA
              </div>

              <h2 className="domainsSectionTitle">
                Votre domaine n’est que{" "}
                <span>le début.</span>
              </h2>

              <p className="domainsSectionSubtitle">
                Recherchez votre future adresse et construisez
                votre présence digitale autour d'elle.
              </p>

            </div>

            {searched && (
              <div className="domainsResultCount">
                {results.length} résultat
                {results.length > 1 ? "s" : ""}
              </div>
            )}

          </div>

          {searched && results.length > 0 ? (

            <div className="domainsList">

              {results.map((domain) => (

                <article
                  className="domainCard"
                  key={domain.domain}
                >

                  <div className="domainCardMain">

                    <div className="domainCardIcon">
                      <GlobeIcon />
                    </div>

                    <div className="domainCardInfo">

                      <div className="domainCardName">
                        {domain.domain}
                      </div>

                      <div className="domainCardMeta">
                        {domain.available
                          ? "Domaine disponible"
                          : "Domaine indisponible"}
                      </div>

                    </div>

                    <div
                      className={`domainStatus ${
                        domain.available
                          ? "active"
                          : "pending"
                      }`}
                    >
                      <span />

                      {domain.available
                        ? "Disponible"
                        : "Indisponible"}
                    </div>

                    <div className="domainCardPrice">
                      {formatPrice(
                        domain.price,
                        domain.currency
                      )}
                    </div>

                    {domain.available && (
                      <button
                        type="button"
                        className="domainManageButton"
                        onClick={() =>
                          handlePurchase(domain)
                        }
                        disabled={
                          buyingDomain === domain.domain
                        }
                      >
                        {buyingDomain === domain.domain
                          ? "Chargement..."
                          : "Acheter"}

                        <span className="domainArrow">
                          <ArrowIcon />
                        </span>
                      </button>
                    )}

                  </div>

                </article>

              ))}

            </div>

          ) : searched && !searching ? (

            <div className="domainsEmpty">

              <div className="domainsEmptyIcon">
                <SearchIcon />
              </div>

              <h3 className="domainsEmptyTitle">
                Aucun domaine disponible
              </h3>

              <p className="domainsEmptyText">
                Essayez une autre combinaison ou une autre
                extension pour trouver le nom parfait.
              </p>

              <button
                type="button"
                className="domainsEmptyButton"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  setSearched(false);
                  setError("");
                }}
              >
                Nouvelle recherche
                <ArrowIcon />
              </button>

            </div>

          ) : (

            <div className="domainsEmpty domainsEmptyInitial">

              <div className="domainsEmptyIcon">
                <GlobeIcon />
              </div>

              <h3 className="domainsEmptyTitle">
                Votre prochain nom commence ici
              </h3>

              <p className="domainsEmptyText">
                Entrez un nom dans le moteur de recherche
                pour vérifier instantanément sa disponibilité.
              </p>

            </div>

          )}

        </section>

        {/* ================= TOOLS ================= */}

        <section className="domainsTools">

          <div className="domainsToolsTitle">

            <div>

              <div className="domainsBadge domainsBadgeSmall">
                <span />
                L’ÉCOSYSTÈME NOVA
              </div>

              <h2 className="domainsSectionTitle">
                Un domaine.
                <br />
                <span>Un univers.</span>
              </h2>

            </div>

          </div>

          <div className="domainsToolsGrid">

            <article className="domainsToolCard">

              <div className="domainsToolIcon">
                <ShieldIcon />
              </div>

              <div>

                <span>SÉCURITÉ</span>

                <h3>
                  Protégez votre identité
                </h3>

                <p>
                  Sécurisez votre domaine et votre présence
                  en ligne avec les solutions NOVA.
                </p>

              </div>

              <div className="domainsToolArrow">
                <ArrowIcon />
              </div>

            </article>

            <article className="domainsToolCard">

              <div className="domainsToolIcon">
                <MailIcon />
              </div>

              <div>

                <span>EMAIL</span>

                <h3>
                  Une adresse professionnelle
                </h3>

                <p>
                  Donnez à votre marque une identité cohérente
                  avec des adresses professionnelles.
                </p>

              </div>

              <div className="domainsToolArrow">
                <ArrowIcon />
              </div>

            </article>

            <article className="domainsToolCard">

              <div className="domainsToolIcon">
                <ServerIcon />
              </div>

              <div>

                <span>PERFORMANCE</span>

                <h3>
                  Un site rapide et fiable
                </h3>

                <p>
                  Faites évoluer votre domaine avec une
                  infrastructure pensée pour la performance.
                </p>

              </div>

              <div className="domainsToolArrow">
                <ArrowIcon />
              </div>

            </article>

            <article className="domainsToolCard">

              <div className="domainsToolIcon">
                <ZapIcon />
              </div>

              <div>

                <span>NOVA</span>

                <h3>
                  Besoin d’un accompagnement ?
                </h3>

                <p>
                  Notre équipe peut vous accompagner dans
                  la création de votre présence digitale.
                </p>

              </div>

              <div className="domainsToolArrow">
                <ArrowIcon />
              </div>

            </article>

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="domainsBottomCta">

          <div className="domainsBottomCtaGlow" />

          <div className="domainsBottomCtaContent">

            <div>

              <span className="domainsBottomCtaEyebrow">
                BESOIN D’AUTRE CHOSE ?
              </span>

              <h2>
                Construisez votre
                <br />
                <span>présence digitale.</span>
              </h2>

              <p>
                Découvrez les domaines, services et solutions
                proposés par NOVA.
              </p>

            </div>

            <div className="domainsBottomCtaActions">

              <Link
                href="/espace-client"
                className="domainsCtaPrimary"
              >
                Espace client
                <ArrowIcon />
              </Link>

              <Link
                href="/contact"
                className="domainsCtaSecondary"
              >
                Nous contacter
                <ArrowIcon />
              </Link>

            </div>

          </div>

        </section>

        {/* ================= FOOTER ================= */}

        <footer className="domainsFooter">

          <div className="domainsFooterTop">

            <div className="domainsFooterBrand">

              <div className="domainsLogo">
                NOV<span>A</span>
              </div>

              <p>
                Des idées plus grandes en ligne.
              </p>

            </div>

            <div className="domainsFooterLinks">

              <Link href="/mentions-legales">
                Mentions légales
              </Link>

              <Link href="/faq">
                FAQ
              </Link>

              <Link href="/contact">
                Support
              </Link>

            </div>

          </div>

          <div className="domainsFooterBottom">

            <span>
              © {new Date().getFullYear()} NOVA
            </span>

            <span>
              Agence digitale premium
            </span>

          </div>

        </footer>

      </main>
    </>
  );
}