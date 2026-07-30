// =============================================================================
// Données article : Isolation comble rampant — diagnostic et reprise 2026
// Angle : diagnostiquer et corriger une isolation de rampants existante et
// défaillante, complémentaire de l'article "isolation-rampants-de-toiture"
// (guide de pose neuve, matériaux, prix).
// Sources : ADEME, CSTB, france-renov.gouv.fr, professionnels RGE
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation comble rampant : diagnostiquer et corriger une isolation défaillante",
  subtitle:
    "Paroi froide, condensation, facture de chauffage qui grimpe : comment reconnaître une isolation comble rampant défaillante, comprendre ses points faibles et la reprendre efficacement en 2026.",
  slug: "isolation-comble-rampant",
  date: "30 juillet 2026",
  dateISO: "2026-07-30",
  readingTime: 13,
  author: "Greenter",
}

// Signes d'une isolation comble rampant défaillante
export const SIGNES_TABLE = {
  columns: [
    { header: "Signe observé", key: "signe" },
    { header: "Cause probable", key: "cause", highlight: true },
    { header: "Urgence à traiter", key: "urgence" },
  ],
  rows: [
    {
      signe: "Paroi du rampant froide au toucher en hiver",
      cause: "Épaisseur d'isolant insuffisante ou tassée",
      urgence: "Modérée",
    },
    {
      signe: "Traces d'humidité ou moisissures sur le rampant",
      cause: "Pare-vapeur absent, percé ou mal jointé",
      urgence: "Élevée",
    },
    {
      signe: "Sensation de courant d'air près des jonctions",
      cause: "Pont thermique non traité (mur/rampant, plafond/rampant)",
      urgence: "Élevée",
    },
    {
      signe: "Chaleur excessive sous les combles en été",
      cause: "Absence de lame d'air ventilée sous la couverture",
      urgence: "Modérée",
    },
    {
      signe: "Facture de chauffage en hausse sans changement d'usage",
      cause: "Dégradation progressive de la résistance thermique globale",
      urgence: "Modérée à élevée",
    },
  ],
  caption:
    "Signes les plus fréquemment rencontrés lors des diagnostics d'isolation de rampants réalisés par nos artisans RGE en Île-de-France. Un diagnostic thermique confirme l'origine exacte avant tout devis de reprise.",
}

// Étapes pour diagnostiquer et reprendre une isolation comble rampant
export const DIAGNOSTIC_STEPS = [
  {
    title: "Observer l'état visuel de l'isolant en place",
    detail:
      "Accédez aux combles et examinez les panneaux ou rouleaux existants : un isolant tassé, jauni, humide ou décollé des chevrons a perdu une partie significative de sa capacité isolante, même si son épaisseur d'origine semblait suffisante.",
  },
  {
    title: "Vérifier la continuité du pare-vapeur",
    detail:
      "Un pare-vapeur déchiré, mal jointé aux lés voisins ou totalement absent laisse la vapeur d'eau intérieure migrer dans l'isolant, où elle se condense et le dégrade progressivement. Les traces sombres ou l'odeur de moisi sont des indices révélateurs.",
  },
  {
    title: "Repérer les ponts thermiques aux jonctions",
    detail:
      "Les zones de raccord entre le rampant et le plafond, entre le rampant et les pignons, ou autour des fenêtres de toit sont les points les plus fréquemment mal traités. Une caméra thermique fait apparaître ces zones sous forme de taches froides caractéristiques.",
  },
  {
    title: "Faire réaliser un diagnostic thermique par un professionnel",
    detail:
      "Un artisan RGE ou un thermicien peut mesurer précisément la résistance thermique réelle de vos rampants et comparer ce chiffre aux seuils actuels exigés par MaPrimeRénov'. Ce diagnostic oriente ensuite le choix entre simple complément et dépose totale.",
  },
  {
    title: "Décider entre complément d'isolation et dépose totale",
    detail:
      "Si l'isolant existant est sec et en bon état mais simplement trop fin, un complément par-dessus (sur-isolation) suffit souvent. Si le pare-vapeur est défaillant ou l'isolant humide, une dépose complète avant repose est indispensable pour ne pas emprisonner l'humidité.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Comment savoir si l'isolation de mon comble rampant est défaillante ?",
    answer:
      "Plusieurs signes doivent alerter : une paroi de rampant froide au toucher en hiver, des traces d'humidité ou de moisissures, une sensation de courant d'air près des jonctions, ou une facture de chauffage qui augmente sans changement d'usage. Un diagnostic thermique par un professionnel RGE permet de confirmer précisément l'origine du problème avant d'engager des travaux.",
  },
  {
    question: "Faut-il déposer l'ancienne isolation avant de refaire l'isolation d'un comble rampant ?",
    answer:
      "Cela dépend de l'état de l'isolant existant. S'il est sec, propre et simplement trop fin, un complément posé par-dessus suffit généralement. En revanche, si le pare-vapeur est défaillant, l'isolant humide, tassé ou contaminé par des moisissures, une dépose complète est indispensable avant de reposer un isolant neuf avec un pare-vapeur correctement installé.",
  },
  {
    question: "Quel budget prévoir pour reprendre une isolation comble rampant défaillante ?",
    answer:
      "Un simple complément d'isolation par-dessus un isolant existant en bon état coûte généralement 20 à 35 €/m². Une reprise complète avec dépose de l'ancien isolant, traitement du pare-vapeur et repose d'un isolant performant se situe plutôt entre 50 et 85 €/m², selon la complexité des jonctions à traiter et l'état de la charpente.",
  },
  {
    question: "Les aides MaPrimeRénov' couvrent-elles la reprise d'une isolation comble rampant existante ?",
    answer:
      "Oui, la reprise d'une isolation de rampants est éligible à MaPrimeRénov' au même titre qu'une isolation neuve, à condition que les travaux soient réalisés par un artisan certifié RGE et que la résistance thermique atteinte après travaux soit au moins égale à R ≥ 6 m².K/W. Les primes CEE et la TVA à 5,5 % s'appliquent également.",
  },
  {
    question: "Pourquoi mon comble rampant reste-t-il froid alors qu'il est isolé ?",
    answer:
      "Le cas le plus fréquent est un pont thermique non traité au niveau des jonctions (rampant/mur, rampant/plafond, autour des fenêtres de toit), qui laisse passer le froid malgré un isolant en bon état ailleurs. Un isolant tassé avec le temps, un pare-vapeur endommagé, ou une épaisseur devenue insuffisante au regard des exigences actuelles peuvent aussi expliquer ce ressenti.",
  },
  {
    question: "Combien de temps durent des travaux de reprise d'isolation comble rampant ?",
    answer:
      "Pour un simple complément d'isolation sur une surface courante de rampants (30 à 50 m²), comptez 1 à 2 jours de travaux. Une reprise complète avec dépose de l'ancien isolant, traitement des points singuliers et repose de finitions en placo peut s'étaler sur 3 à 5 jours selon la surface et l'accessibilité du chantier.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Diagnostic et pathologies de l'isolation des combles aménagés, référentiel 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "CSTB — DTU 45.10, pathologies et reprise d'isolation en rampants de toiture",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — Seuils de résistance thermique MaPrimeRénov' 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "Qualibat — Référentiel RGE, bonnes pratiques de reprise d'isolation thermique",
    url: "https://www.qualibat.com",
    date: "2026",
  },
]
