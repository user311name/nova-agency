import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://site-ia-inky.vercel.app/";

export const metadata: Metadata = {
  title: "IA Future — Création de site web & IA | NOVA",

  description:
    "Découvrez IA Future, un projet digital conçu par NOVA autour de l'intelligence artificielle et des nouvelles technologies. Une expérience web moderne, immersive, responsive et accessible.",

  keywords: [
    "IA Future",
    "intelligence artificielle",
    "site web intelligence artificielle",
    "site internet intelligence artificielle",
    "site web IA",
    "site internet IA",
    "création site IA",
    "création site internet IA",
    "création site internet",
    "création site web",
    "création site vitrine",
    "site web moderne",
    "site web sur mesure",
    "site internet professionnel",
    "expérience digitale",
    "expérience immersive",
    "expérience utilisateur",
    "technologie",
    "nouvelles technologies",
    "web design",
    "design web",
    "UX UI",
    "interface web",
    "développement web",
    "site responsive",
    "site mobile",
    "agence web",
    "agence digitale",
    "création site internet professionnel",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/ia-future`,
    languages: {
      "fr-FR": `${siteUrl}/realisations/ia-future`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/ia-future`,
    siteName: "NOVA",

    title: "IA Future — Création de site web & IA | NOVA",

    description:
      "Découvrez IA Future, un concept digital conçu par NOVA autour de l'intelligence artificielle, des nouvelles technologies et d'une expérience web immersive.",

    images: [
      {
        url: "/projets/site-ia.png",
        width: 1200,
        height: 630,
        alt: "IA Future — projet web réalisé par NOVA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "IA Future — Création de site web & IA | NOVA",

    description:
      "Découvrez le projet IA Future conçu par NOVA autour de l'intelligence artificielle et des nouvelles technologies.",

    images: ["/projets/site-ia.png"],
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

export default function IAFutureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}