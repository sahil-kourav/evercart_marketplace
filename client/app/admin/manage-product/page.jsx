"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/Loading";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function StoreManageProducts() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products from backend API (using axios)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8081/api/products/sellers",
        {
          withCredentials: true,
        },
      );
      setProducts(res.data.data || []);
      console.log(res.data);
    } catch (error) {
      toast.error(error.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };


    // Update product content
  const updateProduct = async (productId, updateData) => {
    try {
      const res = await axios.patch(
        `http://localhost:8081/api/products/sellers/${productId}`,
        updateData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Product updated successfully!");
        fetchProducts();
      } else {
        throw new Error(res.data.message || "Failed to update product");
      }
    } catch (error) {
      toast.error(error.message || "Error updating product");
    }
  } 

  const deleteProduct = async (productId) => {
    try {
        if (!confirm("Are you sure you want to delete this product?")) return;

      const res = await axios.delete(
        `http://localhost:8081/api/products/${productId}`,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        toast.success("Product deleted successfully!");
        fetchProducts();
      } else {
        throw new Error(res.data.message || "Failed to delete product");
      }
    }
    catch (error) {
      toast.error(error.message || "Error deleting product");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-2xl text-slate-500 mb-5">
        Manage <span className="text-slate-800 font-medium">Products</span>
      </h1>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          {/* Header */}
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-left w-[260px]">Product</th>
              <th className="px-6 py-4 text-left hidden lg:table-cell">
                Description
              </th>
              <th className="px-6 py-4 text-left w-[140px] hidden md:table-cell">
                Category
              </th>
              <th className="px-6 py-4 text-left w-[120px] hidden md:table-cell">
                Stock
              </th>
              <th className="px-6 py-4 text-left w-[120px]">Price</th>
              <th className="px-6 py-4 text-center w-[120px]">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50 transition">
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.images?.[0]?.url}
                      width={44}
                      height={44}
                      alt={product.title}
                      className="rounded-md border border-slate-200"
                    />

                    <p className="font-medium text-slate-800 leading-tight line-clamp-2">
                      {product.title}
                    </p>
                  </div>
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-slate-500 hidden lg:table-cell">
                  <p className="line-clamp-2 max-w-md">{product.description}</p>
                </td>

                {/* Category */}
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700 capitalize whitespace-nowrap">
                    {product.category}
                  </span>
                </td>

                {/* Stock */}
                <td className="px-6 py-4 hidden md:table-cell">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">
                  {currency} {product.price?.amount?.toLocaleString()}
                </td>

                {/* Toggle */}
                <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        toast.promise(deleteProduct(product._id), {
                          loading: "Deleting...",
                        })
                      }
                      className="p-2 rounded-md hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
