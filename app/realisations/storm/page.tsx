import Image from "next/image";
import Link from "next/link";
import "./page.css";

export default function StormConcept() {
  return (
    <main className="storm-page">

      {/* HEADER */}

      <header className="storm-header">

        <Link
          href="/realisations"
          className="storm-back"
        >
          ← RÉALISATIONS
        </Link>


        <Link
          href="/"
          className="storm-logo"
        >
          <Image
            src="/lg.png"
            alt="STORM"
            width={50}
            height={50}
          />
        </Link>


        <a
          href="#"
          className="storm-live"
        >
          VOIR LE SITE ↗
        </a>

      </header>


      {/* INTRODUCTION */}

      <section className="storm-intro">

        <p>
          CONCEPT WEBSITE • E-COMMERCE
        </p>

        <h1>
          STORM
        </h1>

        <span>
          Une expérience digitale premium imaginée pour une marque
          sport lifestyle masculine.
        </span>

      </section>


      {/* GALERIE */}

      <section className="storm-gallery">


        {/* IMAGE 1 */}

        <article className="storm-project">

          <div className="storm-image">

            <Image
              src="/projets/storm-1.png"
              alt="STORM accueil"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 90vw"
            />

          </div>


          <div className="storm-info">

            <span>
              01
            </span>

            <div>

              <h2>
                ACCUEIL
              </h2>

              <p>
                Une entrée immersive dans l’univers STORM,
                pensée autour du sport, du mouvement et du luxe.
              </p>

            </div>

          </div>

        </article>


        {/* IMAGE 2 */}

        <article className="storm-project">

          <div className="storm-image">

            <Image
              src="/projets/storm-2.png"
              alt="STORM collection"
              fill
              sizes="(max-width: 900px) 100vw, 90vw"
            />

          </div>


          <div className="storm-info">

            <span>
              02
            </span>

            <div>

              <h2>
                COLLECTION
              </h2>

              <p>
                Une présentation produit minimaliste inspirée
                des codes du sport premium.
              </p>

            </div>

          </div>

        </article>


        {/* IMAGE 3 */}

        <article className="storm-project">

          <div className="storm-image">

            <Image
              src="/projets/storm-3.png"
              alt="STORM contact"
              fill
              sizes="(max-width: 900px) 100vw, 90vw"
            />

          </div>


          <div className="storm-info">

            <span>
              03
            </span>

            <div>

              <h2>
                CONTACT
              </h2>

              <p>
                Une interface élégante destinée aux clients,
                collaborations et partenariats.
              </p>

            </div>

          </div>

        </article>

      </section>


      {/* BAS DE PAGE */}

      <section className="storm-bottom">

        <Image
          src="/lg.png"
          alt="STORM"
          width={55}
          height={55}
        />

        <p>
          SILENCE BEFORE THE STORM
        </p>

        <a
          href="#"
          className="storm-button"
        >
          VISITER LE SITE ↗
        </a>

      </section>


      {/* FOOTER */}

      <footer className="storm-footer">

        <span>
          STORM
        </span>

        <span>
          CONCEPT BY NOVA
        </span>

        <Link href="/realisations">
          RETOUR AUX RÉALISATIONS
        </Link>

      </footer>

    </main>
  );
}