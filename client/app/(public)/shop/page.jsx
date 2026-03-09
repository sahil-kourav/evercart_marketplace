"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { productDummyData } from "@/assets/assets";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productDummyData);
  }, []);

  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-5 mb-10">
          
          <p className="text-sm text-neutral-500 mb-4 md:mb-0">
            Showing <span className="font-medium text-neutral-800">{products.length}</span> products
          </p>

          <div className="flex items-center gap-4">
            <select className="bg-white border border-neutral-300 text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-neutral-300 rounded-xl">
            <h2 className="text-lg font-medium text-neutral-700">
              No products available
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6
                          grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-4 
                          2xl:grid-cols-5">
            {products.map((product) => (
              <div
                key={product.id}
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
