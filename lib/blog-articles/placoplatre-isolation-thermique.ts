// =============================================================================
// Données article : Placoplâtre isolation thermique — le guide complet du placo isolant
// Sources : ademe.fr, placo.fr (Saint-Gobain), isover.fr, knauf.fr, cstb.fr,
//           france-renov.gouv.fr, promotelec.com
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Placoplâtre isolation thermique : le guide complet du placo isolant en 2026",
  subtitle:
    "Le placo isolant associe une plaque de plâtre à un isolant (laine de verre, laine de roche ou polystyrène expansé) pour isoler thermiquement et phoniquement vos murs et plafonds. Types, épaisseurs, résistance thermique, pose et prix : le guide complet 2026.",
  slug: "placoplatre-isolation-thermique",
  date: "23 juillet 2026",
  dateISO: "2026-07-23",
  readingTime: 15,
  author: "Greenter",
}

// Tableau comparatif des types de placo isolant selon le matériau isolant intégré
export const TYPES_PLACO_TABLE = {
  columns: [
    { header: "Type de placo isolant", key: "type" },
    { header: "Isolant intégré", key: "isolant", highlight: true },
    { header: "λ (W/m·K)", key: "lambda" },
    { header: "Isolation phonique", key: "phonique" },
    { header: "Hydrofuge dispo.", key: "hydrofuge" },
  ],
  rows: [
    {
      type: "Placo + polystyrène expansé (PSE)",
      isolant: "Polystyrène expansé",
      lambda: "0,032 – 0,038",
      phonique: "Moyenne",
      hydrofuge: "Oui",
    },
    {
      type: "Placo + laine de verre",
      isolant: "Laine de verre",
      lambda: "0,032 – 0,035",
      phonique: "Bonne",
      hydrofuge: "Non (à éviter en pièce humide)",
    },
    {
      type: "Placo + laine de roche",
      isolant: "Laine de roche (laine minérale)",
      lambda: "0,034 – 0,038",
      phonique: "Excellente",
      hydrofuge: "Non (mais bonne tenue à l'humidité)",
    },
    {
      type: "Placo + polyuréthane / PIR",
      isolant: "Isolant synthétique rigide",
      lambda: "0,022 – 0,028",
      phonique: "Faible",
      hydrofuge: "Oui",
    },
  ],
  caption:
    "Comparatif des principaux types de placo isolant selon le matériau isolant intégré à la plaque de plâtre. Sources : fiches techniques Placo (Saint-Gobain), Knauf, Isover, 2026.",
}

// Tableau des épaisseurs totales (isolant + plaque de plâtre) pour atteindre R = 2,5 / 3,7
export const EPAISSEURS_PLACO_TABLE = {
  columns: [
    { header: "Isolant du placo", key: "isolant" },
    { header: "Épaisseur isolant seul", key: "epaisseurIsolant" },
    { header: "+ Plaque BA13", key: "plaque", highlight: true },
    { header: "Épaisseur totale", key: "total" },
    { header: "Résistance thermique R", key: "r" },
  ],
  rows: [
    {
      isolant: "Polystyrène expansé (PSE)",
      epaisseurIsolant: "100 mm",
      plaque: "13 mm",
      total: "113 mm",
      r: "R ≈ 3,0",
    },
    {
      isolant: "Laine de verre",
      epaisseurIsolant: "120 mm",
      plaque: "13 mm",
      total: "133 mm",
      r: "R ≈ 3,7",
    },
    {
      isolant: "Laine de roche",
      epaisseurIsolant: "125 mm",
      plaque: "13 mm",
      total: "138 mm",
      r: "R ≈ 3,7",
    },
    {
      isolant: "Polyuréthane / PIR (faible épaisseur)",
      epaisseurIsolant: "90 mm",
      plaque: "13 mm",
      total: "103 mm",
      r: "R ≈ 3,7",
    },
  ],
  caption:
    "Épaisseurs totales du doublage placo isolant (isolant + plaque de plâtre standard BA13), pour un objectif de résistance thermique R compris entre 3,0 et 3,7 m²·K/W. Sources : DTU 25.42, fiches DTE fabricants 2026.",
}

// Étapes de pose du placo isolant
export const STEPS_POSE = [
  {
    title: "Préparer le support et tracer l'implantation",
    detail:
      "Le mur ou le plafond doit être sain, sec et débarrassé de tout revêtement fragile. On trace ensuite au cordeau l'emplacement des rails et montants (pose sur ossature) ou des plots de mortier adhésif (pose collée).",
    duration: "1 à 2 h",
  },
  {
    title: "Poser l'ossature métallique ou les plots de colle",
    detail:
      "Pour un doublage sur ossature, les rails et montants métalliques sont fixés au sol et au plafond, puis l'isolant (laine de verre, laine de roche ou polystyrène expansé) est glissé entre les montants. Pour une pose collée, des plots de mortier adhésif sont appliqués au dos de la plaque de plâtre isolante.",
    duration: "2 à 4 h par pièce",
  },
  {
    title: "Fixer les plaques de plâtre isolantes",
    detail:
      "Les plaques de plâtre isolantes sont vissées sur l'ossature métallique (vis auto-perceuses tous les 30 cm) ou plaquées directement sur les plots de mortier adhésif, en veillant à leur bonne planéité au niveau à bulle.",
    duration: "3 à 5 h par pièce",
  },
  {
    title: "Traiter les joints et réaliser les finitions",
    detail:
      "Une bande à joint est noyée dans l'enduit au niveau de chaque jonction entre plaques, puis poncée pour obtenir une surface lisse. Cette étape conditionne la qualité des finitions avant peinture ou revêtement mural.",
    duration: "1 jour de séchage + ponçage",
  },
]

