import type { Metadata } from "next";

const siteUrl = "https://www.agency-nova.fr";

export const metadata: Metadata = {
  title: "Notre méthode de création web | NOVA",

  description:
    "Découvrez la méthode NOVA pour créer un site internet : stratégie, conception, design, développement, optimisation SEO et mise en ligne.",

  keywords: [
    "méthode création site internet",
    "processus création site web",
    "création site internet",
    "création site web",
    "développement web",
    "design web",
    "UX UI",
    "SEO",
    "référencement naturel",
    "site web sur mesure",
    "agence web",
    "agence digitale",
    "NOVA",
  ],

  alternates: {
    canonical: `${siteUrl}/methode`,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/methode`,
    siteName: "NOVA",
    title: "Notre méthode de création web | NOVA",
    description:
      "Une méthode claire pour concevoir des sites internet modernes, performants et adaptés aux objectifs de chaque projet.",
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
      "Découvrez comment NOVA conçoit des sites internet modernes et sur mesure.",
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