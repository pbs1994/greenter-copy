import { notFound } from 'next/navigation';
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
    phone: string | null;
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

// Billing period labels in French
const BILLING_LABELS: Record<string, string> = {
  monthly: 'Mensuel',
  yearly: 'Annuel',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SubscriptionDetailPage({ params }: Props) {
  await requireAdmin();

  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  // Fetch the subscription with joined customer and items data
  const { data: subscription, error } = await supabase
    .from('maintenance_subscriptions')
    .select(`
      *,
      customers(id, name, email, phone),
      maintenance_subscription_items(id, item_type, maintenance_service_id, maintenance_option_id, name, unit_price)
    `)
    .eq('id', id)
    .single();

  // Show 404 if subscription not found
  if (error || !subscription) {
    notFound();
  }

  const sub = subscription as SubscriptionWithDetails;
  const status = sub.status as SubscriptionStatus;

  // Format dates in French locale
  const formattedCreatedDate = new Date(sub.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedCancelledDate = sub.cancelled_at
    ? new Date(sub.cancelled_at).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  // Separate services and options
  const services = sub.maintenance_subscription_items.filter(
    (item) => item.item_type === 'service'
  );
  const options = sub.maintenance_subscription_items.filter(
    (item) => item.item_type === 'option'
  );

  return (
    <div>
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/administrator/maintenance/subscriptions"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour aux souscriptions
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-neutral-900">
              Détail de la souscription
            </h1>
            <p className="text-neutral-500 mt-1">{formattedCreatedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[status]}`}
            >
              {STATUS_LABELS[status]}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription details */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Détails de l&apos;abonnement
            </h2>
            <div className="space-y-3">
              {sub.stripe_subscription_id && (
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    ID Stripe
                  </p>
                  <p className="text-sm text-neutral-900 font-mono">
                    {sub.stripe_subscription_id}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Période de facturation
                </p>
                <p className="text-sm text-neutral-900">
                  {BILLING_LABELS[sub.billing_period] || sub.billing_period}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Statut
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
                >
                  {STATUS_LABELS[status]}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Date de création
                </p>
                <p className="text-sm text-neutral-900">{formattedCreatedDate}</p>
              </div>
              {formattedCancelledDate && (
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Date d&apos;annulation
                  </p>
                  <p className="text-sm text-red-600">{formattedCancelledDate}</p>
                </div>
              )}
            </div>
          </div>

          {/* Services & Options */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">
                Services &amp; Options
              </h2>
            </div>
            {sub.maintenance_subscription_items.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {services.length > 0 && (
                  <>
                    <div className="px-6 py-3 bg-neutral-50">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Services
                      </p>
                    </div>
                    {services.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Service
                          </span>
                          <p className="text-sm font-medium text-neutral-900">
                            {item.name}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          {formatEUR(item.unit_price)}/mois
                        </p>
                      </div>
                    ))}
                  </>
                )}
                {options.length > 0 && (
                  <>
                    <div className="px-6 py-3 bg-neutral-50">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Options
                      </p>
                    </div>
                    {options.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Option
                          </span>
                          <p className="text-sm font-medium text-neutral-900">
                            {item.name}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          {formatEUR(item.unit_price)}/mois
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-neutral-500">Aucun service ou option</p>
              </div>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Récapitulatif tarifaire
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">Total mensuel brut</p>
                <p className="text-sm font-medium text-neutral-900">
                  {formatEUR(sub.total_monthly)}
                </p>
              </div>
              {sub.discount_multi_percent > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-600">
                    Remise multi-équipements ({sub.discount_multi_percent}%)
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    -{formatEUR(Math.round(sub.total_monthly * sub.discount_multi_percent / 100))}
                  </p>
                </div>
              )}
              {sub.discount_annual_percent > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-600">
                    Remise annuelle ({sub.discount_annual_percent}%)
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    -{sub.discount_annual_percent}%
                  </p>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-3 flex items-center justify-between">
                <p className="text-base font-semibold text-neutral-900">
                  Total après remises
                </p>
                <p className="text-lg font-bold text-neutral-900">
                  {formatEUR(sub.total_after_discounts)}
                  <span className="text-sm font-normal text-neutral-500">
                    {sub.billing_period === 'yearly' ? ' / an' : ' / mois'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Customer info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Informations client
            </h2>
            {sub.customers ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Nom
                  </p>
                  <p className="text-sm text-neutral-900">
                    {sub.customers.name || 'Non renseigné'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-sm text-neutral-900">
                    <a
                      href={`mailto:${sub.customers.email}`}
                      className="text-green-600 hover:text-green-700"
                    >
                      {sub.customers.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                    Téléphone
                  </p>
                  <p className="text-sm text-neutral-900">
                    {sub.customers.phone ? (
                      <a
                        href={`tel:${sub.customers.phone}`}
                        className="text-green-600 hover:text-green-700"
                      >
                        {sub.customers.phone}
                      </a>
                    ) : (
                      'Non renseigné'
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Client inconnu</p>
            )}
          </div>
        </div>
      </div>
    </div>
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
