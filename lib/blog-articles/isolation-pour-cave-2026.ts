// =============================================================================
// Données article : Isolation pour cave — plafond, murs, matériaux et prix 2026
// Sources : ademe.fr, france-renov.gouv.fr, anah.gouv.fr, cstb.fr, qualibat.com
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation pour Cave : Guide Complet 2026 (Plafond, Murs, Matériaux, Prix)",
  subtitle:
    "Comment bien isoler une cave ? Isolation du plafond, des murs et du sol, comparatif des matériaux (polystyrène extrudé, polyuréthane, laine de roche, laine de verre), étapes de pose et aides financières 2026.",
  slug: "isolation-pour-cave",
  date: "19 juillet 2026",
  dateISO: "2026-07-19",
  readingTime: 15,
  author: "Greenter",
}

// Tableau comparatif des isolants pour le plafond d'une cave
export const ISOLANTS_CAVE_TABLE = {
  columns: [
    { header: "Matériau isolant", key: "materiau" },
    { header: "Résistance thermique (λ)", key: "lambda", highlight: true },
    { header: "Comportement à l'humidité", key: "humidite", highlight: true },
    { header: "Prix posé /m²", key: "prix" },
    { header: "Usage privilégié", key: "usage" },
  ],
  rows: [
    {
      materiau: "Polystyrène extrudé (XPS)",
      lambda: "λ ≈ 0,029–0,035 W/m.K",
      humidite: "Quasi imperméable, résiste à l'immersion prolongée",
      prix: "25–45 €",
      usage: "Cave humide, cave enterrée, plafond en contact avec la terre",
    },
    {
      materiau: "Polystyrène expansé (PSE)",
      lambda: "λ ≈ 0,032–0,038 W/m.K",
      humidite: "Sensible à l'humidité prolongée, à réserver aux caves saines",
      prix: "15–30 €",
      usage: "Cave sèche et ventilée, budget maîtrisé",
    },
    {
      materiau: "Mousse de polyuréthane (PUR/PIR)",
      lambda: "λ ≈ 0,022–0,028 W/m.K",
      humidite: "Bonne résistance, projection sans joint ni pont thermique",
      prix: "35–60 €",
      usage: "Plafond irrégulier, solives apparentes, isolation optimale au m²",
    },
    {
      materiau: "Laine de roche",
      lambda: "λ ≈ 0,035–0,040 W/m.K",
      humidite: "Hydrophobe et perméable à la vapeur, sèche sans se dégrader",
      prix: "20–35 €",
      usage: "Cave saine, isolation thermique et acoustique combinée",
    },
    {
      materiau: "Laine de verre",
      lambda: "λ ≈ 0,032–0,040 W/m.K",
      humidite: "Hydrophile, à éviter en cave humide ou mal ventilée",
      prix: "12–25 €",
      usage: "Cave sèche, budget serré, plafond bien ventilé",
    },
  ],
  caption:
    "Plus le λ (lambda) est faible, plus le matériau isole efficacement à épaisseur égale. Prix indicatifs fourniture + pose, hors aides. Sources : CSTB, fiches techniques fabricants.",
}

// Tableau aides financières 2026 pour l'isolation d'une cave (plancher bas / plafond de sous-sol)
export const AIDES_CAVE_TABLE = {
  columns: [
    { header: "Dispositif", key: "aide" },
    { header: "Montant 2026", key: "montant", highlight: true },
    { header: "Conditions principales", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' — isolation plancher bas / plafond de cave",
      montant: "25 €/m² (Bleu) · 20 €/m² (Jaune) · 15 €/m² (Violet) · 10 €/m² (Rose)",
      conditions:
        "Logement de plus de 15 ans, artisan certifié RGE obligatoire, résistance thermique R ≥ 3 m².K/W exigée.",
    },
    {
      aide: "Coup de pouce CEE isolation plancher bas",
      montant: "Variable selon zone climatique et surface isolée",
      conditions:
        "Aucune condition de ressources. Négocié auprès d'un obligé CEE (EDF, Engie, TotalEnergies…). Cumulable avec MaPrimeRénov'.",
    },
    {
      aide: "Éco-prêt à taux zéro (éco-PTZ)",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions:
        "Logement achevé avant 1990, artisan RGE, durée jusqu'à 20 ans. Peut financer le traitement de l'humidité et l'isolation dans une même opération.",
    },
    {
      aide: "TVA à taux réduit (5,5 %)",
      montant: "Sur fournitures et main-d'œuvre",
      conditions:
        "Logement achevé depuis plus de 2 ans. S'applique automatiquement sur la facture de l'artisan.",
    },
  ],
  caption:
    "Sources : france-renov.gouv.fr, anah.gouv.fr. Barèmes indicatifs au 1er janvier 2026, à vérifier sur maprimerenov.gouv.fr selon votre situation.",
}

