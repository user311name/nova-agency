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
    "NOVA est une agence digitale spécialisée dans la création de sites internet modernes, rapides et sur mesure. Création de sites web, sites vitrines, refonte, développement web, web design et référencement SEO.",

  applicationName: "NOVA",

  keywords: [
    "NOVA",
    "NOVA agence digitale",
    "NOVA agence web",
    "agence web",
    "agence digitale",
    "agence digitale France",
    "création de site internet",
    "création de site web",
    "créateur de site internet",
    "création site vitrine",
    "création site professionnel",
    "site vitrine",
    "site internet professionnel",
    "site web professionnel",
    "site web sur mesure",
    "création site sur mesure",
    "refonte site internet",
    "refonte site web",
    "développement web",
    "développement site internet",
    "web design",
    "design web",
    "UX UI",
    "SEO",
    "référencement naturel",
    "référencement Google",
    "optimisation SEO",
    "performance web",
    "site responsive",
    "site mobile",
    "site internet entreprise",
    "site internet professionnel entreprise",
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
    languages: {
      "fr-FR": siteUrl,
    },
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
      "NOVA accompagne les entreprises dans la création de sites internet, la refonte de sites web, le développement sur mesure, le web design et le référencement SEO.",

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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "NOVA",
      alternateName: "NOVA Agence Digitale",
      url: siteUrl,
      description:
        "NOVA est une agence digitale spécialisée dans la création de sites internet, la création de sites web sur mesure, la refonte, le développement web, le web design et le référencement naturel.",
      inLanguage: "fr-FR",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },

    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "NOVA — Agence digitale & création de sites web",
      description:
        "Agence digitale spécialisée dans la création de sites internet, sites vitrines, refonte de sites web, développement sur mesure, web design et SEO.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "fr-FR",
    },

    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NOVA",
      alternateName: "NOVA Agence Digitale",
      url: siteUrl,

      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/LG-Nova.png`,
      },

      image: `${siteUrl}/LG-Nova.png`,

      description:
        "NOVA est une agence digitale spécialisée dans la création de sites internet modernes, rapides et sur mesure, la refonte de sites web, le développement, le web design et le référencement naturel SEO.",

      knowsAbout: [
        "Création de site internet",
        "Création de site web",
        "Création de site vitrine",
        "Site internet professionnel",
        "Site web sur mesure",
        "Agence web",
        "Agence digitale",
        "Refonte de site internet",
        "Refonte de site web",
        "Développement web",
        "Développement sur mesure",
        "Web design",
        "UX UI",
        "Référencement naturel",
        "SEO",
        "Performance web",
        "Optimisation mobile",
        "Site responsive",
      ],

      areaServed: {
        "@type": "Country",
        name: "France",
      },
    },
  ],
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