import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
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
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.greenter.fr',
  cors: [
    'https://greenter.fr',
    'https://www.greenter.fr',
  ],
  csrf: [
    'https://greenter.fr',
    'https://www.greenter.fr',
  ],
  secret: process.env.PAYLOAD_SECRET!,
  
  sharp,
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!,
      ssl: process.env.NODE_ENV === 'production',
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
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
        media: {
          prefix: 'media',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      clientUploads: true,
    }),
  ],
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
