import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatEUR } from '@/lib/format';
import Link from 'next/link';
import type { MaintenanceService, MaintenanceOption } from '@/types/maintenance';
import {
  ToggleServiceActiveButton,
  DeleteServiceButton,
  ToggleOptionActiveButton,
  DeleteOptionButton,
} from './MaintenanceActions';

export default async function MaintenanceListPage() {
  await requireAdmin();

  const supabase = await createSupabaseServerClient();

  // Fetch all services ordered by sort_order
  const { data: services, error: servicesError } = await supabase
    .from('maintenance_services')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fetch all options ordered by sort_order
  const { data: options, error: optionsError } = await supabase
    .from('maintenance_options')
    .select('*')
    .order('sort_order', { ascending: true });

  const allServices = (services || []) as MaintenanceService[];
  const allOptions = (options || []) as MaintenanceOption[];

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">
            Maintenance
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Gérez les services et options de maintenance
          </p>
        </div>
        <Link
          href="/administrator/maintenance/subscriptions"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
        >
          <SubscriptionIcon className="w-5 h-5" />
          Voir les souscriptions
        </Link>
      </div>

      {/* Error messages */}
      {servicesError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des services : {servicesError.message}
          </p>
        </div>
      )}
      {optionsError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Erreur lors du chargement des options : {optionsError.message}
          </p>
        </div>
      )}

      {/* ─── Services Section ─────────────────────────────────────────── */}
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-heading font-semibold text-neutral-900">
            Services de maintenance
          </h2>
          <Link
            href="/administrator/maintenance/services/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Créer un service
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {allServices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Prix mensuel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Ordre
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {allServices.map((service) => (
                    <ServiceRow key={service.id} service={service} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <WrenchIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 mb-4">Aucun service de maintenance</p>
              <Link
                href="/administrator/maintenance/services/new"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
              >
                <PlusIcon className="w-4 h-4" />
                Créer votre premier service
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── Options Section ──────────────────────────────────────────── */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-heading font-semibold text-neutral-900">
            Options de maintenance
          </h2>
          <Link
            href="/administrator/maintenance/options/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Créer une option
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {allOptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Prix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Ordre
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {allOptions.map((option) => (
                    <OptionRow key={option.id} option={option} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <ZapIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 mb-4">Aucune option de maintenance</p>
              <Link
                href="/administrator/maintenance/options/new"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
              >
                <PlusIcon className="w-4 h-4" />
                Créer votre première option
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Row Components ──────────────────────────────────────────────────────────

function ServiceRow({ service }: { service: MaintenanceService }) {
  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">{service.name}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">
          {formatEUR(service.price_monthly)}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            service.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {service.is_active ? 'Actif' : 'Inactif'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">{service.sort_order}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <ToggleServiceActiveButton serviceId={service.id} isActive={service.is_active} />
          <Link
            href={`/administrator/maintenance/services/${service.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <EditIcon className="w-4 h-4" />
            Modifier
          </Link>
          <DeleteServiceButton serviceId={service.id} />
        </div>
      </td>
    </tr>
  );
}

function OptionRow({ option }: { option: MaintenanceOption }) {
  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-900">{option.name}</span>
          {option.is_flat_fee && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              Forfait unique
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-neutral-900">
          {formatEUR(option.price_monthly)}
          {!option.is_flat_fee && <span className="text-neutral-500 font-normal">/mois</span>}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            option.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {option.is_active ? 'Actif' : 'Inactif'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-600">{option.sort_order}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <ToggleOptionActiveButton optionId={option.id} isActive={option.is_active} />
          <Link
            href={`/administrator/maintenance/options/${option.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <EditIcon className="w-4 h-4" />
            Modifier
          </Link>
          <DeleteOptionButton optionId={option.id} />
        </div>
      </td>
    </tr>
  );
}

// ─── Icon Components ─────────────────────────────────────────────────────────

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
      />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
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
