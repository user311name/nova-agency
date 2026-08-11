"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="nova-header">

        <div className="nova-header-top">

          <Link href="/" className="nova-logo">
            NOV<span>A</span>
          </Link>

          <Link href="/contact" className="nova-devis">
            Demander un devis
          </Link>

        </div>


        <nav className="nova-navigation">

          <Link href="/">
            Accueil
          </Link>

          <Link href="/services">
            Services
          </Link>

          <Link href="/realisations">
            Réalisations
          </Link>

          <Link href="/a-propos">
            À propos
          </Link>

          <Link href="/contact">
            Contact
          </Link>

        </nav>

      </header>


      <style jsx>{`

        .nova-header {
          width: 100%;
          min-height: 82px;

          padding: 0 6%;

          box-sizing: border-box;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 30px;

          background: #050505;

          position: relative;
          z-index: 9999;
        }


        .nova-header-top {
          display: flex;
          align-items: center;
        }


        .nova-logo {
          color: #ffffff;

          text-decoration: none;

          font-size: 22px;
          font-weight: 700;

          letter-spacing: 2px;

          white-space: nowrap;
        }


        .nova-logo span {
          color: #2563eb;
        }


        .nova-navigation {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: clamp(16px, 3vw, 34px);

          flex: 1;
        }


        .nova-navigation a {
          color: #8c8c8c;

          text-decoration: none;

          font-size: 12px;

          white-space: nowrap;

          transition: color 0.25s ease;
        }


        .nova-navigation a:hover {
          color: #ffffff;
        }


        .nova-devis {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          padding: 12px 22px;

          border-radius: 30px;

          background: #2563eb;

          color: #ffffff;

          text-decoration: none;

          font-size: 10px;

          white-space: nowrap;

          flex-shrink: 0;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }


        .nova-devis:hover {
          background: #1d4ed8;

          transform: translateY(-1px);
        }


        /* =========================
           TABLETTE
        ========================= */

        @media (max-width: 900px) {

          .nova-header {
            min-height: 110px;

            padding: 14px 24px;

            flex-direction: column;

            justify-content: center;

            gap: 12px;
          }


          .nova-header-top {
            width: 100%;

            justify-content: space-between;
          }


          .nova-logo {
            font-size: 22px;
          }


          .nova-navigation {
            width: 100%;

            flex: none;

            gap: 22px;
          }


          .nova-navigation a {
            font-size: 11px;
          }

        }


        /* =========================
           TELEPHONE
        ========================= */

        @media (max-width: 600px) {

          .nova-header {
            min-height: 112px;

            padding: 12px 16px 10px;

            gap: 13px;
          }


          .nova-header-top {
            width: 100%;
          }


          .nova-logo {
            font-size: 20px;

            letter-spacing: 1.5px;
          }


          .nova-devis {
            padding: 9px 15px;

            font-size: 9px;
          }


          .nova-navigation {
            width: 100%;

            display: flex;

            justify-content: space-between;

            gap: 4px;
          }


          .nova-navigation a {
            font-size: 8px;

            color: #a0a0a0;
          }

        }


        /* =========================
           PETIT TELEPHONE
        ========================= */

        @media (max-width: 400px) {

          .nova-header {
            min-height: 108px;

            padding-left: 12px;
            padding-right: 12px;
          }


          .nova-logo {
            font-size: 18px;
          }


          .nova-devis {
            padding: 8px 12px;

            font-size: 8px;
          }


          .nova-navigation a {
            font-size: 7px;
          }

        }

      `}</style>
    </>
  );
}