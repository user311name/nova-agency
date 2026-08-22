import type { Metadata } from "next";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Création de sites web & services digitaux",
  description:
    "NOVA crée des sites web modernes, rapides et élégants : création de sites, refonte, identité visuelle, optimisation des performances et accompagnement digital.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Création de sites web & services digitaux | NOVA",
    description:
      "Découvrez les services NOVA : création de sites web premium, refonte, identité visuelle, performances et accompagnement digital.",
    url: "/services",
    type: "website",
  },
};

const services = [
  {
    numero: "01",
    titre: "Création de sites web premium",
    court:
      "Une présence en ligne pensée autour de votre activité, de votre image et de vos objectifs.",
    texte:
      "Nous concevons des sites modernes, rapides et élégants adaptés à votre activité. Chaque projet est pensé pour présenter votre entreprise, rassurer vos visiteurs et créer une présence en ligne professionnelle.",
    points: [
      "Design personnalisé",
      "Structure adaptée à votre activité",
      "Expérience ordinateur, tablette et mobile",
      "Interface claire et professionnelle",
    ],
  },
  {
    numero: "02",
    titre: "Refonte & optimisation",
    court:
      "Transformez un site existant en une expérience plus actuelle, claire et cohérente.",
    texte:
      "Nous améliorons votre site existant pour lui donner une image plus professionnelle, une meilleure expérience utilisateur et une présentation davantage adaptée à vos objectifs.",
    points: [
      "Analyse de l'existant",
      "Modernisation du design",
      "Amélioration de la navigation",
      "Adaptation aux usages mobiles",
    ],
  },
  {
    numero: "03",
    titre: "Identité visuelle & design",
    court:
      "Construisez une image cohérente qui permet à votre entreprise d'être immédiatement reconnaissable.",
    texte:
      "Nous créons un univers visuel cohérent pour accompagner votre présence en ligne : logo, couleurs, typographies et direction artistique.",
    points: [
      "Direction artistique",
      "Palette de couleurs",
      "Choix typographiques",
      "Cohérence visuelle du site",
    ],
  },
  {
    numero: "04",
    titre: "Optimisation des performances",
    court:
      "Un site agréable à utiliser doit aussi être rapide et efficace sur tous les écrans.",
    texte:
      "Nous travaillons sur la rapidité, l'affichage et l'expérience générale du site afin de proposer une navigation plus fluide sur ordinateur, tablette et mobile.",
    points: [
      "Optimisation du chargement",
      "Affichage responsive",
      "Structure plus légère",
      "Expérience mobile améliorée",
    ],
  },
  {
    numero: "05",
    titre: "Accompagnement digital",
    court:
      "Votre site peut évoluer avec votre activité. NOVA vous accompagne dans cette évolution.",
    texte:
      "Nous vous accompagnons dans l'évolution de votre présence en ligne avec des conseils et des améliorations adaptés à votre activité et à vos besoins.",
    points: [
      "Conseils sur votre présence en ligne",
      "Évolutions du site",
      "Améliorations de contenu",
      "Accompagnement selon vos besoins",
    ],
  },
];

const principles = [
  {
    numero: "01",
    titre: "Comprendre",
    texte:
      "Avant de concevoir, nous cherchons à comprendre votre activité, votre image et ce que votre site doit réellement accomplir.",
  },
  {
    numero: "02",
    titre: "Concevoir",
    texte:
      "Nous transformons vos besoins en une structure claire, une direction visuelle cohérente et une expérience simple à parcourir.",
  },
  {
    numero: "03",
    titre: "Construire",
    texte:
      "Le site est développé avec une attention particulière portée au responsive, aux performances et aux détails.",
  },
];

export default function Services() {
  return (
    <main className="services-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="services-hero">
        <div className="services-hero-inner">
          <div className="services-hero-top">
            <p className="services-tag">
              <span />
              NOS SERVICES
            </p>

            <span className="services-hero-index">
              NOVA / SERVICES
            </span>
          </div>

          <h1>
            Des solutions digitales
            <br />
            <span>pensées pour votre activité.</span>
          </h1>

          <div className="services-hero-bottom">
            <p className="services-intro">
              NOVA conçoit des expériences digitales modernes,
              personnalisées et pensées pour donner à votre entreprise
              une présence en ligne professionnelle.
            </p>

            <Link
              href="/devis"
              className="services-hero-link"
            >
              <span>DEMANDER UN DEVIS</span>

              <strong
                className="css-arrow"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="services-introduction">
        <div className="services-section-label">
          <span>01</span>
          <p>CE QUE NOUS FAISONS</p>
        </div>

        <div className="services-introduction-content">
          <h2>
            Plus qu&apos;une présence en ligne.
            <br />
            <span>Une image qui vous ressemble.</span>
          </h2>

          <p>
            Un site web doit être bien plus qu&apos;une simple vitrine.
            Il doit présenter votre activité clairement, inspirer
            confiance et offrir une expérience cohérente à vos visiteurs.
          </p>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="services-list-section">
        <div className="services-section-heading">
          <div className="services-section-label">
            <span>02</span>
            <p>NOS EXPERTISES</p>
          </div>

          <p>
            Chaque projet est différent. Nous adaptons notre approche
            à votre activité, votre identité et vos besoins.
          </p>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <article
              className="service-card"
              key={service.numero}
            >
              <div className="service-card-top">
                <span className="service-number">
                  {service.numero}
                </span>

                <span
                  className="service-arrow css-arrow"
                  aria-hidden="true"
                />
              </div>

              <div className="service-card-content">
                <h2>{service.titre}</h2>

                <p className="service-card-short">
                  {service.court}
                </p>

                <p className="service-card-text">
                  {service.texte}
                </p>

                <ul className="service-points">
                  {service.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden="true">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          METHOD
      ===================================================== */}

      <section className="services-method">
        <div className="services-section-label">
          <span>03</span>
          <p>NOTRE APPROCHE</p>
        </div>

        <div className="services-method-heading">
          <h2>
            Une approche simple.
            <br />
            <span>Un travail soigné.</span>
          </h2>

          <p>
            Nous cherchons à garder chaque étape claire afin que votre
            projet avance avec une direction précise, du premier échange
            jusqu&apos;à la mise en ligne.
          </p>
        </div>

        <div className="principles-grid">
          {principles.map((principle) => (
            <article
              className="principle-card"
              key={principle.numero}
            >
              <span>{principle.numero}</span>

              <h3>{principle.titre}</h3>

              <p>{principle.texte}</p>
            </article>
          ))}
        </div>

        <Link
          href="/methode"
          className="services-method-link"
        >
          <span>DÉCOUVRIR NOTRE MÉTHODE</span>

          <strong
            className="css-arrow"
            aria-hidden="true"
          />
        </Link>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="services-final">
        <div className="services-final-label">
          <span>04</span>
          <p>VOTRE PROJET</p>
        </div>

        <div className="services-final-content">
          <h2>
            Votre projet mérite
            <br />
            <span>plus qu&apos;un simple site.</span>
          </h2>

          <p>
            Présentez-nous votre activité, vos besoins et vos idées.
            Nous pourrons ensuite définir une solution adaptée à votre
            projet.
          </p>

          <Link
            href="/devis"
            className="services-final-button"
          >
            <span>PARLONS DE VOTRE PROJET</span>

            <strong
              className="css-arrow"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}