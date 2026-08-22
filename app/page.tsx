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
            Un site qui valorise
            <br />
            <span>votre entreprise.</span>
          </h1>

          <p className="hero-text">
            Nous concevons des sites web sur mesure qui renforcent votre
            crédibilité, clarifient votre offre et transforment vos visiteurs
            en véritables opportunités de contact.
          </p>

          <div className="hero-buttons">
            <Link href="/devis">Parler de mon projet →</Link>

            <Link href="/realisations">Découvrir nos réalisations</Link>
          </div>

          <div className="hero-reassurance">
            <div className="reassurance-item">
              <span className="reassurance-check">✓</span>

              <div>
                <strong>Une image premium</strong>

                <span>
                  Une présence digitale à la hauteur de votre positionnement
                </span>
              </div>
            </div>

            <div className="reassurance-item">
              <span className="reassurance-check">✓</span>

              <div>
                <strong>Pensé pour convertir</strong>

                <span>
                  Une expérience claire qui guide vos visiteurs vers l’action
                </span>
              </div>
            </div>

            <div className="reassurance-item">
              <span className="reassurance-check">✓</span>

              <div>
                <strong>100 % sur mesure</strong>

                <span>
                  Un site conçu autour de votre activité, pas d’un modèle
                  générique
                </span>
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
            <p className="section-kicker">VOTRE PREMIÈRE IMPRESSION</p>

            <h2>
              Votre site est souvent
              <br />
              le premier contact avec votre entreprise.
            </h2>
          </div>

          <div className="intro-text">
            <p>
              En quelques secondes, un visiteur décide s’il vous fait
              confiance ou s’il passe son chemin.
            </p>

            <p>
              Chez NOVA, nous concevons des sites qui présentent votre
              activité avec clarté, valorisent votre image et donnent
              envie d’aller plus loin.
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
            <span>02 — RÉALISATIONS</span>

            <h2>
              Des projets pensés pour
              <br />
              faire bonne impression.
            </h2>
          </div>

          <Link href="/realisations" className="section-link">
            Voir toutes les réalisations →
          </Link>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="card" key={project.title}>
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
                  <p>{project.category}</p>

                  <h3>{project.title}</h3>
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
            <span>03 — SERVICES</span>

            <h2>
              Tout ce qu&apos;il faut pour
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
            <span className="service-number">01</span>

            <h3>Création de sites web</h3>

            <p>
              Des sites modernes et personnalisés qui présentent
              votre activité de manière claire et professionnelle.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>
          </div>

          <div className="service-row">
            <span className="service-number">02</span>

            <h3>Refonte & optimisation</h3>

            <p>
              Nous modernisons votre site pour améliorer son image,
              son expérience utilisateur et ses performances.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>
          </div>

          <div className="service-row">
            <span className="service-number">03</span>

            <h3>Identité & direction artistique</h3>

            <p>
              Une direction visuelle cohérente pour construire une
              image forte et reconnaissable.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>
          </div>

          <div className="service-row">
            <span className="service-number">04</span>

            <h3>Performance & mobile</h3>

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
          MÉTHODE
      ========================= */}

      <section className="section services-section">
        <div className="section-heading-row services-heading">
          <div>
            <span>04 — NOTRE MÉTHODE</span>

            <h2>
              Un projet clair,
              <br />
              du premier échange à la mise en ligne.
            </h2>
          </div>

          <p className="section-introduction">
            Pas de processus compliqué. Nous avançons étape par étape
            pour transformer votre idée en une présence digitale solide.
          </p>
        </div>

        <div className="services-list">
          <div className="service-row">
            <span className="service-number">01</span>

            <h3>Échange</h3>

            <p>
              Nous comprenons votre activité, vos objectifs, votre
              clientèle et ce que vous souhaitez améliorer.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>
          </div>

          <div className="service-row">
            <span className="service-number">02</span>

            <h3>Direction artistique</h3>

            <p>
              Nous définissons une identité, une structure et une
              expérience adaptées à votre entreprise.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>
          </div>

          <div className="service-row">
            <span className="service-number">03</span>

            <h3>Création</h3>

            <p>
              Nous concevons et développons votre site avec une
              attention particulière portée au design et à l’expérience.
            </p>

            <span className="service-arrow">
              <span className="arrow-icon" />
            </span>
          </div>

          <div className="service-row">
            <span className="service-number">04</span>

            <h3>Mise en ligne</h3>

            <p>
              Nous vérifions, optimisons et préparons votre site pour
              qu’il soit prêt à présenter votre activité au monde.
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
            <span>05 — POURQUOI NOVA</span>

            <h2>
              Pas juste un site.
              <br />
              Une vraie image.
            </h2>

            <p>
              Pas de modèle préfabriqué ni de site générique.
              Chaque projet NOVA part de votre activité, de votre
              clientèle et de l’image que vous voulez construire.
            </p>
          </div>

          <div className="advantages-list">
            <div className="advantage">
              <span>01</span>

              <div>
                <h3>Une vraie direction artistique</h3>

                <p>
                  Nous ne nous contentons pas d’assembler des blocs.
                  Chaque choix visuel doit servir votre image et votre
                  positionnement.
                </p>
              </div>
            </div>

            <div className="advantage">
              <span>02</span>

              <div>
                <h3>Une expérience pensée pour vos clients</h3>

                <p>
                  Le design doit être beau, mais surtout clair, intuitif
                  et pensé pour faciliter la confiance et le passage à l’action.
                </p>
              </div>
            </div>

            <div className="advantage">
              <span>03</span>

              <div>
                <h3>Un accompagnement humain</h3>

                <p>
                  Vous savez où en est votre projet et pourquoi chaque
                  décision est prise, de la première idée jusqu’au lancement.
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
          <span className="cta-label">UN PROJET EN TÊTE ?</span>

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

        <Link href="/devis">Parlons de votre projet →</Link>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="nova-footer">
        <div className="nova-footer-inner">
          <div className="nova-footer-brand">
            <span className="nova-footer-logo">NOVA</span>

            <p>
              Agence digitale premium.
              <br />
              Création de sites web sur mesure.
            </p>
          </div>

          <div className="nova-footer-links">
            <span className="nova-footer-title">INFORMATIONS</span>

            <Link href="/contact">Contact</Link>

            <Link href="/realisations">Réalisations</Link>

            <Link href="/mentions-legales" className="legal-link">
              Mentions légales
            </Link>
          </div>
        </div>

        <div className="nova-footer-bottom">
          <span>
            © {new Date().getFullYear()} NOVA — Tous droits réservés.
          </span>

          <Link href="/mentions-legales">Mentions légales</Link>
        </div>
      </footer>
    </main>
  );
}