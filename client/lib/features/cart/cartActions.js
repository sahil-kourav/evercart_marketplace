import axios from "axios";
import {
  cartLoading,
  cartLoaded,
  cartError,
  cartCleared,
} from "./cartSlice";

const BASE_URL = "http://localhost:8082/api/cart";

// axios instance (recommended)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookies (httpOnly refresh token)
});

/**
 * Fetch full cart from backend
 */
export const fetchCart = () => async (dispatch) => {
  try {
    dispatch(cartLoading());

    const res = await api.get("/"); // GET /api/cart
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
 * Add item to cart
 */
export const addItemToCart = (productId) => async (dispatch) => {
  try {
    dispatch(cartLoading());

    await api.post("/items", { productId }); // POST /api/cart/items

    // reload cart
    dispatch(fetchCart());
  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to add item to cart"
      )
    );
  }
};

/**
 * Update item quantity
 */
export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  try {
    dispatch(cartLoading());

    await api.patch(`/items/${productId}`, { quantity }); 
    // PATCH /api/cart/items/:productId

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
 * Remove item from cart
 */
export const removeItemFromCart = (productId) => async (dispatch) => {
  try {
    dispatch(cartLoading());

    await api.delete(`/items/${productId}`); 
    // DELETE /api/cart/items/:productId

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
 * Clear entire cart
 */
export const clearCart = () => async (dispatch) => {
  try {
    dispatch(cartLoading());

    await api.delete("/"); // DELETE /api/cart

    dispatch(cartCleared());
  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to clear cart"
      )
    );
  }
};
