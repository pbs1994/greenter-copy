// =============================================================================
// Données article : Pompe à chaleur pour chauffage au sol — guide 2026
// Sources : ADEME, france-renov.gouv.fr, CAPEB, CSTB
// Date de recherche : mai 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à chaleur pour chauffage au sol : guide complet 2026",
  subtitle:
    "PAC air-eau et plancher chauffant hydraulique : pourquoi cette combinaison est la plus efficace, comment l'installer, quel prix et quelles aides MaPrimeRénov' 2026.",
  slug: "pompe-a-chaleur-chauffage-au-sol",
  date: "31 mai 2026",
  dateISO: "2026-05-31",
  readingTime: 14,
  author: "Greenter",
}

// Tableau comparatif des émetteurs de chaleur avec PAC
export const EMETTEUR_TABLE = {
  columns: [
    { header: "Émetteur de chaleur", key: "emetteur" },
    { header: "Temp. eau requise (°C)", key: "temperature" },
    { header: "COP PAC air-eau", key: "cop", highlight: true },
    { header: "Confort thermique", key: "confort" },
    { header: "Coût installation approx.", key: "cout", highlight: true },
  ],
  rows: [
    {
      emetteur: "Plancher chauffant hydraulique",
      temperature: "28–35 °C",
      cop: "4,0–5,0",
      confort: "★★★★★ — répartition uniforme",
      cout: "14 000–22 000 €",
    },
    {
      emetteur: "Radiateurs basse température",
      temperature: "45–55 °C",
      cop: "3,0–3,5",
      confort: "★★★★☆ — chaleur directionnelle",
      cout: "10 000–16 000 €",
    },
    {
      emetteur: "Ventilo-convecteurs (fan-coils)",
      temperature: "40–50 °C",
      cop: "3,0–3,8",
      confort: "★★★☆☆ — bruit, courants d'air",
      cout: "12 000–18 000 €",
    },
    {
      emetteur: "Radiateurs haute température",
      temperature: "65–75 °C",
      cop: "2,0–2,5",
      confort: "★★★☆☆ — chaleur concentrée",
      cout: "8 000–12 000 €",
    },
    {
      emetteur: "Plancher chauffant électrique",
      temperature: "N/A (résistance)",
      cop: "1,0 (pas de PAC)",
      confort: "★★★★☆ — confort similaire",
      cout: "8 000–15 000 €",
    },
  ],
  caption:
    "COP mesuré à 7 °C extérieur / températures nominales, zone H2 Île-de-France. Coûts TTC fourniture + pose, avant aides. Sources : ADEME, CAPEB, CSTB 2026.",
}

// Tableau des revêtements de sol compatibles
export const REVETEMENT_TABLE = {
  columns: [
    { header: "Revêtement de sol", key: "revetement" },
    { header: "Compatibilité PCH + PAC", key: "compatibilite", highlight: true },
    { header: "Résistance thermique max.", key: "resistance" },
    { header: "Remarques clés", key: "remarques" },
  ],
  rows: [
    {
      revetement: "Carrelage / grès cérame",
      compatibilite: "Idéal ★★★★★",
      resistance: "≤ 0,04 m².K/W",
      remarques: "Meilleure diffusion — référence pour PCH",
    },
    {
      revetement: "Béton ciré / chape lissée",
      compatibilite: "Excellent ★★★★★",
      resistance: "≤ 0,05 m².K/W",
      remarques: "Design moderne, très bonne conductivité",
    },
    {
      revetement: "Marbre / pierre naturelle",
      compatibilite: "Excellent ★★★★★",
      resistance: "≤ 0,04 m².K/W",
      remarques: "Conductivité maximale — coût élevé",
    },
    {
      revetement: "Parquet contrecollé",
      compatibilite: "Bon ★★★★☆",
      resistance: "≤ 0,15 m².K/W",
      remarques: "Marquage « compatible chauffage au sol » obligatoire",
    },
    {
      revetement: "Parquet massif (< 10 mm)",
      compatibilite: "Acceptable ★★★☆☆",
      resistance: "≤ 0,10 m².K/W",
      remarques: "Essence peu dense (chêne, érable) recommandée",
    },
    {
      revetement: "Moquette / linoléum épais",
      compatibilite: "Déconseillé ★★☆☆☆",
      resistance: "> 0,15 m².K/W",
      remarques: "Freine la diffusion — montée en temp. lente",
    },
  ],
  caption:
    "Résistance thermique selon NF EN 1264. Un revêtement trop isolant (R > 0,15 m².K/W) oblige à monter la température d'eau de chauffage, ce qui dégrade le COP de la PAC. Sources : CSTB, DTU 65.14.",
}

