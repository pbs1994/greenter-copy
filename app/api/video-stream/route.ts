import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'video-stream', 20)) {
      return new NextResponse('Too many requests', { status: 429 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return new NextResponse('Server error', { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get signed URL (short lived, server-side only)
    const { data, error } = await supabase.storage
      .from('videos')
      .createSignedUrl('hero-video.mp4', 60)

    if (error || !data?.signedUrl) {
      return new NextResponse('Video not found', { status: 404 })
    }

    // Get Range header for streaming support
    const range = request.headers.get('range')
    
    // Fetch from Supabase with range support
    const fetchHeaders: HeadersInit = {}
    if (range) {
      fetchHeaders['Range'] = range
    }

    const videoResponse = await fetch(data.signedUrl, { headers: fetchHeaders })
    
    if (!videoResponse.ok && videoResponse.status !== 206) {
      return new NextResponse('Failed to fetch video', { status: 500 })
    }

    // Stream the response.
    // `no-store` because the underlying signed URL only lives 60s — caching
    // for longer at the CDN/edge would let us hand out responses backed by
    // an expired URL and partially defeat the short TTL.
    const responseHeaders = new Headers({
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'private, no-store',
    })

    // Forward content headers for range requests
    const contentLength = videoResponse.headers.get('content-length')
    const contentRange = videoResponse.headers.get('content-range')
    
    if (contentLength) responseHeaders.set('Content-Length', contentLength)
    if (contentRange) responseHeaders.set('Content-Range', contentRange)

    return new NextResponse(videoResponse.body, {
      status: videoResponse.status,
      headers: responseHeaders,
    })
  } catch {
    return new NextResponse('Internal error', { status: 500 })
  }
}
