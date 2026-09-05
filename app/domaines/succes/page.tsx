import Link from "next/link";
import Stripe from "stripe";
import "./page.css";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY manquante.");
  }

  return new Stripe(key);
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12H20.5" />
      <path d="M12 3.5C14.3 5.8 15.4 8.6 15.4 12S14.3 18.2 12 20.5C9.7 18.2 8.6 15.4 8.6 12S9.7 5.8 12 3.5Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3L19 6V11C19 16 16 19.5 12 21C8 19.5 5 16 5 11V6L12 3Z" />
      <path d="M9 12L11.2 14.2L15.5 9.8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19C6.2 15.8 8.4 14 12 14C15.6 14 17.8 15.8 18.5 19" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7L12 13L19.5 7" />
    </svg>
  );
}

function DnsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="5" rx="1.5" />
      <rect x="4" y="15" width="16" height="5" rx="1.5" />
      <path d="M8 9V15" />
      <path d="M16 9V15" />
    </svg>
  );
}

function SiteIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 8.5H20.5" />
      <circle cx="7" cy="6.25" r=".6" fill="currentColor" />
      <circle cx="10" cy="6.25" r=".6" fill="currentColor" />
      <circle cx="13" cy="6.25" r=".6" fill="currentColor" />
    </svg>
  );
}

async function getOrder(sessionId: string) {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.retrieve(
    sessionId,
  );

  const domain = session.metadata?.domain || null;

  const amount =
    typeof session.amount_total === "number"
      ? session.amount_total / 100
      : null;

  const currency =
    session.currency?.toUpperCase() || "EUR";

  const email =
    session.customer_details?.email || null;

  return {
    domain,
    amount,
    currency,
    email,
    paymentStatus: session.payment_status,
  };
}

