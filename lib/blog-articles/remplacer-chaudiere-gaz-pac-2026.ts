// =============================================================================
// Données article : Remplacer chaudière gaz par pompe à chaleur en 2026
// Sources : economie.gouv.fr, ecologie.gouv.fr, ademe.fr, cre.fr,
//           france-renov.gouv.fr, anah.gouv.fr
// Date de recherche : avril 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Remplacer sa chaudière gaz par une pompe à chaleur en 2026 : le guide complet",
  subtitle:
    "TVA à 20 % sur les chaudières gaz, prime EDF de 1 000 €, Coup de pouce chauffage bonifié ×5, MaPrimeRénov' jusqu'à 5 000 € : 2026 est l'année où basculer du gaz vers la pompe à chaleur devient la meilleure décision financière et écologique pour votre maison.",
  slug: "remplacer-chaudiere-gaz-pompe-a-chaleur-2026",
  date: "20 avril 2026",
  dateISO: "2026-04-20",
  readingTime: 15,
  author: "Greenter",
}

// Tableau comparatif consommation gaz vs PAC pour une maison de 120 m²
export const CONSUMPTION_TABLE = {
  columns: [
    { header: "Critère", key: "critere" },
    { header: "Chaudière gaz", key: "gaz", highlight: true },
    { header: "PAC air-eau", key: "pac", highlight: true },
  ],
  rows: [
    { critere: "Consommation énergie finale (120 m²)", gaz: "≈ 13 200 kWh gaz", pac: "≈ 4 400 kWh élec" },
    { critere: "Rendement / COP", gaz: "90-95 % (condensation)", pac: "3 à 4 (SCOP ADEME)" },
    { critere: "Prix du kWh (avril 2026, zone 1)", gaz: "0,1256 €/kWh (CRE)", pac: "0,2016 €/kWh HP/HC" },
    { critere: "Coût annuel chauffage estimé", gaz: "≈ 1 660 €", pac: "≈ 890 €" },
    { critere: "Émissions CO₂ annuelles", gaz: "≈ 2 700 kg CO₂", pac: "≈ 250 kg CO₂" },
    { critere: "TVA sur l'équipement neuf", gaz: "20 % (depuis mars 2025)", pac: "5,5 % (rénovation)" },
  ],
  caption:
    "Sources : ADEME (étude 2025 PAC air-eau), CRE (prix repère avril 2026), Ministère de la Transition écologique. Maison moyennement isolée, usage chauffage + ECS.",
}

// Aides financières cumulables en 2026
export const AIDES_TABLE = {
  columns: [
    { header: "Dispositif", key: "aide" },
    { header: "Montant (ménages modestes)", key: "modeste", highlight: true },
    { header: "Conditions", key: "conditions" },
  ],
  rows: [
    { aide: "MaPrimeRénov' parcours par geste (PAC air-eau)", modeste: "5 000 € (Bleu) / 4 000 € (Jaune) / 3 000 € (Violet)", conditions: "Plafond de dépenses éligibles : 12 000 €. Rose non éligible." },
    { aide: "MaPrimeRénov' parcours par geste (PAC géothermique)", modeste: "11 000 € / 9 000 € / 6 000 €", conditions: "Plafond de dépenses éligibles : 18 000 €. Rose non éligible." },
    { aide: "Coup de pouce chauffage CEE (bonification)", modeste: "×5 sur les kWh cumac", conditions: "Remplacement chaudière gaz/fioul/charbon par PAC air-eau ou eau-eau. Montant variable selon zone climatique et surface, négocié avec l'obligé CEE." },
    { aide: "Prime EDF « Je passe à l'électrique »", modeste: "1 000 € forfaitaires", conditions: "Bleu + Jaune uniquement. Devis signé après le 8 avril 2026, PAC air-eau ou eau-eau, fin des travaux avant le 7 avril 2027, 80 000 dossiers disponibles." },
    { aide: "TVA réduite 5,5 %", modeste: "≈ -14,5 % sur facture", conditions: "Logement de plus de 2 ans, travaux d'amélioration énergétique. Exclut les chaudières fossiles (gaz) qui restent à 20 % depuis l'arrêté du 4 décembre 2024." },
    { aide: "Éco-prêt à taux zéro couplé MPR", modeste: "jusqu'à 50 000 €", conditions: "Sans conditions de revenus, remboursable sur 20 ans. Ne finance pas les chaudières gaz." },
  ],
  caption:
    "Sources : Guide ANAH « Les aides financières en 2026 » (février 2026), ecologie.gouv.fr, EDF Particulier. Cumul MPR + CEE + EDF autorisé en parcours par geste, plafonné à 90/75/60 % de la dépense selon la tranche.",
}

