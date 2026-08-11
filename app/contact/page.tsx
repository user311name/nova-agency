import Link from "next/link";
import "./page.css";

export default function Contact() {
  return (
    <main className="contact-page">

      <section className="contact-hero">
        <p>CONTACT</p>

        <h1>
          Construisons votre
          <br />
          prochaine présence digitale.
        </h1>

        <span>
          Vous avez une idée, un projet ou une entreprise à développer ?
          Parlons-en simplement et trouvons ensemble la meilleure solution.
        </span>
      </section>

      <section className="contact-container">

        <div className="contact-info">

          <h2>Parlons de votre projet</h2>

          <p>
            Chaque projet est différent. Nous prenons le temps de comprendre
            votre activité, vos objectifs et votre vision avant de créer
            une solution adaptée.
          </p>

          <div className="contact-points">

            <div>
              <strong>01</strong>
              <span>Réponse rapide</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Projet personnalisé</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Accompagnement complet</span>
            </div>

          </div>

          <div className="project-process">

            <div className="process-title">
              <span>COMMENT ÇA MARCHE</span>

              <h3>
                Un projet simple,
                <br />
                du premier échange à la livraison.
              </h3>
            </div>

            <div className="process-item">
              <strong>01</strong>
              <div>
                <h4>Demande de devis</h4>
                <p>
                  Vous nous présentez votre activité et votre projet.
                </p>
              </div>
            </div>

            <div className="process-item">
              <strong>02</strong>
              <div>
                <h4>Étude du projet</h4>
                <p>
                  Nous étudions vos besoins afin de définir la meilleure
                  solution.
                </p>
              </div>
            </div>

            <div className="process-item">
              <strong>03</strong>
              <div>
                <h4>Devis personnalisé</h4>
                <p>
                  Chaque projet étant différent, le tarif est établi
                  uniquement sur devis.
                </p>
              </div>
            </div>

            <div className="process-item">
              <strong>04</strong>
              <div>
                <h4>Validation & règlement</h4>
                <p>
                  Après validation du devis, le règlement peut être effectué
                  par virement bancaire.
                </p>
              </div>
            </div>

            <div className="process-item">
              <strong>05</strong>
              <div>
                <h4>Réalisation</h4>
                <p>
                  Nous lançons ensuite la création de votre projet.
                </p>
              </div>
            </div>

          </div>

        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/mgawenka"
          method="POST"
        >

          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            required
          />

          <input
            type="text"
            name="entreprise"
            placeholder="Votre entreprise"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            required
          />

          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
          />

          <select
            name="projet"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Type de projet
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

          <textarea
            name="message"
            placeholder="Parlez-nous de votre projet"
            required
          />

          <input
            type="hidden"
            name="_subject"
            value="Nouvelle demande de projet — NOVA"
          />

          <button type="submit">
            ENVOYER MON PROJET →
          </button>

        </form>

      </section>

      <section className="contact-bottom">

        <h2>
          Une idée aujourd'hui,
          <br />
          un projet demain.
        </h2>

        <p>
          Commençons par une simple discussion.
        </p>

        <Link href="/">
          RETOUR À L'ACCUEIL
        </Link>

      </section>

    </main>
  );
}