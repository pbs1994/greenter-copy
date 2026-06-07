// =============================================================================
// Données article : Pompe à chaleur hybride — guide complet 2026
// Date de rédaction : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à chaleur hybride : guide complet 2026 pour choisir et installer",
  subtitle:
    "Tout savoir sur la pompe à chaleur hybride : fonctionnement, différences avec une PAC seule, prix d'installation, aides disponibles et conseils pour votre projet de rénovation énergétique en 2026.",
  slug: "pompe-a-chaleur-hybride",
  date: "7 juin 2026",
  dateISO: "2026-06-07",
  readingTime: 12,
  author: "Greenter",
}

// Tableau comparatif PAC hybride vs PAC seule vs chaudière seule
export const COMPARISON_TABLE = {
  columns: [
    { header: "Critère", key: "critere" },
    { header: "Chaudière gaz/fioul seule", key: "chaudiere", highlight: false },
    { header: "PAC air-eau seule", key: "pac", highlight: false },
    { header: "PAC hybride", key: "hybride", highlight: true },
  ],
  rows: [
    {
      critere: "Coût annuel chauffage (120 m²)",
      chaudiere: "1 600 – 2 200 €",
      pac: "700 – 950 €",
      hybride: "800 – 1 100 €",
    },
    {
      critere: "Investissement (matériel + pose)",
      chaudiere: "3 000 – 6 000 €",
      pac: "10 000 – 18 000 €",
      hybride: "8 000 – 15 000 €",
    },
    {
      critere: "Émissions CO₂ annuelles",
      chaudiere: "2 500 – 4 000 kg",
      pac: "200 – 300 kg",
      hybride: "500 – 900 kg",
    },
    {
      critere: "Compatible radiateurs haute temp.",
      chaudiere: "✅ Oui",
      pac: "⚠️ Haute temp. seulement",
      hybride: "✅ Oui (la chaudière prend le relais)",
    },
    {
      critere: "Continuité de chauffage par grand froid",
      chaudiere: "✅ Toujours",
      pac: "⚠️ Limite à −15/−20 °C",
      hybride: "✅ La chaudière prend le relais",
    },
    {
      critere: "Travaux sur les émetteurs",
      chaudiere: "Aucun",
      pac: "Parfois nécessaires",
      hybride: "Aucun — circuit existant conservé",
    },
    {
      critere: "Réduction gaz à effet de serre",
      chaudiere: "Nulle",
      pac: "−90 %",
      hybride: "−50 à −70 %",
    },
    {
      critere: "Éligibilité MaPrimeRénov'",
      chaudiere: "❌ Non (chaudière fossile)",
      pac: "✅ Oui — jusqu'à 5 000 €",
      hybride: "✅ Oui — jusqu'à 4 000 €",
    },
  ],
  caption:
    "Sources : ADEME 2025, Ministère de la Transition énergétique, ANAH 2026. Estimations pour une maison de 120 m² en Île-de-France, moyennement isolée.",
}

// Tableau des prix d'une PAC hybride selon la configuration
export const PRIX_TABLE = {
  columns: [
    { header: "Configuration", key: "config" },
    { header: "Coût matériel", key: "materiel" },
    { header: "Pose & mise en service", key: "pose" },
    { header: "Total indicatif", key: "total", highlight: true },
  ],
  rows: [
    {
      config: "PAC hybride gaz — remplacement chaudière gaz existante",
      materiel: "5 000 – 8 000 €",
      pose: "2 000 – 3 500 €",
      total: "7 000 – 11 500 €",
    },
    {
      config: "PAC hybride gaz à condensation — installation neuve",
      materiel: "7 000 – 10 000 €",
      pose: "2 500 – 4 000 €",
      total: "9 500 – 14 000 €",
    },
    {
      config: "PAC hybride fioul — remplacement chaudière fioul",
      materiel: "6 000 – 9 000 €",
      pose: "2 500 – 4 000 €",
      total: "8 500 – 13 000 €",
    },
    {
      config: "Système hybride avec ballon ECS intégré",
      materiel: "+1 000 – 2 000 €",
      pose: "Inclus",
      total: "Ajout au devis ci-dessus",
    },
  ],
  caption:
    "Prix indicatifs TTC, hors aides financières. Fourchette haute = maison mal isolée, puissance élevée ou remplacement complexe. Demandez un devis personnalisé.",
}

