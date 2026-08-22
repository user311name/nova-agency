import Link from "next/link";
import "./page.css";

const faqItems = [
  {
    number: "01",
    category: "NOVA",
    question: "Qui est NOVA ?",
    answer:
      "NOVA est une agence digitale créée autour d’une idée simple : une entreprise mérite mieux qu’un site générique. Nous concevons des sites sur mesure pour présenter votre activité clairement, renforcer votre image et donner envie à vos futurs clients d’aller plus loin.",
  },
  {
    number: "02",
    category: "PROJET",
    question: "Comment se déroule la création d’un site ?",
    answer:
      "Chaque projet commence par une compréhension précise de votre activité, de vos objectifs et de votre image. Nous construisons ensuite l’architecture, le design, les interactions puis développons le site avant de le mettre en ligne.",
  },
  {
    number: "03",
    category: "DÉLAI",
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "Le délai dépend du projet et de son niveau de personnalisation. Un site vitrine peut généralement être conçu en quelques jours à quelques semaines selon le nombre de pages, les fonctionnalités et les validations.",
  },
  {
    number: "04",
    category: "DESIGN",
    question: "Est-ce que le design est entièrement personnalisé ?",
    answer:
      "Oui. Nous ne cherchons pas simplement à reproduire un modèle existant. L’objectif est de créer une identité digitale cohérente avec votre marque, votre positionnement et votre clientèle.",
  },
  {
    number: "05",
    category: "MOBILE",
    question: "Le site sera-t-il adapté aux téléphones ?",
    answer:
      "Oui. Chaque interface est pensée pour ordinateur, tablette et mobile. Les espacements, les tailles, les animations et la navigation sont ajustés pour offrir une expérience fluide sur chaque écran.",
  },
  {
    number: "06",
    category: "SEO",
    question: "Le référencement naturel est-il pris en compte ?",
    answer:
      "La structure du site est pensée avec les bonnes bases techniques : structure des pages, titres, performances, responsive design et éléments nécessaires à une bonne compréhension du contenu par les moteurs de recherche.",
  },
  {
    number: "07",
    category: "CONTENU",
    question: "Dois-je fournir tous les textes et les images ?",
    answer:
      "Vous pouvez fournir vos contenus si vous les avez déjà. Nous pouvons également vous accompagner dans leur organisation afin que le site présente votre activité de manière claire, premium et convaincante.",
  },
  {
    number: "08",
    category: "HÉBERGEMENT",
    question: "Qui s’occupe de la mise en ligne ?",
    answer:
      "Nous pouvons nous occuper de la mise en ligne et de la configuration technique du projet. L’objectif est que vous puissiez disposer d’un site fonctionnel sans avoir à gérer toute la partie technique.",
  },
  {
    number: "09",
    category: "APRÈS",
    question: "Que se passe-t-il après la livraison ?",
    answer:
      "Le projet ne s’arrête pas simplement à la mise en ligne. Nous pouvons continuer à vous accompagner pour les ajustements, les évolutions et l’amélioration progressive de votre présence digitale.",
  },
];

export default function FAQPage() {
  return (
    <main className="faq-page">
      <div className="faq-background-grid" />
      <div className="faq-glow faq-glow-one" />
      <div className="faq-glow faq-glow-two" />
      <div className="faq-orbit faq-orbit-one" />
      <div className="faq-orbit faq-orbit-two" />

      <header className="faq-hero">
        <div className="faq-hero-inner">
          <div className="faq-topline">
            <span />
            <p>NOVA / FAQ</p>
          </div>

          <div className="faq-hero-grid">
            <div className="faq-hero-main">
              <span className="faq-index">06 — QUESTIONS</span>

              <h1>
                Les réponses
                <br />
                <span>avant le départ.</span>
              </h1>

              <p className="faq-intro">
                Vous avez une question sur notre façon de travailler,
                la création de votre site ou les étapes du projet ?
                Retrouvez ici les réponses aux questions les plus fréquentes.
              </p>
            </div>

            <div className="faq-hero-side">
              <div className="faq-side-line" />

              <span>UNE APPROCHE SIMPLE</span>

              <p>
                Une vision claire.
                <br />
                Une méthode précise.
                <br />
                Un résultat pensé
                <br />
                dans les détails.
              </p>
            </div>
          </div>

          <div className="faq-hero-bottom">
            <span>SCROLL TO EXPLORE</span>

            <div className="faq-scroll-line">
              <i />
            </div>

            <p>Questions fréquentes / NOVA</p>
          </div>
        </div>
      </header>

      <section className="faq-section">
        <div className="faq-section-inner">
          <div className="faq-section-heading">
            <div className="faq-label">
              <span>01</span>
              <p>FAQ / INFORMATIONS</p>
            </div>

            <div className="faq-heading-grid">
              <div>
                <h2>
                  Tout ce qu’il faut
                  <br />
                  <span>savoir.</span>
                </h2>
              </div>

              <p>
                Nous privilégions une relation simple et transparente.
                Chaque étape du projet est expliquée afin que vous sachiez
                exactement où nous allons et pourquoi.
              </p>
            </div>
          </div>

          <div className="faq-list">
            {faqItems.map((item) => (
              <article className="faq-card" key={item.number}>
                <div className="faq-card-number">{item.number}</div>

                <div className="faq-card-content">
                  <div className="faq-card-top">
                    <span>{item.category}</span>

                    <div className="faq-card-symbol">
                      <span>+</span>
                    </div>
                  </div>

                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>

                <div className="faq-card-decoration" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-experience">
        <div className="faq-experience-inner">
          <div className="faq-experience-orb">
            <div className="faq-orb-core" />
            <div className="faq-orb-ring ring-one" />
            <div className="faq-orb-ring ring-two" />
            <div className="faq-orb-ring ring-three" />
          </div>

          <div className="faq-experience-content">
            <div className="faq-label">
              <span>02</span>
              <p>NOTRE PHILOSOPHIE</p>
            </div>

            <h2>
              Pas seulement
              <br />
              <span>un beau site.</span>
            </h2>

            <p>
              Nous cherchons à créer une véritable expérience digitale :
              une interface esthétique, rapide, cohérente et pensée pour
              donner envie de découvrir votre activité.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-contact">
        <div className="faq-contact-inner">
          <div className="faq-contact-line" />

          <span className="faq-contact-label">
            UNE QUESTION ENCORE ?
          </span>

          <h2>
            Parlons de
            <br />
            <strong>votre projet.</strong>
          </h2>

          <p>
            Si votre question ne figure pas ici, contactez-nous directement.
            Nous vous répondrons avec une réponse adaptée à votre projet.
          </p>

          <Link href="/contact" className="faq-contact-button">
            <span>CONTACTER NOVA</span>
            <strong>→</strong>
          </Link>
        </div>
      </section>
    </main>
  );
}