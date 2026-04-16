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
); // Done


router.patch(
  "/items/:productId",
  cartValidator.validateUpdateCartItem,
  createAuthMiddleware(["user"]),
  cartController.updateCartItem,
); // Done

router.delete(
  "/items/:productId",
  createAuthMiddleware(["user"]),
  cartController.deleteCartItem,
); // Done

router.delete(
  "/",
  createAuthMiddleware(["user"]),
  cartController.clearCart,
); // Done

module.exports = router;
