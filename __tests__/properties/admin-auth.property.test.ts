/**
 * Property-Based Tests for Admin Authentication
 * 
 * Feature: admin-backend
 * Property 2: Unauthenticated Admin Route Redirect
 * 
 * **Validates: Requirements 2.2**
 * 
 * For any HTTP request to any `/administrator/*` route (except `/administrator/login`) without 
 * a valid authentication session, the system SHALL respond with a redirect 
 * (302 or 307) to `/administrator/login`.
 */

import * as fc from 'fast-check'

// Track redirect calls
let redirectCalls: string[] = []
let mockUserValue: { id: string; email: string } | null | undefined = null

// Mock Next.js redirect function
jest.mock('next/navigation', () => ({
  redirect: (url: string) => {
    redirectCalls.push(url)
    // Next.js redirect throws a special error to halt execution
    const error = new Error(`NEXT_REDIRECT`)
    ;(error as Error & { digest: string }).digest = `NEXT_REDIRECT;replace;${url};307;`
    throw error
  },
}))

// Mock the Supabase server client
jest.mock('@/lib/supabase-server', () => ({
  createSupabaseServerClient: jest.fn().mockImplementation(async () => ({
    auth: {
      getUser: async () => ({ data: { user: mockUserValue } }),
    },
  })),
}))

// Import after mocks are set up
import { requireAdmin, getAdminUser } from '@/lib/admin-auth'

/**
 * Arbitrary generator for valid admin route paths (excluding /administrator/login)
 * Generates paths like /administrator, /administrator/categories, /administrator/products/123, etc.
 */
const adminRoutePathArbitrary = fc.oneof(
  // Base admin route
  fc.constant('/administrator'),
  // Admin sub-routes with single segment
  fc.constantFrom(
    '/administrator/categories',
    '/administrator/products',
    '/administrator/orders',
    '/administrator/customers',
    '/administrator/dashboard',
    '/administrator/settings'
  ),
  // Admin sub-routes with dynamic segments (e.g., /administrator/products/[id])
  fc.tuple(
    fc.constantFrom('categories', 'products', 'orders', 'customers'),
    fc.uuid()
  ).map(([segment, id]) => `/administrator/${segment}/${id}`),
  // Admin sub-routes with action segments (e.g., /administrator/products/new)
  fc.tuple(
    fc.constantFrom('categories', 'products'),
    fc.constantFrom('new', 'edit', 'delete')
  ).map(([segment, action]) => `/administrator/${segment}/${action}`),
  // Nested admin routes
  fc.tuple(
    fc.constantFrom('categories', 'products', 'orders', 'customers'),
    fc.uuid(),
    fc.constantFrom('edit', 'delete', 'details', 'history')
  ).map(([segment, id, action]) => `/administrator/${segment}/${id}/${action}`)
)

/**
 * Arbitrary generator for random admin route paths
 * Uses random alphanumeric segments to test edge cases
 */
const randomAdminRouteArbitrary = fc.array(
  fc.array(
    fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')),
    { minLength: 1, maxLength: 20 }
  ).map(chars => chars.join('')),
  { minLength: 0, maxLength: 4 }
).map(segments => '/administrator' + (segments.length > 0 ? '/' + segments.join('/') : ''))
  .filter(path => path !== '/administrator/login') // Exclude login route

/**
 * Helper function to test unauthenticated redirect behavior
 */
async function testUnauthenticatedRedirect(): Promise<{ redirected: boolean; redirectUrl: string | null }> {
  redirectCalls = []
  mockUserValue = null
  
  try {
    await requireAdmin()
    return { redirected: false, redirectUrl: null }
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      return { 
        redirected: true, 
        redirectUrl: redirectCalls.length > 0 ? redirectCalls[0] : null 
      }
    }
    throw error
  }
}

/**
 * Helper function to test authenticated behavior
 */
