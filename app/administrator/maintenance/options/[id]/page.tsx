import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { MaintenanceOptionForm } from '@/components/administrator/MaintenanceOptionForm';
import Link from 'next/link';
import type { MaintenanceOption } from '@/types/maintenance';

interface EditMaintenanceOptionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMaintenanceOptionPage({ params }: EditMaintenanceOptionPageProps) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const { id } = await params;

  // Query the option by ID
  const supabase = await createSupabaseServerClient();
  const { data: option, error } = await supabase
    .from('maintenance_options')
    .select('*')
    .eq('id', id)
    .single();

  // Show 404 if option not found
  if (error || !option) {
    notFound();
  }

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
          Modifier l&apos;option
        </h1>
        <p className="text-neutral-500 mt-1">
          Modifiez les informations et les tarifs de l&apos;option de maintenance
        </p>
      </div>

      {/* Option form in edit mode */}
      <MaintenanceOptionForm mode="edit" option={option as MaintenanceOption} />
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
