import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NOVA — Agence digitale & création de sites web",
    template: "%s | NOVA",
  },

  description:
    "NOVA conçoit des sites web modernes, rapides et sur mesure pour donner aux entreprises une présence en ligne professionnelle et performante.",

  applicationName: "NOVA",

  keywords: [
    "NOVA",
    "agence web",
    "agence digitale",
    "création de site web",
    "création de site internet",
    "site vitrine",
    "site web professionnel",
    "site web sur mesure",
    "refonte de site web",
    "design web",
    "développement web",
    "SEO",
    "performance web",
  ],

  authors: [{ name: "NOVA" }],
  creator: "NOVA",
  publisher: "NOVA",

  alternates: {
    canonical: siteUrl,
  },

  verification: {
    google: "xRF6ncHnzwr5fsImw-6MBGK7r8nVReJa4bETwPP041g",
  },

  icons: {
    icon: "/LG-Nova.png",
    shortcut: "/LG-Nova.png",
    apple: "/LG-Nova.png",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "NOVA",
    title: "NOVA — Agence digitale & création de sites web",
    description:
      "NOVA conçoit des sites web modernes, rapides et sur mesure pour donner aux entreprises une présence en ligne professionnelle et performante.",
  },

  twitter: {
    card: "summary_large_image",
    title: "NOVA — Agence digitale & création de sites web",
    description:
      "NOVA conçoit des sites web modernes, rapides et sur mesure pour donner aux entreprises une présence en ligne professionnelle et performante.",
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
        <SiteHeader />

        {children}

        <Analytics />
      </body>
    </html>
  );
}