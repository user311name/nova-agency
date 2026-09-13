import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://noir-barber-weld.vercel.app/#booking";

export const metadata: Metadata = {
  title: "Noir Barber — Création de site web pour barber | NOVA",

  description:
    "Découvrez Noir Barber, un concept de site web créé par NOVA pour un barber moderne. Une expérience digitale premium pensée pour présenter les services, renforcer l'image de marque et faciliter la réservation.",

  keywords: [
    "Noir Barber",
    "site web barber",
    "site internet barber",
    "site vitrine barber",
    "création site barber",
    "création site internet",
    "création site web",
    "site web coiffure",
    "site internet coiffeur",
    "site web professionnel",
    "site vitrine professionnel",
    "site web sur mesure",
    "réservation en ligne",
    "site réservation",
    "web design",
    "design web",
    "UX UI",
    "expérience digitale",
    "site responsive",
    "développement web",
    "agence web",
    "agence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/noir-barber`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/noir-barber`,
    siteName: "NOVA",
    title: "Noir Barber — Création de site web pour barber | NOVA",
    description:
      "Découvrez Noir Barber, un concept digital premium conçu par NOVA pour un barber moderne, avec présentation des services et parcours de réservation.",
    images: [
      {
        url: "/projets/barber-home.png",
        width: 1200,
        height: 630,
        alt: "Noir Barber — projet web réalisé par NOVA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Noir Barber — Création de site web pour barber | NOVA",
    description:
      "Découvrez le projet Noir Barber conçu par NOVA : identité premium, UX/UI, web design et réservation.",
    images: ["/projets/barber-home.png"],
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

export default function NoirBarberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}