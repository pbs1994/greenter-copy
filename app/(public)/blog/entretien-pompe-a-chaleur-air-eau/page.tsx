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
  ARTICLE_META, TACHES_TABLE, VISITE_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/entretien-pompe-a-chaleur-air-eau'

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
      url: 'https://www.greenter.fr/images/blog/pompe-a-chaleur-air-eau-entretien-technicien-manometre.jpg',
      width: 1600,
      height: 1067,
      alt: "Technicien contrôlant les pressions d'une pompe à chaleur air-eau au manomètre — entretien pompe à chaleur air-eau",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE_META.title,
    description: ARTICLE_META.subtitle,
    images: ['https://www.greenter.fr/images/blog/pompe-a-chaleur-air-eau-entretien-technicien-manometre.jpg'],
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: 'https://www.greenter.fr' },
  { name: 'Blog', url: 'https://www.greenter.fr/blog' },
  { name: 'Entretien pompe à chaleur air-eau', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

export default function EntretienPompeAChaleurAirEau() {
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
        image="https://www.greenter.fr/images/blog/pompe-a-chaleur-air-eau-entretien-technicien-manometre.jpg"
        url={`https://www.greenter.fr/blog/${ARTICLE_META.slug}`}
        wordCount={2700}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <ArticleLayout
        title={ARTICLE_META.title}
        subtitle={ARTICLE_META.subtitle}
        date={ARTICLE_META.date}
        readingTime={ARTICLE_META.readingTime}
        heroImage="/images/blog/pompe-a-chaleur-air-eau-entretien-technicien-manometre.jpg"
        heroAlt="Technicien agenouillé contrôlant les pressions d'une pompe à chaleur air-eau à l'aide d'un manomètre électronique, unité extérieure posée contre un mur de maison"
        breadcrumbs={breadcrumbs}
      >

        {/* ---- INTRO ---- */}
        <div className="text-lg text-slate-700 leading-relaxed space-y-4 mb-12">
          <p>
            L&apos;<strong>entretien d&apos;une pompe à chaleur air-eau</strong> n&apos;est pas
            une option : c&apos;est une obligation réglementaire pour la quasi-totalité des
            installations résidentielles, et surtout la condition numéro un pour préserver
            à la fois la performance, la garantie constructeur et la longévité de
            l&apos;appareil. Pour une pompe à chaleur air-eau de plus de 4 kW — soit la
            grande majorité des installations en maison individuelle — une{' '}
            <strong>visite d&apos;entretien annuelle</strong> réalisée par un professionnel
            certifié est exigée par la réglementation, pour un coût généralement compris
            entre <strong>120 et 250 €</strong> par intervention.
          </p>
          <p>
            Beaucoup de propriétaires découvrent cette obligation trop tard — souvent au
            moment où un fabricant refuse de prendre en charge une panne de compresseur
            sous garantie, faute d&apos;attestation d&apos;entretien. D&apos;autres, à l&apos;inverse,
            renoncent à l&apos;entretien en pensant que leur appareil « tourne bien »,
            sans savoir qu&apos;un échangeur encrassé ou une légère fuite de fluide
            frigorigène peuvent faire chuter le rendement de 20 à 30 % de façon
            totalement silencieuse, sans aucun signe visible au quotidien.
          </p>
          <p>
            Ce guide répond à toutes les questions que l&apos;on se pose sur l&apos;
            <strong>entretien d&apos;une pompe à chaleur air-eau</strong> : ce que dit
            précisément la loi, ce que comprend une visite technique complète, la
            fréquence à respecter, le prix réel d&apos;un contrat de maintenance, et les
            gestes que vous pouvez réaliser vous-même entre deux passages du technicien.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans ce guide">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Ce que dit la réglementation sur l&apos;entretien obligatoire d&apos;une PAC air-eau</li>
            <li>Le détail complet d&apos;une visite d&apos;entretien, étape par étape</li>
            <li>La fréquence recommandée et le prix moyen d&apos;un entretien en 2026</li>
            <li>Les risques concrets d&apos;un défaut d&apos;entretien (garantie, panne, surconsommation)</li>
            <li>Les gestes simples que vous pouvez réaliser vous-même sans risque</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : POURQUOI ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Pourquoi l&apos;entretien d&apos;une pompe à chaleur air-eau est-il indispensable ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Une pompe à chaleur air-eau capte les calories de l&apos;air extérieur pour
          chauffer l&apos;eau qui alimente vos radiateurs, votre plancher chauffant ou votre
          ballon d&apos;eau chaude. Ce transfert d&apos;énergie repose sur un équilibre
          précis entre le circuit frigorifique (fluide, compresseur, échangeurs) et le
          circuit hydraulique (eau, pompe de circulation, vase d&apos;expansion). Sans
          <strong> entretien régulier</strong>, ces deux circuits se dégradent
          progressivement — et de façon souvent invisible au quotidien.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les échangeurs thermiques accumulent poussière, pollens et résidus calcaires,
          formant une couche isolante qui réduit les transferts de chaleur. Une pompe à
          chaleur air-eau dont les échangeurs sont encrassés à 15 % voit son{' '}
          <Link href="/blog/rendement-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            rendement
          </Link>{' '}
          chuter de 10 à 15 %, soit une surconsommation qui peut représenter 100 à 200 €
          par an pour un logement de 100 m². Une fuite de fluide frigorigène, même minime,
          vide progressivement le circuit et peut faire chuter le COP de 30 à 50 % en
          quelques mois, jusqu&apos;à endommager irrémédiablement le compresseur.
        </p>

        <ArticleStat stats={[
          { value: '15 à 20 ans', label: 'durée de vie moyenne d\'une PAC air-eau bien entretenue', color: 'blue' },
          { value: '10 à 15 %', label: 'de perte de rendement pour des échangeurs encrassés', color: 'amber' },
          { value: '120–250 €', label: 'prix moyen d\'une visite d\'entretien annuelle', color: 'green' },
        ]} />

        <p className="text-slate-700 leading-relaxed mb-6">
          Au-delà de la performance énergétique, l&apos;entretien conditionne aussi la{' '}
          <strong>garantie constructeur</strong>. La plupart des fabricants exigent la
          preuve d&apos;un entretien annuel réalisé par un professionnel certifié pour
          honorer la garantie pièces et main-d&apos;œuvre au-delà des deux premières années.
          Pour un compresseur dont le remplacement peut coûter 800 à 2 000 €, c&apos;est une
          protection financière loin d&apos;être négligeable. Notre article sur la{' '}
          <Link href="/blog/duree-de-vie-pompe-a-chaleur" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            durée de vie d&apos;une pompe à chaleur
          </Link>{' '}
          détaille l&apos;ensemble des facteurs, entretien compris, qui prolongent ou
          raccourcissent la vie de l&apos;appareil.
        </p>

        {/* ---- SECTION 2 : OBLIGATION LEGALE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Entretien pompe à chaleur air-eau : que dit la loi en 2026 ?
        </h2>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Une obligation légale pour les appareils de plus de 4 kW
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Depuis le décret entré en vigueur le 1ᵉʳ janvier 2023, l&apos;entretien annuel est
          <strong> obligatoire pour toute pompe à chaleur d&apos;une puissance supérieure à
          4 kW</strong> contenant du fluide frigorigène — ce qui couvre la quasi-totalité
          des pompes à chaleur air-eau installées en maison individuelle, dont la
          puissance se situe généralement entre 6 et 16 kW. Cette visite doit
          impérativement être réalisée par un professionnel titulaire d&apos;une{' '}
          <strong>attestation d&apos;aptitude</strong> à la manipulation des fluides
          frigorigènes.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-entretien-technicien-cables-unite-exterieure.jpeg"
          alt="Technicien certifié raccordant les câbles de mesure sur une unité extérieure de pompe à chaleur lors d'une visite d'entretien"
          imagePosition="right"
        >
          <p>
            En pratique, l&apos;obligation s&apos;applique que la pompe à chaleur soit
            équipée d&apos;un appoint électrique ou non, et qu&apos;elle serve uniquement au
            chauffage ou également à la production d&apos;eau chaude sanitaire. Le
            non-respect de cette obligation n&apos;entraîne pas de sanction pénale directe
            pour le particulier, mais expose à un risque bien plus concret : la perte de
            la garantie constructeur et l&apos;absence de recours en cas de panne
            prématurée.
          </p>
          <p className="mt-3">
            Un <strong>contrat d&apos;entretien annuel</strong> souscrit auprès d&apos;un
            professionnel RGE QualiPAC est la solution la plus simple pour ne jamais
            manquer cette échéance : le rendez-vous est programmé automatiquement chaque
            année, sans démarche de votre part.
          </p>
        </ArticleImageSection>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Le contrôle d&apos;étanchéité du fluide frigorigène : une obligation à part
        </h3>
        <p className="text-slate-700 leading-relaxed mb-6">
          En complément de l&apos;entretien général, le règlement européen F-Gas
          (n° 517/2014) impose un <strong>contrôle d&apos;étanchéité</strong> périodique
          pour les équipements dont la charge en fluide frigorigène dépasse certains
          seuils. La plupart des pompes à chaleur air-eau résidentielles, dont la charge
          reste généralement inférieure à 2 kg, ne sont pas systématiquement soumises à ce
          contrôle renforcé — mais l&apos;entretien général annuel, lui, reste obligatoire
          dans tous les cas pour les appareils de plus de 4 kW. En cas de doute sur le
          régime applicable à votre installation, votre technicien RGE QualiPAC saura
          vous indiquer précisément les obligations qui s&apos;appliquent à votre appareil.
        </p>

        {/* ---- SECTION 3 : CONTENU DE LA VISITE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Que comprend une visite d&apos;entretien de pompe à chaleur air-eau ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          Une visite d&apos;entretien sérieuse ne se limite pas à un rapide coup d&apos;œil
          sur l&apos;unité extérieure. Elle suit un protocole précis qui couvre à la fois
          le circuit frigorifique et le circuit hydraulique — ce second point étant
          spécifique aux <strong>pompes à chaleur air-eau</strong>, contrairement aux
          modèles air-air qui n&apos;ont pas de circuit d&apos;eau à surveiller.
        </p>

        <ArticleSteps steps={VISITE_STEPS} />

        <ArticleFullImage
          image="/images/blog/pompe-a-chaleur-entretien-controle-circuit-frigorifique-manometres.jpg"
          alt="Technicien contrôlant les manomètres du circuit frigorifique d'une pompe à chaleur air-eau, boîtier électronique ouvert, outils de vide et raccords visibles"
          caption="Contrôle des pressions du circuit frigorifique et de l'électronique de commande — une étape clé de la visite d'entretien annuelle d'une pompe à chaleur air-eau."
        />

        <p className="text-slate-700 leading-relaxed mb-4">
          Sur une <strong>pompe à chaleur air-eau</strong>, le contrôle du circuit
          hydraulique mérite une attention particulière que n&apos;ont pas les autres types
          de PAC. La qualité de l&apos;eau qui circule dans les radiateurs ou le plancher
          chauffant influence directement la performance des échangeurs internes : une
          eau trop calcaire (dureté supérieure à 25 °TH) dépose du tartre qui réduit
          progressivement les échanges thermiques, exactement comme l&apos;encrassement de
          l&apos;échangeur extérieur. Dans les zones à eau dure, l&apos;installation d&apos;un
          adoucisseur ou d&apos;un inhibiteur de corrosion est souvent recommandée par le
          technicien lors de la visite.
        </p>

        <ArticleCallout type="tip" title="Le vase d'expansion, souvent oublié">
          <p>
            Le vase d&apos;expansion absorbe les variations de volume de l&apos;eau du circuit
            liées aux changements de température. Une pression insuffisante dans ce vase
            provoque des à-coups de pression qui font travailler la pompe de circulation
            plus que nécessaire, réduisant sa durée de vie et générant parfois des bruits
            de circulation d&apos;eau perceptibles dans les tuyauteries. Son contrôle fait
            partie intégrante d&apos;une visite d&apos;entretien complète d&apos;une pompe à
            chaleur air-eau.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 4 : FREQUENCE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelle fréquence pour l&apos;entretien d&apos;une pompe à chaleur air-eau ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La fréquence de référence, retenue à la fois par les fabricants et par la
          réglementation, est <strong>une visite par an</strong>. Le moment idéal se situe
          avant le début de la saison de chauffe, entre septembre et novembre : cela
          permet de détecter et corriger une éventuelle anomalie avant que l&apos;appareil
          ne soit sollicité intensivement pendant l&apos;hiver, période où une panne est à
          la fois plus probable (l&apos;appareil tourne davantage) et plus pénalisante
          (perte de chauffage en plein froid).
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Certains gestes d&apos;entretien courant, en revanche, gagnent à être réalisés
          plus fréquemment par le propriétaire lui-même — sans attendre la visite annuelle
          du professionnel. Le tableau suivant résume la répartition habituelle des tâches
          entre ce que vous pouvez faire vous-même et ce qui relève exclusivement d&apos;un
          technicien certifié.
        </p>

        <ArticleTable {...TACHES_TABLE} title="Répartition des tâches d'entretien d'une pompe à chaleur air-eau" />

        {/* ---- SECTION 5 : PRIX ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quel est le prix d&apos;un entretien de pompe à chaleur air-eau en 2026 ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Deux formules existent pour faire entretenir votre pompe à chaleur air-eau : la
          <strong> visite ponctuelle</strong>, facturée à l&apos;acte, et le{' '}
          <strong>contrat d&apos;entretien annuel</strong>, souscrit auprès d&apos;un
          prestataire pour plusieurs années. Une visite ponctuelle coûte généralement
          entre 120 et 250 € TTC selon la région, la complexité de l&apos;installation et le
          niveau de contrôle réalisé (avec ou sans contrôle d&apos;étanchéité approfondi).
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Un <strong>contrat d&apos;entretien</strong> revient en moyenne à 150–300 € par
          an, mais présente plusieurs avantages qui justifient ce prix légèrement supérieur
          à une visite isolée : le rendez-vous est programmé automatiquement chaque année
          sans que vous ayez à y penser, certains contrats incluent une priorité
          d&apos;intervention en cas de panne hors visite programmée, et le suivi dans la
          durée permet au technicien de repérer plus facilement une dérive progressive des
          performances d&apos;une année sur l&apos;autre.
        </p>

        <ArticleImageSection
          image="/images/blog/pompe-a-chaleur-entretien-controle-electrique-tableau-technicien.webp"
          alt="Technicien en casque de chantier contrôlant le tableau électrique d'une unité extérieure de pompe à chaleur lors d'un entretien annuel"
          imagePosition="left"
        >
          <p>
            Le prix d&apos;un entretien de pompe à chaleur air-eau varie aussi selon ce
            qu&apos;il inclut réellement : un contrat complet couvrant à la fois le
            contrôle du circuit frigorifique et celui du circuit hydraulique (spécifique
            aux modèles air-eau) coûtera logiquement plus cher qu&apos;une simple visite de
            contrôle visuel. Demandez systématiquement le détail des prestations incluses
            avant de comparer plusieurs devis.
          </p>
          <p className="mt-3">
            Pour une vision plus large du budget global d&apos;une installation, notre
            guide sur le{' '}
            <Link href="/blog/guide-prix-pompe-a-chaleur-2026" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
              prix d&apos;une pompe à chaleur
            </Link>{' '}
            détaille l&apos;ensemble des coûts, de l&apos;achat à l&apos;entretien, en passant
            par les aides financières disponibles.
          </p>
        </ArticleImageSection>

        {/* ---- SECTION 6 : RISQUES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Que risque-t-on en cas de défaut d&apos;entretien de sa pompe à chaleur air-eau ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le premier risque, le plus insidieux, est la <strong>dégradation silencieuse du
          rendement</strong>. Contrairement à une panne franche qui se remarque
          immédiatement, l&apos;encrassement des échangeurs ou une légère fuite de fluide
          frigorigène font grimper progressivement la facture d&apos;électricité, sans
          qu&apos;aucun signal d&apos;alerte n&apos;apparaisse sur l&apos;appareil lui-même. De
          nombreux propriétaires ne réalisent l&apos;ampleur du problème qu&apos;en comparant
          leurs factures de chauffage sur plusieurs hivers consécutifs.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le second risque, plus lourd financièrement, concerne la{' '}
          <strong>garantie constructeur</strong>. En cas de panne du compresseur — la
          pièce la plus coûteuse d&apos;une pompe à chaleur air-eau, dont le remplacement
          peut atteindre 800 à 2 000 € — la plupart des fabricants exigent la preuve d&apos;un
          entretien annuel réalisé par un professionnel certifié pour accepter la prise en
          charge sous garantie. Sans attestation d&apos;entretien à présenter, la réparation
          reste intégralement à votre charge, même si l&apos;appareil a moins de cinq ans.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, un défaut d&apos;entretien prolongé <strong>raccourcit la durée de vie</strong>{' '}
          de l&apos;appareil de façon significative. Une pompe à chaleur air-eau
          correctement entretenue dure en moyenne 15 à 20 ans, parfois davantage ; sans
          entretien, cette durée de vie peut être divisée par deux, le compresseur et les
          échangeurs s&apos;usant prématurément sous l&apos;effet combiné de l&apos;encrassement
          et des cycles de fonctionnement dégradés. Notre article sur les{' '}
          <Link href="/blog/pompe-a-chaleur-piege-a-eviter" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            pièges à éviter avec une pompe à chaleur
          </Link>{' '}
          revient plus en détail sur les erreurs les plus coûteuses commises par les
          propriétaires.
        </p>

        <ArticleCallout type="warning" title="Le signe qui doit vous alerter">
          <p>
            Si votre pompe à chaleur air-eau chauffe moins bien qu&apos;auparavant, tourne
            plus longtemps pour un résultat équivalent, ou si vous entendez un bruit
            inhabituel, ne prolongez pas l&apos;attente jusqu&apos;à la visite annuelle
            programmée : ces symptômes évoquent souvent un manque de fluide frigorigène ou
            un encrassement avancé, et un contrôle rapide permet d&apos;éviter une panne
            plus lourde.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 7 : GESTES SOI-MEME ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Entretien courant : les gestes que vous pouvez faire vous-même
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Entre deux visites annuelles du technicien, plusieurs gestes simples et sans
          risque permettent de préserver la performance de votre pompe à chaleur air-eau.
          Ils ne remplacent en rien la visite d&apos;entretien réglementaire, mais
          contribuent à limiter l&apos;encrassement et à repérer une anomalie plus tôt.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le geste le plus simple consiste à <strong>dégager la végétation</strong> autour
          de l&apos;unité extérieure : feuilles mortes, herbes hautes ou arbustes trop
          proches réduisent la circulation d&apos;air nécessaire au bon fonctionnement de
          l&apos;échangeur et accélèrent son encrassement. Un espace libre d&apos;au moins 50
          centimètres autour de l&apos;appareil est généralement recommandé par les
          fabricants. Un simple <strong>nettoyage des ailettes</strong> à l&apos;eau claire
          (jamais au nettoyeur haute pression, qui risquerait de les déformer), réalisé au
          printemps après l&apos;hiver, peut restaurer 5 à 8 % de performance perdue pendant
          la saison de chauffe.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Côté circuit hydraulique, vérifiez régulièrement le <strong>manomètre de
          pression</strong> visible sur la chaudière ou le module hydraulique : une
          pression qui chute régulièrement en dessous d&apos;1 bar peut indiquer une fuite
          d&apos;eau ou un vase d&apos;expansion défaillant, à signaler rapidement à votre
          professionnel. En revanche, toute intervention sur le circuit frigorifique —
          ajout de fluide, désembouage, remplacement de composants — doit impérativement
          être confiée à un professionnel habilité, la manipulation de fluides
          frigorigènes étant strictement réglementée pour des raisons environnementales et
          de sécurité.
        </p>

        {/* ---- SECTION 8 : CHOISIR SON PRESTATAIRE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Comment bien choisir son prestataire pour l&apos;entretien de sa pompe à chaleur air-eau ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le premier critère est la <strong>certification</strong>. Un professionnel doit
          être titulaire d&apos;une attestation de capacité pour manipuler les fluides
          frigorigènes — une obligation légale, sans laquelle l&apos;intervention n&apos;est
          tout simplement pas conforme. Le label <strong>RGE QualiPAC</strong> constitue
          une garantie supplémentaire : il atteste d&apos;une formation spécifique aux
          pompes à chaleur, au-delà de la seule habilitation fluide frigorigène, et reste
          indispensable si vous envisagez une future intervention éligible aux aides
          financières.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le second critère est la <strong>transparence du contrat</strong> : un devis
          d&apos;entretien sérieux détaille précisément les opérations incluses (contrôle
          frigorifique, contrôle hydraulique, nettoyage des échangeurs, remise
          d&apos;attestation) plutôt que d&apos;afficher un prix global vague. Vérifiez
          également les conditions de résiliation et la présence — ou non — d&apos;une
          priorité d&apos;intervention en cas de panne, un avantage appréciable en plein
          hiver.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, privilégiez un prestataire capable de suivre votre installation dans la
          durée plutôt qu&apos;un intervenant différent chaque année : la connaissance de
          l&apos;historique de votre pompe à chaleur air-eau permet de repérer plus
          facilement une dérive progressive de performance d&apos;une visite à l&apos;autre.
          Si votre pompe à chaleur air-eau vient d&apos;être installée, pensez également à
          faire réaliser un{' '}
          <Link href="/services/audit" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            audit énergétique
          </Link>{' '}
          global de votre logement : une bonne{' '}
          <Link href="/blog/prix-d-une-isolation-des-combles" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">
            isolation des combles
          </Link>{' '}
          réduit les sollicitations de l&apos;appareil et facilite d&apos;autant son
          entretien dans la durée.
        </p>

        <ArticleCallout type="info" title="L'essentiel à retenir">
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>Obligation légale</strong> — entretien annuel pour toute PAC de plus de 4 kW</li>
            <li><strong>Fréquence</strong> — une visite par an, idéalement avant la saison de chauffe</li>
            <li><strong>Prix</strong> — 120 à 250 € en visite ponctuelle, 150 à 300 €/an en contrat</li>
            <li><strong>Sans entretien</strong> — garantie constructeur perdue, durée de vie divisée par deux</li>
            <li><strong>Vous pouvez faire vous-même</strong> — nettoyage des ailettes, dégagement de l&apos;unité, contrôle visuel de pression</li>
          </ul>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Contrat d'entretien pour votre pompe à chaleur air-eau"
          description="Nos techniciens certifiés RGE QualiPAC réalisent l'entretien complet de votre pompe à chaleur air-eau — circuit frigorifique et circuit hydraulique inclus — avec un contrat sans engagement et un rappel automatique chaque année."
        />

        {/* ---- FAQ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Questions fréquentes sur l&apos;entretien d&apos;une pompe à chaleur air-eau
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
            href="/services/maintenance"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Notre service</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Contrats d&apos;entretien pompe à chaleur
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Voir les formules <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/duree-de-vie-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Durée de vie d&apos;une pompe à chaleur
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
              Lire le guide <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </Link>
          <Link
            href="/blog/rendement-pompe-a-chaleur"
            className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Article associé</p>
            <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">
              Rendement pompe à chaleur : 8 facteurs clés
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
        </div>

        {/* ---- LIENS VILLES ---- */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Entretien de pompe à chaleur par ville en Île-de-France
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
