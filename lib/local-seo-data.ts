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
  {
    name: "Ozoir-la-Ferrière",
    slug: "ozoir-la-ferriere",
    postalCode: "77330",
    department: "Seine-et-Marne",
  },
  {
    name: "Roissy-en-Brie",
    slug: "roissy-en-brie",
    postalCode: "77680",
    department: "Seine-et-Marne",
  },
  {
    name: "Chevry-Cossigny",
    slug: "chevry-cossigny",
    postalCode: "77173",
    department: "Seine-et-Marne",
  },
  {
    name: "Lésigny",
    slug: "lesigny",
    postalCode: "77150",
    department: "Seine-et-Marne",
  },
  {
    name: "Pontault-Combault",
    slug: "pontault-combault",
    postalCode: "77340",
    department: "Seine-et-Marne",
  },
  {
    name: "Gretz-Armainvilliers",
    slug: "gretz-armainvilliers",
    postalCode: "77220",
    department: "Seine-et-Marne",
  },
  {
    name: "Tournan-en-Brie",
    slug: "tournan-en-brie",
    postalCode: "77220",
    department: "Seine-et-Marne",
  },
  {
    name: "Brie-Comte-Robert",
    slug: "brie-comte-robert",
    postalCode: "77170",
    department: "Seine-et-Marne",
  },
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
