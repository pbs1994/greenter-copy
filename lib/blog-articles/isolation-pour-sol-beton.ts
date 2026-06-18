// =============================================================================
// Données article : Isolation pour sol béton — dalle, chape flottante et matériaux
// Sources : ademe.fr, ecologie.gouv.fr, anah.gouv.fr, france-renov.gouv.fr
//           rt-batiment.fr, cstb.fr, isover.fr, knauf.fr, soprema.fr
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation pour sol béton : guide complet 2026",
  subtitle:
    "Comment isoler une dalle en béton en 2026 ? Isolation sous dalle, chape flottante, polystyrène expansé ou extrudé, plancher chauffant : comparatif complet des matériaux, prix au m² et aides MaPrimeRénov'.",
  slug: "isolation-pour-sol-beton",
  date: "18 juin 2026",
  dateISO: "2026-06-18",
  readingTime: 15,
  author: "Greenter",
}

// Tableau comparatif des isolants pour sol béton
export const MATERIAUX_TABLE = {
  columns: [
    { header: "Matériau isolant", key: "materiau" },
    { header: "λ (W/m·K)", key: "lambda", highlight: true },
    { header: "Résistance compression", key: "compression" },
    { header: "Épaisseur pour R = 3,0", key: "r30", highlight: true },
    { header: "Résistance humidité", key: "humidite" },
    { header: "Prix fourniture", key: "prix" },
  ],
  rows: [
    {
      materiau: "Polystyrène expansé PSE blanc",
      lambda: "0,038",
      compression: "70–150 kPa",
      r30: "115 mm",
      humidite: "Moyenne",
      prix: "5–12 €/m²",
    },
    {
      materiau: "Polystyrène expansé PSE graphité",
      lambda: "0,031",
      compression: "100–200 kPa",
      r30: "93 mm",
      humidite: "Moyenne",
      prix: "8–18 €/m²",
    },
    {
      materiau: "Polystyrène extrudé (XPS)",
      lambda: "0,033",
      compression: "200–700 kPa",
      r30: "100 mm",
      humidite: "Excellente",
      prix: "12–25 €/m²",
    },
    {
      materiau: "Laine de roche (panneau dalle)",
      lambda: "0,037",
      compression: "40–60 kPa",
      r30: "111 mm",
      humidite: "Bonne",
      prix: "10–20 €/m²",
    },
    {
      materiau: "Verre cellulaire",
      lambda: "0,040",
      compression: "> 1 000 kPa",
      r30: "120 mm",
      humidite: "Excellente",
      prix: "35–60 €/m²",
    },
    {
      materiau: "Liège expansé",
      lambda: "0,040",
      compression: "100–200 kPa",
      r30: "120 mm",
      humidite: "Bonne",
      prix: "20–40 €/m²",
    },
  ],
  caption:
    "Épaisseurs calculées selon la formule R = e ÷ λ. Sources : fiches DTE fabricants, CSTB 2026. PSE graphité = PSE gris (EPS graphité). Le XPS est recommandé pour les dalles en contact avec le sol humide ou en vide sanitaire.",
}

