// =============================================================================
// Données article : Coût d'installation d'une pompe à chaleur — main-d'œuvre et pose 2026
// Angle : coût de la POSE (main-d'œuvre, chantier, facteurs de complexité),
// complémentaire de l'article "guide-prix-pompe-a-chaleur-2026" (prix global
// équipement + aides + rentabilité).
// Sources : ADEME, CAPEB, france-renov.gouv.fr, professionnels RGE QualiPAC
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Coût d'installation d'une pompe à chaleur : main-d'œuvre et facteurs de prix",
  subtitle:
    "Main-d'œuvre, étapes du chantier, facteurs qui font varier la facture : ce que représente réellement le coût d'installation d'une pompe à chaleur, indépendamment du prix de l'appareil.",
  slug: "cout-installation-pompe-a-chaleur",
  date: "30 juillet 2026",
  dateISO: "2026-07-30",
  readingTime: 13,
  author: "Greenter",
}

// Coût d'installation par type de pompe à chaleur (main-d'œuvre uniquement)
export const COUT_TABLE = {
  columns: [
    { header: "Type de pompe à chaleur", key: "type" },
    { header: "Durée moyenne du chantier", key: "duree", highlight: true },
    { header: "Coût de main-d'œuvre estimé", key: "cout", highlight: true },
  ],
  rows: [
    {
      type: "PAC air-air (mono-split)",
      duree: "0,5 à 1 jour",
      cout: "500 à 1 000 €",
    },
    {
      type: "PAC air-air (multi-split, 3 à 4 unités)",
      duree: "1 à 2 jours",
      cout: "1 200 à 2 500 €",
    },
    {
      type: "PAC air-eau (remplacement chaudière existante)",
      duree: "1 à 2 jours",
      cout: "2 000 à 3 500 €",
    },
    {
      type: "PAC air-eau (première installation, sans chaudière)",
      duree: "2 à 3 jours",
      cout: "3 000 à 5 000 €",
    },
    {
      type: "PAC géothermique (capteur horizontal ou sonde)",
      duree: "3 à 8 jours (terrassement/forage inclus)",
      cout: "8 000 à 20 000 €",
    },
  ],
  caption:
    "Coûts de main-d'œuvre et de mise en œuvre uniquement, hors prix de l'appareil, pour une installation en Île-de-France en 2026. Le coût total d'un projet additionne ce montant au prix du matériel. Sources : CAPEB, artisans RGE QualiPAC.",
}

