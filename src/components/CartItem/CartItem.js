import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const deleteProductHandler = (id) => {
    dispatch(cartActions.deleteProductFromCart(id));
  };

  const addItemHandler = (product) => {
    dispatch(cartActions.addTocart(product));
  };
  const removeItemHandler = (product) => {
    dispatch(cartActions.removeFromCart(product));
  };

  return (
    <div className={classes.cart__item}>
      <img
        src={product.imageURL}
        alt={product.name}
        loading="lazy"
        height={"55px"}
        width={"55px"}
      />
      <div className={classes.item__details}>
        <section>{product.name}</section>
        <section>{product.price}</section>
      </div>
      <div className={classes.cart__actions}>
        <button
          onClick={() => {
            removeItemHandler(product);
          }}
        >
          -
        </button>
        <span>{product.quantity}</span>
        <button onClick={() => addItemHandler(product)}>+</button>
      </div>
      <button
        className={classes.del__btn}
        onClick={() => deleteProductHandler(product.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default CartItem;
