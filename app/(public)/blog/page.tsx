import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar, ArrowRight, FileText, Clock, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"

// Articles statiques — chacun a son propre app/(public)/blog/<slug>/page.tsx
// avec le contenu en composant React. Ajouter un nouvel article = créer
// un nouveau dossier + une entrée ici.
const STATIC_ARTICLES = [
  {
    id: 'remplacer-chaudiere-gaz-pac-2026',
    title: "Remplacer sa chaudière gaz par une pompe à chaleur en 2026 : le guide complet",
    slug: 'remplacer-chaudiere-gaz-pompe-a-chaleur-2026',
    excerpt: "TVA à 20 % sur les chaudières gaz, prime EDF de 1 000 €, bonus MaPrimeRénov' +1 000 € du 15 avril, Coup de pouce CEE x3 : pourquoi 2026 est l'année idéale pour basculer du gaz à la PAC, et comment s'y prendre.",
    published_date: '2026-04-20',
    image: '/images/blog/remplacer-chaudiere-gaz-pac-hero.png',
    readingTime: 15,
    category: 'Guide',
    featured: true,
  },
  {
    id: 'guide-prix-pac-2026',
    title: "Prix d'une pompe à chaleur en 2026 : coûts, aides et rentabilité",
    slug: 'guide-prix-pompe-a-chaleur-2026',
    excerpt: "Combien coûte une PAC en 2026 ? Barème MaPrimeRénov', comparatif air-eau vs air-air, calcul du reste à charge. Données officielles du gouvernement.",
    published_date: '2026-04-15',
    image: '/pac.jpg',
    readingTime: 12,
    category: 'Guide',
    featured: true,
  },
  {
    id: 'isolation-murs-interieur-2026',
    title: "Meilleure isolation thermique des murs par l'intérieur en 2026 : comparatif complet",
    slug: 'meilleur-isolant-thermique-murs-interieur-2026',
    excerpt: "Laine de roche, PSE, polyuréthane projeté ou ouate de cellulose : quel isolant pour vos murs intérieurs ? Comparatif des matériaux, prix au m², aides MaPrimeRénov' et guide de pose.",
    published_date: '2026-05-22',
    image: '/images/blog/isolation-murs-pose-laine-roche.jpg',
    readingTime: 12,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'consommation-pac-100m2-2026',
    title: "Consommation pompe à chaleur maison 100 m² : chiffres et calcul 2026",
    slug: 'consommation-pompe-a-chaleur-maison-100m2',
    excerpt: "Quelle est la consommation d'une PAC air-eau pour une maison de 100 m² ? Entre 2 900 et 5 100 kWh/an selon l'isolation. Calcul du COP, comparatif, et 6 astuces pour réduire votre facture.",
    published_date: '2026-05-27',
    image: '/images/blog/pac-unite-exterieure-maison-briques-plantes.jpg',
    readingTime: 13,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'pac-puissance-2026',
    title: "Puissance pompe à chaleur : comment calculer et choisir ? Guide 2026",
    slug: 'puissance-pompe-a-chaleur',
    excerpt: "Quelle puissance pour une pompe à chaleur ? Tableau de dimensionnement de 50 à 300 m², formule pas à pas avec coefficient de déperdition, zones climatiques H1/H2/H3 et risques d'une PAC mal dimensionnée.",
    published_date: '2026-05-27',
    image: '/images/blog/pac-air-eau-moderne-maison-pierre.jpg',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'isolation-combles-prix-m2-2026',
    title: "Prix isolation combles au m² en 2026 : tarifs, matériaux et aides",
    slug: 'prix-isolation-combles-au-m2',
    excerpt: "Quel prix pour l'isolation des combles au m² en 2026 ? Tarifs par isolant (laine de verre, ouate), combles perdus vs aménageables, aides MaPrimeRénov' et reste à charge réel.",
    published_date: '2026-05-30',
    image: '/images/blog/isolation-combles-pose-laine-verre-artisan.jpg',
    readingTime: 13,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'pac-chauffage-sol-2026',
    title: "Pompe à chaleur pour chauffage au sol : guide complet 2026",
    slug: 'pompe-a-chaleur-chauffage-au-sol',
    excerpt: "PAC air-eau et plancher chauffant hydraulique : pourquoi cette combinaison est la plus efficace, COP 4,0–5,0, prix en 2026, revêtements compatibles et aides MaPrimeRénov'.",
    published_date: '2026-05-31',
    image: '/images/blog/pac-chauffage-sol-plancher-chauffant-tuyaux-pose.jpg',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'isolation-murs-humides-2026',
    title: "Isolation Murs Humides : Traitement, Isolants et Étapes en 2026",
    slug: 'isolation-murs-humides',
    excerpt: "Comment isoler un mur humide sans créer de moisissures ? Diagnostic condensation vs remontées capillaires, choix de l'isolant perméable à la vapeur, VMC et aides financières 2026.",
    published_date: '2026-06-05',
    image: '/images/blog/isolation-mur-humide-pose-panneaux-xps.webp',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'isolation-mur-interieur-quelle-epaisseur',
    title: "Isolation mur intérieur : quelle épaisseur d'isolant choisir en 2026 ?",
    slug: 'isolation-mur-interieur-quelle-epaisseur',
    excerpt: "Quelle épaisseur d'isolant pour l'isolation de vos murs par l'intérieur ? Formule R = e/λ, tableau comparatif par matériau (laine de verre, laine de roche, PSE, polyuréthane), seuils MaPrimeRénov' 2026 et aides cumulables.",
    published_date: '2026-06-12',
    image: '/images/blog/isolation-mur-interieur-mousse-polyurethane.jpg',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'pompe-a-chaleur-hybride',
    title: "Pompe à chaleur hybride : guide complet 2026 pour choisir et installer",
    slug: 'pompe-a-chaleur-hybride',
    excerpt: "PAC hybride gaz ou fioul : fonctionnement, prix d'installation, aides MaPrimeRénov' 2026 et comparatif avec la PAC seule. Tout savoir avant de remplacer votre chaudière.",
    published_date: '2026-06-07',
    image: '/images/blog/pac-hybride-unite-exterieure.avif',
    readingTime: 12,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'duree-de-vie-pompe-a-chaleur',
    title: "Durée de vie d'une pompe à chaleur : tout ce qu'il faut savoir en 2026",
    slug: 'duree-de-vie-pompe-a-chaleur',
    excerpt: "Quelle est la durée de vie d'une pompe à chaleur ? Durée de vie moyenne par type (air-air, air-eau, géothermique), facteurs qui l'influencent, signes de fin de vie et conseils pour la prolonger.",
    published_date: '2026-06-16',
    image: '/images/blog/pac-unite-exterieure-neige-hiver.jpg',
    readingTime: 13,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'isolation-sol-sous-parquet',
    title: "Isolation sol sous parquet : les 5 meilleures sous-couches et guide complet 2026",
    slug: 'isolation-sol-sous-parquet',
    excerpt: "Comment bien isoler un sol sous parquet ? Mousse polyéthylène, liège, fibre de bois, composite ou plancher chauffant : comparatif des 5 sous-couches, épaisseurs, règles de pose et erreurs à éviter.",
    published_date: '2026-06-25',
    image: '/images/blog/isolation-sol-sous-parquet-sous-couche-rouleau.webp',
    readingTime: 13,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'isolation-rampants-de-toiture',
    title: "Isolation rampants de toiture : guide complet 2026 (matériaux, prix, pose)",
    slug: 'isolation-rampants-de-toiture',
    excerpt: "Comment bien isoler les rampants de toiture ? Isolation par l'intérieur ou sarking, comparatif laine de verre, laine de roche, ouate de cellulose et polyuréthane, épaisseurs, prix au m² et aides MaPrimeRénov'.",
    published_date: '2026-07-02',
    image: '/images/blog/isolation-rampants-toiture-combles-amenages-charpente.webp',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'pompe-a-chaleur-et-bruit',
    title: "Pompe à chaleur et bruit : causes, niveau sonore et solutions 2026",
    slug: 'pompe-a-chaleur-et-bruit',
    excerpt: "Quel est le niveau sonore réel d'une pompe à chaleur ? Causes du bruit, réglementation sur les bruits de voisinage et solutions pour réduire le bruit d'une pompe à chaleur air-eau ou air-air.",
    published_date: '2026-07-07',
    image: '/images/blog/pompe-a-chaleur-bruit-unite-exterieure-gravier-jardin.jpeg',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'pompe-a-chaleur-piege-a-eviter',
    title: "Pompe à chaleur : 10 pièges à éviter absolument en 2026",
    slug: 'pompe-a-chaleur-piege-a-eviter',
    excerpt: "Mauvais dimensionnement, artisan non-RGE, isolation insuffisante, emplacement bruyant, aides ratées... Les 10 erreurs les plus coûteuses à éviter avant et après l'installation d'une pompe à chaleur.",
    published_date: '2026-06-21',
    image: '/images/blog/pac-piege-eviter-unite-exterieure-moderne.jpg',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'isolation-pour-sol-beton',
    title: "Isolation pour sol béton : guide complet 2026 — dalle, chape flottante et matériaux",
    slug: 'isolation-pour-sol-beton',
    excerpt: "Comment réaliser l'isolation pour sol béton ? Polystyrène expansé, XPS, chape flottante, dalle sur terre-plein ou vide sanitaire : comparatif complet des matériaux, prix au m² et aides MaPrimeRénov' 2026.",
    published_date: '2026-06-18',
    image: '/images/blog/isolation-sol-beton-xps-dalle-beton.jpg',
    readingTime: 15,
    category: 'Guide',
    featured: false,
  },
  {
    id: 'rendement-pompe-a-chaleur',
    title: "Rendement pompe à chaleur : 8 facteurs clés pour un COP optimal en 2026",
    slug: 'rendement-pompe-a-chaleur',
    excerpt: "Qu'est-ce que le COP et le SCOP d'une pompe à chaleur ? Température extérieure, départ d'eau, isolation, Inverter, dimensionnement... Les 8 leviers concrets pour maximiser le rendement réel de votre PAC.",
    published_date: '2026-06-25',
    image: '/images/blog/rendement-pac-unite-exterieure-panneaux-solaires.jpg',
    readingTime: 14,
    category: 'Guide',
    featured: false,
  },
]

