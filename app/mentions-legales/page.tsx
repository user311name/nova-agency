import "./page.css";

export default function MentionsLegalesPage() {
  return (
    <main className="legal-page">

      <div className="legal-container">

        <header className="legal-header">
          <span className="legal-eyebrow">
            NOVA — INFORMATIONS LÉGALES
          </span>

          <h1>
            Mentions légales
          </h1>

          <p>
            Les présentes mentions légales ont pour objectif de présenter
            de manière claire et transparente les informations relatives
            à l’utilisation du site internet de NOVA.
          </p>
        </header>


        <div className="legal-content">

          <section className="legal-section">
            <span className="legal-number">01</span>

            <div>
              <h2>Éditeur du site</h2>

              <p>
                Le présent site internet est édité par <strong>NOVA</strong>,
                agence spécialisée dans la conception, la création et
                l’optimisation de sites internet et d’expériences digitales
                sur mesure.
              </p>

              <div className="legal-card">
                <p>
                  <strong>Nom commercial :</strong> NOVA
                </p>

                <p>
                  <strong>Activité :</strong> Création et conception de sites web
                </p>

                <p>
                  <strong>Contact :</strong> via la page Contact du site
                </p>
              </div>
            </div>
          </section>


          <section className="legal-section">
            <span className="legal-number">02</span>

            <div>
              <h2>Hébergement du site</h2>

              <p>
                Le site internet de NOVA est hébergé par
                <strong> Vercel Inc.</strong>, plateforme spécialisée dans
                l’hébergement et le déploiement d’applications web.
              </p>

              <p>
                Le nom de domaine utilisé par NOVA est enregistré et géré
                auprès de <strong>OVHcloud</strong>.
              </p>
            </div>
          </section>


          <section className="legal-section">
            <span className="legal-number">03</span>

            <div>
              <h2>Propriété intellectuelle</h2>

              <p>
                L’ensemble des éléments présents sur ce site, notamment les
                textes, contenus graphiques, éléments visuels, photographies,
                illustrations, logos, interfaces, éléments de design et
                composants techniques, est protégé par les dispositions
                applicables en matière de propriété intellectuelle.
              </p>

              <p>
                Sauf indication contraire, ces éléments sont la propriété de
                NOVA ou sont utilisés avec l’autorisation de leurs titulaires
                respectifs.
              </p>

              <p>
                Toute reproduction, représentation, modification, adaptation,
                distribution ou exploitation, totale ou partielle, de ces
                éléments sans autorisation préalable est susceptible de
                constituer une atteinte aux droits de leur titulaire.
              </p>
            </div>
          </section>


          <section className="legal-section">
            <span className="legal-number">04</span>

            <div>
              <h2>Responsabilité</h2>

              <p>
                NOVA s’efforce de maintenir sur son site des informations
                exactes, accessibles et régulièrement mises à jour.
                Toutefois, aucune garantie ne peut être donnée quant à
                l’exhaustivité ou à l’absence d’erreurs dans les contenus
                publiés.
              </p>

              <p>
                NOVA ne saurait être tenue responsable des dommages directs
                ou indirects pouvant résulter de l’utilisation du site,
                de son contenu ou de l’impossibilité temporaire d’y accéder.
              </p>

              <p>
                NOVA se réserve également le droit de modifier, suspendre
                ou interrompre tout ou partie du site, notamment pour des
                opérations de maintenance ou d’évolution technique.
              </p>
            </div>
          </section>


          <section className="legal-section">
            <span className="legal-number">05</span>

            <div>
              <h2>Données personnelles</h2>

              <p>
                Lorsque vous utilisez les formulaires de contact proposés
                sur le site, certaines informations peuvent être communiquées
                volontairement afin de permettre à NOVA de répondre à votre
                demande.
              </p>

              <p>
                Les informations transmises sont utilisées uniquement dans
                le cadre de la relation avec le visiteur et du traitement
                de sa demande.
              </p>

              <p>
                NOVA s’engage à ne pas utiliser les données communiquées à
                des fins incompatibles avec la demande initiale.
              </p>

              <p>
                Pour toute question concernant l’utilisation de vos données
                personnelles, vous pouvez contacter NOVA via la page
                <a href="/contact"> Contact</a>.
              </p>
            </div>
          </section>


          <section className="legal-section">
            <span className="legal-number">06</span>

            <div>
              <h2>Liens externes</h2>

              <p>
                Le site peut contenir des liens permettant d’accéder à des
                sites ou services externes.
              </p>

              <p>
                NOVA ne contrôle pas ces sites tiers et ne peut être tenue
                responsable de leur contenu, de leur disponibilité ou de
                leurs propres pratiques en matière de protection des données.
              </p>
            </div>
          </section>


          <section className="legal-section">
            <span className="legal-number">07</span>

            <div>
              <h2>Évolution des mentions légales</h2>

              <p>
                Les présentes mentions légales peuvent être modifiées ou
                mises à jour à tout moment afin de tenir compte de l’évolution
                du site, de l’activité de NOVA ou de la réglementation
                applicable.
              </p>

              <p>
                La version publiée sur cette page est celle qui est
                applicable au moment de la consultation du site.
              </p>
            </div>
          </section>


          <div className="legal-footer-note">
            <span>NOVA</span>

            <p>
              Une présence digitale pensée pour donner une image claire,
              moderne et professionnelle de votre activité.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}