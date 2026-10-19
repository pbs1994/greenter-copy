// =============================================================================
// Données article : Schéma installation pompe à chaleur air-eau — guide 2026
// Angle : le schéma d'installation hydraulique et électrique (ce qui va où et
// pourquoi) : monobloc/bibloc, composants du circuit, émetteurs, ECS, relève
// de chaudière, raccordement électrique, emplacement. Complémentaire de
// "pompe-a-chaleur-air-eau-fonctionnement" (cycle thermodynamique) sans le
// cannibaliser.
// Sources : ADEME, France Rénov', NF C 15-100, Code de la santé publique
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Schéma installation pompe à chaleur air-eau : le circuit complet expliqué",
  subtitle:
    "Schéma installation pompe à chaleur air-eau : unité extérieure, module hydraulique, ballon, émetteurs et raccordements expliqués pas à pas. Guide 2026.",
  slug: "schema-installation-pompe-a-chaleur-air-eau",
  date: "19 octobre 2026",
  dateISO: "2026-10-19",
  readingTime: 15,
  author: "Greenter",
}

// Monobloc vs bibloc
export const MONOBLOC_BIBLOC_TABLE = {
  columns: [
    { header: "Critère", key: "critere" },
    { header: "PAC monobloc", key: "monobloc" },
    { header: "PAC bibloc (split)", key: "bibloc", highlight: true },
  ],
  rows: [
    { critere: "Liaison entre extérieur et intérieur", monobloc: "Tuyaux d'eau de chauffage", bibloc: "Liaison frigorifique (fluide)" },
    { critere: "Composants frigorifiques", monobloc: "Tous dans l'unité extérieure", bibloc: "Répartis entre les deux unités" },
    { critere: "Encombrement intérieur", monobloc: "Faible (parfois un simple kit hydraulique)", bibloc: "Module hydraulique mural ou au sol" },
    { critere: "Risque de gel des canalisations", monobloc: "Oui : antigel ou vannes antigel", bibloc: "Non, l'eau reste à l'intérieur" },
    { critere: "Distance entre les unités", monobloc: "Courte de préférence (pertes thermiques)", bibloc: "Souvent 15 à 30 m maximum selon le fabricant" },
    { critere: "Mise en service", monobloc: "Plus simple, circuit frigorifique scellé en usine", bibloc: "Technicien titulaire d'une attestation de capacité" },
  ],
  caption:
    "Les longueurs maximales de liaison varient selon les fabricants et les modèles : la notice d'installation fait foi.",
}

// Composants du circuit hydraulique
export const COMPOSANTS_TABLE = {
  columns: [
    { header: "Composant", key: "composant" },
    { header: "Rôle dans le schéma", key: "role", highlight: true },
    { header: "Présence", key: "presence" },
  ],
  rows: [
    { composant: "Circulateur", role: "Fait circuler l'eau entre la PAC et les émetteurs", presence: "Indispensable (souvent intégré)" },
    { composant: "Vase d'expansion", role: "Absorbe la dilatation de l'eau quand elle chauffe", presence: "Indispensable" },
    { composant: "Soupape de sécurité + manomètre", role: "Protège le circuit contre la surpression, affiche la pression", presence: "Indispensable" },
    { composant: "Filtre / désemboueur magnétique", role: "Capte boues et particules métalliques avant la PAC", presence: "Fortement recommandé" },
    { composant: "Vanne 3 voies", role: "Oriente l'eau chaude vers le chauffage ou le ballon d'eau chaude", presence: "Si production d'ECS" },
    { composant: "Ballon tampon", role: "Augmente le volume d'eau, limite les cycles courts", presence: "Selon le volume minimal exigé par le fabricant" },
    { composant: "Bouteille de découplage", role: "Sépare hydrauliquement la PAC et plusieurs circuits d'émetteurs", presence: "Si plusieurs circuits ou relève de chaudière" },
    { composant: "Résistance d'appoint", role: "Complète la PAC par très grand froid", presence: "Fréquente (intégrée au module)" },
  ],
  caption:
    "Composants les plus courants d'un schéma hydraulique de PAC air-eau. Une partie est souvent intégrée d'usine dans le module hydraulique.",
}

