import Link from "next/link";
import "./page.css";

export default function Apropos() {

  return (

    <main className="about-page">


      {/* HERO */}

      <section className="about-hero">

        <p className="about-tag fade">
          À PROPOS DE NOVA
        </p>


        <h1 className="fade">
          Nous créons des sites
          <br />
          qui donnent une vraie
          <br />
          <span>
            image à votre activité.
          </span>
        </h1>


        <p className="about-description fade">

          NOVA est une agence digitale spécialisée dans la création
          de sites modernes, élégants et performants pour les entreprises
          qui veulent évoluer.

        </p>


      </section>



      {/* HISTOIRE */}

      <section className="about-section">


        <div className="fade">

          <span className="about-label">
            NOTRE VISION
          </span>


          <h2>
            Un site n'est pas seulement
            une vitrine.
          </h2>

        </div>



        <div className="about-text fade">

          <p>

            Aujourd'hui, votre présence en ligne est souvent le premier
            contact entre votre entreprise et vos futurs clients.

          </p>


          <p>

            Notre objectif est simple : créer des expériences digitales
            qui reflètent réellement votre identité, inspirent confiance
            et vous permettent de vous démarquer.

          </p>


          <p>

            Nous travaillons chaque projet comme une vraie collaboration.
            Nous prenons le temps de comprendre votre activité, vos valeurs
            et vos objectifs avant de construire une solution adaptée.

          </p>


        </div>


      </section>





      {/* APPROCHE */}

      <section className="about-cards">


        <div className="about-card fade">

          <span>
            01
          </span>

          <h3>
            Comprendre
          </h3>

          <p>
            Nous analysons votre activité, votre clientèle et vos ambitions
            pour construire une base solide.
          </p>

        </div>




        <div className="about-card fade">

          <span>
            02
          </span>

          <h3>
            Créer
          </h3>

          <p>
            Nous imaginons un design moderne et une expérience adaptée
            à votre image.
          </p>

        </div>





        <div className="about-card fade">

          <span>
            03
          </span>

          <h3>
            Développer
          </h3>

          <p>
            Nous transformons votre vision en un site rapide, professionnel
            et prêt à accompagner votre croissance.
          </p>

        </div>


      </section>





      {/* CONFIANCE */}

      <section className="about-final fade">


        <h2>

          Votre projet mérite
          <br />
          plus qu'un simple site.

        </h2>


        <p>

          Nous voulons créer des sites dont vous êtes fier,
          et qui donnent envie à vos clients de vous faire confiance.

        </p>



        <Link href="/contact">

          Parlons de votre projet →

        </Link>


      </section>



    </main>

  );
}