import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Acheter un nom de domaine | Domaines NOVA",

  description:
    "Recherchez, vérifiez la disponibilité et achetez votre nom de domaine avec NOVA. Trouvez une adresse professionnelle en .fr, .com et autres extensions pour votre site internet.",

  keywords: [
    "acheter un nom de domaine",
    "achat nom de domaine",
    "nom de domaine",
    "acheter domaine",
    "acheter domaine internet",
    "nom de domaine internet",
    "nom de domaine professionnel",
    "nom de domaine entreprise",
    "réserver un nom de domaine",
    "réservation nom de domaine",
    "vérifier disponibilité domaine",
    "vérifier disponibilité nom de domaine",
    "disponibilité nom de domaine",
    "domaine .fr",
    "nom de domaine .fr",
    "domaine .com",
    "nom de domaine .com",
    "acheter domaine .fr",
    "acheter domaine .com",
    "adresse web professionnelle",
    "adresse internet professionnelle",
    "domaine pour site internet",
    "domaine pour entreprise",
    "agence web",
    "agence digitale",
    "création site internet",
    "création site web",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/domaines`,
    languages: {
      "fr-FR": `${siteUrl}/domaines`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/domaines`,
    siteName: "NOVA",

    title: "Acheter un nom de domaine | Domaines NOVA",

    description:
      "Recherchez, vérifiez et achetez votre nom de domaine avec NOVA. Choisissez une adresse professionnelle pour votre entreprise et votre site internet.",

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

    title: "Acheter un nom de domaine | Domaines NOVA",

    description:
      "Recherchez et achetez votre nom de domaine avec NOVA. Vérifiez sa disponibilité et choisissez votre adresse professionnelle.",

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