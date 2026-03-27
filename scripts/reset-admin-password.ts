/**
 * Script to reset Payload admin password
 * Run with: npx tsx scripts/reset-admin-password.ts [email]
 * 
 * If no email is provided, it will reset the first admin user found.
 * A random secure password will be generated.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import crypto from 'crypto'

// Generate a secure random password
function generateSecurePassword(): string {
  const length = 16
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  const randomBytes = crypto.randomBytes(length)
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length]
  }
  return password
}

async function resetAdminPassword() {
  const targetEmail = process.argv[2] // Optional email argument
  const newPassword = generateSecurePassword()
  
  console.log('🔄 Connecting to Payload...')
  
  const payload = await getPayload({ config })
  
  // Find user(s)
  const { docs: users } = await payload.find({
    collection: 'users',
    where: targetEmail 
      ? { email: { equals: targetEmail } }
      : { role: { equals: 'admin' } },
    limit: 1,
  })
  
  if (users.length === 0) {
    if (targetEmail) {
      console.log(`❌ No user found with email: ${targetEmail}`)
    } else {
      console.log('❌ No admin users found. Creating new admin user...')
      
      const adminEmail = 'admin@greenter.fr'
      await payload.create({
        collection: 'users',
        data: {
          email: adminEmail,
          password: newPassword,
          role: 'admin',
        },
      })
      
      console.log('✅ Admin user created!')
      console.log('═'.repeat(50))
      console.log(`📧 Email: ${adminEmail}`)
      console.log(`🔑 Password: ${newPassword}`)
      console.log('═'.repeat(50))
      console.log('\n⚠️  IMPORTANT: Save this password now! It won\'t be shown again.')
    }
  } else {
    const user = users[0]
    console.log(`📧 Found user: ${user.email}`)
    
    // Update password
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: newPassword,
      },
    })
    
    console.log('✅ Password reset successful!')
    console.log('═'.repeat(50))
    console.log(`📧 Email: ${user.email}`)
    console.log(`🔑 New password: ${newPassword}`)
    console.log('═'.repeat(50))
    console.log('\n⚠️  IMPORTANT: Save this password now! It won\'t be shown again.')
  }
  
  console.log('\n👉 Go to /admin and login with these credentials')
  process.exit(0)
}

resetAdminPassword().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
