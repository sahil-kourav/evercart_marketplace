'use client';

import { useDispatch } from "react-redux";
import {
  addItemToCart,
  updateCartQuantity,
} from "@/lib/features/cart/cartActions";

const Counter = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  const increment = () => {
    // backend will increase quantity
    dispatch(addItemToCart(productId));
  };

  const decrement = () => {
    if (quantity > 1) {
      dispatch(updateCartQuantity(productId, quantity - 1));
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


//     return (
//         <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
//             <button onClick={removeFromCartHandler} className="p-1 select-none">-</button>
//             <p className="p-1">{cartItems[productId]}</p>
//             <button onClick={addToCartHandler} className="p-1 select-none">+</button>
//         </div>
//     )
// }

// export default Counter