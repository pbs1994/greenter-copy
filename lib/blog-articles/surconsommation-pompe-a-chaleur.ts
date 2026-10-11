// =============================================================================
// Données article : Surconsommation pompe à chaleur — diagnostic et solutions 2026
// Angle : "ma PAC consomme trop" — savoir si la consommation est anormale,
// identifier la cause (appoint, loi d'eau, dimensionnement, dégivrage, ECS,
// entretien, réglages, bâti) et la corriger. Complémentaire de
// "consommation-pompe-a-chaleur-maison-100m2" (consommation normale) et de
// "rendement-pompe-a-chaleur" (optimiser le COP), sans les cannibaliser.
// Sources : ADEME, décret n° 2020-912, France Rénov', fabricants
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Surconsommation pompe à chaleur : 8 causes et comment y remédier",
  subtitle:
    "Surconsommation pompe à chaleur : comment savoir si votre PAC consomme trop, trouver la cause (appoint, loi d'eau, entretien…) et la corriger. Guide 2026.",
  slug: "surconsommation-pompe-a-chaleur",
  date: "11 octobre 2026",
  dateISO: "2026-10-11",
  readingTime: 15,
  author: "Greenter",
}

// Consommation électrique attendue d'une PAC air-eau, maison de 100 m²
export const CONSO_NORMALE_TABLE = {
  columns: [
    { header: "Niveau d'isolation", key: "isolation" },
    { header: "Besoin de chauffage", key: "besoin" },
    { header: "Consommation PAC attendue", key: "conso", highlight: true },
    { header: "Seuil d'alerte", key: "alerte" },
  ],
  rows: [
    { isolation: "Maison récente / BBC", besoin: "≈ 5 000 kWh/an", conso: "1 400 – 1 700 kWh/an", alerte: "> 2 200 kWh/an" },
    { isolation: "Maison rénovée, bien isolée", besoin: "≈ 10 000 kWh/an", conso: "2 800 – 3 300 kWh/an", alerte: "> 4 300 kWh/an" },
    { isolation: "Maison ancienne, isolation moyenne", besoin: "≈ 15 000 kWh/an", conso: "4 300 – 5 000 kWh/an", alerte: "> 6 500 kWh/an" },
    { isolation: "Maison peu isolée", besoin: "≈ 20 000 kWh/an", conso: "6 700 – 8 000 kWh/an", alerte: "> 10 400 kWh/an" },
  ],
  caption:
    "Estimation Greenter pour le chauffage seul d'une maison de 100 m² en Île-de-France, avec un SCOP réel de 3 à 3,5 (2,5 à 3 pour la maison peu isolée équipée de radiateurs). Le seuil d'alerte correspond à environ +30 % au-dessus de la fourchette haute.",
}

// Symptômes, causes et solutions
export const DIAGNOSTIC_TABLE = {
  columns: [
    { header: "Symptôme constaté", key: "symptome" },
    { header: "Cause probable", key: "cause", highlight: true },
    { header: "Solution", key: "solution" },
  ],
  rows: [
    {
      symptome: "Pics de consommation par grand froid",
      cause: "Résistance d'appoint qui prend le relais trop souvent",
      solution: "Abaisser le seuil d'enclenchement de l'appoint, vérifier le dimensionnement",
    },
    {
      symptome: "Radiateurs brûlants, pièces surchauffées",
      cause: "Courbe de chauffe (loi d'eau) réglée trop haut",
      solution: "Baisser la pente de la courbe par paliers",
    },
    {
      symptome: "La PAC démarre et s'arrête toutes les quelques minutes",
      cause: "PAC surdimensionnée ou débit d'eau insuffisant",
      solution: "Ajuster la modulation, ajouter un ballon tampon si nécessaire",
    },
    {
      symptome: "Unité extérieure couverte de givre, dégivrages fréquents",
      cause: "Emplacement exposé, évaporateur encrassé ou manque de fluide",
      solution: "Nettoyage, contrôle de la charge en fluide, protection de l'unité",
    },
    {
      symptome: "Consommation élevée même en été",
      cause: "Production d'eau chaude sanitaire mal réglée (appoint électrique, anti-légionellose)",
      solution: "Revoir la température et la programmation du ballon",
    },
    {
      symptome: "Consommation en hausse d'année en année",
      cause: "Manque d'entretien : filtres, échangeurs, fuite de fluide",
      solution: "Visite d'entretien par un frigoriste certifié",
    },
  ],
  caption:
    "Correspondances les plus fréquentes constatées par nos techniciens lors des diagnostics de surconsommation en Île-de-France. Plusieurs causes se cumulent souvent.",
}

