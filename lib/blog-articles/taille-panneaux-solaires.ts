// =============================================================================
// Données article : Taille des panneaux solaires (2026)
// Angle : les deux sens de « taille » pour un particulier. 1) Dimensions et
// poids d'un panneau (formats 60 cellules, 108 demi-cellules standard 2026,
// grands formats 144 / 210 mm) et pourquoi les grands formats ne vont pas
// sur une toiture de maison. 2) Taille de l'installation : surface de toit
// par kWc, nombre de panneaux, marges, charge sur la charpente, et
// dimensionnement selon la consommation depuis la baisse du tarif de rachat
// (juin 2026). Renvoie vers avantages / orientation / fixation sur tuiles.
// Sources : fiches techniques fabricants (formats 54/72 cellules M10 et 210R),
// PVGIS (JRC), photovoltaique.info (Hespul), Eurocodes NF EN 1991
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Taille des panneaux solaires : dimensions, poids et surface à prévoir",
  subtitle:
    "Taille des panneaux solaires en 2026 : dimensions et poids d'un panneau standard, surface de toit pour 3, 6 ou 9 kWc, nombre de panneaux et charge sur la charpente.",
  slug: "taille-panneaux-solaires",
  date: "30 octobre 2026",
  dateISO: "2026-10-30",
  readingTime: 14,
  author: "Greenter",
}

// Formats de panneaux
export const FORMATS_TABLE = {
  columns: [
    { header: "Format", key: "format" },
    { header: "Dimensions", key: "dimensions", highlight: true },
    { header: "Surface", key: "surface" },
    { header: "Puissance", key: "puissance" },
    { header: "Poids", key: "poids" },
    { header: "Usage", key: "usage" },
  ],
  rows: [
    { format: "60 cellules (ancien standard)", dimensions: "≈ 1,65 × 0,99 m", surface: "≈ 1,6 m²", puissance: "280 à 330 Wc", poids: "18 à 19 kg", usage: "Installations posées avant 2020" },
    { format: "108 demi-cellules (standard 2026)", dimensions: "≈ 1,72 à 1,76 × 1,13 m", surface: "≈ 1,95 m²", puissance: "410 à 460 Wc", poids: "20 à 23 kg", usage: "Toitures de maisons, carports" },
    { format: "144 demi-cellules", dimensions: "≈ 2,28 × 1,13 m", surface: "≈ 2,6 m²", puissance: "570 à 620 Wc", poids: "27 à 32 kg", usage: "Bâtiments agricoles et industriels" },
    { format: "Cellules 210 mm (132 demi-cellules)", dimensions: "≈ 2,38 × 1,30 m", surface: "≈ 3,1 m²", puissance: "650 à 720 Wc", poids: "33 à 38 kg", usage: "Centrales au sol" },
  ],
  caption:
    "Ordres de grandeur relevés sur les fiches techniques des principaux fabricants en 2026. L'épaisseur du cadre est de 30 à 35 mm pour tous les formats. Les dimensions exactes varient de quelques millimètres d'une marque à l'autre.",
}

// Surface selon la puissance de l'installation
export const SURFACE_TABLE = {
  columns: [
    { header: "Puissance", key: "puissance" },
    { header: "Nombre de panneaux (≈ 430 Wc)", key: "nombre" },
    { header: "Surface des panneaux", key: "surface", highlight: true },
    { header: "Surface de toit conseillée", key: "toit" },
    { header: "Production en Île-de-France", key: "production" },
  ],
  rows: [
    { puissance: "3 kWc", nombre: "7", surface: "≈ 14 m²", toit: "18 à 22 m²", production: "≈ 3 300 kWh/an" },
    { puissance: "4,5 kWc", nombre: "10 à 11", surface: "≈ 21 m²", toit: "27 à 33 m²", production: "≈ 4 900 kWh/an" },
    { puissance: "6 kWc", nombre: "14", surface: "≈ 27 m²", toit: "35 à 43 m²", production: "≈ 6 600 kWh/an" },
    { puissance: "9 kWc", nombre: "21", surface: "≈ 41 m²", toit: "53 à 65 m²", production: "≈ 9 900 kWh/an" },
  ],
  caption:
    "Panneaux de 108 demi-cellules d'environ 1,95 m². La surface de toit conseillée tient compte des marges autour du champ de panneaux (rives, faîtage, égout, obstacles) et des pertes de calepinage, car les modules ne remplissent jamais tout le pan. Production estimée pour une toiture sud à sud-ouest inclinée à 30°, sans ombrage, environ 1 100 kWh par kWc et par an.",
}

