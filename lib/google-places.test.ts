// =============================================================================
// Tests for lib/google-places.ts
// =============================================================================

import {
  fetchGoogleReviews,
  transformGoogleResponse,
  GooglePlaceDetails,
  GoogleReviewsResponse,
} from "./google-places"
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from "./local-seo-data"

// -----------------------------------------------------------------------------
// Mock fetch globally
// -----------------------------------------------------------------------------

const originalFetch = global.fetch

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  global.fetch = originalFetch
})

// -----------------------------------------------------------------------------
// Sample data
// -----------------------------------------------------------------------------

const sampleGooglePlaceDetails: GooglePlaceDetails = {
  rating: 4.8,
  userRatingCount: 23,
  reviews: [
    {
      name: "places/ChIJ18W1Jb2UBkgRQ0A08rwoyGU/reviews/abc123",
      relativePublishTimeDescription: "il y a 2 semaines",
      rating: 5,
      text: {
        text: "Excellent travail, équipe très professionnelle.",
        languageCode: "fr",
      },
      authorAttribution: {
        displayName: "Jean Dupont",
        uri: "https://www.google.com/maps/contrib/123",
        photoUri: "https://lh3.googleusercontent.com/photo123",
      },
      publishTime: "2024-01-15T10:30:00Z",
    },
    {
      name: "places/ChIJ18W1Jb2UBkgRQ0A08rwoyGU/reviews/def456",
      relativePublishTimeDescription: "il y a 1 mois",
      rating: 4,
      text: {
        text: "Bon service, je recommande.",
        languageCode: "fr",
      },
      authorAttribution: {
        displayName: "Marie Martin",
        uri: "https://www.google.com/maps/contrib/456",
        photoUri: "https://lh3.googleusercontent.com/photo456",
      },
      publishTime: "2024-01-01T08:00:00Z",
    },
  ],
}

// -----------------------------------------------------------------------------
// transformGoogleResponse tests
// -----------------------------------------------------------------------------

describe("transformGoogleResponse", () => {
  it("should transform Google Place details into normalized response", () => {
    const result = transformGoogleResponse(sampleGooglePlaceDetails)

    expect(result.rating).toBe(4.8)
    expect(result.reviewCount).toBe(23)
    expect(result.reviews).toHaveLength(2)
    expect(result.googleMapsUrl).toBe(GOOGLE_MAPS_URL)
    expect(result.writeReviewUrl).toBe(GOOGLE_REVIEW_URL)
  })

  it("should correctly map review fields", () => {
    const result = transformGoogleResponse(sampleGooglePlaceDetails)
    const firstReview = result.reviews[0]

    expect(firstReview.authorName).toBe("Jean Dupont")
    expect(firstReview.authorPhoto).toBe(
      "https://lh3.googleusercontent.com/photo123"
    )
    expect(firstReview.rating).toBe(5)
    expect(firstReview.text).toBe(
      "Excellent travail, équipe très professionnelle."
    )
    expect(firstReview.relativeTime).toBe("il y a 2 semaines")
    expect(firstReview.publishTime).toBe("2024-01-15T10:30:00Z")
  })

  it("should handle empty reviews array", () => {
    const data: GooglePlaceDetails = {
      rating: 4.5,
      userRatingCount: 0,
      reviews: [],
    }

    const result = transformGoogleResponse(data)

    expect(result.rating).toBe(4.5)
    expect(result.reviewCount).toBe(0)
    expect(result.reviews).toEqual([])
  })

  it("should handle undefined reviews gracefully", () => {
    const data = {
      rating: 4.0,
      userRatingCount: 5,
    } as GooglePlaceDetails

    const result = transformGoogleResponse(data)

    expect(result.rating).toBe(4.0)
    expect(result.reviewCount).toBe(5)
    expect(result.reviews).toEqual([])
  })
})

// -----------------------------------------------------------------------------
// fetchGoogleReviews tests
// -----------------------------------------------------------------------------

describe("fetchGoogleReviews", () => {
  it("should return default data when API key is missing", async () => {
    delete process.env.GOOGLE_PLACES_API_KEY
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    const result = await fetchGoogleReviews()

    expect(result.rating).toBe(4.8)
    expect(result.reviewCount).toBe(20)
    expect(result.reviews).toEqual([])
    expect(result.googleMapsUrl).toBe(GOOGLE_MAPS_URL)
    expect(result.writeReviewUrl).toBe(GOOGLE_REVIEW_URL)
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("GOOGLE_PLACES_API_KEY manquante")
    )

    consoleSpy.mockRestore()
  })

  it("should call Google Places API with correct parameters", async () => {
    process.env.GOOGLE_PLACES_API_KEY = "test-api-key"

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(sampleGooglePlaceDetails),
    })

    await fetchGoogleReviews()

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("places.googleapis.com/v1/places/"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "X-Goog-Api-Key": "test-api-key",
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        }),
      })
    )

    delete process.env.GOOGLE_PLACES_API_KEY
  })

  it("should return transformed data on successful API call", async () => {
    process.env.GOOGLE_PLACES_API_KEY = "test-api-key"

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(sampleGooglePlaceDetails),
    })

    const result = await fetchGoogleReviews()

    expect(result.rating).toBe(4.8)
    expect(result.reviewCount).toBe(23)
    expect(result.reviews).toHaveLength(2)
    expect(result.reviews[0].authorName).toBe("Jean Dupont")

    delete process.env.GOOGLE_PLACES_API_KEY
  })

  it("should return default data when API returns non-OK status", async () => {
    process.env.GOOGLE_PLACES_API_KEY = "test-api-key"
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    })

    const result = await fetchGoogleReviews()

    expect(result.rating).toBe(4.8)
    expect(result.reviewCount).toBe(20)
    expect(result.reviews).toEqual([])
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Erreur API Google Places: 403")
    )

    consoleSpy.mockRestore()
    delete process.env.GOOGLE_PLACES_API_KEY
  })

  it("should return default data when fetch throws a network error", async () => {
    process.env.GOOGLE_PLACES_API_KEY = "test-api-key"
    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchGoogleReviews()

    expect(result.rating).toBe(4.8)
    expect(result.reviewCount).toBe(20)
    expect(result.reviews).toEqual([])
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Erreur lors de l'appel API"),
      expect.any(Error)
    )

    consoleSpy.mockRestore()
    delete process.env.GOOGLE_PLACES_API_KEY
  })

  it("should pass custom revalidate option to fetch", async () => {
    process.env.GOOGLE_PLACES_API_KEY = "test-api-key"

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(sampleGooglePlaceDetails),
    })

    await fetchGoogleReviews({ revalidate: 3600 })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        next: { revalidate: 3600 },
      })
    )

    delete process.env.GOOGLE_PLACES_API_KEY
  })
})
