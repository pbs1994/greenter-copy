import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { MaintenanceServiceForm } from '@/components/administrator/MaintenanceServiceForm';
import Link from 'next/link';
import type { MaintenanceService } from '@/types/maintenance';

interface EditMaintenanceServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMaintenanceServicePage({ params }: EditMaintenanceServicePageProps) {
  // Ensure user is authenticated (server-side check)
  await requireAdmin();

  const { id } = await params;

  // Query the service by ID
  const supabase = await createSupabaseServerClient();
  const { data: service, error } = await supabase
    .from('maintenance_services')
    .select('*')
    .eq('id', id)
    .single();

  // Show 404 if service not found
  if (error || !service) {
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
          Modifier le service
        </h1>
        <p className="text-neutral-500 mt-1">
          Modifiez les informations et les tarifs du service de maintenance
        </p>
      </div>

      {/* Service form in edit mode */}
      <MaintenanceServiceForm mode="edit" service={service as MaintenanceService} />
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