// Méthode de dimensionnement
export const DIMENSIONNEMENT_STEPS = [
  {
    title: "Relever votre consommation",
    detail:
      "Notez la consommation annuelle sur vos factures, puis regardez la courbe horaire sur votre espace client. C'est la consommation de journée, entre 9 h et 18 h, qui fixe la puissance réellement utile.",
  },
  {
    title: "Mesurer la surface de toit disponible",
    detail:
      "Mesurez la longueur du pan (le long de la gouttière) et sa hauteur (de la gouttière au faîtage). Retirez 30 à 50 cm sur chaque bord, puis les zones occupées par les fenêtres de toit, la cheminée et les ombres.",
  },
  {
    title: "Calculer le nombre de panneaux",
    detail:
      "Divisez la longueur utile par 1,15 m pour des panneaux posés en portrait, la hauteur utile par 1,76 m pour le nombre de rangées. Testez aussi la pose en paysage, qui convient parfois mieux à un pan peu haut.",
  },
  {
    title: "Vérifier la charpente",
    detail:
      "Panneaux, rails et crochets pèsent 12 à 15 kg par m². Une charpente traditionnelle en bon état le supporte sans difficulté, mais une charpente ancienne, modifiée ou attaquée par les insectes doit être contrôlée.",
  },
  {
    title: "Ajuster à la consommation",
    detail:
      "Depuis que le surplus est racheté environ 1,1 centime le kWh, remplir tout le toit n'est plus systématiquement intéressant. Choisissez la puissance qui couvre bien vos besoins de journée, quitte à laisser de la place pour une extension.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quelle est la taille standard d'un panneau solaire ?",
    answer:
      "En 2026, le panneau le plus posé sur les maisons mesure environ 1,72 à 1,76 m de long sur 1,13 m de large, soit à peu près 1,95 m², pour une épaisseur de 30 à 35 mm. Il compte 108 demi-cellules et affiche une puissance de 410 à 460 Wc. L'ancien format de 60 cellules, plus courant avant 2020, mesurait environ 1,65 × 0,99 m.",
  },
  {
    question: "Combien pèse un panneau solaire ?",
    answer:
      "Un panneau résidentiel standard pèse 20 à 23 kg, soit environ 11 à 12 kg par m². Avec les rails et les crochets, la charge sur la toiture atteint 12 à 15 kg par m², ce qu'une charpente en bon état supporte sans renforcement. Les grands formats destinés aux bâtiments industriels dépassent 27 kg.",
  },
  {
    question: "Quelle surface de toit faut-il pour 3 kWc ?",
    answer:
      "Une installation de 3 kWc compte environ 7 panneaux de 430 Wc, soit 14 m² de panneaux. En ajoutant les marges autour du champ de modules, prévoyez 18 à 22 m² de toiture libre et bien exposée. Comptez environ 27 m² de panneaux pour 6 kWc et 41 m² pour 9 kWc.",
  },
  {
    question: "Combien de panneaux solaires pour 6 kWc ?",
    answer:
      "Avec des panneaux de 430 Wc, une installation de 6 kWc demande 14 panneaux. Avec d'anciens modules de 300 Wc, il en faudrait 20. Plus la puissance unitaire est élevée, moins il faut de panneaux, mais la surface totale varie peu, car la puissance par m² des panneaux résidentiels se situe autour de 210 à 230 Wc.",
  },
  {
    question: "Un panneau solaire plus grand produit-il plus ?",
    answer:
      "Un panneau plus grand a une puissance unitaire plus élevée, mais il ne produit pas plus par m². C'est le rendement des cellules, autour de 21 à 23 % en 2026, qui détermine la production par m² de toit. Les grands formats de plus de 2,2 m sont réservés aux bâtiments professionnels et aux centrales, car ils sont lourds et difficiles à manipuler sur un toit de maison.",
  },
  {
    question: "Quelle taille de panneau pour un balcon ?",
    answer:
      "Les kits prêts à brancher utilisent souvent des panneaux standard de 1,72 × 1,13 m et d'une vingtaine de kilos, qu'il faut fixer solidement sur le garde-corps. Pour un petit balcon, des panneaux plus compacts de 100 à 200 Wc, rigides ou souples, sont plus faciles à installer. Vérifiez le règlement de copropriété avant tout achat.",
  },
  {
    question: "Faut-il poser les panneaux en portrait ou en paysage ?",
    answer:
      "La pose en portrait, le grand côté dans le sens de la pente, est la plus courante sur les toitures de maisons. La pose en paysage permet de loger une rangée supplémentaire sur un pan peu haut ou de mieux contourner une fenêtre de toit. Le choix se fait au moment du calepinage, le plan de pose des panneaux.",
  },
  {
    question: "Quelle puissance installer pour une maison ?",
    answer:
      "Pour un foyer sans chauffage électrique qui consomme 3 000 à 5 000 kWh par an, 3 kWc suffisent généralement. Avec une pompe à chaleur ou une voiture électrique, 6 kWc sont souvent pertinents. Au-delà, la part d'électricité revendue augmente, alors qu'elle n'est plus rachetée qu'environ 1,1 centime le kWh.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Fiches techniques fabricants : modules 108 et 144 demi-cellules (format M10, 182 mm) et cellules 210 mm",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
  {
    name: "Commission européenne (JRC) : PVGIS, estimation de la production photovoltaïque",
    url: "https://re.jrc.ec.europa.eu/pvg_tools/fr/",
    date: "2026",
  },
  {
    name: "Hespul : photovoltaique.info, dimensionner une installation en autoconsommation",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
  {
    name: "AFNOR : Eurocode 1, NF EN 1991-1-3 (charges de neige) et NF EN 1991-1-4 (actions du vent)",
    url: "https://www.boutique.afnor.org",
    date: "2025",
  },
]
