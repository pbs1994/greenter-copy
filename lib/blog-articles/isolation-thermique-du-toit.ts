// =============================================================================
// Données article : Isolation thermique du toit — guide 2026
// Angle : article « hub » qui oriente selon le type de toit (combles perdus,
// combles aménagés, sarking, toit plat / toiture-terrasse, toiture métallique)
// avec objectifs de résistance, confort d'été, obligation lors d'une réfection
// de couverture, prix et aides après la fin de MaPrimeRénov' par geste pour
// l'isolation (1er septembre 2026). Renvoie vers les guides détaillés
// (rampants, comble rampant, prix des combles) sans les cannibaliser.
// Sources : ADEME, fiches CEE BAR-EN-101 / BAR-EN-105, décret n° 2016-711,
// ANAH / France Rénov'
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation thermique du toit : quelle solution selon votre toiture ?",
  subtitle:
    "Isolation thermique du toit : combles, rampants, sarking, toit plat ou bac acier. Quelle technique choisir, quelle résistance viser, prix et aides 2026.",
  slug: "isolation-thermique-du-toit",
  date: "23 octobre 2026",
  dateISO: "2026-10-23",
  readingTime: 15,
  author: "Greenter",
}

// Quelle technique selon le toit
export const TECHNIQUES_TABLE = {
  columns: [
    { header: "Votre toit", key: "toit" },
    { header: "Technique d'isolation", key: "technique", highlight: true },
    { header: "Résistance visée", key: "resistance" },
    { header: "Prix indicatif posé", key: "prix" },
  ],
  rows: [
    { toit: "Toit en pente, combles perdus", technique: "Isolation du plancher des combles (soufflage ou rouleaux)", resistance: "R ≥ 7 m².K/W", prix: "15 – 40 €/m²" },
    { toit: "Toit en pente, combles aménagés", technique: "Isolation des rampants par l'intérieur, entre et sous chevrons", resistance: "R ≥ 6 m².K/W", prix: "40 – 130 €/m²" },
    { toit: "Toit en pente, couverture à refaire", technique: "Isolation par l'extérieur (sarking) sur les chevrons", resistance: "R ≥ 6 m².K/W", prix: "150 – 250 €/m²" },
    { toit: "Toit plat, toiture-terrasse", technique: "Isolation sur la dalle sous étanchéité, ou toiture inversée", resistance: "R ≥ 4,5 m².K/W", prix: "≈ 100 – 200 €/m² avec étanchéité" },
    { toit: "Toiture métallique (bac acier)", technique: "Isolant sous couverture ou panneaux sandwich isolants", resistance: "Selon usage du local", prix: "Sur devis" },
  ],
  caption:
    "Résistances thermiques exigées pour les primes CEE (fiches BAR-EN-101 et BAR-EN-105). Prix indicatifs TTC en Île-de-France, hors aides ; ils varient selon l'isolant, l'épaisseur et l'accès au chantier.",
}

// Comparatif isolants pour le toit
export const ISOLANTS_TABLE = {
  columns: [
    { header: "Isolant", key: "isolant" },
    { header: "λ (W/m.K)", key: "lambda" },
    { header: "Épaisseur pour R = 6", key: "epaisseur" },
    { header: "Confort d'été", key: "ete", highlight: true },
  ],
  rows: [
    { isolant: "Laine de verre", lambda: "0,030 – 0,040", epaisseur: "≈ 18 – 24 cm", ete: "Faible déphasage" },
    { isolant: "Laine de roche", lambda: "0,034 – 0,040", epaisseur: "≈ 20 – 24 cm", ete: "Moyen" },
    { isolant: "Ouate de cellulose", lambda: "0,038 – 0,042", epaisseur: "≈ 23 – 25 cm", ete: "Bon" },
    { isolant: "Fibre de bois", lambda: "0,036 – 0,045", epaisseur: "≈ 22 – 27 cm", ete: "Très bon" },
    { isolant: "Polyuréthane (PIR)", lambda: "0,022 – 0,026", epaisseur: "≈ 13 – 16 cm", ete: "Faible" },
  ],
  caption:
    "Épaisseurs calculées par e = R × λ et arrondies. Le déphasage, c'est-à-dire le temps que met la chaleur de l'été à traverser l'isolant, dépend surtout de la densité du matériau.",
}

