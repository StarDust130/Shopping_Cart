import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    increaseQuantity: (state, { payload }) => {
      const item = state.products.find((item) => item.name === payload.name);
      item.quantity++;
    },
    decreaseQuantity: (state, { payload }) => {
      const item = state.products.find((item) => item.name === payload.name);
      item.quantity = item.quantity === 0 ? 0 : item.quantity - 1;
    },

    removeItem: (state, { payload }) => {
      const products = state.products.filter(
        (item) => item.name !== payload.name
      );
      state.products = products;
    },
    updateTotal: (state) => {
      let total = 0;
      let quantity = 0;

      state.products.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });

      state.total = total;
      state.quantity = quantity;
    },
    addtoCart: (state, { payload }) => {
      const item = state.products.find((item) => item.name === payload.name);
      if (item) {
        item.quantity++;
      } else {
        state.products.push({ ...payload, quantity: 1 });
      }
    },
    deleteAll: (state) => {
      state.products = [];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default shoppingSlice.reducer;
export const {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  updateTotal,
  addtoCart,
  deleteAll,
  setProducts,
} = shoppingSlice.actions;

export const shoppingActions = shoppingSlice.actions;
