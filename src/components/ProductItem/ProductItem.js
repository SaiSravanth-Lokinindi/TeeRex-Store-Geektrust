import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart/cart-slice";

import classes from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const productAddHandler = (product) => {
    dispatch(cartActions.addTocart(product));
  };

  return (
    <div className={classes.product__container}>
      <img alt={product.name} src={product.imageURL} loading="lazy" />
      <div className={classes.product__details}>
        <div className={classes.product__name}>{product.name}</div>

        <strong>&#8377; {product.price}</strong>
        <span>
          <button
            className={classes.add__cart__btn}
            onClick={() => productAddHandler(product)}
          >
            Add to cart
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
