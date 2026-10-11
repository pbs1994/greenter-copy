// =============================================================================
// Données article : Isolation derrière radiateur — guide 2026
// Angle : le geste simple (panneau réfléchissant) expliqué honnêtement —
// physique, économies réelles chiffrées, choix de l'isolant, pose, erreurs —
// puis la vraie solution durable (isolation du mur, ITI/ITE) qui renvoie vers
// nos services d'isolation.
// Sources : ADEME, France Rénov', fiche CEE BAR-EN-102, Energy Saving Trust
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation derrière radiateur : panneau réfléchissant, économies réelles et pose",
  subtitle:
    "Isolation derrière radiateur : quel isolant choisir, combien d'économies espérer vraiment et comment poser un panneau réfléchissant sans erreur. Le guide complet 2026.",
  slug: "isolation-derriere-radiateur",
  date: "11 octobre 2026",
  dateISO: "2026-10-11",
  readingTime: 14,
  author: "Greenter",
}

// Estimation des pertes par le mur derrière un radiateur (hypothèses explicites)
export const PERTES_TABLE = {
  columns: [
    { header: "Hypothèse de calcul", key: "hypothese" },
    { header: "Mur courant", key: "courant" },
    { header: "Mur derrière le radiateur", key: "radiateur", highlight: true },
  ],
  rows: [
    { hypothese: "Température côté intérieur du mur", courant: "≈ 19 °C", radiateur: "≈ 40 °C" },
    { hypothese: "Température extérieure moyenne en hiver", courant: "5 °C", radiateur: "5 °C" },
    { hypothese: "Mur non isolé (U ≈ 2 W/m².K)", courant: "≈ 28 W/m²", radiateur: "≈ 70 W/m²" },
    { hypothese: "Surface de mur masquée par un radiateur (100 × 60 cm)", courant: "—", radiateur: "0,6 m²" },
    { hypothese: "Surplus de perte par radiateur", courant: "—", radiateur: "≈ 25 W en continu" },
    { hypothese: "Sur une saison de chauffe (≈ 2 000 h équivalentes)", courant: "—", radiateur: "≈ 50 kWh par radiateur" },
  ],
  caption:
    "Estimation Greenter, ordre de grandeur pour un mur extérieur en maçonnerie non isolée. Sur un mur déjà isolé (U ≈ 0,3 W/m².K), le surplus de perte devient quasi négligeable.",
}

// Comparatif des solutions d'isolation derrière radiateur
export const ISOLANTS_TABLE = {
  columns: [
    { header: "Solution", key: "solution" },
    { header: "Épaisseur", key: "epaisseur" },
    { header: "Prix indicatif", key: "prix" },
    { header: "Efficacité", key: "efficacite", highlight: true },
    { header: "Pour qui ?", key: "usage" },
  ],
  rows: [
    {
      solution: "Film aluminium simple",
      epaisseur: "< 1 mm",
      prix: "5 – 10 € le rouleau",
      efficacite: "Faible",
      usage: "Dépannage, location, budget minimal",
    },
    {
      solution: "Mousse polyéthylène + aluminium",
      epaisseur: "3 – 5 mm",
      prix: "10 – 25 € le rouleau (≈ 5 m²)",
      efficacite: "Bonne",
      usage: "La majorité des radiateurs sur mur extérieur",
    },
    {
      solution: "Panneau polystyrène à face alu",
      epaisseur: "4 – 6 mm",
      prix: "5 – 15 € le panneau",
      efficacite: "Bonne à très bonne",
      usage: "Radiateurs avec 3 cm d'espace ou plus",
    },
    {
      solution: "Isolant mince multicouche",
      epaisseur: "10 – 20 mm",
      prix: "8 – 15 €/m²",
      efficacite: "Variable (souvent trop épais)",
      usage: "Rarement adapté : bloque l'air derrière le radiateur",
    },
    {
      solution: "Isolation du mur (ITI ou ITE)",
      epaisseur: "10 – 16 cm",
      prix: "40 – 200 €/m² selon technique",
      efficacite: "Maximale et durable",
      usage: "Logement passoire, rénovation globale",
    },
  ],
  caption:
    "Prix constatés en grande surface de bricolage et sur nos chantiers en Île-de-France en 2026, à titre indicatif. L'isolation du mur traite toute la paroi, pas seulement la zone derrière le radiateur.",
}

