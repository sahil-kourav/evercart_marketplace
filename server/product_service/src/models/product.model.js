const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "INR"],
      default: "INR",
    },
  },

  category: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
    required: true,
  },

  bestSeller: {
    type: Boolean,
    default: false,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  images: [
    {
      url: String,
      thumbnail: String,
      id: String,
    },
  ],
});

productSchema.index({ title: "text", description: "text" });

const product = mongoose.model("product", productSchema);

module.exports = product;
