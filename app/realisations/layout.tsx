import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Création de sites web — Réalisations | NOVA",

  description:
    "Découvrez les réalisations de NOVA : sites internet, sites vitrines et expériences web sur mesure conçus pour des entreprises et projets modernes.",

  keywords: [
    "réalisations agence web",
    "réalisations création site internet",
    "portfolio agence web",
    "portfolio création site web",
    "exemples sites internet",
    "exemples sites vitrines",
    "création site internet",
    "création site web",
    "site web sur mesure",
    "agence web",
    "agence digitale",
    "design web",
    "développement web",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations`,
    siteName: "NOVA",
    title: "Nos réalisations web | NOVA",
    description:
      "Découvrez les projets web réalisés par NOVA : sites internet modernes, expériences digitales et créations sur mesure.",
    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Réalisations web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nos réalisations web | NOVA",
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