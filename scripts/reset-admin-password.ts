/**
 * Script to reset Payload admin password
 * Run with: npx tsx scripts/reset-admin-password.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const NEW_PASSWORD = 'admin123' // Change this to whatever you want

async function resetAdminPassword() {
  console.log('🔄 Connecting to Payload...')
  
  const payload = await getPayload({ config })
  
  // Find admin user
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })
  
  if (users.length === 0) {
    console.log('❌ No users found. Creating new admin user...')
    
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@greenter.fr',
        password: NEW_PASSWORD,
        role: 'admin',
      },
    })
    
    console.log('✅ Admin user created!')
    console.log('📧 Email: admin@greenter.fr')
    console.log(`🔑 Password: ${NEW_PASSWORD}`)
  } else {
    const adminUser = users[0]
    console.log(`📧 Found user: ${adminUser.email}`)
    
    // Update password
    await payload.update({
      collection: 'users',
      id: adminUser.id,
      data: {
        password: NEW_PASSWORD,
      },
    })
    
    console.log('✅ Password reset successful!')
    console.log(`📧 Email: ${adminUser.email}`)
    console.log(`🔑 New password: ${NEW_PASSWORD}`)
  }
  
  console.log('\n👉 Go to /admin and login with these credentials')
  process.exit(0)
}

resetAdminPassword().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
