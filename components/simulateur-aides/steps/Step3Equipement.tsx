import { Thermometer, Flame, Sun, Droplets, Wind, FileSearch, Home as HomeIcon, Check, Ruler } from 'lucide-react'
import type { Equipement, EquipementInput } from '@/lib/maprimerenov-2026'
import { MPR_GESTE_2026, estEligibleEcoPTZ } from '@/lib/maprimerenov-2026'

interface Step3EquipementProps {
  equipements: Equipement[]
  /** map equipement → { surfaceM2? } — seule la surface est pertinente ici (pas le coût) */
  values: Record<string, EquipementInput | undefined>
  onToggle: (e: Equipement) => void
  onSurfaceChange: (e: Equipement, surfaceM2: number) => void
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
  { value: 'iso_combles_perdus', title: 'Isolation des combles perdus', desc: "Aide calculée au m² isolé", icon: HomeIcon },
  { value: 'iso_rampants', title: 'Isolation rampants / toiture', desc: "Rampants de toiture et plafonds de combles", icon: HomeIcon },
  { value: 'audit_energetique', title: 'Audit énergétique', desc: "Conditionné à au moins un geste de travaux", icon: FileSearch },
]

export function Step3Equipement({
  equipements,
  values,
  onToggle,
  onSurfaceChange,
}: Step3EquipementProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">
          Quels équipements souhaitez-vous installer ?
        </h3>
        <p className="text-neutral-500 text-sm">
          Sélectionnez un ou plusieurs équipements. Un bouquet de 2 ou 3 gestes ouvre un plafond
          éco-PTZ plus élevé (25 000 € / 30 000 €).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {OPTIONS.map(({ value, title, desc, icon: Icon, badge }) => {
          const selected = equipements.includes(value)
          const info = MPR_GESTE_2026[value]
          const nonEligible = !info.eligible
          const needsSurface = info.unite === 'eur_m2'
          const currentSurface = values[value]?.surfaceM2 || 0
          return (
            <div
              key={value}
              className={`rounded-xl border-2 transition-all ${
                selected ? 'border-emerald-500 bg-emerald-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <button
                type="button"
                onClick={() => onToggle(value)}
                aria-pressed={selected}
                className="relative flex items-start gap-3 w-full p-4 text-left"
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
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-neutral-300'
                  }`}
                  aria-hidden
                >
                  {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </button>

              {/* Surface input — uniquement pour les gestes d'isolation sélectionnés */}
              {selected && needsSurface && (
                <div className="px-4 pb-4 pt-1 border-t border-emerald-200/60">
                  <label className="flex items-center gap-2 text-xs text-neutral-600 mb-1.5">
                    <Ruler className="w-3 h-3 text-emerald-600" />
                    Surface à isoler
                  </label>
                  <div className="relative max-w-[160px]">
                    <input
                      type="number"
                      min={1}
                      max={500}
                      step={1}
                      value={currentSurface || ''}
                      onChange={(e) =>
                        onSurfaceChange(value, Math.max(1, parseInt(e.target.value) || 0))
                      }
                      placeholder="80"
                      className="w-full pl-3 pr-10 py-2 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-medium">
                      m²
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {equipements.length > 0 && (() => {
        const ecoPTZEligibles = equipements.filter(estEligibleEcoPTZ)
        const nbEco = ecoPTZEligibles.length
        const nbExclus = equipements.length - nbEco
        return (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-900">
            <div>
              <strong>{equipements.length}</strong> équipement{equipements.length > 1 ? 's' : ''}{' '}
              sélectionné{equipements.length > 1 ? 's' : ''}.
            </div>
            <div className="mt-1 text-xs text-emerald-800/80">
              {nbEco === 0 && "Aucun équipement éligible à l'éco-PTZ dans votre sélection."}
              {nbEco === 1 && "Éco-PTZ monogeste — jusqu'à 15 000 € sur 15 ans."}
              {nbEco === 2 && "Bouquet 2 actions — éco-PTZ jusqu'à 25 000 € sur 15 ans."}
              {nbEco >= 3 && "Bouquet 3 actions ou plus — éco-PTZ jusqu'à 30 000 € sur 15 ans."}
              {nbExclus > 0 && (
                <span className="block mt-0.5 italic">
                  ({nbExclus} équipement{nbExclus > 1 ? 's' : ''} non éligible
                  {nbExclus > 1 ? 's' : ''} à l&apos;éco-PTZ — audit énergétique et PAC air-air sont exclus)
                </span>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
