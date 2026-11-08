// =============================================================================
// Données article : Remplacer une chaudière fioul par une pompe à chaleur
// Angle : ce que dit vraiment la loi (pas d'obligation de remplacer, mais plus
// de chaudière fioul neuve depuis juillet 2022), choix de la PAC selon les
// radiateurs, devis complet (PAC + cuve + électricité), aides 2026, économies,
// déroulé du chantier. Chiffres cohérents avec aide-pompe-a-chaleur-2026.
// Sources : décret n° 2022-8 du 5 janvier 2022, economie.gouv.fr, ADEME,
// arrêté du 1er juillet 1979 / 23 mars 1979 (stockage fioul), Anah
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Remplacer une chaudière fioul par une pompe à chaleur : prix, aides et étapes",
  subtitle:
    "Remplacer une chaudière fioul par une pompe à chaleur en 2026 : ce que dit la loi, quelle PAC choisir, prix complet avec la cuve, aides et économies réelles.",
  slug: "remplacer-chaudiere-fioul-par-pompe-a-chaleur",
  date: "8 novembre 2026",
  dateISO: "2026-11-08",
  readingTime: 14,
  author: "Greenter",
}

export const DEVIS_TABLE = {
  columns: [
    { header: "Poste", key: "poste" },
    { header: "Prix TTC", key: "prix", highlight: true },
    { header: "Commentaire", key: "commentaire" },
  ],
  rows: [
    { poste: "PAC air-eau moyenne température 11 à 14 kW, posée", prix: "12 000 à 16 000 €", commentaire: "Radiateurs acier ou fonte de grand volume, maison isolée" },
    { poste: "PAC air-eau haute température 14 à 16 kW, posée", prix: "15 000 à 20 000 €", commentaire: "Maison ancienne, radiateurs fonte, isolation partielle" },
    { poste: "Ballon d'eau chaude sanitaire 200 L", prix: "inclus ou 1 200 à 2 000 €", commentaire: "Intégré au module intérieur ou séparé" },
    { poste: "Dépose de l'ancienne chaudière", prix: "300 à 600 €", commentaire: "Souvent incluse dans le devis PAC" },
    { poste: "Neutralisation de la cuve (dégazage, nettoyage)", prix: "400 à 900 €", commentaire: "Cuve laissée en place, attestation remise" },
    { poste: "Enlèvement de la cuve", prix: "700 à 2 500 €", commentaire: "Selon volume, accès et cuve enterrée ou non" },
    { poste: "Désembouage du réseau de chauffage", prix: "400 à 800 €", commentaire: "Recommandé après des décennies de fioul" },
    { poste: "Mise à niveau électrique", prix: "0 à 800 €", commentaire: "Ligne dédiée, passage de 6 ou 9 kVA à 12 kVA" },
  ],
  caption:
    "Fourchettes 2026 en Île-de-France, pose par une entreprise RGE QualiPAC, TVA à 5,5 % pour les travaux éligibles. Avant aides.",
}

export const AIDES_TABLE = {
  columns: [
    { header: "Aide", key: "aide" },
    { header: "Très modestes", key: "bleu", highlight: true },
    { header: "Modestes", key: "jaune" },
    { header: "Intermédiaires", key: "violet" },
    { header: "Supérieurs", key: "rose" },
  ],
  rows: [
    { aide: "MaPrimeRénov' PAC air-eau", bleu: "5 000 €", jaune: "4 000 €", violet: "3 000 €", rose: "0 €" },
    { aide: "MaPrimeRénov' dépose de cuve", bleu: "1 200 €", jaune: "800 €", violet: "400 €", rose: "0 €" },
    { aide: "Prime CEE Coup de pouce (estimation)", bleu: "≈ 4 000 €", jaune: "≈ 3 500 €", violet: "≈ 2 500 €", rose: "≈ 2 500 €" },
    { aide: "Total indicatif", bleu: "≈ 10 200 €", jaune: "≈ 8 300 €", violet: "≈ 5 900 €", rose: "≈ 2 500 €" },
  ],
  caption:
    "Pour une PAC air-eau agréée remplaçant une chaudière fioul dans une maison de 100 à 120 m² en Île-de-France. La prime CEE dépend du fournisseur d'énergie, de la surface et du modèle. TVA à 5,5 % et éco-PTZ en plus.",
}

export const ECONOMIES_TABLE = {
  columns: [
    { header: "", key: "ligne" },
    { header: "Chaudière fioul", key: "fioul" },
    { header: "PAC air-eau (SCOP 3)", key: "pac", highlight: true },
  ],
  rows: [
    { ligne: "Énergie consommée", fioul: "2 000 litres", pac: "≈ 6 300 kWh d'électricité" },
    { ligne: "Prix unitaire retenu", fioul: "1,15 € le litre", pac: "0,195 € le kWh" },
    { ligne: "Coût annuel du chauffage", fioul: "≈ 2 300 €", pac: "≈ 1 230 €" },
    { ligne: "Entretien annuel", fioul: "≈ 150 à 200 €", pac: "≈ 150 à 200 € (tous les 2 ans obligatoire)" },
  ],
  caption:
    "Maison de 120 m² consommant 2 000 litres de fioul par an, soit environ 19 000 kWh de chaleur utile avec un rendement de chaudière de 95 %. Le prix du fioul varie fortement d'une année à l'autre : refaites le calcul avec vos propres factures.",
}

