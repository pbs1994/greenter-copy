import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type { Order, Customer, OrderStatus } from '@/types/database';

// Extended order type with customer info
interface OrderWithCustomer extends Order {
  customer: Customer | null;
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

// Number of orders per page
const ORDERS_PER_PAGE = 10;

interface Props {
  searchParams: Promise<{
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
  }>;
}

export default async function OrdersListPage({ searchParams }: Props) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const params = await searchParams;
  const statusFilter = params.status || 'all';
  const startDate = params.startDate || '';
  const endDate = params.endDate || '';
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));

  const supabase = await createSupabaseServerClient();

  // Build orders query with filters
  let query = supabase
    .from('orders')
    .select(`
      *,
      customer:customers(*)
    `, { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply status filter
  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  // Apply date range filters
  if (startDate) {
    query = query.gte('created_at', `${startDate}T00:00:00`);
  }
  if (endDate) {
    query = query.lte('created_at', `${endDate}T23:59:59`);
  }

  // Apply pagination
  const from = (currentPage - 1) * ORDERS_PER_PAGE;
  const to = from + ORDERS_PER_PAGE - 1;
  query = query.range(from, to);

  const { data: orders, error, count } = await query;

  const ordersWithCustomer = (orders || []) as OrderWithCustomer[];
  const totalOrders = count || 0;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  // Build query string for pagination links
  const buildQueryString = (page: number) => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    params.set('page', page.toString());
    return params.toString();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Commandes
        </h1>
        <div className="text-sm text-neutral-500">
          {totalOrders} {totalOrders === 1 ? 'commande' : 'commandes'} au total
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 mb-6">
        <form method="GET" className="flex flex-col lg:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
              Statut
            </label>
            <select
              id="status"
              name="status"
              defaultValue={statusFilter}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="paid">Payée</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>

          {/* Start Date Filter */}
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
              Date de début
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue={startDate}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* End Date Filter */}
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
              Date de fin
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              defaultValue={endDate}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Filtrer
            </button>
            <Link
              href="/administrator/orders"
              className="px-4 py-2 text-neutral-500 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Réinitialiser
            </Link>
          </div>
        </form>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des commandes: {error.message}
          </p>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {ordersWithCustomer.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    N° Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {ordersWithCustomer.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <OrderIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">Aucune commande pour le moment</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            Page {currentPage} sur {totalPages}
          </div>
          <div className="flex items-center gap-2">
            {/* Previous Page */}
            {currentPage > 1 ? (
              <Link
                href={`/administrator/orders?${buildQueryString(currentPage - 1)}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Précédent
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-400 bg-neutral-100 border border-neutral-200 rounded-lg cursor-not-allowed">
                <ChevronLeftIcon className="w-4 h-4" />
                Précédent
              </span>
            )}

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and adjacent pages
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  );
                })
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <span key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-2 text-neutral-400">...</span>
                      )}
                      {page === currentPage ? (
                        <span className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-white bg-green-600 rounded-lg">
                          {page}
                        </span>
                      ) : (
                        <Link
                          href={`/administrator/orders?${buildQueryString(page)}`}
                          className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          {page}
                        </Link>
                      )}
                    </span>
                  );
                })}
            </div>

            {/* Next Page */}
            {currentPage < totalPages ? (
              <Link
                href={`/administrator/orders?${buildQueryString(currentPage + 1)}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Suivant
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-400 bg-neutral-100 border border-neutral-200 rounded-lg cursor-not-allowed">
                Suivant
                <ChevronRightIcon className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Order row component
function OrderRow({ order }: { order: OrderWithCustomer }) {
  const status = order.status as OrderStatus;
  const formattedDate = new Date(order.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <Link
          href={`/administrator/orders/${order.id}`}
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          {order.order_number}
        </Link>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">
            {order.customer?.name || 'Client inconnu'}
          </span>
          <span className="text-sm text-neutral-500">
            {order.customer?.email || '-'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">
          {formatEUR(order.amount)}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
        >
          {STATUS_LABELS[status]}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">{formattedDate}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end">
          <Link
            href={`/administrator/orders/${order.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <EyeIcon className="w-4 h-4" />
            Voir
          </Link>
        </div>
      </td>
    </tr>
  );
}

// Icon components
function OrderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
