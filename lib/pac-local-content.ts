// =============================================================================
// Contenu local des pages /services/pompe-a-chaleur/[ville]
// =============================================================================
// Ce fichier porte ce qui rend une page ville réellement différente des autres.
// Deux niveaux :
// - contenu simple (titre, habitat, urbanisme, conseils) : bloc ajouté au
//   gabarit commun ;
// - contenu riche (`rich`) : la page entière est construite à partir de ces
//   données (H1, meta, photo, chiffres INSEE, secteurs, projet type, FAQ) et
//   les blocs génériques du gabarit sont masqués.
//
// Règles :
// - chiffres : INSEE, recensement de la population 2023 (dossier complet de la
//   commune, tableaux LOG T3, T8, T10, T11M). Ne pas arrondir à la main.
// - faits locaux : Wikipédia / base Mérimée / Atlas des patrimoines. En cas de
//   doute, renvoyer vers l'Atlas des patrimoines plutôt qu'affirmer.
// - photos : Wikimedia Commons, auteur et licence affichés sous l'image.
// - `projet` : exemple de dimensionnement chiffré, présenté comme tel. Ce n'est
//   PAS une réalisation.
// - `realisations` : UNIQUEMENT des chantiers Greenter réels. Ne jamais inventer.
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

export interface PacRichContent {
  metaTitle: string
  metaDescription: string
  h1: string
  heroSubtitle: string
  photo: {
    src: string
    width: number
    height: number
    alt: string
    caption: string
    author: string
    licence: string
    licenceUrl: string
    sourceUrl: string
  }
  intro: string[]
  /** INSEE RP 2023 */
  insee: {
    logements: number
    pctMaisons: number
    pctProprietaires: number
    periodes: { label: string; pct: number }[]
    chauffage: { label: string; pct: number }[]
  }
  lectureChiffres: string[]
  secteurs: { nom: string; texte: string }[]
  quelPac: string[]
  projet: {
    titre: string
    contexte: string
    lignes: { poste: string; valeur: string }[]
    conclusion: string
  }
  faq: { question: string; answer: string }[]
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
  rich?: PacRichContent
}

