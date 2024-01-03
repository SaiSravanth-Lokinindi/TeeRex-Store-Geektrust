import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header/Header";
import classes from "./RootLayout.module.css";
import { useEffect } from "react";
import { cartActions } from "../store/cart/cart-slice";
import { MdError } from "react-icons/md";

const RootLayout = () => {
  const dispatch = useDispatch();
  const hasStockError = useSelector((state) => state.cart.stockLimitError);

  const StockErrorInfo = () => {
    return (
      <div className={classes.stock__error} key={hasStockError}>
        <MdError fill="red" fontSize={"30px"} />
        <p>Stock exhausted!</p>
      </div>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasStockError) {
        dispatch(cartActions.setHasStockError(false));
      }
    }, 3800);

    return () => clearTimeout(timer);
  }, [dispatch, hasStockError]);

  return (
    <>
      <Header />
      {hasStockError && <StockErrorInfo />}
      <Outlet />
    </>
  );
};

export default RootLayout;
