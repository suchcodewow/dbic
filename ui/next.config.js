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
        source: "/devapi/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
      {
        source: "/api/order/:path*",
        destination: "http://ordersapi:8000/api/Order/:path*",
      },
      {
        source: "/api/catalog/:path*",
        destination: "http://catalogapi:8080/api/v1/catalog/:path*",
      },
      {
        source: "/api/quote/:path*",
        destination: "http://quotesapi:6000/quote/:path*",
      },
      {
        source: "/api/api/:path*",
        destination: "http://mainapi:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