export const metadata: Metadata = {
  title: "Blog | Actualités Énergie Solaire & Rénovation | Greenter",
  description: "Guides pratiques, conseils et actualités sur la rénovation énergétique : pompe à chaleur, panneaux solaires, isolation, aides MaPrimeRénov'. Par Greenter.",
  openGraph: {
    title: "Blog Rénovation Énergétique | Greenter",
    description: "Blog Greenter : guides pratiques, retours d'expérience et actualités sur la rénovation énergétique — pompe à chaleur, panneaux solaires, isolation et aides MaPrimeRénov'. Par un expert certifié RGE en Île-de-France.",
    url: "https://www.greenter.fr/blog",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.greenter.fr/blog",
  },
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.greenter.fr" },
  { name: "Blog", url: "https://www.greenter.fr/blog" }
]

export default function BlogPage() {
  // Article mis en avant (le plus récent des statiques)
  const featuredArticle = STATIC_ARTICLES.find(a => a.featured) || STATIC_ARTICLES[0]

  // Reste des articles statiques (non featured)
  const otherStaticArticles = STATIC_ARTICLES.filter(a => a.id !== featuredArticle?.id)

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ---- HERO ---- */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white/80 font-medium">Blog</span>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-block text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Le blog Greenter
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Guides & Conseils{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Rénovation Énergétique</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Prix, aides, comparatifs, retours d&apos;expérience. Tout ce qu&apos;il faut savoir avant de rénover votre logement.
            </p>
          </div>
        </div>
      </section>

      {/* ---- ARTICLE MIS EN AVANT ---- */}
      {featuredArticle && (
        <section className="-mt-10 relative z-20 container mx-auto max-w-6xl px-4 mb-16">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-slate-200 hover:ring-emerald-300 hover:shadow-2xl transition-all"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredArticle.published_date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readingTime} min
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-3 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                  Lire l&apos;article complet
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ---- GRILLE ARTICLES ---- */}
      <section className="container mx-auto max-w-6xl px-4 pb-20">
        {otherStaticArticles.length > 0 ? (
          <>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">Tous nos articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStaticArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-100 hover:ring-emerald-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{article.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(article.published_date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readingTime} min</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          /* Empty state — seulement si aucun article du tout */
          featuredArticle ? null : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">D&apos;autres articles arrivent bientôt</h2>
              <p className="text-slate-600 mb-6">Nos guides sur les panneaux solaires et l&apos;isolation sont en préparation.</p>
              <Link href="/" className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Retour à l&apos;accueil <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )
        )}

        {/* Newsletter / CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center border border-emerald-100">
          <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Besoin d&apos;un devis pour votre projet ?
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-6">
            Nos experts certifiés RGE vous conseillent gratuitement sur la meilleure solution pour votre logement.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/30">
            Demander un devis gratuit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

