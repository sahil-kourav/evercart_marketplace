const mongoose = require("mongoose");
const productModel = require("../models/product.model");
const { uploadImage } = require("../services/imagekit.service");
const { publishToQueue } = require("../broker/broker");
const redis = require("../db/redis");


async function invalidateProductCache(productId){
  await redis.del(`product:${productId}`)

  const keys = await redis.keys("products:*")

  if(keys.length > 0){
    await redis.del(...keys)
  }
}


async function createProduct(req, res) {
  try {
    const {
      title,
      description,
      priceAmount,
      priceCurrency = "INR",
      stock,
      category,
      bestSeller,
    } = req.body;

    if (!title || !priceAmount || !category || !stock) {
      return res
        .status(400)
        .json({
          message: "Title, Price Amount, Category, and Stock are required.",
        });
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
      stock,
      bestSeller: bestSeller === true || bestSeller === "true",
      images,
    });

    // publish product created event to RabbitMQ
    await publishToQueue(
      "PRODUCT_SELLER_DASHBOARD.PRODUCT_CREATED",
      newProduct,
    );
    await publishToQueue("PRODUCT_NOTIFICATION.PRODUCT_CREATED", {
      email: req.user.email,
      productId: newProduct._id,
      title: newProduct.title,
      category: newProduct.category,
      sellerId: seller,
    });

    await invalidateProductCache(newProduct._id);

    return res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    // console.error("Error creating product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProducts(req, res) {
  try {
    const { q, minprice, maxprice } = req.query;

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

    const cacheKey = `products:q=${q}:min=${minprice}:max=${maxprice}`;

    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      console.log("cached hittttttt");

      return res.status(200).json({
        data: JSON.parse(cachedProduct),
      });
    }

    console.log("cache misss");

    const product = await productModel.find(filter).sort({ createdAt: -1 });

    await redis.set(cacheKey, JSON.stringify(product), "EX", 300);

    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const cacheKey = `product:${id}`;

    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      console.log("Cache Hit");

      return res.status(200).json({
        product: JSON.parse(cachedProduct),
      });
    }

    console.log("Cache Miss");

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    await redis.set(cacheKey, JSON.stringify(product), "EX", 300);

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

    const allowedUpdates = [
      "title",
      "description",
      "price",
      "stock",
      "category",
    ];
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

    await invalidateProductCache(id);

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

    await invalidateProductCache(id);

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

    const products = await productModel.find({ seller: seller.id });

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
