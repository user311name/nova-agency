import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Contact — Agence web & création de site | NOVA",

  description:
    "Contactez NOVA pour votre projet de création de site internet, site web sur mesure, refonte ou développement web. Échangez avec notre agence digitale sur votre projet.",

  keywords: [
    "contact agence web",
    "contacter agence web",
    "agence web contact",
    "création site internet",
    "création site web",
    "devis site internet",
    "site web sur mesure",
    "création site vitrine",
    "refonte site web",
    "développement web",
    "agence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/contact`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/contact`,
    siteName: "NOVA",
    title: "Contactez NOVA | Agence web & digitale",
    description:
      "Parlez-nous de votre projet de site internet, de refonte ou de développement web sur mesure.",
    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Contact agence web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contactez NOVA | Agence web & digitale",
    description:
      "Contactez NOVA pour discuter de votre projet web.",
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

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}