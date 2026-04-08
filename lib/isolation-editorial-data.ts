/**
 * Isolation Editorial Content - Data File
 *
 * Données statiques pour le contenu éditorial de la page "Isolation à 1€".
 * Toutes les données proviennent de sources officielles (Anah, ADEME,
 * France Rénov', economie.gouv.fr, service-public.fr).
 */

import type { InstallationStep, SourceReference } from "./pac-editorial-data"

// ============================================================================
// Types
// ============================================================================

export interface IsolationZone {
  id: string
  name: string
  percentage: string
  description: string
  rMin: string
  priority: "très élevée" | "élevée" | "moyenne"
}

export interface IsolationMateriau {
  id: string
  nom: string
  famille: "Minéral" | "Biosourcé" | "Synthétique"
  lambda: string
  rPour7: string
  atouts: string[]
  ideal: string
}

export interface PlafondRessources {
  personnes: number
  tresModeste: number
  modeste: number
  intermediaire: number
}

// ============================================================================
// ISOLATION_ZONES - Répartition des déperditions thermiques
// Source : ADEME, 2026
// ============================================================================

export const ISOLATION_ZONES: IsolationZone[] = [
  {
    id: "toiture",
    name: "Toiture & combles",
    percentage: "25-30%",
    description:
      "La chaleur monte : la toiture est la première source de pertes. Travaux les plus rentables, amortis en 3 à 5 ans.",
    rMin: "R ≥ 7 m².K/W",
    priority: "très élevée",
  },
  {
    id: "murs",
    name: "Murs",
    percentage: "20-25%",
    description:
      "L'isolation des murs supprime les ponts thermiques et les sensations de paroi froide. ITE ou ITI selon le bâti.",
    rMin: "R ≥ 3,7 m².K/W",
    priority: "élevée",
  },
  {
    id: "fenetres",
    name: "Fenêtres & ouvertures",
    percentage: "10-15%",
    description:
      "Simple vitrage ou menuiseries anciennes : remplacement par du double ou triple vitrage, avec menuiseries PVC/alu performantes.",
    rMin: "Uw ≤ 1,3 W/m².K",
    priority: "moyenne",
  },
  {
    id: "plancher",
    name: "Planchers bas",
    percentage: "7-10%",
    description:
      "Sur vide sanitaire, cave ou garage non chauffé. Projection de mousse ou panneaux rigides, chantier rapide en 1 journée.",
    rMin: "R ≥ 3 m².K/W",
    priority: "élevée",
  },
]

// ============================================================================
// ISOLATION_MATERIAUX - Matériaux certifiés ACERMI
// Source : CSTB, ADEME, fiches ACERMI 2026
// ============================================================================

export const ISOLATION_MATERIAUX: IsolationMateriau[] = [
  {
    id: "laine-verre",
    nom: "Laine de verre",
    famille: "Minéral",
    lambda: "λ = 0,032 à 0,040 W/m.K",
    rPour7: "280 à 300 mm",
    atouts: ["Économique", "Incombustible (A1)", "Pose rapide par soufflage", "Durée de vie 50 ans"],
    ideal: "Combles perdus, soufflage sur grande surface",
  },
  {
    id: "laine-roche",
    nom: "Laine de roche",
    famille: "Minéral",
    lambda: "λ = 0,034 à 0,042 W/m.K",
    rPour7: "300 à 320 mm",
    atouts: ["Excellente performance phonique", "Résistance feu (A1)", "Stable dans le temps", "Recyclable"],
    ideal: "Combles, murs, planchers — tous supports",
  },
  {
    id: "ouate-cellulose",
    nom: "Ouate de cellulose",
    famille: "Biosourcé",
    lambda: "λ = 0,038 à 0,042 W/m.K",
    rPour7: "280 à 300 mm",
    atouts: ["Fabriqué à partir de papier recyclé", "Excellent confort d'été", "Perspirant", "Bilan carbone négatif"],
    ideal: "Combles perdus soufflés, éco-responsables",
  },
  {
    id: "fibre-bois",
    nom: "Fibre de bois",
    famille: "Biosourcé",
    lambda: "λ = 0,037 à 0,045 W/m.K",
    rPour7: "290 à 320 mm",
    atouts: ["Déphasage thermique exceptionnel", "Régule l'humidité", "Matériau renouvelable", "Acoustique"],
    ideal: "Rampants, toitures cathédrales, confort d'été",
  },
  {
    id: "polyurethane",
    nom: "Polyuréthane (PUR)",
    famille: "Synthétique",
    lambda: "λ = 0,022 à 0,028 W/m.K",
    rPour7: "180 à 200 mm",
    atouts: ["Performance maximale", "Épaisseur réduite", "Imputrescible", "Idéal planchers"],
    ideal: "Planchers bas, ITE en faible épaisseur",
  },
]

// ============================================================================
// PLAFONDS_IDF_2026 - Plafonds de ressources Anah 2026 (Île-de-France)
// Source : Arrêté Anah, bulletin officiel 25/12/2025 — +1,105% vs 2025
// ============================================================================

