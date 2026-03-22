// "use client";
// import Image from "next/image";
// import { DotIcon } from "lucide-react";

// const OrderItem = ({ order }) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

//   const statusColor =
//     order.status === "PENDING"
//       ? "text-yellow-600 bg-yellow-100"
//       : order.status === "DELIVERED"
//         ? "text-green-600 bg-green-100"
//         : "text-gray-600 bg-gray-100";

//   return (
//     <>
//       {/* 📱 MOBILE VIEW (Card inside TR → valid HTML) */}
//       <tr className="md:hidden">
//         <td colSpan={4}>
//           <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
//             {/* 🔥 Header */}
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-xs text-gray-400">
//                 {new Date(order.createdAt).toDateString()}
//               </p>

//               <span
//                 className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
//               >
//                 <DotIcon size={12} />
//                 {order.status}
//               </span>
//             </div>

//             {/* 🔥 Items */}
//             <div className="flex flex-col gap-4">
//               {order.items.map((item) => (
//                 <div
//                   key={item.productId}
//                   className="flex gap-3 items-start bg-gray-50 rounded-xl p-2"
//                 >
//                   {/* Image */}
//                   <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden border">
//                     {item.product && (
//                       <Image
//                         src={item.product.images?.[0]?.url}
//                         alt={item.product.title}
//                         width={60}
//                         height={60}
//                         className="object-contain"
//                       />
//                     )}
//                   </div>

//                   {/* Info */}
//                   <div className="flex flex-col flex-1">
//                     <p className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
//                       {item.product?.title || "Product"}
//                     </p>

//                     <div className="flex justify-between items-center mt-1">
//                       <p className="text-xs text-gray-500">
//                         Qty: {item.quantity}
//                       </p>

//                       <p className="text-sm font-semibold text-gray-900">
//                         {currency}
//                         {item.price.amount.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* 🔥 Divider */}
//             <div className="my-4 border-t border-gray-100" />

//             {/* 🔥 Address + Total */}
//             <div className="flex justify-between gap-3">
//               {/* Address */}
//               <div className="text-sm text-gray-500">
//                 <p className="font-medium text-gray-700">
//                   {order.shippingAddress.name}
//                 </p>
//                 <p className="leading-tight">
//                   {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
//                   {order.shippingAddress.pincode}
//                 </p>
//               </div>

//               {/* Total */}
//               <div className="text-right">
//                 <p className="text-xs text-gray-400">Total</p>
//                 <p className="text-lg font-bold text-gray-900">
//                   {currency}
//                   {order.totalPrice.amount.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </td>
//       </tr>

//       {/* 💻 DESKTOP VIEW */}
//       <tr className="hidden md:table-row bg-white hover:bg-gray-50 transition rounded-xl shadow-sm">
//         {/* Product */}
//         <td className="py-6 px-4 align-top w-[45%]">
//           <div className="flex flex-col gap-5">
//             {order.items.map((item) => (
//               <div key={item.productId} className="flex items-center gap-4">
//                 <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//                   {item.product && (
//                     <Image
//                       src={item.product.images?.[0]?.url}
//                       alt={item.product.title}
//                       width={50}
//                       height={50}
//                       className="object-contain"
//                     />
//                   )}
//                 </div>

//                 <div className="space-y-1">
//                   <p className="font-medium text-gray-800">
//                     {item.product?.title || "Product"}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Qty: {item.quantity}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </td>

//         {/* Total */}
//         <td className="py-6 px-6 align-top text-center w-[15%]">
//           <p className="text-xs text-gray-400 mb-1">Total</p>
//           <p className="text-lg font-semibold text-gray-900">
//             {currency}
//             {order.totalPrice.amount.toLocaleString()}
//           </p>
//         </td>

//         {/* Address */}
//         <td className="py-6 px-6 align-top w-[30%]">
//           <div className="space-y-1 text-sm text-gray-600 leading-relaxed">
//             <p className="font-medium text-gray-800">
//               {order.shippingAddress.name}
//             </p>
//             <p>{order.shippingAddress.street}</p>
//             <p>
//               {order.shippingAddress.city}, {order.shippingAddress.state}
//             </p>
//             <p>{order.shippingAddress.country}</p>
//             <p className="text-gray-500">
//               {order.shippingAddress.phone}
//             </p>
//           </div>
//         </td>

//         {/* Status */}
//         <td className="py-6 px-6 align-top text-center w-[10%]">
//           <span
//             className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
//           >
//             <DotIcon size={10} />
//             {order.status}
//           </span>
//         </td>
//       </tr>
//     </>
//   );
// };

// export default OrderItem;












"use client";

import Image from "next/image";
import { DotIcon } from "lucide-react";
import OrderTimeline from "./OrderTimeline";

const OrderItem = ({ order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const statusColor =
    order.status === "PENDING"
      ? "text-yellow-600 bg-yellow-100"
      : order.status === "DELIVERED"
      ? "text-green-600 bg-green-100"
      : "text-gray-600 bg-gray-100";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-gray-100">

      {/* 🔥 TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-400">
          {new Date(order.createdAt).toDateString()}
        </p>

        <span
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          <DotIcon size={12} />
          {order.status}
        </span>
      </div>

      {/* 🔥 TIMELINE */}
      <OrderTimeline status={order.status} />

      {/* 🔥 MAIN CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">

        {/* 🛍️ PRODUCTS */}
        <div className="flex flex-col gap-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4 items-center">
              
              <div className="w-16 h-16 relative bg-gray-100 rounded-xl overflow-hidden">
                {item.product && (
                  <Image
                    src={item.product.images?.[0]?.url}
                    alt={item.product.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <div>
                <p className="font-medium text-gray-800">
                  {item.product?.title || "Product"}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 📍 ADDRESS */}
        <div className="text-sm text-gray-600 space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Delivery Address
          </p>

          <p className="font-medium text-gray-800">
            {order.shippingAddress.name}
          </p>

          <p>{order.shippingAddress.street}</p>

          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>

          <p>{order.shippingAddress.country}</p>

          <p className="text-gray-500">
            {order.shippingAddress.phone}
          </p>
        </div>

        {/* 💰 TOTAL */}
        <div className="flex flex-col justify-between items-end text-right">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Total Amount
            </p>

            <p className="text-2xl font-bold text-gray-900 mt-1">
              {currency}
              {order.totalPrice.amount.toLocaleString()}
            </p>
          </div>

          <button className="mt-4 px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;