import React from "react";
import type { RowProps } from "./Row.types";
import styles from "./Row.module.scss";
import { MODE } from "./Row.constatnts";
import { format } from "date-fns";

const Row: React.FC<RowProps> = ({
  mode = MODE.DISPLAY,
  time,
  onAddTime,
  onDeletetime,
}) => {
  return (
    <>
      {mode === MODE.ADD && (
        <button className={styles.row} onClick={onAddTime}>
          <span>Add Time</span>
        </button>
      )}

      {mode === MODE.DISPLAY && (
        <div className={styles.row}>
          <span>{format(time || "", "HH:mm")}</span>
        </div>
      )}
    </>
  );
};

export default Row;
