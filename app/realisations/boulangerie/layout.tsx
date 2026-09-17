import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://maison-gaillardo.vercel.app/";

export const metadata: Metadata = {
  title: "Boulangerie — Création de site web | NOVA",

  description:
    "Découvrez le projet Boulangerie réalisé par NOVA : une expérience digitale professionnelle conçue pour présenter une boulangerie, ses créations, ses produits et gérer son contenu en temps réel.",

  keywords: [
    "site internet boulangerie",
    "site web boulangerie",
    "création site boulangerie",
    "création site internet boulangerie",
    "site vitrine boulangerie",
    "site boulangerie professionnel",
    "site internet boulangerie professionnel",
    "site restaurant",
    "site restauration",
    "site web restauration",
    "création site restaurant",
    "création site restauration",
    "création site internet",
    "création site web",
    "création site vitrine",
    "site web sur mesure",
    "site internet professionnel",
    "design web",
    "web design",
    "UX UI",
    "expérience digitale",
    "administration site web",
    "gestion contenu site web",
    "gestion produits en ligne",
    "gestion contenu en temps réel",
    "site responsive",
    "site mobile",
    "agence web",
    "agence digitale",
    "créateur site internet",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/boulangerie`,
    languages: {
      "fr-FR": `${siteUrl}/realisations/boulangerie`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/boulangerie`,
    siteName: "NOVA",

    title: "Boulangerie — Création de site web | NOVA",

    description:
      "Découvrez une expérience digitale conçue par NOVA pour présenter une boulangerie, ses créations et gérer son contenu et ses produits en temps réel.",

    images: [
      {
        url: "/projets/boulangerie-1.png",
        width: 1200,
        height: 630,
        alt: "Boulangerie — projet web réalisé par NOVA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Boulangerie — Création de site web | NOVA",

    description:
      "Découvrez le projet web Boulangerie réalisé par NOVA : web design, UX/UI et gestion de contenu.",

    images: ["/projets/boulangerie-1.png"],
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

  other: {
    "project-url": projectUrl,
  },
};

export default function BoulangerieLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}