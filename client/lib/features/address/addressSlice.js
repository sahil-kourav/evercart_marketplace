import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {
    setAddresses: (state, action) => {
      state.list = action.payload;
    },

    addAddress: (state, action) => {
      state.list.push(action.payload);
    },

    removeAddress: (state, action) => {
      state.list = state.list.filter(
        (addr) => addr._id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAddresses,
  addAddress,
  removeAddress,
  setLoading,
  setError,
} = addressSlice.actions;

export default addressSlice.reducer;