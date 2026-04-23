'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { Step1Foyer } from './steps/Step1Foyer'
import { Step2Revenu } from './steps/Step2Revenu'
import { Step3Equipement } from './steps/Step3Equipement'
import { Step4Situation } from './steps/Step4Situation'
import { Step5Devis } from './steps/Step5Devis'
import { StepResultat } from './steps/StepResultat'
import type {
  Equipement,
  ChauffageActuel,
  ZoneRevenu,
  SimulationInput,
} from '@/lib/maprimerenov-2026'
import { calculate } from '@/lib/maprimerenov-2026'

const STEP_LABELS = ['Foyer', 'Revenus', 'Équipement', 'Situation', 'Devis', 'Résultat']

interface State {
  personnes: number
  zone: ZoneRevenu
  revenuFiscal: number
  equipement: Equipement | null
  chauffageActuel: ChauffageActuel
  surfaceM2: number
  coutTTC: number
}

const INITIAL: State = {
  personnes: 2,
  zone: 'idf',
  revenuFiscal: 0,
  equipement: null,
  chauffageActuel: 'gaz',
  surfaceM2: 100,
  coutTTC: 0,
}

export function SimulateurAides() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<State>(INITIAL)

  const canNext = useMemo(() => {
    switch (step) {
      case 0:
        return state.personnes >= 1 && !!state.zone
      case 1:
        return state.revenuFiscal > 0
      case 2:
        return !!state.equipement
      case 3:
        return !!state.chauffageActuel && state.surfaceM2 >= 20
      case 4:
        return state.coutTTC > 0
      default:
        return false
    }
  }, [step, state])

  const result = useMemo(() => {
    if (step !== 5 || !state.equipement) return null
    const input: SimulationInput = {
      foyer: { personnes: state.personnes, zone: state.zone },
      revenuFiscal: state.revenuFiscal,
      equipement: state.equipement,
      chauffageActuel: state.chauffageActuel,
      coutTTC: state.coutTTC,
      surfaceM2: state.surfaceM2,
    }
    try {
      return calculate(input)
    } catch {
      return null
    }
  }, [step, state])

  const next = () => setStep((s) => Math.min(s + 1, 5))
  const prev = () => setStep((s) => Math.max(0, s - 1))
  const reset = () => {
    setState(INITIAL)
    setStep(0)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-neutral-200/60 border border-neutral-100 p-5 md:p-8">
      {/* Progress */}
      <div className="mb-8">
        <ProgressBar current={step} total={STEP_LABELS.length} labels={STEP_LABELS} />
      </div>

      {/* Current step */}
      <div className="min-h-[400px]">
        {step === 0 && (
          <Step1Foyer
            personnes={state.personnes}
            zone={state.zone}
            onPersonnes={(n) => setState((s) => ({ ...s, personnes: n }))}
            onZone={(z) => setState((s) => ({ ...s, zone: z }))}
          />
        )}
        {step === 1 && (
          <Step2Revenu
            personnes={state.personnes}
            zone={state.zone}
            revenuFiscal={state.revenuFiscal}
            onRevenu={(n) => setState((s) => ({ ...s, revenuFiscal: n }))}
          />
        )}
        {step === 2 && (
          <Step3Equipement
            equipement={state.equipement}
            onEquipement={(e) => setState((s) => ({ ...s, equipement: e }))}
          />
        )}
        {step === 3 && (
          <Step4Situation
            chauffageActuel={state.chauffageActuel}
            surfaceM2={state.surfaceM2}
            onChauffage={(c) => setState((s) => ({ ...s, chauffageActuel: c }))}
            onSurface={(n) => setState((s) => ({ ...s, surfaceM2: n }))}
          />
        )}
        {step === 4 && (
          <Step5Devis
            equipement={state.equipement}
            coutTTC={state.coutTTC}
            onCout={(n) => setState((s) => ({ ...s, coutTTC: n }))}
          />
        )}
        {step === 5 && result && <StepResultat result={result} onRestart={reset} />}
      </div>

      {/* Navigation — hidden on the result step */}
      {step < 5 && (
        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
              step === 0
                ? 'text-neutral-300 cursor-not-allowed'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              canNext
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            {step === 4 ? 'Voir mes aides' : 'Continuer'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
