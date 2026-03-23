/**
 * Migration Script: Supabase to Payload CMS
 *
 * Migrates all data from Supabase to Payload CMS:
 * - Categories
 * - Products (without image upload — images stay on Supabase Storage)
 * - Customers
 * - Orders + Order Items
 * - Maintenance Services
 * - Maintenance Options
 * - Maintenance Subscriptions + Items
 *
 * Usage: npx tsx scripts/migrate.ts
 *
 * IMPORTANT: Run this script ONCE. It checks for existing records to avoid duplicates.
 * The script is idempotent — safe to re-run if interrupted.
 */

import { createClient } from '@supabase/supabase-js'
import { getPayload } from 'payload'
import config from '../payload.config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// ID maps: Supabase UUID -> Payload ID
const categoryIdMap = new Map<string, number | string>()
const productIdMap = new Map<string, number | string>()
const customerIdMap = new Map<string, number | string>()
const serviceIdMap = new Map<string, number | string>()
const optionIdMap = new Map<string, number | string>()

let stats = { migrated: 0, skipped: 0, errors: 0 }

function resetStats() {
  stats = { migrated: 0, skipped: 0, errors: 0 }
}

function printStats(entity: string) {
  console.log(`  => ${entity}: ${stats.migrated} migrated, ${stats.skipped} skipped, ${stats.errors} errors`)
}

// ============================================================================
// CATEGORIES
// ============================================================================
async function migrateCategories(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Categories ---')
  resetStats()

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) { console.error('Error fetching categories:', error); return }
  if (!categories?.length) { console.log('No categories found'); return }

  for (const cat of categories) {
    try {
      const { docs: existing } = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      })

      if (existing.length > 0) {
        categoryIdMap.set(cat.id, existing[0].id)
        stats.skipped++
        continue
      }

      // Transform spec_fields: Supabase options is string[], Payload wraps in {value: string}
      const specFields = (cat.spec_fields || []).map((sf: { name: string; key: string; type: string; required?: boolean; options?: string[]; unit?: string }) => ({
        name: sf.name,
        key: sf.key,
        type: sf.type === 'textarea' ? 'text' : sf.type, // Payload doesn't have textarea spec type
        required: sf.required || false,
        unit: sf.unit || undefined,
        options: sf.options?.map((o: string) => ({ value: o })) || undefined,
      }))

      const created = await payload.create({
        collection: 'categories',
        data: {
          name: cat.name,
          slug: cat.slug,
          spec_fields: specFields.length > 0 ? specFields : undefined,
        },
      })

      categoryIdMap.set(cat.id, created.id)
      stats.migrated++
    } catch (err) {
      console.error(`Error migrating category ${cat.name}:`, err)
      stats.errors++
    }
  }
  printStats('Categories')
}

// ============================================================================
// PRODUCTS
// ============================================================================
async function migrateProducts(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Products ---')
  resetStats()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) { console.error('Error fetching products:', error); return }
  if (!products?.length) { console.log('No products found'); return }

  for (const prod of products) {
    try {
      const { docs: existing } = await payload.find({
        collection: 'products',
        where: { slug: { equals: prod.slug } },
        limit: 1,
      })

      if (existing.length > 0) {
        productIdMap.set(prod.id, existing[0].id)
        stats.skipped++
        continue
      }

      const payloadCategoryId = categoryIdMap.get(prod.category_id)
      if (!payloadCategoryId) {
        console.warn(`Category not found for product ${prod.name}, skipping`)
        stats.errors++
        continue
      }

      // Transform specs: Supabase stores {key: value}, Payload stores [{label, value, unit}]
      // We need the category's spec_fields to get proper labels
      const categoryDoc = await payload.findByID({
        collection: 'categories',
        id: payloadCategoryId,
      })
      const specFieldDefs = (categoryDoc as { spec_fields?: Array<{ key: string; name: string; unit?: string }> }).spec_fields || []

      const specs = prod.specs
        ? Object.entries(prod.specs as Record<string, string | number>).map(([key, value]) => {
            const specDef = specFieldDefs.find((sf) => sf.key === key)
            return {
              label: specDef?.name || key,
              value: String(value),
              unit: specDef?.unit || undefined,
            }
          })
        : undefined

      // Transform features: icon values may need mapping
      const features = prod.features?.map((f: { icon: string; title: string; description: string }) => ({
        icon: f.icon || undefined,
        title: f.title,
        description: f.description || undefined,
      }))

      // Transform FAQ: answer is plain text in Supabase, stays as plain text (no richText conversion)
      const faq = prod.faq?.map((f: { question: string; answer: string }) => ({
        question: f.question,
        // Skipping answer richText conversion — admin can edit later in Payload
      }))

      const created = await payload.create({
        collection: 'products',
        data: {
          name: prod.name,
          slug: prod.slug,
          price: prod.price,
          short_description: prod.short_description || undefined,
          is_active: prod.is_active ?? true,
          stripe_product_id: prod.stripe_product_id || undefined,
          stripe_price_id: prod.stripe_price_id || undefined,
          category: payloadCategoryId,
          specs: specs && specs.length > 0 ? specs : undefined,
          features: features && features.length > 0 ? features : undefined,
          faq: faq && faq.length > 0 ? faq : undefined,
          // NOTE: Images not migrated — they stay on Supabase Storage
          // main_image and gallery can be set manually in Payload Admin later
        },
      })

      productIdMap.set(prod.id, created.id)
      stats.migrated++
    } catch (err) {
      console.error(`Error migrating product ${prod.name}:`, err)
      stats.errors++
    }
  }
  printStats('Products')
}

