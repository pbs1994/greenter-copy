// =============================================================================
// Données article : Isolation murs humides — diagnostic, isolants, étapes 2026
// Sources : ademe.fr, ecologie.gouv.fr, anah.gouv.fr, france-renov.gouv.fr
//           qualibat.com, cstb.fr, ffb.fr
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation Murs Humides : Traitement, Isolants et Étapes en 2026",
  subtitle:
    "Comment isoler un mur humide sans créer de moisissures ? Diagnostic condensation vs remontées capillaires, isolants perméables à la vapeur, VMC et aides financières 2026.",
  slug: "isolation-murs-humides",
  date: "5 juin 2026",
  dateISO: "2026-06-05",
  readingTime: 14,
  author: "Greenter",
}

// Tableau comparatif des isolants pour murs humides
export const ISOLANTS_TABLE = {
  columns: [
    { header: "Matériau", key: "materiau" },
    { header: "Perméabilité vapeur (Sd)", key: "vapeur", highlight: true },
    { header: "Comportement face à l'humidité", key: "comportement", highlight: true },
    { header: "Prix posé /m²", key: "prix" },
    { header: "Usage privilégié", key: "usage" },
  ],
  rows: [
    {
      materiau: "Laine de roche (panneaux semi-rigides)",
      vapeur: "Très perméable (Sd ≈ 0,04 m)",
      comportement: "Hydrophobe : repousse l'eau liquide, sèche rapidement",
      prix: "80–120 €",
      usage: "Murs intérieurs avec condensation modérée ou remontées capillaires traitées",
    },
    {
      materiau: "Liège expansé",
      vapeur: "Perméable (Sd ≈ 0,1–0,2 m)",
      comportement: "Naturellement imputrescible, régulateur hygroscopique",
      prix: "90–140 €",
      usage: "Murs anciens en pierre ou brique, maisons à ossature bois",
    },
    {
      materiau: "Panneaux XPS (polystyrène extrudé)",
      vapeur: "Quasi-imperméable (Sd ≈ 50–200 m)",
      comportement: "Résistant à l'immersion, insensible aux moisissures",
      prix: "70–110 €",
      usage: "Caves, sous-sols, murs enterrés, zones à fort risque d'infiltration",
    },
    {
      materiau: "Enduit isolant chaux-chanvre",
      vapeur: "Très perméable (Sd < 0,1 m)",
      comportement: "Absorbe et restitue la vapeur, assèche le mur dans le temps",
      prix: "50–80 €",
      usage: "Murs en pierre de taille, maisons anciennes sans pare-vapeur possible",
    },
    {
      materiau: "Frein-vapeur hygrovariable",
      vapeur: "Variable (Sd 0,3–10 m selon HR ambiante)",
      comportement: "S'adapte au taux d'humidité : protège en hiver, laisse respirer en été",
      prix: "10–20 € (membrane seule)",
      usage: "Recommandé côté intérieur pour tout doublage posé sur mur anciennement humide",
    },
  ],
  caption:
    "Perméabilité à la vapeur (Sd) : plus la valeur est faible, plus le matériau laisse respirer le mur. Sources : CSTB, fiches techniques fabricants, NF EN ISO 10456.",
}

// Tableau aides financières 2026
export const AIDES_TABLE = {
  columns: [
    { header: "Dispositif", key: "aide" },
    { header: "Montant 2026", key: "montant", highlight: true },
    { header: "Conditions principales", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' — isolation des murs (ITI)",
      montant: "75 €/m² (Bleu) · 60 €/m² (Jaune) · 40 €/m² (Violet) · 15 €/m² (Rose)",
      conditions:
        "Logement >15 ans, artisan RGE, plafond 150 m². Travaux de traitement anti-humidité préalables éligibles à l'éco-PTZ si réalisés dans la même opération.",
    },
    {
      aide: "Coup de pouce CEE isolation des murs",
      montant: "Variable selon zone climatique et surface",
      conditions:
        "Aucune condition de ressources. Négocié avec un obligé CEE (EDF, Engie, TotalEnergies…). Cumulable avec MaPrimeRénov'.",
    },
    {
      aide: "Éco-prêt à taux zéro (éco-PTZ)",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions:
        "Logement construit avant 1990. Artisan RGE. Durée jusqu'à 20 ans. Peut couvrir traitement anti-humidité + isolation dans une même opération.",
    },
    {
      aide: "TVA à taux réduit (5,5 %)",
      montant: "Sur fournitures + main-d'œuvre",
      conditions:
        "Logement achevé depuis plus de 2 ans. Artisan RGE non obligatoire pour la seule TVA réduite.",
    },
  ],
  caption:
    "Sources : france-renov.gouv.fr, anah.gouv.fr. Barèmes en vigueur au 1er janvier 2026. Vérifiez votre éligibilité sur maprimerenov.gouv.fr.",
}