const INSEE_PERIODES = ["Avant 1946", "1946 à 1970", "1971 à 1990", "1991 à 2005", "2006 à 2020"]
const periodes = (p: number[]) => INSEE_PERIODES.map((label, i) => ({ label, pct: p[i] }))
const chauffage = (gaz: number, elec: number, fioul: number, autres: number) => [
  { label: "Gaz de ville", pct: gaz },
  { label: "Électricité", pct: elec },
  { label: "Fioul", pct: fioul },
  { label: "Bois, citerne et autres", pct: autres },
]

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

  // ---------------------------------------------------------------------------
  "roissy-en-brie": {
    titre: "Installer une pompe à chaleur à Roissy-en-Brie",
    habitat:
      "Roissy-en-Brie est d'abord une ville des années 1970 et 1980 : 57 % des résidences principales ont été achevées entre 1971 et 1990, une proportion rare même en Seine-et-Marne. Les maisons de cette période, souvent sur sous-sol ou avec garage accolé, ont été livrées avec une chaudière gaz et des radiateurs en acier. Beaucoup de ces chaudières ont déjà été changées une fois, et la question se pose à nouveau.",
    urbanisme:
      "Dans les lotissements, les jardins sont mitoyens et les maisons proches. L'emplacement de l'unité extérieure compte davantage que la puissance : le Code de la santé publique limite l'émergence sonore chez le voisin à 5 dB(A) le jour et 3 dB(A) la nuit. Si votre résidence a un règlement de lotissement ou une association syndicale, consultez-le avant la pose d'un groupe visible depuis la rue.",
    conseils: [
      {
        titre: "Le gaz n'est pas forcément perdu",
        texte:
          "Si vous cuisinez au gaz, vous pouvez garder le raccordement. Sinon, la résiliation du contrat gaz après la pose de la PAC supprime un abonnement de 200 à 300 € par an, souvent oublié dans les calculs.",
      },
      {
        titre: "Collectifs et logements sociaux",
        texte:
          "Un logement sur cinq à Roissy-en-Brie est un HLM, en général chauffé par une chaudière collective. Une PAC individuelle n'y est pas possible : la décision relève du bailleur ou de la copropriété.",
      },
    ],
    realisations: [],
    rich: {
      metaTitle: "Pompe à chaleur Roissy-en-Brie (77680) : pavillons des années 1970-1980",
      metaDescription:
        "Pompe à chaleur à Roissy-en-Brie : 57 % des logements datent de 1971-1990 et 64 % sont chauffés au gaz. Projet type chiffré, aides 2026 et installateur RGE à 3 km.",
      h1: "Pompe à chaleur à Roissy-en-Brie : la relève des chaudières gaz des lotissements",
      heroSubtitle:
        "64 % des foyers de Roissy-en-Brie se chauffent encore au gaz, dans des maisons pour la plupart construites entre 1971 et 1990. Notre agence est à Ozoir, à 3 km.",
      photo: {
        src: "/images/villes/pompe-a-chaleur-roissy-en-brie.jpg",
        width: 1280,
        height: 960,
        alt: "Hôtel de ville de Roissy-en-Brie, ancien château aux façades blanches et brique avec une tour à toit conique, précédé d'un jardin à la française fleuri",
        caption: "L'hôtel de ville de Roissy-en-Brie occupe l'ancien château, remanié aux XVIIe et XIXe siècles.",
        author: "Service Communication",
        licence: "CC BY-SA 4.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:H%C3%B4tel_de_Ville_Roissy-en-Brie.jpg",
      },
      intro: [
        "Roissy-en-Brie compte un peu plus de 23 000 habitants et près de 8 900 logements, desservis par la gare de la ligne E du RER. La ville s'est surtout construite en une vingtaine d'années, entre le début des années 1970 et 1990, par grands programmes de maisons individuelles et de petits collectifs autour du centre ancien et de l'ancien château devenu hôtel de ville.",
        "Ce rythme de construction se lit aujourd'hui dans les chaufferies. Les maisons de cette génération ont été conçues pour une chaudière gaz. Les combles ont souvent été isolés depuis, les fenêtres changées, mais le réseau de radiateurs est resté le même. C'est exactement le cas où une pompe à chaleur air-eau donne le meilleur résultat : elle reprend le circuit existant, dans une maison dont les besoins ont baissé.",
      ],
      insee: {
        logements: 8940,
        pctMaisons: 52.5,
        pctProprietaires: 63.8,
        periodes: periodes([1.6, 11.0, 57.1, 18.0, 12.3]),
        chauffage: chauffage(64.4, 28.0, 2.0, 5.7),
      },
      lectureChiffres: [
        "Un peu plus d'un logement sur deux est une maison, et près des deux tiers des foyers sont propriétaires. Le gaz de ville domine nettement, avec 64 % des résidences principales, quand le fioul ne pèse plus que 2 %. À Roissy-en-Brie, la vraie question n'est donc pas la sortie du fioul, mais le remplacement d'une chaudière gaz de 20 à 30 ans.",
        "Les 28 % de logements chauffés à l'électricité sont pour beaucoup des appartements et des maisons des années 1980 équipées de convecteurs. Pour eux, une PAC air-air est souvent plus logique qu'une PAC air-eau, faute de circuit d'eau chaude.",
      ],
      secteurs: [
        {
          nom: "Les lotissements des années 1970-1980",
          texte:
            "Le cœur du parc : maisons de 90 à 120 m², sous-sol ou garage, chaudière gaz au sous-sol ou dans la cuisine. Cible idéale d'une PAC air-eau moyenne température avec ballon d'eau chaude au sous-sol.",
        },
        {
          nom: "Autour de la gare et du centre",
          texte:
            "Plus d'appartements et de maisons de ville. En copropriété, la pose d'une unité extérieure demande l'accord de l'assemblée générale. Une PAC air-air en balcon ou en terrasse reste parfois possible.",
        },
        {
          nom: "Les programmes postérieurs à 2006",
          texte:
            "12 % du parc, bien isolé et souvent déjà équipé d'une chaudière à condensation ou d'une PAC. Le gain d'un remplacement est plus faible : nous le disons franchement lors de la visite.",
        },
      ],
      quelPac: [
        "Pour une maison des années 1980 chauffée au gaz, nous proposons le plus souvent une PAC air-eau de 8 à 11 kW, réglée pour envoyer de l'eau à 50 ou 55 °C par grand froid. Le ballon d'eau chaude de 200 litres prend place au sous-sol, à côté du module intérieur.",
        "Avant de chiffrer, nous vérifions trois points : l'isolation des combles, la taille des radiateurs de l'étage, souvent un peu justes, et la puissance de l'abonnement électrique. Un passage de 9 à 12 kVA est fréquent et coûte quelques euros de plus par mois.",
      ],
      projet: {
        titre: "Projet type : pavillon de 1979 à Roissy-en-Brie",
        contexte:
          "Maison de 110 m² sur sous-sol, combles isolés en 2015, double vitrage, chaudière gaz non condensation de 1996 et radiateurs acier. Consommation de gaz : environ 15 000 kWh par an pour le chauffage et l'eau chaude. Foyer de 4 personnes, profil « modeste ».",
        lignes: [
          { poste: "PAC air-eau agréée 8 kW + ballon 200 L, posée", valeur: "≈ 13 000 € TTC" },
          { poste: "Désembouage du réseau et filtre magnétique", valeur: "≈ 500 €" },
          { poste: "MaPrimeRénov' (profil modeste)", valeur: "− 4 000 €" },
          { poste: "Prime CEE Coup de pouce (estimation)", valeur: "≈ − 3 500 €" },
          { poste: "Reste à charge", valeur: "≈ 6 000 €" },
          { poste: "Facture chauffage avant (gaz à 0,12 €/kWh)", valeur: "≈ 1 800 € / an" },
          { poste: "Facture après (SCOP 3,4, élec. à 0,195 €/kWh)", valeur: "≈ 750 € / an" },
        ],
        conclusion:
          "Économie d'environ 1 050 € par an, sans compter l'abonnement gaz s'il est résilié. Le reste à charge se rembourse en six ans environ. Exemple de dimensionnement indicatif : votre devis dépend de la visite technique.",
      },
      faq: [
        {
          question: "Combien coûte une pompe à chaleur pour un pavillon à Roissy-en-Brie ?",
          answer:
            "Pour une maison de 100 à 120 m² des années 1970-1980, comptez 12 000 à 15 000 € TTC pour une PAC air-eau de 8 à 11 kW avec ballon d'eau chaude. Après MaPrimeRénov' et la prime CEE, le reste à charge d'un ménage modeste se situe autour de 5 500 à 7 500 €.",
        },
        {
          question: "Mes radiateurs d'origine suffiront-ils avec une pompe à chaleur ?",
          answer:
            "Dans la plupart des maisons de Roissy-en-Brie, oui, à condition que les combles aient été isolés. Les radiateurs de l'étage sont parfois un peu petits. Nous les vérifions un par un lors de la visite, et il suffit souvent d'en remplacer un ou deux.",
        },
        {
          question: "Peut-on installer une pompe à chaleur dans un appartement à Roissy-en-Brie ?",
          answer:
            "Une PAC air-air est envisageable si la copropriété autorise la pose d'une unité extérieure sur un balcon ou une terrasse. Dans les résidences chauffées par une chaudière collective, le changement d'énergie se décide en assemblée générale ou par le bailleur.",
        },
        {
          question: "Quel délai pour une installation à Roissy-en-Brie ?",
          answer:
            "Notre agence est à Ozoir-la-Ferrière, à 3 km. La visite technique se cale en général dans la semaine. Une fois les dossiers d'aides déposés, la pose prend deux jours, avec une coupure de chauffage limitée à une journée.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  "lesigny": {
    titre: "Pompe à chaleur à Lésigny : résidences et Vieux Village",
    habitat:
      "Lésigny est l'une des communes les plus pavillonnaires du secteur : 87 % de maisons et 85 % de propriétaires. Près de 90 % des résidences principales ont été achevées entre 1946 et 1990, pour l'essentiel lors de la création des grandes résidences de la fin des années 1960 et des années 1970. Ces maisons de 50 ans ont un point commun : un réseau de chauffage central au gaz, toujours en place.",
    urbanisme:
      "Les résidences créées à partir de 1968 ont souvent un cahier des charges et une association syndicale qui encadrent l'aspect extérieur. Consultez-les, en plus du PLU, avant de poser une unité extérieure visible depuis la rue. Autour de l'église Saint-Yon, protégée au titre des monuments historiques, les travaux visibles dans un rayon de 500 mètres passent par l'avis de l'Architecte des Bâtiments de France.",
    conseils: [
      {
        titre: "Maisons jumelées de l'Orée",
        texte:
          "Dans une maison jumelée, l'unité extérieure ne doit jamais être fixée sur le mur mitoyen. Un support au sol découplé, côté jardin et loin de la limite, évite de transmettre les vibrations chez le voisin.",
      },
      {
        titre: "Isoler d'abord une maison de 1968",
        texte:
          "Une maison de la fin des années 1960 qui n'a jamais eu de reprise d'isolation consomme beaucoup. Isoler les combles avant la PAC permet souvent de descendre d'une taille de machine, soit 1 000 à 2 000 € d'économie à l'achat.",
      },
    ],
    realisations: [],
    rich: {
      metaTitle: "Pompe à chaleur Lésigny (77150) : maisons des résidences de 1968-1974",
      metaDescription:
        "Pompe à chaleur à Lésigny : 87 % de maisons, 64 % chauffées au gaz, des résidences créées à partir de 1968. Conseils par quartier, projet type chiffré et aides 2026.",
      h1: "Pompe à chaleur à Lésigny : remplacer le gaz dans les maisons des résidences",
      heroSubtitle:
        "Parc de Lésigny, l'Orée, la Grande Romaine, le Clos Vimont : des maisons de 50 ans chauffées au gaz, à 5 km de notre agence d'Ozoir-la-Ferrière.",
      photo: {
        src: "/images/villes/pompe-a-chaleur-lesigny.jpg",
        width: 1280,
        height: 960,
        alt: "Façade nord du château de Lésigny en brique et pierre, au bout d'une allée bordée de pelouses, sous un ciel d'hiver",
        caption: "Le château de Lésigny et son parc, à l'écart du Vieux Village.",
        author: "Mavia",
        licence: "CC BY-SA 4.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ch%C3%A2teau_de_L%C3%A9signy.JPG",
      },
      intro: [
        "Lésigny compte près de 7 000 habitants, mais son histoire résidentielle tient en quelques années. Autour du Vieux Village briard, la commune a vu naître à partir de 1968 une série de résidences, dont le Parc de Lésigny et l'Orée de Lésigny, conçues par le promoteur américain William Levitt, puis la Grande Romaine, le Clos Vimont et, en 1974, le Réveillon. Les Jardins de Saint-Marc et les quartiers de la Pomme Verte ou de Villarceau ont suivi à la fin des années 1980.",
        "Cette histoire explique la page que vous lisez. Plus de la moitié des maisons de Lésigny ont aujourd'hui entre 35 et 55 ans, et presque toutes sont chauffées par une chaudière gaz reliée à des radiateurs. La pompe à chaleur air-eau s'y installe dans de bonnes conditions, à condition de traiter d'abord l'isolation des maisons qui n'ont jamais été rénovées.",
      ],
      insee: {
        logements: 2911,
        pctMaisons: 87.0,
        pctProprietaires: 85.2,
        periodes: periodes([1.8, 32.6, 56.4, 6.3, 2.9]),
        chauffage: chauffage(63.9, 29.1, 0.6, 6.3),
      },
      lectureChiffres: [
        "Deux chiffres résument Lésigny. D'abord, un tiers des résidences principales a été achevé avant 1971, soit près de trois fois plus qu'à Roissy-en-Brie voisine : ce sont les maisons des premières résidences, aujourd'hui les plus énergivores. Ensuite, la construction s'est presque arrêtée après 1990, avec moins de 10 % du parc bâti depuis. Il y a peu de maisons neuves, beaucoup de maisons à rénover.",
        "Le fioul a pratiquement disparu (0,6 % des foyers). Le gaz chauffe deux logements sur trois, l'électricité près d'un sur trois. Avec 85 % de propriétaires occupants, souvent installés depuis une vingtaine d'années, les projets de rénovation sont fréquents, et beaucoup de foyers relèvent des profils intermédiaire ou supérieur de MaPrimeRénov'.",
      ],
      secteurs: [
        {
          nom: "Parc de Lésigny et Orée de Lésigny (1968)",
          texte:
            "Au sud-ouest du Vieux Village. Plans répétés d'une maison à l'autre, maisons jumelées à l'Orée. Le dimensionnement s'appuie sur des volumes connus, mais l'isolation varie beaucoup selon les travaux faits depuis 1968.",
        },
        {
          nom: "Grande Romaine, Clos Vimont, Clos de la Vigne, Clos Prieur (1968-1970)",
          texte:
            "Au nord-est du village, en partie à cheval sur Férolles-Attilly et Ozoir-la-Ferrière. Même génération de maisons, mêmes besoins : chaudière gaz à remplacer, radiateurs à vérifier à l'étage.",
        },
        {
          nom: "Le Réveillon (1974) et les quartiers de 1989-1993",
          texte:
            "L'ancienne Ville-Jardin de Grattepeau, puis la Pomme Verte, le Clos Saint-Yon, la Pomme Rouge, Villarceau et les Jardins de Saint-Marc. Maisons plus récentes, mieux isolées, où une PAC de 6 à 8 kW suffit souvent.",
        },
        {
          nom: "Le Vieux Village",
          texte:
            "Maisons anciennes en pierre autour de l'église Saint-Yon. Périmètre de protection : l'unité extérieure doit rester discrète, côté jardin, et le dossier passe par l'avis de l'Architecte des Bâtiments de France.",
        },
      ],
      quelPac: [
        "Dans une maison des résidences de 1968-1970, nous commençons toujours par l'isolation. Si les combles n'ont jamais été repris, nous conseillons de le faire avant la PAC : la machine peut alors passer de 14 à 11 kW, et travailler à plus basse température.",
        "Une fois la maison isolée, une PAC air-eau moyenne température de 9 à 11 kW couvre la plupart des maisons de 110 à 130 m². Pour les quartiers de la fin des années 1980, 6 à 8 kW suffisent souvent. Les ménages du profil supérieur ne touchent plus MaPrimeRénov', mais conservent la prime CEE bonifiée et la TVA à 5,5 %.",
      ],
      projet: {
        titre: "Projet type : maison de 1969 dans une résidence de Lésigny",
        contexte:
          "Maison de 125 m² sur deux niveaux, combles isolés en 2026 avant les travaux, chaudière gaz non condensation de 2002 et radiateurs acier. Consommation de gaz après isolation : environ 17 000 kWh par an. Foyer de 3 personnes, profil « intermédiaire ».",
        lignes: [
          { poste: "PAC air-eau agréée 11 kW + ballon 200 L, posée", valeur: "≈ 15 500 € TTC" },
          { poste: "MaPrimeRénov' (profil intermédiaire)", valeur: "− 3 000 €" },
          { poste: "Prime CEE Coup de pouce (estimation)", valeur: "≈ − 2 500 €" },
          { poste: "Reste à charge", valeur: "≈ 10 000 €" },
          { poste: "Même projet, profil supérieur (CEE seule)", valeur: "≈ 13 000 €" },
          { poste: "Facture chauffage avant (gaz à 0,12 €/kWh)", valeur: "≈ 2 050 € / an" },
          { poste: "Facture après (SCOP 3,3, élec. à 0,195 €/kWh)", valeur: "≈ 880 € / an" },
        ],
        conclusion:
          "Économie d'environ 1 170 € par an, soit un retour sur investissement de 8 à 11 ans selon le profil de revenus. Exemple de dimensionnement indicatif : votre devis dépend de la visite technique.",
      },
      faq: [
        {
          question: "Une pompe à chaleur convient-elle aux maisons Levitt de Lésigny ?",
          answer:
            "Oui. Ces maisons ont un chauffage central à eau, que la PAC air-eau reprend directement. L'enjeu est l'isolation : une maison de 1968 jamais rénovée doit d'abord être isolée par les combles, sinon la PAC devra être surdimensionnée et consommera davantage.",
        },
        {
          question: "Faut-il l'accord de l'association syndicale pour l'unité extérieure ?",
          answer:
            "C'est fréquent dans les résidences de Lésigny, dont le cahier des charges encadre l'aspect des façades. Consultez-le avant de signer. Une unité posée au sol dans le jardin arrière, non visible depuis la rue, pose rarement problème.",
        },
        {
          question: "Quelles aides à Lésigny si mes revenus sont élevés ?",
          answer:
            "Les ménages au-dessus des plafonds intermédiaires ne touchent plus MaPrimeRénov' pour une PAC. Ils gardent la prime CEE, bonifiée si la PAC est agréée et remplace une chaudière gaz non condensation, soit souvent 2 000 à 3 000 €, et la TVA à 5,5 %.",
        },
        {
          question: "Comment placer l'unité extérieure dans une maison jumelée ?",
          answer:
            "Jamais sur le mur mitoyen. Nous la posons au sol, sur un support antivibratile, côté jardin et le plus loin possible de la limite séparative. Le niveau sonore chez le voisin doit rester sous le seuil d'émergence fixé par le Code de la santé publique.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  "gretz-armainvilliers": {
    titre: "Installer une pompe à chaleur à Gretz-Armainvilliers",
    habitat:
      "Gretz-Armainvilliers est la commune du secteur où l'on trouve le plus de maisons d'avant-guerre : près de 9 % des résidences principales ont été achevées avant 1946. Autour de la gare et de l'église Saint-Jean-Baptiste, ces maisons en meulière ou en moellons ont souvent gardé leurs grands radiateurs en fonte. Le reste du parc se partage entre pavillons des années 1950 à 1990 et appartements, désormais majoritaires.",
    urbanisme:
      "Le domaine du château d'Armainvilliers, construit par Edmond de Rothschild à partir de 1877, s'étend sur Gretz-Armainvilliers et Tournan-en-Brie. Pour une maison ancienne du centre, consultez l'Atlas des patrimoines afin de savoir si votre adresse se trouve dans un périmètre protégé. En lotissement, une unité posée au sol dans le jardin ne pose en général pas de difficulté.",
    conseils: [
      {
        titre: "Meulière et radiateurs en fonte",
        texte:
          "Une maison en meulière non isolée par l'extérieur demande une eau plus chaude par grand froid. Une PAC haute température au R290 permet de garder les radiateurs en fonte, souvent très appréciés.",
      },
      {
        titre: "Matinées froides en lisière de forêt",
        texte:
          "Le Réveillon et la Barbançonne prennent leur source sur la commune, entre bois et étangs. Nous dimensionnons la PAC sur la température de base du secteur, pour limiter le recours à la résistance d'appoint.",
      },
    ],
    realisations: [],
    rich: {
      metaTitle: "Pompe à chaleur Gretz-Armainvilliers (77220) : maisons en meulière",
      metaDescription:
        "Pompe à chaleur à Gretz-Armainvilliers : maisons d'avant-guerre en meulière, radiateurs en fonte, 58 % de chauffage au gaz. PAC haute température, projet chiffré, aides 2026.",
      h1: "Pompe à chaleur à Gretz-Armainvilliers : garder ses radiateurs en fonte",
      heroSubtitle:
        "Maisons en meulière près de la gare, pavillons des années 1960 et 1970 : à Gretz, la température d'eau décide du choix de la pompe à chaleur.",
      photo: {
        src: "/images/villes/pompe-a-chaleur-gretz-armainvilliers.jpg",
        width: 1280,
        height: 720,
        alt: "Centre de Gretz-Armainvilliers avec l'école Leclerc aux façades claires et l'église Saint-Jean-Baptiste en pierre à clocher pointu, sous un ciel bleu",
        caption: "L'école Leclerc et l'église Saint-Jean-Baptiste, au centre de Gretz-Armainvilliers.",
        author: "Thibault Pelloquin",
        licence: "CC BY 3.0",
        licenceUrl: "https://creativecommons.org/licenses/by/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:%C3%89cole_Leclerc_et_%C3%A9glise_Saint-Jean-Baptiste,_Gretz-Armainvilliers_-_panoramio.jpg",
      },
      intro: [
        "Avec près de 8 800 habitants, Gretz-Armainvilliers s'est développée autour de sa gare, sur la ligne de Paris à Mulhouse, aujourd'hui desservie par le RER E. Le bourg ancien et les maisons en meulière de l'entre-deux-guerres côtoient des pavillons plus récents et, depuis une quinzaine d'années, de nombreux programmes d'appartements.",
        "Pour une pompe à chaleur, cette diversité change tout. Dans un pavillon de 1975 isolé, une PAC air-eau standard fait très bien l'affaire. Dans une maison en meulière de 1930 avec radiateurs en fonte, il faut vérifier la température d'eau nécessaire par grand froid, et parfois choisir une PAC haute température. C'est ce point que nous étudions en priorité lors des visites à Gretz.",
      ],
      insee: {
        logements: 3896,
        pctMaisons: 47.8,
        pctProprietaires: 53.7,
        periodes: periodes([8.9, 24.1, 38.0, 13.5, 15.4]),
        chauffage: chauffage(57.7, 35.0, 3.2, 4.2),
      },
      lectureChiffres: [
        "Les maisons ne représentent plus que 48 % des logements, contre 53 % en 2017 : la commune construit surtout des appartements. Côté maisons, le parc est ancien. Un tiers des résidences principales a été achevé avant 1971, dont près de 9 % avant 1946, l'une des proportions les plus élevées du secteur.",
        "Le gaz de ville chauffe 58 % des foyers, l'électricité 35 %. Le fioul, qui dépassait 7 % en 2012, est tombé à 3 % en 2023 : la plupart des maisons concernées ont déjà changé d'énergie. Les foyers qui restent au fioul sont presque tous dans des maisons anciennes, exactement celles où une PAC haute température a du sens.",
      ],
      secteurs: [
        {
          nom: "Le centre, autour de la gare et de l'église",
          texte:
            "Maisons de ville et villas anciennes, souvent en meulière, avec radiateurs en fonte. Étude de la température d'eau indispensable, PAC haute température fréquente.",
        },
        {
          nom: "Les pavillons des années 1950 à 1990",
          texte:
            "Un tiers du parc. Chauffage gaz et radiateurs acier, combles parfois isolés. PAC air-eau moyenne température de 8 à 11 kW dans la plupart des cas.",
        },
        {
          nom: "Les programmes récents",
          texte:
            "15 % des logements datent de 2006 à 2020, en majorité des appartements. En copropriété, la PAC dépend de l'accord collectif ; dans les maisons récentes, une PAC basse température suffit.",
        },
      ],
      quelPac: [
        "Pour une maison en meulière, nous faisons un test simple pendant l'hiver qui précède les travaux : la chaudière est réglée à 55 °C pendant une semaine froide. Si la maison reste confortable, une PAC moyenne température suffira. Sinon, une PAC haute température au R290, capable de produire 65 à 70 °C, permet de garder les radiateurs en fonte.",
        "La PAC haute température coûte 2 000 à 4 000 € de plus et consomme un peu plus, mais elle évite de remplacer des radiateurs en fonte, coûteux à déposer et souvent appréciés pour leur inertie. Dans les pavillons des années 1960-1980, une PAC moyenne température reste la règle.",
      ],
      projet: {
        titre: "Projet type : maison en meulière de 1932 près de la gare",
        contexte:
          "Maison de 115 m² sur trois niveaux, murs en meulière non isolés, combles isolés, radiateurs en fonte d'origine, chaudière gaz non condensation de 2004. Consommation de gaz : environ 22 000 kWh par an. Foyer de 4 personnes, profil « modeste ».",
        lignes: [
          { poste: "PAC air-eau haute température R290 12 kW + ballon, posée", valeur: "≈ 17 500 € TTC" },
          { poste: "Désembouage des radiateurs fonte", valeur: "≈ 600 €" },
          { poste: "MaPrimeRénov' (profil modeste)", valeur: "− 4 000 €" },
          { poste: "Prime CEE Coup de pouce (estimation)", valeur: "≈ − 3 500 €" },
          { poste: "Reste à charge", valeur: "≈ 10 600 €" },
          { poste: "Facture chauffage avant (gaz à 0,12 €/kWh)", valeur: "≈ 2 640 € / an" },
          { poste: "Facture après (SCOP 2,9, élec. à 0,195 €/kWh)", valeur: "≈ 1 210 € / an" },
        ],
        conclusion:
          "Économie d'environ 1 430 € par an, pour un retour sur investissement de sept à huit ans, radiateurs en fonte conservés. Exemple de dimensionnement indicatif : votre devis dépend de la visite technique.",
      },
      faq: [
        {
          question: "Une pompe à chaleur peut-elle chauffer une maison en meulière à Gretz ?",
          answer:
            "Oui. La meulière isole mal, mais une PAC air-eau bien dimensionnée chauffe ces maisons sans difficulté. Si les radiateurs en fonte doivent recevoir de l'eau à plus de 55 °C par grand froid, une PAC haute température au R290 est la solution la plus simple.",
        },
        {
          question: "Faut-il changer les radiateurs en fonte ?",
          answer:
            "Rarement. Les radiateurs en fonte sont volumineux et restituent bien la chaleur. Nous les désembouons et vérifions leur puissance pièce par pièce. Le remplacement d'un ou deux radiateurs trop petits suffit quand la PAC est moyenne température.",
        },
        {
          question: "Combien coûte une PAC haute température à Gretz-Armainvilliers ?",
          answer:
            "Comptez 15 000 à 20 000 € TTC posée pour une maison de 100 à 140 m², ballon d'eau chaude compris. Elle bénéficie des mêmes aides qu'une PAC air-eau classique : MaPrimeRénov' de 3 000 à 5 000 €, prime CEE bonifiée si elle est agréée, TVA à 5,5 %.",
        },
        {
          question: "Ma maison est-elle dans un périmètre protégé ?",
          answer:
            "Pour le savoir, consultez l'Atlas des patrimoines du ministère de la Culture ou le service urbanisme de la mairie. Dans un périmètre de monument historique, l'unité extérieure doit être discrète et le dossier passe par l'avis de l'Architecte des Bâtiments de France.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  "tournan-en-brie": {
    titre: "Pompe à chaleur à Tournan-en-Brie : centre ancien et pavillons",
    habitat:
      "Tournan-en-Brie a le parc le plus ancien du secteur : près de 9 % des résidences principales datent d'avant 1919. Autour de l'hôtel de ville, installé dans l'ancien château de Garlande, les maisons de bourg en pierre côtoient des pavillons construits surtout entre 1971 et 2005. Particularité locale : 44 % des foyers se chauffent à l'électricité, presque autant qu'au gaz.",
    urbanisme:
      "Dans le centre, les façades donnent souvent sur la rue et les cours sont petites. L'unité extérieure doit alors être placée en cour arrière, et une déclaration préalable peut être exigée si elle est visible depuis l'espace public. Pour une maison du centre ancien, vérifiez sur l'Atlas des patrimoines si votre adresse est concernée par un périmètre protégé.",
    conseils: [
      {
        titre: "Tout électrique : air-air ou air-eau ?",
        texte:
          "Sans circuit d'eau chaude, créer un réseau de radiateurs coûte 8 000 à 12 000 € de plus. Dans un pavillon chauffé par convecteurs, une PAC air-air multisplit est presque toujours plus rentable.",
      },
      {
        titre: "Maison de bourg en pierre",
        texte:
          "Pour une maison ancienne chauffée au gaz avec radiateurs en fonte, une PAC haute température évite de remplacer les émetteurs. Nous mesurons d'abord la température d'eau nécessaire.",
      },
    ],
    realisations: [],
    rich: {
      metaTitle: "Pompe à chaleur Tournan-en-Brie (77220) : convecteurs et maisons de bourg",
      metaDescription:
        "Pompe à chaleur à Tournan-en-Brie : 44 % des foyers chauffés à l'électricité, un centre ancien en pierre. PAC air-air ou air-eau, projet type chiffré et aides 2026.",
      h1: "Pompe à chaleur à Tournan-en-Brie : sortir des convecteurs électriques",
      heroSubtitle:
        "À Tournan, presque un foyer sur deux se chauffe à l'électricité. Une pompe à chaleur divise cette facture par trois ou quatre, sans forcément créer de radiateurs.",
      photo: {
        src: "/images/villes/pompe-a-chaleur-tournan-en-brie.jpg",
        width: 1280,
        height: 960,
        alt: "Hôtel de ville de Tournan-en-Brie, bâtiment en moellons de pierre avec fenêtres fleuries, flanqué de deux tours rondes de l'ancien château de Garlande",
        caption: "L'hôtel de ville de Tournan-en-Brie, dans les murs de l'ancien château de Garlande.",
        author: "Benjism89",
        licence: "CC BY-SA 3.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Tournan-en-Brie_-_Town_Hall.jpg",
      },
      intro: [
        "Tournan-en-Brie, 8 300 habitants, est la ville-centre de son bassin de vie et le terminus de la ligne E du RER depuis décembre 2003, également desservie par la ligne P. Son centre, autour de la place pavée et de la fontaine de la Croix Blanche, a gardé des maisons de bourg en pierre, tandis que la ville s'est étendue en pavillons à partir des années 1970, puis fortement entre 1991 et 2005.",
        "C'est cette seconde vague qui explique une particularité locale : 44 % des résidences principales sont chauffées à l'électricité, une part bien plus élevée qu'à Roissy-en-Brie ou Lésigny. Beaucoup de pavillons des années 1990 ont été livrés avec des convecteurs, sans circuit d'eau. Pour eux, la bonne pompe à chaleur n'est pas forcément celle que l'on croit.",
      ],
      insee: {
        logements: 3689,
        pctMaisons: 52.0,
        pctProprietaires: 56.4,
        periodes: periodes([14.3, 21.0, 29.4, 26.3, 9.1]),
        chauffage: chauffage(46.4, 44.3, 2.0, 7.4),
      },
      lectureChiffres: [
        "Tournan-en-Brie a deux parcs de logements bien distincts. D'un côté, 14 % de résidences principales achevées avant 1946, dont près de 9 % avant 1919, concentrées dans le centre et la Madeleine. De l'autre, plus d'un quart du parc construit entre 1991 et 2005, en pavillons et petits collectifs.",
        "Le chauffage électrique a progressé de 39 % des foyers en 2012 à 44 % en 2023, et touche désormais presque autant de logements que le gaz. Le fioul, lui, a fondu de 6,7 % à 2 % sur la même période. À Tournan, la pompe à chaleur air-air, qui remplace des convecteurs, est donc aussi pertinente que la PAC air-eau, qui remplace une chaudière.",
      ],
      secteurs: [
        {
          nom: "Le centre-ville",
          texte:
            "Du pont ferroviaire à la rue des Carreaux, autour de l'hôtel de ville et de l'église Saint-Denis reconstruite après 1944. Maisons de bourg en pierre, cours étroites, radiateurs en fonte : PAC haute température ou air-eau en cour arrière.",
        },
        {
          nom: "La Madeleine",
          texte:
            "À l'est du centre-ville. Mélange de maisons anciennes et de pavillons. Chaque maison est différente, d'où l'importance de la visite technique.",
        },
        {
          nom: "Les pavillons de 1991 à 2005",
          texte:
            "Maisons de 90 à 110 m², souvent tout électriques avec convecteurs. Une PAC air-air multisplit remplace les convecteurs en deux jours, sans travaux de plomberie.",
        },
        {
          nom: "Les hameaux",
          texte:
            "La commune compte une soixantaine de lieux-dits, dont Villé. Certaines maisons isolées ne sont pas raccordées au gaz : la PAC est alors l'alternative logique à l'électrique direct ou au fioul.",
        },
      ],
      quelPac: [
        "Dans un pavillon chauffé par convecteurs, nous comparons toujours deux options. La PAC air-air multisplit coûte 6 500 à 10 000 €, se pose sans plomberie et climatise l'été, mais elle n'a pas d'aide MaPrimeRénov'. La PAC air-eau demanderait de créer un réseau de radiateurs, soit 8 000 à 12 000 € de plus : elle ne se justifie que lors d'une rénovation complète.",
        "Dans une maison chauffée au gaz, le raisonnement est classique : PAC air-eau de 8 à 12 kW, moyenne température pour un pavillon, haute température pour une maison de bourg en pierre aux radiateurs en fonte.",
      ],
      projet: {
        titre: "Projet type : pavillon tout électrique de 1996",
        contexte:
          "Maison de 95 m² sur deux niveaux, combles isolés, double vitrage d'origine, 8 convecteurs électriques et cumulus de 200 litres. Consommation de chauffage : environ 9 500 kWh par an. Foyer de 4 personnes.",
        lignes: [
          { poste: "PAC air-air multisplit, 4 unités intérieures, posée", valeur: "≈ 7 500 € TTC (TVA 10 %)" },
          { poste: "MaPrimeRénov' et Coup de pouce", valeur: "non éligibles" },
          { poste: "Facture chauffage avant (convecteurs)", valeur: "≈ 1 850 € / an" },
          { poste: "Facture après (SCOP 4, élec. à 0,195 €/kWh)", valeur: "≈ 465 € / an" },
          { poste: "Option : chauffe-eau thermodynamique 200 L", valeur: "≈ 2 800 € TTC" },
          { poste: "Économie supplémentaire sur l'eau chaude", valeur: "≈ 300 à 350 € / an" },
        ],
        conclusion:
          "Économie d'environ 1 385 € par an sur le chauffage, soit un retour sur investissement de cinq ans et demi sans aucune aide, avec la climatisation des chambres en bonus. Exemple de dimensionnement indicatif : votre devis dépend de la visite technique.",
      },
      faq: [
        {
          question: "Ma maison à Tournan est chauffée par convecteurs : quelle pompe à chaleur choisir ?",
          answer:
            "Sans circuit d'eau, une PAC air-air multisplit est presque toujours le meilleur choix. Elle coûte 6 500 à 10 000 € pour une maison de 90 à 120 m², divise la consommation de chauffage par trois ou quatre et rafraîchit l'été. Elle n'est pas aidée par MaPrimeRénov'.",
        },
        {
          question: "Peut-on installer une PAC dans une maison du centre ancien de Tournan ?",
          answer:
            "Oui, en plaçant l'unité extérieure dans la cour arrière ou le jardin. Si elle est visible depuis la rue, une déclaration préalable est souvent nécessaire. Pour une maison en pierre avec radiateurs en fonte, une PAC haute température permet de garder les émetteurs.",
        },
        {
          question: "Une PAC air-air est-elle bruyante pour les voisins ?",
          answer:
            "Une unité extérieure récente produit 45 à 55 dB(A) à un mètre. Posée sur des plots antivibratiles, loin des fenêtres voisines, elle respecte sans difficulté les seuils d'émergence du Code de la santé publique. En lotissement, nous choisissons l'emplacement avec vous.",
        },
        {
          question: "Et l'eau chaude dans une maison tout électrique ?",
          answer:
            "La PAC air-air ne produit pas d'eau chaude. Remplacer le cumulus par un chauffe-eau thermodynamique fait économiser 300 à 400 € de plus par an. La prime CEE correspondante est temporairement bonifiée pour les devis signés avant le 1er janvier 2027.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  "brie-comte-robert": {
    titre: "Installer une pompe à chaleur à Brie-Comte-Robert",
    habitat:
      "Brie-Comte-Robert est la ville la plus urbaine du secteur : 62 % de ses logements sont des appartements, et 28 % des résidences principales ont été achevées depuis 2006. Les maisons individuelles, un peu moins de 3 500, se trouvent surtout dans les lotissements des années 1970 à 1990 autour de la vieille ville, et dans le hameau de Villemeneux. C'est là que la pompe à chaleur rapporte le plus.",
    urbanisme:
      "Les ruines du vieux château sont classées monument historique depuis 1925, et l'église Saint-Étienne depuis 1840. Dans un rayon de 500 mètres autour de ces monuments, l'Architecte des Bâtiments de France donne son avis sur les travaux visibles, dont une unité extérieure en façade. Nous proposons alors un emplacement côté jardin et un groupe de teinte neutre.",
    conseils: [
      {
        titre: "Anticiper l'avis de l'ABF",
        texte:
          "Pour une maison proche de la vieille ville, comptez un à deux mois de plus pour la déclaration préalable. Nous préparons le dossier avec le devis : photos, plan de situation et fiche technique du groupe.",
      },
      {
        titre: "Maison récente : faire le calcul",
        texte:
          "Dans une maison d'après 2006 équipée d'une chaudière à condensation, le gain d'une PAC est réel mais plus lent à rentabiliser, et le Coup de pouce ne s'applique pas. Nous vous le disons dès la visite.",
      },
    ],
    realisations: [],
    rich: {
      metaTitle: "Pompe à chaleur Brie-Comte-Robert (77170) : lotissements et vieille ville",
      metaDescription:
        "Pompe à chaleur à Brie-Comte-Robert : 3 500 maisons, chauffage partagé entre gaz et électricité, avis ABF près du château. Conseils par quartier, projet chiffré, aides 2026.",
      h1: "Pompe à chaleur à Brie-Comte-Robert : bien choisir selon l'âge de la maison",
      heroSubtitle:
        "Vieille ville protégée, lotissements des années 1980, maisons neuves : à Brie-Comte-Robert, la rentabilité d'une PAC dépend surtout de l'année de construction.",
      photo: {
        src: "/images/villes/pompe-a-chaleur-brie-comte-robert.jpg",
        width: 1280,
        height: 853,
        alt: "Ruines du vieux château de Brie-Comte-Robert, remparts en pierre et grosse tour ronde entourés de douves en eau où nagent des canards",
        caption: "Les ruines du vieux château, classées monument historique en 1925, et leurs douves.",
        author: "Reinhardhauke",
        licence: "CC BY-SA 3.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Brie-Comte-Robert_Ch%C3%A2teau_7.JPG",
      },
      intro: [
        "Brie-Comte-Robert, 19 000 habitants, est la ville-centre de son bassin de vie, entre la vallée de l'Yerres au sud et le plateau de la Brie. Sa vieille ville s'est formée autour de trois lieux : l'église Saint-Étienne, dont la flèche se voit à des kilomètres, le château et la place du Marché. Il reste des remparts en bordure du square de la Grenouillère.",
        "La ville n'a pas de gare et se parcourt en bus, mais elle a beaucoup construit : le nombre de logements est passé de 7 000 à plus de 9 000 en une dizaine d'années, surtout en appartements. Pour un propriétaire de maison, la question d'une pompe à chaleur se pose donc très différemment selon qu'il habite un pavillon de 1985 ou une maison livrée en 2015.",
      ],
      insee: {
        logements: 9041,
        pctMaisons: 38.2,
        pctProprietaires: 55.1,
        periodes: periodes([7.2, 12.7, 28.0, 23.7, 28.5]),
        chauffage: chauffage(49.7, 44.7, 2.3, 3.3),
      },
      lectureChiffres: [
        "Brie-Comte-Robert est la seule commune du secteur où les appartements dominent nettement, avec 62 % des logements. C'est aussi celle qui construit le plus : 28 % des résidences principales ont été achevées entre 2006 et 2020. Ces logements récents sont bien isolés, et souvent chauffés à l'électricité, ce qui explique la part élevée de l'électrique (45 %).",
        "Les maisons anciennes et les pavillons des années 1970 à 1990 représentent l'autre moitié du parc. C'est là que se trouvent la plupart des chaudières gaz à remplacer, et que la pompe à chaleur air-eau est la plus rentable. Le fioul ne chauffe plus que 2 % des foyers.",
      ],
      secteurs: [
        {
          nom: "La vieille ville",
          texte:
            "Autour de l'église Saint-Étienne, du château et de la place du Marché. Périmètre de protection des monuments historiques : unité extérieure discrète côté cour, avis de l'Architecte des Bâtiments de France.",
        },
        {
          nom: "Les lotissements des années 1970 à 1990",
          texte:
            "Le meilleur terrain pour une PAC air-eau : chaudière gaz de 20 à 30 ans, radiateurs acier, garage pour le module intérieur. Retour sur investissement de six à huit ans.",
        },
        {
          nom: "Les quartiers récents",
          texte:
            "Maisons et appartements postérieurs à 2006, bien isolés. Une PAC s'y justifie surtout au remplacement d'une chaudière en fin de vie, ou pour remplacer des radiateurs électriques.",
        },
        {
          nom: "Le hameau de Villemeneux",
          texte:
            "Entre Brie-Comte-Robert et Combs-la-Ville, près de la vallée de l'Yerres. Maisons sur grands terrains, où l'unité extérieure se place facilement loin des voisins.",
        },
      ],
      quelPac: [
        "Pour un pavillon des années 1980 chauffé au gaz, nous proposons une PAC air-eau moyenne température de 8 à 11 kW, avec le module intérieur et le ballon au garage. C'est le cas le mieux aidé : la chaudière non condensation déclenche la bonification Coup de pouce si la PAC est agréée.",
        "Dans une maison récente avec chaudière à condensation, la PAC reste possible, mais sans Coup de pouce : seule la prime CEE de base s'applique. Nous conseillons alors souvent d'attendre la fin de vie de la chaudière, ou d'envisager d'abord des panneaux solaires.",
      ],
      projet: {
        titre: "Projet type : pavillon de 1987 dans un lotissement",
        contexte:
          "Maison de 100 m² avec garage, combles isolés, chaudière gaz non condensation de 1999, radiateurs acier. Consommation de gaz : environ 14 000 kWh par an. Foyer de 3 personnes, profil « modeste ». Hors périmètre protégé.",
        lignes: [
          { poste: "PAC air-eau agréée 8 kW + ballon 200 L, posée", valeur: "≈ 13 000 € TTC" },
          { poste: "MaPrimeRénov' (profil modeste)", valeur: "− 4 000 €" },
          { poste: "Prime CEE Coup de pouce (estimation)", valeur: "≈ − 3 500 €" },
          { poste: "Reste à charge", valeur: "≈ 5 500 €" },
          { poste: "Facture chauffage avant (gaz à 0,12 €/kWh)", valeur: "≈ 1 680 € / an" },
          { poste: "Facture après (SCOP 3,5, élec. à 0,195 €/kWh)", valeur: "≈ 680 € / an" },
        ],
        conclusion:
          "Économie d'environ 1 000 € par an, pour un retour sur investissement de cinq ans et demi. Dans la vieille ville, prévoyez un à deux mois de délai pour l'avis de l'ABF. Exemple de dimensionnement indicatif : votre devis dépend de la visite technique.",
      },
      faq: [
        {
          question: "Faut-il une autorisation pour une pompe à chaleur près du château de Brie-Comte-Robert ?",
          answer:
            "Dans un rayon de 500 mètres autour du château ou de l'église Saint-Étienne, une unité extérieure visible demande une déclaration préalable avec avis de l'Architecte des Bâtiments de France. Comptez un à deux mois. Un emplacement côté jardin et un groupe de teinte neutre facilitent l'accord.",
        },
        {
          question: "Ma maison de 2010 a une chaudière à condensation : une PAC est-elle rentable ?",
          answer:
            "Moins que dans une maison ancienne. Le Coup de pouce chauffage ne s'applique pas au remplacement d'une chaudière à condensation, et la maison consomme déjà peu. Le retour sur investissement dépasse souvent dix ans. Mieux vaut en général attendre la fin de vie de la chaudière.",
        },
        {
          question: "Peut-on poser une PAC dans un appartement à Brie-Comte-Robert ?",
          answer:
            "Une PAC air-air est possible si le règlement de copropriété et l'assemblée générale autorisent une unité extérieure sur le balcon ou en terrasse. Dans les résidences récentes chauffées à l'électricité, c'est souvent la seule option individuelle.",
        },
        {
          question: "Quel délai pour une installation à Brie-Comte-Robert ?",
          answer:
            "Notre agence d'Ozoir-la-Ferrière est à 9 km. Hors périmètre protégé, la pose intervient en général trois à six semaines après la visite, le temps de déposer les dossiers d'aides. La coupure de chauffage ne dure qu'une journée.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  "chevry-cossigny": {
    titre: "Pompe à chaleur à Chevry-Cossigny : maisons récentes sur grands terrains",
    habitat:
      "Chevry-Cossigny est un village de la Brie où les maisons dominent (71 % des logements) et où le parc est récent : 37 % des résidences principales ont été achevées entre 1991 et 2005, la proportion la plus élevée du secteur. Les maisons de cette génération, mieux isolées, sont idéales pour une pompe à chaleur, surtout lorsqu'elles ont un plancher chauffant.",
    urbanisme:
      "Les terrains sont souvent spacieux : l'unité extérieure peut être placée loin des limites de propriété, ce qui règle la question du bruit. Pour une maison ancienne du bourg de Chevry ou du hameau de Cossigny, nous vérifions avec vous le PLU et la présence éventuelle d'un périmètre protégé sur l'Atlas des patrimoines.",
    conseils: [
      {
        titre: "Plancher chauffant : la PAC idéale",
        texte:
          "Un plancher chauffant hydraulique fonctionne à 30 ou 35 °C. Une PAC basse température y atteint ses meilleurs rendements, avec un SCOP supérieur à 4.",
      },
      {
        titre: "Chaudière à condensation : attention aux aides",
        texte:
          "Le Coup de pouce chauffage ne s'applique pas au remplacement d'une chaudière gaz à condensation, fréquente dans les maisons des années 2000. Seule la prime CEE de base reste alors possible.",
      },
    ],
    realisations: [],
    rich: {
      metaTitle: "Pompe à chaleur Chevry-Cossigny (77173) : maisons récentes et plancher chauffant",
      metaDescription:
        "Pompe à chaleur à Chevry-Cossigny : 37 % des maisons construites entre 1991 et 2005, plancher chauffant fréquent. PAC basse température, projet chiffré et aides 2026.",
      h1: "Pompe à chaleur à Chevry-Cossigny : tirer parti d'une maison récente",
      heroSubtitle:
        "Maisons des années 1990-2000, grands terrains, bonne isolation : à Chevry-Cossigny, une PAC basse température atteint ses meilleurs rendements. À 5 km de notre agence.",
      photo: {
        src: "/images/villes/pompe-a-chaleur-chevry-cossigny.jpg",
        width: 1280,
        height: 1157,
        alt: "Église Notre-Dame-de-l'Assomption de Chevry-Cossigny, clocher crème épaulé de contreforts en meulière et nef au toit de tuiles brunes",
        caption: "L'église Notre-Dame-de-l'Assomption, au cœur du bourg de Chevry.",
        author: "Litlok",
        licence: "CC BY-SA 4.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Chevry-Cossigny_-_%C3%89glise_Notre-Dame-de-l%27Assomption_3.jpg",
      },
      intro: [
        "Chevry-Cossigny, un peu plus de 4 000 habitants, réunit le bourg de Chevry et le hameau de Cossigny sur le plateau de la Brie, entre les vallées du Réveillon et de la Barbançonne. La commune a donné son nom à la bifurcation de la LGV d'interconnexion Est. Elle n'a pas de gare : la plus proche est celle de Gretz-Armainvilliers.",
        "À la différence de ses voisines, Chevry-Cossigny s'est surtout construite tardivement. Plus de la moitié des résidences principales datent d'après 1990. Ce sont des maisons mieux isolées, chauffées au gaz ou à l'électricité, dont une partie a été équipée d'un plancher chauffant au rez-de-chaussée. Pour une pompe à chaleur, ce sont d'excellentes conditions, à une réserve près sur les aides.",
      ],
      insee: {
        logements: 1696,
        pctMaisons: 71.4,
        pctProprietaires: 73.6,
        periodes: periodes([7.2, 9.8, 26.1, 37.0, 19.9]),
        chauffage: chauffage(47.2, 42.0, 3.1, 7.7),
      },
      lectureChiffres: [
        "57 % des résidences principales ont été achevées après 1990, dont 37 % entre 1991 et 2005 : aucune commune voisine n'a un parc aussi récent. Trois foyers sur quatre sont propriétaires de leur maison. Le gaz et l'électricité se partagent presque à égalité le chauffage, avec respectivement 47 % et 42 % des foyers.",
        "Le fioul ne concerne plus que 3 % des logements, dans les maisons anciennes du bourg et de Cossigny. Enfin, 8 % des foyers se chauffent principalement au bois ou par d'autres moyens, une part plus élevée qu'à Brie-Comte-Robert ou Gretz-Armainvilliers.",
      ],
      secteurs: [
        {
          nom: "Les maisons des années 1990-2000",
          texte:
            "Le cœur du parc. Maisons de 120 à 160 m², mieux isolées, chaudière gaz souvent à condensation, parfois plancher chauffant au rez-de-chaussée. PAC basse température de 8 à 11 kW.",
        },
        {
          nom: "Le bourg de Chevry",
          texte:
            "Autour de l'église Notre-Dame-de-l'Assomption, dont la cloche date de 1534. Maisons anciennes en pierre, parfois encore au fioul, où une PAC moyenne ou haute température est à étudier.",
        },
        {
          nom: "Le hameau de Cossigny",
          texte:
            "Près du parc du château de Cossigny. Maisons sur grands terrains, parfois non raccordées au gaz : la PAC remplace alors l'électrique direct, le fioul ou le propane.",
        },
      ],
      quelPac: [
        "Dans une maison des années 1990-2000 avec plancher chauffant, une PAC air-eau basse température est la solution la plus performante : elle produit de l'eau à 30-35 °C avec un SCOP supérieur à 4, et peut rafraîchir légèrement la maison l'été si le plancher le permet.",
        "Attention au point qui surprend le plus nos clients à Chevry-Cossigny : si la chaudière actuelle est une chaudière gaz à condensation, le Coup de pouce chauffage ne s'applique pas. Seule une prime CEE de base, de quelques centaines d'euros, s'ajoute à MaPrimeRénov'. Le projet reste rentable, mais plus lentement.",
      ],
      projet: {
        titre: "Projet type : maison de 1999 avec plancher chauffant",
        contexte:
          "Maison de 140 m², plancher chauffant hydraulique au rez-de-chaussée, radiateurs à l'étage, chaudière gaz à condensation de 2008 en fin de vie. Consommation de gaz : environ 16 000 kWh par an. Foyer de 4 personnes, profil « intermédiaire ».",
        lignes: [
          { poste: "PAC air-eau basse température 9 kW + ballon 200 L, posée", valeur: "≈ 13 500 € TTC" },
          { poste: "MaPrimeRénov' (profil intermédiaire)", valeur: "− 3 000 €" },
          { poste: "Prime CEE de base (pas de Coup de pouce)", valeur: "≈ − 500 à 1 000 €" },
          { poste: "Reste à charge", valeur: "≈ 9 500 à 10 000 €" },
          { poste: "Facture chauffage avant (gaz à 0,12 €/kWh)", valeur: "≈ 1 920 € / an" },
          { poste: "Facture après (SCOP 4,2, élec. à 0,195 €/kWh)", valeur: "≈ 700 € / an" },
        ],
        conclusion:
          "Économie d'environ 1 220 € par an grâce au rendement élevé du plancher chauffant, pour un retour sur investissement de huit ans environ. Exemple de dimensionnement indicatif : votre devis dépend de la visite technique.",
      },
      faq: [
        {
          question: "Une pompe à chaleur fonctionne-t-elle bien avec un plancher chauffant à Chevry-Cossigny ?",
          answer:
            "C'est la meilleure configuration possible. Un plancher chauffant hydraulique n'a besoin que d'une eau à 30 ou 35 °C, ce qui permet à la PAC d'atteindre un rendement saisonnier supérieur à 4. La consommation est alors trois à quatre fois plus faible qu'avec une chaudière gaz.",
        },
        {
          question: "Pourquoi n'ai-je pas droit au Coup de pouce chauffage ?",
          answer:
            "La bonification Coup de pouce s'applique au remplacement d'une chaudière fioul, charbon ou gaz non condensation. Si votre maison des années 2000 a une chaudière gaz à condensation, seule la prime CEE de base s'applique, en plus de MaPrimeRénov' selon vos revenus.",
        },
        {
          question: "Ma maison n'est pas raccordée au gaz : quelle solution ?",
          answer:
            "Si elle a un circuit d'eau chaude alimenté au fioul ou au propane, une PAC air-eau le reprend directement et ouvre droit aux aides les plus élevées. Si elle est chauffée par convecteurs, une PAC air-air est en général plus rentable.",
        },
        {
          question: "Où placer l'unité extérieure sur un grand terrain ?",
          answer:
            "Loin des limites de propriété et des fenêtres de chambre, sur une dalle ou des plots, à moins de 10 à 15 mètres du module intérieur pour limiter les pertes et le coût des liaisons. Les terrains de Chevry-Cossigny permettent presque toujours un emplacement sans gêne pour les voisins.",
        },
      ],
    },
  },
}

export function getPacLocalContent(slug: string): PacLocalContent | null {
  return PAC_LOCAL_CONTENT[slug] ?? null
}
