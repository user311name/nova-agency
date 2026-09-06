"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ParametresPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/connexion";
  }

  return (
    <main className="settings-page">
      <div className="settings-background" />

      <section className="settings-container">
        <Link
          href="/espace-client"
          className="back-link"
        >
          ← Retour à l'espace client
        </Link>

        <div className="settings-header">
          <span className="eyebrow">
            ESPACE CLIENT
          </span>

          <h1>Paramètres</h1>

          <p>
            Gérez les informations et la sécurité
            de votre compte NOVA.
          </p>
        </div>

        <div className="settings-grid">
          <section className="settings-card">
            <div className="card-top">
              <div>
                <span className="card-label">
                  COMPTE
                </span>

                <h2>
                  Informations du compte
                </h2>
              </div>

              <div className="card-icon">
                ◉
              </div>
            </div>

            <div className="field">
              <span>
                Adresse email
              </span>

              <div className="field-value">
                {loading
                  ? "Chargement..."
                  : email || "Aucune adresse"}
              </div>
            </div>

            <div className="info">
              Votre adresse email est utilisée
              pour vous connecter à votre espace
              client NOVA.
            </div>
          </section>

          <section className="settings-card">
            <div className="card-top">
              <div>
                <span className="card-label">
                  SÉCURITÉ
                </span>

                <h2>
                  Sécurité du compte
                </h2>
              </div>

              <div className="card-icon">
                ◇
              </div>
            </div>

            <div className="security-row">
              <div>
                <strong>
                  Mot de passe
                </strong>

                <p>
                  Modifiez votre mot de passe
                  depuis la récupération sécurisée.
                </p>
              </div>

              <Link
                href="/mot-de-passe-oublie"
                className="secondary-button"
              >
                Modifier
              </Link>
            </div>
          </section>

          <section className="settings-card danger-card">
            <div className="card-top">
              <div>
                <span className="card-label">
                  SESSION
                </span>

                <h2>
                  Déconnexion
                </h2>
              </div>

              <div className="card-icon">
                ×
              </div>
            </div>

            <p className="danger-text">
              Déconnectez votre compte de cet
              appareil.
            </p>

            {message && (
              <div className="message">
                {message}
              </div>
            )}

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </section>
        </div>
      </section>

      <style jsx>{`
        .settings-page {
          min-height: 100vh;
          background: #050507;
          color: #fff;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .settings-background {
          position: absolute;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: rgba(111, 63, 255, 0.1);
          filter: blur(130px);
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .settings-container {
          width: min(1100px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .back-link {
          display: inline-block;
          color: #a99aff;
          text-decoration: none;
          font-size: 13px;
          margin-bottom: 55px;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .settings-header {
          margin-bottom: 45px;
        }

        .eyebrow {
          color: #9b80ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        h1 {
          margin: 12px 0 16px;
          font-size: clamp(48px, 7vw, 82px);
          line-height: 0.95;
          letter-spacing: -0.06em;
        }

        .settings-header p {
          color: #92929a;
          max-width: 620px;
          line-height: 1.7;
          margin: 0;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .settings-card {
          padding: 30px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(17, 17, 21, 0.82);
          backdrop-filter: blur(20px);
        }

        .settings-card:last-child {
          grid-column: 1 / -1;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 30px;
        }

        .card-label {
          color: #777780;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        h2 {
          font-size: 22px;
          margin: 8px 0 0;
          letter-spacing: -0.03em;
        }

        .card-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: #a995ff;
          font-size: 18px;
        }

        .field {
          display: grid;
          gap: 9px;
        }

        .field > span {
          color: #777780;
          font-size: 12px;
        }

        .field-value {
          padding: 15px 16px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.035);
          color: #e8e8eb;
        }

        .info {
          margin-top: 15px;
          color: #777780;
          font-size: 12px;
          line-height: 1.6;
        }

        .security-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .security-row strong {
          font-size: 14px;
        }

        .security-row p {
          color: #777780;
          font-size: 12px;
          line-height: 1.5;
          margin: 7px 0 0;
        }

        .secondary-button {
          flex-shrink: 0;
          padding: 11px 16px;
          border-radius: 11px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .danger-card {
          border-color: rgba(255, 80, 80, 0.12);
        }

        .danger-text {
          color: #85858d;
          font-size: 13px;
          margin: 0 0 20px;
        }

        .logout-button {
          padding: 13px 18px;
          border: 1px solid rgba(255, 90, 90, 0.2);
          border-radius: 12px;
          background: rgba(255, 70, 70, 0.06);
          color: #ff9b9b;
          cursor: pointer;
          font-weight: 700;
        }

        .logout-button:hover {
          background: rgba(255, 70, 70, 0.1);
        }

        .message {
          margin-bottom: 15px;
          color: #8ff0be;
          font-size: 13px;
        }

        @media (max-width: 760px) {
          .settings-page {
            padding: 100px 18px 60px;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }

          .settings-card:last-child {
            grid-column: auto;
          }

          .security-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .settings-card {
            padding: 23px;
          }
        }
      `}</style>
    </main>
  );
}