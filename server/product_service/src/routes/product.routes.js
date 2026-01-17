const express = require("express");
const multer = require("multer");
const productController = require("../controller/product.controller");
const createAuthMiddleware = require("../middlewares/auth.middleware");

const productValidators = require("../validators/product.validators");



const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Route to create a new product

// POST /api/products

router.post(
  "/",
  upload.array("images", 5),
  createAuthMiddleware(["admin", "seller"]),
   productValidators.createProductValidators,
  productController.createProduct
);

module.exports = router;
