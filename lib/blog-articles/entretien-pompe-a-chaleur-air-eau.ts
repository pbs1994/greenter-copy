// =============================================================================
// Données article : Entretien pompe à chaleur air-eau — fréquence, prix, obligations 2026
// Sources : ADEME, Légifrance (décret entretien PAC), Ministère de la Transition
// écologique, Qualit'EnR / QualiPAC
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Entretien pompe à chaleur air-eau : fréquence, prix et obligations 2026",
  subtitle:
    "L'entretien d'une pompe à chaleur air-eau est-il obligatoire ? À quelle fréquence, pour quel prix, et que risque-t-on en cas de négligence ? Le guide complet 2026, avec le détail exact d'une visite technique.",
  slug: "entretien-pompe-a-chaleur-air-eau",
  date: "26 juillet 2026",
  dateISO: "2026-07-26",
  readingTime: 13,
  author: "Greenter",
}

// Répartition des tâches d'entretien : propriétaire vs technicien RGE
export const TACHES_TABLE = {
  columns: [
    { header: "Tâche d'entretien", key: "tache" },
    { header: "Fréquence recommandée", key: "frequence", highlight: true },
    { header: "Qui la réalise", key: "qui" },
  ],
  rows: [
    {
      tache: "Nettoyage des ailettes de l'unité extérieure",
      frequence: "2 à 3 fois par an",
      qui: "Propriétaire",
    },
    {
      tache: "Dégagement de la végétation autour de l'unité extérieure",
      frequence: "Toute l'année",
      qui: "Propriétaire",
    },
    {
      tache: "Vérification de la pression du circuit hydraulique",
      frequence: "1 fois par mois",
      qui: "Propriétaire",
    },
    {
      tache: "Contrôle des pressions du circuit frigorifique",
      frequence: "1 fois par an",
      qui: "Technicien RGE",
    },
    {
      tache: "Contrôle d'étanchéité du fluide frigorigène",
      frequence: "1 fois par an (selon charge)",
      qui: "Technicien certifié",
    },
    {
      tache: "Nettoyage des échangeurs thermiques (intérieur/extérieur)",
      frequence: "1 fois par an",
      qui: "Technicien RGE",
    },
    {
      tache: "Contrôle des connexions électriques et de l'isolation",
      frequence: "1 fois par an",
      qui: "Technicien RGE",
    },
    {
      tache: "Purge d'air et contrôle du vase d'expansion",
      frequence: "1 fois par an",
      qui: "Technicien RGE",
    },
  ],
  caption:
    "Répartition indicative des tâches d'entretien d'une pompe à chaleur air-eau. Les gestes du propriétaire ne remplacent pas la visite annuelle obligatoire réalisée par un professionnel certifié. Sources : ADEME, fabricants, techniciens QualiPAC.",
}

