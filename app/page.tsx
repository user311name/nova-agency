import Link from "next/link";
import "./page.css";

const projects = [
  {
    category: "BARBER",
    title: "Noir Barber",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
  },
  {
    category: "SPORT LIFESTYLE",
    title: "Storm",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
  },
  {
    category: "IA • INNOVATION",
    title: "IA Future",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
  },
];

export default function Home() {
  return (
    <main className="nova-home">

      {/* =========================
          HERO
      ========================= */}

      <section className="nova-hero">
        <div className="hero-content">

          <p className="badge">
            <span>●</span>
            AGENCE DIGITALE PREMIUM
          </p>

          <h1>
            Votre activité mérite
            <br />
            une meilleure <span>présence en ligne.</span>
          </h1>

          <p className="hero-text">
            Nous créons des sites modernes, rapides et sur mesure pour
            présenter votre activité avec une image professionnelle
            et donner confiance à vos clients.
          </p>

          <div className="hero-buttons">

            <Link href="/realisations">
              Découvrir nos créations
            </Link>

            <Link href="/devis">
              Demander un devis
            </Link>

          </div>

          <div className="hero-reassurance">

            <div className="reassurance-item">
              <span className="reassurance-check">✓</span>

              <div>
                <strong>Design sur mesure</strong>
                <span>Une identité pensée pour votre activité</span>
              </div>
            </div>

            <div className="reassurance-item">
              <span className="reassurance-check">✓</span>

              <div>
                <strong>Mobile &amp; rapide</strong>
                <span>Une expérience fluide sur tous les écrans</span>
              </div>
            </div>

            <div className="reassurance-item">
              <span className="reassurance-check">✓</span>

              <div>
                <strong>Accompagnement</strong>
                <span>Un projet suivi de la conception au lancement</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          APPROCHE
      ========================= */}

      <section className="intro-section">

        <div className="intro-label">
          <span>01</span>
          <span>NOTRE APPROCHE</span>
        </div>

        <div className="intro-content">

          <div className="intro-heading">

            <p className="section-kicker">
              UNE PRÉSENCE QUI COMPTE
            </p>

            <h2>
              Votre site doit donner
              <br />
              envie de vous choisir.
            </h2>

          </div>

          <div className="intro-text">

            <p>
              Aujourd’hui, votre site est souvent le premier contact
              entre votre activité et un futur client.
            </p>

            <p>
              Chez NOVA, nous créons des expériences digitales qui
              mettent votre activité en valeur, rassurent vos visiteurs
              et vous ressemblent réellement.
            </p>

            <Link href="/a-propos" className="text-link">
              Découvrir NOVA →
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          REALISATIONS
      ========================= */}

      <section className="section projects-section">

        <div className="section-heading-row">

          <div>

            <span>
              02 — RÉALISATIONS
            </span>

            <h2>
              Des projets pensés pour
              <br />
              faire bonne impression.
            </h2>

          </div>

          <Link
            href="/realisations"
            className="section-link"
          >
            Voir toutes les réalisations →
          </Link>

        </div>


        <div className="projects-grid">

          {projects.map((project) => (

            <article
              className="card"
              key={project.title}
            >

              <Link
                href={project.href}
                className="project-image-link"
              >

                <div className="project-image-wrap">

                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />

                  <span className="project-overlay">
                    Voir le projet
                  </span>

                </div>

              </Link>


              <div className="project-card-content">

                <div>

                  <p>
                    {project.category}
                  </p>

                  <h3>
                    {project.title}
                  </h3>

                </div>


                <Link
                  href={project.href}
                  className="project-arrow"
                  aria-label={`Voir le projet ${project.title}`}
                >
                  <span className="arrow-icon" />
                </Link>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =========================
          SERVICES
      ========================= */}

      <section className="section services-section">

        <div className="section-heading-row services-heading">

          <div>

            <span>
              03 — SERVICES
            </span>

            <h2>
              Tout ce qu'il faut pour
              <br />
              construire votre présence digitale.
            </h2>

          </div>

          <p className="section-introduction">
            De la création à l’optimisation, nous construisons des
            solutions adaptées à votre activité et à vos objectifs.
          </p>

        </div>


        <div className="services-list">

          <div className="service-row">

            <span className="service-number">
              01
            </span>

            <h3>
              Création de sites web
            </h3>

            <p>
              Des sites modernes et personnalisés qui présentent
              votre activité de manière claire et professionnelle.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>

          </div>


          <div className="service-row">

            <span className="service-number">
              02
            </span>

            <h3>
              Refonte &amp; optimisation
            </h3>

            <p>
              Nous modernisons votre site pour améliorer son image,
              son expérience utilisateur et ses performances.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>

          </div>


          <div className="service-row">

            <span className="service-number">
              03
            </span>

            <h3>
              Identité &amp; direction artistique
            </h3>

            <p>
              Une direction visuelle cohérente pour construire une
              image forte et reconnaissable.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>

          </div>


          <div className="service-row">

            <span className="service-number">
              04
            </span>

            <h3>
              Performance &amp; mobile
            </h3>

            <p>
              Une expérience rapide, fluide et adaptée à tous les
              écrans, du smartphone à l’ordinateur.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>

          </div>

        </div>

      </section>


      {/* =========================
          POURQUOI NOVA
      ========================= */}

      <section className="why-section">

        <div className="why-inner">

          <div className="why-heading">

            <span>
              04 — POURQUOI NOVA
            </span>

            <h2>
              Pas juste un site.
              <br />
              Une vraie image.
            </h2>

            <p>
              Nous cherchons à créer des sites qui ont du sens pour
              votre activité, pas simplement à remplir une page avec
              des blocs.
            </p>

          </div>


          <div className="advantages-list">

            <div className="advantage">

              <span>01</span>

              <div>

                <h3>
                  Une approche sur mesure
                </h3>

                <p>
                  Chaque projet est construit autour de votre activité,
                  votre clientèle et votre manière de travailler.
                </p>

              </div>

            </div>


            <div className="advantage">

              <span>02</span>

              <div>

                <h3>
                  Un design pensé pour convertir
                </h3>

                <p>
                  L’esthétique compte, mais elle doit surtout servir
                  votre message et faciliter la confiance.
                </p>

              </div>

            </div>


            <div className="advantage">

              <span>03</span>

              <div>

                <h3>
                  Une expérience simple
                </h3>

                <p>
                  Nous privilégions des interfaces claires, rapides
                  et agréables à utiliser sur tous les appareils.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section className="cta">

        <div>

          <span className="cta-label">
            UN PROJET EN TÊTE ?
          </span>

          <h2>
            Donnons à votre activité
            <br />
            l’image qu’elle mérite.
          </h2>

          <p>
            Parlons de votre projet et voyons ensemble comment
            construire une présence en ligne qui vous ressemble.
          </p>

        </div>


        <Link href="/devis">
          Parlons de votre projet →
        </Link>

      </section>


      {/* =========================
          FOOTER LÉGAL
      ========================= */}

      <footer className="nova-footer">

        <div className="nova-footer-inner">

          <div className="nova-footer-brand">

            <span className="nova-footer-logo">
              NOVA
            </span>

            <p>
              Agence digitale premium.
              <br />
              Création de sites web sur mesure.
            </p>

          </div>


          <div className="nova-footer-links">

            <span className="nova-footer-title">
              INFORMATIONS
            </span>

            <Link href="/contact">
              Contact
            </Link>

            <Link href="/realisations">
              Réalisations
            </Link>

            <Link href="/mentions-legales" className="legal-link">
              Mentions légales
            </Link>

          </div>

        </div>


        <div className="nova-footer-bottom">

          <span>
            © {new Date().getFullYear()} NOVA — Tous droits réservés.
          </span>

          <Link href="/mentions-legales">
            Mentions légales
          </Link>

        </div>

      </footer>

    </main>
  );
}