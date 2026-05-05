'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, Upload, X } from 'lucide-react'
import { createProduct, updateProduct, deleteProduct, uploadProductImage } from '@/app/administrator/actions/products'

interface Category {
  id: string
  name: string
}

interface ProductFormProps {
  mode: 'create' | 'edit'
  categories: Category[]
  product?: {
    id: string
    name: string
    slug: string
    price: number          // cents
    category_id: string
    short_description: string | null
    description: string | null
    image_url: string | null
    is_active: boolean
    is_featured: boolean
  }
}

export function ProductForm({ mode, categories, product }: ProductFormProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState(product?.image_url || '')
  const [uploading, setUploading] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setWarning(null)
    const formData = new FormData(e.currentTarget)
    formData.set('image_url', imageUrl)

    startTransition(async () => {
      if (mode === 'create') {
        const result = await createProduct(formData)
        if (!result.success && result.error) setError(result.error)
        // On success createProduct redirects, so no else branch needed.
      } else {
        const result = await updateProduct(product!.id, formData)
        if (!result.success && result.error) setError(result.error)
        else if (result.warning) setWarning(result.warning)
        else router.refresh()
      }
    })
  }

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    const fd = new FormData()
    fd.set('file', file)
    const res = await uploadProductImage(fd)
    setUploading(false)
    if (!res.success || !res.url) {
      setError(res.error || 'Échec de l’upload.')
      return
    }
    setImageUrl(res.url)
  }

  function onDelete() {
    if (!product) return
    if (!confirm(`Supprimer définitivement « ${product.name} » ?`)) return
    startTransition(async () => {
      const result = await deleteProduct(product.id)
      if (!result.success && result.error) setError(result.error)
      else router.push('/administrator/products')
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
      )}
      {warning && (
        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-sm text-orange-700">{warning}</div>
      )}

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-700">Informations</h2>

        <Field label="Nom" htmlFor="name" required>
          <input id="name" name="name" type="text" required defaultValue={product?.name}
            className="input" placeholder="Batterie solaire LiFePO4 5kWh" />
        </Field>

        <Field label="Slug (URL)" htmlFor="slug" hint="Laissé vide = généré automatiquement depuis le nom">
          <input id="slug" name="slug" type="text" defaultValue={product?.slug}
            className="input" placeholder="batterie-solaire-lifepo4-5kwh" />
        </Field>

        <Field label="Catégorie" htmlFor="category_id" required>
          <select id="category_id" name="category_id" required defaultValue={product?.category_id} className="input">
            <option value="">— Choisir —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Prix TTC (€)" htmlFor="price" required hint="Stripe sera mis à jour automatiquement">
          <input id="price" name="price" type="number" step="0.01" min="0" required
            defaultValue={product ? (product.price / 100).toFixed(2) : ''}
            className="input" placeholder="2999.00" />
        </Field>
      </div>

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-700">Image principale</h2>

        {imageUrl ? (
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-neutral-100 ring-1 ring-neutral-200">
              <Image src={imageUrl} alt="" width={128} height={128} className="object-contain w-full h-full" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-neutral-500 break-all">{imageUrl}</p>
              <button type="button" onClick={() => setImageUrl('')}
                className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
                <X className="w-3.5 h-3.5" />
                Retirer
              </button>
            </div>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-green-600 hover:bg-green-50/50 transition-colors">
            <input type="file" accept="image/*" onChange={onImageChange} className="sr-only" disabled={uploading} />
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
                <span className="text-sm text-neutral-600">Upload en cours...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-600">Choisir une image (max 5 Mo)</span>
              </>
            )}
          </label>
        )}
      </div>

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-700">Descriptions</h2>

        <Field label="Description courte" htmlFor="short_description" hint="Affichée sur les fiches produit et envoyée à Stripe">
          <textarea id="short_description" name="short_description" rows={2} defaultValue={product?.short_description || ''}
            className="input" placeholder="Une phrase qui résume le produit." />
        </Field>

        <Field label="Description longue (HTML)" htmlFor="description">
          <textarea id="description" name="description" rows={8} defaultValue={product?.description || ''}
            className="input font-mono text-xs" placeholder="<p>Description détaillée…</p>" />
        </Field>
      </div>

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-700">Visibilité</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_active" defaultChecked={product ? product.is_active : true}
            className="w-4 h-4 rounded border-neutral-300 text-green-700 focus:ring-green-600" />
          <span className="text-sm text-neutral-700">Produit actif (visible sur le site)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured || false}
            className="w-4 h-4 rounded border-neutral-300 text-green-700 focus:ring-green-600" />
          <span className="text-sm text-neutral-700">Mettre en avant</span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {mode === 'edit' && (
            <button type="button" onClick={onDelete} disabled={pending}
              className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
              Supprimer ce produit
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/administrator/products" className="text-sm text-neutral-600 hover:text-neutral-900">
            Annuler
          </Link>
          <button type="submit" disabled={pending}
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-5 py-2 rounded-lg disabled:opacity-50">
            {pending && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'create' ? 'Créer le produit' : 'Enregistrer'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid rgb(212 212 212);
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: transparent;
          box-shadow: 0 0 0 2px rgb(21 128 61);
        }
      `}</style>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </div>
  )
}
