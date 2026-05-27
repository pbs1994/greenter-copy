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
  ARTICLE_META, PUISSANCE_TABLE, ZONE_TABLE,
  EXAMPLE_CALCULATION, TIPS_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pac-puissance-2026'

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
      url: 'https://www.greenter.fr/images/blog/pac-air-eau-moderne-maison-pierre.jpg',
      width: 1200,
      height: 630,
      alt: "Pompe à chaleur air-eau moderne installée devant une maison en pierre — dimensionnement et puissance",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pac-air-eau-moderne-maison-pierre.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Puissance pompe à chaleur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function PuissancePompeAChaleur() {
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
        image="https://www.greenter.fr/images/blog/pac-air-eau-moderne-maison-pierre.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pac-air-eau-moderne-maison-pierre.jpg"
        heroAlt="Pompe à chaleur air-eau de grande puissance installée devant une maison en pierre naturelle — feuilles d'automne au sol"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Choisir la <strong>puissance de votre pompe à chaleur</strong> est la décision
            technique la plus importante de votre projet de chauffage. Une{' '}
            <strong>PAC sous-dimensionnée</strong> ne pourra pas maintenir le confort thermique
            pendant les grands froids et sollicitera en permanence sa résistance électrique
            d&apos;appoint — ruineuse en termes de facture. Une <strong>PAC surdimensionnée</strong>
            fonctionnera en cycles courts, perdra en efficacité et s&apos;usera prématurément.
            Pourtant, <strong>calculer la puissance d&apos;une pompe à chaleur</strong> se résume
            à quelques paramètres bien identifiés.
          </p>
          <p>
            La <strong>puissance d&apos;une pompe à chaleur air-eau</strong> se mesure en kilowatts
            thermiques (kW). Pour une maison de 100 m² bien isolée en Île-de-France, la
            fourchette typique est de <strong>7 à 9 kW</strong>. Pour la même surface avec une
            mauvaise isolation, il faudra compter <strong>12 à 16 kW</strong>. Ces écarts
            considérables s&apos;expliquent par les déperditions thermiques du logement, qui dépendent
            avant tout du niveau d&apos;isolation, de la zone climatique et de la hauteur sous plafond.
          </p>
          <p>
            Ce guide vous explique comment <strong>calculer la puissance idéale pour votre
            pompe à chaleur</strong>, présente un tableau complet de dimensionnement de 50 à
            300 m², détaille les facteurs qui influencent ce choix et vous donne les clés pour
            éviter les erreurs de dimensionnement les plus courantes.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La formule pour calculer la puissance nécessaire à votre pompe à chaleur</li>
            <li>Tableau de dimensionnement de 50 à 300 m² selon l&apos;isolation (DPE)</li>
            <li>L&apos;impact de la zone climatique (H1, H2, H3) sur la puissance requise</li>
            <li>Les risques d&apos;une PAC mal dimensionnée — et comment les éviter</li>
            <li>PAC air-eau vs PAC air-air : différences de puissance</li>
            <li>La méthode DTU 65.16 pour un bilan thermique fiable</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : QU'EST-CE QUE LA PUISSANCE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          La puissance d&apos;une pompe à chaleur : ce qu&apos;il faut savoir
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Quand on parle de <strong>puissance d&apos;une pompe à chaleur</strong>, on parle toujours
          de puissance <em>thermique</em> — c&apos;est-à-dire la quantité de chaleur que la PAC est
          capable de produire par heure, exprimée en kilowatts (kW). Cette notion est très
          différente de la puissance électrique absorbée. Une{' '}
          <strong>pompe à chaleur air-eau</strong> de 10 kW thermiques avec un COP de 4 ne
          consomme que 2,5 kW d&apos;électricité : les 7,5 kW restants proviennent des calories
          puisées gratuitement dans l&apos;air extérieur. C&apos;est ce principe qui rend les pompes
          à chaleur si attractives sur le plan économique.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-puissance-unite-compacte-bardage-bois.jpg"
          alt="Unité extérieure compacte d'une pompe à chaleur air-air fixée sur un bardage en bois — petite puissance pour maison individuelle"
          imagePosition="right"
        >
          <p>
            Les <strong>pompes à chaleur résidentielles</strong> couvrent une plage de puissance
            thermique allant de <strong>4 kW à plus de 30 kW</strong>. Les petits modèles
            (4 à 6 kW) sont destinés aux appartements et petites maisons bien isolées. Les
            modèles intermédiaires (7 à 14 kW) couvrent la grande majorité des maisons
            individuelles de 80 à 150 m². Les appareils de forte puissance (15 à 30+ kW)
            s&apos;adressent aux grandes maisons, aux maisons mal isolées ou aux installations
            tertiaires légères.
          </p>
          <p className="mt-3">
            Un point souvent mal compris : la <strong>puissance nécessaire</strong> ne dépend
            pas seulement de la surface, mais des <em>déperditions thermiques</em> du logement.
            Une maison de 100 m² construite en 2020 selon la RE2020 peut avoir des besoins
            deux à trois fois inférieurs à ceux d&apos;une maison de même surface construite en
            1970 sans isolation. C&apos;est pourquoi le <strong>bon dimensionnement</strong>
            commence toujours par l&apos;analyse du logement, pas par sa surface seule.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '4–5 kW', label: 'puissance minimale pour une PAC air-eau résidentielle', color: 'blue' },
          { value: '7–9 kW', label: 'puissance typique pour 100 m² bien isolé (zone H2)', color: 'green' },
          { value: '×4', label: 'kWh de chaleur produits pour 1 kWh électrique consommé (COP 4)', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : COMMENT CALCULER ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment calculer la puissance d&apos;une pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La méthode de <strong>calcul de la puissance d&apos;une PAC</strong> repose sur un principe
          simple : la puissance thermique doit être égale aux déperditions maximales du logement,
          auxquelles on ajoute la puissance nécessaire pour la production d&apos;eau chaude sanitaire.
          Le tout multiplié par un coefficient de zone climatique et une marge de sécurité.
        </p>

        <div className="my-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <p className="text-center font-mono text-lg font-bold text-slate-900 mb-4">
            Puissance PAC (kW) = Surface (m²) × Coeff. déperdition (W/m²) ÷ 1 000 + ECS
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 mt-4">
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-2">Coefficient selon DPE :</p>
              <ul className="space-y-1 text-xs">
                <li>DPE A-B (neuf/RT2020) : <strong>40–50 W/m²</strong></li>
                <li>DPE C (bien rénové) : <strong>60–75 W/m²</strong></li>
                <li>DPE D (correct) : <strong>80–100 W/m²</strong></li>
                <li>DPE E (vieille maison) : <strong>110–140 W/m²</strong></li>
                <li>DPE F-G (passoire) : <strong>150–200 W/m²</strong></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-2">Ajout ECS :</p>
              <ul className="space-y-1 text-xs">
                <li>1-2 personnes : <strong>+1 kW</strong></li>
                <li>3-4 personnes : <strong>+1,5 kW</strong></li>
                <li>5 personnes et + : <strong>+2–3 kW</strong></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-2">Correction hauteur :</p>
              <ul className="space-y-1 text-xs">
                <li>Plafonds ≤ 2,50 m : <strong>× 1,0</strong></li>
                <li>Plafonds 2,50–3,00 m : <strong>× 1,1</strong></li>
                <li>Plafonds &gt; 3,00 m : <strong>× 1,2</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>déterminer la puissance nécessaire</strong> avec précision, la première
          étape est de lire votre DPE (Diagnostic de Performance Énergétique). Ce document,
          obligatoire depuis 2006, indique la consommation en kWh/m²/an et classe votre
          logement de A à G. Il vous donne directement le coefficient de déperdition moyen
          à utiliser dans la formule. Un logement classé C consomme entre 91 et 150 kWh/m²/an,
          ce qui correspond à un coefficient de déperdition d&apos;environ 60 à 80 W/m².
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Si vous n&apos;avez pas de DPE récent, un{' '}
          <Link href="/services/audit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            <strong>audit énergétique</strong>
          </Link>{' '}
          réalisé par un professionnel RGE va plus loin : il calcule les déperditions pièce
          par pièce en tenant compte de l&apos;orientation, des matériaux de construction, des
          ponts thermiques et des menuiseries. C&apos;est la méthode la plus fiable pour
          <strong> déterminer la puissance nécessaire</strong> à votre pompe à chaleur.
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
              <p className="text-sm text-slate-500 mb-1">Efficacité énergétique</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Aide disponible</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        {/* ---- SECTION 3 : TABLEAU PAR SURFACE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Puissance pompe à chaleur selon la surface — tableau complet 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le tableau suivant donne la <strong>puissance PAC recommandée</strong> selon la surface
          du logement et son niveau d&apos;isolation, pour la zone climatique H2 (Île-de-France et
          Centre). Il intègre une marge de sécurité de 15 % mais n&apos;inclut pas la production
          d&apos;eau chaude sanitaire — ajoutez 1 à 3 kW selon le nombre d&apos;occupants. Pour les zones
          H1 et H3, consultez le tableau de correction climatique ci-dessous.
        </p>

        <ArticleTable {...PUISSANCE_TABLE} title="Puissance PAC air-eau recommandée selon la surface et l'isolation — zone H2" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ce tableau confirme une réalité souvent sous-estimée : <strong>l&apos;isolation est plus
          déterminante que la surface</strong> pour choisir la puissance d&apos;une pompe à chaleur.
          Une maison de 100 m² bien isolée nécessite la même puissance PAC qu&apos;une maison de
          50 m² mal isolée. C&apos;est la raison pour laquelle les professionnels recommandent
          systématiquement d&apos;entreprendre des{' '}
          <Link href="/blog/meilleur-isolant-thermique-murs-interieur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            travaux d&apos;isolation
          </Link>{' '}
          avant ou en même temps que l&apos;installation d&apos;une PAC : cela permet de descendre
          d&apos;une gamme de puissance et donc de réduire le coût de l&apos;équipement.
        </p>

        {/* ---- SECTION 4 : FACTEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les facteurs qui influencent la puissance nécessaire
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>puissance nécessaire pour couvrir</strong> les besoins de chauffage d&apos;un
          logement résulte de l&apos;interaction de plusieurs paramètres. Les comprendre permet de
          faire des choix éclairés — et parfois d&apos;économiser plusieurs milliers d&apos;euros sur
          le coût d&apos;installation en choisissant une puissance plus basse grâce à de meilleures
          performances thermiques du bâti.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>L&apos;isolation du logement</strong> est le facteur numéro un. Elle conditionne
          directement les déperditions thermiques et donc la <strong>puissance de la PAC</strong>
          à installer. Une maison dont les combles, les murs et les planchers sont bien isolés
          perd 3 à 5 fois moins de chaleur par degré d&apos;écart entre l&apos;intérieur et l&apos;extérieur.
          C&apos;est ce qu&apos;exprime le coefficient de déperdition : 50 W/m² pour une maison neuve
          RE2020, contre 180 W/m² pour une passoire thermique. Avant d&apos;installer une pompe à
          chaleur, il est toujours rentable d&apos;améliorer l&apos;isolation — MaPrimeRénov&apos; finance
          les deux en dossier combiné.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-air-eau-dalle-beton-maison-blanche.jpg"
          alt="Pompe à chaleur air-eau posée sur dalle béton devant une maison blanche moderne avec jardin — dimensionnement correct"
          imagePosition="left"
        >
          <p>
            <strong>La zone climatique</strong> influence directement la température extérieure
            de base retenue pour le calcul. En zone H2 (Île-de-France), cette température est
            de −7 °C selon la norme NF EN 12831. En zone H1 (nord de la France, Alsace,
            massifs), elle descend à −12 °C voire −15 °C en altitude. Résultat : pour la même
            maison de 100 m² bien isolée, il faudra 20 à 25 % de puissance supplémentaire en
            zone H1 par rapport à la zone H2.
          </p>
          <p className="mt-3">
            <strong>La hauteur sous plafond</strong> est un facteur souvent négligé. Le calcul
            de déperditions porte sur le <em>volume</em>, pas uniquement la surface. Un salon
            de 40 m² avec des plafonds à 3 m représente 20 % de volume supplémentaire par
            rapport au même salon avec des plafonds à 2,50 m. Ce volume supplémentaire d&apos;air
            à chauffer doit être intégré dans la <strong>puissance requise</strong>, surtout
            dans les maisons anciennes aux grands volumes.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mt-4 mb-4">
          <strong>La production d&apos;eau chaude sanitaire</strong> représente un poste
          supplémentaire souvent sous-estimé. Une{' '}
          <strong>pompe à chaleur air-eau</strong> couplée à un ballon thermodynamique produit
          à la fois le chauffage et l&apos;eau chaude sanitaire d&apos;un logement. La part ECS ajoute
          1 à 3 kW à la puissance de dimensionnement selon le nombre d&apos;occupants. Pour une
          famille de 4 personnes, comptez +1,5 kW minimum. Certains modèles dissocient
          les circuits chauffage et ECS avec deux échangeurs distincts, ce qui optimise les
          performances en régime mixte.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, le <strong>type d&apos;émetteurs de chaleur</strong> influence indirectement la
          puissance à installer. Une PAC alimentant un plancher chauffant basse température
          (35–40 °C) fonctionne avec un COP 30 % meilleur qu&apos;une PAC alimentant des
          radiateurs haute température (65–75 °C). Si votre logement est équipé de vieux
          radiateurs en fonte, soit vous les remplacez par des radiateurs basse température,
          soit vous devez dimensionner une PAC haute température — qui coûtera davantage à
          l&apos;usage.
        </p>

        <ArticleCallout type="tip" title="Astuce avant de choisir la puissance de votre PAC">
          <p>
            Si votre DPE est classé E, F ou G, envisagez d&apos;abord des travaux d&apos;isolation
            avant de dimensionner la PAC. Un logement passant de DPE F à DPE C après isolation
            peut voir sa puissance PAC nécessaire réduite de 40 à 50 %, ce qui permet
            d&apos;installer un modèle moins coûteux et plus efficace. MaPrimeRénov&apos; finance
            les deux postes dans un même dossier de rénovation globale.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : ZONE CLIMATIQUE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Zone climatique et température extérieure de base
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le <strong>dimensionnement d&apos;une pompe à chaleur</strong> intègre toujours la notion
          de <em>température extérieure de base</em> (TEB) : c&apos;est la température la plus basse
          statistiquement atteinte dans votre région, utilisée comme hypothèse de calcul au
          pire. Elle est définie par la norme NF EN 12831 et le DTU 65.16 selon les trois
          zones climatiques françaises. Plus la TEB est basse, plus la <strong>puissance de
          votre pompe à chaleur</strong> devra être élevée pour maintenir le confort thermique.
        </p>

        <ArticleTable {...ZONE_TABLE} title="Zones climatiques françaises et impact sur la puissance PAC" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces coefficients correcteurs s&apos;appliquent à la puissance calculée pour la zone H2.
          Un propriétaire en zone H1 doit donc prévoir une PAC notablement plus puissante que
          son voisin francilien pour le même logement. À l&apos;inverse, les propriétaires en zone
          H3 profitent d&apos;hivers plus doux et peuvent se contenter d&apos;une puissance inférieure.
          Ces écarts valident l&apos;importance de ne jamais copier le dimensionnement d&apos;un voisin
          ou d&apos;un ami : seule votre situation géographique et votre logement spécifique comptent.
        </p>

        {/* ---- SECTION 6 : RISQUES MAL DIMENSIONNÉ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pompe à chaleur mal dimensionnée : les deux erreurs à éviter
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une <strong>pompe à chaleur mal dimensionnée</strong> pose des problèmes qui se
          manifestent dès le premier hiver, et dont les conséquences se font sentir sur
          toute la durée de vie de l&apos;installation. Les deux erreurs sont opposées mais
          tout aussi coûteuses.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La PAC surdimensionnée</strong> est l&apos;erreur la plus fréquente, souvent
          commise par excès de prudence ou par un installateur peu rigoureux. Une
          <strong> pompe à chaleur</strong> dont la puissance dépasse de plus de 20 % les
          besoins réels du logement fonctionne en cycles courts : elle démarre, atteint
          rapidement la consigne de température, s&apos;arrête, puis redémarre quelques minutes
          plus tard. Ce phénomène dit de <em>court-cycling</em> dégrade le COP de 15 à 25 %,
          soumet le compresseur à des contraintes mécaniques répétées et réduit sa durée de
          vie. Sur 15 ans, le surcoût de fonctionnement peut atteindre plusieurs milliers
          d&apos;euros.
        </p>

        <ArticleFullImage
          image="/images/blog/pac-puissance-terrasse-jardin.jpg"
          alt="Grande pompe à chaleur air-eau sur terrasse béton avec jardin et haies — puissance adaptée grande surface"
          caption="Une PAC bien dimensionnée fonctionne en continu à faible charge plutôt qu'en cycles courts — c'est la condition pour maintenir un COP optimal toute la saison."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La PAC sous-dimensionnée</strong> est l&apos;erreur inverse, tout aussi
          dommageable. Si la <strong>puissance de la PAC</strong> est inférieure aux déperditions
          thermiques du logement lors des périodes de grand froid, la résistance électrique
          d&apos;appoint intégrée prend le relais. Cette résistance, qui fonctionne comme un
          simple convecteur électrique avec un rendement de 1 pour 1, consomme 3 à 4 fois
          plus qu&apos;une PAC bien dimensionnée. Si elle s&apos;enclenche plus de 10 à 15 % du temps
          de fonctionnement annuel, votre facture d&apos;électricité s&apos;envole. Le
          <strong> manque de puissance</strong> se traduit aussi par un inconfort thermique
          réel lors des épisodes de grand froid.
        </p>

        <ArticleCallout type="warning" title="Signal d'alerte : votre PAC est-elle bien dimensionnée ?">
          <p>
            Si votre résistance électrique d&apos;appoint s&apos;enclenche régulièrement dès que la
            température extérieure descend en dessous de 0 °C, c&apos;est souvent le signe
            d&apos;un sous-dimensionnement. À l&apos;inverse, si la PAC s&apos;arrête et redémarre
            plusieurs fois par heure en demi-saison, elle est probablement trop puissante.
            Un technicien RGE peut diagnostiquer ces problèmes et, dans certains cas,
            corriger le réglage des courbes de chauffe sans remplacer l&apos;équipement.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 7 : PAC AIR-EAU VS AIR-AIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          PAC air-eau vs PAC air-air : des logiques de puissance différentes
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>pompes à chaleur air-eau</strong> et les{' '}
          <strong>PAC air-air</strong> n&apos;obéissent pas aux mêmes règles de dimensionnement.
          La <strong>PAC air-eau</strong> chauffe l&apos;eau d&apos;un circuit hydraulique (plancher
          chauffant, radiateurs) qui distribue la chaleur dans toutes les pièces. Elle se
          dimensionne en puissance totale pour l&apos;ensemble du logement : 7 à 10 kW pour
          100 m² bien isolé. C&apos;est le système adapté au remplacement d&apos;une chaudière dans
          une maison individuelle.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>PAC air-air</strong> (climatisation réversible) fonctionne différemment :
          chaque unité intérieure chauffe une pièce ou une zone. Une unité monosplit de 2 à
          5 kW convient à une pièce principale de 20 à 50 m². Pour chauffer l&apos;ensemble d&apos;une
          maison de 100 m², il faut souvent un système <em>multi-split</em> avec 3 à 4 unités
          intérieures et une unité extérieure de 8 à 12 kW. La PAC air-air ne produit pas
          d&apos;eau chaude sanitaire et ne se connecte pas à un circuit hydraulique existant —
          ce qui la rend moins polyvalente que la PAC air-eau en rénovation. Pour un
          comparatif complet des coûts, consultez notre{' '}
          <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            guide des prix de pompes à chaleur 2026
          </Link>.
        </p>

        {/* ---- SECTION 8 : BILAN THERMIQUE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Bilan thermique et méthode DTU 65.16 : la seule approche fiable
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les formules simplifiées présentées dans ce guide donnent une bonne approximation
          pour comprendre les ordres de grandeur, mais elles ne remplacent pas un{' '}
          <strong>bilan thermique professionnel</strong>. La méthode de référence en France
          est le <strong>DTU 65.16</strong>, qui calcule les déperditions thermiques pièce par
          pièce selon la norme NF EN 12831. Ce calcul tient compte de l&apos;orientation de
          chaque paroi, des matériaux de construction, des vitrages, des ponts thermiques
          et du renouvellement d&apos;air.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-puissance-unite-compacte-bardage-bois.jpg"
          alt="Petite unité extérieure de PAC fixée sur bardage bois — dimensionnement adapté surface modeste"
          imagePosition="right"
        >
          <p>
            Un bilan thermique DTU 65.16 permet de <strong>déterminer la puissance
            nécessaire</strong> avec une précision de ±5 %, contre ±25 % pour les méthodes
            simplifiées. Il est obligatoire pour les installations financées par
            MaPrimeRénov&apos; et doit être réalisé par un installateur certifié{' '}
            <strong>RGE QualiPAC</strong>. Son résultat détermine non seulement la puissance
            de la PAC, mais aussi les débits à prévoir dans chaque pièce pour les planchers
            chauffants et les radiateurs.
          </p>
          <p className="mt-3">
            Ce bilan est généralement inclus dans le devis d&apos;un installateur RGE sérieux.
            S&apos;il n&apos;est pas proposé, c&apos;est un signal d&apos;alerte : un professionnel qui
            dimensionne une PAC sans bilan thermique formel prend un risque sur la
            <strong> puissance de votre appareil</strong> — et c&apos;est vous qui en supportez
            les conséquences sur la facture.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mt-4 mb-6">
          Pour les logements dont le <strong>diagnostic de performance énergétique</strong>
          date de plus de 10 ans, un nouveau DPE ou un audit énergétique est fortement
          recommandé avant toute installation. Les coefficients de déperdition de l&apos;ancien
          DPE peuvent ne plus refléter la réalité si des travaux d&apos;isolation ont été réalisés
          entre-temps — ce qui conduirait à surdimensionner la PAC par rapport aux besoins
          réels actuels. À l&apos;inverse, un logement dont l&apos;isolation s&apos;est dégradée (humidité,
          tassement de l&apos;isolant) peut avoir des besoins supérieurs aux valeurs théoriques.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          Les 6 étapes pour bien dimensionner votre pompe à chaleur
        </h3>

        <ArticleSteps steps={TIPS_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Suivre ces six étapes dans l&apos;ordre garantit un <strong>bon dimensionnement</strong>
          de votre PAC et maximise vos chances d&apos;obtenir MaPrimeRénov&apos;. Un installateur
          RGE QualiPAC est non seulement qualifié pour réaliser ce calcul : il en est
          responsable contractuellement. Si la PAC s&apos;avère mal dimensionnée après
          installation, il est tenu de corriger le problème.
        </p>

        <ArticleStat stats={[
          { value: '±5 %', label: 'précision d\'un bilan thermique DTU 65.16 professionnel', color: 'green' },
          { value: '±25 %', label: 'marge d\'erreur des méthodes simplifiées (m² × coefficient)', color: 'blue' },
          { value: '15–25 %', label: 'perte de COP causée par le court-cycling d\'une PAC surdimensionnée', color: 'blue' },
        ]} />

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Faites dimensionner votre PAC par un expert RGE en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC réalisent le bilan thermique DTU 65.16 de votre logement, calculent la puissance exacte et montent votre dossier MaPrimeRénov' 2026. Devis gratuit sous 48h."
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
              Prix d&apos;une PAC en 2026 : coûts, aides, rentabilité
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
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
          <Link
            href="/blog/meilleur-isolant-thermique-murs-interieur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Guide isolation</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Meilleure isolation des murs intérieurs en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Installation pompe à chaleur par ville en Île-de-France
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
