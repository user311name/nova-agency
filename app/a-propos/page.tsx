import Link from "next/link";
import "./page.css";

export default function AProposPage() {
  return (
    <main className="about-page">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <div className="about-tag">
            <span>●</span>
            À PROPOS DE NOVA
          </div>

          <h1>
            Nous créons votre présence
            <br />
            <span>digitale de A à Z.</span>
          </h1>

          <p className="about-intro">
            NOVA est une agence digitale indépendante spécialisée dans la
            création de sites internet modernes, performants et sur mesure.
            Mais notre vision va plus loin : nous construisons autour de votre
            site tout l'écosystème nécessaire à votre présence en ligne.
          </p>

          <div className="about-hero-reassurance">

            <div>
              <span>01</span>
              <strong>Création digitale</strong>
            </div>

            <div>
              <span>02</span>
              <strong>Infrastructure</strong>
            </div>

            <div>
              <span>03</span>
              <strong>Accompagnement</strong>
            </div>

          </div>

        </div>

        <div className="about-hero-mark" aria-hidden="true">
          N
        </div>

      </section>


      {/* =========================================================
          VISION
      ========================================================= */}

      <section className="about-vision">

        <div className="about-section-label">
          <span>01</span>
          NOTRE VISION
        </div>

        <div className="about-vision-grid">

          <div>

            <p className="about-kicker">
              L'AGENCE NOVA
            </p>

            <h2>
              Votre site est le début.
              <br />
              <span>Pas la fin.</span>
            </h2>

          </div>

          <div className="about-copy">

            <p>
              Aujourd'hui, une entreprise ne se résume plus à son site
              internet. Votre domaine, votre hébergement, vos emails et la
              sécurité de votre environnement numérique participent tous à
              votre image.
            </p>

            <p>
              C'est pourquoi NOVA développe une approche différente :
              construire votre présence digitale dans son ensemble, avec des
              services conçus pour fonctionner ensemble.
            </p>

            <p>
              Nous voulons que votre environnement numérique soit aussi simple
              à gérer qu'il est agréable à utiliser.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          APPROCHE
      ========================================================= */}

      <section className="about-approach">

        <div className="about-approach-inner">

          <div className="about-section-label">
            <span>02</span>
            NOTRE APPROCHE
          </div>

          <div className="about-approach-grid">

            <div className="about-approach-heading">

              <h2>
                Une seule vision.
                <br />
                <span>Tout votre digital.</span>
              </h2>

              <p>
                Nous réunissons création, technologie et infrastructure pour
                éviter de multiplier les outils et les interlocuteurs.
              </p>

            </div>


            <div className="about-approach-list">

              <article className="approach-item">

                <span>01</span>

                <div>

                  <h3>Créer</h3>

                  <p>
                    Nous concevons des sites internet modernes, élégants,
                    rapides et adaptés à votre activité.
                  </p>

                </div>

              </article>


              <article className="approach-item">

                <span>02</span>

                <div>

                  <h3>Identifier</h3>

                  <p>
                    Nous vous permettons de choisir le nom de domaine qui
                    deviendra l'adresse de votre entreprise sur internet.
                  </p>

                </div>

              </article>


              <article className="approach-item">

                <span>03</span>

                <div>

                  <h3>Héberger</h3>

                  <p>
                    Votre site peut fonctionner sur une infrastructure pensée
                    pour offrir stabilité, performance et simplicité.
                  </p>

                </div>

              </article>


              <article className="approach-item">

                <span>04</span>

                <div>

                  <h3>Communiquer</h3>

                  <p>
                    Nous vous permettons de disposer d'adresses emails
                    professionnelles liées à votre domaine.
                  </p>

                </div>

              </article>


              <article className="approach-item">

                <span>05</span>

                <div>

                  <h3>Protéger</h3>

                  <p>
                    Nous intégrons également les services et bonnes pratiques
                    nécessaires pour renforcer la sécurité de votre présence
                    numérique.
                  </p>

                </div>

              </article>


              <article className="approach-item">

                <span>06</span>

                <div>

                  <h3>Gérer</h3>

                  <p>
                    Votre espace client NOVA est pensé pour centraliser
                    progressivement vos domaines, commandes et services.
                  </p>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SERVICES / ÉCOSYSTÈME
      ========================================================= */}

      <section className="about-values">

        <div className="about-section-label">
          <span>03</span>
          L'ÉCOSYSTÈME NOVA
        </div>

        <div className="about-values-heading">

          <h2>
            Tout ce dont votre
            <br />
            présence <span>a besoin.</span>
          </h2>

          <p>
            NOVA ne se limite pas à la conception de votre site. Nous
            développons un ensemble de services complémentaires pour vous
            permettre de construire et gérer votre présence numérique au même
            endroit.
          </p>

        </div>


        <div className="values-grid">

          <article className="value-card">

            <span>01</span>

            <div>

              <h3>Sites internet</h3>

              <p>
                Des sites sur mesure conçus autour de votre identité, de vos
                objectifs et de vos utilisateurs.
              </p>

              <Link href="/services">
                Découvrir nos services →
              </Link>

            </div>

          </article>


          <article className="value-card">

            <span>02</span>

            <div>

              <h3>Domaines</h3>

              <p>
                Recherchez et achetez le nom de domaine qui représentera votre
                entreprise sur internet.
              </p>

              <Link href="/domaines">
                Rechercher un domaine →
              </Link>

            </div>

          </article>


          <article className="value-card">

            <span>03</span>

            <div>

              <h3>Hébergement</h3>

              <p>
                Une infrastructure adaptée pour héberger votre site et
                maintenir votre présence en ligne.
              </p>

              <Link href="/hebergement">
                Découvrir l'hébergement →
              </Link>

            </div>

          </article>


          <article className="value-card">

            <span>04</span>

            <div>

              <h3>Emails professionnels</h3>

              <p>
                Des adresses professionnelles associées à votre propre nom de
                domaine pour renforcer votre crédibilité.
              </p>

              <Link href="/emails">
                Découvrir les emails →
              </Link>

            </div>

          </article>


          <article className="value-card">

            <span>05</span>

            <div>

              <h3>Sécurité</h3>

              <p>
                Des services et protections destinés à sécuriser votre
                environnement numérique.
              </p>

              <Link href="/securite">
                Découvrir la sécurité →
              </Link>

            </div>

          </article>


          <article className="value-card">

            <span>06</span>

            <div>

              <h3>Espace client</h3>

              <p>
                Retrouvez vos services, vos commandes et les éléments
                essentiels de votre environnement NOVA depuis un seul compte.
              </p>

              <Link href="/espace-client">
                Ouvrir l'espace client →
              </Link>

            </div>

          </article>

        </div>

      </section>


      {/* =========================================================
          POURQUOI NOVA
      ========================================================= */}

      <section className="about-global">

        <div className="about-reassurance">

          <div className="about-section-label">
            <span>04</span>
            POURQUOI NOVA
          </div>

          <div className="about-reassurance-inner">

            <div className="reassurance-grid">

              <div>

                <h2>
                  Une expérience
                  <br />
                  <span>pensée pour durer.</span>
                </h2>

              </div>

              <div>

                <p>
                  Nous ne voulons pas simplement vous livrer un site et
                  disparaître.
                </p>

                <p>
                  Notre objectif est de construire une relation durable autour
                  de votre présence digitale, avec des services capables
                  d'évoluer avec votre entreprise.
                </p>

                <p>
                  Plus votre activité grandit, plus votre environnement
                  numérique doit pouvoir suivre.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =========================================================
            VALEURS
        ========================================================= */}

        <div className="about-reassurance about-reassurance-values">

          <div className="about-section-label">
            <span>05</span>
            NOS PRINCIPES
          </div>

          <div className="about-reassurance-inner">

            <div className="reassurance-grid">

              <div>

                <h2>
                  Simple.
                  <br />
                  <span>Premium. Efficace.</span>
                </h2>

              </div>

              <div>

                <p>
                  Nous privilégions la clarté plutôt que la complexité.
                </p>

                <p>
                  Une interface doit être agréable à regarder, mais surtout
                  simple à comprendre et à utiliser.
                </p>

                <p>
                  Derrière cette simplicité, nous construisons une technologie
                  solide et une infrastructure capable d'accompagner votre
                  croissance.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="about-final">

        <div>

          <span>
            VOTRE PROCHAINE ÉTAPE
          </span>

          <h2>
            Construisons votre
            <br />
            <strong>présence digitale.</strong>
          </h2>

          <p>
            Un site internet, un domaine, un hébergement ou simplement une
            idée ? NOVA vous accompagne pour construire la suite.
          </p>

        </div>

        <Link href="/contact">
          Parlons de votre projet
        </Link>

      </section>

    </main>
  );
}