import Link from 'next/link'
import { ArrowRight, Check, AlertCircle, Phone, Sparkles } from 'lucide-react'
import type { SimulationResult } from '@/lib/maprimerenov-2026'

interface StepResultatProps {
  result: SimulationResult
  onRestart: () => void
}

const fmt = (n: number) => n.toLocaleString('fr-FR')

export function StepResultat({ result, onRestart }: StepResultatProps) {
  const pourcentageAide = result.coutTTC > 0
    ? Math.round((result.totalAides / result.coutTTC) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Résultat de votre simulation
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          {result.totalAides > 0
            ? `Jusqu'à ${fmt(result.totalAides)} € d'aides`
            : "Aides limitées pour votre situation"}
        </h3>
        <p className="text-neutral-500">
          Soit environ <strong>{pourcentageAide} %</strong> du coût total TTC couvert.
        </p>
      </div>

      {/* Reste à charge — card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-100">
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <div className="text-sm text-emerald-800 font-medium mb-1">Reste à charge estimé</div>
            <div className="text-4xl md:text-5xl font-bold text-emerald-700">
              {fmt(result.resteACharge)} €
            </div>
            <div className="text-xs text-emerald-600 mt-1">
              sur un coût total TTC de {fmt(result.coutTTC)} €
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-xs text-neutral-500 mb-1">Total aides</div>
            <div className="text-2xl font-bold text-emerald-700">- {fmt(result.totalAides)} €</div>
          </div>
        </div>
      </div>

      {/* Détail ligne par ligne */}
      <div className="space-y-2">
        <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
          Détail des aides
        </h4>
        {result.aides.map((a, i) => (
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

      {/* Disclaimers */}
      {result.disclaimers.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4">
          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            À savoir avant de déposer votre dossier
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

      {/* CTA */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
        <h4 className="font-bold text-xl md:text-2xl mb-2">
          Prêt à concrétiser votre projet ?
        </h4>
        <p className="text-slate-300 text-sm mb-5">
          Greenter monte votre dossier d&apos;aides (MaPrimeRénov&apos; + EDF + CEE) et vous remet un
          devis définitif sous 48 h. Installation sous 2 à 4 semaines en Île-de-France, techniciens
          RGE QualiPAC.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            Demander mon devis personnalisé
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+33766975099"
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white hover:text-slate-900 text-white font-semibold px-6 py-3.5 rounded-xl transition-all"
          >
            <Phone className="w-4 h-4" />
            07 66 97 50 99
          </a>
        </div>
      </div>

      {/* Relance */}
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
