// =============================================================================
// Données article : Meilleur isolant thermique des murs par l'intérieur 2026
// Sources : ademe.fr, ecologie.gouv.fr, anah.gouv.fr, france-renov.gouv.fr
//           rt-batiment.fr, placo.fr, knauf.fr
// Date de recherche : mai 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Meilleur isolation thermique des murs par l'intérieur en 2026 : comparatif complet",
  subtitle:
    "Laine de roche, PSE, polyuréthane projeté ou ouate de cellulose : quel est le meilleur isolant thermique pour vos murs par l'intérieur en 2026 ? Comparatif des matériaux, prix au m², aides MaPrimeRénov' et guide de pose.",
  slug: "meilleur-isolant-thermique-murs-interieur-2026",
  date: "22 mai 2026",
  dateISO: "2026-05-22",
  readingTime: 12,
  author: "Greenter",
}

// Tableau comparatif des 5 meilleurs isolants pour murs par l'intérieur
export const ISOLANTS_TABLE = {
  columns: [
    { header: "Matériau", key: "materiau" },
    { header: "λ (W/m·K)", key: "lambda", highlight: true },
    { header: "Épaisseur pour R=3,7", key: "epaisseur", highlight: true },
    { header: "Prix posé /m²", key: "prix" },
    { header: "Points forts", key: "avantages" },
  ],
  rows: [
    {
      materiau: "Laine de roche (panneaux)",
      lambda: "0,034",
      epaisseur: "125 mm",
      prix: "80–120 €",
      avantages: "Incombustible, excellent acoustique, résistant à l'humidité",
    },
    {
      materiau: "Laine de verre",
      lambda: "0,032",
      epaisseur: "120 mm",
      prix: "70–100 €",
      avantages: "Légère, économique, bonne résistance au feu",
    },
    {
      materiau: "Polystyrène expansé (PSE)",
      lambda: "0,033",
      epaisseur: "122 mm",
      prix: "60–90 €",
      avantages: "Imputrescible, facile à découper, bonne résistance mécanique",
    },
    {
      materiau: "Polyuréthane projeté",
      lambda: "0,024",
      epaisseur: "90 mm",
      prix: "110–160 €",
      avantages: "Meilleur R/épaisseur, sans ponts thermiques, adhère au support",
    },
    {
      materiau: "Ouate de cellulose",
      lambda: "0,040",
      epaisseur: "148 mm",
      prix: "85–120 €",
      avantages: "Biosourcé, excellent confort d'été, régulateur d'humidité",
    },
  ],
  caption:
    "Épaisseurs calculées pour atteindre R≥3,7 m²·K/W (objectif BBC rénovation). Prix fourniture + pose en Île-de-France, 2026. Sources : ADEME, fiches DTE fabricants.",
}

// Tableau des aides financières en 2026
export const AIDES_TABLE = {
  columns: [
    { header: "Dispositif", key: "aide" },
    { header: "Montant 2026", key: "montant", highlight: true },
    { header: "Conditions principales", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' — isolation des murs (ITI)",
      montant: "75 €/m² (Bleu) · 60 €/m² (Jaune) · 40 €/m² (Violet) · 15 €/m² (Rose)",
      conditions: "Logement >15 ans, artisan RGE, plafond 150 m². Montant maximal : 11 250 € (Bleu).",
    },
    {
      aide: "Coup de pouce CEE isolation des murs",
      montant: "Variable selon la zone climatique et la surface",
      conditions: "Pas de condition de ressources. Négocié avec l'obligé CEE (EDF, Engie…). Cumulable avec MaPrimeRénov'.",
    },
    {
      aide: "Éco-prêt à taux zéro (éco-PTZ)",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions: "Logement construit avant 1990. Travaux éligibles réalisés par un artisan RGE. Durée jusqu'à 20 ans.",
    },
    {
      aide: "TVA à taux réduit (5,5 %)",
      montant: "Sur fournitures et main-d'œuvre",
      conditions: "Logement achevé depuis plus de 2 ans. Artisan RGE non obligatoire pour la TVA seule.",
    },
  ],
  caption:
    "Sources : france-renov.gouv.fr, anah.gouv.fr, ecologie.gouv.fr. Barèmes en vigueur au 1er janvier 2026.",
}

// Étapes de pose (ITI avec ossature métallique + laine de roche)
export const STEPS = [
  {
    title: "Diagnostic et préparation du support",
    detail:
      "Vérifier l'absence d'humidité dans les murs (test au plastique ou mesure hygromètre). Traiter les remontées capillaires ou les infiltrations avant tout travaux d'isolation. Vider la pièce et protéger les sols.",
  },
  {
    title: "Traçage et pose de l'ossature métallique",
    detail:
      "Fixer les rails au sol et au plafond en laissant un espace de 1 à 2 cm entre le mur extérieur et l'ossature pour permettre l'insertion de l'isolant. Poser les montants tous les 60 cm (ou 40 cm pour les zones de charge).",
  },
  {
    title: "Insertion des panneaux isolants",
    detail:
      "Glisser les panneaux de laine de roche ou de laine de verre entre les montants. Vérifier qu'il n'y a aucun vide ni pont thermique au niveau des jonctions. Pour le polyuréthane projeté : une seule passe à la machine couvre toute la surface sans ossature.",
  },
  {
    title: "Pose du pare-vapeur",
    detail:
      "Dérouler et fixer un film pare-vapeur (Sd ≥ 18 m) côté intérieur de l'ossature. Recouvrir les agrafes avec du ruban adhésif pour assurer l'étanchéité à l'air. Cette étape est critique : un pare-vapeur percé entraîne de la condensation dans l'isolant.",
  },
  {
    title: "Fixation des plaques de plâtre",
    detail:
      "Visser les plaques de plâtre BA13 (ou hydrofuge en salle de bain) sur les montants métalliques. Décaler les joints entre plaques de 40 cm minimum. Laisser 5 mm en bas et en haut pour les mouvements hygrothermiques.",
  },
  {
    title: "Finitions, rebouchage et électricité",
    detail:
      "Jointoyer les plaques, poncer et lisser. Reprendre les gaines électriques : les boîtiers de prises doivent être repositionnés en saillie ou encastrés dans le doublage. Peindre ou poser le revêtement final.",
  },
]

