// =============================================================================
// Données article : Géothermie ou pompe à chaleur — comparatif complet 2026
// Sources : ADEME, france-renov.gouv.fr, AFPG (géothermie), fabricants
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Géothermie ou pompe à chaleur : quelle différence et laquelle choisir ?",
  subtitle:
    "La géothermie est en réalité une pompe à chaleur — mais pas comme les autres. Comparatif complet entre géothermie et pompe à chaleur aérothermique : fonctionnement, rendement, prix, aides et cas d'usage en 2026.",
  slug: "geothermie-ou-pompe-a-chaleur",
  date: "28 juillet 2026",
  dateISO: "2026-07-28",
  readingTime: 14,
  author: "Greenter",
}

// Comparatif géothermie vs pompe à chaleur aérothermique
export const COMPARATIF_TABLE = {
  columns: [
    { header: "Critère", key: "critere" },
    { header: "Géothermie (sol-eau, eau-eau)", key: "geothermie", highlight: true },
    { header: "Pompe à chaleur aérothermique (air-eau)", key: "aerothermie", highlight: true },
  ],
  rows: [
    {
      critere: "Source de chaleur",
      geothermie: "Sol (capteurs enterrés ou sondes verticales)",
      aerothermie: "Air extérieur",
    },
    {
      critere: "Rendement (SCOP)",
      geothermie: "4,0 à 5,5",
      aerothermie: "2,8 à 4,2 (jusqu'à 5,0 sur modèles récents)",
    },
    {
      critere: "Prix d'installation",
      geothermie: "20 000 à 40 000 €",
      aerothermie: "10 000 à 18 000 €",
    },
    {
      critere: "Durée de vie",
      geothermie: "20 à 25 ans (sondes jusqu'à 50 ans)",
      aerothermie: "15 à 20 ans",
    },
    {
      critere: "Emprise au sol nécessaire",
      geothermie: "Importante (capteur horizontal) ou forage (sonde verticale)",
      aerothermie: "Minime (unité extérieure uniquement)",
    },
    {
      critere: "Niveau sonore extérieur",
      geothermie: "Très faible (pas de ventilateur exposé)",
      aerothermie: "40–55 dB(A) à 1 m (unité extérieure)",
    },
  ],
  caption:
    "Comparatif indicatif pour une maison individuelle en 2026. Les prix incluent la fourniture et la pose par un professionnel RGE ; les rendements sont donnés en conditions réelles d'utilisation. Sources : ADEME, AFPG, fabricants.",
}