// ============================================================================
// CUSTOMERS
// ============================================================================
async function migrateCustomers(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Customers ---')
  resetStats()

  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) { console.error('Error fetching customers:', error); return }
  if (!customers?.length) { console.log('No customers found'); return }

  for (const customer of customers) {
    try {
      const { docs: existing } = await payload.find({
        collection: 'customers',
        where: { email: { equals: customer.email } },
        limit: 1,
      })

      if (existing.length > 0) {
        customerIdMap.set(customer.id, existing[0].id)
        stats.skipped++
        continue
      }

      const created = await payload.create({
        collection: 'customers',
        data: {
          email: customer.email,
          name: customer.name || undefined,
          phone: customer.phone || undefined,
        },
      })

      customerIdMap.set(customer.id, String(created.id))
      stats.migrated++
    } catch (err) {
      console.error(`Error migrating customer ${customer.email}:`, err)
      stats.errors++
    }
  }
  printStats('Customers')
}

// ============================================================================
// ORDERS
// ============================================================================
async function migrateOrders(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Orders ---')
  resetStats()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) { console.error('Error fetching orders:', error); return }
  if (!orders?.length) { console.log('No orders found'); return }

  for (const order of orders) {
    try {
      const { docs: existing } = await payload.find({
        collection: 'orders',
        where: { order_number: { equals: order.order_number } },
        limit: 1,
      })

      if (existing.length > 0) {
        stats.skipped++
        continue
      }

      const payloadCustomerId = customerIdMap.get(order.customer_id)
      if (!payloadCustomerId) {
        console.warn(`Customer not found for order ${order.order_number}, skipping`)
        stats.errors++
        continue
      }

      // Fetch order items from Supabase
      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order.id)

      const orderItems = (items || []).map((item: { product_name: string; quantity: number; unit_price: number; product_id: string | null }) => ({
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        product: item.product_id ? productIdMap.get(item.product_id) : undefined,
      }))

      const statusMap: Record<string, 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'> = {
        pending: 'pending',
        paid: 'paid',
        shipped: 'shipped',
        delivered: 'delivered',
        cancelled: 'cancelled',
      }

      await payload.create({
        collection: 'orders',
        data: {
          order_number: order.order_number,
          stripe_session_id: order.stripe_session_id || undefined,
          customer: payloadCustomerId,
          status: statusMap[order.status] || 'pending',
          amount: order.amount,
          shipping_address: order.shipping_address || undefined,
          billing_address: order.billing_address || undefined,
          items: orderItems,
        },
      })

      stats.migrated++
    } catch (err) {
      console.error(`Error migrating order ${order.order_number}:`, err)
      stats.errors++
    }
  }
  printStats('Orders')
}

// ============================================================================
// MAINTENANCE SERVICES
// ============================================================================
async function migrateMaintenanceServices(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Maintenance Services ---')
  resetStats()

  const { data: services, error } = await supabase
    .from('maintenance_services')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) { console.error('Error fetching maintenance services:', error); return }
  if (!services?.length) { console.log('No maintenance services found'); return }

  for (const svc of services) {
    try {
      const { docs: existing } = await payload.find({
        collection: 'maintenance-services',
        where: { slug: { equals: svc.slug } },
        limit: 1,
      })

      if (existing.length > 0) {
        serviceIdMap.set(svc.id, existing[0].id)
        stats.skipped++
        continue
      }

      // Transform includes: Supabase stores string[], Payload stores [{item: string}]
      const includes = (svc.includes || []).map((item: string) => ({ item }))

      const created = await payload.create({
        collection: 'maintenance-services',
        data: {
          name: svc.name,
          slug: svc.slug,
          description: svc.description || undefined,
          price_monthly: svc.price_monthly,
          icon: svc.icon || 'Wrench',
          includes: includes.length > 0 ? includes : undefined,
          is_active: svc.is_active ?? true,
          sort_order: svc.sort_order || 0,
        },
      })

      serviceIdMap.set(svc.id, created.id)
      stats.migrated++
    } catch (err) {
      console.error(`Error migrating service ${svc.name}:`, err)
      stats.errors++
    }
  }
  printStats('Maintenance Services')
}

