import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type { Order, Customer, OrderStatus } from '@/types/database';

// Status badge colors and labels in French
const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  paid: { label: 'Payée', className: 'bg-green-100 text-green-800' },
  shipped: { label: 'Expédiée', className: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Livrée', className: 'bg-purple-100 text-purple-800' },
  cancelled: { label: 'Annulée', className: 'bg-red-100 text-red-800' },
};

interface OrderWithCustomer extends Order {
  customer: Customer | null;
}

export default async function AdminDashboardPage() {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const supabase = await createSupabaseServerClient();

  // Query orders for stats (excluding cancelled)
  const { data: ordersData } = await supabase
    .from('orders')
    .select('amount, status, created_at')
    .neq('status', 'cancelled');

  // Calculate stats
  const totalSales = ordersData?.reduce((sum, order) => sum + (order.amount || 0), 0) ?? 0;
  const totalOrders = ordersData?.length ?? 0;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  // Orders this month
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const ordersThisMonth = ordersData?.filter(
    (order) => new Date(order.created_at) >= firstDayOfMonth
  ).length ?? 0;
  const salesThisMonth = ordersData
    ?.filter((order) => new Date(order.created_at) >= firstDayOfMonth)
    .reduce((sum, order) => sum + (order.amount || 0), 0) ?? 0;

  // Pending orders count
  const { count: pendingOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Products count
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Customers count
  const { count: totalCustomers } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true });

  // Query last 10 orders with customer info
  const { data: recentOrders } = await supabase
    .from('orders')
    .select(`
      *,
      customer:customers(*)
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  // Top selling products
  const { data: topProducts } = await supabase
    .from('order_items')
    .select('product_name, quantity, unit_price')
    .order('quantity', { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
        Tableau de bord
      </h1>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Sales Card */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <SalesIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Ventes totales</p>
              <p className="text-xl font-bold text-neutral-900">{formatEUR(totalSales)}</p>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <OrdersIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Commandes</p>
              <p className="text-xl font-bold text-neutral-900">{totalOrders}</p>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ChartIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Panier moyen</p>
              <p className="text-xl font-bold text-neutral-900">{formatEUR(averageOrderValue)}</p>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Clients</p>
              <p className="text-xl font-bold text-neutral-900">{totalCustomers ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* This Month Sales */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 shadow-sm text-white">
          <p className="text-sm font-medium text-green-100">Ce mois-ci</p>
          <p className="text-2xl font-bold mt-1">{formatEUR(salesThisMonth)}</p>
          <p className="text-sm text-green-100 mt-1">{ordersThisMonth} commande{ordersThisMonth > 1 ? 's' : ''}</p>
        </div>

        {/* Pending Orders */}
        <div className={`rounded-xl p-5 shadow-sm ${(pendingOrders ?? 0) > 0 ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-white border border-neutral-200'}`}>
          <p className="text-sm font-medium text-neutral-500">En attente</p>
          <p className={`text-2xl font-bold mt-1 ${(pendingOrders ?? 0) > 0 ? 'text-yellow-700' : 'text-neutral-900'}`}>
            {pendingOrders ?? 0}
          </p>
          {(pendingOrders ?? 0) > 0 && (
            <Link href="/administrator/orders?status=pending" className="text-sm text-yellow-700 hover:underline mt-1 inline-block">
              Voir les commandes →
            </Link>
          )}
        </div>

        {/* Active Products */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Produits actifs</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{totalProducts ?? 0}</p>
          <Link href="/administrator/products" className="text-sm text-green-600 hover:underline mt-1 inline-block">
            Gérer →
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Section - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-neutral-900">
                Commandes récentes
              </h2>
              <Link
                href="/administrator/orders"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Voir toutes →
              </Link>
            </div>
          </div>

          {recentOrders && recentOrders.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {(recentOrders as OrderWithCustomer[]).slice(0, 5).map((order) => {
                    const status = statusConfig[order.status];

                    return (
                      <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4">
                          <Link
                            href={`/administrator/orders/${order.id}`}
                            className="text-sm font-medium text-green-600 hover:text-green-700"
                          >
                            {order.order_number}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-neutral-900">
                            {order.customer?.name || 'Client inconnu'}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-neutral-900">
                            {formatEUR(order.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <OrdersIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">Aucune commande pour le moment</p>
            </div>
          )}
        </div>

        {/* Top Products - Takes 1 column */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-heading font-semibold text-neutral-900">
              Produits vendus
            </h2>
          </div>

          {topProducts && topProducts.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {topProducts.map((item, index) => (
                <div key={index} className="px-6 py-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {formatEUR(item.unit_price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-green-600 ml-3">
                    {formatEUR(item.unit_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <ProductIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">Aucune vente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icon components
function SalesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function OrdersIcon({ className }: { className?: string }) {
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

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

function ProductIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}
