// "use client";
// import { assets } from "@/assets/assets";
// import Image from "next/image";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// export default function StoreAddProduct() {
//   const categories = [
//     "Electronics",
//     "Clothing",
//     "Home & Kitchen",
//     "Beauty & Health",
//     "Toys & Games",
//     "Sports & Outdoors",
//     "Books & Media",
//     "Food & Drink",
//     "Hobbies & Crafts",
//     "Others",
//   ];

//   const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
//   const [productInfo, setProductInfo] = useState({
//     title: "",
//     description: "",
//     priceAmount: 0,
//     category: "",
//     stock: 0,
//     bestSeller: false,
//   });

//   const [loading, setLoading] = useState(false);

//   const onChangeHandler = (e) => {
//     setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // Validate that at least one image is selected
//       const hasImage = Object.values(images).some((img) => img !== null);
//       if (!hasImage) {
//         toast.error("Please select at least one product image");
//         setLoading(false);
//         return;
//       }

//       // Create FormData to send files and data
//       const formData = new FormData();
//       formData.append("title", productInfo.title);
//       formData.append("image", productInfo.images);
//       formData.append("description", productInfo.description);
//       formData.append("priceAmount", productInfo.priceAmount);
//       formData.append("category", productInfo.category);
//       formData.append("bestSeller", productInfo.bestSeller);
//       formData.append("stock", productInfo.stock);

//       Object.values(images).forEach((image) => {
//         if (image) formData.append("images", image);
//       });

