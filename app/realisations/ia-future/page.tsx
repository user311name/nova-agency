import Link from "next/link";
import "./page.css";

const siteUrl = "#";
// Remplace "#" par le vrai lien du site IA Future.

export default function IAFuturePage() {
  return (
    <main className="ia-page">

      <header className="ia-topbar">

        <Link
          href="/realisations"
          className="ia-back"
        >
          ← RÉALISATIONS
        </Link>

        <span className="ia-project-name">
          IA FUTURE
        </span>

        <Link
          href="/realisations"
          className="ia-top-link"
        >
          VOIR
        </Link>

      </header>


      <section className="ia-hero">

        <div className="ia-hero-content">

          <span className="ia-kicker">
            PROJET • IA &amp; TECHNOLOGIE
          </span>

          <h1>
            IA FUTURE
          </h1>

          <p>
            Une expérience digitale moderne pensée pour présenter
            l'intelligence artificielle de manière claire, premium
            et accessible.
          </p>

        </div>


        <div className="ia-gallery">

          <div className="ia-image">
            <img
              src="/projets/site-ia.png"
              alt="IA Future - page principale"
            />
          </div>

          <div className="ia-image">
            <img
              src="/projets/site-ia1.png"
              alt="IA Future - interface"
            />
          </div>

          <div className="ia-image">
            <img
              src="/projets/site-ia2.png"
              alt="IA Future - présentation"
            />
          </div>

        </div>


        <div className="ia-project-footer">

          <span>
            IA FUTURE • CONCEPT DIGITAL
          </span>

          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ia-visit"
          >
            VISITER LE SITE
            <span>↗</span>
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
              IA FUTURE
            </span>

            <h2>
              Une présence digitale
              <br />
              tournée vers le futur.
            </h2>

          </div>


          <div className="ia-detail-text">

            <p>
              IA Future est un projet digital imaginé autour
              de l'intelligence artificielle et des nouvelles
              technologies.
            </p>

            <p>
              L'objectif était de créer une interface moderne,
              claire et immersive capable de présenter un univers
              technologique tout en restant simple à comprendre
              pour les visiteurs.
            </p>

          </div>

        </div>

      </section>


      <section className="ia-navigation">

        <Link
          href="/realisations/noir-barber"
          className="ia-nav-card"
        >
          <span>PROJET PRÉCÉDENT</span>
          <strong>
            NOIR BARBER ↗
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
            PARLONS-EN ↗
          </strong>
        </Link>

      </section>

    </main>
  );
}