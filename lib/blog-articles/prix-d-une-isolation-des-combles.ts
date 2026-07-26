// =============================================================================
// Données article : Prix d'une isolation des combles — budget global et devis 2026
// Angle : coût total d'un projet (par taille de maison, devis, financement),
// complémentaire de l'article "prix-isolation-combles-au-m2" (tarifs au m²).
// Sources : ADEME, france-renov.gouv.fr, CAPEB, ANAH
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Prix d'une isolation des combles en 2026 : budget complet et devis",
  subtitle:
    "Combien coûte réellement une isolation des combles, tous postes compris ? Budget total par taille de logement, composition d'un devis, reste à charge après aides et conseils pour ne pas vous faire surprendre.",
  slug: "prix-d-une-isolation-des-combles",
  date: "26 juillet 2026",
  dateISO: "2026-07-26",
  readingTime: 13,
  author: "Greenter",
}

// Budget total (et non prix au m²) selon le type de chantier — vision "devis global"
export const BUDGET_TABLE = {
  columns: [
    { header: "Type de projet", key: "type" },
    { header: "Surface concernée", key: "surface" },
    { header: "Budget total TTC (hors aides)", key: "budget", highlight: true },
    { header: "Reste à charge estimé (ménage modeste)", key: "reste", highlight: true },
  ],
  rows: [
    {
      type: "Combles perdus, soufflage laine minérale",
      surface: "60–80 m²",
      budget: "1 500–3 000 €",
      reste: "0–300 €",
    },
    {
      type: "Combles perdus, soufflage ouate de cellulose",
      surface: "80–100 m²",
      budget: "2 200–4 000 €",
      reste: "100–500 €",
    },
    {
      type: "Combles aménageables, sous-rampants laine minérale",
      surface: "60–90 m²",
      budget: "3 500–6 500 €",
      reste: "800–2 000 €",
    },
    {
      type: "Combles aménagés, reprise complète avec finitions",
      surface: "70–100 m²",
      budget: "6 000–10 000 €",
      reste: "1 500–4 000 €",
    },
    {
      type: "Sarking (isolation par l'extérieur, toiture refaite)",
      surface: "80–120 m²",
      budget: "9 000–18 000 €",
      reste: "3 000–7 000 €",
    },
  ],
  caption:
    "Budgets constatés en Île-de-France en 2026, toutes fournitures et main-d'œuvre comprises, artisan certifié RGE. Reste à charge indicatif pour un ménage modeste cumulant MaPrimeRénov' et prime CEE. Sources : ADEME, CAPEB, professionnels RGE, juillet 2026.",
}

// Exemple chiffré — combles aménageables, ménage aux revenus intermédiaires
export const EXAMPLE_CALCULATION = {
  title:
    "Exemple de devis réel : isolation sous-rampants de 80 m² — ménage aux revenus intermédiaires (catégorie Violet)",
  lines: [
    { label: "Diagnostic + fourniture laine de roche (R = 6)", amount: "2 400 €" },
    { label: "Pose sous-rampants + pare-vapeur", amount: "1 800 €" },
    { label: "Finitions placo et jonctions", amount: "1 200 €" },
    { label: "Sous-total travaux HT", amount: "5 400 €" },
    { label: "TVA à 5,5 % (logement de plus de 2 ans)", amount: "297 €" },
    { label: "MaPrimeRénov' Violet (15 €/m² × 80 m²)", amount: "− 1 200 €" },
    { label: "Prime CEE Coup de Pouce (7 €/m² × 80 m²)", amount: "− 560 €" },
  ],
  total: { label: "Reste à charge final", amount: "≈ 3 937 €" },
  savings: "25 % d'économies sur la facture de chauffage dès la 1ʳᵉ année",
  roi: "Retour sur investissement estimé entre 6 et 8 ans pour ce type de chantier",
}

