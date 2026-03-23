'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOption, updateOption } from '@/app/administrator/actions/maintenance';
import type { MaintenanceOption } from '@/types/maintenance';

interface MaintenanceOptionFormProps {
  /** Existing option data for editing mode */
  option?: MaintenanceOption;
  /** Mode: 'create' for new option, 'edit' for existing */
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

export function MaintenanceOptionForm({ option, mode }: MaintenanceOptionFormProps) {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState(option?.name || '');
  const [description, setDescription] = useState(option?.description || '');
  const [isFlatFee, setIsFlatFee] = useState(option?.is_flat_fee ?? false);
  // Pour les options récurrentes, on affiche le prix annuel (x12), pour les forfaits uniques on garde tel quel
  const [priceEuros, setPriceEuros] = useState(
    option 
      ? centimesToEuros(option.is_flat_fee ? option.price_monthly : option.price_monthly * 12) 
      : ''
  );
  const [icon, setIcon] = useState(option?.icon || 'Zap');
  const [exemptFromDiscount, setExemptFromDiscount] = useState(
    option?.exempt_from_discount ?? true
  );
  const [isActive, setIsActive] = useState(option?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(option?.sort_order?.toString() || '0');

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields
    if (!name.trim()) {
      setError("Le nom de l'option est requis");
      setIsSubmitting(false);
      return;
    }

    const priceCentimes = eurosToCentimes(priceEuros);
    if (priceCentimes < 0) {
      setError('Le prix doit être un nombre positif');
      setIsSubmitting(false);
      return;
    }

    // Pour les options récurrentes, on divise par 12 pour stocker le prix mensuel
    const priceToStore = isFlatFee ? priceCentimes : Math.round(priceCentimes / 12);

    const formData = new FormData();
    formData.set('name', name.trim());
    formData.set('description', description || '');
    formData.set('price_monthly', priceToStore.toString());
    formData.set('icon', icon || 'Zap');
    formData.set('exempt_from_discount', exemptFromDiscount.toString());
    formData.set('is_flat_fee', isFlatFee.toString());
    formData.set('is_active', isActive.toString());
    formData.set('sort_order', sortOrder || '0');

    try {
      const result =
        mode === 'create'
          ? await createOption(formData)
          : await updateOption(option!.id, formData);

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
              Nom de l'option <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Intervention urgence sous 24h"
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
              placeholder="Description de l'option de maintenance"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow resize-y"
            />
          </div>

          {/* Price input (in euros, stored in centimes) */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              {isFlatFee ? 'Prix forfaitaire (€)' : 'Prix annuel (€)'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={priceEuros}
              onChange={(e) => setPriceEuros(e.target.value)}
              required
              placeholder={isFlatFee ? 'Ex: 50,00' : 'Ex: 120,00'}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-xs text-neutral-500">
              {isFlatFee
                ? 'Entrez le prix unique en euros (ex: 50,00 pour 50€)'
                : 'Entrez le prix annuel en euros (ex: 120,00 pour 120€/an)'}
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
              placeholder="Ex: Zap, Shield, Clock"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Nom de l'icône Lucide (ex: Zap, Shield, Clock)
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
              Les options sont triées par ordre croissant
            </p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Paramètres
        </h2>

        <div className="space-y-4">
          {/* Is Flat Fee */}
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFlatFee}
                onChange={(e) => setIsFlatFee(e.target.checked)}
                className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                         focus:ring-green-500 focus:ring-2"
              />
              <span className="text-sm text-neutral-700">Forfait unique</span>
            </label>
            <p className="text-xs text-neutral-500 mt-1">
              Si coché, le prix est un forfait unique ajouté au contrat (pas un montant mensuel récurrent)
            </p>
          </div>

          {/* Exempt from discount */}
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exemptFromDiscount}
                onChange={(e) => setExemptFromDiscount(e.target.checked)}
                className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                         focus:ring-green-500 focus:ring-2"
              />
              <span className="text-sm text-neutral-700">Exempte des remises</span>
            </label>
            <p className="text-xs text-neutral-500 mt-1">
              Si coché, cette option ne sera pas affectée par les remises multi-équipements et annuelle
            </p>
          </div>

          {/* Is Active */}
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                         focus:ring-green-500 focus:ring-2"
              />
              <span className="text-sm text-neutral-700">Option active</span>
            </label>
            <p className="text-xs text-neutral-500 mt-1">
              Les options inactives ne sont pas affichées sur la page publique
            </p>
          </div>
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
            ? "Créer l'option"
            : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  );
}
