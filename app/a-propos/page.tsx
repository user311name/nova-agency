import Link from "next/link";
import "./page.css";

export default function AboutPage() {
  return (
    <main className="about-page">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-tag">
            <span>●</span>
            À PROPOS DE NOVA
          </p>

          <h1>
            Une agence digitale
            <br />
            pensée pour <span>vous.</span>
          </h1>

          <p className="about-intro">
            Chez NOVA, nous pensons qu’un site internet ne doit pas
            simplement être beau. Il doit représenter votre activité,
            rassurer vos visiteurs et vous aider à développer votre présence
            en ligne.
          </p>

          <div className="about-hero-reassurance">

            <div>
              <span>01</span>
              <strong>Sur mesure</strong>
            </div>

            <div>
              <span>02</span>
              <strong>Approche humaine</strong>
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
          QUI EST NOVA
      ========================================================= */}

      <section className="about-vision">

        <div className="about-section-label">
          <span>01</span>
          QUI SOMMES-NOUS ?
        </div>

        <div className="about-vision-grid">

          <div>

            <p className="about-kicker">
              L’AGENCE
            </p>

            <h2>
              Plus qu’un site,
              <br />
              une présence <span>digitale.</span>
            </h2>

          </div>

          <div className="about-copy">

            <p>
              NOVA accompagne les entreprises dans la création de sites
              internet modernes, professionnels et adaptés à leur activité.
            </p>

            <p>
              Nous partons d’une idée simple : chaque entreprise est
              différente. Son histoire, son image, ses clients et ses
              objectifs doivent donc être pris en compte avant de construire
              sa présence en ligne.
            </p>

            <p>
              Notre rôle est de transformer ces éléments en une expérience
              digitale claire, cohérente et professionnelle.
            </p>

            <p>
              Le but n’est pas simplement de créer un site. Le but est de
              créer un outil qui donne confiance et qui représente réellement
              votre activité.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          COMMENT NOUS TRAVAILLONS
      ========================================================= */}

      <section className="about-approach">

        <div className="about-approach-inner">

          <div className="about-section-label">
            <span>02</span>
            NOTRE FAÇON DE TRAVAILLER
          </div>

          <div className="about-approach-grid">

            <div className="about-approach-heading">

              <h2>
                Un projet se construit
                <br />
                <span>ensemble.</span>
              </h2>

              <p>
                Avant de penser au design ou aux fonctionnalités, nous
                cherchons d’abord à comprendre votre activité et ce que vous
                souhaitez transmettre à vos futurs clients.
              </p>

            </div>


            <div className="about-approach-list">

              <div className="approach-item">

                <span>01</span>

                <div>
                  <h3>Échanger</h3>

                  <p>
                    Nous commençons par discuter de votre activité, de vos
                    besoins et de vos objectifs afin de comprendre réellement
                    votre projet.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>02</span>

                <div>
                  <h3>Réfléchir</h3>

                  <p>
                    Nous définissons ensuite une direction adaptée à votre
                    image, votre clientèle et au message que vous souhaitez
                    transmettre.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>03</span>

                <div>
                  <h3>Créer</h3>

                  <p>
                    Le site est construit sur mesure avec une attention
                    particulière portée au design, à la clarté et à
                    l’expérience utilisateur.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>04</span>

                <div>
                  <h3>Échanger à nouveau</h3>

                  <p>
                    Votre retour fait partie du projet. L’objectif est
                    d’arriver à une version qui correspond réellement à
                    votre activité et à vos attentes.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>05</span>

                <div>
                  <h3>Mettre en ligne</h3>

                  <p>
                    Une fois le projet finalisé, nous vous accompagnons dans
                    sa mise en ligne et les éléments nécessaires à votre
                    présence digitale.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CE QUE LE CLIENT PEUT ATTENDRE
      ========================================================= */}

      <section className="about-values">

        <div className="about-section-label">
          <span>03</span>
          CE QUE NOUS VOULONS VOUS APPORTER
        </div>

        <div className="about-values-heading">

          <h2>
            Une relation simple,
            <br />
            <span>un projet clair.</span>
          </h2>

          <p>
            Créer un site est une chose. Savoir avec qui on travaille et
            comprendre ce qui est réalisé en est une autre.
          </p>

        </div>


        <div className="values-grid">

          <div className="value-card">

            <span>01</span>

            <div>

              <h3>Écoute</h3>

              <p>
                Votre projet commence par vos besoins. Nous prenons le temps
                de comprendre votre activité avant de proposer une direction.
              </p>

            </div>

          </div>


          <div className="value-card">

            <span>02</span>

            <div>

              <h3>Transparence</h3>

              <p>
                Les fonctionnalités, les éléments prévus et les différentes
                étapes du projet sont définis clairement.
              </p>

            </div>

          </div>


          <div className="value-card">

            <span>03</span>

            <div>

              <h3>Sur mesure</h3>

              <p>
                Nous ne cherchons pas à appliquer la même solution à toutes
                les entreprises. Le projet est construit autour de votre
                activité.
              </p>

            </div>

          </div>


          <div className="value-card">

            <span>04</span>

            <div>

              <h3>Responsive</h3>

              <p>
                Votre site doit fonctionner correctement sur ordinateur,
                tablette et téléphone afin d’offrir une expérience cohérente
                à vos visiteurs.
              </p>

            </div>

          </div>


          <div className="value-card">

            <span>05</span>

            <div>

              <h3>Communication</h3>

              <p>
                Nous accordons de l’importance aux échanges pendant le
                projet afin que vous sachiez où en est la création.
              </p>

            </div>

          </div>


          <div className="value-card">

            <span>06</span>

            <div>

              <h3>Accompagnement</h3>

              <p>
                La mise en ligne n’est pas forcément la fin. Selon vos
                besoins, votre présence digitale peut continuer à évoluer.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          VISION GLOBALE
      ========================================================= */}

      <section className="about-approach about-global">

        <div className="about-approach-inner">

          <div className="about-section-label">
            <span>04</span>
            UNE PRÉSENCE DIGITALE COMPLÈTE
          </div>

          <div className="about-approach-grid">

            <div className="about-approach-heading">

              <h2>
                Aller plus loin
                <br />
                qu’un <span>simple site.</span>
              </h2>

              <p>
                Votre site constitue souvent le premier contact entre votre
                entreprise et un futur client. C’est pourquoi nous pensons
                votre présence digitale dans son ensemble.
              </p>

            </div>


            <div className="about-approach-list">

              <div className="approach-item">

                <span>01</span>

                <div>
                  <h3>Votre image</h3>

                  <p>
                    Une direction visuelle cohérente permet de transmettre
                    immédiatement une image professionnelle et sérieuse.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>02</span>

                <div>
                  <h3>Votre site</h3>

                  <p>
                    Une structure claire et une expérience adaptée permettent
                    à vos visiteurs de comprendre rapidement votre activité.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>03</span>

                <div>
                  <h3>Votre présence en ligne</h3>

                  <p>
                    Domaine, adresse e-mail professionnelle et autres éléments
                    peuvent être intégrés au projet selon vos besoins.
                  </p>
                </div>

              </div>


              <div className="approach-item">

                <span>04</span>

                <div>
                  <h3>Votre évolution</h3>

                  <p>
                    Votre entreprise évolue. Votre présence digitale peut
                    donc elle aussi être améliorée, enrichie ou adaptée au
                    fil du temps.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          RASSURANCE
      ========================================================= */}

      <section className="about-reassurance">

        <div className="about-reassurance-inner">

          <div className="about-section-label">
            <span>05</span>
            NOTRE ENGAGEMENT
          </div>

          <div className="reassurance-grid">

            <div>

              <h2>
                Vous n’avez pas besoin
                <br />
                de tout <span>connaître.</span>
              </h2>

            </div>

            <div>

              <p>
                Vous n’avez pas besoin de maîtriser le développement web,
                l’hébergement ou les aspects techniques pour lancer votre
                projet.
              </p>

              <p>
                Notre rôle est justement de rendre ces étapes plus simples
                pour vous, tout en vous expliquant clairement ce qui est mis
                en place.
              </p>

              <p>
                Vous restez impliqué dans les décisions importantes et nous
                nous occupons de transformer ces décisions en une présence
                digitale concrète.
              </p>

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
            UN PROJET EN TÊTE ?
          </span>

          <h2>
            Parlons de votre projet
            <br />
            et construisons <strong>quelque chose de solide.</strong>
          </h2>

          <p>
            Vous avez déjà une idée précise ou vous ne savez pas encore
            exactement ce qu’il vous faut ? Échangeons simplement sur votre
            activité et voyons ensemble ce qui peut être créé.
          </p>

        </div>

        <Link href="/contact">
          Parler de mon projet →
        </Link>

      </section>

    </main>
  );
}