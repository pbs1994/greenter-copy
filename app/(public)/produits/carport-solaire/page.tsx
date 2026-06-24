import type { Metadata } from 'next'
import { ProductTemplateV2 } from '@/components/products/ProductTemplateV2'
import type { ProductV2Data } from '@/components/products/ProductTemplateV2'

export const metadata: Metadata = {
  title: 'Carport & Pergola Solaire Sur Mesure — Panneaux Photovoltaïques | Greenter',
  description: "Carport solaire ou pergola photovoltaïque entièrement sur mesure, posé par artisan RGE en Île-de-France. TVA 5,5 %, prime autoconsommation. Devis gratuit sous 48h.",
  alternates: {
    canonical: "https://www.greenter.fr/produits/carport-solaire",
  },
  openGraph: {
    title: "Carport & Pergola Solaire Sur Mesure | Greenter",
    description: "Protégez votre véhicule ou votre terrasse tout en produisant votre propre électricité. Solution sur mesure, installée par technicien RGE en Île-de-France.",
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
  currentPrice: 5000,
  originalPrice: 8490,
  ctaLabel: "Demander un devis gratuit →",
  ctaModal: true,
  hideMonthly: true,
  expertCallout: null,
  benefits: [
    { emoji: "📐", title: "Sur mesure", sub: "Dimensions selon votre terrain" },
    { emoji: "🔧", title: "Installation incluse", sub: "Par techniciens RGE QualiPV" },
    { emoji: "💰", title: "TVA 5,5 %", sub: "Installation par artisan RGE" },
    { emoji: "🌿", title: "Aides gérées", sub: "Prime autoconsommation incluse" },
    { emoji: "☀️", title: "Production garantie", sub: "25 ans rendement linéaire" },
  ],
  gift: { name: "Bilan solaire et étude de faisabilité", value: 350 },
  deliveryDays: "selon planning projet",
  rating: 0,
  reviewCount: 0,
  buyerCount: 0,
  monthlyBuyers: 0,
  ctaHref: "/contact",
  images: [
    "/images/blog/carport-solaire-maison-renault-zoe.jpg",
    "/images/blog/carport-pergola-solaire-famille.jpg",
  ],
  shortDescription:
    "Chaque projet est unique : dimensions, puissance, matériaux et configuration sont définis avec vous selon votre terrain, votre usage et vos objectifs. Un de nos experts vous contacte sous 48h pour un premier échange sans engagement.",
  description: `
    <p>Un carport ou une pergola solaire, c'est l'alliance entre un <strong>espace fonctionnel</strong> — abri voiture ou terrasse couverte — et une <strong>source d'électricité autonome</strong> qui réduit durablement votre facture énergétique.</p>

    <h3>Deux solutions, une seule logique</h3>
    <ul>
      <li><strong>Carport solaire</strong> — abri pour un ou plusieurs véhicules, avec panneaux photovoltaïques intégrés en toiture. Idéal pour produire de l'électricité tout en sécurisant votre stationnement.</li>
      <li><strong>Pergola photovoltaïque</strong> — espace de vie couvert (terrasse, jardin) qui crée de l'ombre agréable tout en produisant de l'énergie. Une solution esthétique et rentable.</li>
    </ul>

    <h3>Un projet conçu pour vous, de A à Z</h3>
    <p>Aucun gabarit prédéfini : la surface, la hauteur, la puissance installée, le nombre de panneaux et les matériaux sont déterminés ensemble, en fonction de votre terrain, votre ensoleillement et votre consommation réelle. Nous réalisons un <strong>bilan solaire gratuit</strong> avant de vous soumettre un devis détaillé et sans engagement.</p>

    <h3>TVA réduite et aides à l'installation</h3>
    <p>En tant qu'installateur certifié <strong>RGE QualiPV</strong>, Greenter vous fait bénéficier automatiquement de la <strong>TVA à 5,5 %</strong> sur la fourniture et la pose. Votre installation peut également ouvrir droit à la <strong>prime à l'autoconsommation</strong> versée par l'État, ainsi qu'à l'<strong>Éco-PTZ à taux zéro</strong>. Nous gérons l'ensemble des démarches administratives.</p>
  `,
  specs: [
    { label: "Dimensions", value: "Sur mesure selon votre terrain" },
    { label: "Puissance installée", value: "Selon votre consommation" },
    { label: "Nombre de panneaux", value: "Défini après bilan solaire" },
    { label: "Configuration", value: "1 place, 2 places ou pergola" },
    { label: "Matériaux", value: "Selon projet (métal, bois, composite…)" },
    { label: "Inclinaison toiture", value: "Optimisée pour votre région" },
    { label: "Raccordement", value: "Autoconsommation ± injection réseau" },
    { label: "Monitoring", value: "Suivi production en temps réel" },
    { label: "Garantie structure", value: "Selon matériaux choisis" },
    { label: "Garantie panneaux", value: "25 ans rendement linéaire" },
    { label: "Certification installation", value: "RGE QualiPV" },
    { label: "TVA applicable", value: "5,5 % (installation par RGE)" },
  ],
  features: [
    {
      icon: "🚗",
      title: "Abri + production d'électricité",
      description: "Un seul investissement pour deux utilités permanentes : protéger votre véhicule ou votre terrasse, et produire votre propre électricité toute l'année.",
    },
    {
      icon: "📐",
      title: "Entièrement sur mesure",
      description: "Surface, hauteur, puissance, orientation, matériaux : chaque paramètre est adapté à votre configuration réelle, sans compromis ni gabarit imposé.",
    },
    {
      icon: "⚡",
      title: "Compatible recharge véhicule électrique",
      description: "Couplé à une borne IRVE, votre carport solaire peut alimenter directement la recharge de vos véhicules. Une autonomie maximale, à coût quasi nul en journée.",
    },
    {
      icon: "💰",
      title: "TVA 5,5 % automatique",
      description: "Installation par artisan certifié RGE QualiPV : la TVA réduite s'applique d'office. C'est une économie immédiate de 14,5 % sur l'ensemble du montant.",
    },
    {
      icon: "🌿",
      title: "Éligible prime autoconsommation",
      description: "L'État verse une prime à l'autoconsommation solaire, calculée sur la puissance installée. Greenter monte et dépose le dossier — vous n'avez rien à faire.",
    },
    {
      icon: "📱",
      title: "Monitoring en temps réel",
      description: "Suivez votre production, votre autoconsommation et votre injection réseau depuis une application smartphone. Vos données, accessibles à tout moment.",
    },
  ],
  comparison: {
    alt1Name: "Kit standard (non installé)",
    alt2Name: "Pergola sans panneaux",
    rows: [
      { criterion: "Sur mesure", ours: true, alt1: false, alt2: "Partiel" },
      { criterion: "Installation incluse", ours: true, alt1: false, alt2: false },
      { criterion: "Pose par technicien RGE", ours: true, alt1: false, alt2: false },
      { criterion: "TVA 5,5 %", ours: true, alt1: false, alt2: false },
      { criterion: "Production électrique", ours: true, alt1: true, alt2: false },
      { criterion: "Raccordement réseau géré", ours: true, alt1: false, alt2: false },
      { criterion: "Prime autoconsommation", ours: true, alt1: false, alt2: false },
      { criterion: "Monitoring inclus", ours: true, alt1: false, alt2: false },
      { criterion: "Dossier aides géré", ours: true, alt1: false, alt2: false },
      { criterion: "Compatible borne VE", ours: true, alt1: "Option", alt2: false },
    ],
  },
  reviews: [],
  faq: [
    {
      question: "Quelle est la différence entre un carport et une pergola solaire ?",
      answer:
        "Le carport est conçu principalement pour abriter un ou plusieurs véhicules. La pergola est davantage orientée vers la création d'un espace de vie couvert — terrasse, coin jardin. Les deux intègrent des panneaux photovoltaïques et produisent de l'électricité, mais leurs usages, dimensions et esthétiques diffèrent. Nous vous aidons à choisir lors de l'étude gratuite.",
    },
    {
      question: "Faut-il un permis de construire ?",
      answer:
        "Pour une surface au sol inférieure à 20 m², une simple déclaration préalable de travaux en mairie suffit (délai environ 1 mois). Au-delà, un permis de construire est nécessaire. Greenter vous accompagne dans la constitution du dossier administratif.",
    },
    {
      question: "Comment est déterminée la puissance à installer ?",
      answer:
        "Nous analysons votre consommation annuelle réelle, l'ensoleillement de votre terrain, la surface disponible et vos objectifs (autoconsommation totale, revente du surplus, recharge VE). À partir de ce bilan, nous vous recommandons la puissance optimale — ni surdimensionnée, ni insuffisante.",
    },
    {
      question: "Puis-je recharger ma voiture électrique avec ce système ?",
      answer:
        "Oui. Nous proposons en option l'installation d'une borne de recharge directement couplée à votre production solaire. Un système de pilotage intelligent déclenche la recharge en priorité quand la production est suffisante, ce qui rend la recharge pratiquement gratuite en journée.",
    },
    {
      question: "Quel est le délai entre le devis et la mise en service ?",
      answer:
        "Comptez environ une semaine pour le bilan et le devis, puis quelques semaines de fabrication et de planification selon la complexité du projet, puis un à deux jours de pose. Nous vous communiquons un planning précis dès validation du devis.",
    },
    {
      question: "Quelles aides financières sont disponibles ?",
      answer:
        "TVA réduite à 5,5 % automatique (économie directe sur le montant total), prime à l'autoconsommation solaire versée par l'État, et Éco-PTZ à taux zéro si le projet est couplé à une rénovation globale. Greenter monte et dépose l'ensemble des dossiers — vous n'avez aucune démarche à effectuer.",
    },
  ],
}

export default function CarportSolairePage() {
  return <ProductTemplateV2 product={PRODUCT} />
}

