import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Notre méthode de création web | NOVA",

  description:
    "Découvrez la méthode NOVA pour créer un site internet professionnel : stratégie, conception, UX/UI, web design, développement, optimisation SEO, performance et mise en ligne.",

  keywords: [
    "méthode création site internet",
    "méthode création site web",
    "processus création site web",
    "processus création site internet",
    "étapes création site internet",
    "création site internet",
    "création site web",
    "création site vitrine",
    "site web professionnel",
    "site internet professionnel",
    "site web sur mesure",
    "création site sur mesure",
    "développement web",
    "développement site internet",
    "web design",
    "design web",
    "UX UI",
    "UX UI design",
    "expérience utilisateur",
    "expérience digitale",
    "SEO",
    "référencement naturel",
    "optimisation SEO",
    "performance web",
    "site responsive",
    "site mobile",
    "agence web",
    "agence digitale",
    "agence création site internet",
    "NOVA",
    "NOVA agence web",
    "NOVA agence digitale",
  ],

  alternates: {
    canonical: `${siteUrl}/methode`,
    languages: {
      "fr-FR": `${siteUrl}/methode`,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/methode`,
    siteName: "NOVA",

    title: "Notre méthode de création web | NOVA",

    description:
      "Découvrez comment NOVA conçoit des sites internet professionnels, modernes et sur mesure, de la stratégie à la mise en ligne, avec une attention portée au design, aux performances et au SEO.",

    images: [
      {
        url: "/LG-Nova.png",
        width: 1200,
        height: 630,
        alt: "NOVA — Méthode de création web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Notre méthode de création web | NOVA",

    description:
      "Découvrez comment NOVA conçoit des sites internet modernes, performants et sur mesure.",

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

export default function MethodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}