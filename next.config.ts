import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  allowedDevOrigins: ['192.168.1.*', 'localhost'],
  async redirects() {
    return [
      {
        source: '/produits/kstar-blue-s-6kw',
        destination: '/produits/batterie-solaire-kstar-6kw',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
