import type { CollectionConfig, CollectionBeforeDeleteHook } from 'payload'
import { slugField } from '@/fields/slug'
import {
  syncCategoryToPublic,
  deleteCategoryFromPublic,
} from '@/hooks/syncCategoryToPublic'

// Hook to prevent deletion if products are assigned to this category
const preventDeleteIfProductsExist: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const payload = req.payload

  // Check if any products are assigned to this category
  const { totalDocs } = await payload.find({
    collection: 'products',
    where: {
      category: { equals: id },
    },
    limit: 1,
  })

  if (totalDocs > 0) {
    throw new Error(
      `Impossible de supprimer cette catégorie car ${totalDocs} produit(s) y sont assignés. Veuillez d'abord réassigner ou supprimer ces produits.`
    )
  }
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'createdAt'],
    description: 'Catégories de produits',
  },
  access: {
    read: () => true, // Public access for categories
  },
  hooks: {
    afterChange: [syncCategoryToPublic],
    beforeDelete: [preventDeleteIfProductsExist],
    afterDelete: [deleteCategoryFromPublic],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom',
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'spec_fields',
      type: 'array',
      label: 'Champs de spécifications',
      admin: {
        description: 'Définir les champs de spécifications pour les produits de cette catégorie',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nom du champ',
        },
        {
          name: 'key',
          type: 'text',
          required: true,
          label: 'Clé',
          admin: {
            description: 'Identifiant unique pour ce champ (ex: puissance, capacite)',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Type',
          options: [
            { label: 'Texte', value: 'text' },
            { label: 'Nombre', value: 'number' },
            { label: 'Sélection', value: 'select' },
          ],
          defaultValue: 'text',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unité',
          admin: {
            description: 'Unité de mesure (ex: kW, kWh, kg)',
            condition: (data, siblingData) => siblingData?.type === 'number',
          },
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Obligatoire',
          defaultValue: false,
        },
        {
          name: 'options',
          type: 'array',
          label: 'Options',
          admin: {
            description: 'Options disponibles pour le type sélection',
            condition: (data, siblingData) => siblingData?.type === 'select',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Valeur',
            },
          ],
        },
      ],
    },
  ],
}
