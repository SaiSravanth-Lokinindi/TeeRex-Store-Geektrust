import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  cartQuantity: 0,
  cartPrice: 0,
  stockLimitError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addTocart(state, action) {
      const product = action.payload;
      const cartItem = state.items.find((item) => item.id === product.id);

      if (cartItem && cartItem.maxQuantity <= cartItem.quantity) {
        state.stockLimitError = true;
        return;
      }
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.items.push({
          id: product.id,
          imageURL: product.imageURL,
          name: product.name,
          price: product.price,
          quantity: 1,
          maxQuantity: product.quantity,
        });
      }
      state.stockLimitError = false;

      state.cartQuantity++;
      state.cartPrice = state.cartPrice + product.price;
    },

    removeFromCart(state, action) {
      const product = action.payload;
      const cartItem = state.items.find((item) => item.id === product.id);

      if (cartItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        cartItem.quantity--;
      }
      state.cartQuantity--;
      state.cartPrice = state.cartPrice - product.price;
    },

    deleteProductFromCart(state, action) {
      let cartItem;
      state.items = state.items.filter((item) => {
        if (item.id === action.payload) {
          cartItem = item;
        }
        return item.id !== action.payload;
      });
      state.cartQuantity = state.cartQuantity - cartItem.quantity;
      state.cartPrice = state.cartPrice - cartItem.price * cartItem.quantity;
    },

    setHasStockError(state, payload) {
      state.stockLimitError = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
