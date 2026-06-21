// =============================================================================
// Données article : Pompe à chaleur — 10 pièges à éviter
// Sources : ademe.fr, france-renov.gouv.fr, anah.gouv.fr, qualipac.fr,
//           capeb.fr, cstb.fr, que-choisir.org
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Pompe à chaleur : 10 pièges à éviter en 2026",
  subtitle:
    "Mauvais dimensionnement, artisan non-RGE, isolation insuffisante, emplacement bruyant, aides ratées... Découvrez les 10 erreurs les plus courantes à éviter avant d'installer une pompe à chaleur.",
  slug: "pompe-a-chaleur-piege-a-eviter",
  date: "21 juin 2026",
  dateISO: "2026-06-21",
  readingTime: 14,
  author: "Greenter",
}

export const FAQ_ITEMS = [
  {
    question: "Quelle est l'erreur numéro 1 lors de l'installation d'une pompe à chaleur ?",
    answer:
      "Le mauvais dimensionnement est l'erreur la plus fréquente et la plus coûteuse. Une PAC trop puissante s'arrête et redémarre constamment (fonctionnement en « on/off »), ce qui use prématurément le compresseur et consomme bien plus qu'une PAC correctement dimensionnée. Une PAC sous-dimensionnée ne peut pas couvrir les besoins du logement en hiver et oblige à utiliser un appoint électrique très énergivore. Le dimensionnement doit être réalisé par un professionnel à partir d'un calcul de déperditions thermiques (norme NF EN 12831), pas uniquement sur la surface en m².",
  },
  {
    question: "Peut-on installer une pompe à chaleur dans un logement mal isolé ?",
    answer:
      "Techniquement oui, mais c'est une erreur fréquente qui annule une grande partie des économies attendues. Une PAC air-eau est optimisée pour fonctionner à basse température (35–45 °C). Si le logement est mal isolé, la PAC doit monter en température pour compenser les pertes de chaleur, ce qui dégrade son COP et sa rentabilité. L'ordre idéal : isoler d'abord (combles, murs, plancher), puis installer la PAC. L'isolation améliore aussi le DPE, ce qui peut augmenter les aides MaPrimeRénov' disponibles.",
  },
  {
    question: "Pourquoi faut-il absolument un artisan RGE pour installer une PAC ?",
    answer:
      "La certification RGE (Reconnu Garant de l'Environnement) est obligatoire pour déclencher MaPrimeRénov' et le Coup de pouce CEE. Sans artisan RGE, vous perdez l'intégralité de ces aides, qui peuvent représenter 2 000 à 6 300 € selon votre revenu. De plus, l'installation d'une PAC nécessite l'attestation d'aptitude à la manipulation des fluides frigorigènes (arrêté du 22 juin 2020), obligatoirement détenue par le technicien. Un installateur non certifié ne peut pas légalement manipuler ces fluides.",
  },
  {
    question: "Où doit-on installer l'unité extérieure d'une PAC air-eau ?",
    answer:
      "L'unité extérieure doit être posée sur un support anti-vibratoire solide, à au moins 1 m des fenêtres et ouvertures, et idéalement orientée de façon à ne pas souffler directement sur une zone de passage ou une fenêtre du voisinage. La réglementation impose un niveau sonore maximal de 5 dB(A) au-dessus du bruit de fond ambiant la nuit. En pratique, respectez une distance d'au moins 3 à 5 m des fenêtres du voisinage. Un mauvais emplacement peut entraîner des conflits avec les voisins, voire une mise en demeure par la mairie.",
  },
  {
    question: "Une pompe à chaleur est-elle compatible avec des radiateurs existants ?",
    answer:
      "Pas toujours, et c'est un piège fréquent. Les radiateurs en fonte ou en acier classiques sont conçus pour fonctionner à 70–90 °C. Une PAC air-eau standard produit de l'eau à 35–55 °C : les radiateurs haute température doivent alors être remplacés ou surdimensionnés pour compenser. Le plancher chauffant (25–35 °C) et les radiateurs basse température sont en revanche parfaitement compatibles avec une PAC. Avant toute installation, un bilan de compatibilité émetteurs-PAC doit être réalisé.",
  },
  {
    question: "L'entretien d'une pompe à chaleur est-il obligatoire ?",
    answer:
      "Oui. La réglementation française impose un entretien annuel pour toute PAC dont la puissance dépasse 4 kW (décret du 9 septembre 2009, modifié). Cet entretien, réalisé par un professionnel certifié, comprend la vérification du circuit frigorifique, la mesure du COP réel, le nettoyage des échangeurs et des filtres, et la détection des fuites de fluide frigorigène. Négliger cet entretien peut invalider la garantie constructeur et entraîner une dégradation silencieuse des performances.",
  },
  {
    question: "Comment ne pas rater les aides pour une pompe à chaleur en 2026 ?",
    answer:
      "Les trois erreurs classiques : 1) Signer le devis avant d'avoir obtenu l'accord de principe MaPrimeRénov' (les travaux commencés avant la date de dépôt du dossier ne sont pas éligibles). 2) Choisir un artisan non-RGE. 3) Ne pas vérifier que la PAC figure sur la liste des équipements éligibles (chaudières à condensation et PAC hybrides ont des règles spécifiques). En 2026, MaPrimeRénov' pour une PAC air-eau peut atteindre 6 300 € pour les ménages très modestes. Ne démarrez jamais les travaux sans avoir soumis le dossier.",
  },
  {
    question: "Pourquoi ma pompe à chaleur consomme-t-elle plus que prévu ?",
    answer:
      "Les causes les plus fréquentes : une isolation insuffisante du logement, un dimensionnement incorrect, une température de consigne trop élevée (chaque degré de plus = +7 % de consommation), un entretien négligé (échangeurs encrassés), une unité extérieure mal placée (zone sans circulation d'air, encombrée), ou une utilisation du mode « appoint électrique » qui se déclenche trop souvent. Dans certains cas, l'unité extérieure est obstruée par la végétation ou par la neige en hiver, ce qui dégrade le COP de 20 à 40 %.",
  },
]

export const SOURCES = [
  {
    name: "ADEME — Enquête « Pompes à chaleur : performances réelles en usage » 2025",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — MaPrimeRénov' PAC air-eau, barèmes 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
  {
    name: "Qualipac — Référentiel de qualité pour l'installation de pompes à chaleur",
    url: "https://www.qualipac.fr",
    date: "2025",
  },
  {
    name: "Arrêté du 22 juin 2020 — Attestation d'aptitude manipulation fluides frigorigènes",
    url: "https://www.legifrance.gouv.fr",
    date: "2020",
  },
  {
    name: "UFC-Que Choisir — Baromètre satisfaction pompes à chaleur 2025",
    url: "https://www.quechoisir.org",
    date: "2025",
  },
  {
    name: "CAPEB — Guide bonnes pratiques installation PAC résidentiel",
    url: "https://www.capeb.fr",
    date: "2025",
  },
]
