import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type { Order, Customer, OrderItem, Address, OrderStatus } from '@/types/database';
import { OrderStatusDropdown } from './OrderStatusDropdown';

// Extended order type with customer and items
interface OrderWithDetails extends Order {
  customer: Customer | null;
  order_items: OrderItem[];
}

// Order status labels in French
const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'En attente',
  paid: 'Payée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

// Order status badge colors
const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

/**
 * Valid status transitions based on the order status flow:
 * - pending → paid → shipped → delivered
 * - pending → cancelled
 * - paid → cancelled
 * 
 * Validates: Requirements 6.4
 */
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: Props) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  // Query the order with customer and items
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      customer:customers(*),
      order_items(*)
    `)
    .eq('id', id)
    .single();

  // Show 404 if order not found
  if (error || !order) {
    notFound();
  }

  const orderWithDetails = order as OrderWithDetails;
  const currentStatus = orderWithDetails.status as OrderStatus;
  const validTransitions = VALID_TRANSITIONS[currentStatus];

  // Format the order date
  const formattedDate = new Date(orderWithDetails.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/administrator/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour aux commandes
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">
              Commande {orderWithDetails.order_number}
            </h1>
            <p className="text-neutral-500 mt-1">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Current status badge */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[currentStatus]}`}
            >
              {STATUS_LABELS[currentStatus]}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Order items and status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status update section */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Mettre à jour le statut
            </h2>
            {validTransitions.length > 0 ? (
              <OrderStatusDropdown
                orderId={orderWithDetails.id}
                currentStatus={currentStatus}
                validTransitions={validTransitions}
                statusLabels={STATUS_LABELS}
              />
            ) : (
              <p className="text-sm text-neutral-500">
                Aucune transition de statut disponible pour cette commande.
              </p>
            )}
          </div>

          {/* Order items */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">
                Articles commandés
              </h2>
            </div>
            {orderWithDetails.order_items.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {orderWithDetails.order_items.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Quantité: {item.quantity} × {formatEUR(item.unit_price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">
                      {formatEUR(item.quantity * item.unit_price)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-neutral-500">Aucun article dans cette commande</p>
              </div>
            )}
            {/* Order total */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-neutral-900">Total</span>
                <span className="text-lg font-bold text-neutral-900">
                  {formatEUR(orderWithDetails.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Customer info and addresses */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Informations client
            </h2>
            {orderWithDetails.customer ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Nom
                  </p>
                  <p className="text-sm text-neutral-900">
                    {orderWithDetails.customer.name || 'Non renseigné'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-sm text-neutral-900">
                    <a
                      href={`mailto:${orderWithDetails.customer.email}`}
                      className="text-green-600 hover:text-green-700"
                    >
                      {orderWithDetails.customer.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Téléphone
                  </p>
                  <p className="text-sm text-neutral-900">
                    {orderWithDetails.customer.phone || 'Non renseigné'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Client inconnu</p>
            )}
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Adresse de livraison
            </h2>
            <AddressDisplay address={orderWithDetails.shipping_address} />
          </div>

          {/* Billing address */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Adresse de facturation
            </h2>
            <AddressDisplay address={orderWithDetails.billing_address} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Address display component
function AddressDisplay({ address }: { address: Address | null }) {
  if (!address) {
    return <p className="text-sm text-neutral-500">Non renseignée</p>;
  }

  const hasAddress = address.line1 || address.city || address.postal_code || address.country;

  if (!hasAddress) {
    return <p className="text-sm text-neutral-500">Non renseignée</p>;
  }

  return (
    <div className="text-sm text-neutral-900 space-y-1">
      {address.line1 && <p>{address.line1}</p>}
      {address.line2 && <p>{address.line2}</p>}
      {(address.postal_code || address.city) && (
        <p>
          {address.postal_code && `${address.postal_code} `}
          {address.city}
        </p>
      )}
      {address.country && <p>{address.country}</p>}
    </div>
  );
}

// Icon component
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}