// Étapes de pose d'un panneau réfléchissant
export const POSE_STEPS = [
  {
    title: "Vérifier que le radiateur est sur un mur extérieur",
    detail:
      "Le panneau n'a d'intérêt que si le mur donne sur l'extérieur (façade, pignon) ou sur un local non chauffé (garage, cage d'escalier froide). Sur une cloison intérieure entre deux pièces chauffées, la chaleur n'est pas perdue : inutile d'investir.",
  },
  {
    title: "Couper le chauffage et laisser refroidir",
    detail:
      "Fermez le robinet ou baissez le thermostat et attendez que le radiateur soit froid. Vous travaillerez les mains près des tubes et des ailettes : un radiateur à 60 °C brûle, et l'adhésif colle mal sur un mur chaud.",
  },
  {
    title: "Mesurer la surface et l'espace disponible",
    detail:
      "Relevez la hauteur et la largeur du radiateur, puis l'espace entre le dos du radiateur et le mur. Découpez le panneau 1 à 2 cm plus petit que le radiateur, pour qu'il reste invisible, et choisissez une épaisseur qui laisse au moins 2 cm d'air libre.",
  },
  {
    title: "Découper les passages des supports et des tubes",
    detail:
      "Repérez la position des consoles de fixation et des arrivées d'eau, puis entaillez le panneau au cutter. Pour un grand radiateur, deux panneaux juxtaposés sont plus faciles à glisser qu'une seule pièce.",
  },
  {
    title: "Fixer le panneau face brillante vers le radiateur",
    detail:
      "Collez le panneau au mur avec de l'adhésif double face ou une colle sans solvant, côté aluminium tourné vers le radiateur. Le panneau doit être plaqué contre le mur, sans toucher le radiateur, et sans boucher le passage de l'air par le bas et par le haut.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "L'isolation derrière un radiateur est-elle vraiment efficace ?",
    answer:
      "Oui, mais uniquement sur un mur extérieur mal ou non isolé. Dans ce cas, un panneau réfléchissant renvoie vers la pièce une partie de la chaleur qui chauffait le mur, et réduit les pertes de la zone la plus chaude de la paroi. Le gain reste modeste — de l'ordre de quelques dizaines d'euros par an pour une maison — mais le panneau coûte entre 5 et 25 € et s'amortit en général en un ou deux hivers. Sur un mur déjà isolé ou sur une cloison intérieure, l'intérêt est quasi nul.",
  },
  {
    question: "Quel isolant mettre derrière un radiateur ?",
    answer:
      "Le meilleur compromis est un rouleau de mousse polyéthylène à face aluminium de 3 à 5 mm, ou un panneau de polystyrène à face alu de 4 à 6 mm si l'espace le permet. Ces produits combinent une surface réfléchissante et une fine couche isolante. Un simple film aluminium est moins efficace, et un isolant épais risque de bloquer la circulation de l'air derrière le radiateur.",
  },
  {
    question: "Dans quel sens poser un panneau réfléchissant derrière un radiateur ?",
    answer:
      "La face brillante (aluminium) doit être tournée vers le radiateur, et la face isolante ou mate collée contre le mur. C'est la face réfléchissante qui renvoie le rayonnement infrarouge du radiateur vers la pièce.",
  },
  {
    question: "Quel espace laisser entre le radiateur et l'isolant ?",
    answer:
      "Gardez au moins 2 cm d'air entre le panneau et le dos du radiateur. Un radiateur chauffe en grande partie par convection : l'air froid entre par le bas, se réchauffe et ressort par le haut. Si l'isolant touche le radiateur ou obstrue cet espace, le radiateur chauffe moins bien et vous perdez le bénéfice du panneau.",
  },
  {
    question: "Peut-on mettre un isolant derrière un radiateur électrique ?",
    answer:
      "Oui, sur un convecteur, un panneau rayonnant ou un radiateur à inertie fixé sur un mur extérieur, à condition de respecter les distances de sécurité indiquées par le fabricant et de ne jamais coller l'isolant contre l'appareil. Utilisez un produit dont la tenue en température est indiquée (au moins 80 °C) et ne masquez ni les grilles d'entrée et de sortie d'air ni la sonde de température de l'appareil.",
  },
  {
    question: "Faut-il démonter le radiateur pour poser l'isolant ?",
    answer:
      "Non, pas pour un panneau réfléchissant : il se glisse derrière le radiateur, éventuellement en deux morceaux, et se colle à l'aide d'une règle ou d'un manche à balai. Le démontage du radiateur n'est nécessaire que pour une vraie isolation du mur par l'intérieur, qui ajoute plusieurs centimètres d'épaisseur et impose de déplacer les fixations et de rallonger les tubes.",
  },
  {
    question: "L'isolation derrière un radiateur peut-elle provoquer de l'humidité ?",
    answer:
      "Le risque est faible avec un panneau mince, mais il existe sur un mur ancien qui présente déjà des remontées capillaires ou de la condensation : un film étanche plaqué contre la paroi peut empêcher le mur de sécher et faire apparaître des moisissures derrière le panneau. Si le mur est humide, traitez d'abord la cause de l'humidité avant de poser quoi que ce soit.",
  },
  {
    question: "Existe-t-il des aides pour l'isolation derrière un radiateur ?",
    answer:
      "Non, un panneau réfléchissant ne donne droit à aucune aide : c'est un petit équipement en vente libre. En revanche, l'isolation des murs par l'intérieur ou par l'extérieur, qui traite aussi la zone derrière les radiateurs, peut bénéficier des primes CEE (résistance thermique R ≥ 3,7 m².K/W) et de la TVA à 5,5 % lorsqu'elle est réalisée par une entreprise RGE.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Guide « Isoler sa maison » : répartition des déperditions thermiques d'un logement",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/isolation",
    date: "2025",
  },
  {
    name: "France Rénov' — Isolation des murs par l'intérieur et par l'extérieur, aides disponibles",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "Ministère de la Transition écologique — Fiche CEE BAR-EN-102 « Isolation des murs »",
    url: "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie",
    date: "2026",
  },
  {
    name: "Energy Saving Trust — Radiator reflector panels : gains estimés sur murs extérieurs non isolés",
    url: "https://energysavingtrust.org.uk",
    date: "2024",
  },
]
