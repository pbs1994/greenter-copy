import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, AlertTriangle, Wrench } from 'lucide-react'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSources,
  ArticleImageSection, ArticleFullImage,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, DUREE_VIE_TABLE, FACTEURS_TABLE, ENTRETIEN_TABLE,
  SIGNES_FIN_VIE, EXEMPLE_CALCUL, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/duree-de-vie-pompe-a-chaleur'

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
      url: 'https://www.greenter.fr/images/blog/pac-unite-exterieure-neige-hiver.jpg',
      width: 1200,
      height: 630,
      alt: "Pompe à chaleur installée à l'extérieur sous la neige en hiver — durée de vie et résistance aux conditions climatiques",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pac-unite-exterieure-neige-hiver.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Durée de vie pompe à chaleur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const urgencyStyles: Record<string, string> = {
  'Modérée': 'bg-amber-100 text-amber-700',
  'Haute': 'bg-red-100 text-red-700',
  'Modérée à haute': 'bg-orange-100 text-orange-700',
  'Haute — remplacement obligatoire': 'bg-red-100 text-red-700',
}

export default function DureeDeViePompeAChaleur() {
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
        image="https://www.greenter.fr/images/blog/pac-unite-exterieure-neige-hiver.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pac-unite-exterieure-neige-hiver.jpg"
        heroAlt="Pompe à chaleur installée à l'extérieur, recouverte de neige en plein hiver — la durée de vie d'une pompe à chaleur dépend de sa résistance aux conditions climatiques"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Une pompe à chaleur capte les calories de l&apos;air, de l&apos;eau ou du sol pour
            <strong> produire de la chaleur</strong> de façon continue, hiver comme été. Avant
            d&apos;investir plusieurs milliers d&apos;euros dans un nouveau système de
            chauffage, une question revient systématiquement : <strong>quelle est la durée de
            vie d&apos;une pompe à chaleur</strong> ? La réponse n&apos;est pas unique, car la
            <strong> durée de vie d&apos;une pompe à chaleur varie</strong> sensiblement selon
            le type de pompe à chaleur installé, la qualité de la pose et la régularité de
            l&apos;entretien. En moyenne, on retient une <strong>durée de vie de 15 à 20 ans</strong>
            pour les modèles aérothermiques, et jusqu&apos;à 25 ans pour les pompes à chaleur
            géothermiques.
          </p>
          <p>
            Mais ces chiffres ne sont que des moyennes statistiques. La <strong>durée de vie
            réelle d&apos;une pompe à chaleur</strong> dépend d&apos;une dizaine de facteurs concrets :
            qualité de l&apos;installation, dimensionnement, entretien annuel, zone climatique,
            qualité des composants… Comprendre ces facteurs permet d&apos;<strong>augmenter la
            durée de vie</strong> de votre équipement de plusieurs années, et donc de rentabiliser
            bien davantage votre investissement initial.
          </p>
          <p>
            Ce guide complet détaille la <strong>durée de vie moyenne d&apos;une pompe à
            chaleur</strong> selon chaque type (air-air, air-eau, géothermique), les facteurs qui
            l&apos;influencent, le calendrier d&apos;entretien à respecter, les signes annonciateurs
            d&apos;une <strong>fin de vie</strong> et la méthode pour décider entre réparation et
            remplacement le jour où votre PAC commence à faiblir.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La durée de vie moyenne par type de pompe à chaleur (air-air, air-eau, géothermique)</li>
            <li>Les facteurs qui font varier la longévité d&apos;une pompe à chaleur de plusieurs années</li>
            <li>Le calendrier d&apos;entretien pour prolonger la durée de vie de votre PAC</li>
            <li>Les signes qui indiquent qu&apos;une pompe à chaleur arrive en fin de vie</li>
            <li>Réparer ou remplacer : la méthode de calcul pour trancher</li>
            <li>Nos conseils pour optimiser la durée de vie de votre installation</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : DUREE DE VIE MOYENNE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle est la durée de vie moyenne d&apos;une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une <strong>pompe à chaleur aérothermique</strong> (air-air ou air-eau) affiche une
          <strong> durée de vie moyenne d&apos;une pompe à chaleur</strong> comprise entre 15
          et 20 ans, et entre 20
          et 25 ans pour les pompes à chaleur géothermiques. La <strong>durée de vie des pompes
          à chaleur</strong> s&apos;est nettement améliorée ces dix dernières années grâce aux
          progrès réalisés sur les compresseurs et les fluides frigorigènes. Ces chiffres, confirmés par
          l&apos;ADEME et les principaux fabricants (Atlantic, Daikin, Mitsubishi, Viessmann),
          correspondent à une <strong>pompe à chaleur bien entretenue</strong> et correctement
          dimensionnée dès l&apos;installation. À l&apos;inverse, une PAC mal installée ou jamais
          entretenue peut voir sa longévité réduite de plusieurs années.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Concrètement, <strong>cette durée</strong> n&apos;est pas figée : elle représente une
          fourchette statistique, pas une date de péremption. Bien entretenue, une <strong>pompe
          à chaleur peut</strong> largement dépasser sa durée de vie moyenne théorique. Certaines
          pompes à chaleur de bonne qualité, installées par un professionnel RGE et entretenues
          chaque année, dépassent les 25 ans de fonctionnement — preuve que la <strong>durabilité
          de votre pompe</strong> à chaleur dépend autant de vous que du fabricant. D&apos;autres, mal dimensionnées ou négligées,
          montrent des signes de faiblesse dès la dixième année. Le tableau ci-dessous résume
          la <strong>durée de vie</strong> à attendre selon le type de pompe à chaleur installé.
        </p>

        <ArticleTable {...DUREE_VIE_TABLE} title="Durée de vie moyenne d'une pompe à chaleur par type" />

        <ArticleStat stats={[
          { value: '15–20 ans', label: 'durée de vie moyenne des pompes à chaleur aérothermiques', color: 'green' },
          { value: '20–25 ans', label: 'durée de vie moyenne d\'une pompe à chaleur géothermique', color: 'blue' },
          { value: '50 ans', label: 'durée de vie maximale des sondes géothermiques enterrées', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : PAR TYPE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Durée de vie selon le type de pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Toutes <strong>les pompes à chaleur</strong> ne se valent pas en matière de longévité.
          Le <strong>type de pompe à chaleur</strong> choisi — air-air, air-eau ou géothermique —
          détermine en grande partie la durée de vie attendue, car chaque technologie repose sur
          des composants différents, plus ou moins exposés aux contraintes climatiques.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Pompe à chaleur air-air : une durée de vie de 15 à 20 ans
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Une pompe à chaleur air-air</strong>, aussi appelée climatisation réversible,
          affiche une <strong>durée de vie de 15 à 20 ans</strong> en moyenne. Son composant le
          plus fragile est le compresseur, qui dure généralement 10 à 15 ans avant de devoir être
          remplacé ou révisé. L&apos;unité extérieure, exposée en permanence aux intempéries, au
          gel et aux UV, est également sollicitée plus fortement que l&apos;unité intérieure. Avec
          un entretien régulier — nettoyage des filtres, dégagement de l&apos;unité extérieure —
          la <strong>vie de votre pompe</strong> air-air peut largement dépasser 20 ans.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Pompe à chaleur air-eau (aérothermique) : 15 à 20 ans, parfois 25
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>pompe à chaleur air-eau</strong>, qui chauffe un circuit hydraulique
          (radiateurs ou plancher chauffant) et parfois l&apos;eau chaude sanitaire, a une
          <strong> durée de vie</strong> comparable à la PAC air-air : 15 à 20 ans en moyenne,
          jusqu&apos;à 25 ans pour les modèles haut de gamme bien entretenus. Une <strong>pompe à
          chaleur Atlantic</strong> Alfea ou un modèle équivalent chez Daikin bénéficie souvent
          d&apos;une garantie constructeur de 5 à 10 ans sur le compresseur, signe de la confiance
          des fabricants dans la robustesse de leurs machines lorsqu&apos;elles sont bien
          entretenues. Les deux composants les plus exposés à l&apos;usure restent le compresseur
          et l&apos;échangeur thermique, particulièrement sensible à la qualité de l&apos;eau du
          circuit.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-unite-exterieure-mur-briques.jpg"
          alt="Unité extérieure d'une pompe à chaleur air-eau fixée sur un mur de briques — installation soignée pour une longue durée de vie"
          imagePosition="right"
        >
          <p>
            Pour une <strong>pompe à chaleur air-eau</strong> couplée à un plancher chauffant,
            la longévité du circuit hydraulique compte autant que celle de l&apos;unité elle-même.
            Notre guide sur la{' '}
            <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              pompe à chaleur pour chauffage au sol
            </Link>{' '}
            détaille pourquoi cette combinaison, qui fonctionne à basse température, ménage le
            compresseur et contribue à une <strong>longue durée de vie</strong> de l&apos;ensemble
            de l&apos;installation.
          </p>
          <p className="mt-3">
            À l&apos;inverse, une PAC alimentant de vieux radiateurs haute température sollicite
            davantage le compresseur à chaque cycle, ce qui peut légèrement réduire sa
            <strong> durée de vie optimale</strong> par rapport à une configuration basse
            température.
          </p>
        </ArticleImageSection>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Pompe à chaleur géothermique : la plus longue durée de vie
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Parmi <strong>les pompes à chaleur géothermiques</strong>, on distingue la partie
          mécanique (compresseur, circulateur) et les capteurs enterrés dans le sol. La partie
          mécanique d&apos;<strong>une pompe à chaleur géothermique</strong> affiche une
          <strong> durée de vie de 20 à 25 ans</strong>, comparable à un modèle eau/eau sur
          nappe phréatique (20 à 30 ans). Mais ce qui distingue vraiment la géothermie, ce sont
          les sondes enterrées : sans pièce mobile et protégées des intempéries, elles peuvent
          fonctionner 50 ans, voire toute la durée de vie du bâtiment. C&apos;est cette
          <strong> longévité d&apos;une pompe à chaleur</strong> géothermique qui justifie
          souvent son coût d&apos;installation plus élevé : sur le long terme, le coût ramené à
          l&apos;année devient très compétitif. Notre article{' '}
          <Link href="/blog/geothermie-ou-pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
            géothermie ou pompe à chaleur
          </Link>{' '}
          compare en détail les deux technologies pour vous aider à choisir.
        </p>

        {/* ---- SECTION 3 : FACTEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quels facteurs impactent la durée de vie d&apos;une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>durée de vie d&apos;une PAC</strong> ne dépend pas uniquement de la marque
          ou du type de pompe à chaleur. Une <strong>pompe à chaleur de bonne</strong> qualité
          installée n&apos;importe comment vieillira plus vite qu&apos;un modèle d&apos;entrée de
          gamme posé dans les règles de l&apos;art. Plusieurs facteurs, plus ou moins maîtrisables
          par le propriétaire, impactent la durée de vie de l&apos;équipement.
        </p>

        <ArticleTable {...FACTEURS_TABLE} title="Facteurs qui influencent la longévité d'une pompe à chaleur" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          <strong>La qualité de l&apos;installation initiale</strong> est, de loin, le facteur le
          plus déterminant. Une <strong>pompe à chaleur dépend</strong> directement de son
          dimensionnement : trop puissante, elle fonctionnera en cycles courts qui usent
          prématurément le compresseur ; trop faible, elle tournera en permanence à pleine
          charge pour compenser, ce qui réduit également sa longévité. Faire appel à un
          installateur certifié RGE QualiPAC, qui réalise un{' '}
          <Link href="/blog/puissance-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            calcul de puissance
          </Link>{' '}
          rigoureux avant la pose, est la meilleure garantie d&apos;une <strong>durée de vie
          plus longue</strong>.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-unite-double-ventilateur-renovation.jpg"
          alt="Pompe à chaleur installée sur un chantier de rénovation — la qualité de la pose initiale conditionne la durée de vie de l'équipement"
          imagePosition="left"
        >
          <p>
            <strong>L&apos;entretien d&apos;une pompe à chaleur</strong> arrive en deuxième
            position : sans entretien annuel, la durée de vie peut être divisée par deux. Les
            conditions climatiques jouent également un rôle : en zone H1 (nord, Alsace,
            massifs), où les températures hivernales sont plus rigoureuses,{' '}
            <strong>les pompes à chaleur aérothermiques</strong> subissent davantage de stress
            thermique qu&apos;en Île-de-France.
          </p>
          <p className="mt-3">
            Enfin, la <strong>qualité des composants</strong> selon la marque n&apos;est pas à
            négliger : les compresseurs des grandes marques (Daikin, Mitsubishi, Atlantic)
            bénéficient généralement de garanties plus longues, signe indirect d&apos;une
            <strong> pompe à chaleur fonctionne</strong> de façon plus fiable sur la durée. Plus
            la <strong>pompe à chaleur produit</strong> sa chaleur en cycles longs et réguliers
            plutôt qu&apos;en démarrages-arrêts répétés, plus elle préserve son compresseur.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 4 : ENTRETIEN ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment entretenir sa pompe à chaleur pour prolonger sa durée de vie ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Entretenir sa pompe à chaleur</strong> régulièrement est, après le
          dimensionnement, le levier le plus efficace pour préserver la <strong>longévité de
          votre pompe</strong> à chaleur et <strong>prolonger la durée de
          vie</strong> de l&apos;équipement. Certaines opérations sont à la portée de tous les
          propriétaires, d&apos;autres nécessitent l&apos;intervention d&apos;un technicien certifié.
          Le tableau ci-dessous détaille le calendrier d&apos;entretien recommandé pour
          <strong> optimiser la durée de vie</strong> de votre installation.
        </p>

        <ArticleTable {...ENTRETIEN_TABLE} title="Calendrier d'entretien annuel d'une pompe à chaleur" />

        <ArticleCallout type="tip" title="L'entretien annuel est obligatoire depuis 2023">
          <p>
            Depuis le décret du 1ᵉʳ janvier 2023, l&apos;entretien annuel est obligatoire pour
            toute pompe à chaleur de plus de 4 kW contenant du fluide frigorigène. Il doit être
            réalisé par un technicien titulaire d&apos;une attestation d&apos;aptitude. Un contrat
            de maintenance coûte entre 150 et 300 €/an et reste le meilleur investissement pour
            <strong> allonger sa durée de vie</strong>. Découvrez nos{' '}
            <Link href="/services/maintenance" className="underline underline-offset-2 hover:text-emerald-900 transition-colors">
              contrats de maintenance pompe à chaleur
            </Link>{' '}
            pour ne plus avoir à y penser.
          </p>
        </ArticleCallout>

        <ArticleFullImage
          image="/images/blog/pac-unites-multiples-alignees-exterieur.jpg"
          alt="Plusieurs unités extérieures de pompes à chaleur alignées et entretenues régulièrement"
          caption="Un entretien annuel rigoureux — nettoyage, vérification du fluide frigorigène, contrôle des pressions — peut considérablement allonger la durée de vie d'une pompe à chaleur."
        />

        <p className="text-slate-700 leading-relaxed mb-6">
          Au quotidien, quelques gestes simples suffisent à <strong>augmenter la durée de
          vie</strong> de votre équipement : nettoyer les filtres à air tous les 1 à 3 mois,
          dégager l&apos;unité extérieure de toute végétation ou accumulation de feuilles, et
          surveiller l&apos;absence de givre permanent. Ces gestes, combinés à l&apos;entretien
          annuel professionnel, permettent généralement d&apos;obtenir <strong>une durée de vie
          plus longue</strong> que la moyenne constatée sur le marché.
        </p>

        {/* ---- SECTION 5 : SIGNES FIN DE VIE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment savoir si votre pompe à chaleur arrive en fin de vie ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Même bien entretenue, <strong>une pompe à chaleur arrive</strong> un jour en
          <strong> fin de vie</strong>. Certains signaux permettent d&apos;anticiper ce moment
          avant la panne complète, et donc de planifier le remplacement plutôt que de le subir
          en plein hiver. Voici les principaux signes qui indiquent que <strong>la vie de la
          pompe</strong> touche à sa fin.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-8">
          {SIGNES_FIN_VIE.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-bold text-slate-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  {item.signe}
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.explication}</p>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${urgencyStyles[item.urgence] || 'bg-slate-100 text-slate-600'}`}>
                Urgence : {item.urgence}
              </span>
            </div>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre pompe à chaleur cumule plusieurs de ces symptômes et qu&apos;elle a déjà 15 à
          18 ans, il est temps d&apos;anticiper son remplacement. Une PAC qui arrive en
          <strong> fin de vie après 25</strong> ans de service loyal a généralement bien rempli
          son rôle — mais continuer à la réparer au-delà devient rarement rentable, comme le
          détaille la section suivante.
        </p>

        {/* ---- SECTION 6 : REPARER OU REMPLACER ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Réparer ou remplacer sa pompe à chaleur en fin de vie ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Lorsqu&apos;une panne survient sur une PAC vieillissante, la question se pose
          systématiquement : réparer ou <strong>remplacer sa pompe à chaleur</strong> ? La
          règle pratique communément admise est simple : si le coût de réparation dépasse 30 à
          40 % du prix d&apos;une PAC neuve équivalente, le remplacement est presque toujours
          plus rentable. L&apos;exemple ci-dessous illustre ce calcul pour un cas concret.
        </p>

        <div className="my-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h4 className="font-bold text-slate-900 mb-4">{EXEMPLE_CALCUL.option_reparation.label}</h4>
            <div className="space-y-2">
              {EXEMPLE_CALCUL.option_reparation.lines.map((line, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-200 last:border-0 text-sm">
                  <span className="text-slate-600">{line.label}</span>
                  <span className="font-semibold text-slate-900">{line.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h4 className="font-bold text-emerald-900 mb-4">{EXEMPLE_CALCUL.option_remplacement.label}</h4>
            <div className="space-y-2">
              {EXEMPLE_CALCUL.option_remplacement.lines.map((line, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-emerald-100 last:border-0 text-sm">
                  <span className="text-slate-600">{line.label}</span>
                  <span className={`font-semibold ${line.isDeduction ? 'text-emerald-700' : 'text-slate-900'}`}>{line.amount}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-emerald-800 bg-white rounded-lg px-3 py-2">
              {EXEMPLE_CALCUL.option_remplacement.roi}
            </p>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">
          {EXEMPLE_CALCUL.conclusion} Pour estimer précisément le coût d&apos;un remplacement
          selon votre logement, consultez notre{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            guide des prix de pompes à chaleur en 2026
          </Link>{' '}
          , qui détaille les aides MaPrimeRénov&apos; disponibles. Si votre chaudière au gaz ou
          au fioul vieillit en même temps que votre système de chauffage, notre comparatif sur
          la{' '}
          <Link href="/blog/pompe-a-chaleur-hybride" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            pompe à chaleur hybride
          </Link>{' '}
          peut aussi vous aider à choisir la solution la plus adaptée à votre budget.
        </p>

        <ArticleStat stats={[
          { value: '30–40 %', label: 'seuil du prix d\'une PAC neuve au-delà duquel remplacer est plus rentable', color: 'amber' },
          { value: '9–11 ans', label: 'retour sur investissement d\'un remplacement grâce aux économies d\'énergie', color: 'green' },
          { value: '4 000 €', label: 'aide MaPrimeRénov\' possible pour un remplacement de PAC en 2026', color: 'green' },
        ]} />

        {/* ---- CONCLUSION / CTA ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Choisir une pompe à chaleur conçue pour durer
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Au moment de <strong>choisir une pompe à chaleur</strong>, qu&apos;il s&apos;agisse d&apos;une
          première installation ou d&apos;un remplacement, gardez à l&apos;esprit que la longévité de
          l&apos;équipement dépend autant du matériel que de l&apos;installateur. Une <strong>pompe à
          chaleur</strong> haut de gamme mal dimensionnée vieillira plus vite qu&apos;un modèle
          intermédiaire correctement posé et entretenu chaque année. Pour <strong>optimiser la
          durée de vie</strong> de votre futur équipement, exigez systématiquement un bilan
          thermique avant le devis, un installateur certifié RGE QualiPAC, et souscrivez un{' '}
          <Link href="/blog/entretien-pompe-a-chaleur-air-eau" className="text-emerald-700 font-semibold hover:underline">
            contrat d&apos;entretien
          </Link>{' '}
          dès la mise en service.
        </p>

        <ArticleCTA
          title="Faites entretenir votre PAC par un expert RGE en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC réalisent l'entretien annuel de votre pompe à chaleur, diagnostiquent son état général et vous conseillent en toute transparence sur la nécessité — ou non — d'un remplacement. Devis gratuit sous 48h."
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
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/services/maintenance"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-2">
              <Wrench className="w-4 h-4" /> Contrat de maintenance PAC
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/guide-prix-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide prix</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une PAC en 2026 : coûts, aides, rentabilité
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/puissance-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Puissance pompe à chaleur : comment bien la calculer
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/consommation-pompe-a-chaleur-maison-100m2"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Consommation d&apos;une PAC pour 100 m² en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation et entretien de pompe à chaleur par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Paris', slug: 'paris' },
              { name: 'Versailles', slug: 'versailles' },
              { name: 'Créteil', slug: 'creteil' },
              { name: 'Vincennes', slug: 'vincennes' },
              { name: 'Massy', slug: 'massy' },
              { name: 'Meaux', slug: 'meaux' },
              { name: 'Champigny-sur-Marne', slug: 'champigny-sur-marne' },
              { name: 'Saint-Maur-des-Fossés', slug: 'saint-maur-des-fosses' },
              { name: 'Noisy-le-Grand', slug: 'noisy-le-grand' },
              { name: 'Évry-Courcouronnes', slug: 'evry-courcouronnes' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/services/pompe-a-chaleur/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                PAC {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
