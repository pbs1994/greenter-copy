// =============================================================================
// Données article : Installation panneau solaire avec batterie (2026)
// Angle : ajouter un stockage domestique à une installation photovoltaïque
// depuis la baisse du rachat du surplus (juin 2026) : fonctionnement (couplage
// DC / AC), choix de la capacité, prix posé, rentabilité réelle, étapes de
// pose et emplacement, fonction secours, alternatives (pilotage, batterie
// virtuelle). Chiffres cohérents avec avantages / cout-installation.
// Sources : photovoltaique.info (Hespul), PVGIS (JRC), guide UTE C 15-712-3,
// NF C 15-100, CRE, arrêté du 1er juin 2026, fiches fabricants LFP
// Date de recherche : novembre 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Installation panneau solaire avec batterie : prix, capacité et rentabilité en 2026",
  subtitle:
    "Installation panneau solaire avec batterie : fonctionnement, capacité à choisir, prix posé, rentabilité depuis la baisse du rachat, emplacement et fonction secours.",
  slug: "installation-panneau-solaire-avec-batterie",
  date: "4 novembre 2026",
  dateISO: "2026-11-04",
  readingTime: 15,
  author: "Greenter",
}

// Capacité selon le profil
export const CAPACITE_TABLE = {
  columns: [
    { header: "Profil du foyer", key: "profil" },
    { header: "Installation", key: "installation" },
    { header: "Batterie conseillée", key: "batterie", highlight: true },
    { header: "Autoconsommation sans batterie", key: "sans" },
    { header: "Avec batterie", key: "avec" },
  ],
  rows: [
    { profil: "Couple absent la journée, chauffage gaz", installation: "3 kWc", batterie: "3 à 5 kWh", sans: "35 à 40 %", avec: "60 à 70 %" },
    { profil: "Famille de 4, ballon électrique piloté", installation: "4,5 kWc", batterie: "5 kWh", sans: "50 à 60 %", avec: "70 à 80 %" },
    { profil: "Maison avec pompe à chaleur", installation: "6 kWc", batterie: "7 à 10 kWh", sans: "55 à 65 %", avec: "75 à 85 %" },
    { profil: "PAC et voiture électrique rechargée le soir", installation: "6 à 9 kWc", batterie: "10 à 15 kWh", sans: "45 à 60 %", avec: "75 à 85 %" },
  ],
  caption:
    "Ordres de grandeur pour une maison en Île-de-France, toiture sud à sud-ouest, environ 1 100 kWh produits par kWc et par an. La capacité indiquée est la capacité utile. Le taux réel dépend de vos horaires et de la saison : en hiver, la production est souvent trop faible pour charger complètement la batterie.",
}

// Prix
export const PRIX_TABLE = {
  columns: [
    { header: "Configuration", key: "config" },
    { header: "Batterie seule, posée", key: "batterie" },
    { header: "Installation complète TTC", key: "total", highlight: true },
    { header: "Gain annuel estimé", key: "gain" },
  ],
  rows: [
    { config: "3 kWc + 5 kWh", batterie: "3 500 à 5 500 €", total: "10 500 à 15 000 €", gain: "≈ 450 à 550 €" },
    { config: "6 kWc + 10 kWh", batterie: "6 000 à 9 000 €", total: "17 000 à 24 000 €", gain: "≈ 980 à 1 100 €" },
    { config: "9 kWc + 15 kWh", batterie: "9 000 à 12 500 €", total: "24 500 à 32 500 €", gain: "≈ 1 400 à 1 600 €" },
    { config: "Batterie ajoutée à une installation existante", batterie: "4 000 à 9 500 €", total: "selon capacité", gain: "+ 180 à 300 € par an" },
  ],
  caption:
    "Fourchettes 2026 pour des batteries lithium fer phosphate (LFP), onduleur hybride ou onduleur de batterie compris, pose par un installateur RGE QualiPV. Gains calculés avec un kWh du réseau à 0,195 € TTC et un surplus racheté 1,1 c€, sans hausse du prix de l'électricité. L'ajout sur une installation existante coûte plus cher en raison du couplage AC.",
}

// Étapes
export const INSTALLATION_STEPS = [
  {
    title: "Analyser la courbe de consommation",
    detail:
      "L'installateur récupère vos données horaires Linky pour mesurer ce que vous consommez le soir et la nuit. C'est cette consommation, et non la taille du toit, qui fixe la capacité utile de la batterie.",
  },
  {
    title: "Choisir l'architecture",
    detail:
      "Pour une installation neuve, un onduleur hybride relie panneaux et batterie en courant continu. Pour ajouter une batterie à une installation existante, notamment avec des micro-onduleurs, on passe par un couplage en courant alternatif.",
  },
  {
    title: "Valider l'emplacement",
    detail:
      "Garage, cellier ou buanderie : un local sec, ventilé, à l'abri du gel et des fortes chaleurs, idéalement entre 5 et 30 °C. Le mur ou le sol doit supporter 50 à 150 kg selon la capacité.",
  },
  {
    title: "Poser les panneaux et le stockage",
    detail:
      "Les panneaux sont posés sur la toiture, puis l'onduleur et la batterie sont fixés au plus près du tableau électrique. Le câblage suit la norme NF C 15-100 et le guide UTE C 15-712-3 dédié aux installations avec stockage.",
  },
  {
    title: "Paramétrer et contrôler",
    detail:
      "Le technicien configure les seuils de charge, la réserve pour le secours éventuel et l'application de suivi. Le Consuel contrôle l'ensemble avant la mise en service par Enedis.",
  },
]