// Étapes techniques du remplacement
export const STEPS = [
  {
    title: "Étude technique à domicile",
    detail:
      "Un technicien RGE évalue votre surface, isolation (DPE), émetteurs existants (radiateurs fonte / acier / plancher chauffant), zone climatique et calcule la puissance nécessaire. Visite gratuite et sans engagement.",
    duration: "1 visite",
  },
  {
    title: "Rendez-vous France Rénov' (si parcours accompagné)",
    detail:
      "Depuis février 2026, un entretien gratuit avec un conseiller France Rénov' est obligatoire avant toute demande MaPrimeRénov' rénovation d'ampleur. Pour le simple changement de chaudière (parcours par geste), cette étape n'est pas requise.",
    duration: "1 h",
  },
  {
    title: "Montage du dossier d'aides",
    detail:
      "L'artisan RGE (ou Mon Accompagnateur Rénov' si parcours accompagné) dépose les demandes MaPrimeRénov', Coup de pouce, prime EDF et éco-PTZ. Les aides sont versées après travaux, ou déduites directement du devis selon le dispositif.",
    duration: "2 à 4 semaines d'instruction",
  },
  {
    title: "Dépose de la chaudière gaz",
    detail:
      "Le chauffagiste coupe l'alimentation en gaz et en électricité, vidange le circuit de chauffage et d'eau chaude, déconnecte les circuits d'eau, de gaz et d'évacuation des fumées, puis sécurise l'arrivée de gaz.",
    duration: "½ journée",
  },
  {
    title: "Installation de la PAC air-eau",
    detail:
      "Pose de l'unité extérieure (sur socle ou mural), du module intérieur (hydromodule + ballon ECS), raccordement au circuit hydraulique existant (radiateurs ou plancher chauffant), mise en service et paramétrage.",
    duration: "1 à 3 jours",
  },
  {
    title: "Résiliation du contrat gaz",
    detail:
      "Une fois la PAC en service, vous demandez la résiliation de votre contrat gaz auprès de votre fournisseur et, si vous le souhaitez, le retrait du compteur GRDF (gratuit, sur demande). Pensez à garder le gaz quelques jours le temps de vérifier que la PAC couvre bien vos besoins.",
    duration: "15 à 30 jours",
  },
]

// Exemple chiffré avec toutes les aides
export const EXAMPLE_CALCULATION = {
  title:
    "Exemple : maison de 120 m² en Seine-et-Marne, revenus modestes (tranche Jaune), chaudière gaz condensation remplacée par PAC air-eau 12 kW",
  lines: [
    { label: "Prix PAC air-eau 12 kW (matériel + pose + ballon ECS)", amount: "15 000 €" },
    { label: "MaPrimeRénov' parcours par geste (tranche Jaune)", amount: "- 4 000 €", isDeduction: true },
    { label: "Prime EDF « Je passe à l'électrique »", amount: "- 1 000 €", isDeduction: true },
    { label: "Coup de pouce chauffage CEE (bonifié ×5)", amount: "- 3 500 €", isDeduction: true },
    { label: "TVA réduite 5,5 % (vs 20 %)", amount: "- 1 950 €", isDeduction: true },
  ],
  total: { label: "Reste à charge final", amount: "≈ 4 550 €" },
  savings: "770 €/an d'économies sur le chauffage (source ADEME 2025)",
  roi: "5 à 6 ans de retour sur investissement",
  disclaimer:
    "Le montant du Coup de pouce CEE varie selon la zone climatique, la surface et l'obligé CEE choisi. Simulation indicative — demandez votre devis pour un chiffrage exact.",
}

