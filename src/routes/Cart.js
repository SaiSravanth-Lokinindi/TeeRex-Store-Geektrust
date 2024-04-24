import { useSelector } from "react-redux";
import CartItem from "../components/CartItem/CartItem";
import classes from "./Cart.module.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  let content;

  if (cart.items.length > 0) {
    content = cart.items.map((item) => {
      return <CartItem key={item.id} product={item} />;
    });
  }

  return (
    <main className={classes.cart__main}>
      <div className={classes.cart__container}>
        {cart.items.length > 0 ? (
          <>
            <div className={classes.items__container}>{content}</div>
            <div className={classes.cart__total}>
              <strong>Total Amount</strong>
              <span className={classes.cart__checkout}>
                &#8377;{cart.cartPrice}
                <button className={classes.checkout__btn}>Checkout</button>
              </span>
            </div>
          </>
        ) : (
          <h3 className={classes.cart__info}>
            No items in cart! Try adding some.
          </h3>
        )}
      </div>
    </main>
  );
};

export default Cart;
