import { getPayload } from 'payload'
import config from '../payload.config'

async function createTestBlogPost() {
  const payload = await getPayload({ config })

  const blogPost = await payload.create({
    collection: 'blog-posts',
    data: {
      title: 'Guide complet : Comment choisir sa pompe à chaleur en 2026',
      slug: 'guide-choisir-pompe-chaleur-2026',
      excerpt: 'Découvrez tous les critères essentiels pour bien choisir votre pompe à chaleur : puissance, COP, type de PAC, aides financières disponibles et conseils d\'installation.',
      author: 'Équipe Greenter',
      published_date: new Date().toISOString(),
      status: 'published',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Pourquoi installer une pompe à chaleur ?' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'La pompe à chaleur (PAC) est devenue la solution de chauffage privilégiée des Français. En 2026, elle représente plus de 60% des nouvelles installations de chauffage. Et pour cause : elle permet de réduire jusqu\'à 70% votre facture énergétique tout en utilisant une énergie renouvelable.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Les différents types de pompes à chaleur' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Il existe plusieurs types de PAC adaptés à différentes situations :',
                },
              ],
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  children: [{ type: 'text', text: 'PAC air-eau : la plus répandue, idéale pour le chauffage central' }],
                },
                {
                  type: 'listitem',
                  children: [{ type: 'text', text: 'PAC air-air : parfaite pour la climatisation réversible' }],
                },
                {
                  type: 'listitem',
                  children: [{ type: 'text', text: 'PAC géothermique : la plus performante mais nécessite des travaux importants' }],
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Les aides financières en 2026' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'MaPrimeRénov\' reste le dispositif principal d\'aide à l\'installation. Selon vos revenus, vous pouvez bénéficier de 4 000€ à 11 000€ d\'aide pour l\'installation d\'une pompe à chaleur air-eau.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      },
      seo: {
        meta_title: 'Guide pompe à chaleur 2026 : Comment bien choisir sa PAC',
        meta_description: 'Tous nos conseils pour choisir la pompe à chaleur adaptée à votre logement. Types de PAC, puissance, COP, aides MaPrimeRénov\' 2026.',
      },
      tags: [
        { tag: 'pompe à chaleur' },
        { tag: 'chauffage' },
        { tag: 'économies énergie' },
        { tag: 'MaPrimeRénov' },
        { tag: 'rénovation énergétique' },
      ],
    },
  })

  console.log('Article de blog créé avec succès !')
  console.log('ID:', blogPost.id)
  console.log('Slug:', blogPost.slug)
  console.log('URL:', `http://localhost:3000/blog/${blogPost.slug}`)
  
  process.exit(0)
}

createTestBlogPost().catch((err) => {
  console.error('Erreur:', err)
  process.exit(1)
})
