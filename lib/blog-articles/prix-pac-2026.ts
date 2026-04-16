// =============================================================================
// Données article : Guide complet prix pompe à chaleur 2026
// Sources : economie.gouv.fr, france-renov.gouv.fr, ademe.fr, ecologie.gouv.fr
// =============================================================================

export const ARTICLE_META = {
  title: "Prix d'une pompe à chaleur en 2026 : coûts, aides et rentabilité",
  subtitle: "Combien coûte réellement une PAC en 2026 ? Tarifs par type, aides MaPrimeRénov', calcul du reste à charge et retour sur investissement. Données officielles.",
  slug: "guide-prix-pompe-a-chaleur-2026",
  date: "15 avril 2026",
  dateISO: "2026-04-15",
  readingTime: 12,
  author: "Greenter",
}

// Tableau comparatif des types de PAC
export const PAC_TYPES_TABLE = {
  columns: [
    { header: "Type de PAC", key: "type" },
    { header: "Prix installation", key: "prix", highlight: true },
    { header: "COP moyen", key: "cop" },
    { header: "Eau chaude", key: "ecs" },
    { header: "MaPrimeRénov'", key: "aide" },
  ],
  rows: [
    { type: "PAC Air/Air", prix: "1 500€ à 5 000€", cop: "3 à 3,5", ecs: "Non", aide: "Non éligible" },
    { type: "PAC Air/Eau", prix: "10 000€ à 18 000€", cop: "3 à 4", ecs: "Oui", aide: "Jusqu'à 5 000€" },
    { type: "PAC Géothermique", prix: "20 000€ à 40 000€", cop: "4 à 5", ecs: "Oui", aide: "Jusqu'à 11 000€" },
  ],
  caption: "Sources : Effy, ADEME 2026. Prix incluant matériel et pose. COP mesuré en conditions nominales.",
}

// Barème MaPrimeRénov' 2026 pour PAC air-eau
export const MAPRIMERENOV_TABLE = {
  columns: [
    { header: "Catégorie de revenus", key: "categorie" },
    { header: "PAC Air/Eau", key: "aireau", highlight: true },
    { header: "PAC Géothermique", key: "geo", highlight: true },
    { header: "Plafond dépenses", key: "plafond" },
  ],
  rows: [
    { categorie: "Très modestes (Bleu)", aireau: "5 000€", geo: "11 000€", plafond: "12 000€" },
    { categorie: "Modestes (Jaune)", aireau: "4 000€", geo: "9 000€", plafond: "12 000€" },
    { categorie: "Intermédiaires (Violet)", aireau: "3 000€", geo: "6 000€", plafond: "12 000€" },
    { categorie: "Supérieurs (Rose)", aireau: "Non éligible", geo: "Non éligible", plafond: "-" },
  ],
  caption: "Source : economie.gouv.fr, barème MaPrimeRénov' février 2026. Guichet réouvert le 23/02/2026.",
}

// Facteurs qui influencent le prix
export const PRICE_FACTORS = [
  { factor: "Surface du logement", impact: "Une maison de 150 m² nécessite une PAC plus puissante (12-16 kW) qu'un appartement de 80 m² (6-8 kW). Comptez +2 000€ à +5 000€ pour les grandes surfaces." },
  { factor: "Niveau d'isolation", impact: "Un logement mal isolé (DPE E-G) nécessite une PAC surdimensionnée. L'isolation préalable réduit la puissance nécessaire et donc le coût de la PAC de 15 à 25%." },
  { factor: "Type d'émetteurs existants", impact: "Radiateurs fonte = PAC haute température (65°C), plus chère (+1 500€). Plancher chauffant = PAC basse température, plus efficace et moins chère." },
  { factor: "Zone climatique", impact: "En Île-de-France (zone H1a, 2 500 à 2 700 DJU), une PAC doit fonctionner jusqu'à -7°C. Les modèles adaptés aux hivers rigoureux coûtent 10 à 15% de plus." },
  { factor: "Marque et gamme", impact: "Daikin, Atlantic, Mitsubishi : gamme premium. Des alternatives comme Panasonic ou Toshiba offrent un excellent rapport qualité-prix, 15 à 25% moins cher." },
]

// Exemple calcul reste à charge
export const EXAMPLE_CALCULATION = {
  title: "Exemple : PAC air-eau pour une maison de 120 m² à Ozoir-la-Ferrière",
  lines: [
    { label: "Prix PAC air-eau 12 kW (matériel + pose)", amount: "14 000€" },
    { label: "MaPrimeRénov' (revenus modestes)", amount: "- 4 000€", isDeduction: true },
    { label: "Prime CEE (certificats d'économies d'énergie)", amount: "- 2 500€", isDeduction: true },
    { label: "TVA réduite 5,5% (au lieu de 20%)", amount: "- 1 800€", isDeduction: true },
  ],
  total: { label: "Reste à charge", amount: "5 700€" },
  savings: "900€ à 1 300€/an d'économies sur le chauffage",
  roi: "4 à 6 ans de retour sur investissement",
}

