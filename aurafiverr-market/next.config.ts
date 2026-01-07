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
    ]
  }
};

export default nextConfig;
