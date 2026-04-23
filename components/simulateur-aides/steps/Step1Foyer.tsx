import { Users, MapPin } from 'lucide-react'
import type { ZoneRevenu } from '@/lib/maprimerenov-2026'

interface Step1FoyerProps {
  personnes: number
  zone: ZoneRevenu
  onPersonnes: (n: number) => void
  onZone: (z: ZoneRevenu) => void
}

export function Step1Foyer({ personnes, zone, onPersonnes, onZone }: Step1FoyerProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">Votre foyer</h3>
        <p className="text-neutral-500 text-sm">
          Les plafonds MaPrimeRénov&apos; dépendent de la taille du foyer et de la zone géographique.
        </p>
      </div>

      {/* Nombre de personnes */}
      <div>
        <label className="flex items-center gap-2 font-semibold text-neutral-900 mb-3">
          <Users className="w-4 h-4 text-emerald-600" />
          Nombre de personnes composant le foyer
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPersonnes(n)}
              className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all ${
                personnes === n
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {n === 6 ? '6+' : n}
            </button>
          ))}
        </div>
        {personnes >= 6 && (
          <input
            type="number"
            min={6}
            max={12}
            value={personnes}
            onChange={(e) => onPersonnes(Math.max(6, parseInt(e.target.value) || 6))}
            className="mt-3 w-32 px-4 py-2 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 outline-none"
            aria-label="Nombre exact de personnes"
          />
        )}
      </div>

      {/* Zone */}
      <div>
        <label className="flex items-center gap-2 font-semibold text-neutral-900 mb-3">
          <MapPin className="w-4 h-4 text-emerald-600" />
          Zone géographique
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onZone('idf')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              zone === 'idf'
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="font-semibold text-neutral-900">Île-de-France</div>
            <div className="text-xs text-neutral-500 mt-0.5">Paris, 77, 78, 91, 92, 93, 94, 95</div>
          </button>
          <button
            type="button"
            onClick={() => onZone('hors_idf')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              zone === 'hors_idf'
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="font-semibold text-neutral-900">Autres régions</div>
            <div className="text-xs text-neutral-500 mt-0.5">Reste de la France métropolitaine + DROM</div>
          </button>
        </div>
      </div>
    </div>
  )
}
