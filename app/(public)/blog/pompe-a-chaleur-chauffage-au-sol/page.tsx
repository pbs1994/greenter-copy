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
  ARTICLE_META, EMETTEUR_TABLE, REVETEMENT_TABLE, AIDES_TABLE,
  EXAMPLE_CALCULATION, TIPS_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pac-chauffage-sol-2026'

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
      url: 'https://www.greenter.fr/images/blog/pac-chauffage-sol-plancher-chauffant-tuyaux-pose.jpg',
      width: 1200,
      height: 630,
      alt: "Circuit de plancher chauffant hydraulique — tuyaux en serpentin sur isolant réfléchissant avant chape",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pac-chauffage-sol-plancher-chauffant-tuyaux-pose.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Pompe à chaleur pour chauffage au sol', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PompeAChaleurChauffageAuSol() {
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
        image="https://www.greenter.fr/images/blog/pac-chauffage-sol-plancher-chauffant-tuyaux-pose.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pac-chauffage-sol-plancher-chauffant-tuyaux-pose.jpg"
        heroAlt="Circuit de tuyaux en serpentin d'un plancher chauffant hydraulique posé sur isolant réfléchissant — avant coulée de la chape"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Associer une <strong>pompe à chaleur pour chauffage au sol</strong> est
            aujourd&apos;hui considéré comme la meilleure combinaison possible en matière de
            chauffage résidentiel. La raison est physique et imparable : une{' '}
            <strong>pompe à chaleur air-eau</strong> produit de l&apos;eau à 28–35 °C avec
            un coefficient de performance (COP) de 4,0 à 5,0 — c&apos;est-à-dire qu&apos;elle
            génère 4 à 5 kWh de chaleur pour 1 kWh d&apos;électricité consommé. Or, c&apos;est
            exactement la <strong>température de l&apos;eau de chauffage</strong> requise par
            un <strong>plancher chauffant hydraulique</strong>. Cette adéquation parfaite
            entre la source et l&apos;émetteur est la clé de l&apos;efficacité exceptionnelle
            de ce <strong>système de chauffage</strong>.
          </p>
          <p>
            À l&apos;inverse, faire fonctionner <strong>une pompe à chaleur</strong> sur des
            radiateurs haute température exige de monter l&apos;eau à 65–75 °C — ce qui
            divise le COP par deux et annule une grande partie de l&apos;avantage économique
            de la PAC. C&apos;est pourquoi la quasi-totalité des installateurs RGE recommandent
            systématiquement le duo PAC air-eau + <strong>plancher chauffant
            hydraulique</strong> pour les projets de rénovation thermique ambitieux.
          </p>
          <p>
            Pour une maison de 100 m², cette combinaison peut réduire les{' '}
            <strong>factures de chauffage</strong> de 50 à 65 % par rapport à une
            chaudière gaz, avec un reste à charge après MaPrimeRénov&apos; qui descend
            souvent autour de 10 000 € pour un ménage modeste. Ce guide vous explique
            comment fonctionne ce <strong>système de chauffage au sol</strong>, quelle
            PAC choisir, quel budget prévoir et comment maximiser vos aides en 2026.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi PAC + plancher chauffant est la combinaison la plus efficace</li>
            <li>Comment fonctionne un plancher chauffant hydraulique avec une PAC</li>
            <li>Tableau comparatif des émetteurs de chaleur avec PAC (COP, confort, coût)</li>
            <li>Quelle pompe à chaleur choisir pour un chauffage au sol ?</li>
            <li>Prix d&apos;une PAC + plancher chauffant et exemple chiffré 2026</li>
            <li>Revêtements de sol compatibles et aides financières MaPrimeRénov&apos;</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI CETTE COMBINAISON ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur et plancher chauffant : pourquoi ce duo est si efficace ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;efficacité d&apos;une <strong>pompe à chaleur</strong> est inversement proportionnelle
          à l&apos;écart entre la température extérieure et la <strong>température de l&apos;eau de
          chauffage</strong> qu&apos;elle doit produire. Plus cet écart est faible, plus le COP
          est élevé. Un <strong>plancher chauffant hydraulique</strong> ne nécessite que
          28 à 35 °C d&apos;eau pour diffuser de la <strong>chaleur douce et homogène</strong>
          dans toute une pièce. C&apos;est 30 à 40 degrés de moins qu&apos;un radiateur classique —
          et cela se traduit directement par un COP nettement plus élevé pour la PAC.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-chauffage-sol-plancher-chauffant-tuyaux-pose.jpg"
          alt="Circuit de plancher chauffant hydraulique — tuyaux PER en serpentin posés sur isolant réfléchissant avant coulée de la chape de béton"
          imagePosition="right"
        >
          <p>
            Le <strong>plancher chauffant hydraulique</strong> est un{' '}
            <strong>émetteur de chaleur</strong> à grande surface : il rayonne depuis
            l&apos;ensemble du <strong>sol</strong> vers toute la pièce. Contrairement à un
            radiateur qui concentre la chaleur sur 1 à 2 m² de paroi, le sol chauffe
            sur toute la <strong>surface du sol</strong> habitable. Ce mode de diffusion
            par rayonnement crée une <strong>répartition uniforme de la chaleur</strong> —
            agréable à <em>marcher pieds nus sur un sol</em> tiède en hiver — sans
            courants d&apos;air ni zones froides près des fenêtres.
          </p>
          <p className="mt-3">
            La grande surface d&apos;échange permet aussi de diffuser la même quantité de
            chaleur avec une eau de chauffage moins chaude. C&apos;est le principe physique
            fondamental qui rend le{' '}
            <strong>chauffage par le sol</strong> aussi compatible avec les pompes à
            chaleur : les deux systèmes fonctionnent ensemble à basse température,
            optimisant le COP et réduisant les <strong>coûts de chauffage</strong>
            sur toute la durée de vie de l&apos;installation.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '4,0–5,0', label: 'COP d\'une PAC air-eau avec plancher chauffant (eau à 35 °C)', color: 'green' },
          { value: '2,0–2,5', label: 'COP d\'une PAC avec radiateurs haute température (eau à 70 °C)', color: 'blue' },
          { value: '50–65 %', label: 'économies sur la facture de chauffage vs chaudière gaz', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : FONCTIONNEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment fonctionne une pompe à chaleur avec un chauffage au sol hydraulique ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>fonctionnement de la pompe à chaleur</strong> avec un plancher
          chauffant hydraulique repose sur un circuit d&apos;eau fermé. La{' '}
          <strong>pompe à chaleur air-eau</strong> extrait les calories contenues dans
          l&apos;air extérieur — même par grand froid, jusqu&apos;à −20 °C pour les modèles
          récents — et les transfère à un fluide frigorigène qui circule dans un
          compresseur. Ce fluide, une fois compressé, cède sa chaleur à l&apos;
          <strong>eau de chauffage</strong> via un échangeur. L&apos;eau ainsi chauffée
          à 28–35 °C est envoyée dans le <strong>circuit de chauffage</strong> du
          <strong> plancher chauffant hydraulique</strong>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au cœur du sol, les tuyaux en polyéthylène réticulé (PER) sont noyés dans
          une chape de béton ou d&apos;anhydrite de 5 à 8 cm d&apos;épaisseur. Cette chape joue
          le rôle d&apos;accumulateur thermique : elle se réchauffe lentement avec l&apos;
          <strong>eau chaude</strong> qui circule dans les tuyaux, puis diffuse cette
          chaleur par rayonnement et convection vers toute la pièce. Ce principe
          d&apos;inertie thermique est particulièrement efficace : le sol rayonne de la{' '}
          <strong>chaleur douce</strong> pendant plusieurs heures après l&apos;arrêt
          de la PAC, ce qui réduit les cycles de marche-arrêt et améliore encore le COP.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un <strong>plancher chauffant est un émetteur</strong> dont le comportement
          est fondamentalement différent des radiateurs. Il n&apos;y a pas de montée en
          température rapide, mais une montée progressive sur 1 à 2 heures. En contrepartie,
          le <strong>chauffage au sol</strong> maintient une température stable et
          homogène pendant toute la nuit sans aucune relance. Pour cela, le programmateur
          de la PAC doit être réglé avec une plage de départ anticipée (1 à 2 heures avant
          l&apos;heure de lever, par exemple) pour tirer parti de cette inertie.
        </p>

        <div className="my-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <p className="font-bold text-slate-900 text-lg mb-4">
            Le cycle complet : de la source d&apos;énergie au confort dans la pièce
          </p>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: '1', label: 'Air extérieur', detail: 'La PAC capte les calories de l\'air, même à −10 °C' },
              { step: '2', label: 'Compresseur', detail: 'Le fluide frigorigène est compressé — montée en température' },
              { step: '3', label: 'Eau 28–35 °C', detail: 'L\'échangeur transfère la chaleur à l\'eau du circuit PCH' },
              { step: '4', label: 'Sol radiant', detail: 'La chape diffuse une chaleur douce et homogène' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <p className="font-semibold text-slate-900 text-sm mb-1">{item.label}</p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- SECTION 3 : TABLEAU COMPARATIF ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          PAC + plancher chauffant vs autres systèmes : tableau comparatif
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour comprendre pourquoi <strong>les pompes à chaleur</strong> sont presque
          systématiquement couplées à un <strong>système de chauffage au sol</strong>
          dans les projets de rénovation thermique performante, ce tableau compare
          les <strong>types de chauffage</strong> compatibles avec une PAC, en termes
          de COP réel, de confort et de coût d&apos;installation.
        </p>

        <ArticleTable {...EMETTEUR_TABLE} title="PAC air-eau et émetteurs de chaleur : comparatif COP, confort et prix 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ce tableau révèle l&apos;essentiel : le <strong>plancher chauffant hydraulique</strong>
          est l&apos;<strong>émetteur de chaleur</strong> qui tire le meilleur parti d&apos;une
          <strong> pompe à chaleur</strong>. Son avantage sur les radiateurs basse
          température n&apos;est pas spectaculaire en COP (4,0–5,0 vs 3,0–3,5), mais il
          est significatif sur la facture annuelle : pour 1 500 kWh électriques annuels
          d&apos;une PAC, la différence représente 150 à 300 € d&apos;économies supplémentaires.
          Sur 15 ans, cela dépasse 3 000 à 4 000 € — soit plus que le surcoût
          d&apos;installation du plancher chauffant par rapport aux radiateurs.
        </p>

        <ArticleCallout type="tip" title="Plancher chauffant électrique vs hydraulique avec PAC : quel choix ?">
          <p>
            Le <strong>chauffage au sol électrique</strong> (câbles résistants ou
            film rayonnant) offre un confort similaire au plancher chauffant hydraulique,
            mais sans l&apos;efficacité d&apos;une PAC. Son COP est de 1,0 (résistance électrique
            pure) contre 4,0 à 5,0 pour le duo PAC + plancher chauffant hydraulique.
            Sur la facture de chauffage annuelle d&apos;une maison de 100 m², la différence
            peut représenter 800 à 1 400 € par an. Le{' '}
            <strong>plancher chauffant électrique</strong> se justifie uniquement
            dans les rénovations où il est impossible de poser une chape hydraulique —
            planchers en bois, appartements en copropriété avec impossibilité de
            percer la dalle.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : QUELLE PAC CHOISIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle pompe à chaleur choisir pour un plancher chauffant hydraulique ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>installer une pompe à chaleur</strong> avec un plancher chauffant
          hydraulique, le critère principal est la <strong>température de sortie d&apos;eau</strong>
          minimale. Vous avez besoin d&apos;une PAC dont la plage de fonctionnement basse
          température descend à 28–30 °C — ce que font toutes les PAC air-eau modernes
          dites « basse température » ou « pour plancher chauffant ». L&apos;indicateur à
          vérifier sur la fiche technique : le <strong>SCOP</strong> (Seasonal COP)
          mesuré en régime A7W35 doit être supérieur à 4,5.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-chauffage-sol-technicien-installation-unite.jpg"
          alt="Technicien RGE en combinaison blanche et casque jaune raccordant une pompe à chaleur murale — installation professionnelle"
          imagePosition="left"
        >
          <p>
            Les <strong>types de pompes à chaleur</strong> compatibles avec le plancher
            chauffant hydraulique sont les PAC air-eau et les PAC géothermiques.
            La <strong>pompe à chaleur air-eau</strong> est la référence du marché
            en 2026 : son coût d&apos;installation est accessible (8 000–15 000 € selon
            la puissance), elle ne nécessite pas de travaux de génie civil et elle
            bénéficie des aides MaPrimeRénov&apos; les plus élevées. Les grandes marques
            du marché — Daikin Altherma, Mitsubishi Ecodan, Atlantic Alféa,
            Vaillant aroTHERM et Viessmann Vitocal — proposent toutes des modèles
            conçus spécifiquement pour le <strong>chauffage par le sol</strong>.
          </p>
          <p className="mt-3">
            La <strong>pompe à chaleur géothermique</strong> offre des COP encore
            supérieurs (4,5 à 6,0) car elle puise les calories dans le sol ou une
            nappe phréatique, à une température stable de 10 à 15 °C toute l&apos;année.
            Son COP ne varie pas selon la météo, contrairement à la PAC air-eau.
            Inconvénient : son coût est deux à trois fois plus élevé (20 000–35 000 €)
            et elle nécessite des forages ou des capteurs horizontaux — ce qui
            implique des travaux extérieurs importants et des autorisations spécifiques.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mt-4 mb-4">
          <strong>Quelle pompe à chaleur choisir</strong> concrètement ? Pour la
          grande majorité des projets de rénovation en maison individuelle, la PAC
          air-eau est le choix le plus pertinent. Elle couvre les besoins de
          <strong> chauffage au sol</strong> jusqu&apos;à −25 °C extérieur sur les modèles
          récents, s&apos;installe en 1 à 2 jours et bénéficie des aides les plus généreuses.
          La géothermie se justifie principalement dans les constructions neuves très
          bien isolées (DPE A-B) ou dans les grands logements où l&apos;économie annuelle
          sur les <strong>factures de chauffage</strong> amortit le surcoût d&apos;installation
          en moins de 12 ans. Notre comparatif{' '}
          <Link href="/blog/geothermie-ou-pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
            géothermie ou pompe à chaleur
          </Link>{' '}
          détaille les critères pour trancher entre les deux technologies.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un point technique important : pour un <strong>système de chauffage au sol</strong>,
          la PAC doit être reliée à un <strong>circuit hydraulique</strong> doté d&apos;un
          circulateur, d&apos;un vase d&apos;expansion et d&apos;un collecteur de distribution (nourrice)
          qui alimente chaque boucle de plancher chauffant. Ce circuit est dimensionné par
          le technicien RGE lors du bilan thermique — il détermine le débit dans chaque
          boucle, l&apos;espacement des tuyaux et la puissance du circulateur. Un{' '}
          <Link href="/services/audit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            audit énergétique préalable
          </Link>{' '}
          permet d&apos;optimiser ce dimensionnement et de choisir la puissance PAC exacte.
        </p>

        <ArticleCallout type="info" title="PAC monobloc ou PAC split pour chauffage au sol ?">
          <p>
            La <strong>PAC air-eau monobloc</strong> intègre tous les composants (compresseur,
            échangeur) dans l&apos;unité extérieure. Le seul circuit qui rentre dans le logement
            est le circuit d&apos;eau. C&apos;est la solution la plus simple à installer et à entretenir.
            La <strong>PAC split</strong> sépare l&apos;unité extérieure (compresseur) et un module
            intérieur (échangeur eau + système hydraulique). Elle est plus silencieuse à
            l&apos;intérieur et supporte mieux les longues distances entre l&apos;unité et la chaufferie.
            Pour un <strong>plancher chauffant hydraulique</strong>, les deux types fonctionnent
            parfaitement — le choix dépend de la configuration de votre logement.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : PRIX ET EXEMPLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix d&apos;une pompe à chaleur avec chauffage au sol en 2026 — exemple chiffré
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>coût d&apos;une pompe à chaleur</strong> avec plancher chauffant hydraulique
          est plus élevé qu&apos;un simple remplacement de chaudière, mais l&apos;association des
          deux systèmes justifie pleinement l&apos;investissement par les économies réalisées.
          Pour une maison de 80 à 120 m², le budget total se situe entre 14 000 et
          25 000 € TTC, pose et TVA à 5,5 % comprises. Le prix se décompose en deux
          postes distincts.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>pompe à chaleur air-eau</strong> représente le poste principal :
          8 000 à 15 000 € selon la puissance (7 à 16 kW) et la marque. L&apos;
          <strong>installation d&apos;une pompe à chaleur</strong> comprend la fourniture
          de l&apos;unité extérieure, les raccordements hydrauliques et électriques, la mise
          en service et le réglage de la courbe de chauffe. Pour un projet neuf
          (sans chaudière existante à déposer), il faut prévoir la création de la
          chaufferie complète avec le ballon d&apos;eau chaude sanitaire thermodynamique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          L&apos;<strong>installation d&apos;un chauffage au sol</strong> hydraulique coûte
          entre 40 et 80 €/m² selon la surface, la complexité du zonage et le type
          de chape. Pour 100 m² de surface chauffée, comptez 5 000 à 8 000 €. Ce
          tarif inclut les tuyaux PER, l&apos;isolant sous chape, le collecteur de
          distribution, la chape elle-même et la régulation par pièce. Un{' '}
          <strong>plancher chauffant</strong> sur dalle existante peut nécessiter
          un ragréage préalable (500 à 1 000 €) si la surface n&apos;est pas parfaitement
          plane.
        </p>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                <span className="text-slate-700">{line.label}</span>
                <span className="font-semibold text-lg text-slate-900">{line.amount}</span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-xl">{EXAMPLE_CALCULATION.total.label}</span>
              <span className="font-bold text-emerald-900 text-3xl">{EXAMPLE_CALCULATION.total.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Économies sur la facture</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour en savoir plus sur le prix de la PAC seule, sans plancher chauffant,
          consultez notre{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            guide complet des prix d&apos;une pompe à chaleur en 2026
          </Link>
          {' '}qui détaille les tarifs par puissance, les marques et le calcul du reste à charge
          selon les revenus. Pour réduire encore les besoins de chauffage et descendre
          d&apos;une gamme de puissance PAC,{' '}
          <Link href="/blog/prix-isolation-combles-au-m2" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            isoler les combles
          </Link>{' '}
          avant d&apos;installer la PAC est systématiquement recommandé.
        </p>

        {/* ---- SECTION 6 : REVÊTEMENTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel revêtement de sol choisir avec une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le choix du <strong>revêtement de sol</strong> est une décision technique
          souvent sous-estimée dans un projet de <strong>chauffage au sol avec pompe
          à chaleur</strong>. Un revêtement trop isolant empêche la chaleur de remonter
          du sol vers la pièce — il faut alors monter la température de l&apos;eau de
          chauffage pour compenser, ce qui dégrade directement le COP de la PAC.
          La règle d&apos;or : la résistance thermique totale du revêtement doit être
          inférieure à 0,15 m².K/W, idéalement inférieure à 0,10 m².K/W.
        </p>

        <ArticleTable {...REVETEMENT_TABLE} title="Revêtements de sol compatibles avec plancher chauffant hydraulique + PAC" />

        <ArticleImageSection
          image="/images/blog/plancher-chauffant-tuyaux-clips-pose-chambre.png"
          alt="Plancher chauffant hydraulique en cours de pose dans une chambre — tuyaux blancs agrafés sur plaque isolante noire avant chape"
          imagePosition="right"
        >
          <p>
            Le <strong>carrelage</strong> et le <strong>béton ciré</strong> sont les
            partenaires naturels du plancher chauffant hydraulique. Leur faible résistance
            thermique (souvent inférieure à 0,05 m².K/W) permet une diffusion quasi
            immédiate de la chaleur — la montée en température est rapide, et la
            température de surface atteinte avec de l&apos;eau à 30 °C est optimale.
            De plus, leur masse thermique contribue à l&apos;inertie du système, prolongeant
            le rayonnement après l&apos;arrêt de la PAC.
          </p>
          <p className="mt-3">
            Les <strong>parquets contrecollés</strong> labellisés « compatible
            chauffage au sol » sont parfaitement utilisables, à condition de respecter
            une résistance thermique inférieure à 0,15 m².K/W. Ce label est indiqué
            sur l&apos;emballage des produits conformes. Évitez les parquets massifs
            épais (plus de 14 mm) et les bois très denses (chêne massif, wengé)
            qui créent un écran thermique significatif. La <strong>moquette</strong>,
            quel que soit son type, est déconseillée avec un plancher chauffant
            hydraulique alimenté par une PAC.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 7 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Aides financières pour une PAC avec plancher chauffant en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          En 2026, <strong>l&apos;installation d&apos;une pompe à chaleur</strong> air-eau bénéficie
          de plusieurs aides cumulables qui réduisent significativement le reste à charge.
          Les aides portent sur la <strong>pompe à chaleur</strong> — pas sur le plancher
          chauffant hydraulique, qui n&apos;est pas subventionné directement par MaPrimeRénov&apos;.
          Mais le surcoût du plancher chauffant par rapport aux radiateurs
          (3 000 à 5 000 € environ pour 100 m²) est largement compensé par les économies
          annuelles supplémentaires liées au meilleur COP qu&apos;il procure.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides financières pour une pompe à chaleur air-eau en 2026" />

        <ArticleFullImage
          image="/images/blog/plancher-chauffant-piece-lumineuse-installation.jpg"
          alt="Grande pièce lumineuse avec baies vitrées en cours d'installation d'un plancher chauffant hydraulique — tuyaux en serpentin sur isolant"
          caption="Un plancher chauffant hydraulique bien conçu couvre toute la surface du sol en boucles équilibrées — chaque circuit de chauffage alimente une pièce pour un réglage indépendant."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour maximiser les aides, la règle fondamentale est de déposer le dossier
          MaPrimeRénov&apos; <strong>avant</strong> la signature du devis et le début des travaux.
          Un artisan <strong>RGE QualiPAC</strong> gère cette procédure pour vous et
          déduit directement l&apos;aide sur votre facture — sans avance de trésorerie.
          Le dossier comprend le devis avec la puissance PAC et le SCOP certifié,
          l&apos;attestation de l&apos;installateur et votre avis d&apos;imposition.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>prime CEE Coup de Pouce</strong> est cumulable sans condition de
          revenus. Elle s&apos;ajoute à MaPrimeRénov&apos; et peut représenter 2 000 à 4 000 €
          supplémentaires pour une PAC air-eau. L&apos;<strong>éco-PTZ</strong> finance le reste
          à charge sans intérêts sur 20 ans, permettant de ne pas mobiliser d&apos;épargne
          pour ce projet. Pour les ménages ayant un projet global (isolation + PAC +
          plancher chauffant), le dossier MaPrimeRénov&apos; &laquo; rénovation d&apos;ampleur &raquo;
          peut débloquer des bonus supplémentaires.
        </p>

        {/* ---- SECTION 8 : ÉTAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 6 étapes pour réussir votre installation PAC + chauffage au sol
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>Combiner une pompe à chaleur</strong> avec un plancher chauffant
          hydraulique est un projet qui implique plusieurs corps de métier (plombier-chauffagiste
          pour la PAC, carreleur ou entreprise spécialisée pour le plancher chauffant,
          électricien). Une coordination rigoureuse et un ordre d&apos;intervention précis
          sont nécessaires pour garantir la qualité du résultat final. Voici les six
          étapes clés.
        </p>

        <ArticleSteps steps={TIPS_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces six étapes, menées dans l&apos;ordre, garantissent un projet cohérent et
          performant. Le point le plus critique est l&apos;étape 6 : le réglage de la
          courbe de chauffe. Trop de propriétaires laissent leur PAC réglée en usine
          avec une courbe trop haute, ce qui monte l&apos;<strong>eau de chauffage</strong>
          inutilement et dégrade le COP réel de 15 à 25 %. Votre installateur RGE
          QualiPAC doit effectuer ce réglage après la mise en service, idéalement lors
          d&apos;un passage en pleine saison de chauffe.
        </p>

        <ArticleStat stats={[
          { value: '28–35 °C', label: 'température idéale de l\'eau de chauffage pour plancher chauffant + PAC', color: 'green' },
          { value: '15–25 %', label: 'perte de COP si la courbe de chauffe est mal réglée après installation', color: 'blue' },
          { value: '7–10 ans', label: 'retour sur investissement moyen pour PAC + plancher chauffant (ménage Jaune)', color: 'green' },
        ]} />

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Faites installer votre PAC + plancher chauffant par un expert RGE en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC réalisent le bilan thermique, dimensionnent votre PAC et votre plancher chauffant hydraulique, puis montent votre dossier MaPrimeRénov' 2026. Devis gratuit sous 48h."
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
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide prix</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une pompe à chaleur en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/prix-isolation-combles-au-m2"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide isolation</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix isolation des combles au m² en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/services/audit"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Audit énergétique — bilan thermique
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              En savoir plus <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation pompe à chaleur + chauffage au sol par ville
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
