import Link from "next/link";
import styles from "./page.module.css";

const essentials = [
  "Structure du site et navigation",
  "Header, footer et menu mobile",
  "Responsive ordinateur, tablette et téléphone",
  "Design professionnel",
  "Couleurs, typographies, boutons, sections et icônes",
  "Formulaire de contact",
  "SEO de base : Title, meta description, H1, H2, H3 et URLs propres",
  "Sitemap XML, robots.txt et canonical",
  "Favicon, balises alt et optimisation des images",
  "Open Graph et Twitter Card si besoin",
  "Vérification de l’indexabilité",
  "Connexion Search Console et soumission du sitemap",
  "Vérification HTTPS et redirections simples si besoin",
  "Page 404",
  "Connexion du domaine, DNS et SSL",
  "Déploiement et mise en ligne",
  "Tests mobile, desktop, formulaire et liens",
  "1 série de révisions",
];

const premium = [
  "Tout ce qui est inclus dans Essentiel",
  "Recherche visuelle et direction artistique",
  "Univers graphique, palette et typographies premium",
  "Maquette personnalisée",
  "Design unique",
  "Parcours utilisateur et UX / UI travaillé",
  "Appels à l’action et sections stratégiques",
  "Navigation optimisée et expérience mobile avancée",
  "Apparitions, scroll animations, hover effects et transitions",
  "Micro-interactions et effets visuels légers",
  "Recherche des mots-clés principaux",
  "Optimisation SEO page par page",
  "Maillage interne et optimisation des contenus existants",
  "Données structurées si pertinentes",
  "SEO local",
  "Pages services optimisées",
  "Optimisation vitesse, Core Web Vitals et chargement",
  "Compression des images et lazy loading",
  "Échanges réguliers, conseils et ajustements",
  "Optimisation avant livraison",
  "2 séries de révisions",
];

const custom = [
  "Tout ce qui est inclus dans Premium",
  "Application web",
  "Dashboard",
  "Espace administrateur ou espace client",
  "Authentification et création de comptes",
  "Réinitialisation de mot de passe",
  "Gestion des utilisateurs et rôles",
  "Base de données et Supabase",
  "API personnalisée et webhooks",
  "Automatisations",
  "Emails automatiques et notifications",
  "Réservation et agenda",
  "Paiement Stripe",
  "Boutique, panier et commandes",
  "Facturation et catalogue dynamique",
  "Architecture évolutive",
  "Routes protégées et sécurité serveur",
  "Gestion des clés API, secrets et variables d’environnement",
  "Validation des formulaires et gestion des erreurs",
  "Audit SEO et architecture SEO complète",
  "Recherche de mots-clés approfondie",
  "Pages locales, villes ciblées et cocon sémantique",
  "Maillage avancé et données structurées Schema.org",
  "FAQ SEO et breadcrumb",
  "Redirections 301 et nettoyage des erreurs 404",
  "Optimisation performances et accessibilité",
  "Indexation complète et suivi technique",
  "Search Console et Bing Webmaster si souhaité",
  "Analyse des performances",
];

const otherServices = [
  {
    number: "01",
    title: "Identité visuelle",
    items: [
      "Création de logo",
      "Refonte de logo",
      "Charte graphique",
      "Palette de couleurs",
      "Typographies",
      "Icônes personnalisées",
    ],
  },
  {
    number: "02",
    title: "Supports de communication",
    items: [
      "Flyers",
      "Affiches",
      "Cartes de visite",
      "Menus",
      "Brochures",
      "Visuels Instagram",
      "Bannières Facebook",
      "Visuels pour les réseaux sociaux",
    ],
  },
  {
    number: "03",
    title: "Communication véhicule",
    items: [
      "Stickers et autocollants",
      "Marquage véhicule",
      "Camionnette",
      "Camion",
      "Vitres",
      "Portières",
      "Capot",
      "Arrière du véhicule",
      "Fichiers HD pour imprimeur",
    ],
  },
  {
    number: "04",
    title: "Contenu & images",
    items: [
      "Présentation d’entreprise",
      "Slogans",
      "Textes de services",
      "Fiches produits",
      "FAQ",
      "Articles",
      "Textes SEO",
      "Pages locales",
      "Retouches photos",
      "Détourage",
      "Mockups",
      "Optimisation et compression",
      "Conversion WebP",
    ],
  },
  {
    number: "05",
    title: "Vidéo & réseaux",
    items: [
      "Montage vidéo",
      "Format TikTok",
      "Format Instagram",
      "Format Facebook",
      "Formats horizontal et vertical",
      "Sous-titres",
      "Musique",
      "Transitions",
      "Motion design",
    ],
  },
  {
    number: "06",
    title: "Intégrations & services",
    items: [
      "Stripe",
      "Supabase",
      "Resend",
      "Google Maps",
      "Google Calendar",
      "OpenAI",
      "Systèmes de réservation",
      "CRM",
      "Newsletter",
      "Analytics",
      "Autres API nécessaires au projet",
    ],
  },
];

