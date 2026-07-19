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
  ARTICLE_META, ISOLANTS_CAVE_TABLE, AIDES_CAVE_TABLE, STEPS_CAVE,
  EXAMPLE_CALCULATION_CAVE, FAQ_ITEMS_CAVE, SOURCES_CAVE,
} from '@/lib/blog-articles/isolation-pour-cave-2026'

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
      url: 'https://www.greenter.fr/images/blog/isolation-cave-plafond-panneaux-polystyrene-pose.webp',
      width: 1200,
      height: 630,
      alt: "Artisan posant des panneaux de polystyrène au plafond d'une cave en béton pour l'isolation pour cave",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-cave-plafond-panneaux-polystyrene-pose.webp'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Isolation pour cave", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationPourCave() {
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
        image="https://www.greenter.fr/images/blog/isolation-cave-plafond-panneaux-polystyrene-pose.webp"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS_CAVE} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-cave-plafond-panneaux-polystyrene-pose.webp"
        heroAlt="Artisan en casque de chantier posant des panneaux de polystyrène au plafond d'une cave en béton — isolation pour cave"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Une cave mal isolée, c&apos;est un peu comme laisser une fenêtre entrouverte en plein
            hiver : on ne la voit pas, mais elle refroidit toute la maison. L&apos;<strong>isolation
            pour cave</strong> figure pourtant parmi les travaux de rénovation énergétique les
            plus rentables au m², et l&apos;un des plus simples à mettre en œuvre — à condition de
            choisir le bon matériau isolant et de respecter quelques règles essentielles.
          </p>
          <p>
            Que votre cave soit saine ou humide, entièrement enterrée ou en partie hors-sol,
            l&apos;objectif reste le même : limiter les pertes de chaleur qui remontent vers les
            pièces habitées, améliorer le confort thermique de la maison et éviter que
            l&apos;humidité de votre sous-sol ne se propage au reste du logement. Ce guide complet
            vous explique <strong>comment isoler une cave</strong> — par le plafond, par les murs
            ou par le sol —, quels matériaux privilégier selon les caractéristiques de votre cave,
            et combien coûte l&apos;isolation d&apos;une cave en 2026, aides financières comprises.
          </p>
          <p>
            Vous trouverez également nos conseils pour une <Link href="/services/isolation" className="text-emerald-700 font-semibold hover:underline">isolation thermique</Link> globale
            de votre logement, et notre guide dédié si vous cherchez plutôt à <Link href="/blog/isolation-murs-humides" className="text-emerald-700 font-semibold hover:underline">isoler un mur humide</Link>.
          </p>
          <p>
            Toutes les caves ne se ressemblent pas : selon qu&apos;elles sont saines, humides,
            enterrées ou semi-enterrées, la meilleure isolation ne sera pas la même. C&apos;est
            pourquoi chaque projet d&apos;isolation cave mené par un artisan RGE commence toujours
            par un diagnostic gratuit des caractéristiques de votre sous-sol.
          </p>
        </div>

        <ArticleCallout type="tip" title="L'essentiel avant de commencer">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Isoler le <strong>plafond de la cave</strong> est presque toujours la priorité, car c&apos;est la paroi en contact direct avec les pièces chauffées</li>
            <li>Une <strong>cave humide</strong> doit être traitée avant toute pose d&apos;isolant, sous peine de moisissures et de dégradation du matériau</li>
            <li>Le <strong>polystyrène extrudé</strong> et la mousse de <strong>polyuréthane</strong> résistent le mieux à l&apos;humidité d&apos;une cave enterrée</li>
            <li>Comptez entre 15 et 60 €/m² selon le matériau, réductibles de moitié grâce aux aides financières 2026</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI ISOLER ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="pourquoi-isoler-une-cave">
          Pourquoi isoler une cave ? Les enjeux d&apos;une bonne isolation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une cave non chauffée conserve une température proche de celle du sol environnant,
          généralement entre 10 et 14 °C toute l&apos;année. Si le plafond de cette cave n&apos;est
          pas isolé, ce sont les pièces situées juste au-dessus — cuisine, salon, entrée — qui
          en subissent les conséquences : plancher froid au toucher, sensation d&apos;inconfort
          près du sol, et une consommation de chauffage plus élevée pour compenser ces
          <strong> pertes de chaleur</strong> permanentes.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Selon les estimations de l&apos;ADEME, un plancher bas ou une cave non isolés peuvent
          représenter jusqu&apos;à 7 à 10 % des <strong>déperditions thermiques</strong> globales
          d&apos;une maison individuelle — une part souvent sous-estimée par rapport à la toiture
          ou aux murs, mais loin d&apos;être négligeable, en particulier dans les maisons anciennes
          construites sans aucune isolation du plancher bas.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Au-delà des économies d&apos;énergie, une bonne isolation de la cave améliore aussi le
          confort dans la maison au quotidien : moins de sensation de paroi froide, une
          température plus homogène d&apos;une pièce à l&apos;autre, et une barrière supplémentaire
          contre les remontées d&apos;humidité et les odeurs typiques d&apos;une cave mal ventilée.
          Si votre cave permet un accès facile et une hauteur sous plafond suffisante, c&apos;est
          souvent l&apos;un des chantiers d&apos;<strong>isolation thermique</strong> au meilleur rapport
          coût-bénéfice de toute la maison.
        </p>

        <ArticleStat stats={[
          { value: '7-10 %', label: 'des déperditions thermiques d\'une maison passent par un plancher bas ou une cave non isolés', color: 'blue' },
          { value: '10-14 °C', label: 'température moyenne d\'une cave non chauffée toute l\'année', color: 'blue' },
          { value: '5-7 ans', label: 'retour sur investissement moyen d\'une isolation de plafond de cave', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : PLAFOND ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="isolation-plafond-cave">
          Isolation du plafond d&apos;une cave : la priorité n°1
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dans l&apos;immense majorité des configurations, <strong>isoler une cave par le plafond</strong>{' '}
          est le geste le plus efficace. C&apos;est cette paroi horizontale qui sépare directement
          le sous-sol non chauffé des pièces de vie situées au rez-de-chaussée. En isolant le
          plafond de votre cave, vous créez une barrière thermique exactement là où se produit
          l&apos;essentiel de l&apos;échange de chaleur entre les deux volumes.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Pourquoi isoler par le plafond plutôt que par les murs ?
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les murs d&apos;une cave enterrée sont en contact direct avec la terre, dont la
          température varie très peu au fil des saisons. Leur impact sur la déperdition
          thermique globale de la maison est donc plus limité que celui du plafond, qui touche
          directement l&apos;air ambiant des pièces chauffées. C&apos;est la raison pour laquelle la
          plupart des artisans RGE recommandent de commencer par le <strong>plafond de la cave</strong>{' '}
          avant d&apos;envisager d&apos;isoler les murs ou le sol, sauf si la cave est elle-même
          destinée à devenir une pièce de vie chauffée.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Les matériaux pour isoler le plafond d&apos;une cave
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le plafond des caves anciennes est souvent constitué de solives en bois apparentes,
          alors que les constructions plus récentes reposent sur une dalle béton ou des
          hourdis — cette différence oriente directement le choix du matériau isolant. Le
          choix dépend aussi de l&apos;état d&apos;humidité de la cave : les plaques de polystyrène
          expansé (PSE) sont économiques et faciles à poser sur un plafond plat et sec, tandis
          que le <strong>polystyrène extrudé</strong> (XPS), plus dense et quasi imperméable à
          l&apos;eau, s&apos;impose dès que la cave présente un risque d&apos;humidité. La <strong>laine
          de roche</strong>, hydrophobe et perméable à la vapeur, offre en prime une isolation
          acoustique appréciable si la cave se trouve sous une chambre ou un salon. La
          <strong> laine de verre</strong>, moins onéreuse, reste réservée aux caves parfaitement
          saines et bien ventilées. Quelle isolation choisir en définitive dépend donc autant
          du budget que de la configuration exacte de votre plafond de cave.
        </p>

        <ArticleImageSection
          image="/images/blog/traitement-humidite-cave-membrane-etancheite-mur.jpeg"
          alt="Technicien en combinaison orange appliquant une membrane d'étanchéité sur un mur de cave en pierre pour traiter les problèmes d'humidité avant l'isolation"
          imagePosition="right"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Cave humide : ne jamais isoler avant d&apos;avoir traité la source
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Une <strong>cave humide</strong> est souvent le symptôme d&apos;une ventilation
            insuffisante, de remontées capillaires ou d&apos;infiltrations depuis l&apos;extérieur.
            Poser un isolant sur des murs ou un plafond encore humides emprisonne cette
            humidité, favorise l&apos;apparition de moisissures et détruit les performances de
            l&apos;isolant en quelques mois seulement.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Le traitement préalable — application d&apos;une membrane d&apos;étanchéité, drainage
            périphérique, amélioration de la ventilation basse — est une étape non négociable.
            Ce n&apos;est qu&apos;une fois la cave asséchée que les travaux d&apos;isolation peuvent
            réellement commencer sans risque de reprise du chantier.
          </p>
        </ArticleImageSection>

        <ArticleTable {...ISOLANTS_CAVE_TABLE} title="Comparatif des matériaux pour isoler le plafond d'une cave en 2026" />

        <ArticleCallout type="warning" title="Cave mal isolée = cave souvent mal ventilée">
          <p>
            Une <strong>cave mal isolée</strong> et une cave mal ventilée vont souvent de pair.
            Avant de poser le moindre isolant, vérifiez que les grilles d&apos;aération ne sont
            pas obstruées et que l&apos;air peut circuler librement. Une isolation posée sur une
            cave qui ne respire pas revient à emprisonner l&apos;humidité ambiante contre le
            nouveau matériau isolant — l&apos;inverse de l&apos;effet recherché.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : MOUSSE PU ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="mousse-polyurethane-cave">
          La mousse de polyuréthane : une isolation continue sans pont thermique
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur un plafond de cave irrégulier — solives en bois apparentes, gaines techniques,
          tuyauteries — la projection de <strong>mousse de polyuréthane</strong> présente un
          avantage décisif sur les panneaux rigides : elle épouse parfaitement chaque recoin
          et forme une couche continue, sans joint ni interstice où l&apos;air froid pourrait
          circuler. C&apos;est l&apos;un des isolants offrant le meilleur pouvoir isolant à épaisseur
          égale, ce qui en fait une solution de choix lorsque la hauteur sous plafond de la
          cave est limitée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le revers de la médaille : la pose nécessite un équipement professionnel et un
          savoir-faire spécifique, ce qui rend ce matériau plus onéreux à la pose que les
          panneaux de <strong>polystyrène</strong>. Il reste néanmoins recommandé dès que l&apos;on
          recherche une <strong>isolation optimale</strong> et une parfaite continuité thermique
          sur un plafond aux formes complexes.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-cave-mousse-polyurethane-projetee-plafond.webp"
          alt="Application de mousse de polyuréthane projetée entre les solives en bois du plafond d'une cave pour une isolation thermique continue"
          caption="La mousse de polyuréthane projetée épouse les irrégularités du plafond et supprime les ponts thermiques entre les solives."
        />

        {/* ---- SECTION 4 : MURS ET SOL ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="isoler-murs-sol-cave">
          Isoler les murs et le sol d&apos;une cave : quand est-ce utile ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si isoler le plafond répond à la majorité des besoins, il existe des situations où
          isoler également les <strong>murs de la cave</strong> et son sol devient pertinent.
          C&apos;est le cas si la cave ou votre sous-sol est utilisé comme pièce de vie, atelier,
          salle de sport ou buanderie chauffée : dans ce contexte, une <strong>isolation
          globale</strong> — plafond, murs et sol — garantit un vrai confort thermique et
          acoustique, comparable à celui d&apos;une pièce classique de la maison.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour les murs d&apos;une <strong>cave enterrée</strong>, les panneaux de polystyrène
          extrudé sont les plus adaptés côté intérieur, car ils résistent à l&apos;humidité
          résiduelle du sol sans se dégrader. Pour <strong>isoler le sol</strong> d&apos;une cave,
          une chape flottante posée sur un isolant rigide (XPS ou PSE haute densité) permet
          de limiter les remontées de froid par le bas, en complément d&apos;un traitement
          d&apos;étanchéité sous dalle si nécessaire — un principe très proche de celui détaillé
          dans notre guide sur l&apos;<Link href="/blog/isolation-pour-sol-beton" className="text-emerald-700 font-semibold hover:underline">isolation pour sol béton</Link>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          À l&apos;inverse, si la cave reste un espace de stockage non chauffé, isoler uniquement
          le plafond suffit généralement à obtenir une bonne isolation de la cave sans
          engager de travaux disproportionnés par rapport au bénéfice attendu. Pour <strong>isoler
          une cave enterrée</strong> transformée en pièce à vivre, en revanche, une isolation
          complète du plafond, des murs et du sol reste la seule façon d&apos;atteindre un vrai
          confort thermique toute l&apos;année.
        </p>

        {/* ---- SECTION 5 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="comment-isoler-une-cave-etapes">
          Comment isoler une cave : les 7 étapes clés
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Isoler efficacement une cave suit une méthode précise, qui vaut aussi bien pour le
          plafond que pour les murs. Respecter cet ordre évite la grande majorité des
          déconvenues rencontrées sur ce type de travaux de rénovation. Une bonne isolation
          du plafond repose autant sur le choix du matériau que sur la qualité de la pose —
          tout propriétaire qui souhaite isoler le plafond de sa cave a donc intérêt à suivre
          ces sept étapes dans l&apos;ordre.
        </p>

        <ArticleSteps steps={STEPS_CAVE} />

        <ArticleCallout type="info" title="Les ponts thermiques, ennemis n°1 d'une isolation efficace">
          <p>
            Même avec un excellent matériau isolant, une isolation mal exécutée au niveau des
            jonctions murs/plafond ou autour des gaines techniques peut réduire de 10 à 20 %
            la performance globale du chantier. Un calfeutrement soigné de ces <strong>ponts
            thermiques</strong> est aussi important que le choix de l&apos;isolant lui-même.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : FAUX PLAFOND / FINITIONS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="faux-plafond-finitions-cave">
          Faux plafond et plaques de plâtre : quelles finitions choisir ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une fois l&apos;isolant posé, la finition dépend surtout de l&apos;usage prévu pour la
          cave. Un <strong>faux plafond</strong> démontable, souvent réalisé avec des dalles
          isolantes à parement aluminium, présente l&apos;avantage de rester accessible pour
          l&apos;entretien des réseaux électriques ou de plomberie qui transitent fréquemment
          sous plafond de cave.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-plafond-cave-panneaux-pare-vapeur-aluminium.jpeg"
          alt="Pose de panneaux isolants avec parement aluminium formant un pare-vapeur au plafond d'une cave carrelée"
          imagePosition="left"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Le rôle du pare-vapeur en sous-plafond
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Certains panneaux isolants intègrent directement un parement en aluminium qui
            joue le rôle de pare-vapeur : il limite la migration de l&apos;humidité ambiante vers
            l&apos;isolant tout en réfléchissant une partie du rayonnement thermique. Ce type de
            solution est particulièrement adapté <strong>sous plafond</strong> de cave carrelée
            ou dans les sous-sols semi-enterrés exposés à une hygrométrie variable selon les
            saisons.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si la cave reste un espace de stockage sans exigence esthétique particulière, des
          <strong> plaques de plâtre</strong> hydrofuges (type H1 ou H2 selon le taux d&apos;humidité
          ambiant) vissées directement sur ossature métallique offrent une finition propre et
          durable, à un coût inférieur à celui d&apos;un faux plafond technique.
        </p>

        {/* ---- SECTION 7 : PRIX ET AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="prix-aides-isolation-cave">
          Combien coûte l&apos;isolation d&apos;une cave ? Prix et aides financières 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix de l&apos;isolation d&apos;une cave varie principalement selon le matériau choisi
          et la surface du plafond à traiter. Comptez, fourniture et pose comprises, de 12 à
          30 €/m² pour de la laine de verre ou du polystyrène expansé, de 20 à 45 €/m² pour du
          polystyrène extrudé ou de la laine de roche, et jusqu&apos;à 60 €/m² pour une projection
          de mousse de polyuréthane sur un plafond complexe.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Bonne nouvelle : ces travaux d&apos;isolation sont éligibles à plusieurs aides
          financières disponibles en 2026, ce qui permet fréquemment de diviser le reste à
          charge par deux. MaPrimeRénov&apos; prend en charge l&apos;isolation des planchers bas et
          des plafonds de cave, sous réserve d&apos;atteindre une résistance thermique minimale
          et de passer par un artisan certifié RGE.
        </p>

        <ArticleTable {...AIDES_CAVE_TABLE} title="Aides cumulables pour l'isolation d'une cave en 2026" />

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION_CAVE.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION_CAVE.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                <span className="text-slate-700">{line.label}</span>
                <span className={`font-semibold text-lg ${line.isDeduction ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {line.amount}
                </span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-xl">{EXAMPLE_CALCULATION_CAVE.total.label}</span>
              <span className="font-bold text-emerald-900 text-3xl">{EXAMPLE_CALCULATION_CAVE.total.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Économies annuelles</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION_CAVE.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION_CAVE.roi}</p>
            </div>
          </div>
        </div>

        <ArticleCallout type="success" title="Un chantier rapide et peu invasif">
          <p>
            Contrairement à l&apos;isolation des murs ou de la toiture, isoler le plafond d&apos;une
            cave ne nécessite ni dépose de revêtement intérieur ni échafaudage extérieur.
            C&apos;est souvent l&apos;un des <strong>travaux d&apos;isolation</strong> les plus rapides à
            réaliser — comptez une à deux journées pour une cave de taille moyenne — et l&apos;un
            des plus simples à financer grâce au cumul des aides 2026.
          </p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Devis gratuit pour l'isolation de votre cave sous 48h"
          description="Nos artisans certifiés RGE évaluent les caractéristiques de votre cave, traitent l'humidité si nécessaire et posent l'isolant le mieux adapté. Dossier MaPrimeRénov' et CEE géré de A à Z."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Questions fréquentes — isolation pour cave</h2>
        <div className="space-y-4 my-8">
          {FAQ_ITEMS_CAVE.map((faq, i) => (
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
        <ArticleSources sources={SOURCES_CAVE} />

        {/* ---- LIENS INTERNES ---- */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/services/isolation"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation thermique — Devis gratuit
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/isolation-murs-humides"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation murs humides : traitement, isolants et étapes
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/isolation-pour-sol-beton"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation pour sol béton : dalle, chape flottante et matériaux
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/contact"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Devis gratuit</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Demander un devis pour l&apos;isolation de votre cave
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Nous contacter <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

      </ArticleLayout>
    </>
  )
}
