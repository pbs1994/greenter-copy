// =============================================================================
// Données article : Prix pompe à chaleur air-air (2026)
// Angle : prix posé d'une climatisation réversible selon la configuration
// (monosplit, multisplit, gainable, console), ce qui fait varier le devis,
// consommation et économies face aux convecteurs, absence d'aides en 2026,
// entretien obligatoire, règles de pose et de bruit.
// Sources : ADEME, décret 2020-912 (entretien PAC 4-70 kW), règlement UE
// 517/2014 (F-gaz), Code de la santé publique (bruit de voisinage), CRE
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Prix pompe à chaleur air-air en 2026 : monosplit, multisplit et gainable",
  subtitle:
    "Prix pompe à chaleur air-air posée en 2026 : monosplit, multisplit, gainable et console. Ce qui fait varier le devis, consommation, économies et aides restantes.",
  slug: "prix-pompe-a-chaleur-air-air",
  date: "8 novembre 2026",
  dateISO: "2026-11-08",
  readingTime: 13,
  author: "Greenter",
}

export const PRIX_TABLE = {
  columns: [
    { header: "Configuration", key: "config" },
    { header: "Usage type", key: "usage" },
    { header: "Prix posé TTC", key: "prix", highlight: true },
  ],
  rows: [
    { config: "Monosplit mural 2,5 à 3,5 kW", usage: "Une pièce de 20 à 35 m²", prix: "1 500 à 3 000 €" },
    { config: "Bisplit (2 unités intérieures)", usage: "Séjour + chambre", prix: "3 500 à 5 500 €" },
    { config: "Trisplit", usage: "Séjour + 2 chambres", prix: "5 000 à 7 500 €" },
    { config: "Multisplit 4 à 5 unités", usage: "Maison de 90 à 120 m²", prix: "6 500 à 10 000 €" },
    { config: "Gainable (réseau de gaines)", usage: "Maison entière, unités invisibles", prix: "8 000 à 15 000 €" },
    { config: "Console au sol (par unité)", usage: "Sous une fenêtre, en remplacement d'un radiateur", prix: "+ 200 à 500 € par rapport au mural" },
  ],
  caption:
    "Fourchettes constatées en Île-de-France en 2026, matériel de marque, liaisons frigorifiques jusqu'à 5 m par unité, mise en service et TVA à 10 % comprises. Hors création de ligne électrique dédiée et hors travaux de faux plafond pour le gainable.",
}

export const VARIATION_TABLE = {
  columns: [
    { header: "Poste", key: "poste" },
    { header: "Impact sur le devis", key: "impact", highlight: true },
    { header: "Commentaire", key: "commentaire" },
  ],
  rows: [
    { poste: "Longueur des liaisons frigorifiques", impact: "40 à 80 € par mètre supplémentaire", commentaire: "Au-delà de 5 m, une recharge de fluide peut être nécessaire" },
    { poste: "Goulottes et percements", impact: "100 à 400 €", commentaire: "Plus cher dans un mur en pierre ou en béton épais" },
    { poste: "Support de l'unité extérieure", impact: "80 à 300 €", commentaire: "Équerres murales, socle au sol ou support de toiture terrasse" },
    { poste: "Pompe de relevage des condensats", impact: "150 à 250 € par unité", commentaire: "Si l'évacuation ne peut pas se faire par gravité" },
    { poste: "Ligne électrique dédiée", impact: "200 à 600 €", commentaire: "Disjoncteur dédié au tableau, parfois hausse d'abonnement" },
    { poste: "Accès difficile (nacelle, étage)", impact: "300 à 800 €", commentaire: "Fréquent en appartement ou en façade sur rue" },
  ],
  caption: "Postes annexes qui expliquent l'essentiel des écarts entre deux devis pour un même nombre d'unités.",
}

export const CONSO_TABLE = {
  columns: [
    { header: "Chauffage", key: "chauffage" },
    { header: "Consommation électrique", key: "conso" },
    { header: "Coût annuel", key: "cout", highlight: true },
  ],
  rows: [
    { chauffage: "Convecteurs électriques", conso: "≈ 11 000 kWh", cout: "≈ 2 150 €" },
    { chauffage: "Radiateurs à inertie", conso: "≈ 9 500 kWh", cout: "≈ 1 850 €" },
    { chauffage: "PAC air-air multisplit (SCOP 4)", conso: "≈ 2 750 kWh", cout: "≈ 540 €" },
  ],
  caption:
    "Maison de 100 m² des années 1980 en Seine-et-Marne, besoin de chauffage d'environ 11 000 kWh par an, électricité à 0,195 € TTC le kWh (option base). Le SCOP réel dépend de la pose, des réglages et de la rigueur de l'hiver.",
}

