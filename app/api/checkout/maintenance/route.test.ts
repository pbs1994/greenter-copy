/**
 * @jest-environment node
 */

// Mock Stripe - store mock on constructor for access after import
jest.mock('stripe', () => {
  const mockCreate = jest.fn()
  const MockStripe = function () {
    return { checkout: { sessions: { create: mockCreate } } }
  }
  MockStripe.__mockCreate = mockCreate
  return MockStripe
})

// Mock Supabase
jest.mock('@supabase/supabase-js', () => {
  const mockFrom = jest.fn()
  return {
    createClient: () => ({ from: mockFrom }),
    __mockFrom: mockFrom,
  }
})

jest.mock('@/lib/maintenance-pricing', () => ({
  calculatePricing: jest.fn(() => ({
    servicesSubtotal: 4000,
    discountMultiPercent: 5,
    discountMultiAmount: 200,
    servicesAfterMulti: 3800,
    optionsTotal: 5000,
    discountAnnualPercent: 0,
    discountAnnualAmount: 0,
    totalMonthly: 8800,
    totalAnnual: 105600,
    totalDisplay: 8800,
    savingsTotal: 200,
  })),
}))

import { NextRequest } from 'next/server'
import { POST } from './route'
import Stripe from 'stripe'
import * as supabaseModule from '@supabase/supabase-js'

type MockedStripe = { __mockCreate: jest.Mock }
type MockedSupabase = { __mockFrom: jest.Mock }

const mockSessionCreate = (Stripe as unknown as MockedStripe).__mockCreate
const mockFrom = (supabaseModule as unknown as MockedSupabase).__mockFrom

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/checkout/maintenance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function setupSupabaseMock(
  services: unknown[] | null,
  options: unknown[] | null,
  servicesError?: unknown,
  optionsError?: unknown
) {
  mockFrom.mockImplementation((table: string) => {
    if (table === 'maintenance_services') {
      return {
        select: jest.fn().mockReturnValue({
          in: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ data: services, error: servicesError || null }),
          }),
        }),
      }
    }
    if (table === 'maintenance_options') {
      return {
        select: jest.fn().mockReturnValue({
          in: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ data: options, error: optionsError || null }),
          }),
        }),
      }
    }
    return {}
  })
}

const testServices = [
  { id: 's1', name: 'Chaudiere a gaz', price_monthly: 1500, is_active: true },
  { id: 's2', name: 'Pompe a chaleur', price_monthly: 2500, is_active: true },
]

const testOptions = [
  { id: 'o1', name: 'Intervention urgence 24h', price_monthly: 5000, is_active: true, exempt_from_discount: true },
]

describe('POST /api/checkout/maintenance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.greenter.fr'
  })

  it('returns 400 when serviceIds is missing', async () => {
    const res = await POST(makeRequest({ optionIds: [], billingPeriod: 'monthly' }))
    const body = await res.json()
    expect(res.status).toBe(400)
    expect(body.error).toContain('services invalide')
  })

  it('returns 400 when serviceIds is empty', async () => {
    const res = await POST(makeRequest({ serviceIds: [], optionIds: [], billingPeriod: 'monthly' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when optionIds is not an array', async () => {
    const res = await POST(makeRequest({ serviceIds: ['s1'], optionIds: 'bad', billingPeriod: 'monthly' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when billingPeriod is invalid', async () => {
    const res = await POST(makeRequest({ serviceIds: ['s1'], optionIds: [], billingPeriod: 'weekly' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when no active services found', async () => {
    setupSupabaseMock([], null)
    const res = await POST(makeRequest({ serviceIds: ['s1'], optionIds: [], billingPeriod: 'monthly' }))
    expect(res.status).toBe(400)
  })

  it('returns 500 when Supabase services query fails', async () => {
    setupSupabaseMock(null, null, { message: 'DB error' })
    const res = await POST(makeRequest({ serviceIds: ['s1'], optionIds: [], billingPeriod: 'monthly' }))
    expect(res.status).toBe(500)
  })

  it('returns 500 when Supabase options query fails', async () => {
    setupSupabaseMock(testServices, null, null, { message: 'DB error' })
    const res = await POST(makeRequest({ serviceIds: ['s1', 's2'], optionIds: ['o1'], billingPeriod: 'monthly' }))
    expect(res.status).toBe(500)
  })

  it('creates Stripe session and returns URL', async () => {
    setupSupabaseMock(testServices, testOptions)
    mockSessionCreate.mockResolvedValue({ url: 'https://checkout.stripe.com/s123' })
    const res = await POST(makeRequest({ serviceIds: ['s1', 's2'], optionIds: ['o1'], billingPeriod: 'monthly' }))
    const body = await res.json()
    expect(res.status).toBe(200)
    expect(body.url).toBe('https://checkout.stripe.com/s123')
  })

  it('creates session with subscription mode and metadata', async () => {
    setupSupabaseMock(testServices, testOptions)
    mockSessionCreate.mockResolvedValue({ url: 'https://checkout.stripe.com/s123' })
    await POST(makeRequest({ serviceIds: ['s1', 's2'], optionIds: ['o1'], billingPeriod: 'monthly' }))
    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'subscription',
        metadata: expect.objectContaining({
          type: 'maintenance',
          service_ids: 's1,s2',
          option_ids: 'o1',
          billing_period: 'monthly',
        }),
      })
    )
  })

  it('uses monthly interval for monthly billing', async () => {
    setupSupabaseMock(testServices, testOptions)
    mockSessionCreate.mockResolvedValue({ url: 'https://checkout.stripe.com/s123' })
    await POST(makeRequest({ serviceIds: ['s1', 's2'], optionIds: ['o1'], billingPeriod: 'monthly' }))
    const args = mockSessionCreate.mock.calls[0][0]
    expect(args.line_items).toHaveLength(3)
    for (const item of args.line_items) {
      expect(item.price_data.recurring.interval).toBe('month')
    }
  })

  it('uses yearly interval for yearly billing', async () => {
    setupSupabaseMock(testServices, [])
    mockSessionCreate.mockResolvedValue({ url: 'https://checkout.stripe.com/s123' })
    await POST(makeRequest({ serviceIds: ['s1', 's2'], optionIds: [], billingPeriod: 'yearly' }))
    const args = mockSessionCreate.mock.calls[0][0]
    for (const item of args.line_items) {
      expect(item.price_data.recurring.interval).toBe('year')
    }
  })

  it('returns 500 when Stripe fails', async () => {
    setupSupabaseMock(testServices, [])
    mockSessionCreate.mockRejectedValue(new Error('Stripe error'))
    const res = await POST(makeRequest({ serviceIds: ['s1'], optionIds: [], billingPeriod: 'monthly' }))
    expect(res.status).toBe(500)
  })

  it('skips options query when optionIds is empty', async () => {
    setupSupabaseMock(testServices, null)
    mockSessionCreate.mockResolvedValue({ url: 'https://checkout.stripe.com/s123' })
    const res = await POST(makeRequest({ serviceIds: ['s1'], optionIds: [], billingPeriod: 'monthly' }))
    expect(res.status).toBe(200)
    const fromCalls = mockFrom.mock.calls.map((c: unknown[]) => c[0])
    expect(fromCalls).not.toContain('maintenance_options')
  })
})
