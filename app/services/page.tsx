import type { Metadata } from "next";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Création de sites web & services digitaux",
  description:
    "NOVA conçoit des sites web premium, des identités digitales fortes et des expériences digitales pensées pour votre activité.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Création de sites web & services digitaux | NOVA",
    description:
      "Des solutions digitales pensées pour votre activité.",
    url: "/services",
    type: "website",
  },
};

const services = [
  {
    number: "01",
    title: "Création de sites web premium",
    short:
      "Des sites modernes, rapides et conçus pour transformer vos visiteurs en clients.",
    text:
      "Nous créons des sites web sur mesure qui combinent direction artistique, expérience utilisateur, performance et identité de marque.",
    points: [
      "Design entièrement sur mesure",
      "Interface responsive",
      "Animations et interactions",
      "Optimisation mobile",
    ],
  },
  {
    number: "02",
    title: "Refonte & optimisation",
    short:
      "Votre site existe déjà ? Nous lui donnons une nouvelle dimension.",
    text:
      "Nous analysons votre présence actuelle et repensons les éléments qui peuvent freiner votre image, votre expérience utilisateur ou votre conversion.",
    points: [
      "Audit de l'existant",
      "Nouvelle direction artistique",
      "UX & navigation",
      "Optimisation des conversions",
    ],
  },
  {
    number: "03",
    title: "Identité visuelle & design",
    short:
      "Une image cohérente pour rendre votre entreprise immédiatement reconnaissable.",
    text:
      "Nous construisons une direction visuelle cohérente qui traduit votre positionnement et vous permet de vous démarquer.",
    points: [
      "Direction artistique",
      "Palette & typographie",
      "Univers visuel",
      "Design digital",
    ],
  },
  {
    number: "04",
    title: "Optimisation des performances",
    short:
      "Un site beau ne suffit pas. Il doit également être rapide et efficace.",
    text:
      "Nous optimisons les performances techniques de votre site afin d'offrir une expérience fluide, particulièrement sur mobile.",
    points: [
      "Temps de chargement",
      "Optimisation mobile",
      "Structure technique",
      "Expérience utilisateur",
    ],
  },
  {
    number: "05",
    title: "Accompagnement digital",
    short:
      "Un partenaire pour faire évoluer votre présence en ligne dans le temps.",
    text:
      "NOVA vous accompagne au-delà de la mise en ligne pour faire évoluer votre site, votre image et vos outils selon vos besoins.",
    points: [
      "Conseil stratégique",
      "Évolutions du site",
      "Maintenance",
      "Accompagnement personnalisé",
    ],
  },
];

const principles = [
  {
    number: "01",
    title: "Comprendre",
    text:
      "Avant de créer, nous cherchons à comprendre votre activité, votre cible et ce qui vous différencie.",
  },
  {
    number: "02",
    title: "Concevoir",
    text:
      "Nous transformons cette vision en une direction artistique claire, cohérente et adaptée à votre positionnement.",
  },
  {
    number: "03",
    title: "Construire",
    text:
      "Nous développons une expérience digitale performante, responsive et pensée pour durer.",
  },
];

/* =========================================================
   UNIQUEMENT POUR LES 2 FLÈCHES DEMANDÉES
========================================================= */

