import { requireAdmin } from '@/lib/auth';
import { MaintenanceOptionForm } from '@/components/administrator/MaintenanceOptionForm';
import Link from 'next/link';

export default async function NewMaintenanceOptionPage() {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  return (
    <div>
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/administrator/maintenance"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Retour à la maintenance
        </Link>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">
          Nouvelle option de maintenance
        </h1>
        <p className="text-neutral-500 mt-1">
          Créez une nouvelle option de maintenance avec ses détails et tarifs
        </p>
      </div>

      {/* Option form in create mode */}
      <MaintenanceOptionForm mode="create" />
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
