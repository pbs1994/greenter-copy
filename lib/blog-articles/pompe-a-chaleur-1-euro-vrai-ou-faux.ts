// =============================================================================
// Données article : Pompe à chaleur à 1 euro : vrai ou faux ?
// Sources : economie.gouv.fr, france-renov.gouv.fr, ademe.fr, signal.conso.gouv.fr,
//           legifrance.gouv.fr, quechoisir.org
// Date de recherche : juillet 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à chaleur à 1 euro : vrai ou faux ? Le guide complet 2026",
  subtitle:
    "Une pompe à chaleur à 1 euro, ça existe vraiment ? Décryptage d'une offre devenue le symbole des arnaques à la rénovation énergétique : origine du mythe, aides réelles MaPrimeRénov' 2026, signaux d'alerte et reste à charge véritable.",
  slug: "pompe-a-chaleur-a-1-euro-vrai-ou-faux",
  date: "23 juillet 2026",
  dateISO: "2026-07-23",
  readingTime: 14,
  author: "Greenter",
}

// Barème MaPrimeRénov' 2026 pour une PAC air-eau (aides réelles, sans démarchage)
export const AIDES_REELLES_TABLE = {
  columns: [
    { header: "Catégorie de revenus", key: "categorie" },
    { header: "MaPrimeRénov' PAC air-eau", key: "montant", highlight: true },
    { header: "Coup de pouce CEE (estimation)", key: "cee" },
    { header: "Reste à charge estimé", key: "reste" },
  ],
  rows: [
    {
      categorie: "Très modestes (Bleu)",
      montant: "5 000 €",
      cee: "1 000 à 2 500 €",
      reste: "3 500 à 8 000 €",
    },
    {
      categorie: "Modestes (Jaune)",
      montant: "4 000 €",
      cee: "700 à 2 000 €",
      reste: "5 000 à 9 000 €",
    },
    {
      categorie: "Intermédiaires (Violet)",
      montant: "3 000 €",
      cee: "500 à 1 500 €",
      reste: "6 500 à 10 500 €",
    },
    {
      categorie: "Supérieurs (Rose)",
      montant: "Non éligible",
      cee: "300 à 900 €",
      reste: "9 000 à 14 000 €",
    },
  ],
  caption:
    "Estimations pour une PAC air-eau (10 000 à 18 000 € matériel + pose) selon le barème MaPrimeRénov' 2026 et une estimation moyenne du Coup de pouce CEE. Sources : france-renov.gouv.fr, economie.gouv.fr, janvier 2026. Dans aucun cas le reste à charge ne descend à 1 €.",
}

// Signaux d'alerte d'une arnaque à la pompe à chaleur (utilisés dans ArticleSteps)
export const SIGNAUX_ALERTE = [
  {
    title: "Un démarchage téléphonique ou du porte-à-porte non sollicité",
    detail:
      "Depuis mars 2023, le démarchage téléphonique pour la rénovation énergétique est interdit en France (loi du 27 février 2023). Un appel ou une visite spontanée proposant une pompe à chaleur à 1 euro est, à lui seul, un signal d'alerte quasi certain d'une pratique commerciale illicite.",
    duration: "Signal n°1",
  },
  {
    title: "Une pression pour signer immédiatement",
    detail:
      "Les entreprises frauduleuses insistent pour faire signer un devis ou un bon de commande sur-le-champ, souvent en évoquant une offre « limitée dans le temps » ou une aide qui va disparaître. Un professionnel sérieux laisse toujours le temps de la réflexion et respecte le délai légal de rétractation de 14 jours.",
    duration: "Signal n°2",
  },
  {
    title: "Une confusion volontaire entre l'État et l'entreprise",
    detail:
      "Certains démarcheurs se présentent comme mandatés par « le gouvernement », « l'Anah » ou « France Rénov' » pour instaurer une confiance abusive. Aucun artisan privé n'est un organisme d'État : MaPrimeRénov' est une aide versée par l'Anah, jamais une remise appliquée directement par l'entreprise qui vend la pompe à chaleur.",
    duration: "Signal n°3",
  },
  {
    title: "Un devis flou ou une facture gonflée avant déduction des aides",
    detail:
      "Le montage classique consiste à surfacturer largement le matériel et la pose, puis à appliquer les aides sur ce montant gonflé pour afficher artificiellement un reste à charge très faible. Le consommateur croit payer 1 euro alors que le prix de base était déjà anormalement élevé.",
    duration: "Signal n°4",
  },
  {
    title: "Une demande de paiement ou d'acompte avant tout devis signé",
    detail:
      "Demander un acompte important avant la signature d'un devis détaillé, voire avant toute visite technique, est une pratique caractéristique des sociétés éphémères qui disparaissent après encaissement, laissant le ménage sans pompe à chaleur installée et sans recours simple.",
    duration: "Signal n°5",
  },
]

