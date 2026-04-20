import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Greenter — Rénovation Énergétique RGE',
    short_name: 'Greenter',
    description:
      "Expert certifié RGE en rénovation énergétique : pompe à chaleur, panneaux solaires, isolation, audit énergétique. Devis gratuit sous 48h.",
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#0f7a3d',
    lang: 'fr-FR',
    categories: ['business', 'utilities', 'shopping'],
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
