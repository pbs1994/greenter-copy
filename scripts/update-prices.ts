import { getPayloadClient } from '../lib/payload'

async function updatePrices() {
  console.log('Updating prices in Payload...')
  const payload = await getPayloadClient()
  
  // Update onduleur price to 1690€ (169000 centimes)
  const { docs: onduleurs } = await payload.find({
    collection: 'products',
    where: { slug: { contains: 'onduleur' } },
  })
  
  for (const p of onduleurs) {
    await payload.update({
      collection: 'products',
      id: p.id,
      data: { price: 169000 },
    })
    console.log('✅ Updated onduleur:', p.name, '-> 1690€')
  }
  
  // Update batterie price to 1790€ (179000 centimes)
  const { docs: batteries } = await payload.find({
    collection: 'products',
    where: { slug: { contains: 'batterie' } },
  })
  
  for (const p of batteries) {
    await payload.update({
      collection: 'products',
      id: p.id,
      data: { price: 179000 },
    })
    console.log('✅ Updated batterie:', p.name, '-> 1790€')
  }
  
  console.log('Done!')
  process.exit(0)
}

updatePrices()
