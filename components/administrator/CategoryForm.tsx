'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '@/app/administrator/actions/categories';
import { slugify } from '@/lib/slugify';
import type { Category, SpecField } from '@/types/database';

interface CategoryFormProps {
  /** Existing category data for editing mode */
  category?: Category;
  /** Mode: 'create' for new category, 'edit' for existing */
  mode: 'create' | 'edit';
}

/** Available field types for spec fields */
const FIELD_TYPES: { value: SpecField['type']; label: string }[] = [
  { value: 'text', label: 'Texte' },
  { value: 'number', label: 'Nombre' },
  { value: 'textarea', label: 'Zone de texte' },
  { value: 'select', label: 'Liste déroulante' },
];

/**
 * Generate a key from a field name (similar to slugify but for object keys)
 */
function generateKey(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Create an empty spec field with default values
 */
function createEmptySpecField(): SpecField {
  return {
    name: '',
    key: '',
    type: 'text',
    required: false,
    options: [],
    unit: '',
  };
}

export function CategoryForm({ category, mode }: CategoryFormProps) {
  const router = useRouter();
  const [name, setName] = useState(category?.name || '');
  const [specFields, setSpecFields] = useState<SpecField[]>(
    category?.spec_fields || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate slug preview
  const slugPreview = name ? slugify(name) : '';

  /**
   * Add a new empty spec field
   */
  const handleAddField = useCallback(() => {
    setSpecFields((prev) => [...prev, createEmptySpecField()]);
  }, []);

  /**
   * Remove a spec field by index
   */
  const handleRemoveField = useCallback((index: number) => {
    setSpecFields((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Update a spec field property
   */
  const handleFieldChange = useCallback(
    (index: number, field: keyof SpecField, value: string | boolean | string[]) => {
      setSpecFields((prev) =>
        prev.map((specField, i) => {
          if (i !== index) return specField;

          const updated = { ...specField, [field]: value };

          // Auto-generate key from name
          if (field === 'name' && typeof value === 'string') {
            updated.key = generateKey(value);
          }

          // Clear options if type is not select
          if (field === 'type' && value !== 'select') {
            updated.options = [];
          }

          return updated;
        })
      );
    },
    []
  );

  /**
   * Handle options input change (comma-separated)
   */
  const handleOptionsChange = useCallback((index: number, optionsString: string) => {
    const options = optionsString
      .split(',')
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);
    handleFieldChange(index, 'options', options);
  }, [handleFieldChange]);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate spec fields
    const invalidFields = specFields.filter((field) => !field.name || !field.key);
    if (invalidFields.length > 0) {
      setError('Tous les champs de spécification doivent avoir un nom');
      setIsSubmitting(false);
      return;
    }

    // Validate select fields have options
    const selectFieldsWithoutOptions = specFields.filter(
      (field) => field.type === 'select' && (!field.options || field.options.length === 0)
    );
    if (selectFieldsWithoutOptions.length > 0) {
      setError('Les champs de type "Liste déroulante" doivent avoir au moins une option');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.set('name', name);
    formData.set('spec_fields', JSON.stringify(specFields));

    try {
      const result =
        mode === 'create'
          ? await createCategory(formData)
          : await updateCategory(category!.id, formData);

      if (result.success) {
        router.push('/administrator/categories');
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

      {/* Category name section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Informations générales
        </h2>

        <div className="space-y-4">
          {/* Name input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Nom de la catégorie <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Batteries solaires"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Slug preview */}
          {slugPreview && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Slug (généré automatiquement)
              </label>
              <div className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                <code className="text-sm text-neutral-600">{slugPreview}</code>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spec fields section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Champs de spécification
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Définissez les champs dynamiques pour les produits de cette catégorie
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddField}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white 
                     text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Ajouter un champ
          </button>
        </div>

        {/* Spec fields list */}
        {specFields.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
            <FieldIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 mb-3">Aucun champ de spécification</p>
            <button
              type="button"
              onClick={handleAddField}
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 
                       hover:text-green-700"
            >
              <PlusIcon className="w-4 h-4" />
              Ajouter votre premier champ
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {specFields.map((field, index) => (
              <SpecFieldEditor
                key={index}
                field={field}
                index={index}
                onFieldChange={handleFieldChange}
                onOptionsChange={handleOptionsChange}
                onRemove={handleRemoveField}
              />
            ))}
          </div>
        )}
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
            ? 'Créer la catégorie'
            : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  );
}


/**
 * Individual spec field editor component
 */
interface SpecFieldEditorProps {
  field: SpecField;
  index: number;
  onFieldChange: (index: number, field: keyof SpecField, value: string | boolean | string[]) => void;
  onOptionsChange: (index: number, optionsString: string) => void;
  onRemove: (index: number) => void;
}

function SpecFieldEditor({
  field,
  index,
  onFieldChange,
  onOptionsChange,
  onRemove,
}: SpecFieldEditorProps) {
  return (
    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-neutral-200 
                       text-neutral-600 text-xs font-medium rounded-full">
          {index + 1}
        </span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 
                   rounded-lg transition-colors"
          title="Supprimer ce champ"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Field name */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Nom du champ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={field.name}
            onChange={(e) => onFieldChange(index, 'name', e.target.value)}
            placeholder="Ex: Puissance nominale"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Field key (auto-generated) */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Clé (générée automatiquement)
          </label>
          <input
            type="text"
            value={field.key}
            readOnly
            className="w-full px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-lg 
                     text-sm text-neutral-600"
          />
        </div>

        {/* Field type */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Type de champ
          </label>
          <select
            value={field.type}
            onChange={(e) => onFieldChange(index, 'type', e.target.value as SpecField['type'])}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500 
                     focus:border-transparent bg-white"
          >
            {FIELD_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Unit input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Unité (optionnel)
          </label>
          <input
            type="text"
            value={field.unit || ''}
            onChange={(e) => onFieldChange(index, 'unit', e.target.value)}
            placeholder="Ex: kW, kWh, %"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Options input (only for select type) */}
        {field.type === 'select' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Options (séparées par des virgules) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.options?.join(', ') || ''}
              onChange={(e) => onOptionsChange(index, e.target.value)}
              placeholder="Ex: LiFePO4, Li-ion, Plomb"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                       text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                       focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Required checkbox */}
        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onFieldChange(index, 'required', e.target.checked)}
              className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                       focus:ring-green-500 focus:ring-2"
            />
            <span className="text-sm text-neutral-700">Champ obligatoire</span>
          </label>
        </div>
      </div>
    </div>
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

function FieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      />
    </svg>
  );
}
