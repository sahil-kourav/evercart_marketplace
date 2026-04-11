'use client';

import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCart,
  removeItemFromCart,
} from "@/lib/features/cart/cartActions";
import Loading from "@/components/Loading";

export default function Cart() {
  const dispatch = useDispatch();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const { cart, loading } = useSelector((state) => state.cart);

  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ fetch cart once
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  
  
  useEffect(() => {
    if (!cart?.items?.length) {
      setCartArray([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          cart.items.map((item) =>
            axios.get(
              `http://localhost:8081/api/products/${item.productId}`,
              { withCredentials: true }
            )
          )
        );

        const enriched = responses.map((res, index) => {
          const product = res.data.product;
          const item = cart.items[index];

          return {
            productId: item.productId, // ✅ always string
            quantity: item.quantity,
            name: product.title,
            category: product.category,
            price: product.price?.amount || 0,
            images: product.images?.map((img) => img.url) || [],
          };
        });

        setCartArray(enriched);

        // ✅ calculate total
        const total = enriched.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [cart]);

  if (loading) {
    return <Loading />;
  }

  if (!cartArray.length) {
    return (
      <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-8 my-10 text-slate-800">
      <div className="max-w-7xl  px-6 lg:px-8 mx-auto">
        <PageTitle heading="My Cart" text="items in your cart" />

        <div className="flex items-start justify-between gap-5 max-lg:flex-col">

          {/* TABLE */}
          <table className="w-full max-w-6xl text-slate-600 table-auto">
            <thead>
              <tr className="max-sm:text-sm">
                <th className="text-left">Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th className="max-md:hidden">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cartArray.map((item) => (
                <tr key={item.productId}>
                  <td className="flex gap-3 my-4">
                    <div className="flex items-center justify-center bg-slate-100 size-18 rounded-md">
                      <Image
                        src={item.images?.[0] || "/no-image.png"}
                        alt={item.name}
                        width={45}
                        height={45}
                      />
                    </div>

                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-slate-500">
                        {item.category}
                      </p>
                      <p>
                        {currency}
                        {item.price}
                      </p>
                    </div>
                  </td>

                  <td className="text-center">
                    <Counter
                      productId={item.productId}
                      quantity={item.quantity}
                    />
                  </td>

                  <td className="text-center">
                    {currency}
                    {(item.price * item.quantity).toLocaleString()}
                  </td>

                  <td className="text-center max-md:hidden">
                    <button
                      onClick={() =>
                        dispatch(removeItemFromCart(item.productId))
                      }
                      className="text-red-500 hover:bg-red-50 p-2.5 rounded-full"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {/* SUMMARY */}
          <OrderSummary totalPrice={totalPrice} items={cartArray} />
        </div>

      </div>
    </div>
  );
}