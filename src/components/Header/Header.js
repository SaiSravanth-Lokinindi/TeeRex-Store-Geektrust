import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import classes from "./Header.module.css";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  return (
    <div className={classes.header}>
      <h2 className={classes.site__name}>TeeRex Store</h2>

      <section className={`${classes.header__nav}`}>
        <NavLink
          to="/"
          style={{ marginTop: "5px" }}
          className={({ isActive }) =>
            isActive ? `${classes.active__route}` : `${classes.route}`
          }
        >
          <strong>Products</strong>
        </NavLink>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${classes.active__route}` : `${classes.route}`
            }
          >
            <FaShoppingCart
              style={{
                outline: "white",
                fill: "solid",
                fontSize: "30px",
              }}
            />
            <div
              className={`${classes.cartCount} ${classes.animate}`}
              key={cartQuantity}
            >
              {cartQuantity}
            </div>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Header;
