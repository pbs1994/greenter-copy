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
  ARTICLE_META, COMPARISON_TABLE, PRIX_TABLE, AIDES_TABLE,
  STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pompe-a-chaleur-hybride'

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
      url: 'https://www.greenter.fr/images/blog/pac-hybride-unite-exterieure.avif',
      width: 1200,
      height: 800,
      alt: 'Pompe à chaleur hybride — unité extérieure installée sur maison',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pac-hybride-unite-exterieure.avif'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Pompe à chaleur hybride', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PompeAChaleurHybridePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline={ARTICLE_META.title}
        description={ARTICLE_META.subtitle}
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: 'Greenter', url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/pac-hybride-unite-exterieure.avif"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pac-hybride-unite-exterieure.avif"
        heroAlt="Unité extérieure d'une pompe à chaleur hybride installée sur le mur d'une maison"
        breadcrumbs={breadcrumbs}
      >

        {/* ─── INTRO ─── */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Vous avez une <strong>chaudière gaz ou fioul</strong> et vous souhaitez réduire votre
            facture de chauffage sans tout remplacer d&apos;un coup ? La{' '}
            <strong>pompe à chaleur hybride</strong> est peut-être la solution de chauffage la plus
            adaptée à votre situation. Elle combine les avantages d&apos;une{' '}
            <strong>pompe à chaleur air-eau</strong> — efficacité, économies d&apos;énergie,{' '}
            <strong>énergie renouvelable</strong> — avec la sécurité d&apos;une{' '}
            <strong>chaudière gaz à condensation</strong> ou d&apos;une{' '}
            <strong>chaudière fioul</strong> qui prend le relais par grand froid.
          </p>
          <p>
            En 2026, ce <strong>système hybride</strong> bénéficie des mêmes aides que la PAC seule :
            MaPrimeRénov&apos; jusqu&apos;à 4 000 €, Coup de pouce CEE, TVA à 5,5 % et éco-PTZ.
            Résultat : un reste à charge souvent inférieur à 5 000 € pour les ménages modestes, avec
            des <strong>économies d&apos;énergie</strong> de 40 à 60 % sur la facture de chauffage.
          </p>
          <p>
            Dans ce guide complet, nous détaillons le fonctionnement d&apos;une{' '}
            <strong>pac hybride</strong>, les différences entre les modèles{' '}
            <strong>hybride gaz</strong> et <strong>hybride fioul</strong>, le{' '}
            <strong>prix d&apos;une pompe à chaleur hybride</strong> installée, et les étapes concrètes
            d&apos;<strong>installation d&apos;une pompe à chaleur</strong> hybride chez vous.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous apprendrez dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le fonctionnement exact d&apos;une pompe à chaleur hybride</li>
            <li>Différences entre PAC hybride gaz, fioul et biofioul</li>
            <li>Tableau comparatif PAC hybride vs PAC seule vs chaudière seule</li>
            <li>Prix d&apos;installation complets (matériel + pose)</li>
            <li>Aides 2026 cumulables et reste à charge réel</li>
            <li>Les 6 étapes de l&apos;installation</li>
          </ul>
        </ArticleCallout>

        {/* ─── SECTION 1 : QU'EST-CE QU'UNE PAC HYBRIDE ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Qu&apos;est-ce qu&apos;une pompe à chaleur hybride ?
        </h2>

        <ArticleImageSection
          image="/images/blog/pac-hybride-avec-chaudiere.avif"
          alt="Système hybride pompe à chaleur air-eau couplée à une chaudière — vue de l'installation intérieure et extérieure"
          imagePosition="right"
        >
          <p>
            Une <strong>pompe à chaleur hybride</strong> associe deux équipements de chauffage
            complémentaires : une <strong>pompe à chaleur air-eau</strong> — qui puise les calories
            présentes dans l&apos;air extérieur pour <strong>chauffer</strong> le logement —
            et une <strong>chaudière</strong> gaz ou fioul qui assure l&apos;appoint lorsque les
            températures extérieures sont très basses.
          </p>
          <p>
            Le cœur du <strong>système hybride</strong> est sa régulation intelligente. Elle calcule
            en temps réel le coût de chaque énergie et sélectionne automatiquement la plus
            économique. Quand l&apos;électricité est bon marché et la température extérieure clémente,
            <strong>une pompe à chaleur</strong> couvre l&apos;intégralité des besoins en chaleur.
            Quand les températures chutent sous le « point de bivalence » (généralement entre −5 °C
            et −10 °C), <strong>la pac et la chaudière</strong> fonctionnent en relais.
          </p>
          <p>
            En pratique, <strong>les pompes à chaleur hybrides</strong> couvrent 70 à 80 % des
            besoins annuels en chauffage grâce à l&apos;<strong>énergie renouvelable</strong> — le
            reste étant assuré par le gaz ou le fioul lors des pics de froid.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '70–80 %', label: 'des besoins couverts par l\'énergie renouvelable', color: 'green' },
          { value: '−60 %', label: 'de réduction des gaz à effet de serre vs chaudière fioul', color: 'green' },
          { value: '4 000 €', label: 'de MaPrimeRénov\' pour les ménages modestes (2026)', color: 'blue' },
        ]} />

        {/* ─── SECTION 2 : PAC HYBRIDE GAZ vs FIOUL ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          PAC hybride gaz ou fioul : quelle différence ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Il existe deux grandes configurations de <strong>chauffage hybride</strong>, selon le
          combustible de la chaudière d&apos;appoint.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-bold text-blue-800 text-lg mb-3">
              🔵 PAC hybride gaz
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              La <strong>pac hybride gaz</strong> couple une pompe à chaleur air-eau à une{' '}
              <strong>chaudière gaz à condensation</strong>. C&apos;est la configuration la plus
              répandue en France, car des millions de foyers sont raccordés au réseau de gaz naturel.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li>Idéale pour remplacer une <strong>ancienne chaudière gaz</strong></li>
              <li>Réseau gaz existant utilisé comme appoint</li>
              <li>Prix du gaz au kWh plus bas que le fioul</li>
              <li>Transition progressive vers l&apos;énergie renouvelable</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h3 className="font-bold text-amber-800 text-lg mb-3">
              🟡 PAC hybride fioul
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Le <strong>remplacement d&apos;une chaudière fioul</strong> par une{' '}
              <strong>pompe à chaleur hybride fioul</strong> est particulièrement rentable, car le
              fioul est l&apos;énergie fossile la plus chère. La PAC couvre 70 à 80 % des besoins,
              réduisant drastiquement la consommation de fioul.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li><strong>Chaudière fioul</strong> existante conservée en appoint</li>
              <li>Compatible biofioul (transition écologique facilitée)</li>
              <li>Économies plus importantes qu&apos;avec le gaz</li>
              <li>Mêmes aides que la PAC hybride gaz</li>
            </ul>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">
          Dans les deux cas, votre <strong>ancienne chaudière gaz ou fioul</strong> reste en place
          et continue de fonctionner — elle devient simplement l&apos;équipement de secours. Aucun
          remplacement de radiateurs n&apos;est nécessaire : le circuit de chauffage existant est
          entièrement réutilisé.
        </p>

        <ArticleCallout type="tip" title="Le biofioul : une transition douce vers les renouvelables">
          <p>
            Si vous avez une <strong>chaudière fioul</strong>, sachez que les modèles récents sont
            compatibles biofioul (mélange fioul + huiles végétales). Passer à une{' '}
            <strong>pac hybride</strong> avec appoint biofioul vous permet de réduire vos émissions
            de CO₂ jusqu&apos;à 80 % tout en conservant une solution de chauffage entièrement
            autonome, sans réseau de gaz.
          </p>
        </ArticleCallout>

        {/* ─── SECTION 3 : FONCTIONNEMENT ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment fonctionne le système hybride en pratique ?
        </h2>

        <ArticleFullImage
          image="/images/blog/pac-hybride-systeme-gaz.jpg"
          alt="Schéma d'un système de chauffage hybride pompe à chaleur et chaudière gaz — fonctionnement et circuit hydraulique"
          caption="Système hybride PAC air-eau + chaudière gaz : la régulation choisit en temps réel l'énergie la moins chère selon la température extérieure"
        />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Le fonctionnement d&apos;une <strong>pompe à chaleur hybride</strong> repose sur un
          module de régulation intelligent qui pilote en continu les deux équipements.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Lorsqu&apos;il fait 7 °C dehors, <strong>une pac hybride</strong> fonctionne avec un
          coefficient de performance (COP) de 3 à 4 — elle produit 3 à 4 kWh de chaleur pour 1 kWh
          d&apos;électricité consommé. Elle couvre alors l&apos;intégralité du{' '}
          <strong>circuit de chauffage</strong> et de la{' '}
          <strong>production d&apos;eau chaude sanitaire</strong>. Quand la température tombe
          en dessous du <em>point de bivalence</em> (fixé entre −5 °C et −10 °C selon le logement),
          la chaudière prend progressivement le relais pour{' '}
          <strong>produire de la chaleur</strong> complémentaire.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ce basculement est automatique et transparent pour l&apos;habitant. En Île-de-France,
          les températures descendent rarement sous −10 °C plus de 10 à 15 jours par an : la
          pompe à chaleur couvre donc la quasi-totalité de la{' '}
          <strong>production de chaleur</strong> annuelle.
        </p>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 my-6">
          <h3 className="font-bold text-slate-900 mb-4">Le point de bivalence : clé du dimensionnement</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Le point de bivalence est la température extérieure à partir de laquelle la{' '}
            <strong>pompe à chaleur hybride peut</strong> assurer seule tous les besoins en
            chaleur. Plus il est bas, plus la PAC couvre de besoins, mais plus elle est
            puissante (et chère). Le technicien RGE calcule ce seuil optimal en fonction de
            l&apos;isolation du logement, de la taille du{' '}
            <strong>système de chauffage</strong>, et du profil de consommation.
            Typiquement, il se situe entre 0 °C et −5 °C pour une maison moyennement isolée.
          </p>
        </div>

        {/* ─── SECTION 4 : AVANTAGES ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Avantages de la pompe à chaleur hybride par rapport à la pompe à chaleur seule
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>pompe à chaleur hybride</strong> présente des avantages distincts par rapport à
          une <strong>pompe à chaleur seule</strong>, notamment pour les logements anciens ou mal
          isolés.
        </p>

        <ArticleTable {...COMPARISON_TABLE} title="Comparatif : chaudière seule, PAC seule et PAC hybride" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Le <strong>système hybride</strong> se distingue surtout sur trois points :
        </p>

        <div className="space-y-4 my-6">
          <div className="flex gap-4 items-start p-4 bg-white rounded-xl border border-green-100 shadow-sm">
            <span className="text-2xl">🏠</span>
            <div>
              <p className="font-semibold text-slate-900">Aucun remplacement de radiateurs</p>
              <p className="text-sm text-slate-600 mt-1">
                Contrairement à <strong>une pompe à chaleur</strong> basse température seule,{' '}
                <strong>une pac hybride</strong> n&apos;exige pas de changer votre{' '}
                <strong>installation de chauffage</strong>. La chaudière monte la température
                du fluide quand c&apos;est nécessaire — vos radiateurs en fonte fonctionnent
                parfaitement.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
            <span className="text-2xl">❄️</span>
            <div>
              <p className="font-semibold text-slate-900">Continuité garantie par grand froid</p>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Une pompe à chaleur</strong> seule voit ses performances chuter sous −10 °C
                ou −15 °C. Avec le <strong>chauffage hybride</strong>, la{' '}
                <strong>chaudière gaz ou fioul</strong> assure le relais — votre logement reste
                chauffé quelles que soient les conditions climatiques.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 bg-white rounded-xl border border-violet-100 shadow-sm">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-semibold text-slate-900">Coût d&apos;installation inférieur</p>
              <p className="text-sm text-slate-600 mt-1">
                Le <strong>prix d&apos;une pompe à chaleur hybride</strong> est souvent inférieur
                à celui d&apos;une <strong>pompe à chaleur air-eau</strong> haute température seule,
                car la PAC peut être dimensionnée plus petite (elle n&apos;a pas à couvrir 100 %
                des besoins). C&apos;est aussi un <strong>projet de rénovation</strong> moins
                invasif.
              </p>
            </div>
          </div>
        </div>

        {/* ─── SECTION 5 : PRIX ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix d&apos;une pompe à chaleur hybride installée en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le <strong>prix d&apos;une pompe à chaleur hybride</strong> dépend principalement de la
          puissance nécessaire, de la configuration du logement et du type de chaudière existante
          (gaz ou fioul). Voici les fourchettes observées en Île-de-France en 2026.
        </p>

        <ArticleTable {...PRIX_TABLE} title="Prix d'une PAC hybride selon la configuration — 2026" />

        <ArticleCallout type="warning" title="Attention aux devis incomplets">
          <p>
            Certains devis n&apos;incluent pas le ballon d&apos;eau chaude sanitaire, le
            raccordement électrique ou la mise en service. Demandez toujours un devis
            &quot;clé en main&quot; incluant matériel, pose, mise en service,{' '}
            <strong>eau chaude sanitaire</strong> et dossier d&apos;aides.
            Greenter fournit des devis tout compris sous 48h.
          </p>
        </ArticleCallout>

        {/* ─── SECTION 6 : AIDES ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Aides financières pour une PAC hybride en 2026 : ce que vous pouvez obtenir
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Bonne nouvelle : <strong>installer une pompe à chaleur hybride</strong> ouvre droit aux
          mêmes aides que la PAC air-eau classique. Ces dispositifs sont{' '}
          <strong>éligibles aux aides</strong> et cumulables entre eux.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides cumulables pour une PAC hybride en 2026" />

        <ArticleImageSection
          image="/images/blog/pac-hybride-biofioul.png"
          alt="Pompe à chaleur hybride avec chaudière biofioul — solution de rénovation énergétique pour maisons sans gaz"
          imagePosition="left"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Exemple de reste à charge après aides
          </h3>
          <p className="text-slate-600 text-sm mb-3">
            Pour une maison de 100 m² chauffée au fioul (tranche de revenus modestes / Jaune),
            remplaçant une <strong>chaudière fioul</strong> par une{' '}
            <strong>pompe à chaleur hybride</strong> :
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-100 py-1">
              <span className="text-slate-600">Coût total (matériel + pose)</span>
              <span className="font-semibold">10 500 €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-1">
              <span className="text-green-600">− MaPrimeRénov&apos; (Jaune)</span>
              <span className="font-semibold text-green-600">− 3 000 €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-1">
              <span className="text-green-600">− Coup de pouce CEE (fioul → PAC)</span>
              <span className="font-semibold text-green-600">− 2 500 €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-1">
              <span className="text-green-600">− TVA réduite 5,5 %</span>
              <span className="font-semibold text-green-600">− 1 200 €</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold text-slate-900">Reste à charge estimé</span>
              <span className="font-bold text-emerald-700 text-lg">≈ 3 800 €</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3">
            Simulation indicative. Montant exact selon zone climatique et obligé CEE choisi.
          </p>
        </ArticleImageSection>

        {/* ─── SECTION 7 : INSTALLATION ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Installation d&apos;une pompe à chaleur hybride : les 6 étapes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>Installer une pompe à chaleur hybride</strong> est moins invasif qu&apos;une PAC
          complète, car votre <strong>ancienne chaudière gaz ou fioul</strong> reste en place.
          Le chantier dure en général 2 à 4 jours, et vous restez chauffés pendant les travaux.
        </p>

        <ArticleSteps steps={STEPS} />

        <ArticleCallout type="info" title="Gardez votre chaudière — pour l'instant">
          <p>
            L&apos;avantage majeur du <strong>système hybride</strong> est de pouvoir conserver
            votre <strong>chaudière gaz</strong> ou <strong>chaudière fioul</strong> existante
            comme appoint. Vous n&apos;avez pas à tout remplacer d&apos;un coup. Lorsque vous
            l&apos;aurez amorti et que vous serez prêt pour une{' '}
            <strong>rénovation énergétique</strong> plus profonde (isolation, nouveaux
            émetteurs), il sera possible d&apos;évoluer vers une{' '}
            <strong>pompe à chaleur seule</strong>.
          </p>
        </ArticleCallout>

        {/* ─── SECTION 8 : PAC HYBRIDE vs PAC SEULE ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          PAC hybride vs PAC seule : quelle solution de chauffage choisir ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le choix entre <strong>une pompe à chaleur hybride</strong> et{' '}
          <strong>une pompe à chaleur</strong> seule dépend avant tout de votre logement et de
          vos contraintes.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 rounded-xl p-5 border border-green-100">
            <h3 className="font-bold text-green-800 mb-3">Choisissez la PAC hybride si…</h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
              <li>Votre logement est <strong>mal isolé</strong> (DPE E, F ou G)</li>
              <li>Vous avez des <strong>radiateurs haute température</strong> (fonte)</li>
              <li>Votre région connaît des <strong>grands froids réguliers</strong></li>
              <li>Vous souhaitez un <strong>projet de rénovation</strong> progressif</li>
              <li>
                Vous remplacez une <strong>chaudière fioul ou gaz</strong> et souhaitez
                minimiser les travaux
              </li>
            </ul>
          </div>
          <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <h3 className="font-bold text-sky-800 mb-3">Choisissez la PAC seule si…</h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
              <li>Votre logement est bien isolé (DPE A, B ou C)</li>
              <li>Vous avez un <strong>plancher chauffant</strong> basse température</li>
              <li>Vous voulez <strong>éliminer totalement</strong> la dépendance au gaz ou au fioul</li>
              <li>Vous visez les économies maximales sur le long terme</li>
              <li>
                Vous êtes prêt pour une{' '}
                <strong>rénovation énergétique</strong> complète
              </li>
            </ul>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">
          Dans les deux cas, votre logement bénéficiera d&apos;une réduction significative des{' '}
          <strong>gaz à effet de serre</strong> et de vos{' '}
          <strong>besoins en chaleur</strong> couverts par l&apos;
          <strong>énergie renouvelable</strong>. La{' '}
          <strong>pompe à chaleur hybride</strong> est simplement la voie d&apos;entrée la plus
          accessible pour chauffer son logement proprement sans rupture brutale.
        </p>

        {/* ─── CTA ─── */}
        <ArticleCTA
          title="Obtenez un devis gratuit pour votre PAC hybride en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC étudient votre logement, dimensionnent votre système hybride et montent l'intégralité de votre dossier d'aides (MaPrimeRénov', CEE, éco-PTZ). Devis gratuit sous 48h."
        />

        {/* ─── FAQ ─── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la pompe à chaleur hybride
        </h2>
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

        {/* ─── SOURCES ─── */}
        <ArticleSources sources={SOURCES} />

        {/* ─── MAILLAGE INTERNE ─── */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Remplacer sa chaudière gaz par une PAC en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/guide-prix-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une pompe à chaleur en 2026 — tous modèles
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/consommation-pompe-a-chaleur-maison-100m2"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Consommation d&apos;une PAC pour une maison de 100 m²
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/services/pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Installation PAC hybride en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ─── LIENS PAR VILLE ─── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation PAC hybride par ville
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Paris', slug: 'paris' },
              { name: 'Versailles', slug: 'versailles' },
              { name: 'Créteil', slug: 'creteil' },
              { name: 'Meaux', slug: 'meaux' },
              { name: 'Évry', slug: 'evry' },
              { name: 'Melun', slug: 'melun' },
              { name: 'Massy', slug: 'massy' },
              { name: 'Saint-Denis', slug: 'saint-denis' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/services/pompe-a-chaleur/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                PAC hybride {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
