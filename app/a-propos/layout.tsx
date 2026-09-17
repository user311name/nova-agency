import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "À propos de NOVA | Agence web & digitale",

  description:
    "Découvrez NOVA, agence web et digitale spécialisée dans la création de sites internet professionnels, modernes, rapides et sur mesure pour les entreprises, indépendants et marques.",

  keywords: [
    "NOVA agence web",
    "NOVA agence digitale",
    "agence web",
    "agence digitale",
    "agence création site internet",
    "création site internet",
    "création site web",
    "création site vitrine",
    "site internet professionnel",
    "site web professionnel",
    "site internet sur mesure",
    "site web sur mesure",
    "création site sur mesure",
    "développement web",
    "développement site internet",
    "web design",
    "design web",
    "UX UI",
    "expérience digitale",
    "SEO",
    "référencement naturel",
    "performance web",
    "site responsive",
    "site mobile",
    "agence digitale France",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/a-propos`,
    languages: {
      "fr-FR": `${siteUrl}/a-propos`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/a-propos`,
    siteName: "NOVA",

    title: "À propos de NOVA | Agence web & digitale",

    description:
      "Découvrez NOVA, agence web et digitale spécialisée dans la création de sites internet modernes, professionnels et sur mesure.",

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
      "Découvrez NOVA, agence spécialisée dans la création de sites internet modernes, professionnels et sur mesure.",

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