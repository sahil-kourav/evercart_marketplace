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


export const addItemToCart =
  ({ productId, qty = 1 }) =>
  async (dispatch) => {
    try {
      dispatch(cartLoading());

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


export const updateCartQuantity =
  ({ productId, qty }) =>
  async (dispatch) => {
    try {
      dispatch(cartLoading());

      const id =
        typeof productId === "object" ? productId._id : productId;

      await api.patch(`/items/${id}`, { qty });

      dispatch(fetchCart());

    } catch (error) {
      dispatch(
        cartError(
          error.response?.data?.message ||
            "Failed to update quantity"
        )
      );
    }
  };


export const removeItemFromCart =
  (productId) => async (dispatch) => {
    try {
      dispatch(cartLoading());

      const id =
        typeof productId === "object" ? productId._id : productId;

      await api.delete(`/items/${id}`);

      dispatch(fetchCart());

    } catch (error) {
      dispatch(
        cartError(
          error.response?.data?.message ||
            "Failed to remove item"
        )
      );
    }
  };


export const clearCart = () => async (dispatch) => {
  try {
    dispatch(cartLoading());

    await api.delete("/");

    dispatch(cartCleared());

  } catch (error) {
    dispatch(
      cartError(
        error.response?.data?.message ||
          "Failed to clear cart"
      )
    );
  }
};