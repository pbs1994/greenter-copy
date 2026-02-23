import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type {
  MaintenanceSubscription,
  MaintenanceSubscriptionItem,
  SubscriptionStatus,
} from '@/types/maintenance';

// Extended subscription type with joined customer and items
interface SubscriptionWithDetails extends MaintenanceSubscription {
  customers: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  maintenance_subscription_items: MaintenanceSubscriptionItem[];
}

// Subscription status labels in French
const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  active: 'Actif',
  cancelled: 'Annulé',
  past_due: 'En retard',
  paused: 'En pause',
};

// Subscription status badge colors
const STATUS_COLORS: Record<SubscriptionStatus, string> = {
  active: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  past_due: 'bg-orange-100 text-orange-800',
  paused: 'bg-gray-100 text-gray-800',
};

// Status filter tabs
const STATUS_TABS = [
  { value: 'all', label: 'Tous' },
  { value: 'active', label: 'Actif' },
  { value: 'cancelled', label: 'Annulé' },
  { value: 'past_due', label: 'En retard' },
  { value: 'paused', label: 'En pause' },
] as const;

interface Props {
  searchParams: Promise<{
    status?: string;
  }>;
}

export default async function SubscriptionsListPage({ searchParams }: Props) {
  await requireAdmin();

  const params = await searchParams;
  const statusFilter = params.status || 'all';

  const supabase = await createSupabaseServerClient();

  // Build query with joined customer and items data
  let query = supabase
    .from('maintenance_subscriptions')
    .select(`
      *,
      customers(id, name, email),
      maintenance_subscription_items(id, item_type, name, unit_price)
    `)
    .order('created_at', { ascending: false });

  // Apply status filter
  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  const { data: subscriptions, error } = await query;

  const allSubscriptions = (subscriptions || []) as SubscriptionWithDetails[];
  const totalSubscriptions = allSubscriptions.length;

  return (
    <div>
      {/* Back link */}
      <div className="mb-4">
        <Link
          href="/administrator/maintenance"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour à la maintenance
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Souscriptions
        </h1>
        <div className="text-sm text-neutral-500">
          {totalSubscriptions} {totalSubscriptions === 1 ? 'souscription' : 'souscriptions'} au total
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.value;
            const href =
              tab.value === 'all'
                ? '/administrator/maintenance/subscriptions'
                : `/administrator/maintenance/subscriptions?status=${tab.value}`;

            return (
              <Link
                key={tab.value}
                href={href}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des souscriptions : {error.message}
          </p>
        </div>
      )}

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {allSubscriptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Montant
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
                {allSubscriptions.map((subscription) => (
                  <SubscriptionRow key={subscription.id} subscription={subscription} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <SubscriptionIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">Aucune souscription pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Row Component ───────────────────────────────────────────────────────────

function SubscriptionRow({ subscription }: { subscription: SubscriptionWithDetails }) {
  const status = subscription.status as SubscriptionStatus;
  const formattedDate = new Date(subscription.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">
            {subscription.customers?.name || 'Client inconnu'}
          </span>
          <span className="text-sm text-neutral-500">
            {subscription.customers?.email || '-'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {subscription.maintenance_subscription_items.length > 0 ? (
            subscription.maintenance_subscription_items.map((item) => (
              <span
                key={item.id}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.item_type === 'service'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {item.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-neutral-400">-</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
        >
          {STATUS_LABELS[status]}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">
            {formatEUR(subscription.total_after_discounts)}
          </span>
          {subscription.billing_period === 'yearly' ? (
            <span className="text-xs text-neutral-500">/ an</span>
          ) : (
            <span className="text-xs text-neutral-500">/ mois</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">{formattedDate}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end">
          <Link
            href={`/administrator/maintenance/subscriptions/${subscription.id}`}
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

// ─── Icon Components ─────────────────────────────────────────────────────────

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function SubscriptionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
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
