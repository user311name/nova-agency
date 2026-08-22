import Image from "next/image";
import Link from "next/link";
import "./page.css";

const projects = [
  {
    number: "01",
    title: "STORM",
    category: "SITE PREMIUM • SPORT LIFESTYLE",
    description:
      "Projet concept imaginé pour montrer comment une identité digitale forte peut valoriser une marque sport lifestyle et rendre son univers immédiatement reconnaissable.",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
  },
  {
    number: "02",
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Projet concept pensé autour de l’image, de la prise de rendez-vous et d’une expérience plus premium pour un barber moderne.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
  },
  {
    number: "03",
    title: "IA FUTURE",
    category: "SITE PREMIUM • IA & TECHNOLOGIE",
    description:
      "Projet concept conçu pour présenter une activité technologique de façon claire, moderne et accessible, sans perdre en crédibilité.",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
  },
  {
    number: "04",
    title: "NOVA ASSIST",
    category: "SITE PREMIUM • AGENCE DIGITALE",
    description:
      "Projet concept qui démontre comment structurer une offre de services, mettre en avant un savoir-faire et encourager la prise de contact.",
    image: "/projets/nova-assist.png",
    href: "/realisations/nova-assist",
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
                Une sélection de projets de démonstration conçus
                pour présenter notre approche, notre direction
                artistique et notre attention aux détails.
              </p>

              <strong>
                Donner à chaque activité une présence en ligne
                à la hauteur de son ambition.
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="projects-section"
        aria-labelledby="projects-title"
      >
        <div className="projects-heading">
          <div className="projects-heading-left">
            <span className="section-number">01</span>

            <div>
              <p className="section-eyebrow">
                PROJETS DE DÉMONSTRATION
              </p>

              <h2 id="projects-title">
                Des projets qui montrent
                <br />
                notre approche.
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
              <Link
                href={project.href}
                className="project-image-link"
                aria-label={`Découvrir le projet ${project.title}`}
              >
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={`Projet concept ${project.title}`}
                    fill
                    sizes="(max-width: 800px) 100vw, 82vw"
                    priority={project.number === "01"}
                  />

                  <div className="project-image-shade" />

                  <span className="project-number">
                    {project.number}
                  </span>

                  <div className="project-view">
                    <span>VOIR LE PROJET</span>

                    <span
                      className="project-view-arrow"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>

              <div className="project-info">
                <div className="project-title-block">
                  <span className="project-status">
                    PROJET CONCEPT
                  </span>

                  <p className="project-category">
                    {project.category}
                  </p>

                  <h2>{project.title}</h2>
                </div>

                <div className="project-description-block">
                  <p>{project.description}</p>

                  <Link
                    href={project.href}
                    className="project-discover"
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    <span>DÉCOUVRIR</span>

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

      <section className="realisations-bottom">
        <div className="bottom-line">
          <span>02</span>
          <p>VOTRE PROJET</p>
        </div>

        <div className="bottom-content">
          <span className="bottom-eyebrow">
            ET SI C'ÉTAIT VOUS ?
          </span>

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