import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArticleLayout, ArticleTable, ArticleCallout, ArticleCTA,
  ArticleStat, ArticleSteps, ArticleSources, ArticleImageSection,
  ArticleFaq, ArticleLinkCards, PacCityLinks,
} from '@/components/blog'
import { FAQPageSchema } from '@/components/schemas/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/schemas/BreadcrumbSchema'
import { ArticleSchema } from '@/components/schemas/ArticleSchema'
import {
  ARTICLE_META, MPR_TABLE, PLAFONDS_TABLE, CUMUL_TABLE, DEMARCHES_STEPS, FAQ_ITEMS, SOURCES,
} from '@/lib/blog-articles/aide-pompe-a-chaleur-2026'

const HERO_IMAGE = '/images/blog/pompe-a-chaleur-1-euro-facture-calculette-compteur-energie.webp'
const HERO_ALT = "Calculatrice, billets en euros, afficheur de consommation et relevé d'énergie posés sur une table devant l'unité extérieure blanche d'une pompe à chaleur, pour calculer l'aide pompe à chaleur 2026"

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
    images: [{ url: `https://www.greenter.fr${HERO_IMAGE}`, width: 1376, height: 768, alt: HERO_ALT }],
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
  { name: 'Aide pompe à chaleur 2026', url: `https://www.greenter.fr/blog/${ARTICLE_META.slug}` },
]

const linkCls = 'text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors'

