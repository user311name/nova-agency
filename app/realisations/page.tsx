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
];

export default function RealisationsPage() {
  return (
    <main className="realisations-page">

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

            <h1 id="realisations-title">
              Des projets
              <br />
              pensés pour
              <br />
              <span>marquer.</span>
            </h1>

            <div className="realisations-hero-side">

              <span className="hero-index">
                NOVA / 02
              </span>

              <p>
                Nous créons des expériences digitales modernes,
                des identités fortes et des sites pensés autour
                d'un objectif simple : donner à chaque activité
                une présence en ligne à la hauteur de son ambition.
              </p>

            </div>

          </div>

        </div>
      </section>


      <section
        className="projects-section"
        aria-labelledby="projects-title"
      >

        <div className="projects-heading">

          <div>
            <span className="section-number">
              01
            </span>

            <p id="projects-title">
              PROJETS SÉLECTIONNÉS
            </p>
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
                  />

                  <div className="project-image-shade" />

                  <div className="project-view">
                    <span>VOIR LE PROJET</span>
                    <strong aria-hidden="true">→</strong>
                  </div>

                  <span className="project-number">
                    {project.number}
                  </span>

                </div>

              </Link>


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
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    DÉCOUVRIR
                    <span aria-hidden="true">→</span>
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      <section className="realisations-bottom">

        <div className="bottom-line">
          <span>02</span>
          <p>VOTRE PROJET</p>
        </div>

        <h2>
          Et si le prochain
          <br />
          projet était <span>le vôtre ?</span>
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
          <span>PARLER DE MON PROJET</span>
          <strong aria-hidden="true">→</strong>
        </Link>

      </section>

    </main>
  );
}