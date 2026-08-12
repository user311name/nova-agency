"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import "./page.css";

const processSteps = [
  {
    number: "01",
    title: "Demande de devis",
    text: "Vous nous présentez votre activité et votre projet.",
  },
  {
    number: "02",
    title: "Étude du projet",
    text: "Nous étudions vos besoins afin de définir la meilleure solution.",
  },
  {
    number: "03",
    title: "Devis personnalisé",
    text: "Chaque projet étant différent, le tarif est établi uniquement sur devis.",
  },
  {
    number: "04",
    title: "Validation & règlement",
    text: "Après validation du devis, le règlement peut être effectué par virement bancaire.",
  },
  {
    number: "05",
    title: "Réalisation",
    text: "Nous lançons ensuite la création de votre projet.",
  },
];

const quoteSections = [
  {
    title: "Type de site souhaité",
    name: "Type de site",
    options: [
      "Site vitrine simple",
      "Site vitrine professionnel",
      "Site vitrine avec fonctionnalités avancées",
      "Portfolio",
      "Blog / site d'actualités",
      "Site pour une association",
      "Site pour un restaurant",
      "Site pour un commerce",
      "Site de réservation",
      "Site avec espace membre",
      "Boutique en ligne / e-commerce",
      "Application web",
    ],
  },
  {
    title: "Pages souhaitées",
    name: "Pages souhaitées",
    options: [
      "Accueil",
      "À propos",
      "Présentation de l'entreprise",
      "Nos services",
      "Nos prestations",
      "Tarifs",
      "Galerie photos",
      "Portfolio / réalisations",
      "Témoignages / avis clients",
      "FAQ",
      "Contact",
      "Horaires",
      "Localisation / carte",
      "Blog",
      "Actualités",
      "Mentions légales",
      "Politique de confidentialité",
      "Page personnalisée",
      "Plusieurs pages de services",
      "Pages pour plusieurs établissements",
      "Pages pour plusieurs produits",
    ],
  },
  {
    title: "Design et apparence",
    name: "Design",
    options: [
      "Design simple et professionnel",
      "Design moderne",
      "Design haut de gamme",
      "Design minimaliste",
      "Design coloré",
      "Design sombre / dark mode",
      "Design entièrement personnalisé",
      "Logo intégré",
      "Création ou adaptation d'un logo",
      "Couleurs personnalisées",
      "Polices personnalisées",
      "Icônes",
      "Illustrations",
      "Images",
      "Vidéos",
      "Animations",
      "Effets au survol",
      "Transitions entre les pages",
      "Sliders / carrousels",
      "Pop-ups",
      "Sections interactives",
      "Compteurs animés",
      "Timeline",
      "Cartes interactives",
    ],
  },
  {
    title: "Contenu",
    name: "Contenu",
    options: [
      "Le client fournit les textes",
      "Aide à la rédaction",
      "Rédaction avec l'aide de l'IA",
      "Correction et amélioration des textes",
      "Création de descriptions de services",
      "Création de FAQ",
      "Création de slogans / accroches",
      "Traduction des textes",
      "Le client fournit les images",
      "Organisation des images",
      "Retouche d'images",
      "Création de visuels avec l'IA",
      "Création d'illustrations",
      "Intégration de vidéos",
      "Galerie avec catégories",
      "Galerie avec filtres",
      "Galerie avec zoom",
    ],
  },
  {
    title: "Contact et formulaires",
    name: "Contact",
    options: [
      "Formulaire de contact simple",
      "Formulaire de contact avancé",
      "Adresse e-mail cliquable",
      "Téléphone cliquable",
      "Bouton WhatsApp",
      "Réseaux sociaux",
      "Google Maps",
      "Horaires d'ouverture",
      "Plusieurs moyens de contact",
      "Demande de devis",
      "Demande de renseignements",
      "Formulaire de réservation",
      "Formulaire avec plusieurs choix",
      "Formulaire avec téléchargement de fichier",
      "Formulaire personnalisé",
    ],
  },
  {
    title: "Calendrier et réservation",
    name: "Calendrier / réservation",
    options: [
      "Calendrier simple",
      "Affichage des disponibilités",
      "Choix d'une date",
      "Choix d'une heure",
      "Choix d'une prestation",
      "Prise de rendez-vous",
      "Réservation",
      "Confirmation automatique",
      "E-mail de confirmation",
      "Modification d'une réservation",
      "Annulation d'une réservation",
      "Rappel automatique",
      "Gestion des disponibilités",
      "Plusieurs types de rendez-vous",
      "Plusieurs employés / intervenants",
      "Réservation avec paiement",
      "Système de réservation personnalisé",
    ],
  },
  {
    title: "Gestion du site par le client",
    name: "Gestion par le client",
    options: [
      "Modifier les textes",
      "Modifier les photos",
      "Ajouter des photos",
      "Supprimer des photos",
      "Modifier les horaires",
      "Modifier les tarifs",
      "Ajouter / supprimer des services",
      "Ajouter des actualités",
      "Publier des articles",
      "Gérer les réservations",
      "Gérer les produits",
      "Gérer les commandes",
      "Gérer les avis",
      "Gérer les utilisateurs",
      "Espace administrateur complet",
    ],
  },
  {
    title: "Comptes utilisateurs",
    name: "Comptes utilisateurs",
    options: [
      "Aucun compte utilisateur",
      "Création de compte",
      "Connexion / déconnexion",
      "Mot de passe oublié",
      "Profil utilisateur",
      "Photo de profil",
      "Espace personnel",
      "Historique des réservations",
      "Historique des commandes",
      "Tableau de bord utilisateur",
      "Système de rôles / permissions",
    ],
  },
  {
    title: "Boutique en ligne",
    name: "E-commerce",
    options: [
      "Catalogue de produits",
      "Catégories",
      "Recherche",
      "Filtres",
      "Photos des produits",
      "Descriptions",
      "Prix",
      "Variantes, tailles ou couleurs",
      "Gestion du stock",
      "Produits similaires",
      "Panier",
      "Codes promo",
      "Frais de livraison",
      "Calcul automatique du total",
      "Paiement en ligne",
      "Confirmation de commande",
      "E-mail automatique",
      "Historique et suivi des commandes",
    ],
  },
  {
    title: "Paiement en ligne",
    name: "Paiement",
    options: [
      "Aucun paiement en ligne",
      "Paiement d'une commande",
      "Paiement d'une réservation",
      "Paiement d'un acompte",
      "Paiement unique",
      "Abonnement",
      "Code promo",
      "Facturation",
      "Confirmation automatique du paiement",
    ],
  },
  {
    title: "Fonctionnalités IA",
    name: "Intelligence artificielle",
    options: [
      "Chatbot IA",
      "Assistant IA pour répondre aux visiteurs",
      "Réponses sur l'entreprise",
      "Recommandation de services",
      "Recommandation de produits",
      "Assistant IA personnalisé",
      "Génération de contenu",
      "Descriptions de produits avec IA",
      "Articles avec IA",
      "FAQ avec IA",
      "Traduction automatique",
      "Outil IA personnalisé",
      "Analyse ou traitement de données avec IA",
    ],
  },
  {
    title: "Automatisations et connexions",
    name: "Automatisations / connexions",
    options: [
      "Envoi automatique d'e-mails",
      "Confirmation après formulaire",
      "Confirmation après réservation",
      "Rappels de rendez-vous",
      "Notifications",
      "Enregistrement automatique des demandes",
      "Création automatique de rendez-vous",
      "Envoi automatique de documents",
      "Newsletter automatique",
      "Google Analytics",
      "Google Search Console",
      "Calendrier externe",
      "Service de réservation",
      "CRM",
      "Service d'e-mail",
      "Base de données",
      "API externe",
      "Outil de facturation",
      "Service de livraison",
    ],
  },
  {
    title: "Langues, SEO et mobile",
    name: "Visibilité et mobile",
    options: [
      "Uniquement en français",
      "Français + anglais",
      "Plusieurs langues",
      "Optimisation SEO de base",
      "Titres et descriptions Google",
      "Optimisation des images",
      "Sitemap",
      "Pages locales",
      "FAQ optimisée SEO",
      "Google Analytics",
      "Site responsive téléphone / tablette / ordinateur",
      "Interface optimisée mobile",
      "Site installable comme application (PWA)",
    ],
  },
  {
    title: "Blog, avis et maintenance",
    name: "Blog / avis / maintenance",
    options: [
      "Blog simple",
      "Articles",
      "Catégories d'articles",
      "Recherche d'articles",
      "Commentaires",
      "Publication depuis l'administration",
      "Affichage d'avis clients",
      "Formulaire pour laisser un avis",
      "Système de notation",
      "Import d'avis externes",
      "Gestion des avis depuis l'administration",
      "Modifications occasionnelles",
      "Maintenance régulière",
      "Surveillance du site",
      "Assistance technique",
    ],
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formRef.current) return;

    setSending(true);
    setSent(false);

    const formData = new FormData(formRef.current);

    const getValue = (name: string) => {
      return formData.get(name)?.toString().trim() || "Non renseigné";
    };

    const getValues = (name: string) => {
      return formData.getAll(name).map((value) => value.toString());
    };

    const formatOptions = (name: string) => {
      const values = getValues(name);

      if (values.length === 0) {
        return "Aucun choix";
      }

      return values.map((value) => `• ${value}`).join("\n");
    };

    const message = `
NOUVELLE DEMANDE DE DEVIS — NOVA

━━━━━━━━━━━━━━━━━━━━
👤 INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━

Nom : ${getValue("Nom")}
Entreprise : ${getValue("Entreprise")}

━━━━━━━━━━━━━━━━━━━━
📞 CONTACT
━━━━━━━━━━━━━━━━━━━━

Email : ${getValue("Email")}
Téléphone : ${getValue("Téléphone")}

━━━━━━━━━━━━━━━━━━━━
💰 PROJET
━━━━━━━━━━━━━━━━━━━━

Budget : ${getValue("Budget approximatif")}
Date souhaitée : ${getValue("Date souhaitée")}

━━━━━━━━━━━━━━━━━━━━
🌐 TYPE DE SITE
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Type de site[]")}

━━━━━━━━━━━━━━━━━━━━
📄 PAGES SOUHAITÉES
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Pages souhaitées[]")}

━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN ET APPARENCE
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Design[]")}

━━━━━━━━━━━━━━━━━━━━
📝 CONTENU
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Contenu[]")}

━━━━━━━━━━━━━━━━━━━━
📞 CONTACT & FORMULAIRES
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Contact[]")}

━━━━━━━━━━━━━━━━━━━━
📅 CALENDRIER / RÉSERVATION
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Calendrier / réservation[]")}

━━━━━━━━━━━━━━━━━━━━
⚙️ GESTION DU SITE PAR LE CLIENT
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Gestion par le client[]")}

━━━━━━━━━━━━━━━━━━━━
👥 COMPTES UTILISATEURS
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Comptes utilisateurs[]")}

━━━━━━━━━━━━━━━━━━━━
🛒 BOUTIQUE EN LIGNE / E-COMMERCE
━━━━━━━━━━━━━━━━━━━━

${formatOptions("E-commerce[]")}

━━━━━━━━━━━━━━━━━━━━
💳 PAIEMENT EN LIGNE
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Paiement[]")}

━━━━━━━━━━━━━━━━━━━━
🤖 FONCTIONNALITÉS IA
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Intelligence artificielle[]")}

━━━━━━━━━━━━━━━━━━━━
🔗 AUTOMATISATIONS / CONNEXIONS
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Automatisations / connexions[]")}

━━━━━━━━━━━━━━━━━━━━
🔎 VISIBILITÉ / SEO / MOBILE
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Visibilité et mobile[]")}

━━━━━━━━━━━━━━━━━━━━
🛠️ BLOG / AVIS / MAINTENANCE
━━━━━━━━━━━━━━━━━━━━

${formatOptions("Blog / avis / maintenance[]")}

━━━━━━━━━━━━━━━━━━━━
➕ AUTRES BESOINS
━━━━━━━━━━━━━━━━━━━━

${getValue("Autres besoins")}

━━━━━━━━━━━━━━━━━━━━
📝 DESCRIPTION DU PROJET
━━━━━━━━━━━━━━━━━━━━

${getValue("Description du projet")}

━━━━━━━━━━━━━━━━━━━━
FIN DE LA DEMANDE
━━━━━━━━━━━━━━━━━━━━
`;

    const data = new FormData();

    data.append("_subject", "Nouvelle demande de devis — NOVA");
    data.append("email", getValue("Email"));
    data.append("message", message);

    try {
      const response = await fetch(
        "https://formspree.io/f/mgawenka",
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setSent(true);
        formRef.current.reset();
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      alert("Impossible d'envoyer la demande.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-kicker">
            <span className="contact-kicker-line" />
            <span>PARLONS DE VOTRE PROJET</span>
          </div>

          <h1>
            Construisons quelque chose
            <span> de remarquable.</span>
          </h1>

          <p>
            Présentez-nous votre projet : nous vous proposerons une solution
            digitale adaptée à votre activité et à vos objectifs.
          </p>
        </div>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <div className="contact-section-label">
            <span>01</span>
            <p>NOTRE APPROCHE</p>
          </div>

          <h2>
            Pas simplement
            <br />
            <span>un site web.</span>
          </h2>

          <p className="contact-intro">
            Sélectionnez ce dont vous avez besoin. Cela nous permet de vous
            envoyer un devis précis, sans perdre de temps.
          </p>

          <div className="project-process">
            <div className="process-title">
              <div className="contact-section-label">
                <span>02</span>
                <p>LE PROCESSUS</p>
              </div>

              <h3>
                Une méthode simple.
                <br />
                Un résultat <span>soigné.</span>
              </h3>
            </div>

            <div className="process-list">
              {processSteps.map((step) => (
                <div className="process-item" key={step.number}>
                  <span className="process-number">{step.number}</span>

                  <div className="process-content">
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="form-top">
            <div>
              <span className="form-label">DEMANDER UN DEVIS</span>

              <h2>
                Parlons de
                <br />
                <span>votre projet.</span>
              </h2>
            </div>

            <span className="form-index">NOVA / 01</span>
          </div>

          <p className="form-description">
            Remplissez les informations principales puis cochez les options qui
            vous intéressent. Vous pouvez en choisir plusieurs.
          </p>

          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="nom">
                  Nom <span>*</span>
                </label>

                <input
                  id="nom"
                  name="Nom"
                  type="text"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="entreprise">
                  Entreprise
                </label>

                <input
                  id="entreprise"
                  name="Entreprise"
                  type="text"
                  placeholder="Votre entreprise"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>

                <input
                  id="email"
                  name="Email"
                  type="email"
                  placeholder="vous@entreprise.fr"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="telephone">
                  Téléphone
                </label>

                <input
                  id="telephone"
                  name="Téléphone"
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="budget">
                  Budget approximatif
                </label>

                <select
                  id="budget"
                  name="Budget approximatif"
                  defaultValue=""
                >
                  <option value="">
                    Je ne sais pas encore
                  </option>

                  <option>
                    Moins de 1 000 €
                  </option>

                  <option>
                    1 000 € à 2 000 €
                  </option>

                  <option>
                    2 000 € à 4 000 €
                  </option>

                  <option>
                    4 000 € à 8 000 €
                  </option>

                  <option>
                    Plus de 8 000 €
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="delai">
                  Date souhaitée
                </label>

                <input
                  id="delai"
                  name="Date souhaitée"
                  type="text"
                  placeholder="Ex. Octobre 2026"
                />
              </div>
            </div>

            <div className="quote-options">
              <p className="quote-options-title">
                Sélectionnez les éléments souhaités
              </p>

              {quoteSections.map((section) => (
                <details
                  className="quote-section"
                  key={section.title}
                >
                  <summary>
                    {section.title}
                  </summary>

                  <div className="quote-checkboxes">
                    {section.options.map((option) => (
                      <label
                        className="quote-choice"
                        key={option}
                      >
                        <input
                          type="checkbox"
                          name={`${section.name}[]`}
                          value={option}
                        />

                        <span>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="form-field">
              <label htmlFor="autre">
                Autres besoins ou fonctionnalités
              </label>

              <input
                id="autre"
                name="Autres besoins"
                type="text"
                placeholder="Ex. un système particulier, une idée, une intégration..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">
                Décrivez votre projet <span>*</span>
              </label>

              <textarea
                id="message"
                name="Description du projet"
                placeholder="Présentez votre activité, vos objectifs et les informations importantes..."
                required
              />
            </div>

            {sent && (
              <p className="form-success">
                Votre demande a bien été envoyée. Nous reviendrons vers vous
                rapidement.
              </p>
            )}

            <div className="form-bottom">
              <p>
                Vos informations servent uniquement à répondre à votre demande.
              </p>

              <button
                type="submit"
                disabled={sending}
              >
                <span>
                  {sending
                    ? "ENVOI EN COURS..."
                    : "ENVOYER LA DEMANDE"}
                </span>

                <strong>↗</strong>
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="contact-bottom">
        <div className="bottom-label">
          <span>03</span>
          <p>LA SUITE</p>
        </div>

        <h2>
          Une idée aujourd&apos;hui.
          <br />
          <span>Un projet demain.</span>
        </h2>

        <p>
          Commençons simplement par une discussion.
        </p>

        <Link href="/">
          RETOUR À L&apos;ACCUEIL <span>↗</span>
        </Link>
      </section>
    </main>
  );
}