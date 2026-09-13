import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "À propos de NOVA | Agence web & digitale",

  description:
    "Découvrez NOVA, agence web et digitale spécialisée dans la création de sites internet modernes, rapides et sur mesure pour les entreprises.",

  keywords: [
    "NOVA agence web",
    "NOVA agence digitale",
    "agence web",
    "agence digitale",
    "création site internet",
    "création site web",
    "site internet sur mesure",
    "développement web",
    "design web",
    "SEO",
    "agence création site internet",
  ],

  alternates: {
    canonical: `${siteUrl}/a-propos`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/a-propos`,
    siteName: "NOVA",
    title: "À propos de NOVA | Agence web & digitale",
    description:
      "Découvrez NOVA et notre approche de la création de sites internet et des expériences digitales sur mesure.",
    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Agence web et digitale",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "À propos de NOVA | Agence web & digitale",
    description:
      "Découvrez NOVA, agence spécialisée dans la création de sites internet modernes et sur mesure.",
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

export default function AProposLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}