import Link from "next/link";
import "./page.css";

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
    price: "14,90 €",
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
    price: "39,90 €",
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
    price: "59,90 €",
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
        strokeLinejoin="round"
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
  return (
    <main className="emails-page">

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

                <div className="emails-mail-card-top">
                  <div className="emails-mail-icon">
                    <MailIcon />
                  </div>

                  <div className="emails-mail-secure">
                    <span />
                    SECURE
                    <br />
                    MAIL
                  </div>
                </div>

                <div className="emails-mail-content">

                  <span className="emails-mail-label">
                    NOUVEAU MESSAGE
                  </span>

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

              <div className="emails-floating-card">
                <span>MESSAGERIE</span>
                <strong>PROFESSIONNELLE</strong>
                <small>
                  contact@votreentreprise.fr
                </small>
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
                Consultez et gérez vos messages depuis
                votre ordinateur, votre navigateur ou
                votre téléphone.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* =====================================================
          OFFERS
      ===================================================== */}

      <section
        id="offres"
        className="emails-offers"
      >
        <div className="emails-container">

          <div className="emails-offers-heading">

            <div>
              <div className="emails-section-number">
                03 / NOS OFFRES
              </div>

              <h2>
                Choisissez la formule
                <br />
                <span>adaptée à votre activité.</span>
              </h2>
            </div>

            <p>
              Une boîte pour commencer ou plusieurs adresses
              pour toute votre équipe.
            </p>

          </div>

          <div className="emails-plans-grid">

            {plans.map((plan) => (
              <article
                key={plan.id}
                className={
                  plan.popular
                    ? "emails-plan emails-plan-popular"
                    : "emails-plan"
                }
              >

                {plan.popular && (
                  <div className="emails-popular-badge">
                    <span className="emails-popular-dot" />
                    LE PLUS CHOISI
                  </div>
                )}

                <div className="emails-plan-top">

                  <div className="emails-plan-number">
                    {plan.number}
                  </div>

                  <div className="emails-plan-icon">
                    <MailIcon />
                  </div>

                  <div className="emails-plan-title">
                    <span>
                      {plan.popular
                        ? "SIGNATURE"
                        : plan.name.toUpperCase()}
                    </span>

                    <h3>{plan.name}</h3>
                  </div>

                </div>

                <p className="emails-plan-description">
                  {plan.description}
                </p>

                <div className="emails-plan-price">
                  <strong>{plan.price}</strong>
                  <span>/ an</span>
                </div>

                <div className="emails-plan-divider" />

                <ul className="emails-plan-features">

                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}

                </ul>

                <Link
                  href={`/espace-client/emails/acheter?plan=${plan.id}`}
                  className={
                    plan.popular
                      ? "emails-plan-button emails-plan-button-primary"
                      : "emails-plan-button"
                  }
                >
                  <span>
                    Acheter cette offre
                  </span>

                  <ArrowIcon />
                </Link>

              </article>
            ))}

          </div>

          <div className="emails-offers-reassurance">
            <span>✓</span>
            Paiement sécurisé. Votre adresse est créée
            sur votre propre domaine.
          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="emails-final-cta">
        <div className="emails-container">

          <div className="emails-final-inner">

            <div className="emails-final-glow" />

            <div className="emails-section-number">
              04 / PASSEZ À L'ÉTAPE SUIVANTE
            </div>

            <h2>
              Votre prochaine adresse
              <br />
              <span>commence ici.</span>
            </h2>

            <p>
              Choisissez votre formule et créez une adresse
              professionnelle qui correspond réellement
              à votre activité.
            </p>

            <a
              href="#offres"
              className="emails-final-button"
            >
              Choisir ma formule
              <ArrowIcon />
            </a>

          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="emails-footer">
        <div className="emails-container">

          <div className="emails-footer-top">

            <div>
              <Link
                href="/"
                className="emails-footer-logo"
              >
                NOV<span>A</span>
              </Link>

              <p>
                Messagerie professionnelle.
                <br />
                Simple. Sérieuse. NOVA.
              </p>
            </div>

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
      </footer>

    </main>
  );
}