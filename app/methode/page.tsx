import "./page.css";

const steps = [
  {
    number: "01",
    label: "PHASE 01",
    title: "Immersion & stratégie",
    description:
      "Avant de créer, nous cherchons à comprendre. Votre activité, vos objectifs, votre marché et surtout ce qui doit réellement changer.",
    details: [
      "Analyse de votre activité",
      "Identification des objectifs",
      "Étude du positionnement",
      "Définition de la direction",
    ],
  },
  {
    number: "02",
    label: "PHASE 02",
    title: "Direction créative",
    description:
      "Nous transformons la stratégie en une direction visuelle cohérente, identifiable et pensée pour construire une véritable image de marque.",
    details: [
      "Direction artistique",
      "Univers visuel",
      "Hiérarchie graphique",
      "Références & intentions",
    ],
  },
  {
    number: "03",
    label: "PHASE 03",
    title: "Conception",
    description:
      "Chaque élément est conçu avec précision. Nous travaillons l'expérience, le design et les détails pour créer une présence qui inspire confiance.",
    details: [
      "UX / UI design",
      "Création graphique",
      "Design responsive",
      "Système visuel cohérent",
    ],
  },
  {
    number: "04",
    label: "PHASE 04",
    title: "Développement",
    description:
      "Le design prend vie dans une expérience rapide, fluide et parfaitement adaptée à tous les écrans.",
    details: [
      "Développement sur mesure",
      "Responsive mobile",
      "Optimisation des performances",
      "Animations & interactions",
    ],
  },
  {
    number: "05",
    label: "PHASE 05",
    title: "Tests & perfectionnement",
    description:
      "Nous vérifions chaque détail avant la mise en ligne afin que l'expérience finale soit aussi solide techniquement que visuellement.",
    details: [
      "Contrôle responsive",
      "Tests d'interactions",
      "Optimisation technique",
      "Corrections finales",
    ],
  },
  {
    number: "06",
    label: "PHASE 06",
    title: "Mise en ligne",
    description:
      "Une fois tout validé, nous préparons et déployons votre projet dans les meilleures conditions pour qu'il soit prêt à rencontrer votre audience.",
    details: [
      "Préparation du lancement",
      "Mise en production",
      "Vérifications finales",
      "Accompagnement au lancement",
    ],
  },
];

const reassurance = [
  {
    number: "01",
    title: "Une vision globale",
    description:
      "Nous ne pensons jamais un élément isolément. Stratégie, identité, design et technologie doivent fonctionner ensemble.",
  },
  {
    number: "02",
    title: "Du sur-mesure",
    description:
      "Pas de modèle générique. Chaque projet est construit autour de votre identité, vos enjeux et votre audience.",
  },
  {
    number: "03",
    title: "Une exigence constante",
    description:
      "Nous accordons autant d'importance aux détails visibles qu'à ceux que l'on ne remarque qu'une fois qu'ils sont parfaitement maîtrisés.",
  },
  {
    number: "04",
    title: "Une relation simple",
    description:
      "Des échanges clairs, des étapes définies et une communication directe pour avancer efficacement sans complexité inutile.",
  },
];

const clientPoints = [
  {
    number: "01",
    title: "Vous savez où nous allons",
    description:
      "Chaque étape possède un objectif précis. Vous comprenez ce qui est travaillé, pourquoi nous le faisons et ce qui vient ensuite.",
  },
  {
    number: "02",
    title: "Vous restez impliqué",
    description:
      "Votre vision reste au centre du projet. Nous apportons notre expertise sans jamais perdre de vue votre réalité métier.",
  },
  {
    number: "03",
    title: "Vous voyez le projet évoluer",
    description:
      "Les décisions importantes sont partagées au bon moment afin de construire progressivement un résultat qui vous ressemble.",
  },
  {
    number: "04",
    title: "Vous repartez avec une vraie base",
    description:
      "L'objectif n'est pas simplement de livrer un site, mais de construire une présence digitale capable d'évoluer avec votre activité.",
  },
];

const deliverables = [
  {
    number: "01",
    title: "Une identité digitale forte",
    description:
      "Une direction visuelle cohérente qui donne à votre marque une présence claire, moderne et immédiatement reconnaissable.",
  },
  {
    number: "02",
    title: "Une expérience pensée pour vos utilisateurs",
    description:
      "Une navigation intuitive et des interfaces conçues pour rendre chaque interaction simple, naturelle et efficace.",
  },
  {
    number: "03",
    title: "Un site développé sur mesure",
    description:
      "Une intégration propre, responsive et optimisée pour offrir une expérience fluide sur ordinateur, tablette et mobile.",
  },
  {
    number: "04",
    title: "Une base évolutive",
    description:
      "Une architecture pensée pour permettre à votre projet de grandir sans devoir tout reconstruire quelques mois plus tard.",
  },
];