export const ETAPES_STEPS = [
  {
    title: "Visite technique et étude thermique",
    detail:
      "Relevé des pièces, des radiateurs et de l'isolation, analyse de vos consommations de fioul sur deux ou trois ans. On en déduit la puissance utile et la température d'eau nécessaire par grand froid.",
  },
  {
    title: "Choix du modèle et montage des aides",
    detail:
      "PAC moyenne ou haute température selon les radiateurs, modèle figurant sur la liste ADEME des PAC agréées, acceptation de l'offre CEE puis dépôt de la demande MaPrimeRénov' avant les travaux.",
  },
  {
    title: "Dépose de la chaudière et traitement de la cuve",
    detail:
      "Vidange du fioul restant (souvent repris ou pompé), dépose de la chaudière et du conduit si besoin, puis neutralisation ou enlèvement de la cuve par une entreprise spécialisée, avec attestation.",
  },
  {
    title: "Pose de la PAC et désembouage",
    detail:
      "Unité extérieure sur socle ou plots, module intérieur à la place de l'ancienne chaudière, raccordement au circuit de radiateurs, désembouage et ajout d'un filtre magnétique. Deux à trois jours en général.",
  },
  {
    title: "Mise en service et réglages",
    detail:
      "Réglage de la loi d'eau selon vos radiateurs, programmation de l'eau chaude, explication du pilotage. Un ajustement après les premières semaines froides affine le confort et la consommation.",
  },
]

export const FAQ_ITEMS = [
  {
    question: "Est-on obligé de remplacer sa chaudière fioul ?",
    answer:
      "Non. Depuis le 1er juillet 2022, il est interdit d'installer une chaudière fioul neuve, mais une chaudière existante peut continuer à fonctionner, être entretenue et réparée. C'est au moment où elle tombe définitivement en panne qu'il faut changer d'énergie, d'où l'intérêt d'anticiper.",
  },
  {
    question: "Quel est le prix pour remplacer une chaudière fioul par une pompe à chaleur ?",
    answer:
      "Comptez 13 000 à 22 000 € TTC avant aides pour une maison de 100 à 120 m², selon que la PAC est moyenne ou haute température et selon le traitement de la cuve. Après MaPrimeRénov' et la prime CEE, le reste à charge descend autour de 6 000 à 10 000 € pour un ménage modeste.",
  },
  {
    question: "Une pompe à chaleur fonctionne-t-elle avec des radiateurs en fonte ?",
    answer:
      "Oui. Les radiateurs en fonte, de grand volume, s'accommodent souvent très bien d'une eau à 50 ou 55 °C dans une maison partiellement isolée. Si la maison est très peu isolée, une PAC haute température, capable de produire de l'eau à 65 °C ou plus, permet de les garder sans les remplacer.",
  },
  {
    question: "Que faire de la cuve à fioul ?",
    answer:
      "Une cuve inutilisée doit être vidée, dégazée et nettoyée par une entreprise spécialisée. Elle peut ensuite être neutralisée sur place, ou enlevée. Une attestation de neutralisation est remise : conservez-la, elle vous sera demandée par votre assureur ou lors d'une vente. La dépose de cuve ouvre droit à MaPrimeRénov'.",
  },
  {
    question: "Quelles aides pour passer du fioul à la pompe à chaleur en 2026 ?",
    answer:
      "MaPrimeRénov' pour la PAC air-eau (3 000 à 5 000 € selon les revenus) et pour la dépose de cuve (400 à 1 200 €), la prime CEE bonifiée par le Coup de pouce chauffage si la PAC est agréée, la TVA à 5,5 % et l'éco-PTZ. Le logement doit avoir au moins 2 ans pour ce remplacement, contre 15 ans en règle générale.",
  },
  {
    question: "Faut-il augmenter son abonnement électrique ?",
    answer:
      "Souvent, oui. Une maison chauffée au fioul a fréquemment un abonnement de 6 ou 9 kVA. Une PAC de 11 à 16 kW avec appoint électrique peut nécessiter 12 kVA, voire un passage en triphasé pour les plus grosses puissances. L'installateur doit le vérifier pendant la visite technique.",
  },
  {
    question: "Et la chaudière biofioul ?",
    answer:
      "Une chaudière compatible biofioul (F100) reste autorisée. Elle évite de modifier les radiateurs et de traiter la cuve, mais le biofioul coûte plus cher que le fioul classique, sa distribution reste limitée et cette solution n'est plus aidée par MaPrimeRénov'. La PAC est en général plus économique sur la durée.",
  },
]

export const SOURCES = [
  {
    name: "Décret n° 2022-8 du 5 janvier 2022 relatif au résultat minimal de performance environnementale des équipements de chauffage",
    url: "https://www.legifrance.gouv.fr",
    date: "2022",
  },
  {
    name: "Ministère de l'Économie : MaPrimeRénov' parcours par geste, PAC air-eau et dépose de cuve à fioul",
    url: "https://www.economie.gouv.fr/particuliers/faire-des-economies-denergie/maprimerenov-parcours-par-geste-la-prime-pour-la-renovation-energetique",
    date: "2026",
  },
  {
    name: "ADEME : liste des pompes à chaleur agréées pour le Coup de pouce chauffage",
    url: "https://www.ademe.fr",
    date: "2026",
  },
  {
    name: "Ministère de la Transition écologique : sortir du chauffage au fioul",
    url: "https://www.ecologie.gouv.fr",
    date: "2026",
  },
]
