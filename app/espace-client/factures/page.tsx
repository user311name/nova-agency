"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import "./page.css";

type Invoice = {
  id: string;
  domain: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  email: string;
  stripe_session_id?: string | null;
  created_at: string;
};

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7V3Z" />
      <path d="M14 3v5h4" />
      <path d="M10 13h5" />
      <path d="M10 17h5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v10" />
      <path d="m8 10 4 4 4-4" />
      <path d="M5 19h14" />
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function formatDate(date: string) {
  if (!date) {
    return "Date inconnue";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function formatPrice(
  amount: number,
  currency: string,
) {
  const safeAmount = Number(amount) || 0;
  const safeCurrency = currency || "EUR";

  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: safeCurrency.toUpperCase(),
    }).format(safeAmount);
  } catch {
    return `${safeAmount.toFixed(2)} €`;
  }
}

function statusLabel(status: Invoice["status"]) {
  switch (status) {
    case "paid":
      return "Payée";

    case "pending":
      return "En attente";

    case "failed":
      return "Échec";

    case "refunded":
      return "Remboursée";

    default:
      return "Inconnu";
  }
}

export default function ClientInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  async function loadInvoices() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/client/invoices",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data: {
        invoices?: Invoice[];
        error?: string;
      } = await response.json();

      if (response.status === 401) {
        window.location.href =
          "/connexion?next=/espace-client/factures";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Impossible de récupérer les factures.",
        );
      }

      const receivedInvoices = Array.isArray(
        data.invoices,
      )
        ? data.invoices
        : [];

      setInvoices(receivedInvoices);

      if (receivedInvoices.length > 0) {
        const firstEmail =
          receivedInvoices[0]?.email;

        if (
          typeof firstEmail === "string" &&
          firstEmail.trim() !== ""
        ) {
          setEmail(firstEmail);
        }
      }
    } catch (err) {
      console.error(
        "CLIENT INVOICES PAGE ERROR:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  const totalPaid = useMemo(() => {
    return invoices
      .filter(
        (invoice) =>
          invoice.status === "paid",
      )
      .reduce((total, invoice) => {
        return (
          total +
          (Number(invoice.amount) || 0)
        );
      }, 0);
  }, [invoices]);

  const paidCount = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.status === "paid",
    ).length;
  }, [invoices]);

  async function downloadInvoice(
    invoice: Invoice,
  ) {
    try {
      setDownloadingId(invoice.id);

      /*
       * On ouvre notre route sécurisée.
       *
       * La route vérifie :
       * - que le client est connecté
       * - que la facture lui appartient
       * - que le paiement est confirmé
       * - puis récupère le document Stripe disponible
       */
      const response = await fetch(
        `/api/client/orders/invoices/${encodeURIComponent(
          invoice.id,
        )}`,
        {
          method: "GET",
          cache: "no-store",
          redirect: "manual",
        },
      );

      if (response.status === 401) {
        window.location.href =
          "/connexion?next=/espace-client/factures";
        return;
      }

      /*
       * Notre API peut répondre par une redirection
       * vers le PDF ou le reçu Stripe.
       *
       * Le navigateur gère cette redirection lorsque
       * l'URL est ouverte directement.
       */
      if (
        response.type === "opaqueredirect" ||
        response.status === 0 ||
        response.status === 301 ||
        response.status === 302 ||
        response.status === 303 ||
        response.status === 307 ||
        response.status === 308
      ) {
        window.open(
          `/api/client/orders/invoices/${encodeURIComponent(
            invoice.id,
          )}`,
          "_blank",
          "noopener,noreferrer",
        );

        return;
      }

      if (!response.ok) {
        let message =
          "Impossible de récupérer cette facture.";

        try {
          const data: {
            error?: string;
          } = await response.json();

          if (data.error) {
            message = data.error;
          }
        } catch {
          // Réponse non JSON : on garde le message par défaut.
        }

        throw new Error(message);
      }

      /*
       * Si jamais l'API renvoie directement un fichier,
       * on le télécharge également.
       */
      const blob = await response.blob();

      const blobUrl =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = blobUrl;
      link.download = `facture-NOVA-${invoice.id
        .slice(0, 8)
        .toUpperCase()}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(
        "INVOICE DOWNLOAD ERROR:",
        err,
      );

      window.alert(
        err instanceof Error
          ? err.message
          : "Impossible de télécharger cette facture.",
      );
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <main className="clientInvoicesPage">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="clientInvoicesHeader">
        <Link
          href="/"
          className="clientInvoicesLogo"
        >
          NOV<span>A</span>
        </Link>

        <nav className="clientInvoicesNav">
          <Link href="/domaines">
            Domaines
          </Link>

          <Link href="/services">
            Hébergement
          </Link>

          <Link href="/emails">
            Emails
          </Link>

          <Link href="/securite">
            Sécurité
          </Link>

          <Link href="/a-propos">
            À propos
          </Link>
        </nav>

        <div className="clientInvoicesHeaderRight">
          <Link
            href="/contact"
            className="invoiceSupport"
          >
            Support
          </Link>

          <Link
            href="/espace-client"
            className="invoiceAvatar"
            aria-label="Espace client"
          >
            {email
              ? email.charAt(0).toUpperCase()
              : "N"}
          </Link>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="invoicesContainer">
        {/* BREADCRUMB */}

        <div className="invoicesBreadcrumb">
          <Link href="/espace-client">
            Espace client
          </Link>

          <span>/</span>

          <span>Mes factures</span>
        </div>

        {/* HERO */}

        <div className="invoicesHero">
          <div className="invoicesHeroContent">
            <div className="invoicesBadge">
              <span />
              ESPACE CLIENT
            </div>

            <h1>
              Mes
              <br />
              <span>factures.</span>
            </h1>

            <p>
              Retrouvez toutes vos factures NOVA,
              vos paiements et l&apos;historique de
              vos achats au même endroit.
            </p>
          </div>

          <div className="invoicesHeroVisual">
            <div className="invoiceGlow" />

            <div className="invoiceDocument">
              <div className="invoiceDocumentTop">
                <span>NOVA</span>

                <div className="invoiceDocumentDot" />
              </div>

              <div className="invoiceDocumentLines">
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className="invoiceDocumentTotal">
                <small>TOTAL</small>

                <strong>€</strong>
              </div>

              <div className="invoiceDocumentCheck">
                <CheckIcon />
              </div>
            </div>

            <div className="invoiceVerticalText">
              NOVA · DIGITAL SERVICES
            </div>
          </div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="invoiceStats">
          <div className="invoiceStatCard">
            <div className="invoiceStatIcon">
              <FileIcon />
            </div>

            <div>
              <span>Total factures</span>

              <strong>
                {loading
                  ? "—"
                  : invoices.length}
              </strong>
            </div>
          </div>

          <div className="invoiceStatCard">
            <div className="invoiceStatIcon">
              <CheckIcon />
            </div>

            <div>
              <span>Factures payées</span>

              <strong>
                {loading
                  ? "—"
                  : paidCount}
              </strong>
            </div>
          </div>

          <div className="invoiceStatCard">
            <div className="invoiceStatIcon">
              <span className="euroSymbol">
                €
              </span>
            </div>

            <div>
              <span>Total payé</span>

              <strong>
                {loading
                  ? "—"
                  : formatPrice(
                      totalPaid,
                      "EUR",
                    )}
              </strong>
            </div>
          </div>
        </div>

        {/* =====================================================
            FACTURES
        ===================================================== */}

        <section className="invoicesSection">
          <div className="invoicesSectionHeading">
            <div>
              <span className="invoiceEyebrow">
                DOCUMENTS
              </span>

              <h2>
                Toutes vos factures
              </h2>
            </div>

            <span className="invoiceCount">
              {loading
                ? "Chargement..."
                : `${invoices.length} facture${
                    invoices.length > 1
                      ? "s"
                      : ""
                  }`}
            </span>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="invoiceState">
              <div className="invoiceLoader" />

              <h3>
                Chargement de vos factures...
              </h3>

              <p>
                Nous récupérons vos documents.
              </p>
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="invoiceState invoiceStateError">
              <div className="invoiceStateIcon">
                !
              </div>

              <h3>
                Impossible de charger vos
                factures
              </h3>

              <p>{error}</p>

              <button
                type="button"
                onClick={loadInvoices}
              >
                Réessayer
              </button>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            invoices.length === 0 && (
              <div className="invoiceState">
                <div className="invoiceStateIcon">
                  <FileIcon />
                </div>

                <h3>
                  Aucune facture pour le
                  moment
                </h3>

                <p>
                  Vos factures apparaîtront
                  automatiquement après vos
                  prochains achats.
                </p>

                <Link href="/domaines">
                  Rechercher un domaine
                  <ArrowIcon />
                </Link>
              </div>
            )}

          {/* LIST */}

          {!loading &&
            !error &&
            invoices.length > 0 && (
              <div className="invoiceList">
                {invoices.map((invoice) => (
                  <article
                    className="invoiceRow"
                    key={invoice.id}
                  >
                    <div className="invoiceMain">
                      <div className="invoiceFileIcon">
                        <FileIcon />
                      </div>

                      <div className="invoiceInfo">
                        <div className="invoiceTitle">
                          Facture —{" "}
                          {invoice.domain}
                        </div>

                        <div className="invoiceMeta">
                          INV-
                          {invoice.id
                            .slice(0, 8)
                            .toUpperCase()}

                          <span>•</span>

                          {formatDate(
                            invoice.created_at,
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="invoiceStatus">
                      <span
                        className={`invoiceStatusPill ${invoice.status}`}
                      >
                        {invoice.status ===
                          "paid" && (
                          <CheckIcon />
                        )}

                        {statusLabel(
                          invoice.status,
                        )}
                      </span>
                    </div>

                    <div className="invoiceAmount">
                      {formatPrice(
                        Number(
                          invoice.amount,
                        ) || 0,
                        invoice.currency ||
                          "EUR",
                      )}
                    </div>

                    {invoice.status ===
                    "paid" ? (
                      <button
                        type="button"
                        className="invoiceDownload"
                        title={
                          downloadingId ===
                          invoice.id
                            ? "Ouverture du document..."
                            : "Télécharger la facture"
                        }
                        aria-label={
                          downloadingId ===
                          invoice.id
                            ? "Ouverture du document..."
                            : `Télécharger la facture ${invoice.domain}`
                        }
                        disabled={
                          downloadingId ===
                          invoice.id
                        }
                        onClick={() =>
                          downloadInvoice(
                            invoice,
                          )
                        }
                      >
                        {downloadingId ===
                        invoice.id ? (
                          <span
                            className="invoiceLoader"
                            aria-hidden="true"
                          />
                        ) : (
                          <DownloadIcon />
                        )}
                      </button>
                    ) : (
                      <div
                        className="invoiceDownloadDisabled"
                        aria-label="Téléchargement indisponible"
                      >
                        <DownloadIcon />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
        </section>

        {/* =====================================================
            INFO
        ===================================================== */}

        <section className="invoiceInfoPanel">
          <div className="invoiceInfoPanelIcon">
            <FileIcon />
          </div>

          <div>
            <span className="invoiceEyebrow">
              VOS DOCUMENTS
            </span>

            <h2>
              Vos factures, toujours accessibles.
            </h2>

            <p>
              Chaque paiement effectué auprès de
              NOVA est associé à un document
              accessible depuis votre espace
              client. Lorsqu&apos;un document Stripe
              est disponible, il peut être ouvert
              directement depuis cette page.
            </p>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="invoiceCTA">
          <div>
            <span className="invoiceEyebrow">
              BESOIN D&apos;UN SERVICE ?
            </span>

            <h2>
              Développez votre
              <br />
              <span>
                présence digitale.
              </span>
            </h2>

            <p>
              Domaines, hébergement, emails et
              sécurité : tout votre environnement
              digital au même endroit.
            </p>
          </div>

          <div className="invoiceCTAActions">
            <Link
              href="/domaines"
              className="invoicePrimaryButton"
            >
              Trouver un domaine
              <ArrowIcon />
            </Link>

            <Link
              href="/espace-client"
              className="invoiceSecondaryButton"
            >
              Espace client
            </Link>
          </div>
        </section>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="clientInvoicesFooter">
        <Link
          href="/"
          className="invoiceFooterLogo"
        >
          NOV<span>A</span>
        </Link>

        <p>
          © {new Date().getFullYear()} NOVA.
          Tous droits réservés.
        </p>

        <div>
          <Link href="/mentions-legales">
            Mentions légales
          </Link>

          <Link href="/confidentialite">
            Confidentialité
          </Link>

          <Link href="/contact">
            Support
          </Link>
        </div>
      </footer>
    </main>
  );
}