// FAQ rich snippets
export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que le placo isolant et à quoi sert-il ?",
    answer:
      "Le placo isolant est une plaque de plâtre à laquelle est directement associé un isolant (polystyrène expansé, laine de verre, laine de roche ou polyuréthane) collé au dos de la plaque. Il permet de réaliser en une seule opération l'isolation thermique et phonique d'un mur ou d'un plafond, ainsi que sa finition prête à peindre. C'est une solution très utilisée en rénovation pour l'isolation thermique par l'intérieur.",
  },
  {
    question: "Quelle épaisseur de placo isolant choisir pour une bonne isolation thermique ?",
    answer:
      "Pour atteindre une résistance thermique R ≥ 3,7 m²·K/W (objectif BBC rénovation), il faut environ 120 mm de laine de verre, 125 mm de laine de roche, 100 mm de polystyrène expansé haute performance ou seulement 90 mm de polyuréthane, plus 13 mm de plaque de plâtre standard (BA13). Le minimum pour déclencher MaPrimeRénov' est R ≥ 2,5, atteignable avec environ 80 à 100 mm d'isolant selon le matériau.",
  },
  {
    question: "Quel type de placo isolant choisir selon la pièce ?",
    answer:
      "Pour les murs ou plafonds standards, le placo isolant à la laine de verre offre le meilleur rapport performance/prix. Pour les pièces humides (salles de bains, cuisines, buanderies), il faut impérativement choisir une plaque hydrofuge associée à un isolant hydrofuge comme le polystyrène expansé. Pour les faibles épaisseurs disponibles, le placo isolant au polyuréthane ou PIR permet d'atteindre une excellente isolation thermique en occupant le moins de place possible.",
  },
  {
    question: "Le placo isolant permet-il aussi une bonne isolation phonique ?",
    answer:
      "Oui, le placo isolant permet une isolation thermique et phonique simultanée, mais les performances acoustiques varient selon l'isolant. La laine de roche offre la meilleure isolation phonique grâce à sa structure fibreuse dense, suivie de la laine de verre. Les isolants synthétiques comme le polystyrène expansé ou le polyuréthane sont très performants thermiquement mais offrent une isolation phonique plus faible.",
  },
  {
    question: "Peut-on poser du placo isolant dans une salle de bains ?",
    answer:
      "Oui, à condition d'utiliser des plaques hydrofuges (reconnaissables à leur teinte verte) associées à un isolant hydrofuge comme le polystyrène expansé, qui ne craint pas l'humidité contrairement à la laine minérale classique. Pour les murs des salles de bains directement exposés aux projections d'eau, un traitement complémentaire des joints et une finition étanche restent recommandés.",
  },
  {
    question: "Faut-il poser le placo isolant sur ossature métallique ou en pose collée ?",
    answer:
      "La pose collée (doublage collé sur plots de mortier adhésif) est plus rapide, moins coûteuse et consomme moins d'épaisseur, mais elle nécessite un mur bien plan. La pose sur ossature métallique est recommandée quand le mur est irrégulier, humide ou qu'il faut y intégrer des gaines électriques : elle laisse une lame d'air qui améliore aussi la performance thermique et limite les remontées d'humidité vers la plaque de plâtre.",
  },
  {
    question: "Comment éviter les ponts thermiques avec le placo isolant ?",
    answer:
      "Les ponts thermiques apparaissent aux jonctions entre le doublage isolant et les parois non traitées (plancher, plafond, tableaux de fenêtres). Pour les éviter, il faut prolonger l'isolant sur au moins 30 à 50 cm au droit de ces jonctions et soigner le traitement des joints entre plaques de plâtre isolantes, qui doivent rester continus et sans discontinuité de l'isolant.",
  },
  {
    question: "Quel est le prix de la pose d'un placo isolant au m² en 2026 ?",
    answer:
      "Le coût de la pose d'un placo isolant varie de 25 à 45 €/m² en pose collée (fournitures + main-d'œuvre) et de 45 à 70 €/m² pour une pose sur ossature métallique avec isolant en laine minérale. Les aides MaPrimeRénov' et les Certificats d'Économies d'Énergie (CEE) peuvent réduire significativement ce reste à charge pour un artisan certifié RGE.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Guide de l'isolation thermique des parois par l'intérieur",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "Placo (Saint-Gobain) — Fiches techniques plaques de plâtre isolantes",
    url: "https://www.placo.fr",
    date: "2026",
  },
  {
    name: "Isover — Guide de pose des doublages isolants",
    url: "https://www.isover.fr",
    date: "2025",
  },
  {
    name: "Knauf — Solutions de doublage et cloisons isolantes",
    url: "https://www.knauf.fr",
    date: "2025",
  },
  {
    name: "CSTB — DTU 25.42 : ouvrages en plaques de parement en plâtre",
    url: "https://www.cstb.fr",
    date: "2024",
  },
  {
    name: "france-renov.gouv.fr — Barèmes MaPrimeRénov' isolation des murs 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
]
