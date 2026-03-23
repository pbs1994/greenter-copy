/**
 * Seed script to create products in Payload CMS
 * Run with: npx tsx --env-file=.env.local scripts/seed-products.ts
 */

import { getPayloadClient } from '../lib/payload'

async function seedProducts() {
  console.log('🌱 Starting product seed...')
  
  const payload = await getPayloadClient()
  
  // 1. Create or find category
  console.log('📁 Creating category...')
  let category
  
  const { docs: existingCategories } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'stockage-solaire' } },
    limit: 1,
  })
  
  if (existingCategories.length > 0) {
    category = existingCategories[0]
    console.log('✅ Category already exists:', category.name)
  } else {
    category = await payload.create({
      collection: 'categories',
      data: {
        name: 'Stockage solaire',
        slug: 'stockage-solaire',
        description: 'Solutions de stockage d\'énergie solaire - batteries et onduleurs hybrides',
      },
    })
    console.log('✅ Created category:', category.name)
  }
  
  // 2. Create Onduleur product
  console.log('⚡ Creating Onduleur product...')
  
  const { docs: existingOnduleur } = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'onduleur-kstar-blue-s-5000d' } },
    limit: 1,
  })
  
  if (existingOnduleur.length > 0) {
    console.log('✅ Onduleur already exists')
  } else {
    await payload.create({
      collection: 'products',
      data: {
        name: 'Onduleur KSTAR BluE-S 5000D',
        slug: 'onduleur-kstar-blue-s-5000d',
        price: 249900, // 2499€ in cents
        short_description: 'Onduleur hybride monophasé 5kW avec double MPPT. Le cerveau de votre installation solaire.',
        is_active: true,
        category: category.id,
        specs: [
          { label: 'Puissance nominale', value: '5', unit: 'kW' },
          { label: 'Puissance max panneaux', value: '6.5', unit: 'kW' },
          { label: 'Tension max entrée', value: '580', unit: 'V' },
          { label: 'Nombre de MPPT', value: '2' },
          { label: 'Rendement max', value: '97.6', unit: '%' },
          { label: 'Protection', value: 'IP65' },
          { label: 'Garantie', value: '5 ans' },
        ],
      },
    })
    console.log('✅ Created Onduleur product')
  }
  
  // 3. Create Batterie product
  console.log('🔋 Creating Batterie product...')
  
  const { docs: existingBatterie } = await payload.find({
    collection: 'products',
    where: { slug: { equals: 'batterie-kstar-blue-pack' } },
    limit: 1,
  })
  
  if (existingBatterie.length > 0) {
    console.log('✅ Batterie already exists')
  } else {
    await payload.create({
      collection: 'products',
      data: {
        name: 'Batterie KSTAR BluE-PACK 5.12 kWh',
        slug: 'batterie-kstar-blue-pack',
        price: 349900, // 3499€ in cents
        short_description: 'Batterie LiFePO4 CATL 5.12 kWh. 10 000 cycles garantis, extensible jusqu\'à 20 kWh.',
        is_active: true,
        category: category.id,
        specs: [
          { label: 'Capacité', value: '5.12', unit: 'kWh' },
          { label: 'Technologie', value: 'LiFePO4 CATL' },
          { label: 'Cycles garantis', value: '10 000' },
          { label: 'Tension nominale', value: '51.2', unit: 'V' },
          { label: 'Profondeur de décharge', value: '90', unit: '%' },
          { label: 'Protection', value: 'IP65' },
          { label: 'Garantie', value: '10 ans' },
        ],
      },
    })
    console.log('✅ Created Batterie product')
  }
  
  console.log('🎉 Seed complete!')
  process.exit(0)
}

seedProducts().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
