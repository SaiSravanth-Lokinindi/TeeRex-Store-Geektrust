import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/products/products-slice";

import classes from "./Filter.module.css";

const Filter = () => {
  const initialSelectedFilters = {
    colors: [],
    genders: [],
    prices: [],
    types: [],
  };

  const p = useSelector((state) => state.products);
  const products = useMemo(() => p.products, [p.products]);
  const dispatch = useDispatch();
  const [filtersSelected, setFiltersSelected] = useState(
    initialSelectedFilters
  );

  let typeFilter = [],
    colorFilter = [],
    tempColors = [],
    tempTypes = [];

  const filterChangeHandler = (event) => {
    let currState = filtersSelected;
    // let currState = initialSelectedFilters;
    const category = event.target.name; // colors, types, genders, prices

    if (event.target.checked) {
      currState[category].push(event.target.value);
    } else {
      let newFilters = currState[category].filter((item) => {
        return item !== event.target.value;
      });
      currState[category] = newFilters;
    }

    setFiltersSelected(currState);

    dispatch(productActions.filterProducts({ filters: currState }));
  };

  products.forEach((product) => {
    if (tempColors.indexOf(product.color) === -1) {
      colorFilter.push(
        <label
          key={`color-${product.color}`}
          htmlFor={`color-${product.color}`}
        >
          <input
            type="checkbox"
            id={`color-${product.color}`}
            name="colors"
            value={`${product.color}`}
            onChange={filterChangeHandler}
          />{" "}
          {product.color}
        </label>
      );
      tempColors.push(product.color);
    }

    if (tempTypes.indexOf(product.type) === -1) {
      typeFilter.push(
        <label key={`type-${product.type}`} htmlFor={`type-${product.type}`}>
          <input
            type="checkbox"
            name="types"
            id={`type-${product.type}`}
            value={`${product.type}`}
            onChange={filterChangeHandler}
          />{" "}
          {product.type}
        </label>
      );
      tempTypes.push(product.type);
    }
  });

  return (
    <div
      className={`${classes.filter}`}
      onClick={(event) => event.stopPropagation()}
    >
      <section
        className={`${classes.filter__actions} ${classes.color__filters}`}
      >
        <strong className={classes.filter__cat}>Color</strong>
        {colorFilter}
      </section>
      <section className={classes.filter__actions}>
        <strong>Gender</strong>
        <label htmlFor={`gender-men`}>
          <input
            type="checkbox"
            id={`gender-men`}
            name="genders"
            value="Men"
            onChange={filterChangeHandler}
          />{" "}
          Men
        </label>
        <label htmlFor={`gender-women`}>
          <input
            type="checkbox"
            id={`gender-women`}
            name="genders"
            value="Women"
            onChange={filterChangeHandler}
          />{" "}
          Women
        </label>
      </section>
      <section className={classes.filter__actions}>
        <strong>Price</strong>
        <label htmlFor={`price-0-250`}>
          <input
            type="checkbox"
            id={`price-0-250`}
            name="prices"
            value="0-250"
            onChange={filterChangeHandler}
          />{" "}
          Rs 0 - 250
        </label>
        <label htmlFor={`price-251-450`}>
          <input
            type="checkbox"
            id={`price-251-450`}
            name="prices"
            value="251-450"
            onChange={filterChangeHandler}
          />{" "}
          Rs 251 - 450
        </label>
        <label htmlFor={`price-450`}>
          <input
            type="checkbox"
            id={`price-450`}
            name="prices"
            value="450-999999"
            onChange={filterChangeHandler}
          />{" "}
          Rs 450 and above
        </label>
      </section>
      <section className={classes.filter__actions}>
        <strong>Type</strong>
        {typeFilter}
      </section>
    </div>
  );
};

export default Filter;
