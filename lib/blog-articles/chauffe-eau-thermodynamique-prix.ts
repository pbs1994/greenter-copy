// =============================================================================
// Données article : Chauffe-eau thermodynamique, prix (2026)
// Angle : prix posé selon le type (air ambiant, air extérieur gainé, split),
// fonctionnement, consommation et économies face au cumulus électrique,
// aides après la sortie de MaPrimeRénov' par geste (1er sept. 2026), choix de
// l'emplacement, couplage avec le solaire, alternative PAC double service.
// Sources : ADEME, NF EN 16147, décret et arrêtés du 25 août 2026 (JO du
// 27 août), fiche CEE BAR-TH-148, CRE
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Chauffe-eau thermodynamique : prix, consommation et aides en 2026",
  subtitle:
    "Prix d'un chauffe-eau thermodynamique posé en 2026 selon le modèle, économies face à un cumulus, aides restantes après septembre, emplacement et couplage solaire.",
  slug: "chauffe-eau-thermodynamique-prix",
  date: "8 novembre 2026",
  dateISO: "2026-11-08",
  readingTime: 12,
  author: "Greenter",
}

export const PRIX_TABLE = {
  columns: [
    { header: "Type de chauffe-eau thermodynamique", key: "type" },
    { header: "Capacité", key: "capacite" },
    { header: "Prix posé TTC", key: "prix", highlight: true },
    { header: "Pour qui", key: "pourqui" },
  ],
  rows: [
    { type: "Monobloc sur air ambiant", capacite: "150 à 200 L", prix: "2 300 à 3 500 €", pourqui: "Garage ou cellier non chauffé d'au moins 20 m³" },
    { type: "Monobloc sur air ambiant", capacite: "250 à 300 L", prix: "2 800 à 4 200 €", pourqui: "Famille de 4 à 5 personnes" },
    { type: "Monobloc sur air extérieur (gainé)", capacite: "200 à 270 L", prix: "3 200 à 4 800 €", pourqui: "Ballon dans une pièce chauffée ou trop petite" },
    { type: "Split (unité extérieure séparée)", capacite: "200 à 300 L", prix: "3 800 à 5 500 €", pourqui: "Pas de local adapté, ballon dans un placard" },
  ],
  caption:
    "Fourchettes 2026 en Île-de-France, matériel de marque, dépose de l'ancien cumulus, raccordements et mise en service compris, TVA à 5,5 %. Hors création d'une évacuation des condensats éloignée ou percements complexes.",
}

export const CONSO_TABLE = {
  columns: [
    { header: "Production d'eau chaude", key: "systeme" },
    { header: "Consommation électrique annuelle", key: "conso" },
    { header: "Coût annuel", key: "cout", highlight: true },
  ],
  rows: [
    { systeme: "Cumulus électrique 200 L", conso: "≈ 2 900 kWh", cout: "≈ 565 €" },
    { systeme: "Chauffe-eau thermodynamique (COP 2,8)", conso: "≈ 1 050 kWh", cout: "≈ 205 €" },
    { systeme: "Chauffe-eau thermodynamique piloté sur le surplus solaire", conso: "≈ 1 050 kWh, dont une partie autoproduite", cout: "≈ 100 à 150 €" },
  ],
  caption:
    "Famille de 4 personnes, environ 200 litres d'eau chaude à 40 °C par jour, électricité à 0,195 € TTC le kWh. En heures creuses, le cumulus coûte un peu moins cher, mais l'écart avec le thermodynamique reste de 250 à 300 € par an.",
}

