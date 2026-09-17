import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Création de sites web — Réalisations | NOVA",

  description:
    "Découvrez les réalisations de NOVA : sites internet professionnels, sites vitrines et expériences web sur mesure conçus pour des entreprises, marques et projets modernes.",

  keywords: [
    "réalisations agence web",
    "réalisations agence digitale",
    "réalisations création site internet",
    "réalisations création site web",
    "portfolio agence web",
    "portfolio agence digitale",
    "portfolio création site internet",
    "portfolio création site web",
    "exemples sites internet",
    "exemples sites web",
    "exemples sites vitrines",
    "création site internet",
    "création site web",
    "création site vitrine",
    "site web sur mesure",
    "site internet professionnel",
    "agence web",
    "agence digitale",
    "design web",
    "web design",
    "UX UI",
    "développement web",
    "refonte site internet",
    "SEO",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations`,
    languages: {
      "fr-FR": `${siteUrl}/realisations`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations`,
    siteName: "NOVA",

    title: "Réalisations — Création de sites web | NOVA",

    description:
      "Découvrez les sites internet, sites vitrines et expériences digitales sur mesure réalisés par NOVA pour des entreprises et projets modernes.",

    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Réalisations et créations de sites web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Réalisations — Création de sites web | NOVA",

    description:
      "Découvrez les sites internet et expériences digitales réalisés par NOVA.",

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

export default function RealisationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}