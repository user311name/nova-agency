"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
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
      error: resetError,
    } =
      await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo:
            `${window.location.origin}/auth/callback?next=/mot-de-passe-oublie`,
        },
      );

    setLoading(false);

    if (resetError) {
      setError(
        "Impossible d'envoyer le lien de réinitialisation.",
      );
      return;
    }

    setSuccess(
      "Si cette adresse possède un compte, un email de réinitialisation vient d'être envoyé.",
    );
  }

  return (
    <main className="reset-page">
      <section className="reset-card">
        <Link
          href="/"
          className="logo"
        >
          NOVA
        </Link>

        <span className="eyebrow">
          SÉCURITÉ
        </span>

        <h1>
          Mot de passe oublié ?
        </h1>

        <p>
          Entrez votre adresse email et nous
          vous enverrons un lien sécurisé pour
          récupérer votre compte.
        </p>

        <form
          onSubmit={handleSubmit}
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
              required
            />
          </label>

          {error && (
            <div className="message error">
              {error}
            </div>
          )}

          {success && (
            <div className="message success">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Envoi..."
              : "Envoyer le lien"}
          </button>
        </form>

        <Link
          href="/connexion"
          className="back"
        >
          ← Retour à la connexion
        </Link>
      </section>

      <style jsx>{`
        .reset-page {
          min-height: 100vh;
          background: #050507;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .reset-card {
          width: 100%;
          max-width: 480px;
          padding: 48px;
          border-radius: 28px;
          background: #0e0e12;
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .logo {
          display: block;
          color: white;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.18em;
          margin-bottom: 55px;
        }

        .eyebrow {
          color: #9c82ff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        h1 {
          font-size: 48px;
          line-height: 1;
          letter-spacing: -0.05em;
          margin: 12px 0 18px;
        }

        p {
          color: #92929a;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        form {
          display: grid;
          gap: 20px;
        }

        label {
          display: grid;
          gap: 9px;
          color: #ccc;
          font-size: 13px;
          font-weight: 600;
        }

        input {
          padding: 16px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: white;
          outline: none;
        }

        button {
          padding: 16px;
          border: 0;
          border-radius: 13px;
          background: white;
          color: #050507;
          font-weight: 800;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.5;
        }

        .message {
          padding: 13px;
          border-radius: 12px;
          font-size: 13px;
        }

        .error {
          color: #ff9d9d;
          background: rgba(255, 70, 70, 0.08);
        }

        .success {
          color: #8ff0be;
          background: rgba(80, 220, 150, 0.08);
        }

        .back {
          display: block;
          margin-top: 25px;
          color: #a991ff;
          text-decoration: none;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .reset-card {
            padding: 30px 22px;
          }

          h1 {
            font-size: 40px;
          }
        }
      `}</style>
    </main>
  );
}