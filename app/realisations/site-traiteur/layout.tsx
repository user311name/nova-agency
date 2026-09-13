import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://site-traiteur-lac.vercel.app/";

export const metadata: Metadata = {
  title: "Traiteur — Création de site web | NOVA",

  description:
    "Découvrez le projet Traiteur réalisé par NOVA : un concept de site web élégant et contemporain conçu pour présenter une activité de traiteur, ses prestations et son univers culinaire.",

  keywords: [
    "site web traiteur",
    "site internet traiteur",
    "création site traiteur",
    "site vitrine traiteur",
    "site web restauration",
    "site internet restauration",
    "création site restaurant",
    "création site internet",
    "création site web",
    "site web professionnel",
    "site vitrine professionnel",
    "site web sur mesure",
    "création site sur mesure",
    "web design",
    "design web",
    "UX UI",
    "expérience digitale",
    "expérience utilisateur",
    "site responsive",
    "site mobile",
    "présentation prestations",
    "agence web",
    "agence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/site-traiteur`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/site-traiteur`,
    siteName: "NOVA",
    title: "Traiteur — Création de site web | NOVA",
    description:
      "Découvrez un concept de site web créé par NOVA pour une activité de traiteur, avec une direction artistique élégante et une expérience digitale pensée pour présenter les prestations.",
    images: [
      {
        url: "/projets/Site-traiteur.png",
        width: 1200,
        height: 630,
        alt: "Traiteur — projet web réalisé par NOVA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Traiteur — Création de site web | NOVA",
    description:
      "Découvrez le projet Traiteur conçu par NOVA autour du web design, de l'expérience digitale et de la présentation des prestations.",
    images: ["/projets/Site-traiteur.png"],
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

export default function SiteTraiteurLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}