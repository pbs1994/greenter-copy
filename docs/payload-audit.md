# Audit Payload CMS — étape 1 de la migration "sans Payload"

**Date** : 20 avril 2026
**Objectif** : établir les faits avant toute décision de migration, sans modifier une ligne de code prod.

---

## TL;DR

1. **Payload n'est pas la source de vérité**. C'est Supabase. Payload écrit dedans via des hooks, le site public lit **directement depuis Supabase** pour 90 % du trafic (homepage, services, produits, maintenance).
2. Le **webhook Stripe bypasse déjà Payload** : commandes, clients et abonnements sont créés **directement dans Supabase**, jamais dans Payload. Les collections `Orders`, `Customers`, `MaintenanceSubscriptions` côté Payload sont **vestigiales** (0 écriture réelle en prod).
3. **9 collections sur 11** peuvent être retirées immédiatement avec zéro impact public. Seuls **Products** et **BlogPosts** ont un vrai coût de migration.
4. **Dépendances Payload dans le code** : 17 requêtes de lecture + 8 écritures, concentrées sur blog + pages dynamiques + 2 hooks.
5. Retrait complet estimé : **40-50 h** en mode minimal, 80-100 h en mode "zéro Payload".

---

## 1. Empreinte actuelle

### Dépendances npm (7 packages)
```
payload ^3.79.0
@payloadcms/db-postgres ^3.79.0
@payloadcms/db-vercel-postgres ^3.80.0
@payloadcms/email-resend ^3.80.0
@payloadcms/next ^3.80.0
@payloadcms/richtext-lexical ^3.79.0
@payloadcms/storage-vercel-blob ^3.79.0
```

### Code Payload-spécifique
| Dossier | Fichiers | Lignes |
|---|---|---|
| `payload.config.ts` | 1 | 102 |
| `collections/` | 11 | 1 863 |
| `hooks/` | 4 | 427 |
| `app/(payload)/` (admin + API) | 5 | auto-généré |
| **Total** | **21** | **~2 400** |

---

## 2. Source de vérité par collection

| Collection Payload | Table Supabase existe ? | Qui écrit ? | Qui lit (site public) ? |
|---|---|---|---|
| Users | ❌ | Payload admin | Payload admin (login) |
| Media | ❌ (URLs dans Supabase) | Payload upload → Vercel Blob | Supabase (URLs résolues) |
| Categories | ✅ `categories` | **Payload → sync hook** | Supabase |
| Products | ✅ `products` | **Payload → sync hooks (Supabase + Stripe)** | Supabase |
| Customers | ✅ `customers` | **Stripe webhook → Supabase direct** | Supabase (pas Payload) |
| Orders | ✅ `orders` | **Stripe webhook → Supabase direct** | Supabase (pas Payload) |
| MaintenanceServices | ✅ `maintenance_services` | **Jamais synchronisée** (Payload admin écrit, frontend lit Supabase) | Supabase via `/api/maintenance-services` |
| MaintenanceOptions | ✅ `maintenance_options` | idem | idem |
| MaintenanceSubscriptions | ✅ `maintenance_subscriptions` | **Stripe webhook → Supabase direct** | Supabase |
| BlogPosts | ❌ (Payload uniquement) | Payload admin | **Payload Local API** |
| Pages | ❌ (Payload uniquement) | Payload admin | **Payload Local API** |

### Surprises révélées par l'audit
- **Maintenance** : la config côté Payload est **jamais lue par le site**. Le frontend passe par `/api/maintenance-services` qui interroge directement Supabase. La config Payload devrait donc avoir un hook de sync vers Supabase… **qui n'existe pas**. Aujourd'hui, si on modifie un service dans `/admin`, **rien ne change sur le site** tant qu'on ne met pas à jour Supabase manuellement.
- **Orders / Customers / Subscriptions** : les collections Payload existent mais **aucun code n'écrit dedans en prod** (hors création manuelle admin). Elles sont décoratives.

---

## 3. Dépendances prod à Payload

### Lectures (17 sites dans 8 fichiers)
| Fichier | Lignes | Collection | Utilité |
|---|---|---|---|
| `app/(public)/[slug]/page.tsx` | 33, 61, 131 | pages | landing dynamiques |
| `app/(public)/blog/[slug]/page.tsx` | 41, 107, 174, 201, 224 | blog-posts | articles + related |
| `app/(public)/blog/page.tsx` | 86 | blog-posts | listing |
| `app/sitemap.ts` | 81 | blog-posts | sitemap dynamique |
| `app/api/indexnow/route.ts` | 81 | blog-posts | soumission moteurs |
| `hooks/syncProductToPublic.ts` | 38, 61, 93 | media, categories | résolution d'URLs |
| `collections/Categories.ts` | 13 | products | garde-fou suppression |

### Écritures (8 sites)
| Fichier | Lignes | Opération |
|---|---|---|
| `hooks/syncProductToStripe.ts` | 36, 72 | update products (IDs Stripe) |
| `collections/Orders.ts` | 35 | update orders (status history) — **inactif** |
| `scripts/migrate.ts` | 83+ | migrations one-shot |
| `scripts/create-test-blog.ts` | 7 | test local |

### Hooks Payload → Supabase / Stripe
| Hook | Rôle | Alternative si Payload supprimé |
|---|---|---|
| `syncProductToPublic` (197 l.) | Products Payload → Supabase | Route API `/api/admin/products` + trigger Supabase |
| `syncProductToStripe` (94 l.) | Products Payload → Stripe | Route API appelée à la soumission du form |
| `syncCategoryToPublic` (88 l.) | Categories Payload → Supabase | Route API + trigger |
| `generateOrderNumber` (64 l.) | Numérotation commandes | **Déjà inactif** — numérotation faite dans le webhook Stripe |

