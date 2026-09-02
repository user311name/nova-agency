import Image from "next/image";
import Link from "next/link";
import "./page.css";

const siteUrl = "https://site-niko.vercel.app/";

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg
      className={`nova-arrow ${left ? "nova-arrow-left" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg
      className="nova-external-arrow"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 18L18 6" />
      <path d="M9 6h9v9" />
    </svg>
  );
}

export default function NovaAssistPage() {
  return (
    <main className="ia-page">
      <div className="ia-bg-grid" />
      <div className="ia-bg-glow ia-bg-glow-one" />
      <div className="ia-bg-glow ia-bg-glow-two" />

      <header className="ia-topbar">
        <Link href="/realisations" className="ia-back">
          <span className="ia-back-icon">
            <ArrowIcon left />
          </span>
          <span>RÉALISATIONS</span>
        </Link>

        <div className="ia-project-marker">
          <span className="ia-marker-dot" />
          <span>NOVA ASSIST</span>
        </div>

        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ia-top-link"
        >
          <span>VOIR LA DÉMO</span>
          <ExternalArrowIcon />
        </a>
      </header>

      <section className="ia-hero">
        <div className="ia-hero-intro">
          <div className="ia-hero-index">
            <span>03</span>
            <span>/</span>
            <span>03</span>
          </div>

          <div className="ia-hero-copy">
            <span className="ia-kicker">
              PROJET CONCEPT <i /> AGENCE DIGITALE
            </span>

            <h1>
              NOVA
              <span>ASSIST</span>
            </h1>

            <p>
              Un concept digital pensé pour présenter une agence moderne,
              structurer son offre et donner confiance à de futurs clients.
            </p>
          </div>

          <div className="ia-hero-side">
            <span>DESIGN</span>
            <span>WEB</span>
            <span>UX / UI</span>
          </div>
        </div>

        <div className="ia-feature">
          <div className="ia-feature-top">
            <span>01 — HOMEPAGE</span>
            <span>NOVA ASSIST / 2026</span>
          </div>

          <div className="ia-feature-image">
            <Image
              src="/projets/nova-assist.png"
              alt="NOVA Assist - page principale"
              width={1600}
              height={1000}
              priority
            />

            <div className="ia-image-overlay">
              <span>01</span>
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="ia-gallery">
          <div className="ia-gallery-card ia-gallery-large">
            <div className="ia-gallery-label">
              <span>02</span>
              <span>PRÉSENTATION</span>
            </div>

            <div className="ia-image">
              <Image
                src="/projets/nova-assist-1.png"
                alt="NOVA Assist - présentation"
                width={1600}
                height={1000}
              />
            </div>
          </div>

          <div className="ia-gallery-card ia-gallery-small">
            <div className="ia-gallery-label">
              <span>03</span>
              <span>INTERFACE</span>
            </div>

            <div className="ia-image">
              <Image
                src="/projets/nova-assist-2.png"
                alt="NOVA Assist - interface"
                width={1600}
                height={1000}
              />
            </div>
          </div>
        </div>

        <div className="ia-project-footer">
          <div className="ia-project-meta">
            <span>NOVA ASSIST</span>
            <span>CONCEPT DIGITAL</span>
            <span>UX / UI DESIGN</span>
          </div>

          <div className="ia-project-actions">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ia-visit"
            >
              <span>VOIR LA DÉMO</span>
              <ExternalArrowIcon />
            </a>

            <Link href="/devis" className="ia-devis-link">
              <span>PARLER DE MON PROJET</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="ia-details">
        <div className="ia-section-line">
          <span>01</span>
          <span>LE PROJET</span>
          <span>NOVA ASSIST</span>
        </div>

        <div className="ia-detail-content">
          <div className="ia-detail-heading">
            <span className="ia-small-title">NOVA ASSIST</span>

            <h2>
              Une présence
              <br />
              digitale pensée
              <br />
              pour <em>convaincre.</em>
            </h2>
          </div>

          <div className="ia-detail-text">
            <div className="ia-detail-block">
              <span className="ia-block-number">01</span>
              <div>
                <h3>LE CONCEPT</h3>
                <p>
                  Un projet de démonstration imaginé pour montrer comment une
                  agence peut présenter son expertise de façon claire,
                  élégante et professionnelle.
                </p>
              </div>
            </div>

            <div className="ia-detail-block">
              <span className="ia-block-number">02</span>
              <div>
                <h3>L&apos;OBJECTIF</h3>
                <p>
                  Mettre en avant les services, les réalisations et la valeur
                  apportée aux clients, tout en facilitant la prise de contact.
                </p>
              </div>
            </div>

            <div className="ia-detail-block">
              <span className="ia-block-number">03</span>
              <div>
                <h3>L&apos;APPROCHE NOVA</h3>
                <p>
                  Une direction artistique cohérente, une structure simple à
                  parcourir et une expérience pensée pour rester efficace sur
                  tous les écrans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ia-statement">
        <div className="ia-statement-line">
          <span />
          <span>DESIGN / STRATÉGIE / TECHNOLOGIE</span>
        </div>

        <p>
          Un site ne doit pas seulement
          <span> être beau.</span>
          <br />
          Il doit donner envie
          <span> d&apos;avancer.</span>
        </p>
      </section>

      <section className="ia-navigation">
        <Link href="/realisations/ia-future" className="ia-nav-card">
          <span>PROJET PRÉCÉDENT</span>

          <strong>
            <ArrowIcon left />
            IA FUTURE
          </strong>
        </Link>

        <Link href="/realisations" className="ia-nav-center">
          <span className="ia-nav-dot" />
          TOUTES LES RÉALISATIONS
        </Link>

        <Link href="/devis" className="ia-nav-card ia-nav-right">
          <span>VOTRE PROJET</span>

          <strong>
            PARLONS-EN
            <ArrowIcon />
          </strong>
        </Link>
      </section>

      <footer className="ia-footer">
        <span>NOVA</span>
        <span>AGENCE DIGITALE</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}