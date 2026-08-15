import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "Réalisations — Sites web & projets digitaux",
  description:
    "Découvrez les réalisations de NOVA : sites web sur mesure, expériences digitales et projets pensés pour renforcer l'image des entreprises et des marques.",
  alternates: {
    canonical: "/realisations",
  },
  openGraph: {
    title: "Réalisations — Sites web & projets digitaux | NOVA",
    description:
      "Découvrez les projets web réalisés par NOVA et notre approche du design, de l'expérience utilisateur et de la création de sites sur mesure.",
    url: "/realisations",
    type: "website",
  },
};

const projects = [
  {
    number: "01",
    title: "STORM",
    category: "SITE PREMIUM • SPORT LIFESTYLE",
    description:
      "Création d'un site web premium pour une marque sport lifestyle masculine, avec une identité visuelle forte et une expérience digitale pensée pour mettre l'univers de la marque en valeur.",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
  },
  {
    number: "02",
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Création d'un site web moderne et élégant pour un barber souhaitant développer son image, présenter ses services et offrir une expérience client professionnelle.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
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
              <span className="hero-index">NOVA / 02</span>

              <p>
                Nous créons des expériences digitales modernes, des identités
                fortes et des sites web sur mesure pensés autour d'un objectif
                simple : donner à chaque activité une présence en ligne à la
                hauteur de son ambition.
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
            <span className="section-number">01</span>
            <p id="projects-title">PROJETS SÉLECTIONNÉS</p>
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
                    alt={`${project.title} — réalisation web par NOVA`}
                    fill
                    sizes="(max-width: 800px) 100vw, 82vw"
                  />

                  <div className="project-image-shade" />

                  <div className="project-view">
                    <span>VOIR LE PROJET</span>
                    <strong>↗</strong>
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

                  <h2>{project.title}</h2>
                </div>

                <div className="project-description-block">
                  <p>{project.description}</p>

                  <Link
                    href={project.href}
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    DÉCOUVRIR
                    <span>↗</span>
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
          <strong>↗</strong>
        </Link>
      </section>
    </main>
  );
}