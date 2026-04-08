import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { syncProductToStripe } from '@/hooks/syncProductToStripe'
import { syncProductToPublic, deleteProductFromPublic } from '@/hooks/syncProductToPublic'
import { ProductBlocks } from '@/blocks'

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

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'is_active', 'is_featured', 'updatedAt'],
    description: 'Produits du catalogue',
    listSearchableFields: ['name', 'slug', 'short_description'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [syncProductToStripe, syncProductToPublic],
    afterDelete: [deleteProductFromPublic],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ═══════════════════════════════════════
        // TAB 1 : ESSENTIEL
        // ═══════════════════════════════════════
        {
          label: 'Essentiel',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Nom du produit',
              admin: {
                description: 'Ex: "Batterie Solaire LiFePO4 5kWh"',
              },
            },
            slugField('name'),
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                  label: 'Catégorie',
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  label: 'Prix (en centimes)',
                  admin: {
                    description: 'Ex: 249900 = 2 499,00 €',
                  },
                },
              ],
            },
            {
              name: 'short_description',
              type: 'textarea',
              label: 'Description courte',
              admin: {
                description: 'Résumé affiché dans les listes et en haut de la page produit (1-2 phrases)',
              },
            },
            {
              name: 'main_image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image principale',
              admin: {
                description: 'Photo du produit sur fond blanc (min 800×800px)',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'is_active',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Actif',
                  admin: {
                    description: 'Visible sur le site',
                  },
                },
                {
                  name: 'is_featured',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Produit vedette',
                  admin: {
                    description: 'Affiché en avant sur la page d\'accueil',
                  },
                },
              ],
            },
          ],
        },

        // ═══════════════════════════════════════
        // TAB 2 : CONTENU
        // ═══════════════════════════════════════
        {
          label: 'Contenu',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description détaillée',
              admin: {
                description: 'Description complète avec formatage (visible sur la page produit)',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              maxRows: 10,
              label: 'Galerie d\'images',
              admin: {
                description: 'Photos supplémentaires du produit (max 10). Plus il y en a, mieux c\'est pour la conversion.',
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
            {
              name: 'features',
              type: 'array',
              label: 'Points forts',
              admin: {
                description: 'Les avantages clés du produit (6 recommandés). Affichés avec des icônes sur la page.',
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
                  admin: { description: 'Ex: "10 000 cycles"' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  admin: { description: 'Ex: "Cellules LiFePO4 CATL"' },
                },
              ],
            },
            {
              name: 'faq',
              type: 'array',
              label: 'Questions fréquentes',
              admin: {
                description: 'FAQ spécifique au produit (aide le SEO et la conversion)',
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
          ],
        },

        // ═══════════════════════════════════════
        // TAB 3 : TECHNIQUE
        // ═══════════════════════════════════════
        {
          label: 'Technique',
          fields: [
            {
              name: 'specs',
              type: 'array',
              label: 'Spécifications techniques',
              admin: {
                description: 'Caractéristiques techniques (puissance, capacité, dimensions, etc.)',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Libellé',
                  admin: { description: 'Ex: "Puissance"' },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Valeur',
                  admin: { description: 'Ex: "5"' },
                },
                {
                  name: 'unit',
                  type: 'text',
                  label: 'Unité',
                  admin: { description: 'Ex: "kW", "kWh", "kg"' },
                },
              ],
            },
            {
              name: 'blocks',
              type: 'blocks',
              label: 'Sections modulaires',
              admin: {
                description: 'Sections de contenu personnalisables (optionnel)',
              },
              blocks: ProductBlocks,
            },
          ],
        },

        // ═══════════════════════════════════════
        // TAB 4 : STRIPE (lecture seule)
        // ═══════════════════════════════════════
        {
          label: 'Stripe & Avancé',
          fields: [
            {
              name: 'stripe_product_id',
              type: 'text',
              label: 'Stripe Product ID',
              admin: {
                readOnly: true,
                description: 'Généré automatiquement à la création du produit',
              },
            },
            {
              name: 'stripe_price_id',
              type: 'text',
              label: 'Stripe Price ID',
              admin: {
                readOnly: true,
                description: 'Généré automatiquement (mis à jour si le prix change)',
              },
            },
          ],
        },
      ],
    },
  ],
}
