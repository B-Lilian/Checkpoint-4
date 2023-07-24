import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

function Modal({ onClose, children }) {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-content"]}>
        <button
          className={styles["close-button"]}
          type="button"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
