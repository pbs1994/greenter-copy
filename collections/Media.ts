import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true, // Public access for images
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 150, height: 150, position: 'centre' },
      { name: 'card', width: 400, height: 300, position: 'centre' },
      { name: 'medium', width: 800, position: 'centre' },
      { name: 'large', width: 1200, position: 'centre' },
    ],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Enforce 5MB file size limit
        const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
        if (data?.filesize && data.filesize > MAX_FILE_SIZE) {
          throw new Error('La taille du fichier ne doit pas dépasser 5MB')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif',
      admin: {
        description: 'Description de l\'image pour l\'accessibilité',
      },
    },
  ],
}
