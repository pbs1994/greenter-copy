// =============================================================================
// Local SEO Data - Données centralisées pour l'optimisation SEO local Greenter
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface City {
  name: string
  slug: string
  postalCode: string
  department: string
}

export interface ServiceInfo {
  name: string
  slug: string
  shortDescription: string
}

// -----------------------------------------------------------------------------
// Villes de la zone de chalandise (Seine-et-Marne 77)
// -----------------------------------------------------------------------------

export const CITIES: City[] = [
  // ---- Seine-et-Marne (77) - Zone primaire ----
  { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere", postalCode: "77330", department: "Seine-et-Marne" },
  { name: "Roissy-en-Brie", slug: "roissy-en-brie", postalCode: "77680", department: "Seine-et-Marne" },
  { name: "Chevry-Cossigny", slug: "chevry-cossigny", postalCode: "77173", department: "Seine-et-Marne" },
  { name: "Lésigny", slug: "lesigny", postalCode: "77150", department: "Seine-et-Marne" },
  { name: "Pontault-Combault", slug: "pontault-combault", postalCode: "77340", department: "Seine-et-Marne" },
  { name: "Gretz-Armainvilliers", slug: "gretz-armainvilliers", postalCode: "77220", department: "Seine-et-Marne" },
  { name: "Tournan-en-Brie", slug: "tournan-en-brie", postalCode: "77220", department: "Seine-et-Marne" },
  { name: "Brie-Comte-Robert", slug: "brie-comte-robert", postalCode: "77170", department: "Seine-et-Marne" },
  { name: "Melun", slug: "melun", postalCode: "77000", department: "Seine-et-Marne" },
  { name: "Meaux", slug: "meaux", postalCode: "77100", department: "Seine-et-Marne" },
  { name: "Chelles", slug: "chelles", postalCode: "77500", department: "Seine-et-Marne" },
  { name: "Savigny-le-Temple", slug: "savigny-le-temple", postalCode: "77176", department: "Seine-et-Marne" },
  { name: "Torcy", slug: "torcy", postalCode: "77200", department: "Seine-et-Marne" },
  { name: "Combs-la-Ville", slug: "combs-la-ville", postalCode: "77380", department: "Seine-et-Marne" },
  { name: "Lognes", slug: "lognes", postalCode: "77185", department: "Seine-et-Marne" },
  { name: "Noisiel", slug: "noisiel", postalCode: "77186", department: "Seine-et-Marne" },
  { name: "Lagny-sur-Marne", slug: "lagny-sur-marne", postalCode: "77400", department: "Seine-et-Marne" },
  { name: "Villeparisis", slug: "villeparisis", postalCode: "77270", department: "Seine-et-Marne" },
  { name: "Moissy-Cramayel", slug: "moissy-cramayel", postalCode: "77550", department: "Seine-et-Marne" },
  { name: "Dammarie-les-Lys", slug: "dammarie-les-lys", postalCode: "77190", department: "Seine-et-Marne" },
  { name: "Le Mée-sur-Seine", slug: "le-mee-sur-seine", postalCode: "77350", department: "Seine-et-Marne" },
  { name: "Cesson", slug: "cesson", postalCode: "77240", department: "Seine-et-Marne" },
  { name: "Servon", slug: "servon", postalCode: "77170", department: "Seine-et-Marne" },
  { name: "Lieusaint", slug: "lieusaint", postalCode: "77127", department: "Seine-et-Marne" },
  { name: "Sénart", slug: "senart", postalCode: "77127", department: "Seine-et-Marne" },
  // ---- Val-de-Marne (94) ----
  { name: "Créteil", slug: "creteil", postalCode: "94000", department: "Val-de-Marne" },
  { name: "Maisons-Alfort", slug: "maisons-alfort", postalCode: "94700", department: "Val-de-Marne" },
  { name: "Saint-Maur-des-Fossés", slug: "saint-maur-des-fosses", postalCode: "94100", department: "Val-de-Marne" },
  { name: "Champigny-sur-Marne", slug: "champigny-sur-marne", postalCode: "94500", department: "Val-de-Marne" },
  { name: "Vincennes", slug: "vincennes", postalCode: "94300", department: "Val-de-Marne" },
  { name: "Nogent-sur-Marne", slug: "nogent-sur-marne", postalCode: "94130", department: "Val-de-Marne" },
  { name: "Sucy-en-Brie", slug: "sucy-en-brie", postalCode: "94370", department: "Val-de-Marne" },
  { name: "Ormesson-sur-Marne", slug: "ormesson-sur-marne", postalCode: "94490", department: "Val-de-Marne" },
  { name: "Boissy-Saint-Léger", slug: "boissy-saint-leger", postalCode: "94470", department: "Val-de-Marne" },
  { name: "Villeneuve-Saint-Georges", slug: "villeneuve-saint-georges", postalCode: "94190", department: "Val-de-Marne" },
  // ---- Essonne (91) ----
  { name: "Évry-Courcouronnes", slug: "evry-courcouronnes", postalCode: "91000", department: "Essonne" },
  { name: "Corbeil-Essonnes", slug: "corbeil-essonnes", postalCode: "91100", department: "Essonne" },
  { name: "Yerres", slug: "yerres", postalCode: "91330", department: "Essonne" },
  { name: "Brunoy", slug: "brunoy", postalCode: "91800", department: "Essonne" },
  { name: "Montgeron", slug: "montgeron", postalCode: "91230", department: "Essonne" },
  { name: "Vigneux-sur-Seine", slug: "vigneux-sur-seine", postalCode: "91270", department: "Essonne" },
  // ---- Seine-Saint-Denis (93) ----
  { name: "Noisy-le-Grand", slug: "noisy-le-grand", postalCode: "93160", department: "Seine-Saint-Denis" },
  { name: "Livry-Gargan", slug: "livry-gargan", postalCode: "93190", department: "Seine-Saint-Denis" },
  { name: "Gagny", slug: "gagny", postalCode: "93220", department: "Seine-Saint-Denis" },
  { name: "Montfermeil", slug: "montfermeil", postalCode: "93370", department: "Seine-Saint-Denis" },
  { name: "Le Raincy", slug: "le-raincy", postalCode: "93340", department: "Seine-Saint-Denis" },
  { name: "Villemomble", slug: "villemomble", postalCode: "93250", department: "Seine-Saint-Denis" },
  { name: "Rosny-sous-Bois", slug: "rosny-sous-bois", postalCode: "93110", department: "Seine-Saint-Denis" },
  // ---- Paris (75) ----
  { name: "Paris", slug: "paris", postalCode: "75000", department: "Paris" },
  { name: "Paris 20e", slug: "paris-20", postalCode: "75020", department: "Paris" },
  { name: "Paris 12e", slug: "paris-12", postalCode: "75012", department: "Paris" },
  { name: "Paris 11e", slug: "paris-11", postalCode: "75011", department: "Paris" },
]

// -----------------------------------------------------------------------------
// Services proposés par Greenter
// -----------------------------------------------------------------------------

export const SERVICES: ServiceInfo[] = [
  {
    name: "Pompe à chaleur",
    slug: "pompe-a-chaleur",
    shortDescription: "Installation PAC air-eau et air-air",
  },
  {
    name: "Panneaux solaires",
    slug: "panneaux-solaires",
    shortDescription: "Installation de panneaux solaires photovoltaïques",
  },
  {
    name: "Isolation",
    slug: "isolation",
    shortDescription: "Isolation thermique des combles, murs et planchers",
  },
  {
    name: "Audit énergétique",
    slug: "audit",
    shortDescription: "Audit et diagnostic de performance énergétique",
  },
  {
    name: "Maintenance",
    slug: "maintenance",
    shortDescription: "Entretien et maintenance des équipements",
  },
]

// -----------------------------------------------------------------------------
// Constantes Google (Place ID, URLs)
// -----------------------------------------------------------------------------

export const GOOGLE_PLACE_ID = "ChIJ18W1Jb2UBkMRQ0A08rwo42U"

export const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`

// URL pour voir tous les avis Google (ouvre directement l'onglet avis)
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`

// URL pour laisser un avis Google
export const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`

// -----------------------------------------------------------------------------
// Adresse de l'entreprise avec coordonnées GPS
// -----------------------------------------------------------------------------

export const COMPANY_ADDRESS = {
  locality: "Ozoir-la-Ferrière",
  postalCode: "77330",
  country: "FR",
  latitude: 48.7626,
  longitude: 2.6721,
} as const

// -----------------------------------------------------------------------------
// Téléphone de l'entreprise
// -----------------------------------------------------------------------------

export const COMPANY_PHONE = {
  raw: "+33766975099",        // Format international pour les liens tel:
  display: "07 66 97 50 99",  // Format d'affichage
} as const
