// =============================================================================
// Données article : Isolation par laine de roche — guide complet, prix et pose 2026
// Sources : ADEME, CSTB (DTU 45.10 / 25.41), FILMM, fabricants (Rockwool, Isover)
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation par laine de roche : guide complet, prix et pose en 2026",
  subtitle:
    "Fabrication, performances, prix au m² et méthode de pose : tout savoir sur l'isolation par laine de roche pour les combles, les murs et les cloisons, avec un comparatif face à la laine de verre et la fibre de bois.",
  slug: "isolation-par-laine-de-roche",
  date: "28 juillet 2026",
  dateISO: "2026-07-28",
  readingTime: 13,
  author: "Greenter",
}

// Comparatif laine de roche vs autres isolants courants
export const COMPARATIF_TABLE = {
  columns: [
    { header: "Isolant", key: "isolant" },
    { header: "Conductivité λ (W/m.K)", key: "lambda" },
    { header: "Réaction au feu", key: "feu", highlight: true },
    { header: "Prix posé (€/m²)", key: "prix" },
  ],
  rows: [
    {
      isolant: "Laine de roche",
      lambda: "0,034–0,040",
      feu: "A1 (incombustible)",
      prix: "20–45 €/m²",
    },
    {
      isolant: "Laine de verre",
      lambda: "0,030–0,040",
      feu: "A1 ou A2 selon densité",
      prix: "15–35 €/m²",
    },
    {
      isolant: "Fibre de bois",
      lambda: "0,036–0,046",
      feu: "E à B (combustible)",
      prix: "30–60 €/m²",
    },
    {
      isolant: "Ouate de cellulose",
      lambda: "0,038–0,042",
      feu: "B-s2,d0 (traitée sel de bore)",
      prix: "25–40 €/m²",
    },
  ],
  caption:
    "Valeurs indicatives constatées en 2026, toutes fournitures et pose comprises, artisan RGE. La réaction au feu suit la classification européenne Euroclasses (A1 = incombustible, meilleure classe possible). Sources : ADEME, FILMM, fabricants.",
}

// Étapes de pose de la laine de roche
export const POSE_STEPS = [
  {
    title: "Mesurer et préparer le support",
    detail:
      "Relevez précisément les dimensions de la surface à isoler (combles, mur, cloison) et vérifiez l'entraxe des montants ou chevrons. La laine de roche en panneaux semi-rigides est généralement calibrée pour s'ajuster entre des montants espacés de 40 à 60 cm sans découpe complexe.",
  },
  {
    title: "Découper aux bonnes dimensions",
    detail:
      "La laine de roche se découpe facilement au cutter long ou à la scie égoïne, en prévoyant une légère surlargeur (1 à 2 cm) pour un ajustement en compression entre les montants, sans laisser de vide ni de pont thermique sur les bords.",
  },
  {
    title: "Poser le pare-vapeur si nécessaire",
    detail:
      "Pour une isolation par l'intérieur (mur ou rampant), un pare-vapeur ou frein-vapeur doit être posé côté chaud, avant la finition. Il empêche la vapeur d'eau intérieure de migrer dans l'isolant et d'y provoquer des points de condensation.",
  },
  {
    title: "Insérer les panneaux entre les montants",
    detail:
      "Insérez la laine de roche en la comprimant légèrement pour qu'elle tienne par friction, sans tasser excessivement le matériau — un tassement trop important réduit son pouvoir isolant. Veillez à ce que chaque panneau soit bien jointif avec le suivant.",
  },
  {
    title: "Fixer et poser la finition",
    detail:
      "Pour des combles perdus, la laine de roche est simplement posée sur le plancher. Pour des murs ou rampants, elle est maintenue par l'ossature puis recouverte d'une plaque de plâtre ou d'un parement, en respectant les jonctions pour garantir la continuité de l'isolation.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que la laine de roche exactement ?",
    answer:
      "La laine de roche est un isolant minéral fabriqué à partir de roche volcanique (basalte) fondue à très haute température puis fibrée, un peu comme du sucre filé. Ce procédé lui donne sa structure fibreuse caractéristique, sa légèreté et ses excellentes propriétés d'isolation thermique et acoustique, tout en la rendant incombustible.",
  },
  {
    question: "Quel est le prix de la laine de roche au m² ?",
    answer:
      "Le prix de l'isolation par laine de roche varie entre 20 et 45 € par m² pose comprise, selon la forme (rouleaux, panneaux semi-rigides ou rigides), l'épaisseur et la complexité du chantier. Les rouleaux pour combles perdus se situent en bas de fourchette (20-30 €/m²), tandis que les panneaux rigides pour isolation par l'extérieur sont plus onéreux (35-45 €/m²).",
  },
  {
    question: "La laine de roche est-elle meilleure que la laine de verre ?",
    answer:
      "Ni l'une ni l'autre n'est universellement meilleure : leurs performances thermiques sont très proches. La laine de roche se distingue par une meilleure résistance au feu (classement A1 systématique), une masse volumique plus élevée qui améliore l'isolation acoustique, et une meilleure tenue à l'humidité. La laine de verre reste généralement un peu moins chère et plus légère à manipuler.",
  },
  {
    question: "Quelle épaisseur de laine de roche pour isoler des combles ?",
    answer:
      "Pour des combles perdus, une épaisseur de 300 à 400 mm de laine de roche est nécessaire pour atteindre la résistance thermique R ≥ 7 m².K/W exigée par MaPrimeRénov' en 2026. Pour des combles aménageables isolés sous rampants, comptez plutôt 220 à 280 mm pour atteindre R ≥ 6 m².K/W, la valeur exacte dépendant de la conductivité thermique du produit choisi.",
  },
  {
    question: "La laine de roche est-elle dangereuse pour la santé ?",
    answer:
      "La laine de roche est classée non cancérogène par le règlement européen depuis que les fabricants ont adapté la composition de leurs fibres. Elle reste néanmoins irritante au contact direct de la peau, des yeux et des voies respiratoires lors de la pose : le port de gants, de lunettes et d'un masque anti-poussière est fortement recommandé pendant la manipulation et la découpe.",
  },
  {
    question: "Peut-on poser de la laine de roche soi-même ?",
    answer:
      "Oui, la pose de laine de roche en rouleaux ou en panneaux semi-rigides est accessible en auto-rénovation pour des combles perdus faciles d'accès ou des cloisons simples. Attention toutefois : les travaux réalisés en dehors d'un artisan certifié RGE ne sont pas éligibles aux aides financières comme MaPrimeRénov', qui exigent une pose professionnelle pour tout dossier de subvention.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Caractéristiques techniques des isolants thermiques, référentiel 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "CSTB — DTU 45.10 et 25.41, mise en œuvre des isolants en laine minérale",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "FILMM — Fédération française des fabricants de laines minérales, fiches techniques",
    url: "https://www.filmm.org",
    date: "2026",
  },
  {
    name: "france-renov.gouv.fr — Seuils de résistance thermique MaPrimeRénov' 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
]