// Étapes pour bien choisir entre géothermie et pompe à chaleur aérothermique
export const CHOIX_STEPS = [
  {
    title: "Évaluer la surface de terrain disponible",
    detail:
      "La géothermie avec capteur horizontal nécessite une surface de terrain égale à 1,5 à 2 fois la surface habitable à chauffer, sans arbres ni construction future prévue. Sans cette surface disponible, seule la sonde verticale (forage) ou une pompe à chaleur aérothermique restent envisageables.",
  },
  {
    title: "Faire réaliser une étude de sol",
    detail:
      "La nature du sol (argileux, sableux, rocheux) et la présence d'une nappe phréatique influencent fortement la faisabilité et le coût d'une installation géothermique. Une étude géotechnique préalable, réalisée par un professionnel qualifié, est indispensable avant tout devis de forage.",
  },
  {
    title: "Comparer le budget disponible et le retour sur investissement",
    detail:
      "La géothermie représente un investissement initial deux à trois fois supérieur à une pompe à chaleur aérothermique. Ce surcoût s'amortit sur la durée grâce à un rendement supérieur et une durée de vie plus longue — mais le calcul n'est favorable que sur un horizon de 15 à 20 ans.",
  },
  {
    title: "Vérifier l'éligibilité aux aides financières",
    detail:
      "MaPrimeRénov' finance davantage la géothermie que l'aérothermie en valeur absolue, ce qui réduit l'écart de reste à charge entre les deux solutions. Un artisan RGE QualiPAC peut établir une simulation précise selon votre profil de revenus et le type d'installation envisagé.",
  },
  {
    title: "Considérer le niveau d'isolation du logement",
    detail:
      "La géothermie révèle tout son potentiel dans un logement bien isolé (DPE A ou B) où les besoins de chauffage sont stables et modérés. Dans un logement mal isolé, la performance supérieure de la géothermie est largement compensée par les déperditions thermiques, et une pompe à chaleur aérothermique associée à des travaux d'isolation est souvent plus rentable.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "La géothermie est-elle une pompe à chaleur ?",
    answer:
      "Oui. La géothermie individuelle utilisée pour le chauffage d'une maison fonctionne grâce à une pompe à chaleur géothermique : elle capte les calories du sol via des capteurs enterrés ou des sondes verticales, puis les élève en température grâce à un compresseur, exactement comme une pompe à chaleur aérothermique le fait avec l'air extérieur. La différence se situe uniquement au niveau de la source de chaleur exploitée, pas dans le principe de fonctionnement.",
  },
  {
    question: "Géothermie ou pompe à chaleur air-eau : laquelle est la plus rentable ?",
    answer:
      "La géothermie affiche un rendement supérieur (SCOP de 4,0 à 5,5 contre 2,8 à 4,2 pour l'aérothermie), mais son coût d'installation est deux à trois fois plus élevé. Elle devient rentable sur le long terme (15 à 20 ans) principalement pour les grandes surfaces bien isolées avec un terrain disponible. Pour un budget plus limité ou un terrain restreint, la pompe à chaleur air-eau reste le choix le plus rentable à court et moyen terme.",
  },
  {
    question: "Quelle surface de terrain faut-il pour une géothermie ?",
    answer:
      "Pour un capteur horizontal, il faut compter une surface de terrain égale à 1,5 à 2 fois la surface habitable à chauffer, sans arbre ni construction prévue par-dessus. Pour un terrain plus restreint, la sonde géothermique verticale (forage de 50 à 150 mètres de profondeur) ne nécessite qu'une emprise au sol très limitée, mais représente un investissement plus élevé.",
  },
  {
    question: "Peut-on installer une géothermie en appartement ou en petite maison ?",
    answer:
      "La géothermie individuelle est quasiment impossible en appartement standard, faute de terrain disponible et en raison de la complexité de gestion en copropriété — elle reste réservée aux réseaux de chaleur collectifs. Pour une petite maison avec un jardin limité, une sonde verticale peut être envisagée, mais le coût du forage rend rarement l'opération rentable sur une petite surface à chauffer.",
  },
  {
    question: "La géothermie est-elle plus silencieuse qu'une pompe à chaleur classique ?",
    answer:
      "Oui, généralement. Une pompe à chaleur géothermique ne comporte pas d'unité extérieure avec ventilateur exposé à l'air libre : le compresseur est installé en intérieur, dans un local technique. Cela supprime la principale source de bruit perçue par le voisinage avec une pompe à chaleur aérothermique, dont l'unité extérieure émet généralement entre 40 et 55 dB(A) à 1 mètre.",
  },
  {
    question: "Quelles aides financières pour la géothermie en 2026 ?",
    answer:
      "MaPrimeRénov' finance la géothermie plus généreusement que l'aérothermie : jusqu'à 11 000 € pour les ménages très modestes contre 5 000 € pour une pompe à chaleur air-eau, avec un plafond de dépenses éligibles de 18 000 € contre 12 000 €. S'ajoutent les primes CEE et l'éco-PTZ, applicables aux deux technologies sous conditions.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "ADEME — Géothermie de surface : fonctionnement et performances, référentiel 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "AFPG — Association Française des Professionnels de la Géothermie, données techniques",
    url: "https://afpg.asso.fr",
    date: "2026",
  },
  {
    name: "france-renov.gouv.fr — Barèmes MaPrimeRénov' pompe à chaleur 2026",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "BRGM — Guide géothermie de minime importance, réglementation et faisabilité",
    url: "https://www.brgm.fr",
    date: "2025",
  },
]
