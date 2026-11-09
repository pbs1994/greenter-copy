// =============================================================================
// Corps de page entièrement local pour les villes ayant un contenu `rich`
// (lib/pac-local-content.ts). Remplace les blocs génériques du gabarit.
// =============================================================================

import Image from "next/image"
import { MapPin, CheckCircle } from "lucide-react"
import type { PacLocalContent, PacRichContent } from "@/lib/pac-local-content"

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-neutral-600 w-36 shrink-0">{label}</span>
      <div className="flex-1 bg-neutral-100 rounded-full h-3 overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: `${Math.max(pct, 1)}%` }} />
      </div>
      <span className="text-xs font-semibold text-neutral-700 w-12 text-right">
        {pct.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %
      </span>
    </div>
  )
}

export default function RichCityContent({
  cityName,
  local,
  rich,
  kmFromAgency,
}: {
  cityName: string
  local: PacLocalContent
  rich: PacRichContent
  kmFromAgency: number | null
}) {
  const fmt = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 })
  return (
    <>
      {/* ---- Photo + introduction ---- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <figure>
              <Image
                src={rich.photo.src}
                alt={rich.photo.alt}
                width={rich.photo.width}
                height={rich.photo.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto rounded-2xl object-cover"
                priority
              />
              <figcaption className="text-xs text-neutral-500 mt-2">
                {rich.photo.caption} Photo :{" "}
                <a href={rich.photo.sourceUrl} target="_blank" rel="noopener" className="underline">
                  {rich.photo.author}
                </a>
                ,{" "}
                <a href={rich.photo.licenceUrl} target="_blank" rel="noopener license" className="underline">
                  {rich.photo.licence}
                </a>
                , via Wikimedia Commons.
              </figcaption>
            </figure>
            <div>
              {kmFromAgency !== null && (
                <p className="inline-flex items-center gap-2 text-sm text-green-800 bg-green-50 border border-green-100 rounded-full px-3 py-1 mb-4">
                  <MapPin className="w-4 h-4" />
                  {`À ${Math.round(kmFromAgency)} km de notre agence d'Ozoir-la-Ferrière`}
                </p>
              )}
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{local.titre}</h2>
              {rich.intro.map((p, i) => (
                <p key={i} className="text-neutral-600 text-lg leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Chiffres INSEE ---- */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Le logement à {cityName} en chiffres
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-700">{rich.insee.logements.toLocaleString("fr-FR")}</p>
              <p className="text-xs text-neutral-500">logements</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-700">{fmt(rich.insee.pctMaisons)} %</p>
              <p className="text-xs text-neutral-500">de maisons</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-700">{fmt(rich.insee.pctProprietaires)} %</p>
              <p className="text-xs text-neutral-500">de propriétaires</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <h3 className="font-semibold text-neutral-900 mb-4">Résidences principales par période de construction</h3>
              <div className="space-y-2">
                {rich.insee.periodes.map((p) => (
                  <Bar key={p.label} label={p.label} pct={p.pct} color="bg-teal-500" />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <h3 className="font-semibold text-neutral-900 mb-4">Énergie principale de chauffage</h3>
              <div className="space-y-2">
                {rich.insee.chauffage.map((c, i) => (
                  <Bar key={c.label} label={c.label} pct={c.pct} color={["bg-orange-400", "bg-blue-400", "bg-red-400", "bg-amber-700"][i] ?? "bg-neutral-400"} />
                ))}
              </div>
            </div>
          </div>
          {rich.lectureChiffres.map((p, i) => (
            <p key={i} className="text-neutral-600 text-lg leading-relaxed mb-4">{p}</p>
          ))}
          <p className="text-neutral-400 text-xs mt-2">
            Source : INSEE, recensement de la population 2023, dossier complet de la commune (logements, période d&apos;achèvement, combustible principal des résidences principales).
          </p>
        </div>
      </section>

      {/* ---- Secteurs ---- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Quartier par quartier : quelle pompe à chaleur à {cityName} ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {rich.secteurs.map((q) => (
              <div key={q.nom} className="rounded-xl border border-neutral-200 p-5">
                <h3 className="font-semibold text-neutral-900 mb-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                  {q.nom}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{q.texte}</p>
              </div>
            ))}
          </div>
          {rich.quelPac.map((p, i) => (
            <p key={i} className="text-neutral-600 text-lg leading-relaxed mb-4">{p}</p>
          ))}
          <h3 className="font-heading text-xl font-bold text-neutral-900 mt-8 mb-3">Le bâti et ce qu&apos;il implique</h3>
          <p className="text-neutral-600 text-lg leading-relaxed mb-6">{local.habitat}</p>
          <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">Urbanisme et voisinage avant la pose</h3>
          <p className="text-neutral-600 text-lg leading-relaxed mb-6">{local.urbanisme}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {local.conseils.map((c) => (
              <div key={c.titre} className="bg-green-50 rounded-xl border border-green-100 p-5">
                <h3 className="font-semibold text-green-900 mb-2">{c.titre}</h3>
                <p className="text-sm text-green-800 leading-relaxed">{c.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Projet type ---- */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{rich.projet.titre}</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-6">{rich.projet.contexte}</p>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mb-4">
            <table className="w-full text-sm">
              <tbody>
                {rich.projet.lignes.map((l) => (
                  <tr key={l.poste} className="border-b border-neutral-100 last:border-0">
                    <td className="p-4 text-neutral-700">{l.poste}</td>
                    <td className="p-4 text-right font-semibold text-neutral-900 whitespace-nowrap">{l.valeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="flex items-start gap-2 text-neutral-600 leading-relaxed">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            {rich.projet.conclusion}
          </p>
        </div>
      </section>
    </>
  )
}
