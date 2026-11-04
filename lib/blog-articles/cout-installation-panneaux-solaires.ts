// =============================================================================
// Données article : Coût d'installation des panneaux solaires (2026)
// Angle : ce que coûte vraiment une installation photovoltaïque posée sur une
// maison en 2026, par puissance (3 à 9 kWc), poste par poste (modules,
// onduleur, fixations, pose, démarches), frais annexes oubliés des devis,
// aides restantes depuis la suppression de la prime (juin 2026) et lecture
// de la rentabilité. Chiffres cohérents avec avantages / taille / orientation.
// Sources : CRE, arrêté du 1er juin 2026, BOFiP TVA 5,5 %, photovoltaique.info
// (Hespul), PVGIS (JRC), Consuel, Enedis
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Coût d'installation des panneaux solaires en 2026 : prix réels et détail du devis",
  subtitle:
    "Coût d'installation des panneaux solaires en 2026 : prix pour 3, 6 ou 9 kWc, répartition du devis, frais annexes, aides restantes et rentabilité après la baisse du rachat.",
  slug: "cout-installation-panneaux-solaires",
  date: "4 novembre 2026",
  dateISO: "2026-11-04",
  readingTime: 15,
  author: "Greenter",
}

// Prix par puissance
export const PRIX_PUISSANCE_TABLE = {
  columns: [
    { header: "Puissance", key: "puissance" },
    { header: "Panneaux", key: "panneaux" },
    { header: "Prix posé TTC", key: "prix", highlight: true },
    { header: "Prix par kWc", key: "parkwc" },
    { header: "Production en Île-de-France", key: "production" },
  ],
  rows: [
    { puissance: "3 kWc", panneaux: "7", prix: "7 000 à 9 500 €", parkwc: "2 300 à 3 200 €", production: "≈ 3 300 kWh/an" },
    { puissance: "4,5 kWc", panneaux: "10 à 11", prix: "9 000 à 12 000 €", parkwc: "2 000 à 2 700 €", production: "≈ 4 900 kWh/an" },
    { puissance: "6 kWc", panneaux: "14", prix: "11 000 à 15 000 €", parkwc: "1 800 à 2 500 €", production: "≈ 6 600 kWh/an" },
    { puissance: "9 kWc", panneaux: "21", prix: "15 500 à 20 000 €", parkwc: "1 700 à 2 200 €", production: "≈ 9 900 kWh/an" },
  ],
  caption:
    "Fourchettes relevées sur des devis d'installateurs RGE QualiPV en 2026, pose en surimposition sur toiture en tuiles, TVA à 5,5 % incluse, démarches comprises. Panneaux d'environ 430 Wc. Production estimée pour une toiture sud à sud-ouest inclinée à 30°, sans ombrage, environ 1 100 kWh par kWc et par an.",
}

// Répartition d'un devis
export const REPARTITION_TABLE = {
  columns: [
    { header: "Poste du devis", key: "poste" },
    { header: "Part du prix", key: "part", highlight: true },
    { header: "Montant pour 3 kWc à 7 500 €", key: "montant" },
    { header: "Ce qui fait varier le prix", key: "variation" },
  ],
  rows: [
    { poste: "Panneaux photovoltaïques", part: "20 à 25 %", montant: "1 500 à 1 900 €", variation: "Marque, rendement, garantie produit (12 à 30 ans)" },
    { poste: "Onduleur ou micro-onduleurs", part: "12 à 18 %", montant: "900 à 1 350 €", variation: "Central ou micro-onduleurs, monophasé ou triphasé" },
    { poste: "Système de fixation", part: "8 à 12 %", montant: "600 à 900 €", variation: "Type de tuile, surimposition ou intégration" },
    { poste: "Main-d'œuvre et sécurité", part: "25 à 30 %", montant: "1 900 à 2 250 €", variation: "Hauteur, pente, accès, échafaudage" },
    { poste: "Matériel électrique", part: "6 à 10 %", montant: "450 à 750 €", variation: "Distance au tableau, protections, monitoring" },
    { poste: "Étude, démarches, Consuel, raccordement", part: "8 à 12 %", montant: "600 à 900 €", variation: "Mise en service Enedis, travaux réseau éventuels" },
    { poste: "Marge, garanties et SAV", part: "10 à 15 %", montant: "750 à 1 100 €", variation: "Taille de l'entreprise, assurance décennale" },
  ],
  caption:
    "Répartition indicative pour une installation de 3 kWc en surimposition. Plus l'installation est puissante, plus la part du matériel augmente et celle des frais fixes (étude, démarches, déplacement) diminue.",
}

