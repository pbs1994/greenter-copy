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
  ARTICLE_META, PRIX_TABLE, ISOLANT_TABLE, AIDES_TABLE,
  EXAMPLE_CALCULATION, TIPS_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-combles-prix-m2-2026'

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
      url: 'https://www.greenter.fr/images/blog/isolation-combles-pose-laine-verre-artisan.jpg',
      width: 1200,
      height: 630,
      alt: 'Artisan posant de la laine de verre dans les combles perdus — isolation thermique',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-combles-pose-laine-verre-artisan.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Prix isolation combles au m²', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PrixIsolationComblesM2() {
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
        image="https://www.greenter.fr/images/blog/isolation-combles-pose-laine-verre-artisan.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-combles-pose-laine-verre-artisan.jpg"
        heroAlt="Artisan certifié RGE posant de la laine de verre en rouleau dans des combles perdus — isolation thermique des combles"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            L&apos;<strong>isolation des combles</strong> est le geste de rénovation énergétique
            le plus rentable qui soit : les combles mal isolés représentent à eux seuls
            25 à 30 % des pertes de chaleur d&apos;une maison individuelle. Avant de lancer les
            travaux, la première question est toujours la même — <strong>quel est le prix
            de l&apos;isolation des combles au m² ?</strong> La réponse courte : entre
            <strong> 15 et 40 €/m²</strong> pour des combles perdus, et entre{' '}
            <strong>35 et 85 €/m²</strong> pour des combles aménageables — hors aides
            financières qui peuvent ramener le reste à charge à quelques dizaines d&apos;euros.
          </p>
          <p>
            Ces fourchettes reflètent une réalité simple : le{' '}
            <strong>prix de l&apos;isolation des combles</strong> dépend d&apos;abord du type de combles
            (perdus ou aménageables), de la méthode retenue (soufflage ou pose en rouleaux)
            et de l&apos;isolant choisi (laine de verre, laine de roche, ouate de cellulose).
            Pour les <strong>combles perdus</strong> — de loin les plus fréquents — le
            soufflage de laine minérale ou de ouate est la solution la plus rapide, la plus
            efficace et souvent la moins chère. Pour les{' '}
            <strong>combles aménageables</strong>, l&apos;isolation sous-rampants ou par
            l&apos;extérieur (technique du Sarking) est nécessaire, avec un prix au m²
            sensiblement plus élevé.
          </p>
          <p>
            Ce guide vous donne tous les <strong>tarifs d&apos;une isolation des combles</strong>{' '}
            pour 2026, un comparatif complet des isolants, le détail des{' '}
            <strong>aides financières</strong> disponibles et un exemple chiffré de reste à
            charge réel selon votre profil de revenus. Pour une vision plus globale du{' '}
            <strong>budget total</strong> à prévoir selon la taille de votre logement et
            la composition détaillée d&apos;un devis, consultez également notre guide{' '}
            <Link href="/blog/prix-d-une-isolation-des-combles" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              prix d&apos;une isolation des combles : budget complet et devis
            </Link>.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Tableau des prix isolation combles au m² (tous types et méthodes)</li>
            <li>Comparatif laine de verre, laine de roche, ouate de cellulose — prix et performances</li>
            <li>Aides MaPrimeRénov' 2026 : montants exacts par catégorie de revenus</li>
            <li>Exemple chiffré : 100 m² de combles perdus, reste à charge ≈ 50 €</li>
            <li>6 étapes pour bien choisir et préparer votre chantier d&apos;isolation</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : TABLEAU PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix isolation combles au m² : les fourchettes 2026 en un coup d&apos;œil
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le tableau ci-dessous regroupe les <strong>prix d&apos;une isolation des combles</strong>
          selon le type de combles et la méthode retenue, pour la zone Île-de-France en 2026.
          Ces tarifs incluent la fourniture des matériaux et la main-d&apos;œuvre d&apos;un artisan RGE.
          Ils sont exprimés hors aides financières : après déduction de MaPrimeRénov&apos; et des
          primes CEE, le coût de votre isolation peut être réduit de 50 à 100 %.
        </p>

        <ArticleTable {...PRIX_TABLE} title="Prix isolation combles au m² selon le type et la méthode — Île-de-France 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces chiffres appellent deux remarques importantes. Premièrement, le{' '}
          <strong>prix moyen</strong> d&apos;une isolation des combles perdus par soufflage
          (environ 25–28 €/m²) est inférieur aux montants de MaPrimeRénov&apos; pour les ménages
          modestes (20 €/m²) et très modestes (25 €/m²), auxquels s&apos;ajoute la prime CEE.
          Pour ces profils, les travaux sont donc entièrement financés. Deuxièmement, les
          combles aménageables coûtent 2 à 4 fois plus cher que les combles perdus en raison
          de la complexité technique des sous-rampants — mais les aides s&apos;appliquent
          également, ce qui maintient un reste à charge raisonnable.
        </p>

        <ArticleStat stats={[
          { value: '15–40 €', label: 'prix au m² pour combles perdus (pose comprise, hors aides)', color: 'blue' },
          { value: '35–85 €', label: 'prix au m² pour combles aménageables (sous-rampants)', color: 'blue' },
          { value: '30 %', label: 'd\'économies sur la facture de chauffage dès la 1ʳᵉ année', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : COMBLES PERDUS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix isolation combles perdus au m² : soufflage ou rouleaux ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>combles perdus</strong> représentent la grande majorité des chantiers
          d&apos;isolation en France. Ce sont des combles non habitables, accessibles uniquement
          par une trappe, sans possibilité de les aménager en espace de vie. On isole
          uniquement le <strong>plancher des combles</strong> — c&apos;est-à-dire le plafond de
          l&apos;étage inférieur — et non la toiture. C&apos;est la configuration la plus simple et
          la moins chère, avec des travaux qui durent souvent 2 à 4 heures pour 100 m².
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-combles-perdus-soufflage-plancher.jpg"
          alt="Combles perdus isolés par soufflage — plancher recouvert d'isolant blanc et panneau Unilin, charpente bois apparente"
          imagePosition="right"
        >
          <p>
            La <strong>technique du soufflage</strong> est la méthode de référence pour les
            combles perdus. L&apos;isolant — laine de verre, laine de roche ou ouate de cellulose
            — est projeté en vrac à l&apos;aide d&apos;une machine pneumatique, via une lance introduite
            par la trappe. Le résultat est un tapis continu d&apos;isolant de 25 à 35 cm
            d&apos;épaisseur, sans pont thermique, qui épouse parfaitement les irrégularités du
            plancher. Le <strong>prix du soufflage</strong> varie entre 20 et 40 €/m² selon
            l&apos;isolant choisi et l&apos;accessibilité des combles.
          </p>
          <p className="mt-3">
            La <strong>pose en rouleaux</strong> de laine de verre ou de laine de roche est
            une alternative moins chère (15 à 25 €/m²), mais plus laborieuse. Elle nécessite
            un accès plus aisé aux combles et un plancher accessible. C&apos;est la seule méthode
            réalisable en DIY — mais attention : pour être éligible aux{' '}
            <strong>aides financières</strong>, les travaux doivent obligatoirement être
            réalisés par un artisan RGE.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mt-4 mb-6">
          L&apos;<strong>accessibilité des combles</strong> est le premier facteur de variation
          du prix. Une trappe standard (60 × 80 cm) est suffisante pour le soufflage et
          ne nécessite aucun aménagement préalable. En revanche, si les combles sont
          encombrés, si le plancher est en mauvais état ou si des obstacles gênent le passage
          de la lance, le prix des travaux peut augmenter de 20 à 40 %. Il est donc essentiel
          de le signaler dès la demande de devis pour obtenir une estimation réaliste. La
          surface à isoler influe également : en dessous de 50 m², les frais fixes de
          déplacement et de mise en route représentent une part plus importante du coût total,
          ce qui fait mécaniquement monter le prix au m².
        </p>

        {/* ---- SECTION 3 : COMBLES AMÉNAGEABLES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix isolation combles aménageables et aménagés au m²
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>combles aménageables</strong> sont des combles avec une hauteur sous
          faîtage d&apos;au moins 1,80 m, qui peuvent être transformés en espace habitable.
          Contrairement aux combles perdus, on n&apos;isole pas seulement le plancher mais
          l&apos;ensemble de l&apos;enveloppe : les rampants (parties inclinées sous la toiture),
          les murs de pignons et parfois le plancher bas. C&apos;est un chantier beaucoup plus
          complexe, qui explique le prix au m² nettement supérieur.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La méthode principale pour les <strong>combles aménageables</strong> est
          l&apos;<strong>isolation sous-rampants</strong> : des panneaux de laine minérale (laine
          de verre ou de roche) sont fixés entre les chevrons, puis couverts d&apos;un pare-vapeur
          et d&apos;une finition placo. Le <strong>prix au m²</strong> varie entre 35 et 55 €/m²
          pour cette technique. Une variante plus performante — le <em>Sarking</em> — consiste
          à poser des panneaux rigides côté extérieur sur les chevrons, avant de reposer la
          couverture. Beaucoup plus efficace (pas de pont thermique, pas de perte de surface
          habitable), mais aussi beaucoup plus chère : 80 à 150 €/m², réservée aux projets
          de réfection totale de toiture.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-combles-amenageables-rampants-isover.jpg"
          alt="Chantier d'isolation de combles aménageables sous rampants — laine de verre Isover entre chevrons, pare-vapeur et plaques de plâtre"
          imagePosition="left"
        >
          <p>
            Pour des <strong>combles aménagés</strong> dont l&apos;isolation est à refaire
            (nouvelle isolation d&apos;un espace déjà habitable), le prix inclut le
            déplâtrage des cloisons, la dépose de l&apos;ancien isolant, la repose d&apos;un
            isolant performant et la remise en état des finitions. Ces travaux
            représentent un chantier à 50–85 €/m², avec des délais d&apos;intervention de
            3 à 5 jours selon la surface.
          </p>
          <p className="mt-3">
            Une bonne <strong>isolation sous-rampants</strong> doit atteindre
            R ≥ 6 m².K/W pour les combles aménageables (contre R ≥ 7 pour les combles
            perdus), conformément aux exigences de MaPrimeRénov&apos; 2026. L&apos;épaisseur
            nécessaire dépend de l&apos;isolant : environ 22–28 cm de laine de roche en
            panneaux, ou 14–18 cm de mousse polyuréthane projetée.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 4 : COMPARATIF ISOLANTS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comparatif prix par isolant : laine de verre, laine de roche, ouate de cellulose
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le choix de l&apos;isolant a un impact direct sur le <strong>prix de l&apos;isolation
          des combles au m²</strong>, mais aussi sur les performances thermiques et acoustiques
          obtenues. Le tableau suivant compare les principaux isolants utilisés pour
          l&apos;isolation des combles en 2026, avec leurs prix de pose et leurs caractéristiques.
          Tous sont éligibles à MaPrimeRénov&apos; dès lors qu&apos;ils atteignent R ≥ 7 m².K/W.
        </p>

        <ArticleTable {...ISOLANT_TABLE} title="Comparatif isolants combles — prix posé, épaisseur et performances 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          La <strong>laine de verre soufflée</strong> reste l&apos;isolant le plus utilisé
          pour les combles perdus en France, et pour cause : elle combine le meilleur rapport
          qualité-prix (20–35 €/m²), une mise en œuvre rapide par soufflage et une excellente
          performance thermique (λ ≈ 0,035 W/m.K). La <strong>ouate de cellulose</strong>
          se distingue par sa fabrication à partir de papier recyclé et par son déphasage
          thermique supérieur — qualité précieuse pour les combles exposés à la chaleur
          estivale. Son prix est comparable à la laine minérale soufflée (25–40 €/m²),
          mais son bilan carbone est négatif, ce qui en fait le choix des profils
          éco-responsables.
        </p>

        {/* ---- SECTION 5 : FACTEURS DE PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quels facteurs font varier le prix final de l&apos;isolation des combles ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Au-delà du type de combles et de l&apos;isolant, plusieurs paramètres influencent
          le coût de votre isolation et peuvent expliquer des écarts importants entre
          deux devis pour un chantier apparemment identique.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-combles-soufflage-ouate-cellulose.jpg"
          alt="Combles perdus après isolation par soufflage de ouate de cellulose — tapis continu d'isolant gris, charpente en bois"
          caption="Isolation par soufflage de ouate de cellulose dans des combles perdus — résultat après intervention d'un artisan RGE. L'épaisseur posée (28–35 cm) doit figurer sur la facture pour valider MaPrimeRénov'."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La surface à isoler</strong> est le premier facteur. Les économies
          d&apos;échelle jouent pleinement : pour 50 m², les frais fixes de déplacement,
          de mise en route de la machine et d&apos;installation du chantier représentent une
          part disproportionnée du devis, faisant monter le prix au m² de 15 à 30 %.
          Pour 150 m² ou plus, le prix au m² diminue sensiblement. Si vous avez une
          surface à isoler inférieure à 50 m², essayez de regrouper les travaux avec
          d&apos;autres postes (murs, planchers) pour amortir le déplacement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>L&apos;état et l&apos;accessibilité du plancher des combles</strong> conditionnent
          le déroulement du chantier. Des combles propres, avec une trappe d&apos;accès standard
          et un plancher en bon état facilitent la pose et maintiennent le prix dans la
          fourchette basse. Des combles encombrés, avec une charpente complexe ou un
          ancien isolant à déposer (laine de verre dégradée, isolant contaminé) génèrent
          un surcoût de 5 à 15 €/m² supplémentaires pour la dépose et l&apos;évacuation.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La zone géographique</strong> influence les prix de main-d&apos;œuvre. En
          Île-de-France, les tarifs des artisans RGE sont généralement 10 à 20 % supérieurs
          à la moyenne nationale, en raison du coût de la vie et de la densité de la demande.
          Les prix indiqués dans ce guide correspondent à cette zone. Pour la province,
          appliquez une décote de 10 à 15 %.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, <strong>la présence d&apos;une ancienne isolation</strong> peut être un avantage
          ou un inconvénient. Si l&apos;ancien isolant est en bon état, le soufflage d&apos;un
          complément d&apos;isolant par-dessus est possible et moins cher que de repartir
          de zéro. Si l&apos;isolant est dégradé, tassé ou contaminé (présence de vermiculite
          amiantée dans certaines maisons construites avant 1980), la dépose préalable est
          obligatoire — avec un diagnostic amiante à prévoir.
        </p>

        <ArticleCallout type="tip" title="Combien coûte l'isolation des combles pour une maison de 100 m² ?">
          <p>
            Pour une maison de 100 m² avec des combles perdus en bon état, le prix moyen
            des travaux d&apos;isolation par soufflage est de <strong>2 500 à 3 500 €</strong>
            toutes fournitures et pose comprises. Après MaPrimeRénov&apos; et prime CEE
            (ménage modeste à intermédiaire), le reste à charge descend généralement à
            <strong> 200 à 800 €</strong>. Pour les ménages très modestes, les travaux
            peuvent être entièrement gratuits.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 6 : AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les aides financières pour l&apos;isolation des combles en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation des combles est l&apos;un des travaux les mieux subventionnés par les
          aides financières de l&apos;État en 2026. MaPrimeRénov&apos; — rouverte le 23 février 2026
          après une période de restriction — finance directement les{' '}
          <strong>travaux d&apos;isolation des combles</strong> via un barème exprimé en €/m²,
          sans nécessité de passer par une rénovation globale. Le montant de l&apos;aide
          dépend de la catégorie de revenus du foyer.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides financières pour l'isolation des combles en 2026 — montants et conditions" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces aides sont <strong>cumulables entre elles</strong>. Un ménage modeste
          (catégorie Jaune) peut ainsi cumuler MaPrimeRénov&apos; (20 €/m²) avec la Prime CEE
          Coup de Pouce (7 à 10,54 €/m²) et la TVA réduite à 5,5 %. Le total peut
          couvrir 80 à 100 % du coût des travaux. L&apos;Éco-PTZ finance le reste à charge
          sans condition de revenus, à taux zéro, ce qui permet de ne débourser aucune
          somme avant le remboursement.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour bénéficier de MaPrimeRénov&apos;, deux conditions sont impératives : l&apos;artisan
          doit être certifié <strong>RGE</strong> (Reconnu Garant de l&apos;Environnement) pour
          les travaux d&apos;isolation, et le dossier doit être déposé et validé{' '}
          <strong>avant le démarrage des travaux</strong>. Un artisan RGE sérieux prend
          en charge toute la procédure pour vous — constitution du dossier, dépôt sur la
          plateforme, suivi de l&apos;instruction — et déduit directement la prime sur votre
          facture. Vous ne payez que le reste à charge, sans avance.
        </p>

        {/* Exemple chiffré */}
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

        <ArticleCallout type="info" title="Quel est le reste à charge selon votre catégorie ?">
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>Ménage Bleu (très modeste)</strong> — 100 m² soufflage laine : reste à charge <strong>0 à 50 €</strong> (aides couvrent tout)</li>
            <li><strong>Ménage Jaune (modeste)</strong> — 100 m² soufflage laine : reste à charge <strong>50 à 300 €</strong></li>
            <li><strong>Ménage Violet (intermédiaire)</strong> — 100 m² soufflage laine : reste à charge <strong>500 à 1 000 €</strong></li>
            <li><strong>Ménage Rose (supérieur)</strong> — aide MaPrimeRénov' non accessible pour ce seul poste en 2026</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 7 : COMMENT BIEN CHOISIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment bien préparer votre chantier d&apos;isolation des combles ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un chantier d&apos;isolation bien préparé, c&apos;est la garantie d&apos;obtenir le meilleur
          rapport qualité-prix — et d&apos;éviter les mauvaises surprises. L&apos;isolation des combles
          est un poste technique qui requiert quelques vérifications préalables. Les six
          étapes suivantes vous guident de la qualification de vos combles jusqu&apos;à la
          réception des travaux.
        </p>

        <ArticleSteps steps={TIPS_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Respecter ces étapes dans l&apos;ordre est la clé pour obtenir les{' '}
          <strong>aides financières</strong> sans mauvaise surprise et pour s&apos;assurer
          que les travaux atteignent bien les performances thermiques annoncées. Une
          <Link href="/blog/meilleur-isolant-thermique-murs-interieur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors"> bonne isolation des murs intérieurs</Link>{' '}
          peut aussi compléter l&apos;isolation des combles pour réduire davantage les
          déperditions — les deux postes sont finançables dans un même dossier MaPrimeRénov&apos;.
          Si vous envisagez également de rénover votre système de chauffage, sachez que
          MaPrimeRénov&apos; finance simultanément l&apos;isolation et l&apos;installation d&apos;une{' '}
          <Link href="/services/pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">pompe à chaleur</Link>,
          avec des bonus supplémentaires pour la rénovation globale.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Obtenez votre devis d'isolation des combles en Île-de-France"
          description="Nos artisans certifiés RGE réalisent le diagnostic de vos combles, vous proposent la meilleure solution et montent votre dossier MaPrimeRénov' 2026. Devis gratuit et sans engagement sous 48h."
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
            href="/blog/prix-d-une-isolation-des-combles"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide complémentaire</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix d&apos;une isolation des combles — budget et devis
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
            href="/blog/meilleur-isolant-thermique-murs-interieur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide isolation</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Meilleure isolation murs intérieurs en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article PAC</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Remplacer sa chaudière gaz par une PAC
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/services/audit"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Audit énergétique — DPE et bilan thermique
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              En savoir plus <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation des combles par ville en Île-de-France
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
              { name: 'Pontault-Combault', slug: 'pontault-combault' },
              { name: 'Noisy-le-Grand', slug: 'noisy-le-grand' },
              { name: 'Évry-Courcouronnes', slug: 'evry-courcouronnes' },
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
