import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'product-price', 30)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
    }

    // Récupérer tous les produits actifs avec leurs prix DIRECTEMENT depuis Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('price, slug, name')
      .eq('is_active', true)
    
    if (error || !products || products.length === 0) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Aucun produit trouvé', details: error?.message },
        { status: 404 }
      )
    }
    
    // Créer un tableau avec tous les prix DIRECTEMENT depuis la base (pas de calcul)
    const allProducts = products.map(p => ({
      slug: p.slug,
      name: p.name,
      price: p.price / 100,
      formatted: `${(p.price / 100).toLocaleString('fr-FR')} €`
    }))
    
    // Trouver le kit pour le prix par défaut
    const kit = allProducts.find(p => p.slug === 'kit-stockage-solaire-complet-5kw')
    const defaultPrice = kit?.price || 0
    const defaultFormatted = kit?.formatted || '...'
    
    return NextResponse.json({ 
      price: defaultPrice,
      formatted: defaultFormatted,
      currency: 'eur',
      products: allProducts
    })
  } catch (error) {
    console.error('Product price error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du prix' },
      { status: 500 }
    )
  }
}
