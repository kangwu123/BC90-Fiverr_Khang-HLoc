import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fiverrnew.cybersoft.edu.vn',
      },
      {
        protocol: 'http',
        hostname: 'fiverrnew.cybersoft.edu.vn',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ]
  }
};

export default nextConfig;
