"use client";

import Link from "next/link";
import { FormEvent, useMemo, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./page.css";

const plans = {
  essential: {
    id: "essential",
    name: "Essentiel",
    price: "9,90 €",
    mailboxes: 1,
    storage: 15,
    description: "Une adresse professionnelle pour démarrer.",
  },
  business: {
    id: "business",
    name: "Business",
    price: "14,90 €",
    mailboxes: 3,
    storage: 45,
    description:
      "La solution idéale pour une activité professionnelle.",
  },
  team: {
    id: "team",
    name: "Équipe",
    price: "129 € / an",
    mailboxes: 5,
    storage: 75,
    description:
      "Une messagerie complète pour votre équipe.",
  },
} as const;

type PlanId = keyof typeof plans;

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 4L13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EmailPurchasePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <EmailPurchasePageContent />
    </Suspense>
  );
}

function EmailPurchasePageContent() {
  const searchParams = useSearchParams();

  const requestedPlan = searchParams.get("plan");

  const selectedPlanId: PlanId =
    requestedPlan === "business" ||
    requestedPlan === "team" ||
    requestedPlan === "essential"
      ? requestedPlan
      : "essential";

  const selectedPlan = useMemo(
    () => plans[selectedPlanId],
    [selectedPlanId],
  );

  const [domain, setDomain] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("contact");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function cleanDomain(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
  }

  function cleanPrefix(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9._-]/g, "");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const finalDomain = cleanDomain(domain);
    const finalPrefix = cleanPrefix(emailPrefix);

    if (!finalDomain) {
      setError(
        "Veuillez renseigner votre nom de domaine.",
      );
      return;
    }

    if (!finalPrefix) {
      setError(
        "Veuillez renseigner le nom de votre boîte mail.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/emails/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: selectedPlanId,
            domain: finalDomain,
            emailPrefix: finalPrefix,
          }),
        },
      );

      const data = await response.json();

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
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue.",
      );

      setLoading(false);
    }
  }

  const previewEmail =
    cleanPrefix(emailPrefix) || "contact";

  const previewDomain =
    cleanDomain(domain) || "votre-domaine.fr";

  return (
    <main className="email-purchase-page">
      <div className="email-purchase-background">
        <div className="email-purchase-orb email-purchase-orb-one" />
        <div className="email-purchase-orb email-purchase-orb-two" />
        <div className="email-purchase-grid" />
      </div>

      <div className="email-purchase-container">
        <div className="email-purchase-layout">
          <section className="email-purchase-content">
            <div className="email-purchase-eyebrow">
              EMAIL PROFESSIONNEL NOVA
            </div>

            <h1>
              Configurez votre
              <br />
              <span>messagerie.</span>
            </h1>

            <p className="email-purchase-intro">
              Configurez votre adresse email
              professionnelle avant de passer au
              paiement sécurisé.
            </p>

            <form
              onSubmit={handleSubmit}
              className="email-purchase-form"
            >
              <div className="email-purchase-field">
                <label htmlFor="domain">
                  Votre domaine
                </label>

                <input
                  id="domain"
                  name="domain"
                  type="text"
                  value={domain}
                  onChange={(event) =>
                    setDomain(event.target.value)
                  }
                  placeholder="exemple.fr"
                  autoComplete="url"
                  disabled={loading}
                />

                <span>
                  Le domaine doit être associé à votre
                  compte NOVA.
                </span>
              </div>

              <div className="email-purchase-field">
                <label htmlFor="emailPrefix">
                  Votre adresse email
                </label>

                <div className="email-purchase-email-input">
                  <input
                    id="emailPrefix"
                    name="emailPrefix"
                    type="text"
                    value={emailPrefix}
                    onChange={(event) =>
                      setEmailPrefix(
                        cleanPrefix(
                          event.target.value,
                        ),
                      )
                    }
                    placeholder="contact"
                    autoComplete="email"
                    disabled={loading}
                  />

                  <span>
                    @{previewDomain}
                  </span>
                </div>

                <span>
                  Exemple : contact@votre-domaine.fr
                </span>
              </div>

              {error && (
                <div
                  className="email-purchase-error"
                  role="alert"
                >
                  <strong>
                    Impossible de continuer
                  </strong>

                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="email-purchase-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="email-purchase-spinner" />
                    Préparation du paiement...
                  </>
                ) : (
                  <>
                    Continuer vers le paiement
                    <ArrowIcon />
                  </>
                )}
              </button>

              <div className="email-purchase-secure">
                <span className="email-purchase-secure-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    Paiement sécurisé
                  </strong>

                  <span>
                    Vous serez redirigé vers Stripe
                    pour finaliser votre commande.
                  </span>
                </div>
              </div>
            </form>
          </section>

          <aside className="email-purchase-summary">
            <div className="email-purchase-summary-label">
              VOTRE OFFRE
            </div>

            <div className="email-purchase-plan">
              {selectedPlanId === "business" && (
                <div className="email-purchase-plan-badge">
                  LE PLUS CHOISI
                </div>
              )}

              <div className="email-purchase-plan-name">
                {selectedPlan.name}
              </div>

              <div className="email-purchase-plan-price">
                <strong>
                  {selectedPlan.price}
                </strong>

                <span>
                  {selectedPlanId === "team" ? "/ an" : "/ mois"}
                </span>
              </div>

              <p>
                {selectedPlan.description}
              </p>

              <div className="email-purchase-plan-stats">
                <div>
                  <span>Boîtes mail</span>

                  <strong>
                    {selectedPlan.mailboxes}
                  </strong>
                </div>

                <div>
                  <span>Stockage</span>

                  <strong>
                    {selectedPlan.storage} Go
                  </strong>
                </div>
              </div>
            </div>

            <div className="email-purchase-preview">
              <div className="email-purchase-preview-label">
                VOTRE ADRESSE
              </div>

              <div className="email-purchase-preview-address">
                <div className="email-purchase-preview-icon">
                  @
                </div>

                <div>
                  <span>
                    Adresse professionnelle
                  </span>

                  <strong>
                    {previewEmail}@{previewDomain}
                  </strong>
                </div>
              </div>
            </div>

            <div className="email-purchase-summary-features">
              <div>
                <span>✓</span>

                <p>
                  Messagerie professionnelle
                </p>
              </div>

              <div>
                <span>✓</span>

                <p>
                  Protection anti-spam
                </p>
              </div>

              <div>
                <span>✓</span>

                <p>
                  Accès ordinateur et mobile
                </p>
              </div>

              <div>
                <span>✓</span>

                <p>
                  Stockage {selectedPlan.storage} Go
                </p>
              </div>
            </div>

            <Link
              href="/emails"
              className="email-purchase-change"
            >
              Changer d'offre
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}