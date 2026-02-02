// import { createSlice } from '@reduxjs/toolkit'

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         total: 0,
//         cartItems: {},
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const { productId } = action.payload
//             if (state.cartItems[productId]) {
//                 state.cartItems[productId]++
//             } else {
//                 state.cartItems[productId] = 1
//             }
//             state.total += 1
//         },
//         removeFromCart: (state, action) => {
//             const { productId } = action.payload
//             if (state.cartItems[productId]) {
//                 state.cartItems[productId]--
//                 if (state.cartItems[productId] === 0) {
//                     delete state.cartItems[productId]
//                 }
//             }
//             state.total -= 1
//         },
//         deleteItemFromCart: (state, action) => {
//             const { productId } = action.payload
//             state.total -= state.cartItems[productId] ? state.cartItems[productId] : 0
//             delete state.cartItems[productId]
//         },
//         clearCart: (state) => {
//             state.cartItems = {}
//             state.total = 0
//         },
//     }
// })

// export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } = cartSlice.actions

// export default cartSlice.reducer







import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,       // backend cart
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartLoading: (state) => {
      state.loading = true;
    },

    cartLoaded: (state, action) => {
      state.cart = action.payload;   // full backend cart
      state.loading = false;
      state.error = null;
    },

    cartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    cartCleared: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  cartLoading,
  cartLoaded,
  cartError,
  cartCleared,
} = cartSlice.actions;

export default cartSlice.reducer;
