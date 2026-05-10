const { createProxyMiddleware } = require("http-proxy-middleware");
const services = require("../config/services");

const setupProxy = (app) => {

  app.use("/api/auth", createProxyMiddleware({
    target: services.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
  }));

  app.use("/api/products", createProxyMiddleware({
    target: services.PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/products": "" },
  }));

  app.use("/api/cart", createProxyMiddleware({
    target: services.CART_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/cart": "" },
  }));

  app.use("/api/orders", createProxyMiddleware({
    target: services.ORDER_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/orders": "" },
  }));

  app.use("/api/payments", createProxyMiddleware({
    target: services.PAYMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api/payments": "" },
  }));
};

module.exports = setupProxy;