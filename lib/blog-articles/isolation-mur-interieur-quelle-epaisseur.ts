// =============================================================================
// Données article : Isolation mur intérieur — quelle épaisseur ?
// Sources : ademe.fr, ecologie.gouv.fr, anah.gouv.fr, france-renov.gouv.fr
//           rt-batiment.fr, cstb.fr, knauf.fr, isover.fr
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation mur intérieur : quelle épaisseur choisir en 2026 ?",
  subtitle:
    "Quelle épaisseur d'isolant pour l'isolation de vos murs par l'intérieur ? Guide complet : formule R = e/λ, épaisseurs par matériau (laine de verre, laine de roche, PSE, polyuréthane), seuils réglementaires et aides MaPrimeRénov' 2026.",
  slug: "isolation-mur-interieur-quelle-epaisseur",
  date: "12 juin 2026",
  dateISO: "2026-06-12",
  readingTime: 14,
  author: "Greenter",
}

// Tableau : épaisseurs recommandées par matériau pour atteindre différents niveaux de R
export const EPAISSEURS_TABLE = {
  columns: [
    { header: "Matériau isolant", key: "materiau" },
    { header: "λ (W/m·K)", key: "lambda", highlight: true },
    { header: "R = 2,5 (min. RGE)", key: "r25" },
    { header: "R = 3,7 (BBC rénov.)", key: "r37", highlight: true },
    { header: "R = 4,5 (haute perf.)", key: "r45" },
  ],
  rows: [
    {
      materiau: "Laine de verre",
      lambda: "0,032",
      r25: "80 mm",
      r37: "120 mm",
      r45: "144 mm",
    },
    {
      materiau: "Laine de roche (panneaux)",
      lambda: "0,034",
      r25: "85 mm",
      r37: "126 mm",
      r45: "153 mm",
    },
    {
      materiau: "Polystyrène expansé (PSE)",
      lambda: "0,033",
      r25: "83 mm",
      r37: "122 mm",
      r45: "149 mm",
    },
    {
      materiau: "Polyuréthane projeté",
      lambda: "0,024",
      r25: "60 mm",
      r37: "89 mm",
      r45: "108 mm",
    },
    {
      materiau: "Ouate de cellulose",
      lambda: "0,040",
      r25: "100 mm",
      r37: "148 mm",
      r45: "180 mm",
    },
    {
      materiau: "Fibre de bois (panneaux)",
      lambda: "0,038",
      r25: "95 mm",
      r37: "141 mm",
      r45: "171 mm",
    },
    {
      materiau: "Isolant mince (panneau réflecteur)",
      lambda: "≈ 0,050",
      r25: "⚠ Non atteignable",
      r37: "⚠ Non atteignable",
      r45: "⚠ Non atteignable",
    },
  ],
  caption:
    "Épaisseurs calculées selon la formule R = e ÷ λ. Sources : fiches DTE fabricants, CSTB, ADEME 2026. Les isolants minces (panneaux réflecteurs) ne permettent pas d'atteindre les seuils réglementaires en ITI.",
}

// Tableau des seuils de résistance thermique par paroi (DPE et aides)
export const SEUILS_TABLE = {
  columns: [
    { header: "Paroi", key: "paroi" },
    { header: "R minimum MaPrimeRénov'", key: "rmin", highlight: true },
    { header: "R cible BBC rénovation", key: "rbbc", highlight: true },
    { header: "Remarque", key: "remarque" },
  ],
  rows: [
    {
      paroi: "Murs extérieurs (ITI)",
      rmin: "R ≥ 2,5 m²·K/W",
      rbbc: "R ≥ 3,7 m²·K/W",
      remarque: "Seuil éligibilité MaPrimeRénov' : R ≥ 2,5. Objectif BBC rénov. : R ≥ 3,7",
    },
    {
      paroi: "Combles perdus",
      rmin: "R ≥ 7,0 m²·K/W",
      rbbc: "R ≥ 10,0 m²·K/W",
      remarque: "Priorité n°1 : 30 % des déperditions. Moins coûteux que les murs",
    },
    {
      paroi: "Planchers bas (sur vide sanitaire)",
      rmin: "R ≥ 3,0 m²·K/W",
      rbbc: "R ≥ 4,0 m²·K/W",
      remarque: "Souvent négligé ; représente 7 à 10 % des déperditions",
    },
    {
      paroi: "Toiture-terrasse",
      rmin: "R ≥ 4,5 m²·K/W",
      rbbc: "R ≥ 6,0 m²·K/W",
      remarque: "Intervention par l'extérieur ou l'intérieur selon la configuration",
    },
  ],
  caption:
    "Sources : Arrêté du 3 mai 2007 modifié, RE2020, barèmes MaPrimeRénov' 2026 (france-renov.gouv.fr). Les seuils R ≥ 2,5 pour les murs sont en vigueur depuis la réforme MaPrimeRénov' 2024.",
}

