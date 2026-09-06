"use client";

import { useState } from "react";
import "./page.css";

type SearchResult = {
  domain: string;
  available: boolean;
  resellerPrice: number | null;
  currency: string;
  premium: boolean;
  status: string;
};

function ArrowRight() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12H20.5" />
      <path d="M12 3.5C14.3 5.8 15.4 8.6 15.4 12S14.3 18.2 12 20.5C9.7 18.2 8.6 15.4 8.6 12S9.7 5.8 12 3.5Z" />
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
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3L19 6V11C19 16 16 19.5 12 21C8 19.5 5 16 5 11V6L12 3Z" />
      <path d="M9 12L11.2 14.2L15.5 9.8" />
    </svg>
  );
}

function cleanDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\.$/, "");
}

function isValidDomain(value: string) {
  if (!value || value.length > 253) {
    return false;
  }

  const labels = value.split(".");

  if (labels.length < 2) {
    return false;
  }

  return labels.every((label) => {
    if (
      !label ||
      label.length > 63 ||
      label.startsWith("-") ||
      label.endsWith("-")
    ) {
      return false;
    }

    return /^[a-z0-9-]+$/i.test(label);
  });
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    throw new Error(
      `Le serveur a retourné une réponse vide (${response.status}).`,
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    console.error("Réponse serveur non JSON :", text);

    throw new Error(
      `Le serveur a retourné une réponse invalide (${response.status}).`,
    );
  }
}

