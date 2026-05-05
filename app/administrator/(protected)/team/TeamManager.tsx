'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { addAdmin, removeAdmin } from '@/app/administrator/actions/team'

interface AdminRow {
  email: string
  created_at: string
  added_by: string | null
}

export function TeamManager({ admins, currentEmail }: { admins: AdminRow[]; currentEmail: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  function onAdd(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await addAdmin(formData)
      if (!res.success) setError(res.error || 'Erreur')
      else {
        setAdding(false)
        router.refresh()
      }
    })
  }

  function onRemove(email: string) {
    const isMe = email === currentEmail
    const message = isMe
      ? `Vous êtes sur le point de retirer VOTRE accès admin (${email}). Continuer ?`
      : `Retirer l'accès admin pour ${email} ?`
    if (!confirm(message)) return
    setError(null)
    startTransition(async () => {
      const res = await removeAdmin(email)
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
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Ajouté le</th>
              <th className="px-4 py-3 font-medium">Ajouté par</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {admins.map((a) => (
              <tr key={a.email} className="text-sm">
                <td className="px-4 py-3 text-neutral-900">
                  {a.email}
                  {a.email === currentEmail && (
                    <span className="ml-2 text-xs text-green-700">(vous)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-700">
                  {new Date(a.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-neutral-500 text-xs">{a.added_by || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onRemove(a.email)} disabled={pending}
                    className="text-sm text-red-600 hover:text-red-700 disabled:opacity-30">
                    <Trash2 className="w-3.5 h-3.5 inline" /> Retirer
                  </button>
                </td>
              </tr>
            ))}
            {adding && (
              <tr className="bg-green-50/50">
                <td colSpan={4} className="p-4">
                  <form
                    onSubmit={(e) => { e.preventDefault(); onAdd(new FormData(e.currentTarget)) }}
                    className="flex gap-2 items-center"
                  >
                    <input
                      name="email" type="email" required autoFocus
                      placeholder="email@exemple.fr"
                      className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-green-700"
                    />
                    <button type="submit" disabled={pending}
                      className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded-lg flex items-center gap-1">
                      {pending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                      Ajouter
                    </button>
                    <button type="button" onClick={() => setAdding(false)}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900">
                      Annuler
                    </button>
                  </form>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!adding && (
        <button onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          Ajouter un administrateur
        </button>
      )}

      <p className="text-xs text-neutral-500">
        Les nouveaux admins se connectent via le lien magique sur la page de connexion. Pas de création de compte préalable nécessaire.
      </p>
    </div>
  )
}