// Calendrier réglementaire spécifique "sortie du gaz"
export const REGULATORY_CALENDAR = [
  { date: "Janvier 2022", event: "Interdiction des chaudières gaz dans les maisons individuelles neuves (RE2020)", source: "ecologie.gouv.fr" },
  { date: "Janvier 2025", event: "Interdiction dans les logements collectifs neufs (sauf solutions hybrides)", source: "RE2020" },
  { date: "Mars 2025", event: "TVA sur les chaudières gaz relevée de 10 % à 20 %", source: "Loi de finances 2025" },
  { date: "Octobre 2025", event: "Refonte du Coup de pouce chauffage : barème au cas par cas, bonification x3 à x4 pour remplacer gaz/fioul par PAC", source: "ecologie.gouv.fr" },
  { date: "Janvier 2026", event: "Retrait de l'isolation des murs (ITI/ITE) et des chaudières biomasse du parcours par geste MaPrimeRénov'", source: "Guide ANAH 2026" },
  { date: "Février 2026", event: "Réouverture complète de MaPrimeRénov' + rendez-vous France Rénov' obligatoire pour la rénovation d'ampleur", source: "economie.gouv.fr" },
  { date: "8 avril 2026", event: "Lancement de la prime EDF « Je passe à l'électrique » (1 000 € forfaitaires, 80 000 dossiers, ménages modestes uniquement)", source: "EDF Particulier" },
  { date: "2040", event: "Objectif de sortie totale des équipements de chauffage fossiles", source: "Stratégie Nationale Bas Carbone" },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Les chaudières gaz sont-elles vraiment interdites en 2026 ?",
    answer:
      "Non, pas dans les logements existants. Au 1er trimestre 2026, il est toujours légal d'installer une chaudière gaz en remplacement dans une maison ancienne. L'interdiction ne concerne que les constructions neuves : maisons individuelles depuis 2022 et logements collectifs depuis janvier 2025 (RE2020). En revanche, la TVA sur les chaudières gaz est passée de 10 % à 20 % en mars 2025, et l'objectif gouvernemental est la sortie totale des équipements fossiles d'ici 2040.",
  },
  {
    question: "Puis-je garder mes radiateurs existants avec une PAC ?",
    answer:
      "Oui, dans la majorité des cas. Une PAC air-eau haute température (certaines atteignent 65-75 °C) peut alimenter des radiateurs en fonte existants. Pour les radiateurs acier ou l'eau basse température (plancher chauffant), une PAC classique convient. Un technicien RGE calculera lors de la visite si vos émetteurs sont compatibles ou s'il faut les redimensionner. Conserver les radiateurs réduit le coût total des travaux de 1 500 à 3 000 €.",
  },
  {
    question: "Combien coûte réellement le passage du gaz à la PAC en 2026 ?",
    answer:
      "Pour une maison de 120 m² aux revenus de la tranche Jaune (modestes), le prix d'une PAC air-eau 12 kW posée tourne autour de 15 000 €. Après cumul des aides 2026 — MaPrimeRénov' parcours par geste (4 000 €), prime EDF « Je passe à l'électrique » (1 000 €), Coup de pouce CEE bonifié ×5 (≈ 3 500 €) et TVA à 5,5 % (≈ 1 950 €) —, le reste à charge descend autour de 4 500 à 5 000 €. L'économie annuelle sur le chauffage est d'environ 770 €, soit un retour sur investissement de 5 à 6 ans.",
  },
  {
    question: "Combien de temps dure l'installation ?",
    answer:
      "Entre 2 et 5 jours de chantier au total : ½ journée pour déposer la chaudière gaz et sécuriser l'arrivée de gaz, puis 1 à 3 jours pour installer la PAC air-eau (unité extérieure, module intérieur, ballon ECS, raccordements) et la mettre en service. Vous pouvez rester dans le logement pendant les travaux. L'eau chaude sanitaire est coupée uniquement pendant la bascule (quelques heures).",
  },
  {
    question: "Faut-il isoler avant d'installer la PAC ?",
    answer:
      "Ce n'est pas obligatoire mais c'est fortement recommandé par l'ADEME. Une bonne isolation (combles en priorité : 30 % des déperditions) permet de choisir une PAC moins puissante (et donc moins chère), d'améliorer son rendement réel et de réduire le COP saisonnier. Si votre logement est classé E, F ou G au DPE, commencez par l'isolation des combles avant d'installer la PAC — vous pouvez cumuler les deux dossiers d'aides.",
  },
  {
    question: "Est-ce que je dois résilier mon contrat gaz immédiatement ?",
    answer:
      "Non, attendez que la PAC ait passé un cycle de chauffe complet (idéalement un mois) pour valider son bon fonctionnement. Une fois rassuré, vous demandez la résiliation à votre fournisseur de gaz (gratuite, préavis de 30 jours) puis, si vous souhaitez supprimer l'abonnement d'acheminement, le retrait du compteur GRDF (gratuit également, sur demande en ligne).",
  },
  {
    question: "Mon Accompagnateur Rénov' est-il obligatoire pour passer du gaz à la PAC ?",
    answer:
      "Non, pas pour un simple remplacement d'équipement. Mon Accompagnateur Rénov' (MAR) est obligatoire uniquement pour MaPrimeRénov' rénovation d'ampleur (parcours accompagné, minimum 2 gestes + audit, avec gain de 2 classes DPE). Pour le parcours par geste — qui couvre le remplacement gaz → PAC seul — le MAR n'est pas requis. Vous travaillez directement avec votre artisan RGE.",
  },
  {
    question: "La PAC va-t-elle faire trop de bruit dans mon jardin ?",
    answer:
      "Les PAC air-eau modernes émettent entre 45 et 55 dB à 1 m de l'unité extérieure, soit l'équivalent d'un réfrigérateur ou d'une conversation normale. La réglementation impose un maximum de 5 dB de plus que le bruit ambiant entre 22 h et 7 h. Un technicien RGE choisit l'emplacement (distance voisinage, orientation, socle antivibratile) pour rester en-dessous du seuil. Les modèles récents 2025-2026 sont nettement plus silencieux que les générations précédentes.",
  },
]

