import Link from 'next/link'
import { Receipt, ExternalLink, Ruler } from 'lucide-react'
import type { Equipement, EquipementInput } from '@/lib/maprimerenov-2026'
import { MPR_GESTE_2026 } from '@/lib/maprimerenov-2026'

interface Step5DevisProps {
  equipements: Equipement[]
  /** map equipement → { coutTTC, surfaceM2? } */
  values: Record<string, EquipementInput | undefined>
  onChange: (equipement: Equipement, patch: Partial<EquipementInput>) => void
}

/** Articles de référence pour estimer un prix sans devis (sources officielles uniquement) */
const PRICE_REFERENCE_LINK = {
  href: '/blog/guide-prix-pompe-a-chaleur-2026',
  label: "Guide prix 2026 — fourchettes officielles (Effy, ADEME)",
}

export function Step5Devis({ equipements, values, onChange }: Step5DevisProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">
          Montant{equipements.length > 1 ? 's' : ''} de votre{equipements.length > 1 ? 's' : ''} devis
        </h3>
        <p className="text-neutral-500 text-sm">
          Indiquez le coût TTC <strong>pour chaque équipement</strong> (matériel + pose) tel
          qu&apos;il apparaît sur votre devis.
        </p>
      </div>

      <div className="space-y-4">
        {equipements.map((eq) => {
          const info = MPR_GESTE_2026[eq]
          const current = values[eq]
          const needsSurface = info.unite === 'eur_m2'
          return (
            <div key={eq} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
              <div className="font-semibold text-neutral-900">{info.libelle}</div>
              {/* Coût TTC */}
              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-600 mb-1.5">
                  <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                  Coût TTC (matériel + pose)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={current?.coutTTC || ''}
                    onChange={(e) =>
                      onChange(eq, {
                        coutTTC: Math.max(0, parseInt(e.target.value) || 0),
                      })
                    }
                    placeholder="Ex : 14 000"
                    className="w-full pl-4 pr-12 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
                    €
                  </span>
                </div>
              </div>

              {/* Surface (isolation seulement) */}
              {needsSurface && (
                <div>
                  <label className="flex items-center gap-2 text-sm text-neutral-600 mb-1.5">
                    <Ruler className="w-3.5 h-3.5 text-emerald-600" />
                    Surface isolée
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="number"
                      min={1}
                      max={500}
                      step={1}
                      value={current?.surfaceM2 || ''}
                      onChange={(e) =>
                        onChange(eq, {
                          surfaceM2: Math.max(1, parseInt(e.target.value) || 0),
                        })
                      }
                      placeholder="Ex : 80"
                      className="w-full pl-4 pr-14 py-3 border-2 border-neutral-200 rounded-xl focus:border-emerald-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
                      m²
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    L&apos;aide est calculée au m² de surface isolée (barème différent par
                    tranche de revenus).
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
        <p className="text-sm text-neutral-600">
          Pas encore de devis ?{' '}
          <Link
            href={PRICE_REFERENCE_LINK.href}
            className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
          >
            {PRICE_REFERENCE_LINK.label}
            <ExternalLink className="w-3 h-3" />
          </Link>
          , ou demandez un devis gratuit à Greenter sous 48 h.
        </p>
      </div>
    </div>
  )
}
