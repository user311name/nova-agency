import Image from "next/image";



import Link from "next/link";



import type { ReactNode } from "react";



import "./page.css";







/* =========================================================



   ICONES



\\========================================================= */







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



\\========================================================= */







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



\\========================================================= */







function ExternalArrowIcon() {



  return (



    <svg



      className="external-arrow-svg"



      viewBox="0 0 24 24"



      aria-hidden="true"



      focusable="false"



    >



      <path
        d="M7 17 17 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />



    </svg>



  );



}







/* =========================================================



   BOUTON AVEC FLECHE



\\========================================================= */







function ArrowLink({



  href,



  children,



  variant = "primary",



}: {



  href: string;



  children: ReactNode;



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



\\========================================================= */







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



              <ArrowLink href="/devis">Démarrer un projet</ArrowLink>







              <Link href="/domaines" className="domain-hero-button">



                <span>Acheter un domaine</span>







                <span className="domain-hero-arrow" aria-hidden="true">



                  <ArrowIcon />



                </span>



              </Link>







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







            <section className="nova-why page-section">

        <div className="container nova-why-container">

          <div className="nova-why-heading">

            <div className="section-index nova-why-index"><span>01</span><span className="blue-line" /><span>POURQUOI NOVA</span></div>

            <div>

              <p className="micro-label">Notre différence, concrètement</p>

              <h2 className="section-title">Un accompagnement<br /><span>qui va plus loin.</span></h2>

              <div className="nova-why-intro">

                <p>NOVA peut vous accompagner de A à Z : de votre identité visuelle à votre présence en ligne, jusqu&apos;aux supports qui font vivre votre image au quotidien.</p>

                <p>Logo, site web, domaine, flyers, supports imprimés, autocollants et visuels pour véhicule : l&apos;objectif est de construire un ensemble cohérent autour de votre activité.</p>

              </div>

            </div>

          </div>

          <div className="nova-why-grid">

            <article className="nova-why-card nova-why-card-featured"><div className="nova-why-card-top"><span>01</span><span className="nova-why-card-arrow" aria-hidden="true"><ExternalArrowIcon /></span></div><div className="nova-why-card-content"><h3>Une maquette pour vous projeter.</h3><p>Avant de commencer, vous pouvez visualiser la direction donnée à votre projet.</p></div></article>

            <article className="nova-why-card"><div className="nova-why-card-top"><span>02</span><span className="nova-why-card-arrow" aria-hidden="true"><ExternalArrowIcon /></span></div><div className="nova-why-card-content"><h3>On part du besoin, pas d&apos;une formule.</h3><p>Chaque projet commence par votre activité, vos objectifs et vos besoins.</p></div></article>

            <article className="nova-why-card"><div className="nova-why-card-top"><span>03</span><span className="nova-why-card-arrow" aria-hidden="true"><ExternalArrowIcon /></span></div><div className="nova-why-card-content"><h3>Votre image ne s&apos;arrête pas au site.</h3><p>Logo, supports imprimés, véhicule, réseaux et présence en ligne peuvent fonctionner ensemble.</p></div></article>

            <article className="nova-why-card"><div className="nova-why-card-top"><span>04</span><span className="nova-why-card-arrow" aria-hidden="true"><ExternalArrowIcon /></span></div><div className="nova-why-card-content"><h3>Un seul fil conducteur pour votre projet.</h3><p>Une identité cohérente sur tous vos supports.</p></div></article>

            <article className="nova-why-card"><div className="nova-why-card-top"><span>05</span><span className="nova-why-card-arrow" aria-hidden="true"><ExternalArrowIcon /></span></div><div className="nova-why-card-content"><h3>L&apos;IA comme accélérateur, pas comme identité.</h3><p>Elle peut nous aider à explorer et produire plus vite, mais votre image reste pensée pour votre activité.</p></div></article>

            <article className="nova-why-card"><div className="nova-why-card-top"><span>06</span><span className="nova-why-card-arrow" aria-hidden="true"><ExternalArrowIcon /></span></div><div className="nova-why-card-content"><h3>Une présence qui peut continuer d&apos;évoluer.</h3><p>Votre site et votre univers peuvent évoluer avec votre entreprise.</p></div></article>

          </div>

          <div className="nova-why-bottom"><div><p>UN ACCOMPAGNEMENT QUI DÉPASSE LE WEB</p><h3>Du logo au site, jusqu&apos;aux supports de votre activité.</h3></div><ArrowLink href="/devis">Parler de votre projet</ArrowLink></div>

        </div>

      </section>



<section className="portfolio page-section">



        <div className="container">



          <div className="section-heading portfolio-heading">



            <div>



              <p className="micro-label">Sélection de projets</p>







              <h2 className="section-title">



                Quelques projets.



                <br />



                <span>Beaucoup d&apos;ambition.</span>



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







            {/* PROJET 02 — BOULANGERIE */}







            <Link



              href="/realisations/boulangerie"



              className="portfolio-card"



            >



              <div className="portfolio-image">



                <Image



                  src="/projets/Boulangerie-1.png"



                  alt="Projet Boulangerie"



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



                  <span>02 / BOULANGERIE</span>



                  <h3>Boulangerie</h3>



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



          RÉSULTATS / CHIFFRES



      ====================================================== */}



      <section className="results page-section">

        <div className="container results-container">



          <div className="results-heading">

            <div>

              <p className="micro-label">Des résultats mesurables</p>



              <h2 className="section-title">

                Des données,

                <br />

                <span>pas des promesses.</span>

              </h2>

            </div>



            <p className="section-description">

              Lorsque les données sont disponibles, nous préférons vous montrer

              des résultats réellement mesurés plutôt que d&apos;avancer des chiffres

              sans preuve.

            </p>

          </div>



          <div className="results-grid">



            <article className="result-card result-card-white">

              <div className="result-card-media" aria-hidden="true"><Image src="/documents-devis.png" alt="" width={360} height={265} /></div>

              <div className="result-card-glow" aria-hidden="true" />

              <div className="result-card-shine" aria-hidden="true" />



              <div className="result-card-top">

                <span className="result-number">01</span>

                <span className="result-status">MESURE</span>

              </div>



              <div className="result-card-main">

                <div className="result-value">—</div>



                <div>

                  <h3>Demandes</h3>

                  <p>Évolution des demandes générées par le site.</p>

                </div>

              </div>



              <div className="result-card-corner" aria-hidden="true" />

            </article>



            <article className="result-card result-card-violet">

              <div className="result-card-media" aria-hidden="true"><Image src="/developpement-code.png" alt="" width={360} height={265} /></div>

              <div className="result-card-glow" aria-hidden="true" />

              <div className="result-card-shine" aria-hidden="true" />



              <div className="result-card-top">

                <span className="result-number">02</span>

                <span className="result-status">MESURE</span>

              </div>



              <div className="result-card-main">

                <div className="result-value">—</div>



                <div>

                  <h3>Performance</h3>

                  <p>Score mesuré sur les outils de performance.</p>

                </div>

              </div>



              <div className="result-card-corner" aria-hidden="true" />

            </article>



            <article className="result-card result-card-blue">

              <div className="result-card-media" aria-hidden="true"><Image src="/ordinateur-portable-transparent.png" alt="" width={380} height={285} /></div>

              <div className="result-card-glow" aria-hidden="true" />

              <div className="result-card-shine" aria-hidden="true" />



              <div className="result-card-top">

                <span className="result-number">03</span>

                <span className="result-status">MESURE</span>

              </div>



              <div className="result-card-main">

                <div className="result-value">—</div>



                <div>

                  <h3>Chargement</h3>

                  <p>Temps de chargement réellement constaté.</p>

                </div>

              </div>



              <div className="result-card-corner" aria-hidden="true" />

            </article>



            <article className="result-card result-card-white">

              <div className="result-card-media" aria-hidden="true"><Image src="/interface-utilisateurs.png" alt="" width={360} height={270} /></div>

              <div className="result-card-glow" aria-hidden="true" />

              <div className="result-card-shine" aria-hidden="true" />



              <div className="result-card-top">

                <span className="result-number">04</span>

                <span className="result-status">MESURE</span>

              </div>



              <div className="result-card-main">

                <div className="result-value">—</div>



                <div>

                  <h3>Formulaires</h3>

                  <p>Évolution des prises de contact mesurées.</p>

                </div>

              </div>



              <div className="result-card-corner" aria-hidden="true" />

            </article>



          </div>



          <div className="results-note">

            <span className="results-note-dot" aria-hidden="true" />

            <span>

              Les chiffres affichés ici sont ajoutés uniquement lorsqu&apos;ils sont vérifiables.

            </span>

          </div>



        </div>

      </section>



      {/* =====================================================



          FORMULES



      ====================================================== */}







      <section className="offers page-section">



        <div className="container">



          <div className="section-heading offers-heading">



            <div>



              <p className="micro-label">Des formats adaptés</p>



              <h2 className="section-title">



                Une offre adaptée



                <br />



                <span>à votre ambition.</span>



              </h2>



            </div>



            <p className="section-description">



              Chaque projet est différent. Nous construisons une solution



              adaptée à votre activité, à vos besoins et à votre image.



            </p>



          </div>







          <div className="offers-grid">



            <article className="offer-card offer-card-light">



              <div className="offer-card-top">



                <span className="offer-number">01</span>



                <span className="offer-label">PRÉSENCE</span>



              </div>



              <div className="offer-card-content">



                <h3>Essentiel</h3>



                <p className="offer-description">



                  L&apos;essentiel pour lancer ou moderniser votre présence en ligne.



                </p>



                <ul>



                  <li>Site web personnalisé</li>



                  <li>Design professionnel</li>



                  <li>Adapté à tous les écrans</li>



                  <li>Formulaire de contact</li>



                  <li>Mise en ligne</li>



                </ul>



              </div>



              <Link href="/devis" className="offer-link">



                <span>Découvrir l&apos;offre</span>



                <span className="offer-link-arrow" aria-hidden="true">



                  <ArrowIcon />



                </span>



              </Link>



            </article>







            <article className="offer-card offer-card-violet">



              <div className="offer-card-top">



                <span className="offer-number">02</span>



                <span className="offer-label">SIGNATURE</span>



              </div>



              <div className="offer-card-content">



                <h3>Premium</h3>



                <p className="offer-description">



                  Une présence plus travaillée, plus impactante et pensée dans les moindres détails.



                </p>



                <ul>



                  <li>Site web sur mesure</li>



                  <li>Identité visuelle travaillée</li>



                  <li>Design unique</li>



                  <li>Animations et effets</li>



                  <li>Optimisé pour Google</li>



                  <li>Accompagnement personnalisé</li>



                </ul>



              </div>



              <Link href="/devis" className="offer-link">



                <span>Découvrir l&apos;offre</span>



                <span className="offer-link-arrow" aria-hidden="true">



                  <ArrowIcon />



                </span>



              </Link>



            </article>







            <article className="offer-card offer-card-blue">



              <div className="offer-card-top">



                <span className="offer-number">03</span>



                <span className="offer-label">IMPACT</span>



              </div>



              <div className="offer-card-content">



                <h3>Sur mesure</h3>



                <p className="offer-description">



                  Un projet entièrement pensé autour de vos besoins et de vos objectifs.



                </p>



                <ul>



                  <li>Fonctionnalités personnalisées</li>



                  <li>Espace client ou administrateur</li>



                  <li>Paiement ou réservation</li>



                  <li>Connexions avec vos outils</li>



                  <li>Développement spécifique</li>



                  <li>Accompagnement de A à Z</li>



                </ul>



              </div>



              <Link href="/devis" className="offer-link">



                <span>Parler de mon projet</span>



                <span className="offer-link-arrow" aria-hidden="true">



                  <ArrowIcon />



                </span>



              </Link>



            </article>



          </div>







          <div className="offer-extra-grid">



            <article className="offer-extra-card">



              <div className="offer-extra-icon" aria-hidden="true">



                <svg viewBox="0 0 24 24">



                  <path d="M3 10.5 12 3l9 7.5" />



                  <path d="M5.5 9.5V21h13V9.5M9 21v-6h6v6" />



                </svg>



              </div>



              <div>



                <p className="offer-extra-label">DOMAINE &amp; E-MAILS</p>



                <h3>Votre adresse professionnelle</h3>



                <p>



                  Nous pouvons vous accompagner pour votre nom de domaine et vos adresses e-mail professionnelles.



                </p>



              </div>



              <Link href="/domaines" className="offer-extra-arrow" aria-label="Découvrir les domaines">



                <ArrowIcon />



              </Link>



            </article>



            <p className="offer-extra-note">



              Vous êtes libre de choisir votre fournisseur. Si vous avez déjà un domaine ou des adresses e-mail, nous pouvons également travailler avec votre solution actuelle.



            </p>



          </div>







          <div className="offer-care">



            <div>



              <p className="offer-care-label">NOVA CARE</p>



              <h3>Votre site continue d&apos;évoluer après sa mise en ligne.</h3>



            </div>



            <p>



              Mises à jour, petites modifications, corrections et accompagnement au quotidien.



            </p>



            <Link href="/contact" className="offer-care-link">



              <span>En savoir plus</span>



              <span aria-hidden="true"><ArrowIcon /></span>



            </Link>



          </div>



        </div>



      </section>







      {/* =====================================================



          METHODE



      ====================================================== */}







      <section className="method page-section">



        <div className="container method-grid">



          <div className="method-intro">



            <p className="micro-label">Notre méthode</p>







            <h2 className="section-title">



              Simple dans



              <br />



              <span>l&apos;approche.</span>



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



              <div className="method-step-number">01</div>







              <div className="method-step-icon">



                <PhoneIcon />



              </div>







              <div>



                <p>ON ÉCHANGE</p>







                <h3>Comprendre votre projet</h3>







                <span>



                  Vos objectifs, votre activité, vos clients et votre vision.



                </span>



              </div>







              <span className="method-arrow" aria-hidden="true">



                <ArrowIcon />



              </span>



            </div>







            {/* ETAPE 02 */}







            <div className="method-step">



              <div className="method-step-number">02</div>







              <div className="method-step-icon">



                <LayersIcon />



              </div>







              <div>



                <p>ON IMAGINE</p>







                <h3>Construire votre univers</h3>







                <span>



                  Structure, direction artistique et expérience utilisateur.



                </span>



              </div>







              <span className="method-arrow" aria-hidden="true">



                <ArrowIcon />



              </span>



            </div>







            {/* ETAPE 03 */}







            <div className="method-step">



              <div className="method-step-number">03</div>







              <div className="method-step-icon">



                <CodeIcon />



              </div>







              <div>



                <p>ON DÉVELOPPE</p>







                <h3>Donner vie au design</h3>







                <span>



                  Un développement propre, responsive et pensé pour durer.



                </span>



              </div>







              <span className="method-arrow" aria-hidden="true">



                <ArrowIcon />



              </span>



            </div>







            {/* ETAPE 04 */}







            <div className="method-step">



              <div className="method-step-number">04</div>







              <div className="method-step-icon">



                <ChartIcon />



              </div>







              <div>



                <p>ON OPTIMISE</p>







                <h3>Aller plus loin</h3>







                <span>



                  Performance, référencement et derniers détails avant la



                  mise en ligne.



                </span>



              </div>







              <span className="method-arrow" aria-hidden="true">



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



            <p className="micro-label">À propos de NOVA</p>







            <h2 className="section-title">



              Petit studio.



              <br />



              <span>Grande ambition.</span>



            </h2>







            <p>



              NOVA est une agence digitale indépendante qui privilégie une



              approche simple : créer moins de bruit et plus d&apos;impact.



            </p>







            <p>



              Chaque projet est pensé avec une attention particulière portée



              au design, à la performance et à l&apos;expérience utilisateur.



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



            <p className="micro-label">Questions fréquentes</p>







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



                simple est de nous présenter votre projet afin d&apos;obtenir



                une estimation adaptée.



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



                réalisé rapidement, tandis qu&apos;un projet plus complexe



                demande davantage de conception, de développement et de tests.



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



                l&apos;expérience utilisateur et les performances d&apos;un



                site existant.



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







            <p className="micro-label">Votre prochain projet</p>







            <h2>



              Faisons quelque chose



              <br />



              de <span>remarquable.</span>



            </h2>







            <p>



              Vous avez une idée, un projet ou simplement envie de faire



              évoluer votre présence en ligne ?



            </p>







            <ArrowLink href="/devis">Demander un devis</ArrowLink>



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



              Design, développement &amp; performance.



            </p>



          </div>







          <div className="footer-links">



            <div>



              <span>EXPLORER</span>







              <Link href="/services">Services</Link>







              <Link href="/realisations">Réalisations</Link>







              <Link href="/methode">Méthode</Link>



            </div>







            <div>



              <span>CONTACT</span>







              <Link href="/contact">Nous contacter</Link>







              <Link href="/devis">Demander un devis</Link>







              <Link href="/faq">FAQ</Link>



            </div>



          </div>



        </div>







        <div className="container footer-bottom">



          <span>



            © {new Date().getFullYear()} NOVA. Tous droits réservés.



          </span>







          <div>



            <Link href="/mentions-legales">Mentions légales</Link>







            <Link href="/contact">Contact</Link>



          </div>



        </div>



      </footer>



    </main>



  );



}