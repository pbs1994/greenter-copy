import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections - will be added as we create them
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Customers } from './collections/Customers'
import { Orders } from './collections/Orders'
import { MaintenanceServices } from './collections/MaintenanceServices'
import { MaintenanceOptions } from './collections/MaintenanceOptions'
import { MaintenanceSubscriptions } from './collections/MaintenanceSubscriptions'
import { BlogPosts } from './collections/BlogPosts'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  
  sharp,
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    schemaName: 'payload',
  }),
  
  editor: lexicalEditor(),
  
  // Configuration email pour reset password
  email: resendAdapter({
    defaultFromAddress: 'noreply@greenter.fr',
    defaultFromName: 'Greenter Admin',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  
  collections: [
    Users,
    Media,
    Categories,
    Products,
    Customers,
    Orders,
    MaintenanceServices,
    MaintenanceOptions,
    MaintenanceSubscriptions,
    BlogPosts,
    Pages,
  ],
  
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
