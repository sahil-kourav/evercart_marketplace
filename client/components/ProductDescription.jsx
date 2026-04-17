"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { dummyRatingsData } from "@/assets/assets";

const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState("Description");

  const ratings = dummyRatingsData;

  return (
    <div className="my-16 text-sm text-slate-700">

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mb-8 max-w-2xl">
        {["Description", "Reviews"].map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(tab)}
            className={`pb-2 text-sm transition ${
              tab === selectedTab
                ? "border-b-2 border-emerald-500 text-slate-900 font-semibold"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Description */}
      {selectedTab === "Description" && (
        <p className="max-w-xl leading-relaxed text-slate-600">
          {product.description}
        </p>
      )}

      {/* Reviews */}
      {selectedTab === "Reviews" && (
        <div className="flex flex-col gap-8 mt-6">

          {ratings.length === 0 && (
            <p className="text-slate-400">No reviews yet</p>
          )}

          {ratings.map((item) => (
            <div key={item.id} className="flex gap-4">

              <Image
                src={item.user.image}
                alt={item.user.name}
                className="size-10 rounded-full object-cover"
                width={40}
                height={40}
              />

              <div className="flex flex-col gap-2">

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className="text-transparent"
                        fill={item.rating >= i + 1 ? "#22c55e" : "#e5e7eb"}
                      />
                    ))}
                </div>

                {/* Review */}
                <p className="text-slate-600 max-w-lg leading-relaxed">
                  {item.review}
                </p>

                {/* Name + Date */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-slate-800">
                    {item.user.name}
                  </span>

                  <span className="text-slate-400">
                    {new Date(item.createdAt).toDateString()}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;