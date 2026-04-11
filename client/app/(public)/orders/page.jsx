"use client";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import axios from "axios";

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true); // 🔥 start loading

      const response = await axios.get(
        "http://localhost:8083/api/orders/me",
        { withCredentials: true }
      );

      const rawOrders = response.data.orders;

      // 🔥 enrich products
      const enrichedOrders = await Promise.all(
        rawOrders.map(async (order) => {
          const itemsWithProducts = await Promise.all(
            order.items.map(async (item) => {
              try {
                const res = await axios.get(
                  `http://localhost:8081/api/products/${item.productId}`
                );

                return {
                  ...item,
                  product: res.data.product,
                };
              } catch (err) {
                return item;
              }
            })
          );

          return {
            ...order,
            items: itemsWithProducts,
          };
        })
      );

      setOrders(enrichedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // ✅ IMPORTANT FIX
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 1. Loading state (highest priority)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-400">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        <p className="text-sm">Loading orders...</p>
      </div>
    );
  }

  // 🔥 2. Empty state
  if (orders.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-400">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          You have no orders
        </h1>
      </div>
    );
  }

  // 🔥 3. Success state
  return (
    <div className="min-h-[70vh]">
      <div className="my-10 max-w-7xl mx-auto px-6 lg:px-10">
        <PageTitle
          heading="My Orders"
          text={`Showing total ${orders.length} orders`}
          linkText={"Go to home"}
        />

        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}