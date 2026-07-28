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
  ARTICLE_META, COMPARATIF_TABLE, CHOIX_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/geothermie-ou-pompe-a-chaleur'

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
      url: 'https://www.greenter.fr/images/blog/geothermie-local-technique-ballons-tampon.jpg',
      width: 1600,
      height: 782,
      alt: "Local technique d'une installation géothermique avec ballons tampon et distributeurs hydrauliques — géothermie ou pompe à chaleur",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/geothermie-local-technique-ballons-tampon.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Géothermie ou pompe à chaleur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function GeothermieOuPompeAChaleur() {
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
        image="https://www.greenter.fr/images/blog/geothermie-local-technique-ballons-tampon.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2700}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/geothermie-local-technique-ballons-tampon.jpg"
        heroAlt="Local technique d'une installation géothermique en bois avec ballons tampon, distributeurs hydrauliques et pompes à chaleur reliées aux sondes enterrées"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            « <strong>Géothermie ou pompe à chaleur</strong> » est l&apos;une des questions
            les plus mal posées de la rénovation énergétique — et pour cause : la géothermie
            individuelle utilisée pour chauffer une maison <em>est</em> une pompe à chaleur.
            Ce que l&apos;on appelle couramment « pompe à chaleur » dans le langage courant
            désigne en réalité les modèles <strong>aérothermiques</strong> (air-air, air-eau),
            qui captent les calories dans l&apos;air extérieur. La{' '}
            <strong>géothermie</strong>, elle, capte ces mêmes calories dans le sol, via des
            capteurs enterrés ou des sondes verticales — avec un rendement supérieur, mais un
            coût d&apos;installation nettement plus élevé.
          </p>
          <p>
            En bref : le <strong>rendement (SCOP)</strong> d&apos;une pompe à chaleur
            géothermique se situe entre 4,0 et 5,5, contre 2,8 à 4,2 pour un modèle
            aérothermique. En contrepartie, une installation géothermique coûte entre 20 000 et
            40 000 €, contre 10 000 à 18 000 € pour une pompe à chaleur air-eau — et nécessite
            un terrain suffisamment grand ou un forage.
          </p>
          <p>
            Ce guide clarifie une bonne fois pour toutes le vocabulaire, détaille le
            fonctionnement réel de chaque technologie, compare leurs performances et leurs
            coûts poste par poste, et vous aide à déterminer laquelle correspond le mieux à
            votre logement, votre terrain et votre budget.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La différence exacte entre géothermie et pompe à chaleur aérothermique</li>
            <li>Comment fonctionne une installation géothermique (capteurs et sondes)</li>
            <li>Le comparatif complet : rendement, prix, durée de vie, bruit, emprise au sol</li>
            <li>Les aides financières applicables à chaque technologie en 2026</li>
            <li>5 critères pour choisir la solution adaptée à votre projet</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : DE QUOI PARLE-T-ON ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Géothermie ou pompe à chaleur : de quoi parle-t-on exactement ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Toute <strong>pompe à chaleur</strong>, quel que soit son type, fonctionne selon le
          même principe : elle capte des calories dans un milieu extérieur (air, sol ou eau),
          les concentre grâce à un compresseur et un fluide frigorigène, puis les restitue à
          une température plus élevée pour chauffer le logement. Ce qui distingue les
          différentes technologies, c&apos;est uniquement la <strong>source de chaleur</strong>{' '}
          exploitée — pas le principe thermodynamique lui-même.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          La pompe à chaleur aérothermique, la plus répandue
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Quand on parle de « pompe à chaleur » sans autre précision, on désigne presque
          toujours un modèle <strong>aérothermique</strong> : air-air ou air-eau. Ces
          systèmes captent les calories directement dans l&apos;air extérieur via une unité
          placée en façade ou au sol, ce qui explique leur popularité — installation rapide,
          coût contenu, aucune contrainte de terrain. Notre{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            guide des prix d&apos;une pompe à chaleur
          </Link>{' '}
          détaille les tarifs de ces modèles aérothermiques, très largement majoritaires dans
          les installations résidentielles en France.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-aerothermique-unite-exterieure-maison.jpg"
          alt="Unité extérieure blanche d'une pompe à chaleur air-eau installée contre la façade d'une maison, entourée de plantes"
          imagePosition="right"
        >
          <p>
            Cette <strong>unité extérieure</strong> renferme le compresseur et le ventilateur
            qui brasse l&apos;air ambiant à travers l&apos;échangeur thermique. Sa
            performance dépend directement de la température de l&apos;air extérieur : plus
            il fait froid, plus le rendement baisse, ce qui explique l&apos;écart de{' '}
            <strong>SCOP</strong> observé entre une pompe à chaleur aérothermique et une
            installation géothermique, alimentée par une source de chaleur bien plus stable.
          </p>
          <p className="mt-3">
            C&apos;est également cette unité extérieure qui explique le niveau sonore d&apos;
            une pompe à chaleur classique — un point que nous détaillons dans notre article
            sur le{' '}
            <Link href="/blog/pompe-a-chaleur-et-bruit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              bruit d&apos;une pompe à chaleur
            </Link>.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          La pompe à chaleur géothermique, ou géothermie individuelle
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>géothermie</strong> individuelle, elle, exploite la chaleur emmagasinée
          dans le sol — une ressource dont la température reste stable toute l&apos;année,
          généralement entre 10 et 14 °C à quelques mètres de profondeur, quelle que soit la
          saison. Cette stabilité est précisément ce qui permet à une{' '}
          <strong>pompe à chaleur géothermique</strong> d&apos;afficher un rendement supérieur
          à un modèle aérothermique, dont la performance chute justement lorsque l&apos;air
          extérieur est le plus froid — c&apos;est-à-dire au moment où l&apos;on a le plus
          besoin de chauffage.
        </p>

        <ArticleStat stats={[
          { value: '4,0–5,5', label: 'SCOP moyen d\'une pompe à chaleur géothermique', color: 'green' },
          { value: '2,8–4,2', label: 'SCOP moyen d\'une pompe à chaleur aérothermique air-eau', color: 'blue' },
          { value: '10–14 °C', label: 'température stable du sol toute l\'année, à quelques mètres de profondeur', color: 'amber' },
        ]} />

        {/* ---- SECTION 2 : FONCTIONNEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment fonctionne une installation géothermique ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une installation géothermique capte la chaleur du sol grâce à l&apos;un de ces deux
          dispositifs. Le <strong>capteur horizontal</strong> consiste en un réseau de tuyaux
          enterrés à faible profondeur (0,6 à 1,2 m), disposé en boucles sur une grande
          surface de terrain. C&apos;est la solution la moins coûteuse à l&apos;installation,
          mais elle nécessite une surface disponible équivalente à 1,5 à 2 fois la surface
          habitable à chauffer.
        </p>

        <ArticleFullImage
          image="/images/blog/geothermie-schema-capteur-horizontal-maison.jpg"
          alt="Schéma en 3D d'un capteur géothermique horizontal enterré dans le jardin, relié par des tuyaux bleus et rouges à une pompe à chaleur géothermique installée dans la maison"
          caption="Le capteur horizontal capte les calories du sol via un réseau de tuyaux enterrés sur une large surface de terrain — la configuration géothermique la plus courante pour les maisons individuelles disposant d'un grand jardin."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>sonde géothermique verticale</strong> repose sur un principe différent :
          un ou plusieurs forages de 50 à 150 mètres de profondeur permettent d&apos;exploiter
          une chaleur plus stable encore, sur une emprise au sol minime. C&apos;est la solution
          adaptée aux terrains restreints, mais le coût du forage — qui nécessite une
          entreprise spécialisée et parfois une déclaration administrative selon la
          profondeur — augmente sensiblement le budget global du projet.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Dans les deux cas, un fluide caloporteur (eau glycolée) circule dans les capteurs ou
          les sondes, se réchauffe au contact du sol, puis transmet ses calories à la{' '}
          <strong>pompe à chaleur géothermique</strong> installée à l&apos;intérieur du
          bâtiment. Contrairement à un modèle aérothermique, il n&apos;y a donc aucune unité
          extérieure exposée aux intempéries — un atout pour la discrétion visuelle et
          sonore de l&apos;installation.
        </p>

        {/* ---- SECTION 3 : COMPARATIF ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Géothermie ou pompe à chaleur aérothermique : le comparatif complet
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Au-delà du rendement, plusieurs critères concrets doivent entrer en ligne de compte
          pour choisir entre <strong>géothermie</strong> et{' '}
          <strong>pompe à chaleur aérothermique</strong>. Le tableau ci-dessous synthétise les
          principales différences observées sur le terrain en 2026.
        </p>

        <ArticleTable {...COMPARATIF_TABLE} title="Géothermie vs pompe à chaleur aérothermique — comparatif 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Le <strong>rendement supérieur</strong> de la géothermie s&apos;explique
          intégralement par la stabilité de sa source de chaleur : alors qu&apos;une pompe à
          chaleur aérothermique voit son <Link href="/blog/rendement-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            rendement
          </Link>{' '}
          chuter lorsque le mercure descend sous 0 °C, une installation géothermique conserve
          une performance quasiment constante toute l&apos;année, puisque la température du
          sol ne varie que de quelques degrés entre l&apos;hiver et l&apos;été.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Côté <strong>durée de vie</strong>, l&apos;avantage revient également à la
          géothermie : la partie mécanique dure généralement 20 à 25 ans, contre 15 à 20 ans
          pour un modèle aérothermique — et les sondes enterrées elles-mêmes, sans pièce
          mobile, peuvent fonctionner 50 ans ou plus. Notre article sur la{' '}
          <Link href="/blog/duree-de-vie-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            durée de vie d&apos;une pompe à chaleur
          </Link>{' '}
          détaille les facteurs qui influencent la longévité de chaque technologie.
        </p>

        <ArticleCallout type="tip" title="Le bruit, un avantage souvent décisif pour la géothermie">
          <p>
            Sans unité extérieure exposée à l&apos;air libre, une installation géothermique
            supprime la principale source de bruit d&apos;une pompe à chaleur classique. Pour
            un terrain en zone résidentielle dense ou à proximité immédiate du voisinage,
            cet argument pèse parfois autant que le rendement dans la décision finale.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel est le prix d&apos;une installation géothermique face à une pompe à chaleur air-eau ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix d&apos;une <strong>installation géothermique</strong> se situe entre 20 000
          et 40 000 € pose comprise, contre 10 000 à 18 000 € pour une pompe à chaleur air-eau
          classique. Cet écart s&apos;explique par le coût des travaux de terrassement ou de
          forage, qui peuvent représenter à eux seuls 40 à 60 % du budget total d&apos;une
          installation géothermique — bien plus que le coût de la pompe à chaleur elle-même.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-geothermique-unite-interieure-local.jpg"
          alt="Unité intérieure blanche d'une pompe à chaleur géothermique installée dans un local technique, entourée de tuyaux, vase d'expansion rouge et manomètres"
          imagePosition="left"
        >
          <p>
            Le <strong>capteur horizontal</strong> reste la solution la moins chère, à
            condition de disposer d&apos;un terrain suffisamment grand et dégagé. La{' '}
            <strong>sonde verticale</strong>, en revanche, ajoute au budget global le coût du
            forage — généralement facturé entre 60 et 100 € par mètre linéaire — ce qui peut
            représenter 8 000 à 15 000 € supplémentaires selon la profondeur nécessaire.
          </p>
          <p className="mt-3">
            Ce surcoût initial s&apos;amortit progressivement grâce aux économies de
            chauffage réalisées sur la durée, mais le calcul de rentabilité ne devient
            généralement favorable qu&apos;au-delà de 15 à 20 ans d&apos;utilisation.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour situer ces montants dans le contexte plus large du remplacement d&apos;un
          système de chauffage existant, notre guide pour{' '}
          <Link href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            remplacer une chaudière gaz par une pompe à chaleur
          </Link>{' '}
          détaille l&apos;ensemble des aides mobilisables, valables aussi bien pour un modèle
          aérothermique que pour une installation géothermique.
        </p>

        {/* ---- SECTION 5 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelles aides financières pour la géothermie ou une pompe à chaleur en 2026 ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Point important à connaître avant de comparer les budgets : MaPrimeRénov&apos;
          finance la <strong>géothermie</strong> plus généreusement que l&apos;aérothermie, ce
          qui réduit sensiblement l&apos;écart de reste à charge entre les deux options. Pour
          les ménages très modestes, l&apos;aide peut atteindre 11 000 € pour une pompe à
          chaleur géothermique, contre 5 000 € pour un modèle air-eau, avec un plafond de
          dépenses éligibles porté à 18 000 € contre 12 000 €.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          À ces montants s&apos;ajoutent les primes CEE (Coup de pouce chauffage), applicables
          aux deux technologies, ainsi que l&apos;éco-PTZ, qui permet de financer le reste à
          charge à taux zéro sans condition de revenus. Un installateur RGE QualiPAC saura
          établir une simulation précise selon votre profil et le type d&apos;installation
          envisagé — ce calcul est indispensable avant toute décision, tant l&apos;écart de
          reste à charge peut varier d&apos;une technologie à l&apos;autre selon votre
          situation.
        </p>

        {/* ---- SECTION 6 : CHOISIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Dans quels cas choisir la géothermie plutôt qu&apos;une pompe à chaleur aérothermique ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le choix entre <strong>géothermie</strong> et{' '}
          <strong>pompe à chaleur aérothermique</strong> ne se résume pas à une question de
          budget disponible. Cinq critères concrets permettent de trancher selon votre
          situation.
        </p>

        <ArticleSteps steps={CHOIX_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          En pratique, la <strong>géothermie</strong> se révèle particulièrement pertinente
          pour les constructions neuves de grande surface, bien isolées et disposant d&apos;un
          terrain généreux — un profil où le surcoût initial s&apos;amortit le plus
          rapidement. Pour la majorité des projets de rénovation en maison individuelle, avec
          un terrain restreint ou un budget plus serré, la pompe à chaleur aérothermique
          air-eau reste le choix le plus adapté et le plus rapide à mettre en œuvre.
        </p>

        {/* ---- SECTION 7 : LIMITES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les limites et contraintes de la géothermie à connaître avant de se lancer
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au-delà du prix, la <strong>géothermie</strong> impose des contraintes que
          n&apos;a pas une pompe à chaleur aérothermique. Le chantier de terrassement ou de
          forage est nettement plus long et plus invasif — comptez plusieurs jours de travaux
          lourds, avec des engins de chantier qui traversent le jardin, contre une demi-journée
          à une journée pour l&apos;installation d&apos;une unité aérothermique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>géothermie</strong> est également quasiment impossible à installer en
          appartement, faute de terrain disponible et en raison de la complexité de gestion en
          copropriété — elle reste réservée aux réseaux de chaleur collectifs ou aux maisons
          individuelles. Pour un logement en habitat collectif, seule une solution
          aérothermique reste envisageable ; notre article sur la{' '}
          <Link href="/blog/pompe-a-chaleur-pour-appartement" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            pompe à chaleur pour appartement
          </Link>{' '}
          détaille les solutions adaptées à ce contexte.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, un sol de mauvaise qualité (terrain rocheux, nappe phréatique complexe) peut
          rendre le forage plus coûteux, voire déconseiller purement et simplement la
          géothermie sur certaines parcelles. Une étude géotechnique préalable est
          indispensable pour évaluer la faisabilité réelle du projet avant tout engagement
          financier.
        </p>

        <ArticleCallout type="info" title="Géothermie ou pompe à chaleur : l'essentiel à retenir">
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>Les deux sont des pompes à chaleur</strong> — seule la source de chaleur diffère (sol vs air)</li>
            <li><strong>Rendement</strong> — la géothermie l&apos;emporte grâce à la stabilité de la température du sol</li>
            <li><strong>Prix</strong> — la géothermie coûte 2 à 3 fois plus cher à l&apos;installation</li>
            <li><strong>Terrain</strong> — indispensable pour la géothermie, non nécessaire pour l&apos;aérothermie</li>
            <li><strong>Bruit</strong> — avantage net à la géothermie, sans unité extérieure exposée</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Géothermie ou pompe à chaleur : obtenez un avis d'expert pour votre projet"
          description="Nos techniciens certifiés RGE QualiPAC étudient votre terrain, votre logement et votre budget pour vous orienter vers la solution la plus rentable — géothermie ou pompe à chaleur aérothermique. Devis gratuit sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la géothermie et la pompe à chaleur
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
