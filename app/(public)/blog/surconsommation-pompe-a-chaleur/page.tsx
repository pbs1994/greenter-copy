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
  ARTICLE_META, CONSO_NORMALE_TABLE, DIAGNOSTIC_TABLE, DIAGNOSTIC_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/surconsommation-pompe-a-chaleur'

const HERO_IMAGE = '/images/blog/surconsommation-pompe-a-chaleur-technicien-controle-unite-exterieure.jpg'
const HERO_ALT = "Technicien en casquette accroupi devant l'unité extérieure d'une pompe à chaleur fixée sur un mur en briques, contrôlant l'appareil pour diagnostiquer une surconsommation"

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
      url: `https://www.greenter.fr${HERO_IMAGE}`,
      width: 1536,
      height: 1024,
      alt: HERO_ALT,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: [`https://www.greenter.fr${HERO_IMAGE}`],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Surconsommation pompe à chaleur', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function SurconsommationPompeAChaleur() {
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
        image={`https://www.greenter.fr${HERO_IMAGE}`}
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={3200}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage={HERO_IMAGE}
        heroAlt={HERO_ALT}
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Vous avez remplacé votre vieille chaudière par une pompe à chaleur en espérant
            diviser votre facture de chauffage… et la première facture d&apos;électricité de
            l&apos;hiver vous a fait l&apos;effet d&apos;une douche froide. Vous n&apos;êtes pas
            seul : la <strong>surconsommation de pompe à chaleur</strong> est l&apos;une des
            réclamations les plus fréquentes que reçoivent les installateurs, et elle a presque
            toujours une explication technique.
          </p>
          <p>
            Bonne nouvelle : dans la majorité des cas, une PAC qui consomme trop ne
            souffre pas d&apos;une panne, mais d&apos;un réglage inadapté, d&apos;un manque
            d&apos;entretien ou d&apos;une erreur de dimensionnement. Ces causes se repèrent
            avec un peu de méthode, et beaucoup se corrigent en quelques minutes dans le menu
            de l&apos;appareil.
          </p>
          <p>
            Ce guide vous aide à déterminer si votre consommation est réellement anormale, à
            identifier les 8 causes les plus fréquentes d&apos;une{' '}
            <strong>surconsommation pompe à chaleur</strong>, et à savoir quand faire appel à
            un professionnel. Si vous cherchez plutôt les chiffres de consommation habituels,
            consultez notre guide sur la{' '}
            <Link href="/blog/consommation-pompe-a-chaleur-maison-100m2" className={linkCls}>
              consommation d&apos;une pompe à chaleur pour une maison de 100 m²
            </Link>.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Le calcul pour savoir si votre PAC consomme vraiment trop</li>
            <li>Les 8 causes d&apos;une surconsommation de pompe à chaleur, de la plus fréquente à la plus rare</li>
            <li>Un tableau symptôme → cause → solution pour orienter votre diagnostic</li>
            <li>5 vérifications à faire vous-même avant d&apos;appeler un technicien</li>
            <li>Vos recours si l&apos;installation est mal dimensionnée</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : ANORMAL ? ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Surconsommation pompe à chaleur : comment savoir si votre consommation est anormale ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Avant de parler de surconsommation pompe à chaleur, il faut une référence. Une pompe à chaleur air-eau ne
          produit pas la chaleur, elle la puise dans l&apos;air extérieur. Pour 1 kWh
          d&apos;électricité consommé, elle restitue en moyenne 3 à 4 kWh de chaleur sur la
          saison : c&apos;est son <strong>SCOP</strong>, ou coefficient de performance
          saisonnier. La consommation normale se calcule donc simplement : besoin de chauffage
          du logement divisé par le SCOP réel de la PAC.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le besoin de chauffage dépend surtout de la surface, de l&apos;isolation et du
          climat. Pour une maison de 100 m² en Île-de-France, il varie de 5 000 kWh par an
          pour une construction récente à 20 000 kWh pour une maison ancienne peu isolée. Le
          tableau ci-dessous traduit ces besoins en consommation électrique attendue, et
          fixe un seuil au-delà duquel il est légitime de parler de surconsommation.
        </p>

        <ArticleTable {...CONSO_NORMALE_TABLE} title="Consommation normale d'une PAC air-eau et seuil de surconsommation (maison de 100 m²)" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Deux précautions avant de conclure. D&apos;abord, comparez des hivers comparables :
          un mois de janvier très froid peut faire grimper la consommation de 20 à 30 % sans
          aucun dysfonctionnement. Ensuite, isolez la part de la PAC dans votre facture : la
          cuisson, l&apos;électroménager ou un véhicule électrique rechargé à domicile pèsent
          parfois plus lourd qu&apos;on ne le pense.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Le plus fiable reste de lire directement le compteur d&apos;énergie intégré à la
          PAC, présent sur la plupart des modèles récents, ou de faire poser un sous-compteur
          électrique dédié. En divisant l&apos;énergie thermique produite par l&apos;énergie
          électrique consommée, vous obtenez votre <strong>COP réel</strong>. En dessous de
          2,5 sur une saison complète, une PAC air-eau associée à des émetteurs basse
          température présente presque toujours un problème à corriger.
        </p>

        <ArticleStat stats={[
          { value: '3 à 4', label: 'kWh de chaleur produits pour 1 kWh d\'électricité par une PAC air-eau bien réglée', color: 'green' },
          { value: '1', label: 'kWh de chaleur seulement pour 1 kWh consommé par la résistance d\'appoint', color: 'red' },
          { value: '+30 %', label: 'au-delà de la consommation attendue : le seuil qui doit vous alerter', color: 'amber' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Ces trois chiffres résument à eux seuls la mécanique d&apos;une{' '}
          <strong>surconsommation pompe à chaleur</strong>. Tant que le compresseur fait le
          travail, chaque kilowattheure est multiplié par trois ou quatre. Dès qu&apos;une
          partie de la chaleur est produite par effet Joule, par la résistance électrique ou
          avec un rendement dégradé, l&apos;avantage s&apos;érode très vite — et la facture
          suit.
        </p>

        {/* ---- SECTION 2 : 8 CAUSES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les 8 causes d&apos;une surconsommation de pompe à chaleur
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Les causes sont présentées dans l&apos;ordre où nos techniciens les rencontrent le
          plus souvent lors de leurs diagnostics en Île-de-France. Dans de nombreux cas,
          deux ou trois d&apos;entre elles se cumulent.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          1. La résistance d&apos;appoint électrique tourne trop souvent
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est la première cause de surconsommation pompe à chaleur que nous constatons. Presque toutes les PAC air-eau
          intègrent une <strong>résistance électrique d&apos;appoint</strong>, de 3 à 9 kW,
          qui prend le relais lorsque la pompe à chaleur ne suffit plus. Le problème : cette
          résistance fonctionne comme un simple radiateur électrique, avec un rendement de 1.
          Pour produire la même quantité de chaleur, l&apos;appoint consomme donc trois à
          quatre fois plus d&apos;électricité que la pompe à chaleur.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          En Île-de-France, où les températures descendent rarement sous −5 °C, une PAC bien
          dimensionnée ne devrait solliciter son appoint que quelques jours par an. Si le
          compteur d&apos;heures de l&apos;appoint affiche plusieurs centaines d&apos;heures
          par hiver, deux explications sont possibles : un seuil d&apos;enclenchement réglé
          trop haut (l&apos;appoint démarre dès 2 ou 3 °C dehors), ou une PAC trop juste en
          puissance pour le logement.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          2. Une courbe de chauffe (loi d&apos;eau) réglée trop haut
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          La <strong>loi d&apos;eau</strong> détermine la température de l&apos;eau envoyée
          dans les radiateurs ou le plancher chauffant en fonction de la température
          extérieure. Plus cette eau est chaude, plus le compresseur travaille et plus le
          rendement baisse : on estime généralement qu&apos;un degré de température de départ
          en plus fait perdre 2 à 3 % de COP. Une courbe réglée « large » à la mise en
          service, pour éviter toute réclamation d&apos;inconfort, peut ainsi coûter 10 à
          15 % de consommation en trop pendant des années. Notre article sur le{' '}
          <Link href="/blog/rendement-pompe-a-chaleur" className={linkCls}>
            rendement d&apos;une pompe à chaleur
          </Link>{' '}
          détaille l&apos;impact de ce paramètre.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          3. Une PAC mal dimensionnée : trop petite ou trop puissante
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Une PAC <strong>sous-dimensionnée</strong> ne couvre pas les besoins par temps
          froid : l&apos;appoint électrique comble l&apos;écart, avec les conséquences
          décrites plus haut. Une PAC <strong>surdimensionnée</strong> pose un problème
          inverse et moins connu : elle atteint la consigne trop vite, s&apos;arrête, puis
          redémarre quelques minutes plus tard. Ces cycles courts dégradent le rendement et
          usent prématurément le compresseur.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          Seul un bilan thermique pièce par pièce, réalisé avant l&apos;installation, permet
          d&apos;éviter ces deux écueils. Notre guide sur la{' '}
          <Link href="/blog/puissance-pompe-a-chaleur" className={linkCls}>
            puissance d&apos;une pompe à chaleur
          </Link>{' '}
          explique comment ce calcul doit être mené.
        </p>

        <ArticleImageSection
          image="/images/blog/surconsommation-pompe-a-chaleur-unite-exterieure-facade.jpg"
          alt="Unité extérieure blanche de pompe à chaleur fixée sur console contre la façade en briques d'une maison, à côté d'une terrasse"
          imagePosition="right"
        >
          <p>
            L&apos;emplacement de l&apos;unité extérieure influence directement sa
            consommation. Coincée dans un recoin, collée à une haie ou exposée aux vents
            dominants du nord, elle recycle son propre air froid et givre plus souvent.
          </p>
          <p className="mt-3">
            Une unité bien dégagée, surélevée du sol pour évacuer l&apos;eau de dégivrage, et
            protégée des vents dominants travaille dans de meilleures conditions et consomme
            moins.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          4. Des cycles de dégivrage trop fréquents
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Lorsque l&apos;air extérieur est froid et humide, entre 0 et 7 °C, l&apos;évaporateur
          de l&apos;unité extérieure se couvre de givre. La PAC inverse alors brièvement son
          cycle pour le faire fondre : pendant ce temps, elle consomme sans chauffer la
          maison. Quelques dégivrages par jour sont normaux. Une unité qui reste couverte de
          glace, ou qui dégivre en permanence, signale un évaporateur encrassé, un défaut de
          sonde ou un manque de fluide frigorigène.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          5. L&apos;eau chaude sanitaire mal réglée
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Si votre PAC produit aussi l&apos;eau chaude, le ballon peut être à l&apos;origine
          d&apos;une partie de la surconsommation. Une consigne à 60 °C ou plus, atteinte avec
          la résistance du ballon plutôt qu&apos;avec la PAC, ou un cycle anti-légionellose
          programmé chaque jour au lieu d&apos;une fois par semaine, alourdissent la facture
          toute l&apos;année. C&apos;est la cause la plus probable si votre consommation
          reste élevée même en été.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          6. Un manque d&apos;entretien ou une fuite de fluide frigorigène
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Un évaporateur couvert de poussière et de feuilles, des filtres colmatés ou un
          circuit d&apos;eau emboué obligent la PAC à fonctionner plus longtemps pour fournir
          la même chaleur. Plus insidieuse, une légère fuite de fluide frigorigène fait
          chuter progressivement les performances sans provoquer de panne visible. C&apos;est
          pourquoi la loi impose un entretien des PAC de 4 à 70 kW au moins tous les deux
          ans, détaillé dans notre guide sur l&apos;
          <Link href="/blog/entretien-pompe-a-chaleur-air-eau" className={linkCls}>
            entretien d&apos;une pompe à chaleur air-eau
          </Link>.
        </p>

        <ArticleFullImage
          image="/images/blog/surconsommation-pompe-a-chaleur-manometres-fluide-frigorigene.jpg"
          alt="Mains d'un frigoriste tenant un manifold à deux manomètres, bleu basse pression et rouge haute pression, devant l'unité extérieure d'une pompe à chaleur"
          caption="Le contrôle des pressions du circuit frigorifique au manifold permet de détecter un manque de fluide frigorigène, cause fréquente et invisible d'une surconsommation de pompe à chaleur. Cette intervention est réservée aux techniciens titulaires d'une attestation de capacité."
        />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          7. Des consignes et une programmation inadaptées
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Selon l&apos;ADEME, chaque degré de consigne supplémentaire augmente la
          consommation de chauffage d&apos;environ 7 %. Passer de 19 à 22 °C revient donc à
          consommer près de 20 % de plus. À l&apos;inverse, un réflexe hérité du chauffage
          électrique classique est contre-productif avec une PAC : couper ou baisser
          fortement le chauffage la nuit.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          Une pompe à chaleur est faite pour fonctionner en continu, à faible régime. Lui
          demander de remonter de 4 ou 5 °C en une heure le matin, au moment où il fait le
          plus froid dehors, sollicite souvent l&apos;appoint électrique et annule le gain de
          la nuit. Un abaissement de 1 à 2 °C maximum est généralement le bon compromis.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          8. Un logement trop peu isolé ou des émetteurs inadaptés
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, certaines surconsommations ne viennent pas de la PAC elle-même mais du
          logement. Une maison qui perd beaucoup de chaleur, avec des radiateurs anciens
          conçus pour une eau à 70 °C, oblige la PAC à travailler à haute température, là où
          son rendement est le plus faible. Isoler les combles et les murs, ou remplacer
          quelques radiateurs par des modèles basse température, permet souvent de baisser la
          courbe de chauffe et de faire chuter la consommation. Même un geste simple comme
          l&apos;
          <Link href="/blog/isolation-derriere-radiateur" className={linkCls}>
            isolation derrière les radiateurs
          </Link>{' '}
          contribue modestement à limiter les pertes.
        </p>

        {/* ---- SECTION 3 : TABLEAU DIAGNOSTIC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Symptômes de surconsommation pompe à chaleur : le tableau de diagnostic
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Chaque cause laisse des indices reconnaissables. Le tableau ci-dessous vous aide à
          faire le lien entre ce que vous observez chez vous et l&apos;origine probable de la
          surconsommation, avant même l&apos;intervention d&apos;un technicien.
        </p>

        <ArticleTable {...DIAGNOSTIC_TABLE} title="Surconsommation de PAC : symptôme, cause probable et solution" />

        {/* ---- SECTION 4 : DIAGNOSTIC SOI-MEME ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Diagnostiquer une PAC qui consomme trop : 5 vérifications à faire vous-même
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Ces vérifications ne nécessitent aucun outil et ne présentent aucun risque. Elles
          permettent souvent d&apos;identifier la cause d&apos;une surconsommation, ou au
          moins de fournir au technicien des informations précieuses qui raccourciront son
          intervention.
        </p>

        <ArticleSteps steps={DIAGNOSTIC_STEPS} />

        <ArticleCallout type="warning" title="Ne touchez jamais au circuit frigorifique">
          <p>
            Les réglages de la régulation (courbe de chauffe, consignes, seuil d&apos;appoint)
            sont accessibles à l&apos;utilisateur, souvent dans un menu « installateur »
            protégé : notez toujours les valeurs d&apos;origine avant de les modifier. En
            revanche, toute intervention sur le circuit de fluide frigorigène est réservée par
            la loi aux professionnels titulaires d&apos;une attestation de capacité.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : COUT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Combien coûte une surconsommation de pompe à chaleur ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour mesurer ce que coûte une surconsommation pompe à chaleur, prenons un exemple courant : une maison de 100 m² bien isolée, chauffée par une PAC
          air-eau de 8 kW, dont la résistance d&apos;appoint de 6 kW fonctionne 300 heures
          par hiver à cause d&apos;un seuil d&apos;enclenchement mal réglé. L&apos;appoint
          consomme alors 1 800 kWh. La même chaleur, produite par la PAC avec un COP de 3,
          n&apos;aurait demandé que 600 kWh.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Avec une électricité à environ 0,20 €/kWh, l&apos;écart atteint 240 € par an, pour
          un simple paramètre dans un menu. Ajoutez une courbe de chauffe trop haute de 5 °C,
          qui fait perdre 10 à 15 % de rendement sur le reste de la saison, et la
          surconsommation atteint facilement 300 à 350 € par an — de quoi effacer une bonne
          partie de l&apos;économie attendue en remplaçant une chaudière.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Rapporté à la durée de vie d&apos;une PAC, de 15 à 20 ans, l&apos;enjeu dépasse
          plusieurs milliers d&apos;euros. C&apos;est pourquoi un diagnostic, qui coûte
          généralement moins qu&apos;une seule année de surconsommation, est presque toujours
          rentable. Une PAC bien réglée vit aussi plus longtemps, comme nous l&apos;expliquons
          dans notre article sur la{' '}
          <Link href="/blog/duree-de-vie-pompe-a-chaleur" className={linkCls}>
            durée de vie d&apos;une pompe à chaleur
          </Link>.
        </p>

        {/* ---- SECTION 6 : PAC AIR-AIR ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Surconsommation d&apos;une PAC air-air : les spécificités
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La surconsommation pompe à chaleur ne concerne pas que les modèles air-eau. Les
          pompes à chaleur air-air, souvent appelées climatisations réversibles, peuvent
          elles aussi surconsommer, avec quelques causes qui leur sont propres. La première
          est l&apos;encrassement des <strong>filtres des unités intérieures</strong> :
          chargés de poussière, ils freinent le passage de l&apos;air et obligent le
          ventilateur et le compresseur à forcer. Un nettoyage à l&apos;eau tiède toutes les
          deux à quatre semaines en période d&apos;utilisation suffit souvent à retrouver une
          consommation normale.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Viennent ensuite les mauvaises habitudes d&apos;usage : télécommande réglée sur
          26 °C en hiver « pour chauffer plus vite », mode automatique qui alterne chauffage
          et refroidissement en mi-saison, ou portes laissées ouvertes vers des pièces non
          équipées. Une PAC air-air chauffe la pièce où elle est installée : lui demander de
          chauffer toute la maison par une porte ouverte est le chemin le plus court vers la
          surconsommation.
        </p>

        {/* ---- SECTION 7 : PROFESSIONNEL ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quand faire appel à un professionnel ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Si vos vérifications ne révèlent rien d&apos;évident, ou si vous constatez des
          signaux techniques — givre persistant, cycles très courts, codes d&apos;erreur,
          baisse progressive des performances année après année — un diagnostic
          professionnel s&apos;impose. Le technicien contrôle les pressions et la charge en
          fluide frigorigène, les sondes, le débit d&apos;eau, l&apos;état des échangeurs et
          l&apos;ensemble des paramètres de régulation.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Souscrire un{' '}
          <Link href="/services/maintenance" className={linkCls}>contrat de maintenance</Link>{' '}
          permet d&apos;anticiper ces dérives : l&apos;entretien régulier maintient le
          rendement d&apos;origine et répond à l&apos;obligation légale d&apos;entretien
          biennal.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Surconsommation et mauvais dimensionnement : quels recours ?
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          Si le diagnostic révèle une PAC inadaptée au logement, la responsabilité de
          l&apos;installateur peut être engagée. Dans l&apos;année suivant la réception des
          travaux, la garantie de parfait achèvement l&apos;oblige à corriger le défaut.
          Au-delà, la garantie décennale peut être mobilisée lorsque le défaut rend
          l&apos;installation impropre à sa destination, par exemple si le logement ne peut
          plus être chauffé correctement. Faites établir un rapport écrit par un
          professionnel indépendant avant toute démarche. Pour éviter ce scénario lors
          d&apos;un futur projet, consultez notre liste des{' '}
          <Link href="/blog/pompe-a-chaleur-piege-a-eviter" className={linkCls}>
            pièges à éviter avec une pompe à chaleur
          </Link>.
        </p>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Votre pompe à chaleur consomme trop ? Faites-la diagnostiquer en Île-de-France"
          description="Nos techniciens certifiés RGE contrôlent votre PAC, sa régulation et son circuit frigorifique, identifient la cause de la surconsommation et vous proposent les corrections adaptées. Devis gratuit sous 48h."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur la surconsommation d&apos;une pompe à chaleur
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
          {[
            { href: '/services/maintenance', kicker: 'Notre service', title: 'Entretien et maintenance de pompe à chaleur', cta: 'Voir le service' },
            { href: '/blog/consommation-pompe-a-chaleur-maison-100m2', kicker: 'Guide complémentaire', title: 'Consommation d\'une PAC pour une maison de 100 m²', cta: 'Lire le guide' },
            { href: '/blog/rendement-pompe-a-chaleur', kicker: 'Article associé', title: 'Rendement pompe à chaleur : 8 facteurs clés', cta: 'Lire le guide' },
            { href: '/blog/entretien-pompe-a-chaleur-air-eau', kicker: 'Article associé', title: 'Entretien pompe à chaleur air-eau', cta: 'Lire le guide' },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{card.kicker}</p>
              <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">{card.title}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
                {card.cta} <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Pompe à chaleur par ville en Île-de-France
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
