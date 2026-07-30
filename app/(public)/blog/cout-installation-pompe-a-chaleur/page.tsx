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
  ARTICLE_META, COUT_TABLE, CHANTIER_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/cout-installation-pompe-a-chaleur'

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
      url: 'https://www.greenter.fr/images/blog/cout-installation-pompe-a-chaleur-hero-budget.jpg',
      width: 1600,
      height: 872,
      alt: "Unité extérieure de pompe à chaleur avec tirelire en arrière-plan symbolisant le budget — coût installation pompe à chaleur",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/cout-installation-pompe-a-chaleur-hero-budget.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Coût d'installation pompe à chaleur", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function CoutInstallationPompeAChaleur() {
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
        image="https://www.greenter.fr/images/blog/cout-installation-pompe-a-chaleur-hero-budget.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2600}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/cout-installation-pompe-a-chaleur-hero-budget.jpg"
        heroAlt="Unité extérieure compacte de pompe à chaleur posée sur un support, avec une tirelire cochon floutée en arrière-plan symbolisant le budget d'installation"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Le <strong>coût d&apos;installation d&apos;une pompe à chaleur</strong> est
            souvent confondu avec le prix de l&apos;appareil lui-même — alors que ce sont
            deux postes bien distincts sur un devis. Le prix du matériel dépend du modèle et
            de sa puissance ; le <strong>coût d&apos;installation</strong>, lui, correspond à
            la main-d&apos;œuvre, aux travaux annexes et à la complexité du chantier. Pour une
            pompe à chaleur air-eau, ce coût de pose se situe généralement entre{' '}
            <strong>2 000 et 5 000 €</strong>, indépendamment du prix de l&apos;appareil.
          </p>
          <p>
            Cette distinction est essentielle pour bien lire un devis et comparer plusieurs
            propositions équitablement : deux artisans peuvent proposer un appareil
            identique à un prix comparable, tout en affichant un{' '}
            <strong>coût d&apos;installation</strong> très différent selon la complexité du
            chantier, la distance à parcourir entre les unités, ou l&apos;état de
            l&apos;installation électrique existante.
          </p>
          <p>
            Ce guide détaille précisément ce que recouvre le{' '}
            <strong>coût d&apos;installation d&apos;une pompe à chaleur</strong> : les étapes
            concrètes d&apos;un chantier, les facteurs qui font varier la facture de
            main-d&apos;œuvre, un comparatif par type de pompe à chaleur, et les leviers
            concrets pour réduire ce poste sans sacrifier la qualité de pose.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ce qui compose le coût d&apos;installation : main-d&apos;œuvre vs matériel</li>
            <li>Les étapes concrètes d&apos;un chantier d&apos;installation, une par une</li>
            <li>Les facteurs qui font varier la facture de pose d&apos;un projet à l&apos;autre</li>
            <li>Un comparatif du coût d&apos;installation par type de pompe à chaleur</li>
            <li>Les leviers concrets pour réduire ce coût sans perdre en qualité</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : COMPOSITION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Coût d&apos;installation d&apos;une pompe à chaleur : main-d&apos;œuvre ou matériel ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur un devis de pompe à chaleur, deux lignes budgétaires bien distinctes doivent
          apparaître : le <strong>prix du matériel</strong> (l&apos;appareil, ses accessoires,
          le ballon d&apos;eau chaude éventuel) et le <strong>coût d&apos;installation</strong>{' '}
          — c&apos;est-à-dire la main-d&apos;œuvre nécessaire pour poser, raccorder et mettre en
          service l&apos;appareil. Pour une <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            pompe à chaleur air-eau
          </Link>, le coût d&apos;installation représente généralement 20 à 35 % du montant
          total de la facture, le reste correspondant au prix de l&apos;appareil.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Cette proportion varie sensiblement selon le contexte du chantier. Un remplacement
          de chaudière existante, où le circuit hydraulique est déjà en place, limite le
          coût de main-d&apos;œuvre. À l&apos;inverse, une première installation dans un
          logement sans système de chauffage central préexistant nécessite de créer
          l&apos;ensemble du réseau — radiateurs, tuyauterie, circulateur — ce qui alourdit
          considérablement le <strong>coût d&apos;installation</strong> final.
        </p>

        <ArticleStat stats={[
          { value: '20–35 %', label: 'part de la main-d\'œuvre dans le coût total d\'une installation PAC air-eau', color: 'blue' },
          { value: '2 000–5 000 €', label: 'coût d\'installation moyen pour une pompe à chaleur air-eau', color: 'green' },
          { value: '1 à 3 jours', label: 'durée moyenne d\'un chantier d\'installation PAC air-eau', color: 'amber' },
        ]} />

        {/* ---- SECTION 2 : ETAPES DU CHANTIER ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les étapes d&apos;un chantier d&apos;installation de pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour comprendre ce que recouvre réellement le{' '}
          <strong>coût d&apos;installation d&apos;une pompe à chaleur</strong>, il faut
          décomposer le chantier étape par étape. Chacune de ces phases mobilise du temps de
          main-d&apos;œuvre qualifiée, ce qui explique la facture finale.
        </p>

        <ArticleSteps steps={CHANTIER_STEPS} />

        <ArticleImageSection
          image="/images/blog/cout-installation-pompe-a-chaleur-pose-unite-exterieure.jpg"
          alt="Technicien en tenue rouge installant sur une échelle l'unité extérieure d'une pompe à chaleur contre la façade d'une maison équipée de panneaux solaires"
          imagePosition="right"
        >
          <p>
            La pose physique de l&apos;<strong>unité extérieure</strong> est souvent l&apos;
            étape la plus visible du chantier, mais elle ne représente qu&apos;une partie du{' '}
            <strong>coût d&apos;installation</strong> global. Le support (socle béton, platine
            murale avec plots anti-vibratiles), la fixation et la mise à niveau doivent être
            réalisés avec soin pour garantir la durabilité de l&apos;installation et limiter
            les nuisances sonores futures.
          </p>
          <p className="mt-3">
            Notre article sur le{' '}
            <Link href="/blog/pompe-a-chaleur-air-eau-fonctionnement" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              fonctionnement d&apos;une pompe à chaleur air-eau
            </Link>{' '}
            détaille le rôle de chaque composant installé lors de cette étape.
          </p>
        </ArticleImageSection>

        <ArticleFullImage
          image="/images/blog/cout-installation-pompe-a-chaleur-raccordement-electrique.jpg"
          alt="Technicien raccordant les câbles électriques dans le boîtier de commande d'une unité extérieure de pompe à chaleur lors de l'installation"
          caption="Le raccordement électrique de l'unité extérieure — souvent depuis une ligne dédiée au tableau — fait partie intégrante du coût d'installation d'une pompe à chaleur, au même titre que la pose physique de l'appareil."
        />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ce détail du raccordement électrique illustre bien pourquoi le{' '}
          <strong>coût d&apos;installation</strong> ne se limite jamais à la simple pose de
          l&apos;appareil. Une ligne électrique dédiée, une protection différentielle adaptée
          et parfois une mise aux normes partielle du tableau existant sont autant de postes
          de main-d&apos;œuvre supplémentaires, réalisés par un électricien qualifié en
          complément du frigoriste ou du plombier-chauffagiste.
        </p>

        {/* ---- SECTION 3 : FACTEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quels facteurs font varier le coût d&apos;installation d&apos;une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>distance entre l&apos;unité extérieure et l&apos;unité intérieure</strong>{' '}
          influence directement le coût d&apos;installation : plus les liaisons frigorifiques
          ou hydrauliques sont longues, plus le temps de pose et la quantité de matériel
          nécessaire (tuyauterie, isolant, gaine) augmentent. Un emplacement d&apos;unité
          extérieure proche du point de raccordement intérieur limite mécaniquement ce
          poste.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;<strong>accessibilité du logement</strong> pèse également sur la facture de
          main-d&apos;œuvre. Un accès difficile — étage élevé sans ascenseur, jardin en
          pente, stationnement compliqué pour le camion de l&apos;artisan — peut allonger la
          durée du chantier et donc son coût. À l&apos;inverse, un accès de plain-pied avec un
          espace de travail dégagé facilite une intervention rapide.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;<strong>état de l&apos;installation existante</strong> constitue un troisième
          facteur déterminant. Remplacer une chaudière par une pompe à chaleur air-eau tout
          en conservant les radiateurs existants limite le coût d&apos;installation, à
          condition que ces radiateurs soient compatibles avec les températures de
          fonctionnement plus basses d&apos;une PAC. Si les émetteurs doivent être remplacés
          ou si un plancher chauffant doit être créé, le{' '}
          <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            coût du chantier
          </Link>{' '}
          augmente sensiblement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, le <strong>type de pompe à chaleur</strong> choisi conditionne fortement le
          coût d&apos;installation. Une PAC air-air se pose en quelques heures avec un
          raccordement frigorifique simple, tandis qu&apos;une installation{' '}
          <Link href="/blog/geothermie-ou-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            géothermique
          </Link>{' '}
          nécessite des travaux de terrassement ou de forage qui peuvent représenter à eux
          seuls la moitié du budget total du projet.
        </p>

        {/* ---- SECTION 4 : COMPARATIF PAR TYPE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Coût d&apos;installation par type de pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour situer concrètement votre projet, voici un comparatif du{' '}
          <strong>coût d&apos;installation</strong> — main-d&apos;œuvre uniquement, hors prix
          de l&apos;appareil — selon le type de pompe à chaleur envisagé.
        </p>

        <ArticleTable {...COUT_TABLE} title="Coût d'installation par type de pompe à chaleur (main-d'œuvre) — 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ce tableau confirme un point souvent sous-estimé : le{' '}
          <strong>coût d&apos;installation</strong> d&apos;une géothermie peut, à lui seul,
          dépasser le prix total d&apos;une pompe à chaleur air-eau standard. C&apos;est cette
          réalité qui explique pourquoi la géothermie reste réservée aux projets disposant
          d&apos;un terrain adapté et d&apos;un budget conséquent — notre comparatif{' '}
          <Link href="/blog/geothermie-ou-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            géothermie ou pompe à chaleur
          </Link>{' '}
          détaille ce choix en profondeur.
        </p>

        <ArticleCallout type="tip" title="Remplacement de chaudière : le contexte le plus économique">
          <p>
            Remplacer une chaudière gaz ou fioul par une pompe à chaleur air-eau, en
            conservant le circuit hydraulique existant, reste le scénario où le coût
            d&apos;installation est le plus maîtrisé. Notre guide pour{' '}
            <Link href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              remplacer une chaudière gaz par une pompe à chaleur
            </Link>{' '}
            détaille les aides spécifiques à ce type de projet, qui viennent réduire d&apos;
            autant le reste à charge final.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : NEUF VS REMPLACEMENT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Installation neuve ou remplacement de chaudière : quel impact sur le coût ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le contexte du projet influence fortement le <strong>coût d&apos;installation</strong>{' '}
          d&apos;une pompe à chaleur. Un <strong>remplacement de chaudière</strong> bénéficie
          d&apos;un circuit hydraulique déjà en place, d&apos;un emplacement technique déjà
          identifié pour le raccordement, et souvent d&apos;une arrivée électrique existante
          à proximité — autant d&apos;éléments qui réduisent le temps de main-d&apos;œuvre
          nécessaire.
        </p>

        <ArticleImageSection
          image="/images/blog/cout-installation-pompe-a-chaleur-artisan-client.jpg"
          alt="Un artisan chauffagiste explique à un client le fonctionnement d'une pompe à chaleur devant l'unité extérieure installée contre un mur en briques"
          imagePosition="left"
        >
          <p>
            Une <strong>installation neuve</strong>, dans un logement sans système de
            chauffage central préexistant, implique de créer l&apos;ensemble du réseau :
            radiateurs ou plancher chauffant, tuyauterie de distribution, circulateur, vase
            d&apos;expansion. Ce chantier, plus long et plus complexe, se traduit
            mécaniquement par un coût d&apos;installation plus élevé, parfois supérieur de
            50 % à celui d&apos;un simple remplacement.
          </p>
          <p className="mt-3">
            Un échange direct avec l&apos;artisan avant la signature du devis permet de bien
            comprendre quelle part du coût d&apos;installation correspond à chaque poste, et
            d&apos;identifier d&apos;éventuelles économies possibles sans dégrader la qualité
            de la pose.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 6 : REDUIRE LE COUT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment réduire le coût d&apos;installation d&apos;une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Premier levier, et sans doute le plus efficace : <strong>comparer plusieurs
          devis</strong> d&apos;artisans certifiés RGE pour un même projet. Les écarts de
          coût d&apos;installation entre professionnels peuvent atteindre 30 % pour un
          chantier strictement identique, sans lien avec la qualité finale de la prestation.
          Exigez systématiquement un devis détaillé qui distingue clairement le prix du
          matériel et le coût de main-d&apos;œuvre, poste par poste.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Deuxième levier : <strong>choisir un emplacement d&apos;unité extérieure</strong>{' '}
          proche du point de raccordement intérieur, pour limiter la longueur des liaisons
          frigorifiques ou hydrauliques. Cette décision, prise en amont avec l&apos;artisan
          lors de la visite technique, peut réduire sensiblement le temps de pose nécessaire.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Troisième levier : vérifier votre <strong>éligibilité aux aides financières</strong>{' '}
          avant de signer, puisque MaPrimeRénov&apos; et les primes CEE sont calculées sur le
          montant total de la facture, main-d&apos;œuvre comprise. Un artisan RGE sérieux
          établit une simulation précise et dépose le dossier avant le début des travaux,
          ce qui déduit directement l&apos;aide de votre facture finale sans avance de
          trésorerie de votre part.
        </p>

        <ArticleCallout type="info" title="Coût d'installation d'une pompe à chaleur : l'essentiel à retenir">
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>Ce n&apos;est pas le prix de l&apos;appareil</strong> — c&apos;est la main-d&apos;œuvre et les travaux annexes</li>
            <li><strong>Part du budget total</strong> — généralement 20 à 35 % pour une PAC air-eau</li>
            <li><strong>Facteur n°1</strong> — remplacement de chaudière vs création complète du circuit</li>
            <li><strong>Facteur n°2</strong> — distance entre unités et accessibilité du logement</li>
            <li><strong>Levier principal</strong> — comparer au moins 3 devis détaillés d&apos;artisans RGE</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Devis détaillé pour l'installation de votre pompe à chaleur"
          description="Nos artisans certifiés RGE QualiPAC se déplacent gratuitement, chiffrent séparément le matériel et la main-d'œuvre, et montent votre dossier MaPrimeRénov' 2026. Devis transparent sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur le coût d&apos;installation d&apos;une pompe à chaleur
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
            href="/blog/guide-prix-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide complémentaire</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une pompe à chaleur en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
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
            href="/blog/pompe-a-chaleur-air-eau-fonctionnement"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur air-eau : fonctionnement
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Remplacer sa chaudière gaz par une PAC
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
