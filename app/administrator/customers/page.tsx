import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import type { Customer } from '@/types/database';

// Extended customer type with order count
interface CustomerWithOrderCount extends Customer {
  order_count: number;
}

export default async function CustomersListPage() {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const supabase = await createSupabaseServerClient();

  // Query customers with order count
  // Using a subquery to count orders for each customer
  const { data: customers, error } = await supabase
    .from('customers')
    .select(`
      *,
      orders(count)
    `)
    .order('created_at', { ascending: false });

  // Transform the data to include order_count
  const customersWithCount: CustomerWithOrderCount[] = (customers || []).map((customer) => ({
    ...customer,
    order_count: customer.orders?.[0]?.count || 0,
  }));

  const totalCustomers = customersWithCount.length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Clients
        </h1>
        <div className="text-sm text-neutral-500">
          {totalCustomers} {totalCustomers === 1 ? 'client' : 'clients'} au total
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des clients: {error.message}
          </p>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {customersWithCount.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Commandes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {customersWithCount.map((customer) => (
                  <CustomerRow key={customer.id} customer={customer} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <CustomerIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">Aucun client pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Customer row component
function CustomerRow({ customer }: { customer: CustomerWithOrderCount }) {
  const formattedDate = new Date(customer.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <Link
          href={`/administrator/customers/${customer.id}`}
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          {customer.name || 'Client sans nom'}
        </Link>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">{customer.email}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">
          {customer.phone || '-'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {customer.order_count} {customer.order_count === 1 ? 'commande' : 'commandes'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">{formattedDate}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end">
          <Link
            href={`/administrator/customers/${customer.id}`}
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
function CustomerIcon({ className }: { className?: string }) {
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
