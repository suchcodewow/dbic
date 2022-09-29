/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/devapi/order/:path*",
        destination: "http://localhost:8000/api/Order/:path*",
      },
      {
        source: "/devapi/catalog/:path*",
        destination: "http://localhost:8080/api/v1/catalog/:path*",
      },
      {
        source: "/devapi/quote/:path*",
        destination: "http://localhost:6000/quote/:path*",
      },
      {
        source: "/api/order/:path*",
        destination: "http://ordersapi/api/Order/:path*",
      },
      {
        source: "/api/catalog/:path*",
        destination: "http://catalogapi/api/v1/catalog/:path*",
      },
      {
        source: "/api/quote/:path*",
        destination: "http://quotesapi/quote/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
