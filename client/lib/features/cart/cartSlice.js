import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,        // backend cart (source of truth)
  cartItems: {},     // quick lookup { productId: qty }
  totalQuantity: 0,  // total items count
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartLoading: (state) => {
      state.loading = true;
      state.error = null;
    },


    cartLoaded: (state, action) => {
      state.loading = false;

      const cartData = action.payload.cart;
      state.cart = cartData;

      const itemsMap = {};
      let totalQty = 0;

      cartData?.items?.forEach((item) => {
        const id =
          typeof item.productId === "object"
            ? item.productId._id
            : item.productId;

        itemsMap[id] = item.quantity;
        totalQty += item.quantity;
      });

      state.cartItems = itemsMap;
      state.totalQuantity = totalQty;
    },

    cartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    cartCleared: (state) => {
      state.cart = null;
      state.cartItems = {};
      state.totalQuantity = 0;
      state.loading = false;
    },

    /**
     * 🔥 Optimistic update (fast UI)
     */
    updateCartItem: (state, action) => {
      const { productId, qty } = action.payload;

      if (qty <= 0) {
        delete state.cartItems[productId];
      } else {
        state.cartItems[productId] = qty;
      }

      // recalc total
      state.totalQuantity = Object.values(state.cartItems).reduce(
        (acc, val) => acc + val,
        0
      );
    },
  },
});

export const {
  cartLoading,
  cartLoaded,
  cartError,
  cartCleared,
  updateCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;