// Étapes de diagnostic
export const DIAGNOSTIC_STEPS = [
  {
    title: "Mesurer la consommation réelle de la PAC",
    detail:
      "Relevez votre consommation sur l'espace client de votre fournisseur ou via le compteur Linky, en comparant avec la même période de l'année précédente. Si votre PAC dispose d'un compteur d'énergie intégré, notez séparément l'énergie électrique consommée et l'énergie thermique produite : leur rapport donne votre COP réel.",
  },
  {
    title: "Comparer avec une consommation normale",
    detail:
      "Estimez le besoin de chauffage de votre logement et divisez-le par le SCOP de votre PAC. Une consommation supérieure de plus de 30 % à ce calcul, à rigueur climatique équivalente, signale une surconsommation de pompe à chaleur à investiguer.",
  },
  {
    title: "Consulter le compteur de la résistance d'appoint",
    detail:
      "La plupart des PAC air-eau indiquent dans leur menu le nombre d'heures de fonctionnement de l'appoint électrique. Plusieurs centaines d'heures par hiver en Île-de-France sont anormales : c'est l'une des premières causes de facture élevée.",
  },
  {
    title: "Vérifier la courbe de chauffe et les consignes",
    detail:
      "Notez la température de départ d'eau affichée par temps froid et la consigne d'ambiance. Avec un plancher chauffant, l'eau dépasse rarement 35 °C ; avec des radiateurs basse température, 45 à 50 °C. Une consigne d'ambiance supérieure à 20 °C augmente mécaniquement la facture.",
  },
  {
    title: "Inspecter l'unité extérieure",
    detail:
      "Vérifiez que la grille de l'évaporateur est propre, que rien n'obstrue la circulation d'air (haie, feuilles, neige) et que le givre disparaît bien après chaque cycle de dégivrage. Une couche de glace persistante est un signal d'alerte qui justifie l'intervention d'un technicien.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Comment savoir si ma pompe à chaleur consomme trop ?",
    answer:
      "Divisez le besoin de chauffage estimé de votre logement par le SCOP de votre PAC pour obtenir une consommation de référence. Pour une maison de 100 m² bien isolée, comptez environ 2 800 à 3 300 kWh d'électricité par an pour le chauffage. Si votre consommation dépasse ce calcul de plus de 30 % à hiver comparable, il y a probablement une surconsommation à diagnostiquer.",
  },
  {
    question: "Pourquoi ma pompe à chaleur consomme-t-elle autant en hiver ?",
    answer:
      "Par grand froid, le rendement d'une PAC air-eau baisse naturellement, mais une forte hausse vient le plus souvent de la résistance électrique d'appoint qui prend le relais : elle produit 1 kWh de chaleur pour 1 kWh d'électricité, contre 3 à 4 kWh pour la pompe à chaleur. Une courbe de chauffe trop haute ou une PAC sous-dimensionnée renforcent ce phénomène.",
  },
  {
    question: "La résistance d'appoint de ma PAC tourne souvent, est-ce normal ?",
    answer:
      "Non. En Île-de-France, une PAC correctement dimensionnée ne devrait solliciter son appoint que quelques jours par an, lors des épisodes de froid les plus intenses. Si l'appoint fonctionne plusieurs centaines d'heures par hiver, son seuil d'enclenchement est mal réglé ou la PAC est trop juste en puissance pour le logement.",
  },
  {
    question: "Une pompe à chaleur surdimensionnée consomme-t-elle plus ?",
    answer:
      "Oui. Une PAC trop puissante fonctionne par cycles courts : elle démarre, atteint rapidement la consigne, s'arrête, puis redémarre quelques minutes plus tard. Ces marches-arrêts fréquents dégradent le rendement et usent prématurément le compresseur. Les PAC Inverter limitent ce problème grâce à leur modulation, mais seulement dans une certaine plage de puissance.",
  },
  {
    question: "Le manque d'entretien peut-il provoquer une surconsommation de pompe à chaleur ?",
    answer:
      "Oui. Un évaporateur encrassé, des filtres colmatés, un circuit d'eau embouée ou une légère fuite de fluide frigorigène réduisent l'efficacité de la PAC, qui doit fonctionner plus longtemps pour fournir la même chaleur. L'entretien d'une PAC de 4 à 70 kW est d'ailleurs obligatoire tous les deux ans depuis le décret n° 2020-912.",
  },
  {
    question: "Quelle température régler pour éviter qu'une PAC consomme trop ?",
    answer:
      "Visez 19 °C dans les pièces de vie et 16 à 17 °C dans les chambres. Selon l'ADEME, chaque degré supplémentaire augmente la consommation de chauffage d'environ 7 %. Évitez aussi les fortes baisses de température la nuit avec une PAC : remonter de 4 ou 5 °C le matin sollicite souvent l'appoint électrique et annule le gain espéré.",
  },
  {
    question: "Une PAC air-air peut-elle aussi surconsommer ?",
    answer:
      "Oui, pour des raisons proches : filtres des unités intérieures encrassés, consigne trop élevée, unité extérieure mal placée ou en manque de fluide. Les filtres des splits intérieurs doivent être nettoyés toutes les deux à quatre semaines en période d'utilisation, un geste simple qui suffit souvent à retrouver une consommation normale.",
  },
  {
    question: "Mon installateur est-il responsable si ma PAC est mal dimensionnée ?",
    answer:
      "Il peut l'être. Un mauvais dimensionnement relève d'un défaut de conception. Dans l'année qui suit la réception, la garantie de parfait achèvement s'applique ; au-delà, la garantie décennale peut être mobilisée si le défaut rend l'installation impropre à sa destination, par exemple si le logement ne peut pas être chauffé correctement. Faites d'abord établir un diagnostic écrit par un professionnel indépendant.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Bien choisir et bien utiliser sa pompe à chaleur, guide pratique",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/chauffage",
    date: "2025",
  },
  {
    name: "Légifrance — Décret n° 2020-912 du 28 juillet 2020 relatif à l'entretien des pompes à chaleur",
    url: "https://www.legifrance.gouv.fr",
    date: "2020",
  },
  {
    name: "France Rénov' — Pompe à chaleur air-eau : fonctionnement, performance et aides",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "Commission de régulation de l'énergie — Tarifs réglementés de vente d'électricité",
    url: "https://www.cre.fr",
    date: "2026",
  },
]
