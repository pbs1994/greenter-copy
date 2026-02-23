/**
 * Converts a text string to a URL-friendly slug.
 * Handles French character normalization (accents, cedillas, etc.)
 *
 * @param text - The input text to convert to a slug
 * @returns A lowercase slug with only ASCII letters, numbers, and hyphens
 *
 * @example
 * slugify("Batteries solaires") // "batteries-solaires"
 * slugify("Énergie renouvelable") // "energie-renouvelable"
 * slugify("Pompes à chaleur") // "pompes-a-chaleur"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