// Tableau des prix de l'isolation d'une dalle en béton
export const PRIX_TABLE = {
  columns: [
    { header: "Solution technique", key: "solution" },
    { header: "Isolant", key: "isolant" },
    { header: "Prix fourniture", key: "fourniture" },
    { header: "Prix pose", key: "pose", highlight: true },
    { header: "Prix total TTC", key: "total", highlight: true },
  ],
  rows: [
    {
      solution: "Isolation sous dalle (neuf)",
      isolant: "PSE 100 mm",
      fourniture: "8–15 €/m²",
      pose: "10–20 €/m²",
      total: "20–35 €/m²",
    },
    {
      solution: "Chape flottante sur PSE + chape liquide",
      isolant: "PSE graphité 80 mm + chape 50 mm",
      fourniture: "20–30 €/m²",
      pose: "35–55 €/m²",
      total: "55–85 €/m²",
    },
    {
      solution: "Chape flottante sur XPS + chape béton",
      isolant: "XPS 100 mm + chape 60 mm",
      fourniture: "25–40 €/m²",
      pose: "40–60 €/m²",
      total: "65–100 €/m²",
    },
    {
      solution: "Isolation en sous-face (vide sanitaire)",
      isolant: "XPS ou laine de roche 100 mm",
      fourniture: "12–25 €/m²",
      pose: "30–50 €/m²",
      total: "45–75 €/m²",
    },
    {
      solution: "Plancher sur lambourdes + isolant",
      isolant: "PSE 80 mm entre lambourdes",
      fourniture: "15–25 €/m²",
      pose: "40–65 €/m²",
      total: "55–90 €/m²",
    },
  ],
  caption:
    "Prix indicatifs TTC posé par artisan RGE en Île-de-France, juin 2026. Sources : devis artisans, observatoire ADEME, fédération des artisans du bâtiment (CAPEB). Hors revêtement de sol final.",
}

// Tableau aides financières isolation plancher bas 2026
export const AIDES_TABLE = {
  columns: [
    { header: "Dispositif", key: "aide" },
    { header: "Montant 2026", key: "montant", highlight: true },
    { header: "Conditions principales", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' — isolation plancher bas (vide sanitaire/cave)",
      montant: "25 €/m² (Bleu) · 20 €/m² (Jaune) · 15 €/m² (Violet) · 12 €/m² (Rose)",
      conditions:
        "Dalle sur vide sanitaire ou cave non chauffée uniquement. R ≥ 3,0 m²·K/W. Artisan RGE obligatoire. Logement > 15 ans.",
    },
    {
      aide: "Coup de pouce CEE isolation plancher bas",
      montant: "Variable selon zone (5 à 12 €/m² en moyenne)",
      conditions:
        "Pas de condition de revenus. Cumulable avec MaPrimeRénov'. Artisan signataire d'une charte CEE.",
    },
    {
      aide: "TVA à 5,5 %",
      montant: "Sur fournitures et main-d'œuvre (économie de 14,5 % vs taux normal)",
      conditions:
        "Logement achevé depuis plus de 2 ans. Aucune condition de revenus. Artisan RGE non obligatoire.",
    },
    {
      aide: "Éco-prêt à taux zéro (éco-PTZ)",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions:
        "Logement construit avant 1990. Artisan RGE. Durée jusqu'à 20 ans. Cumulable avec MPR.",
    },
  ],
  caption:
    "Sources : france-renov.gouv.fr, anah.gouv.fr. Barèmes en vigueur au 1er janvier 2026. La dalle sur terre-plein n'est pas éligible à MaPrimeRénov' mais bénéficie de la TVA à 5,5 %.",
}

// Étapes d'une chape flottante isolante
export const ETAPES_CHAPE = [
  {
    title: "Préparation de la dalle support",
    description:
      "Nettoyage complet de la dalle en béton existante. Vérification de la planéité : tolérance de 5 mm sous une règle de 2 m. Ragréage des irrégularités si nécessaire. Traitement des remontées d'humidité si présentes.",
  },
  {
    title: "Pose du film pare-vapeur (si dalle sur terre-plein)",
    description:
      "Dérouler un film polyane 200 µm sur toute la surface, avec recouvrements de 20 cm aux raccords et relevés de 15 cm sur les murs. Ce pare-vapeur protège l'isolant de l'humidité remontant du sol.",
  },
  {
    title: "Pose des panneaux isolants",
    description:
      "Disposer les panneaux de polystyrène expansé (PSE) ou extrudé (XPS) en quinconce — joints croisés pour éviter les ponts thermiques. Épaisseur selon objectif R : 80 mm minimum (R ≥ 2,5) à 120 mm pour R ≥ 3,7.",
  },
  {
    title: "Pose des bandes de désolidarisation",
    description:
      "Fixer une bande résiliente (mousse polyéthylène de 10–15 mm) tout autour de la pièce, en pied de mur. Cette bande assure la rupture acoustique et thermique entre la chape et les parois — indispensable pour une vraie chape flottante.",
  },
  {
    title: "Coulage de la chape",
    description:
      "Couler la chape liquide (anhydrite, épaisseur ≥ 40 mm) ou la chape béton (épaisseur ≥ 50 mm) sur les panneaux. Pour un plancher chauffant, les tuyaux sont d'abord fixés sur les panneaux isolants avant le coulage.",
  },
  {
    title: "Séchage et pose du revêtement de sol",
    description:
      "Respecter le délai de séchage : environ 1 semaine par cm d'épaisseur pour la chape liquide (minimum 3 semaines). Taux d'humidité < 0,5 % avant pose de parquet ou carrelage. La chape est ensuite prête à recevoir tous les revêtements de sol.",
  },
]

