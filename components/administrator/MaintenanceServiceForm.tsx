'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from '@/app/administrator/actions/maintenance';
import type { MaintenanceService } from '@/types/maintenance';

interface MaintenanceServiceFormProps {
  /** Existing service data for editing mode */
  service?: MaintenanceService;
  /** Mode: 'create' for new service, 'edit' for existing */
  mode: 'create' | 'edit';
}

/**
 * Convert price in centimes (number) to euros (string) for display
 */
function centimesToEuros(centimes: number): string {
  return (centimes / 100).toFixed(2).replace('.', ',');
}

/**
 * Convert price in euros (string) to centimes (number) for save
 */
function eurosToCentimes(euros: string): number {
  const parsed = parseFloat(euros.replace(',', '.'));
  if (isNaN(parsed)) return 0;
  return Math.round(parsed * 100);
}

export function MaintenanceServiceForm({ service, mode }: MaintenanceServiceFormProps) {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState(service?.name || '');
  const [description, setDescription] = useState(service?.description || '');
  const [priceEuros, setPriceEuros] = useState(
    service ? centimesToEuros(service.price_monthly * 12) : ''
  );
  const [icon, setIcon] = useState(service?.icon || 'Wrench');
  const [includes, setIncludes] = useState<string[]>(service?.includes || []);
  const [newIncludeItem, setNewIncludeItem] = useState('');
  const [isActive, setIsActive] = useState(service?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(service?.sort_order?.toString() || '0');

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Add a new item to the includes list
   */
  const handleAddInclude = useCallback(() => {
    const trimmed = newIncludeItem.trim();
    if (trimmed) {
      setIncludes((prev) => [...prev, trimmed]);
      setNewIncludeItem('');
    }
  }, [newIncludeItem]);

  /**
   * Handle Enter key in the includes input
   */
  const handleIncludeKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddInclude();
      }
    },
    [handleAddInclude]
  );

  /**
   * Remove an item from the includes list by index
   */
  const handleRemoveInclude = useCallback((index: number) => {
    setIncludes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields
    if (!name.trim()) {
      setError('Le nom du service est requis');
      setIsSubmitting(false);
      return;
    }

    const priceAnnualCentimes = eurosToCentimes(priceEuros);
    if (priceAnnualCentimes < 0) {
      setError('Le prix annuel doit être un nombre positif');
      setIsSubmitting(false);
      return;
    }

    // Convertir le prix annuel en prix mensuel pour le stockage
    const priceMonthlyCentimes = Math.round(priceAnnualCentimes / 12);

    const formData = new FormData();
    formData.set('name', name.trim());
    formData.set('description', description || '');
    formData.set('price_monthly', priceMonthlyCentimes.toString());
    formData.set('icon', icon || 'Wrench');
    formData.set('includes', JSON.stringify(includes));
    formData.set('is_active', isActive.toString());
    formData.set('sort_order', sortOrder || '0');

    try {
      const result =
        mode === 'create'
          ? await createService(formData)
          : await updateService(service!.id, formData);

      if (result.success) {
        router.push('/administrator/maintenance');
        router.refresh();
      } else {
        setError(result.error || 'Une erreur est survenue');
      }
    } catch {
      setError('Une erreur est survenue lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* General Information Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Informations générales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name input */}
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Nom du service <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Pompe à chaleur"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Description du service de maintenance"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow resize-y"
            />
          </div>

          {/* Price input (in euros annual, stored in centimes monthly) */}
          <div>
            <label
              htmlFor="price_annual"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Prix annuel (€) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="price_annual"
              name="price_annual"
              value={priceEuros}
              onChange={(e) => setPriceEuros(e.target.value)}
              required
              placeholder="Ex: 300,00"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Entrez le prix annuel en euros (ex: 300,00 pour 300€/an)
            </p>
          </div>

          {/* Icon */}
          <div>
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Icône
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Ex: Wrench, Flame, Zap"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Nom de l'icône Lucide (ex: Wrench, Flame, Sun)
            </p>
          </div>

          {/* Sort order */}
          <div>
            <label
              htmlFor="sort_order"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Ordre d'affichage
            </label>
            <input
              type="number"
              id="sort_order"
              name="sort_order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              min="0"
              step="1"
              placeholder="0"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Les services sont triés par ordre croissant
            </p>
          </div>
        </div>
      </div>

      {/* Includes Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Prestations incluses
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Liste des prestations incluses dans ce service de maintenance
            </p>
          </div>
        </div>

        {/* Add new include item */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newIncludeItem}
            onChange={(e) => setNewIncludeItem(e.target.value)}
            onKeyDown={handleIncludeKeyDown}
            placeholder="Ex: 1 intervention annuelle obligatoire"
            className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                     placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:border-transparent transition-shadow"
          />
          <button
            type="button"
            onClick={handleAddInclude}
            disabled={!newIncludeItem.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white 
                     text-sm font-medium rounded-lg hover:bg-green-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Ajouter
          </button>
        </div>

        {/* Includes list */}
        {includes.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
            <ListIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500">Aucune prestation incluse</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {includes.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3 p-3 bg-neutral-50 
                         border border-neutral-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 
                               text-green-700 text-xs font-medium rounded-full flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-neutral-900">{item}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveInclude(index)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 
                           rounded-lg transition-colors flex-shrink-0"
                  title="Supprimer cette prestation"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Paramètres
        </h2>

        <div className="space-y-4">
          {/* Is Active */}
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                       focus:ring-green-500 focus:ring-2"
            />
            <span className="text-sm text-neutral-700">Service actif</span>
          </label>
          <p className="text-xs text-neutral-500">
            Les services inactifs ne sont pas affichés sur la page publique
          </p>
        </div>
      </div>

      {/* Form actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border 
                   border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg 
                   hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed 
                   transition-colors"
        >
          {isSubmitting
            ? 'Enregistrement...'
            : mode === 'create'
            ? 'Créer le service'
            : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  );
}

// Icon components

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}
