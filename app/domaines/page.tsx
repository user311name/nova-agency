"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import "./page.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-arrow"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-search-icon"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-globe-icon"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21" />
      <path d="M12 3c-2.5 2.5-3.5 5.5-3.5 9S9.5 18.5 12 21" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="domains-check-icon"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

const extensions = [
  { extension: ".fr", price: "14,90 €", label: "France" },
  { extension: ".com", price: "14,90 €", label: "International" },
  { extension: ".net", price: "17,90 €", label: "Network" },
  { extension: ".io", price: "39,90 €", label: "Tech" },
];

export default function DomainesPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<{
    available: boolean;
    domain?: string;
    price?: number;
    currency?: string;
    premium?: boolean;
    error?: string;
  } | null>(null);

  async function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const value =
      domain.trim().toLowerCase();

    if (!value) {
      setResult({
        available: false,
        error:
          "Entrez un nom de domaine.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response =
        await fetch(
          `/api/domains/search?domain=${encodeURIComponent(
            value,
          )}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

      const text =
        await response.text();

      console.log(
        "DOMAIN API STATUS:",
        response.status,
      );

      console.log(
        "DOMAIN API RESPONSE:",
        text,
      );

      let data: {
        available?: boolean;
        domain?: string;
        price?: number;
        currency?: string;
        premium?: boolean;
        error?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Réponse API invalide (${response.status})${
            text
              ? ` : ${text.slice(0, 300)}`
              : " : réponse vide"
          }`,
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Impossible de vérifier ce domaine.",
        );
      }

      setResult({
        available:
          data.available === true,
        domain:
          data.domain,
        price:
          data.price,
        currency:
          data.currency,
        premium:
          data.premium,
        error:
          data.error,
      });
    } catch (error) {
      console.error(
        "DOMAIN SEARCH FRONTEND ERROR:",
        error,
      );

      setResult({
        available: false,
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    if (!result?.domain) {
      return;
    }

    const email =
      window.prompt(
        "Entrez votre adresse e-mail pour continuer le paiement :",
      );

    if (!email) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/domains/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              domain:
                result.domain,
              email:
                email.trim(),
            }),
          },
        );

      const text =
        await response.text();

      let data: {
        url?: string;
        error?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Réponse paiement invalide (${response.status})${
            text
              ? ` : ${text.slice(0, 300)}`
              : " : réponse vide"
          }`,
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Impossible de créer le paiement.",
        );
      }

      if (!data.url) {
        throw new Error(
          "URL de paiement manquante.",
        );
      }

      window.location.href =
        data.url;
    } catch (error) {
      console.error(
        "DOMAIN CHECKOUT FRONTEND ERROR:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Impossible de continuer.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="domains-page">
      <section className="domains-hero">
        <div className="domains-container">
          <div className="domains-hero-grid">
            <div className="domains-hero-copy">
              <div className="domains-eyebrow">
                <span className="domains-eyebrow-dot" />
                NOVA DOMAINES
              </div>

              <h1>
                Votre nom.
                <br />
                <span>
                  Votre territoire.
                </span>
              </h1>

              <p>
                Trouvez, achetez et
                gérez votre nom de domaine
                directement depuis Nova.
              </p>
            </div>

            <div
              className="domains-hero-orbit"
              aria-hidden="true"
            >
              <div className="domains-orbit orbit-a" />
              <div className="domains-orbit orbit-b" />
              <div className="domains-orbit orbit-c" />

              <div className="domains-orbit-core">
                <GlobeIcon />
              </div>

              <span className="domains-floating domains-floating-one">
                .FR
              </span>

              <span className="domains-floating domains-floating-two">
                .COM
              </span>

              <span className="domains-floating domains-floating-three">
                .IO
              </span>
            </div>
          </div>

          <div className="domains-search-wrapper">
            <div className="domains-search-label">
              <span>01</span>
              <span>
                RECHERCHER UN DOMAINE
              </span>
            </div>

            <form
              className="domains-search"
              onSubmit={handleSearch}
            >
              <div className="domains-search-input">
                <SearchIcon />

                <input
                  type="text"
                  name="domain"
                  value={domain}
                  onChange={(event) =>
                    setDomain(
                      event.target.value,
                    )
                  }
                  placeholder="monentreprise.fr"
                  aria-label="Nom de domaine"
                />
              </div>

              <button
                type="submit"
                className="domains-search-button"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Recherche..."
                    : "Rechercher"}
                </span>

                <ArrowIcon />
              </button>
            </form>

            <div className="domains-search-hint">
              <span>Exemple :</span>
              <span>
                monentreprise.fr
              </span>
              <span>•</span>
              <span>
                nova-agency.com
              </span>
            </div>

            {result && (
              <div
                style={{
                  marginTop: "24px",
                  padding: "24px",
                  border:
                    "1px solid currentColor",
                  borderRadius: "20px",
                }}
              >
                {result.error ? (
                  <div>
                    <strong>
                      Erreur
                    </strong>

                    <p>
                      {result.error}
                    </p>
                  </div>
                ) : result.available ? (
                  <div>
                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        gap: "20px",
                        alignItems:
                          "center",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            display:
                              "block",
                            fontSize:
                              "12px",
                            opacity: 0.6,
                            marginBottom:
                              "6px",
                          }}
                        >
                          DOMAINE
                          DISPONIBLE
                        </span>

                        <strong
                          style={{
                            fontSize:
                              "28px",
                          }}
                        >
                          {result.domain}
                        </strong>
                      </div>

                      {result.price !==
                        undefined && (
                        <div>
                          <span
                            style={{
                              display:
                                "block",
                              fontSize:
                                "12px",
                              opacity:
                                0.6,
                            }}
                          >
                            PRIX NOVA /
                            AN
                          </span>

                          <strong
                            style={{
                              fontSize:
                                "24px",
                            }}
                          >
                            {result.price.toFixed(
                              2,
                            )}{" "}
                            {result.currency ||
                              "EUR"}
                          </strong>
                        </div>
                      )}
                    </div>

                    {result.premium && (
                      <p
                        style={{
                          marginTop:
                            "12px",
                        }}
                      >
                        Domaine
                        premium.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={
                        handleBuy
                      }
                      disabled={loading}
                      className="domains-search-button"
                      style={{
                        marginTop:
                          "20px",
                        width:
                          "100%",
                      }}
                    >
                      <span>
                        {loading
                          ? "Préparation..."
                          : "Acheter ce domaine"}
                      </span>

                      <ArrowIcon />
                    </button>
                  </div>
                ) : (
                  <div>
                    <strong>
                      {result.domain ||
                        domain}
                    </strong>

                    <p
                      style={{
                        marginTop:
                          "8px",
                      }}
                    >
                      Ce domaine
                      n&apos;est pas
                      disponible.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="domains-extensions">
        <div className="domains-container">
          <div className="domains-section-heading">
            <div>
              <span className="domains-micro-label">
                Extensions
                populaires
              </span>

              <h2>
                Trouvez
                l&apos;extension
                <br />
                <span>
                  qui vous ressemble.
                </span>
              </h2>
            </div>

            <p>
              Choisissez parmi les
              extensions les plus
              populaires et construisez
              une adresse qui correspond
              à votre activité.
            </p>
          </div>

          <div className="domains-extension-grid">
            {extensions.map(
              (item, index) => (
                <article
                  className="domains-extension-card"
                  key={
                    item.extension
                  }
                >
                  <div className="domains-extension-top">
                    <span className="domains-extension-number">
                      0{index + 1}
                    </span>

                    <span className="domains-extension-status">
                      Disponible
                    </span>
                  </div>

                  <div className="domains-extension-name">
                    {
                      item.extension
                    }
                  </div>

                  <div className="domains-extension-bottom">
                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {item.price}
                      <small>
                        / an
                      </small>
                    </strong>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="domains-how">
        <div className="domains-container">
          <div className="domains-how-heading">
            <span className="domains-micro-label">
              Simple du début à
              la fin
            </span>

            <h2>
              Votre domaine,
              <br />
              <span>
                sans détour.
              </span>
            </h2>
          </div>

          <div className="domains-steps">
            <article className="domains-step">
              <span className="domains-step-number">
                01
              </span>

              <div className="domains-step-icon">
                <SearchIcon />
              </div>

              <div>
                <span>
                  RECHERCHE
                </span>

                <h3>
                  Trouvez votre
                  domaine
                </h3>

                <p>
                  Recherchez
                  instantanément votre
                  nom et vérifiez sa
                  disponibilité.
                </p>
              </div>
            </article>

            <article className="domains-step">
              <span className="domains-step-number">
                02
              </span>

              <div className="domains-step-icon">
                <CheckIcon />
              </div>

              <div>
                <span>
                  ACHAT
                </span>

                <h3>
                  Réservez votre
                  adresse
                </h3>

                <p>
                  Choisissez votre
                  durée, renseignez vos
                  informations et
                  effectuez votre
                  paiement.
                </p>
              </div>
            </article>

            <article className="domains-step">
              <span className="domains-step-number">
                03
              </span>

              <div className="domains-step-icon">
                <GlobeIcon />
              </div>

              <div>
                <span>
                  ACTIVATION
                </span>

                <h3>
                  Votre domaine
                  est à vous
                </h3>

                <p>
                  Nova déclenche
                  automatiquement
                  l&apos;enregistrement
                  auprès de son
                  registrar.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="domains-management">
        <div className="domains-container">
          <div className="domains-management-box">
            <div className="domains-management-visual">
              <div className="domains-management-window">
                <div className="domains-window-top">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="domains-window-content">
                  <div className="domains-window-domain">
                    <div>
                      <span>
                        DOMAINE
                      </span>

                      <strong>
                        monentreprise.fr
                      </strong>
                    </div>

                    <span className="domains-active">
                      ACTIF
                    </span>
                  </div>

                  <div className="domains-window-line">
                    <span>
                      Expiration
                    </span>

                    <strong>
                      05.09.2027
                    </strong>
                  </div>

                  <div className="domains-window-line">
                    <span>
                      Renouvellement
                      automatique
                    </span>

                    <strong>
                      Activé
                    </strong>
                  </div>

                  <div className="domains-window-actions">
                    <span>
                      DNS
                    </span>

                    <span>
                      Site Nova
                    </span>

                    <span>
                      Renouveler
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="domains-management-copy">
              <span className="domains-micro-label">
                Depuis votre
                espace Nova
              </span>

              <h2>
                Un domaine.
                <br />
                <span>
                  Un seul endroit.
                </span>
              </h2>

              <p>
                Une fois votre domaine
                enregistré, vous pourrez
                le retrouver dans votre
                espace personnel et gérer
                les éléments essentiels
                depuis Nova.
              </p>

              <div className="domains-management-list">
                <div>
                  <CheckIcon />
                  <span>
                    Gérer vos domaines
                  </span>
                </div>

                <div>
                  <CheckIcon />
                  <span>
                    Modifier vos DNS
                  </span>
                </div>

                <div>
                  <CheckIcon />
                  <span>
                    Activer le
                    renouvellement
                    automatique
                  </span>
                </div>

                <div>
                  <CheckIcon />
                  <span>
                    Connecter votre
                    domaine à un site
                    Nova
                  </span>
                </div>
              </div>

              <Link
                href="/contact"
                className="domains-secondary-button"
              >
                <span>
                  Une question ?
                </span>

                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="domains-cta">
        <div className="domains-container">
          <div className="domains-cta-inner">
            <div className="domains-cta-decoration" />

            <span className="domains-micro-label">
              Votre identité
              digitale
            </span>

            <h2>
              Le bon domaine
              peut
              <br />
              <span>
                tout changer.
              </span>
            </h2>

            <p>
              Commencez par rechercher
              votre nom de domaine.
            </p>

            <a
              href="#top"
              className="domains-main-button"
            >
              <span>
                Rechercher un domaine
              </span>

              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}