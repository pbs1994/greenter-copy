// =============================================================================
// Données article : Aide pompe à chaleur 2026
// Angle : toutes les aides pour une PAC après la réforme du 1er septembre 2026
// (MaPrimeRénov' par geste resserré, Coup de pouce réservé aux PAC agréées,
// hybrides sorties du Coup de pouce depuis janvier 2026), avec un exemple
// chiffré par profil de revenus en Île-de-France.
// Sources : economie.gouv.fr, france-renov.gouv.fr, Anah, ADEME (liste des PAC
// agréées), service-public.fr (éco-PTZ, TVA), décret du 25 août 2026
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Aide pompe à chaleur 2026 : montants, conditions et cumul des primes",
  subtitle:
    "Aide pompe à chaleur 2026 : MaPrimeRénov', prime CEE et Coup de pouce, TVA à 5,5 %, éco-PTZ. Montants par profil, nouvelles règles de septembre et exemple chiffré.",
  slug: "aide-pompe-a-chaleur-2026",
  date: "8 novembre 2026",
  dateISO: "2026-11-08",
  readingTime: 14,
  author: "Greenter",
}

// MaPrimeRénov' par geste
export const MPR_TABLE = {
  columns: [
    { header: "Équipement", key: "equipement" },
    { header: "Très modestes (bleu)", key: "bleu", highlight: true },
    { header: "Modestes (jaune)", key: "jaune" },
    { header: "Intermédiaires (violet)", key: "violet" },
    { header: "Supérieurs (rose)", key: "rose" },
  ],
  rows: [
    { equipement: "PAC air-eau", bleu: "5 000 €", jaune: "4 000 €", violet: "3 000 €", rose: "0 €" },
    { equipement: "PAC géothermique (eau-eau, sol-eau)", bleu: "11 000 €", jaune: "9 000 €", violet: "6 000 €", rose: "0 €" },
    { equipement: "Dépose d'une cuve à fioul", bleu: "1 200 €", jaune: "800 €", violet: "400 €", rose: "0 €" },
    { equipement: "PAC air-air (climatisation réversible)", bleu: "non éligible", jaune: "non éligible", violet: "non éligible", rose: "non éligible" },
  ],
  caption:
    "Forfaits du parcours par geste pour une demande déposée en 2026. La dépense prise en compte pour une PAC air-eau est plafonnée à 12 000 €. Le chauffe-eau thermodynamique et la plupart des travaux d'isolation ne sont plus financés en geste isolé depuis le 1er septembre 2026.",
}

// Plafonds de revenus Île-de-France
export const PLAFONDS_TABLE = {
  columns: [
    { header: "Personnes dans le foyer", key: "foyer" },
    { header: "Très modestes", key: "bleu" },
    { header: "Modestes", key: "jaune" },
    { header: "Intermédiaires", key: "violet", highlight: true },
    { header: "Supérieurs", key: "rose" },
  ],
  rows: [
    { foyer: "1", bleu: "jusqu'à 24 031 €", jaune: "jusqu'à 29 253 €", violet: "jusqu'à 40 851 €", rose: "au-delà" },
    { foyer: "2", bleu: "≈ 35 270 €", jaune: "≈ 42 930 €", violet: "≈ 60 050 €", rose: "au-delà" },
    { foyer: "3", bleu: "≈ 42 360 €", jaune: "≈ 51 560 €", violet: "≈ 71 850 €", rose: "au-delà" },
    { foyer: "4", bleu: "jusqu'à 49 455 €", jaune: "jusqu'à 60 208 €", violet: "jusqu'à 84 562 €", rose: "au-delà" },
    { foyer: "5", bleu: "≈ 56 580 €", jaune: "≈ 68 880 €", violet: "≈ 96 820 €", rose: "au-delà" },
  ],
  caption:
    "Revenu fiscal de référence (RFR) du foyer, plafonds 2026 en Île-de-France. Les valeurs précédées de ≈ sont arrondies : vérifiez votre profil exact sur le simulateur France Rénov' avant de signer. Hors Île-de-France, les plafonds sont plus bas.",
}

// Exemple chiffré
export const CUMUL_TABLE = {
  columns: [
    { header: "Profil", key: "profil" },
    { header: "MaPrimeRénov'", key: "mpr" },
    { header: "Prime CEE (estimation)", key: "cee" },
    { header: "Total des aides", key: "total" },
    { header: "Reste à charge", key: "reste", highlight: true },
  ],
  rows: [
    { profil: "Très modestes", mpr: "5 000 €", cee: "≈ 4 000 €", total: "≈ 9 000 €", reste: "≈ 6 000 €" },
    { profil: "Modestes", mpr: "4 000 €", cee: "≈ 3 500 €", total: "≈ 7 500 €", reste: "≈ 7 500 €" },
    { profil: "Intermédiaires", mpr: "3 000 €", cee: "≈ 2 500 €", total: "≈ 5 500 €", reste: "≈ 9 500 €" },
    { profil: "Supérieurs", mpr: "0 €", cee: "≈ 2 500 €", total: "≈ 2 500 €", reste: "≈ 12 500 €" },
  ],
  caption:
    "Maison de 100 m² en Seine-et-Marne, chaudière gaz de 1995 remplacée par une PAC air-eau agréée de 11 kW, devis de 15 000 € TTC (TVA à 5,5 %). La prime CEE varie d'un fournisseur d'énergie à l'autre : les montants indiqués sont des ordres de grandeur constatés fin 2026.",
}