// Composition détaillée d'un devis d'isolation des combles
export const DEVIS_ITEMS = [
  {
    title: "Le diagnostic et la visite technique",
    detail:
      "Avant tout chiffrage sérieux, un artisan RGE doit se déplacer pour mesurer la surface exacte, vérifier l'accessibilité, contrôler l'état de la charpente et repérer d'éventuels points singuliers (conduits de cheminée, gaines électriques, présence d'amiante). Cette visite est généralement gratuite et conditionne la précision du devis final — méfiez-vous d'un prix donné par téléphone sans visite.",
  },
  {
    title: "La fourniture de l'isolant",
    detail:
      "C'est le poste le plus variable du devis : il dépend du matériau choisi (laine de verre, laine de roche, ouate de cellulose, polyuréthane) et de l'épaisseur nécessaire pour atteindre la résistance thermique R exigée par MaPrimeRénov'. Sur un devis total, la fourniture représente en général 35 à 50 % du montant hors taxes.",
  },
  {
    title: "La main-d'œuvre et la mise en œuvre",
    detail:
      "Le soufflage mécanique, la pose de panneaux sous-rampants ou la technique du Sarking mobilisent un temps de chantier très différent. Pour des combles perdus, comptez une demi-journée d'intervention ; pour des combles aménageables avec finitions, le chantier peut s'étaler sur 3 à 5 jours. La main-d'œuvre représente typiquement 30 à 45 % du budget total.",
  },
  {
    title: "La dépose de l'ancien isolant et l'évacuation",
    detail:
      "Si vos combles contiennent déjà un isolant dégradé, tassé ou suspecté de contenir de l'amiante (vermiculite, fréquente dans les maisons construites avant 1980), sa dépose et son évacuation en filière agréée ajoutent 300 à 800 € au devis global, diagnostic amiante compris le cas échéant.",
  },
  {
    title: "Les finitions (combles aménageables uniquement)",
    detail:
      "Pare-vapeur, ossature métallique, plaques de plâtre et bande à joint viennent compléter l'isolation sous-rampants pour obtenir un rendu fini. Ce poste, absent pour des combles perdus, peut représenter à lui seul 1 000 à 2 500 € sur un chantier de combles aménagés.",
  },
  {
    title: "La TVA et les frais annexes",
    detail:
      "Pour un logement achevé depuis plus de deux ans, la TVA à 5,5 % s'applique automatiquement sur l'ensemble de la facture dès lors que l'artisan est certifié RGE — un avantage substantiel par rapport au taux normal de 20 %. Certains devis incluent également des frais de déplacement ou de location de matériel, à vérifier ligne par ligne.",
  },
]

