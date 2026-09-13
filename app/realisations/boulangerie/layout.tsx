import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

const projectUrl = "https://maison-gaillardo.vercel.app/";

export const metadata: Metadata = {
  title: "Boulangerie — Création de site web | NOVA",

  description:
    "Découvrez le projet Boulangerie réalisé par NOVA : une expérience digitale conçue pour présenter une boulangerie, ses créations et gérer ses produits en temps réel.",

  keywords: [
    "site internet boulangerie",
    "site web boulangerie",
    "création site boulangerie",
    "site vitrine boulangerie",
    "site restaurant",
    "site restauration",
    "création site internet",
    "création site web",
    "site web sur mesure",
    "design web",
    "UX UI",
    "administration site web",
    "gestion contenu site web",
    "site responsive",
    "agence web",
    "agence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/boulangerie`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/boulangerie`,
    siteName: "NOVA",
    title: "Boulangerie — Création de site web | NOVA",
    description:
      "Découvrez une expérience digitale conçue par NOVA pour présenter une boulangerie, ses créations et gérer son contenu en temps réel.",
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
      "Découvrez le projet web Boulangerie réalisé par NOVA.",
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