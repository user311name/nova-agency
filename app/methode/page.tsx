"use client";

import Link from "next/link";
import "./page.css";

const steps = [
  {
    number: "01",
    label: "PREMIÈRE ÉTAPE",
    title: "Échanger",
    description:
      "Tout commence par un échange. Nous prenons le temps de comprendre votre activité, votre vision, vos objectifs et ce qui vous différencie.",
    details: [
      "Comprendre votre activité",
      "Identifier vos objectifs",
      "Définir vos priorités",
      "Poser les bonnes bases",
    ],
  },
  {
    number: "02",
    label: "DEUXIÈME ÉTAPE",
    title: "Imaginer",
    description:
      "Nous transformons vos idées en une direction claire. L'univers visuel, l'expérience et la structure sont pensés pour donner du sens à votre projet.",
    details: [
      "Direction artistique",
      "Architecture du site",
      "Expérience utilisateur",
      "Identité digitale",
    ],
  },
  {
    number: "03",
    label: "TROISIÈME ÉTAPE",
    title: "Construire",
    description:
      "Une fois la direction définie, nous construisons une expérience digitale moderne, fluide et pensée dans les moindres détails.",
    details: [
      "Développement sur mesure",
      "Responsive mobile & desktop",
      "Animations et interactions",
      "Optimisation des performances",
    ],
  },
];

const reassurance = [
  {
    number: "01",
    title: "Une approche sur mesure",
    text: "Chaque projet est différent. Nous construisons une expérience adaptée à votre activité et non un simple modèle préfabriqué.",
  },
  {
    number: "02",
    title: "Une vision claire",
    text: "Chaque choix graphique et technique répond à un objectif précis pour garder une expérience cohérente et efficace.",
  },
  {
    number: "03",
    title: "Un design qui dure",
    text: "Nous privilégions des interfaces élégantes et intemporelles plutôt que des effets qui vieillissent rapidement.",
  },
  {
    number: "04",
    title: "Une expérience fluide",
    text: "Navigation, animations, responsive et performances sont pensés ensemble pour créer une expérience agréable.",
  },
];

const clientPoints = [
  {
    number: "01",
    title: "Vous savez où nous en sommes",
    text: "Les grandes étapes du projet sont claires. Vous savez ce qui est en cours et ce qui arrive ensuite.",
  },
  {
    number: "02",
    title: "Vous restez impliqué",
    text: "Votre vision reste au centre du projet. Nous échangeons avec vous pour faire évoluer la direction au bon moment.",
  },
  {
    number: "03",
    title: "Vous comprenez nos choix",
    text: "Nous ne faisons pas simplement du design pour faire joli. Chaque décision possède une raison.",
  },
  {
    number: "04",
    title: "Vous repartez avec une vraie identité",
    text: "L'objectif est de créer un univers digital qui vous ressemble et qui peut réellement accompagner votre activité.",
  },
];

const deliverables = [
  {
    number: "01",
    title: "Direction artistique",
    text: "Une direction visuelle cohérente, pensée autour de votre image, de votre positionnement et de votre audience.",
  },
  {
    number: "02",
    title: "Design de l'expérience",
    text: "Une interface claire et intuitive pour guider naturellement vos visiteurs vers les bonnes informations.",
  },
  {
    number: "03",
    title: "Développement",
    text: "Un site moderne, responsive et performant, construit pour fonctionner parfaitement sur ordinateur comme sur mobile.",
  },
  {
    number: "04",
    title: "Animations & interactions",
    text: "Des mouvements subtils et des interactions travaillées pour donner de la profondeur sans ralentir la navigation.",
  },
  {
    number: "05",
    title: "Optimisation",
    text: "Nous travaillons la structure, les performances et les détails techniques afin de proposer une expérience propre et rapide.",
  },
];

