import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Devis création de site internet | NOVA",

  description:
    "Demandez votre devis pour la création d'un site internet avec NOVA. Site vitrine, site web sur mesure, refonte et développement web adaptés à votre projet et à vos objectifs.",

  keywords: [
    "devis création site internet",
    "devis site internet",
    "devis création site web",
    "devis site web",
    "prix site internet",
    "prix création site internet",
    "tarif création site internet",
    "tarif site web",
    "coût création site internet",
    "création site vitrine",
    "devis site vitrine",
    "site web sur mesure",
    "création site sur mesure",
    "refonte site internet",
    "refonte site web",
    "développement web",
    "développement site internet",
    "agence web",
    "agence digitale",
    "agence création site internet",
    "créateur site internet",
    "création site internet professionnel",
    "site internet professionnel",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/devis`,
    languages: {
      "fr-FR": `${siteUrl}/devis`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/devis`,
    siteName: "NOVA",

    title: "Devis création de site internet | NOVA",

    description:
      "Obtenez un devis pour votre projet de création de site internet, de site vitrine, de refonte ou de développement web sur mesure avec NOVA.",

    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Devis création de site internet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Devis création de site internet | NOVA",

    description:
      "Demandez votre devis pour votre projet de création de site internet avec NOVA.",

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

export default function DevisLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}