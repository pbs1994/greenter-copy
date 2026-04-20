/**
 * @jest-environment node
 */

// Mock Stripe — store mocks on constructor to avoid hoisting issues
jest.mock('stripe', () => {
  const _mockConstructEvent = jest.fn()
  const _mockCustomersRetrieve = jest.fn()
  const MockStripe = function () {
    return {
      webhooks: { constructEvent: _mockConstructEvent },
      customers: { retrieve: _mockCustomersRetrieve },
      checkout: { sessions: { retrieve: jest.fn() } },
    }
  }
  MockStripe.__mockConstructEvent = _mockConstructEvent
  MockStripe.__mockCustomersRetrieve = _mockCustomersRetrieve
  return MockStripe
})

// Mock Supabase
jest.mock('@supabase/supabase-js', () => {
  const _mockFrom = jest.fn()
  return {
    createClient: () => ({ from: _mockFrom }),
    __mockFrom: _mockFrom,
  }
})

// Mock email sending
jest.mock('@/lib/send-order-emails', () => ({
  sendOrderEmails: jest.fn(),
}))

jest.mock('@/lib/email-templates', () => ({
  maintenanceClientEmailTemplate: jest.fn().mockReturnValue('<html>client</html>'),
  maintenanceAdminEmailTemplate: jest.fn().mockReturnValue('<html>admin</html>'),
}))

// Mock Resend
jest.mock('@/lib/resend', () => {
  const _mockSend = jest.fn().mockResolvedValue({ data: { id: 'email-id' }, error: null })
  return {
    resend: {
      emails: {
        send: _mockSend,
      },
    },
    __mockSend: _mockSend,
  }
})

import { NextRequest } from 'next/server'
import { POST } from './route'
import Stripe from 'stripe'
import * as supabaseModule from '@supabase/supabase-js'
import * as resendModule from '@/lib/resend'

type MockedStripe = { __mockConstructEvent: jest.Mock; __mockCustomersRetrieve: jest.Mock }
type MockedSupabase = { __mockFrom: jest.Mock }
type MockedResend = { __mockSend: jest.Mock }

const mockConstructEvent = (Stripe as unknown as MockedStripe).__mockConstructEvent
const mockCustomersRetrieve = (Stripe as unknown as MockedStripe).__mockCustomersRetrieve
const mockFrom = (supabaseModule as unknown as MockedSupabase).__mockFrom
const mockResendSend = (resendModule as unknown as MockedResend).__mockSend

// Helper to create a webhook request
function makeWebhookRequest(body: string): NextRequest {
  return new NextRequest('http://localhost:3000/api/webhook/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': 'test_signature',
    },
    body,
  })
}

// Base subscription object for maintenance events
function makeSubscription(overrides: Record<string, unknown> = {}) {
  return {
    id: 'sub_test123',
    customer: 'cus_test456',
    status: 'active',
    metadata: {
      type: 'maintenance',
      service_ids: 'svc-1,svc-2',
      option_ids: 'opt-1',
      billing_period: 'monthly',
      discount_multi: '5',
      discount_annual: '0',
      total_monthly: '8800',
      total_after_discounts: '8800',
    },
    items: {
      data: [
        {
          price: {
            unit_amount: 1425,
            product: { name: 'Entretien Chaudière à gaz' },
          },
          description: 'Entretien Chaudière à gaz',
        },
        {
          price: {
            unit_amount: 2375,
            product: { name: 'Entretien Pompe à chaleur' },
          },
          description: 'Entretien Pompe à chaleur',
        },
        {
          price: {
            unit_amount: 5000,
            product: { name: 'Intervention urgence sous 24h' },
          },
          description: 'Intervention urgence sous 24h',
        },
      ],
    },
    ...overrides,
  }
}

function makeEvent(type: string, subscription: Record<string, unknown>) {
  return {
    type,
    data: { object: subscription },
  }
}

