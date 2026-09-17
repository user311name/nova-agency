import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Contact — Agence web & création de site | NOVA",

  description:
    "Contactez NOVA pour votre projet de création de site internet, site web sur mesure, site vitrine, refonte ou développement web. Échangez avec notre agence digitale sur vos objectifs et votre projet.",

  keywords: [
    "contact agence web",
    "contacter agence web",
    "agence web contact",
    "contact agence digitale",
    "création site internet",
    "création site web",
    "création site vitrine",
    "site internet professionnel",
    "site web professionnel",
    "devis site internet",
    "devis création site web",
    "site web sur mesure",
    "création site sur mesure",
    "refonte site internet",
    "refonte site web",
    "développement web",
    "développement site internet",
    "web design",
    "UX UI",
    "SEO",
    "référencement naturel",
    "agence digitale",
    "agence création site internet",
    "créateur site internet",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: {
      "fr-FR": `${siteUrl}/contact`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/contact`,
    siteName: "NOVA",

    title: "Contactez NOVA | Agence web & digitale",

    description:
      "Parlez-nous de votre projet de création de site internet, de site vitrine, de refonte ou de développement web sur mesure.",

    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Contact agence web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Contactez NOVA | Agence web & digitale",

    description:
      "Contactez NOVA pour discuter de votre projet de création de site internet, de refonte ou de développement web.",

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

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}