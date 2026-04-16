// =============================================================================
// Données enrichies par ville — Sources : INSEE 2022, ADEME, Météo France
// =============================================================================

export interface CityData {
  slug: string
  population: number
  logements: number
  pctMaisons: number
  dpeMoyen: string
  zoneClimatique: string
  dju: number
  anneeConstruction: string
  caracteristique: string
  economieChauffage: string
  potentielSolaire: string
}

export function getCityData(slug: string): CityData | null {
  return CITIES_DATA[slug] || null
}

export const CITIES_DATA: Record<string, CityData> = {
  // ---- Seine-et-Marne (77) - Zone primaire ----
  "ozoir-la-ferriere": {
    slug: "ozoir-la-ferriere", population: 21000, logements: 8200, pctMaisons: 78,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1990",
    caracteristique: "Commune pavillonnaire de Grande Couronne avec un parc de maisons individuelles des années 70-90, souvent chauffées au gaz. Cadre verdoyant proche de la forêt de Rougeau, idéal pour les PAC air-eau.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon"
  },
  "roissy-en-brie": {
    slug: "roissy-en-brie", population: 24000, logements: 9100, pctMaisons: 72,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1995",
    caracteristique: "Ville résidentielle avec de nombreux pavillons des années 80. Forte proportion de chauffage au gaz individuel. Proximité du RER E facilitant l'accès aux artisans.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "chevry-cossigny": {
    slug: "chevry-cossigny", population: 3200, logements: 1200, pctMaisons: 88,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1980-2000",
    caracteristique: "Petit village rural très pavillonnaire entre Brie-Comte-Robert et Ozoir. Maisons avec grands jardins et terrains spacieux, parfaits pour l'implantation d'unités extérieures PAC.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon"
  },
  "lesigny": {
    slug: "lesigny", population: 8000, logements: 3100, pctMaisons: 82,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1995",
    caracteristique: "Commune verte avec golf et espaces boisés. Parc immobilier dominé par des pavillons familiaux des années 80, souvent équipés de chaudières gaz vieillissantes à remplacer.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon"
  },
  "pontault-combault": {
    slug: "pontault-combault", population: 38000, logements: 14800, pctMaisons: 68,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1990",
    caracteristique: "Grande commune mixte avec zones pavillonnaires et petits collectifs. Centre commercial dynamique. Beaucoup de maisons des années 70 avec isolation d'origine à rénover.",
    economieChauffage: "850€ à 1 200€", potentielSolaire: "Bon"
  },
  "gretz-armainvilliers": {
    slug: "gretz-armainvilliers", population: 9500, logements: 3700, pctMaisons: 75,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1960-1990",
    caracteristique: "Bourg ancien avec extension pavillonnaire, proche de la forêt d'Armainvilliers. Maisons anciennes avec déperditions thermiques importantes, fort potentiel de rénovation énergétique.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon"
  },
  "tournan-en-brie": {
    slug: "tournan-en-brie", population: 9000, logements: 3500, pctMaisons: 73,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1970-2000",
    caracteristique: "Bourg historique de la Brie avec un marché réputé. Mélange de maisons anciennes en centre-ville et pavillons récents en périphérie. Gare Transilien facilitant les interventions.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon"
  },
  "brie-comte-robert": {
    slug: "brie-comte-robert", population: 18000, logements: 7000, pctMaisons: 70,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville médiévale avec château classé et centre historique. Extensions pavillonnaires des années 80-90. Proximité de l'A5 et de Sénart, bassin de vie en pleine croissance.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "melun": {
    slug: "melun", population: 41000, logements: 19500, pctMaisons: 42,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "avant 1975",
    caracteristique: "Préfecture de Seine-et-Marne avec un centre-ville dense et ancien. Quartiers pavillonnaires en périphérie. Important parc de logements anciens mal isolés, gros potentiel de rénovation.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "meaux": {
    slug: "meaux", population: 56000, logements: 24000, pctMaisons: 38,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2700, anneeConstruction: "avant 1975",
    caracteristique: "Sous-préfecture historique au bord de la Marne. Cathédrale et musée Bossuet. Mélange de collectifs et pavillons. Zone plus froide du nord Seine-et-Marne, consommation chauffage élevée.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon"
  },
  "chelles": {
    slug: "chelles", population: 55000, logements: 22000, pctMaisons: 52,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1990",
    caracteristique: "Grande ville à la limite de la Seine-Saint-Denis, bien desservie par le RER E. Quartiers pavillonnaires variés et grands ensembles. Fort besoin de rénovation du parc ancien.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "savigny-le-temple": {
    slug: "savigny-le-temple", population: 32000, logements: 11500, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville nouvelle de Sénart avec un parc immobilier relativement récent. Mélange équilibré de maisons et petits collectifs. Bonnes performances énergétiques mais potentiel solaire intéressant.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon"
  },
  "torcy": {
    slug: "torcy", population: 23000, logements: 9500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1995",
    caracteristique: "Ville de Marne-la-Vallée proche de Disneyland Paris. Base de loisirs et plan d'eau. Quartiers résidentiels avec pavillons et petits immeubles, souvent chauffés électriquement.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "combs-la-ville": {
    slug: "combs-la-ville", population: 23000, logements: 8800, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1970-1995",
    caracteristique: "Commune résidentielle de Sénart avec un tissu pavillonnaire dense. Gare RER D et proximité de la Francilienne. Nombreuses maisons des années 70-80 avec chaudières gaz à remplacer.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "lognes": {
    slug: "lognes", population: 15000, logements: 6000, pctMaisons: 48,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1980-2000",
    caracteristique: "Ville nouvelle de Marne-la-Vallée, urbanisme moderne. Parc immobilier plus récent que la moyenne avec des normes d'isolation correctes. Potentiel fort pour le solaire photovoltaïque.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon"
  },
  "noisiel": {
    slug: "noisiel", population: 16000, logements: 6200, pctMaisons: 40,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-1990",
    caracteristique: "Ancienne cité ouvrière Menier, patrimoine industriel classé. Ville de Marne-la-Vallée avec un mélange de logements sociaux et pavillons. Chocolaterie historique reconvertie.",
    economieChauffage: "750€ à 1 150€", potentielSolaire: "Bon"
  },
  "lagny-sur-marne": {
    slug: "lagny-sur-marne", population: 22000, logements: 9200, pctMaisons: 50,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "avant 1975",
    caracteristique: "Cité médiévale au bord de la Marne avec un centre historique pittoresque. Mélange de maisons de ville anciennes et pavillons en périphérie. Fort potentiel de rénovation thermique.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "villeparisis": {
    slug: "villeparisis", population: 27000, logements: 10500, pctMaisons: 58,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2650, anneeConstruction: "1965-1990",
    caracteristique: "Commune en bordure du canal de l'Ourcq, entre Seine-et-Marne et Seine-Saint-Denis. Quartiers pavillonnaires étendus avec maisons des années 70, souvent chauffées au fioul ou gaz.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon"
  },
  "moissy-cramayel": {
    slug: "moissy-cramayel", population: 19000, logements: 7200, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Ville de Sénart avec zones d'activités importantes. Parc résidentiel mixte, quartiers pavillonnaires et collectifs récents. Proximité A5 et Francilienne.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "dammarie-les-lys": {
    slug: "dammarie-les-lys", population: 23000, logements: 9800, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1985",
    caracteristique: "Limitrophe de Melun, en bord de Seine. Base de loisirs et forêt de Fontainebleau à proximité. Logements des années 60-80 nécessitant une rénovation thermique globale.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "le-mee-sur-seine": {
    slug: "le-mee-sur-seine", population: 21000, logements: 8800, pctMaisons: 40,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1960-1985",
    caracteristique: "Ville résidentielle en bord de Seine, proche de Melun. Grands ensembles et quartiers pavillonnaires. Programme de rénovation urbaine en cours, opportunité pour la transition énergétique.",
    economieChauffage: "800€ à 1 250€", potentielSolaire: "Bon"
  },
  "cesson": {
    slug: "cesson", population: 10000, logements: 4000, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1975-2000",
    caracteristique: "Petite commune entre Melun et Sénart avec un caractère semi-rural préservé. Pavillons avec jardins et quelques résidences récentes. Calme et verdoyant.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "servon": {
    slug: "servon", population: 3500, logements: 1400, pctMaisons: 85,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1980-2005",
    caracteristique: "Village pavillonnaire entre Brie-Comte-Robert et Lésigny. Zone commerciale importante. Maisons récentes avec jardins, bon ensoleillement pour le photovoltaïque.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon"
  },
  "lieusaint": {
    slug: "lieusaint", population: 14000, logements: 5200, pctMaisons: 50,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1990-2010",
    caracteristique: "Ville nouvelle de Sénart avec le centre commercial Carré Sénart. Parc immobilier récent et bien isolé. Fort développement urbain avec écoquartiers.",
    economieChauffage: "650€ à 1 000€", potentielSolaire: "Bon"
  },
  "senart": {
    slug: "senart", population: 120000, logements: 45000, pctMaisons: 52,
    dpeMoyen: "C", zoneClimatique: "H1a", dju: 2600, anneeConstruction: "1985-2010",
    caracteristique: "Ville nouvelle regroupant 8 communes au sud de la Seine-et-Marne. Urbanisme planifié avec espaces verts. Parc immobilier parmi les plus récents d'Île-de-France.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon"
  },
  // ---- Val-de-Marne (94) ----
  "creteil": {
    slug: "creteil", population: 92000, logements: 40000, pctMaisons: 18,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1980",
    caracteristique: "Préfecture du Val-de-Marne, lac et base de loisirs. Architecture des années 70 avec grands ensembles et dalles. Quartiers pavillonnaires au sud. Université Paris-Est.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon"
  },
  "maisons-alfort": {
    slug: "maisons-alfort", population: 56000, logements: 27000, pctMaisons: 25,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville dense en bord de Marne et Seine. École vétérinaire historique. Immeubles anciens et pavillons en quartier Charentonneau. Fort potentiel de rénovation des copropriétés.",
    economieChauffage: "750€ à 1 100€", potentielSolaire: "Bon"
  },
  "saint-maur-des-fosses": {
    slug: "saint-maur-des-fosses", population: 78000, logements: 35000, pctMaisons: 58,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle prisée dans la boucle de la Marne. Nombreux pavillons bourgeois avec jardins. Parc immobilier ancien mais bien entretenu. Forte demande en rénovation énergétique haut de gamme.",
    economieChauffage: "950€ à 1 500€", potentielSolaire: "Bon"
  },
  "champigny-sur-marne": {
    slug: "champigny-sur-marne", population: 77000, logements: 31000, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1985",
    caracteristique: "Grande ville du Val-de-Marne en bord de Marne. Quartiers pavillonnaires (Le Plant, Coeuilly) et grands ensembles. Arrivée du Grand Paris Express dynamisera la rénovation.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "vincennes": {
    slug: "vincennes", population: 50000, logements: 28000, pctMaisons: 12,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Ville dense limitrophe de Paris avec le célèbre château et bois de Vincennes. Immeubles anciens haussmanniens et art déco. Rénovation en copropriété avec PAC collective adaptée.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon"
  },
  "nogent-sur-marne": {
    slug: "nogent-sur-marne", population: 33000, logements: 17000, pctMaisons: 30,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville élégante en bord de Marne, connue pour ses guinguettes. Pavillons cossus et immeubles de standing. Clientèle sensible à la transition écologique et au confort thermique.",
    economieChauffage: "850€ à 1 350€", potentielSolaire: "Bon"
  },
  "sucy-en-brie": {
    slug: "sucy-en-brie", population: 27000, logements: 10500, pctMaisons: 65,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Commune résidentielle verdoyante avec fort de Sucy et parc du château. Quartiers pavillonnaires prisés des familles. Maisons des années 70-90 avec chaudières gaz à remplacer.",
    economieChauffage: "900€ à 1 300€", potentielSolaire: "Bon"
  },
  "ormesson-sur-marne": {
    slug: "ormesson-sur-marne", population: 10000, logements: 4200, pctMaisons: 72,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1975-2000",
    caracteristique: "Petite ville pavillonnaire et boisée au charme résidentiel. Lac et parc du château. Maisons avec jardins spacieux, population aisée investissant dans la rénovation énergétique.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon"
  },
  "boissy-saint-leger": {
    slug: "boissy-saint-leger", population: 17000, logements: 6800, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Terminus du RER A, porte d'entrée de la Brie. Mélange de pavillons et de résidences. Proximité du bois Notre-Dame. Forte demande de remplacement de chaudières anciennes.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "villeneuve-saint-georges": {
    slug: "villeneuve-saint-georges", population: 34000, logements: 14000, pctMaisons: 35,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville en confluent Seine-Yerres avec un important parc ancien. Programme ANRU de renouvellement urbain. Logements énergivores avec DPE moyen E, priorité nationale de rénovation.",
    economieChauffage: "1 000€ à 1 500€", potentielSolaire: "Bon"
  },
  // ---- Essonne (91) ----
  "evry-courcouronnes": {
    slug: "evry-courcouronnes", population: 67000, logements: 27000, pctMaisons: 32,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Préfecture de l'Essonne, ville nouvelle avec cathédrale contemporaine. Grands ensembles et quartiers pavillonnaires. Université Paris-Saclay à proximité. Fort enjeu de transition énergétique.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "corbeil-essonnes": {
    slug: "corbeil-essonnes", population: 52000, logements: 22000, pctMaisons: 35,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville historique au confluent Seine-Essonne. Patrimoine industriel (imprimeries). Parc ancien nécessitant rénovation thermique. Programme de renouvellement urbain en cours.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "yerres": {
    slug: "yerres", population: 30000, logements: 12500, pctMaisons: 62,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1970-1995",
    caracteristique: "Ville verte en bord de l'Yerres, propriété Caillebotte. Quartiers pavillonnaires prisés avec jardins. Population sensible à l'environnement, forte demande en solutions vertes.",
    economieChauffage: "900€ à 1 350€", potentielSolaire: "Bon"
  },
  "brunoy": {
    slug: "brunoy", population: 26000, logements: 11000, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle en vallée de l'Yerres, forêt de Sénart. Pavillons anciens et résidences. Gare RER D bien desservie. Patrimoine bâti ancien avec fort besoin d'isolation.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "montgeron": {
    slug: "montgeron", population: 24000, logements: 10200, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Ville connue pour le départ du Tour de France cycliste. Bords de l'Yerres et forêt de Sénart. Pavillons des années 60-70 avec chauffage au fioul encore fréquent à convertir.",
    economieChauffage: "950€ à 1 400€", potentielSolaire: "Bon"
  },
  "vigneux-sur-seine": {
    slug: "vigneux-sur-seine", population: 32000, logements: 12500, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1990",
    caracteristique: "Ville en bord de Seine avec lac Daumesnil et base de loisirs. Quartiers pavillonnaires et collectifs. Proximité A6 et RER D. Parc des années 60-80 à rénover.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  // ---- Seine-Saint-Denis (93) ----
  "noisy-le-grand": {
    slug: "noisy-le-grand", population: 67000, logements: 27000, pctMaisons: 38,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1975-1995",
    caracteristique: "Ville de Marne-la-Vallée avec les Arènes de Picasso et le Palacio d'Abraxas (architectures postmodernes). Mélange de grands ensembles et pavillons. RER A et futur Grand Paris Express.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "livry-gargan": {
    slug: "livry-gargan", population: 45000, logements: 18000, pctMaisons: 55,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1960-1990",
    caracteristique: "Commune résidentielle en lisière de la forêt de Bondy. Importante proportion de pavillons des années 60-80. Abbaye de Livry historique. Forte demande de rénovation chauffage.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "gagny": {
    slug: "gagny", population: 40000, logements: 16000, pctMaisons: 50,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1960-1990",
    caracteristique: "Ville sur les coteaux dominant la Marne. Forêt de Bondy et parc forestier de la Poudrerie. Quartiers pavillonnaires sur les hauteurs, collectifs en vallée. Vue dégagée pour le solaire.",
    economieChauffage: "850€ à 1 250€", potentielSolaire: "Bon"
  },
  "montfermeil": {
    slug: "montfermeil", population: 27000, logements: 9500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "1965-1990",
    caracteristique: "Ville perchée sur les hauteurs avec vue sur Paris. Citée dans Les Misérables de Hugo. Grands programmes de rénovation urbaine ANRU. Transition énergétique des copropriétés en cours.",
    economieChauffage: "850€ à 1 300€", potentielSolaire: "Bon"
  },
  "le-raincy": {
    slug: "le-raincy", population: 15000, logements: 7000, pctMaisons: 48,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2550, anneeConstruction: "avant 1975",
    caracteristique: "Surnommée le Neuilly de la Seine-Saint-Denis. Église Notre-Dame classée, allée du Château. Villas et pavillons bourgeois avec jardins. Clientèle exigeante en rénovation premium.",
    economieChauffage: "900€ à 1 400€", potentielSolaire: "Bon"
  },
  "villemomble": {
    slug: "villemomble", population: 30000, logements: 13500, pctMaisons: 45,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Ville résidentielle entre Raincy et Rosny. Pavillons anciens et résidences. Parc Lefèvre et allées arborées. Population familiale investissant dans le confort thermique.",
    economieChauffage: "800€ à 1 200€", potentielSolaire: "Bon"
  },
  "rosny-sous-bois": {
    slug: "rosny-sous-bois", population: 46000, logements: 20000, pctMaisons: 35,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "1960-1990",
    caracteristique: "Ville dynamique avec centre commercial Rosny 2 et Domus. Fort de Rosny. Mélange de collectifs et pavillons. Futur Grand Paris Express boostera la valorisation immobilière.",
    economieChauffage: "800€ à 1 150€", potentielSolaire: "Bon"
  },
  // ---- Paris (75) ----
  "paris": {
    slug: "paris", population: 2133000, logements: 1380000, pctMaisons: 2,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Capitale avec un parc immobilier très ancien, majoritairement haussmannien. 85% des logements classés D, E ou F. Obligation de rénovation des passoires thermiques d'ici 2034.",
    economieChauffage: "700€ à 1 100€", potentielSolaire: "Bon"
  },
  "paris-20": {
    slug: "paris-20", population: 195000, logements: 105000, pctMaisons: 3,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Arrondissement populaire de l'Est parisien, Père-Lachaise et Belleville. Immeubles faubouriens et petits collectifs. Siège de Greenter au 38 rue de Ménilmontant. Forte densité.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon"
  },
  "paris-12": {
    slug: "paris-12", population: 143000, logements: 80000, pctMaisons: 4,
    dpeMoyen: "D", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1975",
    caracteristique: "Arrondissement entre Bastille et Bois de Vincennes. Coulée verte et viaduc des Arts. Mélange d'immeubles anciens et de constructions des années 60-70. Bercy Village.",
    economieChauffage: "700€ à 1 050€", potentielSolaire: "Bon"
  },
  "paris-11": {
    slug: "paris-11", population: 147000, logements: 88000, pctMaisons: 2,
    dpeMoyen: "E", zoneClimatique: "H1a", dju: 2500, anneeConstruction: "avant 1948",
    caracteristique: "Arrondissement très dense autour de Bastille, Oberkampf et République. Immeubles anciens avec cours intérieures. Forte demande de rénovation énergétique en copropriété.",
    economieChauffage: "700€ à 1 000€", potentielSolaire: "Bon"
  },
}
