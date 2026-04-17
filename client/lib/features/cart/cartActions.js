import axios from "axios";
import {
  cartLoading,
  cartLoaded,
  cartError,
  cartCleared,
} from "./cartSlice";

const BASE_URL = `${process.env.NEXT_PUBLIC_CART_SERVICE_API_URL}/api/cart`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * Fetch full cart
 */
export const fetchCart = () => async (dispatch) => {
  try {
    dispatch(cartLoading());

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_API_URL}/api/cart`,
      { withCredentials: true }
    );
    dispatch(cartLoaded(res.data));
  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to fetch cart"
      )
    );
  }
};

/**
 * Add item to cart (increment by qty)
 */
export const addItemToCart = ({ productId, qty = 1 }) => async (dispatch) => {
  try {
    dispatch(cartLoading());

    // ✅ ensure string id
    const id =
      typeof productId === "object" ? productId._id : productId;

    // await api.post("/items",
    await axios.post(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_API_URL}/api/cart/items`, 
      {
      productId: id,
      qty,
    });

    dispatch(fetchCart());

  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to add item"
      )
    );
  }
};

/**
 * Update quantity (SET qty, not increment)
 */
export const updateCartQuantity = ({ productId, qty }) => async (dispatch) => {
  try {
    dispatch(cartLoading());

    const id =
      typeof productId === "object" ? productId._id : productId;

    await axios.patch(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_API_URL}/api/cart/items/${id}`,
      { qty },
      { withCredentials: true }
    );

    dispatch(fetchCart());

  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to update quantity"
      )
    );
  }
};

/**
 * Remove item
 */
export const removeItemFromCart = (productId) => async (dispatch) => {
  try {
    dispatch(cartLoading());

    const id =
      typeof productId === "object" ? productId._id : productId;

    await axios.delete(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_API_URL}/api/cart/items/${id}`,
      { withCredentials: true }
    );

    dispatch(fetchCart());

  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to remove item"
      )
    );
  }
};

/**
 * Clear cart
 */
export const clearCart = () => async (dispatch) => {
  try {
    dispatch(cartLoading());

    await axios.delete(
      `${process.env.NEXT_PUBLIC_CART_SERVICE_API_URL}/api/cart`,
      { withCredentials: true }
    );

    dispatch(cartCleared());

  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to clear cart"
      )
    );
  }
};