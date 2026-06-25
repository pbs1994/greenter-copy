// =============================================================================
// Données article : Isolation sol sous parquet — sous-couches et règles à respecter
// Sources : ademe.fr, qualibat.com, cstb.fr, france-renov.gouv.fr,
//           parquet-parquet.fr, bnba.fr, plancher-bois.com
// Date de recherche : juin 2026
// =============================================================================

export const ARTICLE_META = {
  title: "Isolation sol sous parquet : les 5 meilleures sous-couches et guide complet 2026",
  subtitle:
    "Comment bien isoler un sol sous parquet ? Sous-couche mousse, liège, fibre de bois, composite ou plancher chauffant : comparatif des 5 matériaux, épaisseurs, règles de pose et compatibilités.",
  slug: "isolation-sol-sous-parquet",
  date: "25 juin 2026",
  dateISO: "2026-06-25",
  readingTime: 13,
  author: "Greenter",
}

export const FAQ_ITEMS = [
  {
    question: "Quelle sous-couche choisir pour isoler un sol sous parquet ?",
    answer:
      "Le choix de la sous-couche dépend de trois critères : le type de parquet (flottant, collé ou cloué), la nature du support (dalle béton, plancher bois, plancher chauffant) et l'objectif prioritaire (isolation thermique, acoustique ou les deux). Pour un parquet flottant sur dalle béton, la sous-couche en liège naturel (5–6 mm) est la meilleure option polyvalente : elle isole thermiquement (R ≈ 0,15 m²·K/W) et acoustiquement (ΔLw ≈ 19 dB), tout en résistant à l'humidité. Pour un plancher chauffant, choisissez une sous-couche spécifique avec résistance thermique totale ≤ 0,15 m²·K/W (marquage obligatoire sur les emballages).",
  },
  {
    question: "Peut-on poser un parquet flottant sur dalle béton sans sous-couche ?",
    answer:
      "Non, il est fortement déconseillé — voire techniquement impossible — de poser un parquet flottant directement sur une dalle béton sans sous-couche. Sans sous-couche, le parquet cliquète, résonne et se déforme rapidement sous l'effet des variations d'humidité que la dalle béton transmet. La sous-couche joue un rôle triple : elle absorbe les irrégularités du support (jusqu'à 3 mm selon les produits), crée une barrière contre l'humidité capillaire, et isole phoniquement les bruits d'impact.",
  },
  {
    question: "Quelle épaisseur de sous-couche sous parquet ?",
    answer:
      "L'épaisseur de sous-couche recommandée dépend du type de parquet et de l'objectif. Pour un parquet contrecollé flottant, une sous-couche de 3 à 5 mm suffit généralement (le parquet lui-même intègre parfois une sous-couche préencollée). Pour un parquet massif flottant, 5 à 8 mm sont conseillés. Attention : les sous-couches trop épaisses (> 10 mm) peuvent fragiliser le système de clipsage des lames et provoquer des déformations dans le temps. En plancher chauffant, l'épaisseur totale (sous-couche + parquet) ne doit pas dépasser les valeurs de résistance thermique autorisées.",
  },
  {
    question: "Quelle sous-couche pour parquet sur plancher chauffant ?",
    answer:
      "Sur plancher chauffant hydraulique ou électrique, la sous-couche doit impérativement être marquée « compatible plancher chauffant » et afficher une résistance thermique ≤ 0,15 m²·K/W. Les sous-couches trop épaisses ou trop isolantes bloquent la diffusion de la chaleur vers le haut et dégradent le rendement du système. Les meilleures options : sous-couche fine en mousse polyéthylène réticulé (3 mm, R = 0,05–0,08 m²·K/W), ou sous-couche composite spéciale plancher chauffant (3–5 mm). Le liège épais (8 mm et plus) est à éviter sur plancher chauffant.",
  },
  {
    question: "Faut-il un pare-vapeur sous la sous-couche parquet ?",
    answer:
      "Oui, si votre support est une dalle béton sur terre-plein ou un vide sanitaire humide. Dans ce cas, un film polyéthylène (épaisseur 200 µm minimum) doit être posé sous la sous-couche, avec des recouvrements de 20 cm aux jonctions et des relevés de 10–15 cm en pied de mur. Ce pare-vapeur protège le parquet de l'humidité remontant par capillarité à travers le béton. Si votre dalle est surélevée (étage), ou si vous posez sur un plancher bois sec, le pare-vapeur n'est généralement pas nécessaire.",
  },
  {
    question: "Comment isoler phoniquement un sol sous parquet ?",
    answer:
      "L'isolation phonique d'un sol sous parquet agit sur deux types de bruits : les bruits aériens (voix, musique) et les bruits d'impact (pas, chutes d'objets). Les sous-couches en liège (ΔLw ≈ 18–20 dB) et en fibre de bois (ΔLw ≈ 20–25 dB) sont les plus efficaces sur les bruits d'impact. La laine minérale en sous-couche composite est plus performante sur les bruits aériens. La réglementation acoustique française (NRA) impose ΔLw ≥ 21 dB pour les planchers en logement collectif neuf — vérifiez la valeur ΔLw affichée sur l'emballage de la sous-couche.",
  },
  {
    question: "Quelle est la résistance thermique d'une sous-couche parquet ?",
    answer:
      "La résistance thermique (R) d'une sous-couche parquet varie de 0,03 à 0,25 m²·K/W selon l'épaisseur et le matériau. Mousse polyéthylène 3 mm : R ≈ 0,05 m²·K/W. Liège naturel 5 mm : R ≈ 0,13 m²·K/W. Liège naturel 8 mm : R ≈ 0,20 m²·K/W. Fibre de bois 10 mm : R ≈ 0,25 m²·K/W. Ces valeurs sont faibles comparées à une isolation de plancher complète (R = 3,0 m²·K/W), mais elles contribuent significativement au confort de contact — la sensation de « sol chaud sous le pied » dépend plus de la conductivité superficielle que de la résistance thermique totale.",
  },
  {
    question: "Le parquet collé nécessite-t-il une sous-couche isolante ?",
    answer:
      "Non. Un parquet collé (parquet massif ou contrecollé encollé sur toute sa surface) ne peut pas recevoir de sous-couche souple entre lui et le support — ce n'est pas compatible avec le système de collage. L'isolation thermique d'un sol sous parquet collé doit être réalisée en amont, dans le support lui-même : soit par une chape flottante isolante avant la pose du parquet, soit par une sous-chape mince isolante rigide (PUR ou PIR en panneaux). Le confort thermique d'un parquet collé dépend donc entièrement de la qualité de l'isolation du plancher support.",
  },
]

export const SOURCES = [
  {
    name: "CSTB — Avis Techniques sous-couches pour planchers à base de bois (AT)",
    url: "https://www.cstb.fr",
    date: "2025",
  },
  {
    name: "NF EN ISO 10140 — Mesure en laboratoire de l'isolation acoustique des éléments de construction",
    url: "https://www.boutique.afnor.org",
    date: "2021",
  },
  {
    name: "DTU 51.2 — Pose de parquet collé (conditions de mise en œuvre)",
    url: "https://www.cstb.fr",
    date: "2023",
  },
  {
    name: "DTU 51.11 — Pose de parquet massif à clouer",
    url: "https://www.cstb.fr",
    date: "2023",
  },
  {
    name: "ADEME — Guide isolation plancher bas et revêtements de sol",
    url: "https://www.ademe.fr",
    date: "2025",
  },
  {
    name: "france-renov.gouv.fr — Aides isolation plancher bas 2026",
    url: "https://france-renov.gouv.fr",
    date: "janvier 2026",
  },
]
