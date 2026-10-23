// =============================================================================
// Données article : Note de dimensionnement pompe à chaleur — guide 2026
// Angle : le document lui-même (définition, obligation CEE, contenu attendu,
// exemple commenté, vérification avant signature, signaux d'alerte).
// Complémentaire de "puissance-pompe-a-chaleur" (méthode de calcul de la
// puissance) sans la cannibaliser.
// Sources : fiche CEE BAR-TH-171 (vA78/vA82), FFB, NF EN 12831, ADEME, Qualit'EnR
// Date de recherche : octobre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Note de dimensionnement pompe à chaleur : contenu, obligation et vérification",
  subtitle:
    "Note de dimensionnement pompe à chaleur : ce qu'elle doit contenir, quand elle est obligatoire pour les aides et comment la vérifier avant de signer.",
  slug: "note-de-dimensionnement-pompe-a-chaleur",
  date: "23 octobre 2026",
  dateISO: "2026-10-23",
  readingTime: 14,
  author: "Greenter",
}

// Contenu attendu d'une note de dimensionnement
export const CONTENU_TABLE = {
  columns: [
    { header: "Rubrique", key: "rubrique" },
    { header: "Ce que vous devez y trouver", key: "contenu", highlight: true },
    { header: "Pourquoi c'est important", key: "pourquoi" },
  ],
  rows: [
    { rubrique: "Logement et pièces chauffées", contenu: "Adresse, surface, liste des pièces desservies par le réseau de chauffage", pourquoi: "Le calcul porte sur les pièces réellement chauffées par la PAC" },
    { rubrique: "Conditions de calcul", contenu: "Température extérieure de base (Tbase) du lieu, température intérieure de consigne par pièce", pourquoi: "Tout le dimensionnement se fait au jour le plus froid de référence" },
    { rubrique: "Déperditions", contenu: "Pertes par les parois, les menuiseries et le renouvellement d'air, pièce par pièce, puis total en kW", pourquoi: "C'est le besoin de chauffage que la PAC doit couvrir" },
    { rubrique: "Émetteurs et régime d'eau", contenu: "Type d'émetteurs (radiateurs, plancher chauffant) et température d'eau retenue : 35, 45 ou 55 °C", pourquoi: "La puissance d'une PAC baisse quand on lui demande une eau plus chaude" },
    { rubrique: "Puissance de la PAC à Tbase", contenu: "Puissance restituée par le modèle à la Tbase et au régime d'eau retenus, d'après les données du fabricant", pourquoi: "La puissance nominale du catalogue ne suffit pas à juger" },
    { rubrique: "Couverture et appoint", contenu: "Part des déperditions couverte par la PAC, point de bivalence, puissance de l'appoint éventuel", pourquoi: "Indique combien l'appoint électrique travaillera par grand froid" },
    { rubrique: "Eau chaude sanitaire", contenu: "Nombre d'occupants, volume du ballon, mode de production", pourquoi: "L'ECS mobilise une partie de la puissance de la PAC" },
    { rubrique: "Matériel préconisé", contenu: "Marque, référence, Etas, type d'application (basse, moyenne ou haute température)", pourquoi: "La PAC posée doit être conforme à la note pour les primes CEE" },
  ],
  caption:
    "Contenu type d'une note sérieuse. La fiche CEE BAR-TH-171 impose un dimensionnement par rapport aux déperditions calculées à Tbase ; la forme du document est libre.",
}

// Exemple commenté : maison de 110 m² en Essonne
export const EXEMPLE_TABLE = {
  columns: [
    { header: "Pièce", key: "piece" },
    { header: "Surface", key: "surface" },
    { header: "Consigne", key: "consigne" },
    { header: "Déperditions à Tbase", key: "deperditions", highlight: true },
  ],
  rows: [
    { piece: "Séjour – salle à manger", surface: "38 m²", consigne: "20 °C", deperditions: "2,9 kW" },
    { piece: "Cuisine", surface: "12 m²", consigne: "20 °C", deperditions: "0,9 kW" },
    { piece: "Chambres (×3)", surface: "36 m²", consigne: "19 °C", deperditions: "2,4 kW" },
    { piece: "Salle de bains", surface: "8 m²", consigne: "22 °C", deperditions: "0,6 kW" },
    { piece: "Entrée, dégagements, WC", surface: "16 m²", consigne: "18 °C", deperditions: "0,7 kW" },
    { piece: "Total logement", surface: "110 m²", consigne: "—", deperditions: "7,5 kW" },
  ],
  caption:
    "Exemple illustratif : maison des années 1980 en Essonne, combles isolés, double vitrage, murs faiblement isolés, Tbase ≈ −7 °C. Les valeurs réelles dépendent de chaque logement.",
}