//       // Make API request
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/api/products`,
//         formData,
//         {
//           withCredentials: true,
//         },
//       );

//       console.log(response);

//       if (response.status !== 200 && response.status !== 201) {
//         throw new Error(response.data.message || "Failed to add product");
//       }

//       // Reset form on success
//       setProductInfo({
//         title: "",
//         description: "",
//         priceAmount: 0,
//         category: "",
//         bestSeller: false,
//         stock: 0,
//       });
//       setImages({ 1: null, 2: null, 3: null, 4: null });

//       toast.success("Product added successfully!");
//     } catch (error) {
//       toast.error(error.message || "Error adding product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={(e) =>
//         toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })
//       }
//       className="text-slate-500 mb-28"
//     >
//       <h1 className="text-2xl">
//         Add New <span className="text-slate-800 font-medium">Products</span>
//       </h1>
//       <p className="mt-7">Product Images</p>

//       <div htmlFor="" className="flex gap-3 mt-4">
//         {Object.keys(images).map((key) => (
//           <label key={key} htmlFor={`images${key}`}>
//             <Image
//               width={300}
//               height={300}
//               className="h-15 w-auto border border-slate-200 rounded cursor-pointer"
//               src={
//                 images[key]
//                   ? URL.createObjectURL(images[key])
//                   : assets.upload_area
//               }
//               alt=""
//             />
//             <input
//               type="file"
//               accept="image/*"
//               id={`images${key}`}
//               onChange={(e) =>
//                 setImages({ ...images, [key]: e.target.files[0] })
//               }
//               hidden
//             />
//           </label>
//         ))}
//       </div>

//       <label htmlFor="" className="flex flex-col gap-2 my-6 ">
//         Name
//         <input
//           type="text"
//           name="title"
//           onChange={onChangeHandler}
//           value={productInfo.title}
//           placeholder="Enter product name"
//           className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded"
//           required
//         />
//       </label>

//       <label htmlFor="" className="flex flex-col gap-2 my-6 ">
//         Description
//         <textarea
//           name="description"
//           onChange={onChangeHandler}
//           value={productInfo.description}
//           placeholder="Enter product description"
//           rows={5}
//           className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded resize-none"
//           required
//         />
//       </label>

//       <div className="flex flex-row gap-4">
//         <label htmlFor="" className="flex flex-col gap-2">
//           Price ($)
//           <input
//             type="number"
//             name="priceAmount"
//             onChange={onChangeHandler}
//             value={productInfo.priceAmount}
//             placeholder="0"
//             rows={5}
//             className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded resize-none"
//             required
//           />
//         </label>

//         <label htmlFor="" className="flex flex-col gap-2">
//           Stock
//           <input
//             type="number"
//             name="stock"
//             onChange={onChangeHandler}
//             value={productInfo.stock}
//             placeholder="0"
//             rows={5}
//             className="w-full max-w-lg p-2 px-4 outline-none border border-slate-200 rounded resize-none"
//             required
//           />
//         </label>
//       </div>

//       <select
//         onChange={(e) =>
//           setProductInfo({ ...productInfo, category: e.target.value })
//         }
//         value={productInfo.category}
//         className="w-full max-w-lg p-2 px-4 my-6 outline-none border border-slate-200 rounded"
//         required
//       >
//         <option value="">Select a category</option>
//         {categories.map((category) => (
//           <option key={category} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>

//       <br />


//       <div className="flex gap-2 mt-2">
//         <input
//           onChange={() => setProductInfo({ ...productInfo, bestSeller: !productInfo.bestSeller })}
//           checked={productInfo.bestSeller}
//           type="checkbox"
//           id="bestseller"
//         />
//         <label className="cursor-pointer" htmlFor="bestseller">
//           Add to bestseller
//         </label>
//       </div>

//       <button
//         className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition"
//       >
//         Add Product
//       </button>
//     </form>
//   );
// }









"use client"; // ✅ MUST be first line — ye browser-only APIs use karta hai

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
// import { Loader2 } from "lucide-react"; // ✅ import karo

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

export default function StoreAddProduct() {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    priceAmount: 0,
    category: "",
    stock: 0,
    bestSeller: false,
  });
  // const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const hasImage = Object.values(images).some((img) => img !== null);
      if (!hasImage) {
        toast.error("Please select at least one product image");
        return;
      }

      const formData = new FormData();
      formData.append("title", productInfo.title);
      formData.append("description", productInfo.description);
      formData.append("priceAmount", productInfo.priceAmount);
      formData.append("category", productInfo.category);
      formData.append("bestSeller", productInfo.bestSeller);
      formData.append("stock", productInfo.stock);

      Object.values(images).forEach((image) => {
        if (image) formData.append("images", image);
      });

      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL}/api/products`,
          formData,
          { withCredentials: true }
        ),
        {
          // loading: "Adding product...",
          success: "Product added successfully!",
          error: (err) => err?.response?.data?.message || "Failed to add product",
        }
      );

      // Reset form
      setProductInfo({
        title: "",
        description: "",
        priceAmount: 0,
        category: "",
        bestSeller: false,
        stock: 0,
      });
      setImages({ 1: null, 2: null, 3: null, 4: null });

    } catch {
      // toast.promise handles the error toast already
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Add New <span className="text-indigo-600">Product</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Fill in the details below to add a new product to your store
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-6">

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Product Images
            <span className="text-slate-400 font-normal ml-1">(up to 4)</span>
          </label>
          <div className="flex gap-3 flex-wrap">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                htmlFor={`images${key}`}
                className="cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 group-hover:border-indigo-400 overflow-hidden transition-colors bg-slate-50">
                  {images[key] ? (
                    <Image
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(images[key])}
                      alt={`Product image ${key}`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span className="text-[10px] text-slate-400">Add</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id={`images${key}`}
                  onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Product Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            onChange={onChangeHandler}
            value={productInfo.title}
            placeholder="Enter product name"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={productInfo.description}
            placeholder="Enter product description"
            rows={4}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 transition resize-none"
            required
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Price (₹) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="priceAmount"
              onChange={onChangeHandler}
              value={productInfo.priceAmount}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Stock <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="stock"
              onChange={onChangeHandler}
              value={productInfo.stock}
              placeholder="0"
              min="0"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 transition"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
            value={productInfo.category}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 transition bg-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <input
            type="checkbox"
            id="bestseller"
            onChange={() => setProductInfo({ ...productInfo, bestSeller: !productInfo.bestSeller })}
            checked={productInfo.bestSeller}
            className="w-4 h-4 accent-indigo-600 cursor-pointer"
          />
          <label htmlFor="bestseller" className="cursor-pointer text-sm font-medium text-slate-700">
            Mark as Bestseller
          </label>
          <span className="ml-auto text-xs text-slate-400">
            Featured on homepage
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          // disabled={loading}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {/* {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Adding Product...</>
          ) : (
            "Add Product"
          )} */}
          Add Product
        </button>
      </form>
    </div>
  );
}