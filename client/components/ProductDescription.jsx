// "use client";

// import { StarIcon } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { dummyRatingsData } from "@/assets/assets";

// const ProductDescription = ({ product }) => {
//   const [selectedTab, setSelectedTab] = useState("Description");

//   const ratings = dummyRatingsData;

//   return (
//     <div className="my-16 text-sm text-slate-700">

//       {/* Tabs */}
//       <div className="flex gap-6 border-b border-slate-200 mb-8 max-w-2xl">
//         {["Description", "Reviews"].map((tab, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedTab(tab)}
//             className={`pb-2 text-sm transition ${
//               tab === selectedTab
//                 ? "border-b-2 border-emerald-500 text-slate-900 font-semibold"
//                 : "text-slate-400 hover:text-slate-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Description */}
//       {selectedTab === "Description" && (
//         <p className="max-w-xl leading-relaxed text-slate-600">
//           {product.description}
//         </p>
//       )}

//       {/* Reviews */}
//       {selectedTab === "Reviews" && (
//         <div className="flex flex-col gap-8 mt-6">

//           {ratings.length === 0 && (
//             <p className="text-slate-400">No reviews yet</p>
//           )}

//           {ratings.map((item) => (
//             <div key={item.id} className="flex gap-4">

//               <Image
//                 src={item.user.image}
//                 alt={item.user.name}
//                 className="size-10 rounded-full object-cover"
//                 width={40}
//                 height={40}
//               />

//               <div className="flex flex-col gap-2">

//                 {/* Stars */}
//                 <div className="flex items-center gap-1">
//                   {Array(5)
//                     .fill("")
//                     .map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         size={16}
//                         className="text-transparent"
//                         fill={item.rating >= i + 1 ? "#22c55e" : "#e5e7eb"}
//                       />
//                     ))}
//                 </div>

//                 {/* Review */}
//                 <p className="text-slate-600 max-w-lg leading-relaxed">
//                   {item.review}
//                 </p>

//                 {/* Name + Date */}
//                 <div className="flex items-center gap-3 text-xs">
//                   <span className="font-semibold text-slate-800">
//                     {item.user.name}
//                   </span>

//                   <span className="text-slate-400">
//                     {new Date(item.createdAt).toDateString()}
//                   </span>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDescription;



"use client";

import { StarIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { dummyRatingsData } from "@/assets/assets";

const ProductDescription = ({ product }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const ratings = dummyRatingsData;

  const avgRating = ratings.length
    ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
    : null;

  const visibleReviews = showAllReviews ? ratings : ratings.slice(0, 2);

  return (
    <div className="my-18">

      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT — Description */}
        <div className="flex-1">
          <h2 className="text-base font-semibold text-slate-800 mb-3">About this product</h2>
          <hr className="border-slate-100 mb-5" />
          <p className="text-md text-slate-600 leading-7">{product.description}</p>
        </div>

        {/* RIGHT — Reviews */}
        <div className="w-full lg:w-xl shrink-0">
          <h2 className="text-base font-semibold text-slate-800 mb-3">
            Customer Reviews
            <span className="ml-2 text-xs font-normal bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {ratings.length}
            </span>
          </h2>
          <hr className="border-slate-100 mb-5" />

          {/* Avg rating */}
          {avgRating && (
            <div className="flex items-center gap-3 mb-6">
              <p className="text-4xl font-bold text-slate-800">{avgRating}</p>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array(5).fill("").map((_, i) => (
                    <StarIcon
                      key={i}
                      size={13}
                      className="text-transparent"
                      fill={Math.round(avgRating) >= i + 1 ? "#22c55e" : "#e5e7eb"}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Based on {ratings.length} reviews
                </p>
              </div>
            </div>
          )}

          {/* Review list */}
          {ratings.length === 0 ? (
            <p className="text-sm text-slate-400">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {visibleReviews.map((item) => (
                <div key={item.id} className="flex gap-3 border border-slate-100 rounded-xl p-4">
                  <Image
                    src={item.user.image}
                    alt={item.user.name}
                    className="size-8 rounded-full object-cover shrink-0 mt-0.5"
                    width={32}
                    height={32}
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">{item.user.name}</p>
                      <div className="flex gap-0.5">
                        {Array(5).fill("").map((_, i) => (
                          <StarIcon
                            key={i}
                            size={11}
                            className="text-transparent"
                            fill={item.rating >= i + 1 ? "#22c55e" : "#e5e7eb"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      {new Date(item.createdAt).toDateString()}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.review}</p>
                  </div>
                </div>
              ))}

              {/* Show all button */}
              {ratings.length > 2 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="flex items-center justify-center gap-1.5 w-full border border-slate-200 text-slate-500 text-sm py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  {showAllReviews ? "Show less" : `Show all ${ratings.length} reviews`}
                  <ChevronDownIcon
                    size={15}
                    className={`transition-transform ${showAllReviews ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDescription;