import { productActions } from "./products-slice";

const fetchProductsData = () => {
  return async function (dispatch) {
    const fetchData = async () => {
      const response = await fetch(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch products at the moment!");
      }
      return await response.json();
    };

    try {
      const data = await fetchData();

      dispatch(productActions.saveProductsListToStore(data));
    } catch (e) {
      dispatch(productActions.setFetchError());
      //   console.log(e);
    }
  };
};

export default fetchProductsData;
