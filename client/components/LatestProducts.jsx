"use client";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const LatestProducts = () => {
  const displayQuantity = 8;
  const products = useSelector((state) => state.product.list);

  const latestProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="my-30 max-w-7xl mx-auto px-6 lg:px-10">
      <Title
        title="Latest Products"
        description={`Showing ${
          latestProducts.length < displayQuantity
            ? latestProducts.length
            : displayQuantity
        } of ${latestProducts.length} products`}
        href="/shop"
      />

      <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {latestProducts.length === 0 ? (
          <div className="col-span-full text-center text-slate-400">
            <p className="text-md font-medium">
              No latest products available at the moment.
            </p>
          </div>
        ) : (
          latestProducts.slice(0, displayQuantity).map((product) => (
            <div
              key={product._id}
              className="group transition duration-300 ease-in-out"
            >
              <div className="transform transition duration-300 group-hover:-translate-y-1">
                <ProductCard key={product._id} product={product} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
