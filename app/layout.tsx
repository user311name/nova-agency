import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";
import CookieBanner from "@/components/CookieBanner";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NOVA — Agence digitale & création de sites web",
    template: "%s | NOVA",
  },

  description:
    "NOVA est une agence digitale spécialisée dans la création de sites internet modernes, rapides et sur mesure. Sites vitrines, refonte de sites web, développement et SEO.",

  applicationName: "NOVA",

  keywords: [
    "NOVA",
    "agence web",
    "agence digitale",
    "création de site internet",
    "création de site web",
    "création site vitrine",
    "site vitrine",
    "site internet professionnel",
    "site web professionnel",
    "site web sur mesure",
    "création site sur mesure",
    "refonte site internet",
    "refonte site web",
    "développement web",
    "web design",
    "design web",
    "SEO",
    "référencement naturel",
    "performance web",
    "site responsive",
    "site mobile",
  ],

  authors: [
    {
      name: "NOVA",
      url: siteUrl,
    },
  ],

  creator: "NOVA",
  publisher: "NOVA",

  category: "technology",

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
      "NOVA est une agence digitale spécialisée dans la création de sites internet modernes, rapides et sur mesure. Sites vitrines, refonte, développement et SEO.",

    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Agence digitale et création de sites web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "NOVA — Agence digitale & création de sites web",

    description:
      "NOVA crée des sites internet modernes, rapides et sur mesure pour les entreprises, indépendants et marques.",

    images: ["/LG-Nova.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NOVA",
  url: siteUrl,
  description:
    "Agence digitale spécialisée dans la création de sites internet modernes, rapides et sur mesure.",
  publisher: {
    "@type": "Organization",
    name: "NOVA",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo-nova.png`,
    },
  },
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

        <CookieBanner />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}