export const FAQ_ITEMS = [
  {
    question: "Quel est le prix d'un chauffe-eau thermodynamique posé ?",
    answer:
      "Comptez 2 300 à 3 500 € pour un modèle de 200 litres sur air ambiant, 2 800 à 4 200 € pour 250 à 300 litres, 3 200 à 4 800 € pour un modèle gainé sur air extérieur et 3 800 à 5 500 € pour un modèle split. Ces prix incluent la pose, la dépose de l'ancien ballon et la TVA à 5,5 %.",
  },
  {
    question: "Le chauffe-eau thermodynamique est-il encore aidé par MaPrimeRénov' ?",
    answer:
      "Plus en geste isolé. Depuis le 1er septembre 2026, MaPrimeRénov' ne finance plus le chauffe-eau thermodynamique seul. Il reste éligible au sein d'une rénovation d'ampleur accompagnée. La prime CEE, temporairement bonifiée pour les opérations engagées avant le 1er janvier 2027, la TVA à 5,5 % et l'éco-PTZ restent accessibles.",
  },
  {
    question: "Combien économise un chauffe-eau thermodynamique ?",
    answer:
      "Il consomme environ trois fois moins qu'un cumulus électrique. Pour une famille de quatre personnes, l'économie se situe autour de 300 à 400 € par an, davantage s'il est piloté pour fonctionner avec le surplus de panneaux solaires. L'investissement se rembourse en six à dix ans.",
  },
  {
    question: "Où installer un chauffe-eau thermodynamique ?",
    answer:
      "Un modèle sur air ambiant demande une pièce non chauffée d'au moins 20 m³, comme un garage, un cellier ou une buanderie, où la température reste au-dessus de 5 °C environ. Il refroidit la pièce de quelques degrés. Sinon, un modèle gainé sur l'air extérieur ou un modèle split permet de placer le ballon ailleurs.",
  },
  {
    question: "Un chauffe-eau thermodynamique est-il bruyant ?",
    answer:
      "Le ventilateur et le compresseur produisent environ 40 à 50 dB(A) à proximité, l'équivalent d'un réfrigérateur ancien ou d'un lave-vaisselle. C'est sans gêne dans un garage, mais déconseillé à côté d'une chambre. Les modèles split déportent le bruit à l'extérieur.",
  },
  {
    question: "Faut-il un chauffe-eau thermodynamique si on installe une pompe à chaleur air-eau ?",
    answer:
      "Non, en général. La plupart des PAC air-eau produisent aussi l'eau chaude sanitaire, avec un ballon intégré ou séparé. Le chauffe-eau thermodynamique est surtout intéressant dans une maison chauffée autrement : convecteurs, poêle, PAC air-air ou chaudière qu'on garde encore quelques années.",
  },
  {
    question: "Quelle est la durée de vie d'un chauffe-eau thermodynamique ?",
    answer:
      "Environ 15 à 20 ans pour le ballon, un peu moins pour la partie pompe à chaleur. Le contrôle de l'anode, le nettoyage du filtre à air et la vérification de l'évacuation des condensats prolongent sa durée de vie. Un détartrage s'impose tous les deux à trois ans en eau calcaire, fréquente en Île-de-France.",
  },
  {
    question: "Un chauffe-eau thermodynamique fonctionne-t-il en heures creuses ?",
    answer:
      "Oui. La plupart des modèles se programment pour chauffer en heures creuses, comme un cumulus, ou aux heures de production solaire si la maison a des panneaux photovoltaïques. Comme il chauffe plus lentement qu'un ballon électrique, un ballon un peu plus grand ou une plage de fonctionnement plus longue évite de manquer d'eau chaude le soir.",
  },
]

export const SOURCES = [
  {
    name: "ADEME : le chauffe-eau thermodynamique, fonctionnement et performances",
    url: "https://agirpourlatransition.ademe.fr",
    date: "2026",
  },
  {
    name: "NF EN 16147 : essais et performances des pompes à chaleur pour l'eau chaude sanitaire",
    url: "https://www.boutique.afnor.org",
    date: "2017",
  },
  {
    name: "Décret et arrêté du 25 août 2026 modifiant MaPrimeRénov' (JO du 27 août 2026)",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
  {
    name: "Fiche d'opération standardisée CEE BAR-TH-148 : chauffe-eau thermodynamique à accumulation",
    url: "https://www.ecologie.gouv.fr",
    date: "2026",
  },
  {
    name: "Commission de régulation de l'énergie : tarifs réglementés de vente de l'électricité",
    url: "https://www.cre.fr",
    date: "2026",
  },
]
