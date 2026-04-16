import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA, ArticleStat, ArticleSources } from '@/components/blog'
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
        breadcrumbs={breadcrumbs}
      >
        {/* ---- INTRO ---- */}
        <p>
          En 2026, la pompe à chaleur s&apos;impose comme <strong>la solution de chauffage la plus économique et écologique</strong> pour
          les propriétaires français. Mais combien coûte réellement une PAC ? Quelles aides pouvez-vous obtenir ? Et en combien de
          temps votre investissement sera-t-il rentabilisé ?
        </p>
        <p>
          Ce guide compile les <strong>données officielles</strong> du gouvernement (MaPrimeRénov&apos;, ADEME, France Rénov&apos;)
          pour vous donner une vision claire et à jour des prix, aides et perspectives en 2026.
        </p>

        <ArticleCallout type="info" title="Bonne nouvelle : le guichet MaPrimeRénov' a rouvert">
          <p>Depuis le <strong>23 février 2026</strong>, le guichet MaPrimeRénov&apos; est de nouveau ouvert pour l&apos;ensemble des
          ménages et des parcours. C&apos;est le moment idéal pour lancer votre projet.</p>
        </ArticleCallout>

        {/* ---- SECTION 1 : PRIX PAR TYPE ---- */}
        <h2>Combien coûte une pompe à chaleur en 2026 ?</h2>
        <p>
          Le prix d&apos;une PAC dépend principalement du <strong>type de technologie</strong> choisie. Voici un comparatif des
          trois grandes familles de pompes à chaleur disponibles sur le marché français :
        </p>

        <ArticleTable {...PAC_TYPES_TABLE} title="Comparatif des types de PAC en 2026" />

        <ArticleStat stats={[
          { value: '÷3', label: 'votre facture chauffage', color: 'green' },
          { value: '3 à 4', label: 'COP moyen (ADEME)', color: 'blue' },
          { value: '15-20 ans', label: 'durée de vie', color: 'green' },
        ]} />

        <ArticleCallout type="tip" title="Le saviez-vous ?">
          <p>Selon l&apos;ADEME, une PAC air-eau affiche un COP saisonnier (SCOP) de 3 à 4 en conditions réelles.
          Cela signifie que pour <strong>1 kWh d&apos;électricité consommé, elle produit 3 à 4 kWh de chaleur</strong>.
          C&apos;est 3 fois plus efficace qu&apos;un radiateur électrique classique.</p>
        </ArticleCallout>

        {/* ---- SECTION 2 : FACTEURS DE PRIX ---- */}
        <h2>Ce qui influence le prix de votre PAC</h2>
        <p>Deux installations de PAC ne coûtent jamais le même prix. Voici les 5 facteurs qui font varier la facture :</p>

        <div className="my-8 space-y-4">
          {PRICE_FACTORS.map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-1">{i + 1}. {item.factor}</h4>
              <p className="text-slate-600 text-sm">{item.impact}</p>
            </div>
          ))}
        </div>

        {/* ---- SECTION 3 : AIDES ---- */}
        <h2>Les aides financières en 2026</h2>
        <p>
          La France propose un dispositif d&apos;aides parmi les plus généreux d&apos;Europe pour la rénovation énergétique.
          Voici les montants actualisés pour 2026 :
        </p>

        <h3>MaPrimeRénov&apos; — Le barème 2026</h3>
        <ArticleTable {...MAPRIMERENOV_TABLE} title="" />

        <ArticleCallout type="warning" title="Attention : les PAC air-air ne sont pas éligibles">
          <p>Les pompes à chaleur air-air <strong>ne sont pas éligibles à MaPrimeRénov&apos;</strong> ni à l&apos;éco-PTZ.
          Elles peuvent cependant bénéficier des primes CEE si leur coefficient de performance (COP) est supérieur ou égal à 3,9.
          Depuis janvier 2026, l&apos;isolation des murs n&apos;est plus financée par MaPrimeRénov&apos;.</p>
        </ArticleCallout>

        <h3>Les autres aides cumulables</h3>
        <ul>
          <li><strong>Prime CEE</strong> (Certificats d&apos;Économies d&apos;Énergie) : versée par les fournisseurs d&apos;énergie, cumulable avec MaPrimeRénov&apos;. Montant variable selon revenus et zone géographique.</li>
          <li><strong>TVA réduite à 5,5%</strong> : appliquée automatiquement sur les travaux de rénovation énergétique dans les logements de plus de 2 ans.</li>
          <li><strong>Éco-PTZ</strong> : prêt à taux zéro jusqu&apos;à 50 000€, sans conditions de revenus, remboursable sur 20 ans maximum.</li>
          <li><strong>Aides locales</strong> : certaines régions et communes proposent des compléments. Renseignez-vous auprès de votre mairie.</li>
        </ul>

        {/* ---- SECTION 4 : EXEMPLE CONCRET ---- */}
        <h2>Exemple concret : combien allez-vous payer ?</h2>
        <div className="my-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
          <h4 className="font-bold text-emerald-900 text-lg mb-4">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-700 text-sm">{line.label}</span>
                <span className={`font-semibold ${line.isDeduction ? 'text-emerald-600' : 'text-slate-900'}`}>{line.amount}</span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-3 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-lg">{EXAMPLE_CALCULATION.total.label}</span>
              <span className="font-bold text-emerald-900 text-2xl">{EXAMPLE_CALCULATION.total.amount}</span>
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-sm text-slate-500">Économies annuelles</p>
              <p className="font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <p className="text-sm text-slate-500">Retour sur investissement</p>
              <p className="font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        {/* ---- SECTION 5 : CALENDRIER ---- */}
        <h2>Le calendrier réglementaire : pourquoi agir maintenant ?</h2>
        <p>La réglementation française impose un calendrier de plus en plus strict. Voici les échéances clés :</p>

        <div className="my-8 space-y-3">
          {REGULATORY_CALENDAR.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
                {item.date}
              </div>
              <div>
                <p className="text-slate-700 text-sm">{item.event}</p>
                <p className="text-slate-400 text-xs">Source : {item.source}</p>
              </div>
            </div>
          ))}
        </div>

        <ArticleCallout type="warning" title="Propriétaires bailleurs : attention aux échéances">
          <p>Si vous louez un logement classé G, il est <strong>déjà interdit à la location depuis janvier 2025</strong>.
          Les logements F suivront en 2028, puis les E en 2034. Installer une PAC peut faire passer votre logement de E/F à C/D
          et vous remettre en conformité.</p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Prêt à passer à la pompe à chaleur ?"
          description="Obtenez votre devis personnalisé gratuit sous 48h. Nos techniciens certifiés RGE interviennent dans toute l'Île-de-France."
        />

        {/* ---- FAQ ---- */}
        <h2>Questions fréquentes</h2>
        <div className="space-y-4 my-8">
          {FAQ_ITEMS.map((faq, i) => (
            <details key={i} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:text-emerald-700 transition-colors">
                {faq.question}
                <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
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