// Sources officielles
export const SOURCES = [
  {
    name: "MaPrimeRénov' parcours par geste — economie.gouv.fr",
    url: "https://www.economie.gouv.fr/particuliers/faire-des-economies-denergie/maprimerenov-parcours-par-geste-la-prime-pour-la-renovation-energetique",
    date: "avril 2026",
  },
  {
    name: "Aides pour l'installation d'une pompe à chaleur — economie.gouv.fr",
    url: "https://www.economie.gouv.fr/cedef/aides-installation-pompe-chaleur",
    date: "avril 2026",
  },
  {
    name: "Bonus +1 000 € MaPrimeRénov' pour sortir du fioul ou du gaz — ecologie.gouv.fr",
    url: "https://www.ecologie.gouv.fr/gouvernement-annonce-1000-eu-daugmentation-maprimerenov-partir-du-15-avril-tout-changement-systeme",
    date: "15 avril 2026",
  },
  {
    name: "Coup de pouce Chauffage — Ministère de la Transition écologique",
    url: "https://www.ecologie.gouv.fr/politiques-publiques/coup-pouce-chauffage",
    date: "octobre 2025",
  },
  {
    name: "Prime EDF pompe à chaleur (1 000 €) — EDF Particulier",
    url: "https://particulier.edf.fr/fr/accueil/guide-energie/electricite/prime-pompe-a-chaleur.html",
    date: "avril 2026",
  },
  {
    name: "Prix repère du gaz naturel — CRE (Commission de Régulation de l'Énergie)",
    url: "https://www.cre.fr/consommateurs/prix-reperes-et-references/prix-repere-de-vente-de-gaz-naturel-a-destination-des-clients-residentiels.html",
    date: "avril 2026",
  },
  {
    name: "Pompes à chaleur — Ministère de la Transition écologique",
    url: "https://www.ecologie.gouv.fr/politiques-publiques/pompes-chaleur",
    date: "2026",
  },
  {
    name: "Mon Accompagnateur Rénov' — France Rénov'",
    url: "https://france-renov.gouv.fr/mon-accompagnateur-renov",
    date: "2026",
  },
  {
    name: "Interdiction chaudières fioul et transition — ecologie.gouv.fr",
    url: "https://www.ecologie.gouv.fr/gouvernement-met-en-consultation-decret-visant-interdire-linstallation-nouvelles-chaudieres-au-fioul",
    date: "2022",
  },
  {
    name: "Performance PAC air-eau en conditions réelles — ADEME Infos",
    url: "https://infos.ademe.fr/energies/2025/comment-maximiser-la-performance-de-votre-pompe-a-chaleur-air-eau/",
    date: "2025",
  },
]
