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
  ARTICLE_META, TEMPERATURE_TABLE, CYCLE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pompe-a-chaleur-air-eau-fonctionnement'

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
      url: 'https://www.greenter.fr/images/blog/pompe-a-chaleur-air-eau-unite-exterieure-maison-moderne.jpg',
      width: 1600,
      height: 900,
      alt: "Unité extérieure d'une pompe à chaleur air-eau installée contre une maison moderne — pompe à chaleur air-eau fonctionnement",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pompe-a-chaleur-air-eau-unite-exterieure-maison-moderne.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Pompe à chaleur air-eau fonctionnement', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PompeAChaleurAirEauFonctionnement() {
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
        image="https://www.greenter.fr/images/blog/pompe-a-chaleur-air-eau-unite-exterieure-maison-moderne.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2700}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pompe-a-chaleur-air-eau-unite-exterieure-maison-moderne.jpg"
        heroAlt="Unité extérieure blanche d'une pompe à chaleur air-eau installée contre le mur d'une maison moderne au bardage sombre, entourée de végétation"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Comprendre le <strong>fonctionnement d&apos;une pompe à chaleur air-eau</strong>{' '}
            permet de démystifier un appareil souvent perçu comme une boîte noire. En réalité,
            le principe est d&apos;une élégante simplicité : plutôt que de <em>produire</em> de
            la chaleur en brûlant un combustible, une pompe à chaleur air-eau la{' '}
            <em>capte</em> dans l&apos;air extérieur — même par temps froid — et la transfère
            au circuit d&apos;eau qui alimente vos radiateurs ou votre plancher chauffant.
          </p>
          <p>
            Ce transfert de chaleur repose sur un <strong>cycle thermodynamique</strong> en
            quatre étapes (évaporation, compression, condensation, détente), rendu possible
            par un fluide frigorigène qui change d&apos;état à des températures très basses.
            C&apos;est ce mécanisme qui permet à une pompe à chaleur air-eau de restituer 3 à
            4 kWh de chaleur pour seulement 1 kWh d&apos;électricité consommée — un rendement
            impossible à atteindre avec un chauffage électrique classique ou une chaudière.
          </p>
          <p>
            Ce guide détaille pas à pas le <strong>fonctionnement d&apos;une pompe à chaleur
            air-eau</strong> : le rôle de chacun de ses composants, les quatre étapes du cycle
            thermodynamique, la différence entre modèles monobloc et bibloc, et pourquoi la
            performance de l&apos;appareil varie selon la température extérieure.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le principe de fonctionnement en une phrase, puis en détail</li>
            <li>Les 4 étapes du cycle thermodynamique, expliquées simplement</li>
            <li>Le rôle de chaque composant : évaporateur, compresseur, condenseur, détendeur</li>
            <li>Pourquoi le fonctionnement change avec la température extérieure</li>
            <li>La différence entre pompe à chaleur monobloc et bibloc</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : PRINCIPE EN BREF ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur air-eau : le principe de fonctionnement en bref
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>fonctionnement d&apos;une pompe à chaleur air-eau</strong> repose sur une
          loi physique simple : un fluide peut capter de la chaleur même dans un air
          relativement froid, à condition que sa propre température soit encore plus basse.
          C&apos;est exactement le principe utilisé, à l&apos;envers, par un réfrigérateur —
          qui extrait la chaleur de son intérieur pour la rejeter à l&apos;arrière de
          l&apos;appareil. Une pompe à chaleur air-eau fait la même chose, mais dans le sens
          inverse : elle extrait la chaleur de l&apos;air extérieur pour la restituer à
          l&apos;intérieur du logement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ce transfert est rendu possible par un <strong>fluide frigorigène</strong> qui
          circule en circuit fermé à l&apos;intérieur de l&apos;appareil, changeant
          continuellement d&apos;état (liquide, gazeux) et de pression au fil de quatre
          étapes précises. C&apos;est ce cycle, répété en continu, qui permet à une{' '}
          <strong>pompe à chaleur air-eau</strong> de chauffer un logement tout en
          consommant beaucoup moins d&apos;électricité qu&apos;un chauffage électrique direct.
        </p>

        <ArticleStat stats={[
          { value: '3 à 4 kWh', label: 'de chaleur restituée pour 1 kWh d\'électricité consommée', color: 'green' },
          { value: '4 étapes', label: 'composent le cycle thermodynamique complet', color: 'blue' },
          { value: '−15 à −25 °C', label: 'température extérieure limite de fonctionnement des modèles récents', color: 'amber' },
        ]} />

        {/* ---- SECTION 2 : LES 4 ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 4 étapes du cycle thermodynamique d&apos;une pompe à chaleur air-eau
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le <strong>fonctionnement d&apos;une pompe à chaleur air-eau</strong> s&apos;articule
          autour d&apos;un cycle fermé que le fluide frigorigène parcourt en continu. Voici
          chacune des quatre étapes, dans l&apos;ordre où elles se déroulent réellement dans
          l&apos;appareil.
        </p>

        <ArticleSteps steps={CYCLE_STEPS} />

        <ArticleFullImage
          image="/images/blog/pompe-a-chaleur-air-eau-schema-cycle-thermodynamique.jpg"
          alt="Schéma du fonctionnement d'une pompe à chaleur air-eau montrant le cycle complet : évaporateur, compresseur, condenseur et détendeur, avec circuit extérieur et circuit de chauffage intérieur"
          caption="Le cycle thermodynamique complet d'une pompe à chaleur air-eau : l'air extérieur cède ses calories au niveau de l'évaporateur, puis la chaleur est concentrée par le compresseur avant d'être restituée au circuit de chauffage via le condenseur."
        />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ce schéma illustre bien pourquoi le <strong>fonctionnement d&apos;une pompe à
          chaleur air-eau</strong> ne consomme de l&apos;électricité qu&apos;à une seule étape
          du cycle : la compression. L&apos;évaporation, la condensation et la détente sont
          des phénomènes essentiellement physiques, qui ne nécessitent pas d&apos;apport
          énergétique direct — c&apos;est précisément ce qui explique le rendement supérieur
          d&apos;une pompe à chaleur par rapport à un chauffage électrique classique, qui
          convertit directement l&apos;électricité en chaleur sans effet démultiplicateur.
        </p>

        {/* ---- SECTION 3 : COMPOSANTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les composants clés d&apos;une pompe à chaleur air-eau
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          L&apos;unité extérieure
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;<strong>unité extérieure</strong> abrite l&apos;évaporateur, le ventilateur
          qui brasse l&apos;air ambiant, et — selon la configuration — le compresseur.
          C&apos;est cette unité qui est directement exposée aux conditions climatiques, et
          dont le bon emplacement conditionne à la fois la performance et le{' '}
          <Link href="/blog/pompe-a-chaleur-et-bruit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            niveau sonore
          </Link>{' '}
          perçu au quotidien.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-air-eau-unite-exterieure-jardin.jpg"
          alt="Unité extérieure compacte d'une pompe à chaleur air-eau installée dans un jardin fleuri contre la façade d'une maison"
          imagePosition="right"
        >
          <p>
            L&apos;emplacement de l&apos;unité extérieure doit permettre une bonne
            circulation de l&apos;air, sans obstacle qui limiterait le flux nécessaire à
            l&apos;évaporateur. Un espace dégagé d&apos;au moins 50 cm autour de
            l&apos;appareil, à l&apos;écart de la végétation dense, garantit un
            fonctionnement optimal et facilite les opérations d&apos;
            <Link href="/blog/entretien-pompe-a-chaleur-air-eau" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              entretien annuel
            </Link>.
          </p>
          <p className="mt-3">
            À l&apos;intérieur du caisson, le ventilateur aspire l&apos;air à travers les
            ailettes de l&apos;échangeur — c&apos;est ce composant qui doit rester propre et
            dégagé pour que le fonctionnement de la pompe à chaleur air-eau ne se dégrade
            pas avec le temps.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          L&apos;unité intérieure et le circuit hydraulique
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Le condenseur, le circulateur, le vase d&apos;expansion et les organes de régulation
          sont regroupés dans l&apos;<strong>unité intérieure</strong> (ou dans un module
          hydraulique attenant à l&apos;unité extérieure pour les modèles monobloc). C&apos;est
          ce circuit qui distribue l&apos;eau chauffée par la pompe à chaleur vers les
          radiateurs ou le{' '}
          <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            plancher chauffant
          </Link>, et parfois vers un ballon d&apos;eau chaude sanitaire.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-air-eau-composants-ventilateur-compresseur.jpg"
          alt="Vue détaillée de l'intérieur d'une unité extérieure de pompe à chaleur air-eau montrant le ventilateur, l'échangeur thermique et le compresseur"
          imagePosition="left"
        >
          <p>
            Ce détail de l&apos;intérieur d&apos;une unité extérieure montre concrètement les
            composants qui rendent possible le <strong>fonctionnement d&apos;une pompe à
            chaleur air-eau</strong> : le grand ventilateur à pales incurvées qui maximise le
            flux d&apos;air à travers l&apos;échangeur, et le compresseur — la pièce
            mécanique la plus sollicitée du circuit, généralement de type Inverter sur les
            modèles récents pour moduler sa puissance en continu.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 4 : CHAUFFAGE ET ECS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Fonctionnement en mode chauffage et en mode eau chaude sanitaire
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La plupart des pompes à chaleur air-eau assurent deux fonctions distinctes avec le
          même circuit frigorifique : le chauffage du logement et, souvent, la production
          d&apos;<strong>eau chaude sanitaire</strong>. En mode chauffage, le condenseur
          transfère sa chaleur à l&apos;eau du circuit à une température modérée — 35 à 45 °C
          pour un plancher chauffant, 45 à 55 °C pour des radiateurs basse température.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour produire de l&apos;eau chaude sanitaire, l&apos;appareil bascule
          périodiquement vers un ballon d&apos;eau chaude dédié, qu&apos;il chauffe à une
          température plus élevée (55 à 60 °C) afin de limiter le risque de légionellose.
          Ce basculement automatique, géré par la régulation de l&apos;appareil, explique
          pourquoi une pompe à chaleur air-eau peut sembler « s&apos;arrêter » brièvement
          côté chauffage : elle est simplement en train de produire de l&apos;eau chaude
          avant de reprendre son cycle habituel.
        </p>

        {/* ---- SECTION 5 : TEMPERATURE EXTERIEURE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi le fonctionnement d&apos;une pompe à chaleur air-eau dépend de la température extérieure
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Puisque la source de chaleur exploitée est l&apos;air extérieur, le{' '}
          <strong>fonctionnement d&apos;une pompe à chaleur air-eau</strong> est
          nécessairement influencé par la météo. Plus l&apos;air extérieur est froid, plus il
          faut d&apos;énergie mécanique (donc d&apos;électricité) pour extraire les calories
          qu&apos;il contient encore et les élever à la température requise pour le chauffage
          — un phénomène qui explique la variation du{' '}
          <Link href="/blog/rendement-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            rendement (COP)
          </Link>{' '}
          au fil des saisons.
        </p>

        <ArticleTable {...TEMPERATURE_TABLE} title="Fonctionnement d'une pompe à chaleur air-eau selon la température extérieure" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          En dessous de 0 °C, l&apos;humidité contenue dans l&apos;air extérieur peut se
          transformer en givre sur les ailettes de l&apos;évaporateur, réduisant
          progressivement l&apos;échange thermique. La pompe à chaleur déclenche alors
          automatiquement un <strong>cycle de dégivrage</strong> : elle inverse
          temporairement son cycle pour réchauffer l&apos;évaporateur et faire fondre le
          givre, avant de reprendre le chauffage normal. Ce mécanisme, entièrement
          automatique, explique pourquoi on peut parfois voir de la vapeur s&apos;échapper de
          l&apos;unité extérieure par temps froid et humide — c&apos;est un fonctionnement
          normal, pas un signe de panne.
        </p>

        <ArticleCallout type="tip" title="Et si la température extérieure descend très bas ?">
          <p>
            Les modèles récents fonctionnent efficacement jusqu&apos;à −15 °C, voire −25 °C
            pour certains modèles haut de gamme. En deçà du seuil garanti par le fabricant,
            un <strong>appoint électrique</strong> intégré prend le relais pour maintenir la
            température de consigne, au prix d&apos;une consommation électrique
            ponctuellement plus élevée — un fonctionnement de secours qui reste rare en
            France métropolitaine, hors zones de montagne.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : MONOBLOC OU BIBLOC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur air-eau monobloc ou bibloc : quel impact sur le fonctionnement ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le principe thermodynamique décrit plus haut reste rigoureusement identique, que la
          pompe à chaleur soit <strong>monobloc</strong> ou <strong>bibloc</strong> — seule la
          répartition physique des composants change. Sur un modèle <strong>monobloc</strong>,
          l&apos;intégralité du circuit frigorifique (évaporateur, compresseur, condenseur,
          détendeur) est contenue dans une seule unité extérieure ; seule de l&apos;eau déjà
          chauffée circule ensuite jusqu&apos;au circuit de chauffage intérieur, ce qui
          simplifie l&apos;installation et supprime tout risque de fuite de fluide
          frigorigène à l&apos;intérieur du logement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Sur un modèle <strong>bibloc</strong>, le circuit frigorifique est réparti entre
          l&apos;unité extérieure (évaporateur, compresseur) et un module intérieur qui
          contient le condenseur — les deux unités étant reliées par des liaisons
          frigorifiques nécessitant l&apos;intervention d&apos;un frigoriste certifié. Cette
          configuration limite légèrement les pertes thermiques liées au transport de
          l&apos;eau chaude sur de longues distances, un avantage marginal pour la plupart
          des logements individuels.
        </p>

        {/* ---- SECTION 7 : AU QUOTIDIEN ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Fonctionnement au quotidien : ce qui influence la performance réelle
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au-delà du principe thermodynamique, plusieurs facteurs concrets influencent le
          fonctionnement réel d&apos;une pompe à chaleur air-eau au quotidien. Le{' '}
          <strong>dimensionnement</strong> de l&apos;appareil est déterminant : une pompe à
          chaleur surdimensionnée fonctionne par cycles courts et répétés (marche-arrêt
          fréquent), moins efficaces qu&apos;un régime stable et modulé. Notre guide sur la{' '}
          <Link href="/blog/puissance-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            puissance d&apos;une pompe à chaleur
          </Link>{' '}
          détaille comment éviter cette erreur de dimensionnement dès la conception du
          projet.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>température de départ d&apos;eau</strong> réglée par la loi d&apos;eau
          joue également un rôle majeur : plus l&apos;eau doit être chauffée à haute
          température (radiateurs anciens non adaptés), plus le compresseur doit travailler
          intensément, ce qui réduit le rendement global. C&apos;est pourquoi les émetteurs
          basse température — plancher chauffant ou radiateurs dimensionnés en conséquence —
          sont systématiquement recommandés pour optimiser le fonctionnement d&apos;une
          pompe à chaleur air-eau.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, l&apos;<strong>entretien régulier</strong> conditionne directement la
          stabilité du fonctionnement dans le temps : des échangeurs encrassés ou une légère
          fuite de fluide frigorigène dégradent progressivement les performances, souvent de
          façon si graduelle que les occupants ne s&apos;en rendent pas compte avant une
          hausse sensible de la facture d&apos;électricité. Notre guide sur l&apos;
          <Link href="/blog/entretien-pompe-a-chaleur-air-eau" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            entretien d&apos;une pompe à chaleur air-eau
          </Link>{' '}
          détaille les gestes essentiels pour préserver ce fonctionnement optimal, une
          obligation légale pour tout appareil de plus de 4 kW.
        </p>

        <ArticleCallout type="info" title="En résumé : le fonctionnement d'une pompe à chaleur air-eau">
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>Le principe</strong> — capter la chaleur de l&apos;air extérieur plutôt que la produire</li>
            <li><strong>Le cycle</strong> — évaporation, compression, condensation, détente, en boucle continue</li>
            <li><strong>La seule dépense d&apos;électricité</strong> — la phase de compression</li>
            <li><strong>La performance</strong> — dépend de la température extérieure, du dimensionnement et de l&apos;entretien</li>
            <li><strong>Le résultat</strong> — 3 à 4 kWh de chaleur restitués pour 1 kWh d&apos;électricité consommé</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Faites installer une pompe à chaleur air-eau performante en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC dimensionnent votre installation selon votre logement et vos émetteurs de chauffage, pour un fonctionnement optimal dès la mise en service. Devis gratuit sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur le fonctionnement d&apos;une pompe à chaleur air-eau
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

        {/* ---- SOURCES ---- */}
        <ArticleSources sources={SOURCES} />

        {/* ---- LIENS INTERNES ---- */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/services/pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/rendement-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Rendement pompe à chaleur : 8 facteurs clés
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/geothermie-ou-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Géothermie ou pompe à chaleur ?
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/entretien-pompe-a-chaleur-air-eau"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Entretien pompe à chaleur air-eau
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation de pompe à chaleur par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Paris', slug: 'paris' },
              { name: 'Versailles', slug: 'versailles' },
              { name: 'Créteil', slug: 'creteil' },
              { name: 'Vincennes', slug: 'vincennes' },
              { name: 'Massy', slug: 'massy' },
              { name: 'Meaux', slug: 'meaux' },
              { name: 'Melun', slug: 'melun' },
              { name: 'Noisy-le-Grand', slug: 'noisy-le-grand' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/services/pompe-a-chaleur/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Pompe à chaleur {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
