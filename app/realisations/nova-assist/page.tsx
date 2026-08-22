import Image from "next/image";
import Link from "next/link";
import "./page.css";

const siteUrl = "https://site-niko.vercel.app/";

export default function NovaAssistPage() {
  return (
    <main className="ia-page">
      <header className="ia-topbar">
        <Link href="/realisations" className="ia-back">
          <span className="css-arrow css-arrow-left" />
          RÉALISATIONS
        </Link>

        <span className="ia-project-name">
          NOVA ASSIST
        </span>

        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ia-top-link"
        >
          VOIR
          <span className="css-arrow" />
        </a>
      </header>

      <section className="ia-hero">
        <div className="ia-hero-content">
          <span className="ia-kicker">
            PROJET • AGENCE DIGITALE
          </span>

          <h1>NOVA ASSIST</h1>

          <p>
            Une expérience digitale premium pensée pour présenter
            une agence moderne, ses services et son savoir-faire
            avec une image claire, élégante et professionnelle.
          </p>
        </div>

        <div className="ia-gallery">
          <div className="ia-image">
            <Image
              src="/projets/nova-assist.png"
              alt="NOVA Assist - page principale"
              width={1600}
              height={1000}
              priority
            />
          </div>

          <div className="ia-image">
            <Image
              src="/projets/nova-assist-1.png"
              alt="NOVA Assist - présentation"
              width={1600}
              height={1000}
            />
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

        <div className="ia-project-footer">
          <span>
            NOVA ASSIST • CONCEPT DIGITAL
          </span>

          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ia-visit"
          >
            <span>VISITER LE SITE</span>
            <span className="css-arrow" />
          </a>
        </div>
      </section>

      <section className="ia-details">
        <div className="ia-detail-label">
          <span>01</span>
          <span>LE PROJET</span>
        </div>

        <div className="ia-detail-content">
          <div>
            <span className="ia-small-title">
              NOVA ASSIST
            </span>

            <h2>
              Une présence digitale
              <br />
              pensée pour convaincre.
            </h2>
          </div>

          <div className="ia-detail-text">
            <p>
              NOVA Assist est un projet digital imaginé pour
              présenter une agence moderne à travers une
              expérience web premium et professionnelle.
            </p>

            <p>
              L'objectif était de créer une interface élégante,
              claire et immersive permettant de mettre en avant
              les services, les réalisations et l'identité de
              l'agence tout en facilitant la prise de contact
              avec les futurs clients.
            </p>
          </div>
        </div>
      </section>

      <section className="ia-navigation">
        <Link
          href="/realisations/ia-future"
          className="ia-nav-card"
        >
          <span>PROJET PRÉCÉDENT</span>

          <strong>
            IA FUTURE
            <span className="css-arrow css-arrow-left-nav" />
          </strong>
        </Link>

        <Link
          href="/realisations"
          className="ia-nav-center"
        >
          TOUTES LES RÉALISATIONS
        </Link>

        <Link
          href="/contact"
          className="ia-nav-card ia-nav-right"
        >
          <span>VOTRE PROJET</span>

          <strong>
            PARLONS-EN
            <span className="css-arrow" />
          </strong>
        </Link>
      </section>
    </main>
  );
}