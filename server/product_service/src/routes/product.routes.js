const express = require("express");
const multer = require("multer");
const productController = require("../controller/product.controller");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const productValidators = require("../validators/product.validators");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// POST /api/products
router.post("/", upload.array("images", 5), createAuthMiddleware(["admin", "seller"]), productValidators.createProductValidators, productController.createProduct);

// GET /api/products
router.get("/", productController.getProducts)

// PATCH /api/products/:id
router.patch("/:id", createAuthMiddleware(["seller"]), productController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', createAuthMiddleware(['seller']), productController.deleteProduct);

// GET /api/products/sellers
router.get('/sellers', createAuthMiddleware(['seller']), productController.getProductsBySeller);

// GET /api/products/:id
router.get('/:id', productController.getProductById)

module.exports = router;
