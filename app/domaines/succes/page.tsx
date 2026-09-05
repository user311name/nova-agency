import Link from "next/link";
import "./page.css";

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
      width="20"
      height="20"
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

function Icon({
  type,
}: {
  type:
    | "user"
    | "cube"
    | "mail"
    | "shield"
    | "headset"
    | "bolt";
}) {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c.7-3.2 2.9-5 6.5-5s5.8 1.8 6.5 5" />
      </>
    ),

    cube: (
      <>
        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
        <path d="M4 7.5L12 12L20 7.5" />
        <path d="M12 12V21" />
      </>
    ),

    mail: (
      <>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="M4.5 7L12 13L19.5 7" />
      </>
    ),

    shield: (
      <>
        <path d="M12 3L19 6V11C19 16 16 19.5 12 21C8 19.5 5 16 5 11V6L12 3Z" />
        <path d="M9 12L11.2 14.2L15.5 9.8" />
      </>
    ),

    headset: (
      <>
        <path d="M4 13V11C4 6.6 7.4 4 12 4S20 6.6 20 11V13" />
        <path d="M4 13H7V18H5.5C4.7 18 4 17.3 4 16.5V13Z" />
        <path d="M20 13H17V18H18.5C19.3 18 20 17.3 20 16.5V13Z" />
        <path d="M17 18C16.2 20 14.7 21 12 21" />
      </>
    ),

    bolt: (
      <path d="M13.5 2L5 13H11L10.5 22L19 10.5H13L13.5 2Z" />
    ),
  };

  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function Success3D() {
  return (
    <div className="successVisual">
      <div className="successGlow" />

      <div className="successVisualCard">
        <div className="successCheck">
          <div className="successCheckInner">
            <CheckIcon />
          </div>
        </div>
      </div>

      <div className="successPlatform" />

      <div className="absolute right-[8%] top-[16%] h-12 w-12 rounded-full bg-gradient-to-br from-white via-violet-300 to-indigo-500 shadow-[0_12px_30px_rgba(95,67,190,0.3)]" />

      <div className="absolute left-[9%] top-[19%] h-8 w-8 rotate-45 rounded-lg border border-violet-200 bg-gradient-to-br from-white to-violet-300 shadow-[0_12px_30px_rgba(95,67,190,0.2)]" />

      <div className="absolute bottom-[25%] left-[7%] grid grid-cols-3 gap-2 opacity-50">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-violet-400"
          />
        ))}
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  link,
}: {
  icon: "user" | "cube" | "mail" | "shield";
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} className="actionCard group">
      <div className="actionIcon">
        <div className="actionIconInner">
          <Icon type={icon} />
        </div>
      </div>

      <h3 className="actionTitle">{title}</h3>

      <p className="actionDescription">{description}</p>

      <div className="actionLink">
        <span>Découvrir</span>

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

