import Image from "next/image";
import Link from "next/link";

export default function NoirBarberPage() {
  return (
    <main className="project-page">

      {/* INTRO */}
      <section className="project-intro">

        <p className="project-label">
          PROJET
        </p>

        <h1>
          NOIR BARBER
        </h1>

        <p className="project-description">
          Site vitrine premium pour un barber shop.
        </p>

        <p className="project-small-text">
          Une expérience digitale élégante pensée pour une clientèle exigeante.
        </p>

      </section>


      {/* IMAGE PRINCIPALE */}
      <section className="project-main-image">

        <Image
          src="/projets/barber-home.png"
          alt="Noir Barber"
          width={1600}
          height={900}
          priority
        />

      </section>



      {/* GALERIE */}
      <section className="project-gallery">

        <Image
          src="/projets/barber-services.png"
          alt="Noir Barber Services"
          width={900}
          height={600}
        />


        <Image
          src="/projets/barber-reservation.png"
          alt="Noir Barber Réservation"
          width={900}
          height={600}
        />

      </section>



      {/* POINTS FORTS */}
      <section className="project-features">

        <div>
          <h3>
            Design premium
          </h3>
          <p>
            Une identité visuelle sombre et élégante.
          </p>
        </div>


        <div>
          <h3>
            Navigation fluide
          </h3>
          <p>
            Une expérience simple et rapide pour les clients.
          </p>
        </div>


        <div>
          <h3>
            Expérience client
          </h3>
          <p>
            Un site pensé pour convertir les visiteurs.
          </p>
        </div>

      </section>



      {/* CTA */}
      <section className="project-contact">

        <h2>
          Un projet similaire ?
        </h2>

        <Link href="/contact">
          Demander un projet →
        </Link>

      </section>


    </main>
  );
}