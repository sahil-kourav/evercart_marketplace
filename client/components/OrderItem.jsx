"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const statusStyles = {
  PENDING: "bg-amber-50 text-amber-700",
  PROCESSING: "bg-blue-50 text-blue-700",
  SHIPPED: "bg-purple-50 text-purple-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
};

const OrderItem = ({ order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const router = useRouter();

  const badgeClass = statusStyles[order.status] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
      {/* Top row: date + order id + status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toDateString()}
          </p>
          <p className="text-xs text-gray-400 font-mono mt-0.5">#{order._id}</p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}
        >
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2 mb-4">
        {order.items?.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-3 bg-gray-100 rounded-xl p-3"
          >
            <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
              {item.product?.images?.[0]?.url && (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.title || "Product"}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.product?.title || "Product"}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">
                Qty: {item.quantity}
              </p>
              <p className="text-sm text-gray-400 flex-shrink-0 md:hidden">
               Amount: {currency}
                {item.price?.amount?.toLocaleString() ?? "—"}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900 flex-shrink-0 sm:block hidden">
              {currency}
              {item.price?.amount?.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Shipping info — full width, standalone */}
      <div className="pt-4 m-2 border-t border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          Ship to
        </p>
        <p className="text-sm text-gray-600">
          {order.shippingAddress?.name} · {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.state}
        </p>
      </div>

      {/* Total + CTA — in a pill container so they breathe */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-2 py-3">
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide m-0.5">
            Order total
          </p>
          <p className="text-xl font-semibold text-gray-900">
            {currency}
            {order.totalPrice?.amount?.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => router.push(`/orders/${order._id}`)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-white hover:border-gray-300 transition whitespace-nowrap"
        >
          View details →
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
