import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/products-slice";
import cartReducer from "./cart/cart-slice";

const store = configureStore({
  reducer: { cart: cartReducer, products: productsReducer },
});

export default store;
