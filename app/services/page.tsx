import type { Metadata } from "next";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Création de sites web & services digitaux",
  description:
    "NOVA conçoit des sites web modernes et sur mesure : création de sites, refonte, design, identité visuelle, performance et accompagnement digital.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Création de sites web & services digitaux | NOVA",
    description:
      "Découvrez les services de NOVA : création de sites web sur mesure, refonte, design, identité visuelle, performance et accompagnement digital.",
    url: "/services",
    type: "website",
  },
};

const services = [
  {
    numero: "01",
    titre: "Création de sites web sur mesure",
    texte:
      "NOVA conçoit des sites web modernes, rapides et élégants adaptés à votre activité. Chaque projet est pensé pour présenter votre entreprise, rassurer vos clients et développer votre présence en ligne.",
  },
  {
    numero: "02",
    titre: "Refonte & optimisation de site",
    texte:
      "Nous modernisons votre site existant pour améliorer son image, son expérience utilisateur, sa présentation et ses performances afin de mieux répondre à vos objectifs.",
  },
  {
    numero: "03",
    titre: "Identité visuelle & design web",
    texte:
      "Nous créons une identité visuelle cohérente pour votre entreprise avec un univers graphique pensé pour renforcer votre image : logo, couleurs, typographie et direction artistique.",
  },
  {
    numero: "04",
    titre: "Performance web & expérience mobile",
    texte:
      "Nous optimisons la rapidité, l'affichage et l'expérience utilisateur sur ordinateur, tablette et smartphone afin de proposer une navigation fluide et agréable.",
  },
  {
    numero: "05",
    titre: "Accompagnement digital",
    texte:
      "NOVA vous accompagne dans l'évolution de votre présence en ligne avec des conseils, des améliorations et des solutions adaptées à votre activité et à vos objectifs.",
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
          NOVA crée des sites web modernes, rapides et personnalisés pour
          aider les entreprises à construire une image professionnelle et
          développer leur présence en ligne.
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