import type { CollectionConfig, Access } from 'payload'
import { slugField } from '@/fields/slug'
import { PageBlocks } from '@/blocks'

/**
 * Access control for BlogPosts
 * Public read access only for published posts
 * Admin access for all operations
 * 
 * @validates Requirements 10.7
 */
const isPublishedOrAdmin: Access = ({ req }) => {
  // Admin users can access all posts
  if (req.user) {
    return true
  }
  
  // Public users can only access published posts
  return {
    status: {
      equals: 'published',
    },
  }
}

/**
 * BlogPosts Collection
 * 
 * Manages blog articles for SEO and organic traffic generation.
 * Supports rich content with Lexical editor, SEO fields, and tags.
 * 
 * @validates Requirements 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7
 */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'published_date', 'author', 'updatedAt'],
    description: 'Articles de blog',
    listSearchableFields: ['title', 'slug', 'excerpt', 'author'],
  },
  access: {
    // Public read access only for published posts - Requirement 10.7
    read: isPublishedOrAdmin,
    // Admin-only create/update/delete
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // Title - required - Requirement 10.1
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: {
        description: 'Titre de l\'article',
      },
    },
    // Slug - auto-generated from title - Requirement 10.1
    slugField('title'),
    // Excerpt - Requirement 10.2
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extrait',
      admin: {
        description: 'Résumé de l\'article affiché dans les listes',
      },
    },
    // Author - Requirement 10.2
    {
      name: 'author',
      type: 'text',
      label: 'Auteur',
      admin: {
        description: 'Nom de l\'auteur de l\'article',
      },
    },
    // Published date - Requirement 10.3
    {
      name: 'published_date',
      type: 'date',
      label: 'Date de publication',
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
        description: 'Date de publication de l\'article',
      },
    },
    // Status - draft/published - Requirement 10.3, 10.7
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
    // Featured image - Requirement 10.4
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image à la une',
      admin: {
        description: 'Image principale de l\'article',
      },
    },
    // Content - Rich Text with Lexical - Requirement 10.5
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      admin: {
        description: 'Contenu de l\'article avec formatage riche',
      },
    },
    // Blocks field for modular content sections
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Blocs de contenu',
      blocks: PageBlocks,
      admin: {
        description: 'Sections de contenu modulaires pour enrichir l\'article',
      },
    },
    // SEO fields group - Requirement 10.6
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
    // Tags - repeatable text field - Requirement 10.7
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        description: 'Mots-clés pour catégoriser l\'article',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Tag',
        },
      ],
    },
  ],
}
