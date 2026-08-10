import Link from "next/link";


export default function Home() {

  return (

    <main>


      <section className="hero">


        <div className="hero-content">


          <p className="hero-tag">
            • AGENCE DIGITALE PREMIUM
          </p>



          <h1>
            Votre activité mérite
            <br />
            une meilleure
            <br />
            <span>
              présence en ligne.
            </span>
          </h1>



          <p className="hero-text">

            Nous créons des sites modernes, rapides et élégants pensés
            <br />
            pour transformer vos visiteurs en clients.

          </p>



          <div className="hero-buttons">


            <Link
              href="/realisations"
              className="btn-primary"
            >
              Voir nos réalisations →
            </Link>



            <Link
              href="/contact"
              className="btn-secondary"
            >
              Demander un devis →
            </Link>


          </div>



          <p className="hero-bottom">

            ✓ Des designs créés pour donner une meilleure image à votre activité.

          </p>



        </div>


      </section>


    </main>

  );

}