import Image from "next/image";
import Link from "next/link";
import "./page.css";

/* =========================================================
   ICONES
========================================================= */

function ComputerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10 5h4M11 18.5h2" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 5 13h6l-1 9 9-13h-6l0-7Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V5M4 19h17" />
      <path d="m7 15 4-4 3 2 6-7" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

/* =========================================================
   FLECHE HORIZONTALE SVG
========================================================= */

function ArrowIcon() {
  return (
    <svg
      className="arrow-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/* =========================================================
   FLECHE DIAGONALE SVG
========================================================= */

function ExternalArrowIcon() {
  return (
    <svg
      className="external-arrow-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

/* =========================================================
   BOUTON AVEC FLECHE
========================================================= */

function ArrowLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link href={href} className={`arrow-button ${variant}`}>
      <span>{children}</span>

      <span className="arrow-button-icon" aria-hidden="true">
        <ArrowIcon />
      </span>
    </Link>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  return (
    <main className="home">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero page-section">
        <div className="hero-grid container">

          <div className="hero-copy">

            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Agence digitale indépendante
            </div>

            <h1>
              Votre image.
              <br />
              <span>Notre terrain.</span>
            </h1>

            <p className="hero-description">
              Nous créons des expériences digitales modernes, rapides et
              pensées pour donner à votre entreprise une vraie présence en
              ligne.
            </p>

            <div className="hero-actions">
              <ArrowLink href="/devis">
                Démarrer un projet
              </ArrowLink>

              <ArrowLink href="/realisations" variant="secondary">
                Voir nos réalisations
              </ArrowLink>
            </div>

            <div className="hero-meta">

              <div>
                <span className="icon-blue">
                  <ComputerIcon />
                </span>
                <span>WEB DESIGN</span>
              </div>

              <div>
                <span className="icon-blue">
                  <CodeIcon />
                </span>
                <span>DÉVELOPPEMENT</span>
              </div>

              <div>
                <span className="icon-blue">
                  <PhoneIcon />
                </span>
                <span>MOBILE FIRST</span>
              </div>

            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">

            <div className="visual-grid" />

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="visual-core">
              <span>N</span>
              <div className="core-ring" />
            </div>

            <div className="floating-card floating-card-one">
              <span className="floating-icon">
                <ComputerIcon />
              </span>

              <span>
                <small>01</small>
                DESIGN
              </span>
            </div>

            <div className="floating-card floating-card-two">
              <span className="floating-icon">
                <CodeIcon />
              </span>

              <span>
                <small>02</small>
                CODE
              </span>
            </div>

            <div className="floating-card floating-card-three">
              <span className="floating-icon">
                <BoltIcon />
              </span>

              <span>
                <small>03</small>
                IMPACT
              </span>
            </div>

            <div className="visual-caption">
              <span>CRAFTED FOR DIGITAL</span>
              <span>2026</span>
            </div>

          </div>
        </div>

        <div className="hero-scroll">
          <span className="scroll-line" />
          <span>SCROLL POUR EXPLORER</span>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="intro page-section">
        <div className="container intro-grid">

          <div className="section-index">
            <span>01</span>
            <span className="blue-line" />
            <span>VISION</span>
          </div>

          <div className="intro-content">

            <p className="micro-label">
              Plus qu'un site web
            </p>

            <h2>
              Une présence digitale
              <br />
              qui <span>se remarque.</span>
            </h2>

            <p>
              Votre site est souvent le premier contact entre votre marque et
              vos futurs clients. Chez NOVA, nous travaillons chaque détail
              pour transformer ce premier contact en véritable expérience.
            </p>

            <div className="intro-points">

              <div>
                <span className="point-number">01</span>

                <div>
                  <strong>Une image premium</strong>
                  <span>
                    Une identité digitale cohérente et mémorable.
                  </span>
                </div>
              </div>

              <div>
                <span className="point-number">02</span>

                <div>
                  <strong>Pensé pour convertir</strong>
                  <span>
                    Des parcours simples qui guident vos visiteurs.
                  </span>
                </div>
              </div>

              <div>
                <span className="point-number">03</span>

                <div>
                  <strong>100 % sur mesure</strong>
                  <span>
                    Pas de template générique. Votre projet, votre univers.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="services page-section">
        <div className="container">

          <div className="section-heading">

            <div>
              <p className="micro-label">
                Ce que nous faisons
              </p>

              <h2 className="section-title">
                Le digital,
                <br />
                <span>autrement.</span>
              </h2>
            </div>

            <p className="section-description">
              Design, développement et stratégie réunis dans une même
              direction artistique.
            </p>

          </div>

          <div className="services-grid">

            {/* SERVICE 01 */}

            <article className="service-card">

              <div className="card-top">
                <span className="card-number">01</span>

                <span className="card-icon">
                  <ComputerIcon />
                </span>
              </div>

              <div className="card-content">

                <p className="card-category">
                  CRÉATION DIGITALE
                </p>

                <h3>
                  Création de site
                </h3>

                <p>
                  Des sites vitrines modernes et rapides, conçus pour
                  présenter votre activité avec une image professionnelle.
                </p>

                <div className="tag-list">
                  <span>UX / UI</span>
                  <span>Responsive</span>
                  <span>SEO</span>
                </div>

              </div>

              <Link
                href="/services"
                className="card-arrow"
                aria-label="Découvrir la création de site"
              >
                <ArrowIcon />
              </Link>

              <div className="card-decoration">
                <span />
                <span />
                <span />
              </div>

            </article>

            {/* SERVICE 02 */}

            <article className="service-card service-card-featured">

              <div className="card-top">
                <span className="card-number">02</span>

                <span className="card-icon">
                  <LayersIcon />
                </span>
              </div>

              <div className="card-content">

                <p className="card-category">
                  REFONTE DIGITALE
                </p>

                <h3>
                  Refonte de site
                </h3>

                <p>
                  Nous transformons une présence vieillissante en une
                  expérience digitale actuelle, claire et performante.
                </p>

                <div className="tag-list">
                  <span>Direction artistique</span>
                  <span>UX</span>
                  <span>Performance</span>
                </div>

              </div>

              <Link
                href="/services"
                className="card-arrow"
                aria-label="Découvrir la refonte de site"
              >
                <ArrowIcon />
              </Link>

              <div className="card-decoration">
                <span />
                <span />
                <span />
              </div>

            </article>

            {/* SERVICE 03 */}

            <article className="service-card">

              <div className="card-top">
                <span className="card-number">03</span>

                <span className="card-icon">
                  <CodeIcon />
                </span>
              </div>

              <div className="card-content">

                <p className="card-category">
                  DÉVELOPPEMENT
                </p>

                <h3>
                  Sur mesure
                </h3>

                <p>
                  Une architecture propre et évolutive pour les projets qui
                  demandent plus qu'un simple site.
                </p>

                <div className="tag-list">
                  <span>Next.js</span>
                  <span>React</span>
                  <span>Performance</span>
                </div>

              </div>

              <Link
                href="/services"
                className="card-arrow"
                aria-label="Découvrir le développement sur mesure"
              >
                <ArrowIcon />
              </Link>

              <div className="card-decoration">
                <span />
                <span />
                <span />
              </div>

            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          PORTFOLIO
      ====================================================== */}

      <section className="portfolio page-section">
        <div className="container">

          <div className="section-heading portfolio-heading">

            <div>
              <p className="micro-label">
                Sélection de projets
              </p>

              <h2 className="section-title">
                Quelques projets.
                <br />
                <span>Beaucoup d'ambition.</span>
              </h2>
            </div>

            <ArrowLink href="/realisations" variant="secondary">
              Tout voir
            </ArrowLink>

          </div>

          <div className="portfolio-grid">

            {/* PROJET 01 */}

            <Link
              href="/realisations/noir-barber"
              className="portfolio-card portfolio-card-large"
            >

              <div className="portfolio-image">

                <Image
                  src="/projets/barber-home.png"
                  alt="Projet Noir Barber"
                  fill
                  sizes="(max-width: 700px) 100vw, 66vw"
                />

                <div className="portfolio-overlay">
                  <span>Voir le projet</span>

                  <strong>
                    <ExternalArrowIcon />
                  </strong>
                </div>

              </div>

              <div className="portfolio-info">

                <div>
                  <span>01 / SITE VITRINE</span>
                  <h3>Noir Barber</h3>
                </div>

                <span className="portfolio-arrow">
                  <ExternalArrowIcon />
                </span>

              </div>

            </Link>

            {/* PROJET 02 */}

            <Link
              href="/realisations/storm"
              className="portfolio-card"
            >

              <div className="portfolio-image">

                <Image
                  src="/projets/storm-1.png"
                  alt="Projet Storm"
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />

                <div className="portfolio-overlay">
                  <span>Voir le projet</span>

                  <strong>
                    <ExternalArrowIcon />
                  </strong>
                </div>

              </div>

              <div className="portfolio-info">

                <div>
                  <span>02 / DIGITAL</span>
                  <h3>Storm</h3>
                </div>

                <span className="portfolio-arrow">
                  <ExternalArrowIcon />
                </span>

              </div>

            </Link>

            {/* PROJET 03 */}

            <Link
              href="/realisations/ia-future"
              className="portfolio-card"
            >

              <div className="portfolio-image">

                <Image
                  src="/projets/site-ia.png"
                  alt="Projet IA Future"
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />

                <div className="portfolio-overlay">
                  <span>Voir le projet</span>

                  <strong>
                    <ExternalArrowIcon />
                  </strong>
                </div>

              </div>

              <div className="portfolio-info">

                <div>
                  <span>03 / TECHNOLOGIE</span>
                  <h3>IA Future</h3>
                </div>

                <span className="portfolio-arrow">
                  <ExternalArrowIcon />
                </span>

              </div>

            </Link>

          </div>
        </div>
      </section>

      {/* =====================================================
          FORMULES
      ====================================================== */}

      <section className="offers page-section">
        <div className="container">

          <div className="section-heading">

            <div>
              <p className="micro-label">
                Des formats adaptés
              </p>

              <h2 className="section-title">
                Choisissez votre
                <br />
                <span>niveau d'impact.</span>
              </h2>
            </div>

            <p className="section-description">
              Chaque projet est différent. Nous construisons une solution
              adaptée à vos objectifs et à votre activité.
            </p>

          </div>

          <div className="offers-grid">

            {/* OFFRE 01 */}

            <article className="offer-card">

              <div className="offer-number">
                01
              </div>

              <p className="offer-label">
                PRÉSENCE
              </p>

              <h3>
                Essentiel
              </h3>

              <p className="offer-description">
                Pour lancer ou moderniser votre présence en ligne avec
                l'essentiel, sans compromis sur l'image.
              </p>

              <ul>
                <li>Site vitrine</li>
                <li>Design responsive</li>
                <li>Optimisation mobile</li>
                <li>SEO de base</li>
              </ul>

              <Link
                href="/devis"
                className="offer-link"
              >
                <span>Parler du projet</span>

                <span
                  className="offer-link-arrow"
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </Link>

            </article>

            {/* OFFRE 02 */}

            <article className="offer-card offer-card-main">

              <div className="offer-badge">
                LE PLUS CHOISI
              </div>

              <div className="offer-number">
                02
              </div>

              <p className="offer-label">
                SIGNATURE
              </p>

              <h3>
                Premium
              </h3>

              <p className="offer-description">
                Une expérience plus poussée, avec davantage de travail sur
                l'identité, l'expérience et les détails.
              </p>

              <ul>
                <li>Direction artistique</li>
                <li>UX / UI sur mesure</li>
                <li>Animations</li>
                <li>SEO & performance</li>
              </ul>

              <Link
                href="/devis"
                className="offer-link"
              >
                <span>Parler du projet</span>

                <span
                  className="offer-link-arrow"
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </Link>

            </article>

            {/* OFFRE 03 */}

            <article className="offer-card">

              <div className="offer-number">
                03
              </div>

              <p className="offer-label">
                IMPACT
              </p>

              <h3>
                Sur mesure
              </h3>

              <p className="offer-description">
                Pour les projets qui nécessitent des fonctionnalités,
                interfaces ou expériences digitales spécifiques.
              </p>

              <ul>
                <li>Développement avancé</li>
                <li>Fonctionnalités spécifiques</li>
                <li>Architecture évolutive</li>
                <li>Accompagnement</li>
              </ul>

              <Link
                href="/devis"
                className="offer-link"
              >
                <span>Parler du projet</span>

                <span
                  className="offer-link-arrow"
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </Link>

            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          METHODE
      ====================================================== */}

      <section className="method page-section">
        <div className="container method-grid">

          <div className="method-intro">

            <p className="micro-label">
              Notre méthode
            </p>

            <h2 className="section-title">
              Simple dans
              <br />
              <span>l'approche.</span>
            </h2>

            <p>
              Pas de jargon inutile. Pas de processus compliqué. Nous avançons
              étape par étape avec une vision claire du résultat.
            </p>

            <ArrowLink href="/methode" variant="secondary">
              Découvrir notre méthode
            </ArrowLink>

          </div>

          <div className="method-list">

            {/* ETAPE 01 */}

            <div className="method-step">

              <div className="method-step-number">
                01
              </div>

              <div className="method-step-icon">
                <PhoneIcon />
              </div>

              <div>
                <p>ON ÉCHANGE</p>

                <h3>
                  Comprendre votre projet
                </h3>

                <span>
                  Vos objectifs, votre activité, vos clients et votre vision.
                </span>
              </div>

              <span
                className="method-arrow"
                aria-hidden="true"
              >
                <ArrowIcon />
              </span>

            </div>

            {/* ETAPE 02 */}

            <div className="method-step">

              <div className="method-step-number">
                02
              </div>

              <div className="method-step-icon">
                <LayersIcon />
              </div>

              <div>
                <p>ON IMAGINE</p>

                <h3>
                  Construire votre univers
                </h3>

                <span>
                  Structure, direction artistique et expérience utilisateur.
                </span>
              </div>

              <span
                className="method-arrow"
                aria-hidden="true"
              >
                <ArrowIcon />
              </span>

            </div>

            {/* ETAPE 03 */}

            <div className="method-step">

              <div className="method-step-number">
                03
              </div>

              <div className="method-step-icon">
                <CodeIcon />
              </div>

              <div>
                <p>ON DÉVELOPPE</p>

                <h3>
                  Donner vie au design
                </h3>

                <span>
                  Un développement propre, responsive et pensé pour durer.
                </span>
              </div>

              <span
                className="method-arrow"
                aria-hidden="true"
              >
                <ArrowIcon />
              </span>

            </div>

            {/* ETAPE 04 */}

            <div className="method-step">

              <div className="method-step-number">
                04
              </div>

              <div className="method-step-icon">
                <ChartIcon />
              </div>

              <div>
                <p>ON OPTIMISE</p>

                <h3>
                  Aller plus loin
                </h3>

                <span>
                  Performance, référencement et derniers détails avant la
                  mise en ligne.
                </span>
              </div>

              <span
                className="method-arrow"
                aria-hidden="true"
              >
                <ArrowIcon />
              </span>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section className="about page-section">
        <div className="container about-grid">

          <div className="about-visual">

            <div className="about-circle">
              <span>N</span>
            </div>

            <div className="about-orbit about-orbit-one" />
            <div className="about-orbit about-orbit-two" />

            <div className="about-code">
              <span>&lt;NOVA</span>
              <span>digital /&gt;</span>
            </div>

            <div className="about-status">
              <span />
              DISPONIBLE POUR DE NOUVEAUX PROJETS
            </div>

          </div>

          <div className="about-content">

            <p className="micro-label">
              À propos de NOVA
            </p>

            <h2 className="section-title">
              Petit studio.
              <br />
              <span>Grande ambition.</span>
            </h2>

            <p>
              NOVA est une agence digitale indépendante qui privilégie une
              approche simple : créer moins de bruit et plus d'impact.
            </p>

            <p>
              Chaque projet est pensé avec une attention particulière portée
              au design, à la performance et à l'expérience utilisateur.
            </p>

            <div className="about-stats">

              <div>
                <strong>100%</strong>
                <span>SUR MESURE</span>
              </div>

              <div>
                <strong>01</strong>
                <span>INTERLOCUTEUR</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>VOTRE PROJET EN LIGNE</span>
              </div>

            </div>

            <ArrowLink href="/a-propos" variant="secondary">
              Découvrir NOVA
            </ArrowLink>

          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="faq page-section">
        <div className="container faq-grid">

          <div>

            <p className="micro-label">
              Questions fréquentes
            </p>

            <h2 className="section-title">
              Vous avez une
              <br />
              <span>question ?</span>
            </h2>

            <p className="section-description">
              Voici quelques réponses aux questions que nous recevons le plus.
            </p>

            <ArrowLink href="/faq" variant="secondary">
              Voir toute la FAQ
            </ArrowLink>

          </div>

          <div className="faq-list">

            <details>
              <summary>
                <span>Combien coûte un site web ?</span>
                <b>+</b>
              </summary>

              <p>
                Le budget dépend du type de site, du nombre de pages, du niveau
                de personnalisation et des fonctionnalités souhaitées. Le plus
                simple est de nous présenter votre projet afin d'obtenir une
                estimation adaptée.
              </p>
            </details>

            <details>
              <summary>
                <span>
                  Combien de temps faut-il pour créer un site ?
                </span>
                <b>+</b>
              </summary>

              <p>
                La durée varie selon le projet. Un site vitrine peut être
                réalisé rapidement, tandis qu'un projet plus complexe demande
                davantage de conception, de développement et de tests.
              </p>
            </details>

            <details>
              <summary>
                <span>
                  Le site sera-t-il adapté au téléphone ?
                </span>
                <b>+</b>
              </summary>

              <p>
                Oui. Tous les projets sont pensés en responsive design et
                testés pour offrir une expérience confortable sur ordinateur,
                tablette et smartphone.
              </p>
            </details>

            <details>
              <summary>
                <span>
                  Pouvez-vous refaire un site existant ?
                </span>
                <b>+</b>
              </summary>

              <p>
                Oui. Nous pouvons repenser la structure, le design,
                l'expérience utilisateur et les performances d'un site
                existant.
              </p>
            </details>

            <details>
              <summary>
                <span>
                  Comment démarrer un projet ?
                </span>
                <b>+</b>
              </summary>

              <p>
                Il suffit de nous expliquer votre besoin. Nous échangeons
                ensuite sur vos objectifs et vous orientons vers la solution
                la plus pertinente.
              </p>
            </details>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="final-cta page-section">
        <div className="container">

          <div className="final-cta-inner">

            <div className="cta-decoration cta-decoration-one" />
            <div className="cta-decoration cta-decoration-two" />

            <p className="micro-label">
              Votre prochain projet
            </p>

            <h2>
              Faisons quelque chose
              <br />
              de <span>remarquable.</span>
            </h2>

            <p>
              Vous avez une idée, un projet ou simplement envie de faire
              évoluer votre présence en ligne ?
            </p>

            <ArrowLink href="/devis">
              Demander un devis
            </ArrowLink>

          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="home-footer">

        <div className="container home-footer-inner">

          <div>

            <Link
              href="/"
              className="footer-logo"
              aria-label="NOVA - Accueil"
            >
              <Image
                src="/logo-nova.png"
                alt="NOVA"
                width={140}
                height={52}
              />
            </Link>

            <p>
              Agence digitale indépendante.
              <br />
              Design, développement & performance.
            </p>

          </div>

          <div className="footer-links">

            <div>
              <span>EXPLORER</span>

              <Link href="/services">
                Services
              </Link>

              <Link href="/realisations">
                Réalisations
              </Link>

              <Link href="/methode">
                Méthode
              </Link>
            </div>

            <div>
              <span>CONTACT</span>

              <Link href="/contact">
                Nous contacter
              </Link>

              <Link href="/devis">
                Demander un devis
              </Link>

              <Link href="/faq">
                FAQ
              </Link>
            </div>

          </div>
        </div>

        <div className="container footer-bottom">

          <span>
            © {new Date().getFullYear()} NOVA. Tous droits réservés.
          </span>

          <div>
            <Link href="/mentions-legales">
              Mentions légales
            </Link>

            <Link href="/contact">
              Contact
            </Link>
          </div>

        </div>

      </footer>

    </main>
  );
}