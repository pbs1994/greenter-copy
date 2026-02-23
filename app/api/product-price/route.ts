import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Récupérer le premier produit actif depuis Supabase
    // D'abord essayer avec is_custom_page=true (produit phare)
    let { data: product, error } = await supabase
      .from('products')
      .select('price, name')
      .eq('is_active', true)
      .eq('is_custom_page', true)
      .limit(1)
      .single()
    
    // Si pas de produit custom, chercher n'importe quel produit actif
    if (error || !product) {
      const result = await supabase
        .from('products')
        .select('price, name')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      product = result.data
      error = result.error
    }
    
    if (error || !product) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Aucun produit trouvé', details: error?.message },
        { status: 404 }
      )
    }
    
    // Le prix est en centimes dans Supabase, on le convertit en euros
    const amount = product.price / 100
    
    return NextResponse.json({ 
      price: amount,
      formatted: `${amount.toLocaleString('fr-FR')} €`,
      currency: 'eur'
    })
  } catch (error) {
    console.error('Product price error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du prix' },
      { status: 500 }
    )
  }
}
