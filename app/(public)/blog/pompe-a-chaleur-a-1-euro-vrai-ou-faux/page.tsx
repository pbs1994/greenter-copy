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
  ARTICLE_META, AIDES_REELLES_TABLE, SIGNAUX_ALERTE,
  EXAMPLE_CALCULATION, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pompe-a-chaleur-1-euro-vrai-ou-faux'

export const metadata: Metadata = {
  title: "Pompe à chaleur à 1 euro : vrai ou faux ? Le guide complet 2026 | Greenter",
  description:
    "Pompe à chaleur à 1 euro : vrai ou faux ? La réponse est non. Découvrez l'origine de ce mythe, les vraies aides MaPrimeRénov' 2026, le reste à charge réel et les signaux d'alerte pour éviter les arnaques à la rénovation énergétique.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Pompe à chaleur à 1 euro : vrai ou faux ? Le guide complet 2026",
    description:
      "Décryptage complet : origine du mythe de la pompe à chaleur à 1 euro, vraies aides 2026, reste à charge réel et signaux d'alerte pour repérer une arnaque.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/pompe-a-chaleur-1-euro-vrai-ou-faux-hero-dossier-unite-exterieure.webp',
      width: 1200,
      height: 800,
      alt: "Unité extérieure de pompe à chaleur et dossier de devis posés sur une table de jardin, illustrant la question pompe à chaleur à 1 euro vrai ou faux",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pompe à chaleur à 1 euro : vrai ou faux ? Le guide complet 2026",
    description:
      "Origine du mythe, vraies aides MaPrimeRénov' 2026, reste à charge réel et signaux d'alerte pour éviter les arnaques.",
    images: ['https://www.greenter.fr/images/blog/pompe-a-chaleur-1-euro-vrai-ou-faux-hero-dossier-unite-exterieure.webp'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Pompe à chaleur à 1 euro : vrai ou faux', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PompeAChaleurA1EuroVraiOuFaux() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Pompe à chaleur à 1 euro : vrai ou faux ? Le guide complet 2026"
        description="Décryptage du mythe de la pompe à chaleur à 1 euro : origine de l'expression, vraies aides MaPrimeRénov' 2026, reste à charge réel et signaux d'alerte pour repérer une arnaque à la rénovation énergétique."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/pompe-a-chaleur-1-euro-vrai-ou-faux-hero-dossier-unite-exterieure.webp"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2700}
      />

      <ArticleLayout
        title="Pompe à chaleur à 1 euro : vrai ou faux ? Le guide complet 2026"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/pompe-a-chaleur-1-euro-vrai-ou-faux-hero-dossier-unite-exterieure.webp"
        heroAlt="Unité extérieure de pompe à chaleur et dossier de devis posés sur une table de jardin, illustrant la question pompe à chaleur à 1 euro vrai ou faux"
        breadcrumbs={breadcrumbs}
      >
        {/* ── INTRO ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Vous avez reçu un appel, un SMS ou vu une publicité vantant une{' '}
            <strong>pompe à chaleur à 1 euro</strong> ? Vous n&apos;êtes pas seul : cette
            promesse revient régulièrement dans les campagnes de démarchage, et beaucoup de
            propriétaires se demandent légitimement si elle est <strong>vraie ou fausse</strong>.
            La question mérite une réponse claire, car derrière cette accroche se cache l&apos;une
            des <strong>arnaques</strong> les plus documentées de la <strong>rénovation
            énergétique</strong> en France.
          </p>
          <p>
            Ce guide répond en détail à la question <strong>pompe à chaleur à 1 euro vrai ou
            faux</strong> : d&apos;où vient cette expression, quelles sont les <strong>vraies
            aides de l&apos;État</strong> disponibles en 2026 pour financer une{' '}
            <strong>pompe à chaleur</strong>, quel est le <strong>reste à charge</strong> réel
            après cumul des aides, et surtout, comment reconnaître une offre frauduleuse avant
            de signer quoi que ce soit.
          </p>
          <p>
            Si vous envisagez un projet de <strong>pompe à chaleur</strong>, ce guide vous
            permettra de distinguer un discours commercial trompeur d&apos;un{' '}
            <strong>devis</strong> sérieux établi par un <strong>artisan RGE</strong>, et
            d&apos;éviter de tomber dans le piège d&apos;une <strong>fraude</strong> qui a déjà
            coûté cher à des milliers de ménages français.
          </p>
        </div>

        <ArticleCallout type="success" title="La réponse courte : c'est FAUX">
          <p>
            Il n&apos;existe, en 2026, <strong>aucun dispositif public</strong> permettant
            d&apos;installer une pompe à chaleur pour 1 euro symbolique. Les{' '}
            <strong>aides financières</strong> cumulées (MaPrimeRénov&apos;, Coup de pouce CEE,
            TVA réduite) peuvent réduire fortement la facture, mais un{' '}
            <strong>reste à charge</strong> de plusieurs milliers d&apos;euros subsiste
            toujours, y compris pour les ménages aux revenus les plus modestes.
          </p>
        </ArticleCallout>

        {/* ── SECTION 1 : ORIGINE DU MYTHE ───────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          D&apos;où vient le mythe de la pompe à chaleur à 1 euro ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;expression <strong>pompe à chaleur à 1 euro</strong> tire son origine d&apos;un
          autre dispositif, bien réel celui-là, mais qui ne concernait pas les pompes à
          chaleur : l&apos;<strong>isolation à 1 euro</strong>. Lancé en 2016 dans le cadre des{' '}
          <strong>Certificats d&apos;Économies d&apos;Énergie</strong> (CEE), ce programme
          permettait aux ménages aux revenus très modestes de faire isoler leurs combles ou
          leur plancher pour un euro symbolique, grâce au cumul des primes énergie versées par
          les fournisseurs d&apos;énergie.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Ce dispositif a rapidement attiré des sociétés peu scrupuleuses, qui ont multiplié
          les <strong>démarchages téléphoniques</strong> agressifs, les travaux bâclés et les
          <strong> fraudes</strong> aux aides publiques. Le scandale de l&apos;isolation à 1
          euro a été si massif qu&apos;il a fait l&apos;objet de multiples reportages, d&apos;
          enquêtes parlementaires et d&apos;un durcissement réglementaire. Des démarcheurs ont
          ensuite <strong>recyclé cette accroche</strong> pour d&apos;autres équipements,
          notamment la <strong>pompe à chaleur</strong>, alors qu&apos;aucun texte officiel n&apos;a
          jamais prévu de « PAC à 1 euro ». L&apos;expression est donc, pour les pompes à
          chaleur, un <strong>argument commercial trompeur</strong> plutôt qu&apos;un vrai
          dispositif d&apos;aide.
        </p>

        <ArticleStat stats={[
          { value: 'FAUX', label: 'aucune pompe à chaleur à 1 euro n\'existe légalement en 2026', color: 'red' },
          { value: '2016', label: 'année de lancement du dispositif « isolation à 1 euro » (CEE)', color: 'amber' },
          { value: '2023', label: 'interdiction totale du démarchage téléphonique en rénovation énergétique', color: 'blue' },
        ]} />

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Pompe à chaleur à 1 euro et isolation à 1 euro : ne pas confondre les deux
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour comprendre la différence entre une offre légitime et un abus de langage
          commercial, il faut distinguer deux choses : les aides réellement cumulables sur des
          travaux d&apos;<strong>isolation thermique</strong>, qui peuvent effectivement
          atteindre un reste à charge très faible dans des cas très spécifiques (revenus très
          modestes, combles perdus), et le financement d&apos;une <strong>pompe à chaleur</strong>,
          un équipement bien plus coûteux dont le prix ne peut jamais être ramené à 1 euro,
          quel que soit le niveau de revenus. Notre article sur le{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 font-semibold hover:underline">
            prix réel d&apos;une pompe à chaleur en 2026
          </Link>{' '}
          détaille l&apos;ensemble des coûts et aides disponibles.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La différence de coût entre les deux types de travaux explique une grande partie de
          la confusion. Isoler des combles perdus coûte en moyenne 20 à 30 € du m², soit
          quelques centaines d&apos;euros pour une maison standard : un cumul d&apos;aides
          généreux peut donc, dans de rares cas, couvrir la quasi-totalité de la facture.
          Une <strong>pompe à chaleur air-eau</strong>, elle, coûte entre 10 000 et 18 000 €
          matériel et pose compris — un montant sans commune mesure, qu&apos;aucune addition
          d&apos;<strong>aides financières</strong> ne peut ramener à 1 euro. C&apos;est
          précisément cette différence d&apos;échelle que les démarcheurs peu scrupuleux
          exploitent en réutilisant, hors contexte, une accroche qui n&apos;a jamais été conçue
          pour les équipements de chauffage.
        </p>

        {/* ── SECTION 2 : VRAIES AIDES ───────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les vraies aides pour une pompe à chaleur en 2026
        </h2>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-1-euro-installation-unite-exterieure-maison-moderne.jpeg"
          alt="Unité extérieure de pompe à chaleur installée contre une façade blanche moderne, entourée d'une haie de thuyas"
          imagePosition="right"
        >
          <p>
            Contrairement à la promesse d&apos;une <strong>pompe à chaleur à 1 euro</strong>,
            les <strong>vraies aides de l&apos;État</strong> fonctionnent par cumul de
            plusieurs dispositifs distincts, appliqués sur un <strong>devis réel</strong>{' '}
            établi par un artisan certifié <strong>RGE</strong> (Reconnu Garant de
            l&apos;Environnement) : <strong>MaPrimeRénov&apos;</strong>, le{' '}
            <strong>Coup de pouce chauffage</strong> (financé par les CEE) et la{' '}
            <strong>TVA réduite</strong> à 5,5 % sur le matériel et la main-d&apos;œuvre.
          </p>
          <p className="mt-3">
            Le montant de MaPrimeRénov&apos; dépend directement des{' '}
            <strong>revenus du ménage</strong>, classés en quatre catégories (Bleu, Jaune,
            Violet, Rose). Pour une <strong>PAC air-eau</strong>, seules les trois premières
            catégories restent éligibles en 2026, la catégorie Rose (revenus supérieurs)
            n&apos;ouvrant droit qu&apos;au Coup de pouce CEE et à la TVA réduite.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le tableau ci-dessous détaille, pour chaque catégorie de revenus, le montant réel des
          <strong> aides financières</strong> disponibles et une estimation du{' '}
          <strong>reste à charge</strong> pour une PAC air-eau standard. Dans tous les cas de
          figure, ce reste à charge se compte en milliers d&apos;euros — jamais en euro
          symbolique.
        </p>

        <ArticleTable {...AIDES_REELLES_TABLE} title="Aides réelles et reste à charge estimé pour une pompe à chaleur air-eau en 2026" />

        <ArticleCallout type="info" title="MaPrimeRénov' est versée par l'Anah, jamais par le vendeur">
          <p>
            Une confusion fréquente entretenue par les démarcheurs consiste à présenter{' '}
            <strong>MaPrimeRénov&apos;</strong> comme une remise appliquée directement par
            l&apos;entreprise. En réalité, c&apos;est une <strong>aide de l&apos;État</strong>{' '}
            versée par l&apos;Agence nationale de l&apos;habitat (Anah), après validation du
            dossier et réalisation des travaux. Aucune entreprise privée ne peut « offrir »
            MaPrimeRénov&apos; : elle ne fait que vous accompagner dans la demande.
          </p>
        </ArticleCallout>

        {/* ── SECTION 3 : COMBIEN ÇA COÛTE VRAIMENT ──────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien coûte réellement une pompe à chaleur après aides ?
        </h2>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-1-euro-facture-calculette-compteur-energie.webp"
          alt="Calculatrice, billets d'euros et compteur d'énergie posés sur une table à côté d'une facture de chauffage, pour illustrer le calcul du reste à charge d'une pompe à chaleur"
          imagePosition="left"
        >
          <p>
            Pour se faire une idée précise du <strong>reste à charge réel</strong>, rien ne
            vaut un exemple chiffré complet, aides déduites une à une. Prenons le cas d&apos;un
            ménage classé en catégorie « très modeste » (Bleu), le profil qui bénéficie
            pourtant des <strong>aides les plus élevées</strong> du système.
          </p>
          <p className="mt-3">
            Même dans ce scénario le plus favorable, le <strong>prix</strong> final après
            cumul de <strong>toutes les aides disponibles</strong> reste de plusieurs milliers
            d&apos;euros. C&apos;est cette réalité chiffrée qui permet de démontrer, sans
            ambiguïté, qu&apos;une pompe à chaleur à 1 euro relève du mythe commercial et non
            d&apos;un dispositif public existant.
          </p>
        </ArticleImageSection>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h3 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h3>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.filter(l => l.label).map((line, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
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

        <p className="text-slate-700 leading-relaxed mb-4">
          Ce reste à charge de <strong>5 700 €</strong> concerne un ménage très modeste, dans
          le scénario le plus avantageux possible. Pour un ménage aux revenus intermédiaires ou
          supérieurs, il grimpe logiquement à 6 500, voire plus de 9 000 €. Aucune combinaison
          d&apos;aides légales ne permet de descendre en dessous de plusieurs milliers d&apos;euros
          pour l&apos;achat et la pose d&apos;une pompe à chaleur. Pour affiner votre budget selon
          votre profil et votre logement, consultez notre{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 font-semibold hover:underline">
            guide complet des prix et aides pompe à chaleur 2026
          </Link>.
        </p>

        {/* ── SECTION 4 : SIGNAUX D'ALERTE ───────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 5 signaux qui doivent vous alerter sur une arnaque à la pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au-delà de la question <strong>vrai ou faux</strong>, il est utile de savoir
          reconnaître concrètement les pratiques commerciales qui accompagnent, en général, une{' '}
          <strong>offre frauduleuse</strong> de pompe à chaleur. Ces signaux se cumulent
          souvent chez les entreprises malhonnêtes, ce qui doit renforcer la vigilance dès
          qu&apos;un ou deux d&apos;entre eux apparaissent.
        </p>

        <ArticleSteps steps={SIGNAUX_ALERTE} />

        <ArticleCallout type="warning" title="Une offre trop belle pour être vraie l'est presque toujours">
          <p>
            Si une entreprise vous affirme qu&apos;une <strong>pompe à chaleur à 1 euro</strong>{' '}
            est possible « grâce à un partenariat spécial » ou à « une aide exceptionnelle
            réservée à votre commune », méfiez-vous : aucune aide locale ou nationale ne
            fonctionne de cette manière. Vérifiez systématiquement les montants annoncés sur le
            site officiel france-renov.gouv.fr avant de signer quoi que ce soit.
          </p>
        </ArticleCallout>

        {/* ── SECTION 5 : DÉMARCHAGE INTERDIT ────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi le démarchage téléphonique est interdit depuis 2023
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Face à l&apos;ampleur des <strong>arnaques</strong> liées aux offres « à 1 euro » et
          au démarchage agressif, le législateur a fini par interdire purement et simplement le{' '}
          <strong>démarchage téléphonique</strong> pour les travaux de{' '}
          <strong>rénovation énergétique</strong>. La loi du 27 février 2023 interdit à toute
          entreprise de vous appeler sans que vous ayez donné votre accord préalable et
          explicite pour être contacté à ce sujet.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Concrètement, si vous recevez un appel non sollicité vantant une{' '}
          <strong>pompe à chaleur</strong> à prix cassé ou à 1 euro, l&apos;entreprise est déjà
          en infraction avant même d&apos;évoquer le contenu de son offre. C&apos;est l&apos;un des
          moyens les plus simples de trier, en quelques secondes, une opportunité légitime
          d&apos;une tentative de <strong>fraude</strong>. La même vigilance s&apos;applique au
          <strong> porte-à-porte</strong> non sollicité, également très encadré depuis les
          mêmes évolutions réglementaires.
        </p>

        <ArticleFullImage
          image="/images/blog/pompe-a-chaleur-1-euro-unite-exterieure-rendu-moderne.jpeg"
          alt="Pompe à chaleur moderne installée contre un mur blanc dans un jardin, illustration d'une installation conforme réalisée par un artisan RGE"
          caption="Une installation conforme passe toujours par un devis détaillé, un artisan certifié RGE et une demande d'aides déposée avant le début des travaux — jamais par une signature dans la précipitation."
        />

        {/* ── SECTION 6 : COMMENT OBTENIR UN VRAI DEVIS ──────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment obtenir un vrai devis fiable pour votre pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour vous protéger d&apos;une offre trompeuse et obtenir un{' '}
          <strong>devis gratuit</strong> réellement fiable, quelques réflexes simples suffisent.
          D&apos;abord, vérifiez systématiquement que l&apos;<strong>artisan RGE</strong> qui vous
          contacte figure bien sur l&apos;annuaire officiel disponible sur france-renov.gouv.fr :
          c&apos;est la condition indispensable pour percevoir MaPrimeRénov&apos; et le Coup de
          pouce CEE.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Ensuite, comparez toujours plusieurs devis avant de vous engager, et utilisez le{' '}
          <strong>simulateur d&apos;aides</strong> officiel pour estimer vous-même le montant
          auquel vous avez droit, indépendamment de ce qu&apos;affirme le commercial. Enfin, ne
          signez jamais un contrat ni ne versez d&apos;<strong>acompte</strong> le jour même
          d&apos;une visite commerciale : un professionnel sérieux vous laissera le temps de
          comparer et de vous informer. Notre guide sur les{' '}
          <Link href="/blog/pompe-a-chaleur-piege-a-eviter" className="text-emerald-700 font-semibold hover:underline">
            10 pièges à éviter avec une pompe à chaleur
          </Link>{' '}
          détaille d&apos;autres erreurs fréquentes, au-delà des seules arnaques commerciales.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un dernier réflexe simple protège efficacement des offres malhonnêtes : exiger que
          chaque ligne du devis soit détaillée — marque et référence du matériel, puissance en
          kW, main-d&apos;œuvre, et montant précis de chaque aide déduite. Un devis qui affiche
          directement un prix final « après aides » sans détailler le montant brut initial doit
          systématiquement éveiller les soupçons, car c&apos;est exactement la méthode utilisée
          pour dissimuler une surfacturation derrière une remise apparemment généreuse.
        </p>

        <ArticleCallout type="tip" title="Le bon réflexe : passer par un professionnel de confiance">
          <p>
            Faire appel à une entreprise établie de longue date, transparente sur ses tarifs et
            capable de justifier chaque ligne de son devis reste le meilleur rempart contre les{' '}
            <strong>arnaques</strong>. Pour un accompagnement complet sur votre projet de{' '}
            <strong>pompe à chaleur</strong> en Île-de-France, découvrez notre service{' '}
            <Link href="/services/pompe-a-chaleur" className="text-emerald-700 font-semibold hover:underline">
              installation de pompe à chaleur
            </Link>{' '}
            avec des artisans certifiés RGE.
          </p>
        </ArticleCallout>

        {/* ── SECTION 7 : QUE FAIRE SI ARNAQUE ───────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Que faire si vous avez déjà été démarché ou arnaqué ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si vous avez déjà signé un contrat à la suite d&apos;un démarchage suspect, la
          première chose à vérifier est le <strong>délai de rétractation</strong> légal de 14
          jours, qui s&apos;applique à toute vente conclue hors établissement (par téléphone, au
          domicile ou lors d&apos;un salon). Passé ce délai, il reste possible de contester le
          contrat en cas de vice du consentement ou de non-respect des obligations
          d&apos;information.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Il est également essentiel de <strong>signaler</strong> les faits sur la plateforme
          SignalConso (signal.conso.gouv.fr), gérée par la DGCCRF, qui centralise les
          réclamations des consommateurs et peut déclencher des contrôles auprès des
          entreprises concernées. En cas de <strong>crédit affecté</strong> souscrit pour
          financer les travaux, contactez également l&apos;organisme prêteur : le crédit est
          généralement lié au contrat de travaux et peut être annulé si celui-ci est résolu.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          En définitive, la question <strong>pompe à chaleur à 1 euro vrai ou faux</strong>{' '}
          appelle une réponse sans ambiguïté : c&apos;est faux. Mais les <strong>vraies
          aides</strong> disponibles en 2026 restent généreuses pour qui passe par les bons
          canaux — un <strong>artisan RGE</strong>, un <strong>devis</strong> transparent et une
          demande d&apos;aides déposée dans les règles. C&apos;est la seule voie fiable pour
          réduire durablement sa <strong>facture de chauffage</strong> sans mauvaise surprise.
        </p>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Obtenez un vrai devis gratuit pour votre pompe à chaleur en Île-de-France"
          description="Nos artisans certifiés RGE établissent un devis détaillé, sans démarchage ni pression commerciale, et vous accompagnent dans le dépôt de votre dossier MaPrimeRénov'. Devis sous 48h."
        />

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la pompe à chaleur à 1 euro
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

        {/* ── SOURCES ──────────────────────────────────────────────────────────── */}
        <ArticleSources sources={SOURCES} />

        {/* ── LIENS INTERNES ───────────────────────────────────────────────────── */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/services/pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Installation de pompe à chaleur en Île-de-France
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
              Prix d&apos;une pompe à chaleur en 2026 : coûts, aides et rentabilité
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/pompe-a-chaleur-piege-a-eviter"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur : 10 pièges à éviter en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/lp/pac"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Devis gratuit</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur — devis RGE sous 48h
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Obtenir un devis <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ──────────────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation de pompe à chaleur par ville en Île-de-France
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Ozoir-la-Ferrière", slug: "ozoir-la-ferriere" },
              { name: "Pontault-Combault", slug: "pontault-combault" },
              { name: "Roissy-en-Brie", slug: "roissy-en-brie" },
              { name: "Brie-Comte-Robert", slug: "brie-comte-robert" },
              { name: "Tournan-en-Brie", slug: "tournan-en-brie" },
              { name: "Créteil", slug: "creteil" },
              { name: "Versailles", slug: "versailles" },
              { name: "Meaux", slug: "meaux" },
              { name: "Massy", slug: "massy" },
              { name: "Vincennes", slug: "vincennes" },
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