export const PLAFONDS_IDF_2026: PlafondRessources[] = [
  { personnes: 1, tresModeste: 24031, modeste: 29253, intermediaire: 40851 },
  { personnes: 2, tresModeste: 35270, modeste: 42932, intermediaire: 60050 },
  { personnes: 3, tresModeste: 42355, modeste: 51563, intermediaire: 71845 },
  { personnes: 4, tresModeste: 49456, modeste: 60207, intermediaire: 84562 },
  { personnes: 5, tresModeste: 56579, modeste: 68876, intermediaire: 96816 },
]

export const PLAFONDS_HORS_IDF_2026: PlafondRessources[] = [
  { personnes: 1, tresModeste: 17361, modeste: 22250, intermediaire: 31177 },
  { personnes: 2, tresModeste: 25393, modeste: 32546, intermediaire: 45826 },
  { personnes: 3, tresModeste: 30540, modeste: 39148, intermediaire: 55156 },
  { personnes: 4, tresModeste: 35675, modeste: 45730, intermediaire: 64552 },
  { personnes: 5, tresModeste: 40831, modeste: 52340, intermediaire: 73909 },
]

// ============================================================================
// ISOLATION_STEPS - Processus de A à Z
// ============================================================================

export const ISOLATION_STEPS: InstallationStep[] = [
  {
    step: 1,
    title: "Test d'éligibilité téléphonique",
    duration: "2 minutes",
    description:
      "Au téléphone, nous évaluons votre catégorie MaPrimeRénov' (Bleu, Jaune, Violet, Rose) selon votre composition familiale et votre revenu fiscal de référence. Nous calculons immédiatement l'estimation de vos aides.",
    icon: "phone",
  },
  {
    step: 2,
    title: "Visite technique gratuite",
    duration: "45 minutes",
    description:
      "Un technicien Greenter se déplace chez vous en Seine-et-Marne : mesures précises des combles, contrôle de la charpente, repérage des points singuliers (trappe d'accès, conduits de fumée, spots encastrés), choix de l'isolant adapté.",
    icon: "home",
  },
  {
    step: 3,
    title: "Devis & dépôt des aides",
    duration: "48 à 72h",
    description:
      "Nous établissons un devis détaillé avec aides MaPrimeRénov' et Prime CEE déjà déduites. Nous déposons votre dossier sur maprimerenov.gouv.fr, signons le contrat CEE avec le fournisseur d'énergie et attendons l'accord de l'Anah avant d'engager les travaux.",
    icon: "document",
  },
  {
    step: 4,
    title: "Chantier d'isolation",
    duration: "1/2 journée à 1 jour",
    description:
      "Protection du logement, pose du pare-vapeur, soufflage ou déroulé de l'isolant à la densité et à l'épaisseur réglementaires (R ≥ 7 m².K/W), pose des déflecteurs en sous-toiture, des rehausses de trappe et des piges témoin d'épaisseur. Vérification finale au caméra thermique.",
    icon: "wrench",
  },
  {
    step: 5,
    title: "Versement des aides",
    duration: "2 à 6 semaines",
    description:
      "Nous envoyons la facture à l'Anah et au fournisseur CEE. Les aides sont versées directement sur votre compte bancaire. Vous profitez immédiatement des économies de chauffage, jusqu'à 600€/an pour 100 m² de combles.",
    icon: "euro",
  },
]

// ============================================================================
// OFFICIAL_SOURCES_ISOLATION - Sources officielles pour fact-checking
// ============================================================================

export const OFFICIAL_SOURCES_ISOLATION: SourceReference[] = [
  {
    name: "ADEME — Guide pratique de l'isolation",
    url: "https://librairie.ademe.fr/urbanisme-et-batiment/4972-isolation-thermique.html",
    date: "mars 2026",
    type: "official",
  },
  {
    name: "France Rénov' — Aides à la rénovation",
    url: "https://france-renov.gouv.fr/aides",
    date: "mars 2026",
    type: "official",
  },
  {
    name: "Anah — Plafonds de ressources MaPrimeRénov' 2026",
    url: "https://www.anah.gouv.fr/proprietaires/proprietaires-occupants/les-conditions-de-ressources",
    date: "janvier 2026",
    type: "official",
  },
  {
    name: "Service-Public.fr — MaPrimeRénov'",
    url: "https://www.service-public.fr/particuliers/vosdroits/F35083",
    date: "mars 2026",
    type: "official",
  },
  {
    name: "Écologie.gouv.fr — Certificats d'Économies d'Énergie (CEE)",
    url: "https://www.ecologie.gouv.fr/dispositif-des-certificats-deconomies-denergie",
    date: "mars 2026",
    type: "official",
  },
  {
    name: "Service-Public.fr — Éco-prêt à taux zéro",
    url: "https://www.service-public.fr/particuliers/vosdroits/F19905",
    date: "mars 2026",
    type: "official",
  },
  {
    name: "Règlementation Environnementale RE2020",
    url: "https://www.ecologie.gouv.fr/reglementation-environnementale-re2020",
    date: "2024",
    type: "regulation",
  },
]

// ============================================================================
// ISOLATION_FAQS - Questions fréquentes
// ============================================================================

