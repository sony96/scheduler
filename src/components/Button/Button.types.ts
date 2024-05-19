import React from "react";
import { BUTTON_TYPE } from "../../App.constants";

export type ButtonProps = {
  children: React.ReactNode;
  type: BUTTON_TYPE;
  disabled?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
