import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
