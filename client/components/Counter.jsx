'use client';

import { useDispatch } from "react-redux";
import { addItemToCart, updateCartQuantity } from "@/lib/features/cart/cartActions";

const Counter = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  const increment = () => dispatch(addItemToCart({ productId, qty: 1 }));
  const decrement = () => {
    if (quantity > 1) dispatch(updateCartQuantity({ productId, qty: quantity - 1 }));
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={decrement}
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-600 font-bold text-lg transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow"
      >
        −
      </button>
      <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-800">
        {quantity}
      </span>
      <button
        onClick={increment}
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-green-100 hover:text-green-600 text-slate-600 font-bold text-lg transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow"
      >
        +
      </button>
    </div>
  );
};

export default Counter;