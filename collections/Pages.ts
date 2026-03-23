import type { CollectionConfig, Access } from 'payload'
import { PageBlocks } from '@/blocks'

/**
 * Reserved slugs that conflict with existing routes
 * These slugs cannot be used for custom pages
 */
const RESERVED_SLUGS = [
  'produits',
  'services',
  'contact',
  'blog',
  'admin',
  'api',
]

/**
 * Access control for Pages
 * Public read access only for published pages
 * Admin access for all operations
 * 
 * @validates Requirements 11.2
 */
const isPublishedOrAdmin: Access = ({ req }) => {
  // Admin users can access all pages
  if (req.user) {
    return true
  }
  
  // Public users can only access published pages
  return {
    status: {
      equals: 'published',
    },
  }
}

/**
 * Pages Collection
 * 
 * Manages custom landing pages with modular block composition.
 * Supports SEO fields and draft/published workflow.
 * 
 * @validates Requirements 11.1, 11.2, 11.3, 11.4, 11.5
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    description: 'Pages personnalisées',
    listSearchableFields: ['title', 'slug'],
  },
  access: {
    // Public read access only for published pages - Requirement 11.2
    read: isPublishedOrAdmin,
    // Admin-only create/update/delete
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // Title - required - Requirement 11.1
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: {
        description: 'Titre de la page',
      },
    },
    // Slug - auto-generated from title - Requirement 11.1
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier (auto-generated from title if empty)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // Auto-generate slug from title if not provided
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
                .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
            }
            return value
          },
        ],
      },
      validate: (value: unknown) => {
        if (!value || typeof value !== 'string') return true
        
        // Check for reserved slugs - Requirement 11.5
        if (RESERVED_SLUGS.includes(value.toLowerCase())) {
          return `Le slug "${value}" est réservé et ne peut pas être utilisé. Slugs réservés: ${RESERVED_SLUGS.join(', ')}`
        }
        
        return true
      },
    },
    // Status - draft/published - Requirement 11.2
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Statut',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      admin: {
        description: 'Les brouillons ne sont pas accessibles publiquement',
      },
    },
    // SEO fields group - Requirement 11.4
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        description: 'Paramètres de référencement',
      },
      fields: [
        {
          name: 'meta_title',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Titre pour les moteurs de recherche (60 caractères max recommandés)',
          },
        },
        {
          name: 'meta_description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Description pour les moteurs de recherche (160 caractères max recommandés)',
          },
        },
        {
          name: 'og_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Open Graph',
          admin: {
            description: 'Image pour le partage sur les réseaux sociaux',
          },
        },
      ],
    },
    // Blocks field - Requirement 11.3
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Blocs de contenu',
      blocks: PageBlocks,
      admin: {
        description: 'Ajoutez des blocs pour composer le contenu de la page',
      },
    },
  ],
}