export default function DomainSuccessPage() {
  return (
    <main className="successPage">
      {/* HERO */}

      <section className="successHero">
        <div className="successContainer">
          <div className="successHeroGrid">
            <div>
              <div className="successBadge">
                <span className="successBadgeIcon">
                  <CheckIcon />
                </span>

                Paiement réussi
              </div>

              <h1 className="successTitle">
                Votre commande
                <br />
                est confirmée
              </h1>

              <p className="successDescription">
                Merci pour votre confiance. Votre domaine est en cours
                d’enregistrement et sera bientôt actif.
              </p>

              <div className="successSecurity">
                <div className="securityItem">
                  <span className="securityIcon">
                    <Icon type="shield" />
                  </span>

                  <span>Paiement sécurisé par Stripe</span>
                </div>

                <div className="securityItem">
                  <span className="securityIcon">
                    <Icon type="shield" />
                  </span>

                  <span>Transaction 100 % sécurisée</span>
                </div>
              </div>
            </div>

            <Success3D />
          </div>
        </div>
      </section>

      {/* COMMANDE */}

      <section className="orderSection">
        <div className="successContainer">
          <div className="orderCard">
            <div className="orderTop">
              <div className="domainInfo">
                <div className="domainIcon">
                  <svg
                    width="31"
                    height="31"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M3.5 12H20.5" />
                    <path d="M12 3.5C14.3 5.8 15.4 8.6 15.4 12S14.3 18.2 12 20.5C9.7 18.2 8.6 15.4 8.6 12S9.7 5.8 12 3.5Z" />
                  </svg>
                </div>

                <div>
                  <p className="domainLabel">
                    Domaine commandé
                  </p>

                  <h2 className="domainName">
                    Votre domaine
                  </h2>

                  <div className="domainStatus">
                    <span className="domainStatusDot" />
                    Enregistrement en cours
                  </div>
                </div>
              </div>

              <div className="summary">
                <p className="summaryTitle">
                  Récapitulatif
                </p>

                <div className="summaryRow">
                  <span>Domaine</span>
                  <span>Votre domaine</span>
                </div>

                <div className="summaryRow">
                  <span>Durée</span>
                  <span>1 an</span>
                </div>

                <div className="summaryTotal">
                  <span>Commande</span>
                  <span>Confirmée</span>
                </div>
              </div>
            </div>

            {/* PROGRESSION */}

            <div className="progress">
              {[
                {
                  number: "1",
                  title: "Commande confirmée",
                  text: "Paiement reçu",
                  active: true,
                },
                {
                  number: "2",
                  title: "Enregistrement",
                  text: "En cours",
                  active: false,
                },
                {
                  number: "3",
                  title: "Configuration",
                  text: "En préparation",
                  active: false,
                },
                {
                  number: "4",
                  title: "Actif",
                  text: "Bientôt disponible",
                  active: false,
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className={`progressItem ${
                    step.active ? "active" : ""
                  }`}
                >
                  <div className="progressNumber">
                    {step.number}
                  </div>

                  <p className="progressTitle">
                    {step.title}
                  </p>

                  <p className="progressText">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACTIONS */}

      <section className="actionsSection">
        <div className="successContainer">
          <h2 className="sectionTitle">
            Que pouvez-vous faire maintenant ?
          </h2>

          <div className="actionsGrid">
            <ActionCard
              icon="user"
              title="Accéder à votre espace client"
              description="Gérez vos domaines, vos DNS, vos e-mails et vos futurs services."
              link="/espace-client"
            />

            <ActionCard
              icon="cube"
              title="Consulter vos commandes"
              description="Retrouvez l’historique de vos achats et vos factures."
              link="/espace-client"
            />

            <ActionCard
              icon="mail"
              title="Configurer vos e-mails"
              description="Créez et gérez vos adresses e-mail professionnelles."
              link="/espace-client"
            />

            <ActionCard
              icon="shield"
              title="Sécuriser votre site"
              description="Activez les services de sécurité et les certificats SSL."
              link="/espace-client"
            />
          </div>
        </div>
      </section>

      {/* CTA */}

      <section>
        <div className="successContainer">
          <div className="darkCta">
            <div className="darkCtaContent">
              <p className="darkCtaEyebrow">
                Nova
              </p>

              <h2 className="darkCtaTitle">
                Tout est réuni pour réussir en ligne
              </h2>

              <p className="darkCtaText">
                Hébergement rapide, sécurité renforcée et services
                professionnels. Nova vous accompagne à chaque étape.
              </p>

              <Link
                href="/"
                className="darkCtaButton"
              >
                Découvrir nos services
                <ArrowRight />
              </Link>
            </div>

            <div className="novaCube">
              <div className="novaCubeInner">
                N
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIES */}

      <section className="successContainer">
        <div className="benefits">
          <div className="benefit">
            <div className="benefitIcon">
              <Icon type="headset" />
            </div>

            <div>
              <p className="benefitTitle">
                Support 7j/7
              </p>

              <p className="benefitText">
                Notre équipe est là pour vous aider
              </p>
            </div>
          </div>

          <div className="benefit">
            <div className="benefitIcon">
              <Icon type="shield" />
            </div>

            <div>
              <p className="benefitTitle">
                Sécurité maximale
              </p>

              <p className="benefitText">
                Vos données sont protégées
              </p>
            </div>
          </div>

          <div className="benefit">
            <div className="benefitIcon">
              <Icon type="bolt" />
            </div>

            <div>
              <p className="benefitTitle">
                Activation rapide
              </p>

              <p className="benefitText">
                Votre domaine sera actif très bientôt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIONS FINALES */}

      <section className="successContainer">
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
            className="clientButton"
          >
            <span>Accéder à mon espace client</span>
            <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}