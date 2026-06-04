import type { Metadata } from 'next'
import { ProductTemplateV2 } from '@/components/products/ProductTemplateV2'
import type { ProductV2Data } from '@/components/products/ProductTemplateV2'

export const metadata: Metadata = {
  title: 'Carport & Pergola Solaire Sur Mesure — Panneaux Photovoltaïques | Greenter',
  description: "Carport solaire ou pergola photovoltaïque sur mesure, posé par artisan RGE en Île-de-France. Structure aluminium, 3 à 12 kW, TVA 5,5 %. Devis gratuit sous 48h.",
  alternates: {
    canonical: "https://www.greenter.fr/produits/carport-solaire",
  },
  openGraph: {
    title: "Carport & Pergola Solaire Sur Mesure | Greenter",
    description: "Protégez votre véhicule et produisez votre propre électricité. Carport ou pergola photovoltaïque sur mesure, installé par technicien RGE en Île-de-France.",
    url: "https://www.greenter.fr/produits/carport-solaire",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
}

const PRODUCT: ProductV2Data = {
  name: "Carport & Pergola Solaire Photovoltaïque — Sur Mesure",
  categoryName: "Énergie solaire",
  categorySlug: "solaire",
  slug: "carport-solaire",
  pricePrefix: "À partir de",
  currentPrice: 8490,
  originalPrice: 8490,
  ctaLabel: "Demander un devis gratuit →",
  hideMonthly: true,
  gift: { name: "Étude de faisabilité et bilan solaire offerts", value: 350 },
  deliveryDays: "selon planning projet",
  rating: 4.9,
  reviewCount: 18,
  buyerCount: 47,
  monthlyBuyers: 6,
  ctaHref: "/contact",
  images: [
    "/solaire.jpg",
    "/installation.jpg",
    "/pac2.jpg",
  ],
  shortDescription:
    "Solution clé en main sur mesure : structure aluminium traité, panneaux solaires haute performance 3 à 12 kW, pose par technicien certifié RGE. TVA réduite à 5,5 % automatique. Devis personnalisé gratuit sous 48h.",
  description: `
    <p>Un carport ou une pergola solaire, c'est le meilleur des deux mondes : un <strong>abri pour votre véhicule ou votre terrasse</strong>, et une <strong>centrale électrique personnelle</strong> qui réduit votre facture d'électricité de 40 à 70 % dès la première année.</p>

    <h3>Deux produits, une seule logique</h3>
    <ul>
      <li><strong>Carport solaire</strong> — abri voiture (1 ou 2 places), structure aluminium, panneaux intégrés en toiture. Idéal pour remplacer un garage ou sécuriser un stationnement extérieur.</li>
      <li><strong>Pergola photovoltaïque</strong> — espace de vie couvert (terrasse, jardin), panneaux solaires translucides ou opaques. Crée de l'ombre tout en produisant de l'énergie.</li>
    </ul>

    <h3>Tout est sur mesure</h3>
    <p>Aucun gabarit standard : nous adaptons les <strong>dimensions, l'inclinaison, la puissance et la finition</strong> à votre terrain, votre ensoleillement et votre consommation réelle. Notre bureau d'études réalise un bilan solaire gratuit avant de vous soumettre un devis détaillé.</p>

    <h3>TVA réduite à 5,5 % et aides disponibles</h3>
    <p>En tant qu'installateur certifié <strong>RGE QualiPV</strong>, Greenter vous fait bénéficier automatiquement de la <strong>TVA à 5,5 %</strong> sur la fourniture et la pose (au lieu de 20 %). Si votre carport solaire est couplé à une rénovation globale, les panneaux peuvent également être éligibles à la <strong>prime à l'autoconsommation</strong> et à l'<strong>Éco-PTZ à taux zéro</strong>.</p>
  `,
  specs: [
    { label: "Puissance disponible", value: "3 kW à 12 kW (sur mesure)" },
    { label: "Nombre de panneaux", value: "6 à 24 unités" },
    { label: "Technologie panneaux", value: "Monocristallin PERC / TOPCon" },
    { label: "Structure", value: "Aluminium traité électrophorèse" },
    { label: "Résistance au vent", value: "160 km/h" },
    { label: "Charge neige", value: "56 kg/m²" },
    { label: "Hauteur sous poutre", value: "200 à 280 cm (réglable)" },
    { label: "Inclinaison toiture", value: "5° à 15° (optimisée soleil)" },
    { label: "Étanchéité", value: "Joints caoutchouc certifiés" },
    { label: "Garantie structure", value: "10 ans" },
    { label: "Garantie panneaux", value: "25 ans rendement linéaire" },
    { label: "Certification", value: "CE — RGE QualiPV" },
  ],
  features: [
    {
      icon: "🚗",
      title: "Abri + production électrique",
      description: "Protégez votre véhicule ou votre terrasse tout en produisant jusqu'à 12 000 kWh/an. Un seul investissement, deux utilités permanentes.",
    },
    {
      icon: "📐",
      title: "100 % sur mesure",
      description: "Dimensions, nombre de places, inclinaison, puissance : tout est adapté à votre terrain et à votre consommation réelle par notre bureau d'études.",
    },
    {
      icon: "⚡",
      title: "Recharge voiture électrique",
      description: "Couplé à une borne IRVE, votre carport solaire alimente directement la recharge de vos véhicules électriques. Autonomie maximale, coût marginal.",
    },
    {
      icon: "🏗️",
      title: "Structure aluminium haute résistance",
      description: "Aluminium traité par électrophorèse noire, ancrage béton haute performance, résistance vent 160 km/h et neige 56 kg/m². Conçu pour durer 30 ans.",
    },
    {
      icon: "💰",
      title: "TVA 5,5 % automatique",
      description: "Installation par artisan RGE QualiPV : la TVA réduite s'applique d'office sur la fourniture et la main-d'œuvre — économie directe de 14,5 % sur le montant total.",
    },
    {
      icon: "📱",
      title: "Monitoring en temps réel",
      description: "Application smartphone incluse : suivez votre production solaire, votre autoconsommation et votre injection réseau heure par heure depuis votre téléphone.",
    },
  ],
  comparison: {
    alt1Name: "Leroy Merlin (kit standard)",
    alt2Name: "Pergola bois sans PV",
    rows: [
      { criterion: "Sur mesure", ours: true, alt1: false, alt2: "Partiel" },
      { criterion: "Installation incluse", ours: true, alt1: false, alt2: false },
      { criterion: "Pose par technicien RGE", ours: true, alt1: false, alt2: false },
      { criterion: "TVA 5,5 %", ours: true, alt1: false, alt2: false },
      { criterion: "Production électrique", ours: "3 – 12 kW", alt1: "5 kW fixe", alt2: false },
      { criterion: "Raccordement réseau géré", ours: true, alt1: false, alt2: false },
      { criterion: "Garantie structure", ours: "10 ans", alt1: "2 ans", alt2: "5 ans" },
      { criterion: "Monitoring inclus", ours: true, alt1: false, alt2: false },
      { criterion: "Dossier aides géré", ours: true, alt1: false, alt2: false },
      { criterion: "Recharge VE compatible", ours: true, alt1: false, alt2: false },
    ],
  },
  reviews: [
    {
      author: "Marc D.",
      city: "Meaux (77)",
      date: "avril 2026",
      rating: 5,
      title: "Carport 2 places 6 kW — bluffant",
      content:
        "J'avais comparé 4 devis. Greenter était le seul à proposer une étude thermique avant de dimensionner les panneaux. Résultat : 6 300 kWh produits la première année, ma facture EDF a chuté de 65 %. La structure aluminium est vraiment solide — aucun doute sur la tenue dans le temps.",
      verified: true,
      helpful: 21,
      tags: ["Carport 2 places", "6 kW", "Économies réelles"],
    },
    {
      author: "Isabelle V.",
      city: "Créteil (94)",
      date: "mars 2026",
      rating: 5,
      title: "Pergola terrasse 4 kW — esthétique et rentable",
      content:
        "Je voulais couvrir ma terrasse tout en produisant de l'électricité. L'équipe a adapté les dimensions exactement à mon espace (6,5 m × 4 m), posé les panneaux en une journée. En plus de l'ombre agréable, je produis l'équivalent de ma consommation annuelle. Vraiment bluffant.",
      verified: true,
      helpful: 17,
      tags: ["Pergola terrasse", "4 kW", "Sur mesure"],
    },
    {
      author: "Patrick L.",
      city: "Melun (77)",
      date: "février 2026",
      rating: 5,
      title: "Carport + borne IRVE — combo parfait pour la VE",
      content:
        "J'ai couplé le carport 8 kW avec une borne de recharge pour ma Tesla. Greenter a tout géré : le carport, la borne, le raccordement ENEDIS et les démarches de subvention. Mon coût de recharge est aujourd'hui pratiquement nul depuis avril.",
      verified: true,
      helpful: 34,
      tags: ["Carport 8 kW", "Borne IRVE", "Voiture électrique"],
    },
    {
      author: "Nathalie B.",
      city: "Vincennes (94)",
      date: "janvier 2026",
      rating: 4,
      title: "Très satisfaite, délai un peu long",
      content:
        "La qualité du produit et de l'installation est irréprochable. Le délai entre la commande et la pose a été de 6 semaines (fabrication sur mesure), ce qui m'avait été annoncé mais j'espérais un peu plus rapide. Le monitoring en temps réel est très pratique pour suivre la production.",
      verified: true,
      helpful: 9,
      tags: ["Pergola", "Sur mesure", "Monitoring"],
    },
  ],
  faq: [
    {
      question: "Quelle est la différence entre un carport et une pergola solaire ?",
      answer:
        "Le carport solaire est conçu principalement pour abriter un ou plusieurs véhicules : sa structure est dimensionnée pour supporter le poids et les contraintes mécaniques d'un abri de stationnement. La pergola solaire est davantage orientée vers la création d'un espace de vie couvert (terrasse, coin jardin). Les deux intègrent des panneaux photovoltaïques en toiture et produisent de l'électricité, mais leurs gabarits, hauteurs de pose et finitions diffèrent. Nous vous aidons à choisir la bonne solution lors de l'étude gratuite.",
    },
    {
      question: "Faut-il un permis de construire ?",
      answer:
        "Un carport ou une pergola de moins de 20 m² de surface au sol ne requiert qu'une déclaration préalable de travaux en mairie (délai : 1 mois). Au-delà de 20 m², un permis de construire est nécessaire (délai : 2 à 3 mois). Greenter vous accompagne dans la constitution du dossier administratif.",
    },
    {
      question: "Quelle puissance choisir pour mon carport ?",
      answer:
        "Cela dépend de votre consommation annuelle, de la surface disponible et de votre objectif (autoconsommation totale, revente du surplus, recharge VE). En règle générale : 3 kW couvre les besoins d'un foyer de 2 personnes, 6 kW convient à une famille de 4, 8 à 12 kW pour des foyers avec voiture électrique ou fort usage climatisation. Notre bilan solaire gratuit calcule la puissance optimale pour votre situation.",
    },
    {
      question: "Puis-je recharger ma voiture électrique avec ce système ?",
      answer:
        "Oui. Nous proposons en option l'installation d'une borne IRVE (Infrastructure de Recharge pour Véhicule Électrique) directement alimentée par les panneaux de votre carport. Couplée à un système de pilotage intelligent, la borne se déclenche prioritairement quand la production solaire est suffisante, ce qui rend la recharge pratiquement gratuite en journée.",
    },
    {
      question: "Quel est le délai entre le devis et la pose ?",
      answer:
        "En moyenne : 1 semaine pour le bilan solaire et le devis détaillé, puis 4 à 8 semaines de fabrication sur mesure (structure + panneaux), puis 1 à 2 jours de pose. Comptez donc 5 à 10 semaines au total entre votre accord et la mise en service. Ce délai peut être réduit pour des configurations standard.",
    },
    {
      question: "Quelles aides financières sont disponibles ?",
      answer:
        "TVA réduite à 5,5 % (automatique, car installation par RGE) : économie directe de 14,5 % sur le montant total. Prime à l'autoconsommation solaire de l'État : jusqu'à 1 350 € pour un système de 3 kW, 2 250 € pour 6 kW, versée par EDF OA. Éco-PTZ à taux zéro jusqu'à 50 000 € si couplé à une rénovation globale. Nous montons et déposons tous les dossiers.",
    },
  ],
}

export default function CarportSolairePage() {
  return <ProductTemplateV2 product={PRODUCT} />
}