// Étapes d'installation
export const INSTALLATION_STEPS = [
  {
    title: "Étude thermique et choix du schéma",
    detail:
      "Le technicien calcule les déperditions du logement pièce par pièce, relève les émetteurs existants et choisit le schéma adapté : monobloc ou bibloc, avec ou sans ballon tampon, production d'eau chaude intégrée ou séparée, nombre de circuits de chauffage.",
  },
  {
    title: "Pose de l'unité extérieure",
    detail:
      "L'unité est fixée sur un socle béton ou des supports muraux, posée sur des plots antivibratiles, surélevée du sol pour l'évacuation des condensats et placée en respectant les dégagements prévus par le fabricant.",
  },
  {
    title: "Installation du module hydraulique et du ballon",
    detail:
      "Le module intérieur est fixé au mur ou posé au sol, généralement dans un garage, une buanderie ou à l'emplacement de l'ancienne chaudière. Le ballon d'eau chaude et, le cas échéant, le ballon tampon sont installés à proximité.",
  },
  {
    title: "Raccordements frigorifiques, hydrauliques et électriques",
    detail:
      "Pose de la liaison frigorifique ou hydraulique entre les deux unités, raccordement au réseau de chauffage existant avec filtre et vase d'expansion, puis création d'une ligne électrique dédiée depuis le tableau, protégée par un disjoncteur adapté.",
  },
  {
    title: "Rinçage, remplissage et mise en service",
    detail:
      "Le circuit de chauffage est rincé, voire désemboué s'il est ancien, puis rempli et purgé. Le technicien vérifie l'étanchéité, met la PAC sous tension, paramètre la courbe de chauffe et contrôle les températures et les débits.",
  },
  {
    title: "Réglages et remise des documents",
    detail:
      "Les consignes, la programmation et la production d'eau chaude sont réglées avec vous. L'installateur vous remet la notice, l'attestation de mise en service et les documents nécessaires au versement des aides.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quels sont les éléments d'un schéma d'installation de pompe à chaleur air-eau ?",
    answer:
      "Un schéma d'installation de PAC air-eau comprend trois ensembles : l'unité extérieure qui capte les calories de l'air, le module hydraulique intérieur qui transmet la chaleur à l'eau de chauffage, et le réseau de distribution (radiateurs ou plancher chauffant) auquel s'ajoute souvent un ballon d'eau chaude sanitaire. Le circuit intègre aussi un circulateur, un vase d'expansion, une soupape de sécurité et, de préférence, un filtre désemboueur.",
  },
  {
    question: "Quelle est la différence entre une PAC air-eau monobloc et bibloc ?",
    answer:
      "Dans une PAC monobloc, tout le circuit frigorifique est dans l'unité extérieure : c'est de l'eau de chauffage qui circule entre l'extérieur et la maison. Dans une PAC bibloc, les composants sont répartis entre une unité extérieure et un module intérieur reliés par une liaison frigorifique. La monobloc est plus simple à mettre en service, la bibloc évite tout risque de gel des canalisations.",
  },
  {
    question: "Un ballon tampon est-il obligatoire avec une pompe à chaleur air-eau ?",
    answer:
      "Non, pas systématiquement. Il devient nécessaire lorsque le volume d'eau de l'installation est inférieur au minimum exigé par le fabricant, par exemple avec peu de radiateurs ou des robinets thermostatiques qui ferment une grande partie du circuit. Sans lui, la PAC risque de fonctionner par cycles courts, ce qui dégrade son rendement et use le compresseur.",
  },
  {
    question: "Peut-on raccorder une pompe à chaleur air-eau sur des radiateurs existants ?",
    answer:
      "Oui, dans la plupart des cas. La PAC se raccorde au réseau existant à la place de la chaudière. Il faut cependant vérifier que les radiateurs sont suffisamment dimensionnés pour chauffer avec une eau à 45–55 °C, et prévoir un désembouage du circuit s'il est ancien. Une PAC haute température ou le remplacement de quelques radiateurs peut être nécessaire dans un logement peu isolé.",
  },
  {
    question: "Où installer l'unité extérieure d'une pompe à chaleur air-eau ?",
    answer:
      "Sur un emplacement dégagé, à l'abri des vents dominants, sur un socle stable avec des plots antivibratiles, surélevé pour l'évacuation des condensats et le dégagement en cas de neige. Évitez la proximité immédiate des fenêtres de chambre et des limites de propriété, pour limiter les nuisances sonores pour vous et vos voisins.",
  },
  {
    question: "Faut-il augmenter la puissance de son abonnement électrique ?",
    answer:
      "C'est fréquent. Une PAC air-eau, surtout avec sa résistance d'appoint, peut appeler plusieurs kilowatts en plus des autres appareils. Beaucoup de foyers passent d'un abonnement de 6 kVA à 9 kVA, voire 12 kVA. L'installateur calcule la puissance nécessaire lors de l'étude et vous indique si un changement est utile.",
  },
  {
    question: "Une pompe à chaleur air-eau peut-elle fonctionner avec une chaudière existante ?",
    answer:
      "Oui, en relève de chaudière : la PAC chauffe la maison la plus grande partie de l'année, et la chaudière prend le relais par grand froid. Le schéma d'installation utilise alors généralement une bouteille de découplage et une régulation commune. Les PAC hybrides intègrent directement les deux générateurs dans un même système.",
  },
  {
    question: "Qui peut installer une pompe à chaleur air-eau ?",
    answer:
      "Pour un modèle bibloc, la manipulation du fluide frigorigène est réservée à un professionnel titulaire d'une attestation de capacité. Pour bénéficier des aides publiques, l'installation doit être réalisée par une entreprise certifiée RGE, par exemple QualiPAC. L'installateur doit aussi respecter la norme NF C 15-100 pour le raccordement électrique.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Les pompes à chaleur : fonctionnement, installation et bons usages",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/chauffage",
    date: "2025",
  },
  {
    name: "France Rénov' — Pompe à chaleur air-eau : installation et aides",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "AFNOR — Norme NF C 15-100, installations électriques à basse tension",
    url: "https://www.afnor.org",
    date: "2025",
  },
  {
    name: "Code de la santé publique — Articles R1336-4 et suivants sur les bruits de voisinage",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
]