// Exemple de calcul de coût et d'économies
export const EXAMPLE_CALCULATION = {
  title: "Exemple : isolation des murs par l'intérieur d'une maison de 100 m² — ménage Jaune",
  lines: [
    { label: "Surface de murs à isoler (4 façades, fenêtres déduites)", amount: "120 m²" },
    { label: "Coût travaux — laine de roche + placo (100 €/m²)", amount: "12 000 €" },
    { label: "MaPrimeRénov' Jaune (60 €/m² × 120 m²)", amount: "– 7 200 €", isDeduction: true },
    { label: "Coup de pouce CEE (estimation zone H2)", amount: "– 900 €", isDeduction: true },
    { label: "TVA réduite à 5,5 % (économie vs TVA 10 %)", amount: "– 270 €", isDeduction: true },
  ],
  total: { label: "Reste à charge estimé", amount: "3 630 €" },
  savings: "≈ 550 €/an sur la facture de chauffage",
  roi: "Retour en 6–7 ans",
}

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le meilleur isolant thermique pour les murs par l'intérieur ?",
    answer:
      "La laine de roche en panneaux semi-rigides est l'option la plus polyvalente : incombustible, résistante à l'humidité et dotée d'excellentes performances acoustiques. Pour les espaces très contraints (couloirs, murs de faible épaisseur), le polyuréthane projeté offre le meilleur rapport résistance thermique / épaisseur (R=3,7 en seulement 90 mm). Si vous privilégiez un matériau biosourcé, l'ouate de cellulose soufflée est idéale pour le confort d'été en plus de l'isolation thermique hivernale.",
  },
  {
    question: "Quelle épaisseur d'isolant pour les murs par l'intérieur ?",
    answer:
      "Pour atteindre l'objectif BBC rénovation (R≥3,7 m²·K/W), comptez environ 120 à 130 mm de laine de roche ou laine de verre, 90 mm de polyuréthane projeté, ou 150 mm d'ouate de cellulose. En pratique, le doublage (ossature + isolant + plaque de plâtre) représente environ 130 à 160 mm d'épaisseur totale perdue sur chaque mur, soit 5 à 8 m² de surface habitable pour une maison de 100 m².",
  },
  {
    question: "Peut-on faire l'isolation des murs par l'intérieur soi-même ?",
    answer:
      "Techniquement oui pour un bricoleur expérimenté. Cependant, pour bénéficier de MaPrimeRénov' et du Coup de pouce CEE, les travaux doivent obligatoirement être réalisés par un artisan certifié RGE (Reconnu Garant de l'Environnement). L'auto-rénovation ne donne droit qu'à la TVA à 5,5 %, mais exclut les aides principales.",
  },
  {
    question: "Quelles aides pour l'isolation des murs par l'intérieur en 2026 ?",
    answer:
      "En 2026, vous pouvez cumuler MaPrimeRénov' isolation des murs (15 à 75 €/m² selon revenus), le Coup de pouce CEE, la TVA à 5,5 % et l'éco-PTZ jusqu'à 50 000 €. Pour un ménage aux revenus modestes (tranche Jaune ANAH), le reste à charge peut descendre sous 30 % du coût total des travaux.",
  },
  {
    question: "Combien coûte l'isolation des murs par l'intérieur pour une maison de 100 m² ?",
    answer:
      "Comptez entre 8 000 et 15 000 € TTC (avec TVA 5,5 %) pour une maison de 100 m² avec environ 120 m² de murs à isoler, selon le matériau choisi et la complexité du chantier. Après aides (MaPrimeRénov', CEE), le reste à charge descend généralement entre 2 500 et 6 000 € pour les ménages éligibles.",
  },
  {
    question: "L'isolation par l'intérieur crée-t-elle des problèmes d'humidité ?",
    answer:
      "Mal posée, oui. C'est le risque principal de l'ITI : si le pare-vapeur est percé ou mal jointoyé, la vapeur d'eau migre depuis l'intérieur et condense dans l'isolant, provoquant moisissures et dégradation. Un artisan RGE qualifié sait dimensionner et poser correctement le pare-vapeur. Il est aussi impératif de traiter d'abord toute humidité existante dans le mur (remontées capillaires, infiltrations).",
  },
]

// Sources citées
export const SOURCES = [
  {
    name: "ADEME — Isolation des murs par l'intérieur : performance réelle en logements existants",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' isolation des murs, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Ministère de la Transition écologique — RE2020 et exigences thermiques en rénovation",
    url: "https://www.ecologie.gouv.fr",
    date: "2025",
  },
  {
    name: "ANAH — Barèmes de ressources MaPrimeRénov' 2026",
    url: "https://www.anah.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "CSTB — Fiches DTE isolants thermiques pour parois opaques",
    url: "https://www.cstb.fr",
    date: "2025",
  },
]
