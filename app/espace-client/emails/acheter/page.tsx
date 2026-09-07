"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./page.css";

type PlanId = "essential" | "business" | "team";

type Plan = {
  id: PlanId;
  name: string;
  price: number;
  mailboxes: number;
  storage: number;
};

const plans: Plan[] = [
  {
    id: "essential",
    name: "Essentiel",
    price: 14.9,
    mailboxes: 1,
    storage: 15,
  },
  {
    id: "business",
    name: "Business",
    price: 39.9,
    mailboxes: 3,
    storage: 45,
  },
  {
    id: "team",
    name: "Équipe",
    price: 59.9,
    mailboxes: 5,
    storage: 75,
  },
];

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

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function EmailPurchaseContent() {
  const searchParams = useSearchParams();

  const requestedPlan = searchParams.get("plan") as PlanId | null;

  const selectedPlan = useMemo(() => {
    return plans.find((plan) => plan.id === requestedPlan) ?? plans[0];
  }, [requestedPlan]);

  const [domain, setDomain] = useState("");
  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizedDomain = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/,?/, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");

  const normalizedPrefix = prefix
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "");

  const fullEmail =
    normalizedPrefix && normalizedDomain
      ? `${normalizedPrefix}@${normalizedDomain}`
      : "contact@votre-domaine.fr";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!normalizedDomain) {
      setError("Veuillez renseigner votre domaine.");
      return;
    }

    if (!normalizedPrefix) {
      setError("Veuillez choisir le nom de votre boîte mail.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/emails/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan.id,
          domain: normalizedDomain,
          emailPrefix: normalizedPrefix,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de créer la session de paiement.",
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

  return (
    <main className="email-checkout-page">
      <header className="email-checkout-header">
        <div className="email-checkout-header-inner">
          <a href="/emails" className="email-checkout-logo">
            NOV<span>A</span>
          </a>

          <a href="/emails#offres" className="email-checkout-back">
            <span>←</span>
            Retour aux offres
          </a>
        </div>
      </header>

      <div className="email-checkout-main">
        <div className="email-checkout-container">
          <section className="email-checkout-intro">
            <div className="email-checkout-eyebrow">
              NOVA · PROFESSIONAL EMAIL
            </div>

            <h1>
              Créez votre adresse.
              <br />
              <span>En quelques secondes.</span>
            </h1>

            <p>
              Choisissez votre domaine et le nom de votre boîte
              professionnelle. Le paiement est sécurisé par Stripe.
            </p>
          </section>

          <div className="email-checkout-layout">
            <section className="email-checkout-form">
              <div className="email-checkout-step">
                <span>01</span>

                <div>
                  <small>VOTRE ADRESSE</small>
                  <h2>Configurez votre email</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="email-field">
                  <span>Votre domaine</span>

                  <div className="email-input-wrapper">
                    <input
                      type="text"
                      value={domain}
                      onChange={(event) =>
                        setDomain(event.target.value)
                      }
                      placeholder="votreentreprise.fr"
                      autoComplete="off"
                    />
                  </div>

                  <small>
                    Utilisez un domaine déjà enregistré chez NOVA.
                  </small>
                </label>

                <label className="email-field">
                  <span>Nom de la boîte</span>

                  <div className="email-address-input">
                    <input
                      type="text"
                      value={prefix}
                      onChange={(event) =>
                        setPrefix(event.target.value)
                      }
                      placeholder="contact"
                      autoComplete="off"
                    />

                    <strong>
                      @<span>{normalizedDomain || "domaine.fr"}</span>
                    </strong>
                  </div>

                  <small>
                    Exemple : contact, bonjour, prenom...
                  </small>
                </label>

                <div className="email-secure-payment">
                  <div className="email-secure-icon">
                    <ShieldIcon />
                  </div>

                  <div>
                    <strong>Paiement sécurisé</strong>
                    <span>
                      Vous serez redirigé vers Stripe pour finaliser
                      votre commande.
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="email-checkout-error">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="email-checkout-button"
                  disabled={loading}
                >
                  {loading ? (
                    "Redirection vers Stripe..."
                  ) : (
                    <>
                      Continuer vers le paiement
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </form>
            </section>

            <aside className="email-summary">
              <div className="email-summary-top">
                <span>VOTRE FORMULE</span>

                <div className="email-summary-badge">
                  {selectedPlan.id === "business"
                    ? "POPULAIRE"
                    : "NOVA"}
                </div>
              </div>

              <h2>{selectedPlan.name}</h2>

              <p>
                Email professionnel avec votre propre domaine.
              </p>

              <div className="email-summary-price">
                <strong>
                  {selectedPlan.price
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </strong>

                <span>/ an</span>
              </div>

              <div className="email-summary-divider" />

              <div className="email-summary-list">
                <div>
                  <CheckIcon />
                  {selectedPlan.mailboxes} boîte
                  {selectedPlan.mailboxes > 1 ? "s" : ""} mail
                </div>

                <div>
                  <CheckIcon />
                  {selectedPlan.storage} Go de stockage
                </div>

                <div>
                  <CheckIcon />
                  Domaine personnalisé
                </div>

                <div>
                  <CheckIcon />
                  Connexion sécurisée
                </div>

                <div>
                  <CheckIcon />
                  Assistance NOVA
                </div>
              </div>

              <div className="email-summary-domain">
                <small>ADRESSE QUI SERA COMMANDÉE</small>

                <strong>
                  {normalizedPrefix || "contact"}
                  <span>@</span>
                  {normalizedDomain || "votre-domaine.fr"}
                </strong>
              </div>

              <p className="email-summary-note">
                Le paiement sera effectué sur Stripe. Votre commande
                sera ensuite traitée par NOVA.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function EmailPurchasePage() {
  return (
    <Suspense
      fallback={
        <main className="email-checkout-page">
          <div className="email-checkout-main">
            <div className="email-checkout-container">
              <section className="email-checkout-intro">
                <div className="email-checkout-eyebrow">
                  NOVA · PROFESSIONAL EMAIL
                </div>

                <h1>
                  Chargement...
                  <br />
                  <span>Préparation de votre commande.</span>
                </h1>

                <p>
                  Nous préparons votre espace de commande.
                </p>
              </section>
            </div>
          </div>
        </main>
      }
    >
      <EmailPurchaseContent />
    </Suspense>
  );
}