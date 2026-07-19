// =============================================================================
// Données article : Pompe à chaleur pour appartement — types, copropriété, prix 2026
// Sources : ademe.fr, service-public.fr, legifrance.gouv.fr, apc-paris.com,
//           france-renov.gouv.fr, qualit-enr.org
// Date de rédaction : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à Chaleur pour Appartement : Guide Complet 2026 (Types, Copropriété, Prix)",
  subtitle:
    "Peut-on installer une pompe à chaleur pour appartement ? Types adaptés (air-air, air-eau, sans unité extérieure), accord de copropriété, urbanisme, nuisance sonore, prix et aides financières 2026.",
  slug: "pompe-a-chaleur-pour-appartement",
  date: "19 juillet 2026",
  dateISO: "2026-07-19",
  readingTime: 15,
  author: "Greenter",
}

// Tableau comparatif des types de PAC adaptées à un appartement
export const TYPES_PAC_APPART_TABLE = {
  columns: [
    { header: "Type de pompe à chaleur", key: "type" },
    { header: "Fonctionnement", key: "fonctionnement", highlight: true },
    { header: "Convient à un appartement si...", key: "condition", highlight: true },
    { header: "Prix installé", key: "prix" },
  ],
  rows: [
    {
      type: "PAC air-air réversible",
      fonctionnement: "Capte les calories de l'air extérieur et les diffuse par une ou plusieurs unités intérieures",
      condition: "Balcon, loggia ou façade accessible pour l'unité extérieure + accord de la copropriété",
      prix: "4 000–9 000 € (mono-split) · 8 000–15 000 € (multi-split)",
    },
    {
      type: "PAC air-eau",
      fonctionnement: "Capte les calories de l'air extérieur et alimente un circuit de chauffage central (radiateurs ou plancher chauffant) et l'eau chaude sanitaire",
      condition: "Remplacement d'une chaudière individuelle, avec accès façade, toiture-terrasse ou local technique",
      prix: "10 000–16 000 €",
    },
    {
      type: "PAC géothermique",
      fonctionnement: "Capte les calories du sol via des capteurs enterrés ou des sondes verticales",
      condition: "Quasiment impossible en appartement standard ; réservée aux réseaux de chaleur collectifs",
      prix: "15 000–25 000 € (rare en copropriété)",
    },
    {
      type: "PAC sur air extrait (sans unité extérieure individuelle)",
      fonctionnement: "Capte les calories présentes dans l'air vicié extrait par la VMC avant de le rejeter",
      condition: "Appartement sans balcon ni accès en façade, immeuble équipé d'une VMC collective compatible",
      prix: "6 000–11 000 €",
    },
  ],
  caption:
    "Prix indicatifs fourniture + pose, hors aides financières. Sources : ADEME, fiches techniques fabricants, devis moyens constatés en 2026.",
}

// Tableau aides financières 2026
export const AIDES_PAC_APPART_TABLE = {
  columns: [
    { header: "Dispositif", key: "aide" },
    { header: "Montant 2026", key: "montant", highlight: true },
    { header: "Conditions principales", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' — pompe à chaleur air-eau",
      montant: "Jusqu'à 5 000 € (Bleu) selon les revenus du foyer",
      conditions:
        "Logement de plus de 15 ans, artisan certifié RGE QualiPAC. Remplace une chaudière au gaz, au fioul ou électrique existante.",
    },
    {
      aide: "MaPrimeRénov' Copropriétés",
      montant: "Jusqu'à 25 % du montant des travaux, plafonné selon le nombre de logements",
      conditions:
        "Vote en assemblée générale du syndicat de copropriété, audit énergétique collectif préalable, artisan RGE.",
    },
    {
      aide: "Coup de pouce CEE",
      montant: "Variable selon les revenus et la zone climatique",
      conditions:
        "Aucune condition d'ancienneté du logement. Cumulable avec MaPrimeRénov'. Négocié auprès d'un obligé CEE.",
    },
    {
      aide: "Éco-prêt à taux zéro (éco-PTZ)",
      montant: "Jusqu'à 50 000 € à 0 %",
      conditions:
        "Logement achevé avant 1990, artisan RGE, durée jusqu'à 20 ans. Existe aussi en version copropriété.",
    },
    {
      aide: "TVA à taux réduit (5,5 %)",
      montant: "Sur fournitures et main-d'œuvre",
      conditions:
        "Logement achevé depuis plus de 2 ans. S'applique automatiquement sur la facture de l'artisan RGE.",
    },
  ],
  caption:
    "Sources : france-renov.gouv.fr, anah.gouv.fr. Barèmes indicatifs au 1er janvier 2026, à vérifier sur maprimerenov.gouv.fr selon votre situation.",
}

