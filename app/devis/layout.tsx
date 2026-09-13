import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Devis création de site internet | NOVA",

  description:
    "Demandez votre devis pour la création d'un site internet avec NOVA. Site vitrine, site web sur mesure, refonte et développement web adaptés à votre projet.",

  keywords: [
    "devis création site internet",
    "devis site internet",
    "devis création site web",
    "prix site internet",
    "tarif création site internet",
    "création site vitrine",
    "site web sur mesure",
    "refonte site internet",
    "développement web",
    "agence web",
    "agence digitale",
    "créateur site internet",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/devis`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/devis`,
    siteName: "NOVA",
    title: "Devis création de site internet | NOVA",
    description:
      "Obtenez un devis pour votre projet de création de site internet, de site vitrine, de refonte ou de développement web sur mesure.",
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
      "Demandez votre devis pour votre projet web avec NOVA.",
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