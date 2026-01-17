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
    console.log("req.user:", req.user);


    const price = {
      amount: Number(priceAmount),
      currency: priceCurrency,
    };

    const images = await Promise.all(
      (req.files || []).map((file) => uploadImage({ buffer: file.buffer }))
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
    return res.status(500).json({ message: "Internal server error",
     });
    
  }
}

module.exports = {
  createProduct,
};
