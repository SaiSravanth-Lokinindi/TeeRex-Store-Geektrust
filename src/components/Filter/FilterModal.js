import Modal from "../UI/Modal";
import Filter from "./Filter";

import classes from "./FilterModal.module.css";

const FilterModal = (props) => {
  const content = (
    <div className={classes.filter__modalcontent}>
      <Filter />
      <button className={classes.filter__closebtn} onClick={props.onClose}>
        Apply filters
      </button>
    </div>
  );

  return <Modal onClose={props.onClose}>{content}</Modal>;
};

export default FilterModal;