// Tableau des aides financières pour une PAC hybride
export const AIDES_TABLE = {
  columns: [
    { header: "Aide", key: "aide" },
    { header: "Montant max.", key: "montant", highlight: true },
    { header: "Conditions", key: "conditions" },
  ],
  rows: [
    {
      aide: "MaPrimeRénov' — PAC air-eau hybride",
      montant: "4 000 € (Bleu), 3 000 € (Jaune)",
      conditions: "Logement de plus de 15 ans. Tranche Rose non éligible depuis février 2026.",
    },
    {
      aide: "Coup de pouce chauffage CEE",
      montant: "1 500 – 4 000 €",
      conditions: "Remplacement d'une chaudière fioul ou gaz. Montant variable selon zone et surface.",
    },
    {
      aide: "TVA réduite 5,5 %",
      montant: "≈ −14,5 % sur la facture",
      conditions: "Logement de plus de 2 ans. Pose par installateur RGE.",
    },
    {
      aide: "Éco-PTZ",
      montant: "Jusqu'à 30 000 €",
      conditions: "Sans condition de revenus. Remboursable sur 15 ans à taux zéro.",
    },
    {
      aide: "Aides locales (Île-de-France, Île-de-France Énergies…)",
      montant: "500 – 2 000 €",
      conditions: "Variable selon la région et la commune. Cumulables avec les aides nationales.",
    },
  ],
  caption:
    "Sources : ANAH, ecologie.gouv.fr, france-renov.gouv.fr — barèmes 2026. Les montants cumulés peuvent couvrir 40 à 65 % du coût total selon la tranche de revenus.",
}

// Étapes d'installation d'une PAC hybride
export const STEPS = [
  {
    title: "Audit thermique et dimensionnement",
    detail:
      "Un technicien RGE évalue votre logement : surface chauffée, niveau d'isolation (DPE), température de départ du circuit de chauffage, émetteurs existants (radiateurs, plancher chauffant). Il calcule la puissance optimale de la pompe à chaleur air-eau et détermine le point de bivalence — la température extérieure en dessous de laquelle la chaudière prend le relais.",
    duration: "1 visite gratuite",
  },
  {
    title: "Devis et montage du dossier d'aides",
    detail:
      "L'installateur prépare le devis détaillé (PAC air-eau, module hydraulique, ballon ECS si nécessaire) et monte votre dossier MaPrimeRénov', CEE et éco-PTZ. Les aides sont en général déduites directement du montant final ou versées après travaux selon le dispositif.",
    duration: "1 – 2 semaines",
  },
  {
    title: "Pose de l'unité extérieure",
    detail:
      "L'unité extérieure de la pompe à chaleur air-eau est installée à l'extérieur du logement — au sol sur un socle antivibratile ou en applique murale — à au moins 1 mètre des limites de propriété pour respecter les règles acoustiques.",
    duration: "½ journée",
  },
  {
    title: "Raccordement au circuit hydraulique existant",
    detail:
      "Le module intérieur hybride s'intercale entre la PAC et votre ancienne chaudière gaz ou fioul, qui reste en place. Le circuit de chauffage et l'eau chaude sanitaire sont raccordés. Vos radiateurs existants sont conservés : aucun remplacement n'est nécessaire.",
    duration: "1 journée",
  },
  {
    title: "Paramétrage de la régulation intelligente",
    detail:
      "La régulation hybride calcule en temps réel le coût de l'énergie (électricité vs gaz ou fioul) et bascule automatiquement vers la source la moins chère. Vous pouvez aussi piloter le système depuis une application smartphone et fixer vos préférences.",
    duration: "½ journée",
  },
  {
    title: "Mise en service et vérifications",
    detail:
      "Le technicien réalise les tests de pression, vérifie l'étanchéité du circuit frigorifique, règle le point de bivalence et contrôle la production d'eau chaude sanitaire. Il vous remet l'attestation de fin de travaux nécessaire pour vos demandes d'aides.",
    duration: "2 à 4 jours au total",
  },
]

