"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./page.css";

type Email = {
  id: string;
  domain: string;
  email_address: string;
  email_prefix: string;
  plan: string;
  billing_period: string;
  amount: number;
  currency: string;
  status: string;
  stripe_session_id?: string;
  created_at: string;
};

type EmailPlan = {
  id: "essential" | "business" | "team";
  number: string;
  name: string;
  description: string;
  price: string;
  mailboxes: string;
  storage: string;
  features: string[];
  popular?: boolean;
};

const plans: EmailPlan[] = [
  {
    id: "essential",
    number: "01",
    name: "Essentiel",
    description:
      "Pour une activité indépendante ou une petite entreprise.",
    price: "9,90 €",
    mailboxes: "1 boîte mail",
    storage: "15 Go de stockage",
    features: [
      "1 boîte mail",
      "15 Go de stockage",
      "Antivirus & antispam",
      "Accès webmail et mobile",
    ],
  },
  {
    id: "business",
    number: "02",
    name: "Business",
    description:
      "Pour une entreprise qui souhaite plusieurs adresses.",
    price: "14,90 €",
    mailboxes: "3 boîtes mail",
    storage: "45 Go de stockage",
    features: [
      "3 boîtes mail",
      "45 Go de stockage",
      "Antivirus & antispam",
      "Accès webmail et mobile",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    id: "team",
    number: "03",
    name: "Équipe",
    description:
      "Pour les équipes qui veulent une identité professionnelle complète.",
    price: "129 € / an",
    mailboxes: "5 boîtes mail",
    storage: "75 Go de stockage",
    features: [
      "5 boîtes mail",
      "75 Go de stockage",
      "Antivirus & antispam",
      "Accès webmail et mobile",
      "Support prioritaire",
      "Gestion des alias",
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 7L12 13L20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3L20 6V11C20 16 16.8 19.5 12 21C7.2 19.5 4 16 4 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12L10.8 14.3L15.7 9.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="2.8"
        width="10"
        height="18.4"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 5H13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="18"
        r="0.8"
        fill="currentColor"
      />
    </svg>
  );
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[] | null>(null);

  useEffect(() => {
    async function fetchEmails() {
      const res = await fetch("/api/emails/client/emails", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setEmails(data.emails);
      }
    }
    fetchEmails();
  }, []);

  function getStatusLabel(status: string) {
    if (status === "pending") {
      return "Activation en cours";
    }
    return status || "Non défini";
  }

  function getPlanName(plan: string) {
    const names: Record<string, string> = {
      essential: "Essentiel",
      business: "Business",
      team: "Équipe",
    };
    return names[plan] || plan;
  }

  function getBillingPeriodLabel(period: string) {
    if (period === "annual") {
      return "Annuel";
    }
    return "Mensuel";
  }

  return (
    <main className="emails-page">
      {/* =====================================================
          EMAILS ENREGISTRÉS
      ===================================================== */}

      {emails !== null && emails.length > 0 && (
        <section className="emails-registered">
          <div className="emails-container">
            <h2>Vos emails</h2>

            <div className="emails-registered-grid">
              {emails.map((email) => {
                const statusLabel = getStatusLabel(email.status);
                return (
                  <div
                    key={email.id}
                    className="emails-registered-item"
                  >
                    <div className="emails-registered-address">
                      <strong>
                        {email.email_prefix}
                      </strong>
                      <span>
                        @{email.domain}
                      </span>
                    </div>

                    <div className="emails-registered-details">
                      <div>
                        <strong>{getPlanName(email.plan)}</strong>
                      </div>

                      <div>
                        <strong>{getBillingPeriodLabel(
                          email.billing_period
                        )}</strong>
                        <span>{email.amount} €</span>
                      </div>

                      <div>
                        <span>{statusLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="emails-hero">
        <div className="emails-container">
          <div className="emails-hero-grid">
            <div className="emails-hero-copy">
              <div className="emails-eyebrow">
                <span className="emails-eyebrow-dot" />
                EMAILS PROFESSIONNELS NOVA
              </div>

              <h1>
                Votre
                <br />
                <span>identité.</span>
                <br />
                <em>Dans chaque</em>
                <br />
                message.
              </h1>

              <p>
                Une messagerie professionnelle associée à votre
                nom de domaine, pensée pour votre image, votre
                activité et votre quotidien.
              </p>

              <div className="emails-hero-actions">
                <a
                  href="#offres"
                  className="emails-primary-link"
                >
                  Découvrir les offres
                  <ArrowIcon />
                </a>

                <a
                  href="#pourquoi"
                  className="emails-secondary-link"
                >
                  Pourquoi NOVA ?
                  <span>↓</span>
                </a>
              </div>

              <div className="emails-hero-points">
                <span>
                  <CheckIcon />
                  Adresse professionnelle
                </span>
                <span>
                  <CheckIcon />
                  Protection anti-spam
                </span>
                <span>
                  <CheckIcon />
                  Accès mobile
                </span>
              </div>
            </div>

            <div className="emails-hero-visual">
              <div className="emails-glow emails-glow-one" />
              <div className="emails-glow emails-glow-two" />

              <div className="emails-mail-card">
                <div className="emails-mail-icon">
                  <MailIcon />
                </div>

                <div className="emails-mail-content">
                  <div className="emails-mail-label">
                    NOUVEAU MESSAGE
                  </div>

                  <strong>
                    contact@votreentreprise.fr
                  </strong>

                  <div className="emails-mail-line large" />
                  <div className="emails-mail-line" />
                  <div className="emails-mail-line short" />
                </div>

                <div className="emails-mail-footer">
                  <span>PROTECTED</span>
                  <strong>NOVA</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK STATS
      ===================================================== */}
      <section className="emails-stats">
        <div className="emails-container">
          <div className="emails-stats-grid">
            <div className="emails-stat">
              <span>MESSAGES</span>
              <strong>24</strong>
            </div>
            <div className="emails-stat">
              <span>STOCKAGE</span>
              <strong>8,4 Go</strong>
            </div>
            <div className="emails-stat">
              <span>PROTECTION</span>
              <strong>ACTIVE</strong>
            </div>
            <div className="emails-stat">
              <span>ACCÈS</span>
              <strong>WEB + MOBILE</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY
      ===================================================== */}
      <section
        id="pourquoi"
        className="emails-why"
      >
        <div className="emails-container">
          <div className="emails-section-number">
            01 / POURQUOI UNE ADRESSE PRO ?
          </div>

          <div className="emails-why-grid">
            <div>
              <h2>
                Plus qu'une boîte mail.
                <br />
                <span>Une identité.</span>
              </h2>
            </div>

            <div className="emails-why-copy">
              <p>
                Une adresse comme
                <strong>
                  contact@votreentreprise.fr
                </strong>
                ne sert pas uniquement à recevoir des
                messages.
              </p>

              <p>
                Elle participe directement à la perception
                de votre entreprise. NOVA vous permet de
                disposer d'une messagerie professionnelle
                directement liée à votre domaine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}
      <section className="emails-benefits">
        <div className="emails-container">
          <div className="emails-benefits-heading">
            <div>
              <div className="emails-section-number">
                02 / L'ESSENTIEL
              </div>
              <h2>
                Pensée pour votre
                <br />
                <span>quotidien.</span>
              </h2>
            </div>

            <p>
              Une messagerie simple à utiliser, sérieuse
              dans son apparence et pensée pour accompagner
              votre activité.
            </p>
          </div>

          <div className="emails-benefits-grid">
            <article className="emails-benefit-card">
              <div className="emails-benefit-icon">
                <MailIcon />
              </div>
              <span>01</span>

              <h3>
                Votre nom,
                <br />
                votre domaine.
              </h3>

              <p>
                Utilisez une adresse professionnelle
                directement associée à votre propre
                nom de domaine.
              </p>
            </article>

            <article className="emails-benefit-card">
              <div className="emails-benefit-icon">
                <ShieldIcon />
              </div>
              <span>02</span>

              <h3>
                Une image plus
                <br />
                professionnelle.
              </h3>

              <p>
                Présentez votre activité avec une adresse
                email qui inspire confiance à vos clients
                et partenaires.
              </p>
            </article>

            <article className="emails-benefit-card">
              <div className="emails-benefit-icon">
                <SmartphoneIcon />
              </div>
              <span>03</span>

              <h3>
                Accessible
                <br />
                partout.
              </h3>

              <p>
                Consultez vos emails depuis votre ordinateur,
                votre tablette ou votre smartphone.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          OFFRES
      ===================================================== */}
      <section
        id="offres"
        className="emails-offers"
      >
        <div className="emails-container">
          <div className="emails-section-number">
            03 / NOS OFFRES
          </div>

          <h2>
            Choisissez votre
            <br />
            formule.
          </h2>

          <div className="emails-offers-grid">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className="emails-offer-card"
                data-plan={plan.id}
              >
                <div className="emails-offer-icon">
                  <MailIcon />
                </div>

                <div className="emails-offer-content">
                  <div className="emails-offer-header">
                    <h3>{plan.name}</h3>
                    <span className="emails-offer-badge">
                      {plan.popular ? "Le plus choisi" : ""}
                    </span>
                  </div>

                  <p className="emails-offer-description">
                    {plan.description}
                  </p>

                  <div className="emails-offer-details">
                    <div className="emails-offer-detail">
                      <span>Boîtes mail</span>
                      <strong>{plan.mailboxes}</strong>
                    </div>

                    <div className="emails-offer-detail">
                      <span>Stockage</span>
                      <strong>{plan.storage}</strong>
                    </div>
                  </div>

                  <div className="emails-offer-price">
                    <strong>{plan.price}</strong>
                    <span>/ mois</span>
                    {plan.id === "team" && (
                      <>
                        <span> / an</span>
                      </>
                    )}
                  </div>

                  <div className="emails-offer-features">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="emails-offer-feature"
                      >
                        <span>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="emails-offer-actions">
                    <Link
                      href={`/espace-client/emails/acheter?plan=${plan.id}`}
                      className="emails-offer-button"
                    >
                      Configurer et acheter
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            <div className="emails-offers-note">
              <p>
                Tous les prix sont indiqués en euros toutes taxes
                comprises. Facturation mensuelle ou annuelle selon
                l'option sélectionnée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="emails-footer">
        <div className="emails-container">
          <div className="emails-footer-inner">
            <div className="emails-footer-top">
              <div className="emails-footer-links">
                <div>
                  <span>EXPLORER</span>

                  <Link href="/espace-client/domaines">
                    Domaines
                  </Link>

                  <Link href="/espace-client/services">
                    Hébergement
                  </Link>

                  <Link href="/espace-client/securite">
                    Sécurité
                  </Link>
                </div>

                <div>
                  <span>CONTACT</span>

                  <Link href="/contact">
                    Nous contacter
                  </Link>

                  <Link href="/faq">
                    FAQ
                  </Link>
                </div>
              </div>

              <div className="emails-footer-bottom">
                <span>
                  © {new Date().getFullYear()} NOVA.
                  Tous droits réservés.
                </span>

                <div>
                  <Link href="/mentions-legales">
                    Mentions légales
                  </Link>

                  <Link href="/contact">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}