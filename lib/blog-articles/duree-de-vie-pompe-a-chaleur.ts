// =============================================================================
// Données article : Durée de vie d'une pompe à chaleur
// Sources : ademe.fr, france-renov.gouv.fr, anah.gouv.fr,
//           qualipac.fr, CSTB, fabricants (Atlantic, Daikin, Mitsubishi)
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Durée de vie d'une pompe à chaleur : tout ce qu'il faut savoir en 2026",
  subtitle:
    "Quelle est la durée de vie d'une pompe à chaleur ? Durée de vie moyenne par type (air-air, air-eau, géothermique), facteurs qui l'influencent, signes de fin de vie et conseils pour prolonger la longévité de votre PAC.",
  slug: "duree-de-vie-pompe-a-chaleur",
  date: "16 juin 2026",
  dateISO: "2026-06-16",
  readingTime: 13,
  author: "Greenter",
}

// Tableau comparatif : durée de vie par type de PAC
export const DUREE_VIE_TABLE = {
  columns: [
    { header: "Type de pompe à chaleur", key: "type" },
    { header: "Durée de vie moyenne", key: "duree", highlight: true },
    { header: "Durée maximale", key: "max" },
    { header: "Composant le plus fragile", key: "fragilite" },
  ],
  rows: [
    {
      type: "PAC air-air",
      duree: "15 à 20 ans",
      max: "20 à 25 ans (bien entretenue)",
      fragilite: "Compresseur (10–15 ans)",
    },
    {
      type: "PAC air-eau (aérothermique)",
      duree: "15 à 20 ans",
      max: "20 à 25 ans (bien entretenue)",
      fragilite: "Compresseur et échangeur",
    },
    {
      type: "PAC géothermique (sol/sol, sol/eau)",
      duree: "20 à 25 ans",
      max: "Jusqu'à 50 ans (sondes géothermiques)",
      fragilite: "Compresseur (20 ans), sondes très durables",
    },
    {
      type: "PAC eau/eau (nappe phréatique)",
      duree: "20 à 25 ans",
      max: "25 à 30 ans",
      fragilite: "Pompe de puisage et échangeur",
    },
  ],
  caption:
    "Sources : ADEME, fabricants (Atlantic, Daikin, Mitsubishi, Viessmann), retours d'expérience techniciens QualiPAC. La durée de vie réelle dépend fortement de l'entretien annuel et des conditions d'utilisation.",
}

// Tableau : facteurs qui influencent la durée de vie
export const FACTEURS_TABLE = {
  columns: [
    { header: "Facteur", key: "facteur" },
    { header: "Impact sur la longévité", key: "impact", highlight: true },
    { header: "Recommandation", key: "conseil" },
  ],
  rows: [
    {
      facteur: "Qualité de l'installation initiale",
      impact: "Très élevé — une installation mal dimensionnée réduit la durée de vie de 30 à 50 %",
      conseil: "Faire appel à un installateur certifié RGE QualiPAC",
    },
    {
      facteur: "Entretien annuel",
      impact: "Élevé — sans entretien, durée de vie divisée par 2",
      conseil: "Contrat de maintenance annuelle obligatoire (PAC > 4 kW)",
    },
    {
      facteur: "Dimensionnement (puissance adaptée)",
      impact: "Élevé — surdimensionnement = cycles courts = usure prématurée du compresseur",
      conseil: "Calcul des déperditions thermiques avant installation",
    },
    {
      facteur: "Conditions climatiques (zone H1/H2/H3)",
      impact: "Modéré — les PAC air-air subissent plus de stress thermique en zone H1",
      conseil: "Choisir une PAC adaptée aux températures minimales de votre région",
    },
    {
      facteur: "Intensité d'utilisation",
      impact: "Modéré — une PAC fonctionnant 24h/24 s'usera plus vite",
      conseil: "Programmer correctement la PAC, éviter les plages inutiles",
    },
    {
      facteur: "Qualité des composants (marque)",
      impact: "Modéré — les compresseurs Daikin/Mitsubishi durent généralement plus longtemps",
      conseil: "Comparer les garanties fabricant (5 à 10 ans sur le compresseur selon marque)",
    },
    {
      facteur: "Qualité de l'eau (PAC air-eau/géo)",
      impact: "Modéré — calcaire et corrosion accélèrent la dégradation des échangeurs",
      conseil: "Traitement de l'eau du circuit, purges régulières",
    },
  ],
  caption:
    "Sources : guides techniques ADEME, fiches techniques fabricants Atlantic et Daikin, retours d'expérience installateurs QualiPAC Île-de-France.",
}

