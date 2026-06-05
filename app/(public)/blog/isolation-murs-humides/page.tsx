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
  ARTICLE_META, ISOLANTS_TABLE, AIDES_TABLE, STEPS,
  EXAMPLE_CALCULATION, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/isolation-murs-humides-2026'

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
      url: 'https://www.greenter.fr/images/blog/isolation-mur-humide-pose-panneaux-xps.webp',
      width: 1200,
      height: 630,
      alt: "Artisan posant des panneaux XPS bleus sur un mur avec traces de moisissures — isolation mur humide",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/isolation-mur-humide-pose-panneaux-xps.webp'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: "Isolation Murs Humides 2026", url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function IsolationMursHumides() {
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
        image="https://www.greenter.fr/images/blog/isolation-mur-humide-pose-panneaux-xps.webp"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/isolation-mur-humide-pose-panneaux-xps.webp"
        heroAlt="Artisan posant des panneaux XPS bleus sur un mur présentant des traces de moisissures — isolation thermique mur humide"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            Un mur humide n&apos;est pas un mur comme les autres. Poser un isolant directement sur
            une paroi présentant des traces de condensation, de salpêtre ou d&apos;infiltrations,
            c&apos;est prendre le risque de créer une bombe à retardement thermique : l&apos;humidité
            emprisonnée derrière le doublage continue de progresser, génère des moisissures
            invisibles et dégrade l&apos;isolant en quelques saisons. La facture d&apos;un chantier à
            reprendre se chiffre souvent à deux ou trois fois le coût initial.
          </p>
          <p>
            En France, <strong>30 % des logements souffrent de problèmes d&apos;humidité</strong>{' '}
            selon l&apos;ADEME — et la majorité des sinistres liés à l&apos;isolation thermique par
            l&apos;intérieur sont directement liés à une humidité mal diagnostiquée avant les travaux.
            Pourtant, l&apos;isolation d&apos;un <strong>mur humide</strong> est tout à fait possible,
            à condition de respecter un protocole rigoureux : identifier la source, traiter
            le problème, laisser sécher, ventiler correctement, puis choisir un{' '}
            <strong>isolant perméable à la vapeur d&apos;eau</strong>.
          </p>
          <p>
            Ce guide vous explique pas à pas comment <strong>isoler un mur humide</strong> sans
            créer de nouvelles pathologies, quel isolant choisir selon la nature de l&apos;humidité
            (condensation, remontées capillaires, infiltrations), et comment financer ces
            travaux grâce aux aides 2026 — MaPrimeRénov&apos;, Coup de pouce CEE et éco-PTZ.
          </p>
        </div>

        <ArticleCallout type="warning" title="Ne commencez pas sans ce diagnostic en 5 points">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Identifier la nature de l&apos;humidité : condensation, remontées capillaires ou infiltrations</li>
            <li>Traiter la source à la racine avant de poser le moindre isolant</li>
            <li>Attendre 4 à 8 semaines de séchage (mesure hygromètre obligatoire)</li>
            <li>Choisir un isolant <strong>perméable à la vapeur</strong> (laine de roche, liège, chaux-chanvre) ou XPS pour les caves</li>
            <li>Poser un <strong>frein-vapeur hygrovariable</strong> — jamais un pare-vapeur classique</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : IDENTIFIER L'HUMIDITÉ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="diagnostic-humidite">
          Identifier la source d&apos;humidité avant d&apos;isoler
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;humidité dans les murs ne vient pas d&apos;une seule et même origine. En confondant
          ces sources, on applique des remèdes inadaptés — et l&apos;isolation aggrave souvent
          la situation au lieu de l&apos;améliorer. Trois mécanismes distincts sont à distinguer,
          chacun ayant son propre mode de traitement.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          La condensation superficielle : humidité venue de l&apos;intérieur
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          La condensation apparaît quand la vapeur d&apos;eau produite à l&apos;intérieur du logement
          — respiration, cuisson, douche — rencontre une surface dont la température est
          inférieure au <strong>point de rosée</strong>. Cette surface froide, c&apos;est le plus
          souvent un mur extérieur mal isolé ou un angle de pièce.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les signes caractéristiques : buée persistante sur les vitres en hiver, taches
          noires de moisissures aux angles bas des pièces, taux d&apos;humidité relative intérieure
          supérieur à 60 % HR. Ce problème est doublement résolu par l&apos;isolation thermique
          (la surface du mur se réchauffe au-dessus du point de rosée) et par une{' '}
          <strong>ventilation mécanique contrôlée</strong> (VMC) hygroréglable B ou double
          flux qui évacue la vapeur avant qu&apos;elle ne condense.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">
          Les remontées capillaires : humidité venue du sol
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les <strong>remontées capillaires</strong> sont un phénomène physique : l&apos;eau du sol
          ou des nappes phréatiques monte dans les pores de la maçonnerie par capillarité,
          parfois jusqu&apos;à 1,5 mètre de hauteur. Elles touchent principalement les maisons
          anciennes construites sans coupure capillaire entre les fondations et les murs.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Symptômes distinctifs : taches blanches salines (<strong>salpêtre</strong> ou
          efflorescences) à la base des murs, peinture qui cloque et se décolle dans la
          partie basse des cloisons, odeur de moisi persistante au rez-de-chaussée.
          Ces traces salines sont la signature de l&apos;eau qui monte et s&apos;évapore en laissant
          ses sels derrière elle. Le traitement requiert une <strong>injection de résine
          hydrofuge</strong> dans la maçonnerie (50 à 120 €/ml selon l&apos;épaisseur du mur),
          ou une électro-osmose physique.
        </p>

        <ArticleImageSection
          image="/images/blog/mur-humide-cave-infiltrations-eau.webp"
          alt="Angle de cave humide avec traces d'infiltrations et d'eau stagnante sur les murs en béton — traitement anti-humidité nécessaire avant toute isolation thermique"
          imagePosition="right"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Les infiltrations : humidité venue de l&apos;extérieur
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Les infiltrations résultent d&apos;un défaut d&apos;étanchéité extérieure : fissures en
            façade, joint de fenêtre dégradé, gouttière bouchée qui déborde, terrain mal
            drainé autour des fondations. L&apos;eau de pluie pénètre directement dans la
            maçonnerie depuis l&apos;extérieur.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Signe distinctif : les taches humides apparaissent ou s&apos;aggravent précisément
            après les épisodes de pluie. En cave, l&apos;eau peut stagner au sol après de
            fortes pluies. Le traitement nécessite une intervention extérieure : reprise
            des joints de façade, application d&apos;un hydrofuge, correction du drainage ou
            réfection des gouttières. Ce n&apos;est qu&apos;après ce traitement que l&apos;isolation peut
            être envisagée.
          </p>
        </ArticleImageSection>

        <ArticleStat stats={[
          { value: '30 %', label: 'des logements français souffrent de problèmes d\'humidité (ADEME)', color: 'blue' },
          { value: '1,5 m', label: 'hauteur maximale des remontées capillaires dans une maçonnerie', color: 'blue' },
          { value: '60 %', label: 'seuil d\'humidité relative à ne pas dépasser pour éviter la condensation', color: 'green' },
        ]} />

        {/* ---- SECTION 2 : TRAITEMENT PRÉALABLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="traitement-avant-isolation">
          Traiter l&apos;humidité avant d&apos;isoler : une étape non négociable
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation thermique d&apos;un <strong>mur humide</strong> ne peut être réalisée qu&apos;après
          traitement complet de la source. Cette règle est absolue : les artisans certifiés
          RGE (Reconnu Garant de l&apos;Environnement) refusent légitimement de poser un doublage
          isolant sur un mur non assaini — au risque d&apos;engager leur responsabilité décennale.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le protocole de traitement dépend de la nature du problème identifié :
        </p>

        <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
          <li>
            <strong>Condensation :</strong> installer ou remplacer la VMC par une version
            hygroréglable B ou double flux. Améliorer l&apos;isolation des parois pour élever
            la température des surfaces intérieures au-dessus du point de rosée.
            Maintenir un taux d&apos;humidité relative inférieur à 60 % dans les pièces de vie.
          </li>
          <li>
            <strong>Remontées capillaires :</strong> faire réaliser une injection de résine
            hydrofuge dans la maçonnerie (tarif : 50 à 120 €/ml selon l&apos;épaisseur du mur).
            L&apos;électro-osmose physique est une alternative moins invasive mais plus longue
            à produire ses effets. Délai de séchage ensuite : 4 à 12 semaines selon
            l&apos;épaisseur et la nature du mur.
          </li>
          <li>
            <strong>Infiltrations :</strong> reprendre l&apos;étanchéité extérieure (joints,
            enduit hydrofuge, drainage). Vérifier et nettoyer les gouttières et évacuations
            pluviales. En sous-sol, réaliser un drainage périphérique ou poser une membrane
            d&apos;étanchéité côté extérieur des fondations.
          </li>
        </ul>

        <ArticleCallout type="info" title="Combien de temps pour sécher un mur traité ?">
          <p>
            La règle généralement admise est d&apos;<strong>un mois de séchage par centimètre
            d&apos;épaisseur de mur humide</strong>. Pour un mur de 20 cm qui avait une remontée
            capillaire sur 60 cm de hauteur, comptez 6 à 8 semaines minimum. L&apos;outil de
            référence est l&apos;hygromètre de contact (sonde CM) : visez un taux d&apos;humidité
            résiduelle inférieur à <strong>5 %</strong> avant de commencer les travaux d&apos;isolation.
            Ne pas brûler cette étape est la décision la plus rentable du chantier.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : QUEL ISOLANT ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="quel-isolant-mur-humide">
          Quel isolant choisir pour un mur humide ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Tous les isolants ne réagissent pas de la même façon face à l&apos;humidité résiduelle.
          Le critère décisif est la <strong>perméabilité à la vapeur d&apos;eau</strong>, mesurée
          par la valeur Sd (épaisseur d&apos;air équivalente, en mètres). Plus le Sd est faible,
          plus le matériau est perméable à la vapeur — c&apos;est-à-dire qu&apos;il laisse le mur
          respirer et s&apos;assécher progressivement dans le temps.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La règle d&apos;or pour un <strong>mur humide</strong> : ne jamais utiliser un isolant
          à fort Sd côté mur froid, au risque de bloquer la vapeur et de créer un point de
          rosée dans l&apos;épaisseur de la paroi. À l&apos;inverse, le XPS (polystyrène extrudé)
          est parfaitement adapté côté sol en sous-sol, où le risque est l&apos;infiltration
          par capillarité et non la vapeur intérieure. Chaque isolant a donc sa zone
          d&apos;excellence selon la nature de l&apos;humidité.
        </p>

        <ArticleTable {...ISOLANTS_TABLE} title="Comparatif des isolants pour murs humides en 2026" />

        <ArticleImageSection
          image="/images/blog/isolation-mur-interieur-laine-roche-pose.jpg"
          alt="Ouvrier installant de la laine minérale entre les montants métalliques pour l'isolation thermique d'un mur intérieur anciennement humide"
          imagePosition="left"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Laine de roche et liège expansé : les deux références sur mur humide traité
          </h3>
          <p className="text-slate-700 leading-relaxed">
            La <strong>laine de roche</strong> est hydrophobe : ses fibres repoussent l&apos;eau
            liquide tout en restant perméables à la vapeur d&apos;eau (Sd ≈ 0,04 m). Si elle absorbe
            accidentellement de l&apos;humidité résiduelle, elle sèche sans perdre ses propriétés
            thermiques — un avantage décisif sur un mur dont l&apos;assèchement complet peut
            prendre plusieurs mois. Sa certification Euroclass A1 la rend incombustible.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Le <strong>liège expansé</strong> est quant à lui naturellement imputrescible et
            régulateur hygroscopique : il absorbe et restitue la vapeur d&apos;eau de façon
            très progressive, ce qui en fait l&apos;isolant idéal pour les murs en pierre de taille
            ou en brique ancienne, où la perméabilité du système constructif doit être
            préservée.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pour les <strong>caves et sous-sols</strong> exposés à une humidité permanente
            du sol, les <strong>panneaux XPS</strong> (ex. Knauf Therm Wall, Soprema Soprastyrene)
            sont les seuls à résister à l&apos;immersion prolongée sans se dégrader ni perdre leurs
            propriétés thermiques.
          </p>
        </ArticleImageSection>

        <ArticleCallout type="tip" title="Évitez la laine de verre sur tout mur à risque d'humidité">
          <p>
            La <strong>laine de verre</strong> est hydrophile : elle peut absorber jusqu&apos;à 20 %
            de son poids en eau. Mouillée, elle s&apos;effondre sur elle-même et perd l&apos;essentiel
            de ses propriétés thermiques. Elle devient également un milieu de culture idéal pour
            les moisissures. Sur un mur anciennement humide — même traité — préférez toujours la
            laine de roche, le liège expansé ou, en sous-sol, le XPS.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : VMC ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="vmc-ventilation-mur-humide">
          Ventilation mécanique contrôlée (VMC) : l&apos;alliée indispensable
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation thermique améliore la température des surfaces murales, mais elle
          augmente aussi l&apos;<strong>étanchéité à l&apos;air</strong> du logement. Dans une maison
          mieux isolée, la vapeur d&apos;eau produite en cuisine et en salle de bain a moins de
          possibilités de s&apos;échapper naturellement — ce qui peut aggraver la condensation
          si la <strong>ventilation mécanique contrôlée</strong> n&apos;est pas adaptée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une <strong>VMC hygroréglable B</strong> est le minimum requis sur un mur humide :
          ses bouches d&apos;extraction s&apos;ouvrent automatiquement lorsque le taux d&apos;humidité
          augmente dans une pièce, puis se referment dès que l&apos;air est assaini. Ce système
          garantit un renouvellement d&apos;air permanent et adapté, sans gaspillage énergétique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La solution la plus performante reste la <strong>VMC double flux</strong> : elle
          récupère 70 à 90 % de la chaleur de l&apos;air extrait pour préchauffer l&apos;air entrant.
          En combinaison avec une isolation des murs humides traités, elle peut réduire les
          consommations de chauffage de 20 à 35 % supplémentaires par rapport à une VMC simple
          flux. Un investissement qui se rentabilise en 5 à 8 ans dans les logements les plus
          exposés à la condensation.
        </p>

        <ArticleCallout type="info" title="VMC et isolation : deux travaux à faire ensemble">
          <p>
            Les organismes d&apos;aides (ANAH, CEE) recommandent systématiquement l&apos;installation
            ou la vérification de la VMC avant tout chantier d&apos;isolation thermique par
            l&apos;intérieur. Un <strong>audit énergétique préalable</strong> — obligatoire pour
            MaPrimeRénov&apos; Parcours accompagné — intègre toujours l&apos;état de la ventilation
            dans ses recommandations. Si VMC et isolation sont réalisées ensemble, elles
            peuvent être incluses dans un seul éco-PTZ.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 5 : ÉTAPES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="etapes-isolation-mur-humide">
          Comment isoler un mur humide : les 7 étapes clés
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          L&apos;isolation thermique d&apos;un mur humide est un chantier en deux temps distincts.
          Le premier est consacré au diagnostic et au traitement de l&apos;humidité — c&apos;est lui
          qui conditionne la réussite du second. Le second porte sur la pose de l&apos;isolant
          proprement dit, avec le choix du bon matériau et de la membrane adaptée.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un chantier bien conduit par un artisan RGE prend en compte ces deux phases et
          vous propose un planning précis avec une date de retour pour le contrôle avant
          fermeture. Exigez cette information dans votre devis — c&apos;est le signe d&apos;un
          professionnel sérieux.
        </p>

        <ArticleFullImage
          image="/images/blog/isolation-mur-humide-laine-minerale-mur-brut.jpg"
          alt="Technicien appliquant de la laine minérale sur un mur brut en pierre pour isoler un mur humide — rénovation thermique par l'intérieur"
          caption="Pose de laine minérale sur un mur en pierre brut — le support doit être parfaitement sec avant d'appliquer tout isolant sur un mur anciennement humide."
        />

        <ArticleSteps steps={STEPS} />

        {/* ---- SECTION 6 : FREIN-VAPEUR HYGROVARIABLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="frein-vapeur-hygrovariable">
          Frein-vapeur hygrovariable : pourquoi pas un pare-vapeur classique ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          C&apos;est l&apos;une des erreurs les plus fréquentes sur les murs anciennement humides :
          poser un film polyéthylène classique (pare-vapeur, Sd &gt; 100 m) côté intérieur
          de l&apos;isolant. En hiver, ce film bloque totalement la migration de vapeur — c&apos;est
          une bonne chose. Mais en été, quand le mur se réhumidifie depuis l&apos;extérieur
          (pluie, rosée), l&apos;humidité ne peut plus s&apos;évaporer vers l&apos;intérieur. Elle reste
          piégée et dégrade progressivement l&apos;isolant et la structure porteuse.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La solution : le <strong>frein-vapeur hygrovariable</strong> (aussi appelé membrane
          hygrovariable ou frein-vapeur intelligent). Sa résistance à la diffusion de vapeur
          varie automatiquement en fonction du taux d&apos;humidité relative ambiant :
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>
            <strong>En hiver (HR intérieure ≈ 40 %) :</strong> le Sd monte à 5–10 m, limitant
            la migration de vapeur depuis l&apos;intérieur vers l&apos;isolant froid — protection maximale.
          </li>
          <li>
            <strong>En été ou lors du séchage (HR élevée) :</strong> le Sd descend à 0,3–1 m,
            permettant à l&apos;humidité résiduelle de s&apos;évaporer vers l&apos;intérieur du logement —
            le mur respire et s&apos;assèche naturellement.
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed mb-6">
          Les marques de référence sur le marché français sont <strong>Pro Clima</strong> (Intello
          Plus, DB+), <strong>Isover</strong> (Vario® KM Duplex UV), <strong>Knauf</strong> (LDS
          Integral) et Solitex. Le coût d&apos;une membrane hygrovariable est de 10 à 20 €/m² —
          un investissement modeste par rapport au coût total d&apos;un chantier d&apos;isolation, mais
          décisif pour garantir la durabilité à long terme, notamment sur les murs humides.
        </p>

        {/* ---- SECTION 7 : PRIX ET AIDES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6" id="prix-aides-isolation-mur-humide">
          Prix et aides financières pour l&apos;isolation de murs humides en 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le coût d&apos;un chantier d&apos;isolation sur un mur humide est supérieur à une isolation
          standard pour deux raisons : le traitement anti-humidité préalable (injection,
          ragréage, drainage) et le délai de séchage entre les deux phases. Comptez entre
          2 500 et 5 000 € supplémentaires pour le traitement lui-même, en plus du coût
          de l&apos;isolation thermique.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La bonne nouvelle : les aides de l&apos;État s&apos;appliquent intégralement sur la partie
          isolation des murs, quelle que soit l&apos;histoire du mur. Le traitement anti-humidité,
          bien que non directement subventionné par MaPrimeRénov&apos;, peut être financé par
          l&apos;<strong>éco-PTZ à taux zéro</strong> s&apos;il fait partie d&apos;une rénovation globale
          avec artisan RGE.
        </p>

        <ArticleTable {...AIDES_TABLE} title="Aides cumulables pour l'isolation des murs humides en 2026" />

        <div className="my-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
          <h4 className="font-bold text-emerald-900 text-xl mb-6">{EXAMPLE_CALCULATION.title}</h4>
          <div className="space-y-3">
            {EXAMPLE_CALCULATION.lines.map((line, i) => (
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

        <ArticleCallout type="success" title="Combiner traitement et isolation dans un seul dossier éco-PTZ">
          <p>
            Si le traitement anti-humidité et l&apos;isolation sont réalisés dans la même opération
            par un artisan RGE, vous pouvez soumettre un seul dossier éco-PTZ couvrant
            l&apos;ensemble des travaux. L&apos;éco-PTZ peut financer jusqu&apos;à <strong>50 000 €
            à taux zéro sur 20 ans</strong> — de quoi absorber le surcoût du traitement
            préalable sans impact immédiat sur la trésorerie. Greenter monte et dépose
            l&apos;ensemble du dossier pour vous.
          </p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Diagnostic humidité + devis isolation gratuits sous 48h"
          description="Nos artisans certifiés RGE diagnostiquent la source d'humidité, traitent le mur et posent l'isolant adapté. Dossier MaPrimeRénov' et éco-PTZ géré de A à Z."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">Questions fréquentes — isolation murs humides</h2>
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
            href="/blog/meilleur-isolant-thermique-murs-interieur-2026"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Meilleur isolant thermique des murs par l&apos;intérieur en 2026
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/prix-isolation-combles-au-m2"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Prix isolation combles au m² en 2026
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
              Demander un diagnostic humidité + devis isolation
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
