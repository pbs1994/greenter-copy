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
  { name: "Meaux", slug: "meaux", postalCode: "77100", department: "Seine-et-Marne" },
  { name: "Chelles", slug: "chelles", postalCode: "77500", department: "Seine-et-Marne" },
  { name: "Melun", slug: "melun", postalCode: "77000", department: "Seine-et-Marne" },
  { name: "Pontault-Combault", slug: "pontault-combault", postalCode: "77340", department: "Seine-et-Marne" },
  { name: "Savigny-le-Temple", slug: "savigny-le-temple", postalCode: "77176", department: "Seine-et-Marne" },
  { name: "Torcy", slug: "torcy", postalCode: "77200", department: "Seine-et-Marne" },
  { name: "Combs-la-Ville", slug: "combs-la-ville", postalCode: "77380", department: "Seine-et-Marne" },
  { name: "Villeparisis", slug: "villeparisis", postalCode: "77270", department: "Seine-et-Marne" },
  { name: "Dammarie-les-Lys", slug: "dammarie-les-lys", postalCode: "77190", department: "Seine-et-Marne" },
  { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere", postalCode: "77330", department: "Seine-et-Marne" },
  { name: "Lagny-sur-Marne", slug: "lagny-sur-marne", postalCode: "77400", department: "Seine-et-Marne" },
  { name: "Roissy-en-Brie", slug: "roissy-en-brie", postalCode: "77680", department: "Seine-et-Marne" },
  { name: "Moissy-Cramayel", slug: "moissy-cramayel", postalCode: "77550", department: "Seine-et-Marne" },
  { name: "Brie-Comte-Robert", slug: "brie-comte-robert", postalCode: "77170", department: "Seine-et-Marne" },
  { name: "Lognes", slug: "lognes", postalCode: "77185", department: "Seine-et-Marne" },
  { name: "Noisiel", slug: "noisiel", postalCode: "77186", department: "Seine-et-Marne" },
  { name: "Le Mée-sur-Seine", slug: "le-mee-sur-seine", postalCode: "77350", department: "Seine-et-Marne" },
  { name: "Lieusaint", slug: "lieusaint", postalCode: "77127", department: "Seine-et-Marne" },
  { name: "Fontainebleau", slug: "fontainebleau", postalCode: "77300", department: "Seine-et-Marne" },
  { name: "Provins", slug: "provins", postalCode: "77160", department: "Seine-et-Marne" },
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
  { name: "Massy", slug: "massy", postalCode: "91300", department: "Essonne" },
  { name: "Corbeil-Essonnes", slug: "corbeil-essonnes", postalCode: "91100", department: "Essonne" },
  { name: "Sainte-Geneviève-des-Bois", slug: "sainte-genevieve-des-bois", postalCode: "91700", department: "Essonne" },
  { name: "Viry-Châtillon", slug: "viry-chatillon", postalCode: "91170", department: "Essonne" },
  { name: "Athis-Mons", slug: "athis-mons", postalCode: "91200", department: "Essonne" },
  { name: "Palaiseau", slug: "palaiseau", postalCode: "91120", department: "Essonne" },
  { name: "Yerres", slug: "yerres", postalCode: "91330", department: "Essonne" },
  { name: "Grigny", slug: "grigny", postalCode: "91350", department: "Essonne" },
  { name: "Ris-Orangis", slug: "ris-orangis", postalCode: "91130", department: "Essonne" },
  { name: "Les Ulis", slug: "les-ulis", postalCode: "91940", department: "Essonne" },
  { name: "Montgeron", slug: "montgeron", postalCode: "91230", department: "Essonne" },
  { name: "Longjumeau", slug: "longjumeau", postalCode: "91160", department: "Essonne" },
  { name: "Vigneux-sur-Seine", slug: "vigneux-sur-seine", postalCode: "91270", department: "Essonne" },
  { name: "Brunoy", slug: "brunoy", postalCode: "91800", department: "Essonne" },
  // ---- Yvelines (78) ----
  { name: "Versailles", slug: "versailles", postalCode: "78000", department: "Yvelines" },
  { name: "Sartrouville", slug: "sartrouville", postalCode: "78500", department: "Yvelines" },
  { name: "Mantes-la-Jolie", slug: "mantes-la-jolie", postalCode: "78200", department: "Yvelines" },
  { name: "Saint-Germain-en-Laye", slug: "saint-germain-en-laye", postalCode: "78100", department: "Yvelines" },
  { name: "Conflans-Sainte-Honorine", slug: "conflans-sainte-honorine", postalCode: "78700", department: "Yvelines" },
  { name: "Poissy", slug: "poissy", postalCode: "78300", department: "Yvelines" },
  { name: "Trappes", slug: "trappes", postalCode: "78190", department: "Yvelines" },
  { name: "Houilles", slug: "houilles", postalCode: "78800", department: "Yvelines" },
  { name: "Plaisir", slug: "plaisir", postalCode: "78370", department: "Yvelines" },
  { name: "Chatou", slug: "chatou", postalCode: "78400", department: "Yvelines" },
  { name: "Guyancourt", slug: "guyancourt", postalCode: "78280", department: "Yvelines" },
  { name: "Élancourt", slug: "elancourt", postalCode: "78990", department: "Yvelines" },
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
// Téléphones de l'entreprise (multi-lignes : commercial + technique)
// -----------------------------------------------------------------------------

export const COMPANY_PHONES = {
  // Ligne principale affichée sur le site (CTA, header, hero)
  primary: {
    raw: "+33766975099",
    display: "07 66 97 50 99",
    contactType: "customer service",
  },
  // Ligne secondaire (commercial / direction)
  secondary: {
    raw: "+33609455056",
    display: "06 09 45 50 56",
    contactType: "sales",
  },
} as const

// Conservé pour rétro-compatibilité — pointe vers la ligne principale
export const COMPANY_PHONE = COMPANY_PHONES.primary

// Tableau utilisable directement comme `contactPoint` schema.org
export const COMPANY_CONTACT_POINTS = [
  {
    "@type": "ContactPoint",
    telephone: COMPANY_PHONES.primary.raw,
    contactType: COMPANY_PHONES.primary.contactType,
    areaServed: "FR",
    availableLanguage: ["French"],
  },
  {
    "@type": "ContactPoint",
    telephone: COMPANY_PHONES.secondary.raw,
    contactType: COMPANY_PHONES.secondary.contactType,
    areaServed: "FR",
    availableLanguage: ["French"],
  },
] as const
