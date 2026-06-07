"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/lib/features/product/productSlice";

export default function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.list || []);

  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/`,
        {
          withCredentials: true,
        },
      );

      dispatch(setProduct(res.data?.data));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Shop</span>
        </div>
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-5 mb-10">
          <h1 className="text-2xl font-semibold text-neutral-800">All Products </h1>
          <p className="text-sm text-neutral-500 mt-2 md:mt-0">
            Showing{" "}
            <span className="font-medium text-neutral-800">{products.length}</span>{" "}
            products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 pt-20">
            <p className="text-lg font-medium">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <div
            className="grid gap-6
                          grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-4 
                          2xl:grid-cols-5"
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="group transition duration-300 ease-in-out"
              >
                <div className="transform transition duration-300 group-hover:-translate-y-1">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