// Diagnostic avant travaux
export const DIAGNOSTIC_STEPS = [
  {
    title: "Identifier le type de toit et de combles",
    detail:
      "Toit en pente avec combles perdus ou aménagés, toit plat, toiture métallique : chaque configuration impose une technique différente. Vérifiez aussi l'accès aux combles et la hauteur disponible.",
  },
  {
    title: "Contrôler l'état de la couverture",
    detail:
      "Tuiles cassées, ardoises déplacées, traces d'infiltration sur la charpente : une couverture en mauvais état doit être réparée avant d'isoler, ou rénovée en même temps, ce qui ouvre la voie au sarking.",
  },
  {
    title: "Mesurer l'isolant existant",
    detail:
      "Relevez l'épaisseur et la nature de l'isolant en place, et son état : tassé, humide ou troué, il ne vaut plus grand-chose. Une vieille laine de 8 à 10 cm reste très loin d'une résistance R ≥ 6.",
  },
  {
    title: "Vérifier la charpente et la ventilation",
    detail:
      "Le bois doit être sain, sans attaque d'insectes ni champignons. La lame d'air sous la couverture et la ventilation du logement doivent être préservées pour évacuer l'humidité.",
  },
  {
    title: "Faire établir un diagnostic et des devis",
    detail:
      "Un professionnel RGE confirme la technique, calcule l'épaisseur nécessaire et chiffre les travaux. Pour un projet global, un audit énergétique permet d'ordonner isolation et chauffage dans le bon sens.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Pourquoi isoler le toit en priorité ?",
    answer:
      "Parce que l'air chaud monte : dans une maison non isolée, la toiture est le premier poste de déperdition, avec environ 25 à 30 % des pertes de chaleur selon l'ADEME. L'isolation thermique du toit est aussi l'un des travaux les plus rentables, en particulier pour des combles perdus, où l'isolation par soufflage coûte peu et se réalise en une journée.",
  },
  {
    question: "Quelle est la meilleure technique d'isolation thermique du toit ?",
    answer:
      "Elle dépend de votre toit. Pour des combles perdus, on isole le plancher des combles, la solution la moins chère. Pour des combles aménagés, on isole les rampants par l'intérieur, ou par l'extérieur avec le sarking si la couverture doit être refaite. Pour un toit plat, l'isolant se pose sur la dalle, sous l'étanchéité, ou au-dessus dans le cas d'une toiture inversée.",
  },
  {
    question: "Quelle épaisseur d'isolant pour le toit ?",
    answer:
      "Visez une résistance thermique R ≥ 7 m².K/W pour des combles perdus et R ≥ 6 m².K/W pour des rampants ou une isolation par l'extérieur, les seuils exigés pour les primes CEE. Cela représente environ 20 à 30 cm de laine minérale, d'ouate de cellulose ou de fibre de bois, ou 13 à 16 cm de polyuréthane. Pour une toiture-terrasse, le seuil est R ≥ 4,5 m².K/W.",
  },
  {
    question: "Est-il obligatoire d'isoler le toit lors d'une réfection de toiture ?",
    answer:
      "Oui, en principe. Depuis le décret n° 2016-711, des travaux importants de rénovation de toiture, comme le remplacement ou le recouvrement de plus de 50 % de la couverture, doivent s'accompagner d'une isolation thermique. Des exceptions existent, notamment en cas d'impossibilité technique, de disproportion économique ou de contrainte patrimoniale.",
  },
  {
    question: "Combien coûte l'isolation thermique d'un toit ?",
    answer:
      "Comptez en moyenne 15 à 40 € par m² pour isoler des combles perdus, 40 à 130 € par m² pour des rampants par l'intérieur, 150 à 250 € par m² pour un sarking et environ 100 à 200 € par m² pour une toiture-terrasse avec réfection de l'étanchéité. Les primes CEE et la TVA à 5,5 % réduisent la facture lorsque les travaux sont réalisés par un professionnel RGE.",
  },
  {
    question: "MaPrimeRénov' finance-t-elle encore l'isolation du toit en 2026 ?",
    answer:
      "Plus en parcours par geste : depuis le 1er septembre 2026, l'isolation des combles, des rampants et des toitures-terrasses n'est plus financée par MaPrimeRénov' par geste. Elle reste éligible dans le cadre d'une rénovation d'ampleur, qui combine plusieurs travaux avec un accompagnement. Les primes CEE, l'éco-prêt à taux zéro et la TVA à 5,5 % restent mobilisables.",
  },
  {
    question: "L'isolation du toit protège-t-elle aussi de la chaleur en été ?",
    answer:
      "Oui, si l'isolant est bien choisi. Sous un toit, la chaleur estivale traverse lentement les matériaux denses comme la fibre de bois ou la ouate de cellulose, qui offrent un meilleur déphasage que les isolants légers. Associée à une bonne ventilation nocturne et à des protections solaires sur les fenêtres de toit, elle limite fortement la surchauffe des combles aménagés.",
  },
  {
    question: "Peut-on isoler son toit soi-même ?",
    answer:
      "La pose de rouleaux sur le plancher de combles perdus accessibles est à la portée d'un bricoleur soigneux. En revanche, le soufflage, l'isolation des rampants avec pare-vapeur continu, le sarking et l'isolation d'un toit plat demandent un savoir-faire et un matériel de professionnel. Et seuls les travaux réalisés par une entreprise RGE ouvrent droit aux aides.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Isoler sa maison : toiture, combles et répartition des déperditions",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/isolation",
    date: "2025",
  },
  {
    name: "Ministère de la Transition écologique — Fiches CEE BAR-EN-101 (combles ou toiture) et BAR-EN-105 (toitures-terrasses)",
    url: "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie",
    date: "2026",
  },
  {
    name: "Légifrance — Décret n° 2016-711 du 30 mai 2016 relatif aux travaux d'isolation en cas de travaux de ravalement de façade, de réfection de toiture ou d'aménagement de locaux",
    url: "https://www.legifrance.gouv.fr",
    date: "2016",
  },
  {
    name: "France Rénov' / ANAH — MaPrimeRénov' : travaux éligibles et rénovation d'ampleur",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
]
