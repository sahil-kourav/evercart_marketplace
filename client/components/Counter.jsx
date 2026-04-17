'use client';

import { useDispatch } from "react-redux";
import {
  addItemToCart,
  updateCartQuantity,
} from "@/lib/features/cart/cartActions";

const Counter = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  const increment = () => {
      dispatch(addItemToCart({ productId, qty: 1 }));
  };

  const decrement = () => {
    if (quantity > 1) {
      dispatch(updateCartQuantity({ productId, qty: quantity - 1 }));
    }
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 border rounded text-slate-600">
      <button onClick={decrement} className="px-2">-</button>
      <span>{quantity}</span>
      <button onClick={increment} className="px-2">+</button>
    </div>
  );
};

export default Counter;