// Calendrier réglementaire
export const REGULATORY_CALENDAR = [
  { date: "Juillet 2022", event: "Interdiction d'installer de nouvelles chaudières au fioul", source: "ecologie.gouv.fr" },
  { date: "Janvier 2025", event: "Logements DPE G interdits à la location", source: "loi Climat et Résilience" },
  { date: "Janvier 2026", event: "Nouveau calcul DPE favorisant l'électrification du chauffage", source: "ecologie.gouv.fr" },
  { date: "Février 2026", event: "Réouverture du guichet MaPrimeRénov' pour tous les ménages", source: "economie.gouv.fr" },
  { date: "2028", event: "Logements DPE F interdits à la location + objectif sortie du fioul", source: "loi Climat et Résilience" },
  { date: "2034", event: "Logements DPE E interdits à la location", source: "loi Climat et Résilience" },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le prix moyen d'une pompe à chaleur en 2026 ?",
    answer: "En 2026, une PAC air-eau coûte entre 10 000€ et 18 000€ pose incluse. Une PAC air-air revient entre 1 500€ et 5 000€ par unité. Une PAC géothermique entre 20 000€ et 40 000€. Ces prix incluent le matériel et l'installation par un artisan certifié RGE.",
  },
  {
    question: "Quelles aides pour une pompe à chaleur en 2026 ?",
    answer: "En 2026, MaPrimeRénov' offre jusqu'à 5 000€ pour une PAC air-eau (revenus très modestes) et jusqu'à 11 000€ pour une PAC géothermique. S'ajoutent les primes CEE, la TVA à 5,5% et l'éco-PTZ. Attention : les PAC air-air ne sont pas éligibles à MaPrimeRénov'. Le guichet a rouvert le 23 février 2026.",
  },
  {
    question: "Une pompe à chaleur est-elle rentable ?",
    answer: "Oui. Avec un COP moyen de 3 (source ADEME), la PAC produit 3 kWh de chaleur pour 1 kWh d'électricité consommé. Pour une maison de 120 m², les économies annuelles sont de 900€ à 1 300€ par rapport au gaz. Le retour sur investissement est de 4 à 8 ans selon les aides obtenues.",
  },
  {
    question: "PAC air-eau ou air-air : laquelle choisir ?",
    answer: "La PAC air-eau est le meilleur choix si vous avez un chauffage central (radiateurs ou plancher chauffant) : elle remplace la chaudière et produit l'eau chaude. La PAC air-air est plus adaptée en complément ou pour les logements sans réseau hydraulique. Seule la PAC air-eau est éligible à MaPrimeRénov'.",
  },
  {
    question: "Faut-il isoler avant d'installer une PAC ?",
    answer: "C'est fortement recommandé. Une bonne isolation réduit la puissance nécessaire de la PAC (donc son prix) et améliore son rendement. L'ADEME recommande d'isoler les combles en priorité (30% des déperditions). Depuis janvier 2026, l'isolation des murs n'est plus financée par MaPrimeRénov'.",
  },
  {
    question: "Une PAC fonctionne-t-elle quand il fait très froid ?",
    answer: "Oui, les PAC modernes fonctionnent jusqu'à -15°C voire -20°C. En Île-de-France (zone H1a), les températures descendent rarement en dessous de -10°C. Le rendement baisse légèrement par grand froid, mais la PAC continue de chauffer. Certains modèles intègrent une résistance d'appoint pour les pics de froid.",
  },
]

// Sources officielles
export const SOURCES = [
  { name: "MaPrimeRénov' parcours par geste — economie.gouv.fr", url: "https://www.economie.gouv.fr/particuliers/faire-des-economies-denergie/maprimerenov-parcours-par-geste-la-prime-pour-la-renovation-energetique", date: "avril 2026" },
  { name: "Aides pour l'installation d'une pompe à chaleur — economie.gouv.fr", url: "https://www.economie.gouv.fr/cedef/aides-installation-pompe-chaleur", date: "avril 2026" },
  { name: "Guide des aides financières 2026 — ANAH / France Rénov'", url: "https://www.anah.gouv.fr/document/guide-des-aides-financieres-0226", date: "février 2026" },
  { name: "Simulateur officiel Mes Aides Réno — France Rénov'", url: "https://mesaides.france-renov.gouv.fr/", date: "avril 2026" },
  { name: "Performance des PAC air/eau — ADEME Infos", url: "https://infos.ademe.fr/energies/2025/comment-maximiser-la-performance-de-votre-pompe-a-chaleur-air-eau/", date: "2025" },
  { name: "Interdiction chaudières fioul — Ministère de la Transition écologique", url: "https://www.ecologie.gouv.fr/gouvernement-met-en-consultation-decret-visant-interdire-linstallation-nouvelles-chaudieres-au-fioul", date: "2022" },
  { name: "Nouveau DPE 2026 — ecologie.gouv.fr", url: "https://www.ecologie.gouv.fr/presse/evolution-du-calcul-du-dpe-1er-janvier-2026-favoriser-lelectrification-du-chauffage", date: "janvier 2026" },
]
