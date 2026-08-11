import Link from "next/link";
import "./page.css";

export default function Contact() {
  return (
    <main className="contact-page">

      {/* HERO */}
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


      {/* CONTACT AREA */}
      <section className="contact-container">

        {/* INFORMATIONS */}
        <div className="contact-info">

          <h2>
            Parlons de votre projet
          </h2>

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

        </div>


        {/* FORMULAIRE */}
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

          {/* Sujet du mail */}
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


      {/* CTA FINAL */}
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