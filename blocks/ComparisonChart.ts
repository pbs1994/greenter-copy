import type { Block } from 'payload'

/**
 * ComparisonChart Block
 * 
 * A modular block for creating comparison tables to help customers
 * compare products or configurations. Supports configurable columns,
 * rows with different cell types (text, checkmark, cross), and
 * highlighting a recommended column.
 * 
 * @validates Requirements 16.1, 16.2, 16.3, 16.4, 16.5
 */
export const ComparisonChartBlock: Block = {
  slug: 'comparison-chart',
  labels: {
    singular: 'Tableau comparatif',
    plural: 'Tableaux comparatifs',
  },
  imageURL: '/admin/comparison-chart-block-preview.png',
  fields: [
    // Title - section heading - Requirement 16.1
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
      admin: {
        description: 'Titre affiché au-dessus du tableau comparatif',
      },
    },
    // Columns - configurable column headers - Requirement 16.2
    {
      name: 'columns',
      type: 'array',
      label: 'Colonnes',
      required: true,
      minRows: 2,
      admin: {
        description: 'Colonnes du tableau (produits ou options à comparer)',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          required: true,
          label: 'En-tête',
          admin: {
            description: 'Nom de la colonne (ex: Produit A, Offre Standard)',
          },
        },
      ],
    },
    // Rows - configurable feature rows with cells - Requirement 16.3
    {
      name: 'rows',
      type: 'array',
      label: 'Lignes',
      required: true,
      minRows: 1,
      admin: {
        description: 'Lignes du tableau (caractéristiques à comparer)',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Caractéristique',
          admin: {
            description: 'Nom de la caractéristique comparée (ex: Puissance, Garantie)',
          },
        },
        {
          name: 'cells',
          type: 'array',
          label: 'Cellules',
          required: true,
          admin: {
            description: 'Valeurs pour chaque colonne (doit correspondre au nombre de colonnes)',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Valeur',
              admin: {
                description: 'Texte à afficher (ignoré pour les types coche/croix)',
              },
            },
            {
              name: 'type',
              type: 'select',
              label: 'Type',
              defaultValue: 'text',
              required: true,
              options: [
                { label: 'Texte', value: 'text' },
                { label: 'Coche (✓)', value: 'check' },
                { label: 'Croix (✗)', value: 'cross' },
              ],
              admin: {
                description: 'Type d\'affichage de la cellule',
              },
            },
          ],
        },
      ],
    },
    // Highlight column - Requirement 16.4
    {
      name: 'highlight_column',
      type: 'number',
      label: 'Colonne mise en avant',
      min: 1,
      admin: {
        description: 'Numéro de la colonne à mettre en avant (ex: 2 pour la deuxième colonne). Laissez vide pour aucune mise en avant.',
      },
    },
  ],
}
