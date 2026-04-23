import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSteps, ArticleSources,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, CONSUMPTION_TABLE, AIDES_TABLE, STEPS,
  EXAMPLE_CALCULATION, REGULATORY_CALENDAR, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/remplacer-chaudiere-gaz-pac-2026'

export const metadata: Metadata = {
  title: ARTICLE_META.title + ' | Greenter',
  description: ARTICLE_META.subtitle,
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/remplacer-chaudiere-gaz-pac-hero.png',
      width: 1200,
      height: 630,
      alt: 'Remplacer sa chaudière gaz par une pompe à chaleur',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/remplacer-chaudiere-gaz-pac-hero.png'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Remplacer chaudière gaz par PAC 2026', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function RemplacerChaudiereGazPAC2026() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline={ARTICLE_META.title}
        description={ARTICLE_META.subtitle}
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: "Greenter", url: "https://www.greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://www.greenter.fr/logo.png" }}
        image="https://www.greenter.fr/images/blog/remplacer-chaudiere-gaz-pac-hero.png"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/remplacer-chaudiere-gaz-pac-hero.png"
        heroAlt="Chaudière gaz en cours de remplacement par une pompe à chaleur air-eau"
        breadcrumbs={breadcrumbs}
      >
        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            En avril 2026, la France accélère la <strong>sortie du gaz résidentiel</strong>. Depuis l&apos;arrêté
            du 4 décembre 2024, la <strong>TVA sur les chaudières gaz est passée à 20 %</strong> (contre 10 %
            auparavant). Le <strong>Coup de pouce chauffage CEE est bonifié ×5</strong> pour un remplacement
            gaz → PAC air-eau, et EDF a lancé le 8 avril 2026 une <strong>prime forfaitaire de 1 000 €</strong>{' '}
            pour les ménages modestes (80 000 dossiers disponibles).
          </p>
          <p>
            Résultat : pour une maison de 120 m² aux revenus de la tranche Jaune, le reste à charge tombe
            autour de <strong>4 500 à 5 000 €</strong> après cumul de MaPrimeRénov&apos;, prime EDF, CEE et
            TVA réduite. Voici, données officielles à l&apos;appui, pourquoi 2026 est le moment optimal
            pour basculer et comment s&apos;y prendre.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez apprendre dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le vrai calendrier réglementaire du gaz en France (et ce qui n&apos;est PAS interdit)</li>
            <li>Consommation gaz vs PAC : les chiffres ADEME et CRE sur une maison réelle</li>
            <li>Les 6 aides cumulables en 2026 et comment les empiler</li>
            <li>Un exemple chiffré complet avec reste à charge final</li>
            <li>Les 6 étapes techniques, durée, et ce que vous pouvez garder (radiateurs, etc.)</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI 2026 ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi 2026 est l&apos;année de bascule
        </h2>

        <ArticleImageSection
          image="/images/blog/transition-gaz-pac-economies.png"
          alt="Comparaison économies chauffage gaz et pompe à chaleur"
          imagePosition="left"
        >
          <p>
            Trois facteurs convergent en 2026 pour rendre le remplacement d&apos;une chaudière gaz par une PAC
            air-eau économiquement imbattable.
          </p>
          <p>
            <strong>1. Le prix du gaz remonte.</strong> Le prix repère publié par la Commission de Régulation
            de l&apos;Énergie s&apos;établit à <strong>0,1256 €/kWh TTC pour le chauffage</strong> en avril 2026.
            Après une hausse de 5,3 % en mars, la CRE anticipe une nouvelle progression de 15 à 20 % en mai
            2026 sur fond de tensions géopolitiques.
          </p>
          <p>
            <strong>2. Les aides à la sortie du gaz sont à leur maximum historique.</strong> Cumul possible
            entre MaPrimeRénov&apos; (jusqu&apos;à 5 000 € en tranche Bleu pour une PAC air-eau), la prime EDF
            de 1 000 €, le Coup de pouce CEE bonifié ×5, la TVA à 5,5 % et l&apos;éco-PTZ jusqu&apos;à 50 000 €.
          </p>
          <p>
            <strong>3. Le coût de l&apos;immobilisme augmente.</strong> Depuis mars 2025, installer une
            chaudière gaz neuve est taxé à 20 % (contre 10 % auparavant), signal clair du gouvernement.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '÷2', label: 'votre facture énergie (source ADEME)', color: 'green' },
          { value: '20 %', label: 'TVA chaudière gaz depuis l\'arrêté du 4 déc. 2024', color: 'blue' },
          { value: '×5', label: 'Coup de pouce CEE pour passer du gaz à la PAC', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : CADRE RÉGLEMENTAIRE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Le cadre réglementaire (et ce qui n&apos;est PAS interdit)
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Contrairement à ce qu&apos;on lit souvent, <strong>les chaudières gaz ne sont pas interdites
          en 2026 dans les logements existants</strong>. Vous pouvez encore légalement remplacer une
          chaudière défaillante par un nouveau modèle gaz. Les interdictions concernent uniquement le
          neuf : maisons individuelles depuis 2022, logements collectifs depuis janvier 2025 (RE2020).
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          En revanche, le gouvernement fait tout pour rendre ce choix <strong>de moins en moins
          intéressant financièrement</strong>, et vise une sortie totale des équipements fossiles
          d&apos;ici 2040.
        </p>

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

        <ArticleCallout type="warning" title="À retenir">
          <p>
            Le gaz n&apos;est <strong>pas interdit</strong> dans l&apos;existant, mais il devient
            progressivement plus coûteux (TVA à 20 %, prix du kWh en hausse) tandis que la PAC devient
            de plus en plus accessible (aides historiquement élevées en 2026).
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : CONSOMMATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien allez-vous réellement économiser ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;étude ADEME 2025 sur la performance réelle des PAC air-eau montre que,{' '}
          <strong>pour une maison moyennement isolée de 120 m²</strong>, la PAC divise la facture
          énergétique par un peu moins de 2 par rapport à une chaudière gaz condensation. Voici les
          chiffres.
        </p>

        <ArticleTable {...CONSUMPTION_TABLE} title="Chaudière gaz condensation vs PAC air-eau — maison de 120 m²" />

        <ArticleCallout type="tip" title="Comment lire le COP d'une PAC">
          <p>
            Un <strong>COP de 3</strong> signifie que pour 1 kWh d&apos;électricité consommé, la PAC produit
            3 kWh de chaleur. L&apos;ADEME mesure en pratique des SCOP (COP saisonnier, plus réaliste) de
            2,7 à 3,5 selon l&apos;isolation, la zone climatique et la température de consigne de l&apos;eau
            de chauffage. Une PAC récente bien dimensionnée reste au-dessus de 3 en Île-de-France.
          </p>
        </ArticleCallout>

        <ArticleFullImage
          image="/images/blog/pac-installation-exterieure.png"
          alt="Unité extérieure d'une pompe à chaleur air-eau installée sur un pavillon"
          caption="Unité extérieure d'une PAC air-eau — positionnement à l'extérieur à 1 m des limites, sur socle antivibratile"
        />

        {/* ---- SECTION 4 : LES AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 6 aides cumulables en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          2026 est l&apos;année où le cumul d&apos;aides atteint son niveau maximal pour un remplacement
          gaz → PAC. Toutes les aides listées ci-dessous sont <strong>cumulables entre elles</strong>.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides 2026 pour remplacer une chaudière gaz par une PAC" />

        <ArticleCallout type="info" title="La prime EDF de 1 000 € — premiers arrivés, premiers servis">
          <p>
            Annoncée le 8 avril 2026 par Bernard Fontana (PDG EDF), la prime couvre 80 000 dossiers
            avec un budget global de 240 millions d&apos;euros. Conditions : revenus modestes ou très
            modestes (barème MaPrimeRénov&apos;), remplacement d&apos;une chaudière gaz ou fioul par une
            PAC air-eau ou eau-eau, devis signé après le 8 avril 2026, travaux finis avant le 31 décembre 2027.
          </p>
        </ArticleCallout>

        <ArticleCallout type="warning" title="Ménages aux revenus supérieurs (rose) : ce qui change">
          <p>
            Depuis février 2026, MaPrimeRénov&apos; parcours par geste reste fermé aux revenus
            supérieurs pour la PAC seule. Ils peuvent encore bénéficier du <strong>Coup de pouce chauffage
            CEE</strong> (pas de condition de ressources), de la <strong>prime EDF</strong> (uniquement
            modestes), de la TVA à 5,5 % et de l&apos;éco-PTZ. La rénovation d&apos;ampleur (parcours accompagné)
            reste accessible à tous via MaPrimeRénov&apos; couplé à Mon Accompagnateur Rénov&apos;.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : EXEMPLE CHIFFRÉ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Exemple chiffré : combien allez-vous réellement payer ?
        </h2>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <span className="text-slate-700">{line.label}</span>
                <span className={`font-semibold text-lg ${line.isDeduction ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {line.amount}
                </span>
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

        {/* ---- SECTION 6 : PROCÉDURE TECHNIQUE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment ça se passe, étape par étape
        </h2>

        <ArticleImageSection
          image="/images/blog/depose-chaudiere-gaz.png"
          alt="Technicien RGE déposant une ancienne chaudière gaz murale"
          imagePosition="right"
        >
          <p>
            Le chantier dure entre <strong>2 et 5 jours</strong> selon la configuration. Vous pouvez rester
            dans le logement : l&apos;eau chaude sanitaire n&apos;est coupée que pendant la bascule (quelques
            heures).
          </p>
          <p>
            Dans la majorité des cas, <strong>vous gardez vos radiateurs existants</strong>. Les PAC
            haute température récentes (certaines atteignent 65-75 °C) alimentent sans problème les
            radiateurs en fonte. Économie : 1 500 à 3 000 € par rapport à un changement complet des
            émetteurs.
          </p>
        </ArticleImageSection>

        <ArticleSteps steps={STEPS} />

        <ArticleCallout type="tip" title="Bon à savoir : gardez le gaz quelques semaines">
          <p>
            Ne résiliez pas votre contrat gaz le jour même de la mise en service. Attendez d&apos;avoir
            passé un cycle de chauffe complet (idéalement un mois) pour valider le bon fonctionnement
            de la PAC. Une fois rassuré, la résiliation et le retrait du compteur GRDF sont gratuits
            et se font en ligne.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 7 : QUELLE PAC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle PAC choisir selon votre configuration ?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-2">Plancher chauffant ou radiateurs basse température</h4>
            <p className="text-sm text-slate-600">
              PAC air-eau <strong>basse température</strong> (35-45 °C). Meilleur COP, moins chère,
              idéale pour une rénovation avec isolation récente.
            </p>
          </div>
          <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <h4 className="font-bold text-sky-800 mb-2">Radiateurs fonte existants</h4>
            <p className="text-sm text-slate-600">
              PAC air-eau <strong>haute température</strong> (60-75 °C). Vous conservez vos radiateurs.
              Surcoût de 1 500 à 2 500 € par rapport à la basse température.
            </p>
          </div>
          <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
            <h4 className="font-bold text-violet-800 mb-2">Maison bien isolée avec jardin</h4>
            <p className="text-sm text-slate-600">
              PAC <strong>géothermique</strong> (capteurs enterrés). Investissement plus lourd
              (20 000-40 000 €) mais COP de 4 à 5 et très silencieuse. Aides jusqu&apos;à 11 000 €.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">Maison mal isolée (DPE F/G)</h4>
            <p className="text-sm text-slate-600">
              <strong>Isolez d&apos;abord.</strong> Commencez par les combles (30 % des déperditions).
              La PAC sera ensuite moins puissante, moins chère et bien plus efficace. Les deux dossiers
              d&apos;aides se cumulent.
            </p>
          </div>
        </div>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Prêt à quitter le gaz pour la pompe à chaleur ?"
          description="Nos techniciens certifiés RGE QualiPAC montent votre dossier d'aides 2026 (MaPrimeRénov', prime EDF, Coup de pouce CEE) et vous remettent un devis gratuit sous 48h. Intervention en Île-de-France."
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

        {/* ---- LIENS INTERNES ---- */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/services/pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Installation PAC air-eau en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/guide-prix-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une pompe à chaleur en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>
      </ArticleLayout>
    </>
  )
}
