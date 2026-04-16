import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources, ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, PAC_TYPES_TABLE, MAPRIMERENOV_TABLE, PRICE_FACTORS,
  EXAMPLE_CALCULATION, REGULATORY_CALENDAR, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/prix-pac-2026'

export const metadata: Metadata = {
  title: ARTICLE_META.title + ' | Greenter',
  description: ARTICLE_META.subtitle,
  alternates: { canonical: `https://greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    url: `https://greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    images: [{ url: 'https://greenter.fr/pac.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://greenter.fr' },
  { name: 'Blog', url: 'https://greenter.fr/blog' },
  { name: 'Guide prix PAC 2026', url: `https://greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function GuidePrixPAC2026() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline={ARTICLE_META.title}
        description={ARTICLE_META.subtitle}
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: "Greenter", url: "https://greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://greenter.fr/logo.png" }}
        image="https://greenter.fr/pac.jpg"
        url={`https://greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/pac.jpg"
        heroAlt="Installation pompe à chaleur air-eau par Greenter"
        breadcrumbs={breadcrumbs}
      >
        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            En 2026, la pompe à chaleur s&apos;impose comme <strong>la solution de chauffage la plus économique et écologique</strong> pour
            les propriétaires français. Mais combien coûte réellement une PAC ? Quelles aides pouvez-vous obtenir ? Et en combien de
            temps votre investissement sera-t-il rentabilisé ?
          </p>
          <p>
            Ce guide compile les <strong>données officielles</strong> du gouvernement (MaPrimeRénov&apos;, ADEME, France Rénov&apos;)
            pour vous donner une vision claire et à jour des prix, aides et perspectives.
          </p>
        </div>

        <ArticleCallout type="info" title="Bonne nouvelle : le guichet MaPrimeRénov' a rouvert le 23 février 2026">
          <p>Le guichet est de nouveau ouvert pour <strong>l&apos;ensemble des ménages et des parcours</strong>. C&apos;est le moment idéal pour lancer votre projet de pompe à chaleur.</p>
        </ArticleCallout>

        {/* ---- SECTION 1 : PRIX PAR TYPE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Combien coûte une pompe à chaleur en 2026 ?</h2>

        <ArticleImageSection image="/pac2.png" alt="Pompe à chaleur air-eau unité extérieure" imagePosition="left">
          <p>Le prix d&apos;une PAC dépend principalement du <strong>type de technologie</strong> choisie. La PAC air-eau, la plus populaire en France, coûte entre 10 000€ et 18 000€ tout compris.</p>
          <p>La PAC air-air est plus abordable (1 500€ à 5 000€ par unité) mais ne produit pas d&apos;eau chaude et n&apos;est <strong>pas éligible à MaPrimeRénov&apos;</strong>.</p>
        </ArticleImageSection>

        <ArticleTable {...PAC_TYPES_TABLE} title="Comparatif des types de PAC en 2026" />

        <ArticleStat stats={[
          { value: '÷3', label: 'votre facture chauffage', color: 'green' },
          { value: '3 à 4', label: 'COP moyen (source ADEME)', color: 'blue' },
          { value: '15-20 ans', label: 'durée de vie moyenne', color: 'green' },
        ]} />

        <ArticleCallout type="tip" title="Le saviez-vous ?">
          <p>Selon l&apos;ADEME, une PAC air-eau affiche un COP saisonnier (SCOP) de 3 à 4 en conditions réelles.
          Cela signifie que pour <strong>1 kWh d&apos;électricité consommé, elle produit 3 à 4 kWh de chaleur</strong>.
          C&apos;est 3 fois plus efficace qu&apos;un radiateur électrique.</p>
        </ArticleCallout>

        {/* ---- SECTION 2 : FACTEURS DE PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Ce qui influence le prix de votre PAC</h2>

        <ArticleFullImage image="/installation.jpg" alt="Technicien installant une pompe à chaleur" caption="L'installation d'une PAC nécessite un technicien certifié RGE — Photo Greenter" />

        <div className="space-y-4 my-8">
          {PRICE_FACTORS.map((item, i) => (
            <div key={i} className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-700 font-bold text-lg rounded-xl flex-shrink-0">{i + 1}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">{item.factor}</h4>
                  <p className="text-slate-600">{item.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- SECTION 3 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Les aides financières en 2026</h2>

        <ArticleImageSection image="/interieur.png" alt="Intérieur maison rénovée avec pompe à chaleur" imagePosition="right">
          <p>La France propose un dispositif d&apos;aides parmi les <strong>plus généreux d&apos;Europe</strong> pour la rénovation énergétique.</p>
          <p>Le cumul de MaPrimeRénov&apos; + prime CEE + TVA réduite peut couvrir <strong>jusqu&apos;à 60% du coût total</strong> d&apos;une PAC air-eau.</p>
        </ArticleImageSection>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">MaPrimeRénov&apos; — Barème 2026</h3>
        <ArticleTable {...MAPRIMERENOV_TABLE} />

        <ArticleCallout type="warning" title="Les PAC air-air ne sont pas éligibles à MaPrimeRénov'">
          <p>Seules les PAC air-eau et géothermiques sont éligibles. Les PAC air-air peuvent bénéficier des primes CEE si leur COP est ≥ 3,9. <strong>Depuis janvier 2026, l&apos;isolation des murs n&apos;est plus financée</strong> par MaPrimeRénov&apos;.</p>
        </ArticleCallout>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Les autres aides cumulables</h3>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-2">Prime CEE</h4>
            <p className="text-sm text-slate-600">Versée par les fournisseurs d&apos;énergie, cumulable avec MaPrimeRénov&apos;. Montant variable selon revenus.</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <h4 className="font-bold text-sky-800 mb-2">TVA réduite 5,5%</h4>
            <p className="text-sm text-slate-600">Appliquée automatiquement sur les travaux de rénovation dans les logements de plus de 2 ans.</p>
          </div>
          <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
            <h4 className="font-bold text-violet-800 mb-2">Éco-PTZ</h4>
            <p className="text-sm text-slate-600">Prêt à taux zéro jusqu&apos;à 50 000€, sans conditions de revenus, remboursable sur 20 ans.</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">Aides locales</h4>
            <p className="text-sm text-slate-600">Certaines régions et communes proposent des compléments. Renseignez-vous auprès de votre mairie.</p>
          </div>
        </div>

        {/* ---- SECTION 4 : EXEMPLE CONCRET ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Exemple concret : combien allez-vous payer ?</h2>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <span className="text-slate-700">{line.label}</span>
                <span className={`font-semibold text-lg ${line.isDeduction ? 'text-emerald-600' : 'text-slate-900'}`}>{line.amount}</span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-xl">{EXAMPLE_CALCULATION.total.label}</span>
              <span className="font-bold text-emerald-900 text-3xl">{EXAMPLE_CALCULATION.total.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Économies annuelles</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        {/* ---- SECTION 5 : CALENDRIER ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Pourquoi agir maintenant ? Le calendrier réglementaire</h2>

        <ArticleFullImage image="/conformite.jpg" alt="Rénovation énergétique conformité DPE" caption="La réglementation impose des échéances strictes pour les propriétaires de passoires thermiques" />

        <div className="my-8 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
          {REGULATORY_CALENDAR.map((item, i) => (
            <div key={i} className="flex gap-6 items-start mb-6 relative">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shrink-0 z-10">
                {item.date}
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex-1">
                <p className="text-slate-700 font-medium">{item.event}</p>
                <p className="text-slate-400 text-xs mt-1">Source : {item.source}</p>
              </div>
            </div>
          ))}
        </div>

        <ArticleCallout type="warning" title="Propriétaires bailleurs : attention aux échéances">
          <p>Les logements classés G sont <strong>déjà interdits à la location depuis janvier 2025</strong>.
          Les F suivront en 2028, puis les E en 2034. Installer une PAC peut faire passer votre DPE de E/F à C/D.</p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Prêt à passer à la pompe à chaleur ?"
          description="Obtenez votre devis personnalisé gratuit sous 48h. Nos techniciens certifiés RGE interviennent dans toute l'Île-de-France."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Questions fréquentes</h2>
        <div className="space-y-4 my-8">
          {FAQ_ITEMS.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:text-emerald-700 transition-colors">
                {faq.question}
                <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* ---- SOURCES ---- */}
        <ArticleSources sources={SOURCES} />

        {/* ---- LIEN SERVICES ---- */}
        <div className="mt-8 p-6 bg-slate-50 rounded-xl text-center">
          <p className="text-slate-600 mb-3">Découvrez nos services d&apos;installation de pompes à chaleur :</p>
          <Link href="/services/pompe-a-chaleur" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800">
            Installation PAC en Île-de-France <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ArticleLayout>
    </>
  )
}