// Étapes pour bien comparer les devis et obtenir le meilleur prix
export const TIPS_STEPS = [
  {
    title: "Demandez au moins trois devis détaillés",
    detail:
      "Pour un même chantier, l'écart de prix entre artisans peut atteindre 30 à 50 %. Exigez un devis détaillé poste par poste (fourniture, pose, finitions) plutôt qu'un prix global forfaitaire, afin de pouvoir comparer objectivement les propositions.",
  },
  {
    title: "Vérifiez la certification RGE avant tout engagement",
    detail:
      "Sans artisan RGE (Reconnu Garant de l'Environnement), aucune aide financière n'est possible et le prix final de votre isolation des combles restera entièrement à votre charge. Le numéro RGE est vérifiable gratuitement sur le site officiel France Rénov'.",
  },
  {
    title: "Exigez la mention de la résistance thermique R sur le devis",
    detail:
      "Un devis sérieux précise l'épaisseur d'isolant posée et la résistance thermique R atteinte. En 2026, R ≥ 7 m².K/W est exigé pour les combles perdus et R ≥ 6 m².K/W pour les combles aménageables afin de rester éligible à MaPrimeRénov'.",
  },
  {
    title: "Faites chiffrer séparément la dépose de l'ancien isolant",
    detail:
      "Certains artisans intègrent ce poste dans le prix global, d'autres le facturent en supplément une fois le chantier commencé. Demandez que ce point soit explicitement chiffré dans le devis initial pour éviter les mauvaises surprises.",
  },
  {
    title: "Montez votre dossier d'aides avant la signature du devis",
    detail:
      "MaPrimeRénov' et les primes CEE doivent impérativement être demandées avant le début des travaux. Un artisan RGE sérieux prend en charge cette démarche et déduit directement le montant de l'aide sur votre facture finale, sans avance de trésorerie de votre part.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le prix moyen d'une isolation des combles en 2026 ?",
    answer:
      "Le prix d'une isolation des combles varie selon la nature du projet : comptez en moyenne 1 500 à 4 000 € pour des combles perdus isolés par soufflage (60 à 100 m²), et entre 3 500 et 10 000 € pour des combles aménageables ou aménagés, finitions comprises. Après déduction des aides financières, le reste à charge est généralement compris entre quelques dizaines d'euros et 2 000 € pour un ménage modeste ou intermédiaire.",
  },
  {
    question: "Combien coûte une isolation des combles avec un artisan RGE ?",
    answer:
      "Faire appel à un artisan certifié RGE est indispensable pour percevoir MaPrimeRénov' et les primes CEE — il n'y a donc pas d'alternative si vous souhaitez réduire le prix final grâce aux aides. Le coût d'intervention d'un artisan RGE est comparable à celui d'un artisan classique, la certification n'entraînant pas de surcoût réglementaire, même si certains professionnels très demandés pratiquent des tarifs légèrement supérieurs.",
  },
  {
    question: "Le prix d'une isolation des combles est-il le même partout en France ?",
    answer:
      "Non. Les tarifs de main-d'œuvre varient de 10 à 20 % entre l'Île-de-France et la province, la région parisienne étant la plus chère en raison du coût de la vie et de la forte demande. Les montants des aides MaPrimeRénov' restent en revanche identiques sur tout le territoire, ce qui rend le reste à charge proportionnellement plus faible en région.",
  },
  {
    question: "Peut-on isoler ses combles perdus pour moins de 1 000 € ?",
    answer:
      "Oui, c'est possible pour une petite surface (30 à 40 m²) isolée par soufflage de laine minérale, ou en réalisant soi-même la pose de rouleaux de laine de verre sur une surface accessible. Attention toutefois : des travaux réalisés en auto-rénovation (DIY) ne sont pas éligibles aux aides financières, qui exigent l'intervention d'un artisan RGE. Le prix affiché avant aides n'est donc pas toujours comparable au reste à charge final.",
  },
  {
    question: "Quel budget prévoir pour une isolation des combles sans aucune aide financière ?",
    answer:
      "Sans aides, il faut prévoir le prix plein du devis : 1 500 à 4 000 € pour des combles perdus, 3 500 à 10 000 € pour des combles aménageables, et jusqu'à 18 000 € pour une isolation par l'extérieur (Sarking) avec réfection de toiture. La quasi-totalité des ménages français reste éligible à au moins une aide (MaPrimeRénov' ou prime CEE), il est donc rare de devoir financer l'intégralité du chantier sans aucun soutien.",
  },
  {
    question: "En combien de temps le prix d'une isolation des combles est-il amorti ?",
    answer:
      "L'isolation des combles est le geste de rénovation énergétique le plus rentable : pour des combles perdus isolés par soufflage, le retour sur investissement est souvent inférieur à 2 ans grâce aux aides et aux économies de chauffage (jusqu'à 30 % de la facture). Pour des combles aménageables avec finitions, comptez plutôt 6 à 8 ans, la remise à neuf des finitions augmentant le budget initial.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Coûts des travaux d'isolation thermique en France, référentiel 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' : barèmes isolation des combles 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "CAPEB — Observatoire des prix de la rénovation énergétique, 2026",
    url: "https://www.capeb.fr",
    date: "2026",
  },
  {
    name: "ANAH — Résultats MaPrimeRénov' isolation des combles, données 2024–2025",
    url: "https://www.anah.gouv.fr",
    date: "2025",
  },
]
