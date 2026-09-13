import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Acheter un nom de domaine | Domaines NOVA",

  description:
    "Recherchez et achetez votre nom de domaine avec NOVA. Vérifiez la disponibilité de votre domaine et construisez votre présence en ligne avec une adresse professionnelle.",

  keywords: [
    "acheter un nom de domaine",
    "achat nom de domaine",
    "nom de domaine",
    "acheter domaine",
    "domaine internet",
    "domaine .fr",
    "domaine .com",
    "nom de domaine professionnel",
    "réserver un nom de domaine",
    "vérifier disponibilité domaine",
    "agence web",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/domaines`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/domaines`,
    siteName: "NOVA",
    title: "Acheter un nom de domaine | NOVA",
    description:
      "Recherchez, vérifiez et achetez votre nom de domaine avec NOVA. Une adresse professionnelle pour votre présence en ligne.",
    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Achat de noms de domaine",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Acheter un nom de domaine | NOVA",
    description:
      "Recherchez et achetez votre nom de domaine avec NOVA.",
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

export default function DomainesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}