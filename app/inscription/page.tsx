"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function InscriptionPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email
      .trim()
      .toLowerCase();

    if (password.length < 8) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Les mots de passe ne correspondent pas.",
      );
      return;
    }

    setLoading(true);

    const {
      data,
      error: signupError,
    } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        emailRedirectTo:
          `${window.location.origin}/auth/callback`,
      },
    });

    if (signupError) {
      setLoading(false);
      setError(signupError.message);
      return;
    }

    setLoading(false);

    if (data.session) {
      router.push("/espace-client");
      router.refresh();
      return;
    }

    setSuccess(
      "Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse.",
    );
  }

  return (
    <main className="auth-page">
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
            Créez votre compte.
          </h1>

          <p>
            Gérez vos domaines et services
            NOVA depuis un seul espace.
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
              placeholder="8 caractères minimum"
              autoComplete="new-password"
              required
            />
          </label>

          <label>
            Confirmer le mot de passe
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value,
                )
              }
              placeholder="Confirmez votre mot de passe"
              autoComplete="new-password"
              required
            />
          </label>

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
              ? "Création..."
              : "Créer mon compte"}
          </button>
        </form>

        <div className="auth-bottom">
          <span>
            Vous avez déjà un compte ?
          </span>

          <Link href="/connexion">
            Se connecter
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
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          padding: 48px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 28px;
          background: rgba(14, 14, 18, 0.92);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
        }

        .auth-logo {
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.18em;
          margin-bottom: 45px;
        }

        .auth-heading {
          margin-bottom: 32px;
        }

        .auth-eyebrow {
          color: #9c82ff;
          font-size: 11px;
          letter-spacing: 0.2em;
          font-weight: 700;
        }

        h1 {
          font-size: clamp(36px, 7vw, 54px);
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
          gap: 19px;
        }

        label {
          display: grid;
          gap: 9px;
          color: #cfcfd5;
          font-size: 13px;
          font-weight: 600;
        }

        input {
          box-sizing: border-box;
          width: 100%;
          padding: 16px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.045);
          color: white;
          outline: none;
          font-size: 15px;
        }

        input:focus {
          border-color: rgba(145, 111, 255, 0.7);
        }

        button {
          border: 0;
          border-radius: 13px;
          padding: 16px;
          margin-top: 5px;
          background: white;
          color: #08080a;
          font-weight: 800;
          cursor: pointer;
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
          color: #ff9d9d;
        }

        .auth-success {
          background: rgba(80, 220, 150, 0.08);
          color: #8ff0be;
        }

        .auth-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 30px;
          padding-top: 24px;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #85858d;
          font-size: 13px;
        }

        .auth-bottom a {
          color: #a991ff;
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .auth-card {
            padding: 30px 22px;
          }
        }
      `}</style>
    </main>
  );
}