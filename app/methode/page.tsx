"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./page.css";

const steps = [
  {
    number: "01",
    label: "ÉCHANGE & STRATÉGIE",
    title: "Comprendre avant de créer.",
    description:
      "Nous commençons par vous écouter. Nous prenons le temps de comprendre votre activité, vos objectifs et vos attentes pour définir ensemble une direction claire et adaptée à votre projet.",
    details: [
      "Compréhension de votre activité",
      "Clarification de vos objectifs",
      "Analyse de votre positionnement",
      "Définition d’une feuille de route",
    ],
  },
  {
    number: "02",
    label: "DIRECTION & CONCEPTION",
    title: "Donner une direction claire.",
    description:
      "Nous transformons cette réflexion en une direction visuelle claire. Vous découvrez progressivement les choix proposés et leur rôle dans votre image de marque.",
    details: [
      "Direction artistique",
      "Univers visuel",
      "Hiérarchie graphique",
      "Références & propositions",
    ],
  },
  {
    number: "03",
    label: "CONCEPTION SUR MESURE",
    title: "Créer chaque détail.",
    description:
      "Chaque élément est conçu avec précision. Nous travaillons l’expérience, le design et les détails pour créer une présence qui inspire confiance.",
    details: [
      "UX / UI design",
      "Création graphique",
      "Design responsive",
      "Système visuel cohérent",
    ],
  },
  {
    number: "04",
    label: "DÉVELOPPEMENT & INTÉGRATION",
    title: "Donner vie au projet.",
    description:
      "Nous donnons vie au design avec un développement propre, fiable et adapté à tous les écrans. Nous veillons à ce que votre site soit aussi agréable à utiliser qu’à regarder.",
    details: [
      "Développement & intégration sur mesure",
      "Adaptation mobile",
      "Optimisation des performances",
      "Interactions utiles",
    ],
  },
  {
    number: "05",
    label: "VÉRIFICATIONS & AJUSTEMENTS",
    title: "Maîtriser chaque détail.",
    description:
      "Nous vérifions chaque détail avant la mise en ligne afin que l’expérience finale soit aussi solide techniquement que visuellement.",
    details: [
      "Vérification sur les écrans",
      "Tests d'interactions",
      "Optimisation technique",
      "Derniers ajustements",
    ],
  },
  {
    number: "06",
    label: "MISE EN LIGNE & ACCOMPAGNEMENT",
    title: "Préparer la suite.",
    description:
      "Une fois tout validé, nous préparons et déployons votre projet dans les meilleures conditions pour qu'il soit prêt à rencontrer votre audience.",
    details: [
      "Préparation du lancement",
      "Mise en ligne",
      "Vérifications finales",
      "Accompagnement au lancement",
    ],
  },
];

const reassurance = [
  {
    number: "01",
    title: "Une vision claire",
    text: "Nous gardons une vue d’ensemble du projet afin que chaque décision serve le même objectif et reste cohérente avec votre activité.",
  },
  {
    number: "02",
    title: "Une solution sur mesure",
    text: "Nous partons de votre situation, de vos besoins et de votre audience. Votre projet est conçu pour vous, pas adapté à un modèle générique.",
  },
  {
    number: "03",
    title: "Un projet soigné",
    text: "Nous accordons autant d’importance aux détails visibles qu'à ceux que l'on ne remarque qu'une fois qu'ils sont parfaitement maîtrisés.",
  },
  {
    number: "04",
    title: "Une relation transparente",
    text: "Vous savez ce qui est en cours, ce qui est attendu de vous et ce qui vient ensuite. Nous privilégions des échanges simples et directs.",
  },
];

const clientPoints = [
  {
    number: "01",
    title: "Vous savez où nous allons",
    text: "Chaque étape possède un objectif précis. Vous comprenez ce qui est travaillé, pourquoi nous le faisons et ce qui vient ensuite.",
  },
  {
    number: "02",
    title: "Vous gardez la main",
    text: "Votre avis compte à chaque étape importante. Nous vous conseillons avec notre expertise tout en respectant vos priorités et votre réalité métier.",
  },
  {
    number: "03",
    title: "Vous suivez l’avancement",
    text: "Vous découvrez le projet au fur et à mesure et les décisions importantes sont partagées au bon moment.",
  },
  {
    number: "04",
    title: "Vous repartez avec une base solide",
    text: "L'objectif n'est pas simplement de livrer un site, mais de construire une présence digitale capable d'évoluer avec votre activité.",
  },
];

