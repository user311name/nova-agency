import Link from "next/link";
import "./page.css";

const processSteps = [
  {
    number: "01",
    title: "Demande de devis",
    text: "Vous nous présentez votre activité et votre projet.",
  },
  {
    number: "02",
    title: "Étude du projet",
    text: "Nous étudions vos besoins afin de définir la meilleure solution.",
  },
  {
    number: "03",
    title: "Devis personnalisé",
    text: "Chaque projet étant différent, le tarif est établi uniquement sur devis.",
  },
  {
    number: "04",
    title: "Validation & règlement",
    text: "Après validation du devis, le règlement peut être effectué par virement bancaire.",
  },
  {
    number: "05",
    title: "Réalisation",
    text: "Nous lançons ensuite la création de votre projet.",
  },
];

export default function Contact() {
  return (
    <main className="contact-page">
      <section
        className="contact-hero"
        aria-labelledby="contact-title"
      >
        <div className="contact-hero-inner">
          <div className="contact-kicker">
            <span className="contact-kicker-line" />
            <span>PARLONS DE VOTRE PROJET</span>
          </div>

          <h1 id="contact-title">
            Construisons quelque chose
            <span> de remarquable.</span>
          </h1>

          <p>
            Vous avez une idée, un projet ou une entreprise à développer ?
            Présentez-nous votre vision. Nous vous aiderons à transformer
            cette idée en une présence digitale claire, moderne et efficace.
          </p>
        </div>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <div className="contact-section-label">
            <span>01</span>
            <p>NOTRE APPROCHE</p>
          </div>

          <h2>
            Pas simplement
            <br />
            <span>un site web.</span>
          </h2>

          <p className="contact-intro">
            Chaque projet est différent. Nous prenons le temps de comprendre
            votre activité, vos objectifs et votre vision avant de construire
            une solution adaptée.
          </p>

          <div className="contact-points">
            <div className="contact-point">
              <span className="point-number">01</span>
              <div>
                <strong>Réponse rapide</strong>
                <p>Votre demande est étudiée avant notre échange.</p>
              </div>
            </div>

            <div className="contact-point">
              <span className="point-number">02</span>
              <div>
                <strong>Projet personnalisé</strong>
                <p>Une solution pensée autour de votre activité.</p>
              </div>
            </div>

            <div className="contact-point">
              <span className="point-number">03</span>
              <div>
                <strong>Accompagnement complet</strong>
                <p>Du premier échange jusqu'à la mise en ligne.</p>
              </div>
            </div>
          </div>

          <div className="project-process">
            <div className="process-title">
              <div className="contact-section-label">
                <span>02</span>
                <p>LE PROCESSUS</p>
              </div>

              <h3>
                Une méthode simple.
                <br />
                Un résultat <span>soigné.</span>
              </h3>
            </div>

            <div className="process-list">
              {processSteps.map((step) => (
                <div className="process-item" key={step.number}>
                  <span className="process-number">{step.number}</span>

                  <div className="process-content">
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="form-top">
            <div>
              <span className="form-label">DÉMARRER UN PROJET</span>

              <h2>
                Parlons de
                <br />
                <span>votre projet.</span>
              </h2>
            </div>

            <span className="form-index">NOVA / 01</span>
          </div>

          <p className="form-description">
            Quelques informations suffisent pour commencer.
          </p>

          <form
            className="contact-form"
            action="https://formspree.io/f/mgawenka"
            method="POST"
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="nom">
                  Nom <span>*</span>
                </label>

                <input
                  id="nom"
                  type="text"
                  name="nom"
                  placeholder="Jean Dupont"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="entreprise">
                  Entreprise
                </label>

                <input
                  id="entreprise"
                  type="text"
                  name="entreprise"
                  placeholder="Votre entreprise"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="vous@entreprise.fr"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="telephone">
                  Téléphone
                </label>

                <input
                  id="telephone"
                  type="tel"
                  name="telephone"
                  placeholder="+33 6 00 00 00 00"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="projet">
                Type de projet <span>*</span>
              </label>

              <select
                id="projet"
                name="projet"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Sélectionnez votre projet
                </option>

                <option value="Création de site">
                  Création de site
                </option>

                <option value="Refonte de site">
                  Refonte de site
                </option>

                <option value="E-commerce">
                  E-commerce
                </option>

                <option value="Identité digitale">
                  Identité digitale
                </option>

                <option value="Autre">
                  Autre projet
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message">
                Votre projet <span>*</span>
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Décrivez-nous votre activité, votre besoin ou simplement votre idée..."
                required
              />
            </div>

            <input
              type="hidden"
              name="_subject"
              value="Nouvelle demande de projet — NOVA"
            />

            <div className="form-bottom">
              <p>
                Vos informations servent uniquement à répondre
                à votre demande.
              </p>

              <button type="submit">
                <span>ENVOYER LA DEMANDE</span>
                <strong>↗</strong>
              </button>
            </div>
          </form>
        </div>
      </section>

      <section
        className="contact-bottom"
        aria-labelledby="contact-bottom-title"
      >
        <div className="bottom-label">
          <span>03</span>
          <p>LA SUITE</p>
        </div>

        <h2 id="contact-bottom-title">
          Une idée aujourd'hui.
          <br />
          <span>Un projet demain.</span>
        </h2>

        <p>
          Commençons simplement par une discussion.
        </p>

        <Link href="/">
          RETOUR À L'ACCUEIL <span>↗</span>
        </Link>
      </section>
    </main>
  );
}