// Étapes de l'isolation d'un mur humide
export const STEPS = [
  {
    title: "Diagnostiquer précisément la source d'humidité",
    detail:
      "Avant toute isolation, identifier l'origine exacte : condensation (buée sur vitres, taches noires aux angles), remontées capillaires (salpêtre et efflorescences à la base du mur), ou infiltrations extérieures (taches apparaissant après les pluies). Sans diagnostic précis, le traitement ne sera pas adapté — et l'isolant risque de se dégrader en quelques saisons.",
  },
  {
    title: "Traiter la source à la racine",
    detail:
      "Remontées capillaires : injection de résine hydrofuge dans la maçonnerie (50 à 120 €/ml) ou électro-osmose physique. Infiltrations : reprise de l'étanchéité extérieure, drainage du terrain, vérification des gouttières et évacuations. Condensation : installation ou remplacement de la VMC par une version hygroréglable B ou double flux. Ne jamais poser un isolant sur un problème non résolu.",
  },
  {
    title: "Laisser sécher le mur (4 à 8 semaines minimum)",
    detail:
      "Après traitement, laisser le mur sécher totalement. Un mur en brique ou béton après injection anti-capillaire nécessite 4 à 8 semaines à l'air libre. Utiliser un hygromètre de contact pour mesurer le taux d'humidité résiduelle — visez un taux inférieur à 5 % avant de poser l'isolant. Ne pas brûler cette étape.",
  },
  {
    title: "Vérifier ou installer la VMC",
    detail:
      "Une ventilation mécanique contrôlée (VMC) hygroréglable B ou double flux est indispensable dans les pièces humides pour extraire la vapeur d'eau avant qu'elle n'atteigne les murs froids. Sans VMC efficace, même un mur parfaitement traité et isolé peut redevenir humide par condensation intérieure en quelques hivers.",
  },
  {
    title: "Choisir et poser l'isolant adapté",
    detail:
      "Sur un mur anciennement humide : privilégier la laine de roche semi-rigide (hydrophobe, perméable vapeur, Sd ≈ 0,04 m) ou le liège expansé. En cave ou sous-sol exposé à l'humidité permanente : les panneaux XPS sont les seuls à résister à l'immersion. Éviter absolument la laine de verre sur un mur à risque : elle absorbe l'eau et perd ses propriétés thermiques.",
  },
  {
    title: "Poser un frein-vapeur hygrovariable (pas un pare-vapeur classique)",
    detail:
      "Un film polyéthylène classique (Sd > 100 m) bloquerait la vapeur et piégerait l'humidité résiduelle dans le mur. Sur un mur anciennement humide, utiliser un frein-vapeur hygrovariable (marques Pro Clima, Isover Vario, Knauf LDS) : son Sd varie de 0,3 m (été, humidité élevée) à 10 m (hiver, humidité basse), permettant au mur de respirer tout en protégeant l'isolant.",
  },
  {
    title: "Fermer, finir et contrôler après 6 mois",
    detail:
      "Poser des plaques de plâtre hydrofuges (type H1 en zone sèche, H2 en zone humide) et réaliser les finitions. Prévoir un point de contrôle 6 mois après la fin des travaux : vérifier l'absence de nouvelles taches, mesurer l'hygrométrie de la pièce (cible : 40–60 % HR) et contrôler le débit de la VMC. Un artisan RGE sérieux inclut ce suivi dans son devis.",
  },
]

