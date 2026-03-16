"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function StoreAddProduct() {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Beauty & Health",
    "Toys & Games",
    "Sports & Outdoors",
    "Books & Media",
    "Food & Drink",
    "Hobbies & Crafts",
    "Others",
  ];

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    priceAmount: 0,
    category: "",
    stock: 0,
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validate that at least one image is selected
      const hasImage = Object.values(images).some((img) => img !== null);
      if (!hasImage) {
        toast.error("Please select at least one product image");
        setLoading(false);
        return;
      }

      // Create FormData to send files and data
      const formData = new FormData();
      formData.append("title", productInfo.title);
      formData.append("image", productInfo.images);
      formData.append("description", productInfo.description);
      formData.append("priceAmount", productInfo.priceAmount);
      formData.append("category", productInfo.category);
      formData.append("stock", productInfo.stock);

      // Append images
      // Object.entries(images).forEach(([key, image]) => {
      //     if (image) {
      //         formData.append(`image${key}`, image)
      //     }
      // })
      Object.values(images).forEach((image) => {
        if (image) formData.append("images", image);
      });

      // Make API request
      const response = await axios.post(
        "http://localhost:8081/api/products",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(response);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message || "Failed to add product");
      }

      // Reset form on success
      setProductInfo({
        title: "",
        description: "",
        priceAmount: 0,
        category: "",
        stock: 0,
      });
      setImages({ 1: null, 2: null, 3: null, 4: null });

      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(error.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) =>
        toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })
      }
      className="text-slate-500 mb-28"
    >
      <h1 className="text-2xl">
        Add New <span className="text-slate-800 font-medium">Products</span>
      </h1>
      <p className="mt-7">Product Images</p>

      <div htmlFor="" className="flex gap-3 mt-4">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`images${key}`}>
            <Image
              width={300}
              height={300}
              className="h-15 w-auto border border-slate-200 rounded cursor-pointer"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.upload_area
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`images${key}`}
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
              hidden
            />
          </label>
        ))}
      </div>

      <label htmlFor="" className="flex flex-col gap-2 my-6 ">
        Name
        <input
          type="text"
          name="title"
          onChange={onChangeHandler}
          value={productInfo.title}
          placeholder="Enter product name"
          className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded"
          required
        />
      </label>

      <label htmlFor="" className="flex flex-col gap-2 my-6 ">
        Description
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={productInfo.description}
          placeholder="Enter product description"
          rows={5}
          className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded resize-none"
          required
        />
      </label>

      <div className="flex flex-row gap-4">
        <label htmlFor="" className="flex flex-col gap-2">
          Price ($)
          <input
            type="number"
            name="priceAmount"
            onChange={onChangeHandler}
            value={productInfo.priceAmount}
            placeholder="0"
            rows={5}
            className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded resize-none"
            required
          />
        </label>

        <label htmlFor="" className="flex flex-col gap-2">
          Stock
          <input
            type="number"
            name="stock"
            onChange={onChangeHandler}
            value={productInfo.stock}
            placeholder="0"
            rows={5}
            className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded resize-none"
            required
          />
        </label>
      </div>

      <select
        onChange={(e) =>
          setProductInfo({ ...productInfo, category: e.target.value })
        }
        value={productInfo.category}
        className="w-full max-w-lg p-2 px-4 my-6 outline-none border border-slate-200 rounded"
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <br />

      <button
        disabled={loading}
        className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition"
      >
        Add Product
      </button>
    </form>
  );
}
