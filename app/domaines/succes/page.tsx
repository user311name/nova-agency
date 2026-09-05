import Link from "next/link";

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
  type: "user" | "cube" | "mail" | "shield" | "headset" | "bolt";
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
    <div className="relative mx-auto h-[280px] w-full max-w-[420px] sm:h-[330px]">
      <div className="absolute left-1/2 top-1/2 h-48 w-64 -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] rounded-[28px] border border-violet-200/70 bg-white/65 shadow-[0_35px_80px_rgba(91,65,180,0.18)] backdrop-blur-xl sm:h-56 sm:w-72">
        <div className="absolute inset-3 rounded-[22px] border border-white/80 bg-gradient-to-br from-white via-violet-50/80 to-indigo-100/60" />

        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-violet-300 bg-white shadow-[0_15px_35px_rgba(99,70,200,0.18)] sm:h-32 sm:w-32">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-cyan-300 text-emerald-400 sm:h-24 sm:w-24">
            <CheckIcon />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 h-7 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-2xl sm:w-80" />

      <div className="absolute bottom-5 left-1/2 h-9 w-64 -translate-x-1/2 rounded-[18px] border border-violet-200 bg-white/80 shadow-[0_20px_35px_rgba(79,59,150,0.16)] backdrop-blur sm:w-72" />

      <div className="absolute right-[8%] top-[16%] h-10 w-10 rounded-full bg-gradient-to-br from-white via-violet-300 to-indigo-500 shadow-[0_12px_30px_rgba(95,67,190,0.3)] sm:h-12 sm:w-12" />

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
    <Link
      href={link}
      className="group rounded-[26px] border border-black/[0.07] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-black shadow-[0_12px_25px_rgba(99,70,200,0.12)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-lg">
          <Icon type={icon} />
        </div>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-black">
        {title}
      </h3>

      <p className="mt-3 min-h-[72px] text-sm leading-6 text-black/55">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-black">
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
    <main className="min-h-screen overflow-hidden bg-[#fafaff] text-black">
      {/* HERO */}
      <section className="relative border-b border-black/[0.06] bg-gradient-to-b from-white via-[#fafaff] to-[#f7f6ff]">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-300/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <CheckIcon />
                </span>
                Paiement réussi
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Votre commande
                <br />
                est confirmée
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-black/55 sm:text-lg">
                Merci pour votre confiance. Votre domaine est en cours
                d’enregistrement et sera bientôt actif.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-black/65">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
                    <Icon type="shield" />
                  </span>
                  Paiement sécurisé par Stripe
                </div>

                <div className="flex items-center gap-3 text-sm text-black/65">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
                    <Icon type="shield" />
                  </span>
                  Transaction 100 % sécurisée
                </div>
              </div>
            </div>

            <Success3D />
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section className="relative mx-auto -mt-1 max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="rounded-[30px] border border-black/[0.06] bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.07)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-xl">
                <svg
                  width="30"
                  height="30"
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
                <p className="text-sm text-black/45">
                  Domaine commandé
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Votre domaine
                </h2>

                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Enregistrement en cours
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f7f7fb] p-5">
              <p className="text-sm font-semibold">
                Récapitulatif
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 text-black/55">
                  <span>Domaine</span>
                  <span>Votre domaine</span>
                </div>

                <div className="flex justify-between gap-4 text-black/55">
                  <span>Durée</span>
                  <span>1 an</span>
                </div>

                <div className="border-t border-black/10 pt-4">
                  <div className="flex justify-between gap-4 font-semibold">
                    <span>Commande</span>
                    <span>Confirmée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-10 grid gap-6 border-t border-black/[0.07] pt-8 sm:grid-cols-4 sm:gap-0">
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
            ].map((step, index) => (
              <div key={step.number} className="relative flex gap-4 sm:block">
                <div className="flex shrink-0 items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      step.active
                        ? "bg-black text-white"
                        : "border border-black/10 bg-[#f8f8fc] text-black/45"
                    }`}
                  >
                    {step.number}
                  </div>

                  {index < 3 && (
                    <div className="hidden h-px w-full bg-black/10 sm:block" />
                  )}
                </div>

                <div className="pt-1 sm:mt-4">
                  <p className="text-sm font-medium">
                    {step.title}
                  </p>

                  <p className="mt-1 text-xs text-black/45">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Que pouvez-vous faire maintenant ?
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      {/* DARK CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[30px] bg-[#09090d] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="absolute right-[-80px] top-[-120px] h-80 w-80 rounded-full bg-violet-600/30 blur-[100px]" />
          <div className="absolute bottom-[-100px] right-[20%] h-64 w-64 rounded-full bg-indigo-600/20 blur-[90px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                Nova
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Tout est réuni pour réussir en ligne
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Hébergement rapide, sécurité renforcée et services
                professionnels. Nova vous accompagne à chaque étape.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Découvrir nos services
                <ArrowRight />
              </Link>
            </div>

            <div className="relative mx-auto h-48 w-64">
              <div className="absolute bottom-4 left-1/2 h-6 w-52 -translate-x-1/2 rounded-full bg-violet-500/40 blur-2xl" />

              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] items-center justify-center rounded-3xl border border-violet-300/30 bg-gradient-to-br from-violet-500/40 to-indigo-900/50 shadow-[0_25px_60px_rgba(113,73,255,0.35)]">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-4xl font-bold text-white shadow-2xl">
                  N
                </div>
              </div>

              <div className="absolute bottom-4 left-10 h-10 w-10 rotate-12 rounded-xl border border-violet-300/30 bg-violet-500/20" />

              <div className="absolute right-4 top-5 h-7 w-7 rotate-45 rounded-lg bg-violet-400/30" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-[25px] border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.045)] sm:grid-cols-3">
          <div className="flex items-center gap-4 p-5 sm:p-7">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Icon type="headset" />
            </div>

            <div>
              <p className="font-semibold">Support 7j/7</p>
              <p className="mt-1 text-xs text-black/45">
                Notre équipe est là pour vous aider
              </p>
            </div>
          </div>

          <div className="border-t border-black/[0.06] p-5 sm:border-l sm:border-t-0 sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Icon type="shield" />
              </div>

              <div>
                <p className="font-semibold">Sécurité maximale</p>
                <p className="mt-1 text-xs text-black/45">
                  Vos données sont protégées
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-black/[0.06] p-5 sm:border-l sm:border-t-0 sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Icon type="bolt" />
              </div>

              <div>
                <p className="font-semibold">Activation rapide</p>
                <p className="mt-1 text-xs text-black/45">
                  Votre domaine sera actif très bientôt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <section className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <Link
          href="/domaines"
          className="inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-black transition hover:opacity-60"
        >
          <ArrowLeft />
          Retour aux domaines
        </Link>

        <Link
          href="/espace-client"
          className="inline-flex min-h-12 items-center justify-between gap-5 rounded-2xl bg-black px-5 text-sm font-semibold text-white shadow-lg transition hover:bg-black/90"
        >
          <span>Accéder à mon espace client</span>
          <ArrowRight />
        </Link>
      </section>
    </main>
  );
}