import Image from "next/image";
import Link from "next/link";
import "./page.css";

const projects = [
  {
    number: "01",
    title: "STORM",
    category: "SITE PREMIUM • SPORT LIFESTYLE",
    description:
      "Création d'une expérience digitale premium pour une marque sport lifestyle masculine.",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
  },
  {
    number: "02",
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Un site moderne et élégant pensé pour un barber qui souhaite développer son image et son expérience client.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
  },
  {
    number: "03",
    title: "IA FUTURE",
    category: "SITE PREMIUM • IA & TECHNOLOGIE",
    description:
      "Une expérience digitale moderne pensée pour présenter une activité spécialisée dans l'intelligence artificielle et les nouvelles technologies.",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
  },
  {
    number: "04",
    title: "NOVA ASSIST",
    category: "SITE PREMIUM • AGENCE DIGITALE",
    description:
      "Une expérience digitale premium pensée pour présenter une agence moderne, ses services et son savoir-faire.",
    image: "/projets/nova-assist.png",
    href: "/realisations/nova-assist",
  },
];

export default function RealisationsPage() {
  return (
    <main className="realisations-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="realisations-hero"
        aria-labelledby="realisations-title"
      >
        <div className="realisations-hero-inner">

          <div className="realisations-kicker">
            <span />
            <p>NOTRE TRAVAIL</p>
          </div>

          <div className="realisations-hero-grid">

            <div className="realisations-hero-title">
              <span className="hero-small-label">
                NOVA / RÉALISATIONS
              </span>

              <h1 id="realisations-title">
                Des projets
                <br />
                pensés pour
                <br />
                <span>marquer.</span>
              </h1>
            </div>

            <div className="realisations-hero-side">

              <span className="hero-index">
                01 — NOS PROJETS
              </span>

              <p>
                Nous créons des expériences digitales modernes,
                des identités fortes et des sites pensés autour
                d'un objectif simple :
              </p>

              <strong>
                Donner à chaque activité une présence en ligne
                à la hauteur de son ambition.
              </strong>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROJETS
      ===================================================== */}

      <section
        className="projects-section"
        aria-labelledby="projects-title"
      >

        <div className="projects-heading">

          <div className="projects-heading-left">

            <span className="section-number">
              01
            </span>

            <div>

              <p className="section-eyebrow">
                PROJETS SÉLECTIONNÉS
              </p>

              <h2 id="projects-title">
                Des réalisations qui
                <br />
                parlent d'elles-mêmes.
              </h2>

            </div>

          </div>

          <span className="projects-count">
            {projects.length.toString().padStart(2, "0")} PROJETS
          </span>

        </div>


        <div className="projects-list">

          {projects.map((project) => (

            <article
              className="project-card"
              key={project.title}
            >

              {/* IMAGE */}

              <Link
                href={project.href}
                className="project-image-link"
                aria-label={`Découvrir le projet ${project.title}`}
              >

                <div className="project-image">

                  <Image
                    src={project.image}
                    alt={`Projet ${project.title}`}
                    fill
                    sizes="(max-width: 800px) 100vw, 82vw"
                    priority={project.number === "01"}
                  />

                  <div className="project-image-shade" />

                  <span className="project-number">
                    {project.number}
                  </span>

                  <div className="project-view">

                    <span>
                      VOIR LE PROJET
                    </span>

                    <span
                      className="project-view-arrow"
                      aria-hidden="true"
                    />

                  </div>

                </div>

              </Link>


              {/* INFORMATIONS */}

              <div className="project-info">

                <div className="project-title-block">

                  <p className="project-category">
                    {project.category}
                  </p>

                  <h2>
                    {project.title}
                  </h2>

                </div>


                <div className="project-description-block">

                  <p>
                    {project.description}
                  </p>

                  <Link
                    href={project.href}
                    className="project-discover"
                    aria-label={`Voir le projet ${project.title}`}
                  >

                    <span>
                      DÉCOUVRIR
                    </span>

                    <span
                      className="discover-arrow"
                      aria-hidden="true"
                    />

                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          CTA FINAL
      ===================================================== */}

      <section className="realisations-bottom">

        <div className="bottom-line">

          <span>
            02
          </span>

          <p>
            VOTRE PROJET
          </p>

        </div>


        <div className="bottom-content">

          <span className="bottom-eyebrow">
            ET SI C'ÉTAIT VOUS ?
          </span>

          <h2>
            Et si le prochain
            <br />
            projet était{" "}
            <span>le vôtre ?</span>
          </h2>

          <p className="bottom-description">
            Chaque projet commence par une idée.
            <br />
            Parlons de la vôtre.
          </p>

          <Link
            href="/contact"
            className="realisations-button"
          >

            <span>
              PARLER DE MON PROJET
            </span>

            <span
              className="cta-arrow"
              aria-hidden="true"
            />

          </Link>

        </div>

      </section>

    </main>
  );
}