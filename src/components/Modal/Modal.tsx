import React from "react";
import styles from "./Modal.module.scss";
import type { ModalProps } from "./Modal.types";

const Modal: React.FC<ModalProps> = ({
  onClose,
  onConfirm,
  message,
  buttonText,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
        <h2>{message}</h2>

        <button onClick={onConfirm}>{buttonText}</button>

        <p>Please check console for .json data :)</p>
      </div>
    </div>
  );
};

export default Modal;
