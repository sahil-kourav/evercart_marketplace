const mongoose = require("mongoose");
const productModel = require("../models/product.model");
const { uploadImage } = require("../services/imagekit.service");

async function createProduct(req, res) {
  try {
    const {
      title,
      description,
      priceAmount,
      priceCurrency = "INR",
      category,
    } = req.body;

    if (!title || !priceAmount || !category) {
      return res
        .status(400)
        .json({ message: "Title, Price Amount, and Category are required." });
    }

    const seller = req.user.id;

    const price = {
      amount: Number(priceAmount),
      currency: priceCurrency,
    };

    const images = await Promise.all(
      (req.files || []).map((file) => uploadImage({ buffer: file.buffer })),
    );

    const newProduct = await productModel.create({
      title,
      description,
      price,
      category,
      seller,
      images,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProducts(req, res) {
  try {
    const { q, minprice, maxprice, skip = 0, limit = 20 } = req.query;

    const filter = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (minprice) {
      filter["price.amount"] = {
        ...filter["price.amount"],
        $gte: Number(minprice),
      };
    }

    if (maxprice) {
      filter["price.amount"] = {
        ...filter["price.amount"],
        $lte: Number(maxprice),
      };
    }

    const product = await productModel
      .find(filter)
      .skip(Number(skip))
      .limit(Math.min(Number(limit), 20));

    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    return res.status(200).json({
      product: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findOne({
      _id: id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this product",
      });
    }

    const allowedUpdates = ["title", "description", "price"];
    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        if (key === "price" && typeof req.body.price === "object") {
          if (req.body.price.amount !== undefined) {
            product.price.amount = Number(req.body.price.amount);
          }
          if (req.body.price.currency !== undefined) {
            product.price.currency = req.body.price.currency;
          }
        } else {
          product[key] = req.body[key];
        }
      }
    }

    await product.save();
    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this product",
      });
    }

    await productModel.findOneAndDelete({ _id: id });

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductsBySeller(req, res) {
  try {
    const seller = req.user;

    const { skip = 0, limit = 20 } = req.query;

    const products = await productModel
      .find({ seller: seller.id })
      .skip(Number(skip))
      .limit(Math.min(Number(limit), 20));

    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
};