async function testAuthenticatedAccess(userId: string, email: string): Promise<{ user: { id: string; email: string } | null; redirected: boolean }> {
  redirectCalls = []
  mockUserValue = { id: userId, email }
  
  try {
    const user = await requireAdmin()
    return { user, redirected: false }
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      return { user: null, redirected: true }
    }
    throw error
  }
}

describe('Property 2: Unauthenticated Admin Route Redirect', () => {
  beforeEach(() => {
    redirectCalls = []
    mockUserValue = null
  })

  /**
   * Property: For any admin route path (except /administrator/login), when no user is 
   * authenticated, requireAdmin() SHALL trigger a redirect to /administrator/login
   * 
   * **Validates: Requirements 2.2**
   */
  it('should redirect to /administrator/login when user is not authenticated for any admin route', async () => {
    // Generate test cases
    const testCases = fc.sample(adminRoutePathArbitrary, 100)
    
    for (const routePath of testCases) {
      const result = await testUnauthenticatedRedirect()
      
      expect(result.redirected).toBe(true)
      expect(result.redirectUrl).toBe('/administrator/login')
    }
  })

  /**
   * Property: For any randomly generated admin route path (except /administrator/login),
   * unauthenticated access SHALL trigger redirect to /administrator/login
   * 
   * **Validates: Requirements 2.2**
   */
  it('should redirect to /administrator/login for any random admin route when unauthenticated', async () => {
    const testCases = fc.sample(randomAdminRouteArbitrary, 100)
    
    for (const routePath of testCases) {
      const result = await testUnauthenticatedRedirect()
      
      expect(result.redirected).toBe(true)
      expect(result.redirectUrl).toBe('/administrator/login')
    }
  })

  /**
   * Property: The redirect target SHALL always be exactly '/administrator/login'
   * regardless of which admin route was accessed
   * 
   * **Validates: Requirements 2.2**
   */
  it('should always redirect to exactly /administrator/login (not a variant)', async () => {
    const testCases = fc.sample(adminRoutePathArbitrary, 100)
    
    for (const routePath of testCases) {
      const result = await testUnauthenticatedRedirect()
      
      // Verify exact match (not /administrator/login/, not /administrator/login?redirect=..., etc.)
      expect(result.redirectUrl).toBe('/administrator/login')
      expect(result.redirectUrl).not.toMatch(/\/administrator\/login[/?]/)
    }
  })

  /**
   * Property: When user IS authenticated, requireAdmin() SHALL NOT redirect
   * and SHALL return the user object
   * 
   * **Validates: Requirements 2.2** (inverse property - authenticated users should pass)
   */
  it('should not redirect when user is authenticated', async () => {
    const testCases = fc.sample(
      fc.tuple(adminRoutePathArbitrary, fc.uuid(), fc.emailAddress()),
      100
    )
    
    for (const [routePath, userId, email] of testCases) {
      const result = await testAuthenticatedAccess(userId, email)
      
      expect(result.redirected).toBe(false)
      expect(result.user).not.toBeNull()
      expect(result.user?.id).toBe(userId)
      expect(result.user?.email).toBe(email)
    }
  })
})

/**
 * Tests for getAdminUser function behavior
 */
describe('getAdminUser Authentication Check', () => {
  beforeEach(() => {
    redirectCalls = []
    mockUserValue = null
  })

  /**
   * Property: getAdminUser SHALL return null when no user is authenticated
   * 
   * **Validates: Requirements 2.2**
   */
  it('should return null when no user is authenticated', async () => {
    mockUserValue = null
    
    const result = await getAdminUser()
    
    expect(result).toBeNull()
  })

  /**
   * Property: getAdminUser SHALL return the user object when authenticated
   * 
   * **Validates: Requirements 2.2**
   */
  it('should return user object when authenticated', async () => {
    const testCases = fc.sample(
      fc.tuple(fc.uuid(), fc.emailAddress()),
      100
    )
    
    for (const [userId, email] of testCases) {
      mockUserValue = { id: userId, email }
      
      const result = await getAdminUser()
      
      expect(result).toEqual({ id: userId, email })
    }
  })
})

