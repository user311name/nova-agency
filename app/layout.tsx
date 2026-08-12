import type { Metadata, Viewport } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "NOVA — Agence digitale premium",
    template: "%s | NOVA",
  },
  description:
    "NOVA crée des sites web modernes, rapides et élégants pour aider les entreprises à développer leur présence en ligne.",
  applicationName: "NOVA",
  keywords: [
    "NOVA",
    "agence digitale",
    "création de site web",
    "site web premium",
    "création de site internet",
    "SEO",
    "performance web",
  ],
  authors: [{ name: "NOVA" }],
  creator: "NOVA",
  publisher: "NOVA",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "NOVA",
    title: "NOVA — Agence digitale premium",
    description:
      "NOVA crée des sites web modernes, rapides et élégants pour aider les entreprises à développer leur présence en ligne.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA — Agence digitale premium",
    description:
      "NOVA crée des sites web modernes, rapides et élégants pour aider les entreprises à développer leur présence en ligne.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header className="navbar">
          <Link
            href="/"
            className="logo"
            aria-label="NOVA — Accueil"
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

          <Link
            href="/contact"
            className="nav-button"
          >
            Demander un devis
          </Link>
        </header>

        {children}
      </body>
    </html>
  );
}