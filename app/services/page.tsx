import type { Metadata } from "next";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Création de sites web & services digitaux",
  description:
    "NOVA crée des sites web modernes, rapides et élégants : création de sites, refonte, identité visuelle, optimisation des performances et accompagnement digital.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Création de sites web & services digitaux | NOVA",
    description:
      "Découvrez les services NOVA : création de sites web premium, refonte, identité visuelle, performances et accompagnement digital.",
    url: "/services",
    type: "website",
  },
};

const services = [
  {
    numero: "01",
    titre: "Création de sites web premium",
    texte:
      "Nous concevons des sites modernes, rapides et élégants adaptés à votre activité. Chaque projet est pensé pour présenter votre entreprise, rassurer vos clients et développer votre présence en ligne.",
  },
  {
    numero: "02",
    titre: "Refonte & optimisation",
    texte:
      "Nous améliorons votre site existant pour lui donner une image plus professionnelle, une meilleure expérience utilisateur et une présentation plus adaptée à vos objectifs.",
  },
  {
    numero: "03",
    titre: "Identité visuelle & design",
    texte:
      "Nous créons une image forte pour votre entreprise avec un univers graphique cohérent : logo, couleurs et direction artistique.",
  },
  {
    numero: "04",
    titre: "Optimisation des performances",
    texte:
      "Nous améliorons la rapidité, l'affichage et l'expérience sur ordinateur, tablette et mobile afin de proposer un site plus agréable.",
  },
  {
    numero: "05",
    titre: "Accompagnement digital",
    texte:
      "Nous vous accompagnons dans l'évolution de votre présence en ligne avec des conseils et des améliorations adaptées à votre activité.",
  },
];

export default function Services() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <p className="services-tag">NOS SERVICES</p>

        <h1>
          Des solutions digitales
          <br />
          <span>pensées pour votre réussite.</span>
        </h1>

        <p className="services-intro">
          NOVA crée des sites premium, modernes et personnalisés pour aider
          les entreprises à construire une image forte sur internet.
        </p>
      </section>

      <section className="services-list">
        {services.map((service) => (
          <div className="service-card" key={service.numero}>
            <div className="service-number">{service.numero}</div>

            <div>
              <h2>{service.titre}</h2>

              <p>{service.texte}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="services-final">
        <h2>
          Votre projet mérite
          <br />
          plus qu&apos;un simple site.
        </h2>

        <p>
          Nous créons des expériences digitales qui donnent confiance à vos
          clients et valorisent votre activité.
        </p>

        <Link href="/contact">Parlons de votre projet →</Link>
      </section>
    </main>
  );
}