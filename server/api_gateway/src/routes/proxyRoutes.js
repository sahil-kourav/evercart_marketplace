const { createProxyMiddleware } = require("http-proxy-middleware");
const services = require("../config/services");


const setupProxy = (app) => {
  // AUTH
  app.use("/api/auth", createProxyMiddleware({
    target: services.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
  }));

  // PRODUCTS
  app.use("/api/products", createProxyMiddleware({
    target: services.PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/api/products": "",
    }
  }));

  // CART
  app.use("/api/cart", createProxyMiddleware({
    target: services.CART_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/api/cart": ""
    }
  }));

  // ORDERS
  app.use("/api/orders", createProxyMiddleware({
    target: services.ORDER_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/orders": "" },
  }));

  // PAYMENTS
  app.use("/api/payments", createProxyMiddleware({
    target: services.PAYMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/payments": "" }
  }));
};

module.exports = setupProxy;












// const { createProxyMiddleware } = require("http-proxy-middleware");
// const services = require("../config/services");

// // 🔥 Common function to forward body
// const handleBody = (proxyReq, req) => {
//   if (
//     req.body &&
//     Object.keys(req.body).length &&
//     req.headers["content-type"]?.includes("application/json")
//   ) {
//     const bodyData = JSON.stringify(req.body);

//     proxyReq.setHeader("Content-Type", "application/json");
//     proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

//     proxyReq.write(bodyData);
//   }
// };

// const setupProxy = (app) => {

//   // AUTH
//   app.use("/api/auth", createProxyMiddleware({
//     target: services.AUTH_SERVICE,
//     changeOrigin: true,
//     pathRewrite: { "^/api/auth": "" },

//     onProxyReq: handleBody, // 🔥 important

//     proxyTimeout: 120000,
//     timeout: 120000,
//   }));

//   // PRODUCTS
//   app.use("/api/products", createProxyMiddleware({
//     target: services.PRODUCT_SERVICE,
//     changeOrigin: true,
//     pathRewrite: { "^/api/products": "" },
//     onProxyReq: handleBody,
//   }));

//   // CART
//   app.use("/api/cart", createProxyMiddleware({
//     target: services.CART_SERVICE,
//     changeOrigin: true,
//     pathRewrite: { "^/api/cart": "" },
//     onProxyReq: handleBody,
//   }));

//   // ORDERS
//   app.use("/api/orders", createProxyMiddleware({
//     target: services.ORDER_SERVICE,
//     changeOrigin: true,
//     pathRewrite: { "^/api/orders": "" },
//     onProxyReq: handleBody,
//   }));

//   // PAYMENTS
//   app.use("/api/payments", createProxyMiddleware({
//     target: services.PAYMENT_SERVICE,
//     changeOrigin: true,
//     pathRewrite: { "^/api/payments": "" },
//     onProxyReq: handleBody,
//   }));
// };

// module.exports = setupProxy;