// Étapes d'un projet
export const PROJET_STEPS = [
  {
    title: "Étude de la toiture et de la consommation",
    detail:
      "L'installateur relève l'orientation, l'inclinaison, les ombres et l'état de la couverture, puis analyse votre courbe de consommation. Cette visite est gratuite chez la plupart des professionnels sérieux.",
  },
  {
    title: "Devis détaillé et comparaison",
    detail:
      "Demandez deux ou trois devis qui précisent la marque et la puissance des panneaux, l'onduleur, le système de fixation, le calepinage et les démarches incluses. Comparez le prix par kWc, pas seulement le total.",
  },
  {
    title: "Déclaration préalable en mairie",
    detail:
      "Elle est gratuite et obligatoire pour des panneaux en toiture. Le délai d'instruction est d'un mois, porté à deux mois en périmètre d'un monument historique, où l'avis de l'architecte des Bâtiments de France est requis.",
  },
  {
    title: "Pose des panneaux",
    detail:
      "Une installation de 3 à 6 kWc se pose en une à deux journées : fixation des crochets et des rails, montage des modules, câblage jusqu'au tableau électrique et mise en place des protections.",
  },
  {
    title: "Attestation Consuel",
    detail:
      "Le Consuel vérifie la conformité électrique de l'installation et délivre l'attestation exigée par Enedis. Comptez deux à six semaines selon les régions, visite éventuelle comprise.",
  },
  {
    title: "Raccordement et contrat de rachat",
    detail:
      "Enedis met l'installation en service sur votre compteur Linky, souvent sans déplacement. Le contrat de rachat du surplus avec EDF OA est ensuite signé pour vingt ans.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le coût d'installation de panneaux solaires pour une maison ?",
    answer:
      "En 2026, une installation de 3 kWc posée sur toiture coûte en moyenne 7 000 à 9 500 € TTC, démarches comprises. Comptez 11 000 à 15 000 € pour 6 kWc et 15 500 à 20 000 € pour 9 kWc. Le prix par kWc baisse quand la puissance augmente, car les frais fixes se répartissent sur plus de panneaux.",
  },
  {
    question: "Combien coûte la pose seule de panneaux solaires ?",
    answer:
      "La main-d'œuvre représente 25 à 30 % du prix d'une installation résidentielle, soit environ 1 900 à 2 250 € pour 3 kWc. Peu d'installateurs RGE acceptent de poser du matériel fourni par le client, car ils engagent leur garantie décennale sur l'ensemble. Quand ils le font, la pose seule se facture généralement 300 à 500 € par kWc.",
  },
  {
    question: "Quelles aides pour réduire le coût d'installation en 2026 ?",
    answer:
      "La prime à l'autoconsommation a été supprimée pour les demandes de raccordement déposées depuis le 5 juin 2026. Il reste la TVA à 5,5 % pour les installations jusqu'à 9 kWc, le contrat de rachat du surplus sur vingt ans, l'exonération d'impôt sur les revenus de revente jusqu'à 3 kWc et d'éventuelles aides locales. MaPrimeRénov' ne finance pas les panneaux photovoltaïques.",
  },
  {
    question: "Le raccordement Enedis est-il payant ?",
    answer:
      "Pour une installation en autoconsommation avec vente du surplus raccordée à un compteur Linky, la mise en service est le plus souvent réalisée à distance et sans frais importants. Des coûts apparaissent si le branchement doit être modifié, par exemple pour passer en triphasé ou renforcer la liaison au réseau. Demandez à l'installateur si le raccordement est inclus dans son devis.",
  },
  {
    question: "Faut-il prévoir des frais après l'installation ?",
    answer:
      "Les panneaux demandent très peu d'entretien. Prévoyez surtout le remplacement de l'onduleur central après 10 à 15 ans, pour 1 000 à 2 000 €, une éventuelle visite de contrôle et parfois une hausse modérée de l'assurance habitation. Les micro-onduleurs sont en général garantis 20 à 25 ans.",
  },
  {
    question: "Quel prix par kWc est raisonnable ?",
    answer:
      "Pour une maison, un prix compris entre 1 700 et 3 200 € TTC par kWc, démarches incluses, correspond au marché de 2026. Au-delà de 3 500 € par kWc sans batterie ni intégration au bâti, demandez une justification détaillée. Un prix très bas doit aussi alerter sur la qualité du matériel ou l'absence de qualification RGE.",
  },
  {
    question: "Une installation solaire est-elle encore rentable avec un rachat à 1,1 centime ?",
    answer:
      "Oui, à condition de bien la dimensionner. La rentabilité repose désormais sur l'électricité consommée sur place, qui évite d'acheter un kWh à environ 19,5 centimes. Une installation de 6 kWc dans une maison équipée d'une pompe à chaleur et bien pilotée est remboursée en 13 à 15 ans, puis produit encore 15 ans ou plus.",
  },
  {
    question: "Combien de temps entre le devis et la mise en service ?",
    answer:
      "Comptez deux à quatre mois au total : un mois pour l'instruction de la déclaration préalable, une à deux journées de pose, puis deux à six semaines pour le Consuel et quelques semaines pour la mise en service par Enedis. Les délais s'allongent en secteur protégé.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Arrêté du 1er juin 2026 fixant les conditions d'achat de l'électricité produite par les installations photovoltaïques sur bâtiment (JO du 4 juin 2026)",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
  {
    name: "BOFiP : taux réduit de TVA de 5,5 % pour les installations photovoltaïques de puissance inférieure ou égale à 9 kWc",
    url: "https://bofip.impots.gouv.fr",
    date: "2025",
  },
  {
    name: "Hespul : photovoltaique.info, coût d'une installation et démarches de raccordement",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
  {
    name: "Commission européenne (JRC) : PVGIS, estimation de la production photovoltaïque",
    url: "https://re.jrc.ec.europa.eu/pvg_tools/fr/",
    date: "2026",
  },
  {
    name: "Consuel : attestation de conformité des installations de production photovoltaïque",
    url: "https://www.consuel.com",
    date: "2026",
  },
]
