'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/app/administrator/actions/products';
import { slugify } from '@/lib/slugify';
import { ImageUpload } from './ImageUpload';
import type { Product, Category, SpecField, ProductFeature, FAQItem } from '@/types/database';

interface ProductFormProps {
  /** Existing product data for editing mode */
  product?: Product;
  /** Available categories to select from */
  categories: Category[];
  /** Mode: 'create' for new product, 'edit' for existing */
  mode: 'create' | 'edit';
}

/**
 * Create an empty product feature with default values
 */
function createEmptyFeature(): ProductFeature {
  return {
    icon: '',
    title: '',
    description: '',
  };
}

/**
 * Create an empty FAQ item with default values
 */
function createEmptyFAQItem(): FAQItem {
  return {
    question: '',
    answer: '',
  };
}

/**
 * Convert price in euros (string) to cents (number)
 */
function eurosToCents(euros: string): number {
  const parsed = parseFloat(euros.replace(',', '.'));
  if (isNaN(parsed)) return 0;
  return Math.round(parsed * 100);
}

/**
 * Convert price in cents (number) to euros (string)
 */
function centsToEuros(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',');
}

export function ProductForm({ product, categories, mode }: ProductFormProps) {
  const router = useRouter();
  
  // Basic fields
  const [name, setName] = useState(product?.name || '');
  const [categoryId, setCategoryId] = useState(product?.category_id || '');
  const [priceEuros, setPriceEuros] = useState(product ? centsToEuros(product.price) : '');
  const [imageUrl, setImageUrl] = useState(product?.image_url || '');
  const [description, setDescription] = useState(product?.description || '');
  const [shortDescription, setShortDescription] = useState(product?.short_description || '');
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [isCustomPage, setIsCustomPage] = useState(product?.is_custom_page ?? false);
  
  // Dynamic spec fields
  const [specs, setSpecs] = useState<Record<string, string | number>>(product?.specs || {});
  const [specFields, setSpecFields] = useState<SpecField[]>([]);
  
  // Features and FAQ
  const [features, setFeatures] = useState<ProductFeature[]>(product?.features || []);
  const [faq, setFaq] = useState<FAQItem[]>(product?.faq || []);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate slug preview
  const slugPreview = name ? slugify(name) : '';

  // Load spec_fields when category changes
  useEffect(() => {
    if (categoryId) {
      const selectedCategory = categories.find((cat) => cat.id === categoryId);
      if (selectedCategory) {
        setSpecFields(selectedCategory.spec_fields || []);
      } else {
        setSpecFields([]);
      }
    } else {
      setSpecFields([]);
    }
  }, [categoryId, categories]);

  /**
   * Handle spec field value change
   */
  const handleSpecChange = useCallback((key: string, value: string | number) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  }, []);

  /**
   * Add a new empty feature
   */
  const handleAddFeature = useCallback(() => {
    setFeatures((prev) => [...prev, createEmptyFeature()]);
  }, []);

  /**
   * Remove a feature by index
   */
  const handleRemoveFeature = useCallback((index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Update a feature property
   */
  const handleFeatureChange = useCallback(
    (index: number, field: keyof ProductFeature, value: string) => {
      setFeatures((prev) =>
        prev.map((feature, i) => (i === index ? { ...feature, [field]: value } : feature))
      );
    },
    []
  );

  /**
   * Add a new empty FAQ item
   */
  const handleAddFAQ = useCallback(() => {
    setFaq((prev) => [...prev, createEmptyFAQItem()]);
  }, []);

  /**
   * Remove a FAQ item by index
   */
  const handleRemoveFAQ = useCallback((index: number) => {
    setFaq((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Update a FAQ item property
   */
  const handleFAQChange = useCallback(
    (index: number, field: keyof FAQItem, value: string) => {
      setFaq((prev) =>
        prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
      );
    },
    []
  );

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields
    if (!name.trim()) {
      setError('Le nom du produit est requis');
      setIsSubmitting(false);
      return;
    }

    if (!categoryId) {
      setError('La catégorie est requise');
      setIsSubmitting(false);
      return;
    }

    const priceCents = eurosToCents(priceEuros);
    if (priceCents < 0) {
      setError('Le prix doit être un nombre positif');
      setIsSubmitting(false);
      return;
    }

    // Validate required spec fields
    for (const field of specFields) {
      if (field.required) {
        const value = specs[field.key];
        if (value === undefined || value === null || value === '') {
          setError(`Le champ "${field.name}" est obligatoire`);
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Validate features (if any, they should have at least title)
    const invalidFeatures = features.filter((f) => !f.title.trim());
    if (invalidFeatures.length > 0) {
      setError('Toutes les fonctionnalités doivent avoir un titre');
      setIsSubmitting(false);
      return;
    }

    // Validate FAQ items (if any, they should have question and answer)
    const invalidFAQ = faq.filter((f) => !f.question.trim() || !f.answer.trim());
    if (invalidFAQ.length > 0) {
      setError('Toutes les questions FAQ doivent avoir une question et une réponse');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.set('name', name.trim());
    formData.set('category_id', categoryId);
    formData.set('price', priceCents.toString());
    formData.set('image_url', imageUrl || '');
    formData.set('description', description || '');
    formData.set('short_description', shortDescription || '');
    formData.set('specs', JSON.stringify(specs));
    formData.set('features', JSON.stringify(features));
    formData.set('faq', JSON.stringify(faq));
    formData.set('is_active', isActive.toString());
    formData.set('is_custom_page', isCustomPage.toString());

    try {
      const result =
        mode === 'create'
          ? await createProduct(formData)
          : await updateProduct(product!.id, formData);

      if (result.success) {
        router.push('/administrator/products');
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

      {/* Basic Information Section */}
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
              Nom du produit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: KSTAR BluE-S 6kW"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Slug preview */}
          {slugPreview && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Slug (généré automatiquement)
              </label>
              <div className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                <code className="text-sm text-neutral-600">{slugPreview}</code>
              </div>
            </div>
          )}

          {/* Category selector */}
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       focus:outline-none focus:ring-2 focus:ring-green-500 
                       focus:border-transparent bg-white"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price input (in euros) */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Prix (€) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={priceEuros}
              onChange={(e) => setPriceEuros(e.target.value)}
              required
              placeholder="Ex: 4990,00"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Entrez le prix en euros (ex: 4990,00 pour 4990€)
            </p>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Image du produit
            </label>
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
            />
          </div>

          {/* Short description */}
          <div className="md:col-span-2">
            <label
              htmlFor="short_description"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Description courte
            </label>
            <input
              type="text"
              id="short_description"
              name="short_description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brève description du produit"
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
              Description complète
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Description détaillée du produit"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent transition-shadow resize-y"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Spec Fields Section */}
      {specFields.length > 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Spécifications techniques
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            Remplissez les spécifications techniques pour cette catégorie de produit
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specFields.map((field) => (
              <DynamicSpecField
                key={field.key}
                field={field}
                value={specs[field.key] ?? ''}
                onChange={(value) => handleSpecChange(field.key, value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* No category selected message */}
      {!categoryId && (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 text-center">
          <CategoryIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500">
            Sélectionnez une catégorie pour afficher les champs de spécification
          </p>
        </div>
      )}

      {/* Category selected but no spec fields */}
      {categoryId && specFields.length === 0 && (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 text-center">
          <FieldIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500">
            Cette catégorie n&apos;a pas de champs de spécification définis
          </p>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Fonctionnalités
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Ajoutez les fonctionnalités clés du produit
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddFeature}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white 
                     text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Ajouter
          </button>
        </div>

        {features.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
            <FeatureIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 mb-3">Aucune fonctionnalité</p>
            <button
              type="button"
              onClick={handleAddFeature}
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 
                       hover:text-green-700"
            >
              <PlusIcon className="w-4 h-4" />
              Ajouter votre première fonctionnalité
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {features.map((feature, index) => (
              <FeatureEditor
                key={index}
                feature={feature}
                index={index}
                onChange={handleFeatureChange}
                onRemove={handleRemoveFeature}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Questions fréquentes (FAQ)
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Ajoutez les questions et réponses fréquentes
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddFAQ}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white 
                     text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Ajouter
          </button>
        </div>

        {faq.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
            <FAQIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 mb-3">Aucune question FAQ</p>
            <button
              type="button"
              onClick={handleAddFAQ}
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 
                       hover:text-green-700"
            >
              <PlusIcon className="w-4 h-4" />
              Ajouter votre première question
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {faq.map((item, index) => (
              <FAQEditor
                key={index}
                item={item}
                index={index}
                onChange={handleFAQChange}
                onRemove={handleRemoveFAQ}
              />
            ))}
          </div>
        )}
      </div>

      {/* Advanced Settings Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Paramètres avancés
        </h2>

        <div className="space-y-4">
          {/* Stripe Info (read-only) */}
          {product?.stripe_product_id && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Synchronisé avec Stripe
              </p>
              <p className="text-xs text-green-600 mt-1">
                Les modifications seront automatiquement répercutées sur Stripe.
              </p>
            </div>
          )}

          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row gap-6 pt-2">
            {/* Is Active */}
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                         focus:ring-green-500 focus:ring-2"
              />
              <span className="text-sm text-neutral-700">Produit actif</span>
            </label>

            {/* Is Custom Page */}
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCustomPage}
                onChange={(e) => setIsCustomPage(e.target.checked)}
                className="w-4 h-4 text-green-600 border-neutral-300 rounded 
                         focus:ring-green-500 focus:ring-2"
              />
              <span className="text-sm text-neutral-700">Page personnalisée</span>
            </label>
          </div>
          <p className="text-xs text-neutral-500">
            Cochez &quot;Page personnalisée&quot; si ce produit utilise un template spécifique
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
            ? 'Créer le produit'
            : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  );
}


/**
 * Dynamic spec field component that renders the appropriate input based on field type
 */
interface DynamicSpecFieldProps {
  field: SpecField;
  value: string | number;
  onChange: (value: string | number) => void;
}

function DynamicSpecField({ field, value, onChange }: DynamicSpecFieldProps) {
  const labelSuffix = field.unit ? ` (${field.unit})` : '';
  const isRequired = field.required;

  // Render based on field type
  switch (field.type) {
    case 'textarea':
      return (
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {field.name}{labelSuffix}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
            rows={3}
            placeholder={`Entrez ${field.name.toLowerCase()}`}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
          />
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {field.name}{labelSuffix}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500 
                     focus:border-transparent bg-white"
          >
            <option value="">Sélectionner...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case 'number':
      return (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {field.name}{labelSuffix}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
            step="any"
            placeholder={`Entrez ${field.name.toLowerCase()}`}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      );

    case 'text':
    default:
      return (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {field.name}{labelSuffix}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
            placeholder={`Entrez ${field.name.toLowerCase()}`}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      );
  }
}

/**
 * Feature editor component
 */
interface FeatureEditorProps {
  feature: ProductFeature;
  index: number;
  onChange: (index: number, field: keyof ProductFeature, value: string) => void;
  onRemove: (index: number) => void;
}

function FeatureEditor({ feature, index, onChange, onRemove }: FeatureEditorProps) {
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
          title="Supprimer cette fonctionnalité"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Icône
          </label>
          <input
            type="text"
            value={feature.icon}
            onChange={(e) => onChange(index, 'icon', e.target.value)}
            placeholder="Ex: ⚡ ou battery"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={feature.title}
            onChange={(e) => onChange(index, 'title', e.target.value)}
            placeholder="Ex: Haute performance"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Description
          </label>
          <input
            type="text"
            value={feature.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            placeholder="Description de la fonctionnalité"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ editor component
 */
interface FAQEditorProps {
  item: FAQItem;
  index: number;
  onChange: (index: number, field: keyof FAQItem, value: string) => void;
  onRemove: (index: number) => void;
}

function FAQEditor({ item, index, onChange, onRemove }: FAQEditorProps) {
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
          title="Supprimer cette question"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Question <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={item.question}
            onChange={(e) => onChange(index, 'question', e.target.value)}
            placeholder="Ex: Quelle est la durée de vie de la batterie ?"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Réponse <span className="text-red-500">*</span>
          </label>
          <textarea
            value={item.answer}
            onChange={(e) => onChange(index, 'answer', e.target.value)}
            rows={3}
            placeholder="Réponse à la question"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm 
                     text-neutral-900 placeholder:text-neutral-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
          />
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

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
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

function FeatureIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function FAQIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );
}
