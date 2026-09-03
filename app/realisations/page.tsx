"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./page.css";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  year: string;
  tags: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "BOULANGERIE",
    category: "SITE PREMIUM • BOULANGERIE & PÂTISSERIE",
    description:
      "Projet concept pensé pour valoriser une boulangerie à travers une identité digitale chaleureuse, une présentation élégante des créations et une interface d’administration permettant de gérer les contenus du site.",
    image: "/projets/Boulangerie-1.png",
    href: "/realisations/boulangerie",
    year: "2026",
    tags: ["SITE PREMIUM", "BOULANGERIE"],
  },
  {
    number: "02",
    title: "NOIR BARBER",
    category: "SITE PREMIUM • BARBER",
    description:
      "Projet concept pensé autour de l’image, de la prise de rendez-vous et d’une expérience plus premium pour un barber moderne.",
    image: "/projets/barber-home.png",
    href: "/realisations/noir-barber",
    year: "2026",
    tags: ["SITE PREMIUM", "BARBER"],
  },
  {
    number: "03",
    title: "SITE TRAITEUR",
    category: "SITE PREMIUM • RESTAURATION & TRAITEUR",
    description:
      "Projet concept pensé pour valoriser une activité de traiteur à travers une identité visuelle élégante, une présentation claire de l’offre et une expérience digitale chaleureuse.",
    image: "/projets/Site-traiteur.png",
    href: "/realisations/site-traiteur",
    year: "2026",
    tags: ["SITE PREMIUM", "TRAITEUR"],
  },
  {
    number: "04",
    title: "AUTOPILOT",
    category: "SITE PREMIUM • AUTOMATISATION",
    description:
      "Projet concept imaginé pour présenter des solutions d’automatisation de manière moderne, claire et accessible, avec une expérience orientée vers la prise de contact.",
    image: "/projets/Site-autopilot.png",
    href: "/realisations/autopilot",
    year: "2026",
    tags: ["SITE PREMIUM", "AUTOMATISATION"],
  },
  {
    number: "05",
    title: "IA FUTURE",
    category: "SITE PREMIUM • IA & TECHNOLOGIE",
    description:
      "Projet concept conçu pour présenter une activité technologique de façon claire, moderne et accessible, sans perdre en crédibilité.",
    image: "/projets/site-ia.png",
    href: "/realisations/ia-future",
    year: "2026",
    tags: ["SITE PREMIUM", "IA & TECHNOLOGIE"],
  },
  {
    number: "06",
    title: "NOVA ASSIST",
    category: "SITE PREMIUM • AGENCE DIGITALE",
    description:
      "Projet concept qui démontre comment structurer une offre de services, mettre en avant un savoir-faire et encourager la prise de contact.",
    image: "/projets/nova-assist.png",
    href: "/realisations/nova-assist",
    year: "2026",
    tags: ["SITE PREMIUM"],
  },
];

const categories = [
  "TOUS",
  "SITE PREMIUM",
  "SPORT",
  "BARBER",
  "IA & TECHNOLOGIE",
  "TRAITEUR",
  "AUTOMATISATION",
  "BOULANGERIE",
];

const benefits = [
  {
    number: "01",
    title: "IMAGE",
    text: "Une direction artistique pensée pour donner au projet une présence digitale forte et immédiatement identifiable.",
  },
  {
    number: "02",
    title: "EXPÉRIENCE",
    text: "Une navigation claire, fluide et pensée pour présenter les contenus de manière naturelle sur tous les écrans.",
  },
  {
    number: "03",
    title: "SUR MESURE",
    text: "Chaque interface est construite autour du projet afin de créer une expérience cohérente avec son univers.",
  },
];

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg
      className={external ? "real-external-arrow" : "real-arrow"}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {external ? (
        <>
          <path d="M7 17L17 7" />
          <path d="M9 7H17V15" />
        </>
      ) : (
        <>
          <path d="M5 12H18" />
          <path d="M13 7L18 12L13 17" />
        </>
      )}
    </svg>
  );
}

