import type { Block } from 'payload'

/**
 * Gallery Block
 * 
 * A modular block for displaying image galleries with responsive grid layout,
 * lightbox support, and optional captions. Supports auto-population from
 * parent product gallery images.
 * 
 * @validates Requirements 15.1, 15.2, 15.3, 15.4
 */
export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Galerie',
    plural: 'Galeries',
  },
  imageURL: '/admin/gallery-block-preview.png',
  fields: [
    // Title - optional section heading
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
      admin: {
        description: 'Titre optionnel affiché au-dessus de la galerie',
      },
    },
    // Responsive grid columns - Requirement 15.1
    {
      name: 'columns',
      type: 'select',
      label: 'Nombre de colonnes',
      defaultValue: '3',
      options: [
        { label: '2 colonnes', value: '2' },
        { label: '3 colonnes', value: '3' },
        { label: '4 colonnes', value: '4' },
      ],
      admin: {
        description: 'Nombre de colonnes dans la grille (responsive sur mobile)',
      },
    },
    // Lightbox toggle - Requirement 15.2
    {
      name: 'lightbox',
      type: 'checkbox',
      label: 'Activer le lightbox',
      defaultValue: true,
      admin: {
        description: 'Permettre l\'affichage en plein écran au clic sur une image',
      },
    },
    // Auto-populate toggle - Requirement 15.4
    {
      name: 'auto_populate',
      type: 'checkbox',
      label: 'Auto-remplissage depuis le produit',
      defaultValue: true,
      admin: {
        description: 'Activer pour utiliser automatiquement la galerie du produit parent',
      },
    },
    // Manual images array - Requirement 15.3
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      admin: {
        description: 'Images personnalisées avec légendes optionnelles (utilisées si auto-remplissage désactivé)',
        condition: (_data, siblingData) => !siblingData?.auto_populate,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
          admin: {
            description: 'Image à afficher dans la galerie',
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Légende',
          admin: {
            description: 'Légende optionnelle affichée sous l\'image',
          },
        },
      ],
    },
  ],
}
