"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./page.css";

type FAQItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "01",
    category: "NOVA",
    question: "Qui est NOVA ?",
    answer:
      "NOVA est une agence digitale spécialisée dans la création de sites web modernes, performants et entièrement adaptés à l'identité de chaque entreprise. Notre objectif est simple : transformer une présence en ligne en véritable outil de croissance.",
  },
  {
    id: "02",
    category: "PROJET",
    question: "Comment se déroule la création d’un site ?",
    answer:
      "Chaque projet commence par un échange afin de comprendre votre activité, vos objectifs et vos besoins. Nous travaillons ensuite la structure, le design, le développement et les différents contenus avant de mettre le site en ligne.",
  },
  {
    id: "03",
    category: "DÉLAI",
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "Le délai dépend du type de projet, du nombre de pages et des fonctionnalités souhaitées. Un site vitrine peut généralement être réalisé en quelques semaines, tandis qu’un projet plus complexe demande davantage de temps.",
  },
  {
    id: "04",
    category: "DESIGN",
    question: "Est-ce que le design est entièrement personnalisé ?",
    answer:
      "Oui. Nous ne cherchons pas à faire rentrer votre entreprise dans un template. Le design est pensé autour de votre identité, de votre cible, de votre activité et de l’image que vous souhaitez transmettre.",
  },
  {
    id: "05",
    category: "MOBILE",
    question: "Le site sera-t-il adapté aux téléphones ?",
    answer:
      "Oui. Chaque site est conçu pour fonctionner sur ordinateur, tablette et mobile. L’expérience est adaptée à chaque taille d’écran afin de rester rapide, lisible et agréable à utiliser.",
  },
  {
    id: "06",
    category: "SEO",
    question: "Le référencement naturel est-il pris en compte ?",
    answer:
      "Oui. La structure technique du site est pensée pour être propre et compréhensible par les moteurs de recherche. Nous travaillons notamment la structure des pages, les balises, les performances et les bases du référencement naturel.",
  },
  {
    id: "07",
    category: "CONTENU",
    question: "Dois-je fournir tous les textes et les images ?",
    answer:
      "Pas nécessairement. Vous pouvez fournir vos contenus si vous en avez déjà. Nous pouvons également vous accompagner dans leur organisation et leur intégration afin que le résultat final reste cohérent avec votre image.",
  },
  {
    id: "08",
    category: "HÉBERGEMENT",
    question: "Qui s’occupe de la mise en ligne ?",
    answer:
      "Nous nous occupons de la partie technique nécessaire à la mise en ligne du site. Domaine, hébergement, configuration et déploiement peuvent être intégrés au projet selon vos besoins.",
  },
  {
    id: "09",
    category: "APRÈS",
    question: "Que se passe-t-il après la livraison ?",
    answer:
      "Une fois le site livré, nous restons disponibles selon les modalités prévues avec le projet. Des modifications, évolutions ou prestations de maintenance peuvent également être mises en place.",
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("TOUT");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => [
      "TOUT",
      ...Array.from(new Set(faqItems.map((item) => item.category))),
    ],
    []
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqItems.filter((item) => {
      const matchesCategory =
        activeCategory === "TOUT" || item.category === activeCategory;

      if (!query) return matchesCategory;

      const searchableText =
        `${item.question} ${item.answer} ${item.category}`.toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [search, activeCategory]);

  const toggleItem = (id: string) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const openAll = () => {
    setOpenItems(new Set(filteredItems.map((item) => item.id)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="faq-page">
      <div className="faq-noise" />
      <div className="faq-grid" />

      <div className="faq-glow faq-glow-one" />
      <div className="faq-glow faq-glow-two" />

      {/* HERO */}
      <section className="faq-hero">
        <div className="faq-hero-top">
          <div className="faq-brand">
            <span className="faq-brand-dot" />
            <span>NOVA</span>
            <span className="faq-slash">/</span>
            <span>FAQ</span>
          </div>

          <div className="faq-hero-code">
            <span>FAQ_06</span>
            <span>2026</span>
          </div>
        </div>

        <div className="faq-hero-content">
          <div className="faq-hero-copy">
            <div className="faq-eyebrow">
              <span>06</span>
              <span>QUESTIONS / FAQ</span>
            </div>

            <h1>
              Les réponses
              <br />
              <span>avant le départ.</span>
            </h1>

            <p>
              Tout ce qu’il faut savoir avant de donner une nouvelle dimension
              digitale à votre entreprise.
            </p>

            <div className="faq-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16L21 21" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher une question..."
                aria-label="Rechercher une question"
              />

              {search && (
                <button
                  type="button"
                  className="faq-search-clear"
                  onClick={clearSearch}
                  aria-label="Effacer la recherche"
                >
                  ×
                </button>
              )}

              <span className="faq-search-count">
                {filteredItems.length.toString().padStart(2, "0")} résultats
              </span>
            </div>
          </div>

          {/* VISUEL 3D */}
          <div className="faq-hero-visual" aria-hidden="true">
            <div className="faq-orbit faq-orbit-a" />
            <div className="faq-orbit faq-orbit-b" />
            <div className="faq-orbit faq-orbit-c" />

            <div className="faq-blue-light" />

            <div className="faq-cube">
              <div className="faq-cube-top">NOVA</div>

              <div className="faq-cube-front">
                <span className="faq-cube-small">QUESTIONS</span>
                <strong>FAQ</strong>
                <span className="faq-cube-line" />
                <span className="faq-cube-code">06 / 2026</span>
              </div>

              <div className="faq-cube-side">
                <span>01</span>
                <span>02</span>
                <span>03</span>
              </div>
            </div>

            <div className="faq-cube-shadow" />
          </div>
        </div>

        <div className="faq-hero-bottom">
          <span>QUESTIONS FRÉQUENTES</span>

          <div className="faq-scroll">
            <span>SCROLL</span>
            <i />
          </div>

          <span>NOVA / DIGITAL STUDIO</span>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="faq-list-section">
        <div className="faq-section-head">
          <div className="faq-section-index">
            <span>01</span>
            <i />
          </div>

          <div>
            <div className="faq-mini-label">CENTRE D’INFORMATION</div>

            <h2>
              Tout ce qu’il faut
              <br />
              <span>savoir.</span>
            </h2>
          </div>

          <p>
            Une sélection des questions les plus fréquentes concernant la
            création, le design et la mise en ligne de votre projet.
          </p>
        </div>

        <div className="faq-toolbar">
          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="faq-actions">
            <button type="button" onClick={openAll}>
              TOUT OUVRIR
            </button>

            <span />

            <button type="button" onClick={closeAll}>
              TOUT FERMER
            </button>
          </div>
        </div>

        <div className="faq-list">
          {filteredItems.map((item) => {
            const isOpen = openItems.has(item.id);

            return (
              <article
                key={item.id}
                className={`faq-card ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-card-trigger"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-card-number">{item.id}</div>

                  <div className="faq-card-main">
                    <span className="faq-card-category">
                      {item.category}
                    </span>

                    <h3>{item.question}</h3>
                  </div>

                  <div className="faq-card-status">
                    <span />
                    <small>{isOpen ? "OPEN" : "READY"}</small>
                  </div>

                  <div className="faq-plus">
                    <span />
                    <span />
                  </div>
                </button>

                <div
                  className="faq-answer-wrap"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <span className="faq-answer-label">
                        RÉPONSE / {item.id}
                      </span>

                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>

                <span className="faq-card-bg-number">{item.id}</span>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="faq-empty">
            <span>00</span>

            <div>
              <strong>Aucune réponse trouvée.</strong>
              <p>
                Essayez avec un autre mot-clé ou réinitialisez votre recherche.
              </p>
            </div>

            <button type="button" onClick={clearSearch}>
              RÉINITIALISER
            </button>
          </div>
        )}

        <div className="faq-list-footer">
          <span>
            {filteredItems.length.toString().padStart(2, "0")} QUESTIONS
          </span>

          <span>
            {search
              ? `RECHERCHE : "${search.toUpperCase()}"`
              : "BASE DE CONNAISSANCES NOVA"}
          </span>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="faq-experience">
        <div className="faq-experience-glow" />

        <div className="faq-experience-visual">
          <div className="faq-experience-grid" />

          <div className="faq-experience-orb">
            <div className="faq-orb-core" />
            <div className="faq-orb-ring ring-one" />
            <div className="faq-orb-ring ring-two" />
            <div className="faq-orb-ring ring-three" />

            <span className="faq-orb-label label-one">DESIGN</span>
            <span className="faq-orb-label label-two">CODE</span>
            <span className="faq-orb-label label-three">
              PERFORMANCE
            </span>
          </div>
        </div>

        <div className="faq-philosophy">
          <span className="faq-philosophy-label">
            02 — L’APPROCHE NOVA
          </span>

          <h2>
            Pas seulement
            <br />
            <span>un beau site.</span>
          </h2>

          <p>
            Un site doit être beau, mais surtout utile. Chez NOVA, nous
            pensons chaque détail pour créer une expérience qui inspire
            confiance et donne envie d’aller plus loin.
          </p>

          <div className="faq-tags">
            <span>DESIGN</span>
            <span>PERFORMANCE</span>
            <span>EXPÉRIENCE</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="faq-contact">
        <div className="faq-contact-orbit orbit-one" />
        <div className="faq-contact-orbit orbit-two" />

        <div className="faq-contact-box">
          <div className="faq-contact-top">
            <span>NOVA / CONTACT</span>
            <span>03 — NEXT STEP</span>
          </div>

          <div className="faq-contact-content">
            <span className="faq-contact-label">
              UNE QUESTION RESTÉE SANS RÉPONSE ?
            </span>

            <h2>
              Parlons de
              <br />
              <span>votre projet.</span>
            </h2>

            <p>
              Chaque projet commence par une conversation. Expliquez-nous
              votre idée et construisons la suite ensemble.
            </p>

            <Link href="/contact" className="faq-contact-button">
              <span>CONTACTER NOVA</span>
              <strong>→</strong>
            </Link>
          </div>

          <div className="faq-contact-bottom">
            <span>DESIGN / DEVELOPMENT / DIGITAL</span>
            <span>PARIS — FRANCE</span>
          </div>
        </div>
      </section>
    </main>
  );
}