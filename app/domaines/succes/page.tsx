import Link from "next/link";

export default function DomainSuccessPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <section className="w-full rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:p-10">
          <div className="mb-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
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
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
              Commande confirmée
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Votre commande est confirmée
            </h1>

            <p className="mt-4 text-base leading-7 text-black/60 sm:text-lg">
              Votre paiement a bien été enregistré. Votre domaine est
              maintenant en cours d’activation.
            </p>
          </div>

          <div className="mb-8 rounded-2xl bg-black/[0.035] p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white">
                <span className="h-2.5 w-2.5 rounded-full bg-black" />
              </div>

              <div>
                <p className="text-sm font-medium text-black">
                  Activation en cours
                </p>

                <p className="mt-1 text-sm leading-6 text-black/50">
                  Nous finalisons l’enregistrement de votre domaine.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/espace-client"
              className="group flex min-h-14 w-full items-center justify-between rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/90 active:scale-[0.99] sm:text-base"
            >
              <span>Accéder à mon espace client</span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/domaines"
              className="group flex min-h-14 w-full items-center justify-between rounded-2xl border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black/[0.035] active:scale-[0.99] sm:text-base"
            >
              <span>Retour aux domaines</span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-8 border-t border-black/10 pt-6">
            <p className="text-center text-xs leading-6 text-black/45 sm:text-sm">
              Vous retrouverez vos domaines et vos futurs services depuis
              votre espace client Nova.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}