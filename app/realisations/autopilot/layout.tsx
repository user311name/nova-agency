import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://autopilot-solution.vercel.app/";

export const metadata: Metadata = {
  title: "AutoPilot — Création de site web & automatisation | NOVA",

  description:
    "Découvrez AutoPilot, un projet digital conçu par NOVA pour présenter les possibilités de l'automatisation de manière claire, moderne, professionnelle et accessible.",

  keywords: [
    "AutoPilot",
    "automatisation",
    "automatisation digitale",
    "automatisation entreprise",
    "site web automatisation",
    "site internet automatisation",
    "création site automatisation",
    "création site web",
    "création site internet",
    "création site vitrine",
    "site web moderne",
    "site web professionnel",
    "site web sur mesure",
    "expérience digitale",
    "expérience utilisateur",
    "web design",
    "design web",
    "UX UI",
    "conversion",
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
    canonical: `${siteUrl}/realisations/autopilot`,
    languages: {
      "fr-FR": `${siteUrl}/realisations/autopilot`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/autopilot`,
    siteName: "NOVA",

    title: "AutoPilot — Création de site web & automatisation | NOVA",

    description:
      "Découvrez AutoPilot, une expérience digitale conçue par NOVA autour de l'automatisation, de la clarté, de l'expérience utilisateur et de la conversion.",

    images: [
      {
        url: "/projets/Site-autopilot.png",
        width: 1200,
        height: 630,
        alt: "AutoPilot — projet digital réalisé par NOVA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "AutoPilot — Création de site web & automatisation | NOVA",

    description:
      "Découvrez le projet AutoPilot conçu par NOVA autour de l'automatisation et de l'expérience digitale.",

    images: ["/projets/Site-autopilot.png"],
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

export default function AutoPilotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}