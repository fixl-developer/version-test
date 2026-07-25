import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "https://snakegame-j1silx45x-narendra-fixlsolutions-projects.vercel.app/:path*",
      },
      {
        source: "/v1.1/:path*",
        destination: "https://snakegame-pgiswm9ny-narendra-fixlsolutions-projects.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
