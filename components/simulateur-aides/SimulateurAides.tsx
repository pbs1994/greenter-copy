'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { Step1Foyer } from './steps/Step1Foyer'
import { Step2Revenu } from './steps/Step2Revenu'
import { Step3Equipement } from './steps/Step3Equipement'
import { Step4Situation } from './steps/Step4Situation'
import { StepResultat } from './steps/StepResultat'
import type {
  Equipement,
  ChauffageActuel,
  ZoneRevenu,
  EquipementInput,
  SimulationInput,
} from '@/lib/maprimerenov-2026'
import { calculate, MPR_GESTE_2026 } from '@/lib/maprimerenov-2026'

const STEP_LABELS = ['Foyer', 'Revenus', 'Équipements', 'Situation', 'Résultat']

interface State {
  personnes: number
  zone: ZoneRevenu
  revenuFiscal: number
  equipements: Equipement[]
  /** map equipement → { surfaceM2?, coutTTC? } — coutTTC renseigné seulement si l'utilisateur a un devis */
  values: Record<string, EquipementInput | undefined>
  chauffageActuel: ChauffageActuel
  surfaceLogementM2: number
}

const INITIAL: State = {
  personnes: 2,
  zone: 'idf',
  revenuFiscal: 0,
  equipements: [],
  values: {},
  chauffageActuel: 'gaz',
  surfaceLogementM2: 100,
}

export function SimulateurAides() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<State>(INITIAL)

  const toggleEquipement = (eq: Equipement) => {
    setState((s) => {
      const exists = s.equipements.includes(eq)
      const nextList = exists ? s.equipements.filter((e) => e !== eq) : [...s.equipements, eq]
      const nextValues = { ...s.values }
      if (!exists) {
        nextValues[eq] = { equipement: eq, coutTTC: 0 }
      } else {
        delete nextValues[eq]
      }
      return { ...s, equipements: nextList, values: nextValues }
    })
  }

  const setSurfaceForEquipement = (eq: Equipement, surfaceM2: number) => {
    setState((s) => {
      const prev = s.values[eq]
      return {
        ...s,
        values: {
          ...s.values,
          [eq]: {
            coutTTC: prev?.coutTTC ?? 0,
            ...prev,
            equipement: eq,
            surfaceM2,
          },
        },
      }
    })
  }

  const setCoutForEquipement = (eq: Equipement, coutTTC: number) => {
    setState((s) => {
      const prev = s.values[eq]
      return {
        ...s,
        values: {
          ...s.values,
          [eq]: {
            ...prev,
            equipement: eq,
            coutTTC,
          },
        },
      }
    })
  }

  const canNext = useMemo(() => {
    switch (step) {
      case 0:
        return state.personnes >= 1 && !!state.zone
      case 1:
        return state.revenuFiscal > 0
      case 2: {
        if (state.equipements.length === 0) return false
        return state.equipements.every((eq) => {
          const info = MPR_GESTE_2026[eq]
          if (info.unite !== 'eur_m2') return true
          const v = state.values[eq]
          return !!v && !!v.surfaceM2 && v.surfaceM2 > 0
        })
      }
      case 3:
        return !!state.chauffageActuel && state.surfaceLogementM2 >= 20
      default:
        return false
    }
  }, [step, state])

  const result = useMemo(() => {
    if (step !== 4 || state.equipements.length === 0) return null
    const equipements: EquipementInput[] = state.equipements.map((eq) => {
      const v = state.values[eq]
      return {
        equipement: eq,
        coutTTC: v?.coutTTC ?? 0,
        surfaceM2: v?.surfaceM2,
      }
    })
    const input: SimulationInput = {
      foyer: { personnes: state.personnes, zone: state.zone },
      revenuFiscal: state.revenuFiscal,
      chauffageActuel: state.chauffageActuel,
      surfaceLogementM2: state.surfaceLogementM2,
      equipements,
    }
    try {
      return calculate(input)
    } catch {
      return null
    }
  }, [step, state])

  const next = () => setStep((s) => Math.min(s + 1, 4))
  const prev = () => setStep((s) => Math.max(0, s - 1))
  const reset = () => {
    setState(INITIAL)
    setStep(0)
  }

  const hasDevis = state.equipements.some((eq) => (state.values[eq]?.coutTTC ?? 0) > 0)

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-neutral-200/60 border border-neutral-100 p-5 md:p-8">
      <div className="mb-8">
        <ProgressBar current={step} total={STEP_LABELS.length} labels={STEP_LABELS} />
      </div>

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
            equipements={state.equipements}
            values={state.values}
            onToggle={toggleEquipement}
            onSurfaceChange={setSurfaceForEquipement}
          />
        )}
        {step === 3 && (
          <Step4Situation
            chauffageActuel={state.chauffageActuel}
            surfaceM2={state.surfaceLogementM2}
            onChauffage={(c) => setState((s) => ({ ...s, chauffageActuel: c }))}
            onSurface={(n) => setState((s) => ({ ...s, surfaceLogementM2: n }))}
          />
        )}
        {step === 4 && result && (
          <StepResultat
            result={result}
            equipements={state.equipements}
            values={state.values}
            foyer={{ personnes: state.personnes, zone: state.zone }}
            revenuFiscal={state.revenuFiscal}
            chauffageActuel={state.chauffageActuel}
            surfaceLogementM2={state.surfaceLogementM2}
            hasDevis={hasDevis}
            onCoutChange={setCoutForEquipement}
            onRestart={reset}
          />
        )}
      </div>

      {step < 4 && (
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
            {step === 3 ? 'Voir mes aides' : 'Continuer'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