// Tableau des aides 2026
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
      conditions: "Logement > 15 ans, artisan RGE, R ≥ 2,5 atteint. Plafond 150 m². Max 11 250 € (Bleu).",
    },
    {
      aide: "Coup de pouce CEE isolation des murs",
      montant: "Variable selon zone climatique et surface (en moyenne 5 à 15 €/m²)",
      conditions: "Pas de condition de revenus. Cumulable avec MaPrimeRénov'. Artisan RGE obligatoire.",
    },
    {
      aide: "Éco-prêt à taux zéro (éco-PTZ)",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions: "Logement construit avant 1990. Artisan RGE. Durée jusqu'à 20 ans. Cumulable avec MPR.",
    },
    {
      aide: "TVA à taux réduit (5,5 %)",
      montant: "Sur fournitures et main-d'œuvre",
      conditions: "Logement achevé depuis plus de 2 ans. Aucune condition de revenus. Artisan RGE non obligatoire.",
    },
  ],
  caption:
    "Sources : france-renov.gouv.fr, anah.gouv.fr. Barèmes en vigueur au 1er janvier 2026.",
}

// Exemple de calcul
export const EXAMPLE_CALCULATION = {
  title: "Exemple : isolation des murs par l'intérieur d'une maison de 100 m² — ménage modeste (Jaune)",
  lines: [
    { label: "Surface de murs à isoler (4 façades, fenêtres déduites)", amount: "120 m²" },
    { label: "Épaisseur retenue : 120 mm de laine de verre → R = 3,75", amount: "" },
    { label: "Coût travaux — laine de verre + ossature + placo (90 €/m²)", amount: "10 800 €" },
    { label: "MaPrimeRénov' Jaune (60 €/m² × 120 m²)", amount: "− 7 200 €", isDeduction: true },
    { label: "Coup de pouce CEE (estimation zone H2)", amount: "− 900 €", isDeduction: true },
    { label: "TVA réduite à 5,5 % (économie vs TVA 10 %)", amount: "− 243 €", isDeduction: true },
  ],
  total: { label: "Reste à charge estimé", amount: "2 457 €" },
  savings: "≈ 520 €/an sur la facture de chauffage",
  roi: "Retour en 5 ans",
}

// FAQ rich snippets
export const FAQ_ITEMS = [
  {
    question: "Quelle épaisseur d'isolant pour l'isolation d'un mur intérieur ?",
    answer:
      "Pour atteindre le seuil BBC rénovation (R ≥ 3,7 m²·K/W), il faut environ 120 mm de laine de verre (λ = 0,032), 126 mm de laine de roche, 122 mm de PSE ou seulement 89 mm de polyuréthane projeté. Pour le minimum exigé par MaPrimeRénov' (R ≥ 2,5), comptez respectivement 80, 85, 83 et 60 mm.",
  },
  {
    question: "Comment calculer l'épaisseur d'isolant dont j'ai besoin ?",
    answer:
      "La formule est simple : épaisseur (en mètres) = R cible × λ du matériau. Exemple : vous visez R = 3,7 avec de la laine de verre (λ = 0,032). Calcul : 3,7 × 0,032 = 0,118 m soit 118 mm, arrondi à 120 mm en épaisseur commerciale.",
  },
  {
    question: "Quelle est la résistance thermique minimale pour les murs par l'intérieur ?",
    answer:
      "Le seuil minimal pour déclencher MaPrimeRénov' est R ≥ 2,5 m²·K/W. L'objectif BBC rénovation, recommandé pour maximiser les économies d'énergie, est R ≥ 3,7 m²·K/W. Pour une performance haute, viser R ≥ 4,5 m²·K/W.",
  },
  {
    question: "Les isolants minces sont-ils efficaces pour les murs intérieurs ?",
    answer:
      "Non. Les isolants minces (panneaux réflecteurs multicouches) ne permettent pas d'atteindre les résistances thermiques exigées (R ≥ 2,5 à 3,7) pour les murs. Leur usage en ITI ne donne droit à aucune aide publique. Ils peuvent compléter un isolant conventionnel mais ne peuvent pas le remplacer.",
  },
  {
    question: "Quel est le meilleur isolant pour les murs intérieurs quand l'espace est limité ?",
    answer:
      "Le polyuréthane projeté est le plus performant à faible épaisseur : il atteint R = 3,7 en seulement 89 mm contre 120 mm pour la laine de verre. En deuxième position, les panneaux PIR (polyisocyanurate) atteignent R = 3,7 en 95 mm environ.",
  },
  {
    question: "L'épaisseur d'isolant influe-t-elle sur la perte de surface habitable ?",
    answer:
      "Oui, c'est le principal inconvénient de l'ITI. Un doublage complet (ossature + 120 mm d'isolant + plaque de plâtre 13 mm) représente environ 145 à 155 mm d'épaisseur totale. Pour une maison de 100 m² avec quatre façades, c'est 5 à 7 m² de surface habitable perdue.",
  },
  {
    question: "Quelle épaisseur d'isolant pour être éligible à MaPrimeRénov' ?",
    answer:
      "Pour l'isolation des murs par l'intérieur, MaPrimeRénov' 2026 exige d'atteindre R ≥ 2,5 m²·K/W. Cela correspond à environ 80 mm de laine de verre (λ 0,032), 83 mm de PSE ou 60 mm de polyuréthane projeté. Les travaux doivent être réalisés par un artisan certifié RGE.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Guide de l'isolation thermique des murs par l'intérieur",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' isolation des murs, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Ministère de la Transition écologique — Arrêté du 3 mai 2007 modifié (résistances thermiques minimales)",
    url: "https://www.ecologie.gouv.fr",
    date: "2024",
  },
  {
    name: "CSTB — Fiches DTE isolants thermiques pour parois opaques (murs)",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "ANAH — Barèmes de ressources MaPrimeRénov' 2026",
    url: "https://www.anah.gouv.fr",
    date: "janvier 2026",
  },
]