function CrosshairIcon() {
  return (
    <svg
      className="crosshair-icon"
      viewBox="0 0 25 25"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12.5" cy="12.5" r="5" />
      <path d="M12.5 0V7" />
      <path d="M12.5 18V25" />
      <path d="M0 12.5H7" />
      <path d="M18 12.5H25" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="plus-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2V16" />
      <path d="M2 9H16" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const resetPointer = () => {
    const card = cardRef.current;

    if (!card) return;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
  };

  return (
    <article className="real-project">
      <div className="project-index" aria-hidden="true">
        <span>{project.number}</span>
        <span className="index-line" />
        <span>06</span>
      </div>

      <div className="project-card-wrap">
        <div
          ref={cardRef}
          className="project-card"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="project-glow" />

          <div className="project-technical-corner corner-top-left">
            <span />
            <span />
          </div>

          <div className="project-technical-corner corner-bottom-right">
            <span />
            <span />
          </div>

          <div className="project-scanline" />

          <div className="project-image">
            <Image
              src={project.image}
              alt={`${project.title} — projet NOVA`}
              fill
              sizes="(max-width: 899px) 100vw, 75vw"
            />

            <div className="project-image-shade" />
            <div className="project-image-grid" />

            <div className="project-floating-tag">
              <span className="status-dot" />
              PROJET NOVA
            </div>

            <Link
              href={project.href}
              className="project-view"
              aria-label={`Voir le projet ${project.title}`}
            >
              <span>VOIR LE PROJET</span>

              <span className="project-view-icon">
                <ArrowIcon external />
              </span>
            </Link>
          </div>

          <div className="project-card-bottom">
            <div className="project-card-meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>

            <div className="project-card-title-row">
              <Link href={project.href} className="project-title-link">
                <h2>{project.title}</h2>
              </Link>

              <Link
                href={project.href}
                className="project-circle-arrow"
                aria-label={`Découvrir ${project.title}`}
              >
                <ArrowIcon />
              </Link>
            </div>

            <div className="project-card-description">
              <span className="project-description-line" />
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-side-info" aria-hidden="true">
        <span>2026 / NOVA</span>
        <span>{project.tags.join(" / ")}</span>
      </div>
    </article>
  );
}

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("TOUS");

  const filteredProjects =
    activeCategory === "TOUS"
      ? projects
      : projects.filter((project) =>
          project.tags.includes(activeCategory)
        );

  return (
    <main className="realisations-page">
      <div className="real-noise" />
      <div className="real-background-grid" />

      <div className="real-blue-orb orb-one" />
      <div className="real-blue-orb orb-two" />

      <section className="real-hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-orbit-dot dot-one" />
        <div className="hero-orbit-dot dot-two" />

        <div className="hero-cross cross-one">
          <CrosshairIcon />
        </div>

        <div className="hero-cross cross-two">
          <CrosshairIcon />
        </div>

        <div className="hero-horizontal-line line-one" />
        <div className="hero-horizontal-line line-two" />

        <div className="real-container real-hero-grid">
          <div className="real-hero-main">
            <div className="real-eyebrow">
              <span className="eyebrow-number">N / 06</span>
              <span className="eyebrow-line" />
              <span>RÉALISATIONS</span>
            </div>

            <div className="hero-title-wrap">
              <span className="hero-small-label">
                PROJETS • EXPÉRIENCES • IDENTITÉS DIGITALES
              </span>

              <h1>
                DES PROJETS
                <br />
                QUI <span>LAISSENT</span>
                <br />
                UNE <strong>TRACE.</strong>
              </h1>

              <div className="hero-title-decoration">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <aside className="real-hero-side">
            <div className="hero-side-number">01 — 06</div>

            <p>
              Une sélection de projets conçus pour explorer différentes
              directions artistiques, expériences digitales et univers
              de marque.
            </p>

            <div className="hero-scroll">
              <span className="hero-scroll-arrow">
                <ArrowIcon />
              </span>
              <span>DÉCOUVRIR LES PROJETS</span>
            </div>
          </aside>
        </div>

        <div className="real-container hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span className="hero-bottom-line" />
          <span>NOVA / DIGITAL STUDIO</span>
        </div>
      </section>

      <section className="real-projects-section">
        <div className="real-container">
          <Reveal>
            <div className="projects-heading">
              <div>
                <div className="real-eyebrow">
                  <span className="eyebrow-number">02</span>
                  <span className="eyebrow-line" />
                  <span>SELECTED WORK</span>
                </div>

                <h2>
                  NOS
                  <br />
                  <span>RÉALISATIONS</span>
                </h2>
              </div>

              <div className="projects-heading-side">
                <span className="project-count">
                  {String(filteredProjects.length).padStart(2, "0")} PROJETS
                </span>

                <p>
                  Chaque projet est pensé comme une expérience digitale
                  complète, avec sa propre identité et sa propre logique.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="real-filters">
            <div className="filters-label">
              <span className="filters-label-line" />
              FILTRER
            </div>

            <div className="filters-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-button ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span className="filter-dot" />
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Reveal key={project.title}>
                  <ProjectCard project={project} />
                </Reveal>
              ))
            ) : (
              <div className="projects-empty">
                <span>00</span>
                <p>Aucun projet dans cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="real-interlude">
        <div className="interlude-grid" />

        <div className="real-container interlude-content">
          <div className="interlude-number">03</div>

          <div className="interlude-main">
            <span>NOVA / APPROCHE</span>

            <h2>
              PAS JUSTE
              <br />
              UN <strong>SITE.</strong>
            </h2>
          </div>

          <div className="interlude-side">
            <div className="interlude-orbit" aria-hidden="true">
              <div className="interlude-orbit-ring ring-a" />
              <div className="interlude-orbit-ring ring-b" />

              <div className="interlude-orbit-core">
                N
              </div>
            </div>

            <p>
              Nous cherchons à créer des interfaces qui donnent envie
              d’explorer, comprendre et passer à l’action.
            </p>
          </div>
        </div>
      </section>

      <section className="real-commercial">
        <div className="real-container">
          <Reveal>
            <div className="commercial-top">
              <span className="commercial-partner">
                NOVA DIGITAL STUDIO / 2026
              </span>

              <span className="commercial-partner">
                DESIGN / DEVELOPMENT / STRATEGY
              </span>
            </div>

            <div className="commercial-heading">
              <h2>
                VOTRE PROJET
                <br />
                <span>PEUT ÊTRE LE PROCHAIN.</span>
              </h2>

              <div className="commercial-heading-detail">
                <PlusIcon />
                <span>LET&apos;S CREATE</span>
              </div>
            </div>

            <div className="commercial-content">
              <p>
                Vous avez une idée, une activité ou une marque à mettre
                en valeur ? NOVA transforme votre vision en une expérience
                digitale claire, moderne et sur mesure.
              </p>

              <Link href="/devis" className="real-main-button">
                <span>PARLER DE MON PROJET</span>

                <span className="real-button-icon">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <Reveal key={benefit.number}>
                <article className="benefit-card">
                  <div className="benefit-top">
                    <span>{benefit.number}</span>

                    <span className="benefit-plus">
                      <PlusIcon />
                    </span>
                  </div>

                  <h3>{benefit.title}</h3>

                  <p>{benefit.text}</p>

                  <div className="benefit-bottom-line">
                    <span />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="real-final-cta">
              <div className="final-cta-decoration" aria-hidden="true">
                <div />
                <div />
                <div />
              </div>

              <div className="final-cta-copy">
                <span>NOVA / START SOMETHING</span>

                <h3>
                  Une idée en tête ?
                  <br />
                  Construisons-la ensemble.
                </h3>
              </div>

              <Link href="/contact" className="final-cta-button">
                <span>NOUS CONTACTER</span>
                <ArrowIcon />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}