import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Création de site internet & agence web | NOVA",

  description:
    "NOVA est une agence digitale spécialisée dans la création de sites internet professionnels et de sites web sur mesure. Sites vitrines, refonte, développement web, web design, SEO et performance.",

  keywords: [
    "création de site internet",
    "création site internet",
    "création de site web",
    "création site web",
    "agence web",
    "agence digitale",
    "agence de création de site internet",
    "créateur de site internet",
    "création site vitrine",
    "site vitrine",
    "site vitrine professionnel",
    "site web professionnel",
    "site internet professionnel",
    "site internet sur mesure",
    "site web sur mesure",
    "création site sur mesure",
    "développement web",
    "développement site internet",
    "refonte site internet",
    "refonte site web",
    "web design",
    "design web",
    "UX UI",
    "SEO",
    "référencement naturel",
    "référencement Google",
    "optimisation SEO",
    "performance web",
    "site responsive",
    "site internet mobile",
    "site mobile",
    "site internet entreprise",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/services`,
    languages: {
      "fr-FR": `${siteUrl}/services`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/services`,
    siteName: "NOVA",

    title: "Création de site internet & agence web | NOVA",

    description:
      "NOVA crée des sites internet professionnels, modernes et sur mesure : sites vitrines, refonte, développement web, web design et référencement SEO.",

    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Agence web et création de sites internet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Création de site internet & agence web | NOVA",

    description:
      "NOVA crée des sites internet professionnels, modernes et sur mesure pour les entreprises, indépendants et marques.",

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

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}