export default async function DomainSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
  }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    return (
      <main className="successPage">
        <section className="emptySuccess">
          <div className="emptyCard">
            <div className="emptyIcon">
              <ShieldIcon />
            </div>

            <p className="eyebrow">
              NOVA
            </p>

            <h1>
              Commande introuvable
            </h1>

            <p>
              Impossible de retrouver les informations de cette commande.
            </p>

            <Link
              href="/domaines"
              className="primaryButton"
            >
              Retour aux domaines
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  let order;

  try {
    order = await getOrder(sessionId);
  } catch {
    return (
      <main className="successPage">
        <section className="emptySuccess">
          <div className="emptyCard">
            <div className="emptyIcon">
              <ShieldIcon />
            </div>

            <p className="eyebrow">
              NOVA
            </p>

            <h1>
              Impossible de charger la commande
            </h1>

            <p>
              Votre paiement peut avoir été effectué. Les informations de
              commande sont temporairement indisponibles.
            </p>

            <Link
              href="/domaines"
              className="primaryButton"
            >
              Retour aux domaines
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const domain =
    order.domain || "Domaine commandé";

  const isPaid =
    order.paymentStatus === "paid";

  return (
    <main className="successPage">
      {/* HERO */}

      <section className="successHero">
        <div className="heroGlow" />

        <div className="successContainer">
          <div className="successHeroGrid">
            <div className="heroContent">
              <div className="successBadge">
                <span className="successBadgeIcon">
                  <CheckIcon />
                </span>

                {isPaid
                  ? "Paiement confirmé"
                  : "Commande reçue"}
              </div>

              <p className="eyebrow">
                NOVA
              </p>

              <h1 className="successTitle">
                Votre domaine
                <br />
                est presque prêt.
              </h1>

              <p className="successDescription">
                Votre commande pour{" "}
                <strong>{domain}</strong>{" "}
                a bien été reçue. Nous finalisons maintenant son
                enregistrement et sa configuration.
              </p>

              <div className="heroActions">
                <Link
                  href="/espace-client"
                  className="primaryButton"
                >
                  Accéder à mon espace client
                  <ArrowRight />
                </Link>

                <Link
                  href="/domaines"
                  className="secondaryButton"
                >
                  Acheter un autre domaine
                </Link>
              </div>

              <div className="trustRow">
                <div className="trustItem">
                  <span>
                    <ShieldIcon />
                  </span>
                  Paiement sécurisé
                </div>

                <div className="trustItem">
                  <span>
                    <CheckIcon />
                  </span>
                  Commande enregistrée
                </div>
              </div>
            </div>

            <div className="successVisual">
              <div className="floatingShape shapeOne" />
              <div className="floatingShape shapeTwo" />
              <div className="floatingShape shapeThree" />

              <div className="visualCard">
                <div className="visualCardTop">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="visualGlobe">
                  <GlobeIcon />

                  <div className="visualCheck">
                    <CheckIcon />
                  </div>
                </div>

                <div className="visualDomain">
                  {domain}
                </div>

                <div className="visualStatus">
                  <span />
                  Activation en cours
                </div>
              </div>

              <div className="visualShadow" />
            </div>
          </div>
        </div>
      </section>

      {/* ORDER */}

      <section className="orderSection">
        <div className="successContainer">
          <div className="orderCard">
            <div className="orderHeader">
              <div className="orderDomain">
                <div className="domainIcon">
                  <GlobeIcon />
                </div>

                <div>
                  <p className="smallLabel">
                    Votre domaine
                  </p>

                  <h2>
                    {domain}
                  </h2>

                  <span className="statusPill">
                    <span />
                    Enregistrement en cours
                  </span>
                </div>
              </div>

              <div className="orderPrice">
                <p>
                  Montant payé
                </p>

                <strong>
                  {order.amount !== null
                    ? `${order.amount.toFixed(2)} ${order.currency}`
                    : "Confirmé"}
                </strong>
              </div>
            </div>

            <div className="orderDetails">
              <div>
                <span>
                  Commande
                </span>

                <strong>
                  Paiement confirmé
                </strong>
              </div>

              <div>
                <span>
                  Durée
                </span>

                <strong>
                  1 an
                </strong>
              </div>

              <div>
                <span>
                  E-mail
                </span>

                <strong>
                  {order.email || "Votre adresse e-mail"}
                </strong>
              </div>
            </div>

            {/* PROGRESSION */}

            <div className="progress">
              <div className="progressItem active">
                <div className="progressNumber">
                  <CheckIcon />
                </div>

                <div>
                  <strong>
                    Paiement
                  </strong>

                  <span>
                    Confirmé
                  </span>
                </div>
              </div>

              <div className="progressLine" />

              <div className="progressItem active">
                <div className="progressNumber">
                  2
                </div>

                <div>
                  <strong>
                    Enregistrement
                  </strong>

                  <span>
                    En cours
                  </span>
                </div>
              </div>

              <div className="progressLine" />

              <div className="progressItem">
                <div className="progressNumber">
                  3
                </div>

                <div>
                  <strong>
                    Configuration
                  </strong>

                  <span>
                    À venir
                  </span>
                </div>
              </div>

              <div className="progressLine" />

              <div className="progressItem">
                <div className="progressNumber">
                  4
                </div>

                <div>
                  <strong>
                    Domaine actif
                  </strong>

                  <span>
                    À venir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT NEXT */}

      <section className="actionsSection">
        <div className="successContainer">
          <div className="sectionHeading">
            <p className="eyebrow">
              APRÈS L’ACTIVATION
            </p>

            <h2>
              Tout ce dont vous avez besoin,
              <br />
              au même endroit.
            </h2>

            <p>
              Une fois votre domaine actif, vous pourrez gérer tous vos
              services directement depuis votre espace client Nova.
            </p>
          </div>

          <div className="actionsGrid">
            <Link
              href="/espace-client"
              className="actionCard"
            >
              <div className="actionIcon">
                <UserIcon />
              </div>

              <h3>
                Gérer mon domaine
              </h3>

              <p>
                Retrouvez votre domaine, son statut, sa date d’expiration,
                son renouvellement et ses paramètres.
              </p>

              <span>
                Accéder à mon espace
                <ArrowRight />
              </span>
            </Link>

            <Link
              href="/espace-client"
              className="actionCard"
            >
              <div className="actionIcon">
                <SiteIcon />
              </div>

              <h3>
                Créer mon site
              </h3>

              <p>
                Créez un site Nova et connectez automatiquement votre domaine
                lorsqu’il sera actif.
              </p>

              <span>
                Créer mon site
                <ArrowRight />
              </span>
            </Link>

            <Link
              href="/espace-client"
              className="actionCard"
            >
              <div className="actionIcon">
                <MailIcon />
              </div>

              <h3>
                Créer mes e-mails
              </h3>

              <p>
                Préparez vos adresses professionnelles comme
                contact@votredomaine.fr.
              </p>

              <span>
                Gérer mes e-mails
                <ArrowRight />
              </span>
            </Link>

            <Link
              href="/espace-client"
              className="actionCard"
            >
              <div className="actionIcon">
                <DnsIcon />
              </div>

              <h3>
                Gérer mon DNS
              </h3>

              <p>
                Gérez les enregistrements DNS de votre domaine depuis votre
                espace Nova.
              </p>

              <span>
                Gérer le DNS
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENT AREA */}

      <section className="clientSection">
        <div className="successContainer">
          <div className="clientPanel">
            <div className="clientPanelContent">
              <p className="eyebrow light">
                ESPACE CLIENT NOVA
              </p>

              <h2>
                Votre activité en ligne,
                <br />
                depuis un seul endroit.
              </h2>

              <p>
                Domaines, sites, e-mails, DNS, sécurité, commandes et
                renouvellements seront accessibles depuis votre espace
                client.
              </p>

              <Link
                href="/espace-client"
                className="lightButton"
              >
                Ouvrir mon espace client
                <ArrowRight />
              </Link>
            </div>

            <div className="clientVisual">
              <div className="cubeBack" />

              <div className="novaCube">
                <span>
                  N
                </span>
              </div>

              <div className="cubeGlow" />
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE */}

      <section className="reassuranceSection">
        <div className="successContainer">
          <div className="reassuranceGrid">
            <div>
              <div className="reassuranceIcon">
                <ShieldIcon />
              </div>

              <h3>
                Sécurité
              </h3>

              <p>
                Vos paiements et vos services sont protégés.
              </p>
            </div>

            <div>
              <div className="reassuranceIcon">
                <CheckIcon />
              </div>

              <h3>
                Gestion simplifiée
              </h3>

              <p>
                Retrouvez tous vos services au même endroit.
              </p>
            </div>

            <div>
              <div className="reassuranceIcon">
                <UserIcon />
              </div>

              <h3>
                Support Nova
              </h3>

              <p>
                Notre équipe vous accompagne lorsque vous en avez besoin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <section className="bottomSection">
        <div className="successContainer">
          <div className="bottomActions">
            <Link
              href="/domaines"
              className="backButton"
            >
              <ArrowLeft />
              Retour aux domaines
            </Link>

            <Link
              href="/espace-client"
              className="primaryButton"
            >
              Accéder à mon espace client
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}