// =============================================================================
// Données article : Fixation des panneaux solaires sur tuiles (2026)
// Angle : comment des panneaux tiennent sur un toit en tuiles sans créer de
// fuite. Surimposition sur crochets (standard actuel) vs intégration au bâti,
// crochet adapté à chaque tuile (mécanique, romane, canal, plate, béton),
// pose en 8 étapes, espacement des crochets, erreurs fréquentes, cadre
// technique et assurance (DTU série 40.2, évaluations CSTB, Eurocodes,
// UTE C15-712-1), coût et entretien. Complète taille-panneaux-solaires.
// Sources : CSTB, DTU 40.21 / 40.22 / 40.23 / 40.24, NF EN 1991, guide
// UTE C15-712-1, photovoltaique.info (Hespul), Qualit'EnR
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Fixation des panneaux solaires sur tuiles : crochets, pose et erreurs à éviter",
  subtitle:
    "Fixation des panneaux solaires sur tuiles : quel crochet selon votre tuile, surimposition ou intégration, étapes de pose, étanchéité, normes et erreurs à éviter.",
  slug: "fixation-panneaux-solaires-sur-tuiles",
  date: "30 octobre 2026",
  dateISO: "2026-10-30",
  readingTime: 14,
  author: "Greenter",
}

// Systèmes de pose
export const SYSTEMES_TABLE = {
  columns: [
    { header: "Système", key: "systeme" },
    { header: "Principe", key: "principe" },
    { header: "Étanchéité", key: "etancheite", highlight: true },
    { header: "Usage en 2026", key: "usage" },
  ],
  rows: [
    { systeme: "Surimposition sur crochets", principe: "Crochets fixés aux chevrons sous les tuiles, rails et panneaux posés au-dessus de la couverture", etancheite: "Assurée par les tuiles, conservées", usage: "La grande majorité des installations résidentielles" },
    { systeme: "Intégration simplifiée au bâti", principe: "Panneaux posés dans un bac ou sur un écran étanche, à la place d'une partie des tuiles", etancheite: "Assurée par le bac et les abergements", usage: "Rare, pour des raisons esthétiques ou d'urbanisme" },
    { systeme: "Intégration au bâti", principe: "Les panneaux eux-mêmes forment la couverture", etancheite: "Assurée par les panneaux et leurs joints", usage: "Très rare depuis la fin de la prime à l'intégration en 2018" },
    { systeme: "Tuiles photovoltaïques", principe: "Tuiles solaires qui remplacent les tuiles classiques", etancheite: "Assurée par les tuiles solaires", usage: "Secteurs protégés, coût élevé par kWc" },
  ],
  caption:
    "La surimposition est devenue la règle car elle conserve la couverture existante, limite le risque d'infiltration et coûte moins cher. L'intégration au bâti a été largement abandonnée après de nombreux sinistres liés à des défauts d'étanchéité.",
}

// Crochets selon le type de tuile
export const TUILES_TABLE = {
  columns: [
    { header: "Type de tuile", key: "tuile" },
    { header: "Fixation adaptée", key: "fixation", highlight: true },
    { header: "Point de vigilance", key: "vigilance" },
  ],
  rows: [
    { tuile: "Tuile mécanique à emboîtement", fixation: "Crochet standard, réglable en hauteur", vigilance: "Entailler légèrement la tuile du dessus pour le passage du crochet" },
    { tuile: "Tuile romane ou à fort galbe", fixation: "Crochet à grande amplitude de réglage, ou tuile métallique de remplacement", vigilance: "Le crochet ne doit jamais reposer sur le galbe de la tuile" },
    { tuile: "Tuile canal", fixation: "Crochet long spécifique, ou tuile de remplacement avec platine", vigilance: "Tuiles souvent scellées ou posées sur plaques : la méthode dépend du support" },
    { tuile: "Tuile plate (petit moule)", fixation: "Crochet plat de faible épaisseur, ou plaque métallique de remplacement", vigilance: "Beaucoup de petites tuiles à déplacer, souvent anciennes et fragiles" },
    { tuile: "Tuile béton", fixation: "Crochet standard, réglable en hauteur", vigilance: "Tuile lourde et épaisse : vérifier la hauteur de réglage du crochet" },
  ],
  caption:
    "Les fabricants de systèmes de fixation proposent des crochets dédiés à chaque modèle de tuile. Le bon choix se fait après identification précise de la tuile et du support sur lequel elle repose (liteaux, voliges, plaques sous-tuiles).",
}