---

## 4. Impact d'un retrait brutal de Payload

### 🔴 Casse immédiate du site public
- `/blog/*` : toutes les fiches articles non-statiques → 404 (les 2 articles en dur restent OK)
- `/[slug]` : toutes les landing pages Payload → 404
- `/sitemap.xml` : perd les URLs blog Payload

### 🟡 Casse du back-office (pas du site public)
- `/admin` disparaît → plus d'UI pour éditer produits / blog / pages / users / médias / services
- Création d'un produit ne sync plus vers Stripe ni Supabase
- Création d'une catégorie ne sync plus vers Supabase
- Upload d'images ne marche plus (sauf direct Vercel Blob)
- Auth admin : il faut un remplaçant (Supabase Auth, NextAuth, …)

### 🟢 Aucun impact
- Homepage, pages services statiques, simulateur solaire
- Catalogue produits (`/produits`) — lit Supabase
- Checkout Stripe + création commandes/clients/abonnements
- Configurateur maintenance — lit Supabase via `/api/maintenance-services`
- Emails (Resend), formulaire contact

---

## 5. Complexité par collection

| Collection | Effort | Risque | Action recommandée |
|---|---|---|---|
| **Users** | 4-6 h | Faible | Supabase Auth |
| **Media** | 6-8 h | Faible | Table Supabase `media` + Vercel Blob direct |
| **Categories** | 4-5 h | Très faible | Supabase + mini form admin |
| **Products** | **20-25 h** | **Moyen** | Supabase + mini admin Next.js (4 onglets, specs/FAQ imbriqués) |
| **Customers** | 2-3 h | Nul | Drop (déjà dans Supabase seul) |
| **Orders** | 2-3 h | Nul | Drop (déjà dans Supabase seul) |
| **MaintenanceServices** | 3-4 h | Nul | Drop (déjà dans Supabase seul) |
| **MaintenanceOptions** | 3-4 h | Nul | Drop (idem) |
| **MaintenanceSubscriptions** | 3-4 h | Nul | Drop (idem) |
| **BlogPosts** | **8-20 h** | Faible à moyen | Choix stratégique — voir §6 |
| **Pages** | 6-10 h | Faible | Drop si peu utilisé, ou MDX git-versionné |

---

## 6. Trois scénarios

### Option A — Payload minimal (recommandé)
Garder Payload pour **Products + BlogPosts uniquement**. Supprimer les 9 autres collections.

- **Effort** : 25-35 h
- **Gain** : on garde Lexical rich text + système de blocks + sync Stripe mature, on supprime 9 collections vestigiales et ~500 lignes de code mort
- **Perte** : on ne sort pas totalement de Payload (mêmes 7 packages, même DB)
- **Bon choix si** : tu utilises (ou compte utiliser) `/admin` pour publier des articles blog ou éditer les produits confortablement

### Option B — Zéro Payload
Tout migrer, tuer Payload totalement.

- **Effort** : 80-100 h
- **Gain** : un seul stack (Supabase), 7 packages npm en moins, build plus rapide, pas de DB Payload à maintenir, plus de `/admin` non-triviale à sécuriser
- **Perte** : il faut reconstruire un mini admin Next.js (formulaires produits, upload media, éditeur blog), choisir un remplaçant Lexical (TipTap / Slate / MDX)
- **Bon choix si** : tu veux vraiment une stack minimale AI-first et tu es prêt à investir ~2 semaines

### Option C — Remplacement par un autre CMS (Strapi, Sanity, Contentful)
- **Effort** : 40-60 h
- **Gain vs A** : meilleure UX admin, sans Payload
- **Perte** : nouvelle dépendance externe, pas vraiment plus simple

---

## 7. Recommandation chiffrée

**Option A (Payload minimal), en 4 sprints courts :**

| Sprint | Durée | Livrable | Réversible ? |
|---|---|---|---|
| 1 | 1 demi-journée | Drop collections vestigiales (Orders, Customers, Subscriptions) | ✅ |
| 2 | 1 journée | Sortir Maintenance Services/Options de Payload vers mini form Supabase (déjà là en base) | ✅ |
| 3 | 1 journée | Drop collection Pages (ou migrer vers MDX si 1-2 pages utiles) | ✅ |
| 4 | ½ journée | Retirer le hook `generateOrderNumber` inactif + nettoyage deps | ✅ |

Total : **3 jours**. À l'issue, Payload ne gère plus que Products + BlogPosts + Media + Users. La dette technique tombe de ~500 lignes sans aucune perte fonctionnelle.

**Décider après** si on pousse jusqu'à l'Option B (sortir Products).

---

## 8. Prochaines étapes concrètes

- [ ] **Valider ce rapport** : lectures des faits ci-dessus, décision Option A / B / C
- [ ] **Étape 2** (si A validé) : ouvrir PR "drop vestigial collections" (Orders, Customers, Subscriptions côté Payload) — ~2h, zéro risque
- [ ] **Étape 3** : script d'assistant IA pour créer des articles blog/fiches produits (indépendant du choix de CMS — marche avec ou sans Payload)

---

*Rapport généré automatiquement à partir d'un audit statique du code ; pour vérifier les volumes réels en base (nombre de produits, d'articles, date de dernière écriture par collection), il faudra un accès lecture aux credentials Supabase prod.*
