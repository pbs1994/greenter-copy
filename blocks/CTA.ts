import type { Block } from 'payload'

/**
 * CTA Block (Call-to-Action)
 * 
 * A modular block for creating call-to-action sections to drive conversions.
 * Supports customizable heading, description, button styling, and background options.
 * 
 * @validates Requirements 17.1, 17.2, 17.3
 */
export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Appel à l\'action',
    plural: 'Appels à l\'action',
  },
  imageURL: '/admin/cta-block-preview.png',
  fields: [
    // Heading - required - Requirement 17.1
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Titre',
      admin: {
        description: 'Titre principal de la section CTA',
      },
    },
    // Description - optional textarea - Requirement 17.1
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Texte descriptif sous le titre',
      },
    },
    // Button group - Requirement 17.2
    {
      name: 'button',
      type: 'group',
      label: 'Bouton',
      admin: {
        description: 'Configuration du bouton d\'action',
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
    // Style select - Requirement 17.3
    {
      name: 'style',
      type: 'select',
      label: 'Style de la section',
      defaultValue: 'default',
      options: [
        { label: 'Par défaut', value: 'default' },
        { label: 'Mis en avant', value: 'highlight' },
        { label: 'Bannière', value: 'banner' },
      ],
      admin: {
        description: 'Style visuel de la section CTA',
      },
    },
    // Background color - Requirement 17.3
    {
      name: 'background_color',
      type: 'text',
      label: 'Couleur de fond',
      admin: {
        description: 'Couleur de fond en format hexadécimal (ex: #f5f5f5)',
        placeholder: '#f5f5f5',
      },
    },
  ],
}
