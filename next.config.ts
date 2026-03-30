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
    return [
      {
        source: '/(.*)',
        headers: [
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
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/produits/kstar-blue-s-6kw',
        destination: '/produits/batterie-solaire-kstar-6kw',
        permanent: true,
      },
      {
        source: '/produits/batterie-solaire-kstar-6kw',
        destination: '/produits/batteries-solaires/kstar-blues-6kw',
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
