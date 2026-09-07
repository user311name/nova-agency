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

const premiumLinks = [
  {
    href: "/domaines",
    label: "Domaines",
  },
  {
    href: "/services",
    label: "Hébergement",
  },
  {
    href: "/emails",
    label: "Emails",
  },
  {
    href: "/securite",
    label: "Sécurité",
  },
  {
    href: "/a-propos",
    label: "À propos",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /*
   * Pages possédant leur propre header/interface.
   */
  const isSuccessPage =
    pathname === "/success" ||
    pathname.startsWith("/success/") ||
    pathname === "/domaines/succes" ||
    pathname.startsWith("/domaines/succes/") ||
    pathname.includes("/success");

  const isClientArea =
    pathname === "/espace-client" ||
    pathname.startsWith("/espace-client/");

  const isAuthPage =
    pathname === "/connexion" ||
    pathname === "/inscription" ||
    pathname === "/mot-de-passe-oublie" ||
    pathname.startsWith("/auth/");

  const hasOwnHeader =
    isSuccessPage ||
    isClientArea ||
    isAuthPage;

  if (hasOwnHeader) {
    return null;
  }

  /*
   * =========================================================
   * HEADER PREMIUM
   *
   * IMPORTANT :
   * /services n'est PAS ici.
   * La page Services utilise le header classique.
   * =========================================================
   */
  const isPremiumPage =
    pathname === "/domaines" ||
    pathname.startsWith("/domaines/") ||
    pathname === "/emails" ||
    pathname.startsWith("/emails/") ||
    pathname === "/securite" ||
    pathname.startsWith("/securite/") ||
    pathname === "/a-propos" ||
    pathname.startsWith("/a-propos/");

  /*
   * =========================================================
   * HEADER PREMIUM
   * =========================================================
   */

  if (isPremiumPage) {
    return (
      <header className="premium-navbar">
        <div className="premium-navbar-inner">
          <Link
            href="/"
            className="premium-logo"
            aria-label="NOVA — Accueil"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo-nova.png"
              alt="NOVA"
              width={150}
              height={56}
              priority
            />
          </Link>

          <nav
            className="premium-nav"
            aria-label="Navigation principale"
          >
            {premiumLinks.map((link) => {
              const active = isActivePath(
                pathname,
                link.href,
              );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "active" : ""}
                  aria-current={
                    active ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="premium-navbar-actions">
            <button
              type="button"
              className="premium-language"
              aria-label="Langue française"
            >
              FR
              <span>⌄</span>
            </button>

            <Link
              href="/espace-client"
              className="premium-client-button"
              onClick={() => setOpen(false)}
            >
              <span>Espace client</span>

              <span
                className="premium-client-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <button
              type="button"
              className={`premium-menu-toggle ${
                open ? "is-open" : ""
              }`}
              aria-label={
                open
                  ? "Fermer le menu"
                  : "Ouvrir le menu"
              }
              aria-expanded={open}
              aria-controls="premium-mobile-navigation"
              onClick={() =>
                setOpen((value) => !value)
              }
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div
          id="premium-mobile-navigation"
          className={`premium-mobile-menu ${
            open ? "is-open" : ""
          }`}
          aria-hidden={!open}
        >
          <div className="premium-mobile-glow" />

          <div className="premium-mobile-top">
            <span>NOVA / NAVIGATION</span>
            <span>MENU</span>
          </div>

          <nav aria-label="Navigation mobile">
            {premiumLinks.map((link, index) => {
              const active = isActivePath(
                pathname,
                link.href,
              );

              return (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className={active ? "active" : ""}
                  aria-current={
                    active ? "page" : undefined
                  }
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  <span className="premium-mobile-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="premium-mobile-label">
                    {link.label}
                  </span>

                  <span
                    className="premium-mobile-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/espace-client"
            className="premium-mobile-client"
            onClick={() => setOpen(false)}
          >
            <span>
              Accéder à mon espace client
            </span>

            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <style jsx>{`
          .premium-navbar {
            position: relative;
            z-index: 999999;
            width: 100%;
            min-height: 82px;
            border-bottom: 1px solid
              rgba(255, 255, 255, 0.06);
            background:
              radial-gradient(
                circle at 50% -100%,
                rgba(121, 73, 255, 0.12),
                transparent 55%
              ),
              rgba(5, 5, 10, 0.96);
            box-shadow:
              0 18px 50px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            pointer-events: auto;
          }

          .premium-navbar-inner {
            width: min(
              1320px,
              calc(100% - 68px)
            );
            min-height: 82px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 35px;
          }

          .premium-logo {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            text-decoration: none;
            cursor: pointer;
          }

          .premium-logo :global(img) {
            display: block;
            width: 108px;
            height: auto;
            object-fit: contain;
            user-select: none;
          }

          .premium-nav {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 32px;
            margin-left: auto;
          }

          .premium-nav a {
            position: relative;
            display: inline-flex;
            align-items: center;
            min-height: 40px;
            color: rgba(255, 255, 255, 0.48);
            font-size: 11px;
            font-weight: 500;
            line-height: 1;
            text-decoration: none;
            white-space: nowrap;
            cursor: pointer;
            transition:
              color 180ms ease,
              transform 180ms ease;
          }

          .premium-nav a:hover {
            color: #ffffff;
            transform: translateY(-1px);
          }

          .premium-nav a.active {
            color: #ffffff;
          }

          .premium-nav a::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 0;
            height: 1px;
            transform: translateX(-50%);
            background: #9565ff;
            box-shadow:
              0 0 10px
              rgba(149, 101, 255, 0.9);
            transition: width 180ms ease;
          }

          .premium-nav a:hover::after,
          .premium-nav a.active::after {
            width: 18px;
          }

          .premium-navbar-actions {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
          }

          .premium-language {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            min-height: 34px;
            padding: 0 8px;
            border: 0;
            outline: none;
            background: transparent;
            color: rgba(255, 255, 255, 0.38);
            font: inherit;
            font-size: 9px;
            cursor: pointer;
          }

          .premium-language span {
            color: rgba(255, 255, 255, 0.25);
            font-size: 11px;
          }

          .premium-client-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 38px;
            padding: 0 15px;
            border: 1px solid
              rgba(150, 100, 255, 0.24);
            border-radius: 10px;
            background:
              rgba(126, 71, 230, 0.08);
            color: rgba(255, 255, 255, 0.78);
            font-size: 9px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition:
              transform 180ms ease,
              background 180ms ease,
              border-color 180ms ease,
              color 180ms ease;
          }

          .premium-client-button:hover {
            transform: translateY(-1px);
            border-color:
              rgba(150, 100, 255, 0.5);
            background:
              rgba(126, 71, 230, 0.16);
            color: #ffffff;
          }

          .premium-client-arrow {
            color: #a473ff;
            font-size: 12px;
            transition:
              transform 180ms ease;
          }

          .premium-client-button:hover
            .premium-client-arrow {
            transform: translateX(3px);
          }

          .premium-menu-toggle {
            display: none;
            position: relative;
            width: 40px;
            height: 40px;
            padding: 0;
            border: 1px solid
              rgba(255, 255, 255, 0.09);
            border-radius: 10px;
            background:
              rgba(255, 255, 255, 0.025);
            cursor: pointer;
          }

          .premium-menu-toggle span {
            position: absolute;
            left: 11px;
            width: 17px;
            height: 1px;
            background:
              rgba(255, 255, 255, 0.7);
            transition:
              transform 180ms ease,
              opacity 180ms ease,
              top 180ms ease;
          }

          .premium-menu-toggle span:nth-child(1) {
            top: 13px;
          }

          .premium-menu-toggle span:nth-child(2) {
            top: 19px;
          }

          .premium-menu-toggle span:nth-child(3) {
            top: 25px;
          }

          .premium-menu-toggle.is-open
            span:nth-child(1) {
            top: 19px;
            transform: rotate(45deg);
          }

          .premium-menu-toggle.is-open
            span:nth-child(2) {
            opacity: 0;
          }

          .premium-menu-toggle.is-open
            span:nth-child(3) {
            top: 19px;
            transform: rotate(-45deg);
          }

          .premium-mobile-menu {
            position: fixed;
            inset: 82px 0 0;
            z-index: 999998;
            display: none;
            padding: 30px 24px;
            overflow-y: auto;
            background:
              radial-gradient(
                circle at 70% 10%,
                rgba(120, 70, 240, 0.14),
                transparent 35%
              ),
              #07060d;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-10px);
            transition:
              opacity 180ms ease,
              transform 180ms ease;
          }

          .premium-mobile-menu.is-open {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }

          .premium-mobile-glow {
            position: absolute;
            top: 80px;
            right: -160px;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background:
              rgba(123, 67, 235, 0.12);
            filter: blur(80px);
            pointer-events: none;
          }

          .premium-mobile-top {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid
              rgba(255, 255, 255, 0.07);
            color:
              rgba(255, 255, 255, 0.3);
            font-size: 8px;
            letter-spacing: 0.16em;
          }

          .premium-mobile-menu nav {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
          }

          .premium-mobile-menu nav a {
            display: grid;
            grid-template-columns:
              35px 1fr auto;
            align-items: center;
            gap: 15px;
            min-height: 70px;
            border-bottom: 1px solid
              rgba(255, 255, 255, 0.06);
            color:
              rgba(255, 255, 255, 0.52);
            text-decoration: none;
            cursor: pointer;
          }

          .premium-mobile-menu nav a.active {
            color: #ffffff;
          }

          .premium-mobile-number {
            color: #8f5ef2;
            font-size: 9px;
          }

          .premium-mobile-label {
            font-size: 20px;
            font-weight: 600;
          }

          .premium-mobile-arrow {
            color: #9869ff;
            font-size: 17px;
          }

          .premium-mobile-client {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px;
            padding: 16px 18px;
            border: 1px solid
              rgba(145, 94, 245, 0.25);
            border-radius: 12px;
            background:
              rgba(123, 69, 226, 0.09);
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
          }

          @media (max-width: 1050px) {
            .premium-navbar-inner {
              width: calc(100% - 40px);
            }

            .premium-nav {
              gap: 20px;
            }

            .premium-nav a {
              font-size: 10px;
            }
          }

          @media (max-width: 800px) {
            .premium-navbar {
              min-height: 72px;
            }

            .premium-navbar-inner {
              width: calc(100% - 30px);
              min-height: 72px;
            }

            .premium-nav {
              display: none;
            }

            .premium-language {
              display: none;
            }

            .premium-menu-toggle {
              display: block;
            }

            .premium-mobile-menu {
              display: block;
              inset: 72px 0 0;
            }
          }

          @media (max-width: 480px) {
            .premium-logo :global(img) {
              width: 92px;
            }

            .premium-client-button {
              min-height: 35px;
              padding: 0 11px;
            }

            .premium-client-button span:first-child {
              font-size: 8px;
            }

            .premium-menu-toggle {
              width: 37px;
              height: 37px;
            }
          }
        `}</style>
      </header>
    );
  }

  /*
   * =========================================================
   * HEADER CLASSIQUE NOVA
   * =========================================================
   */

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

        <nav
          className="main-nav"
          aria-label="Navigation principale"
        >
          {links.map((link) => {
            const active = isActivePath(
              pathname,
              link.href,
            );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
                aria-current={
                  active ? "page" : undefined
                }
              >
                <span>{link.label}</span>

                <span
                  className="nav-link-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <Link
            href="/devis"
            className="nav-button"
            onClick={() => setOpen(false)}
          >
            <span>Demander un devis</span>

            <span aria-hidden="true">
              ↗
            </span>
          </Link>

          <button
            type="button"
            className={`menu-toggle ${
              open ? "is-open" : ""
            }`}
            aria-label={
              open
                ? "Fermer le menu"
                : "Ouvrir le menu"
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() =>
              setOpen((value) => !value)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${
          open ? "is-open" : ""
        }`}
        aria-hidden={!open}
      >
        <div className="mobile-menu-glow" />

        <div className="mobile-menu-top">
          <span>NOVA / NAVIGATION</span>
          <span>MENU</span>
        </div>

        <nav aria-label="Navigation mobile">
          {links.map((link, index) => {
            const active = isActivePath(
              pathname,
              link.href,
            );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
                aria-current={
                  active ? "page" : undefined
                }
                onClick={() =>
                  setOpen(false)
                }
              >
                <span className="mobile-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mobile-label">
                  {link.label}
                </span>

                <span
                  className="mobile-arrow"
                  aria-hidden="true"
                >
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

          <span aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </header>
  );
}