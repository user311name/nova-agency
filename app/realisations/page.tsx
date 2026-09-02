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
    year: "2026",
  },
  {
    number: "02",
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Projet concept pensé autour de l’image, de la prise de rendez-vous et d’une expérience plus premium pour un barber moderne.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
    year: "2026",
  },
  {
    number: "03",
    title: "IA FUTURE",
    category: "SITE PREMIUM • IA & TECHNOLOGIE",
    description:
      "Projet concept conçu pour présenter une activité technologique de façon claire, moderne et accessible, sans perdre en crédibilité.",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
    year: "2026",
  },
  {
    number: "04",
    title: "NOVA ASSIST",
    category: "SITE PREMIUM • AGENCE DIGITALE",
    description:
      "Projet concept qui démontre comment structurer une offre de services, mettre en avant un savoir-faire et encourager la prise de contact.",
    image: "/projets/nova-assist.png",
    href: "/realisations/nova-assist",
    year: "2026",
  },
];

const benefits = [
  {
    number: "01",
    title: "IMAGE",
    description:
      "Une présence digitale qui inspire confiance dès la première visite et donne une vraie valeur à votre activité.",
  },
  {
    number: "02",
    title: "CONVERSION",
    description:
      "Une expérience pensée pour guider vos visiteurs et les pousser naturellement vers la prise de contact.",
  },
  {
    number: "03",
    title: "SUR-MESURE",
    description:
      "Pas de modèle générique. Chaque détail est construit autour de votre activité, de votre image et de vos objectifs.",
  },
];

const categories = [
  "TOUS",
  "SITE PREMIUM",
  "SPORT",
  "BARBER",
  "IA & TECHNOLOGIE",
];

function Arrow() {
  return (
    <svg
      className="real-arrow"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RealisationsPage() {
  return (
    <main className="realisations-page">
      {/* HERO */}

      <section className="real-hero">
        <div className="real-hero-inner">
          <div className="real-hero-top">
            <span className="real-eyebrow">
              NOTRE TRAVAIL
            </span>

            <span className="real-location">
              NOVA / DIGITAL STUDIO
            </span>
          </div>

          <div className="real-hero-grid">
            <div>
              <span className="real-small-label">
                NOVA / RÉALISATIONS
              </span>

              <h1>
                Des projets
                <br />
                pensés pour
                <br />
                <span>marquer.</span>
              </h1>
            </div>

            <div className="real-hero-text">
              <span>01 — NOS PROJETS</span>

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

      {/* PROJECTS */}

      <section className="real-projects">
        <div className="real-section-head">
          <div>
            <span className="real-section-number">01</span>

            <div>
              <p className="real-eyebrow">
                PROJETS DE DÉMONSTRATION
              </p>

              <h2>Notre sélection.</h2>
            </div>
          </div>

          <span className="real-count">
            04 PROJETS
          </span>
        </div>

        <div className="real-toolbar">
          <div className="real-filters">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={index === 0 ? "active" : ""}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="real-project-list">
          {projects.map((project) => (
            <article
              className="real-project"
              key={project.title}
            >
              <Link
                href={project.href}
                className="real-project-image"
                aria-label={`Découvrir le projet ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={`Projet concept ${project.title}`}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  priority={project.number === "01"}
                />

                <div className="real-image-overlay" />

                <span className="real-project-number">
                  {project.number}
                </span>

                <span className="real-view">
                  VOIR LE PROJET
                  <Arrow />
                </span>
              </Link>

              <div className="real-project-info">
                <div className="real-project-meta">
                  <div>
                    <span>PROJET CONCEPT</span>

                    <p>{project.category}</p>
                  </div>

                  <span>{project.year}</span>
                </div>

                <div className="real-project-title">
                  <h2>{project.title}</h2>

                  <Link href={project.href}>
                    DÉCOUVRIR
                    <Arrow />
                  </Link>
                </div>

                <p className="real-description">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="real-bottom">
        <div className="real-bottom-top">
          <span>02</span>
          <p>VOTRE PROJET</p>
        </div>

        <div className="real-bottom-content">
          <span className="real-eyebrow">
            ET SI C'ÉTAIT VOUS ?
          </span>

          <h2>
            Et si le prochain
            <br />
            projet était <span>le vôtre ?</span>
          </h2>

          <p>
            Chaque projet commence par une idée.
            <br />
            Parlons de la vôtre.
          </p>

          <Link
            href="/contact"
            className="real-button"
          >
            PARLER DE MON PROJET
            <Arrow />
          </Link>
        </div>
      </section>

      {/* COMMERCIAL CTA */}

      <section className="commercial">
        <div className="commercial-inner">
          <div className="commercial-top">
            <span>03 — PASSER À L'ACTION</span>

            <span>NOVA / VOTRE PROJET</span>
          </div>

          <div className="commercial-main">
            <div>
              <span>VOTRE ACTIVITÉ MÉRITE MIEUX</span>

              <h2>
                Votre activité mérite
                <br />
                <span>
                  mieux qu'un site standard.
                </span>
              </h2>
            </div>

            <div className="commercial-intro">
              <p>
                Un site pensé pour votre image, votre activité
                et surtout pour transformer vos visiteurs en
                clients.
              </p>

              <small>
                Une approche pensée pour votre business.
              </small>
            </div>
          </div>

          <div className="commercial-benefits">
            {benefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </article>
            ))}
          </div>

          <div className="commercial-action">
            <div>
              <span>
                PRÊT À FAIRE ÉVOLUER VOTRE PRÉSENCE EN LIGNE ?
              </span>

              <h3>
                Parlons de
                <br />
                <span>votre projet.</span>
              </h3>
            </div>

            <div>
              <Link
                href="/contact"
                className="commercial-button"
              >
                DÉMARRER MON PROJET
                <Arrow />
              </Link>

              <p>
                Réponse sous 24h • Échange gratuit • Sans engagement
              </p>
            </div>
          </div>

          <div className="existing-site">
            <div>
              <span>VOUS AVEZ DÉJÀ UN SITE ?</span>

              <p>
                On peut aussi l'améliorer, le moderniser ou
                repenser complètement son expérience.
              </p>
            </div>

            <Link href="/contact">
              EN PARLER
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}