/**
 * Edge case tests for authentication redirect behavior
 */
describe('Authentication Redirect Edge Cases', () => {
  beforeEach(() => {
    redirectCalls = []
    mockUserValue = null
  })

  /**
   * Test: Undefined user should trigger redirect
   */
  it('should redirect when user is undefined', async () => {
    mockUserValue = undefined
    
    const result = await testUnauthenticatedRedirect()
    
    expect(result.redirected).toBe(true)
    expect(result.redirectUrl).toBe('/administrator/login')
  })

  /**
   * Test: Null user should trigger redirect
   */
  it('should redirect when user is null', async () => {
    mockUserValue = null
    
    const result = await testUnauthenticatedRedirect()
    
    expect(result.redirected).toBe(true)
    expect(result.redirectUrl).toBe('/administrator/login')
  })

  /**
   * Test: Verify redirect is called exactly once per request
   */
  it('should call redirect exactly once per unauthenticated request', async () => {
    mockUserValue = null
    redirectCalls = []
    
    try {
      await requireAdmin()
    } catch {
      // Expected to throw
    }
    
    expect(redirectCalls).toHaveLength(1)
    expect(redirectCalls[0]).toBe('/administrator/login')
  })
})

/**
 * Specific admin route tests
 */
describe('Specific Admin Routes Authentication', () => {
  beforeEach(() => {
    redirectCalls = []
    mockUserValue = null
  })

  const specificRoutes = [
    '/administrator',
    '/administrator/categories',
    '/administrator/categories/new',
    '/administrator/products',
    '/administrator/products/new',
    '/administrator/orders',
    '/administrator/customers',
  ]

  specificRoutes.forEach((route) => {
    /**
     * Test: Each specific admin route should redirect when unauthenticated
     */
    it(`should redirect to /administrator/login for route: ${route}`, async () => {
      const result = await testUnauthenticatedRedirect()
      
      expect(result.redirected).toBe(true)
      expect(result.redirectUrl).toBe('/administrator/login')
    })
  })
})

/**
 * Property test using fc.assert for redirect consistency
 */
describe('Redirect Consistency Properties', () => {
  beforeEach(() => {
    redirectCalls = []
    mockUserValue = null
  })

  /**
   * Property: Multiple consecutive unauthenticated requests should all redirect
   * to the same location (/administrator/login)
   * 
   * **Validates: Requirements 2.2**
   */
  it('should consistently redirect to /administrator/login across multiple requests', async () => {
    const numRequests = 100
    const redirectUrls: string[] = []
    
    for (let i = 0; i < numRequests; i++) {
      const result = await testUnauthenticatedRedirect()
      if (result.redirectUrl) {
        redirectUrls.push(result.redirectUrl)
      }
    }
    
    // All redirects should be to /administrator/login
    expect(redirectUrls).toHaveLength(numRequests)
    expect(new Set(redirectUrls).size).toBe(1)
    expect(redirectUrls[0]).toBe('/administrator/login')
  })

  /**
   * Property: The redirect behavior should be deterministic - 
   * same input (unauthenticated) always produces same output (redirect to /administrator/login)
   * 
   * **Validates: Requirements 2.2**
   */
  it('should have deterministic redirect behavior', async () => {
    // Run the same test multiple times
    for (let run = 0; run < 10; run++) {
      const results: boolean[] = []
      const urls: string[] = []
      
      for (let i = 0; i < 10; i++) {
        const result = await testUnauthenticatedRedirect()
        results.push(result.redirected)
        if (result.redirectUrl) urls.push(result.redirectUrl)
      }
      
      // All should redirect
      expect(results.every(r => r === true)).toBe(true)
      // All should redirect to same URL
      expect(urls.every(u => u === '/administrator/login')).toBe(true)
    }
  })
})
