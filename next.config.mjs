const apiProxyTarget = process.env.API_PROXY_TARGET || "http://localhost:8080";

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
