import { Receipt } from 'lucide-react'
import type { Equipement } from '@/lib/maprimerenov-2026'

interface Step5DevisProps {
  equipement: Equipement | null
  coutTTC: number
  onCout: (n: number) => void
}

/** Fourchettes de prix indicatives (€ TTC pose incluse) */
const FOURCHETTES: Partial<Record<Equipement, { min: number; max: number; note: string }>> = {
  pac_air_eau: { min: 10_000, max: 18_000, note: 'PAC air-eau 8-14 kW posée' },
  pac_geothermique: { min: 20_000, max: 40_000, note: 'Capteurs horizontaux ou verticaux' },
  pac_air_air: { min: 2_500, max: 8_000, note: 'Mono-split à multi-split' },
  cesi: { min: 4_000, max: 7_000, note: 'Panneau solaire + ballon' },
  ssc: { min: 12_000, max: 20_000, note: 'Chauffage + ECS solaire' },
  chauffe_eau_thermo: { min: 2_500, max: 4_500, note: 'Ballon thermodynamique 200-300 L' },
  poele_granules: { min: 3_500, max: 6_000, note: 'Poêle à granulés étanche' },
  iso_combles_perdus: { min: 1_500, max: 5_000, note: 'Pour 60-120 m² de combles' },
  iso_rampants: { min: 4_000, max: 10_000, note: 'Isolation par l\'intérieur' },
  audit_energetique: { min: 500, max: 1_200, note: 'Audit complet avec scénarios' },
}

export function Step5Devis({ equipement, coutTTC, onCout }: Step5DevisProps) {
  const fourchette = equipement ? FOURCHETTES[equipement] : null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">Montant de votre devis</h3>
        <p className="text-neutral-500 text-sm">
          Si vous n&apos;avez pas encore de devis, utilisez la fourchette indicative.
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 font-semibold text-neutral-900 mb-3">
          <Receipt className="w-4 h-4 text-emerald-600" />
          Coût TTC du projet (matériel + pose)
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            step={100}
            value={coutTTC || ''}
            onChange={(e) => onCout(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder={fourchette ? `${fourchette.min.toLocaleString('fr-FR')} – ${fourchette.max.toLocaleString('fr-FR')}` : "Ex : 14 000"}
            className="w-full pl-4 pr-12 py-4 text-lg border-2 border-neutral-200 rounded-xl focus:border-emerald-500 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">€</span>
        </div>
      </div>

      {fourchette && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
          <p className="text-sm font-semibold text-emerald-900 mb-2">
            Fourchette 2026 en Île-de-France
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onCout(fourchette.min)}
              className="flex-1 p-3 bg-white rounded-lg border border-emerald-200 hover:border-emerald-400 transition-colors text-sm text-left"
            >
              <div className="text-xs text-neutral-500 mb-0.5">Entrée de gamme</div>
              <div className="font-bold text-emerald-700">{fourchette.min.toLocaleString('fr-FR')} €</div>
            </button>
            <button
              type="button"
              onClick={() => onCout(Math.round((fourchette.min + fourchette.max) / 2))}
              className="flex-1 p-3 bg-white rounded-lg border border-emerald-200 hover:border-emerald-400 transition-colors text-sm text-left"
            >
              <div className="text-xs text-neutral-500 mb-0.5">Prix médian</div>
              <div className="font-bold text-emerald-700">
                {Math.round((fourchette.min + fourchette.max) / 2).toLocaleString('fr-FR')} €
              </div>
            </button>
            <button
              type="button"
              onClick={() => onCout(fourchette.max)}
              className="flex-1 p-3 bg-white rounded-lg border border-emerald-200 hover:border-emerald-400 transition-colors text-sm text-left"
            >
              <div className="text-xs text-neutral-500 mb-0.5">Haut de gamme</div>
              <div className="font-bold text-emerald-700">{fourchette.max.toLocaleString('fr-FR')} €</div>
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-3">{fourchette.note}</p>
        </div>
      )}
    </div>
  )
}