// Étapes pour isoler le plafond d'une cave
export const STEPS_CAVE = [
  {
    title: "Diagnostiquer l'état de la cave avant toute isolation",
    detail:
      "Avant d'isoler une cave, il faut évaluer trois éléments : la nature du plafond (dalle béton, solives bois, hourdis), la hauteur sous plafond disponible (une contrainte fréquente en sous-sol) et surtout la présence d'humidité. Un diagnostic humidité mal fait est la première cause d'échec d'un chantier d'isolation de cave.",
  },
  {
    title: "Traiter les problèmes d'humidité si la cave est humide",
    detail:
      "Une cave mal isolée est presque toujours une cave humide. Avant de poser le moindre isolant, il faut identifier la source (condensation, remontées capillaires, infiltrations), la traiter (ventilation, drainage périphérique, enduit hydrofuge) et vérifier avec un hygromètre que le taux d'humidité résiduelle est acceptable.",
  },
  {
    title: "Choisir le matériau isolant adapté à votre cave",
    detail:
      "Pour une cave enterrée ou humide, le polystyrène extrudé (XPS) reste la référence grâce à son imperméabilité. Pour une cave saine et bien ventilée, la laine de roche ou le polystyrène expansé offrent un excellent rapport performance-prix. La mousse de polyuréthane projetée convient particulièrement aux plafonds irréguliers avec solives apparentes.",
  },
  {
    title: "Poser les panneaux isolants ou projeter la mousse au plafond",
    detail:
      "Les panneaux (XPS, PSE, laine de roche) se fixent mécaniquement ou se collent directement sous la dalle ou entre les solives. La mousse de polyuréthane, elle, est projetée in situ : elle épouse parfaitement les irrégularités du plafond de la cave et supprime les ponts thermiques au niveau des jonctions.",
  },
  {
    title: "Traiter les ponts thermiques et les points singuliers",
    detail:
      "Les jonctions entre les murs et le plafond, les passages de gaines techniques et les trémies d'escalier sont des points sensibles où l'air froid s'infiltre facilement. Un calfeutrement soigné à ces endroits conditionne la performance globale de l'isolation.",
  },
  {
    title: "Poser une finition adaptée : plaques de plâtre ou faux plafond",
    detail:
      "Selon l'usage de la cave, on termine par des plaques de plâtre hydrofuges (type H1 ou H2) vissées sur ossature, ou par un faux plafond démontable qui facilite l'accès aux réseaux. Dans une cave humide, privilégier systématiquement les plaques hydrofuges plutôt que le plâtre standard.",
  },
  {
    title: "Vérifier la ventilation après travaux",
    detail:
      "Une cave mieux isolée est aussi une cave plus étanche à l'air. Il faut donc maintenir une ventilation basse (grilles d'aération, VMC si la cave est chauffée ou aménagée) pour éviter que l'humidité ambiante ne stagne derrière le nouvel isolant.",
  },
]

// Calcul exemple
export const EXAMPLE_CALCULATION_CAVE = {
  title: "Exemple : isolation du plafond d'une cave de 40 m² — ménage Jaune",
  lines: [
    { label: "Diagnostic humidité et petits travaux préparatoires", amount: "350 €" },
    { label: "Fourniture et pose de panneaux XPS 80 mm (40 m², 35 €/m²)", amount: "1 400 €" },
    { label: "Traitement des ponts thermiques et finitions", amount: "300 €" },
    { label: "Total travaux TTC (TVA 5,5 %)", amount: "2 050 €" },
    { label: "MaPrimeRénov' Jaune — isolation plancher bas (20 €/m² × 40 m²)", amount: "– 800 €", isDeduction: true },
    { label: "Coup de pouce CEE (estimation zone H2)", amount: "– 200 €", isDeduction: true },
  ],
  total: { label: "Reste à charge estimé", amount: "1 050 €" },
  savings: "≈ 150 à 220 €/an sur la facture de chauffage",
  roi: "Retour en 5 à 7 ans",
}

