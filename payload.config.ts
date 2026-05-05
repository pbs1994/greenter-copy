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
import { MaintenanceServices } from './collections/MaintenanceServices'
import { MaintenanceOptions } from './collections/MaintenanceOptions'
import { BlogPosts } from './collections/BlogPosts'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Production-only allow-list. If a non-prod environment (Vercel preview,
// staging.greenter.fr, …) is ever introduced, add its origin to the
// `PAYLOAD_TRUSTED_ORIGINS` env var (comma-separated). NEVER use a wildcard
// — this list governs CORS *and* CSRF, so adding `*` would let any site
// initiate logged-in admin requests on behalf of a signed-in admin.
const TRUSTED_ORIGINS = [
  'https://greenter.fr',
  'https://www.greenter.fr',
  ...(process.env.PAYLOAD_TRUSTED_ORIGINS
    ? process.env.PAYLOAD_TRUSTED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
    : []),
]

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.greenter.fr',
  cors: TRUSTED_ORIGINS,
  csrf: TRUSTED_ORIGINS,
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
    MaintenanceServices,
    MaintenanceOptions,
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
      // Vercel Blob refuses to overwrite an existing blob with the same
      // path. Without addRandomSuffix, re-uploading a file with the same
      // name (or even retrying after a partial failure) blows up with
      // "This blob already exists". The random suffix makes every upload
      // a unique URL, which is what Vercel recommends.
      addRandomSuffix: true,
      clientUploads: true,
    }),
  ],
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
