/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
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