export default function DomainesPage() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSearch(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const clean = cleanDomain(domain);

    setError("");
    setResult(null);

    if (!clean) {
      setError("Entrez un nom de domaine.");
      return;
    }

    if (!isValidDomain(clean)) {
      setError("Le nom de domaine n'est pas valide.");
      return;
    }

    setDomain(clean);
    setLoading(true);

    try {
      const response = await fetch("/api/domains/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          domain: clean,
        }),
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de vérifier ce domaine.",
        );
      }

      setResult(data);
    } catch (err) {
      console.error("DOMAIN SEARCH ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    if (!result?.domain || !result.available) {
      return;
    }

    const email = window.prompt(
      "Entrez votre adresse e-mail pour continuer :",
    );

    if (!email) {
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Adresse e-mail invalide.");
      return;
    }

    setCheckoutLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/domains/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            domain: result.domain,
            email: cleanEmail,
          }),
        },
      );

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de créer le paiement.",
        );
      }

      if (!data?.url) {
        throw new Error(
          "Stripe n'a pas retourné de lien de paiement.",
        );
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("DOMAIN CHECKOUT ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de continuer le paiement.",
      );

      setCheckoutLoading(false);
    }
  }

  const novaPrice =
    result?.resellerPrice !== null &&
    result?.resellerPrice !== undefined
      ? result.resellerPrice + 5
      : null;

  return (
    <main className="domainsPage">
      <section className="domainsHero">
        <div className="domainsHeroGlow" />

        <div className="domainsContainer">
          <div className="domainsHeroContent">
            <div className="domainsBadge">
              <span className="domainsBadgeIcon">
                <GlobeIcon />
              </span>

              Domaines Nova
            </div>

            <p className="domainsEyebrow">
              VOTRE IDENTITÉ EN LIGNE
            </p>

            <h1 className="domainsTitle">
              Trouvez le nom
              <br />
              de domaine idéal.
            </h1>

            <p className="domainsDescription">
              Recherchez votre domaine, vérifiez sa
              disponibilité en temps réel et
              réservez-le directement avec Nova.
            </p>

            <form
              className="domainSearch"
              onSubmit={handleSearch}
            >
              <div className="domainInputWrapper">
                <span className="domainInputIcon">
                  <SearchIcon />
                </span>

                <input
                  type="text"
                  value={domain}
                  onChange={(event) => {
                    setDomain(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="votreentreprise.fr"
                  aria-label="Nom de domaine"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={loading}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="domainSearchButton"
                >
                  {loading
                    ? "Recherche..."
                    : "Rechercher"}

                  {!loading && <ArrowRight />}
                </button>
              </div>
            </form>

            {loading && (
              <div
                className="domainStatus"
                role="status"
                aria-live="polite"
              >
                Vérification en temps réel...
              </div>
            )}

            {error && (
              <div
                className="domainError"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="domainTrust">
              <div>
                <CheckIcon />
                Vérification en temps réel
              </div>

              <div>
                <ShieldIcon />
                Paiement sécurisé
              </div>
            </div>
          </div>

          <div className="domainsHeroVisual">
            <div className="heroOrb heroOrbOne" />
            <div className="heroOrb heroOrbTwo" />

            <div className="domainGlobeCard">
              <div className="domainGlobeTop">
                <span />
                <span />
                <span />
              </div>

              <div className="domainGlobe">
                <GlobeIcon />
              </div>

              <div className="domainGlobeLines">
                <span />
                <span />
                <span />
              </div>

              <div className="domainGlobeText">
                <span>Nova Domain</span>

                <strong>
                  .fr .com .net
                </strong>
              </div>
            </div>

            <div className="floatingDomain floatingDomainOne">
              .fr
            </div>

            <div className="floatingDomain floatingDomainTwo">
              .com
            </div>

            <div className="floatingDomain floatingDomainThree">
              .net
            </div>
          </div>
        </div>
      </section>

      <section className="searchResultSection">
        <div className="domainsContainer">
          {result && (
            <div
              className="domainResultCard"
              aria-live="polite"
            >
              <div className="domainResultMain">
                <div className="domainResultIcon">
                  <GlobeIcon />
                </div>

                <div className="domainResultInfo">
                  <p>
                    Résultat de la recherche
                  </p>

                  <h2>{result.domain}</h2>

                  {result.available ? (
                    <div className="domainAvailable">
                      <span />
                      Domaine disponible
                    </div>
                  ) : (
                    <div className="domainUnavailable">
                      <span />
                      Domaine indisponible
                    </div>
                  )}
                </div>
              </div>

              {result.available ? (
                <div className="domainPurchase">
                  <div className="domainPrice">
                    <span>
                      Première année
                    </span>

                    <strong>
                      {novaPrice !== null
                        ? `${novaPrice.toFixed(2)} €`
                        : "Prix indisponible"}
                    </strong>

                    <small>
                      renouvellement annuel
                    </small>
                  </div>

                  <button
                    type="button"
                    className="domainBuyButton"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading
                      ? "Préparation..."
                      : "Réserver ce domaine"}

                    {!checkoutLoading && (
                      <ArrowRight />
                    )}
                  </button>
                </div>
              ) : (
                <div className="domainUnavailableBox">
                  Ce domaine est actuellement
                  indisponible. Essayez une autre
                  extension ou un autre nom.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="domainsBenefits">
        <div className="domainsContainer">
          <div className="domainsSectionHeading">
            <p>POURQUOI NOVA</p>

            <h2>
              Votre domaine,
              <br />
              simplement.
            </h2>

            <span>
              Une gestion centralisée pour votre
              présence en ligne.
            </span>
          </div>

          <div className="domainsBenefitsGrid">
            <div className="domainBenefitCard">
              <div className="domainBenefitIcon">
                <SearchIcon />
              </div>

              <h3>
                Disponibilité en temps réel
              </h3>

              <p>
                Nous vérifions directement la
                disponibilité de votre domaine
                avant votre commande.
              </p>
            </div>

            <div className="domainBenefitCard">
              <div className="domainBenefitIcon">
                <ShieldIcon />
              </div>

              <h3>
                Paiement sécurisé
              </h3>

              <p>
                Votre paiement est traité par
                Stripe avec une infrastructure
                sécurisée.
              </p>
            </div>

            <div className="domainBenefitCard">
              <div className="domainBenefitIcon">
                <GlobeIcon />
              </div>

              <h3>
                Gestion depuis Nova
              </h3>

              <p>
                Votre domaine est destiné à être
                géré depuis votre espace client
                Nova.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="domainsCtaSection">
        <div className="domainsContainer">
          <div className="domainsCta">
            <div>
              <p>NOVA</p>

              <h2>
                Votre domaine est
                <br />
                le début de votre projet.
              </h2>

              <span>
                Domaine, site, e-mails et sécurité
                réunis dans un même écosystème.
              </span>
            </div>

            <div className="domainsCtaCube">
              N
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}