import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { syncProductToStripe } from '@/hooks/syncProductToStripe'
import { syncProductToPublic, deleteProductFromPublic } from '@/hooks/syncProductToPublic'
import { ProductBlocks } from '@/blocks'

/**
 * Icon options for product features
 * Based on Lucide icons commonly used in the project
 */
const ICON_OPTIONS = [
  { label: 'Soleil', value: 'sun' },
  { label: 'Batterie', value: 'battery' },
  { label: 'Éclair', value: 'zap' },
  { label: 'Feuille', value: 'leaf' },
  { label: 'Bouclier', value: 'shield' },
  { label: 'Horloge', value: 'clock' },
  { label: 'Thermomètre', value: 'thermometer' },
  { label: 'Wifi', value: 'wifi' },
  { label: 'Paramètres', value: 'settings' },
  { label: 'Vérification', value: 'check-circle' },
  { label: 'Étoile', value: 'star' },
  { label: 'Cœur', value: 'heart' },
  { label: 'Maison', value: 'home' },
  { label: 'Outil', value: 'wrench' },
  { label: 'Graphique', value: 'bar-chart' },
  { label: 'Euro', value: 'euro' },
  { label: 'Camion', value: 'truck' },
  { label: 'Téléphone', value: 'phone' },
  { label: 'Mail', value: 'mail' },
  { label: 'Info', value: 'info' },
]

/**
 * Products Collection
 * 
 * Manages all products in the e-commerce store with rich content,
 * modular blocks, and Stripe integration.
 * 
 * @validates Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11
 */
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'is_active', 'updatedAt'],
    description: 'Produits du catalogue',
    listSearchableFields: ['name', 'slug', 'short_description'],
  },
  access: {
    read: () => true, // Public access for products
  },
  hooks: {
    afterChange: [syncProductToStripe, syncProductToPublic],
    afterDelete: [deleteProductFromPublic],
  },
  fields: [
    // Basic fields - Requirement 2.1
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du produit',
    },
    // Slug auto-generated - Requirement 2.1, 2.11
    slugField('name'),
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Prix (en centimes)',
      admin: {
        description: 'Prix en centimes d\'euro (ex: 24990 = 249,90€)',
      },
    },
    {
      name: 'short_description',
      type: 'textarea',
      label: 'Description courte',
      admin: {
        description: 'Résumé du produit affiché dans les listes',
      },
    },
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Actif',
      admin: {
        description: 'Décocher pour masquer le produit du site',
      },
    },
    // Stripe IDs - Requirement 2.1
    {
      name: 'stripe_product_id',
      type: 'text',
      label: 'Stripe Product ID',
      admin: {
        readOnly: true,
        description: 'ID du produit Stripe (généré automatiquement)',
      },
    },
    {
      name: 'stripe_price_id',
      type: 'text',
      label: 'Stripe Price ID',
      admin: {
        readOnly: true,
        description: 'ID du prix Stripe (généré automatiquement)',
      },
    },
    // Category relationship - Requirement 2.2
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Catégorie',
      admin: {
        description: 'Catégorie du produit',
      },
    },
    // Rich Text description - Requirement 2.3
    {
      name: 'description',
      type: 'richText',
      label: 'Description détaillée',
      admin: {
        description: 'Description complète du produit avec formatage',
      },
    },
    // Specs repeatable group - Requirement 2.4
    {
      name: 'specs',
      type: 'array',
      label: 'Spécifications techniques',
      admin: {
        description: 'Caractéristiques techniques du produit',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Libellé',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Valeur',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unité',
          admin: {
            description: 'Unité de mesure (ex: kW, kWh, kg)',
          },
        },
      ],
    },
    // Features repeatable group - Requirement 2.5
    {
      name: 'features',
      type: 'array',
      label: 'Caractéristiques',
      admin: {
        description: 'Points forts et fonctionnalités du produit',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ICON_OPTIONS,
          label: 'Icône',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
    // FAQ repeatable group - Requirement 2.6
    {
      name: 'faq',
      type: 'array',
      label: 'Questions fréquentes',
      admin: {
        description: 'FAQ spécifique au produit',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Réponse',
        },
      ],
    },
    // Main product image - Requirement 2.7
    {
      name: 'main_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image principale',
      admin: {
        description: 'Image principale du produit',
      },
    },
    // Gallery images - Requirement 2.8
    {
      name: 'gallery',
      type: 'array',
      maxRows: 10,
      label: 'Galerie d\'images',
      admin: {
        description: 'Images supplémentaires du produit (max 10)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },
    // Blocks field for modular sections - Requirement 2.9
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Sections modulaires',
      admin: {
        description: 'Sections de contenu personnalisables pour la page produit',
      },
      blocks: ProductBlocks,
    },
  ],
}
