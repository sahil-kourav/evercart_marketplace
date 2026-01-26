const express = require("express");
const cartController = require("../controller/cart.controllers");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const cartValidator = require("../middlewares/cart.validation");
const router = express.Router();

router.get("/", createAuthMiddleware(["user"]), cartController.getUserCart);

router.post(
  "/items",
  cartValidator.addItemToCartValidation,
  createAuthMiddleware(["user"]),
  cartController.addItemToCart,
);


router.patch(
  "/items/:productId",
  cartValidator.validateUpdateCartItem,
  createAuthMiddleware(["user"]),
  cartController.updateCartItem,
);

router.delete(
  "/items/:productId",
  createAuthMiddleware(["user"]),
  cartController.deleteCartItem,
);

router.delete(
  "/",
  createAuthMiddleware(["user"]),
  cartController.clearCart,
);

module.exports = router;