// Étapes d'une visite d'entretien professionnelle
export const VISITE_STEPS = [
  {
    title: "Contrôle visuel général de l'installation",
    detail:
      "Le technicien vérifie l'état général de l'unité extérieure et de l'unité intérieure : absence de corrosion, de fuite visible, de végétation trop proche, bon état des fixations et des plots anti-vibratiles. Cette inspection permet de repérer d'éventuelles anomalies avant qu'elles ne s'aggravent.",
  },
  {
    title: "Mesure des pressions du circuit frigorifique",
    detail:
      "À l'aide de manomètres branchés sur les prises de pression, le technicien contrôle que les pressions haute et basse du circuit correspondent aux valeurs constructeur. Un écart signale souvent un manque de fluide frigorigène ou un dysfonctionnement du détendeur.",
  },
  {
    title: "Contrôle d'étanchéité du fluide frigorigène",
    detail:
      "Pour les appareils concernés par le règlement européen F-Gas, le technicien recherche d'éventuelles fuites à l'aide d'un détecteur électronique. Une fuite non détectée fait chuter progressivement le rendement et peut endommager le compresseur à terme.",
  },
  {
    title: "Nettoyage des échangeurs thermiques",
    detail:
      "L'échangeur de l'unité extérieure (évaporateur) et celui du circuit hydraulique accumulent poussière, pollens et parfois tartre. Un nettoyage soigné restaure la capacité d'échange thermique et évite la surconsommation liée à l'encrassement.",
  },
  {
    title: "Contrôle des connexions électriques",
    detail:
      "Le technicien vérifie le serrage des connexions électriques, l'état des câbles et la bonne isolation des composants — un point de sécurité essentiel, une connexion desserrée pouvant provoquer une surchauffe locale voire un début d'incendie.",
  },
  {
    title: "Vérification du circuit hydraulique et du vase d'expansion",
    detail:
      "Spécifique aux pompes à chaleur air-eau : purge d'air du circuit, contrôle de la pression du vase d'expansion, vérification de l'absence de fuite d'eau et de la qualité du fluide caloporteur (présence de tartre ou de boues).",
  },
  {
    title: "Remise d'une attestation d'entretien",
    detail:
      "À l'issue de la visite, le professionnel remet une attestation mentionnant les contrôles effectués et les éventuelles anomalies constatées. Ce document est à conserver : il conditionne la garantie constructeur et sert de preuve en cas de contrôle réglementaire.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quelle est la fréquence d'entretien d'une pompe à chaleur air-eau ?",
    answer:
      "L'entretien d'une pompe à chaleur air-eau doit être réalisé une fois par an par un professionnel, idéalement avant le début de la saison de chauffe (septembre-octobre). Cette fréquence annuelle est la référence retenue par les fabricants pour maintenir la garantie et par la réglementation pour les appareils de plus de 4 kW.",
  },
  {
    question: "L'entretien d'une pompe à chaleur air-eau est-il obligatoire ?",
    answer:
      "Oui, pour toute pompe à chaleur air-eau d'une puissance supérieure à 4 kW, ce qui concerne la grande majorité des installations résidentielles. Cette obligation d'entretien annuel, réalisée par un professionnel titulaire d'une attestation d'aptitude, découle de la réglementation applicable aux équipements de chauffage contenant du fluide frigorigène.",
  },
  {
    question: "Quel est le prix d'un entretien de pompe à chaleur air-eau ?",
    answer:
      "Le prix d'une visite d'entretien ponctuelle se situe entre 120 et 250 € TTC selon la région et le prestataire. Un contrat d'entretien annuel, qui inclut la visite programmée et souvent une priorité d'intervention en cas de panne, coûte généralement entre 150 et 300 € par an — une formule qui évite d'oublier l'échéance et facilite le suivi de l'appareil dans la durée.",
  },
  {
    question: "Que se passe-t-il si je ne fais pas entretenir ma pompe à chaleur air-eau ?",
    answer:
      "Sans entretien régulier, le rendement de la pompe à chaleur se dégrade progressivement (échangeurs encrassés, fuite de fluide non détectée), la facture de chauffage augmente, la durée de vie de l'appareil se réduit — parfois de moitié — et la garantie constructeur peut être annulée en cas de panne, la plupart des fabricants exigeant une preuve d'entretien annuel pour l'honorer.",
  },
  {
    question: "Puis-je entretenir moi-même ma pompe à chaleur air-eau ?",
    answer:
      "Certains gestes simples peuvent être réalisés par le propriétaire entre deux visites : nettoyage des ailettes de l'unité extérieure, dégagement de la végétation, nettoyage des filtres, vérification visuelle de la pression du circuit hydraulique. En revanche, l'intervention sur le circuit frigorifique, le contrôle d'étanchéité du fluide et la visite d'entretien réglementaire doivent obligatoirement être réalisés par un professionnel certifié.",
  },
  {
    question: "Qui peut réaliser l'entretien d'une pompe à chaleur air-eau ?",
    answer:
      "L'entretien doit être réalisé par un professionnel titulaire d'une attestation de capacité pour la manipulation des fluides frigorigènes. La certification RGE QualiPAC constitue une garantie supplémentaire de compétence spécifique aux pompes à chaleur, et reste indispensable si vous souhaitez rester éligible aux aides financières lors d'une future intervention sur l'installation.",
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
    name: "Légifrance — Réglementation relative à l'entretien des équipements de chauffage",
    url: "https://www.legifrance.gouv.fr",
    date: "2023",
  },
  {
    name: "Ministère de la Transition écologique — Obligations d'entretien des pompes à chaleur",
    url: "https://www.ecologie.gouv.fr",
    date: "2026",
  },
  {
    name: "Qualit'EnR — Référentiel QualiPAC, entretien et maintenance des PAC résidentielles",
    url: "https://www.qualit-enr.org",
    date: "2026",
  },
]
