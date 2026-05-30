// =============================================================================
// Données article : Prix isolation combles au m² — tarifs et aides 2026
// Sources : ADEME, france-renov.gouv.fr, CAPEB, ANAH
// Date de recherche : mai 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Prix isolation combles au m² en 2026 : tarifs, matériaux et aides",
  subtitle:
    "Quel prix pour l'isolation des combles au m² en 2026 ? Tarifs par isolant, combles perdus vs aménageables, aides MaPrimeRénov' et reste à charge réel.",
  slug: "prix-isolation-combles-au-m2",
  date: "30 mai 2026",
  dateISO: "2026-05-30",
  readingTime: 13,
  author: "Greenter",
}

// Tableau des prix par type de combles et méthode
export const PRIX_TABLE = {
  columns: [
    { header: "Type de combles", key: "type" },
    { header: "Méthode d'isolation", key: "methode" },
    { header: "Prix au m² TTC (pose comprise)", key: "prix_m2", highlight: true },
    { header: "Pour 100 m² (avant aides)", key: "pour_100m2", highlight: true },
  ],
  rows: [
    {
      type: "Combles perdus",
      methode: "Soufflage laine de verre / roche",
      prix_m2: "20–35 €/m²",
      pour_100m2: "2 000–3 500 €",
    },
    {
      type: "Combles perdus",
      methode: "Soufflage ouate de cellulose",
      prix_m2: "25–40 €/m²",
      pour_100m2: "2 500–4 000 €",
    },
    {
      type: "Combles perdus",
      methode: "Pose en rouleaux (laine de verre)",
      prix_m2: "15–25 €/m²",
      pour_100m2: "1 500–2 500 €",
    },
    {
      type: "Combles aménageables",
      methode: "Isolation sous-rampants (laine minérale)",
      prix_m2: "35–55 €/m²",
      pour_100m2: "3 500–5 500 €",
    },
    {
      type: "Combles aménageables — Sarking",
      methode: "Isolation par l'extérieur (toiture)",
      prix_m2: "80–150 €/m²",
      pour_100m2: "8 000–15 000 €",
    },
    {
      type: "Combles aménagés (reprise)",
      methode: "Sous-rampants + finitions placo",
      prix_m2: "50–85 €/m²",
      pour_100m2: "5 000–8 500 €",
    },
  ],
  caption:
    "Prix TTC toutes fournitures et main-d'œuvre incluses, hors aides financières. Zone Île-de-France. R ≥ 7 m².K/W exigé pour MaPrimeRénov'. Sources : ADEME, CAPEB, professionnels RGE, mai 2026.",
}

// Tableau comparatif des isolants
export const ISOLANT_TABLE = {
  columns: [
    { header: "Isolant", key: "isolant" },
    { header: "λ (W/m.K)", key: "lambda" },
    { header: "Épaisseur pour R = 7", key: "epaisseur", highlight: true },
    { header: "Prix posé (€/m²)", key: "prix_pose", highlight: true },
    { header: "Atouts principaux", key: "atouts" },
  ],
  rows: [
    {
      isolant: "Laine de verre soufflée",
      lambda: "0,035–0,040",
      epaisseur: "25–30 cm",
      prix_pose: "20–35 €/m²",
      atouts: "Économique, rapide, légère",
    },
    {
      isolant: "Laine de roche soufflée",
      lambda: "0,035–0,040",
      epaisseur: "25–30 cm",
      prix_pose: "25–40 €/m²",
      atouts: "Résistance au feu (A1), acoustique",
    },
    {
      isolant: "Ouate de cellulose",
      lambda: "0,038–0,042",
      epaisseur: "28–35 cm",
      prix_pose: "25–40 €/m²",
      atouts: "Éco-responsable, déphasage estival",
    },
    {
      isolant: "Laine de verre en rouleaux",
      lambda: "0,032–0,035",
      epaisseur: "22–28 cm",
      prix_pose: "15–25 €/m²",
      atouts: "Prix bas, DIY possible",
    },
    {
      isolant: "Laine de roche en panneaux",
      lambda: "0,034–0,040",
      epaisseur: "22–28 cm",
      prix_pose: "35–55 €/m²",
      atouts: "Résistance humidité, sous-rampants",
    },
    {
      isolant: "Polyuréthane projeté",
      lambda: "0,022–0,028",
      epaisseur: "14–18 cm",
      prix_pose: "50–80 €/m²",
      atouts: "Faible épaisseur, zones complexes",
    },
  ],
  caption:
    "Épaisseurs pour R ≥ 7 m².K/W (exigence MaPrimeRénov' 2026). Prix TTC pour artisan RGE, Île-de-France, hors aides. Sources : ADEME, fabricants, CAPEB.",
}