// Étapes d'un chantier d'installation de pompe à chaleur
export const CHANTIER_STEPS = [
  {
    title: "La visite technique et l'étude de faisabilité",
    detail:
      "Avant tout chiffrage, un artisan RGE se déplace pour évaluer l'accessibilité du logement, l'emplacement envisagé pour l'unité extérieure, la distance à parcourir jusqu'au circuit de chauffage, et l'état de l'installation électrique existante. Cette visite conditionne la précision du devis final.",
  },
  {
    title: "La dépose de l'ancien système (si remplacement)",
    detail:
      "Lors d'un remplacement de chaudière, la dépose de l'ancien générateur, la vidange du circuit et l'évacuation du matériel représentent un poste de main-d'œuvre à part entière, généralement facturé entre 300 et 600 € selon le type d'appareil déposé.",
  },
  {
    title: "La pose de l'unité extérieure et de l'unité intérieure",
    detail:
      "L'unité extérieure est fixée sur un socle béton ou des supports muraux anti-vibratiles, puis raccordée aux liaisons frigorifiques ou hydrauliques selon le modèle. Cette étape mobilise généralement deux techniciens pendant une demi-journée à une journée complète.",
  },
  {
    title: "Le raccordement électrique et hydraulique",
    detail:
      "Un raccordement électrique dédié, souvent avec une ligne spécifique depuis le tableau, est nécessaire pour alimenter le compresseur. Le raccordement au circuit hydraulique (radiateurs, plancher chauffant, ballon d'eau chaude) demande l'intervention d'un plombier-chauffagiste qualifié.",
  },
  {
    title: "La mise en service et les réglages",
    detail:
      "Une fois l'installation terminée, l'artisan procède à la mise en service : tirage au vide du circuit frigorifique, contrôle des pressions, réglage de la loi d'eau et des paramètres de régulation. Cette étape technique conditionne directement le rendement futur de l'appareil.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le coût d'installation d'une pompe à chaleur, hors prix de l'appareil ?",
    answer:
      "Le coût de main-d'œuvre pour l'installation d'une pompe à chaleur varie de 500 à 1 000 € pour un modèle air-air simple, à 2 000 à 5 000 € pour une pompe à chaleur air-eau, et jusqu'à 8 000 à 20 000 € pour une installation géothermique incluant le terrassement ou le forage. Ce montant s'ajoute au prix du matériel pour obtenir le coût total du projet.",
  },
  {
    question: "Pourquoi le coût d'installation d'une pompe à chaleur air-eau varie-t-il autant ?",
    answer:
      "L'écart s'explique principalement par le contexte du chantier : un remplacement de chaudière existante, où le circuit hydraulique est déjà en place, coûte moins cher qu'une première installation nécessitant de créer l'ensemble du réseau de chauffage. La distance entre l'unité extérieure et l'unité intérieure, l'accessibilité du logement et l'état de l'installation électrique existante influencent également fortement le devis final.",
  },
  {
    question: "Le coût d'installation est-il inclus dans les aides MaPrimeRénov' ?",
    answer:
      "Oui. MaPrimeRénov' et les primes CEE sont calculées sur le montant total de la facture, matériel et main-d'œuvre confondus, à condition que les travaux soient réalisés par un artisan certifié RGE. La TVA à 5,5 % s'applique également sur l'ensemble de la prestation, main-d'œuvre comprise, pour un logement de plus de deux ans.",
  },
  {
    question: "Combien de temps dure l'installation d'une pompe à chaleur air-eau ?",
    answer:
      "Pour un remplacement de chaudière existante, comptez généralement 1 à 2 jours de chantier. Pour une première installation nécessitant la création complète du circuit hydraulique, le chantier s'étale plutôt sur 2 à 3 jours. Une installation géothermique, avec terrassement ou forage, peut nécessiter de 3 à 8 jours selon la technique retenue.",
  },
  {
    question: "Peut-on réduire le coût d'installation d'une pompe à chaleur ?",
    answer:
      "Plusieurs leviers existent : privilégier un remplacement de chaudière existante plutôt qu'une création complète de circuit, choisir un emplacement d'unité extérieure proche du point de raccordement pour limiter les liaisons frigorifiques, et comparer au moins trois devis d'artisans RGE, les écarts de main-d'œuvre pouvant atteindre 30 % pour un chantier identique.",
  },
  {
    question: "Faut-il des travaux électriques supplémentaires pour installer une pompe à chaleur ?",
    answer:
      "Dans la majorité des cas, une ligne électrique dédiée depuis le tableau est nécessaire pour alimenter le compresseur, avec une protection différentielle adaptée. Si le tableau électrique existant est ancien ou déjà saturé, une mise aux normes partielle peut s'avérer nécessaire, ajoutant plusieurs centaines d'euros au coût d'installation global.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "CAPEB — Observatoire des prix de la rénovation énergétique, coûts de main-d'œuvre 2026",
    url: "https://www.capeb.fr",
    date: "2026",
  },
  {
    name: "ADEME — Coûts des travaux d'installation de pompes à chaleur, référentiel 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — Barèmes MaPrimeRénov' pompe à chaleur 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "Qualit'EnR — Référentiel QualiPAC, bonnes pratiques d'installation",
    url: "https://www.qualit-enr.org",
    date: "2026",
  },
]
