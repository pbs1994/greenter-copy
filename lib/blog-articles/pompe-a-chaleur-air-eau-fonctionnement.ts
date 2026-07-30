// =============================================================================
// Données article : Pompe à chaleur air-eau fonctionnement — cycle et composants 2026
// Sources : ADEME, fabricants (Viessmann, Daikin, Atlantic), CSTB
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à chaleur air-eau fonctionnement : le cycle expliqué en détail",
  subtitle:
    "Évaporation, compression, condensation, détente : comment fonctionne réellement une pompe à chaleur air-eau, quels sont ses composants, et pourquoi sa performance varie avec la température extérieure.",
  slug: "pompe-a-chaleur-air-eau-fonctionnement",
  date: "30 juillet 2026",
  dateISO: "2026-07-30",
  readingTime: 13,
  author: "Greenter",
}

// Comparatif du fonctionnement selon la température extérieure
export const TEMPERATURE_TABLE = {
  columns: [
    { header: "Température extérieure", key: "temperature" },
    { header: "Impact sur le fonctionnement", key: "impact", highlight: true },
    { header: "COP instantané indicatif", key: "cop" },
  ],
  rows: [
    {
      temperature: "+10 °C à +7 °C",
      impact: "Fonctionnement optimal, calories abondantes dans l'air",
      cop: "4,0 à 5,0",
    },
    {
      temperature: "+7 °C à 0 °C",
      impact: "Fonctionnement normal, léger recours au dégivrage",
      cop: "3,0 à 4,0",
    },
    {
      temperature: "0 °C à −7 °C",
      impact: "Cycles de dégivrage plus fréquents, COP en baisse",
      cop: "2,2 à 3,0",
    },
    {
      temperature: "Sous −7 °C",
      impact: "Appoint électrique sollicité sur les modèles standards",
      cop: "1,5 à 2,2",
    },
  ],
  caption:
    "Valeurs indicatives pour une pompe à chaleur air-eau Inverter récente, émetteurs basse température. Le COP instantané varie selon le modèle, le dimensionnement et le réglage de la loi d'eau. Sources : ADEME, fabricants.",
}

