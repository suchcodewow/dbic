module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  serverRuntimeConfig: {
    secret: "FGHAHFIWUHFBVQ@#QALALBVOENEASH",
  },
  publicRuntimeConfig: {
    apiUser:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
    apiCatalog:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api/v1/catalog"
        : "http://localhost:8080/api/v1/catalog",
  },
};