export const ISOLATION_FAQS = [
  {
    question: "L'isolation à 1€ existe-t-elle encore en 2026 ?",
    answer:
      "Non, pas dans sa forme historique. Le dispositif « Coup de Pouce Isolation à 1€ » a officiellement pris fin le 1er juillet 2021 suite à de nombreuses fraudes et malfaçons. En 2026, grâce au cumul de MaPrimeRénov' Bleu/Jaune, de la Prime CEE bonifiée « Grands Précaires » et de l'Éco-PTZ, le reste à charge peut descendre à quelques euros pour les ménages très modestes sur l'isolation des combles perdus.",
  },
  {
    question: "Quelles sont les aides disponibles pour l'isolation en 2026 ?",
    answer:
      "Trois aides principales sont cumulables en 2026 : (1) MaPrimeRénov' Parcours par Geste — jusqu'à 25 €/m² pour les ménages très modestes sur l'isolation des combles perdus ; (2) la Prime CEE bonifiée « Grands Précaires » — jusqu'à 10,54 €/m² pour les combles et 6,80 €/m² pour les planchers bas ; (3) l'Éco-PTZ — jusqu'à 50 000 € à taux zéro sans condition de revenus. La TVA est automatiquement réduite à 5,5 % pour tous les travaux réalisés par un artisan RGE dans un logement de plus de 2 ans.",
  },
  {
    question: "Quels sont les plafonds de ressources Anah 2026 ?",
    answer:
      "En Île-de-France pour 2026, un ménage « très modeste » (catégorie Bleu) a un revenu fiscal de référence inférieur à 24 031 € pour 1 personne et 35 270 € pour 2 personnes. Hors Île-de-France, les plafonds sont de 17 361 € et 25 393 € respectivement. Les catégories Bleu (très modestes) et Jaune (modestes) bénéficient des aides les plus élevées. L'arrêté Anah publié au bulletin officiel du 25 décembre 2025 a revalorisé ces plafonds de +1,105 % par rapport à 2025.",
  },
  {
    question: "Quelle est la résistance thermique minimale exigée pour les aides ?",
    answer:
      "Pour bénéficier de MaPrimeRénov' et des CEE, la résistance thermique (R) minimale est de R ≥ 7 m².K/W pour l'isolation des combles perdus et des rampants de toiture, et R ≥ 3 m².K/W pour les planchers bas. Pour les murs, R ≥ 3,7 m².K/W. Ces seuils garantissent une performance énergétique suffisante pour être éligible aux primes.",
  },
  {
    question: "Combien de temps durent les travaux d'isolation des combles ?",
    answer:
      "L'isolation des combles perdus par soufflage est très rapide : pour une maison de 80 à 120 m², le chantier se termine en une demi-journée à une journée complète. L'isolation des planchers bas par projection de mousse polyuréthane ou pose de panneaux rigides nécessite 1 à 2 jours selon la surface. Vous profitez des économies d'énergie immédiatement après la fin du chantier, jusqu'à 600 €/an sur votre facture de chauffage pour 100 m² de combles.",
  },
  {
    question: "Quel matériau isolant choisir pour les combles ?",
    answer:
      "Pour les combles perdus, les trois isolants les plus utilisés sont la laine de verre soufflée (économique, λ ≈ 0,035 W/m.K), la laine de roche (excellente performance phonique et feu) et la ouate de cellulose (biosourcée, bilan carbone négatif). Tous atteignent R = 7 m².K/W avec 280 à 320 mm d'épaisseur. Pour les rampants, la fibre de bois est idéale grâce à son déphasage thermique exceptionnel qui améliore le confort d'été.",
  },
  {
    question: "Comment se passe le dépôt du dossier MaPrimeRénov' ?",
    answer:
      "Greenter s'occupe de toute la procédure : création de votre compte sur maprimerenov.gouv.fr, constitution du dossier, téléversement du devis, suivi de l'instruction Anah, puis envoi de la facture après travaux pour déclencher le versement. Les aides CEE sont quant à elles directement déduites de notre devis (mention « prime déduite »). Vous n'avez qu'à signer le devis et profiter de vos travaux.",
  },
  {
    question: "Comment éviter les arnaques à l'isolation ?",
    answer:
      "Méfiez-vous du démarchage téléphonique — il est interdit depuis 2020 pour la rénovation énergétique. Fuyez les offres « 100 % gratuites sans étude » et les entreprises sans certification RGE vérifiable. Chez Greenter, vous pouvez vérifier notre RGE Qualibat directement sur france-renov.gouv.fr. Nous établissons toujours un devis détaillé après une visite technique gratuite, sans pression commerciale.",
  },
]

// ============================================================================
// Constants
// ============================================================================

export const ISOLATION_READING_TIME = 11 // minutes
export const ISOLATION_LAST_UPDATED = "avril 2026"

// Économies annuelles moyennes selon zone isolée (source : ADEME)
export const ECONOMIES_ANNUELLES = {
  toiture: "450 à 700 €",
  murs: "350 à 550 €",
  planchers: "150 à 250 €",
  fenetres: "100 à 200 €",
}
