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
  { name: "Dammarie-les-Lys", slug: "dammarie-les-lys", postalCode: "77190", department: "Seine-et-Marne" },
  { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere", postalCode: "77330", department: "Seine-et-Marne" },
  { name: "Lagny-sur-Marne", slug: "lagny-sur-marne", postalCode: "77400", department: "Seine-et-Marne" },
  // ---- Val-de-Marne (94) ----
  { name: "Créteil", slug: "creteil", postalCode: "94000", department: "Val-de-Marne" },
  { name: "Saint-Maur-des-Fossés", slug: "saint-maur-des-fosses", postalCode: "94100", department: "Val-de-Marne" },
  { name: "Champigny-sur-Marne", slug: "champigny-sur-marne", postalCode: "94500", department: "Val-de-Marne" },
  { name: "Maisons-Alfort", slug: "maisons-alfort", postalCode: "94700", department: "Val-de-Marne" },
  { name: "Vincennes", slug: "vincennes", postalCode: "94300", department: "Val-de-Marne" },
  // ---- Essonne (91) ----
  { name: "Évry-Courcouronnes", slug: "evry-courcouronnes", postalCode: "91000", department: "Essonne" },
  { name: "Massy", slug: "massy", postalCode: "91300", department: "Essonne" },
  { name: "Corbeil-Essonnes", slug: "corbeil-essonnes", postalCode: "91100", department: "Essonne" },
  { name: "Sainte-Geneviève-des-Bois", slug: "sainte-genevieve-des-bois", postalCode: "91700", department: "Essonne" },
  { name: "Viry-Châtillon", slug: "viry-chatillon", postalCode: "91170", department: "Essonne" },
  { name: "Athis-Mons", slug: "athis-mons", postalCode: "91200", department: "Essonne" },
  { name: "Palaiseau", slug: "palaiseau", postalCode: "91120", department: "Essonne" },
  // ---- Yvelines (78) ----
  { name: "Versailles", slug: "versailles", postalCode: "78000", department: "Yvelines" },
  { name: "Sartrouville", slug: "sartrouville", postalCode: "78500", department: "Yvelines" },
  { name: "Mantes-la-Jolie", slug: "mantes-la-jolie", postalCode: "78200", department: "Yvelines" },
  { name: "Saint-Germain-en-Laye", slug: "saint-germain-en-laye", postalCode: "78100", department: "Yvelines" },
  { name: "Conflans-Sainte-Honorine", slug: "conflans-sainte-honorine", postalCode: "78700", department: "Yvelines" },
  { name: "Poissy", slug: "poissy", postalCode: "78300", department: "Yvelines" },
  // ---- Seine-Saint-Denis (93) ----
  { name: "Noisy-le-Grand", slug: "noisy-le-grand", postalCode: "93160", department: "Seine-Saint-Denis" },
  { name: "Rosny-sous-Bois", slug: "rosny-sous-bois", postalCode: "93110", department: "Seine-Saint-Denis" },
  { name: "Livry-Gargan", slug: "livry-gargan", postalCode: "93190", department: "Seine-Saint-Denis" },
  // ---- Paris (75) ----
  { name: "Paris", slug: "paris", postalCode: "75000", department: "Paris" },
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
