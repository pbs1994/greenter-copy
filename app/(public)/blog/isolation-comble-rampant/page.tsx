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
  ARTICLE_META, SIGNES_TABLE, DIAGNOSTIC_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-comble-rampant'

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
      url: 'https://www.greenter.fr/images/blog/isolation-comble-rampant-pose-technicien-laine-roche.jpg',
      width: 1600,
      height: 1067,
      alt: "Technicien posant un panneau de laine de roche entre les chevrons d'un rampant de toiture — isolation comble rampant",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-comble-rampant-pose-technicien-laine-roche.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Isolation comble rampant', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationCombleRampant() {
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
        image="https://www.greenter.fr/images/blog/isolation-comble-rampant-pose-technicien-laine-roche.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2600}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-comble-rampant-pose-technicien-laine-roche.jpg"
        heroAlt="Technicien en combinaison de protection posant un panneau de laine de roche entre les chevrons d'un comble rampant, panneaux empilés au sol"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Contrairement à une idée reçue, avoir des combles « isolés » ne signifie pas
            automatiquement que l&apos;<strong>isolation du comble rampant</strong> remplit
            correctement son rôle. Avec le temps, un isolant se tasse, un pare-vapeur se
            déchire, et des ponts thermiques apparaissent aux jonctions — autant de défauts
            invisibles au premier coup d&apos;œil, mais qui se traduisent concrètement par une
            paroi froide au toucher, des factures de chauffage en hausse, voire des traces
            d&apos;humidité sur les rampants.
          </p>
          <p>
            Ce guide adopte une approche différente des guides classiques sur l&apos;isolation
            des rampants : il ne s&apos;agit pas ici de partir de zéro, mais d&apos;apprendre à{' '}
            <strong>diagnostiquer une isolation comble rampant défaillante</strong>,
            comprendre ses causes les plus fréquentes, et savoir si un simple complément
            suffit ou si une reprise complète s&apos;impose.
          </p>
          <p>
            Si vous partez d&apos;un chantier neuf et cherchez plutôt à choisir un isolant, une
            épaisseur ou une méthode de pose, notre{' '}
            <Link href="/blog/isolation-rampants-de-toiture" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              guide complet de l&apos;isolation des rampants de toiture
            </Link>{' '}
            couvre ce sujet en détail. Ici, nous nous concentrons sur le diagnostic et la
            correction d&apos;une <strong>isolation comble rampant</strong> déjà en place mais
            insuffisante.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Les signes qui révèlent une isolation comble rampant défaillante</li>
            <li>Les points faibles les plus fréquents : ponts thermiques, pare-vapeur, épaisseur</li>
            <li>Comment décider entre complément d&apos;isolation et dépose totale</li>
            <li>Le budget à prévoir pour une reprise, selon son ampleur</li>
            <li>5 étapes pour diagnostiquer puis corriger le problème</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI MAL ISOLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation comble rampant : pourquoi cette zone reste souvent mal isolée
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>rampant de toiture</strong> — la partie inclinée de la charpente qui suit
          la pente du toit — est une zone technique plus complexe à isoler qu&apos;un simple
          plancher de combles perdus. Contrairement aux combles perdus, où l&apos;isolant est
          simplement déroulé ou soufflé à plat, l&apos;<strong>isolation comble rampant</strong>{' '}
          doit tenir en place verticalement ou en pente entre les chevrons, intégrer un
          pare-vapeur continu, et composer avec de nombreux points singuliers : fenêtres de
          toit, jonctions avec les pignons, arrivée de conduits.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Cette complexité explique pourquoi une part importante des isolations de rampants
          réalisées il y a 15 ou 20 ans présente aujourd&apos;hui des défauts : épaisseurs
          d&apos;isolant devenues insuffisantes au regard des exigences actuelles, pare-vapeur
          de mauvaise qualité ou mal posé, jonctions jamais traitées correctement. Résultat :
          des combles aménagés qui restent inconfortables malgré un isolant visiblement en
          place.
        </p>

        <ArticleStat stats={[
          { value: '25–30 %', label: 'des déperditions de chaleur d\'une maison passent par la toiture', color: 'blue' },
          { value: 'R ≥ 6', label: 'résistance thermique minimale exigée en 2026 pour les rampants (m².K/W)', color: 'green' },
          { value: '15–20 ans', label: 'durée de vie moyenne avant qu\'une isolation de rampant montre ses limites', color: 'amber' },
        ]} />

        {/* ---- SECTION 2 : COMMENT SAVOIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment savoir si l&apos;isolation de vos rampants de combles est insuffisante ?
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les signes qui ne trompent pas
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Plusieurs indices simples permettent de suspecter une <strong>isolation comble
          rampant</strong> défaillante sans matériel spécifique. Posez la main sur la paroi du
          rampant en hiver : si elle est nettement plus froide que les autres murs de la
          pièce, l&apos;isolant en place ne joue plus pleinement son rôle. Une sensation de
          courant d&apos;air localisé, souvent près des jonctions ou des fenêtres de toit,
          trahit un pont thermique non traité.
        </p>

        <ArticleTable {...SIGNES_TABLE} title="Signes d'une isolation comble rampant défaillante et leurs causes probables" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le diagnostic thermique : comment le faire réaliser
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Au-delà des signes visuels, un diagnostic thermique réalisé par un professionnel
          permet de quantifier précisément la performance réelle de l&apos;
          <strong>isolation comble rampant</strong> existante. Par caméra thermique, les zones
          de déperdition apparaissent sous forme de taches froides bien identifiables — un
          moyen efficace de distinguer un simple manque d&apos;épaisseur d&apos;un véritable
          défaut de pose localisé. Cette étape est également recommandée avant tout{' '}
          <Link href="/services/audit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            audit énergétique
          </Link>{' '}
          global du logement.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-comble-rampant-defaillante-diagnostic.jpg"
          alt="Comble aménagé avec une ancienne isolation en laine de verre présentant des zones incomplètes et un pare-vapeur endommagé, charpente et conduit de cheminée apparents"
          caption="Une isolation comble rampant ancienne peut présenter des zones incomplètes, un pare-vapeur endommagé ou des lés mal jointés — autant de défauts qui réduisent fortement la performance réelle malgré une épaisseur d'isolant apparemment correcte."
        />

        {/* ---- SECTION 3 : POINTS FAIBLES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les points faibles typiques d&apos;une isolation comble rampant mal réalisée
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Ponts thermiques aux jonctions rampant/plafond et rampant/mur
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Les jonctions entre le rampant et le plafond horizontal, entre le rampant et les
          murs de pignon, ou autour des solives de plancher sont les zones les plus
          fréquemment négligées lors d&apos;une pose initiale peu soignée. L&apos;isolant
          s&apos;interrompt ou se comprime à ces endroits, créant un pont thermique localisé
          qui laisse passer le froid en continu, même si le reste du rampant est
          correctement isolé.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Pare-vapeur mal posé ou absent
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Sur les <strong>isolations de rampants</strong> anciennes, le pare-vapeur est
          parfois totalement absent, ou posé avec des lés qui se chevauchent insuffisamment
          et ne sont pas scotchés aux jonctions. La vapeur d&apos;eau produite dans le
          logement (cuisine, salle de bain, respiration) migre alors dans l&apos;isolant, où
          elle se condense au contact de la toiture froide — un phénomène qui dégrade
          l&apos;isolant et peut favoriser le développement de moisissures sur le long terme.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Épaisseur insuffisante par rapport aux exigences actuelles
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Les seuils de résistance thermique ont sensiblement évolué : une isolation posée
          conforme aux normes des années 2000 est aujourd&apos;hui largement insuffisante.
          En 2026, MaPrimeRénov&apos; exige une résistance thermique R ≥ 6 m².K/W pour les
          rampants de combles aménagés, ce qui correspond à environ 220 à 280 mm d&apos;isolant
          selon le matériau — une épaisseur rarement atteinte par les isolations d&apos;origine
          des logements construits ou rénovés il y a quinze ou vingt ans.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-comble-rampant-reprise-panneaux-neufs.jpg"
          alt="Rampant de toiture fraîchement isolé avec des panneaux à parement kraft entre les chevrons, comble aménagé en cours de rénovation"
          imagePosition="right"
        >
          <p>
            Lors d&apos;une <strong>reprise d&apos;isolation comble rampant</strong>, poser un
            isolant complémentaire avec pare-vapeur intégré (parement kraft) au-dessus de
            l&apos;ancien matériau est souvent la solution la plus rapide, à condition que
            l&apos;isolant existant soit sec et en bon état. Cette technique permet
            d&apos;atteindre la résistance thermique cible sans dépose complète.
          </p>
          <p className="mt-3">
            Le choix de l&apos;isolant complémentaire — laine de verre, laine de roche ou
            ouate de cellulose — suit les mêmes critères que pour une isolation neuve, détaillés
            dans notre guide sur l&apos;
            <Link href="/blog/isolation-par-laine-de-roche" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              isolation par laine de roche
            </Link>.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Ventilation de la lame d&apos;air sous toiture négligée
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Une lame d&apos;air ventilée doit impérativement subsister entre l&apos;isolant et
          l&apos;écran de sous-toiture, pour évacuer l&apos;humidité résiduelle et éviter la
          surchauffe estivale. Lorsqu&apos;un isolant complémentaire est ajouté sans respecter
          cet espace, la ventilation se retrouve obstruée — un défaut fréquent lors des
          reprises réalisées sans étude préalable, qui peut favoriser la condensation côté
          couverture.
        </p>

        {/* ---- SECTION 4 : REPRISE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Reprendre une isolation comble rampant existante : par-dessus ou en dépose totale ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La décision entre un simple <strong>complément d&apos;isolation</strong> et une{' '}
          <strong>dépose totale</strong> dépend directement de l&apos;état constaté lors du
          diagnostic. Si l&apos;isolant existant est sec, non tassé et sans trace de
          moisissure, poser un isolant complémentaire par-dessus — avec un nouveau
          pare-vapeur continu — permet d&apos;atteindre la résistance thermique cible pour un
          coût raisonnable, sans chantier lourd.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          En revanche, si le pare-vapeur est défaillant, l&apos;isolant humide, tassé ou
          contaminé, une <strong>dépose complète</strong> s&apos;impose avant repose. Ajouter
          un isolant neuf par-dessus un matériau humide reviendrait à emprisonner
          l&apos;humidité existante, aggravant le problème au lieu de le résoudre. Ce chantier,
          plus lourd, implique le déplâtrage des finitions existantes, l&apos;évacuation de
          l&apos;ancien isolant et la remise en état complète du rampant.
        </p>

        <ArticleSteps steps={DIAGNOSTIC_STEPS} />

        {/* ---- SECTION 5 : FENETRES DE TOIT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation comble rampant et fenêtres de toit : un point de vigilance souvent oublié
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les fenêtres de toit constituent presque systématiquement un point faible de
          l&apos;<strong>isolation comble rampant</strong>, car leur pourtour est difficile à
          isoler avec la même continuité que le reste du rampant. Un kit d&apos;isolation
          spécifique, vendu par la plupart des fabricants de fenêtres de toit, doit envelopper
          le tunnel entre le châssis et la charpente — une étape souvent négligée lors des
          poses anciennes, ou mal réalisée si le kit d&apos;origine n&apos;a pas été
          respecté.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-comble-rampant-fenetre-toit-velux.jpg"
          alt="Rampant de toiture isolé en laine de roche autour d'une fenêtre de toit, avec panneaux d'isolant complémentaire empilés en attente de pose"
          imagePosition="left"
        >
          <p>
            Lors d&apos;un diagnostic, vérifiez particulièrement les quatre côtés du tunnel
            d&apos;isolation autour de chaque fenêtre de toit : un simple bourrage de laine
            minérale sans kit dédié laisse presque toujours un pont thermique, reconnaissable
            à une sensation de fraîcheur localisée juste sous la fenêtre en hiver.
          </p>
          <p className="mt-3">
            Une reprise complète de l&apos;<strong>isolation comble rampant</strong> autour
            d&apos;une fenêtre de toit est l&apos;occasion idéale de vérifier également
            l&apos;étanchéité à l&apos;air du raccord entre le châssis et la couverture,
            souvent source d&apos;infiltrations d&apos;air indépendamment de la seule question
            thermique.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 6 : BUDGET ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel budget pour reprendre une isolation comble rampant défaillante ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le budget d&apos;une reprise d&apos;<strong>isolation comble rampant</strong> varie
          fortement selon l&apos;ampleur des travaux nécessaires. Un simple complément posé
          par-dessus un isolant existant en bon état coûte généralement entre 20 et 35 €/m²,
          fourniture et pose comprises. Une reprise complète, avec dépose de l&apos;ancien
          isolant, traitement des ponts thermiques et repose de finitions en placo, se situe
          plutôt entre 50 et 85 €/m² — un niveau de prix comparable à une isolation neuve de
          rampants, détaillé dans notre{' '}
          <Link href="/blog/isolation-rampants-de-toiture" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            guide sur l&apos;isolation des rampants de toiture
          </Link>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour une vision plus large du budget d&apos;un projet de rénovation des combles,
          notre guide sur le{' '}
          <Link href="/blog/prix-d-une-isolation-des-combles" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            prix d&apos;une isolation des combles
          </Link>{' '}
          détaille des exemples chiffrés complets, incluant la composition d&apos;un devis
          poste par poste.
        </p>

        {/* ---- SECTION 7 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Aides financières pour la reprise d&apos;isolation comble rampant
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Bonne nouvelle : la reprise d&apos;une <strong>isolation comble rampant</strong>{' '}
          existante est éligible aux mêmes aides qu&apos;une isolation neuve. MaPrimeRénov&apos;
          finance ces travaux dès lors que la résistance thermique atteinte après
          intervention est au moins égale à R ≥ 6 m².K/W, et que l&apos;artisan est certifié
          RGE. S&apos;ajoutent les primes CEE (Coup de pouce isolation) et la TVA réduite à
          5,5 %, qui s&apos;appliquent automatiquement sur l&apos;ensemble de la facture.
        </p>

        <ArticleCallout type="tip" title="Ne pas oublier l'attestation avant travaux">
          <p>
            Comme pour une isolation neuve, le dossier d&apos;aides doit impérativement être
            déposé et validé avant le début des travaux de reprise. Un artisan RGE sérieux
            prend en charge cette démarche pour vous, et vous remet en fin de chantier une
            attestation mentionnant la résistance thermique atteinte — un document
            indispensable pour percevoir MaPrimeRénov&apos;.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 8 : CHOISIR ARTISAN ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment choisir un artisan pour diagnostiquer et reprendre l&apos;isolation de vos rampants ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Privilégiez un artisan qui propose une véritable visite de diagnostic avant de
          chiffrer les travaux, plutôt qu&apos;un devis établi à distance sur simple
          déclaration de surface. Un professionnel sérieux doit être en mesure d&apos;expliquer
          précisément l&apos;origine du défaut constaté — pont thermique, pare-vapeur
          défaillant, épaisseur insuffisante — avant de proposer une solution adaptée plutôt
          qu&apos;une reprise systématique et coûteuse.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La certification <strong>RGE</strong> reste indispensable pour bénéficier des aides
          financières, quelle que soit l&apos;ampleur de la reprise. Si votre projet de
          rénovation des combles dépasse la seule question de l&apos;isolation des rampants,
          pensez également à vérifier l&apos;état de votre{' '}
          <Link href="/blog/isolation-mur-interieur-quelle-epaisseur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            isolation des murs
          </Link>{' '}
          et de votre système de ventilation, deux postes souvent liés aux mêmes désordres
          d&apos;humidité constatés dans les combles aménagés.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Diagnostic gratuit de votre isolation comble rampant en Île-de-France"
          description="Nos artisans certifiés RGE réalisent le diagnostic de vos rampants, identifient la cause exacte du défaut constaté et vous proposent la solution la plus adaptée — complément ou reprise complète. Devis gratuit sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation comble rampant
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
            href="/blog/isolation-rampants-de-toiture"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide complémentaire</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation rampants de toiture — guide complet
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/services/isolation"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation thermique en Île-de-France
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir le service <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/isolation-par-laine-de-roche"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation par laine de roche
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/prix-d-une-isolation-des-combles"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une isolation des combles
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Diagnostic et reprise d&apos;isolation par ville en Île-de-France
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
                href={`/services/isolation/${city.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Isolation {city.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

      </ArticleLayout>
    </>
  )
}
