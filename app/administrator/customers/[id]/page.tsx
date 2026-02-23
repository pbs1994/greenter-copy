import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type { Customer, Order, OrderStatus } from '@/types/database';

// Extended customer type with orders
interface CustomerWithOrders extends Customer {
  orders: Order[];
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

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailsPage({ params }: Props) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  // Query the customer with their orders
  const { data: customer, error } = await supabase
    .from('customers')
    .select(`
      *,
      orders(*)
    `)
    .eq('id', id)
    .single();

  // Show 404 if customer not found
  if (error || !customer) {
    notFound();
  }

  const customerWithOrders = customer as CustomerWithOrders;
  
  // Sort orders by date (most recent first)
  const sortedOrders = [...customerWithOrders.orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Calculate total spent (sum of all order amounts)
  const totalSpent = sortedOrders.reduce((sum, order) => sum + order.amount, 0);
  const orderCount = sortedOrders.length;

  // Format the customer creation date
  const formattedCreatedDate = new Date(customerWithOrders.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/administrator/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour aux clients
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">
              {customerWithOrders.name || 'Client sans nom'}
            </h1>
            <p className="text-neutral-500 mt-1">Client depuis le {formattedCreatedDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Order history */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                Nombre de commandes
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                {orderCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                Total dépensé
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                {formatEUR(totalSpent)}
              </p>
            </div>
          </div>

          {/* Order history */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">
                Historique des commandes
              </h2>
            </div>
            {sortedOrders.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {sortedOrders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <OrderIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">Aucune commande pour ce client</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Customer info */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Informations client
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Nom
                </p>
                <p className="text-sm text-neutral-900">
                  {customerWithOrders.name || 'Non renseigné'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-sm text-neutral-900">
                  <a
                    href={`mailto:${customerWithOrders.email}`}
                    className="text-green-600 hover:text-green-700"
                  >
                    {customerWithOrders.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Téléphone
                </p>
                <p className="text-sm text-neutral-900">
                  {customerWithOrders.phone || 'Non renseigné'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Date d'inscription
                </p>
                <p className="text-sm text-neutral-900">
                  {formattedCreatedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order row component for the order history list
function OrderRow({ order }: { order: Order }) {
  const formattedDate = new Date(order.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const status = order.status as OrderStatus;

  return (
    <Link
      href={`/administrator/orders/${order.id}`}
      className="block px-6 py-4 hover:bg-neutral-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-900">
            {order.order_number}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            {formattedDate}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
          >
            {STATUS_LABELS[status]}
          </span>
          <span className="text-sm font-medium text-neutral-900">
            {formatEUR(order.amount)}
          </span>
          <ChevronRightIcon className="w-4 h-4 text-neutral-400" />
        </div>
      </div>
    </Link>
  );
}

// Icon components
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function OrderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
