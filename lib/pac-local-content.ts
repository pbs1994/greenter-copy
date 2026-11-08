// =============================================================================
// Contenu local des pages /services/pompe-a-chaleur/[ville]
// =============================================================================
// Ce fichier porte ce qui rend une page ville réellement différente des autres :
// le type d'habitat de la commune, les contraintes d'urbanisme à connaître avant
// de poser une unité extérieure, des conseils pratiques propres au secteur et,
// surtout, les chantiers réalisés sur place.
//
// Règles :
// - uniquement des faits vérifiables (protection monument historique, desserte,
//   type de lotissement). En cas de doute, renvoyer vers l'Atlas des patrimoines
//   ou le service urbanisme plutôt qu'affirmer.
// - `realisations` : UNIQUEMENT des chantiers Greenter réels (photo, modèle,
//   quartier). Ne jamais inventer. Laisser vide tant qu'il n'y en a pas.
// =============================================================================

export interface PacRealisation {
  /** Ex. "Remplacement chaudière gaz par PAC air-eau 11 kW" */
  titre: string
  /** Quartier ou rue (sans numéro) */
  lieu: string
  /** Ex. "Maison de 1982, 110 m², radiateurs acier" */
  logement: string
  /** Modèle installé */
  equipement: string
  /** Mois et année, ex. "octobre 2026" */
  date: string
  /** Chemin d'une photo du chantier dans /public, optionnel */
  image?: string
  imageAlt?: string
}

export interface PacLocalContent {
  /** Titre de la section (contient le nom de la ville) */
  titre: string
  /** Le bâti de la commune et ce qu'il implique pour la PAC */
  habitat: string
  /** Urbanisme, voisinage, règles à connaître avant la pose */
  urbanisme: string
  /** 2 à 4 points pratiques propres au secteur */
  conseils: { titre: string; texte: string }[]
  realisations: PacRealisation[]
}

