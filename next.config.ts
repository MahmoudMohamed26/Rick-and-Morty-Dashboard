import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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