// Tableau des aides financières
export const AIDES_TABLE = {
  columns: [
    { header: "Aide", key: "aide" },
    { header: "Bénéficiaires", key: "beneficiaires" },
    { header: "Montant pour PAC air-eau", key: "montant", highlight: true },
    { header: "Conditions", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' Bleu",
      beneficiaires: "Très modestes",
      montant: "Jusqu'à 11 000 €",
      conditions: "Artisan RGE QualiPAC, dossier avant travaux",
    },
    {
      aide: "MaPrimeRénov' Jaune",
      beneficiaires: "Ménages modestes",
      montant: "Jusqu'à 8 000 €",
      conditions: "Artisan RGE QualiPAC, dossier avant travaux",
    },
    {
      aide: "MaPrimeRénov' Violet",
      beneficiaires: "Revenus intermédiaires",
      montant: "Jusqu'à 4 000 €",
      conditions: "Artisan RGE QualiPAC, dossier avant travaux",
    },
    {
      aide: "Prime CEE Coup de Pouce",
      beneficiaires: "Tous ménages",
      montant: "2 000–4 000 €",
      conditions: "Cumulable avec MaPrimeRénov', artisan partenaire CEE",
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
      montant: "Taux réduit sur toute la facture",
      conditions: "Automatique avec artisan RGE",
    },
  ],
  caption:
    "Aides cumulables sous conditions. La PAC air-eau + plancher chauffant est éligible au titre de la catégorie « système de chauffage » de MaPrimeRénov' 2026. Sources : france-renov.gouv.fr, ANAH.",
}

// Exemple de calcul chiffré
export const EXAMPLE_CALCULATION = {
  title:
    "Exemple chiffré : PAC air-eau 10 kW + plancher chauffant 100 m², ménage Jaune (2 pers., RFR < 37 411 €)",
  lines: [
    { label: "PAC air-eau 10 kW (unité + installation)", amount: "14 000 €" },
    { label: "Plancher chauffant hydraulique 100 m²", amount: "7 000 €" },
    { label: "Total travaux TTC (TVA 5,5 % incluse)", amount: "21 000 €" },
    { label: "MaPrimeRénov' Jaune (PAC air-eau)", amount: "− 8 000 €" },
    { label: "Prime CEE Coup de Pouce", amount: "− 3 000 €" },
  ],
  total: { label: "Reste à charge final", amount: "≈ 10 000 €" },
  savings: "60 % d'économies sur la facture vs chaudière gaz",
  roi: "Retour sur investissement : 7 à 10 ans",
}

