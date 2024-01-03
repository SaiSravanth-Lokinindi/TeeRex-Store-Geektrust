import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../store/products/products-slice";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

import classes from "./Search.module.css";

const Search = (props) => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const searchHandler = (event) => {
    event.preventDefault();
    setSearchTerm(searchRef.current.value.trim());
  };

  useEffect(() => {
    if (searchTerm === null) return;
    const timer = setTimeout(() => {
      dispatch(productActions.searchProducts(searchTerm.toLowerCase()));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const showFilter = () => {
    props.setRevealClass();
  };

  return (
    <>
      <div className={classes.search__container}>
        <input
          className={`${classes.sticky} ${classes.search} ${classes.lift}`}
          onChange={searchHandler}
          placeholder="Search for products..."
          ref={searchRef}
        />
        <button
          title="search"
          className={`${classes.search__btn} ${classes.lift} search-button-container`}
          onClick={searchHandler}
        >
          <FaSearch />
        </button>
        <button title="filter" className={classes.filter} onClick={showFilter}>
          <FaFilter />
        </button>
      </div>
    </>
  );
};

export default Search;