function DiagonalArrow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main className="services-page">
      {/* Ambient background */}
      <div className="services-bg" aria-hidden="true">
        <div className="services-glow services-glow-one" />
        <div className="services-glow services-glow-two" />
        <div className="services-grid" />
        <div className="services-noise" />
      </div>

      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero-orbit orbit-one" />
        <div className="services-hero-orbit orbit-two" />
        <div className="services-hero-orbit orbit-three" />

        <div className="services-hero-top">
          <div className="services-tag">
            <span className="services-tag-dot" />
            NOS SERVICES
          </div>

          <div className="services-hero-index">
            <span>NOVA</span>
            <span>/</span>
            <span>SERVICES</span>
          </div>
        </div>

        <div className="services-hero-main">
          <div className="services-hero-copy">
            <div className="services-hero-eyebrow">
              <span>01</span>
              <i />
              DIGITAL EXPERIENCE
            </div>

            <h1>
              Des solutions
              <br />
              <span>digitales</span> pensées
              <br />
              pour votre activité.
            </h1>

            <p>
              Nous créons des expériences digitales qui associent design,
              technologie et stratégie pour donner à votre entreprise une
              présence en ligne à la hauteur de son ambition.
            </p>

            <Link href="/devis" className="services-hero-link">
              <span>Parler de votre projet</span>

              {/* SEULEMENT CETTE FLÈCHE EST REMPLACÉE PAR LE SVG */}
              <b className="services-hero-arrow">
                <DiagonalArrow />
              </b>
            </Link>
          </div>

          {/* 3D scene */}
          <div className="services-scene" aria-hidden="true">
            <div className="scene-back-grid" />

            <div className="scene-glow-ball ball-one" />
            <div className="scene-glow-ball ball-two" />

            <div className="scene-platform platform-large">
              <div className="platform-top" />
              <div className="platform-side" />
            </div>

            <div className="scene-platform platform-small">
              <div className="platform-top" />
              <div className="platform-side" />
            </div>

            <div className="scene-panel">
              <div className="panel-line line-one" />
              <div className="panel-line line-two" />
              <div className="panel-line line-three" />

              <div className="panel-content">
                <span>NOVA</span>
                <strong>01</strong>
              </div>
            </div>

            <div className="scene-ring">
              <span />
            </div>

            <div className="scene-cube cube-one" />
            <div className="scene-cube cube-two" />
          </div>
        </div>

        <div className="services-hero-bottom">
          <div className="hero-scroll">
            <span>SCROLL</span>
            <i />
          </div>

          <div className="hero-coordinate">
            <span>43°36&apos; / 1°26&apos;</span>
            <span>ONLINE</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="services-introduction">
        <div className="services-intro-number">01 /</div>

        <div className="services-intro-content">
          <div className="section-kicker">CE QUE NOUS FAISONS</div>

          <h2>
            Plus qu&apos;une présence
            <br />
            en ligne. <span>Une image</span>
            <br />
            qui vous ressemble.
          </h2>

          <div className="services-intro-bottom">
            <p>
              Votre site est souvent le premier contact entre votre entreprise
              et un potentiel client. Chez NOVA, nous pensons qu&apos;il doit
              être bien plus qu&apos;une simple vitrine.
            </p>

            <p>
              Chaque détail est pensé pour créer une expérience cohérente,
              mémorable et adaptée à votre activité.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-list-section">
        <div className="services-section-heading">
          <div>
            <div className="section-kicker">02 / NOS EXPERTISES</div>

            <h2>
              Ce que nous
              <br />
              <span>pouvons créer.</span>
            </h2>
          </div>

          <div className="services-heading-meta">
            <span>05 SERVICES</span>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <article
              className={`service-card ${
                index === 0 ? "service-card-featured" : ""
              }`}
              key={service.number}
            >
              <div className="service-card-top">
                <span className="service-number">{service.number}</span>

                <span className="service-card-status">
                  <i />
                  AVAILABLE
                </span>
              </div>

              <div className="service-card-content">
                <div className="service-card-title-wrap">
                  <h3>{service.title}</h3>

                  {/* SEULEMENT CETTE FLÈCHE EST REMPLACÉE PAR LE SVG */}
                  <span className="service-arrow">
                    <DiagonalArrow />
                  </span>
                </div>

                <p className="service-card-short">{service.short}</p>

                <div className="service-card-details">
                  <p className="service-card-text">{service.text}</p>

                  <div className="service-points">
                    {service.points.map((point) => (
                      <div key={point}>
                        <span>+</span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="service-card-glow" />
            </article>
          ))}
        </div>
      </section>

      {/* METHOD */}
      <section className="services-method">
        <div className="method-orbit" aria-hidden="true">
          <div />
          <div />
          <div />
        </div>

        <div className="services-method-heading">
          <div className="section-kicker">03 / NOTRE APPROCHE</div>

          <h2>
            Une approche simple.
            <br />
            <span>Un travail soigné.</span>
          </h2>

          <p>
            Pas de solution générique. Nous construisons chaque projet autour
            de votre entreprise, avec une méthode claire et un niveau
            d&apos;exigence élevé.
          </p>
        </div>

        <div className="principles-grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.number}>
              <div className="principle-card-top">
                <span>{principle.number}</span>
                <i />
              </div>

              <div className="principle-icon">
                <div />
                <div />
                <div />
              </div>

              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>

        {/* LAISSÉ EXACTEMENT COMME DANS TON FICHIER */}
        <Link href="/methode" className="services-method-link">
          <span>Découvrir notre méthode</span>
          <b>↗</b>
        </Link>
      </section>

      {/* FINAL CTA */}
      <section className="services-final">
        <div className="final-grid" aria-hidden="true" />
        <div className="final-glow" aria-hidden="true" />

        <div className="services-final-inner">
          <div className="services-final-label">
            <span>04 /</span>
            VOTRE PROJET
          </div>

          <h2>
            Votre projet mérite
            <br />
            plus qu&apos;un <span>simple site.</span>
          </h2>

          <p>
            Parlons de votre activité, de vos objectifs et de ce que nous
            pouvons construire ensemble.
          </p>

          {/* LAISSÉ EXACTEMENT COMME DANS TON FICHIER */}
          <Link href="/devis" className="final-cta">
            <span>Demander un devis</span>
            <b>↗</b>
          </Link>
        </div>

        <div className="final-coordinate" aria-hidden="true">
          NOVA / DIGITAL STUDIO
        </div>
      </section>
    </main>
  );
}