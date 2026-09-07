"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
          className="nova-client-mobile-button"
          aria-label="Ouvrir le menu"
          aria-expanded="false"
        >
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}