// =============================================================================
// Données article : Rendement pompe à chaleur — COP, SCOP et facteurs clés 2026
// Sources : ADEME, CSTB, AFPAC, Eurovent, france-renov.gouv.fr
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Rendement pompe à chaleur : 8 facteurs clés pour un COP optimal en 2026",
  subtitle:
    "Qu'est-ce que le COP et le SCOP d'une pompe à chaleur ? Comment maximiser le rendement réel de votre PAC ? Découvrez les 8 leviers concrets pour optimiser l'efficacité énergétique de votre installation.",
  slug: "rendement-pompe-a-chaleur",
  date: "25 juin 2026",
  dateISO: "2026-06-25",
  readingTime: 14,
  author: "Greenter",
}

export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que le COP d'une pompe à chaleur ?",
    answer:
      "Le COP (Coefficient de Performance) est le rapport entre l'énergie thermique produite et l'énergie électrique consommée par la pompe à chaleur à un instant précis. Un COP de 3,5 signifie que pour 1 kWh d'électricité consommé, la PAC produit 3,5 kWh de chaleur. Ce chiffre est mesuré dans des conditions de laboratoire standardisées — généralement A7/W35 (air extérieur à +7 °C, eau de départ à 35 °C). En conditions réelles, le COP varie constamment selon la température extérieure et la température de l'eau produite.",
  },
  {
    question: "Quelle est la différence entre COP et SCOP ?",
    answer:
      "Le COP est une mesure instantanée du rendement dans des conditions précises de laboratoire. Le SCOP (Seasonal COP, ou coefficient de performance saisonnier) est la moyenne annuelle du rendement sur toute une saison de chauffe, intégrant les variations de température extérieure. Le SCOP est bien plus représentatif des économies réelles : en France, un bon SCOP pour une PAC air-eau se situe entre 3,0 et 4,5 selon la zone climatique et le type d'émetteurs. C'est le SCOP qu'il faut comparer pour estimer la rentabilité d'un investissement.",
  },
  {
    question: "Quel est le rendement moyen d'une pompe à chaleur air-eau ?",
    answer:
      "En conditions réelles d'utilisation en France, le rendement (SCOP) d'une pompe à chaleur air-eau se situe entre 2,8 et 4,2. Les modèles récents avec compresseur Inverter atteignent un SCOP de 4,0 à 5,0 dans des conditions optimales : zone climatique douce, logement bien isolé, émetteurs basse température (plancher chauffant ou radiateurs basse température). Les PAC géothermiques affichent des SCOP supérieurs, entre 4,0 et 5,5, grâce à la stabilité de la température du sol.",
  },
  {
    question: "Pourquoi le rendement d'une pompe à chaleur diminue-t-il en hiver ?",
    answer:
      "Le rendement d'une PAC air-eau chute mécaniquement quand la température extérieure baisse, car l'écart thermique à compenser entre la source froide (air extérieur) et la source chaude (eau du circuit) augmente. À -5 °C, une PAC qui affiche COP 4,0 à +7 °C descend typiquement à COP 2,5–2,8. À -15 °C, certains modèles ne maintiennent plus qu'un COP de 1,5 à 2,0. C'est pourquoi le dimensionnement correct et le choix d'un modèle adapté à la zone climatique sont des paramètres critiques.",
  },
  {
    question: "Comment améliorer le rendement de ma pompe à chaleur existante ?",
    answer:
      "Plusieurs leviers sans remplacement de l'appareil : 1) Baisser la température de départ d'eau si vous disposez d'un plancher chauffant ou de radiateurs basse température — chaque degré de moins gagne environ 2,5 % de COP. 2) Faire réviser annuellement la PAC — des échangeurs encrassés dégradent le rendement de 10 à 15 %. 3) Vérifier que l'unité extérieure n'est pas obstruée (végétation trop proche, neige accumulée, murs en angle). 4) Améliorer l'isolation du logement pour réduire les déperditions. 5) Ajuster la courbe de chauffe pour éviter les cycles on/off fréquents.",
  },
  {
    question: "Quelle différence de rendement entre une PAC Inverter et une PAC standard ?",
    answer:
      "Un compresseur Inverter module sa vitesse en continu pour s'adapter précisément aux besoins du logement, contrairement au compresseur standard tout-ou-rien. Cette modulation permet un fonctionnement stabilisé, sans cycles on/off répétés, ce qui améliore le SCOP réel de 20 à 30 % par rapport à un modèle standard de même puissance nominale. Sur une période de 10 ans, la différence de consommation peut représenter 1 500 à 3 000 € d'économies selon la taille du logement et le tarif de l'électricité.",
  },
  {
    question: "Le rendement d'une PAC est-il meilleur avec un plancher chauffant ?",
    answer:
      "Oui, de façon significative. Un plancher chauffant hydraulique fonctionne à 25–35 °C, contre 45–55 °C pour des radiateurs basse température et 65–80 °C pour des radiateurs haute température classiques. Chaque augmentation de 5 °C de la température de départ d'eau dégrade le COP d'environ 10–15 %. Une PAC couplée à un plancher chauffant peut atteindre un SCOP de 4,0 à 5,0, tandis que la même PAC alimentant des radiateurs haute température ne dépasse souvent pas 2,0 à 2,5 de SCOP.",
  },
  {
    question: "L'amélioration de l'isolation augmente-t-elle le rendement d'une PAC ?",
    answer:
      "Oui, indirectement mais de façon très efficace. Une meilleure isolation réduit les déperditions thermiques, ce qui permet à la PAC de fonctionner à une température de départ d'eau plus basse, d'éviter les cycles courts, et de réduire le recours au mode appoint électrique lors des pics de froid. Pour une maison de 100 m² en zone H2, passer de DPE E à DPE C peut réduire la consommation globale de 30 à 40 % par an et améliorer le SCOP effectif de 0,5 à 1,0 point.",
  },
]

export const SOURCES = [
  {
    name: "ADEME — Guide pratique : pompes à chaleur, performances et rendements (2025)",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "CSTB — Évaluation des performances réelles des PAC résidentielles en France (2024)",
    url: "https://www.cstb.fr",
    date: "2024",
  },
  {
    name: "AFPAC — Observatoire des marchés et performances PAC 2025",
    url: "https://www.afpac.org",
    date: "2025",
  },
  {
    name: "Eurovent — Certification et classement des PAC air-eau (classe A+++ ErP)",
    url: "https://www.eurovent-certification.com",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — Critères de performance PAC pour MaPrimeRénov' 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "UFC-Que Choisir — Comparatif rendements réels PAC air-eau 2025",
    url: "https://www.quechoisir.org",
    date: "2025",
  },
]
