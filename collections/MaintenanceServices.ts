import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

/**
 * Icon options for maintenance services
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
 * MaintenanceServices Collection
 * 
 * Manages maintenance service offerings (e.g., gas boiler, heat pump, solar panels).
 * Services can be subscribed to by customers for regular maintenance.
 * 
 * @validates Requirements 7.1, 7.2, 7.3, 7.4
 */
export const MaintenanceServices: CollectionConfig = {
  slug: 'maintenance-services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price_monthly', 'is_active', 'sort_order'],
    description: 'Services de maintenance (chaudière, PAC, photovoltaïque, etc.)',
    listSearchableFields: ['name', 'slug', 'description'],
    // Enable drag-and-drop reordering - Requirement 7.3
    group: 'Maintenance',
  },
  access: {
    read: () => true, // Public access for frontend configurator - Requirement 7.4
  },
  // Default sort by sort_order for drag-and-drop reordering
  defaultSort: 'sort_order',
  fields: [
    // Name field - Requirement 7.1
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du service',
      admin: {
        description: 'Ex: Chaudière à gaz, Pompe à chaleur, Photovoltaïque',
      },
    },
    // Slug auto-generated - Requirement 7.1
    slugField('name'),
    // Description field - Requirement 7.1
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Description du service de maintenance',
      },
    },
    // Price in cents - Requirement 7.1
    {
      name: 'price_monthly',
      type: 'number',
      required: true,
      min: 0,
      label: 'Prix mensuel (en centimes)',
      admin: {
        description: 'Prix mensuel en centimes d\'euro (ex: 1500 = 15,00€/mois)',
      },
    },
    // Icon select - Requirement 7.1
    {
      name: 'icon',
      type: 'select',
      options: MAINTENANCE_ICON_OPTIONS,
      defaultValue: 'Wrench',
      label: 'Icône',
      admin: {
        description: 'Icône affichée pour ce service',
      },
    },
    // Repeatable text field for inclusions - Requirement 7.2
    {
      name: 'includes',
      type: 'array',
      label: 'Inclus dans le service',
      admin: {
        description: 'Liste des prestations incluses dans ce service',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Prestation incluse',
        },
      ],
    },
    // Active status - Requirement 7.1
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Actif',
      admin: {
        description: 'Décocher pour masquer ce service du configurateur',
      },
    },
    // Sort order for drag-and-drop reordering - Requirement 7.1, 7.3
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
