import Image from "next/image";
import Link from "next/link";
import "./page.css";

const projects = [
  {
    title: "STORM",
    category: "SITE PREMIUM • SPORT LIFESTYLE",
    description:
      "Création d'une expérience digitale premium pour une marque sport lifestyle masculine.",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
  },
  {
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Un site moderne et élégant pensé pour un barber qui souhaite développer son image et son expérience client.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
  },
];

export default function RealisationsPage() {
  return (
    <main className="realisations-page">

      {/* INTRODUCTION */}

      <section className="realisations-hero">

        <div className="hero-label">
          NOTRE TRAVAIL
        </div>

        <h1>
          Des projets pensés
          <br />
          pour <span>marquer.</span>
        </h1>

        <p>
          Nous créons des sites modernes, des identités visuelles
          et des expériences digitales adaptées à chaque activité.
        </p>

      </section>


      {/* PROJETS */}

      <section className="projects-section">

        <div className="projects-grid">

          {projects.map((project) => (
            <article
              className="project-card"
              key={project.title}
            >

              <Link
                href={project.href}
                className="project-image-link"
              >

                <div className="project-image">

                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />

                  <div className="project-overlay">
                    <span>
                      VOIR LE PROJET →
                    </span>
                  </div>

                </div>

              </Link>


              <div className="project-info">

                <div>

                  <p className="project-category">
                    {project.category}
                  </p>

                  <h2>
                    {project.title}
                  </h2>

                </div>

                <p className="project-description">
                  {project.description}
                </p>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* BAS DE PAGE */}

      <section className="realisations-bottom">

        <p>
          CHAQUE PROJET COMMENCE PAR UNE IDÉE.
        </p>

        <h2>
          Vous avez un projet ?
        </h2>

        <Link
          href="/contact"
          className="realisations-button"
        >
          Parlons-en →
        </Link>

      </section>

    </main>
  );
}