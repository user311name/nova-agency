"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import "./page.css";


type OrderStatus = "paid" | "pending" | "failed" | "refunded";

type Order = {
  id: string;
  domain: string;
  amount: number;
  currency?: string | null;
  status: OrderStatus;
  email: string;
  stripe_session_id?: string | null;
  created_at: string;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7V3Z" />
      <path d="M14 3v5h4M10 13h5M10 17h5" />
    </svg>
  );
}

function formatDate(date: string) {
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
  currency?: string | null,
) {
  const safeCurrency =
    typeof currency === "string" &&
    currency.trim() !== ""
      ? currency.toUpperCase()
      : "EUR";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: safeCurrency,
  }).format(amount);
}

function statusLabel(status: OrderStatus) {
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
      return status;
  }
}

export default function ClientOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/client/orders",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        window.location.href =
          "/connexion?next=/espace-client/commandes";
        return;
      }

      if (!response.ok) {
        throw new Error(
          String(
            data?.error ||
              "Impossible de récupérer les commandes.",
          ),
        );
      }

      if (Array.isArray(data?.orders)) {
        setOrders(data.orders);

        if (data.orders.length > 0) {
          const firstEmail =
            typeof data.orders[0]?.email === "string"
              ? data.orders[0].email
              : "";

          setEmail(firstEmail);
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(
        "CLIENT ORDERS PAGE ERROR:",
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
    loadOrders();
  }, []);

  const totalSpent = useMemo(() => {
    return orders
      .filter(
        (order) => order.status === "paid",
      )
      .reduce(
        (total, order) =>
          total + Number(order.amount || 0),
        0,
      );
  }, [orders]);

  const paidOrders = useMemo(() => {
    return orders.filter(
      (order) => order.status === "paid",
    ).length;
  }, [orders]);

return (
    <main className="clientOrdersPage">

      <section className="ordersContainer">
        <div className="ordersBreadcrumb">
          <Link href="/espace-client">
            Espace client
          </Link>

          <span>/</span>

          <span>Mes commandes</span>
        </div>

        <div className="ordersHero">
          <div>
            <div className="ordersBadge">
              <span className="ordersBadgeDot" />
              ESPACE CLIENT
            </div>

            <h1>
              Mes
              <br />
              <span>commandes.</span>
            </h1>

            <p>
              Retrouvez ici l&apos;ensemble de vos
              commandes NOVA, leur statut et les
              informations de paiement.
            </p>
          </div>

          <div className="ordersHeroVisual">
            <div className="ordersGlow" />

            <div className="ordersCube">
              <div className="cubeFace cubeFront">
                <span>N</span>
              </div>

              <div className="cubeFace cubeTop" />

              <div className="cubeFace cubeSide" />
            </div>

            <div className="ordersVerticalText">
              NOVA · YOUR DIGITAL FUTURE
            </div>
          </div>
        </div>

        <div className="ordersStats">
          <div className="ordersStatCard">
            <div className="ordersStatIcon">
              <ShoppingBagIcon />
            </div>

            <div>
              <span>Total commandes</span>

              <strong>
                {loading ? "—" : orders.length}
              </strong>
            </div>
          </div>

          <div className="ordersStatCard">
            <div className="ordersStatIcon">
              <CheckIcon />
            </div>

            <div>
              <span>Commandes payées</span>

              <strong>
                {loading ? "—" : paidOrders}
              </strong>
            </div>
          </div>

          <div className="ordersStatCard">
            <div className="ordersStatIcon">
              <FileIcon />
            </div>

            <div>
              <span>Total dépensé</span>

              <strong>
                {loading
                  ? "—"
                  : formatPrice(
                      totalSpent,
                      "EUR",
                    )}
              </strong>
            </div>
          </div>
        </div>

        <section className="ordersSection">
          <div className="ordersSectionHeading">
            <div>
              <span className="ordersEyebrow">
                HISTORIQUE
              </span>

              <h2>
                Toutes vos commandes
              </h2>
            </div>

            <span className="ordersCount">
              {loading
                ? "Chargement..."
                : `${orders.length} commande${
                    orders.length > 1 ? "s" : ""
                  }`}
            </span>
          </div>

          {loading && (
            <div className="ordersState">
              <div className="ordersLoader" />

              <h3>
                Chargement de vos commandes...
              </h3>

              <p>
                Nous récupérons vos informations.
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="ordersState ordersStateError">
              <div className="ordersStateIcon">
                !
              </div>

              <h3>
                Impossible de charger vos
                commandes
              </h3>

              <p>{error}</p>

              <button
                type="button"
                onClick={loadOrders}
              >
                Réessayer
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            orders.length === 0 && (
              <div className="ordersState">
                <div className="ordersStateIcon">
                  <ShoppingBagIcon />
                </div>

                <h3>
                  Aucune commande pour le
                  moment
                </h3>

                <p>
                  Vos futures commandes
                  apparaîtront automatiquement
                  ici.
                </p>

                <Link href="/espace-client/domaines">
                  Rechercher un domaine
                  <ArrowIcon />
                </Link>
              </div>
            )}

          {!loading &&
            !error &&
            orders.length > 0 && (
              <div className="ordersList">
                {orders.map((order) => (
                  <article
                    className="orderRow"
                    key={order.id}
                  >
                    <div className="orderMain">
                      <div className="orderIcon">
                        <ShoppingBagIcon />
                      </div>

                      <div className="orderInfo">
                        <div className="orderDomain">
                          {order.domain}
                        </div>

                        <div className="orderMeta">
                          Commande #
                          {order.id.slice(0, 8)}

                          <span>•</span>

                          {formatDate(
                            order.created_at,
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="orderStatus">
                      {order.status === "paid" && (
                        <span className="status paid">
                          <CheckIcon />

                          {statusLabel(
                            order.status,
                          )}
                        </span>
                      )}

                      {order.status === "pending" && (
                        <span className="status pending">
                          <ClockIcon />

                          {statusLabel(
                            order.status,
                          )}
                        </span>
                      )}

                      {order.status === "failed" && (
                        <span className="status failed">
                          {statusLabel(
                            order.status,
                          )}
                        </span>
                      )}

                      {order.status === "refunded" && (
                        <span className="status refunded">
                          {statusLabel(
                            order.status,
                          )}
                        </span>
                      )}
                    </div>

                    <div className="orderPrice">
                      {formatPrice(
                        Number(order.amount || 0),
                        order.currency,
                      )}
                    </div>

                    <Link
                      href={`/espace-client/domaines/${encodeURIComponent(
                        order.domain,
                      )}`}
                      className="orderArrow"
                      aria-label={`Voir le domaine ${order.domain}`}
                    >
                      <ArrowIcon />
                    </Link>
                  </article>
                ))}
              </div>
            )}
        </section>

        <section className="ordersCTA">
          <div>
            <span className="ordersEyebrow">
              BESOIN D&apos;AUTRE CHOSE ?
            </span>

            <h2>
              Construisez votre
              <br />
              <span>
                présence digitale.
              </span>
            </h2>

            <p>
              Découvrez les domaines, services et
              solutions proposés par NOVA.
            </p>
          </div>

          <div className="ordersCTAActions">
            <Link
              href="/espace-client/domaines"
              className="primaryButton"
            >
              Trouver un domaine
              <ArrowIcon />
            </Link>

            <Link
              href="/espace-client"
              className="secondaryButton"
            >
              Espace client
            </Link>
          </div>
        </section>
      </section>

      <footer className="clientOrdersFooter">
        <Link
          href="/"
          className="footerLogo"
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