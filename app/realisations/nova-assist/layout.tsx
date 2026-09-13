import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";
const projectUrl = "https://site-niko.vercel.app/";

export const metadata: Metadata = {
  title: "NOVA Assist — Création de site web & agence digitale | NOVA",

  description:
    "Découvrez NOVA Assist, un concept digital conçu pour présenter une agence moderne, structurer son offre et créer une expérience web professionnelle, claire et orientée conversion.",

  keywords: [
    "NOVA Assist",
    "agence digitale",
    "agence web",
    "création site agence digitale",
    "création site internet",
    "création site web",
    "site internet professionnel",
    "site web professionnel",
    "site vitrine agence",
    "site vitrine professionnel",
    "site web sur mesure",
    "création site sur mesure",
    "web design",
    "design web",
    "UX UI",
    "UX UI design",
    "expérience digitale",
    "expérience utilisateur",
    "site responsive",
    "développement web",
    "site web moderne",
    "site web premium",
    "conversion",
    "présence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/realisations/nova-assist`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/realisations/nova-assist`,
    siteName: "NOVA",
    title: "NOVA Assist — Création de site web & agence digitale | NOVA",
    description:
      "Découvrez NOVA Assist, un concept digital conçu par NOVA autour du web design, de l'UX/UI et d'une expérience digitale pensée pour présenter une agence moderne.",
    images: [
      {
        url: "/projets/nova-assist.png",
        width: 1200,
        height: 630,
        alt: "NOVA Assist — projet web réalisé par NOVA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NOVA Assist — Création de site web & agence digitale | NOVA",
    description:
      "Découvrez le projet NOVA Assist conçu autour du design web, de l'UX/UI et d'une expérience digitale professionnelle.",
    images: ["/projets/nova-assist.png"],
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

export default function NovaAssistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}