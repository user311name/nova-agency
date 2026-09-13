import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Création de site internet & agence web | NOVA",

  description:
    "NOVA est une agence web spécialisée dans la création de sites internet et de sites web sur mesure. Sites vitrines, refonte, développement web, SEO et performance.",

  keywords: [
    "création de site internet",
    "création site internet",
    "création de site web",
    "création site web",
    "agence web",
    "agence digitale",
    "agence de création de site internet",
    "créateur de site internet",
    "création site vitrine",
    "site vitrine professionnel",
    "site web professionnel",
    "site internet sur mesure",
    "site web sur mesure",
    "développement web",
    "développement site internet",
    "refonte site internet",
    "refonte site web",
    "design web",
    "UX UI",
    "SEO",
    "référencement naturel",
    "performance web",
    "site responsive",
    "site internet mobile",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/services`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/services`,
    siteName: "NOVA",
    title: "Création de site internet & agence web | NOVA",
    description:
      "Création de sites internet modernes, rapides et sur mesure. NOVA accompagne les entreprises dans leur présence digitale, leur développement web et leur SEO.",
    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Agence web et création de sites internet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Création de site internet & agence web | NOVA",
    description:
      "NOVA crée des sites internet modernes, rapides et sur mesure pour les entreprises.",
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

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}