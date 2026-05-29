'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/lib/features/cart/cartActions";
import axios from "axios";
import Image from "next/image";
import OrderSummary from "@/components/OrderSummary";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const { cart, loading } = useSelector((state) => state.cart);
  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);

  useEffect(() => {
    if (!cart?.items?.length) { setCartArray([]); return; }
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          cart.items.map((item) =>
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${item.productId}`, { withCredentials: true })
          )
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
        setTotalPrice(enriched.reduce((acc, item) => acc + item.price * item.quantity, 0));
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [cart]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-slate-600 transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Checkout</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Checkout Details</h1>


        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-5 items-start my-10">

          {/* Left — Order Items */}
          <div className="flex-1 w-full min-w-0">
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden">
              {cartArray.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50/60 transition-colors"
                >
                  {/* Image */}
                  <div className="w-18 h-16 rounded-lg bg-slate-200 border border-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                    <p className="text-sm text-slate-400">{item.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">
                        {currency}{item.price.toLocaleString()}
                      </span>
                      <span className="text-slate-300 text-sm">×</span>
                      <span className="text-sm font-medium bg-slate-100 text-slate-600 rounded-md px-2 py-0.5">
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="flex-shrink-0 text-right">
                    <span className="text-slate-400 text-xs">Total:</span>
                    <p className="text-md font-semibold text-slate-800">
                      {currency}{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Payment Summary */}
          <div className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-6">
            <OrderSummary totalPrice={totalPrice} items={cartArray} />
          </div>

        </div>
      </div>
    </div>
  );
}