// FAQ enrichie schema.org
export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'une pompe à chaleur hybride exactement ?",
    answer:
      "Une pompe à chaleur hybride est un système de chauffage qui associe une pompe à chaleur air-eau (source d'énergie renouvelable) à une chaudière gaz ou fioul existante. La régulation intelligente choisit en permanence la source d'énergie la plus économique selon la température extérieure et le prix de l'électricité. En dessous d'un certain seuil (le \"point de bivalence\"), la chaudière prend le relais pour garantir le confort même par grand froid.",
  },
  {
    question: "Quelle est la différence entre une PAC hybride gaz et une PAC hybride fioul ?",
    answer:
      "Dans les deux cas, le principe est identique : la PAC air-eau couvre 70 à 80 % des besoins en chaleur, et la chaudière complète lors des pics de froid. La différence tient à l'énergie d'appoint : gaz naturel pour la PAC hybride gaz, fioul domestique (ou biofioul) pour la PAC hybride fioul. Le remplacement d'une chaudière fioul par une PAC hybride est éligible aux mêmes aides que la PAC seule, et souvent financièrement très intéressant car le fioul est plus cher au kWh que le gaz.",
  },
  {
    question: "Quel est le prix d'une pompe à chaleur hybride installée ?",
    answer:
      "Le prix d'une installation de pompe à chaleur hybride se situe entre 7 000 et 14 000 € TTC (matériel + main-d'œuvre), avant aides. Après MaPrimeRénov' (jusqu'à 4 000 €), CEE (1 500 – 4 000 €) et TVA à 5,5 %, le reste à charge descend souvent entre 3 000 et 7 000 € pour les ménages modestes à intermédiaires.",
  },
  {
    question: "Dois-je changer mes radiateurs pour installer une PAC hybride ?",
    answer:
      "Non. C'est l'un des grands avantages de la solution hybride : votre circuit de chauffage existant (radiateurs en fonte, acier ou aluminium) est conservé tel quel. La chaudière gaz ou fioul peut monter la température de l'eau jusqu'à 70-80 °C lorsque la PAC ne suffit pas, permettant de chauffer efficacement des radiateurs hauts température sans aucun remplacement.",
  },
  {
    question: "La pompe à chaleur hybride est-elle adaptée aux maisons mal isolées ?",
    answer:
      "Oui, c'est précisément le cas d'usage privilégié de la PAC hybride. Dans une maison peu isolée (DPE E, F ou G), les besoins en chaleur sont élevés et la PAC seule devrait monter l'eau à haute température — ce qui dégrade son rendement. Le système hybride contourne ce problème : la PAC travaille à basse température là où elle est efficace, et la chaudière prend le relais pour les pointes. En parallèle, il est fortement conseillé d'isoler le logement pour maximiser les économies.",
  },
  {
    question: "Une PAC hybride est-elle éligible aux aides en 2026 ?",
    answer:
      "Oui. La pompe à chaleur hybride est éligible à MaPrimeRénov' (jusqu'à 4 000 € pour les ménages modestes en 2026), au Coup de pouce chauffage CEE, à la TVA réduite à 5,5 % et à l'éco-PTZ jusqu'à 30 000 €. L'installation doit être réalisée par un professionnel certifié RGE. En revanche, depuis février 2026, les ménages aux revenus supérieurs (tranche Rose) ne sont plus éligibles à MaPrimeRénov' pour une PAC seule — vérifiez votre situation avec un conseiller France Rénov'.",
  },
  {
    question: "Combien de temps dure l'installation d'une pompe à chaleur hybride ?",
    answer:
      "Le chantier dure en général 2 à 4 jours. L'avantage par rapport à une PAC seule est que l'ancienne chaudière reste en place : il n'y a pas de dépose complexe, et le raccordement au circuit hydraulique est simplifié. Vous restez chauffés pendant les travaux, sauf pendant quelques heures lors de la bascule finale.",
  },
  {
    question: "Faut-il une certification RGE pour installer une PAC hybride ?",
    answer:
      "Oui, obligatoirement. Pour bénéficier de MaPrimeRénov', du Coup de pouce CEE et de la TVA à 5,5 %, les travaux doivent être réalisés par un professionnel certifié RGE (Reconnu Garant de l'Environnement), qualification QualiPAC pour les pompes à chaleur. Greenter est certifié RGE QualiPAC et prend en charge l'ensemble du dossier d'aides.",
  },
]

export const SOURCES = [
  { label: "ADEME — Guide pratique des pompes à chaleur 2025", url: "https://www.ademe.fr" },
  { label: "ANAH — Les aides financières en 2026", url: "https://www.anah.gouv.fr" },
  { label: "France Rénov' — MaPrimeRénov' 2026", url: "https://www.maprimerenov.gouv.fr" },
  { label: "Ministère de la Transition énergétique — Coup de pouce chauffage", url: "https://www.ecologie.gouv.fr" },
  { label: "COSTIC — Étude sur les systèmes hybrides PAC + chaudière", url: "https://www.costic.com" },
]