// Calcul exemple
export const EXAMPLE_CALCULATION = {
  title: "Exemple : isolation murs humides d'une maison de 80 m² — ménage Jaune",
  lines: [
    { label: "Traitement anti-remontées capillaires (injection résine, 15 ml linéaires)", amount: "2 500 €" },
    { label: "Séchage, ragréage et préparation du support", amount: "400 €" },
    { label: "VMC hygroréglable B double flux (fourniture + pose)", amount: "1 800 €" },
    { label: "Isolation ITI — laine de roche 120 mm (80 m², 100 €/m²)", amount: "8 000 €" },
    { label: "Total travaux TTC (TVA 5,5 %)", amount: "12 700 €" },
    { label: "MaPrimeRénov' Jaune — isolation murs (60 €/m² × 80 m²)", amount: "– 4 800 €", isDeduction: true },
    { label: "Coup de pouce CEE (estimation zone H2)", amount: "– 600 €", isDeduction: true },
  ],
  total: { label: "Reste à charge estimé", amount: "7 300 €" },
  savings: "≈ 480 €/an sur la facture de chauffage",
  roi: "Retour en 15 ans",
}

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Peut-on isoler un mur humide directement sans le traiter avant ?",
    answer:
      "Non, et c'est l'une des erreurs les plus coûteuses en rénovation. Poser un isolant sur un mur humide non traité emprisonne l'humidité derrière le doublage : elle continue de progresser, génère des moisissures invisibles et dégrade l'isolant en quelques saisons. La facture d'un chantier à reprendre se chiffre souvent au double du coût initial. Il faut impérativement identifier et traiter la source (remontées capillaires, infiltrations ou condensation) puis laisser sécher le mur — au minimum 4 à 8 semaines — avant toute isolation.",
  },
  {
    question: "Quel est le meilleur isolant pour un mur humide ?",
    answer:
      "La réponse dépend du contexte. Pour un mur intérieur anciennement humide (remontées traitées, condensation résolue), la laine de roche semi-rigide est le choix optimal : hydrophobe, elle repousse l'eau résiduelle et sèche rapidement sans perdre ses propriétés thermiques. Pour un sous-sol ou une cave avec risque d'humidité permanente, les panneaux XPS (polystyrène extrudé) sont incontournables : quasi-imperméables à l'eau, ils résistent à l'immersion. Pour les murs en pierre anciens où la perméabilité doit être maximale, l'enduit chaux-chanvre ou le liège expansé sont les solutions les plus adaptées.",
  },
  {
    question: "Quelle est la différence entre condensation et remontées capillaires ?",
    answer:
      "Ce sont deux phénomènes très différents. La condensation se produit quand la vapeur d'eau intérieure rencontre une surface froide (mur mal isolé, vitrage) et se transforme en eau liquide. Elle apparaît en hiver, surtout sur les angles et les vitrages. Elle se traite par l'amélioration de l'isolation et de la ventilation (VMC). Les remontées capillaires viennent du sol : l'eau souterraine monte dans les pores de la maçonnerie par capillarité, parfois jusqu'à 1,5 m de hauteur. Visibles sous forme de taches blanches salines (salpêtre) à la base des murs, elles nécessitent une injection anti-capillaire dans la maçonnerie — la VMC ne suffit pas à les résoudre.",
  },
  {
    question: "Faut-il un pare-vapeur sur un mur humide ?",
    answer:
      "Pas un pare-vapeur classique. Un film polyéthylène standard (Sd > 100 m) bloquerait totalement la vapeur et piégerait l'humidité résiduelle dans le mur, aggravant le problème. Sur un mur anciennement humide, il faut utiliser un frein-vapeur hygrovariable dont la résistance à la vapeur varie automatiquement : faible en été (le mur peut sécher vers l'intérieur) et plus élevée en hiver (l'isolant est protégé de la vapeur intérieure). Ces membranes (Pro Clima Intello, Isover Vario, Knauf LDS…) coûtent 10 à 20 €/m² et sont décisives pour la durabilité du chantier.",
  },
  {
    question: "La VMC suffit-elle à résoudre un problème d'humidité dans les murs ?",
    answer:
      "La VMC résout efficacement les problèmes de condensation d'origine intérieure — vapeur de cuisson, douche, respiration des occupants. Elle est indispensable et très efficace pour ces cas. En revanche, elle ne traite ni les remontées capillaires (eau du sol) ni les infiltrations extérieures, qui ont des origines différentes. Une VMC bien réglée est un prérequis pour toute isolation de mur, mais elle ne se substitue pas à un traitement anti-capillaire ou à une reprise d'étanchéité extérieure.",
  },
  {
    question: "Quelles aides financières pour l'isolation d'un mur humide en 2026 ?",
    answer:
      "Les mêmes aides que pour l'isolation classique s'appliquent sur la partie isolation : MaPrimeRénov' (15 à 75 €/m² selon les revenus), Coup de pouce CEE, éco-PTZ jusqu'à 50 000 € à taux zéro et TVA à 5,5 %. Le traitement anti-humidité lui-même (injection anti-capillaire, reprise d'étanchéité) n'est pas directement subventionné par MaPrimeRénov', mais peut être inclus dans un éco-PTZ si réalisé dans le cadre d'une rénovation globale avec artisan RGE.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Humidité dans les parois : diagnostic et traitement",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "CSTB — NF DTU 20.1 et fiches techniques isolation des murs avec régulation hygrique",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' isolation des murs, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "ANAH — Barèmes de ressources MaPrimeRénov' 2026",
    url: "https://www.anah.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Qualibat — Traitement de l'humidité des murs : injection de résine et électro-osmose",
    url: "https://www.qualibat.com",
    date: "2025",
  },
]