// Démarches
export const DEMARCHES_STEPS = [
  {
    title: "Faire établir le devis par un installateur RGE",
    detail:
      "Le devis doit mentionner le modèle exact de PAC, son efficacité saisonnière (ETAS) et le numéro RGE QualiPAC de l'entreprise. Ne le signez pas encore si vous visez la prime CEE.",
  },
  {
    title: "Accepter l'offre CEE avant de signer",
    detail:
      "Inscrivez-vous sur le site du fournisseur d'énergie qui verse la prime (ou laissez l'installateur le faire avec vous) et acceptez son offre. Une prime demandée après la signature du devis est refusée.",
  },
  {
    title: "Déposer la demande MaPrimeRénov'",
    detail:
      "Sur maprimerenov.gouv.fr, avec le devis et votre avis d'imposition. Attendez l'accusé de réception avant le début des travaux : un chantier commencé avant le dépôt n'est pas financé.",
  },
  {
    title: "Faire réaliser les travaux",
    detail:
      "Pose de l'unité extérieure et du module intérieur, raccordement au circuit de chauffage, mise en service et réglage de la loi d'eau. Comptez un à trois jours selon le chantier.",
  },
  {
    title: "Envoyer la facture et percevoir les aides",
    detail:
      "La facture déclenche le versement de MaPrimeRénov' (en général sous quelques semaines) et de la prime CEE. Certains installateurs avancent la prime CEE en la déduisant directement du devis.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quelle aide pour une pompe à chaleur en 2026 ?",
    answer:
      "Pour une PAC air-eau, MaPrimeRénov' verse 5 000 € aux ménages très modestes, 4 000 € aux modestes et 3 000 € aux intermédiaires. S'y ajoutent la prime CEE, bonifiée par le Coup de pouce chauffage quand la PAC agréée remplace une chaudière fioul, gaz ou charbon, la TVA à 5,5 % et l'éco-PTZ jusqu'à 15 000 €. Les revenus supérieurs n'ont plus droit à MaPrimeRénov' mais conservent la prime CEE.",
  },
  {
    question: "Qu'est-ce qui a changé au 1er septembre 2026 ?",
    answer:
      "Deux choses. MaPrimeRénov' par geste ne finance plus qu'un petit nombre de travaux, dont la PAC air-eau, la PAC géothermique et la dépose de cuve à fioul. Et le Coup de pouce chauffage n'est plus accordé qu'aux pompes à chaleur figurant sur la liste des modèles agréés publiée par l'ADEME. Une PAC non agréée ne touche que la prime CEE classique, beaucoup plus faible.",
  },
  {
    question: "La pompe à chaleur air-air donne-t-elle droit à MaPrimeRénov' ?",
    answer:
      "Non. La climatisation réversible air-air n'est pas éligible à MaPrimeRénov' ni au Coup de pouce chauffage. Elle est facturée avec une TVA à 10 %, et seule une petite prime CEE est parfois proposée par certains fournisseurs.",
  },
  {
    question: "Peut-on cumuler MaPrimeRénov' et la prime CEE ?",
    answer:
      "Oui. Les deux aides se cumulent, ainsi qu'avec la TVA réduite et l'éco-PTZ. Le total des aides est toutefois plafonné en pourcentage de la dépense : 90 % pour les ménages très modestes, 75 % pour les modestes, 60 % pour les intermédiaires et 40 % pour les revenus supérieurs.",
  },
  {
    question: "Comment savoir si une pompe à chaleur est agréée ?",
    answer:
      "L'ADEME publie depuis juillet 2026 une liste officielle des modèles agréés, mise à jour chaque mois. Demandez à votre installateur la référence exacte du groupe et du module intérieur, et vérifiez qu'elle y figure avant de signer. C'est la condition pour toucher le Coup de pouce chauffage.",
  },
  {
    question: "Quelles conditions pour toucher MaPrimeRénov' pour une PAC ?",
    answer:
      "Le logement doit être une résidence principale achevée depuis au moins 15 ans, ou au moins 2 ans si la PAC remplace une chaudière au fioul. Les travaux doivent être réalisés par une entreprise RGE QualiPAC, et la demande déposée avant le début du chantier. Les propriétaires occupants et bailleurs sont concernés.",
  },
  {
    question: "La PAC hybride est-elle encore aidée ?",
    answer:
      "Elle ne bénéficie plus de la bonification Coup de pouce chauffage depuis le 1er janvier 2026. Une prime CEE classique reste possible. Pour toucher les aides les plus élevées, une PAC air-eau seule, dimensionnée pour couvrir tout le chauffage, est aujourd'hui plus avantageuse.",
  },
  {
    question: "Faut-il avancer l'argent des aides ?",
    answer:
      "En partie. MaPrimeRénov' est versée après les travaux, sur présentation de la facture. Les ménages très modestes et modestes peuvent demander une avance. La prime CEE est souvent déduite directement du devis par l'installateur, qui la perçoit ensuite à votre place.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Ministère de l'Économie : MaPrimeRénov' parcours par geste, montants et conditions",
    url: "https://www.economie.gouv.fr/particuliers/faire-des-economies-denergie/maprimerenov-parcours-par-geste-la-prime-pour-la-renovation-energetique",
    date: "2026",
  },
  {
    name: "France Rénov' : aides à la rénovation énergétique et plafonds de ressources",
    url: "https://france-renov.gouv.fr",
    date: "2026",
  },
  {
    name: "Décret du 25 août 2026 relatif à MaPrimeRénov' et arrêtés associés (JO du 27 août 2026)",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
  {
    name: "ADEME : liste des pompes à chaleur agréées pour le Coup de pouce chauffage",
    url: "https://www.ademe.fr",
    date: "2026",
  },
  {
    name: "Service-Public.fr : éco-prêt à taux zéro et TVA à taux réduit pour les travaux de rénovation énergétique",
    url: "https://www.service-public.fr",
    date: "2026",
  },
]