// Tableau des aides financières
export const AIDES_TABLE = {
  columns: [
    { header: "Aide", key: "aide" },
    { header: "Bénéficiaires", key: "beneficiaires" },
    { header: "Montant isolation combles", key: "montant", highlight: true },
    { header: "Conditions principales", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' Bleu",
      beneficiaires: "Ménages très modestes",
      montant: "Jusqu'à 25 €/m²",
      conditions: "Artisan RGE, R ≥ 7, dossier avant travaux",
    },
    {
      aide: "MaPrimeRénov' Jaune",
      beneficiaires: "Ménages modestes",
      montant: "Jusqu'à 20 €/m²",
      conditions: "Artisan RGE, R ≥ 7, dossier avant travaux",
    },
    {
      aide: "MaPrimeRénov' Violet",
      beneficiaires: "Revenus intermédiaires",
      montant: "Jusqu'à 15 €/m²",
      conditions: "Artisan RGE, R ≥ 7, dossier avant travaux",
    },
    {
      aide: "Prime CEE (Coup de Pouce)",
      beneficiaires: "Tous ménages",
      montant: "7–10,54 €/m²",
      conditions: "Cumulable avec MaPrimeRénov', artisan partenaire",
    },
    {
      aide: "Éco-PTZ",
      beneficiaires: "Tous propriétaires",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions: "Finance le reste à charge, sans conditions de revenus",
    },
    {
      aide: "TVA à 5,5 %",
      beneficiaires: "Logement > 2 ans",
      montant: "Taux réduit (au lieu de 20 %)",
      conditions: "Automatique avec artisan RGE — sur toute la facture",
    },
  ],
  caption:
    "Aides cumulables sous conditions. Barèmes MaPrimeRénov' 2026, plafond de 100 m² par logement pour l'isolation des combles. Sources : france-renov.gouv.fr, ANAH.",
}

// Exemple de calcul — ménage Jaune, 100 m² combles perdus
export const EXAMPLE_CALCULATION = {
  title:
    "Exemple chiffré : isolation 100 m² de combles perdus par soufflage — ménage Jaune (2 pers., RFR < 37 411 €)",
  lines: [
    { label: "Surface des combles isolée", amount: "100 m²" },
    {
      label: "Prix travaux soufflage laine de verre (28 €/m²)",
      amount: "2 800 €",
    },
    {
      label: "MaPrimeRénov' Jaune (20 €/m² × 100 m²)",
      amount: "− 2 000 €",
    },
    {
      label: "Prime CEE Coup de Pouce (7,50 €/m² × 100 m²)",
      amount: "− 750 €",
    },
    { label: "TVA à 5,5 % (déjà incluse dans le prix)", amount: "incluse" },
  ],
  total: { label: "Reste à charge final", amount: "≈ 50 €" },
  savings: "30 % d'économies sur la facture de chauffage dès la 1ʳᵉ année",
  roi: "Retour sur investissement : moins de 1 an pour un ménage Jaune",
}

