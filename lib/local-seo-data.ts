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

// Sous-ensemble prioritaire pour le sitemap (crawl budget concentré sur les villes
// les plus recherchées). Les autres pages existent mais ne sont pas soumises à Google.
const SITEMAP_CITY_SLUGS = new Set([
  // Tier 1 — grandes villes / chefs-lieux
  'paris', 'versailles', 'creteil', 'vincennes', 'saint-maur-des-fosses',
  'champigny-sur-marne', 'meaux', 'melun', 'noisy-le-grand', 'evry-courcouronnes',
  // Tier 2 — villes moyennes à fort potentiel
  'chelles', 'maisons-alfort', 'massy', 'corbeil-essonnes', 'pontault-combault',
])
export const SITEMAP_CITIES: City[] = CITIES.filter(c => SITEMAP_CITY_SLUGS.has(c.slug))

// -----------------------------------------------------------------------------
// Villes supplémentaires pour le seul cluster pompe à chaleur
// -----------------------------------------------------------------------------
// Les autres services (isolation, solaire, audit) restent sur CITIES : ajouter
// une ville ici ne crée qu'une page /services/pompe-a-chaleur/<ville>, pas
// quatre pages quasi identiques. Chaque ville ajoutée doit avoir une fiche
// dans lib/city-data.ts ET un contenu local dans lib/pac-local-content.ts.
// Partie 1 (nov. 2026) : couronne immédiate autour de l'agence d'Ozoir.
export const PAC_EXTRA_CITIES: City[] = [
  { name: "Roissy-en-Brie", slug: "roissy-en-brie", postalCode: "77680", department: "Seine-et-Marne" },
  { name: "Lésigny", slug: "lesigny", postalCode: "77150", department: "Seine-et-Marne" },
  { name: "Gretz-Armainvilliers", slug: "gretz-armainvilliers", postalCode: "77220", department: "Seine-et-Marne" },
  { name: "Tournan-en-Brie", slug: "tournan-en-brie", postalCode: "77220", department: "Seine-et-Marne" },
  { name: "Brie-Comte-Robert", slug: "brie-comte-robert", postalCode: "77170", department: "Seine-et-Marne" },
  { name: "Chevry-Cossigny", slug: "chevry-cossigny", postalCode: "77173", department: "Seine-et-Marne" },
]

export const PAC_CITIES: City[] = [...CITIES, ...PAC_EXTRA_CITIES]

// Sitemap PAC : villes prioritaires communes + toutes les villes PAC dédiées
export const PAC_SITEMAP_CITIES: City[] = [...SITEMAP_CITIES, ...PAC_EXTRA_CITIES]

const CITY_SLUGS = new Set(CITIES.map(c => c.slug))
/** true si la ville a aussi des pages isolation / solaire / audit */
export function hasAllServicePages(slug: string): boolean {
  return CITY_SLUGS.has(slug)
}

// -----------------------------------------------------------------------------
// Coordonnées (centre de la commune, geo.api.gouv.fr) — pour « villes voisines »
// -----------------------------------------------------------------------------
export const CITY_COORDS: Record<string, [number, number]> = {
  "meaux": [48.9573, 2.9035], "chelles": [48.8845, 2.5954], "melun": [48.5421, 2.6552],
  "pontault-combault": [48.7885, 2.6173], "savigny-le-temple": [48.5846, 2.5759],
  "torcy": [48.8534, 2.6476], "combs-la-ville": [48.6602, 2.5765],
  "dammarie-les-lys": [48.5147, 2.6199], "ozoir-la-ferriere": [48.7631, 2.6753],
  "lagny-sur-marne": [48.8716, 2.7045], "creteil": [48.7845, 2.4523],
  "saint-maur-des-fosses": [48.7999, 2.4921], "champigny-sur-marne": [48.8173, 2.5206],
  "maisons-alfort": [48.8017, 2.44], "vincennes": [48.8471, 2.4383],
  "evry-courcouronnes": [48.6287, 2.4313], "massy": [48.7263, 2.2696],
  "corbeil-essonnes": [48.5973, 2.4646], "sainte-genevieve-des-bois": [48.643, 2.3272],
  "viry-chatillon": [48.6662, 2.3758], "athis-mons": [48.7093, 2.3848],
  "palaiseau": [48.7155, 2.2293], "versailles": [48.8039, 2.1191],
  "sartrouville": [48.9374, 2.1744], "mantes-la-jolie": [48.9961, 1.6918],
  "saint-germain-en-laye": [48.931, 2.1052], "conflans-sainte-honorine": [49.0016, 2.0992],
  "poissy": [48.9241, 2.025], "noisy-le-grand": [48.8327, 2.556],
  "rosny-sous-bois": [48.8744, 2.4872], "livry-gargan": [48.9184, 2.5351],
  "paris": [48.8566, 2.3522], "roissy-en-brie": [48.7913, 2.6647],
  "brie-comte-robert": [48.6904, 2.6131], "lesigny": [48.748, 2.6182],
  "gretz-armainvilliers": [48.7536, 2.7272], "tournan-en-brie": [48.741, 2.7769],
  "chevry-cossigny": [48.7209, 2.6747],
}

/** Distance à vol d'oiseau en km entre deux communes (null si inconnue). */
export function distanceKm(a: string, b: string): number | null {
  const pa = CITY_COORDS[a]
  const pb = CITY_COORDS[b]
  if (!pa || !pb) return null
  const rad = (d: number) => (d * Math.PI) / 180
  const dLat = rad(pb[0] - pa[0])
  const dLon = rad(pb[1] - pa[1])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(pa[0])) * Math.cos(rad(pb[0])) * Math.sin(dLon / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

/** Les `count` villes les plus proches de `slug` dans `pool`. */
export function nearestCities(slug: string, pool: City[], count = 8): City[] {
  return pool
    .filter(c => c.slug !== slug)
    .map(c => ({ c, d: distanceKm(slug, c.slug) ?? Number.POSITIVE_INFINITY }))
    .sort((x, y) => x.d - y.d)
    .slice(0, count)
    .map(x => x.c)
}

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
    raw: "+33609455056",
    display: "06 09 45 50 56",
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
