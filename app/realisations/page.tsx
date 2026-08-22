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

      {/* =====================================================
          PROJECTS
      ===================================================== */}

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

      {/* =====================================================
          ANCIEN CTA / TRANSITION
      ===================================================== */}

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

      {/* =====================================================
          ÉTAPE 4 — CTA COMMERCIAL
      ===================================================== */}

      <section
        className="commercial-cta"
        aria-labelledby="commercial-cta-title"
      >
        <div className="commercial-cta-inner">
          <div className="commercial-cta-top">
            <div className="commercial-cta-label">
              <span />
              <p>03 — PASSER À L'ACTION</p>
            </div>

            <span className="commercial-cta-index">
              NOVA / VOTRE PROJET
            </span>
          </div>

          <div className="commercial-cta-main">
            <div className="commercial-cta-heading">
              <span className="commercial-cta-eyebrow">
                VOTRE ACTIVITÉ MÉRITE MIEUX
              </span>

              <h2 id="commercial-cta-title">
                Votre activité mérite
                <br />
                <span>mieux qu'un site standard.</span>
              </h2>
            </div>

            <div className="commercial-cta-intro">
              <p>
                Un site pensé pour votre image, votre activité
                et surtout pour transformer vos visiteurs en
                clients.
              </p>

              <div className="commercial-cta-note">
                <span className="commercial-cta-note-dot" />
                <span>
                  Une approche pensée pour votre business.
                </span>
              </div>
            </div>
          </div>

          <div className="commercial-benefits">
            {benefits.map((benefit) => (
              <article
                className="commercial-benefit"
                key={benefit.number}
              >
                <div className="commercial-benefit-top">
                  <span>{benefit.number}</span>

                  <span className="commercial-benefit-line" />
                </div>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </article>
            ))}
          </div>

          <div className="commercial-cta-action">
            <div className="commercial-cta-action-content">
              <span className="commercial-action-eyebrow">
                PRÊT À FAIRE ÉVOLUER VOTRE PRÉSENCE EN LIGNE ?
              </span>

              <h3>
                Parlons de
                <br />
                <span>votre projet.</span>
              </h3>
            </div>

            <div className="commercial-cta-button-wrap">
              <Link
                href="/contact"
                className="commercial-cta-button"
              >
                <span>DÉMARRER MON PROJET</span>

                <span
                  className="commercial-cta-arrow"
                  aria-hidden="true"
                />
              </Link>

              <p className="commercial-cta-reassurance">
                Réponse sous 24h&nbsp; • &nbsp;Échange gratuit
                &nbsp; • &nbsp;Sans engagement
              </p>
            </div>
          </div>

          <div className="commercial-existing-site">
            <div className="commercial-existing-icon">
              <span />
            </div>

            <div>
              <span className="commercial-existing-label">
                VOUS AVEZ DÉJÀ UN SITE ?
              </span>

              <p>
                On peut aussi l'améliorer, le moderniser ou
                repenser complètement son expérience.
              </p>
            </div>

            <Link
              href="/contact"
              className="commercial-existing-link"
            >
              <span>EN PARLER</span>

              <span
                className="commercial-existing-arrow"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}