"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/methode", label: "Méthode" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  /*
   * =========================================================
   * PAGE SUCCESS
   * =========================================================
   *
   * La page /success possède son propre header.
   * On ne rend donc PAS le SiteHeader global ici.
   *
   * Cela évite définitivement d'avoir deux barres de navigation.
   */

  if (pathname === "/success") {
    return null;
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link
          href="/"
          className="logo"
          aria-label="NOVA — Accueil"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-nova.png"
            alt="NOVA"
            width={160}
            height={60}
            priority
          />
        </Link>

        <nav className="main-nav" aria-label="Navigation principale">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
              >
                <span>{link.label}</span>

                <span className="nav-link-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <Link href="/devis" className="nav-button">
            <span>Demander un devis</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            type="button"
            className={`menu-toggle ${open ? "is-open" : ""}`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu-glow" />

        <div className="mobile-menu-top">
          <span>NOVA / NAVIGATION</span>
          <span>MENU</span>
        </div>

        <nav aria-label="Navigation mobile">
          {links.map((link, index) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mobile-label">{link.label}</span>

                <span className="mobile-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/devis"
          className="mobile-cta"
          onClick={() => setOpen(false)}
        >
          <span>Parler de mon projet</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}