// FAQ
export const FAQ_ITEMS_CAVE = [
  {
    question: "Pourquoi isoler une cave ?",
    answer:
      "Une cave non isolée est responsable de déperditions thermiques significatives, en particulier lorsqu'elle se trouve directement sous des pièces de vie chauffées. L'air froid stagnant dans une cave mal isolée refroidit le plancher du rez-de-chaussée par conduction, ce qui oblige le chauffage à compenser en continu. Isoler une cave permet donc de réduire ces pertes de chaleur, d'améliorer le confort thermique des pièces situées au-dessus (fini les pieds froids en hiver), et de limiter les remontées d'humidité et les odeurs de moisi vers le reste de la maison. C'est aussi un préalable souvent négligé, alors qu'il figure parmi les travaux de rénovation énergétique les plus rentables au m².",
  },
  {
    question: "Faut-il isoler le plafond ou les murs d'une cave ?",
    answer:
      "Dans la grande majorité des cas, l'isolation du plafond de la cave est la priorité absolue, car c'est la paroi qui sépare directement la cave des pièces chauffées du dessus. Isoler uniquement les murs d'une cave enterrée a un intérêt thermique plus limité, car ces murs sont en contact avec la terre, dont la température reste relativement stable toute l'année. En revanche, si la cave est utilisée comme pièce de vie, un atelier ou une buanderie chauffée, isoler également les murs et le sol devient pertinent pour obtenir une isolation globale et un vrai confort thermique et acoustique.",
  },
  {
    question: "Quel isolant choisir pour une cave humide ?",
    answer:
      "Pour une cave humide ou enterrée, le polystyrène extrudé (XPS) est le matériau isolant le plus adapté : quasi imperméable à l'eau, il résiste à l'immersion prolongée sans se dégrader ni perdre ses performances. La mousse de polyuréthane projetée est également une bonne option sur un plafond irrégulier. À l'inverse, la laine de verre doit être évitée dans une cave humide : elle est hydrophile, absorbe l'eau, s'affaisse et perd l'essentiel de ses propriétés isolantes. Dans tous les cas, les problèmes d'humidité doivent être traités avant toute pose d'isolant, sous peine de voir apparaître moisissures et dégradations en quelques mois.",
  },
  {
    question: "Combien coûte l'isolation d'une cave ?",
    answer:
      "Le prix de l'isolation d'une cave dépend surtout du matériau choisi et de l'état du plafond. Comptez entre 15 et 30 €/m² posé pour du polystyrène expansé ou de la laine de verre, 20 à 45 €/m² pour du polystyrène extrudé ou de la laine de roche, et 35 à 60 €/m² pour une projection de mousse de polyuréthane. Pour une cave de 40 m², le budget total se situe généralement entre 1 000 et 2 500 € avant aides financières, et souvent moins de la moitié après déduction de MaPrimeRénov' et des primes CEE.",
  },
  {
    question: "Quelles aides financières pour isoler une cave en 2026 ?",
    answer:
      "L'isolation du plafond d'une cave est éligible à MaPrimeRénov' au titre de l'isolation des planchers bas, avec des montants allant de 10 à 25 €/m² selon les revenus du foyer, à condition de faire appel à un artisan certifié RGE et d'atteindre une résistance thermique R ≥ 3 m².K/W. Ces travaux sont également éligibles au Coup de pouce CEE, à l'éco-prêt à taux zéro (jusqu'à 50 000 € à 0 %) et à la TVA réduite à 5,5 %. Ces aides sont cumulables entre elles, ce qui permet souvent de diviser le reste à charge par deux ou trois.",
  },
  {
    question: "Peut-on isoler soi-même le plafond d'une cave ?",
    answer:
      "La pose de panneaux isolants (polystyrène expansé, extrudé ou laine de roche) au plafond d'une cave est un chantier accessible à un bricoleur bien équipé, à condition que le plafond soit sain et sec. En revanche, la projection de mousse de polyuréthane nécessite un matériel professionnel et un opérateur formé. Attention également : faire appel à un artisan RGE est indispensable pour prétendre à MaPrimeRénov' et aux autres aides financières disponibles — l'auto-rénovation, même bien réalisée, n'ouvre droit à aucune de ces aides.",
  },
]

// Sources
export const SOURCES_CAVE = [
  {
    name: "ADEME — Isolation des planchers bas et des caves : enjeux et matériaux",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' isolation des planchers bas, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "CSTB — Fiches techniques isolation thermique et gestion de l'humidité en sous-sol",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "ANAH — Barèmes de ressources MaPrimeRénov' 2026",
    url: "https://www.anah.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Qualibat — Traitement de l'humidité en cave et sous-sol avant travaux d'isolation",
    url: "https://www.qualibat.com",
    date: "2025",
  },
]
