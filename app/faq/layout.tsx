import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "FAQ — Création de site internet | NOVA",

  description:
    "Retrouvez les réponses aux questions fréquentes sur la création de site internet, les tarifs, les délais, la refonte, le responsive, le SEO et les projets web avec NOVA.",

  keywords: [
    "FAQ création site internet",
    "questions création site web",
    "prix création site internet",
    "tarif site internet",
    "combien coûte un site internet",
    "délai création site internet",
    "création site vitrine",
    "refonte site internet",
    "site responsive",
    "SEO site internet",
    "agence web",
    "agence digitale",
    "création site web",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/faq`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/faq`,
    siteName: "NOVA",
    title: "FAQ — Création de site internet | NOVA",
    description:
      "Les réponses aux questions fréquentes sur la création, la refonte, le prix et le référencement des sites internet avec NOVA.",
    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — FAQ création de site internet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FAQ — Création de site internet | NOVA",
    description:
      "Les réponses aux questions fréquentes sur les projets web avec NOVA.",
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

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}