const deliverables = [
  {
    number: "01",
    title: "Une présence digitale cohérente",
    text: "Une direction visuelle cohérente qui permet à votre marque d’être claire, professionnelle et reconnaissable.",
  },
  {
    number: "02",
    title: "Une expérience simple pour vos utilisateurs",
    text: "Une navigation intuitive et des interfaces pensées pour guider vos visiteurs naturellement vers l’information et l’action.",
  },
  {
    number: "03",
    title: "Un site fiable et sur mesure",
    text: "Un site propre, responsive et optimisé pour offrir une expérience fluide sur ordinateur, tablette et mobile.",
  },
  {
    number: "04",
    title: "Une base prête pour la suite",
    text: "Une structure pensée pour évoluer avec votre activité, sans devoir repartir de zéro à chaque nouvelle étape.",
  },
];

function ArrowIcon() {
  return (
    <svg
      className="method-arrow-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg
      className="method-external-arrow-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export default function MethodPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".method-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="method-page">
      {/* HERO */}
      <section className="method-hero">
        <div className="method-hero-grid" />

        <div className="method-hero-orbit orbit-one" />
        <div className="method-hero-orbit orbit-two" />
        <div className="method-hero-orbit orbit-three" />

        <div className="method-hero-core">
          <span>N</span>
        </div>

        <div className="method-hero-content">
          <span className="method-kicker">NOVA — NOTRE MÉTHODE</span>

          <h1>
            Créer avec méthode.
            <br />
            <span>Créer de l’impact.</span>
          </h1>

          <p>
            Un processus pensé pour transformer une idée en une présence
            digitale forte, cohérente et durable.
          </p>
        </div>

        <div className="method-hero-side">
          <span>01 / 08</span>

          <p>
            Chez NOVA, nous ne commençons jamais par le design. Nous
            commençons par comprendre ce que votre marque doit devenir.
          </p>
        </div>

        <div className="method-hero-bottom">
          <div className="method-hero-flow">
            <span>ÉCOUTE</span>

            <i>
              <ArrowIcon />
            </i>

            <span>STRATÉGIE</span>

            <i>
              <ArrowIcon />
            </i>

            <span>DESIGN</span>

            <i>
              <ArrowIcon />
            </i>

            <span>TECHNOLOGIE</span>
          </div>

          <small>
            Une approche structurée. Un accompagnement transparent.
          </small>
        </div>
      </section>

      {/* INTRO */}
      <section className="method-section method-intro method-reveal">
        <div className="method-section-number">02</div>

        <div className="method-section-label">
          <span>02 / NOTRE APPROCHE</span>
        </div>

        <div className="method-intro-grid">
          <div>
            <span className="method-small-title">
              PENSER AVANT DE CRÉER
            </span>

            <h2>
              Un processus
              <br />
              <span>qui vous guide.</span>
            </h2>
          </div>

          <div className="method-intro-text">
            <p>
              Un beau site ne suffit pas. Il doit avoir une raison d'être,
              raconter quelque chose et surtout servir vos objectifs.
            </p>

            <p>
              Notre méthode repose donc sur un équilibre entre réflexion,
              création et technologie. Chaque décision est prise pour donner
              plus de force à votre marque et plus de clarté à votre message.
            </p>

            <p>
              Nous avançons étape par étape, avec une vision globale du projet
              et une attention particulière portée aux détails.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="method-section method-process method-reveal">
        <div className="method-section-label">
          <span>03 / LE PROCESSUS</span>
        </div>

        <div className="method-process-heading">
          <h2>
            Un processus
            <br />
            <span>clair et maîtrisé.</span>
          </h2>

          <p>
            Six étapes pensées pour garder une direction claire du premier
            échange jusqu’à la mise en ligne.
          </p>
        </div>

        <div className="method-process-layout">
          <div className="method-phase-list">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                className={`method-phase ${
                  activeStep === index ? "active" : ""
                }`}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                aria-pressed={activeStep === index}
              >
                <span>{step.number}</span>

                <strong>{step.label}</strong>

                <i aria-hidden="true">
                  <ExternalArrowIcon />
                </i>
              </button>
            ))}
          </div>

          <div className="method-phase-display">
            <div className="method-phase-glow" />

            <div className="method-phase-number">
              {steps[activeStep].number}
            </div>

            <span className="method-phase-label">
              {steps[activeStep].label}
            </span>

            <h3>{steps[activeStep].title}</h3>

            <p>{steps[activeStep].description}</p>

            <div className="method-detail-list">
              {steps[activeStep].details.map((detail) => (
                <div key={detail}>
                  <span>+</span>
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY NOVA */}
      <section className="method-section method-reassurance method-reveal">
        <div className="method-section-label">
          <span>04 / POURQUOI NOVA</span>
        </div>

        <div className="method-heading-row">
          <h2>
            Plus qu’un
            <br />
            <span>prestataire.</span>
          </h2>

          <p>
            Nous construisons avec vous, pas simplement pour vous. Le projet
            devient une collaboration où chaque expertise sert la même vision.
          </p>
        </div>

        <div className="method-reassurance-grid">
          {reassurance.map((item) => (
            <article className="method-info-card" key={item.number}>
              <span>{item.number}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CLIENT */}
      <section className="method-section method-client method-reveal">
        <div className="method-section-label">
          <span>05 / VOTRE PLACE</span>
        </div>

        <div className="method-client-grid">
          <div>
            <h2>
              Votre projet est
              <br />
              <span>au centre.</span>
            </h2>
          </div>

          <div className="method-client-list">
            {clientPoints.map((item) => (
              <article key={item.number}>
                <div className="method-client-line">
                  <span>{item.number}</span>
                </div>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="method-section method-deliverables method-reveal">
        <div className="method-section-label">
          <span>06 / CE QUE VOUS RECEVEZ</span>
        </div>

        <div className="method-heading-row">
          <h2>
            Conçu pour
            <br />
            <span>évoluer.</span>
          </h2>

          <p>
            Chaque projet est conçu comme une base solide : esthétique,
            fonctionnelle et suffisamment flexible pour accompagner la suite de
            votre histoire.
          </p>
        </div>

        <div className="method-system">
          <div className="method-system-core">
            <span>NOVA</span>
            <small>DIGITAL SYSTEM</small>
          </div>

          {deliverables.map((item, index) => (
            <article
              className={`method-system-card card-${index + 1}`}
              key={item.number}
            >
              <span>{item.number}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="method-transparency method-reveal">
        <div className="method-transparency-orb">
          <span>+</span>
        </div>

        <div className="method-transparency-content">
          <span>07 / TRANSPARENCE</span>

          <h2>
            Tout est
            <br />
            <span>transparent.</span>
          </h2>

          <p>
            Nous privilégions une relation simple et transparente. Les
            décisions importantes sont expliquées, les étapes sont visibles et
            les échanges restent directs du début à la fin.
          </p>
        </div>

        <div className="method-transparency-points">
          <div>
            <span>01</span>
            <strong>ÉCHANGES CLAIRS</strong>
          </div>

          <div>
            <span>02</span>
            <strong>ÉTAPES VISIBLES</strong>
          </div>

          <div>
            <span>03</span>
            <strong>DÉCISIONS PARTAGÉES</strong>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="method-final method-reveal">
        <div className="method-final-ring ring-one" />
        <div className="method-final-ring ring-two" />
        <div className="method-final-ring ring-three" />

        <div className="method-final-content">
          <span>08 / ET MAINTENANT ?</span>

          <h2>
            Votre projet mérite
            <br />
            <strong>un accompagnement</strong>
            <br />
            <em>clair.</em>
          </h2>

          <p>
            Vous avez une idée, une marque à faire évoluer ou un projet à
            lancer ? Parlons-en et construisons quelque chose qui a du sens.
          </p>

          <Link href="/contact" className="method-final-button">
            <span>ÉCHANGER SUR MON PROJET</span>

            <i aria-hidden="true">
              <ArrowIcon />
            </i>
          </Link>
        </div>
      </section>
    </main>
  );
}