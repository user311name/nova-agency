"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ConnexionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const {
      error: loginError,
    } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (loginError) {
      setLoading(false);

      setError(
        "Email ou mot de passe incorrect.",
      );

      return;
    }

    setSuccess("Connexion réussie.");

    /*
     * Récupération de la destination demandée
     * par le proxy.
     */
    const params = new URLSearchParams(
      window.location.search,
    );

    const redirect =
      params.get("redirect") ||
      "/espace-client";

    /*
     * Protection contre une redirection
     * vers un domaine externe.
     */
    const safeRedirect =
      redirect.startsWith("/") &&
      !redirect.startsWith("//")
        ? redirect
        : "/espace-client";

    router.push(safeRedirect);
    router.refresh();
  }

  return (
    <main className="auth-page">
      <div className="auth-background" />

      <section className="auth-card">
        <Link
          href="/"
          className="auth-logo"
        >
          NOVA
        </Link>

        <div className="auth-heading">
          <span className="auth-eyebrow">
            ESPACE CLIENT
          </span>

          <h1>
            Bon retour.
          </h1>

          <p>
            Connectez-vous à votre espace
            client NOVA.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <label>
            Adresse email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="vous@exemple.fr"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Mot de passe

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="auth-forgot">
            <Link href="/mot-de-passe-oublie">
              Mot de passe oublié ?
            </Link>
          </div>

          {error && (
            <div className="auth-message auth-error">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-message auth-success">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>
        </form>

        <div className="auth-bottom">
          <span>
            Vous n’avez pas encore de compte ?
          </span>

          <Link href="/inscription">
            Créer un compte
          </Link>
        </div>
      </section>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          background: #050507;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .auth-background {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: rgba(117, 58, 255, 0.12);
          filter: blur(100px);
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 2;
          padding: 48px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 28px;
          background: rgba(14, 14, 18, 0.82);
          backdrop-filter: blur(30px);
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(103, 56, 255, 0.08);
        }

        .auth-logo {
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.18em;
          margin-bottom: 55px;
        }

        .auth-heading {
          margin-bottom: 34px;
        }

        .auth-eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #9c82ff;
          font-weight: 700;
        }

        h1 {
          font-size: clamp(38px, 7vw, 58px);
          line-height: 0.95;
          letter-spacing: -0.05em;
          margin: 12px 0 18px;
        }

        .auth-heading p {
          color: #96969e;
          line-height: 1.6;
          margin: 0;
        }

        .auth-form {
          display: grid;
          gap: 20px;
        }

        label {
          display: grid;
          gap: 9px;
          color: #cfcfd5;
          font-size: 13px;
          font-weight: 600;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 17px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.045);
          color: white;
          outline: none;
          font-size: 15px;
          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }

        input::placeholder {
          color: #66666e;
        }

        input:focus {
          border-color: rgba(145, 111, 255, 0.7);
          background: rgba(255, 255, 255, 0.07);
        }

        .auth-forgot {
          text-align: right;
          margin-top: -7px;
        }

        .auth-forgot a,
        .auth-bottom a {
          color: #a991ff;
          text-decoration: none;
        }

        .auth-forgot a:hover,
        .auth-bottom a:hover {
          text-decoration: underline;
        }

        button {
          border: 0;
          border-radius: 13px;
          padding: 16px;
          margin-top: 4px;
          background: white;
          color: #08080a;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        .auth-message {
          padding: 13px 15px;
          border-radius: 12px;
          font-size: 13px;
        }

        .auth-error {
          background: rgba(255, 70, 70, 0.08);
          border: 1px solid rgba(255, 70, 70, 0.15);
          color: #ff9d9d;
        }

        .auth-success {
          background: rgba(80, 220, 150, 0.08);
          border: 1px solid rgba(80, 220, 150, 0.15);
          color: #8ff0be;
        }

        .auth-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 32px;
          padding-top: 25px;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #85858d;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .auth-page {
            padding: 20px;
          }

          .auth-card {
            padding: 30px 22px;
            border-radius: 22px;
          }

          .auth-logo {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </main>
  );
}