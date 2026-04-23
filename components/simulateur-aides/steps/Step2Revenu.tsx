import { Euro, Info } from 'lucide-react'
import type { ZoneRevenu, Tranche } from '@/lib/maprimerenov-2026'
import { trancheFromRFR, LIBELLE_TRANCHE, plafondPourTranche } from '@/lib/maprimerenov-2026'

interface Step2RevenuProps {
  personnes: number
  zone: ZoneRevenu
  revenuFiscal: number
  onRevenu: (n: number) => void
}

const TRANCHE_COULEUR: Record<Tranche, string> = {
  bleu: 'bg-blue-100 text-blue-800 border-blue-300',
  jaune: 'bg-amber-100 text-amber-800 border-amber-300',
  violet: 'bg-violet-100 text-violet-800 border-violet-300',
  rose: 'bg-pink-100 text-pink-800 border-pink-300',
}

export function Step2Revenu({ personnes, zone, revenuFiscal, onRevenu }: Step2RevenuProps) {
  let tranche: Tranche | null = null
  try {
    if (revenuFiscal > 0) {
      tranche = trancheFromRFR(revenuFiscal, personnes, zone)
    }
  } catch {
    tranche = null
  }

  const plafondBleu = plafondPourTranche('bleu', personnes, zone)
  const plafondJaune = plafondPourTranche('jaune', personnes, zone)
  const plafondViolet = plafondPourTranche('violet', personnes, zone)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">Votre revenu fiscal de référence</h3>
        <p className="text-neutral-500 text-sm">
          Indiquez votre <strong>RFR 2024</strong> (visible sur votre dernier avis d&apos;imposition 2025
          sur les revenus 2024).
        </p>
      </div>

      {/* Input RFR */}
      <div>
        <label className="flex items-center gap-2 font-semibold text-neutral-900 mb-3">
          <Euro className="w-4 h-4 text-emerald-600" />
          Revenu fiscal de référence N-1 (RFR 2024)
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            step={100}
            value={revenuFiscal || ''}
            onChange={(e) => onRevenu(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="Ex : 38 500"
            className="w-full pl-4 pr-12 py-4 text-lg border-2 border-neutral-200 rounded-xl focus:border-emerald-500 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">€</span>
        </div>
      </div>

      {/* Résultat tranche */}
      {tranche && (
        <div className={`p-5 rounded-xl border-2 ${TRANCHE_COULEUR[tranche]}`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              {tranche === 'bleu' && '🔵'}
              {tranche === 'jaune' && '🟡'}
              {tranche === 'violet' && '🟣'}
              {tranche === 'rose' && '🌸'}
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg mb-1">Tranche {LIBELLE_TRANCHE[tranche]}</p>
              {tranche === 'rose' ? (
                <p className="text-sm">
                  Votre foyer n&apos;est pas éligible à MaPrimeRénov&apos; en parcours par geste. Vous
                  restez éligible à la prime CEE Coup de pouce (sans condition de ressources), à la
                  TVA réduite et à l&apos;éco-PTZ. Une rénovation d&apos;ampleur peut aussi donner
                  droit à 10 % d&apos;aide.
                </p>
              ) : (
                <p className="text-sm">
                  Votre foyer est éligible aux aides MaPrimeRénov&apos; au barème {tranche}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Plafonds affichés */}
      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-3">
          <Info className="w-4 h-4" />
          Plafonds 2026 pour votre foyer ({personnes} pers., {zone === 'idf' ? 'Île-de-France' : 'autre région'})
        </div>
        <ul className="space-y-1.5 text-sm text-neutral-600">
          <li>🔵 Tranche Bleu (très modestes) : ≤ <strong>{plafondBleu.toLocaleString('fr-FR')} €</strong></li>
          <li>🟡 Tranche Jaune (modestes) : ≤ <strong>{plafondJaune.toLocaleString('fr-FR')} €</strong></li>
          <li>🟣 Tranche Violet (intermédiaires) : ≤ <strong>{plafondViolet.toLocaleString('fr-FR')} €</strong></li>
          <li>🌸 Tranche Rose (supérieurs) : &gt; <strong>{plafondViolet.toLocaleString('fr-FR')} €</strong></li>
        </ul>
      </div>
    </div>
  )
}
