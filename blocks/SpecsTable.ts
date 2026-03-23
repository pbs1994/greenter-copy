import type { Block } from 'payload'

/**
 * SpecsTable Block
 * 
 * A modular block for displaying technical specifications in a formatted table.
 * Supports auto-population from parent product specs or manual entry.
 * 
 * @validates Requirements 13.1, 13.2, 13.3, 13.4
 */
export const SpecsTableBlock: Block = {
  slug: 'specs-table',
  labels: {
    singular: 'Tableau de spécifications',
    plural: 'Tableaux de spécifications',
  },
  imageURL: '/admin/specs-table-block-preview.png',
  fields: [
    // Title - optional section heading - Requirement 13.3
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
      admin: {
        description: 'Titre optionnel affiché au-dessus du tableau',
      },
    },
    // Auto-populate toggle - Requirement 13.1
    {
      name: 'auto_populate',
      type: 'checkbox',
      label: 'Auto-remplissage depuis le produit',
      defaultValue: true,
      admin: {
        description: 'Activer pour utiliser automatiquement les spécifications du produit parent',
      },
    },
    // Manual specs array - Requirement 13.2
    {
      name: 'specs',
      type: 'array',
      label: 'Spécifications manuelles',
      admin: {
        description: 'Spécifications personnalisées (utilisées si auto-remplissage désactivé)',
        condition: (_data, siblingData) => !siblingData?.auto_populate,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Libellé',
          admin: {
            description: 'Nom de la caractéristique (ex: Puissance)',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Valeur',
          admin: {
            description: 'Valeur de la caractéristique (ex: 5 kW)',
          },
        },
      ],
    },
    // Columns configuration - Requirement 13.4
    {
      name: 'columns',
      type: 'number',
      label: 'Nombre de colonnes',
      defaultValue: 2,
      min: 1,
      max: 3,
      admin: {
        description: 'Disposition du tableau (1 à 3 colonnes)',
      },
    },
  ],
}
