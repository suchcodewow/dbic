/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
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
        destination: "http://127.0.0.1:8000/api/Order/:path*",
      },
      {
        source: "/devapi/catalog/:path*",
        destination: "http://127.0.0.1:8080/api/v1/catalog/:path*",
      },
      {
        source: "/devapi/quote/:path*",
        destination: "http://127.0.0.1:6000/quote/:path*",
      },
      {
        source: "/devapi/main/:path*",
        destination: "http://127.0.0.1:5000/api/:path*",
      },
      {
        source: "/devapi/specialty/:path*",
        destination: "http://127.0.0.1:3666/:path*",
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
        source: "/api/main/:path*",
        destination: "http://mainapi:5000/api/:path*",
      },
      {
        source: "/api/specialty/:path*",
        destination: "http://specialtyapi:3666/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
