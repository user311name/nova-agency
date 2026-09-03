"use client";

import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "nova-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const refuseCookies = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "refused");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <aside
      className="cookie-banner"
      role="dialog"
      aria-label="Préférences de cookies"
      aria-live="polite"
    >
      <div className="cookie-content">
        <div className="cookie-icon" aria-hidden="true">
          🍪
        </div>

        <div className="cookie-text">
          <p className="cookie-title">Votre confidentialité compte.</p>

          <p className="cookie-description">
            NOVA utilise des cookies nécessaires au fonctionnement du site.
            Vous pouvez accepter ou refuser les cookies non essentiels.
          </p>
        </div>

        <div className="cookie-actions">
          <button
            type="button"
            className="cookie-button cookie-button-secondary"
            onClick={refuseCookies}
          >
            Refuser
          </button>

          <button
            type="button"
            className="cookie-button cookie-button-primary"
            onClick={acceptCookies}
          >
            Accepter
          </button>
        </div>
      </div>
    </aside>
  );
}