import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs & ce qui est inclus | NOVA",
  description:
    "Découvrez les tarifs NOVA pour la création de sites web, ce qui est inclus dans chaque formule et les prestations complémentaires : identité visuelle, supports de communication, contenu, vidéo, SEO et intégrations.",
  alternates: {
    canonical: "/tarifs",
  },
  openGraph: {
    title: "Tarifs & ce qui est inclus | NOVA",
    description:
      "Tarifs des créations de sites web NOVA et détail des prestations incluses.",
    url: "/tarifs",
    siteName: "NOVA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs & ce qui est inclus | NOVA",
    description:
      "Découvrez les formules NOVA et les prestations incluses.",
  },
};

export default function TarifsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
