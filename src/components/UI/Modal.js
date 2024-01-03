import { createPortal } from "react-dom";

import classes from "./Modal.module.css";
import { Fragment } from "react";

const ModalOverlay = (props) => {
  return <div className={classes.overlay} onClick={props.onClose}></div>;
};

const ModalContent = (props) => {
  return (
    <div className={classes.modal}>
      {/* <div className={classes.modal__content}>{props.children}</div> */}
      <>{props.children}</>
    </div>
  );
};

const portalHelperElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <ModalOverlay onClose={props.onClose} />,
        portalHelperElement
      )}

      {createPortal(
        <ModalContent>{props.children}</ModalContent>,
        portalHelperElement
      )}
    </Fragment>
  );
};

export default Modal;
