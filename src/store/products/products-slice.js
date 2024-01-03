import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  products: [],
  fetchError: false,

  fetchedProducts: [],

  searchedProducts: [],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    saveProductsListToStore(state, action) {
      state.products = action.payload;
      state.fetchedProducts = action.payload;
      state.searchedProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    setFetchError(state) {
      state.fetchError = true;
    },

    searchProducts(state, action) {
      const searchTerm = action.payload;

      if (searchTerm === "") {
        state.fetchedProducts = state.filteredProducts;
        state.searchedProducts = state.products;
      } else {
        const fetchedProducts = state.filteredProducts.filter((product) => {
          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm) ||
            product.color.toLowerCase().includes(searchTerm)
          );
        });
        const onlySearchedProducts = state.products.filter((product) => {
          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm) ||
            product.color.toLowerCase().includes(searchTerm)
          );
        });
        state.fetchedProducts = fetchedProducts;
        state.searchedProducts = onlySearchedProducts;
      }
    },

    filterProducts(state, action) {
      const { colors, genders, prices, types } = action.payload.filters;
      let filteredProducts;
      let onlyFilteredProducts;
      let searchedProducts = state.searchedProducts;

      if (
        colors.length === 0 &&
        genders.length === 0 &&
        types.length === 0 &&
        prices.length === 0
      ) {
        state.fetchedProducts = searchedProducts;
        state.filteredProducts = state.products;
        return;
      } else {
        filteredProducts = searchedProducts.filter((product) => {
          let pricesCondition =
            prices.length === 0 ||
            prices.some((priceRange) => {
              let price = priceRange.split("-");
              return (
                product.price <= parseInt(price[1]) &&
                product.price >= parseInt(price[0])
              );
            });

          if (
            pricesCondition &&
            (colors.length === 0 || colors.indexOf(product.color) !== -1) &&
            (genders.length === 0 || genders.indexOf(product.gender) !== -1) &&
            (types.length === 0 || types.indexOf(product.type) !== -1)
          ) {
            return true;
          } else {
            return false;
          }
        });
      }

      if (searchedProducts.length !== state.products.length) {
        onlyFilteredProducts = state.products.filter((product) => {
          let pricesCondition =
            prices.length === 0 ||
            prices.some((priceRange) => {
              let price = priceRange.split("-");
              return (
                product.price <= parseInt(price[1]) &&
                product.price >= parseInt(price[0])
              );
            });

          if (
            pricesCondition &&
            (colors.length === 0 || colors.indexOf(product.color) !== -1) &&
            (genders.length === 0 || genders.indexOf(product.gender) !== -1) &&
            (types.length === 0 || types.indexOf(product.type) !== -1)
          ) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        onlyFilteredProducts = filteredProducts;
      }

      state.fetchedProducts = filteredProducts;
      state.filteredProducts = onlyFilteredProducts;
    },
  },
});

export const productActions = productsSlice.actions;

export default productsSlice.reducer;
