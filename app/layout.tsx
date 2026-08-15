import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Demander un devis | NOVA",
  description:
    "Contactez NOVA pour discuter de votre projet et demander un devis pour la création d'un site web, une refonte, du design ou une solution digitale sur mesure.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Demander un devis | NOVA",
    description:
      "Présentez votre projet à NOVA et recevez une proposition digitale adaptée à votre activité et à vos objectifs.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}