export default function MethodPage() {
  return (
    <main className="method-page">

      {/* HERO */}
      <section className="method-hero">
        <div className="method-hero-inner">

          <div className="method-kicker">
            <span />
            <p>NOTRE MÉTHODE</p>
          </div>

          <div className="method-hero-grid">

            <div>
              <h1>
                Une méthode pensée
                <br />
                pour créer <span>mieux.</span>
              </h1>

              <p className="method-hero-description">
                Pas de recette toute faite. Chaque projet commence par une
                réflexion, une direction claire et une volonté de construire
                quelque chose qui a du sens.
              </p>
            </div>

            <div className="method-hero-side">
              <span className="method-index">/ 01 — 06</span>

              <p>
                De la première idée jusqu&apos;à la mise en ligne, nous
                avançons étape par étape avec une vision simple : créer une
                expérience digitale forte, élégante et utile.
              </p>
            </div>

          </div>

          <div className="method-hero-bottom">
            <span>SCROLL TO EXPLORE</span>

            <p>
              Une approche humaine.
              <br />
              Une exécution précise.
            </p>
          </div>

        </div>
      </section>


      {/* INTRO */}
      <section className="method-intro">

        <div className="method-section-label">
          <span>01</span>
          <p>AVANT DE CONSTRUIRE</p>
        </div>

        <div className="method-intro-grid">

          <div>
            <p className="method-kicker-blue">
              L&apos;IDÉE
            </p>

            <h2>
              Tout projet commence
              <br />
              par une <span>bonne question.</span>
            </h2>
          </div>

          <div className="method-intro-copy">

            <p>
              Avant de parler de couleurs, d&apos;animations ou de
              développement, nous cherchons à comprendre ce que vous voulez
              réellement transmettre.
            </p>

            <p>
              Votre activité, vos ambitions, votre clientèle et votre
              différence deviennent la base de toute la réflexion.
            </p>

          </div>

        </div>

      </section>


      {/* PROCESS */}
      <section className="method-process">

        <div className="method-process-inner">

          <div className="method-section-label">
            <span>02</span>
            <p>LE PROCESSUS</p>
          </div>

          <div className="method-process-heading">

            <div>
              <h2>
                Trois étapes.
                <br />
                Une seule <span>direction.</span>
              </h2>
            </div>

            <p>
              Nous avons volontairement simplifié notre méthode. L&apos;objectif
              est de garder un processus clair, fluide et compréhensible du
              début à la fin.
            </p>

          </div>


          <div className="method-steps">

            {steps.map((step) => (
              <article
                className="method-step"
                key={step.number}
              >

                <div className="method-step-number">
                  {step.number}
                </div>

                <div className="method-step-main">

                  <div className="method-step-title">

                    <div>
                      <span>{step.label}</span>

                      <h3>
                        {step.title}
                      </h3>
                    </div>

                    {/* FLÈCHE UNIQUEMENT EN CSS */}
                    <div
                      className="method-step-arrow"
                      aria-hidden="true"
                    />

                  </div>


                  <p className="method-step-description">
                    {step.description}
                  </p>


                  <div className="method-step-details">

                    {step.details.map((detail) => (
                      <div
                        className="method-detail"
                        key={detail}
                      >

                        <span>+</span>

                        <p>
                          {detail}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* REASSURANCE */}
      <section className="method-reassurance">

        <div className="method-reassurance-inner">

          <div className="method-section-label">
            <span>03</span>
            <p>NOTRE VISION</p>
          </div>

          <div className="method-reassurance-heading">

            <div>
              <h2>
                Faire moins,
                <br />
                mais le faire <span>mieux.</span>
              </h2>
            </div>

            <p>
              Nous préférons une expérience maîtrisée, cohérente et utile à
              une accumulation d&apos;effets qui finit par perdre le visiteur.
            </p>

          </div>


          <div className="reassurance-grid">

            {reassurance.map((item) => (
              <article
                className="reassurance-card"
                key={item.number}
              >

                <span>
                  {item.number}
                </span>

                <div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* CLIENT EXPERIENCE */}
      <section className="method-client">

        <div className="method-client-inner">

          <div className="method-section-label">
            <span>04</span>
            <p>VOTRE EXPÉRIENCE</p>
          </div>

          <div className="method-client-grid">

            <div>

              <h2>
                Vous n&apos;êtes
                <br />
                jamais <span>à côté.</span>
              </h2>

            </div>


            <div className="client-points">

              {clientPoints.map((point) => (
                <article
                  className="client-point"
                  key={point.number}
                >

                  <span>
                    {point.number}
                  </span>

                  <div>

                    <h3>
                      {point.title}
                    </h3>

                    <p>
                      {point.text}
                    </p>

                  </div>

                </article>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* DELIVERABLES */}
      <section className="method-deliverables">

        <div className="method-deliverables-inner">

          <div className="method-section-label">
            <span>05</span>
            <p>CE QUE NOUS CONSTRUISONS</p>
          </div>

          <div className="deliverables-heading">

            <div>

              <h2>
                Chaque détail
                <br />
                compte dans le <span>résultat.</span>
              </h2>

            </div>

            <p>
              Une identité digitale ne se limite pas à une belle page
              d&apos;accueil. Chaque élément doit participer à l&apos;ensemble.
            </p>

          </div>


          <div className="deliverables-list">

            {deliverables.map((item) => (
              <article
                className="deliverable"
                key={item.number}
              >

                <span>
                  {item.number}
                </span>

                <div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* TRANSPARENCY */}
      <section className="method-transparency">

        <div className="method-transparency-inner">

          <div className="transparency-icon">
            +
          </div>

          <div>

            <span>
              UNE APPROCHE SIMPLE
            </span>

            <h2>
              Pas de jargon.
              <br />
              Pas de mauvaise surprise.
            </h2>

            <p>
              Nous privilégions une communication simple et transparente.
              Vous devez comprendre ce que nous faisons, pourquoi nous le
              faisons et ce que cela apporte réellement à votre projet.
            </p>

          </div>


          <div className="transparency-side">

            <div>
              <span>01</span>
              <p>CLAIR</p>
            </div>

            <div>
              <span>02</span>
              <p>DIRECT</p>
            </div>

            <div>
              <span>03</span>
              <p>HUMAIN</p>
            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="method-final">

        <div className="method-final-content">

          <span>
            ET SI ON COMMENÇAIT ?
          </span>

          <h2>
            Votre projet mérite
            <br />
            une vraie <strong>direction.</strong>
          </h2>

          <p>
            Parlons de votre activité, de vos idées et de ce que nous pouvons
            construire ensemble.
          </p>

          <Link href="/contact">

            <span>
              PARLER DE MON PROJET
            </span>

            <strong>
              →
            </strong>

          </Link>

        </div>

      </section>

    </main>
  );
}