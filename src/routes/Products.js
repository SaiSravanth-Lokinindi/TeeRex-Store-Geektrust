import { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search/Search";
import fetchProductsData from "../store/products/products-actions";
import classes from "./Products.module.css";

const Filter = lazy(() => import("../components/Filter/Filter"));
const ProductItem = lazy(() => import("../components/ProductItem/ProductItem"));

const Products = (props) => {
  const dispatch = useDispatch();
  const [revealFilter, setRevealFilter] = useState(false);

  const fetchedProducts = useSelector(
    (state) => state.products.fetchedProducts
  );

  const hasError = useSelector((state) => state.products.fetchError);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  return (
    <>
      <Search setRevealClass={() => setRevealFilter(true)} />

      {hasError && (
        <p style={{ width: "fit-content", margin: "0 auto" }}>
          Unable to fetch products at the moment, try again later!
        </p>
      )}

      {!hasError && (
        <main className={classes.main}>
          <Suspense
            fallback={<div className={classes.loading}>Loading...</div>}
          >
            <div
              className={`${classes.filter__hider} ${
                classes.filter__container
              } ${!revealFilter ? "" : classes.reveal__filter__overlay}`}
              onClick={() => setRevealFilter(false)}
            >
              <Filter />
            </div>
            {fetchedProducts.length === 0 ? (
              <p className={classes.info}>
                No matching products! Try removing filters or smaller search
                word.
              </p>
            ) : (
              <div className={classes.products}>
                {fetchedProducts.map((product) => {
                  return <ProductItem key={product.id} product={product} />;
                })}
              </div>
            )}
          </Suspense>
        </main>
      )}
    </>
  );
};

export default Products;