// Tableau : calendrier d'entretien annuel
export const ENTRETIEN_TABLE = {
  columns: [
    { header: "Opération", key: "operation" },
    { header: "Fréquence", key: "frequence", highlight: true },
    { header: "Qui intervient ?", key: "qui" },
    { header: "Coût estimé", key: "cout" },
  ],
  rows: [
    {
      operation: "Nettoyage des filtres à air (unité intérieure)",
      frequence: "Tous les 1 à 3 mois",
      qui: "Propriétaire",
      cout: "Gratuit",
    },
    {
      operation: "Vérification du niveau de fluide frigorigène",
      frequence: "Tous les ans",
      qui: "Technicien certifié",
      cout: "Inclus dans contrat maintenance",
    },
    {
      operation: "Nettoyage de l'unité extérieure (ventilateur, ailettes)",
      frequence: "1 à 2 fois par an",
      qui: "Propriétaire + technicien",
      cout: "Gratuit (auto) + maintenance",
    },
    {
      operation: "Vérification des connexions électriques et des capteurs",
      frequence: "Annuelle",
      qui: "Technicien certifié",
      cout: "Inclus dans contrat maintenance",
    },
    {
      operation: "Contrôle du COP et des pressions (diagnostic performance)",
      frequence: "Annuelle",
      qui: "Technicien certifié",
      cout: "Inclus dans contrat maintenance",
    },
    {
      operation: "Vérification du circuit hydraulique (PAC air-eau/géo)",
      frequence: "Annuelle",
      qui: "Technicien certifié",
      cout: "Inclus dans contrat maintenance",
    },
    {
      operation: "Entretien obligatoire légal (PAC > 4 kW, fluide frigorigène)",
      frequence: "Tous les 2 ans (loi)",
      qui: "Technicien certifié avec attestation",
      cout: "150 à 300 €/an en contrat",
    },
  ],
  caption:
    "L'entretien annuel d'une PAC coûte entre 150 et 300 €/an en contrat de maintenance. Il est obligatoire pour les installations > 4 kW depuis le décret du 1er janvier 2023. Un entretien régulier prolonge considérablement la durée de vie.",
}

// Tableau : signes de fin de vie
export const SIGNES_FIN_VIE = [
  {
    signe: "Baisse du COP ou des performances de chauffage",
    explication: "La PAC consomme plus d'électricité pour produire la même quantité de chaleur. Signe d'usure du compresseur ou de fuite de fluide frigorigène.",
    urgence: "Modérée",
  },
  {
    signe: "Pannes répétées (plus de 2 à 3 par an)",
    explication: "Les pièces vieillissantes tombent en panne en cascade. Le coût total de réparation devient rapidement supérieur à celui d'un remplacement.",
    urgence: "Haute",
  },
  {
    signe: "Bruits inhabituels (vibrations, cliquetis, sifflement)",
    explication: "Vibrations du compresseur en fin de vie, roulement de ventilateur usé, ou détente anormale du fluide frigorigène.",
    urgence: "Modérée à haute",
  },
  {
    signe: "Consommation électrique en forte hausse",
    explication: "Une PAC qui perd en efficacité compense en tirant plus de courant. Surveillez votre facture EDF en référence à l'année précédente.",
    urgence: "Modérée",
  },
  {
    signe: "Givre permanent sur l'unité extérieure (hors dégivrage normal)",
    explication: "Un givrage excessif peut indiquer un manque de fluide, un capteur défaillant ou un compresseur affaibli.",
    urgence: "Haute",
  },
  {
    signe: "PAC de plus de 20 ans utilisant le R-22 ou R-410A",
    explication: "Les fluides frigorigènes anciens (R-22 interdit depuis 2015, R-410A en cours de restriction) ne peuvent plus être rechargés légalement et la PAC doit être remplacée.",
    urgence: "Haute — remplacement obligatoire",
  },
]

// Exemple de calcul : réparation vs remplacement
export const EXEMPLE_CALCUL = {
  title: "Réparation ou remplacement ? Exemple pour une PAC air-eau de 12 ans",
  contexte: "PAC air-eau Atlantic Alfea de 12 kW, installée en 2014, compresseur défaillant.",
  option_reparation: {
    label: "Option 1 : Réparation",
    lines: [
      { label: "Remplacement compresseur (pièce + main-d'œuvre)", amount: "2 800 €" },
      { label: "Durée de vie restante estimée", amount: "3 à 5 ans" },
      { label: "Coût annuel de la réparation", amount: "560 à 930 €/an" },
    ],
  },
  option_remplacement: {
    label: "Option 2 : Remplacement par une PAC neuve",
    lines: [
      { label: "Nouvelle PAC air-eau 12 kW (fourniture + pose)", amount: "12 000 €" },
      { label: "MaPrimeRénov' (ménage intermédiaire)", amount: "− 4 000 €", isDeduction: true },
      { label: "Coup de pouce CEE", amount: "− 1 500 €", isDeduction: true },
      { label: "Reste à charge", amount: "6 500 €" },
      { label: "Durée de vie de la nouvelle PAC", amount: "15 à 20 ans" },
      { label: "Économies d'énergie vs ancienne PAC usée (COP amélioré)", amount: "400 €/an" },
    ],
    roi: "Retour sur investissement en 9 à 11 ans, grâce aux économies d'énergie",
  },
  conclusion: "Si le coût de réparation dépasse 30–40 % du prix d'une PAC neuve, le remplacement est presque toujours plus rentable sur 5 ans.",
}

