"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const classicLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/methode", label: "Méthode" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const premiumLinks = [
  { href: "/domaines", label: "Domaines" },
  { href: "/services", label: "Hébergement" },
  { href: "/emails", label: "Emails" },
  { href: "/securite", label: "Sécurité" },
  { href: "/a-propos", label: "À propos" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
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

  /*
   * ============================================================
   * PAGES QUI ONT LEUR PROPRE INTERFACE
   * ============================================================
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

  if (isSuccessPage || isClientArea || isAuthPage) {
    return null;
  }

  /*
   * ============================================================
   * PAGE DOMAINES
   * ============================================================
   */

  if (pathname === "/domaines") {
    return (
      <>
        <Link
          href="/"
          className="domaines-back-button"
          aria-label="Retour au site NOVA"
        >
          <span className="domaines-back-arrow">
            ←
          </span>

          <span className="domaines-back-text">
            Retour à NOVA
          </span>
        </Link>

        <style jsx>{`
          .domaines-back-button {
            position: fixed;
            top: 24px;
            left: 28px;
            z-index: 99999;

            display: inline-flex;
            align-items: center;
            gap: 9px;

            min-height: 40px;
            padding: 0 15px;

            border: 1px solid
              rgba(255, 255, 255, 0.1);

            border-radius: 10px;

            background:
              rgba(8, 7, 15, 0.72);

            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);

            color: rgba(255, 255, 255, 0.7);

            font-family:
              Arial,
              Helvetica,
              sans-serif;

            font-size: 11px;
            font-weight: 600;

            text-decoration: none;

            box-shadow:
              0 10px 35px rgba(0, 0, 0, 0.25);

            transition:
              color 180ms ease,
              border-color 180ms ease,
              background 180ms ease,
              transform 180ms ease,
              box-shadow 180ms ease;
          }

          .domaines-back-button:hover {
            color: #ffffff;

            border-color:
              rgba(149, 101, 255, 0.45);

            background:
              rgba(24, 17, 42, 0.88);

            transform:
              translateY(-1px);

            box-shadow:
              0 14px 40px rgba(0, 0, 0, 0.35),
              0 0 25px
                rgba(126, 71, 230, 0.1);
          }

          .domaines-back-arrow {
            color: #a473ff;
            font-size: 16px;
            line-height: 1;

            transition:
              transform 180ms ease;
          }

          .domaines-back-button:hover
            .domaines-back-arrow {
            transform:
              translateX(-2px);
          }

          .domaines-back-text {
            white-space: nowrap;
          }

          @media (max-width: 600px) {
            .domaines-back-button {
              top: 16px;
              left: 16px;

              min-height: 38px;

              padding: 0 12px;

              border-radius: 9px;

              font-size: 10px;
            }

            .domaines-back-arrow {
              font-size: 15px;
            }
          }
        `}</style>
      </>
    );
  }

  /*
   * ============================================================
   * ZONE PREMIUM PUBLIQUE
   * ============================================================
   */

  const isPremiumArea =
    pathname === "/emails" ||
    pathname.startsWith("/emails/") ||
    pathname === "/securite" ||
    pathname.startsWith("/securite/") ||
    pathname === "/a-propos" ||
    pathname.startsWith("/a-propos/");

  /*
   * ============================================================
   * HEADER PREMIUM
   * ============================================================
   */

  if (isPremiumArea) {
    return (
      <>
        <header className="navbar premium-navbar">
          <div className="premium-navbar-inner">

            <Link
              href="/"
              className="premium-logo"
              aria-label="NOVA — Accueil"
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
              aria-label="Navigation NOVA"
            >
              {premiumLinks
                .filter(
                  (link) => link.href !== "/domaines"
                )
                .map((link) => {
                  const active = isActive(
                    pathname,
                    link.href
                  );

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={
                        active ? "active" : ""
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
                aria-label="Langue"
              >
                FR
                <span>⌄</span>
              </button>

              <Link
                href="/espace-client"
                className="premium-client-button"
              >
                <span>
                  Espace client
                </span>

                <span className="premium-client-arrow">
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

          <style jsx global>{`
            /*
             * =====================================================
             * HEADER PREMIUM
             * =====================================================
             */

            .premium-navbar {
              position: relative;
              z-index: 100000;
              isolation: isolate;

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
                0 18px 50px rgba(0, 0, 0, 0.25),
                inset 0 -1px 0
                  rgba(155, 102, 255, 0.025);

              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
            }

            .premium-navbar-inner {
              position: relative;
              z-index: 100001;

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
              display: flex;
              align-items: center;

              flex-shrink: 0;

              text-decoration: none;

              transition:
                opacity 180ms ease,
                transform 180ms ease;
            }

            .premium-logo:hover {
              opacity: 0.86;
              transform:
                translateX(-1px);
            }

            .premium-logo img {
              display: block;

              width: 108px;
              height: auto;

              object-fit: contain;
            }

            .premium-nav {
              display: flex;
              align-items: center;
              justify-content: center;

              gap: 32px;
              margin-left: auto;
            }

            .premium-nav a {
              position: relative;

              color:
                rgba(255, 255, 255, 0.43);

              font-size: 10px;
              font-weight: 500;
              line-height: 1;

              text-decoration: none;
              white-space: nowrap;

              transition:
                color 180ms ease,
                transform 180ms ease;
            }

            .premium-nav a:hover,
            .premium-nav a.active {
              color: #ffffff;
            }

            .premium-nav a::after {
              content: "";

              position: absolute;

              left: 50%;
              bottom: -12px;

              width: 0;
              height: 1px;

              transform:
                translateX(-50%);

              background: #9565ff;

              box-shadow:
                0 0 8px
                  rgba(149, 101, 255, 0.8);

              transition:
                width 180ms ease;
            }

            .premium-nav a:hover::after,
            .premium-nav a.active::after {
              width: 18px;
            }

            .premium-navbar-actions {
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

              color:
                rgba(255, 255, 255, 0.38);

              font: inherit;
              font-size: 9px;

              cursor: pointer;
            }

            .premium-language span {
              color:
                rgba(255, 255, 255, 0.25);

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

              color:
                rgba(255, 255, 255, 0.72);

              font-size: 9px;
              font-weight: 600;

              text-decoration: none;

              transition:
                transform 180ms ease,
                background 180ms ease,
                border-color 180ms ease,
                color 180ms ease;
            }

            .premium-client-button:hover {
              transform:
                translateY(-1px);

              border-color:
                rgba(150, 100, 255, 0.45);

              background:
                rgba(126, 71, 230, 0.15);

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
              transform:
                translateX(2px);
            }

            /*
             * =====================================================
             * BOUTON MENU
             * =====================================================
             */

            .premium-menu-toggle {
              display: none;

              position: relative;
              z-index: 100002;

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

              left: 10px;

              width: 20px;
              height: 2px;

              border-radius: 999px;

              background: #ffffff;

              transition:
                transform 180ms ease,
                opacity 180ms ease,
                top 180ms ease;
            }

            .premium-menu-toggle span:nth-child(1) {
              top: 12px;
            }

            .premium-menu-toggle span:nth-child(2) {
              top: 19px;
            }

            .premium-menu-toggle span:nth-child(3) {
              top: 26px;
            }

            .premium-menu-toggle.is-open
              span:nth-child(1) {
              top: 19px;
              transform:
                rotate(45deg);
            }

            .premium-menu-toggle.is-open
              span:nth-child(2) {
              opacity: 0;
            }

            .premium-menu-toggle.is-open
              span:nth-child(3) {
              top: 19px;
              transform:
                rotate(-45deg);
            }

            /*
             * =====================================================
             * MENU MOBILE PREMIUM
             *
             * LE POINT IMPORTANT :
             * Le menu est un élément fixed GLOBAL.
             * Il n'est pas limité par le header.
             * =====================================================
             */

            .premium-mobile-menu {
              position: fixed !important;

              top: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              left: 0 !important;

              z-index: 99999 !important;

              display: flex !important;
              flex-direction: column;

              width: 100vw !important;
              height: 100dvh !important;
              min-height: 100dvh !important;

              box-sizing: border-box;

              padding:
                96px
                24px
                max(30px, env(safe-area-inset-bottom))
                24px;

              overflow-y: auto !important;
              overflow-x: hidden;

              overscroll-behavior: contain;
              -webkit-overflow-scrolling: touch;

              background:
                radial-gradient(
                  circle at 85% 12%,
                  rgba(149, 101, 255, 0.18),
                  transparent 30%
                ),
                radial-gradient(
                  circle at 8% 82%,
                  rgba(149, 101, 255, 0.08),
                  transparent 30%
                ),
                #05050a;

              opacity: 0;
              visibility: hidden;
              pointer-events: none;

              transform:
                translate3d(0, -12px, 0);

              transition:
                opacity 220ms ease,
                transform 220ms ease,
                visibility 220ms ease;
            }

            .premium-mobile-menu.is-open {
              opacity: 1 !important;
              visibility: visible !important;
              pointer-events: auto !important;

              transform:
                translate3d(0, 0, 0);
            }

            .premium-mobile-glow {
              position: absolute;

              top: 55px;
              right: -170px;

              width: 430px;
              height: 430px;

              border-radius: 50%;

              background:
                rgba(126, 71, 230, 0.13);

              filter: blur(90px);

              pointer-events: none;
            }

            .premium-mobile-top {
              position: relative;
              z-index: 2;

              display: flex;
              align-items: center;
              justify-content: space-between;

              margin-bottom: 12px;
              padding-bottom: 14px;

              border-bottom: 1px solid
                rgba(255, 255, 255, 0.07);

              color:
                rgba(255, 255, 255, 0.32);

              font-size: 8px;
              font-weight: 600;

              letter-spacing:
                0.16em;
            }

            .premium-mobile-home,
            .premium-mobile-menu nav a {
              position: relative;
              z-index: 2;

              display: grid;

              grid-template-columns:
                34px
                minmax(0, 1fr)
                auto;

              align-items: center;

              gap: 14px;

              min-height: 68px;

              border-bottom: 1px solid
                rgba(255, 255, 255, 0.065);

              color:
                rgba(255, 255, 255, 0.58);

              text-decoration: none;

              transition:
                color 180ms ease,
                padding-left 180ms ease;
            }

            .premium-mobile-home:hover,
            .premium-mobile-menu nav a:hover,
            .premium-mobile-menu nav a.active {
              color: #ffffff;
            }

            .premium-mobile-home:hover,
            .premium-mobile-menu nav a:hover {
              padding-left: 4px;
            }

            .premium-mobile-number {
              color: #9565ff;

              font-size: 9px;
              font-weight: 600;

              letter-spacing:
                0.08em;
            }

            .premium-mobile-label {
              min-width: 0;

              font-size: 20px;
              font-weight: 600;

              line-height: 1.15;

              white-space: nowrap;
            }

            .premium-mobile-arrow {
              color: #a473ff;

              font-size: 17px;
              line-height: 1;

              transition:
                transform 180ms ease;
            }

            .premium-mobile-home:hover
              .premium-mobile-arrow,
            .premium-mobile-menu nav a:hover
              .premium-mobile-arrow,
            .premium-mobile-menu nav a.active
              .premium-mobile-arrow {
              transform:
                translateX(3px);
            }

            .premium-mobile-client {
              position: relative;
              z-index: 2;

              display: flex;
              align-items: center;
              justify-content: space-between;

              margin-top: 22px;

              padding: 16px 18px;

              border: 1px solid
                rgba(150, 100, 255, 0.25);

              border-radius: 12px;

              background:
                rgba(126, 71, 230, 0.09);

              color: #ffffff;

              font-size: 11px;
              font-weight: 600;

              text-decoration: none;

              transition:
                background 180ms ease,
                border-color 180ms ease,
                transform 180ms ease;
            }

            .premium-mobile-client:hover {
              background:
                rgba(126, 71, 230, 0.16);

              border-color:
                rgba(150, 100, 255, 0.42);

              transform:
                translateY(-1px);
            }

            /*
             * =====================================================
             * RESPONSIVE
             * =====================================================
             */

            @media (max-width: 1050px) {
              .premium-navbar-inner {
                width: min(
                  calc(100% - 40px),
                  900px
                );
              }

              .premium-nav {
                gap: 21px;
              }

              .premium-nav a {
                font-size: 9px;
              }
            }

            @media (max-width: 800px) {
              .premium-navbar {
                min-height: 72px;

                z-index: 100000;
              }

              .premium-navbar-inner {
                position: relative;

                z-index: 100001;

                min-height: 72px;

                width:
                  calc(100% - 30px);
              }

              .premium-nav {
                display: none;
              }

              .premium-menu-toggle {
                display: block;

                z-index: 100002;
              }

              .premium-language {
                display: none;
              }

              .premium-mobile-menu {
                position: fixed !important;

                top: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                left: 0 !important;

                width: 100vw !important;
                height: 100dvh !important;

                z-index: 99999 !important;

                display: flex !important;
              }
            }

            @media (max-width: 480px) {
              .premium-logo img {
                width: 92px;
              }

              .premium-client-button {
                min-height: 35px;

                padding: 0 11px;
              }

              .premium-client-button
                span:first-child {
                font-size: 8px;
              }

              .premium-menu-toggle {
                width: 37px;
                height: 37px;
              }

              .premium-mobile-menu {
                padding-left: 18px;
                padding-right: 18px;
              }

              .premium-mobile-label {
                font-size: 19px;
              }
            }

            @media (
              prefers-reduced-motion: reduce
            ) {
              .premium-mobile-menu,
              .premium-mobile-menu * {
                transition: none !important;
              }
            }
          `}</style>
        </header>

        {/*
         * ==========================================================
         * MENU MOBILE PREMIUM
         * HORS DU HEADER
         * ==========================================================
         */}

        <div
          id="premium-mobile-navigation"
          className={`premium-mobile-menu ${
            open ? "is-open" : ""
          }`}
          aria-hidden={!open}
        >
          <div className="premium-mobile-glow" />

          <div className="premium-mobile-top">
            <span>
              NOVA / NAVIGATION
            </span>

            <span>
              MENU
            </span>
          </div>

          <Link
            href="/"
            className="premium-mobile-home"
            onClick={() =>
              setOpen(false)
            }
          >
            <span className="premium-mobile-number">
              00
            </span>

            <span className="premium-mobile-label">
              Retour au site NOVA
            </span>

            <span
              className="premium-mobile-arrow"
              aria-hidden="true"
            >
              ←
            </span>
          </Link>

          <nav
            aria-label="Navigation mobile premium"
          >
            {premiumLinks
              .filter(
                (link) =>
                  link.href !== "/domaines"
              )
              .map((link, index) => {
                const active = isActive(
                  pathname,
                  link.href
                );

                return (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className={
                      active
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setOpen(false)
                    }
                  >
                    <span className="premium-mobile-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
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
            onClick={() =>
              setOpen(false)
            }
          >
            <span>
              Accéder à mon espace client
            </span>

            <span>
              ↗
            </span>
          </Link>
        </div>
      </>
    );
  }

  /*
   * ============================================================
   * HEADER CLASSIQUE NOVA
   * ============================================================
   */

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link
          href="/"
          className="logo"
          aria-label="NOVA — Accueil"
          onClick={() =>
            setOpen(false)
          }
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
          {classicLinks.map((link) => {
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
                    ? "active"
                    : ""
                }
              >
                <span>
                  {link.label}
                </span>

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
          >
            <span>
              Demander un devis
            </span>

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
          <span>
            NOVA / NAVIGATION
          </span>

          <span>
            MENU
          </span>
        </div>

        <nav aria-label="Navigation mobile">
          {classicLinks.map(
            (link, index) => {
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
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  <span className="mobile-number">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
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
            }
          )}
        </nav>

        <Link
          href="/devis"
          className="mobile-cta"
          onClick={() =>
            setOpen(false)
          }
        >
          <span>
            Parler de mon projet
          </span>

          <span aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </header>
  );
}