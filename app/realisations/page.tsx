"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./page.css";

const projects = [
  {
    number: "01",
    title: "STORM",
    category: "SITE PREMIUM • SPORT LIFESTYLE",
    description:
      "Projet concept imaginé pour montrer comment une identité digitale forte peut valoriser une marque sport lifestyle et rendre son univers immédiatement reconnaissable.",
    image: "/projets/storm-1.png",
    href: "/realisations/storm",
    year: "2026",
    tags: ["SITE PREMIUM", "SPORT"],
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
];

const benefits = [
  {
    number: "01",
    title: "IMAGE",
    description:
      "Une présence digitale qui inspire confiance dès la première visite et donne une vraie valeur à votre activité.",
  },
  {
    number: "02",
    title: "CONVERSION",
    description:
      "Une expérience pensée pour guider vos visiteurs et les pousser naturellement vers la prise de contact.",
  },
  {
    number: "03",
    title: "SUR-MESURE",
    description:
      "Pas de modèle générique. Chaque détail est construit autour de votre activité, de votre image et de vos objectifs.",
  },
];

function ArrowIcon() {
  return (
    <svg
      className="real-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg
      className="real-external-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="plus-icon"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 2v16M2 10h16" />
    </svg>
  );
}

function CrosshairIcon() {
  return (
    <svg
      className="crosshair-icon"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="7" />
      <path d="M16 1v7M16 24v7M1 16h7M24 16h7" />
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
      },
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 900) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--rotate-x", `${y * -5}deg`);
    card.style.setProperty("--rotate-y", `${x * 5}deg`);
    card.style.setProperty("--mouse-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y + 0.5) * 100}%`);
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
  };

  return (
    <article
      className={`real-project project-${index + 1}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="project-index">
        <span>{project.number}</span>
        <span className="index-line" />
        <span>{project.year}</span>
      </div>

      <div className="project-card-wrap">
        <div ref={cardRef} className="project-card">
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
              alt={project.title}
              fill
              sizes="(max-width: 899px) 100vw, 82vw"
              priority={index === 0}
            />

            <div className="project-image-shade" />

            <div className="project-image-grid" />

            <div className="project-floating-tag">
              <span className="status-dot" />
              DIGITAL EXPERIENCE
            </div>

            <Link
              href={project.href}
              className="project-view"
              aria-label={`Voir le projet ${project.title}`}
            >
              <span>VIEW PROJECT</span>

              <span className="project-view-icon">
                <ExternalArrowIcon />
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
                <ExternalArrowIcon />
              </Link>
            </div>

            <div className="project-card-description">
              <span className="project-description-line" />
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="project-side-info">
        <span>CONCEPT PROJECT</span>
        <span>SCROLL / {project.number}</span>
      </div>
    </article>
  );
}

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("TOUS");

  const filteredProjects =
    activeCategory === "TOUS"
      ? projects
      : projects.filter((project) => project.tags.includes(activeCategory));

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
          <Reveal className="real-hero-main">
            <div className="real-eyebrow">
              <span className="eyebrow-number">01</span>
              <span className="eyebrow-line" />
              <span>NOTRE TRAVAIL</span>
            </div>

            <div className="hero-title-wrap">
              <span className="hero-small-label">NOVA / DIGITAL STUDIO</span>

              <h1>
                Des projets
                <br />
                <span>pensés pour</span>
                <br />
                <strong>marquer.</strong>
              </h1>

              <div className="hero-title-decoration">
                <span />
                <span />
                <span />
              </div>
            </div>
          </Reveal>

          <Reveal className="real-hero-side">
            <div className="hero-side-number">01 / 06</div>

            <p>
              Nous ne créons pas simplement des sites.
              <br />
              Nous construisons des expériences digitales
              <br />
              capables de donner une vraie présence
              <br />
              à une marque.
            </p>

            <div className="hero-scroll">
              <span>SCROLL TO EXPLORE</span>

              <span className="hero-scroll-arrow">
                <ArrowIcon />
              </span>
            </div>
          </Reveal>

          <div className="hero-bottom">
            <span>SELECTED WORKS</span>
            <span className="hero-bottom-line" />
            <span>2026</span>
            <span>FRANCE / WORLDWIDE</span>
          </div>
        </div>
      </section>

      <section className="real-projects-section">
        <div className="real-container">
          <Reveal className="projects-heading">
            <div>
              <div className="real-eyebrow">
                <span className="eyebrow-number">02</span>
                <span className="eyebrow-line" />
                <span>SELECTED WORK</span>
              </div>

              <h2>
                Nos projets
                <br />
                <span>récents.</span>
              </h2>
            </div>

            <div className="projects-heading-side">
              <span className="project-count">
                {String(filteredProjects.length).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>

              <p>
                Une sélection de concepts et expériences imaginés par NOVA.
              </p>
            </div>
          </Reveal>

          <Reveal className="real-filters">
            <div className="filters-label">
              <span>FILTER</span>
              <span className="filters-label-line" />
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
          </Reveal>

          <div className="projects-list">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.title}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="projects-empty">
              <span>00</span>
              <p>Aucun projet dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      <section className="real-interlude">
        <div className="interlude-grid" />

        <div className="real-container">
          <Reveal className="interlude-content">
            <div className="interlude-number">03</div>

            <div className="interlude-main">
              <span>THE NEXT SCREEN</span>

              <h2>
                Votre activité
                <br />
                mérite une
                <br />
                <strong>expérience.</strong>
              </h2>
            </div>

            <div className="interlude-side">
              <div className="interlude-orbit">
                <div className="interlude-orbit-ring ring-a" />
                <div className="interlude-orbit-ring ring-b" />

                <div className="interlude-orbit-core">
                  <span>N</span>
                </div>
              </div>

              <p>
                Design, développement, stratégie et performance réunis dans
                une seule direction.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="real-commercial">
        <div className="real-container">
          <Reveal className="commercial-top">
            <div className="real-eyebrow">
              <span className="eyebrow-number">04</span>
              <span className="eyebrow-line" />
              <span>PASSER À L'ACTION</span>
            </div>

            <span className="commercial-partner">
              NOVA / YOUR DIGITAL PARTNER
            </span>
          </Reveal>

          <Reveal className="commercial-heading">
            <h2>
              Votre activité mérite
              <br />
              mieux qu&apos;un
              <br />
              <span>site standard.</span>
            </h2>

            <div className="commercial-heading-detail">
              <PlusIcon />
              <span>01</span>
            </div>
          </Reveal>

          <Reveal className="commercial-content">
            <p>
              Chaque projet commence par une idée. Notre rôle est de la
              transformer en une expérience digitale claire, mémorable et
              réellement adaptée à votre activité.
            </p>

            <Link href="/contact" className="real-main-button">
              <span>PARLONS DE VOTRE PROJET</span>

              <span className="real-button-icon">
                <ArrowIcon />
              </span>
            </Link>
          </Reveal>

          <Reveal className="benefits-grid">
            {benefits.map((benefit) => (
              <div className="benefit-card" key={benefit.number}>
                <div className="benefit-top">
                  <span>{benefit.number}</span>

                  <span className="benefit-plus">
                    <PlusIcon />
                  </span>
                </div>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>

                <div className="benefit-bottom-line">
                  <span />
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="real-final-cta">
            <div className="final-cta-decoration">
              <div />
              <div />
              <div />
            </div>

            <div className="final-cta-copy">
              <span>READY WHEN YOU ARE</span>
              <h3>On construit quelque chose de fort ?</h3>
            </div>

            <Link href="/devis" className="final-cta-button">
              <span>DEMANDER UN DEVIS</span>
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}