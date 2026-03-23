import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'phone', 'createdAt'],
    description: 'Gestion des clients',
  },
  access: {
    // Admin-only access for all operations
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Téléphone',
    },
    // Note: createdAt is automatically managed by Payload
    // Relationships to Orders and Maintenance_Subscriptions will be added
    // when those collections are created (reverse relationships)
  ],
}