export default function MethodPage() {
  return (
    <main className="method-page">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="method-hero">
        <div className="method-hero-inner">
          <div className="method-kicker">
            <span />
            <p>NOVA — NOTRE MÉTHODE</p>
          </div>

          <div className="method-hero-grid">
            <div>
              <span className="method-index-mobile">01 / MÉTHODE</span>

              <h1>
                Créer du sens.
                <br />
                <span>Créer de l&apos;impact.</span>
              </h1>

              <p className="method-hero-description">
                Une méthode pensée pour transformer une idée en une présence
                digitale forte, cohérente et durable.
              </p>
            </div>

            <div className="method-hero-side">
              <span className="method-index">01 / 08</span>

              <p>
                Chez NOVA, nous ne commençons jamais par le design. Nous
                commençons par comprendre ce que votre marque doit devenir.
              </p>
            </div>
          </div>

          <div className="method-hero-bottom">
            <span>STRATÉGIE → DESIGN → TECHNOLOGIE</span>

            <p>
              Une approche structurée.
              <br />
              Une exigence créative.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="method-intro">
        <div className="method-section-label">
          <span>02</span>
          <p>NOTRE APPROCHE</p>
        </div>

        <div className="method-intro-grid">
          <div>
            <p className="method-kicker-blue">PENSER AVANT DE CRÉER</p>

            <h2>
              La créativité
              <br />
              <span>avec une direction.</span>
            </h2>
          </div>

          <div className="method-intro-copy">
            <p>
              Un beau site ne suffit pas. Il doit avoir une raison d&apos;être,
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

      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section className="method-process">
        <div className="method-process-inner">
          <div className="method-section-label">
            <span>03</span>
            <p>LE PROCESSUS</p>
          </div>

          <div className="method-process-heading">
            <div>
              <h2>
                Une méthode
                <br />
                <span>en mouvement.</span>
              </h2>
            </div>

            <p>
              Six étapes pensées pour garder une direction claire du premier
              échange jusqu&apos;à la mise en ligne.
            </p>
          </div>

          <div className="method-steps">
            {steps.map((step) => (
              <article className="method-step" key={step.number}>
                <div className="method-step-number">{step.number}</div>

                <div className="method-step-main">
                  <div className="method-step-title">
                    <div className="method-step-heading-content">
                      <span>{step.label}</span>
                      <h3>{step.title}</h3>
                    </div>

                    <span
                      className="method-step-arrow"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="method-step-description">
                    {step.description}
                  </p>

                  <div className="method-step-details">
                    {step.details.map((detail) => (
                      <div className="method-detail" key={detail}>
                        <span>+</span>
                        <p>{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          REASSURANCE
      ===================================================== */}
      <section className="method-reassurance">
        <div className="method-reassurance-inner">
          <div className="method-section-label">
            <span>04</span>
            <p>POURQUOI NOVA</p>
          </div>

          <div className="method-reassurance-heading">
            <div>
              <h2>
                Plus qu&apos;un
                <br />
                <span>prestataire.</span>
              </h2>
            </div>

            <p>
              Nous construisons avec vous, pas simplement pour vous. Le projet
              devient une collaboration où chaque expertise sert la même
              vision.
            </p>
          </div>

          <div className="reassurance-grid">
            {reassurance.map((item) => (
              <article className="reassurance-card" key={item.number}>
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CLIENT
      ===================================================== */}
      <section className="method-client">
        <div className="method-client-inner">
          <div className="method-section-label">
            <span>05</span>
            <p>VOTRE PLACE</p>
          </div>

          <div className="method-client-grid">
            <div>
              <h2>
                Vous êtes
                <br />
                <span>au centre.</span>
              </h2>
            </div>

            <div className="client-points">
              {clientPoints.map((point) => (
                <article className="client-point" key={point.number}>
                  <span>{point.number}</span>

                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DELIVERABLES
      ===================================================== */}
      <section className="method-deliverables">
        <div className="method-deliverables-inner">
          <div className="method-section-label">
            <span>06</span>
            <p>CE QUE VOUS RECEVEZ</p>
          </div>

          <div className="deliverables-heading">
            <div>
              <h2>
                Pensé pour
                <br />
                <span>durer.</span>
              </h2>
            </div>

            <p>
              Chaque projet est conçu comme une base solide : esthétique,
              fonctionnelle et suffisamment flexible pour accompagner la suite
              de votre histoire.
            </p>
          </div>

          <div className="deliverables-list">
            {deliverables.map((item) => (
              <article className="deliverable" key={item.number}>
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRANSPARENCY
      ===================================================== */}
      <section className="method-transparency">
        <div className="method-transparency-inner">
          <div className="transparency-icon" aria-hidden="true">
            +
          </div>

          <div>
            <span>07 / TRANSPARENCE</span>

            <h2>
              Pas de zone
              <br />
              <strong>grise.</strong>
            </h2>

            <p>
              Nous privilégions une relation simple et transparente. Les
              décisions importantes sont expliquées, les étapes sont visibles
              et les échanges restent directs du début à la fin.
            </p>
          </div>

          <div className="transparency-side">
            <div>
              <span>01</span>
              <p>ÉCHANGES CLAIRS</p>
            </div>

            <div>
              <span>02</span>
              <p>ÉTAPES VISIBLES</p>
            </div>

            <div>
              <span>03</span>
              <p>DÉCISIONS PARTAGÉES</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="method-final">
        <div className="method-final-content">
          <span>08 / ET MAINTENANT ?</span>

          <h2>
            Votre projet mérite
            <br />
            <strong>une vraie direction.</strong>
          </h2>

          <p>
            Vous avez une idée, une marque à faire évoluer ou un projet à
            lancer ? Parlons-en et construisons quelque chose qui a du sens.
          </p>

          <a className="method-final-link" href="/contact">
            <span>PARLER DE MON PROJET</span>

            <span className="method-final-arrow" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}