export const FAQ_ITEMS = [
  {
    question: "Quel est le prix d'une pompe à chaleur air-air ?",
    answer:
      "En 2026, comptez 1 500 à 3 000 € pour un monosplit posé dans une pièce, 3 500 à 5 500 € pour un bisplit, 6 500 à 10 000 € pour un multisplit qui chauffe une maison de 100 m², et 8 000 à 15 000 € pour un système gainable. Ces prix incluent le matériel, la pose, la mise en service et la TVA à 10 %.",
  },
  {
    question: "Y a-t-il des aides pour une pompe à chaleur air-air en 2026 ?",
    answer:
      "Très peu. La PAC air-air n'est éligible ni à MaPrimeRénov' ni au Coup de pouce chauffage. Certains fournisseurs d'énergie versent une petite prime CEE, généralement de quelques centaines d'euros. La TVA est de 10 % et non de 5,5 %.",
  },
  {
    question: "Une PAC air-air peut-elle chauffer toute une maison ?",
    answer:
      "Oui, avec un multisplit ou un gainable correctement dimensionné, en plaçant une unité intérieure dans chaque pièce de vie et chambre. Elle ne produit en revanche pas d'eau chaude sanitaire, qui reste assurée par un ballon électrique ou thermodynamique.",
  },
  {
    question: "Combien consomme une pompe à chaleur air-air ?",
    answer:
      "Environ quatre fois moins que des convecteurs pour la même chaleur. Pour une maison de 100 m² qui consommait 11 000 kWh avec des convecteurs, une PAC air-air bien posée consomme autour de 2 700 à 3 000 kWh par an, soit environ 550 € au lieu de 2 150 €.",
  },
  {
    question: "Quelle différence entre PAC air-air et climatisation réversible ?",
    answer:
      "Aucune sur le plan technique : c'est le même appareil. On parle de climatisation réversible quand l'usage principal est le rafraîchissement l'été, et de pompe à chaleur air-air quand il s'agit avant tout de chauffer en hiver. Les modèles récents ont un rendement élevé dans les deux modes.",
  },
  {
    question: "L'entretien d'une pompe à chaleur air-air est-il obligatoire ?",
    answer:
      "Oui pour les appareils de 4 à 70 kW : un entretien par un professionnel est obligatoire tous les deux ans. Un contrôle d'étanchéité du circuit frigorifique est aussi exigé au-delà d'une certaine charge de fluide. Le nettoyage des filtres des unités intérieures, lui, se fait vous-même tous les mois en période d'usage.",
  },
  {
    question: "Faut-il une autorisation pour poser l'unité extérieure ?",
    answer:
      "Une déclaration préalable en mairie est souvent demandée lorsque l'unité est visible depuis la rue, car elle modifie l'aspect de la façade. En copropriété, l'accord de l'assemblée générale est nécessaire pour toute pose en façade ou sur un balcon. Près d'un monument historique, l'avis de l'Architecte des Bâtiments de France s'ajoute.",
  },
]

export const SOURCES = [
  {
    name: "ADEME : la pompe à chaleur air-air, fonctionnement et performances",
    url: "https://agirpourlatransition.ademe.fr",
    date: "2026",
  },
  {
    name: "Décret n° 2020-912 du 28 juillet 2020 relatif à l'inspection et à l'entretien des systèmes de chauffage et de climatisation",
    url: "https://www.legifrance.gouv.fr",
    date: "2020",
  },
  {
    name: "Règlement (UE) 2024/573 relatif aux gaz à effet de serre fluorés",
    url: "https://eur-lex.europa.eu",
    date: "2024",
  },
  {
    name: "Code de la santé publique : bruits de voisinage et émergence admissible",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
  {
    name: "Commission de régulation de l'énergie : tarifs réglementés de vente de l'électricité",
    url: "https://www.cre.fr",
    date: "2026",
  },
]