export default function AidePompeAChaleur2026() {
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
        wordCount={2900}
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
            Il y a encore un an, la question était simple : combien MaPrimeRénov’ allait-elle
            verser ? En 2026, elle l’est beaucoup moins. Le dispositif a été suspendu, puis
            rouvert en février, avant d’être profondément resserré au 1er septembre. Dans le
            même temps, la prime CEE a changé de règles, et le modèle exact de pompe à chaleur
            inscrit sur votre devis peut désormais faire varier l’aide de plusieurs milliers
            d’euros.
          </p>
          <p>
            Bonne nouvelle malgré tout : la pompe à chaleur air-eau fait partie des rares
            travaux encore financés en geste isolé. L’<strong>aide pompe à chaleur 2026</strong>{' '}
            reste donc significative, à condition de respecter l’ordre des démarches et de
            choisir un équipement agréé.
          </p>
          <p>
            Nous faisons ici le point sur chaque aide, ses montants et ses conditions, puis
            nous les additionnons sur un cas réel de maison en Seine-et-Marne pour voir ce
            qui reste vraiment à payer.
          </p>
        </div>

        <ArticleCallout type="success" title="Ce que vous allez trouver dans cet article">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Les changements de septembre 2026 et leurs conséquences</li>
            <li>Les montants de MaPrimeRénov’ selon vos revenus</li>
            <li>Le fonctionnement de la prime CEE et du Coup de pouce chauffage</li>
            <li>Un exemple chiffré du reste à charge par profil</li>
            <li>Les démarches dans le bon ordre pour ne perdre aucune aide</li>
          </ul>
        </ArticleCallout>

        {/* ---- SECTION 1 : CE QUI A CHANGE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Aide pompe à chaleur 2026 : ce qui a changé cette année
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Trois décisions ont modifié le paysage des aides en 2026. La première date du
          1er janvier : les pompes à chaleur hybrides, qui associent une PAC et une chaudière
          gaz, ont perdu la bonification Coup de pouce chauffage. L’État veut réserver ses
          primes les plus fortes aux systèmes qui sortent complètement des énergies fossiles.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La deuxième concerne le Coup de pouce lui-même. Depuis le 1er septembre 2026, il
          n’est accordé qu’aux pompes à chaleur air-eau et eau-eau figurant sur une liste de
          modèles agréés, publiée par l’ADEME et mise à jour chaque mois. Une PAC absente de
          cette liste reste éligible à la prime CEE de base, mais sans le coefficient
          multiplicateur qui en fait tout l’intérêt.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La troisième touche MaPrimeRénov’. Un décret publié fin août a sorti la plupart des
          travaux du parcours par geste : isolation des murs ou des combles, chauffe-eau
          thermodynamique, ventilation. Ils ne sont plus financés qu’au sein d’une rénovation
          d’ampleur accompagnée. La PAC air-eau, la PAC géothermique et la dépose d’une cuve à
          fioul font partie des exceptions qui restent aidées seules.
        </p>

        <ArticleStat stats={[
          { value: '5 000 €', label: 'MaPrimeRénov’ maximum pour une PAC air-eau (ménages très modestes)', color: 'green' },
          { value: '1er sept.', label: 'date à partir de laquelle le Coup de pouce exige une PAC agréée', color: 'amber' },
          { value: '0 €', label: 'MaPrimeRénov’ pour une PAC air-air ou pour les revenus supérieurs', color: 'red' },
        ]} />

        {/* ---- SECTION 2 : MAPRIMERENOV ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          MaPrimeRénov’ pour une pompe à chaleur : les montants 2026
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          MaPrimeRénov’ par geste est un forfait. Son montant ne dépend pas du prix de votre
          pompe à chaleur mais de deux choses : le type d’équipement et votre catégorie de
          revenus. Les ménages sont classés en quatre profils, identifiés par une couleur, à
          partir du revenu fiscal de référence et du nombre de personnes dans le foyer.
        </p>

        <ArticleTable {...MPR_TABLE} title="MaPrimeRénov’ par geste : forfaits 2026 pour le chauffage" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Deux remarques sur ce tableau. D’abord, la géothermie reste nettement mieux aidée
          que l’aérothermie, ce qui compense en partie son coût de forage. Nous comparons les
          deux technologies dans notre article{' '}
          <Link href="/blog/geothermie-ou-pompe-a-chaleur" className={linkCls}>
            géothermie ou pompe à chaleur
          </Link>
          . Ensuite, les ménages aux revenus supérieurs, le profil rose, ne reçoivent plus
          rien en geste isolé. Pour eux, l’aide se résume à la prime CEE et à la TVA réduite.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les plafonds de revenus en Île-de-France
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Les plafonds sont plus élevés en Île-de-France que dans le reste du pays, pour tenir
          compte du coût de la vie. Un couple avec deux enfants déclarant moins de 60 208 € de
          revenu fiscal de référence est ainsi classé « modeste » et touche 4 000 € pour sa PAC
          air-eau.
        </p>

        <ArticleTable {...PLAFONDS_TABLE} title="Plafonds de revenus MaPrimeRénov’ 2026 en Île-de-France" />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Les conditions à remplir
        </h3>

        <p className="text-slate-700 leading-relaxed mb-4">
          Le logement doit être votre résidence principale, ou celle de votre locataire si vous
          êtes bailleur, et avoir été achevé depuis au moins 15 ans. Ce délai tombe à 2 ans
          lorsque la pompe à chaleur remplace une chaudière au fioul. Les travaux doivent être
          confiés à une entreprise titulaire du label RGE, mention QualiPAC pour une pompe à
          chaleur.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          L’équipement doit enfin atteindre une efficacité énergétique saisonnière minimale,
          l’ETAS, indiquée sur sa fiche technique. Le seuil est plus exigeant pour une PAC
          basse température, destinée à un plancher chauffant, que pour une PAC moyenne ou
          haute température qui alimente des radiateurs. Tous les modèles sérieux du marché
          l’atteignent, mais le devis doit l’indiquer noir sur blanc.
        </p>

        <ArticleCallout type="info" title="Et la rénovation d’ampleur ?">
          <p>
            Si votre maison est classée E, F ou G et que vous envisagez un chantier global
            (isolation, chauffage, ventilation) permettant de gagner au moins deux classes
            de DPE, le parcours accompagné peut financer une part bien plus importante des
            travaux, PAC comprise. Il impose un rendez-vous préalable avec un conseiller
            France Rénov’ et l’intervention d’un Accompagnateur Rénov’. Les deux parcours ne
            se cumulent pas pour un même équipement.
          </p>
        </ArticleCallout>

        {/* ---- SECTION 3 : CEE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          La prime CEE et le Coup de pouce chauffage
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La prime CEE, pour certificats d’économies d’énergie, n’est pas versée par l’État
          mais par les fournisseurs d’énergie et les distributeurs de carburant, que la loi
          oblige à financer des économies d’énergie chez les particuliers. C’est ce qui
          explique que son montant varie d’un acteur à l’autre pour un même chantier.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour une pompe à chaleur air-eau, la prime de base est calculée selon la zone
          climatique, la surface chauffée et l’efficacité de l’appareil. Lorsque la PAC
          remplace une chaudière au fioul, au gaz (hors condensation) ou au charbon, la
          bonification Coup de pouce chauffage multiplie cette prime. C’est elle qui fait
          passer l’aide de quelques centaines d’euros à plusieurs milliers.
        </p>

        <ArticleImageSection
          image="/images/blog/pac-air-eau-moderne-maison-pierre.jpg"
          alt="Unité extérieure blanche et noire d'une pompe à chaleur air-eau posée sur des plots devant une maison en pierre de parement, entourée de feuilles mortes en automne"
          imagePosition="right"
        >
          <p>
            Une PAC air-eau qui remplace une chaudière gaz ou fioul est le cas le mieux aidé
            en 2026 : forfait MaPrimeRénov’ et prime CEE bonifiée se cumulent.
          </p>
          <p className="mt-3">
            Encore faut-il que le modèle figure sur la liste des PAC agréées par l’ADEME.
          </p>
        </ArticleImageSection>

        <p className="text-slate-700 leading-relaxed mb-4">
          Fin 2026, pour une maison de 100 m² en Île-de-France, la prime bonifiée se situe
          le plus souvent entre 2 500 et 4 500 €, un peu plus pour les ménages modestes.
          Les écarts entre fournisseurs sont réels : comparer deux ou trois offres avant de
          signer peut faire gagner plusieurs centaines d’euros.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          La règle à ne jamais oublier tient en une phrase : l’offre CEE doit être acceptée
          avant la signature du devis. Une demande faite après coup est systématiquement
          refusée, même si tous les autres critères sont remplis. En pratique, la plupart des
          installateurs RGE gèrent ce point avec vous et déduisent la prime du devis.
        </p>

        {/* ---- SECTION 4 : TVA, ECO-PTZ ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          TVA à 5,5 %, éco-PTZ et aides locales
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La TVA réduite est l’aide la plus discrète, mais pas la plus faible. Une pompe à
          chaleur air-eau ou géothermique posée dans un logement de plus de deux ans est
          facturée à 5,5 % au lieu de 20 %, matériel et main-d’œuvre compris. Sur un devis de
          15 000 € TTC, l’économie dépasse 2 000 €. Elle s’applique à tous les ménages, sans
          condition de revenus. La climatisation réversible air-air, elle, reste à 10 %.
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          L’éco-prêt à taux zéro permet de financer le reste à charge sans intérêts. Pour une
          pompe à chaleur seule, il est plafonné à 15 000 €, remboursables sur 15 ans au plus.
          Il monte à 25 000 € pour deux travaux, 30 000 € pour trois, et 50 000 € pour une
          rénovation globale. Il se demande auprès d’une banque partenaire, avec le devis de
          l’entreprise RGE.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Certaines collectivités ajoutent enfin leur propre prime, sous conditions de
          ressources ou de performance. Ces dispositifs changent souvent et diffèrent d’une
          commune à l’autre. Le conseiller France Rénov’ de votre secteur, joignable
          gratuitement, connaît ceux qui sont ouverts au moment de votre projet.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
          Propriétaire bailleur ou maison en copropriété
        </h3>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un propriétaire bailleur peut lui aussi toucher MaPrimeRénov’ pour une pompe à
          chaleur, à condition de louer le logement en résidence principale pendant au moins
          six ans après les travaux. Pour une maison en copropriété horizontale, gérée par
          une association syndicale, l’aide est individuelle, mais l’accord des autres
          propriétaires peut être nécessaire avant de poser une unité extérieure visible.
          Mieux vaut le demander avant de signer le devis.
        </p>

        {/* ---- SECTION 5 : EXEMPLE ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Exemple chiffré : combien d’aides pour une PAC air-eau en Seine-et-Marne ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Prenons un cas que nous rencontrons chaque semaine autour d’Ozoir-la-Ferrière : une
          maison de 100 m² des années 1980, chauffée par une chaudière gaz de 1995 reliée à
          des radiateurs en acier. Les combles ont été isolés il y a quelques années. Le devis
          porte sur une PAC air-eau agréée de 11 kW avec ballon d’eau chaude, pour
          15 000 € TTC, TVA à 5,5 % incluse.
        </p>

        <ArticleTable {...CUMUL_TABLE} title="Aides et reste à charge selon le profil de revenus" />

        <p className="text-slate-700 leading-relaxed mb-4">
          Pour un ménage modeste, les aides couvrent donc environ la moitié du projet. Le reste
          à charge de 7 500 € se rembourse en sept à huit ans grâce aux économies de
          chauffage, de l’ordre de 900 à 1 200 € par an dans ce type de maison. Notre article
          sur le{' '}
          <Link href="/blog/cout-installation-pompe-a-chaleur" className={linkCls}>
            coût d’installation d’une pompe à chaleur
          </Link>{' '}
          détaille ce qui compose un devis de ce montant.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Un dernier garde-fou s’applique : le cumul des aides ne peut pas dépasser un
          pourcentage de la dépense, 90 % pour les ménages très modestes, 75 % pour les
          modestes, 60 % pour les intermédiaires et 40 % pour les revenus supérieurs. Dans
          notre exemple, aucun profil n’atteint ce plafond. Il devient en revanche limitant
          sur les petits devis, par exemple une PAC de faible puissance dans une maison bien
          isolée.
        </p>

        {/* ---- SECTION 6 : NON AIDEES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Quelles pompes à chaleur ne sont plus aidées en 2026 ?
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>pompe à chaleur air-air</strong>, souvent vendue sous le nom de
          climatisation réversible, n’ouvre droit ni à MaPrimeRénov’, ni au Coup de pouce. Elle
          garde un intérêt réel pour remplacer des convecteurs électriques, mais son prix doit
          être comparé sans aide. Nous détaillons les tarifs dans notre article sur le{' '}
          <Link href="/blog/prix-pompe-a-chaleur-air-air" className={linkCls}>
            prix d’une pompe à chaleur air-air
          </Link>
          .
        </p>

        <p className="text-slate-700 leading-relaxed mb-4">
          La <strong>PAC hybride</strong> reste éligible à une prime CEE classique, mais sans
          bonification depuis janvier. Elle conserve du sens dans quelques maisons très
          énergivores, en attendant une isolation. Nous en parlons dans notre article sur la{' '}
          <Link href="/blog/pompe-a-chaleur-hybride" className={linkCls}>
            pompe à chaleur hybride
          </Link>
          .
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Enfin, toute PAC air-eau <strong>non agréée</strong> perd la bonification depuis le
          1er septembre. Ce n’est pas forcément un mauvais appareil, mais la différence de
          prime peut atteindre 2 000 à 3 000 €. Avant de comparer deux devis, vérifiez que les
          deux modèles proposés figurent bien sur la liste.
        </p>

        {/* ---- SECTION 7 : DEMARCHES ---- */}
        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">
          Les démarches dans le bon ordre
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          La plupart des aides perdues le sont pour une raison de calendrier, pas
          d’éligibilité. Une prime CEE demandée après la signature, un chantier commencé
          avant le dépôt du dossier MaPrimeRénov’ : dans les deux cas, l’aide est refusée sans
          recours. Voici l’ordre à suivre.
        </p>

        <ArticleSteps steps={DEMARCHES_STEPS} />

        <ArticleCallout type="warning" title="Méfiez-vous des offres trop belles">
          <p>
            Le démarchage téléphonique pour des travaux de rénovation énergétique est interdit
            en France depuis 2020. Un appel qui vous propose une pompe à chaleur « à 1 euro »
            ou « entièrement financée » doit vous alerter. Nous expliquons pourquoi dans notre
            article{' '}
            <Link href="/blog/pompe-a-chaleur-a-1-euro-vrai-ou-faux" className={linkCls}>
              pompe à chaleur à 1 euro : vrai ou faux
            </Link>
            , et listons les autres pièges dans{' '}
            <Link href="/blog/pompe-a-chaleur-piege-a-eviter" className={linkCls}>
              les pièges à éviter avec une pompe à chaleur
            </Link>
            .
          </p>
        </ArticleCallout>

        {/* ---- CTA ---- */}
        <ArticleCTA
          title="Combien d’aides pour votre pompe à chaleur ?"
          description="Nos installateurs RGE QualiPAC calculent vos aides exactes selon vos revenus et votre logement, proposent uniquement des PAC agréées et déduisent la prime CEE du devis. Visite et devis gratuits sous 48h en Île-de-France."
        />

        <ArticleFaq title="Questions fréquentes sur les aides pour une pompe à chaleur" items={FAQ_ITEMS} />

        <ArticleSources sources={SOURCES} />

        <ArticleLinkCards cards={[
          { href: '/services/pompe-a-chaleur', kicker: 'Notre service', title: 'Installation de pompe à chaleur', cta: 'Voir le service' },
          { href: '/blog/remplacer-chaudiere-fioul-par-pompe-a-chaleur', kicker: 'Article associé', title: 'Remplacer une chaudière fioul par une PAC', cta: 'Lire l’article' },
          { href: '/blog/guide-prix-pompe-a-chaleur-2026', kicker: 'Article associé', title: 'Prix d’une pompe à chaleur en 2026', cta: 'Lire l’article' },
          { href: '/blog/pompe-a-chaleur-haute-temperature', kicker: 'Article associé', title: 'Pompe à chaleur haute température', cta: 'Lire l’article' },
        ]} />

        <PacCityLinks cities={[
          { name: 'Ozoir-la-Ferrière', slug: 'ozoir-la-ferriere' },
          { name: 'Roissy-en-Brie', slug: 'roissy-en-brie' },
          { name: 'Brie-Comte-Robert', slug: 'brie-comte-robert' },
          { name: 'Pontault-Combault', slug: 'pontault-combault' },
          { name: 'Melun', slug: 'melun' },
          { name: 'Créteil', slug: 'creteil' },
          { name: 'Versailles', slug: 'versailles' },
          { name: 'Massy', slug: 'massy' },
        ]} />

      </ArticleLayout>
    </>
  )
}
