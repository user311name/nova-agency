"use client";

import { useState } from "react";
import "./page.css";

type Domain = {
  name: string;
  status: "Enregistrement" | "Actif";
  expiresAt?: string;
};

export default function EspaceClientPage() {
  const [domains] = useState<Domain[]>([]);

  return (
    <main className="client-page">
      <section className="client-hero">
        <div>
          <span className="client-badge">ESPACE CLIENT NOVA</span>

          <h1>
            Votre espace
            <br />
            <span>client.</span>
          </h1>

          <p>
            Retrouvez ici vos domaines, commandes et services Nova.
          </p>
        </div>
      </section>

      <section className="client-content">
        <div className="client-header">
          <div>
            <span className="section-label">TABLEAU DE BORD</span>
            <h2>Bienvenue chez Nova</h2>
            <p>
              Gérez vos services depuis un seul endroit.
            </p>
          </div>
        </div>

        <div className="client-grid">
          <article className="client-card client-card-large">
            <div className="card-top">
              <div>
                <span className="card-label">DOMAINES</span>
                <h3>Mes domaines</h3>
              </div>

              <span className="card-icon">↗</span>
            </div>

            {domains.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">◎</div>

                <h4>Aucun domaine pour le moment</h4>

                <p>
                  Vos domaines achetés apparaîtront automatiquement
                  ici après votre commande.
                </p>

                <a href="/domaines" className="client-button">
                  Acheter un domaine
                </a>
              </div>
            ) : (
              <div className="domain-list">
                {domains.map((domain) => (
                  <div className="domain-item" key={domain.name}>
                    <div>
                      <strong>{domain.name}</strong>
                      <span>{domain.status}</span>
                    </div>

                    <button type="button">
                      Gérer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="client-card">
            <div className="card-top">
              <div>
                <span className="card-label">COMMANDES</span>
                <h3>Mes commandes</h3>
              </div>

              <span className="card-icon">↗</span>
            </div>

            <div className="mini-empty">
              <strong>0 commande</strong>
              <p>
                Votre historique de commandes apparaîtra ici.
              </p>
            </div>
          </article>

          <article className="client-card">
            <div className="card-top">
              <div>
                <span className="card-label">FACTURES</span>
                <h3>Mes factures</h3>
              </div>

              <span className="card-icon">↗</span>
            </div>

            <div className="mini-empty">
              <strong>Aucune facture</strong>
              <p>
                Vos factures seront disponibles après vos achats.
              </p>
            </div>
          </article>

          <article className="client-card">
            <div className="card-top">
              <div>
                <span className="card-label">SERVICES</span>
                <h3>Mes services</h3>
              </div>

              <span className="card-icon">↗</span>
            </div>

            <div className="service-list">
              <div>
                <span>🌐</span>
                <p>Domaines</p>
              </div>

              <div>
                <span>✉</span>
                <p>E-mails professionnels</p>
              </div>

              <div>
                <span>🔒</span>
                <p>Sécurité & SSL</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}