// Vérifier la note avant de signer
export const VERIFICATION_STEPS = [
  {
    title: "Vérifier que la note existe avant la signature",
    detail:
      "Pour les primes CEE, la note doit vous être remise à l'engagement de l'opération, c'est-à-dire avant la signature du devis. Un installateur qui promet de « l'envoyer après les travaux » ne respecte pas la règle.",
  },
  {
    title: "Contrôler la température de base",
    detail:
      "La note doit indiquer la Tbase retenue pour votre commune. En Île-de-France, elle est généralement de l'ordre de −7 °C. Une Tbase trop douce conduit mécaniquement à une PAC trop petite.",
  },
  {
    title: "Chercher le détail pièce par pièce",
    detail:
      "Des déperditions calculées pièce par pièce, avec les parois et le renouvellement d'air, signalent un vrai calcul. Une seule ligne « 110 m² × 70 W/m² » relève de l'estimation, pas d'un véritable calcul.",
  },
  {
    title: "Comparer la puissance à Tbase, pas la puissance nominale",
    detail:
      "Repérez la puissance que la PAC restitue à −7 °C avec la température d'eau de vos émetteurs. C'est elle qui doit être confrontée aux déperditions, et non le chiffre affiché sur le catalogue, mesuré à +7 °C.",
  },
  {
    title: "Regarder le rôle de l'appoint",
    detail:
      "Si la PAC couvre nettement moins que les déperditions à Tbase, la note doit dire comment le complément est assuré et à partir de quelle température. Un appoint électrique très sollicité alourdit la facture.",
  },
  {
    title: "Vérifier la cohérence avec le devis",
    detail:
      "La marque, la référence et le type d'application inscrits sur la note doivent correspondre exactement au matériel du devis, puis à celui réellement posé. Une PAC différente doit donner lieu à une note actualisée.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'une note de dimensionnement de pompe à chaleur ?",
    answer:
      "C'est le document par lequel l'installateur justifie la puissance de la pompe à chaleur qu'il propose. Il calcule les déperditions de chaleur du logement à la température extérieure de base du lieu, pièce par pièce, puis vérifie que la PAC choisie peut couvrir ces besoins avec la température d'eau adaptée à vos émetteurs.",
  },
  {
    question: "La note de dimensionnement est-elle obligatoire ?",
    answer:
      "Elle est obligatoire pour bénéficier des primes CEE sur une pompe à chaleur air-eau (fiche BAR-TH-171) : le professionnel doit la rédiger, la remettre au bénéficiaire à l'engagement de l'opération et la joindre aux pièces justificatives. La PAC installée doit être conforme à ses préconisations. Elle est aussi contrôlée lors des audits de qualification RGE des installateurs.",
  },
  {
    question: "Quand l'installateur doit-il remettre la note de dimensionnement ?",
    answer:
      "À l'engagement de l'opération, c'est-à-dire au moment où vous vous engagez sur le devis. Si le projet évolue, par exemple en cas de changement de modèle, la note est actualisée et remise à nouveau à l'achèvement des travaux.",
  },
  {
    question: "Quelle différence entre note de dimensionnement et étude thermique ?",
    answer:
      "Elle porte uniquement sur le choix du générateur de chauffage : elle calcule les déperditions et vérifie l'adéquation de la PAC. Une étude thermique réglementaire ou un audit énergétique sont plus larges : ils évaluent la performance globale du logement et proposent des scénarios de travaux, notamment d'isolation.",
  },
  {
    question: "Comment calculer les déperditions d'une maison ?",
    answer:
      "Le calcul additionne, pour chaque pièce, les pertes à travers les murs, la toiture, le plancher et les menuiseries, et celles dues au renouvellement d'air, pour l'écart entre la température intérieure de consigne et la température extérieure de base. Les professionnels utilisent des logiciels qui appliquent la norme NF EN 12831. Un simple ratio en watts par m² ne donne qu'un ordre de grandeur.",
  },
  {
    question: "Une PAC surdimensionnée est-elle vraiment un problème ?",
    answer:
      "Oui. Une pompe à chaleur trop puissante pour le logement fonctionne par cycles courts : elle démarre et s'arrête sans cesse, ce qui dégrade son rendement, use le compresseur et coûte plus cher à l'achat. La note de dimensionnement sert précisément à éviter ce travers, autant que le sous-dimensionnement.",
  },
  {
    question: "Combien coûte une note de dimensionnement ?",
    answer:
      "Chez un installateur RGE, elle est le plus souvent incluse dans le devis de la pompe à chaleur, car elle fait partie de son travail de conception. Une étude réalisée par un bureau d'études thermiques indépendant, plus détaillée, coûte en général quelques centaines d'euros.",
  },
  {
    question: "Que faire si la note de dimensionnement me semble fausse ?",
    answer:
      "Demandez des explications écrites à l'installateur : Tbase retenue, détail des déperditions, puissance de la PAC à cette température. Comparez avec un deuxième devis et sa propre note. En cas de doute sérieux, un bureau d'études ou un conseiller France Rénov' peut vous aider à l'analyser avant de signer.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Ministère de la Transition écologique — Fiche CEE BAR-TH-171 « Pompe à chaleur de type air/eau »",
    url: "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie",
    date: "2026",
  },
  {
    name: "FFB — CEE : une note de dimensionnement exigée",
    url: "https://www.ffbatiment.fr/actualites-batiment/actualite/cee-note-dimensionnement-exigee",
    date: "2022",
  },
  {
    name: "AFNOR — NF EN 12831, méthode de calcul de la charge thermique de conception",
    url: "https://www.afnor.org",
    date: "2025",
  },
  {
    name: "ADEME — Les pompes à chaleur : bien choisir et bien dimensionner",
    url: "https://agirpourlatransition.ademe.fr/particuliers/maison/chauffage",
    date: "2025",
  },
  {
    name: "Qualit'EnR — Qualification QualiPAC des installateurs de pompes à chaleur",
    url: "https://www.qualit-enr.org",
    date: "2026",
  },
]