// FAQ
export const FAQ_ITEMS = [
  {
    question: "Quel est le prix d'une installation panneau solaire avec batterie ?",
    answer:
      "En 2026, comptez 10 500 à 15 000 € TTC pour 3 kWc avec une batterie de 5 kWh, et 17 000 à 24 000 € pour 6 kWc avec 10 kWh, pose et démarches comprises. La batterie seule représente 3 500 à 5 500 € pour 5 kWh et 6 000 à 9 000 € pour 10 kWh, onduleur compris.",
  },
  {
    question: "Quelle capacité de batterie pour une maison ?",
    answer:
      "La capacité utile doit correspondre à votre consommation du soir et de la nuit, généralement 5 à 10 kWh pour une maison. Un repère simple est de 1 à 1,5 kWh de stockage par kWc installé. Une batterie plus grande que le surplus quotidien de vos panneaux restera en partie vide.",
  },
  {
    question: "Une batterie solaire est-elle rentable en 2026 ?",
    answer:
      "Elle devient plus intéressante depuis que le surplus n'est plus racheté qu'environ 1,1 centime le kWh. Elle augmente le gain annuel de 180 à 300 €, mais coûte plusieurs milliers d'euros. Pour une installation de 6 kWc, le retour sur investissement passe d'environ 13 à 15 ans sans batterie à 16 à 18 ans avec. Elle se justifie surtout quand la consommation du soir est forte.",
  },
  {
    question: "Peut-on ajouter une batterie à une installation solaire existante ?",
    answer:
      "Oui. Avec un onduleur hybride déjà en place, il suffit souvent de raccorder une batterie compatible. Avec un onduleur classique ou des micro-onduleurs, on installe une batterie couplée en courant alternatif, avec son propre onduleur. Cette solution coûte un peu plus cher et le Consuel doit être refait.",
  },
  {
    question: "La batterie fonctionne-t-elle pendant une coupure de courant ?",
    answer:
      "Pas automatiquement. Par sécurité, une installation raccordée au réseau se coupe en cas de panne. Pour garder du courant, il faut un onduleur doté d'une fonction de secours et un coffret qui isole la maison du réseau. Le secours alimente en général une partie des circuits, comme le réfrigérateur, l'éclairage et la box.",
  },
  {
    question: "Combien de temps dure une batterie solaire ?",
    answer:
      "Une batterie lithium fer phosphate supporte 6 000 à 10 000 cycles de charge, soit 12 à 20 ans d'usage domestique. Elle est généralement garantie 10 ans avec au moins 60 à 70 % de capacité restante. Les panneaux, eux, durent 30 ans et plus, il faut donc prévoir un remplacement de la batterie au cours de la vie de l'installation.",
  },
  {
    question: "Où installer la batterie dans la maison ?",
    answer:
      "Dans un local sec et ventilé, à l'abri du gel et des fortes chaleurs : garage, cellier, buanderie ou sous-sol sain. Évitez les chambres, les combles surchauffés l'été et les pièces humides. La batterie doit rester accessible pour la maintenance et proche du tableau électrique.",
  },
  {
    question: "Avec une batterie, peut-on se passer du réseau électrique ?",
    answer:
      "Dans une maison en Île-de-France, ce n'est pas réaliste. En décembre, une installation de 6 kWc produit cinq à six fois moins qu'en juin. Il faudrait une batterie et une puissance démesurées pour passer l'hiver. Une batterie domestique couvre surtout les soirées d'avril à octobre et réduit fortement les achats au réseau, sans les supprimer.",
  },
]

// Sources
export const SOURCES = [
  {
    name: "Hespul : photovoltaique.info, autoconsommation avec stockage et raccordement des installations avec batterie",
    url: "https://www.photovoltaique.info",
    date: "2026",
  },
  {
    name: "UTE C 15-712-3 : installations photovoltaïques avec dispositif de stockage raccordées au réseau",
    url: "https://www.boutique.afnor.org",
    date: "2019",
  },
  {
    name: "Arrêté du 1er juin 2026 fixant les conditions d'achat de l'électricité produite par les installations photovoltaïques sur bâtiment (JO du 4 juin 2026)",
    url: "https://www.legifrance.gouv.fr",
    date: "2026",
  },
  {
    name: "Commission européenne (JRC) : PVGIS, production photovoltaïque mensuelle",
    url: "https://re.jrc.ec.europa.eu/pvg_tools/fr/",
    date: "2026",
  },
  {
    name: "Commission de régulation de l'énergie : tarifs réglementés de vente de l'électricité",
    url: "https://www.cre.fr",
    date: "2026",
  },
]