// Étapes pour installer une PAC en appartement
export const STEPS_PAC_APPART = [
  {
    title: "Vérifier la faisabilité technique de l'installation",
    detail:
      "Avant tout projet d'installation d'une pompe à chaleur, il faut identifier un emplacement possible pour l'unité extérieure : balcon, loggia, façade accessible, toiture-terrasse ou local technique commun. Sans emplacement viable, certains types de pompes à chaleur devront être écartés au profit d'une solution sans unité extérieure individuelle.",
  },
  {
    title: "Consulter le règlement de copropriété et solliciter l'accord du syndicat",
    detail:
      "L'installation d'une pompe à chaleur touchant une façade, une toiture ou une partie commune nécessite presque toujours l'accord de la copropriété, obtenu en assemblée générale. Le règlement de copropriété peut aussi imposer des contraintes esthétiques (couleur, habillage, emplacement précis) à respecter dans le projet.",
  },
  {
    title: "Vérifier les règles d'urbanisme locales",
    detail:
      "Selon la commune, l'installation d'une unité extérieure visible depuis la rue peut être soumise aux règles d'urbanisme du plan local, en particulier dans les zones protégées ou proches de monuments historiques. Une déclaration préalable de travaux en mairie est souvent nécessaire avant de commencer le chantier.",
  },
  {
    title: "Choisir le type de pompe à chaleur adapté à votre appartement",
    detail:
      "Une pompe à chaleur air-air convient à un appartement disposant d'un accès extérieur pour un budget maîtrisé. Une pompe à chaleur air-eau s'impose si vous remplacez une chaudière alimentant des radiateurs ou un plancher chauffant. Sans aucun accès extérieur, une pompe à chaleur sur air extrait reste la seule option réaliste.",
  },
  {
    title: "Faire dimensionner l'installation par un professionnel RGE",
    detail:
      "La puissance de la pompe à chaleur doit être calculée selon la surface, l'isolation et l'exposition de l'appartement. Un équipement surdimensionné coûte plus cher à l'achat et fonctionne en cycles courts moins efficaces ; sous-dimensionné, il ne parvient pas à maintenir la température en hiver.",
  },
  {
    title: "Traiter l'emplacement de l'unité extérieure pour limiter la nuisance sonore",
    detail:
      "En habitat collectif, la nuisance sonore est le premier motif de conflit de voisinage lié à une pompe à chaleur. Plots anti-vibratiles, orientation évitant les fenêtres de chambres et distance suffisante avec le logement voisin doivent être validés avant la pose définitive de l'unité extérieure.",
  },
  {
    title: "Faire réaliser l'installation par un artisan certifié RGE QualiPAC",
    detail:
      "Seul un professionnel certifié RGE QualiPAC permet de bénéficier des aides financières 2026. Il se charge du raccordement frigorifique, électrique et hydraulique, de la mise en service, et peut monter les dossiers MaPrimeRénov' et CEE pour le compte du copropriétaire ou du syndicat.",
  },
]

// Calcul exemple
export const EXAMPLE_CALCULATION_PAC_APPART = {
  title: "Exemple : installation d'une PAC air-air dans un appartement de 65 m² — ménage Jaune",
  lines: [
    { label: "Fourniture et pose d'une PAC air-air multi-split (3 unités intérieures)", amount: "10 500 €" },
    { label: "Habillage esthétique de l'unité extérieure (exigé par la copropriété)", amount: "450 €" },
    { label: "Total travaux TTC (TVA 5,5 %)", amount: "10 950 €" },
    { label: "MaPrimeRénov' Jaune", amount: "– 2 000 €", isDeduction: true },
    { label: "Coup de pouce CEE (estimation zone H1)", amount: "– 500 €", isDeduction: true },
  ],
  total: { label: "Reste à charge estimé", amount: "8 450 €" },
  savings: "≈ 350 à 550 €/an par rapport à un chauffage électrique par convecteurs",
  roi: "Retour en 12 à 16 ans en remplacement d'un chauffage électrique",
}

