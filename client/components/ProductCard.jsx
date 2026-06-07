"use client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  return (
    <Link href={`/product/${product._id}`} className=" group max-xl:mx-auto">
      <div className="bg-[#F5F5F5] h-40 sm:w-70 sm:h-68 rounded-lg flex items-center justify-center">
        <Image
          width={500}
          height={500}
          className="max-h-30 sm:max-h-40 w-auto group-hover:scale-105 transition duration-300"
          src={product?.images?.[0]?.url || "/placeholder.png"}
          alt={product?.title || "Product Image"}
        />
      </div>
      <div className="px-1 pt-2 text-sm text-slate-800">
        <p className="text-sm text-neutral-800 font-medium">
          {product.title}
        </p>
        <p className="mt-1 text-sm text-slate-900 font-semibold">
          {currency}{product.price?.amount?.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
