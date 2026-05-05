'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2, Check, X } from 'lucide-react'
import {
  createMaintenanceService,
  updateMaintenanceService,
  deleteMaintenanceService,
  createMaintenanceOption,
  updateMaintenanceOption,
  deleteMaintenanceOption,
} from '@/app/administrator/actions/maintenance'

interface ServiceRow {
  id: string
  name: string
  slug: string
  price_monthly: number
  is_active: boolean
  sort_order: number | null
}

interface OptionRow {
  id: string
  name: string
  slug: string
  price_monthly: number
  is_active: boolean
  is_flat_fee: boolean
  exempt_from_discount: boolean
  sort_order: number | null
}

function formatEUR(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

/* ============================================================
 * Services
 * ============================================================ */

export function ServicesManager({ initial }: { initial: ServiceRow[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  function onCreate(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await createMaintenanceService(formData)
      if (!res.success) setError(res.error || 'Erreur')
      else { setCreating(false); router.refresh() }
    })
  }

  function onUpdate(id: string, formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await updateMaintenanceService(id, formData)
      if (!res.success) setError(res.error || 'Erreur')
      else { setEditingId(null); router.refresh() }
    })
  }

  function onDelete(row: ServiceRow) {
    if (!confirm(`Supprimer « ${row.name} » ?`)) return
    setError(null)
    startTransition(async () => {
      const res = await deleteMaintenanceService(row.id)
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
              <th className="px-4 py-3 font-medium">Prix / mois</th>
              <th className="px-4 py-3 font-medium">Ordre</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {initial.map((row) =>
              editingId === row.id ? (
                <tr key={row.id} className="bg-green-50/50">
                  <td colSpan={6} className="p-4">
                    <ServiceForm row={row} pending={pending} onSubmit={(fd) => onUpdate(row.id, fd)} onCancel={() => setEditingId(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={row.id} className="text-sm">
                  <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                  <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{row.slug}</td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{formatEUR(row.price_monthly)}</td>
                  <td className="px-4 py-3 text-neutral-700">{row.sort_order ?? 0}</td>
                  <td className="px-4 py-3">
                    {row.is_active ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Actif</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-neutral-200 text-neutral-700">Inactif</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditingId(row.id)} className="text-sm text-green-700 hover:text-green-900 mr-3">
                      <Pencil className="w-3.5 h-3.5 inline" /> Modifier
                    </button>
                    <button onClick={() => onDelete(row)} disabled={pending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-30">
                      <Trash2 className="w-3.5 h-3.5 inline" /> Supprimer
                    </button>
                  </td>
                </tr>
              )
            )}

            {creating && (
              <tr className="bg-green-50/50">
                <td colSpan={6} className="p-4">
                  <ServiceForm pending={pending} onSubmit={onCreate} onCancel={() => setCreating(false)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!creating && (
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" /> Nouveau service
        </button>
      )}
    </div>
  )
}

function ServiceForm({ row, pending, onSubmit, onCancel }: {
  row?: ServiceRow
  pending: boolean
  onSubmit: (formData: FormData) => void
  onCancel: () => void
}) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)) }}
      className="grid grid-cols-12 gap-2 items-center"
    >
      <input name="name" required defaultValue={row?.name} placeholder="Nom" className="input col-span-3" autoFocus={!row} />
      <input name="slug" defaultValue={row?.slug} placeholder="slug-url" className="input col-span-3" />
      <input name="price_monthly" type="number" step="0.01" min="0" required defaultValue={row ? (row.price_monthly / 100).toFixed(2) : ''} placeholder="€/mois" className="input col-span-2" />
      <input name="sort_order" type="number" defaultValue={row?.sort_order ?? 0} placeholder="Ordre" className="input col-span-1" />
      <label className="flex items-center gap-1.5 text-sm text-neutral-700 col-span-1">
        <input name="is_active" type="checkbox" defaultChecked={row ? row.is_active : true} className="rounded text-green-700" />
        Actif
      </label>
      <div className="col-span-2 flex justify-end gap-2">
        <button type="submit" disabled={pending} className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded-lg flex items-center gap-1">
          {pending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
          {row ? 'Save' : 'Créer'}
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900">
          <X className="w-3 h-3 inline" />
        </button>
      </div>
      <style jsx>{`
        .input {
          padding: 0.4rem 0.6rem;
          background: white;
          border: 1px solid rgb(212 212 212);
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        .input:focus { outline: none; border-color: rgb(21 128 61); }
      `}</style>
    </form>
  )
}

/* ============================================================
 * Options
 * ============================================================ */

export function OptionsManager({ initial }: { initial: OptionRow[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  function onCreate(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await createMaintenanceOption(formData)
      if (!res.success) setError(res.error || 'Erreur')
      else { setCreating(false); router.refresh() }
    })
  }

  function onUpdate(id: string, formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await updateMaintenanceOption(id, formData)
      if (!res.success) setError(res.error || 'Erreur')
      else { setEditingId(null); router.refresh() }
    })
  }

  function onDelete(row: OptionRow) {
    if (!confirm(`Supprimer « ${row.name} » ?`)) return
    setError(null)
    startTransition(async () => {
      const res = await deleteMaintenanceOption(row.id)
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
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {initial.map((row) =>
              editingId === row.id ? (
                <tr key={row.id} className="bg-green-50/50">
                  <td colSpan={6} className="p-4">
                    <OptionForm row={row} pending={pending} onSubmit={(fd) => onUpdate(row.id, fd)} onCancel={() => setEditingId(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={row.id} className="text-sm">
                  <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                  <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{row.slug}</td>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {formatEUR(row.price_monthly)}
                    <span className="text-xs text-neutral-500 ml-1">{row.is_flat_fee ? 'forfait' : '/ mois'}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-700">
                    {row.is_flat_fee ? 'Forfait unique' : 'Récurrent'}
                    {row.exempt_from_discount && <span className="block text-[10px] text-neutral-500">sans remise</span>}
                  </td>
                  <td className="px-4 py-3">
                    {row.is_active ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Actif</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-neutral-200 text-neutral-700">Inactif</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditingId(row.id)} className="text-sm text-green-700 hover:text-green-900 mr-3">
                      <Pencil className="w-3.5 h-3.5 inline" /> Modifier
                    </button>
                    <button onClick={() => onDelete(row)} disabled={pending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-30">
                      <Trash2 className="w-3.5 h-3.5 inline" /> Supprimer
                    </button>
                  </td>
                </tr>
              )
            )}

            {creating && (
              <tr className="bg-green-50/50">
                <td colSpan={6} className="p-4">
                  <OptionForm pending={pending} onSubmit={onCreate} onCancel={() => setCreating(false)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!creating && (
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" /> Nouvelle option
        </button>
      )}
    </div>
  )
}

function OptionForm({ row, pending, onSubmit, onCancel }: {
  row?: OptionRow
  pending: boolean
  onSubmit: (formData: FormData) => void
  onCancel: () => void
}) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)) }}
      className="space-y-2"
    >
      <div className="grid grid-cols-12 gap-2 items-center">
        <input name="name" required defaultValue={row?.name} placeholder="Nom" className="input col-span-3" autoFocus={!row} />
        <input name="slug" defaultValue={row?.slug} placeholder="slug-url" className="input col-span-3" />
        <input name="price_monthly" type="number" step="0.01" min="0" required defaultValue={row ? (row.price_monthly / 100).toFixed(2) : ''} placeholder="€" className="input col-span-2" />
        <input name="sort_order" type="number" defaultValue={row?.sort_order ?? 0} placeholder="Ordre" className="input col-span-1" />
        <div className="col-span-3 flex justify-end gap-2">
          <button type="submit" disabled={pending} className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded-lg flex items-center gap-1">
            {pending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            {row ? 'Save' : 'Créer'}
          </button>
          <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900">
            <X className="w-3 h-3 inline" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 px-1 text-sm text-neutral-700">
        <label className="flex items-center gap-1.5">
          <input name="is_active" type="checkbox" defaultChecked={row ? row.is_active : true} className="rounded text-green-700" />
          Actif
        </label>
        <label className="flex items-center gap-1.5">
          <input name="is_flat_fee" type="checkbox" defaultChecked={row?.is_flat_fee || false} className="rounded text-green-700" />
          Forfait unique (paiement one-shot, pas mensuel)
        </label>
        <label className="flex items-center gap-1.5">
          <input name="exempt_from_discount" type="checkbox" defaultChecked={row?.exempt_from_discount || false} className="rounded text-green-700" />
          Exempt de remise
        </label>
      </div>
      <style jsx>{`
        .input {
          padding: 0.4rem 0.6rem;
          background: white;
          border: 1px solid rgb(212 212 212);
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        .input:focus { outline: none; border-color: rgb(21 128 61); }
      `}</style>
    </form>
  )
}