// ============================================================================
// MAINTENANCE OPTIONS
// ============================================================================
async function migrateMaintenanceOptions(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Maintenance Options ---')
  resetStats()

  const { data: options, error } = await supabase
    .from('maintenance_options')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) { console.error('Error fetching maintenance options:', error); return }
  if (!options?.length) { console.log('No maintenance options found'); return }

  for (const opt of options) {
    try {
      const { docs: existing } = await payload.find({
        collection: 'maintenance-options',
        where: { slug: { equals: opt.slug } },
        limit: 1,
      })

      if (existing.length > 0) {
        optionIdMap.set(opt.id, existing[0].id)
        stats.skipped++
        continue
      }

      const created = await payload.create({
        collection: 'maintenance-options',
        data: {
          name: opt.name,
          slug: opt.slug,
          description: opt.description || undefined,
          price_monthly: opt.price_monthly,
          icon: opt.icon || 'Wrench',
          is_active: opt.is_active ?? true,
          is_flat_fee: opt.is_flat_fee ?? false,
          exempt_from_discount: opt.exempt_from_discount ?? false,
          sort_order: opt.sort_order || 0,
        },
      })

      optionIdMap.set(opt.id, created.id)
      stats.migrated++
    } catch (err) {
      console.error(`Error migrating option ${opt.name}:`, err)
      stats.errors++
    }
  }
  printStats('Maintenance Options')
}

// ============================================================================
// MAINTENANCE SUBSCRIPTIONS
// ============================================================================
async function migrateMaintenanceSubscriptions(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n--- Migrating Maintenance Subscriptions ---')
  resetStats()

  const { data: subscriptions, error } = await supabase
    .from('maintenance_subscriptions')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) { console.error('Error fetching subscriptions:', error); return }
  if (!subscriptions?.length) { console.log('No subscriptions found'); return }

  for (const sub of subscriptions) {
    try {
      // Check by stripe_subscription_id if it exists
      if (sub.stripe_subscription_id) {
        const { docs: existing } = await payload.find({
          collection: 'maintenance-subscriptions',
          where: { stripe_subscription_id: { equals: sub.stripe_subscription_id } },
          limit: 1,
        })
        if (existing.length > 0) {
          stats.skipped++
          continue
        }
      }

      const payloadCustomerId = customerIdMap.get(sub.customer_id)
      if (!payloadCustomerId) {
        console.warn(`Customer not found for subscription ${sub.id}, skipping`)
        stats.errors++
        continue
      }

      // Fetch subscription items
      const { data: items } = await supabase
        .from('maintenance_subscription_items')
        .select('*')
        .eq('subscription_id', sub.id)

      const subscriptionItems = (items || []).map((item: {
        item_type: 'service' | 'option'
        name: string
        unit_price: number
        maintenance_service_id: string | null
        maintenance_option_id: string | null
      }) => ({
        item_type: item.item_type,
        name: item.name,
        quantity: 1,
        unit_price: item.unit_price,
        service: item.item_type === 'service' && item.maintenance_service_id
          ? serviceIdMap.get(item.maintenance_service_id)
          : undefined,
        option: item.item_type === 'option' && item.maintenance_option_id
          ? optionIdMap.get(item.maintenance_option_id)
          : undefined,
      }))

      // Map billing_period: Supabase 'yearly' -> Payload 'annual'
      const billingPeriod = sub.billing_period === 'yearly' ? 'annual' : 'monthly'

      // Compute discount_amount
      const discountAmount = (sub.total_monthly || 0) - (sub.total_after_discounts || 0)

      await payload.create({
        collection: 'maintenance-subscriptions',
        data: {
          stripe_subscription_id: sub.stripe_subscription_id || undefined,
          customer: payloadCustomerId,
          billing_period: billingPeriod,
          status: sub.status || 'active',
          totals: {
            subtotal: sub.total_monthly || 0,
            discount_amount: discountAmount > 0 ? discountAmount : 0,
            total: sub.total_after_discounts || 0,
          },
          discounts: {
            multi_service_discount: sub.discount_multi_percent || 0,
            annual_discount: sub.discount_annual_percent || 0,
          },
          items: subscriptionItems.length > 0 ? subscriptionItems : undefined,
          cancelled_at: sub.cancelled_at || undefined,
        },
      })

      stats.migrated++
    } catch (err) {
      console.error(`Error migrating subscription ${sub.id}:`, err)
      stats.errors++
    }
  }
  printStats('Maintenance Subscriptions')
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  console.log('=== Migration Supabase -> Payload CMS ===')
  console.log(`Supabase: ${supabaseUrl}`)

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // Order matters: categories before products, customers before orders/subscriptions,
  // services/options before subscriptions
  await migrateCategories(payload)
  await migrateProducts(payload)
  await migrateCustomers(payload)
  await migrateOrders(payload)
  await migrateMaintenanceServices(payload)
  await migrateMaintenanceOptions(payload)
  await migrateMaintenanceSubscriptions(payload)

  console.log('\n=== Migration Complete ===')
  console.log('\nNotes:')
  console.log('- Product images were NOT migrated (they remain on Supabase Storage)')
  console.log('- FAQ answers were not converted to richText format')
  console.log('- You can set images and enrich content in Payload Admin at /admin')

  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
