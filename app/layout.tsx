import type { Metadata, Viewport } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const siteUrl = "https://nova-agency-sigma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NOVA — Agence digitale premium",
    template: "%s | NOVA",
  },

  description:
    "NOVA crée des sites web modernes, rapides et sur mesure pour aider les entreprises à développer leur présence en ligne.",

  applicationName: "NOVA",

  keywords: [
    "NOVA",
    "agence digitale",
    "agence web",
    "création de site web",
    "création de site internet",
    "site vitrine",
    "site web sur mesure",
    "site web professionnel",
    "refonte de site web",
    "design web",
    "SEO",
    "performance web",
  ],

  authors: [
    {
      name: "NOVA",
    },
  ],

  creator: "NOVA",
  publisher: "NOVA",

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "NOVA",
    title: "NOVA — Agence digitale premium",
    description:
      "NOVA crée des sites web modernes, rapides et sur mesure pour aider les entreprises à développer leur présence en ligne.",
  },

  twitter: {
    card: "summary_large_image",
    title: "NOVA — Agence digitale premium",
    description:
      "NOVA crée des sites web modernes, rapides et sur mesure pour aider les entreprises à développer leur présence en ligne.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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