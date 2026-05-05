import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'video-url', 10)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Generate a signed URL that expires in 10 minutes (600 seconds)
    // Shorter expiration = harder to share/reuse the URL
    const { data, error } = await supabase.storage
      .from('videos')
      .createSignedUrl('hero-video.mp4', 600)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Add cache headers to prevent URL caching
    return NextResponse.json(
      { url: data.signedUrl },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
        }
      }
    )
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
