import type { Field } from 'payload'

/**
 * Reusable slug field with auto-generation from a source field.
 * 
 * The slug is auto-generated from the source field value if not provided.
 * It normalizes the text by:
 * - Converting to lowercase
 * - Removing accents (NFD normalization)
 * - Replacing non-alphanumeric characters with hyphens
 * - Removing leading/trailing hyphens
 * 
 * @param sourceField - The field name to generate the slug from (default: 'name')
 * @returns A Payload Field configuration for the slug
 * 
 * @example
 * // In a collection definition:
 * import { slugField } from '@/fields/slug'
 * 
 * fields: [
 *   { name: 'name', type: 'text', required: true },
 *   slugField('name'),
 * ]
 * 
 * @validates Requirements 2.11, 3.1
 */
export const slugField = (sourceField: string = 'name'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  label: 'Slug',
  admin: {
    description: 'URL-friendly identifier (auto-generated from name if empty)',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        // Auto-generate slug from source field if not provided
        if (!value && data?.[sourceField]) {
          return data[sourceField]
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
})
