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
  ARTICLE_META, TYPES_PAC_APPART_TABLE, AIDES_PAC_APPART_TABLE, STEPS_PAC_APPART,
  EXAMPLE_CALCULATION_PAC_APPART, FAQ_ITEMS_PAC_APPART, SOURCES_PAC_APPART,
} from '@/lib/blog-articles/pompe-a-chaleur-pour-appartement-2026'

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
      url: 'https://www.greenter.fr/images/blog/pompe-a-chaleur-appartement-unite-exterieure-balcon-immeuble.jpeg',
      width: 1200,
      height: 630,
      alt: "Unité extérieure d'une pompe à chaleur pour appartement installée sur le balcon d'un immeuble en copropriété",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pompe-a-chaleur-appartement-unite-exterieure-balcon-immeuble.jpeg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Pompe à chaleur pour appartement", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PompeAChaleurPourAppartement() {
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
        image="https://www.greenter.fr/images/blog/pompe-a-chaleur-appartement-unite-exterieure-balcon-immeuble.jpeg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS_PAC_APPART} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pompe-a-chaleur-appartement-unite-exterieure-balcon-immeuble.jpeg"
        heroAlt="Unité extérieure compacte d'une pompe à chaleur pour appartement posée sur le balcon d'un immeuble en copropriété"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Longtemps réservée aux maisons individuelles, la <strong>pompe à chaleur pour
            appartement</strong> s&apos;impose aujourd&apos;hui comme une alternative crédible au
            chauffage électrique et aux chaudières individuelles, y compris en habitat
            collectif. Reste une question centrale que se posent la plupart des
            copropriétaires : peut-on vraiment installer une pompe à chaleur dans un
            appartement, avec toutes les contraintes que cela suppose — unité extérieure,
            copropriété, urbanisme, nuisance sonore ?
          </p>
          <p>
            La réponse est oui, à condition de choisir le bon type de <strong>pac</strong> et
            de respecter quelques étapes incontournables. Ce guide complet passe en revue les
            <strong> types de pompes à chaleur</strong> adaptés à un appartement, la procédure
            d&apos;accord de la copropriété, les règles d&apos;urbanisme à connaître avant de se
            lancer, ainsi que le prix d&apos;une pompe à chaleur pour appartement et les aides
            financières disponibles en 2026.
          </p>
          <p>
            Quels sont les avantages d&apos;installer une PAC dans votre appartement plutôt que
            de conserver un chauffage électrique classique ? Une pompe à chaleur est un
            système de chauffage qui utilise l&apos;électricité uniquement pour transporter la
            chaleur captée à l&apos;extérieur, et non pour la produire directement — d&apos;où des
            économies d&apos;énergie souvent spectaculaires. Ramener de la chaleur dans son
            appartement de cette façon demande toutefois un peu plus de préparation qu&apos;en
            maison individuelle, notamment pour faire installer une pompe à chaleur en toute
            légalité vis-à-vis de la copropriété.
          </p>
          <p>
            Pour un projet plus large de rénovation énergétique, retrouvez également notre{' '}
            <Link href="/services/pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
              service d&apos;installation de pompe à chaleur
            </Link>{' '}
            et notre guide sur la{' '}
            <Link href="/blog/pompe-a-chaleur-et-bruit" className="text-emerald-700 font-semibold hover:underline">
              nuisance sonore d&apos;une pompe à chaleur
            </Link>, un point de vigilance essentiel en copropriété.
          </p>
        </div>

        <ArticleCallout type="tip" title="L'essentiel avant de se lancer">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Une <strong>pompe à chaleur air-air</strong> convient dès qu&apos;un balcon, une loggia ou une façade accessible est disponible pour l&apos;unité extérieure</li>
            <li>L&apos;<strong>accord de la copropriété</strong> est presque toujours nécessaire avant d&apos;installer une pompe à chaleur touchant une partie commune</li>
            <li>Il existe des <strong>pompes à chaleur</strong> fonctionnant <strong>sans unité extérieure</strong> visible, idéales pour un appartement sans balcon</li>
            <li>Comptez de 4 000 à 16 000 € selon le type de PAC, réductibles de plusieurs milliers d&apos;euros grâce aux aides 2026</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="pourquoi-pac-appartement">
          Pourquoi installer une pompe à chaleur dans un appartement ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une pompe à chaleur capte les calories présentes dans l&apos;air extérieur pour
          chauffer un logement en consommant très peu d&apos;électricité par rapport à un
          <strong> système de chauffage</strong> classique. Pour un appartement chauffé à
          l&apos;électricité par des convecteurs ou des radiateurs anciens, remplacer cet
          <strong> équipement</strong> par une pompe à chaleur permet de diviser la facture
          de chauffage par deux à trois selon la configuration du logement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au-delà des <strong>économies d&apos;énergie</strong>, la plupart des pompes à chaleur
          air-air sont <strong>réversibles</strong> : elles assurent aussi bien le chauffage
          en hiver que la climatisation en été, un double usage particulièrement appréciable
          dans les appartements situés en dernier étage ou fortement exposés au soleil. C&apos;est
          d&apos;ailleurs l&apos;un des <strong>avantages</strong> les plus recherchés par les
          copropriétaires lors d&apos;un projet d&apos;installation d&apos;une pompe à chaleur en
          milieu urbain.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Ramener de la chaleur dans un appartement mal isolé ou équipé d&apos;un chauffage
          électrique vieillissant devient également un argument de valorisation du bien lors
          d&apos;une revente ou d&apos;une mise en location, le diagnostic de performance énergétique
          étant de plus en plus scruté par les acheteurs et les locataires.
        </p>

        <ArticleStat stats={[
          { value: '3 à 4 kWh', label: 'de chaleur restitués pour 1 kWh d\'électricité consommée par une pompe à chaleur', color: 'green' },
          { value: '35-60 dB(A)', label: 'niveau sonore courant d\'une unité extérieure de pompe à chaleur à 1 mètre', color: 'blue' },
          { value: '-2 à -3 °C', label: 'température extérieure jusqu\'à laquelle une PAC aérothermique reste pleinement efficace', color: 'blue' },
        ]} />

        {/* ---- SECTION 2 : TYPES DE PAC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="types-pompes-chaleur-appartement">
          Quels types de pompes à chaleur conviennent à un appartement ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Toutes les pompes à chaleur ne se valent pas dès qu&apos;il s&apos;agit de les installer en
          habitat collectif. Le choix du bon <strong>type de pac</strong> dépend avant tout de
          la présence ou non d&apos;un espace extérieur accessible : balcon, loggia, façade ou
          toiture-terrasse. Une pompe à chaleur aérothermique — qui capte l&apos;énergie contenue
          dans l&apos;air extérieur, par opposition à un modèle géothermique puisant dans le sol —
          reste de loin la plus répandue dans un appartement en copropriété. Les modèles de
          pompes à chaleur destinés à ce type de logement sont d&apos;ailleurs conçus pour être
          plus compacts que ceux prévus pour une maison individuelle.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Parmi les pompes à chaleur aérothermiques, on distingue deux grandes familles : les
          PAC air-air, qui diffusent directement l&apos;air chauffé dans les pièces, et les PAC
          air-eau, qui alimentent un circuit hydraulique existant. Certaines pompes à chaleur,
          dites monoblocs, regroupent en plus tous les composants techniques dans une seule
          unité extérieure compacte, ce qui peut convenir à un appartement où l&apos;espace
          disponible est très limité.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Pompe à chaleur air-air : la plus simple à installer
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>pompe à chaleur air-air</strong> reste le choix le plus répandu pour un
          appartement. Elle se compose d&apos;une <strong>unité extérieure</strong> compacte,
          fixée sur un balcon, une façade ou un mur à l&apos;aide d&apos;un support mural, et d&apos;une
          ou plusieurs <strong>unités intérieures</strong> diffusant l&apos;air chaud (ou frais)
          dans les pièces à vivre. Facile à installer et relativement peu coûteuse, une
          <strong> pompe à chaleur air-air peut</strong> être posée en une à deux journées par
          un professionnel certifié, sans travaux lourds sur le bâti.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Pompe à chaleur air-eau : pour un chauffage central ou un plancher chauffant
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si votre appartement dispose d&apos;un <strong>circuit de chauffage</strong> central à
          eau — radiateurs classiques ou <strong>plancher chauffant</strong> — et que vous
          souhaitez remplacer une chaudière individuelle au gaz ou au fioul, la <strong>pac
          air-eau</strong> est la solution la plus cohérente. Elle capte la <strong>chaleur de
          l&apos;air extérieur</strong> pour alimenter le circuit existant et assurer également la
          <strong> production d&apos;eau chaude sanitaire</strong>, sans changer les émetteurs de
          chaleur déjà en place dans le logement.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-air-eau-appartement-unite-murale.jpeg"
          alt="Unité extérieure d'une pompe à chaleur air-eau fixée au mur d'un immeuble pour alimenter un circuit de chauffage central en appartement"
          imagePosition="right"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Pompe à chaleur géothermique et solutions sans unité extérieure
          </h3>
          <p className="text-slate-700 leading-relaxed">
            La <strong>pompe à chaleur géothermique</strong>, qui capte les calories du sol via
            des capteurs enterrés, est quasiment inenvisageable à l&apos;échelle d&apos;un seul
            appartement : elle reste réservée aux réseaux de chaleur collectifs desservant
            l&apos;ensemble d&apos;un immeuble ou d&apos;un quartier.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pour un appartement <strong>sans unité extérieure</strong> possible — pas de
            balcon, pas d&apos;accès en façade — il existe des pompes à chaleur qui captent les
            <strong> calories</strong> directement dans l&apos;air extrait par la ventilation
            mécanique du logement avant de le rejeter à l&apos;extérieur. Moins puissantes,
            elles permettent malgré tout de réaliser de vraies économies d&apos;énergie sans
            aucun équipement visible depuis la rue.
          </p>
        </ArticleImageSection>

        <ArticleTable {...TYPES_PAC_APPART_TABLE} title="Comparatif des types de pompes à chaleur pour un appartement en 2026" />

        <ArticleCallout type="info" title="Comment fonctionne une pompe à chaleur ?">
          <p>
            Toutes les <strong>pompes à chaleur fonctionnent</strong> selon le même principe :
            un fluide frigorigène capte les calories de l&apos;air (ou du sol, ou de l&apos;eau),
            s&apos;évapore à basse température, puis est comprimé pour élever fortement sa
            température. Cette chaleur est ensuite cédée au circuit de <strong>chauffage</strong>{' '}
            ou à l&apos;air intérieur via l&apos;<strong>unité intérieure</strong>, avant que le fluide
            ne reparte capter de nouvelles calories. Ce cycle permet à une pompe à chaleur de
            produire 3 à 4 kWh de chaleur pour seulement 1 kWh d&apos;électricité consommée.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : COPROPRIETE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="copropriete-installation-pac">
          Installer une pompe à chaleur en appartement : l&apos;accord de la copropriété
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Dès qu&apos;une <strong>installation d&apos;une pompe à chaleur</strong> touche une façade,
          une toiture, un mur porteur ou toute autre partie commune de l&apos;<strong>immeuble</strong>,
          l&apos;<strong>accord de la copropriété</strong> devient une étape obligatoire. Le
          <strong> syndicat de copropriété</strong> doit être saisi, et le projet est
          généralement soumis au vote de l&apos;assemblée générale des copropriétaires, à la
          majorité définie par le règlement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le règlement de copropriété peut également imposer des contraintes esthétiques
          précises : couleur de l&apos;unité extérieure, habillage obligatoire, emplacement
          limité à certaines zones de la façade. Ces exigences, souvent méconnues avant
          d&apos;installer une pompe à chaleur, doivent être anticipées dès la phase de devis
          pour éviter tout blocage de dernière minute.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-appartement-unite-exterieure-facade-balcon.jpg"
          alt="Unité extérieure d'une pompe à chaleur fixée sur un support mural en façade, à côté d'un balcon avec store, en appartement"
          imagePosition="left"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Les règles d&apos;urbanisme à vérifier avant d&apos;installer une pompe
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Au-delà de la copropriété, <strong>les règles d&apos;urbanisme</strong> de votre
            commune peuvent également s&apos;appliquer, en particulier si l&apos;unité extérieure
            est visible depuis la rue ou si l&apos;immeuble se trouve dans un secteur protégé
            (abords de monument historique, site patrimonial remarquable). Une <strong>
            déclaration préalable de travaux</strong> en mairie est fréquemment exigée avant
            tout <strong>projet d&apos;installation d&apos;une pompe</strong> à chaleur en façade.
          </p>
        </ArticleImageSection>

        <ArticleCallout type="warning" title="Ne commandez pas votre PAC avant ces deux accords">
          <p>
            Avant d&apos;installer une pompe à chaleur en appartement, obtenez systématiquement
            l&apos;accord écrit de la copropriété et vérifiez si une <strong>déclaration préalable
            de travaux</strong> est requise par votre mairie. Un chantier réalisé sans ces
            autorisations expose le copropriétaire à une remise en état à ses frais, même si
            l&apos;installation elle-même est techniquement irréprochable.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : BRUIT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="nuisance-sonore-unite-exterieure">
          Nuisance sonore : où installer l&apos;unité extérieure sur un balcon ou une façade ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          En habitat collectif, la <strong>nuisance sonore</strong> reste la première source
          de tension entre voisins autour d&apos;une pompe à chaleur. Une <strong>unité
          extérieure</strong> bien choisie et bien installée affiche pourtant un niveau
          sonore comparable à celui d&apos;un réfrigérateur, entre 35 et 60 dB(A) à 1 mètre.
          Le problème vient presque toujours de l&apos;emplacement : orientation directe vers
          une fenêtre de chambre, absence de plots anti-vibratiles, ou fixation mal réalisée
          sur une paroi qui amplifie les vibrations.
        </p>

        <ArticleFullImage
          image="/images/blog/pompe-a-chaleur-appartement-unite-exterieure-compacte-support-mural.jpeg"
          alt="Unité extérieure compacte d'une pompe à chaleur fixée sur un support mural métallique dans un passage étroit entre deux bâtiments"
          caption="Un support mural avec plots anti-vibratiles limite la transmission des vibrations à la structure du bâtiment, réduisant la nuisance sonore perçue par le voisinage."
        />

        <p className="text-slate-700 leading-relaxed mb-6">
          Notre article dédié au{' '}
          <Link href="/blog/pompe-a-chaleur-et-bruit" className="text-emerald-700 font-semibold hover:underline">
            bruit d&apos;une pompe à chaleur
          </Link>{' '}
          détaille la réglementation applicable et les solutions concrètes pour limiter la
          gêne sonore, un point que tout syndicat de copropriété examine avant de valider un
          projet d&apos;installation en façade.
        </p>

        {/* ---- SECTION 5 : ETAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="etapes-installer-pac-appartement">
          Comment installer une pompe à chaleur en appartement : les 7 étapes clés
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>Avant d&apos;installer une pompe à chaleur</strong> dans votre appartement,
          suivre ces étapes dans l&apos;ordre permet d&apos;éviter la plupart des blocages
          administratifs ou techniques rencontrés en habitat collectif. Installer une PAC
          dans un appartement suit une logique différente de celle d&apos;une maison : sur ce
          type de projet, les PAC les plus simples à faire accepter par une copropriété
          restent les modèles compacts, discrets et faciles à installer.
        </p>

        <ArticleSteps steps={STEPS_PAC_APPART} />

        {/* ---- SECTION 6 : PRIX ET AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="prix-aides-pac-appartement">
          Prix d&apos;une pompe à chaleur pour appartement et aides financières 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le prix d&apos;une pompe à chaleur pour appartement dépend avant tout du type
          d&apos;équipement choisi. Une PAC air-air mono-split reste la solution la plus
          accessible, tandis qu&apos;une pompe à chaleur air-eau remplaçant une chaudière
          centrale demande un budget plus conséquent, notamment lorsque le raccordement au
          circuit de chauffage existant nécessite des adaptations.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Bonne nouvelle : <strong>les aides financières</strong> disponibles en 2026
          s&apos;appliquent aussi bien à un projet individuel qu&apos;à un projet collectif porté
          par le syndicat de copropriété, via le dispositif MaPrimeRénov&apos; Copropriétés.
        </p>

        <ArticleTable {...AIDES_PAC_APPART_TABLE} title="Aides cumulables pour l'installation d'une pompe à chaleur en appartement en 2026" />

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION_PAC_APPART.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION_PAC_APPART.lines.map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                <span className="text-slate-700">{line.label}</span>
                <span className={`font-semibold text-lg ${line.isDeduction ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {line.amount}
                </span>
              </div>
            ))}
            <div className="border-t-2 border-emerald-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-900 text-xl">{EXAMPLE_CALCULATION_PAC_APPART.total.label}</span>
              <span className="font-bold text-emerald-900 text-3xl">{EXAMPLE_CALCULATION_PAC_APPART.total.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Économies annuelles</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION_PAC_APPART.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION_PAC_APPART.roi}</p>
            </div>
          </div>
        </div>

        <ArticleCallout type="success" title="Un dossier d'aides géré de A à Z">
          <p>
            Que votre projet d&apos;<strong>installation de pompe à chaleur</strong> soit
            individuel ou porté par le syndicat de copropriété, un artisan certifié RGE
            QualiPAC peut monter et déposer l&apos;ensemble des dossiers d&apos;aides financières
            à votre place — MaPrimeRénov&apos;, CEE et éco-PTZ — pour sécuriser le montant du
            reste à charge avant même le début des travaux.
          </p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Étude de faisabilité gratuite pour votre pompe à chaleur en appartement"
          description="Nos artisans certifiés RGE QualiPAC étudient l'emplacement possible de l'unité extérieure, préparent le dossier pour la copropriété et gèrent vos aides financières de A à Z."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Questions fréquentes — pompe à chaleur pour appartement</h2>
        <div className="space-y-4 my-8">
          {FAQ_ITEMS_PAC_APPART.map((faq, i) => (
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
        <ArticleSources sources={SOURCES_PAC_APPART} />

        {/* ---- LIENS INTERNES ---- */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/services/pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Installation de pompe à chaleur — Devis gratuit
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/pompe-a-chaleur-et-bruit"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur et bruit : causes, niveau sonore et solutions
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
              Puissance pompe à chaleur : comment calculer et choisir ?
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
              Demander une étude pour votre appartement
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
