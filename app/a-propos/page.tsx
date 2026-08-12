import Link from "next/link";
import "./page.css";

const values = [
  {
    number: "01",
    title: "Clarté",
    text: "Nous privilégions les idées simples, les interfaces lisibles et les choix qui ont réellement du sens.",
  },
  {
    number: "02",
    title: "Exigence",
    text: "Chaque détail compte. Nous cherchons un résultat propre, cohérent et professionnel jusque dans les finitions.",
  },
  {
    number: "03",
    title: "Proximité",
    text: "Un projet se construit à deux. Nous gardons une communication simple, directe et compréhensible.",
  },
  {
    number: "04",
    title: "Pertinence",
    text: "Nous ne cherchons pas à en faire trop. Chaque élément doit avoir une raison d'être et servir votre image.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      {/* HERO */}

      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-tag">
            <span>●</span> À PROPOS DE NOVA
          </p>

          <h1>
            Derrière chaque projet,
            <br />
            <span>une vraie intention.</span>
          </h1>

          <p className="about-intro">
            NOVA est née d&apos;une idée simple : créer des expériences
            digitales qui ont du sens, sans complexité inutile.
          </p>
        </div>

        <div className="about-hero-mark">N</div>
      </section>

      {/* VISION */}

      <section className="about-vision">
        <div className="about-section-label">
          <span>01</span>
          NOTRE VISION
        </div>

        <div className="about-vision-grid">
          <div>
            <p className="about-kicker">POURQUOI NOVA ?</p>

            <h2>
              Faire du digital
              <br />
              <span>un vrai atout.</span>
            </h2>
          </div>

          <div className="about-copy">
            <p>
              Aujourd&apos;hui, avoir une présence en ligne ne suffit plus.
              Elle doit être claire, crédible et cohérente avec ce que votre
              entreprise représente réellement.
            </p>

            <p>
              C&apos;est cette vision qui guide NOVA. Nous cherchons à créer
              des univers digitaux qui donnent une première impression forte,
              tout en restant simples à comprendre et agréables à utiliser.
            </p>

            <p>
              Pas de superflu. Pas de design compliqué juste pour impressionner.
              L&apos;objectif est de construire quelque chose qui vous
              ressemble et qui reste pertinent dans le temps.
            </p>
          </div>
        </div>
      </section>

      {/* APPROCHE */}

      <section className="about-approach">
        <div className="about-approach-inner">
          <div className="about-section-label">
            <span>02</span>
            NOTRE APPROCHE
          </div>

          <div className="about-approach-grid">
            <div className="about-approach-heading">
              <h2>
                Penser avant
                <br />
                <span>de construire.</span>
              </h2>

              <p>
                Un bon résultat commence toujours par une bonne compréhension
                du projet.
              </p>
            </div>

            <div className="about-approach-list">
              <div className="approach-item">
                <span>01</span>

                <div>
                  <h3>Comprendre</h3>
                  <p>
                    Votre activité, vos objectifs, votre public et surtout ce
                    qui vous rend différent.
                  </p>
                </div>
              </div>

              <div className="approach-item">
                <span>02</span>

                <div>
                  <h3>Structurer</h3>
                  <p>
                    Organiser les informations et les priorités pour créer une
                    expérience évidente et naturelle.
                  </p>
                </div>
              </div>

              <div className="approach-item">
                <span>03</span>

                <div>
                  <h3>Soigner</h3>
                  <p>
                    Travailler le design, les détails et la cohérence générale
                    pour obtenir une image vraiment professionnelle.
                  </p>
                </div>
              </div>

              <div className="approach-item">
                <span>04</span>

                <div>
                  <h3>Faire évoluer</h3>
                  <p>
                    Parce qu&apos;un projet digital n&apos;a pas vocation à
                    rester figé, nous pensons aussi à la suite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}

      <section className="about-values">
        <div className="about-section-label">
          <span>03</span>
          NOS PRINCIPES
        </div>

        <div className="about-values-heading">
          <h2>
            Ce qui guide
            <br />
            <span>notre travail.</span>
          </h2>

          <p>
            Une identité forte ne vient pas seulement de ce que l&apos;on
            montre, mais aussi de la manière dont on travaille.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <span>{value.number}</span>

              <div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONCLUSION */}

      <section className="about-final">
        <div>
          <span>ET MAINTENANT ?</span>

          <h2>
            Parlons de ce que
            <br />
            <strong>vous voulez construire.</strong>
          </h2>

          <p>
            Vous avez une idée, un projet ou simplement envie d&apos;améliorer
            votre présence en ligne ? Commençons par en discuter.
          </p>
        </div>

        <Link href="/contact">Échanger avec NOVA →</Link>
      </section>
    </main>
  );
}