function CheckList({
  items,
  accent = "blue",
}: {
  items: string[];
  accent?: "blue" | "violet" | "white";
}) {
  return (
    <ul className={`${styles["tarifs-list"]} ${styles[`tarifs-list-${accent}`]}`}>
      {items.map((item) => (
        <li key={item}>
          <span className={styles["tarifs-check"]} aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TarifsPage() {
  return (
    <main className={styles["tarifs-page"]}>


      <section className={styles["tarifs-hero"]}>
        <div className={styles["tarifs-container"]}>
          <p className={styles["tarifs-eyebrow"]}>Tarifs & ce qui est inclus</p>
          <h1>
            Un projet clair.
            <br />
            <span>Une offre adaptée.</span>
          </h1>
          <p>
            Le prix dépend du nombre de pages, de leur complexité, du design,
            des fonctionnalités et des besoins du projet. Les fourchettes
            ci-dessous donnent un cadre clair avant d’établir le devis.
          </p>
        </div>
      </section>

      <section className={styles["tarifs-section"]} aria-labelledby="formules-title">
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-pricing-grid"]}>
            <article className={styles["tarifs-card"]}>
              <div className={styles["tarifs-card-top"]}>
                <span>01 — Essentiel</span>
                <span>Site vitrine</span>
              </div>
              <h2>Essentiel</h2>
              <div className={styles["tarifs-price"]}>300 € → 800 €</div>
              <p className={styles["tarifs-card-description"]}>
                Pour un site vitrine professionnel, clair et responsive.
              </p>
              <div className={styles["tarifs-divider"]} />
              <p className={styles["tarifs-included"]}>Inclus</p>
              <ul className={styles["pricing-card-summary"]}>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Site web personnalisé</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Design professionnel</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Adapté à tous les écrans</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Formulaire de contact</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>SEO de base</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Mise en ligne</span></li>
              </ul>
              <details className={styles["pricing-card-details"]}>
                <summary>Voir tout ce qui est inclus</summary>
                <CheckList items={essentials} accent="white" />
              </details>
              <div className={styles["tarifs-card-footer"]}>
                <p className={styles["tarifs-note"]}>
                  Le tarif évolue selon le nombre et la complexité des pages.
                </p>
              </div>
            </article>

            <article className={`${styles["tarifs-card"]} ${styles["tarifs-card-violet"]}`}>
              <div className={styles["tarifs-card-top"]}>
                <span>02 — Premium</span>
                <span>Image haut de gamme</span>
              </div>
              <h2>Premium</h2>
              <div className={styles["tarifs-price"]}>600 € → 1 200 €</div>
              <p className={styles["tarifs-card-description"]}>
                Pour une présence plus travaillée, plus personnalisée et plus
                poussée.
              </p>
              <div className={styles["tarifs-divider"]} />
              <p className={styles["tarifs-included"]}>Inclus</p>
              <ul className={styles["pricing-card-summary"]}>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Site web sur mesure</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Direction artistique</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Design unique</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>UX / UI travaillé</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Animations et effets</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>SEO approfondi</span></li>
              </ul>
              <details className={styles["pricing-card-details"]}>
                <summary>Voir tout ce qui est inclus</summary>
                <CheckList items={premium} accent="violet" />
              </details>
              <div className={styles["tarifs-card-footer"]}>
                <p className={styles["tarifs-note"]}>
                  Le tarif dépend notamment du nombre de pages et du niveau de
                  personnalisation.
                </p>
              </div>
            </article>

            <article className={`${styles["tarifs-card"]} ${styles["tarifs-card-custom"]}`}>
              <div className={styles["tarifs-card-top"]}>
                <span>03 — Sur mesure</span>
                <span>Projet spécifique</span>
              </div>
              <h2>Sur mesure</h2>
              <div className={styles["tarifs-price"]}>1 200 € → 2 100 €+</div>
              <p className={styles["tarifs-card-description"]}>
                Pour les projets nécessitant un développement et des
                fonctionnalités spécifiques.
              </p>
              <div className={styles["tarifs-divider"]} />
              <p className={styles["tarifs-included"]}>Peut inclure selon le projet</p>
              <ul className={styles["pricing-card-summary"]}>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Fonctionnalités personnalisées</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Espace client ou administrateur</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Paiement ou réservation</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Connexions avec vos outils</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Développement spécifique</span></li>
                <li><span className={styles["pricing-card-summary-dot"]} aria-hidden="true" /><span>Accompagnement de A à Z</span></li>
              </ul>
              <details className={styles["pricing-card-details"]}>
                <summary>Voir les possibilités du sur mesure</summary>
                <CheckList items={custom} accent="blue" />
              </details>
              <div className={styles["tarifs-card-footer"]}>
                <p className={styles["tarifs-note"]}>
                  Le prix final est établi à partir du cahier des charges.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles["tarifs-section"]} aria-labelledby="autres-services-title">
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-section-heading"]}>
            <div>
              <p className={styles["tarifs-section-label"]}>Au-delà du site</p>
              <h2 id="autres-services-title">
                Tout ce qu’il faut pour construire
                <span> votre image.</span>
              </h2>
            </div>
            <p>
              Les créations graphiques, supports de communication, contenus,
              vidéos et prestations complémentaires sont traités séparément
              selon les besoins du projet.
            </p>
          </div>

          <div className={styles["tarifs-extra-grid"]}>
            {otherServices.map((service) => (
              <article className={styles["tarifs-extra-card"]} key={service.number}>
                <span className={styles["tarifs-extra-number"]}>{service.number}</span>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["tarifs-section"]} aria-labelledby="seo-title">
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-section-heading"]}>
            <div>
              <p className={styles["tarifs-section-label"]}>Référencement</p>
              <h2 id="seo-title">
                Un SEO travaillé,
                <span> sans promesse artificielle.</span>
              </h2>
            </div>
            <p>
              Le niveau de référencement dépend de la formule et du projet.
              L’objectif est de préparer et optimiser le site techniquement,
              sans promettre une position précise dans Google.
            </p>
          </div>

          <div className={styles["tarifs-info-grid"]}>
            <article className={styles["tarifs-info-card"]}>
              <h3>SEO technique</h3>
              <p>
                Titles, meta descriptions, H1/H2/H3, URLs optimisées, liens
                internes, alt images, compression WebP, canonical, Open Graph,
                sitemap XML, robots.txt, HTTPS, responsive, performance,
                lazy loading et balises sémantiques.
              </p>
            </article>

            <article className={styles["tarifs-info-card"]}>
              <h3>Google</h3>
              <p>
                Google Search Console, vérification de propriété, soumission du
                sitemap, demande d’indexation, vérification de couverture,
                correction des erreurs et analyse des performances selon le
                projet.
              </p>
            </article>

            <article className={styles["tarifs-info-card"]}>
              <h3>SEO local</h3>
              <p>
                Google Business Profile, adresse, téléphone, horaires, carte
                Google Maps, zones desservies, pages locales et cohérence des
                informations lorsque le référencement local est nécessaire.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles["tarifs-section"]} aria-labelledby="securite-title">
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-section-heading"]}>
            <div>
              <p className={styles["tarifs-section-label"]}>Technique</p>
              <h2 id="securite-title">
                Mise en ligne,
                <span> sécurité et intégrations.</span>
              </h2>
            </div>
            <p>
              Les besoins techniques sont pris en compte dans le chiffrage du
              projet : hébergement, domaine, services externes, sécurité,
              tests et fonctionnalités.
            </p>
          </div>

          <div className={styles["tarifs-info-grid"]}>
            <article className={styles["tarifs-info-card"]}>
              <h3>Sécurité</h3>
              <p>
                HTTPS, SSL, variables d’environnement, protection des clés API,
                validation des formulaires, protection anti-spam si nécessaire,
                routes protégées, authentification sécurisée, permissions,
                gestion des erreurs et sauvegardes si elles sont prévues.
              </p>
            </article>

            <article className={styles["tarifs-info-card"]}>
              <h3>Tests avant livraison</h3>
              <p>
                Vérifications ordinateur, mobile et tablette, boutons, liens,
                formulaires, emails, paiement ou réservation lorsqu’ils sont
                présents, menu, footer, réseaux sociaux et éléments SEO.
              </p>
            </article>

            <article className={styles["tarifs-info-card"]}>
              <h3>Services externes</h3>
              <p>
                Stripe, Supabase, Resend, Google Maps, Google Calendar, OpenAI,
                réservation, CRM, newsletter, analytics ou autres API selon le
                projet. Les éventuels abonnements et coûts d’utilisation de ces
                services sont distincts du développement.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles["tarifs-section"]} aria-labelledby="care-title">
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-care"]}>
            <div className={styles["tarifs-care-content"]}>
              <span className={styles["tarifs-care-price"]}>NOVA CARE — 30 €/mois</span>
              <h2 id="care-title">Le site continue d’être accompagné après livraison.</h2>
              <p>
                Disponible pour les clients Premium et Sur mesure après
                livraison. Environ 1 heure de petites interventions par mois.
              </p>
              <ul className={styles["tarifs-care-list"]}>
                <li>Modification de textes</li>
                <li>Changement d’images</li>
                <li>Petites corrections</li>
                <li>Mise à jour de contenu</li>
                <li>Ajustement des horaires</li>
                <li>Modification des coordonnées</li>
                <li>Ajout d’une petite section</li>
                <li>Support technique</li>
                <li>Conseils</li>
                <li>Vérifications du site</li>
              </ul>
              <p>
                Les nouvelles pages, refontes, nouvelles fonctionnalités, API,
                boutique, dashboard, vidéo, flyer, logo ou marquage véhicule
                font l’objet d’un nouveau devis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles["tarifs-section"]} aria-labelledby="frais-title">
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-section-heading"]}>
            <div>
              <p className={styles["tarifs-section-label"]}>Transparence</p>
              <h2 id="frais-title">
                Votre projet,
                <span> sans zone floue.</span>
              </h2>
            </div>
            <p>
              NOVA distingue le travail de création des éventuels frais
              facturés directement par des fournisseurs externes.
            </p>
          </div>

          <div className={styles["tarifs-info-grid"]}>
            <article className={styles["tarifs-info-card"]}>
              <h3>Ce que NOVA réalise</h3>
              <p>
                Design, développement, configuration, DNS, SSL, déploiement,
                mise en ligne, intégrations, tests et accompagnement selon la
                formule et le périmètre du projet.
              </p>
            </article>

            <article className={styles["tarifs-info-card"]}>
              <h3>Frais externes</h3>
              <p>
                Nom de domaine, hébergement, emails professionnels, API,
                outils externes ou services avec abonnement ou coût à
                l’utilisation ne sont pas automatiquement inclus dans le
                développement.
              </p>
            </article>

            <article className={styles["tarifs-info-card"]}>
              <h3>Révisions</h3>
              <p>
                Essentiel : 1 série. Premium : 2 séries. Sur mesure : selon le
                devis. Une modification complète du projet après validation
                peut nécessiter un supplément.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles["tarifs-bottom"]}>
        <div className={styles["tarifs-container"]}>
          <div className={styles["tarifs-bottom-inner"]}>
            <div>
              <h2>Un projet en tête ?</h2>
              <p>
                Décrivez-nous ce que vous souhaitez créer et nous définirons
                ensemble le périmètre du projet.
              </p>
            </div>
            <Link className={styles["tarifs-cta"]} href="/devis">
              Demander un devis ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
