import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.*', 'localhost'],

  async headers() {
    // Global security headers applied to every response
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ]

    // Googlebot can still fetch these URLs (needed to render pages with
    // CSS/JS/fonts) but must not index them as standalone results.
    const noIndex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]

    return [
      { source: '/(.*)', headers: securityHeaders },
      // Next.js-bundled assets (fonts, JS chunks, split CSS, images)
      { source: '/_next/static/:path*', headers: noIndex },
      // Next.js on-the-fly image optimizer
      { source: '/_next/image(.*)', headers: noIndex },
      // Binary assets from /public that search engines sometimes try to
      // index as standalone URLs
      { source: '/:all*(svg|png|jpg|jpeg|webp|gif|ico|avif)', headers: noIndex },
      { source: '/:all*(woff|woff2|ttf|otf|eot)', headers: noIndex },
      { source: '/:all*(pdf|zip)', headers: noIndex },
      // IndexNow key file — must be fetchable by search engines but is
      // not a page and shouldn't appear in search results
      { source: '/:key([a-f0-9]{32}).txt', headers: noIndex },
    ]
  },

};

export default withPayload(nextConfig);
