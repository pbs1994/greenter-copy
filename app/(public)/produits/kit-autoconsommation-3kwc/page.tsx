import type { Metadata } from 'next'
import { ProductTemplateV2 } from '@/components/products/ProductTemplateV2'
import type { ProductV2Data } from '@/components/products/ProductTemplateV2'

export const metadata: Metadata = {
  title: 'Kit Autoconsommation Solaire 3 kWc — Panneaux + Micro-onduleurs | Greenter',
  description: "Kit autoconsommation 3 kWc tout compris : 6 panneaux DMEGC 500 Wc, 3 micro-onduleurs Hoymiles, fixations ISY-PV. Fixation, livraison, pose et garantie inclus. Monophasé ou triphasé. 3 500 € TTC.",
  alternates: {
    canonical: "https://www.greenter.fr/produits/kit-autoconsommation-3kwc",
  },
  openGraph: {
    title: "Kit Autoconsommation Solaire 3 kWc | Greenter",
    description: "6 panneaux photovoltaïques 500 Wc + 3 micro-onduleurs Hoymiles + fixations ISY-PV. Kit complet posé par technicien RGE, monophasé ou triphasé au choix.",
    url: "https://www.greenter.fr/produits/kit-autoconsommation-3kwc",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
}

const PRODUCT: ProductV2Data = {
  name: "Kit Autoconsommation Solaire 3 kWc",
  categoryName: "Kits Autoconsommation Solaire",
  categorySlug: "kits-autoconsommation",
  slug: "kit-autoconsommation-3kwc",
  pricePrefix: "Prix tout compris",
  currentPrice: 3500,
  originalPrice: 3500,
  ctaLabel: "Demander un devis gratuit →",
  ctaModal: true,
  hideMonthly: true,
  quoteTypeLabel: "Configuration électrique souhaitée",
  quoteTypeOptions: ["Monophasé", "Triphasé", "Je ne sais pas / à conseiller"],
  quoteSurfaceOptions: [],
  expertCallout: {
    title: "Idéal pour un foyer consommant 2 500 à 4 000 kWh/an",
    body: "Avec 6 panneaux de 500 Wc, ce kit convient parfaitement à un premier projet d'autoconsommation : petite maison, résidence secondaire ou foyer souhaitant réduire sa facture sans viser l'autonomie totale. En Île-de-France, comptez une production annuelle d'environ 3 300 à 3 600 kWh. Nos techniciens RGE QualiPV valident avec vous l'orientation et l'inclinaison de toiture avant la pose.",
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
    "6 panneaux photovoltaïques DMEGC 500 Wc, 3 micro-onduleurs Hoymiles HMS-800-2T et fixations ISY-PV pour toiture inclinée. Fixation, livraison, pose et garantie sont inclus dans le prix. Installation en monophasé ou triphasé selon votre configuration électrique.",
  description: `
    <p>Le <strong>kit autoconsommation 3 kWc</strong> est une solution clé en main pour produire votre propre électricité sans complexité : panneaux, micro-onduleurs et système de fixation sont sélectionnés, livrés et posés par nos équipes, avec une garantie complète sur l'ensemble de l'installation.</p>

    <h3>Composition du kit</h3>
    <ul>
      <li><strong>6 panneaux photovoltaïques DMEGC 500 Wc</strong> — cellules monocristallines type P, cadre noir esthétique, rendement 21,1 %, garantie produit 15 ans et garantie de puissance linéaire 25 ans (≥ 84,8 % à l'année 25).</li>
      <li><strong>3 micro-onduleurs Hoymiles HMS-800-2T</strong> — technologie 2-en-1 (un micro-onduleur pour 2 panneaux), avec MPPT et surveillance indépendants pour chaque module, monitoring via l'application S-Miles Cloud.</li>
      <li><strong>Fixations ISY-PV ISY-HOOK</strong> — système universel de surimposition pour toiture inclinée, compatible tuiles, ardoises et tôles fibrociment, rails et étriers noirs, validé ETN, garantie fabricant 25 ans.</li>
    </ul>

    <h3>Monophasé ou triphasé : à vous de choisir</h3>
    <p>Ce kit s'installe aussi bien sur un réseau électrique <strong>monophasé</strong> que <strong>triphasé</strong>. En triphasé, les micro-onduleurs sont répartis de façon équilibrée sur les 3 phases par notre technicien lors de la pose. Vous indiquez votre préférence — ou laissez nos experts vous conseiller — directement dans le formulaire de devis.</p>

    <h3>TVA à 0 % et prime à l'autoconsommation</h3>
    <p>Les installations photovoltaïques résidentielles d'une puissance inférieure ou égale à 9 kWc bénéficient de la <strong>TVA à 0 %</strong> sur la fourniture et la pose depuis la loi de finances 2024 — ce kit de 3 kWc en profite intégralement. Votre installation peut également ouvrir droit à la <strong>prime à l'autoconsommation</strong> versée par EDF OA, dont le montant est mis à jour trimestriellement selon la puissance installée. Nos techniciens RGE QualiPV vous accompagnent dans les démarches de raccordement Enedis.</p>

    <h3>Une pose clé en main</h3>
    <p>Fixation, livraison et pose sont intégralement inclus dans le prix affiché — aucun frais caché. Nos techniciens certifiés <strong>RGE QualiPV</strong> réalisent l'installation en une journée dans la grande majorité des cas, du montage des rails jusqu'à la mise en service et au raccordement au compteur.</p>
  `,
  specs: [
    { label: "Puissance crête du kit", value: "3 000 Wc (3 kWc)" },
    { label: "Nombre de panneaux", value: "6 panneaux" },
    { label: "Modèle panneau", value: "DMEGC DM500M10-66HBB (gamme 490–505 Wc)" },
    { label: "Type de cellule", value: "Monocristallin type P, 132 cellules" },
    { label: "Rendement panneau", value: "21,1 %" },
    { label: "Dimensions panneau", value: "2 094 x 1 134 x 35 mm — 26 kg" },
    { label: "Garantie panneaux", value: "15 ans produit / 25 ans puissance linéaire" },
    { label: "Micro-onduleurs", value: "3 x Hoymiles HMS-800-2T (2 panneaux/onduleur)" },
    { label: "Puissance onduleur", value: "800 VA nominal, 2 MPPT indépendants" },
    { label: "Rendement onduleur", value: "96,7 % (CEC max) / 99,8 % (MPPT)" },
    { label: "Étanchéité onduleur", value: "IP67, usage extérieur" },
    { label: "Monitoring", value: "Application S-Miles Cloud, suivi par panneau" },
    { label: "Fixations", value: "ISY-PV ISY-HOOK, rails et crochets noirs" },
    { label: "Compatibilité toiture", value: "Tuiles, ardoises, tôles fibrociment (surimposition)" },
    { label: "Garantie fixations", value: "25 ans constructeur, validé ETN A.24.08620" },
    { label: "Raccordement", value: "Monophasé ou triphasé au choix" },
    { label: "Tension max système", value: "1 000 V / 1 500 V cc" },
    { label: "TVA applicable", value: "0 % (installation ≤ 9 kWc par pro)" },
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
      description: "Chaque Hoymiles HMS-800-2T pilote 2 panneaux avec un MPPT indépendant : l'ombre ou la salissure sur un module n'affecte pas la production des autres.",
    },
    {
      icon: "⚡",
      title: "Monophasé ou triphasé",
      description: "L'installation s'adapte à votre réseau électrique existant. En triphasé, les micro-onduleurs sont répartis équitablement sur les 3 phases par notre technicien.",
    },
    {
      icon: "🎨",
      title: "Panneaux noirs esthétiques",
      description: "Cadre et film arrière noirs pour une intégration discrète en toiture, sans compromis sur la performance (rendement 21,1 %).",
    },
    {
      icon: "📱",
      title: "Monitoring en temps réel",
      description: "Suivez la production de chaque panneau individuellement depuis l'application S-Miles Cloud de Hoymiles, sur smartphone ou ordinateur.",
    },
    {
      icon: "💶",
      title: "TVA 0 % et prime incluses",
      description: "Kit ≤ 9 kWc éligible à la TVA à 0 % automatique. Nous montons également votre dossier de prime à l'autoconsommation EDF OA.",
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
        "Le kit 3 kWc comprend 6 panneaux et 3 micro-onduleurs, pour une production annuelle estimée à 3 300–3 600 kWh en Île-de-France — adapté à un premier projet d'autoconsommation ou une consommation modérée. Le kit 6 kWc double la puissance avec 12 panneaux et 6 micro-onduleurs, pour une production estimée à 6 600–7 200 kWh/an, adapté à une consommation plus élevée (chauffage électrique, véhicule électrique, grande famille).",
    },
    {
      question: "Puis-je choisir une installation monophasée ou triphasée ?",
      answer:
        "Oui. Ce kit s'installe sur les deux types de réseau. En triphasé, les 3 micro-onduleurs sont répartis équitablement sur les 3 phases par notre technicien afin d'équilibrer la production. Vous précisez votre configuration électrique — ou demandez conseil — directement dans le formulaire de devis.",
    },
    {
      question: "De quelle surface de toiture ai-je besoin ?",
      answer:
        "Chaque panneau mesure 2,094 x 1,134 m, soit environ 2,4 m². Pour 6 panneaux, comptez une surface de toiture disponible d'environ 15 m², rails et espacements de sécurité compris. Nos techniciens vérifient la faisabilité (orientation, inclinaison, ombrage) avant validation du devis.",
    },
    {
      question: "Le kit est-il compatible avec tous les types de toiture ?",
      answer:
        "Le système de fixation ISY-PV ISY-HOOK est un système universel de surimposition compatible avec les tuiles mécaniques, tuiles plates, ardoises et tôles fibrociment. Pour les toitures en bac acier, toiture plate ou cas particuliers, contactez-nous pour valider le système de fixation adapté avant commande.",
    },
    {
      question: "Quelles aides financières s'appliquent à ce kit ?",
      answer:
        "Ce kit de 3 kWc, inférieur au seuil de 9 kWc, bénéficie de la TVA à 0 % sur la fourniture et la pose (loi de finances 2024). Il est également éligible à la prime à l'autoconsommation versée par EDF OA, dont le montant par kWc est mis à jour trimestriellement. Ces aides ne nécessitent pas de dossier MaPrimeRénov', qui concerne d'autres travaux de rénovation énergétique.",
    },
    {
      question: "Le prix affiché comprend-il vraiment tout ?",
      answer:
        "Oui : fixation, livraison, pose par un technicien RGE QualiPV et garantie sont inclus dans les 3 500 € TTC affichés. Seuls des travaux de renforcement de charpente, si votre toiture le nécessite, feraient l'objet d'un devis complémentaire — validé avec vous avant tout engagement.",
    },
    {
      question: "Quel est le délai entre la commande et la mise en service ?",
      answer:
        "Comptez généralement 2 à 4 semaines entre la validation du devis et la mise en service, incluant l'étude de faisabilité, la commande du matériel, la pose (une journée en moyenne) et les démarches de raccordement auprès d'Enedis.",
    },
  ],
}

export default function KitAutoconsommation3kwcPage() {
  return <ProductTemplateV2 product={PRODUCT} />
}