export const PAC_LOCAL_CONTENT: Record<string, PacLocalContent> = {
  "ozoir-la-ferriere": {
    titre: "Pompe à chaleur à Ozoir-la-Ferrière : notre commune",
    habitat:
      "Notre agence est installée à Ozoir-la-Ferrière, et une bonne partie de nos chantiers se trouve à quelques rues de là. Le parc est très largement pavillonnaire : maisons des années 1970 à 1990 de 90 à 130 m², souvent sur sous-sol, avec une chaudière gaz murale ou au sol raccordée à des radiateurs en acier. Ce profil se prête bien à une PAC air-eau basse ou moyenne température, à condition de vérifier que les radiateurs suffisent à 50 ou 55 °C lors des matinées froides.",
    urbanisme:
      "La commune est bordée par les forêts d'Armainvilliers et Notre-Dame. Les lotissements sont aérés, ce qui facilite le choix d'un emplacement pour l'unité extérieure, loin des chambres voisines. Si le groupe est visible depuis la rue, le PLU peut imposer une déclaration préalable : nous vérifions ce point avec vous avant de commander le matériel.",
    conseils: [
      {
        titre: "Visite technique rapide",
        texte:
          "Nos techniciens partent de l'agence d'Ozoir : la visite technique se cale facilement, et l'entretien annuel de votre PAC est assuré par la même équipe que l'installation.",
      },
      {
        titre: "Le sous-sol, un atout",
        texte:
          "Dans les maisons sur sous-sol, le module hydraulique et le ballon d'eau chaude trouvent leur place à l'emplacement de l'ancienne chaudière. Les liaisons vers l'unité extérieure restent courtes, ce qui limite le coût de pose.",
      },
    ],
    realisations: [],
  },

  "roissy-en-brie": {
    titre: "Installer une pompe à chaleur à Roissy-en-Brie",
    habitat:
      "Roissy-en-Brie s'est surtout construite par grands lotissements dans les années 1970 et 1980. Les maisons se ressemblent souvent d'une rue à l'autre : 90 à 120 m², sous-sol ou garage accolé, chaudière gaz d'origine ou remplacée une fois, radiateurs acier. Ces chaudières ont aujourd'hui plus de 25 ans pour beaucoup, et c'est souvent une panne qui déclenche le projet. Une PAC air-eau de 8 à 11 kW couvre la plupart de ces pavillons une fois les combles isolés.",
    urbanisme:
      "Dans les lotissements, les maisons sont mitoyennes ou proches les unes des autres. L'emplacement de l'unité extérieure compte donc davantage que la puissance : le Code de la santé publique limite l'émergence sonore chez le voisin à 5 dB(A) le jour et 3 dB(A) la nuit. Nous privilégions le jardin arrière, à distance des fenêtres de chambre, avec des plots antivibratiles. Si votre résidence a un règlement de lotissement ou une association syndicale, mieux vaut le consulter avant la pose d'un groupe en façade.",
    conseils: [
      {
        titre: "Proche de l'agence",
        texte:
          "Roissy-en-Brie est limitrophe d'Ozoir-la-Ferrière, à quelques minutes de notre agence. La même équipe assure la visite technique, la pose et l'entretien annuel.",
      },
      {
        titre: "Vérifier les radiateurs",
        texte:
          "Les radiateurs d'origine ont parfois été dimensionnés juste pour une chaudière à 70 ou 80 °C. Nous calculons la température d'eau nécessaire pièce par pièce. Un ou deux radiateurs à remplacer coûtent bien moins cher qu'une PAC surdimensionnée.",
      },
    ],
    realisations: [],
  },

  "lesigny": {
    titre: "Pompe à chaleur à Lésigny : résidences et village",
    habitat:
      "Lésigny a une particularité rare en Île-de-France : une large part de ses maisons appartient aux résidences construites à partir de 1968 par le promoteur américain William Levitt, le Parc de Lésigny (environ 600 maisons) et L'Orée de Lésigny (276 maisons jumelées). Ces ensembles sont distincts du village ancien. Les plans y sont répétés d'une maison à l'autre, ce qui permet de dimensionner une PAC avec précision à partir de modèles connus, mais les isolations ont évolué de façon très différente selon les propriétaires successifs.",
    urbanisme:
      "Les résidences de type Levitt ont généralement un cahier des charges et une association syndicale qui encadrent l'aspect extérieur des maisons. Avant de poser une unité extérieure visible depuis la rue, il faut le consulter, en plus du PLU. Dans le village, l'église Saint-Yon est protégée au titre des monuments historiques depuis 1908 : dans un rayon de 500 mètres, les travaux visibles depuis le monument passent par l'avis de l'Architecte des Bâtiments de France.",
    conseils: [
      {
        titre: "Maisons jumelées",
        texte:
          "Dans les maisons jumelées, l'unité extérieure ne doit pas être fixée sur le mur mitoyen ni orientée vers le jardin voisin. Un support au sol découplé, côté jardin, est la solution la plus sûre pour le bruit.",
      },
      {
        titre: "Isoler d'abord si le DPE est mauvais",
        texte:
          "Beaucoup de maisons des années 1970 n'ont jamais eu de reprise d'isolation des combles. Isoler avant de poser la PAC permet souvent de descendre d'une taille de machine et de travailler à plus basse température.",
      },
    ],
    realisations: [],
  },

  "gretz-armainvilliers": {
    titre: "Installer une pompe à chaleur à Gretz-Armainvilliers",
    habitat:
      "Gretz-Armainvilliers mêle un bourg ancien autour de la gare RER E et des extensions pavillonnaires des années 1960 à 1990, en lisière de la forêt d'Armainvilliers. Le fioul y reste plus présent que dans les communes voisines, surtout dans les maisons les plus anciennes, aux murs en meulière ou en moellons. Ces logements sont souvent équipés de radiateurs en fonte de grand volume, compatibles avec une PAC air-eau haute température.",
    urbanisme:
      "Le domaine du château d'Armainvilliers, ancienne propriété des Rothschild, s'étend sur Gretz-Armainvilliers et Tournan-en-Brie. Pour une maison du centre ancien, il est utile de consulter l'Atlas des patrimoines afin de savoir si l'adresse se trouve dans un périmètre protégé. Hors de ces secteurs, une unité extérieure posée au sol dans le jardin ne pose en général pas de difficulté.",
    conseils: [
      {
        titre: "Sortir du fioul",
        texte:
          "Depuis le 1er juillet 2022, une chaudière fioul neuve ne peut plus être installée. Quand la vôtre arrive en fin de vie, la PAC air-eau reprend les radiateurs existants, et la cuve peut être neutralisée ou retirée le même jour.",
      },
      {
        titre: "Hivers un peu plus frais",
        texte:
          "En lisière de forêt, les matinées d'hiver sont un peu plus froides qu'en petite couronne. Nous dimensionnons la PAC sur la température de base du secteur, pour éviter que l'appoint électrique ne prenne le relais trop souvent.",
      },
    ],
    realisations: [],
  },

  "tournan-en-brie": {
    titre: "Pompe à chaleur à Tournan-en-Brie : centre ancien et pavillons",
    habitat:
      "Tournan-en-Brie, terminus de la branche RER E, a deux types de logements très différents. Le centre ancien compte des maisons de ville en pierre, parfois sans isolation des murs, où le fioul reste fréquent. Les extensions pavillonnaires des années 1980 à 2000, en périphérie, sont mieux isolées et souvent chauffées au gaz ou à l'électricité. On ne choisit pas la même PAC dans les deux cas.",
    urbanisme:
      "Dans le centre-bourg, les façades donnent souvent directement sur la rue et les cours sont petites. L'unité extérieure doit alors être placée en cour arrière ou sur une terrasse, et une déclaration préalable peut être exigée si elle est visible depuis l'espace public. Certains hameaux éloignés du centre ne sont pas raccordés au gaz : pour eux, la PAC est l'une des seules alternatives au fioul ou à l'électrique direct.",
    conseils: [
      {
        titre: "Maison ancienne : haute température",
        texte:
          "Pour une maison en pierre avec radiateurs en fonte, une PAC air-eau haute température (jusqu'à 65 °C ou plus) évite de remplacer les émetteurs. Elle coûte plus cher à l'achat, mais beaucoup moins qu'un changement complet des radiateurs.",
      },
      {
        titre: "Pavillon récent : basse température",
        texte:
          "Dans un pavillon des années 1990 ou 2000 avec plancher chauffant ou radiateurs larges, une PAC basse température suffit et offre le meilleur rendement saisonnier.",
      },
    ],
    realisations: [],
  },

  "brie-comte-robert": {
    titre: "Installer une pompe à chaleur à Brie-Comte-Robert",
    habitat:
      "Brie-Comte-Robert combine un centre médiéval et de vastes quartiers pavillonnaires des années 1980 et 1990, complétés par des programmes plus récents. Les maisons des années 1980 sont celles où une PAC rapporte le plus : chaudière gaz en fin de vie, isolation d'origine, consommation encore élevée. Dans les logements d'après 2005, le gain existe aussi mais le retour sur investissement est plus long.",
    urbanisme:
      "Les ruines du vieux château sont classées monument historique depuis 1925, tout comme l'église Saint-Étienne. Dans un rayon de 500 mètres autour de ces monuments, l'Architecte des Bâtiments de France donne son avis sur les travaux visibles, dont une unité extérieure en façade. Nous proposons alors un emplacement discret, côté jardin, et un groupe de teinte neutre, ce qui facilite l'accord.",
    conseils: [
      {
        titre: "Anticiper l'avis de l'ABF",
        texte:
          "Pour une maison du centre, comptez un à deux mois de plus pour la déclaration préalable avec avis de l'ABF. Nous préparons le dossier (photos, plan de situation, fiche technique du groupe) avec le devis.",
      },
      {
        titre: "Lotissements des années 1980",
        texte:
          "Dans ces quartiers, l'ancienne chaufferie est souvent au garage. Le module intérieur et le ballon s'y installent sans perte de place dans la maison.",
      },
    ],
    realisations: [],
  },

  "chevry-cossigny": {
    titre: "Pompe à chaleur à Chevry-Cossigny : maisons sur grands terrains",
    habitat:
      "Chevry-Cossigny est un village de la Brie où les maisons individuelles dominent, souvent sur de grands terrains. Une partie du bâti n'est pas raccordée au gaz, ce qui explique une part de chauffage au fioul nettement plus élevée que la moyenne francilienne. C'est typiquement le secteur où une PAC air-eau remplace une chaudière fioul sur un réseau de radiateurs existant.",
    urbanisme:
      "Les terrains spacieux simplifient la pose : l'unité extérieure peut être placée loin des limites de propriété, ce qui règle la question du bruit. Pour une maison ancienne du cœur de village, nous vérifions avec vous le PLU et, le cas échéant, la présence d'un périmètre protégé sur l'Atlas des patrimoines.",
    conseils: [
      {
        titre: "Remplacer le fioul",
        texte:
          "La PAC air-eau se raccorde au circuit de chauffage existant. Nous prévoyons le désembouage du réseau, souvent encrassé après des décennies de fioul, et la neutralisation de la cuve.",
      },
      {
        titre: "Puissance électrique",
        texte:
          "Dans une maison chauffée au fioul, l'abonnement électrique est souvent de 6 ou 9 kVA. Une PAC de 11 à 14 kW peut demander de passer à 12 kVA : nous le vérifions avant la pose.",
      },
    ],
    realisations: [],
  },
}

export function getPacLocalContent(slug: string): PacLocalContent | null {
  return PAC_LOCAL_CONTENT[slug] ?? null
}
