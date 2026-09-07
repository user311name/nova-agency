"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import "./page.css";

type Domain = {
  id: string;
  domain: string;
  status: string;
};

type DnsRecord = {
  id: string;
  type: string;
  name: string;
  value: string;
  ttl: number;
  priority: number | null;
};

const DNS_TYPES = [
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "TXT",
  "NS",
  "SRV",
  "CAA",
];

function getDomainStatusLabel(
  status: string,
) {
  const normalized =
    status.toLowerCase();

  if (normalized === "active") {
    return "Actif";
  }

  if (
    normalized === "pending" ||
    normalized === "processing"
  ) {
    return "Activation en cours";
  }

  if (normalized === "failed") {
    return "Activation en attente";
  }

  return "Activation requise";
}

export default function DomainDnsPage() {
  const params = useParams();

  const domainParam = Array.isArray(
    params?.domain,
  )
    ? params.domain[0]
    : params?.domain;

  const domainName = decodeURIComponent(
    String(domainParam || ""),
  );

  const [domain, setDomain] =
    useState<Domain | null>(null);

  const [records, setRecords] =
    useState<DnsRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [dnsUnavailable, setDnsUnavailable] =
    useState(false);

  const [dnsUnavailableMessage, setDnsUnavailableMessage] =
    useState("");

  const [type, setType] =
    useState("A");

  const [name, setName] =
    useState("@");

  const [value, setValue] =
    useState("");

  const [ttl, setTtl] =
    useState("3600");

  const [priority, setPriority] =
    useState("10");

  async function loadDns() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setDnsUnavailable(false);
      setDnsUnavailableMessage("");

      /*
       * ========================================================
       * RÉCUPÉRATION DU DOMAINE
       * ========================================================
       */

      const domainsResponse =
        await fetch(
          "/api/domains/client/domains",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

      const domainsData =
        await domainsResponse.json();

      if (
        domainsResponse.status === 401
      ) {
        window.location.href =
          `/connexion?next=${encodeURIComponent(
            `/espace-client/domaines/${domainName}/dns`,
          )}`;

        return;
      }

      if (!domainsResponse.ok) {
        throw new Error(
          domainsData?.error ||
            "Impossible de récupérer vos domaines.",
        );
      }

      const domains =
        Array.isArray(
          domainsData?.domains,
        )
          ? domainsData.domains
          : [];

      const found =
        domains.find(
          (item: Domain) =>
            String(
              item.domain,
            ).toLowerCase() ===
            domainName.toLowerCase(),
        );

      if (!found) {
        throw new Error(
          "Ce domaine n'existe pas dans votre espace client.",
        );
      }

      setDomain(found);

      /*
       * ========================================================
       * DOMAINE NON ACTIF
       * ========================================================
       *
       * On ne tente même pas d'appeler
       * l'API DNS dans ce cas.
       */

      const normalizedStatus =
        String(
          found.status ?? "",
        )
          .trim()
          .toLowerCase();

      if (
        normalizedStatus !==
        "active"
      ) {
        setDnsUnavailable(true);

        if (
          normalizedStatus ===
            "pending" ||
          normalizedStatus ===
            "processing"
        ) {
          setDnsUnavailableMessage(
            "La configuration DNS sera disponible dès que l'activation de votre domaine sera terminée.",
          );
        } else if (
          normalizedStatus ===
          "failed"
        ) {
          setDnsUnavailableMessage(
            "La configuration DNS sera disponible dès que l'activation de votre domaine sera finalisée auprès du registrar.",
          );
        } else {
          setDnsUnavailableMessage(
            "La configuration DNS sera disponible dès que votre domaine sera actif.",
          );
        }

        return;
      }

      /*
       * ========================================================
       * RÉCUPÉRATION DE LA ZONE DNS
       * ========================================================
       */

      const dnsResponse =
        await fetch(
          `/api/domains/client/domains/${encodeURIComponent(
            found.id,
          )}/dns`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

      const dnsData =
        await dnsResponse.json();

      /*
       * ========================================================
       * DOMAINE NON DISPONIBLE POUR LE DNS
       * ========================================================
       */

      if (
        dnsResponse.status ===
          409 &&
        (
          dnsData?.code ===
            "DOMAIN_ACTIVATION_PENDING" ||
          dnsData?.code ===
            "DOMAIN_ACTIVATION_FAILED" ||
          dnsData?.code ===
            "DOMAIN_NOT_ACTIVE"
        )
      ) {
        setDnsUnavailable(true);

        setDnsUnavailableMessage(
          dnsData?.error ||
            "La configuration DNS sera disponible dès que votre domaine sera actif.",
        );

        return;
      }

      if (!dnsResponse.ok) {
        throw new Error(
          dnsData?.error ||
            "Impossible de récupérer la configuration DNS.",
        );
      }

      setRecords(
        Array.isArray(
          dnsData?.records,
        )
          ? dnsData.records
          : [],
      );
    } catch (err) {
      console.error(
        "DNS PAGE ERROR:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de charger la configuration DNS.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (domainName) {
      loadDns();
    }
  }, [domainName]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!domain || dnsUnavailable) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          `/api/domains/client/domains/${encodeURIComponent(
            domain.id,
          )}/dns`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              type,
              name,
              value,
              ttl: Number(ttl),
              priority:
                type === "MX"
                  ? Number(priority)
                  : null,
            }),
          },
        );

      const data =
        await response.json();

      if (
        response.status ===
          409 &&
        (
          data?.code ===
            "DOMAIN_ACTIVATION_PENDING" ||
          data?.code ===
            "DOMAIN_ACTIVATION_FAILED" ||
          data?.code ===
            "DOMAIN_NOT_ACTIVE"
        )
      ) {
        setDnsUnavailable(true);

        setDnsUnavailableMessage(
          data?.error ||
            "La configuration DNS sera disponible dès que votre domaine sera actif.",
        );

        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible d'ajouter l'enregistrement DNS.",
        );
      }

      setSuccess(
        "Enregistrement DNS ajouté.",
      );

      setValue("");

      await loadDns();
    } catch (err) {
      console.error(
        "DNS ADD ERROR:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'ajouter l'enregistrement DNS.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    recordId: string,
  ) {
    if (!domain || dnsUnavailable) {
      return;
    }

    const confirmed =
      window.confirm(
        "Supprimer cet enregistrement DNS ?",
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(recordId);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          `/api/domains/client/domains/${encodeURIComponent(
            domain.id,
          )}/dns/${encodeURIComponent(
            recordId,
          )}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

      const data =
        await response.json();

      if (
        response.status ===
          409 &&
        (
          data?.code ===
            "DOMAIN_ACTIVATION_PENDING" ||
          data?.code ===
            "DOMAIN_ACTIVATION_FAILED" ||
          data?.code ===
            "DOMAIN_NOT_ACTIVE"
        )
      ) {
        setDnsUnavailable(true);

        setDnsUnavailableMessage(
          data?.error ||
            "La configuration DNS sera disponible dès que votre domaine sera actif.",
        );

        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de supprimer cet enregistrement.",
        );
      }

      setSuccess(
        "Enregistrement DNS supprimé.",
      );

      await loadDns();
    } catch (err) {
      console.error(
        "DNS DELETE ERROR:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer cet enregistrement.",
      );
    } finally {
      setDeleting(null);
    }
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <main className="dns-page">
        <div className="dns-background" />

        <header className="dns-header">
          <Link
            href="/espace-client"
            className="dns-logo"
          >
            NOVA<span>.</span>
          </Link>

          <Link
            href="/espace-client/domaines"
            className="dns-back-button"
          >
            Retour aux domaines
          </Link>
        </header>

        <section className="dns-loading">
          <div className="dns-spinner" />

          <h1>
            Chargement de votre DNS
          </h1>

          <p>
            Nous récupérons la
            configuration de votre
            domaine.
          </p>
        </section>
      </main>
    );
  }

  /*
   * ============================================================
   * ERREUR CRITIQUE
   * ============================================================
   */

  if (error && !domain) {
    return (
      <main className="dns-page">
        <div className="dns-background" />

        <header className="dns-header">
          <Link
            href="/espace-client"
            className="dns-logo"
          >
            NOVA<span>.</span>
          </Link>
        </header>

        <section className="dns-error">
          <span>
            CONFIGURATION DNS
          </span>

          <h1>
            Impossible d'afficher
            ce domaine.
          </h1>

          <p>{error}</p>

          <Link
            href="/espace-client/domaines"
            className="dns-primary-button"
          >
            Retour à mes domaines
          </Link>
        </section>
      </main>
    );
  }

  /*
   * ============================================================
   * PAGE PRINCIPALE
   * ============================================================
   */

  return (
    <main className="dns-page">
      <div className="dns-background">
        <div className="dns-orb dns-orb-one" />
        <div className="dns-orb dns-orb-two" />
        <div className="dns-grid" />
      </div>

      <header className="dns-header">
        <div className="dns-header-inner">
          <Link
            href="/espace-client"
            className="dns-logo"
          >
            NOVA<span>.</span>
          </Link>

          <nav className="dns-navigation">
            <Link
              href="/espace-client/domaines"
              className="active"
            >
              Domaines
            </Link>

            <Link href="/espace-client/services">
              Hébergement
            </Link>

            <Link href="/espace-client/emails">
              Emails
            </Link>

            <Link href="/espace-client/securite">
              Sécurité
            </Link>

            <Link href="/a-propos">
              À propos
            </Link>
          </nav>

          <Link
            href="/espace-client"
            className="dns-account-button"
          >
            Espace client
          </Link>
        </div>
      </header>

      <div className="dns-shell">
        <div className="dns-breadcrumb">
          <Link href="/espace-client">
            Espace client
          </Link>

          <span>/</span>

          <Link href="/espace-client/domaines">
            Domaines
          </Link>

          <span>/</span>

          <Link
            href={`/espace-client/domaines/${encodeURIComponent(
              domainName,
            )}`}
          >
            {domainName}
          </Link>

          <span>/</span>

          <strong>DNS</strong>
        </div>

        <section className="dns-hero">
          <div>
            <span className="dns-eyebrow">
              CONFIGURATION DNS
            </span>

            <h1>
              {domain?.domain}
              <br />
              <span>
                Serveurs & DNS.
              </span>
            </h1>

            <p>
              Gérez les enregistrements
              DNS de votre domaine
              directement depuis votre
              espace client NOVA.
            </p>
          </div>

          <div className="dns-status-card">
            <span>DOMAINE</span>

            <strong>
              {domain?.domain}
            </strong>

            <small>
              {domain
                ? getDomainStatusLabel(
                    domain.status,
                  )
                : "Configuration DNS sécurisée"}
            </small>
          </div>
        </section>

        {error && (
          <div className="dns-message error">
            {error}
          </div>
        )}

        {success && (
          <div className="dns-message success">
            {success}
          </div>
        )}

        {dnsUnavailable ? (
          /*
           * ====================================================
           * DNS INDISPONIBLE
           * ====================================================
           */

          <section className="dns-unavailable">
            <div className="dns-unavailable-icon">
              DNS
            </div>

            <span className="dns-eyebrow">
              CONFIGURATION DNS
            </span>

            <h2>
              Configuration DNS
              bientôt disponible.
            </h2>

            <p>
              {dnsUnavailableMessage}
            </p>

            <div className="dns-unavailable-status">
              <div>
                <span>
                  ÉTAT DU DOMAINE
                </span>

                <strong>
                  {domain
                    ? getDomainStatusLabel(
                        domain.status,
                      )
                    : "Indisponible"}
                </strong>
              </div>

              <div>
                <span>
                  DOMAINE
                </span>

                <strong>
                  {domain?.domain}
                </strong>
              </div>
            </div>

            <div className="dns-unavailable-actions">
              <Link
                href={`/espace-client/domaines/${encodeURIComponent(
                  domainName,
                )}`}
                className="dns-primary-button"
              >
                Retour au domaine
              </Link>

              <button
                type="button"
                className="dns-secondary-button"
                onClick={loadDns}
                disabled={loading}
              >
                Vérifier à nouveau
              </button>
            </div>

            <div className="dns-unavailable-note">
              La gestion des
              enregistrements A, AAAA,
              CNAME, MX, TXT et autres
              sera automatiquement
              disponible lorsque votre
              domaine sera actif.
            </div>
          </section>
        ) : (
          /*
           * ====================================================
           * DNS ACTIF
           * ====================================================
           */

          <section className="dns-content-grid">
            <div className="dns-card dns-form-card">
              <div className="dns-card-heading">
                <span>
                  NOUVEL ENREGISTREMENT
                </span>

                <h2>
                  Ajouter un DNS
                </h2>

                <p>
                  Ajoutez un nouvel
                  enregistrement à votre
                  domaine.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
              >
                <div className="dns-form-row">
                  <label>
                    <span>
                      Type
                    </span>

                    <select
                      value={type}
                      onChange={(event) =>
                        setType(
                          event.target.value,
                        )
                      }
                    >
                      {DNS_TYPES.map(
                        (dnsType) => (
                          <option
                            key={
                              dnsType
                            }
                            value={
                              dnsType
                            }
                          >
                            {dnsType}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label>
                    <span>
                      Nom
                    </span>

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value,
                        )
                      }
                      placeholder="@"
                    />
                  </label>
                </div>

                <label>
                  <span>
                    Valeur
                  </span>

                  <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                      setValue(
                        event.target.value,
                      )
                    }
                    placeholder={
                      type === "A"
                        ? "192.168.1.1"
                        : type ===
                            "CNAME"
                          ? "www.exemple.fr"
                          : "Valeur DNS"
                    }
                    required
                  />
                </label>

                <div className="dns-form-row">
                  <label>
                    <span>
                      TTL
                    </span>

                    <select
                      value={ttl}
                      onChange={(event) =>
                        setTtl(
                          event.target.value,
                        )
                      }
                    >
                      <option value="900">
                        900 secondes
                      </option>

                      <option value="3600">
                        3600 secondes
                      </option>

                      <option value="10800">
                        10800 secondes
                      </option>

                      <option value="21600">
                        21600 secondes
                      </option>

                      <option value="43200">
                        43200 secondes
                      </option>

                      <option value="86400">
                        86400 secondes
                      </option>
                    </select>
                  </label>

                  {type === "MX" && (
                    <label>
                      <span>
                        Priorité
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={priority}
                        onChange={(
                          event,
                        ) =>
                          setPriority(
                            event.target
                              .value,
                          )
                        }
                      />
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  className="dns-submit-button"
                  disabled={saving}
                >
                  {saving
                    ? "Ajout en cours..."
                    : "Ajouter l'enregistrement"}
                </button>
              </form>
            </div>

            <div className="dns-card dns-records-card">
              <div className="dns-card-heading">
                <span>
                  ZONE DNS
                </span>

                <div className="dns-heading-line">
                  <div>
                    <h2>
                      Enregistrements
                    </h2>

                    <p>
                      {records.length}{" "}
                      enregistrement
                      {records.length >
                      1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="dns-refresh-button"
                    onClick={
                      loadDns
                    }
                    disabled={
                      loading
                    }
                  >
                    Actualiser
                  </button>
                </div>
              </div>

              {records.length ===
              0 ? (
                <div className="dns-empty">
                  <div className="dns-empty-icon">
                    DNS
                  </div>

                  <h3>
                    Aucun enregistrement
                  </h3>

                  <p>
                    Cette zone DNS ne
                    contient actuellement
                    aucun enregistrement
                    récupéré.
                  </p>
                </div>
              ) : (
                <div className="dns-records">
                  {records.map(
                    (record) => (
                      <article
                        key={
                          record.id
                        }
                        className="dns-record"
                      >
                        <div className="dns-record-type">
                          {record.type}
                        </div>

                        <div className="dns-record-main">
                          <strong>
                            {record.name}
                          </strong>

                          <span>
                            {record.value}
                          </span>
                        </div>

                        <div className="dns-record-meta">
                          <small>
                            TTL{" "}
                            {record.ttl}
                          </small>

                          {record.priority !==
                            null && (
                            <small>
                              Priorité{" "}
                              {
                                record.priority
                              }
                            </small>
                          )}
                        </div>

                        <button
                          type="button"
                          className="dns-delete-button"
                          onClick={() =>
                            handleDelete(
                              record.id,
                            )
                          }
                          disabled={
                            deleting ===
                            record.id
                          }
                        >
                          {deleting ===
                          record.id
                            ? "..."
                            : "Supprimer"}
                        </button>
                      </article>
                    ),
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        <div className="dns-bottom-actions">
          <Link
            href={`/espace-client/domaines/${encodeURIComponent(
              domainName,
            )}`}
            className="dns-secondary-button"
          >
            ← Retour au domaine
          </Link>

          <Link
            href="/espace-client/domaines"
            className="dns-secondary-button"
          >
            Mes domaines
          </Link>
        </div>
      </div>
    </main>
  );
}