import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [servicesResult, optionsResult] = await Promise.all([
      supabase
        .from('maintenance_services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('maintenance_options')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
    ])

    if (servicesResult.error) {
      console.error('Erreur récupération services:', servicesResult.error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des services' },
        { status: 500 }
      )
    }

    if (optionsResult.error) {
      console.error('Erreur récupération options:', optionsResult.error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des options' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      services: servicesResult.data,
      options: optionsResult.data,
    })
  } catch (error) {
    console.error('Erreur API maintenance-services:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
