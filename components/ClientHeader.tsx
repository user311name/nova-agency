"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./ClientHeader.css";

const clientLinks = [
  {
    href: "/espace-client/domaines",
    label: "Domaines",
    icon: "📁",
  },
  {
    href: "/espace-client/services",
    label: "Hébergement",
    icon: "🏠",
  },
  {
    href: "/espace-client/emails",
    label: "Emails",
    icon: "✉️",
  },
  {
    href: "/espace-client/securite",
    label: "Sécurité",
    icon: "🔒",
  },
  {
    href: "/espace-client/commandes",
    label: "Commandes",
    icon: "🛒",
  },
  {
    href: "/espace-client/factures",
    label: "Factures",
    icon: "💳",
  },
];

function isActive(pathname: string, href: string) {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export default function ClientHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nova-client-header">
      <div className="nova-client-header-inner">

        <Link
          href="/espace-client"
          className="nova-client-logo"
          aria-label="NOVA - Espace client"
        >
          NOV<span>A</span>
        </Link>

        <nav
          className="nova-client-nav"
          aria-label="Navigation de l'espace client"
        >
          {clientLinks.map((link) => {
            const active = isActive(
              pathname,
              link.href
            );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "nova-client-nav-link active"
                    : "nova-client-nav-link"
                }
              >
                <span className="nav-link-icon">{link.icon}</span>
                <span className="nav-link-label">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nova-client-actions">

          <Link
            href="/contact"
            className="nova-client-support"
          >
            Support
          </Link>

          <Link
            href="/espace-client/parametres"
            className="nova-client-avatar"
            aria-label="Paramètres du compte"
          >
            NC
          </Link>

        </div>

        <button
          type="button"
          className={`nova-client-mobile-button ${
            open ? "is-open" : ""
          }`}
          aria-label={
            open
              ? "Fermer le menu"
              : "Ouvrir le menu"
          }
          aria-expanded={open}
          aria-controls="client-mobile-navigation"
          onClick={() =>
            setOpen((value) => !value)
          }
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      <div
        id="client-mobile-navigation"
        className={`client-mobile-menu ${
          open ? "is-open" : ""
        }`}
        aria-hidden={!open}
      >
        <div className="client-mobile-glow" />

        <div className="client-mobile-top">
          <span>NOVA / NAVIGATION</span>
          <span>MENU</span>
        </div>

        <nav aria-label="Navigation mobile client">
          {clientLinks.map((link, index) => {
            const active = isActive(
              pathname,
              link.href
            );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <span className="client-mobile-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="client-mobile-icon">
                  {link.icon}
                </span>

                <span className="client-mobile-label">
                  {link.label}
                </span>

                <span
                  className="client-mobile-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="client-mobile-cta"
          onClick={() => setOpen(false)}
        >
          <span>Contacter le support</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}