// Exemple de calcul économique
export const EXAMPLE_CALCULATION = {
  title: "Exemple : isolation sous-dalle vide sanitaire d'une maison de 100 m² — ménage modeste (Jaune)",
  lines: [
    {
      label: "Surface de dalle à isoler",
      amount: "90 m²",
    },
    {
      label: "Solution : isolation en sous-face XPS 100 mm (R = 3,0) + fixation mécanique",
      amount: "",
    },
    {
      label: "Coût travaux — XPS 100 mm + pose en sous-face (65 €/m²)",
      amount: "5 850 €",
    },
    {
      label: "MaPrimeRénov' Jaune (20 €/m² × 90 m²)",
      amount: "− 1 800 €",
      isDeduction: true,
    },
    {
      label: "Coup de pouce CEE (8 €/m² × 90 m²)",
      amount: "− 720 €",
      isDeduction: true,
    },
    {
      label: "TVA réduite à 5,5 % (économie vs TVA 10 %)",
      amount: "− 175 €",
      isDeduction: true,
    },
  ],
  total: { label: "Reste à charge estimé", amount: "3 155 €" },
  savings: "≈ 280 €/an sur la facture de chauffage",
  roi: "Retour en 11 ans",
}

// FAQ pour rich snippets
export const FAQ_ITEMS = [
  {
    question: "Comment isoler une dalle en béton existante ?",
    answer:
      "Pour isoler une dalle en béton existante, deux techniques sont possibles : la chape flottante isolante (poser des panneaux PSE ou XPS sur la dalle, puis couler une chape dessus) ou l'isolation en sous-face si un vide sanitaire accessible existe. La chape flottante est la solution la plus répandue en rénovation : on pose 80 à 120 mm de PSE graphité ou de XPS sur la dalle, puis on coule une chape liquide (anhydrite) de 40 à 50 mm. Le revêtement de sol final est ensuite posé sur la chape.",
  },
  {
    question: "Quel isolant choisir pour une isolation sous dalle béton ?",
    answer:
      "Le polystyrène expansé (PSE graphité) est l'isolant le plus utilisé sous dalle béton : il offre une bonne résistance à la compression (100–200 kPa), une conductivité thermique de λ = 0,031 W/m·K et un bon rapport qualité/prix (8 à 18 €/m²). Pour les dalles en contact avec le sol humide ou sur vide sanitaire humide, le polystyrène extrudé (XPS) est préféré grâce à son imperméabilité quasi-totale et sa résistance à la compression pouvant dépasser 700 kPa.",
  },
  {
    question: "Quelle épaisseur d'isolant pour une dalle béton ?",
    answer:
      "Pour atteindre le seuil MaPrimeRénov' d'un plancher bas (R ≥ 3,0 m²·K/W), il faut environ 95 mm de PSE graphité (λ = 0,031), 100 mm de XPS (λ = 0,033) ou 115 mm de PSE blanc classique (λ = 0,038). En construction neuve, la RE2020 impose R ≥ 3,0 m²·K/W pour les planchers bas en contact avec le sol. Pour un plancher chauffant hydraulique, la norme DTU 65.14 exige au minimum R ≥ 0,75 m²·K/W sous la chape.",
  },
  {
    question: "Quelle est la différence entre polystyrène expansé et polystyrène extrudé pour un sol béton ?",
    answer:
      "Le polystyrène expansé (PSE) est un isolant léger fabriqué à partir de billes expansées agglomérées. Il est moins cher mais présente une résistance à l'humidité modérée. Le polystyrène extrudé (XPS) est fabriqué par extrusion, ce qui lui confère une structure à cellules fermées : il est pratiquement imperméable à l'eau, plus résistant à la compression (200–700 kPa vs 70–200 kPa pour le PSE) et légèrement plus isolant. Le XPS est recommandé dans les zones humides, pour les dalles sur terre-plein et les vides sanitaires humides.",
  },
  {
    question: "Comment isoler une dalle béton sur vide sanitaire ?",
    answer:
      "Une dalle en béton sur vide sanitaire peut être isolée de deux façons : par le haut (chape flottante isolante — la solution la plus courante), ou par le bas (isolation en sous-face de dalle). L'isolation en sous-face consiste à fixer des panneaux isolants (XPS ou laine de roche 100 mm) directement sous la dalle, côté vide sanitaire. Cette solution préserve la hauteur sous plafond côté intérieur, mais nécessite un vide sanitaire accessible. MaPrimeRénov' accepte les deux méthodes sous condition d'atteindre R ≥ 3,0 m²·K/W.",
  },
  {
    question: "Quel est le prix de l'isolation d'une dalle béton au m² ?",
    answer:
      "Le prix de l'isolation d'une dalle béton varie selon la méthode : isolation sous-dalle neuve avec PSE 100 mm = 20 à 35 €/m² ; chape flottante isolante (PSE graphité 80 mm + chape liquide 50 mm) = 55 à 85 €/m² posé ; isolation en sous-face sur vide sanitaire (XPS 100 mm) = 45 à 75 €/m² posé. Ces tarifs incluent la fourniture et la pose par un professionnel, hors revêtement de sol final.",
  },
  {
    question: "L'isolation d'une dalle béton sur terre-plein est-elle éligible à MaPrimeRénov' ?",
    answer:
      "Non, une dalle sur terre-plein n'est pas éligible à MaPrimeRénov'. Seules les dalles en contact avec un sous-sol non chauffé (vide sanitaire, cave, garage non chauffé) sont éligibles à MaPrimeRénov' isolation plancher bas, avec un seuil de R ≥ 3,0 m²·K/W. En revanche, l'isolation d'une dalle sur terre-plein bénéficie de la TVA à 5,5 % si le logement a plus de 2 ans et que les travaux sont réalisés par un professionnel.",
  },
  {
    question: "Pourquoi isoler une dalle béton avant de poser un plancher chauffant ?",
    answer:
      "Isoler la dalle avant de poser un plancher chauffant hydraulique est indispensable pour deux raisons : d'abord, diriger la chaleur vers le haut (vers l'intérieur du logement) et non vers le bas (vers le sol froid, où la chaleur serait perdue) ; ensuite, améliorer le rendement du système de 20 à 30 %. Sans isolant adapté, le plancher chauffant chauffe le sol au lieu de chauffer la pièce. La norme DTU 65.14 impose R ≥ 0,75 m²·K/W sous la chape en zone H1 (Île-de-France), et jusqu'à R ≥ 1,2 m²·K/W sur vide sanitaire.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Guide isolation du plancher bas : méthodes et performances",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' isolation plancher bas, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "CSTB — DTU 65.14 : travaux de mise en œuvre des planchers chauffants",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "Ministère de la Transition écologique — RE2020 : performance thermique des planchers bas",
    url: "https://www.ecologie.gouv.fr",
    date: "2024",
  },
  {
    name: "ANAH — Barèmes de ressources MaPrimeRénov' 2026 (plancher bas)",
    url: "https://www.anah.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Isover Saint-Gobain — Guide technique isolation plancher",
    url: "https://www.isover.fr",
    date: "2025",
  },
]
