import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/characters",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/characters",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