// FAQ
export const FAQ_ITEMS_PAC_APPART = [
  {
    question: "Peut-on installer une pompe à chaleur dans un appartement ?",
    answer:
      "Oui, une pompe à chaleur peut être installée dans un appartement, à condition de disposer d'un emplacement pour l'unité extérieure — balcon, loggia, façade accessible ou toiture — et d'obtenir l'accord de la copropriété. Toutes les pompes à chaleur ne sont pas équivalentes en la matière : une PAC air-air ou air-eau nécessite une unité extérieure, tandis qu'une pompe à chaleur sur air extrait peut fonctionner sans aucun équipement visible depuis l'extérieur, ce qui la rend idéale en appartement sans balcon.",
  },
  {
    question: "Faut-il l'accord de la copropriété pour installer une pompe à chaleur ?",
    answer:
      "Oui, dans la quasi-totalité des cas. Dès que l'installation touche une façade, une toiture, un mur porteur ou toute partie commune de l'immeuble, l'accord du syndicat de copropriété est obligatoire, généralement via un vote en assemblée générale. Certains règlements de copropriété imposent en plus des contraintes esthétiques précises (couleur de l'unité, habillage, emplacement) qu'il faut anticiper avant de faire chiffrer le projet par un installateur.",
  },
  {
    question: "Quel type de pompe à chaleur choisir pour un appartement ?",
    answer:
      "Le choix dépend surtout de votre accès à un espace extérieur et du système de chauffage existant. Une pompe à chaleur air-air réversible convient à un appartement avec balcon ou terrasse, pour un budget maîtrisé et l'avantage de la climatisation en été. Une pompe à chaleur air-eau est préférable si vous remplacez une chaudière alimentant des radiateurs ou un plancher chauffant. Si votre appartement ne dispose d'aucun accès extérieur, une pompe à chaleur fonctionnant sur l'air extrait par la VMC reste la seule solution réellement adaptée.",
  },
  {
    question: "Comment fonctionne une pompe à chaleur ?",
    answer:
      "Une pompe à chaleur capte les calories présentes dans l'air extérieur (ou dans l'air extrait du logement pour certains modèles), même par temps froid, grâce à un fluide frigorigène qui s'évapore à basse température. Ce fluide est ensuite comprimé, ce qui élève fortement sa température, avant de céder sa chaleur au circuit de chauffage ou à l'air intérieur via l'unité intérieure. Le fluide se détend enfin et repart capter de nouvelles calories : c'est ce cycle continu qui permet à une pompe à chaleur de produire 3 à 4 kWh de chauffage pour 1 kWh d'électricité consommée.",
  },
  {
    question: "Une pompe à chaleur en appartement fait-elle du bruit pour les voisins ?",
    answer:
      "Une pompe à chaleur récente et correctement installée reste discrète, avec un niveau sonore généralement compris entre 35 et 60 dB(A) à 1 mètre de l'unité extérieure. En habitat collectif, la nuisance sonore perçue vient presque toujours d'un mauvais emplacement — unité orientée vers une fenêtre de chambre, absence de plots anti-vibratiles, fixation mal réalisée — plutôt que d'un défaut de l'appareil. Notre guide dédié détaille les solutions pour réduire le bruit d'une pompe à chaleur en copropriété.",
  },
  {
    question: "Combien coûte l'installation d'une pompe à chaleur en appartement ?",
    answer:
      "Le prix d'une pompe à chaleur pour appartement varie fortement selon le type choisi : comptez 4 000 à 9 000 € pour une PAC air-air mono-split, 8 000 à 15 000 € pour un modèle multi-split desservant plusieurs pièces, et 10 000 à 16 000 € pour une PAC air-eau remplaçant une chaudière centrale. Ces montants s'entendent avant les aides financières disponibles, qui permettent souvent de réduire le reste à charge de 2 000 à 5 000 € selon les revenus du foyer.",
  },
  {
    question: "Existe-t-il une pompe à chaleur pour appartement sans unité extérieure ?",
    answer:
      "Oui. Pour un appartement sans balcon ni accès en façade, il existe des pompes à chaleur qui captent les calories dans l'air extrait par la ventilation mécanique du logement avant de le rejeter à l'extérieur, sans nécessiter d'unité extérieure individuelle visible. Ces équipements sont moins puissants qu'une PAC air-air ou air-eau classique, mais permettent tout de même de réaliser des économies d'énergie sur le chauffage et la production d'eau chaude sanitaire, tout en s'affranchissant de l'accord de copropriété lié à l'installation d'une unité en façade.",
  },
]

// Sources
export const SOURCES_PAC_APPART = [
  {
    name: "ADEME — Pompes à chaleur en habitat collectif : faisabilité et bonnes pratiques",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "service-public.fr — Travaux en copropriété : autorisations et assemblée générale",
    url: "https://www.service-public.fr",
    date: "2026",
  },
  {
    name: "Code de l'urbanisme — Déclaration préalable de travaux (articles R421-1 et suivants)",
    url: "https://www.legifrance.gouv.fr",
    date: "consulté en 2026",
  },
  {
    name: "Agence Parisienne du Climat — Installer une pompe à chaleur en appartement",
    url: "https://www.apc-paris.com",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' et MaPrimeRénov' Copropriétés, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Qualit'EnR — Référentiel RGE QualiPAC",
    url: "https://www.qualit-enr.org",
    date: "2025",
  },
]
