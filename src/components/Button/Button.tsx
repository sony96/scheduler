import React from "react";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";
import clsx from "clsx";
import { BUTTON_TYPE } from "../../App.constants";

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        styles.button,
        disabled && styles["button--disabled"],
        type === BUTTON_TYPE.RESET && styles["button--reset"],
        type === BUTTON_TYPE.AUTOCOMPLETE && styles["button--autocomplete"],
        type === BUTTON_TYPE.UPLOAD && styles["button--upload"]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
