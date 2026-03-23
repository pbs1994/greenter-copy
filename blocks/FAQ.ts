import type { Block } from 'payload'

/**
 * FAQ Block
 * 
 * A modular block for displaying frequently asked questions in accordion format.
 * Supports auto-population from parent product FAQ or manual entry.
 * Generates JSON-LD FAQPage structured data for SEO (handled in frontend).
 * 
 * @validates Requirements 14.1, 14.2, 14.3, 14.4, 14.5
 */
export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  imageURL: '/admin/faq-block-preview.png',
  fields: [
    // Title - optional section heading - Requirement 14.5
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
      admin: {
        description: 'Titre optionnel affiché au-dessus de la FAQ',
      },
    },
    // Auto-populate toggle - Requirement 14.3
    {
      name: 'auto_populate',
      type: 'checkbox',
      label: 'Auto-remplissage depuis le produit',
      defaultValue: true,
      admin: {
        description: 'Activer pour utiliser automatiquement la FAQ du produit parent',
      },
    },
    // Manual FAQ items array - Requirements 14.1, 14.2
    {
      name: 'items',
      type: 'array',
      label: 'Questions fréquentes',
      admin: {
        description: 'Questions et réponses personnalisées (utilisées si auto-remplissage désactivé). Affichées en format accordéon.',
        condition: (_data, siblingData) => !siblingData?.auto_populate,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
          admin: {
            description: 'La question fréquemment posée',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Réponse',
          admin: {
            description: 'Réponse détaillée avec formatage (texte enrichi)',
          },
        },
      ],
    },
  ],
}
