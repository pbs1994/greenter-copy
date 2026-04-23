import { Flame, Zap, Trees, HelpCircle } from 'lucide-react'
import type { ChauffageActuel } from '@/lib/maprimerenov-2026'

interface Step4SituationProps {
  chauffageActuel: ChauffageActuel
  surfaceM2: number
  onChauffage: (c: ChauffageActuel) => void
  onSurface: (n: number) => void
}

const OPTIONS: { value: ChauffageActuel; label: string; icon: typeof Flame; desc: string }[] = [
  { value: 'gaz', label: 'Chaudière gaz', icon: Flame, desc: 'Éligible prime EDF + CEE bonifié ×5' },
  { value: 'fioul', label: 'Chaudière fioul', icon: Flame, desc: 'Éligible prime EDF + CEE bonifié ×5' },
  { value: 'charbon', label: 'Chaudière charbon', icon: Flame, desc: 'Éligible CEE bonifié ×5 (mais pas la prime EDF)' },
  { value: 'electrique', label: 'Chauffage électrique', icon: Zap, desc: 'Non éligible prime EDF / CEE bonifié' },
  { value: 'bois', label: 'Bois / granulés', icon: Trees, desc: 'Non éligible prime EDF' },
  { value: 'autre', label: 'Autre / aucun', icon: HelpCircle, desc: '—' },
]

export function Step4Situation({
  chauffageActuel,
  surfaceM2,
  onChauffage,
  onSurface,
}: Step4SituationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">Votre situation actuelle</h3>
        <p className="text-neutral-500 text-sm">
          Détermine l&apos;éligibilité à la prime EDF et l&apos;estimation CEE.
        </p>
      </div>

      {/* Chauffage actuel */}
      <div>
        <label className="font-semibold text-neutral-900 block mb-3">
          Chauffage actuel du logement
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {OPTIONS.map(({ value, label, icon: Icon, desc }) => {
            const selected = chauffageActuel === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => onChauffage(value)}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selected ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-sm">{label}</div>
                  <div className="text-xs text-neutral-500">{desc}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Surface */}
      <div>
        <label className="font-semibold text-neutral-900 block mb-3">
          Surface chauffée du logement
        </label>
        <div className="relative max-w-xs">
          <input
            type="number"
            min={20}
            max={500}
            step={5}
            value={surfaceM2 || ''}
            onChange={(e) => onSurface(Math.max(20, parseInt(e.target.value) || 100))}
            placeholder="120"
            className="w-full pl-4 pr-14 py-3 text-lg border-2 border-neutral-200 rounded-xl focus:border-emerald-500 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">m²</span>
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          Utilisée pour l&apos;estimation du Coup de pouce CEE (varie selon la surface chauffée).
        </p>
      </div>
    </div>
  )
}
