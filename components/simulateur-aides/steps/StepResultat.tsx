import Link from 'next/link'
import { ArrowRight, Check, AlertCircle, Phone, Sparkles, Receipt, FileText } from 'lucide-react'
import type { Equipement, EquipementInput, SimulationResult, ZoneRevenu, ChauffageActuel } from '@/lib/maprimerenov-2026'
import { MPR_GESTE_2026 } from '@/lib/maprimerenov-2026'
import { SimulationContactForm } from '../SimulationContactForm'

interface StepResultatProps {
  result: SimulationResult
  equipements: Equipement[]
  values: Record<string, EquipementInput | undefined>
  foyer: { personnes: number; zone: ZoneRevenu }
  revenuFiscal: number
  chauffageActuel: ChauffageActuel
  surfaceLogementM2: number
  hasDevis: boolean
  onCoutChange: (equipement: Equipement, coutTTC: number) => void
  onRestart: () => void
}

const fmt = (n: number) => n.toLocaleString('fr-FR')

export function StepResultat({
  result,
  equipements,
  values,
  foyer,
  revenuFiscal,
  chauffageActuel,
  surfaceLogementM2,
  hasDevis,
  onCoutChange,
  onRestart,
}: StepResultatProps) {
  const contactContext = {
    foyer,
    revenuFiscal,
    chauffageActuel,
    surfaceLogementM2,
    equipements: equipements.map((eq) => ({
      equipement: eq,
      coutTTC: values[eq]?.coutTTC ?? 0,
      surfaceM2: values[eq]?.surfaceM2,
    })),
    result,
  }
  /**
   * Lignes "indépendantes du coût" (MPR forfait, Prime EDF, CEE estimé).
   * Celles qui dépendent du coût (TVA économie) ne sont calculées que
   * si l'utilisateur a renseigné un devis.
   */
  const aidesPrincipales = result.aides.filter(
    (a) => !a.libelle.startsWith('TVA réduite'),
  )
  const aidesTVA = result.aides.filter((a) => a.libelle.startsWith('TVA réduite'))
  const totalAidesPrincipales = aidesPrincipales.reduce((s, a) => s + a.montant, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Votre simulation
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          {totalAidesPrincipales > 0
            ? `Jusqu'à ${fmt(totalAidesPrincipales)} € d'aides mobilisables`
            : "Aides limitées pour votre situation"}
        </h3>
        <p className="text-neutral-500">
          Tranche <strong className="capitalize">{result.tranche}</strong> — calcul basé sur les barèmes
          officiels 2026 de l&apos;ANAH.
        </p>
      </div>

      {/* Détail des aides indépendantes du coût */}
      <div className="space-y-2">
        <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
          Détail des aides
        </h4>
        {aidesPrincipales.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-4 rounded-xl border ${
              a.montant > 0
                ? 'bg-white border-neutral-200'
                : 'bg-neutral-50 border-neutral-100 opacity-75'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                a.montant > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-200 text-neutral-400'
              }`}
            >
              {a.montant > 0 ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-semibold text-neutral-900">{a.libelle}</span>
                {a.estimation && (
                  <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                    Estimation
                  </span>
                )}
              </div>
              {a.nonApplicable && (
                <p className="text-xs text-neutral-500 mt-1 italic">{a.nonApplicable}</p>
              )}
              <p className="text-xs text-neutral-400 mt-1">Source : {a.source}</p>
            </div>
            <div
              className={`font-bold text-lg whitespace-nowrap ${
                a.montant > 0 ? 'text-emerald-700' : 'text-neutral-400'
              }`}
            >
              {a.montant > 0 ? `- ${fmt(a.montant)} €` : '—'}
            </div>
          </div>
        ))}
      </div>

      {/* Bloc éco-PTZ */}
      <div className="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sm text-sky-900">
        💡 <strong>Éco-prêt à taux zéro mobilisable :</strong> {result.ecoPTZ.commentaire}
      </div>

      {/* ======================================================
          2 OPTIONS : J'ai un devis / Pas encore de devis
          ====================================================== */}
      <div className="bg-gradient-to-br from-slate-50 to-neutral-50 rounded-2xl p-5 md:p-6 border border-neutral-200">
        <h4 className="font-bold text-lg text-neutral-900 mb-1">
          Pour affiner votre simulation :
        </h4>
        <p className="text-sm text-neutral-500 mb-5">
          Les aides ci-dessus ne dépendent pas du prix. Pour calculer votre{' '}
          <strong>reste à charge précis</strong> et l&apos;<strong>économie TVA</strong>, nous avons
          besoin du montant de votre devis.
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-5">
          {/* Option A — J'ai un devis */}
          <div
            className={`p-4 rounded-xl border-2 ${
              hasDevis ? 'border-emerald-500 bg-emerald-50' : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              <h5 className="font-bold text-neutral-900">J&apos;ai déjà un devis</h5>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              Saisissez le coût TTC (matériel + pose) pour chaque équipement — nous calculerons
              votre reste à charge exact.
            </p>
            <div className="space-y-2.5">
              {equipements.map((eq) => {
                const info = MPR_GESTE_2026[eq]
                const v = values[eq]
                return (
                  <div key={eq}>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      {info.libelle}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={v?.coutTTC || ''}
                        onChange={(e) =>
                          onCoutChange(eq, Math.max(0, parseInt(e.target.value) || 0))
                        }
                        placeholder="Coût TTC de votre devis"
                        className="w-full pl-3 pr-8 py-2 text-sm border-2 border-neutral-200 rounded-lg focus:border-emerald-500 outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-medium">
                        €
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Option B — Pas de devis */}
          <div className="p-4 rounded-xl border-2 border-neutral-200 bg-white flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <h5 className="font-bold text-neutral-900">Pas encore de devis</h5>
            </div>
            <p className="text-xs text-neutral-500 mb-4 flex-1">
              Nos techniciens certifiés RGE se déplacent gratuitement à domicile, évaluent votre
              projet et vous remettent un devis détaillé sous 48 h avec vos aides pré-calculées.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Breakdown du reste à charge — uniquement si l'utilisateur a renseigné au moins un coût */}
        {hasDevis && (
          <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3">
            <h5 className="font-bold text-sm text-neutral-900">Reste à charge calculé</h5>
            {aidesTVA.length > 0 && (
              <div className="space-y-1.5">
                {aidesTVA.map((a, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">{a.libelle}</span>
                    <span className="font-semibold text-emerald-700">- {fmt(a.montant)} €</span>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="font-bold text-neutral-900">
                Coût TTC total
              </span>
              <span className="font-bold text-neutral-900">{fmt(result.coutTTC)} €</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-700">Total aides</span>
              <span className="font-bold text-emerald-700">- {fmt(result.totalAides)} €</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t-2 border-emerald-200">
              <span className="font-bold text-lg text-emerald-900">Reste à charge</span>
              <span className="font-bold text-2xl text-emerald-700">
                {fmt(result.resteACharge)} €
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimers */}
      {result.disclaimers.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4">
          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            À savoir
          </h4>
          <ul className="space-y-1.5 text-sm text-amber-900">
            {result.disclaimers.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulaire — envoie la simulation + les coordonnées par email à Greenter */}
      <SimulationContactForm context={contactContext} />

      {/* Phone fallback */}
      <div className="text-center text-sm text-neutral-500">
        Ou appelez directement :{' '}
        <a
          href="tel:+33766975099"
          className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800"
        >
          <Phone className="w-3.5 h-3.5" />
          07 66 97 50 99
        </a>
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm text-neutral-500 hover:text-neutral-700 underline"
        >
          Recommencer une simulation
        </button>
      </div>
    </div>
  )
}
