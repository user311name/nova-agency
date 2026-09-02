"use client";

import Link from "next/link";
import "./page.css";

const projects = [
  {
    title: "Noir Barber",
    category: "BARBER",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
  },
  {
    title: "Storm",
    category: "SPORT LIFESTYLE",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
  },
  {
    title: "IA Future",
    category: "IA • INNOVATION",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
  },
];

function Arrow() {
  return (
    <svg
      className="arrow"
      viewBox="0 0 24 24"
      fill="none"
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

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">AGENCE DIGITALE PREMIUM</span>

          <h1>
            Un site qui valorise
            <span>votre entreprise.</span>
          </h1>

          <p>
            Nous concevons des sites web sur mesure qui renforcent votre
            crédibilité, clarifient votre offre et transforment vos visiteurs
            en opportunités.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="primary-link">
              Parler de mon projet
              <Arrow />
            </Link>

            <Link href="/realisations" className="text-link">
              Découvrir nos réalisations
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="orb-core" />
          <div className="visual-line line-one" />
          <div className="visual-line line-two" />
        </div>
      </section>

      <section className="values">
        <div>
          <strong>Une image premium</strong>
          <span>Une présence digitale à la hauteur de votre positionnement.</span>
        </div>

        <div>
          <strong>Pensé pour convertir</strong>
          <span>Une expérience claire qui guide vos visiteurs vers l’action.</span>
        </div>

        <div>
          <strong>100 % sur mesure</strong>
          <span>Un site conçu autour de votre activité, pas d’un modèle générique.</span>
        </div>
      </section>

      <section className="approach section">
        <div className="section-number">01</div>

        <div className="approach-content">
          <span className="eyebrow">NOTRE APPROCHE</span>

          <h2>
            Votre site est souvent le premier contact avec votre entreprise.
          </h2>

          <p>
            En quelques secondes, un visiteur décide s’il vous fait confiance
            ou s’il passe son chemin. Chez NOVA, nous concevons des sites qui
            présentent votre activité avec clarté, valorisent votre image et
            donnent envie d’aller plus loin.
          </p>

          <Link href="/a-propos" className="text-link">
            Découvrir NOVA
            <Arrow />
          </Link>
        </div>
      </section>

      <section className="projects section">
        <div className="section-head">
          <div>
            <span className="eyebrow">02 — RÉALISATIONS</span>
            <h2>Des projets pensés pour faire bonne impression.</h2>
          </div>

          <Link href="/realisations" className="text-link">
            Voir toutes les réalisations
            <Arrow />
          </Link>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <Link
              href={project.href}
              className="project"
              key={project.title}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-info">
                <span>{project.category}</span>

                <div>
                  <h3>{project.title}</h3>
                  <Arrow />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="services section">
        <span className="eyebrow">03 — SERVICES</span>

        <h2>Tout ce qu’il faut pour construire votre présence digitale.</h2>

        <div className="service-list">
          <div>
            <span>01</span>
            <h3>Création de sites web</h3>
            <p>
              Des sites modernes et personnalisés qui présentent votre activité
              de manière claire et professionnelle.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Refonte & optimisation</h3>
            <p>
              Nous modernisons votre site pour améliorer son image, son
              expérience et ses performances.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Identité & direction artistique</h3>
            <p>
              Une direction visuelle cohérente pour construire une image forte
              et reconnaissable.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>Performance & mobile</h3>
            <p>
              Une expérience rapide, fluide et adaptée à tous les écrans.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <span className="eyebrow">UN PROJET EN TÊTE ?</span>

        <h2>
          Donnons à votre activité
          <span>l’image qu’elle mérite.</span>
        </h2>

        <Link href="/contact" className="primary-link">
          Parlons de votre projet
          <Arrow />
        </Link>
      </section>

      <footer>
        <div>
          <strong>NOVA</strong>
          <p>
            Agence digitale premium.
            <br />
            Création de sites web sur mesure.
          </p>
        </div>

        <div>
          <span>INFORMATIONS</span>
          <Link href="/contact">Contact</Link>
          <Link href="/realisations">Réalisations</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </div>

        <div>
          <span>SUIVEZ-NOUS</span>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}