// Étapes de pose
export const POSE_STEPS = [
  {
    title: "Calepinage et repérage des chevrons",
    detail:
      "L'installateur trace la position des panneaux sur le toit et repère les chevrons, généralement espacés de 50 à 60 cm. Les crochets se fixent toujours dans les chevrons, jamais dans les liteaux qui portent les tuiles.",
  },
  {
    title: "Dépose des tuiles au droit des crochets",
    detail:
      "Seules les tuiles situées à l'emplacement des crochets sont soulevées ou retirées. Le couvreur en profite pour remplacer celles qui sont fêlées ou poreuses, car elles seront difficiles d'accès une fois les panneaux posés.",
  },
  {
    title: "Fixation des crochets dans les chevrons",
    detail:
      "Chaque crochet est vissé dans le chevron avec des vis en inox du diamètre et de la longueur prévus par la notice. L'espacement entre crochets, souvent 1 à 1,2 m, se resserre en bordure de toit et dans les régions exposées au vent ou à la neige.",
  },
  {
    title: "Réglage de la hauteur et alignement",
    detail:
      "Les crochets réglables sont ajustés pour que leur bras passe au-dessus de la tuile sans la toucher et que les rails soient parfaitement plans. Un cordeau tendu sert de repère sur toute la longueur de la rangée.",
  },
  {
    title: "Repose et entaille des tuiles",
    detail:
      "La tuile qui recouvre le crochet est remise en place. Si besoin, on l'entaille légèrement à la meuleuse pour laisser passer le bras du crochet, afin qu'elle retrouve son emboîtement et que l'eau continue de s'écouler normalement.",
  },
  {
    title: "Montage des rails",
    detail:
      "Les rails en aluminium sont boulonnés sur les crochets, horizontalement dans la plupart des cas, à raison de deux rails par rangée de panneaux. Des éclisses relient les tronçons de rail sur les grandes longueurs.",
  },
  {
    title: "Pose des panneaux",
    detail:
      "Les panneaux sont serrés sur les rails par des brides d'extrémité et des brides intermédiaires, dans les zones de serrage définies par le fabricant et au couple indiqué. Les micro-onduleurs ou optimiseurs sont fixés sur les rails au même moment.",
  },
  {
    title: "Câblage et mise à la terre",
    detail:
      "Les cadres et les rails sont reliés à la terre. Les câbles descendent sous la couverture par une tuile à douille ou une chatière, sans percer de tuile, puis rejoignent l'onduleur et le tableau électrique, avant le passage du Consuel.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Comment fixer des panneaux solaires sur des tuiles ?",
    answer:
      "La méthode la plus courante est la surimposition. On soulève quelques tuiles, on visse des crochets en inox ou en aluminium dans les chevrons de la charpente, puis on remet les tuiles en place. Des rails sont boulonnés sur ces crochets et les panneaux y sont serrés par des brides. La couverture reste intacte et continue d'assurer l'étanchéité.",
  },
  {
    question: "Faut-il percer les tuiles pour installer des panneaux solaires ?",
    answer:
      "Non. Avec un système de surimposition, aucune tuile n'est percée. Les crochets passent entre deux tuiles et se fixent dans les chevrons. Tout au plus, la tuile qui recouvre le crochet est légèrement entaillée pour laisser passer son bras. Un installateur qui perce les tuiles crée un risque d'infiltration durable.",
  },
  {
    question: "Combien de crochets faut-il par panneau solaire ?",
    answer:
      "Comptez en moyenne deux crochets par panneau posé en portrait, avec deux rails par rangée et un crochet tous les 1 à 1,2 m environ. Le nombre exact dépend de la zone de vent et de neige, de la position sur le toit et de la notice du fabricant : les bords de toiture, plus exposés aux rafales, demandent des crochets plus rapprochés.",
  },
  {
    question: "Les panneaux solaires sur tuiles risquent-ils de provoquer des fuites ?",
    answer:
      "Pas avec une surimposition correctement posée, puisque les tuiles conservent leur rôle d'étanchéité. Les fuites viennent presque toujours d'une erreur de pose : crochet qui soulève ou casse une tuile, tuile percée, passage de câble mal traité. Les anciennes installations intégrées au bâti sont en revanche plus souvent concernées par des infiltrations.",
  },
  {
    question: "Peut-on fixer des panneaux solaires sur des tuiles canal ?",
    answer:
      "Oui, avec des crochets spécifiques plus longs ou des tuiles de remplacement métalliques munies d'une platine. La méthode dépend du support : tuiles posées sur liteaux, sur plaques sous-tuiles ou scellées au mortier. Les tuiles canal sont fragiles et la pose demande un couvreur habitué à ce type de couverture.",
  },
  {
    question: "Combien coûte un système de fixation pour panneaux solaires sur tuiles ?",
    answer:
      "Pour une installation de 3 kWc, le matériel de fixation en surimposition, crochets, rails, brides et visserie, coûte généralement 300 à 600 € selon le type de tuile et la marque. Il est compris dans le prix d'une installation clé en main. Les tuiles canal et plates, qui demandent des pièces spécifiques, sont un peu plus chères à équiper.",
  },
  {
    question: "Peut-on poser soi-même des panneaux solaires sur un toit en tuiles ?",
    answer:
      "C'est techniquement possible mais déconseillé. Le travail en hauteur expose à un risque de chute, une erreur de fixation peut provoquer des fuites ou un arrachement par le vent, et votre assurance habitation peut refuser de couvrir les dommages. La TVA à 5,5 % s'applique par ailleurs à des travaux facturés par une entreprise.",
  },
  {
    question: "Que devient la fixation lors d'une réfection de toiture ?",
    answer:
      "Les panneaux, les rails et les crochets doivent être déposés puis reposés, ce qui coûte plusieurs centaines à quelques milliers d'euros selon la taille de l'installation. C'est pourquoi il est préférable de remplacer une couverture en fin de vie avant de poser des panneaux solaires prévus pour durer trente ans.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "CSTB : évaluations techniques des procédés photovoltaïques (Avis techniques, Pass'Innovation)",
    url: "https://evaluation.cstb.fr",
    date: "2026",
  },
  {
    name: "AFNOR : NF DTU série 40.2, couvertures en tuiles (40.21 terre cuite à emboîtement, 40.22 tuiles canal, 40.23 tuiles plates, 40.24 tuiles en béton)",
    url: "https://www.boutique.afnor.org",
    date: "2025",
  },
  {
    name: "AFNOR : Eurocode 1, NF EN 1991-1-3 (charges de neige) et NF EN 1991-1-4 (actions du vent)",
    url: "https://www.boutique.afnor.org",
    date: "2025",
  },
  {
    name: "UTE C15-712-1 : installations photovoltaïques raccordées au réseau public de distribution",
    url: "https://www.photovoltaique.info",
    date: "2025",
  },
  {
    name: "Hespul : photovoltaique.info, modes de pose en toiture et sinistralité",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
]
