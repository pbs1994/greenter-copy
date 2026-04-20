# Images du blog — prompts IA

Place chaque fichier ci-dessous dans `public/blog/` avec le nom exact indiqué.
Format recommandé : **JPEG optimisé** (qualité 80), couleurs cohérentes (palette emerald / slate du site).

---

## Article : Remplacer chaudière gaz par pompe à chaleur 2026

### 1. `remplacer-chaudiere-gaz-pac-hero.jpg`  — 1200 × 630 (OG + hero)

**Prompt Midjourney / DALL·E :**

> Split-screen editorial photograph: left half shows an old white gas wall-mounted boiler
> being unplugged in a modern French utility room with exposed copper pipes, right half
> shows a sleek modern white heat pump outdoor unit mounted on a light-grey pebble garden
> with a well-maintained green hedge background. Subtle green energy transition arrow
> connecting the two sides. Natural morning light, high-end real-estate photography style,
> clean minimalist composition, shallow depth of field, realistic, photorealistic,
> 8K, no text, no watermark, no logo. --ar 1200:630 --style raw

**Prompt Stable Diffusion XL :**

> editorial split-screen photo, old wall-mounted gas boiler on the left being disconnected
> by a technician's hands, modern white heat pump outdoor unit on the right in a french
> garden, energy-transition concept, soft morning light, shallow depth of field,
> hyperrealistic, ultra-detailed, 8k, no text, no logo

---

### 2. `transition-gaz-pac-economies.jpg` — 800 × 600 (section "Pourquoi 2026")

**Prompt :**

> Clean infographic-style photograph: a modern kitchen counter in a French home with two
> objects side by side — on the left a traditional gas bill on paper with a small flame
> icon, on the right a tablet showing a bar chart of decreasing monthly energy costs in
> green. Soft natural light from a window, wooden counter, minimal composition, warm
> inviting tone, editorial style, realistic, photorealistic, high detail, no visible
> text on documents (blurred figures only). --ar 4:3 --style raw

---

### 3. `pac-installation-exterieure.jpg` — 1200 × 500 (full-width, section "Combien économiser")

**Prompt :**

> Wide cinematic photograph of a white modern air-source heat pump outdoor unit installed
> on a light-grey concrete slab next to a beige-rendered French suburban house.
> Well-maintained lawn, trimmed hedge, clean 1m clearance around the unit, visible
> anti-vibration feet. Soft golden-hour light, landscape orientation, professional
> architecture photography, sharp details, photorealistic, 8K, no people, no text,
> no logo. --ar 12:5 --style raw

---

### 4. `depose-chaudiere-gaz.jpg` — 800 × 600 (section "Comment ça se passe")

**Prompt :**

> Close-up documentary photograph of a French HVAC technician wearing a navy-blue
> professional uniform and protective gloves, carefully unscrewing the copper gas
> pipes from an old wall-mounted gas boiler in a clean modern utility room. Warm
> artificial light, shallow depth of field focus on the hands and the copper fittings.
> Editorial magazine style, honest and professional feel, photorealistic, high detail,
> no visible brand, no text, no logo. --ar 4:3 --style raw

---

## Consignes générales

- **Pas de texte, pas de logo, pas de marque** dans l'image (risque de violation
  de droit et de désactualisation).
- **Palette cohérente** avec le site : dominantes vert-emerald (#059669) et
  slate (grays), touches blanches, éviter le bleu électrique agressif.
- **Format de sortie** : JPEG qualité 80-85, progressive, max 200 Ko pour le hero,
  max 100 Ko pour les inline.
- **Alt text** est déjà défini dans le code — ne pas le modifier.

Après génération, passez les images dans un compresseur (squoosh.app, tinypng.com)
puis commitez-les dans `public/blog/`.