// Étapes pour bien réussir son installation PAC + plancher chauffant
export const TIPS_STEPS = [
  {
    title: "Réaliser un bilan thermique DTU 65.16 avant tout dimensionnement",
    detail:
      "Le bilan thermique détermine les déperditions de chaque pièce et la puissance PAC nécessaire. Un logement de 100 m² classé DPE C nécessite 7 à 9 kW de puissance PAC — mais ce chiffre monte à 12 à 16 kW pour un DPE E. Ce calcul conditionne aussi le débit dans chaque circuit de plancher chauffant. Un artisan RGE QualiPAC l'inclut systématiquement dans son devis.",
  },
  {
    title: "Choisir une PAC basse température adaptée au plancher chauffant",
    detail:
      "Pour optimiser le COP avec un plancher chauffant hydraulique, choisissez une PAC air-eau dite « basse température » (35 °C), avec un SCOP ≥ 4,5 en régime A7W35. Les PAC « haute température » (55–65 °C) sont surdimensionnées pour ce système et moins efficaces en fonctionnement réel. Vérifiez la fiche technique : le COP doit être mesuré à 35 °C de sortie d'eau, pas à 45 °C.",
  },
  {
    title: "Concevoir le circuit de chauffage au sol avec un zonage par pièce",
    detail:
      "Un plancher chauffant hydraulique bien conçu comporte un collecteur central (nourrice) alimentant des boucles de tuyaux dédiées à chaque pièce. Ce zonage permet de régler la température pièce par pièce via des têtes thermostatiques motorisées — la salle de bain peut être à 22 °C pendant que les chambres restent à 19 °C. L'espacement des tuyaux (10 à 20 cm) détermine la puissance émissive du sol.",
  },
  {
    title: "Sélectionner le revêtement de sol compatible avec le plancher chauffant",
    detail:
      "Choisissez un revêtement dont la résistance thermique est inférieure à 0,15 m².K/W. Idéalement, carrelage, béton ciré ou parquet contrecollé marqué « compatible chauffage par le sol ». Évitez les moquettes épaisses et les parquets massifs non adaptés : ils créent un écran thermique entre le sol et la pièce, forcent à monter la température d'eau de chauffage et dégradent le COP de la PAC.",
  },
  {
    title: "Déposer le dossier MaPrimeRénov' avant de signer les devis",
    detail:
      "MaPrimeRénov' et les primes CEE doivent être demandées avant le début des travaux. Un artisan RGE QualiPAC sérieux dépose le dossier pour vous et déduit directement l'aide sur votre facture. Le dossier comprend le devis détaillé avec la puissance PAC et le certificat SCOP — deux éléments vérifiés par l'ANAH lors de l'instruction.",
  },
  {
    title: "Régler la courbe de chauffe après mise en service pour optimiser le COP",
    detail:
      "La courbe de chauffe définit la température de l'eau de chauffage en fonction de la température extérieure. Une courbe trop haute (eau à 40 °C pour du plancher chauffant prévu à 30 °C) dégrade le COP de 15 à 25 %. Après installation, un technicien doit régler cette courbe sur 2 à 3 semaines en condition réelle d'hiver. C'est la mise au point qui garantit les économies annoncées.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question:
      "Est-ce qu'une pompe à chaleur est compatible avec le chauffage au sol ?",
    answer:
      "Oui, et c'est même la combinaison idéale. Une pompe à chaleur air-eau produit de l'eau chaude à 28–35 °C, précisément la température requise par un plancher chauffant hydraulique. Cette adéquation permet d'atteindre un COP de 4,0 à 5,0 — signifiant que chaque kilowatt d'électricité produit 4 à 5 kWh de chaleur. Avec des radiateurs, la PAC doit monter l'eau à 55–65 °C, ce qui divise le COP par deux.",
  },
  {
    question:
      "Quelle température d'eau pour un plancher chauffant avec une pompe à chaleur ?",
    answer:
      "La température de l'eau de chauffage d'un plancher chauffant hydraulique alimenté par une PAC est généralement de 28 à 35 °C. La température de surface du sol reste alors entre 19 et 26 °C — agréable à marcher pieds nus. La réglementation (EN 1264) limite la température de surface à 29 °C dans les pièces de vie et 33 °C dans les salles de bain. Ces contraintes sont toujours respectées avec une PAC bien réglée.",
  },
  {
    question: "Quel est le prix d'une pompe à chaleur avec chauffage au sol ?",
    answer:
      "Le coût total d'une PAC air-eau + plancher chauffant hydraulique se situe entre 14 000 et 25 000 € TTC pour une maison de 80 à 120 m², pose comprise. La PAC représente 8 000 à 15 000 € selon la puissance et la marque. Le plancher chauffant hydraulique coûte entre 40 et 80 €/m² de surface chauffée (pose de la chape comprise). Après MaPrimeRénov' et prime CEE, le reste à charge descend à 8 000–15 000 € selon les revenus du ménage.",
  },
  {
    question:
      "Peut-on installer une pompe à chaleur sur un plancher chauffant existant ?",
    answer:
      "Oui, c'est tout à fait possible si le plancher chauffant est hydraulique (tuyaux dans la chape). La PAC air-eau se connecte directement au circuit de chauffage existant en remplacement de la chaudière — c'est une simple substitution de la source de chaleur. L'artisan vérifie la compatibilité du collecteur, l'état des tuyaux et l'épaisseur de la chape. Si le plancher chauffant est électrique (câbles résistants), la PAC air-eau ne peut pas s'y connecter — il faudrait installer un nouveau circuit hydraulique.",
  },
  {
    question:
      "Quelle pompe à chaleur choisir pour un plancher chauffant hydraulique ?",
    answer:
      "Pour un plancher chauffant hydraulique, choisissez une PAC air-eau basse température avec un SCOP ≥ 4,5 en régime A7W35 (7 °C extérieur, 35 °C eau de départ). Les grandes marques fiables : Daikin Altherma, Mitsubishi Ecodan, Atlantic Alféa, Vaillant aroTHERM, Viessmann Vitocal. Évitez les PAC air-air (climateurs réversibles) : elles ne produisent pas d'eau chaude et ne peuvent pas alimenter un circuit hydraulique.",
  },
  {
    question:
      "Le plancher chauffant peut-il aussi rafraîchir en été avec une PAC réversible ?",
    answer:
      "Oui, c'est l'une des fonctions les plus appréciées du plancher chauffant hydraulique couplé à une PAC réversible : le « plancher chauffant rafraîchissant » (PCR). En été, la PAC fait circuler de l'eau fraîche (16–18 °C) dans les tuyaux du sol, ce qui absorbe doucement la chaleur de la pièce par rayonnement. Le résultat est une sensation de fraîcheur homogène sans courant d'air ni bruit. Attention : il faut un système de gestion du point de rosée pour éviter la condensation sur le sol.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Pompes à chaleur : performances et compatibilité avec les émetteurs, 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' : aides pour les systèmes de chauffage 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "CSTB — Norme NF EN 1264 : systèmes de chauffage par le sol, conception et dimensionnement",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "CAPEB — Observatoire des prix de la rénovation énergétique, pompes à chaleur et plancher chauffant",
    url: "https://www.capeb.fr",
    date: "2026",
  },
]
