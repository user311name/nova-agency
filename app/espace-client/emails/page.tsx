"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FormEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./page.css";

type PlanId = "essential" | "business" | "team";

type Plan = {
  id: PlanId;
  name: string;
  price: number;
  mailboxes: number;
  storage: number;
};

const plans: Record<PlanId, Plan> = {
  essential: {
    id: "essential",
    name: "Essentiel",
    price: 14.9,
    mailboxes: 1,
    storage: 15,
  },
  business: {
    id: "business",
    name: "Business",
    price: 39.9,
    mailboxes: 3,
    storage: 45,
  },
  team: {
    id: "team",
    name: "Équipe",
    price: 59.9,
    mailboxes: 5,
    storage: 75,
  },
};

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

function AcheterEmailContent() {
  const searchParams = useSearchParams();

  const requestedPlan = searchParams.get("plan") as PlanId | null;

  const selectedPlan = useMemo(() => {
    if (
      requestedPlan &&
      Object.prototype.hasOwnProperty.call(plans, requestedPlan)
    ) {
      return plans[requestedPlan];
    }

    return plans.essential;
  }, [requestedPlan]);

  const [domain, setDomain] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("contact");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [selectedPlan.id]);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const cleanDomainValue = cleanDomain(domain);
    const cleanPrefixValue = cleanPrefix(emailPrefix);

    if (!cleanDomainValue) {
      setError("Indiquez votre nom de domaine.");
      return;
    }

    if (!cleanDomainValue.includes(".")) {
      setError("Le nom de domaine semble incorrect.");
      return;
    }

    if (!cleanPrefixValue) {
      setError("Indiquez le nom de votre boîte mail.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/emails/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          plan: selectedPlan.id,
          domain: cleanDomainValue,
          emailPrefix: cleanPrefixValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de démarrer le paiement.",
        );
      }

      if (!data?.url) {
        throw new Error(
          "La session de paiement n'a pas été créée.",
        );
      }

      window.location.href = data.url;
    } catch (err) {
      setLoading(false);

      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue.",
      );
    }
  }

  return (
    <main className="email-checkout-page">
      <header className="email-checkout-header">
        <div className="email-checkout-header-inner">
          <Link href="/" className="email-checkout-logo">
            NOV<span>A</span>
          </Link>

          <Link href="/emails" className="email-checkout-back">
            <span>←</span>
            Retour aux emails
          </Link>
        </div>
      </header>

      <section className="email-checkout-main">
        <div className="email-checkout-container">
          <div className="email-checkout-intro">
            <div className="email-checkout-eyebrow">
              EMAIL PROFESSIONNEL NOVA
            </div>

            <h1>
              Configurez votre
              <br />
              <span>messagerie professionnelle.</span>
            </h1>

            <p>
              Choisissez votre offre et indiquez le domaine sur
              lequel vous souhaitez créer votre adresse
              professionnelle.
            </p>
          </div>

          <div className="email-checkout-layout">
            <form
              className="email-checkout-form"
              onSubmit={handleSubmit}
            >
              <div className="email-checkout-step">
                <span>01</span>

                <div>
                  <small>VOTRE DOMAINE</small>
                  <h2>Sur quel domaine ?</h2>
                </div>
              </div>

              <label className="email-field">
                <span>Nom de domaine</span>

                <div className="email-input-wrapper">
                  <input
                    type="text"
                    value={domain}
                    onChange={(event) =>
                      setDomain(event.target.value)
                    }
                    placeholder="votreentreprise.fr"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                <small>
                  Exemple : votreentreprise.fr
                </small>
              </label>

              <div className="email-checkout-step">
                <span>02</span>

                <div>
                  <small>VOTRE ADRESSE</small>
                  <h2>Choisissez votre boîte.</h2>
                </div>
              </div>

              <label className="email-field">
                <span>Nom de la boîte</span>

                <div className="email-address-input">
                  <input
                    type="text"
                    value={emailPrefix}
                    onChange={(event) =>
                      setEmailPrefix(event.target.value)
                    }
                    placeholder="contact"
                    autoComplete="off"
                    spellCheck={false}
                  />

                  <strong>
                    @{domain || "votreentreprise.fr"}
                  </strong>
                </div>

                <small>
                  Vous pourrez utiliser une adresse comme
                  contact@votreentreprise.fr.
                </small>
              </label>

              <div className="email-checkout-step">
                <span>03</span>

                <div>
                  <small>PAIEMENT</small>
                  <h2>Finalisez votre commande.</h2>
                </div>
              </div>

              <div className="email-secure-payment">
                <div className="email-secure-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Paiement sécurisé
                  </strong>

                  <span>
                    Le paiement est traité de manière
                    sécurisée par Stripe.
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
                {loading
                  ? "Préparation du paiement..."
                  : "Continuer vers le paiement"}

                {!loading && <ArrowIcon />}
              </button>
            </form>

            <aside className="email-summary">
              <div className="email-summary-top">
                <span>VOTRE OFFRE</span>

                <div className="email-summary-badge">
                  NOVA
                </div>
              </div>

              <h2>{selectedPlan.name}</h2>

              <p>
                Messagerie professionnelle NOVA.
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
                  {selectedPlan.mailboxes > 1
                    ? "s"
                    : ""}{" "}
                  mail
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
                <small>ADRESSE À CRÉER</small>

                <strong>
                  {emailPrefix || "contact"}
                  <span>@</span>
                  {domain || "votreentreprise.fr"}
                </strong>
              </div>

              <div className="email-summary-note">
                Après le paiement, votre commande apparaîtra
                dans votre espace client.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AcheterEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="email-checkout-page">
          <section className="email-checkout-main">
            <div className="email-checkout-container">
              <div className="email-checkout-intro">
                <div className="email-checkout-eyebrow">
                  EMAIL PROFESSIONNEL NOVA
                </div>

                <h1>
                  Chargement...
                  <br />
                  <span>Préparation de votre espace.</span>
                </h1>

                <p>
                  Nous préparons votre espace de messagerie.
                </p>
              </div>
            </div>
          </section>
        </main>
      }
    >
      <AcheterEmailContent />
    </Suspense>
  );
}