describe('POST /api/webhook/stripe — subscription events', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
    process.env.STRIPE_SECRET_KEY = 'sk_test_123'
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.greenter.fr'
  })

  // --- customer.subscription.created ---

  describe('customer.subscription.created', () => {
    it('creates maintenance_subscription and items for maintenance subscription', async () => {
      const sub = makeSubscription()
      const event = makeEvent('customer.subscription.created', sub)
      mockConstructEvent.mockReturnValue(event)

      // Mock Stripe customer retrieval
      mockCustomersRetrieve.mockResolvedValue({
        email: 'client@test.fr',
        name: 'Jean Dupont',
        phone: '+33612345678',
      })

      // Mock Supabase calls
      const customerRecord = { id: 'cust-uuid-1', email: 'client@test.fr' }
      const subscriptionRecord = { id: 'sub-uuid-1' }

      mockFrom.mockImplementation((table: string) => {
        if (table === 'customers') {
          return {
            upsert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: customerRecord, error: null }),
              }),
            }),
          }
        }
        if (table === 'maintenance_subscriptions') {
          return {
            insert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: subscriptionRecord, error: null }),
              }),
            }),
          }
        }
        if (table === 'maintenance_subscription_items') {
          return {
            insert: jest.fn().mockResolvedValue({ error: null }),
          }
        }
        return {}
      })

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)

      // Verify customer upsert was called
      expect(mockFrom).toHaveBeenCalledWith('customers')
      // Verify subscription was created
      expect(mockFrom).toHaveBeenCalledWith('maintenance_subscriptions')
      // Verify items were created
      expect(mockFrom).toHaveBeenCalledWith('maintenance_subscription_items')
    })

    it('sends client and admin emails after successful subscription creation', async () => {
      const sub = makeSubscription()
      const event = makeEvent('customer.subscription.created', sub)
      mockConstructEvent.mockReturnValue(event)

      mockCustomersRetrieve.mockResolvedValue({
        email: 'client@test.fr',
        name: 'Jean Dupont',
        phone: '+33612345678',
      })

      const customerRecord = { id: 'cust-uuid-1', email: 'client@test.fr', name: 'Jean Dupont', phone: '+33612345678' }
      const subscriptionRecord = { id: 'sub-uuid-1' }

      mockFrom.mockImplementation((table: string) => {
        if (table === 'customers') {
          return {
            upsert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: customerRecord, error: null }),
              }),
            }),
          }
        }
        if (table === 'maintenance_subscriptions') {
          return {
            insert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: subscriptionRecord, error: null }),
              }),
            }),
          }
        }
        if (table === 'maintenance_subscription_items') {
          return {
            insert: jest.fn().mockResolvedValue({ error: null }),
          }
        }
        return {}
      })

      await POST(makeWebhookRequest('{}'))

      // Verify emails were sent (2 calls: client + admin)
      expect(mockResendSend).toHaveBeenCalledTimes(2)

      // Verify client email
      expect(mockResendSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'client@test.fr',
          subject: 'Confirmation de souscription maintenance - Greenter',
        })
      )

      // Verify admin email
      expect(mockResendSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'contact@greenter.fr',
          subject: expect.stringContaining('Nouvelle souscription maintenance'),
        })
      )
    })

    it('does not crash webhook when email sending fails', async () => {
      const sub = makeSubscription()
      const event = makeEvent('customer.subscription.created', sub)
      mockConstructEvent.mockReturnValue(event)

      mockCustomersRetrieve.mockResolvedValue({
        email: 'client@test.fr',
        name: 'Jean Dupont',
        phone: null,
      })

      const customerRecord = { id: 'cust-uuid-1', email: 'client@test.fr', name: 'Jean Dupont', phone: null }
      const subscriptionRecord = { id: 'sub-uuid-1' }

      mockFrom.mockImplementation((table: string) => {
        if (table === 'customers') {
          return {
            upsert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: customerRecord, error: null }),
              }),
            }),
          }
        }
        if (table === 'maintenance_subscriptions') {
          return {
            insert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: subscriptionRecord, error: null }),
              }),
            }),
          }
        }
        if (table === 'maintenance_subscription_items') {
          return {
            insert: jest.fn().mockResolvedValue({ error: null }),
          }
        }
        return {}
      })

      // Make email sending throw an error
      mockResendSend.mockRejectedValueOnce(new Error('Resend API error'))

      // Webhook should still return 200 — email errors are non-blocking
      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)
    })

    it('skips non-maintenance subscriptions', async () => {
      const sub = makeSubscription({
        metadata: { type: 'other' },
      })
      const event = makeEvent('customer.subscription.created', sub)
      mockConstructEvent.mockReturnValue(event)

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)

      // Should NOT call customers or maintenance tables
      expect(mockCustomersRetrieve).not.toHaveBeenCalled()
    })

    it('handles customer upsert error gracefully', async () => {
      const sub = makeSubscription()
      const event = makeEvent('customer.subscription.created', sub)
      mockConstructEvent.mockReturnValue(event)

      mockCustomersRetrieve.mockResolvedValue({
        email: 'client@test.fr',
        name: 'Jean Dupont',
        phone: null,
      })

      mockFrom.mockImplementation((table: string) => {
        if (table === 'customers') {
          return {
            upsert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({
                  data: null,
                  error: { message: 'DB error' },
                }),
              }),
            }),
          }
        }
        return {}
      })

      // Should not crash — errors are caught and logged
      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)
    })
  })

  // --- customer.subscription.updated ---

  describe('customer.subscription.updated', () => {
    it('updates status to active', async () => {
      const sub = makeSubscription({ status: 'active' })
      const event = makeEvent('customer.subscription.updated', sub)
      mockConstructEvent.mockReturnValue(event)

      const mockEq = jest.fn().mockResolvedValue({ error: null })
      mockFrom.mockImplementation((table: string) => {
        if (table === 'maintenance_subscriptions') {
          return {
            update: jest.fn().mockReturnValue({ eq: mockEq }),
          }
        }
        return {}
      })

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)
      expect(mockFrom).toHaveBeenCalledWith('maintenance_subscriptions')
    })

    it('maps Stripe canceled to our cancelled status', async () => {
      const sub = makeSubscription({ status: 'canceled' })
      const event = makeEvent('customer.subscription.updated', sub)
      mockConstructEvent.mockReturnValue(event)

      let updatedStatus: string | null = null
      mockFrom.mockImplementation((table: string) => {
        if (table === 'maintenance_subscriptions') {
          return {
            update: jest.fn().mockImplementation((data: { status: string }) => {
              updatedStatus = data.status
              return { eq: jest.fn().mockResolvedValue({ error: null }) }
            }),
          }
        }
        return {}
      })

      await POST(makeWebhookRequest('{}'))
      expect(updatedStatus).toBe('cancelled')
    })

    it('maps Stripe past_due status', async () => {
      const sub = makeSubscription({ status: 'past_due' })
      const event = makeEvent('customer.subscription.updated', sub)
      mockConstructEvent.mockReturnValue(event)

      let updatedStatus: string | null = null
      mockFrom.mockImplementation((table: string) => {
        if (table === 'maintenance_subscriptions') {
          return {
            update: jest.fn().mockImplementation((data: { status: string }) => {
              updatedStatus = data.status
              return { eq: jest.fn().mockResolvedValue({ error: null }) }
            }),
          }
        }
        return {}
      })

      await POST(makeWebhookRequest('{}'))
      expect(updatedStatus).toBe('past_due')
    })

    it('skips non-maintenance subscriptions', async () => {
      const sub = makeSubscription({
        status: 'active',
        metadata: { type: 'other' },
      })
      const event = makeEvent('customer.subscription.updated', sub)
      mockConstructEvent.mockReturnValue(event)

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)
      // Should not try to update maintenance_subscriptions
      const maintenanceCalls = mockFrom.mock.calls.filter(
        (c: unknown[]) => c[0] === 'maintenance_subscriptions'
      )
      expect(maintenanceCalls).toHaveLength(0)
    })
  })

  // --- customer.subscription.deleted ---

  describe('customer.subscription.deleted', () => {
    it('marks subscription as cancelled with cancelled_at date', async () => {
      const sub = makeSubscription({ status: 'canceled' })
      const event = makeEvent('customer.subscription.deleted', sub)
      mockConstructEvent.mockReturnValue(event)

      let updatedData: Record<string, unknown> | null = null
      mockFrom.mockImplementation((table: string) => {
        if (table === 'maintenance_subscriptions') {
          return {
            update: jest.fn().mockImplementation((data: Record<string, unknown>) => {
              updatedData = data
              return { eq: jest.fn().mockResolvedValue({ error: null }) }
            }),
          }
        }
        return {}
      })

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)
      expect(updatedData).not.toBeNull()
      expect(updatedData!.status).toBe('cancelled')
      expect(updatedData!.cancelled_at).toBeDefined()
    })

    it('skips non-maintenance subscriptions', async () => {
      const sub = makeSubscription({
        metadata: { type: 'product' },
      })
      const event = makeEvent('customer.subscription.deleted', sub)
      mockConstructEvent.mockReturnValue(event)

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(200)
      const maintenanceCalls = mockFrom.mock.calls.filter(
        (c: unknown[]) => c[0] === 'maintenance_subscriptions'
      )
      expect(maintenanceCalls).toHaveLength(0)
    })
  })

  // --- Signature verification ---

  describe('signature verification', () => {
    it('returns 400 for invalid signature', async () => {
      mockConstructEvent.mockImplementation(() => {
        throw new Error('Invalid signature')
      })

      const res = await POST(makeWebhookRequest('{}'))
      expect(res.status).toBe(400)
    })
  })
})
