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
  ARTICLE_META, MATERIAUX_TABLE, PRIX_TABLE, AIDES_TABLE,
  ETAPES_CHAPE, EXAMPLE_CALCULATION, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-pour-sol-beton'

export const metadata: Metadata = {
  title: "Isolation pour sol béton : guide complet 2026 (dalle, chape, matériaux) | Greenter",
  description:
    "Comment réaliser l'isolation pour sol béton ? Polystyrène expansé, XPS, chape flottante, dalle sur terre-plein ou vide sanitaire : comparatif matériaux, prix au m² et aides MaPrimeRénov' 2026.",
  alternates: { canonical: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
  openGraph: {
    title: "Isolation pour sol béton : guide complet 2026 — dalle, chape et matériaux",
    description:
      "Isoler un sol en béton : méthodes (sous-dalle, chape flottante, sous-face), matériaux isolants (PSE, XPS, laine de roche), prix 2026 et aides MaPrimeRénov'. Guide complet par Greenter.",
    url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}`,
    type: 'article',
    siteName: 'Greenter',
    locale: 'fr_FR',
    publishedTime: ARTICLE_META.dateISO,
    authors: ['Greenter'],
    images: [{
      url: 'https://www.greenter.fr/images/blog/isolation-sol-beton-polystyrene-expanse-panneau.jpg',
      width: 1200,
      height: 800,
      alt: "Pose de panneaux de polystyrène expansé (PSE) pour l'isolation d'un sol en béton avant coulage de chape",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Isolation pour sol béton : guide complet 2026",
    description:
      "Isolation pour sol béton : comparatif PSE, XPS, laine de roche, chape flottante, prix et aides MaPrimeRénov' 2026.",
    images: ['https://www.greenter.fr/images/blog/isolation-sol-beton-polystyrene-expanse-panneau.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Isolation pour sol béton", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationPourSolBeton() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQPageSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Isolation pour sol béton : guide complet 2026 — dalle, chape flottante et matériaux"
        description="Guide complet sur l'isolation d'une dalle en béton : isolation sous dalle, chape flottante, polystyrène expansé ou extrudé, plancher chauffant, prix au m² et aides MaPrimeRénov' 2026."
        datePublished={ARTICLE_META.dateISO}
        dateModified={ARTICLE_META.dateISO}
        author={{ name: ARTICLE_META.author, url: 'https://www.greenter.fr' }}
        publisher={{ name: 'Greenter', logo: 'https://www.greenter.fr/logo.png' }}
        image="https://www.greenter.fr/images/blog/isolation-sol-beton-polystyrene-expanse-panneau.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2800}
      />

      <ArticleLayout
        title="Isolation pour sol béton : guide complet 2026 — dalle, chape flottante et matériaux"
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        author={ARTICLE_META.author}
        heroImage="/images/blog/isolation-sol-beton-polystyrene-expanse-panneau.jpg"
        heroAlt="Artisan posant des panneaux de polystyrène expansé (PSE) sur une dalle en béton avant coulage d'une chape flottante isolante"
        breadcrumbs={breadcrumbs}
      >
        {/* ── INTRO ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Un <strong>sol en béton</strong> non isolé peut représenter 7 à 15 % des déperditions
            thermiques d&apos;un logement — selon que la <strong>dalle en béton</strong> repose sur
            terre-plein ou au-dessus d&apos;un <strong>vide sanitaire</strong>. C&apos;est un poste
            souvent négligé lors des travaux de rénovation, alors que l&apos;inconfort est immédiatement
            perceptible : un <strong>revêtement de sol</strong> froid en hiver pèse sur le confort
            ressenti, même quand la température de l&apos;air est correcte.
          </p>
          <p>
            L&apos;<strong>isolation pour sol béton</strong> peut s&apos;aborder de deux façons :
            en posant les <strong>panneaux isolants</strong> directement <strong>sous la dalle</strong>{' '}
            avant son coulage (méthode idéale en construction neuve), ou en réalisant une{' '}
            <strong>isolation thermique</strong> par le haut <strong>sur une dalle</strong> existante
            via une <strong>chape flottante</strong>. Dans les maisons avec vide sanitaire accessible,
            une troisième option existe : fixer l&apos;isolant en sous-face de dalle côté vide sanitaire,
            sans toucher à l&apos;intérieur du logement.
          </p>
          <p>
            Ce guide complet vous explique comment <strong>isoler une dalle en béton</strong>
            selon votre situation : <strong>dalle sur terre-plein</strong>,{' '}
            <strong>dalle sur vide sanitaire</strong>, <strong>plancher chauffant</strong> hydraulique,
            rénovation ou construction neuve. Vous y trouverez le comparatif des{' '}
            <strong>matériaux isolants</strong> (polystyrène expansé, polystyrène extrudé, laine de
            roche), les prix au m² en 2026 et toutes les aides financières disponibles pour financer
            votre <strong>isolation du sol</strong>.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pourquoi isoler une dalle en béton : déperditions, confort et réglementation</li>
            <li>Les trois méthodes d&apos;isolation d&apos;un sol béton (sous-dalle, par-dessus, sous-face)</li>
            <li>Comparatif PSE, XPS, laine de roche : résistance, humidité, prix</li>
            <li>Comment réaliser une chape flottante isolante : les 6 étapes</li>
            <li>Dalle sur terre-plein vs vide sanitaire : quelle solution choisir</li>
            <li>Prix au m² en 2026 et aides MaPrimeRénov&apos; cumulables</li>
          </ul>
        </ArticleCallout>

        {/* ── SECTION 1 : POURQUOI ISOLER ────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi isoler une dalle en béton ? Déperditions, confort et réglementation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>béton</strong> est un matériau très conducteur de chaleur : sa conductivité
          thermique est d&apos;environ 1,75 W/m·K, soit cinquante fois supérieure à celle du
          <strong> polystyrène expansé</strong> (λ ≈ 0,031–0,038 W/m·K). Une{' '}
          <strong>dalle béton</strong> non traitée est donc un vecteur majeur de pertes
          thermiques, en particulier dans deux situations critiques.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Premièrement, dans le cas d&apos;une{' '}
          <strong>dalle sur terre-plein</strong> : le sol froid du terrain capte en permanence
          la chaleur du plancher. Sans <strong>isolation thermique</strong> entre le béton
          et la terre, les pertes peuvent atteindre 12 à 15 W/m² en pleine période hivernale.
          Deuxièmement, une <strong>dalle béton</strong> au-dessus d&apos;un{' '}
          <strong>vide sanitaire</strong> est encore plus exposée : l&apos;air non chauffé
          circulant sous le <strong>plancher</strong> descend à des températures proches de
          l&apos;extérieur en hiver, multipliant les pertes par deux ou trois par rapport à
          une dalle sur terre-plein.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-sol-beton-polystyrene-expanse-panneau.jpg"
          alt="Artisan disposant des panneaux de polystyrène expansé (PSE) graphité sur une dalle en béton existante avant coulage de chape flottante"
          imagePosition="right"
        >
          <p>
            Au-delà des pertes d&apos;énergie, l&apos;inconfort est immédiat et difficilement compensable.
            Un <strong>sol en béton</strong> froid génère un{' '}
            <em>effet de rayonnement asymétrique</em> : même quand l&apos;air de la pièce est
            à 21 °C, la surface froide du <strong>revêtement de sol</strong> (souvent
            entre 14 et 17 °C sans isolation) capte la chaleur corporelle des occupants.
            Le système de chauffage doit monter plus haut en température pour compenser,
            ce qui se traduit directement par une augmentation de la facture énergétique.
          </p>
          <p className="mt-3">
            Du côté réglementaire, la <strong>RE2020</strong> impose une résistance thermique
            minimale de <strong>R ≥ 3,0 m²·K/W</strong> pour les planchers bas en contact
            avec le sol en construction neuve. En rénovation,{' '}
            <strong>MaPrimeRénov&apos;</strong> exige R ≥ 3,0 m²·K/W pour les dalles sur vide
            sanitaire ou cave non chauffée pour déclencher l&apos;aide. C&apos;est la valeur
            cible à garder en tête pour tout projet d&apos;
            <strong>isolation du sol</strong>.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '7–15 %', label: 'des déperditions thermiques passent par le plancher non isolé (selon dalle sur terre-plein ou vide sanitaire)', color: 'blue' },
          { value: 'R ≥ 3,0', label: 'm²·K/W — résistance thermique minimale exigée par la RE2020 pour les planchers bas', color: 'blue' },
          { value: '25 €/m²', label: 'MaPrimeRénov\' max pour isolation plancher bas (ménages très modestes, Bleu 2026)', color: 'green' },
        ]} />

        {/* ── SECTION 2 : LES DEUX MÉTHODES ─────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation sous dalle ou par-dessus : quelle méthode pour votre sol béton ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Il n&apos;existe pas de solution universelle pour{' '}
          <strong>isoler un sol en béton</strong>. Le choix de la méthode dépend
          essentiellement de l&apos;état d&apos;avancement du chantier (construction neuve
          ou rénovation), de la configuration de la dalle (terre-plein, vide sanitaire,
          cave) et des contraintes de <strong>hauteur sous plafond</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Isolation sous la dalle béton : la méthode de référence en construction neuve
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          En construction neuve ou lors d&apos;une démolition complète du sol existant,
          la méthode optimale est de poser l&apos;<strong>isolant sous la dalle</strong>{' '}
          avant son coulage. Le processus commence par la préparation du support
          (terrassement, hérisson de gravier), suivi de la pose d&apos;un film pare-vapeur,
          puis des <strong>panneaux de polystyrène expansé</strong> ou extrudé en
          100 à 160 mm d&apos;épaisseur. La{' '}
          <strong>nouvelle dalle en béton</strong> est ensuite coulée par-dessus.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Cette méthode offre la meilleure performance thermique car l&apos;
          <strong>isolant sous</strong> la dalle couvre l&apos;intégralité de la surface
          sans discontinuité ni pont thermique. Le choix du matériau est ici
          déterminant : l&apos;<strong>isolant adapté</strong> doit résister à la
          compression — à la fois sous le poids du béton frais (environ 300 kg/m² pour
          12 cm de dalle) et aux charges d&apos;exploitation futures. Un{' '}
          <strong>isolant résistant à la compression</strong> de 150 kPa minimum est
          requis pour un sol habitable standard.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Isolation par le haut sur dalle existante : la chape flottante isolante
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          En rénovation, quand la <strong>dalle existante</strong> est déjà coulée,
          l&apos;option principale est d&apos;<strong>isoler le sol par le haut</strong>.
          On pose l&apos;isolant directement sur la dalle en béton, puis on coule une{' '}
          <strong>chape flottante</strong> (béton ou liquide) qui ne sera pas solidaire
          des murs ni de la dalle support. C&apos;est la technique dite de{' '}
          <strong>chape isolante</strong> ou d&apos;<strong>isolation sous chape</strong>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La principale contrainte est la <strong>hauteur sous plafond</strong> :
          l&apos;épaisseur totale de l&apos;isolant (80 à 120 mm) plus la chape (40 à 60 mm)
          représente une réduction de 12 à 18 cm de hauteur disponible — ce qui peut
          être problématique dans les pièces basses ou les sous-sols. Pour limiter
          cet impact, les <strong>chapes liquides</strong> (anhydrite) permettent de
          descendre à 40 mm d&apos;épaisseur contre 50 à 60 mm pour les chapes béton.
        </p>

        <ArticleCallout type="tip" title="Troisième option : l'isolation en sous-face sur vide sanitaire">
          <p>
            Si votre maison dispose d&apos;un <strong>vide sanitaire</strong> accessible
            (hauteur ≥ 0,6 m), il est possible de fixer l&apos;
            <strong>isolant en sous-face</strong> de la dalle — sans travaux
            à l&apos;intérieur du logement et sans perte de <strong>hauteur sous plafond</strong>.
            Des panneaux XPS de 100 mm sont vissés ou collés directement{' '}
            <strong>sous la dalle en béton</strong>, côté vide sanitaire.
            Cette solution, éligible à MaPrimeRénov&apos;, préserve l&apos;intégralité
            de la hauteur intérieure et ne nécessite pas de <strong>retirer le revêtement de sol</strong> existant.
          </p>
        </ArticleCallout>

        {/* ── SECTION 3 : MATÉRIAUX ─────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les matériaux isolants pour sol béton : comparatif complet
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Contrairement aux isolants de murs ou de combles, les{' '}
          <strong>isolants de sol</strong> doivent impérativement résister à la
          compression. C&apos;est le critère technique prioritaire : un{' '}
          <strong>bon isolant</strong> pour plancher doit supporter le poids de la chape,
          du revêtement et des charges d&apos;exploitation sans se comprimer, ce qui
          dégraderait la performance thermique et créerait des déformations dans le sol.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-sol-beton-chape-flottante-pose.jpg"
          alt="Pose de panneaux isolants PSE graphité sur dalle béton existante avant coulage d'une chape flottante — isolation thermique sol béton en rénovation"
          imagePosition="left"
        >
          <p>
            Le <strong>polystyrène expansé</strong> (PSE) est l&apos;
            <strong>isolant thermique</strong> le plus utilisé pour les sols.
            Il existe en deux versions : le PSE blanc classique (λ = 0,038 W/m·K) et
            le PSE graphité — aussi appelé PSE gris ou EPS graphité (λ = 0,031 W/m·K)
            — dont les performances sont nettement supérieures. À épaisseur égale, le
            PSE graphité offre une résistance thermique 20 % plus élevée. Pour atteindre
            R = 3,0 m²·K/W, il suffit de 93 mm de PSE graphité contre 115 mm de PSE blanc.
          </p>
          <p className="mt-3">
            Sa résistance à la compression varie selon la densité : de 70 kPa (PSE 15 kg/m³,
            inadapté aux sols sous chape) à 200 kPa (PSE 30 kg/m³, recommandé pour les planchers
            habitables). Pour une <strong>dalle béton</strong> sous chape, choisissez
            systématiquement un PSE de densité ≥ 20 kg/m³ avec une résistance à la
            compression d&apos;au moins 100 kPa.
          </p>
          <p className="mt-3">
            Le <strong>polystyrène extrudé</strong> (XPS) va plus loin : sa structure à
            cellules fermées le rend pratiquement imperméable à l&apos;eau, avec une
            résistance à la compression pouvant dépasser 700 kPa selon les formulations.
            C&apos;est l&apos;<strong>isolant adapté</strong> pour les dalles en contact
            avec un sol humide, les <strong>dalles sur terre-plein</strong> et les
            vides sanitaires humides. Son coût est plus élevé (12 à 25 €/m² contre
            8 à 18 €/m² pour le PSE graphité), mais sa durabilité est supérieure
            dans les environnements humides.
          </p>
        </ArticleImageSection>

        <ArticleTable {...MATERIAUX_TABLE} title="Comparatif des isolants pour sol béton — performances et prix 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          La <strong>laine de roche</strong> en panneau rigide est utilisée
          spécifiquement pour l&apos;isolation <strong>sous chape flottante</strong>
          dans le cadre des <strong>planchers chauffants</strong> hydrauliques.
          Elle présente l&apos;avantage d&apos;être incombustible (classement A1),
          ce qui est parfois exigé dans les bâtiments collectifs. Sa résistance à
          la compression est plus faible que celle du XPS (40 à 60 kPa pour les
          panneaux dalle), ce qui la limite aux chapes de faible épaisseur avec
          revêtement léger.
        </p>

        <ArticleCallout type="warning" title="Ne pas confondre PSE sol et PSE façade">
          <p>
            Les <strong>panneaux de polystyrène expansé</strong> existent en de
            nombreuses variantes avec des propriétés mécaniques très différentes.
            Un PSE de façade (densité 15 kg/m³, résistance 70 kPa) n&apos;est{' '}
            <em>pas adapté</em> à une utilisation en sol sous chape : il se comprimerait
            sous le poids et perdrait sa performance thermique. Vérifiez toujours la
            mention <strong>« usage sol »</strong> ou la classe de compression
            sur la fiche technique avant achat.
          </p>
        </ArticleCallout>

        {/* ── SECTION 4 : CHAPE FLOTTANTE ──────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          La chape flottante isolante : technique de référence pour isoler un sol béton
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>chape flottante</strong> est la solution la plus polyvalente
          pour <strong>isoler votre dalle</strong> en béton existante par le haut.
          Le principe : l&apos;isolant est posé sur la <strong>dalle béton</strong>,
          puis recouvert d&apos;une <strong>chape</strong> (mortier de ciment ou
          <strong> chape liquide</strong> à base d&apos;anhydrite) qui « flotte »
          sans être liée aux murs ni à la dalle support. Cette désolidarisation
          est essentielle : elle rompt les ponts thermiques latéraux et améliore
          aussi les performances acoustiques.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>chape flottante</strong> est compatible avec tous les{' '}
          <strong>revêtements de sol</strong> : carrelage, parquet massif, parquet
          contrecollé, vinyle LVT, béton ciré ou résine. Elle peut aussi recevoir
          un <strong>plancher chauffant</strong> hydraulique ou électrique, avec
          les tuyaux ou câbles noyés dans la chape elle-même — c&apos;est la
          configuration la plus répandue.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-sol-beton-vide-sanitaire-sous-face.jpg"
          alt="Isolation en sous-face de dalle béton sur vide sanitaire : panneaux XPS fixés directement sous la dalle, vue depuis le vide sanitaire"
          caption="Isolation en sous-face de dalle sur vide sanitaire : des panneaux XPS de 100 mm sont vissés directement sous la dalle en béton côté vide sanitaire. Cette technique préserve la hauteur sous plafond et évite de retirer le revêtement de sol existant."
        />

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Chape liquide ou chape béton : laquelle choisir ?
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>chape liquide</strong> (à base d&apos;anhydrite) s&apos;épand
          automatiquement et nécessite une épaisseur minimale de seulement 40 mm
          (contre 50 à 60 mm pour la chape ciment). Elle offre une meilleure planéité
          naturelle et une mise en œuvre plus rapide. Son inconvénient : un temps
          de séchage plus long (environ 1 semaine par centimètre d&apos;épaisseur en été)
          et une sensibilité à l&apos;humidité avant séchage. Elle est également
          incompatible avec certaines zones humides (salles de bain) sans traitement
          spécifique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La chape béton (ciment + sable + eau) est plus résistante mécaniquement,
          compatible avec tous les environnements, mais nécessite 50 à 60 mm minimum
          et une mise en œuvre manuelle plus exigeante. Pour les{' '}
          <strong>planchers chauffants</strong> hydrauliques, la{' '}
          <strong>chape liquide</strong> est généralement recommandée car elle
          enrobe parfaitement les tuyaux et offre une meilleure diffusion thermique.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Les 6 étapes d&apos;une chape flottante isolante
        </h3>
        <ArticleSteps steps={ETAPES_CHAPE} />

        {/* ── SECTION 5 : TERRE-PLEIN vs VIDE SANITAIRE ────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Dalle sur terre-plein vs dalle sur vide sanitaire : quelle isolation choisir ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le type de <strong>dalle béton</strong> conditionne directement la méthode
          d&apos;isolation et l&apos;<strong>isolant adapté</strong>. Ces deux configurations
          posent des défis très différents.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La dalle sur terre-plein</strong> est la configuration la plus fréquente
          dans les maisons individuelles construites avant 1980. La{' '}
          <strong>dalle béton sur terre-plein</strong> repose directement sur
          le sol (avec ou sans hérisson). Sa principale contrainte est l&apos;humidité
          capillaire : l&apos;eau du sol remonte naturellement par capillarité à travers
          le béton. Pour l&apos;isolation d&apos;une{' '}
          <strong>dalle sur terre-plein</strong>, le <strong>XPS</strong> est
          préféré au PSE grâce à sa résistance à l&apos;humidité. Un film pare-vapeur
          soigneusement posé{' '}
          <strong>directement sous la dalle</strong> ou entre la dalle et l&apos;isolant
          est indispensable pour protéger la chape flottante.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La dalle béton sur vide sanitaire</strong> offre plus de flexibilité :
          si le vide sanitaire est accessible (hauteur ≥ 60 cm), l&apos;isolation en
          sous-face de dalle est envisageable. Cette solution consiste à fixer des
          panneaux XPS ou de laine de roche directement{' '}
          <strong>sous la dalle</strong> côté vide sanitaire, sans travaux intérieurs.
          Elle est particulièrement avantageuse quand la <strong>hauteur sous plafond</strong>{' '}
          est juste : on préserve l&apos;intégralité de la hauteur intérieure sans
          retoucher au <strong>revêtement de sol</strong> existant.
        </p>

        <div className="my-8 grid sm:grid-cols-2 gap-4">
          {[
            {
              titre: "Dalle sur terre-plein",
              isolation: "Par le haut — chape flottante isolante",
              isolant: "XPS 100 mm (résistance humidité) ou PSE graphité + pare-vapeur",
              r: "R = 3,0 à 3,7 m²·K/W",
              aide: "TVA 5,5 % uniquement (pas éligible MPR)",
              color: "blue",
            },
            {
              titre: "Dalle sur vide sanitaire",
              isolation: "Par le haut ou en sous-face de dalle",
              isolant: "XPS 100 mm (sous-face) ou PSE 100 mm (chape flottante)",
              r: "R ≥ 3,0 m²·K/W (seuil MPR)",
              aide: "MaPrimeRénov' + CEE + TVA 5,5 %",
              color: "green",
            },
          ].map((item) => (
            <div
              key={item.titre}
              className={`rounded-2xl p-6 border-2 ${
                item.color === 'blue' ? 'border-blue-200 bg-blue-50' : 'border-emerald-200 bg-emerald-50'
              }`}
            >
              <p className={`text-xl font-bold mb-3 ${
                item.color === 'blue' ? 'text-blue-800' : 'text-emerald-800'
              }`}>{item.titre}</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>Méthode :</strong> {item.isolation}</li>
                <li><strong>Isolant conseillé :</strong> {item.isolant}</li>
                <li><strong>Objectif R :</strong> {item.r}</li>
                <li><strong>Aides :</strong> {item.aide}</li>
              </ul>
            </div>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          À noter : les travaux de{' '}
          <strong>rénovation énergétique</strong> portant sur l&apos;isolation
          du plancher bas font partie des{' '}
          <strong>travaux de rénovation énergétique</strong> éligibles au bonus
          « geste par geste » de MaPrimeRénov&apos; pour les dalles sur vide sanitaire.
          Pour en savoir plus sur l&apos;ensemble des{' '}
          <Link href="/services/isolation" className="text-emerald-700 font-semibold hover:underline">
            travaux d&apos;isolation éligibles aux aides en Île-de-France
          </Link>
          , consultez notre guide dédié.
        </p>

        {/* ── SECTION 6 : PLANCHER CHAUFFANT ──────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Isolation sous dalle béton pour plancher chauffant : pourquoi c&apos;est indispensable
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>chauffage au sol</strong> hydraulique (plancher chauffant à eau
          chaude basse température) est le système le mieux adapté aux{' '}
          <strong>pompes à chaleur</strong> : il fonctionne à basse température (28 à 35 °C)
          et offre une diffusion homogène de la chaleur sur toute la surface de la pièce.
          Mais son efficacité dépend entièrement de la qualité de l&apos;isolation
          <strong> sous la dalle</strong> ou <strong>sous la chape</strong>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Sans <strong>isolation adaptée</strong>, un{' '}
          <strong>plancher chauffant</strong> hydraulique chauffe autant le sol
          (vers le bas, à travers la dalle béton) que la pièce (vers le haut) :
          jusqu&apos;à 30 % de l&apos;énergie produite part ainsi vers la terre
          ou le vide sanitaire, au lieu de chauffer le logement. C&apos;est pourquoi
          la norme <strong>DTU 65.14</strong> (planchers chauffants à eau chaude)
          impose des résistances thermiques minimales{' '}
          <strong>sous la dalle</strong> ou <strong>sous chape</strong>.
        </p>

        <ArticleImageSection
          image="/images/blog/isolation-sol-beton-plancher-chauffant-plots.jpg"
          alt="Pose de tuyaux de plancher chauffant hydraulique sur panneaux isolants PSE à plots — isolation sous chape flottante pour sol béton"
          imagePosition="right"
        >
          <p>
            Les <strong>panneaux de polystyrène expansé à plots</strong> sont la
            solution la plus utilisée pour les planchers chauffants : les tuyaux
            s&apos;insèrent entre les plots qui maintiennent leur espacement régulier.
            Ces panneaux combinent la fonction isolante (λ = 0,031–0,033 W/m·K)
            et le calage des tuyaux en une seule opération, simplifiant la pose.
          </p>
          <p className="mt-3">
            Pour un <strong>plancher chauffant</strong> sur dalle posée sur
            terre-plein en zone climatique H1 (Île-de-France), la norme
            DTU 65.14 exige :
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li><strong>R ≥ 0,75 m²·K/W</strong> sous chape en étage ou sur cave chauffée</li>
            <li><strong>R ≥ 1,25 m²·K/W</strong> sur terre-plein ou cave non chauffée</li>
            <li><strong>R ≥ 1,75 m²·K/W</strong> sur vide sanitaire</li>
          </ul>
          <p className="mt-3">
            Ces valeurs correspondent respectivement à environ 40, 62 et 85 mm
            de PSE graphité à plots. En pratique, on pose généralement 80 à 100 mm
            pour atteindre les exigences MaPrimeRénov&apos; (R ≥ 3,0) sur l&apos;ensemble
            du plancher, y compris sous le système de chauffage.
          </p>
          <p className="mt-3">
            Notre article sur la{' '}
            <Link href="/blog/pompe-a-chaleur-chauffage-au-sol" className="text-emerald-700 font-semibold hover:underline">
              pompe à chaleur pour chauffage au sol
            </Link>{' '}
            détaille le dimensionnement optimal du système en fonction de l&apos;isolation de votre dalle.
          </p>
        </ArticleImageSection>

        {/* ── SECTION 7 : PRIX ─────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Prix de l&apos;isolation d&apos;une dalle béton en 2026 : tarifs au m²
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>prix de l&apos;isolation d&apos;une dalle</strong> de béton varie
          significativement selon la méthode retenue, l&apos;épaisseur d&apos;isolant
          et la solution de finition. Voici les fourchettes de prix constatées
          en 2026 pour des travaux réalisés par un artisan professionnel,
          hors revêtement de sol final.
        </p>

        <ArticleTable {...PRIX_TABLE} title="Prix isolation d'une dalle béton en 2026 — fourniture et pose par un professionnel" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          La solution la plus économique reste l&apos;<strong>isolation sous dalle</strong>
          en construction neuve (20 à 35 €/m²), car elle n&apos;implique pas de chape
          supplémentaire ni de travaux de démolition. En rénovation, la{' '}
          <strong>chape flottante</strong> isolante avec PSE graphité et chape liquide
          représente le meilleur compromis qualité/prix (55 à 85 €/m²), avec
          une <strong>bonne isolation</strong> thermique et acoustique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation en <strong>sous-face</strong> sur vide sanitaire (45 à 75 €/m²)
          est souvent la plus intéressante financièrement en rénovation car elle ne
          nécessite pas de retirer le <strong>revêtement de sol</strong> existant,
          ce qui économise 15 à 30 €/m² de travaux de démolition-remise en état.
          Elle est également éligible à MaPrimeRénov&apos;, ce qui réduit encore
          le reste à charge.
        </p>

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
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

        {/* ── SECTION 8 : AIDES ────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Aides financières pour l&apos;isolation du sol en béton en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          En 2026, les aides disponibles pour <strong>isoler une dalle de béton</strong>
          dépendent du type de dalle. Seules les dalles en contact avec un sous-sol
          non chauffé (vide sanitaire, cave, sous-sol) sont éligibles à MaPrimeRénov&apos;.
          Les <strong>dalles sur terre-plein</strong> ne bénéficient pas de l&apos;aide
          MaPrimeRénov&apos; mais bénéficient de la TVA à 5,5 % et de l&apos;éco-PTZ.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides financières pour l'isolation du plancher bas en 2026" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Pour déclencher MaPrimeRénov&apos;, les travaux doivent être réalisés par un
          artisan certifié <strong>RGE</strong> (Reconnu Garant de l&apos;Environnement)
          et la résistance thermique atteinte (R ≥ 3,0 m²·K/W) doit être justifiable
          par la fiche technique de l&apos;isolant posé. Si vous envisagez également
          d&apos;autres travaux d&apos;isolation, consultez notre guide sur l&apos;
          <Link href="/blog/isolation-mur-interieur-quelle-epaisseur" className="text-emerald-700 font-semibold hover:underline">
            isolation des murs intérieurs
          </Link>{' '}
          qui détaille les aides cumulables pour chaque type de paroi.
        </p>

        <ArticleCallout type="info" title="Pourquoi isoler le sol avant d'installer une pompe à chaleur ?">
          <p>
            Si vous projetez d&apos;installer une{' '}
            <strong>pompe à chaleur</strong> couplée à un{' '}
            <strong>plancher chauffant</strong>, l&apos;
            <strong>isolation du sol</strong> doit idéalement précéder ou accompagner
            l&apos;installation. Une PAC avec plancher chauffant sur sol non isolé
            fonctionnera en permanence à des températures plus élevées, ce qui
            réduit son COP (coefficient de performance) et sa durée de vie. Bien{' '}
            <strong>isoler votre dalle</strong> au préalable peut améliorer le
            rendement de votre installation de chauffage au sol de 15 à 30 %.
          </p>
        </ArticleCallout>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <ArticleCTA
          title="Obtenez un devis gratuit pour l'isolation de votre sol béton en Île-de-France"
          description="Nos artisans certifiés RGE évaluent votre dalle (terre-plein ou vide sanitaire), calculent l'isolant adapté, montent votre dossier MaPrimeRénov' et vous proposent un devis sous 48h. Intervention sur toute l'Île-de-France."
        />

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;isolation pour sol béton
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
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Meilleur isolant thermique pour murs intérieurs 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/pompe-a-chaleur-chauffage-au-sol"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Pompe à chaleur pour plancher chauffant : guide 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/lp/isolation"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Devis gratuit</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Isolation sol béton — devis RGE sous 48h
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Obtenir un devis <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ── LIENS VILLES ──────────────────────────────────────────────────────── */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Isolation sol béton par ville en Île-de-France
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
