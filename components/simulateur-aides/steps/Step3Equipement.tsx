import { Thermometer, Flame, Sun, Droplets, Wind, FileSearch, Home as HomeIcon, Check } from 'lucide-react'
import type { Equipement } from '@/lib/maprimerenov-2026'
import { MPR_GESTE_2026 } from '@/lib/maprimerenov-2026'

interface Step3EquipementProps {
  equipements: Equipement[]
  onToggle: (e: Equipement) => void
}

type Option = {
  value: Equipement
  title: string
  desc: string
  icon: typeof Thermometer
  badge?: string
}

const OPTIONS: Option[] = [
  { value: 'pac_air_eau', title: 'PAC air-eau', desc: "Remplace une chaudière gaz/fioul sur radiateurs ou plancher chauffant", icon: Thermometer, badge: 'Populaire' },
  { value: 'pac_geothermique', title: 'PAC géothermique', desc: "Capteurs enterrés, aide max (jusqu'à 11 000 €)", icon: HomeIcon },
  { value: 'pac_air_air', title: 'PAC air-air / Clim réversible', desc: "Non éligible MaPrimeRénov', reste éligible CEE", icon: Wind },
  { value: 'cesi', title: 'Chauffe-eau solaire (CESI)', desc: "Production d'eau chaude sanitaire solaire", icon: Sun },
  { value: 'ssc', title: 'Système solaire combiné', desc: "Chauffage + ECS solaire, aide max 10 000 €", icon: Sun },
  { value: 'chauffe_eau_thermo', title: 'Chauffe-eau thermodynamique', desc: "ECS via pompe à chaleur", icon: Droplets },
  { value: 'poele_granules', title: 'Poêle à granulés', desc: "Chauffage bois performant", icon: Flame },
  { value: 'iso_combles_perdus', title: 'Isolation des combles perdus', desc: "25 €/m² en Bleu, plafond 75 €/m²", icon: HomeIcon },
  { value: 'iso_rampants', title: 'Isolation rampants / toiture', desc: "Rampants de toiture et plafonds de combles", icon: HomeIcon },
  { value: 'audit_energetique', title: 'Audit énergétique', desc: "Conditionné à au moins un geste de travaux", icon: FileSearch },
]

export function Step3Equipement({ equipements, onToggle }: Step3EquipementProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">
          Quels équipements souhaitez-vous installer ?
        </h3>
        <p className="text-neutral-500 text-sm">
          Sélectionnez un ou plusieurs équipements — chacun a son propre barème MaPrimeRénov&apos; et
          un bouquet de 2 ou 3 gestes ouvre un plafond éco-PTZ plus élevé (25 000 € / 30 000 €).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {OPTIONS.map(({ value, title, desc, icon: Icon, badge }) => {
          const selected = equipements.includes(value)
          const info = MPR_GESTE_2026[value]
          const nonEligible = !info.eligible
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              aria-pressed={selected}
              className={`relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                selected
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-semibold text-neutral-900">{title}</span>
                  {badge && (
                    <span className="text-[10px] uppercase font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                      {badge}
                    </span>
                  )}
                  {nonEligible && (
                    <span className="text-[10px] uppercase font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded">
                      CEE uniquement
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500">{desc}</p>
              </div>
              {/* Checkmark */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selected ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-neutral-300'
                }`}
                aria-hidden
              >
                {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
            </button>
          )
        })}
      </div>

      {equipements.length > 0 && (
        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-900">
          <strong>{equipements.length}</strong> équipement{equipements.length > 1 ? 's' : ''} sélectionné
          {equipements.length > 1 ? 's' : ''}
          {equipements.length >= 3
            ? ' — bouquet 3 gestes, éligible éco-PTZ 30 000 € (hors couplage MPR).'
            : equipements.length === 2
              ? ' — bouquet 2 gestes, éligible éco-PTZ 25 000 € (hors couplage MPR).'
              : '.'}
        </div>
      )}
    </div>
  )
}
