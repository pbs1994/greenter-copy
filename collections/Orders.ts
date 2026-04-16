import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { generateOrderNumber } from '@/hooks/generateOrderNumber'

/**
 * Hook to log status changes in status_history
 * 
 * @validates Requirements 6.7
 */
const logStatusChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  // Only track status changes on update operations
  if (operation !== 'update') {
    return doc
  }

  // Check if status has changed
  const previousStatus = previousDoc?.status
  const currentStatus = doc.status

  if (previousStatus && previousStatus !== currentStatus) {
    const statusHistoryEntry = {
      status: currentStatus,
      changed_at: new Date().toISOString(),
      changed_by: req.user?.id || null,
    }

    // Get existing status_history or initialize empty array
    const existingHistory = doc.status_history || []

    // Update the document with new status_history entry
    await req.payload.update({
      collection: 'orders',
      id: doc.id,
      data: {
        status_history: [...existingHistory, statusHistoryEntry],
      },
      // Prevent infinite loop by not triggering hooks
      context: {
        skipStatusHistoryHook: true,
      },
    })

    return {
      ...doc,
      status_history: [...existingHistory, statusHistoryEntry],
    }
  }

  return doc
}

/**
 * Orders Collection
 * 
 * Manages all orders in the e-commerce store with status tracking,
 * customer relationships, and order items.
 * 
 * @validates Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8
 */
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'order_number',
    defaultColumns: ['order_number', 'customer', 'status', 'amount', 'createdAt'],
    description: 'Gestion des commandes',
    listSearchableFields: ['order_number', 'stripe_session_id'],
  },
  access: {
    // Admin-only read access - Requirement 6.8
    read: ({ req }) => req.user?.role === 'admin',
    // Webhook can create orders (no auth required) - secured by Stripe signature verification
    create: () => true,
    // Admin-only update access - Requirement 6.8
    update: ({ req }) => req.user?.role === 'admin',
    // Admin-only delete access - Requirement 6.8
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeChange: [generateOrderNumber],
    afterChange: [
      async (args) => {
        // Skip if context indicates we're already in the hook
        if (args.context?.skipStatusHistoryHook) {
          return args.doc
        }
        return logStatusChange(args)
      },
    ],
  },
  fields: [
    // Order number - auto-generated - Requirement 6.1
    {
      name: 'order_number',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Numéro de commande',
      admin: {
        readOnly: true,
        description: 'Numéro de commande généré automatiquement (GRN-YYYYMMDD-XXXX)',
      },
    },
    // Stripe session ID - Requirement 6.1
    {
      name: 'stripe_session_id',
      type: 'text',
      unique: true,
      index: true,
      label: 'Stripe Session ID',
      admin: {
        description: 'ID de la session Stripe Checkout',
      },
    },
    // Status with enum values - Requirement 6.1, 6.5, 6.6
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      label: 'Statut',
      options: [
        { label: 'En attente', value: 'pending' },
        { label: 'Payée', value: 'paid' },
        { label: 'Expédiée', value: 'shipped' },
        { label: 'Livrée', value: 'delivered' },
        { label: 'Annulée', value: 'cancelled' },
      ],
      admin: {
        description: 'Statut actuel de la commande',
      },
    },
    // Amount in cents - Requirement 6.1
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
      label: 'Montant (centimes)',
      admin: {
        description: 'Montant total en centimes d\'euro',
      },
    },
    // Customer relationship - Requirement 6.2
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Client',
      admin: {
        description: 'Client associé à la commande',
      },
    },
    // Shipping address as JSON - Requirement 6.3
    {
      name: 'shipping_address',
      type: 'json',
      label: 'Adresse de livraison',
      admin: {
        description: 'Adresse de livraison au format JSON',
      },
    },
    // Billing address as JSON - Requirement 6.3
    {
      name: 'billing_address',
      type: 'json',
      label: 'Adresse de facturation',
      admin: {
        description: 'Adresse de facturation au format JSON',
      },
    },
    // Order items - Requirement 6.4
    {
      name: 'items',
      type: 'array',
      label: 'Articles',
      admin: {
        description: 'Liste des articles de la commande',
      },
      fields: [
        {
          name: 'product_name',
          type: 'text',
          required: true,
          label: 'Nom du produit',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          label: 'Quantité',
        },
        {
          name: 'unit_price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Prix unitaire (centimes)',
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          label: 'Produit',
          admin: {
            description: 'Référence au produit (si disponible)',
          },
        },
      ],
    },
    // Status history - Requirement 6.7
    {
      name: 'status_history',
      type: 'array',
      label: 'Historique des statuts',
      admin: {
        readOnly: true,
        description: 'Historique des changements de statut',
      },
      fields: [
        {
          name: 'status',
          type: 'text',
          label: 'Statut',
        },
        {
          name: 'changed_at',
          type: 'date',
          label: 'Date de changement',
          admin: {
            date: {
              displayFormat: 'dd/MM/yyyy HH:mm',
            },
          },
        },
        {
          name: 'changed_by',
          type: 'relationship',
          relationTo: 'users',
          label: 'Modifié par',
        },
      ],
    },
    // Note: createdAt is automatically managed by Payload
  ],
}