// FAQ rich snippets
export const FAQ_ITEMS = [
  {
    question: "Quelle est la durée de vie d'une pompe à chaleur ?",
    answer:
      "La durée de vie moyenne d'une pompe à chaleur est de 15 à 20 ans pour les modèles aérothermiques (air-air et air-eau), et de 20 à 25 ans pour les PAC géothermiques. Bien entretenue, une pompe à chaleur de bonne qualité peut atteindre 25 ans de fonctionnement. Les sondes géothermiques, elles, peuvent durer jusqu'à 50 ans.",
  },
  {
    question: "Quelle est la durée de vie d'une pompe à chaleur air-air ?",
    answer:
      "Une pompe à chaleur air-air a une durée de vie de 15 à 20 ans en moyenne. Son composant le plus fragile est le compresseur, qui dure généralement 10 à 15 ans. Avec un entretien annuel régulier — nettoyage des filtres, vérification du fluide frigorigène — la durée de vie d'une PAC air-air peut dépasser 20 ans.",
  },
  {
    question: "Quelle est la durée de vie d'une pompe à chaleur air-eau ?",
    answer:
      "La durée de vie d'une pompe à chaleur air-eau est de 15 à 20 ans en moyenne, parfois 25 ans pour les modèles bien entretenus. Les composants les plus exposés à l'usure sont le compresseur et l'échangeur thermique. Un entretien annuel par un technicien certifié QualiPAC est indispensable pour prolonger sa durée de vie.",
  },
  {
    question: "Quelle est la durée de vie d'une pompe à chaleur géothermique ?",
    answer:
      "La pompe à chaleur géothermique a généralement une durée de vie de 20 à 25 ans pour la partie mécanique (compresseur, circulateur). Les sondes géothermiques enterrées dans le sol ont une longévité bien supérieure : elles peuvent durer 50 ans ou plus, car elles ne comportent pas de pièces mobiles et sont protégées des intempéries.",
  },
  {
    question: "Comment prolonger la durée de vie d'une pompe à chaleur ?",
    answer:
      "Pour prolonger la durée de vie de votre pompe à chaleur : (1) faites réaliser un entretien annuel par un technicien certifié, (2) nettoyez les filtres à air tous les 1 à 3 mois, (3) dégagez l'unité extérieure de toute végétation, (4) évitez les cycles très courts en programmant correctement la PAC, (5) vérifiez l'absence de fuite de fluide frigorigène. Un entretien régulier peut considérablement allonger sa durée de vie.",
  },
  {
    question: "Comment savoir si ma pompe à chaleur arrive en fin de vie ?",
    answer:
      "Les signes qu'une pompe à chaleur arrive en fin de vie sont : pannes répétées (plus de 2 par an), baisse notable du COP (la maison chauffe moins bien à consommation égale), bruits inhabituels (vibrations, cliquetis), givre permanent sur l'unité extérieure hors cycle de dégivrage, ou consommation électrique en forte hausse. Si votre PAC a plus de 18–20 ans et présente ces symptômes, un remplacement est probablement plus rentable qu'une réparation.",
  },
  {
    question: "À quel âge faut-il remplacer sa pompe à chaleur ?",
    answer:
      "Il est conseillé d'envisager le remplacement de sa pompe à chaleur à partir de 15–18 ans en cas de panne majeure, ou systématiquement à partir de 20–25 ans. La règle pratique : si le coût de réparation dépasse 30 à 40 % du prix d'une PAC neuve, le remplacement est presque toujours plus rentable. En 2026, MaPrimeRénov' finance jusqu'à 4 000 € pour un remplacement vers une PAC air-eau.",
  },
  {
    question: "L'entretien est-il obligatoire pour une pompe à chaleur ?",
    answer:
      "Oui. Depuis le décret du 1er janvier 2023, l'entretien annuel est obligatoire pour toutes les pompes à chaleur de plus de 4 kW contenant du fluide frigorigène. Cet entretien doit être réalisé par un technicien titulaire d'une attestation d'aptitude. Un contrat de maintenance annuel coûte entre 150 et 300 €/an et constitue le meilleur investissement pour prolonger la durée de vie de votre PAC.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Guide des pompes à chaleur : fonctionnement, entretien et durée de vie",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' PAC 2026 : barèmes et conditions",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Ministère de la Transition écologique — Décret entretien des PAC (janvier 2023)",
    url: "https://www.ecologie.gouv.fr",
    date: "2023",
  },
  {
    name: "Atlantic — Documentation technique : durée de vie et garanties PAC Alfea",
    url: "https://www.atlantic.fr",
    date: "2025",
  },
  {
    name: "Daikin — Guide d'entretien et de maintenance des pompes à chaleur résidentielles",
    url: "https://www.daikin.fr",
    date: "2025",
  },
  {
    name: "QUALIPAC — Recommandations pour l'installation et la maintenance des PAC",
    url: "https://www.qualipac.fr",
    date: "2025",
  },
]
