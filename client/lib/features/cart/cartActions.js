import axios from "axios";
import {
  cartLoading,
  cartLoaded,
  cartError,
  cartCleared,
} from "./cartSlice";

const BASE_URL = "http://localhost:8082/api/cart";

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

    const res = await api.get("/");
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

    await api.post("/items", {
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

    await api.patch(`/items/${id}`, { qty });

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

    await api.delete(`/items/${id}`);

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

    await api.delete("/");

    dispatch(cartCleared());

  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message || "Failed to clear cart"
      )
    );
  }
};