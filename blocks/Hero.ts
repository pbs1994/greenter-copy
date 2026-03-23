import type { Block } from 'payload'

/**
 * Hero Block
 * 
 * A modular hero section block for creating impactful visual headers
 * on products, pages, and blog posts.
 * 
 * @validates Requirements 12.1, 12.2, 12.3, 12.4
 */
export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  imageURL: '/admin/hero-block-preview.png',
  fields: [
    // Heading - required - Requirement 12.1
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: {
        description: 'Titre principal du hero',
      },
    },
    // Subheading - optional - Requirement 12.1
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Sous-titre',
      admin: {
        description: 'Texte secondaire sous le titre',
      },
    },
    // Background image - Requirement 12.2
    {
      name: 'background_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de fond',
      admin: {
        description: 'Image d\'arrière-plan du hero',
      },
    },
    // CTA group - Requirement 12.3
    {
      name: 'cta',
      type: 'group',
      label: 'Appel à l\'action',
      admin: {
        description: 'Bouton d\'action optionnel',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texte du bouton',
          admin: {
            description: 'Texte affiché sur le bouton',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Lien',
          admin: {
            description: 'URL de destination du bouton',
          },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Style',
          defaultValue: 'primary',
          options: [
            { label: 'Primaire', value: 'primary' },
            { label: 'Secondaire', value: 'secondary' },
          ],
          admin: {
            description: 'Style visuel du bouton',
          },
        },
      ],
    },
    // Alignment - Requirement 12.4
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignement',
      defaultValue: 'center',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Centre', value: 'center' },
        { label: 'Droite', value: 'right' },
      ],
      admin: {
        description: 'Alignement du contenu dans le hero',
      },
    },
    // Overlay - Requirement 12.4
    {
      name: 'overlay',
      type: 'checkbox',
      label: 'Overlay sombre',
      defaultValue: false,
      admin: {
        description: 'Ajouter un overlay sombre sur l\'image de fond pour améliorer la lisibilité',
      },
    },
  ],
}
