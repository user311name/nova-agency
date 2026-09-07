"use client";

import Link from "next/link";
import "./page.css";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="emails-icon"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="emails-check"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3 20 6v5c0 5.2-3.4 8.7-8 10-4.6-1.3-8-4.8-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M13 2 4 13h6l-1 9 9-12h-6l1-8Z" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="6" rx="2" />
      <rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M8 7h.01M8 17h.01" />
    </svg>
  );
}

const plans = [
  {
    id: "essential",
    name: "Essentiel",
    price: "14,90 €",
    description:
      "Pour une activité indépendante ou une petite entreprise.",
    features: [
      "1 boîte mail",
      "15 Go de stockage",
      "Antivirus & antispam",
      "Accès webmail et mobile",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "39,90 €",
    description:
      "Pour une entreprise qui souhaite plusieurs adresses.",
    popular: true,
    features: [
      "3 boîtes mail",
      "45 Go de stockage",
      "Antivirus & antispam",
      "Accès webmail et mobile",
      "Support prioritaire",
    ],
  },
  {
    id: "team",
    name: "Équipe",
    price: "59,90 €",
    description:
      "Pour les équipes qui veulent une identité professionnelle complète.",
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

export default function EmailsPage() {
  return (
    <main className="emails-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="emails-header">
        <div className="emails-header-inner">

          <Link href="/" className="emails-logo">
            N<span>O</span>VA
          </Link>

          <nav
            className="emails-nav"
            aria-label="Navigation principale"
          >
            <Link href="/domaines">
              Domaines
            </Link>

            <Link href="/services">
              Hébergement
            </Link>

            <Link
              href="/emails"
              className="active"
            >
              Emails
            </Link>

            <Link href="/securite">
              Sécurité
            </Link>

            <Link href="/a-propos">
              À propos
            </Link>
          </nav>

          <Link
            href="/espace-client"
            className="emails-account"
          >
            Espace client
          </Link>

        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="emails-hero">
        <div className="emails-container">

          <div className="emails-hero-content">

            <div className="emails-eyebrow">
              <span className="emails-dot" />
              EMAILS PROFESSIONNELS NOVA
            </div>

            <h1>
              Votre identité.
              <br />
              <span>Dans chaque</span>
              <br />
              <span>email.</span>
            </h1>

            <p>
              Créez des adresses email professionnelles avec
              votre propre domaine et donnez une image plus
              crédible à chaque échange.
            </p>

            <div className="emails-actions">

              <Link
                href="#offres"
                className="emails-primary-button"
              >
                Voir les offres
                <ArrowIcon />
              </Link>

              <Link
                href="/espace-client/emails"
                className="emails-secondary-button"
              >
                Gérer mes emails
                <ArrowIcon />
              </Link>

            </div>

            <div className="emails-trust">
              <span>15 Go+ par boîte</span>
              <span>Votre domaine</span>
              <span>Connexion sécurisée</span>
            </div>

          </div>

          {/* =================================================
              EMAIL VISUAL
          ================================================= */}

          <div
            className="emails-hero-visual"
            aria-hidden="true"
          >

            <div className="emails-glow" />

            <div className="emails-mail-card">

              <div className="emails-mail-top">

                <div className="emails-mail-icon">
                  <MailIcon />
                </div>

                <div className="emails-mail-status">
                  SECURE
                  <br />
                  MAIL
                </div>

              </div>

              <div className="emails-mail-content">

                <small>
                  NOUVEAU MESSAGE
                </small>

                <strong>
                  contact@votreentreprise.fr
                </strong>

              </div>

              <div className="emails-lines">
                <span />
                <span />
                <span />
              </div>

              <div className="emails-mail-bottom">
                <span>
                  NOVA PROFESSIONAL EMAIL
                </span>

                <strong>
                  01
                </strong>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="emails-benefits">

        <div className="emails-container">

          <div className="emails-benefit-grid">

            <article className="emails-benefit-card">

              <div className="emails-benefit-icon">
                <ShieldIcon />
              </div>

              <span className="emails-benefit-number">
                01
              </span>

              <h3>
                Crédibilité
              </h3>

              <p>
                Renforcez la confiance de vos clients
                avec une adresse à votre nom.
              </p>

            </article>

            <article className="emails-benefit-card">

              <div className="emails-benefit-icon">
                <LightningIcon />
              </div>

              <span className="emails-benefit-number">
                02
              </span>

              <h3>
                Simplicité
              </h3>

              <p>
                Une configuration rapide et une gestion
                pensée pour rester simple.
              </p>

            </article>

            <article className="emails-benefit-card">

              <div className="emails-benefit-icon">
                <ServerIcon />
              </div>

              <span className="emails-benefit-number">
                03
              </span>

              <h3>
                Haute disponibilité
              </h3>

              <p>
                Vos emails restent accessibles lorsque
                votre activité en a besoin.
              </p>

            </article>

            <article className="emails-benefit-card">

              <div className="emails-benefit-icon">
                <ShieldIcon />
              </div>

              <span className="emails-benefit-number">
                04
              </span>

              <h3>
                Sécurité
              </h3>

              <p>
                Protection avancée contre les menaces,
                le spam et les messages indésirables.
              </p>

            </article>

          </div>

        </div>

      </section>

      {/* =====================================================
          OFFERS
      ===================================================== */}

      <section
        className="emails-offers"
        id="offres"
      >

        <div className="emails-container">

          <div className="emails-offers-heading">

            <span className="emails-label">
              NOS OFFRES
            </span>

            <h2>
              Choisissez la formule
              <br />
              adaptée à votre activité.
            </h2>

            <p>
              Une boîte pour commencer ou plusieurs
              adresses pour toute votre équipe.
            </p>

          </div>

          <div className="emails-plan-grid">

            {plans.map((plan) => (

              <article
                key={plan.id}
                className={`emails-plan ${
                  plan.popular
                    ? "featured"
                    : ""
                }`}
              >

                {plan.popular && (
                  <div className="emails-plan-badge">
                    LE PLUS CHOISI
                  </div>
                )}

                <div className="emails-plan-top">

                  <div className="emails-plan-icon">
                    <MailIcon />
                  </div>

                  <h3>
                    {plan.name}
                  </h3>

                </div>

                <p className="emails-plan-description">
                  {plan.description}
                </p>

                <div className="emails-plan-price">
                  <strong>
                    {plan.price}
                  </strong>

                  <span>
                    / an
                  </span>
                </div>

                <div className="emails-plan-divider" />

                <ul className="emails-plan-list">

                  {plan.features.map(
                    (feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        <span>
                          {feature}
                        </span>
                      </li>
                    )
                  )}

                </ul>

                <Link
                  href={`/espace-client/emails/acheter?plan=${plan.id}`}
                  className="emails-plan-button"
                >
                  Acheter cette offre
                  <ArrowIcon />
                </Link>

              </article>

            ))}

          </div>

          <p className="emails-offers-note">
            Paiement sécurisé. Votre adresse est créée
            sur votre propre domaine.
          </p>

        </div>

      </section>

      {/* =====================================================
          INTRO / POSITIONNEMENT
      ===================================================== */}

      <section className="emails-intro">

        <div className="emails-container">

          <span className="emails-label">
            POURQUOI UN EMAIL PROFESSIONNEL
          </span>

          <div className="emails-intro-grid">

            <h2>
              Une adresse
              <br />
              professionnelle
              <br />
              <span>change la perception.</span>
            </h2>

            <div className="emails-intro-content">

              <p>
                contact@votreentreprise.fr inspire
                davantage confiance qu'une adresse
                personnelle.
              </p>

              <p>
                Avec NOVA, votre messagerie utilise
                directement votre nom de domaine pour
                créer une identité cohérente et
                professionnelle.
              </p>

              <div className="emails-intro-checks">

                <span>
                  <CheckIcon />
                  Image plus professionnelle
                </span>

                <span>
                  <CheckIcon />
                  Meilleure délivrabilité
                </span>

                <span>
                  <CheckIcon />
                  Parfait pour votre marque
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="emails-process">

        <div className="emails-container">

          <div className="emails-section-heading">

            <span className="emails-label">
              COMMENT ÇA MARCHE
            </span>

            <h2>
              Votre adresse.
              <br />
              Simplement.
            </h2>

          </div>

          <div className="emails-process-grid">

            <article className="emails-process-card">
              <span>01</span>

              <h3>
                Choisissez votre offre
              </h3>

              <p>
                Sélectionnez la formule adaptée
                au nombre de boîtes dont vous avez
                besoin.
              </p>
            </article>

            <article className="emails-process-card">
              <span>02</span>

              <h3>
                Indiquez votre domaine
              </h3>

              <p>
                Utilisez votre domaine NOVA et
                choisissez le nom de votre adresse.
              </p>
            </article>

            <article className="emails-process-card">
              <span>03</span>

              <h3>
                Recevez votre messagerie
              </h3>

              <p>
                Après le paiement, votre commande
                est traitée et votre boîte est
                configurée.
              </p>
            </article>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="emails-final-cta">

        <div className="emails-container">

          <div className="emails-final-card">

            <span className="emails-label">
              NOVA EMAIL
            </span>

            <h2>
              Donnez une vraie
              <br />
              identité à vos échanges.
            </h2>

            <p>
              Choisissez votre formule et créez
              votre première adresse professionnelle.
            </p>

            <Link
              href="#offres"
              className="emails-primary-button"
            >
              Choisir mon offre
              <ArrowIcon />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="emails-footer">

        <div className="emails-footer-inner">

          <Link
            href="/"
            className="emails-footer-logo"
          >
            N<span>O</span>VA
          </Link>

          <div className="emails-footer-links">

            <Link href="/domaines">
              Domaines
            </Link>

            <Link href="/services">
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

            <Link href="/contact">
              Contact
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}