import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://autopilot-solution.vercel.app/";

export const metadata: Metadata = {
  title: "AutoPilot — Création de site web & automatisation | NOVA",

  description:
    "Découvrez AutoPilot, un projet digital conçu par NOVA pour présenter les possibilités de l'automatisation de manière claire, moderne et accessible.",

  keywords: [
    "AutoPilot",
    "automatisation",
    "automatisation digitale",
    "site web automatisation",
    "création site web",
    "création site internet",
    "site web moderne",
    "expérience digitale",
    "design web",
    "UX UI",
    "conversion",
    "développement web",
    "agence web",
    "agence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/autopilot`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/autopilot`,
    siteName: "NOVA",
    title: "AutoPilot — Création de site web & automatisation | NOVA",
    description:
      "Découvrez AutoPilot, une expérience digitale conçue par NOVA autour de l'automatisation, de la clarté et de la conversion.",
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