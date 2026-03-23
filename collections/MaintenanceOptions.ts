import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

/**
 * Icon options for maintenance options
 * Based on Lucide icons used in the existing maintenance system
 */
const MAINTENANCE_ICON_OPTIONS = [
  { label: 'Flamme', value: 'Flame' },
  { label: 'Vent', value: 'Wind' },
  { label: 'Soleil', value: 'Sun' },
  { label: 'Soleil moyen', value: 'SunMedium' },
  { label: 'Soleil faible', value: 'SunDim' },
  { label: 'Gouttes', value: 'Droplets' },
  { label: 'Outil', value: 'Wrench' },
  { label: 'Éclair', value: 'Zap' },
  { label: 'Thermomètre', value: 'Thermometer' },
  { label: 'Maison', value: 'Home' },
  { label: 'Bouclier', value: 'Shield' },
  { label: 'Vérification', value: 'CheckCircle' },
]

/**
 * MaintenanceOptions Collection
 * 
 * Manages maintenance add-on options that can be added to maintenance subscriptions.
 * Options can be flat-fee or per-service, and may be exempt from discounts.
 * 
 * @validates Requirements 8.1, 8.2
 */
export const MaintenanceOptions: CollectionConfig = {
  slug: 'maintenance-options',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price_monthly', 'is_flat_fee', 'is_active', 'sort_order'],
    description: 'Options de maintenance additionnelles (forfait, par service, etc.)',
    listSearchableFields: ['name', 'slug', 'description'],
    group: 'Maintenance',
  },
  access: {
    read: () => true, // Public access for frontend configurator - Requirement 8.1
  },
  // Default sort by sort_order for drag-and-drop reordering
  defaultSort: 'sort_order',
  fields: [
    // Name field - Requirement 8.1
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom de l\'option',
      admin: {
        description: 'Ex: Dépannage prioritaire, Pièces détachées incluses',
      },
    },
    // Slug auto-generated - Requirement 8.1
    slugField('name'),
    // Description field - Requirement 8.1
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Description de l\'option de maintenance',
      },
    },
    // Price in cents - Requirement 8.1
    {
      name: 'price_monthly',
      type: 'number',
      required: true,
      min: 0,
      label: 'Prix mensuel (en centimes)',
      admin: {
        description: 'Prix mensuel en centimes d\'euro (ex: 500 = 5,00€/mois)',
      },
    },
    // Icon select - Requirement 8.1
    {
      name: 'icon',
      type: 'select',
      options: MAINTENANCE_ICON_OPTIONS,
      defaultValue: 'Wrench',
      label: 'Icône',
      admin: {
        description: 'Icône affichée pour cette option',
      },
    },
    // Active status - Requirement 8.1
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Actif',
      admin: {
        description: 'Décocher pour masquer cette option du configurateur',
      },
    },
    // Flat fee indicator - Requirement 8.1, 8.2
    {
      name: 'is_flat_fee',
      type: 'checkbox',
      defaultValue: false,
      label: 'Forfait fixe',
      admin: {
        description: 'Cocher si le prix est un forfait fixe (sinon appliqué par service)',
      },
    },
    // Exempt from discount - Requirement 8.1
    {
      name: 'exempt_from_discount',
      type: 'checkbox',
      defaultValue: false,
      label: 'Exempté des remises',
      admin: {
        description: 'Cocher si cette option ne bénéficie pas des remises multi-services ou annuelles',
      },
    },
    // Sort order for drag-and-drop reordering - Requirement 8.1
    {
      name: 'sort_order',
      type: 'number',
      defaultValue: 0,
      label: 'Ordre d\'affichage',
      admin: {
        description: 'Ordre d\'affichage dans le configurateur (plus petit = premier)',
      },
    },
  ],
}
