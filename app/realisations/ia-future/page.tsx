import Link from "next/link";
import "./page.css";

const siteUrl = "https://site-ia-inky.vercel.app/";

export default function IAFuturePage() {
  return (
    <main className="ia-page">
      <header className="ia-topbar">
        <Link href="/realisations" className="ia-back">
          <span className="css-arrow css-arrow-left" />
          RÉALISATIONS
        </Link>

        <span className="ia-project-name">IA FUTURE</span>

        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ia-top-link"
        >
          VOIR LA DÉMO
          <span className="css-arrow" />
        </a>
      </header>

      <section className="ia-hero">
        <div className="ia-hero-content">
          <span className="ia-kicker">
            PROJET CONCEPT • IA & TECHNOLOGIE
          </span>

          <h1>IA FUTURE</h1>

          <p>
            Un concept digital pensé pour rendre une activité liée à
            l’intelligence artificielle claire, premium et accessible.
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
          <span>IA FUTURE • PROJET CONCEPT DIGITAL</span>

          <div className="ia-project-actions">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ia-visit"
            >
              <span>VOIR LA DÉMO</span>
              <span className="css-arrow" />
            </a>

            <Link href="/devis" className="ia-devis-link">
              PARLER DE MON PROJET
              <span className="css-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="ia-details">
        <div className="ia-detail-label">
          <span>01</span>
          <span>CE QUE CE PROJET DÉMONTRE</span>
        </div>

        <div className="ia-detail-content">
          <div>
            <span className="ia-small-title">IA FUTURE</span>

            <h2>
              Une présence digitale
              <br />
              tournée vers le futur.
            </h2>
          </div>

          <div className="ia-detail-text">
            <p>
              <strong>LE CONCEPT</strong>
              Un projet de démonstration imaginé autour de l’intelligence
              artificielle et des nouvelles technologies.
            </p>

            <p>
              <strong>L’OBJECTIF</strong>
              Présenter un univers technologique de façon claire, moderne
              et facile à comprendre, même pour un visiteur non spécialiste.
            </p>

            <p>
              <strong>L’APPROCHE NOVA</strong>
              Une interface immersive, une information structurée et un
              parcours pensé pour inspirer confiance puis faciliter le
              passage à l’action.
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
            NOIR BARBER
            <span className="css-arrow css-arrow-left-nav" />
          </strong>
        </Link>

        <Link
          href="/realisations"
          className="ia-nav-center"
        >
          TOUTES LES RÉALISATIONS
        </Link>

        <Link href="/devis" className="ia-nav-card ia-nav-right">
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