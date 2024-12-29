import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/(.*)', // Pattern to match static assets
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for 1 year (31536000 seconds)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
