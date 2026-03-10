import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Récupérer les prix de l'onduleur et de la batterie pour calculer le prix du kit
    const { data: products, error } = await supabase
      .from('products')
      .select('price, slug')
      .eq('is_active', true)
      .in('slug', ['onduleur-hybride-solaire-5kw', 'batterie-solaire-lifepo4-5kwh'])
    
    if (error || !products || products.length === 0) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Aucun produit trouvé', details: error?.message },
        { status: 404 }
      )
    }
    
    // Calculer le prix du kit (onduleur + batterie)
    const inverterPrice = products.find(p => p.slug.includes('onduleur'))?.price || 0
    const batteryPrice = products.find(p => p.slug.includes('batterie'))?.price || 0
    const totalPrice = inverterPrice + batteryPrice
    
    // Le prix est en centimes dans Supabase, on le convertit en euros
    const amount = totalPrice / 100
    
    return NextResponse.json({ 
      price: amount,
      formatted: `${amount.toLocaleString('fr-FR')} €`,
      currency: 'eur',
      // Détail des prix pour debug
      inverterPrice: inverterPrice / 100,
      batteryPrice: batteryPrice / 100,
    })
  } catch (error) {
    console.error('Product price error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du prix' },
      { status: 500 }
    )
  }
}