// Exemple de calcul du reste à charge réel
export const EXAMPLE_CALCULATION = {
  title: "Exemple réel : PAC air-eau pour un ménage très modeste (Bleu) en Île-de-France",
  lines: [
    { label: "Prix PAC air-eau 12 kW (matériel + pose, artisan RGE)", amount: "14 000 €" },
    { label: "MaPrimeRénov' (catégorie Bleu)", amount: "− 5 000 €", isDeduction: true },
    { label: "Coup de pouce CEE (estimation zone H1)", amount: "− 2 000 €", isDeduction: true },
    { label: "TVA réduite à 5,5 % (économie vs TVA 20 %)", amount: "− 1 300 €", isDeduction: true },
  ],
  total: { label: "Reste à charge réel", amount: "5 700 €" },
  savings: "900 à 1 300 €/an d'économies sur la facture de chauffage",
  roi: "Retour sur investissement en 4 à 6 ans",
}

// FAQ rich snippets
export const FAQ_ITEMS = [
  {
    question: "Une pompe à chaleur à 1 euro, ça existe vraiment en 2026 ?",
    answer:
      "Non. Aucun dispositif public ne permet aujourd'hui d'installer une pompe à chaleur pour 1 euro symbolique. Les aides cumulées (MaPrimeRénov', Coup de pouce CEE, TVA réduite) peuvent réduire fortement la facture, mais un reste à charge de plusieurs milliers d'euros subsiste toujours, même pour les ménages aux revenus les plus modestes.",
  },
  {
    question: "D'où vient l'expression « pompe à chaleur à 1 euro » ?",
    answer:
      "Elle vient de la confusion avec le dispositif « isolation à 1 euro », lancé en 2016 dans le cadre des Certificats d'Économies d'Énergie (CEE) pour l'isolation des combles et planchers des ménages très modestes. Ce dispositif a donné lieu à des fraudes massives et a été fortement encadré depuis. Il n'a jamais existé de dispositif public équivalent nommé « pompe à chaleur à 1 euro » : l'expression a été reprise par des démarcheurs pour créer une confusion commerciale.",
  },
  {
    question: "Quelles sont les vraies aides pour une pompe à chaleur en 2026 ?",
    answer:
      "En 2026, une PAC air-eau peut bénéficier de MaPrimeRénov' (jusqu'à 5 000 € pour les ménages très modestes, catégorie Bleu), du Coup de pouce CEE (variable selon la zone climatique et le fournisseur d'énergie) et de la TVA réduite à 5,5 %. Ces aides sont cumulables mais s'appliquent sur un devis réel, jamais sur un montant fictif gonflé.",
  },
  {
    question: "Comment reconnaître une arnaque à la pompe à chaleur ?",
    answer:
      "Les signaux d'alerte les plus fréquents : démarchage téléphonique ou porte-à-porte (interdit depuis 2023), pression pour signer immédiatement, confusion volontaire entretenue avec un organisme d'État, devis flou avec un prix anormalement gonflé avant déduction des aides, et demande d'acompte avant tout devis signé.",
  },
  {
    question: "Le démarchage téléphonique pour une pompe à chaleur est-il interdit ?",
    answer:
      "Oui. Depuis l'entrée en vigueur de la loi du 27 février 2023, le démarchage téléphonique est interdit pour toute offre de travaux de rénovation énergétique, y compris l'installation d'une pompe à chaleur. Toute entreprise qui vous appelle sans sollicitation préalable de votre part pour vous proposer une PAC est en infraction.",
  },
  {
    question: "Que faire si on a été victime d'une arnaque à la pompe à chaleur ?",
    answer:
      "Il faut signaler les faits sur la plateforme SignalConso (signal.conso.gouv.fr) et déposer plainte auprès de la DGCCRF (Direction générale de la concurrence, de la consommation et de la répression des fraudes). Si un crédit a été souscrit, il est possible de faire jouer le droit de rétractation de 14 jours ou de contester le contrat auprès de l'organisme prêteur, notamment en cas de vice de consentement.",
  },
  {
    question: "Comment obtenir un vrai devis fiable pour une pompe à chaleur ?",
    answer:
      "Il faut passer uniquement par un artisan certifié RGE (Reconnu Garant de l'Environnement), vérifiable sur l'annuaire officiel France Rénov', demander plusieurs devis détaillés, utiliser le simulateur d'aides officiel sur france-renov.gouv.fr, et ne jamais signer un devis reçu à la suite d'un démarchage non sollicité.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "economie.gouv.fr — Alerte sur les offres « à 1 euro » et le démarchage abusif",
    url: "https://www.economie.gouv.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — Barèmes MaPrimeRénov' pompe à chaleur 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Légifrance — Loi n° 2023-144 du 27 février 2023 interdisant le démarchage téléphonique en rénovation énergétique",
    url: "https://www.legifrance.gouv.fr",
    date: "2023",
  },
  {
    name: "SignalConso (DGCCRF) — Plateforme de signalement des pratiques commerciales frauduleuses",
    url: "https://signal.conso.gouv.fr",
    date: "2025",
  },
  {
    name: "ADEME — Guide des aides à la rénovation énergétique 2026",
    url: "https://www.ademe.fr",
    date: "2026",
  },
  {
    name: "UFC-Que Choisir — Enquête sur les arnaques à la rénovation énergétique",
    url: "https://www.quechoisir.org",
    date: "2025",
  },
]
