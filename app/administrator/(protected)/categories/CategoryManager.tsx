'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2, Check, X } from 'lucide-react'
import { createCategory, updateCategory, deleteCategory } from '@/app/administrator/actions/categories'

interface Row {
  id: string
  name: string
  slug: string
  productCount: number
}

export function CategoryManager({ initial }: { initial: Row[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  function onCreate(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await createCategory(formData)
      if (!res.success) setError(res.error || 'Erreur')
      else {
        setCreating(false)
        router.refresh()
      }
    })
  }

  function onUpdate(id: string, formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await updateCategory(id, formData)
      if (!res.success) setError(res.error || 'Erreur')
      else {
        setEditingId(null)
        router.refresh()
      }
    })
  }

  function onDelete(row: Row) {
    if (row.productCount > 0) {
      setError('Impossible de supprimer une catégorie avec des produits associés')
      return
    }
    if (!confirm(`Supprimer « ${row.name} » ?`)) return
    setError(null)
    startTransition(async () => {
      const res = await deleteCategory(row.id)
      if (!res.success) setError(res.error || 'Erreur')
      else router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
      )}

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Produits</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {initial.map((row) =>
              editingId === row.id ? (
                <tr key={row.id} className="bg-green-50/50">
                  <td colSpan={4} className="p-4">
                    <form
                      onSubmit={(e) => { e.preventDefault(); onUpdate(row.id, new FormData(e.currentTarget)) }}
                      className="flex gap-2 items-center"
                    >
                      <input name="name" defaultValue={row.name} required placeholder="Nom" className="input flex-1" />
                      <input name="slug" defaultValue={row.slug} placeholder="slug-url" className="input w-48" />
                      <button type="submit" disabled={pending}
                        className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded-lg flex items-center gap-1">
                        {pending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                        Enregistrer
                      </button>
                      <button type="button" onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900">
                        Annuler
                      </button>
                    </form>
                  </td>
                </tr>
              ) : (
                <tr key={row.id} className="text-sm">
                  <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                  <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{row.slug}</td>
                  <td className="px-4 py-3 text-neutral-700">{row.productCount}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditingId(row.id)}
                      className="text-sm text-green-700 hover:text-green-900 mr-3">
                      <Pencil className="w-3.5 h-3.5 inline" /> Modifier
                    </button>
                    <button onClick={() => onDelete(row)}
                      disabled={row.productCount > 0 || pending}
                      title={row.productCount > 0 ? 'Cette catégorie contient des produits' : ''}
                      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed">
                      <Trash2 className="w-3.5 h-3.5 inline" /> Supprimer
                    </button>
                  </td>
                </tr>
              )
            )}

            {creating && (
              <tr className="bg-green-50/50">
                <td colSpan={4} className="p-4">
                  <form
                    onSubmit={(e) => { e.preventDefault(); onCreate(new FormData(e.currentTarget)) }}
                    className="flex gap-2 items-center"
                  >
                    <input name="name" required placeholder="Nom" className="input flex-1" autoFocus />
                    <input name="slug" placeholder="slug-url (auto si vide)" className="input w-48" />
                    <button type="submit" disabled={pending}
                      className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded-lg flex items-center gap-1">
                      {pending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                      Créer
                    </button>
                    <button type="button" onClick={() => setCreating(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900">
                      <X className="w-3 h-3 inline" />
                    </button>
                  </form>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!creating && (
        <button onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          Nouvelle catégorie
        </button>
      )}

      <style jsx>{`
        .input {
          padding: 0.4rem 0.6rem;
          background: white;
          border: 1px solid rgb(212 212 212);
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: rgb(21 128 61);
        }
      `}</style>
    </div>
  )
}
