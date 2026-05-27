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
  ARTICLE_META, CONSUMPTION_TABLE, SURFACE_TABLE,
  EXAMPLE_CALCULATION, TIPS_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/pac-consommation-100m2-2026'

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
      url: 'https://www.greenter.fr/images/blog/pac-unite-exterieure-maison-briques-plantes.jpg',
      width: 1200,
      height: 630,
      alt: "Unité extérieure d'une pompe à chaleur air-eau installée sur une maison en briques",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pac-unite-exterieure-maison-briques-plantes.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Consommation PAC maison 100m²', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function ConsommationPACMaison100m2() {
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
        image="https://www.greenter.fr/images/blog/pac-unite-exterieure-maison-briques-plantes.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pac-unite-exterieure-maison-briques-plantes.jpg"
        heroAlt="Unité extérieure d'une pompe à chaleur air-eau fixée sur le mur d'une maison en briques rouges avec jardin"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            C&apos;est la question que se posent des millions de propriétaires avant de passer
            à la pompe à chaleur : <strong>combien consomme une pompe à chaleur pour une maison
            de 100 m² ?</strong> La réponse courte est entre <strong>2 900 et 5 100 kWh
            d&apos;électricité par an</strong> — soit 3 à 4 fois moins qu&apos;un chauffage électrique
            classique pour la même surface. Mais cette fourchette cache des réalités très
            différentes selon l&apos;isolation du logement, la zone climatique et le type de PAC.
          </p>
          <p>
            Une <strong>pompe à chaleur air-eau</strong> ne produit pas de chaleur à partir de
            l&apos;électricité comme un radiateur classique : elle la puise dans l&apos;air extérieur et
            l&apos;amplifie. Pour 1 kWh d&apos;énergie électrique consommée, une PAC moderne restitue
            entre <strong>3 et 4 kWh de chaleur</strong> dans votre maison. C&apos;est ce qu&apos;on
            appelle le <em>coefficient de performance</em> (COP). C&apos;est ce ratio qui rend la PAC
            si attractive économiquement — et c&apos;est lui qui détermine votre consommation réelle.
          </p>
          <p>
            Ce guide vous donne tous les chiffres concrets pour <strong>calculer la consommation
            de votre pompe à chaleur</strong>, comprendre les facteurs qui la font varier, et
            savoir comment la réduire au maximum.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La consommation moyenne d&apos;une PAC pour une maison de 100 m² (chiffres ADEME 2026)</li>
            <li>La formule pour calculer la consommation de votre propre PAC</li>
            <li>Tableau comparatif selon la surface et l&apos;isolation</li>
            <li>PAC air-eau vs chauffage électrique classique : l&apos;économie réelle</li>
            <li>6 leviers concrets pour réduire la consommation électrique de votre PAC</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : CONSOMMATION MOYENNE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle est la consommation d&apos;une pompe à chaleur pour une maison de 100 m² ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour répondre précisément à cette question, il faut distinguer deux situations très
          courantes. Une <strong>maison bien isolée de 100 m²</strong> — construite après 2000
          ou rénovée thermiquement — a des besoins thermiques annuels de l&apos;ordre de
          10 000 à 12 000 kWh de chaleur. Avec un SCOP (coefficient de performance saisonnier)
          de 3,5, une PAC air-eau consommera entre <strong>2 900 et 3 500 kWh
          d&apos;électricité par an</strong>.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          À l&apos;inverse, une <strong>maison mal isolée de 100 m²</strong> — souvent construite avant
          1975, sans isolation des murs ni des combles — peut nécessiter 15 000 à 18 000 kWh
          de chaleur pour rester confortable en hiver. Dans ce cas, la même PAC avec le même
          SCOP consommera entre <strong>4 500 et 5 100 kWh d&apos;électricité par an</strong>.
          Cela reste bien en deçà du chauffage électrique classique qui, pour la même maison mal
          isolée, consommerait 15 000 à 18 000 kWh — mais cela illustre l&apos;importance capitale
          de l&apos;isolation.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-hybride-maison-moderne.avif"
          alt="Pompe à chaleur hybride installée sur une maison moderne — unité extérieure compacte fixée en façade"
          imagePosition="right"
        >
          <p>
            Pour comparer avec d&apos;autres systèmes de chauffage : un <strong>chauffage électrique
            classique</strong> à résistance a un rendement de 1 pour 1 — il consomme exactement
            autant d&apos;électricité qu&apos;il produit de chaleur. Pour chauffer une maison de 100 m²
            bien isolée nécessitant 12 000 kWh de chaleur, il consomme 12 000 kWh. La PAC
            consomme 3 à 4 fois moins pour produire la même chaleur pour votre maison.
          </p>
          <p className="mt-3">
            La <strong>pompe à chaleur géothermique</strong> pousse cette logique encore plus loin.
            Avec un SCOP de 4,5 à 5, elle consomme entre 2 200 et 2 700 kWh pour une maison
            de 100 m² bien isolée — soit 20 à 30 % de moins que la PAC air-eau. Son coût
            d&apos;installation plus élevé (20 000 à 35 000 €) s&apos;amortit sur une consommation
            annuelle encore plus basse et une durée de vie supérieure.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '3 à 4×', label: 'plus économique que le chauffage électrique classique', color: 'green' },
          { value: '3 430', label: 'kWh/an en moyenne pour 100 m² bien isolé (PAC air-eau)', color: 'blue' },
          { value: '5 100', label: 'kWh/an maximum pour 100 m² mal isolé (PAC air-eau)', color: 'blue' },
        ]} />

        {/* ---- SECTION 2 : COP ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Le coefficient de performance (COP) : la clé pour comprendre la consommation
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Toute la logique de la pompe à chaleur repose sur le <strong>coefficient de performance
          (COP)</strong>. C&apos;est le rapport entre la chaleur produite et l&apos;énergie électrique
          consommée : un COP de 3 signifie que pour <strong>1 kWh électrique consommé</strong>,
          la PAC restitue <strong>3 kWh de chaleur</strong> dans votre logement. Les 2 kWh
          supplémentaires proviennent des calories puisées dans l&apos;air extérieur — une énergie
          gratuite et renouvelable.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          En pratique, on distingue deux valeurs. Le <strong>COP instantané</strong> mesure
          l&apos;efficacité à un instant donné, par exemple par -5 °C dehors. Le{' '}
          <strong>SCOP (Seasonal COP)</strong> est le plus important pour calculer votre
          consommation annuelle : il prend en compte toutes les conditions de fonctionnement
          au fil des saisons. Pour une PAC air-eau en zone H2 (Île-de-France), le SCOP
          oscille généralement entre 3,2 et 4,2 selon le modèle.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>température extérieure</strong> est le facteur qui fait le plus varier
          le COP instantané. Par 15 °C dehors, une PAC peut atteindre un COP de 5 ou plus.
          Par -5 °C, ce même COP peut descendre à 2,5 voire 2. Les jours les plus froids
          de l&apos;hiver sont donc les moments où la PAC est la moins efficace — et où elle
          consomme le plus. C&apos;est pourquoi certains modèles intègrent une résistance
          électrique d&apos;appoint qui prend le relais sous un certain seuil de température,
          ce qui augmente la consommation varie selon les périodes de grand froid.
        </p>

        <ArticleCallout type="tip" title="Comment lire le SCOP de votre PAC ?">
          <p>
            Le SCOP est obligatoirement affiché sur l&apos;étiquette énergie européenne de toute
            PAC commercialisée dans l&apos;UE. Pour être éligible à MaPrimeRénov&apos;, une PAC
            air-eau doit justifier d&apos;un COP ≥ 3,3 en régime de chauffage haute température,
            ou ≥ 4,0 en régime basse température (35 °C). Les PAC modernes des grandes marques
            (Daikin, Mitsubishi, Atlantic) affichent des SCOP entre 3,8 et 5,1.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : COMMENT CALCULER ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment calculer la consommation de votre pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La formule pour <strong>calculer la consommation d&apos;une pompe à chaleur</strong> est
          simple : divisez vos besoins thermiques annuels par le SCOP de votre PAC. Le résultat
          est votre consommation électrique annuelle en kWh.
        </p>

        <div className="my-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <p className="text-center font-mono text-xl font-bold text-slate-900 mb-4">
            Consommation (kWh élec) = Besoins thermiques (kWh chaleur) ÷ SCOP
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-1">Exemple — maison bien isolée :</p>
              <p>12 000 kWh chaleur ÷ 3,5 = <strong>3 430 kWh élec</strong></p>
              <p className="text-slate-400 mt-1">≈ 857 €/an à 0,25 €/kWh</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-1">Exemple — maison mal isolée :</p>
              <p>18 000 kWh chaleur ÷ 3,5 = <strong>5 143 kWh élec</strong></p>
              <p className="text-slate-400 mt-1">≈ 1 286 €/an à 0,25 €/kWh</p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour estimer vos <strong>besoins thermiques</strong>, le plus simple est de regarder
          votre DPE (Diagnostic de Performance Énergétique). Si votre logement est classé
          C, comptez environ 100 à 120 kWh/m²/an. Pour un classement D, plutôt 130 à 160 kWh.
          En dessous de E, au-delà de 200 kWh/m²/an. Multipliez par votre surface pour
          obtenir vos besoins annuels totaux.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Pour aller plus loin, un technicien RGE peut réaliser un <strong>bilan thermique
          précis</strong> de votre logement. Ce document calcule les déperditions pièce par pièce
          et donne le dimensionnement exact de la PAC nécessaire. C&apos;est une étape indispensable
          avant toute installation, et elle est souvent incluse dans le devis.
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
              <p className="text-sm text-slate-500 mb-1">Efficacité vs chauffage électrique</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.savings}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-sm text-slate-500 mb-1">Retour sur investissement</p>
              <p className="text-xl font-bold text-emerald-700">{EXAMPLE_CALCULATION.roi}</p>
            </div>
          </div>
        </div>

        {/* ---- SECTION 4 : COMPARATIF SYSTÈMES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Consommation pompe à chaleur vs chauffage électrique classique : le comparatif
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour comprendre l&apos;avantage réel d&apos;une pompe à chaleur, rien ne vaut un tableau
          comparatif avec les autres systèmes de chauffage. Le chauffage électrique classique
          — radiateurs à convection ou à accumulation — a un rendement de 100 % : il transforme
          1 kWh d&apos;électricité en exactement 1 kWh de chaleur. La PAC, elle, transforme
          1 kWh d&apos;électricité en 3 à 4 kWh de chaleur grâce aux calories puisées dans l&apos;air.
          C&apos;est une différence fondamentale de nature, pas seulement de performance.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La chaudière gaz condensation, longtemps considérée comme le système de chauffage
          le plus économique, souffre aujourd&apos;hui de deux handicaps : le prix du gaz en
          hausse (0,1256 €/kWh en mai 2026, +5,3 % en mars) et la TVA passée à 20 % sur
          les chaudières neuves depuis décembre 2024. Pour une maison bien isolée, la PAC
          air-eau devient moins chère à l&apos;usage que la chaudière gaz dès lors que le SCOP
          dépasse 2,0 — ce qui est le cas de toutes les PAC modernes.
        </p>

        <ArticleTable {...CONSUMPTION_TABLE} title="Consommation et coût annuel selon le système de chauffage — maison de 100 m²" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces chiffres parlent d&apos;eux-mêmes : sur une maison bien isolée, la PAC air-eau
          coûte <strong>2 à 3 fois moins cher</strong> à utiliser que le chauffage électrique
          classique, et reste comparable voire moins chère que le gaz tout en émettant
          beaucoup moins de CO₂. Sur une maison mal isolée, l&apos;écart se creuse encore davantage
          — et c&apos;est dans ces logements que l&apos;installation d&apos;une PAC, combinée à des travaux
          d&apos;isolation, offre les meilleurs retours sur investissement.
        </p>

        {/* ---- SECTION 5 : FACTEURS ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les facteurs influençant la consommation de votre PAC
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La consommation varie selon plusieurs paramètres qui interagissent entre eux.
          Comprendre ces facteurs vous permet de comprendre pourquoi cette consommation
          peut différer significativement d&apos;une maison à l&apos;autre, même à surface égale.
        </p>

        <ArticleFullImage
          image="/images/blog/pac-unites-exterieures-installation.jpg"
          alt="Deux unités extérieures de pompes à chaleur air-eau installées sur socles en béton — installation résidentielle"
          caption="Installation de deux PAC air-eau sur socles antivibratiles — le positionnement et l'aération de l'unité extérieure influencent directement le COP et donc la consommation."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>L&apos;isolation du logement</strong> est le facteur numéro un. Une maison bien
          isolée réduit ses besoins thermiques de 30 à 50 % par rapport à une maison non isolée.
          Pour la PAC, cela se traduit directement par une consommation réduite du même ordre.
          C&apos;est pourquoi le programme MaPrimeRénov&apos; encourage à combiner isolation et
          installation de PAC dans un seul dossier de rénovation globale.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La zone climatique</strong> joue également un rôle majeur. En zone H1
          (nord de la France, Alsace, montagne), les hivers sont plus longs et les
          températures extérieures plus basses — ce qui augmente la consommation de 15 à 25 %
          par rapport à la zone H3 (côte méditerranéenne, Corse). L&apos;Île-de-France est en
          zone H2, une position intermédiaire avec des hivers modérés.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>La température de consigne</strong> et le type d&apos;émetteurs influencent
          directement le COP. Une PAC qui chauffe un plancher chauffant à 35 °C aura un COP
          bien meilleur qu&apos;une PAC qui alimente des radiateurs à 65 °C. Chaque degré de
          température de départ en moins fait gagner environ 2 à 3 % de COP. C&apos;est pour
          cette raison qu&apos;on parle souvent de PAC « basse température » pour les installations
          neuves ou les rénovations avec de nouveaux émetteurs.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, le <strong>dimensionnement de la PAC</strong> est critique. Une PAC surdimensionnée
          fonctionne par courtes séquences (cycles start/stop fréquents), ce qui dégrade son
          efficacité et augmente la consommation. Une PAC sous-dimensionnée, à l&apos;inverse,
          fait tourner la résistance électrique d&apos;appoint trop souvent. Le bon dimensionnement,
          calculé à partir du bilan thermique précis du logement, permet à la PAC de fonctionner
          en continu à régime modéré — son mode de fonctionnement optimal.
        </p>

        {/* ---- SECTION 6 : TABLEAU PAR SURFACE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Consommation d&apos;une pompe à chaleur selon la superficie du logement
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          La question &quot;combien consomme une pompe à chaleur&quot; se pose rarement pour
          exactement 100 m². Voici le tableau de consommation annuelle d&apos;une PAC air-eau
          (SCOP 3,5) selon la surface, en comparaison avec le chauffage électrique classique.
          La colonne &quot;100 m² mal isolé&quot; illustre bien l&apos;impact de l&apos;isolation sur
          cette consommation varie selon les configurations.
        </p>

        <ArticleTable {...SURFACE_TABLE} title="Consommation PAC air-eau par surface — de 50 m² à 200 m²" />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ce tableau confirme une règle simple : <strong>doubler la surface multiplie
          approximativement par deux la consommation</strong>, toutes choses égales par
          ailleurs. Mais surtout, il montre qu&apos;une maison de 200 m² bien isolée consomme
          moins qu&apos;une maison de 100 m² mal isolée avec chauffage électrique classique.
          L&apos;isolation est donc aussi déterminante que la surface elle-même.
        </p>

        <ArticleCallout type="info" title="Pour une maison de 200 m² : faut-il une PAC plus puissante ?">
          <p>
            Oui. Une maison de 200 m² nécessite généralement une PAC de 12 à 16 kW de puissance
            thermique (contre 7 à 10 kW pour 100 m²). Certaines installations utilisent deux
            unités extérieures couplées pour mieux s&apos;adapter aux variations de charge entre
            l&apos;été et l&apos;hiver. MaPrimeRénov&apos; plafonne à 12 000 € pour une PAC air-eau
            (tranche Bleu), sans condition de surface.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 7 : FONCTIONNEMENT PAR HEURE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien d&apos;heures fonctionne une pompe à chaleur par jour ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une pompe à chaleur <strong>fonctionne en moyenne 8 à 12 heures par jour</strong> en
          pleine saison de chauffe (décembre–février en Île-de-France). En demi-saison
          (octobre–novembre, mars–avril), ce temps de fonctionnement tombe à 4 à 6 heures.
          En été, la PAC ne chauffe pas — elle se consacre uniquement à la production d&apos;eau
          chaude sanitaire si elle est couplée à un ballon thermodynamique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour calculer la consommation journalière, la formule est : puissance absorbée
          (kW) × nombre d&apos;heures de fonctionnement. Si une PAC de 8 kW thermiques tourne
          avec un COP de 3 par temps froid, elle absorbe 8 ÷ 3 = <strong>2,7 kW
          d&apos;électricité</strong>. Sur <strong>12 heures</strong> de fonctionnement, cela
          donne 2,7 × 12 = <strong>32 kWh d&apos;électricité</strong> consommés dans la journée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          À titre de comparaison, un convecteur électrique de 2 000 W allumé 12 heures consomme
          24 kWh — et ne chauffe qu&apos;une seule pièce. La PAC consomme certes plus en valeur
          absolue, mais elle chauffe l&apos;ensemble du logement et produit entre 3 et 4 fois plus
          de chaleur que ce qu&apos;elle consomme. Le <strong>coût par kWh de chaleur produite</strong>
          reste 3 à 4 fois inférieur avec la PAC.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-unite-exterieure-mur-briques.jpg"
          alt="Unité extérieure compacte d'une pompe à chaleur air-eau fixée sur un mur en briques — installation résidentielle"
          imagePosition="left"
        >
          <p>
            Les PAC modernes à <strong>vitesse variable (inverter)</strong> ne fonctionnent pas
            en tout-ou-rien : elles adaptent leur puissance en continu à la demande de chaleur.
            En demi-saison, elles tournent à 30–40 % de leur puissance nominale, ce qui améliore
            le COP et réduit l&apos;usure mécanique. C&apos;est une des raisons pour lesquelles un
            dimensionnement légèrement supérieur aux besoins est tolérable avec une PAC
            inverter, alors qu&apos;il serait préjudiciable avec une PAC on/off.
          </p>
          <p className="mt-3">
            Le <strong>mode nuit</strong> mérite une attention particulière. Contrairement à
            un chauffage électrique qu&apos;on peut éteindre sans problème, une PAC est plus
            efficace lorsqu&apos;elle maintient une température stable toute la nuit plutôt que
            de réchauffer une maison très froide le matin. Une réduction modérée de 2 °C
            la nuit est généralement recommandée, plutôt qu&apos;un arrêt complet.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 8 : RÉDUIRE LA CONSOMMATION ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment réduire la consommation électrique de votre pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La bonne nouvelle, c&apos;est que la consommation d&apos;une pompe à chaleur est très
          influençable. À matériel égal, les choix de l&apos;occupant et les conditions du
          logement peuvent faire varier la consommation annuelle de 30 à 50 %. Voici les
          six leviers les plus efficaces, classés par ordre d&apos;impact.
        </p>

        <ArticleSteps steps={TIPS_STEPS} />

        <p className="text-slate-700 leading-relaxed mt-6 mb-4">
          Ces six leviers ne s&apos;excluent pas : ils se cumulent. Un logement mieux isolé,
          avec une programmation horaire optimisée, des émetteurs basse température et une
          PAC bien entretenue peut <strong>réduire sa consommation de 40 à 50 %</strong>
          par rapport à la même PAC dans des conditions non optimisées. Sur 10 ans, cela
          représente une économie de plusieurs milliers d&apos;euros.
        </p>

        {/* ---- SECTION 9 : QUELLE PAC CHOISIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle pompe à chaleur choisir pour une maison de 100 m² ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour <strong>choisir une pompe à chaleur adaptée à une maison de 100 m²</strong>,
          trois critères sont prioritaires. La <strong>puissance thermique</strong> d&apos;abord :
          pour 100 m² bien isolés en zone H2, une PAC de 7 à 10 kW est généralement
          suffisante. Pour une maison mal isolée ou en zone H1, prévoyez plutôt 10 à 14 kW.
          Le bilan thermique précis reste indispensable.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le <strong>SCOP</strong> ensuite : visez un SCOP ≥ 4,0 pour maximiser les économies.
          La plupart des modèles récents (Daikin Altherma, Mitsubishi Ecodan, Atlantic
          Alféa Extensa) affichent des SCOP entre 4,0 et 5,1 en basse température.
          Plus le SCOP est élevé, plus votre consommation d&apos;électricité sera faible pour
          la même chaleur produite.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>compatibilité avec vos émetteurs existants</strong> enfin : si vous
          conservez vos radiateurs en fonte, optez pour une PAC haute température
          (jusqu&apos;à 65–75 °C). Si vous installez un plancher chauffant ou de nouveaux
          radiateurs basse température, une PAC basse température (35–45 °C) sera plus
          efficace et moins chère à l&apos;usage. La combinaison PAC basse température +
          plancher chauffant est celle qui donne la consommation d&apos;électricité la plus basse
          à long terme.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Obtenez un devis pour votre pompe à chaleur en Île-de-France"
          description="Nos techniciens certifiés RGE QualiPAC réalisent le bilan thermique de votre logement, dimensionnent la PAC exacte et montent votre dossier MaPrimeRénov' 2026. Devis gratuit sous 48h."
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
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
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
            href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Remplacer sa chaudière gaz par une PAC en 2026
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
              { name: "Créteil", slug: "creteil" },
              { name: "Versailles", slug: "versailles" },
              { name: "Vincennes", slug: "vincennes" },
              { name: "Meaux", slug: "meaux" },
              { name: "Massy", slug: "massy" },
              { name: "Champigny-sur-Marne", slug: "champigny-sur-marne" },
              { name: "Saint-Maur-des-Fossés", slug: "saint-maur-des-fosses" },
              { name: "Corbeil-Essonnes", slug: "corbeil-essonnes" },
              { name: "Noisy-le-Grand", slug: "noisy-le-grand" },
              { name: "Évry-Courcouronnes", slug: "evry-courcouronnes" },
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