// Étapes du cycle thermodynamique
export const CYCLE_STEPS = [
  {
    title: "L'évaporation : capter les calories de l'air extérieur",
    detail:
      "L'air extérieur est aspiré par le ventilateur de l'unité extérieure et traverse l'évaporateur, un échangeur thermique dans lequel circule le fluide frigorigène à l'état liquide et à basse pression. Ce fluide a un point d'ébullition très bas : même par temps froid, l'air extérieur suffit à le faire passer à l'état gazeux, en lui cédant ses calories.",
  },
  {
    title: "La compression : élever la température du fluide frigorigène",
    detail:
      "Le fluide frigorigène, désormais à l'état de vapeur basse pression, est aspiré par le compresseur. Ce composant mécanique comprime le gaz, ce qui augmente fortement sa pression et sa température — exactement comme une pompe à vélo chauffe quand on comprime l'air. C'est cette étape qui consomme l'électricité nécessaire au fonctionnement de la pompe à chaleur.",
  },
  {
    title: "La condensation : transférer la chaleur au circuit de chauffage",
    detail:
      "Le gaz chaud à haute pression traverse le condenseur, un second échangeur thermique en contact avec le circuit d'eau du chauffage central. La chaleur du fluide frigorigène est transférée à l'eau, qui alimente ensuite les radiateurs ou le plancher chauffant. En cédant sa chaleur, le fluide frigorigène se condense et redevient liquide.",
  },
  {
    title: "La détente : revenir à l'état initial pour recommencer le cycle",
    detail:
      "Le fluide frigorigène liquide, encore à haute pression, traverse le détendeur, qui abaisse brutalement sa pression et donc sa température. Il revient ainsi à son état initial — liquide froid à basse pression — prêt à recommencer un nouveau cycle en captant à nouveau les calories de l'air extérieur au niveau de l'évaporateur.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Comment fonctionne une pompe à chaleur air-eau en résumé ?",
    answer:
      "Une pompe à chaleur air-eau capte les calories présentes dans l'air extérieur grâce à un fluide frigorigène, les concentre à l'aide d'un compresseur pour élever leur température, puis les transfère au circuit d'eau du chauffage central (radiateurs ou plancher chauffant). Ce cycle en quatre étapes — évaporation, compression, condensation, détente — se répète en continu tant que l'appareil fonctionne, permettant de produire plusieurs kWh de chaleur pour 1 kWh d'électricité consommée.",
  },
  {
    question: "Quelle quantité d'électricité consomme une pompe à chaleur air-eau pour fonctionner ?",
    answer:
      "Une pompe à chaleur air-eau ne consomme de l'électricité que pour faire fonctionner le compresseur et les ventilateurs/pompes de circulation — pas pour produire directement la chaleur. C'est ce qui explique son rendement : pour 1 kWh d'électricité consommé, elle restitue généralement 3 à 4 kWh de chaleur en conditions réelles, un ratio appelé COP (coefficient de performance).",
  },
  {
    question: "Le fonctionnement d'une pompe à chaleur air-eau change-t-il en hiver ?",
    answer:
      "Oui. Plus la température extérieure baisse, plus il est difficile d'extraire des calories de l'air, ce qui réduit le rendement instantané de l'appareil. En dessous de 0 °C, l'humidité de l'air peut givrer sur l'évaporateur, déclenchant des cycles de dégivrage automatiques. Sur les modèles anciens ou mal dimensionnés, un appoint électrique peut prendre le relais lors des pics de grand froid.",
  },
  {
    question: "Quelle est la différence de fonctionnement entre une pompe à chaleur monobloc et bibloc ?",
    answer:
      "Sur un modèle monobloc, l'intégralité du circuit frigorifique (évaporateur, compresseur, condenseur, détendeur) est contenue dans l'unité extérieure ; seule de l'eau chaude circule jusqu'au circuit de chauffage intérieur. Sur un modèle bibloc, le circuit frigorifique est réparti entre l'unité extérieure et l'unité intérieure, reliées par des liaisons frigorifiques. Le principe thermodynamique reste identique dans les deux cas.",
  },
  {
    question: "Comment une pompe à chaleur air-eau chauffe-t-elle aussi l'eau chaude sanitaire ?",
    answer:
      "La plupart des pompes à chaleur air-eau peuvent produire de l'eau chaude sanitaire en plus du chauffage, grâce à un ballon d'eau chaude raccordé au même circuit. L'appareil bascule périodiquement en mode « eau chaude sanitaire », où le condenseur chauffe l'eau du ballon à une température plus élevée (55 à 60 °C) que celle utilisée pour le chauffage, avant de revenir au mode chauffage habituel.",
  },
  {
    question: "Pourquoi la pompe à chaleur air-eau s'arrête-t-elle et redémarre-t-elle régulièrement ?",
    answer:
      "Ces cycles marche-arrêt sont normaux : une fois la température de consigne atteinte dans le circuit d'eau, la pompe à chaleur réduit ou arrête temporairement son fonctionnement, avant de redémarrer lorsque la température redescend. Les modèles Inverter modernes modulent en continu la puissance du compresseur plutôt que de s'arrêter complètement, ce qui limite l'usure et améliore le confort thermique.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Fonctionnement des pompes à chaleur, guide technique 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "CSTB — Règles de calcul et fonctionnement des pompes à chaleur résidentielles",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "Fabricants (Viessmann, Daikin, Atlantic) — Documentation technique pompes à chaleur air-eau",
    url: "https://www.viessmann.fr",
    date: "2026",
  },
  {
    name: "france-renov.gouv.fr — Fonctionnement et éligibilité des pompes à chaleur aux aides 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
]
