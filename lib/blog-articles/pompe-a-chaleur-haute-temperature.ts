// =============================================================================
// Données article : Pompe à chaleur haute température
// Angle : quand une PAC haute température est vraiment nécessaire (radiateurs
// fonte, maison peu isolée), technologies (R290, bi-étagée, CO2), rendement à
// 65 °C, prix, aides et alternatives (radiateurs, isolation, loi d'eau).
// Sources : norme NF EN 442 (puissance des radiateurs), NF EN 14825 (SCOP),
// ADEME, economie.gouv.fr (MaPrimeRénov'), fiches fabricants R290 2025-2026
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à chaleur haute température : radiateurs en fonte, prix et rendement",
  subtitle:
    "Pompe à chaleur haute température : quand elle est utile, avec quels radiateurs, quel rendement à 65 °C, quel prix et quelles aides en 2026. Et les alternatives.",
  slug: "pompe-a-chaleur-haute-temperature",
  date: "8 novembre 2026",
  dateISO: "2026-11-08",
  readingTime: 13,
  author: "Greenter",
}

export const NIVEAUX_TABLE = {
  columns: [
    { header: "Type de PAC", key: "type" },
    { header: "Température d'eau", key: "temp" },
    { header: "Émetteurs adaptés", key: "emetteurs" },
    { header: "SCOP indicatif", key: "scop", highlight: true },
    { header: "Prix posé TTC", key: "prix" },
  ],
  rows: [
    { type: "Basse température", temp: "35 à 45 °C", emetteurs: "Plancher chauffant, radiateurs basse température", scop: "4 à 5", prix: "10 000 à 15 000 €" },
    { type: "Moyenne température", temp: "45 à 55 °C", emetteurs: "Radiateurs acier ou fonte bien dimensionnés", scop: "3,3 à 4", prix: "11 000 à 16 000 €" },
    { type: "Haute température", temp: "60 à 75 °C", emetteurs: "Radiateurs fonte ou acier d'une maison peu isolée", scop: "2,6 à 3,3", prix: "14 000 à 20 000 €" },
  ],
  caption:
    "Ordres de grandeur pour une maison de 100 à 140 m² en Île-de-France, PAC air-eau avec ballon d'eau chaude, pose par une entreprise RGE, TVA à 5,5 %. Le SCOP réel dépend de la loi d'eau et de la température réellement demandée au fil de la saison.",
}

export const RADIATEUR_TABLE = {
  columns: [
    { header: "Température moyenne de l'eau", key: "temp" },
    { header: "Puissance délivrée", key: "puissance", highlight: true },
    { header: "Exemple : radiateur de 1 500 W nominal", key: "exemple" },
  ],
  rows: [
    { temp: "70 °C (régime chaudière ancien)", puissance: "100 %", exemple: "1 500 W" },
    { temp: "60 °C", puissance: "≈ 75 %", exemple: "≈ 1 120 W" },
    { temp: "50 °C", puissance: "≈ 51 %", exemple: "≈ 770 W" },
    { temp: "40 °C", puissance: "≈ 30 %", exemple: "≈ 450 W" },
  ],
  caption:
    "Puissance d'un radiateur selon la norme NF EN 442, pour une pièce à 20 °C, exposant 1,3. Ce calcul ne vaut que pour le jour le plus froid : le reste de l'hiver, la maison a besoin de beaucoup moins de puissance, et la PAC peut travailler plus bas.",
}

export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'une pompe à chaleur haute température ?",
    answer:
      "C'est une pompe à chaleur air-eau ou eau-eau capable de produire de l'eau de chauffage à 60, 65, voire 75 °C, contre 35 à 55 °C pour un modèle classique. Elle permet de garder des radiateurs dimensionnés pour une ancienne chaudière, sans les remplacer, dans une maison encore peu isolée.",
  },
  {
    question: "Une pompe à chaleur haute température est-elle obligatoire avec des radiateurs en fonte ?",
    answer:
      "Non, c'est une idée reçue. Les radiateurs en fonte sont souvent volumineux et fonctionnent très bien à 50 ou 55 °C si la maison a été isolée. La haute température devient nécessaire quand les radiateurs sont petits par rapport aux pièces, ou quand la maison n'a pratiquement pas d'isolation.",
  },
  {
    question: "Quel est le prix d'une pompe à chaleur haute température ?",
    answer:
      "Comptez 14 000 à 20 000 € TTC posée pour une maison de 100 à 140 m², ballon d'eau chaude compris, soit 2 000 à 4 000 € de plus qu'une PAC moyenne température. Elle bénéficie des mêmes aides que toute PAC air-eau : MaPrimeRénov', prime CEE, TVA à 5,5 % et éco-PTZ.",
  },
  {
    question: "Une PAC haute température consomme-t-elle plus ?",
    answer:
      "Oui, à chaleur égale. Plus l'eau doit être chaude, plus le compresseur travaille. Son rendement saisonnier se situe autour de 2,6 à 3,3, contre 3,3 à 4 pour une PAC moyenne température. Elle reste deux à trois fois plus économique qu'une chaudière fioul ou que des convecteurs électriques.",
  },
  {
    question: "Quel fluide pour une pompe à chaleur haute température ?",
    answer:
      "La plupart des modèles récents utilisent le R290, c'est-à-dire du propane, qui atteint 70 à 75 °C avec un seul compresseur et a un très faible impact climatique. D'autres utilisent deux circuits en cascade. Les PAC au CO2 (R744) atteignent 90 °C mais sont surtout utilisées pour l'eau chaude sanitaire.",
  },
  {
    question: "Comment savoir si ma maison a besoin d'une PAC haute température ?",
    answer:
      "Faites un test pendant une semaine froide : baissez la température de départ de votre chaudière à 55 °C. Si toutes les pièces restent confortables, une PAC moyenne température suffit. Sinon, notez les pièces qui refroidissent. Il suffit souvent de remplacer un ou deux radiateurs trop petits.",
  },
  {
    question: "Peut-on garder ses radiateurs en fonte avec une pompe à chaleur ?",
    answer:
      "Dans la grande majorité des cas, oui. Il faut seulement les désembouer, vérifier qu'ils sont assez grands pour la température d'eau retenue et laisser leurs robinets ouverts. Les radiateurs en fonte ont même un avantage : leur forte inertie lisse les cycles de la pompe à chaleur et améliore le confort.",
  },
]

export const SOURCES = [
  {
    name: "NF EN 442 : radiateurs et convecteurs, méthode de détermination de la puissance thermique",
    url: "https://www.boutique.afnor.org",
    date: "2015",
  },
  {
    name: "NF EN 14825 : pompes à chaleur, essais et détermination des performances saisonnières",
    url: "https://www.boutique.afnor.org",
    date: "2022",
  },
  {
    name: "ADEME : la pompe à chaleur air-eau en rénovation",
    url: "https://agirpourlatransition.ademe.fr",
    date: "2026",
  },
  {
    name: "Ministère de l'Économie : MaPrimeRénov' parcours par geste, critères de performance des PAC",
    url: "https://www.economie.gouv.fr/particuliers/faire-des-economies-denergie/maprimerenov-parcours-par-geste-la-prime-pour-la-renovation-energetique",
    date: "2026",
  },
]