// Étapes pour bien choisir son isolation de combles
export const TIPS_STEPS = [
  {
    title: "Distinguer combles perdus et combles aménageables",
    detail:
      "Les combles perdus sont non habitables, accessibles par une simple trappe. Les combles aménageables ont une hauteur ≥ 1,80 m sous faîtage et peuvent être convertis en espace habitable. Cette distinction est fondamentale : elle détermine la méthode d'isolation, le prix au m² applicable et les aides auxquelles vous avez droit.",
  },
  {
    title: "Évaluer l'accessibilité avant de demander les devis",
    detail:
      "Une trappe d'accès standard (60 × 80 cm minimum) permet d'introduire la lance de soufflage sans travaux supplémentaires. Des combles avec accès restreint, obstacles nombreux (tuyauteries, réservoirs) ou plancher en mauvais état peuvent augmenter le prix de 20 à 40 %. Mentionnez ces contraintes dès le premier contact avec l'artisan.",
  },
  {
    title: "Choisir l'isolant selon vos priorités",
    detail:
      "Pour des combles perdus avec budget serré : la laine de verre soufflée est la référence (20–35 €/m²). Pour un profil éco-responsable ou un confort d'été optimal : la ouate de cellulose offre un excellent déphasage thermique (25–40 €/m²). Pour des combles aménageables avec contrainte d'épaisseur : les panneaux de laine de roche ou le polyuréthane projeté (50–80 €/m²).",
  },
  {
    title: "Comparer au moins 3 devis d'artisans RGE",
    detail:
      "L'obtention de MaPrimeRénov' est conditionnée à l'intervention d'un artisan certifié RGE. Sur 3 devis, les écarts de prix peuvent atteindre 30 à 50 % pour le même chantier. Vérifiez que chaque devis mentionne explicitement l'épaisseur d'isolant et la résistance thermique R atteinte (minimum R = 7 m².K/W exigé pour les aides).",
  },
  {
    title: "Déposer le dossier d'aides AVANT de signer",
    detail:
      "MaPrimeRénov' et les primes CEE doivent être demandées avant le début des travaux. Un artisan RGE sérieux prend en charge toute la procédure : constitution du dossier, dépôt en ligne, suivi de l'instruction et déduction directe de la prime sur votre facture — sans avance de trésorerie de votre côté.",
  },
  {
    title: "Vérifier la performance thermique après travaux",
    detail:
      "À la fin du chantier, l'artisan RGE doit vous remettre une attestation de fin de travaux mentionnant l'épaisseur posée et la résistance thermique R atteinte. Ce document est indispensable pour le versement de MaPrimeRénov'. Sans lui, le dossier est rejeté — conservez-le avec votre facture.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le prix au m² pour l'isolation des combles perdus ?",
    answer:
      "Le prix de l'isolation des combles perdus au m² varie entre 15 et 40 €/m² pose comprise selon la méthode : 15–25 €/m² pour des rouleaux de laine de verre posés manuellement, 20–35 €/m² pour le soufflage de laine minérale (méthode la plus rapide), et 25–40 €/m² pour la ouate de cellulose soufflée. Pour 100 m², comptez entre 2 000 et 4 000 € TTC avant aides financières.",
  },
  {
    question: "Combien coûte l'isolation des combles aménageables au m² ?",
    answer:
      "L'isolation des combles aménageables est plus chère que les combles perdus : 35–55 €/m² pour l'isolation sous-rampants avec laine minérale et pare-vapeur, 50–85 €/m² pour une reprise avec finitions placo, et 80–150 €/m² pour la technique du Sarking (panneaux rigides sur les chevrons côté toiture). La complexité de mise en œuvre et les finitions expliquent ces prix.",
  },
  {
    question: "Quel isolant choisir pour les combles perdus ?",
    answer:
      "Pour des combles perdus, le soufflage de laine de verre ou de ouate de cellulose est la méthode la plus efficace. La ouate de cellulose est préférable pour un meilleur confort d'été (déphasage thermique supérieur à 10 h) et un bilan carbone vertueux. La laine de roche soufflée est recommandée si la résistance au feu est une priorité (classe A1). Les deux sont éligibles à MaPrimeRénov' 2026.",
  },
  {
    question: "Peut-on encore avoir l'isolation des combles gratuite en 2026 ?",
    answer:
      "Oui, pour les ménages très modestes (catégorie Bleu MaPrimeRénov'). Le cumul MaPrimeRénov' Bleu (25 €/m²) + Prime CEE Coup de Pouce (jusqu'à 10,54 €/m²) peut couvrir la totalité des travaux pour des combles perdus simples (20–30 €/m²). Pour les ménages modestes (Jaune), le reste à charge est souvent inférieur à 200 € pour 100 m².",
  },
  {
    question: "Combien de temps durent les travaux d'isolation des combles ?",
    answer:
      "Pour des combles perdus par soufflage, les travaux durent 2 à 4 heures pour 80 à 100 m². Pour des combles aménageables avec sous-rampants et finitions, comptez 3 à 5 jours. Le délai total entre demande de devis et fin des travaux est de 4 à 8 semaines en Île-de-France (instruction MaPrimeRénov' incluse).",
  },
  {
    question: "Quelle épaisseur d'isolant pour les combles en 2026 ?",
    answer:
      "Pour être éligible à MaPrimeRénov' 2026, l'isolation des combles doit atteindre R ≥ 7 m².K/W. Selon l'isolant : laine de verre soufflée (λ 0,040) → 28 cm ; ouate de cellulose (λ 0,040) → 28–35 cm ; polyuréthane projeté (λ 0,025) → 18 cm. Cette résistance thermique doit figurer explicitement sur la facture de l'artisan RGE.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Coûts des travaux d'isolation thermique en France, référentiel 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' : barèmes isolation des combles 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "CAPEB — Observatoire des prix de la rénovation énergétique, 2026",
    url: "https://www.capeb.fr",
    date: "2026",
  },
  {
    name: "ANAH — Résultats MaPrimeRénov' isolation des combles, données 2024–2025",
    url: "https://www.anah.gouv.fr",
    date: "2025",
  },
]
