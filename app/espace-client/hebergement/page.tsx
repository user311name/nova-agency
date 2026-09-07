import Link from "next/link";
import "./page.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01" />
      <path d="M8 17h.01" />
      <path d="M12 7h5" />
      <path d="M12 17h5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

export default function HebergementPage() {
  return (
    <main className="hosting-page">
      {/* HEADER */}

      <header className="hosting-header">
        <div className="hosting-header-inner">
          <Link href="/" className="hosting-logo" aria-label="NOVA - Accueil">
            NOV<span>A</span>
          </Link>

          <nav className="hosting-nav" aria-label="Navigation principale">
            <Link href="/domaines">Domaines</Link>
            <Link href="/hebergement" className="active">
              Hébergement
            </Link>
            <Link href="/emails">Emails</Link>
            <Link href="/securite">Sécurité</Link>
            <Link href="/a-propos">À propos</Link>
          </nav>

          <Link href="/espace-client" className="hosting-account">
            Espace client
            <ArrowIcon />
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section className="hosting-hero">
        <div className="hosting-container hosting-hero-grid">
          <div className="hosting-hero-content">
            <div className="hosting-eyebrow">
              <span className="hosting-status-dot" />
              INFRASTRUCTURE NOVA
            </div>

            <h1>
              Votre site.
              <br />
              <span>Notre infrastructure.</span>
            </h1>

            <p className="hosting-hero-text">
              Un hébergement pensé pour les sites professionnels qui
              recherchent vitesse, stabilité et simplicité.
            </p>

            <div className="hosting-actions">
              <Link href="/contact" className="hosting-primary-button">
                Parler à NOVA
                <ArrowIcon />
              </Link>

              <Link href="/espace-client" className="hosting-secondary-button">
                Espace client
              </Link>
            </div>

            <div className="hosting-trust">
              <div>
                <strong>99,9 %</strong>
                <span>Disponibilité cible</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Infrastructure surveillée</span>
              </div>

              <div>
                <strong>SSL</strong>
                <span>Protection incluse</span>
              </div>
            </div>
          </div>

          <div className="hosting-visual" aria-hidden="true">
            <div className="hosting-glow" />

            <div className="hosting-orbit hosting-orbit-one" />
            <div className="hosting-orbit hosting-orbit-two" />
            <div className="hosting-orbit hosting-orbit-three" />

            <div className="hosting-server-card">
              <div className="hosting-server-top">
                <div className="hosting-server-icon">
                  <ServerIcon />
                </div>

                <span className="hosting-live">
                  <span />
                  ONLINE
                </span>
              </div>

              <div className="hosting-server-core">
                <span>NOVA</span>
                <strong>WEB</strong>
              </div>

              <div className="hosting-server-lines">
                <span />
                <span />
                <span />
              </div>

              <div className="hosting-server-bottom">
                <span>INFRASTRUCTURE</span>
                <strong>01</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="hosting-intro">
        <div className="hosting-container">
          <div className="hosting-section-label">
            <span>01</span>
            POURQUOI NOVA
          </div>

          <div className="hosting-intro-grid">
            <h2>
              L'hébergement ne devrait
              <br />
              <span>jamais être un problème.</span>
            </h2>

            <p>
              Nous voulons que votre infrastructure reste invisible dans le
              meilleur sens du terme : votre site fonctionne, vos visiteurs
              naviguent rapidement et vous gardez le contrôle depuis votre
              espace client.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="hosting-features">
        <div className="hosting-container">
          <div className="hosting-section-heading">
            <div>
              <div className="hosting-section-label">
                <span>02</span>
                L'ESSENTIEL
              </div>

              <h2>
                Une infrastructure
                <br />
                <span>faite pour durer.</span>
              </h2>
            </div>

            <p>
              Des bases solides pour accompagner votre activité sans
              complexité inutile.
            </p>
          </div>

          <div className="hosting-feature-grid">
            <article className="hosting-feature-card">
              <div className="hosting-feature-icon">
                <ServerIcon />
              </div>

              <span>PERFORMANCE</span>

              <h3>Rapide et stable</h3>

              <p>
                Une infrastructure optimisée pour offrir des temps de réponse
                rapides et une expérience fluide à vos visiteurs.
              </p>
            </article>

            <article className="hosting-feature-card">
              <div className="hosting-feature-icon">
                <ShieldIcon />
              </div>

              <span>SÉCURITÉ</span>

              <h3>Protégé par défaut</h3>

              <p>
                SSL, surveillance et bonnes pratiques de sécurité pour réduire
                les risques liés à votre présence en ligne.
              </p>
            </article>

            <article className="hosting-feature-card">
              <div className="hosting-feature-number">
                03
              </div>

              <span>SIMPLICITÉ</span>

              <h3>Tout au même endroit</h3>

              <p>
                Retrouvez vos informations et vos services depuis votre espace
                client NOVA, sans multiplier les interfaces.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* OFFER */}

      <section className="hosting-offer">
        <div className="hosting-container">
          <div className="hosting-offer-card">
            <div className="hosting-offer-content">
              <div className="hosting-section-label">
                <span>03</span>
                OFFRE NOVA
              </div>

              <h2>
                Hébergement
                <br />
                <span>professionnel.</span>
              </h2>

              <p>
                Une solution claire pour héberger votre site professionnel
                avec une infrastructure conçue pour rester fiable au quotidien.
              </p>

              <ul>
                <li>
                  <CheckIcon />
                  Infrastructure haute disponibilité
                </li>

                <li>
                  <CheckIcon />
                  Certificat SSL
                </li>

                <li>
                  <CheckIcon />
                  Surveillance de l'infrastructure
                </li>

                <li>
                  <CheckIcon />
                  Gestion depuis l'espace client
                </li>

                <li>
                  <CheckIcon />
                  Assistance NOVA
                </li>
              </ul>
            </div>

            <div className="hosting-offer-side">
              <span className="hosting-offer-status">
                DISPONIBLE
              </span>

              <div className="hosting-offer-price">
                <small>À partir de</small>
                <strong>9,90 €</strong>
                <span>/ mois</span>
              </div>

              <p>
                Tarif indicatif. Le prix final dépend de votre configuration.
              </p>

              <Link href="/contact" className="hosting-primary-button">
                Demander une offre
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section className="hosting-process">
        <div className="hosting-container">
          <div className="hosting-section-label">
            <span>04</span>
            COMMENT ÇA MARCHE
          </div>

          <h2>
            Simple.
            <br />
            <span>Du début à la mise en ligne.</span>
          </h2>

          <div className="hosting-process-grid">
            <article>
              <strong>01</strong>
              <h3>Vous nous contactez</h3>
              <p>
                Nous comprenons votre projet et vos besoins techniques.
              </p>
            </article>

            <article>
              <strong>02</strong>
              <h3>Nous configurons</h3>
              <p>
                Votre environnement est préparé selon votre projet.
              </p>
            </article>

            <article>
              <strong>03</strong>
              <h3>Votre site est en ligne</h3>
              <p>
                Vous retrouvez ensuite les informations essentielles dans
                votre espace client.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="hosting-cta">
        <div className="hosting-container">
          <div className="hosting-cta-card">
            <span className="hosting-cta-label">
              NOVA · DIGITAL INFRASTRUCTURE
            </span>

            <h2>
              Prêt à mettre votre
              <br />
              <span>site en ligne ?</span>
            </h2>

            <p>
              Parlons de votre projet et trouvons l'environnement adapté.
            </p>

            <div className="hosting-actions">
              <Link href="/contact" className="hosting-primary-button">
                Contacter NOVA
                <ArrowIcon />
              </Link>

              <Link href="/domaines" className="hosting-secondary-button">
                Trouver un domaine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="hosting-footer">
        <div className="hosting-container hosting-footer-inner">
          <Link href="/" className="hosting-footer-logo">
            NOV<span>A</span>
          </Link>

          <div className="hosting-footer-links">
            <Link href="/domaines">Domaines</Link>
            <Link href="/hebergement">Hébergement</Link>
            <Link href="/emails">Emails</Link>
            <Link href="/securite">Sécurité</Link>
            <Link href="/a-propos">À propos</Link>
          </div>

          <div className="hosting-footer-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/contact">Support</Link>
          </div>

          <span className="hosting-footer-copy">
            © {new Date().getFullYear()} NOVA
          </span>
        </div>
      </footer>
    </main>
  );
}