import type { Metadata } from 'next'
import { ProductTemplateV2 } from '@/components/products/ProductTemplateV2'
import type { ProductV2Data } from '@/components/products/ProductTemplateV2'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Kit Autoconsommation Solaire 6 kWc — Panneaux + Micro-onduleurs | Greenter',
  description: "Kit autoconsommation 6 kWc à 5 610 € au lieu de 6 600 € : 12 panneaux DMEGC 500 Wc, 6 micro-onduleurs Hoymiles, fixations ISY-PV, déclaration préalable mairie incluse. Monophasé ou triphasé.",
  alternates: {
    canonical: "https://www.greenter.fr/produits/kit-autoconsommation-6kwc",
  },
  openGraph: {
    title: "Kit Autoconsommation Solaire 6 kWc | Greenter",
    description: "12 panneaux photovoltaïques 500 Wc + 6 micro-onduleurs Hoymiles + fixations ISY-PV. Kit complet posé par technicien RGE, monophasé ou triphasé au choix.",
    url: "https://www.greenter.fr/produits/kit-autoconsommation-6kwc",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
}

const PRODUCT: ProductV2Data = {
  name: "Kit Autoconsommation Solaire 6 kWc",
  categoryName: "Kits Autoconsommation Solaire",
  categorySlug: "kits-autoconsommation",
  slug: "kit-autoconsommation-6kwc",
  pricePrefix: "Prix tout compris",
  currentPrice: 5610,
  originalPrice: 6600,
  priceNote: "Hors Consuel et raccordement Enedis : supplément de 700 €, facturé séparément.",
  hideMonthly: true,
  hideMaPrimeRenovBadge: true,
  gift: { name: "Bilan solaire et étude de faisabilité", value: 350 },
  expertCallout: {
    title: "Idéal pour un foyer consommant 5 000 à 8 000 kWh/an",
    body: "Avec 12 panneaux de 500 Wc, ce kit vise une autoconsommation élevée : chauffage électrique, ballon d'eau chaude, recharge de véhicule électrique ou grande famille. En Île-de-France, comptez une production annuelle d'environ 6 600 à 7 200 kWh. Nos techniciens RGE QualiPV valident avec vous l'orientation, l'inclinaison et la répartition sur un ou deux pans de toiture.",
  },
  benefits: [
    { emoji: "📦", title: "Kit complet", sub: "Panneaux + micro-onduleurs + fixations" },
    { emoji: "🔧", title: "Pose incluse", sub: "Par techniciens RGE QualiPV" },
    { emoji: "⚡", title: "Mono ou triphasé", sub: "Configuration au choix du client" },
    { emoji: "📱", title: "Monitoring inclus", sub: "Suivi de production par panneau" },
    { emoji: "🛡️", title: "Garantie 25 ans", sub: "Puissance linéaire panneaux" },
  ],
  deliveryDays: "sous 2 à 4 semaines selon planning",
  rating: 0,
  reviewCount: 0,
  buyerCount: 0,
  monthlyBuyers: 0,
  ctaHref: "/contact",
  images: [
    "/solaire.jpg",
  ],
  shortDescription:
    "12 panneaux photovoltaïques DMEGC 500 Wc, 6 micro-onduleurs Hoymiles HMS-1000-2T et fixations ISY-PV pour toiture inclinée. Fixation, livraison, pose et garantie sont inclus dans le prix. Installation en monophasé ou triphasé selon votre configuration électrique.",
  description: `
    <p>Le <strong>kit autoconsommation 6 kWc</strong> double la puissance du kit 3 kWc pour les foyers à consommation élevée. Panneaux, micro-onduleurs et système de fixation sont sélectionnés, livrés et posés par nos équipes, avec une garantie complète sur l'ensemble de l'installation.</p>

    <h3>Composition du kit</h3>
    <ul>
      <li><strong>12 panneaux photovoltaïques DMEGC 500 Wc</strong> — cellules monocristallines type P, cadre noir esthétique, rendement 21,1 %, garantie produit 15 ans et garantie de puissance linéaire 25 ans (≥ 84,8 % à l'année 25).</li>
      <li><strong>6 micro-onduleurs Hoymiles HMS-1000-2T</strong> — technologie 2-en-1 (un micro-onduleur pour 2 panneaux), avec MPPT et surveillance indépendants pour chaque module, monitoring via l'application S-Miles Cloud.</li>
      <li><strong>Fixations ISY-PV ISY-HOOK</strong> — système universel de surimposition pour toiture inclinée, compatible tuiles, ardoises et tôles fibrociment, rails et étriers noirs, validé ETN, garantie fabricant 25 ans.</li>
    </ul>

    <h3>Monophasé ou triphasé : à vous de choisir</h3>
    <p>Ce kit s'installe aussi bien sur un réseau électrique <strong>monophasé</strong> que <strong>triphasé</strong>. En triphasé, les 6 micro-onduleurs sont répartis de façon équilibrée sur les 3 phases (2 par phase) par notre technicien lors de la pose, afin d'optimiser la production et de respecter les limites d'intensité par phase. Votre configuration électrique est confirmée par notre technicien lors de la visite technique préalable à l'installation.</p>

    <h3>TVA à 0 % sur votre installation solaire</h3>
    <p>Les installations photovoltaïques résidentielles d'une puissance inférieure ou égale à 9 kWc bénéficient de la <strong>TVA à 0 %</strong> sur la fourniture et la pose depuis la loi de finances 2024 — ce kit de 6 kWc en profite intégralement.</p>

    <h3>Démarches administratives : ce qui est inclus, ce qui ne l'est pas</h3>
    <p>La <strong>déclaration préalable de travaux en mairie</strong>, obligatoire pour l'installation de panneaux solaires, est entièrement prise en charge par nos équipes et incluse dans le prix affiché — vous n'avez aucune démarche à effectuer de votre côté.</p>
    <p>En revanche, le <strong>Consuel</strong> (certificat de conformité électrique obligatoire) et le <strong>raccordement Enedis</strong> font l'objet d'un supplément de <strong>700 €</strong>, facturé séparément du prix du kit. Ce montant couvre le dépôt du dossier, la visite de conformité et la mise en service auprès du gestionnaire de réseau.</p>

    <h3>Une pose clé en main, même sur deux pans de toiture</h3>
    <p>Fixation, livraison et pose sont intégralement inclus dans le prix affiché — aucun frais caché. Avec 12 panneaux, l'installation peut être répartie sur un ou deux pans de toiture selon la configuration de votre maison ; nos techniciens certifiés <strong>RGE QualiPV</strong> étudient cette répartition avec vous avant la pose, généralement réalisée en une à deux journées.</p>
  `,
  specs: [
    { label: "Puissance crête du kit", value: "6 000 Wc (6 kWc)" },
    { label: "Nombre de panneaux", value: "12 panneaux" },
    { label: "Modèle panneau", value: "DMEGC DM500M10-66HBB (gamme 490–505 Wc)" },
    { label: "Type de cellule", value: "Monocristallin type P, 132 cellules" },
    { label: "Rendement panneau", value: "21,1 %" },
    { label: "Dimensions panneau", value: "2 094 x 1 134 x 35 mm — 26 kg" },
    { label: "Garantie panneaux", value: "15 ans produit / 25 ans puissance linéaire" },
    { label: "Micro-onduleurs", value: "6 x Hoymiles HMS-1000-2T (2 panneaux/onduleur)" },
    { label: "Puissance onduleur", value: "1 000 VA nominal, 2 MPPT indépendants" },
    { label: "Rendement onduleur", value: "96,5 % (CEC max) / 99,8 % (MPPT)" },
    { label: "Étanchéité onduleur", value: "IP67, usage extérieur" },
    { label: "Monitoring", value: "Application S-Miles Cloud, suivi par panneau" },
    { label: "Fixations", value: "ISY-PV ISY-HOOK, rails et crochets noirs" },
    { label: "Compatibilité toiture", value: "Tuiles, ardoises, tôles fibrociment (surimposition)" },
    { label: "Garantie fixations", value: "25 ans constructeur, validé ETN A.24.08620" },
    { label: "Raccordement", value: "Monophasé ou triphasé au choix (2 onduleurs/phase en triphasé)" },
    { label: "Tension max système", value: "1 000 V / 1 500 V cc" },
    { label: "TVA applicable", value: "0 % (installation ≤ 9 kWc par pro)" },
    { label: "Déclaration préalable mairie", value: "Incluse, réalisée par nos soins" },
    { label: "Consuel et raccordement Enedis", value: "Supplément de 700 € (hors kit)" },
    { label: "Certification installation", value: "RGE QualiPV" },
  ],
  features: [
    {
      icon: "📦",
      title: "Kit complet clé en main",
      description: "Panneaux, micro-onduleurs et fixations sont livrés et posés ensemble. Vous n'avez rien à assembler ni à commander séparément.",
    },
    {
      icon: "⚙️",
      title: "Micro-onduleurs 2-en-1",
      description: "Chaque Hoymiles HMS-1000-2T pilote 2 panneaux avec un MPPT indépendant : l'ombre ou la salissure sur un module n'affecte pas la production des autres.",
    },
    {
      icon: "⚡",
      title: "Monophasé ou triphasé",
      description: "L'installation s'adapte à votre réseau électrique existant. En triphasé, les 6 micro-onduleurs sont répartis 2 par phase par notre technicien.",
    },
    {
      icon: "🏠",
      title: "Adapté à deux pans de toiture",
      description: "Avec 12 panneaux, le kit peut être réparti sur deux orientations différentes pour optimiser la production tout au long de la journée.",
    },
    {
      icon: "📱",
      title: "Monitoring en temps réel",
      description: "Suivez la production de chaque panneau individuellement depuis l'application S-Miles Cloud de Hoymiles, sur smartphone ou ordinateur.",
    },
    {
      icon: "💶",
      title: "TVA 0 % incluse",
      description: "Kit ≤ 9 kWc éligible à la TVA à 0 % automatique sur la fourniture et la pose, sans démarche de votre part.",
    },
  ],
  comparison: {
    alt1Name: "Kit en autoconstruction",
    alt2Name: "Installateur non certifié",
    rows: [
      { criterion: "Panneaux certifiés TÜV/CE, garantie 25 ans", ours: true, alt1: "Variable", alt2: "Variable" },
      { criterion: "Micro-onduleurs 2-en-1 avec MPPT indépendant", ours: true, alt1: "Selon kit", alt2: "Selon kit" },
      { criterion: "Monophasé ou triphasé au choix", ours: true, alt1: false, alt2: "Limité" },
      { criterion: "Pose par technicien RGE QualiPV", ours: true, alt1: false, alt2: false },
      { criterion: "TVA 0 % appliquée automatiquement", ours: true, alt1: false, alt2: "Non garanti" },
      { criterion: "Raccordement Enedis géré", ours: true, alt1: false, alt2: "Variable" },
      { criterion: "Monitoring S-Miles Cloud inclus", ours: true, alt1: true, alt2: "Selon installateur" },
      { criterion: "Garantie décennale sur la pose", ours: true, alt1: false, alt2: "Variable" },
      { criterion: "Fixations certifiées ETN (25 ans)", ours: true, alt1: "Selon kit", alt2: "Selon kit" },
      { criterion: "SAV et suivi après installation", ours: true, alt1: false, alt2: false },
    ],
  },
  reviews: [],
  faq: [
    {
      question: "Quelle est la différence entre le kit 3 kWc et le kit 6 kWc ?",
      answer:
        "Le kit 6 kWc comprend 12 panneaux et 6 micro-onduleurs, pour une production annuelle estimée à 6 600–7 200 kWh en Île-de-France — adapté à une consommation élevée (chauffage électrique, véhicule électrique, grande famille). Le kit 3 kWc, avec 6 panneaux et 3 micro-onduleurs, convient à un premier projet ou une consommation plus modérée (3 300–3 600 kWh/an).",
    },
    {
      question: "Puis-je choisir une installation monophasée ou triphasée ?",
      answer:
        "Oui. Ce kit s'installe sur les deux types de réseau. En triphasé, les 6 micro-onduleurs sont répartis 2 par phase par notre technicien afin d'équilibrer la production sur les 3 phases. Votre configuration électrique est confirmée avec vous lors de la visite technique préalable à l'installation — précisez-le lors de votre prise de contact si vous le savez déjà.",
    },
    {
      question: "De quelle surface de toiture ai-je besoin ?",
      answer:
        "Chaque panneau mesure 2,094 x 1,134 m, soit environ 2,4 m². Pour 12 panneaux, comptez une surface de toiture disponible d'environ 30 m², rails et espacements de sécurité compris — répartissable sur un ou deux pans de toiture. Nos techniciens vérifient la faisabilité (orientation, inclinaison, ombrage) lors de la visite technique préalable.",
    },
    {
      question: "Le kit est-il compatible avec tous les types de toiture ?",
      answer:
        "Le système de fixation ISY-PV ISY-HOOK est un système universel de surimposition compatible avec les tuiles mécaniques, tuiles plates, ardoises et tôles fibrociment. Pour les toitures en bac acier, toiture plate ou cas particuliers, contactez-nous pour valider le système de fixation adapté avant commande.",
    },
    {
      question: "Quelles aides financières s'appliquent à ce kit ?",
      answer:
        "Ce kit de 6 kWc, inférieur au seuil de 9 kWc, bénéficie de la TVA à 0 % sur la fourniture et la pose (loi de finances 2024). Cette aide ne nécessite pas de dossier MaPrimeRénov', qui concerne d'autres travaux de rénovation énergétique.",
    },
    {
      question: "Le prix affiché comprend-il vraiment tout ?",
      answer:
        "Le prix de 5 610 € TTC comprend la fourniture, la livraison, la pose par un technicien RGE QualiPV, la garantie et la déclaration préalable de travaux en mairie. Deux éléments restent en dehors de ce prix : le Consuel et le raccordement Enedis (supplément fixe de 700 €, facturé séparément), ainsi qu'un éventuel devis complémentaire pour un renforcement de charpente si votre toiture le nécessite — validé avec vous avant tout engagement.",
    },
    {
      question: "Faut-il une déclaration préalable de travaux en mairie ?",
      answer:
        "Oui, l'installation de panneaux solaires nécessite une déclaration préalable de travaux auprès de votre mairie (délai d'instruction d'environ 1 mois). Cette démarche est entièrement prise en charge par nos équipes et incluse dans le prix du kit — vous n'avez aucun dossier à constituer vous-même.",
    },
    {
      question: "Pourquoi le Consuel et le raccordement Enedis sont-ils facturés en supplément ?",
      answer:
        "Le Consuel (certificat de conformité électrique, obligatoire pour toute installation photovoltaïque raccordée au réseau) et le raccordement Enedis impliquent des frais de dossier et d'intervention fixés par des organismes tiers, indépendants du prix du kit lui-même. Ce supplément de 700 € couvre l'ensemble de ces démarches, gérées de bout en bout par nos techniciens.",
    },
    {
      question: "Quel est le délai entre la commande et la mise en service ?",
      answer:
        "Comptez généralement 2 à 4 semaines entre votre commande et la mise en service, incluant la visite technique de faisabilité, la commande du matériel, la pose (une à deux journées selon la répartition sur la toiture) et les démarches de raccordement auprès d'Enedis.",
    },
  ],
}

export default async function KitAutoconsommation6kwcPage() {
  const { data: dbProduct } = await supabase
    .from('products')
    .select('id')
    .eq('slug', PRODUCT.slug)
    .eq('is_active', true)
    .single()

  return <ProductTemplateV2 product={{ ...PRODUCT, productId: dbProduct?.id }} />
}
