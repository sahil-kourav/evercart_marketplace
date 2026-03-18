"use client";
import Image from "next/image";
import { DotIcon } from "lucide-react";

const OrderItem = ({ order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const statusColor =
    order.status === "PENDING"
      ? "text-yellow-600 bg-yellow-100"
      : order.status === "DELIVERED"
        ? "text-green-600 bg-green-100"
        : "text-gray-600 bg-gray-100";

  return (
    <>
      {/* 📱 MOBILE VIEW (Card inside TR → valid HTML) */}
      <tr className="md:hidden">
        <td colSpan={4}>
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
            {/* 🔥 Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toDateString()}
              </p>

              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
              >
                <DotIcon size={12} />
                {order.status}
              </span>
            </div>

            {/* 🔥 Items */}
            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 items-start bg-gray-50 rounded-xl p-2"
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden border">
                    {item.product && (
                      <Image
                        src={item.product.images?.[0]?.url}
                        alt={item.product.title}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <p className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
                      {item.product?.title || "Product"}
                    </p>

                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-sm font-semibold text-gray-900">
                        {currency}
                        {item.price.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔥 Divider */}
            <div className="my-4 border-t border-gray-100" />

            {/* 🔥 Address + Total */}
            <div className="flex justify-between gap-3">
              {/* Address */}
              <div className="text-sm text-gray-500">
                <p className="font-medium text-gray-700">
                  {order.shippingAddress.name}
                </p>
                <p className="leading-tight">
                  {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.pincode}
                </p>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  {currency}
                  {order.totalPrice.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </td>
      </tr>

      {/* 💻 DESKTOP VIEW */}
      <tr className="hidden md:table-row text-md">
        {/* Product */}
        <td>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  {item.product && (
                    <Image
                      src={item.product.images?.[0]?.url}
                      alt={item.product.title}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {item.product?.title || "Product"}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </td>

        {/* Total */}
        <td className="text-center font-medium">
          {currency}
          {order.totalPrice.amount.toLocaleString()}
        </td>

        {/* Address */}
        <td className="text-sm text-gray-600">
          <p className="font-medium text-gray-800">
            {order.shippingAddress.name}
          </p>
          <p>
            {order.shippingAddress.street}, {order.shippingAddress.city}
          </p>
          <p>
            {order.shippingAddress.state}, {order.shippingAddress.country}
          </p>
          <p>{order.shippingAddress.phone}</p>
        </td>

        {/* Status */}
        <td className="text-center">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${statusColor}`}
          >
            <DotIcon size={10} />
            {order.status}
          </span>
        </td>
      </tr>
    </>
  );
};

export default OrderItem;
