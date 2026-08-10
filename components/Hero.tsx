import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          <span></span>
          AGENCE DIGITALE
        </div>

        <h1>
          Votre activité mérite
          <br />
          une meilleure
          <br />
          <strong>présence en ligne.</strong>
        </h1>

        <p className="hero-description">
          Nous créons des sites modernes, rapides et élégants
          pensés pour attirer plus de clients et développer votre activité.
        </p>


        <div className="hero-buttons">

          <Link 
            href="/realisations" 
            className="primary-btn"
          >
            Découvrir nos créations →
          </Link>


          <Link 
            href="/contact" 
            className="secondary-btn"
          >
            Demander un devis →
          </Link>

        </div>


        <div className="hero-trust">
          <div className="trust-icon">
            ✓
          </div>

          <p>
            Des designs créés pour donner une meilleure image
            à votre activité.
          </p>
        </div>

      </div>


      <div className="hero-visual">

        <div className="hero-shape"></div>

      </div>


    </section>
  );
}