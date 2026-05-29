"use client";

import Counter from "@/components/Counter";
import PageTitle from "@/components/PageTitle";
import { Trash2Icon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemFromCart } from "@/lib/features/cart/cartActions";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const { cart, loading } = useSelector((state) => state.cart);
  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${item.productId}`,
              { withCredentials: true },
            ),
          ),
        );
        const enriched = responses.map((res, index) => {
          const product = res.data.product;
          const item = cart.items[index];
          return {
            productId: item.productId,
            quantity: item.quantity,
            name: product.title,
            category: product.category,
            price: product.price?.amount || 0,
            images: product.images?.map((img) => img.url) || [],
          };
        });
        setCartArray(enriched);
        setTotalPrice(
          enriched.reduce((acc, item) => acc + item.price * item.quantity, 0),
        );
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [cart]);

  if (loading) return <Loading />;

  if (!cartArray.length) {
    return (
   <div className="min-h-[80vh] flex items-center justify-center text-slate-400">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh]">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 my-8 mx-auto">
        <div className="flex items-center gap-2 text-sm mb-5">
          <PageTitle
            heading="My Cart"
            text={`Showing ${cartArray.length} items in your cart`}
            linkText={"Go to home"}
          />
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-2.5">
          {cartArray.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 px-3 py-3 bg-white/80 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg bg-slate-200 border border-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image
                  src={item.images?.[0] || "/no-image.png"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-md font-medium text-slate-800 truncate leading-snug">
                  {item.name}
                </p>
                <p className="text-sm text-slate-400 mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {currency}
                  {item.price.toLocaleString()}
                </p>
              </div>

              {/* <div className="flex items-center gap-12">
                
                <div className="flex-shrink-0">
                  <Counter
                    productId={item.productId}
                    quantity={item.quantity}
                  />
                </div> */}

               
                <button
                  onClick={() => dispatch(removeItemFromCart(item.productId))}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2Icon size={18} />
                </button>
              {/* </div> */}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="flex justify-end mt-6">
          <div className="w-full sm:w-72 lg:w-98 bg-white border border-slate-100 rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100 tracking-wide uppercase">
              Order Summary
            </h2>
            <div className="flex justify-between text-sm text-slate-500 mb-2.5">
              <span>Subtotal</span>
              <span className="text-slate-700">
                {currency}
                {totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 mb-2.5">
              <span>Shipping</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-slate-800 pt-3 mt-1 border-t border-slate-100">
              <span>Total</span>
              <span>
                {currency}
                {totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full mt-5 bg-slate-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-slate-700 active:scale-[0.98] transition-all tracking-wide"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
