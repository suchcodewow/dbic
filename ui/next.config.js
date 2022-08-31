module.exports = {
  output: "standalone",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  serverRuntimeConfig: {
    secret: "FGHAHFIWUHFBVQ@#QALALBVOENEASH",
  },
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
        source: "/api/order/:path*",
        destination: "http://ordersapi/api/Order/:path*",
      },
      {
        source: "/api/catalog/:path*",
        destination: "http://catalogapi/api/v1/catalog/:path*",
      },
    ];
  },
};
