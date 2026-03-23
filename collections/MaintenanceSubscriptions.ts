import type { CollectionConfig } from 'payload'

/**
 * MaintenanceSubscriptions Collection
 * 
 * Manages maintenance subscription contracts for customers.
 * Tracks Stripe subscription data, billing periods, discounts, and subscription items.
 * 
 * @validates Requirements 9.1, 9.2, 9.3, 9.4, 9.5
 */
export const MaintenanceSubscriptions: CollectionConfig = {
  slug: 'maintenance-subscriptions',
  admin: {
    useAsTitle: 'stripe_subscription_id',
    defaultColumns: ['customer', 'status', 'billing_period', 'total', 'createdAt'],
    description: 'Abonnements de maintenance',
    listSearchableFields: ['stripe_subscription_id'],
    group: 'Maintenance',
  },
  access: {
    // Admin-only access for all operations - not public read
    read: ({ req }) => !!req.user,
    create: () => true, // Webhook can create subscriptions
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // Stripe subscription ID - Requirement 9.1
    {
      name: 'stripe_subscription_id',
      type: 'text',
      unique: true,
      index: true,
      label: 'Stripe Subscription ID',
      admin: {
        description: 'ID de l\'abonnement Stripe',
      },
    },
    // Customer relationship - Required
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Client',
      admin: {
        description: 'Client associé à l\'abonnement',
      },
    },
    // Billing period - Requirement 9.1
    {
      name: 'billing_period',
      type: 'select',
      required: true,
      defaultValue: 'monthly',
      label: 'Période de facturation',
      options: [
        { label: 'Mensuel', value: 'monthly' },
        { label: 'Annuel', value: 'annual' },
      ],
      admin: {
        description: 'Fréquence de facturation de l\'abonnement',
      },
    },
    // Status - Requirement 9.1
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      label: 'Statut',
      options: [
        { label: 'Actif', value: 'active' },
        { label: 'Annulé', value: 'cancelled' },
        { label: 'Impayé', value: 'past_due' },
        { label: 'En pause', value: 'paused' },
      ],
      admin: {
        description: 'Statut actuel de l\'abonnement',
      },
    },
    // Totals group - Requirement 9.2
    {
      name: 'totals',
      type: 'group',
      label: 'Totaux',
      admin: {
        description: 'Montants de l\'abonnement (en centimes)',
      },
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 0,
          label: 'Sous-total (centimes)',
          admin: {
            description: 'Sous-total avant remises en centimes d\'euro',
          },
        },
        {
          name: 'discount_amount',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 0,
          label: 'Montant remise (centimes)',
          admin: {
            description: 'Montant total des remises en centimes d\'euro',
          },
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 0,
          label: 'Total (centimes)',
          admin: {
            description: 'Total après remises en centimes d\'euro',
          },
        },
      ],
    },
    // Discounts group - Requirement 9.3
    {
      name: 'discounts',
      type: 'group',
      label: 'Remises',
      admin: {
        description: 'Pourcentages de remise appliqués',
      },
      fields: [
        {
          name: 'multi_service_discount',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 0,
          label: 'Remise multi-services (%)',
          admin: {
            description: 'Pourcentage de remise pour plusieurs services',
          },
        },
        {
          name: 'annual_discount',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 0,
          label: 'Remise annuelle (%)',
          admin: {
            description: 'Pourcentage de remise pour paiement annuel',
          },
        },
      ],
    },
    // Subscription items - Requirement 9.4
    {
      name: 'items',
      type: 'array',
      label: 'Éléments de l\'abonnement',
      admin: {
        description: 'Services et options inclus dans l\'abonnement',
      },
      fields: [
        {
          name: 'item_type',
          type: 'select',
          required: true,
          label: 'Type',
          options: [
            { label: 'Service', value: 'service' },
            { label: 'Option', value: 'option' },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nom',
          admin: {
            description: 'Nom du service ou de l\'option',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
          label: 'Quantité',
        },
        {
          name: 'unit_price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Prix unitaire (centimes)',
          admin: {
            description: 'Prix unitaire mensuel en centimes d\'euro',
          },
        },
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'maintenance-services',
          label: 'Service',
          admin: {
            description: 'Référence au service de maintenance (si type = service)',
            condition: (data, siblingData) => siblingData?.item_type === 'service',
          },
        },
        {
          name: 'option',
          type: 'relationship',
          relationTo: 'maintenance-options',
          label: 'Option',
          admin: {
            description: 'Référence à l\'option de maintenance (si type = option)',
            condition: (data, siblingData) => siblingData?.item_type === 'option',
          },
        },
      ],
    },
    // MRR virtual field - Requirement 9.5
    // This is a computed field that calculates Monthly Recurring Revenue
    // For annual subscriptions, it divides the total by 12
    {
      name: 'mrr',
      type: 'number',
      label: 'MRR (centimes)',
      admin: {
        readOnly: true,
        description: 'Revenu mensuel récurrent en centimes (calculé automatiquement)',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Calculate MRR based on billing period
            const total = siblingData?.totals?.total || 0
            const billingPeriod = siblingData?.billing_period || 'monthly'
            
            // For annual subscriptions, divide by 12 to get monthly equivalent
            if (billingPeriod === 'annual') {
              return Math.round(total / 12)
            }
            return total
          },
        ],
      },
    },
    // Cancelled at date
    {
      name: 'cancelled_at',
      type: 'date',
      label: 'Date d\'annulation',
      admin: {
        description: 'Date à laquelle l\'abonnement a été annulé',
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm',
        },
      },
    },
    // Note: createdAt is automatically managed by Payload
  ],
}
