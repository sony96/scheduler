import React, { useEffect, useState } from "react";
import styles from "./Column.module.scss";
import type { ColumnProps } from "./Column.types";

import { format, getDate, getMonth, getYear } from "date-fns";
import Row from "../Row/Row";
import clsx from "clsx";

const Column: React.FC<ColumnProps> = ({
  date,
  dateId,
  hours,
  addTime,
  deleteTime,
}) => {
  const weekDayName = format(date, "EEEE");
  const [columnHover, setColumnHover] = useState(false);
  const [maxBookedHoursReached, setMaxBookedHoursReached] = useState(false);

  useEffect(() => {
    hours.length === 5
      ? setMaxBookedHoursReached(true)
      : setMaxBookedHoursReached(false);
  }, [hours]);

  const addTimeHandler = () => {
    addTime(dateId);
  };

  const deleteTimeHandler = (timeId: string) => {
    deleteTime(dateId, timeId);
  };

  return (
    <div
      className={styles.column}
      onMouseEnter={() => setColumnHover(true)}
      onMouseLeave={() => setColumnHover(false)}
    >
      <div className={styles.columnHead}>
        <p>{weekDayName}</p>

        <span>{`${getDate(date)}.${getMonth(date)}.${getYear(date)}`}</span>
      </div>

      <div
        className={clsx(
          styles.columnBody,
          columnHover && styles["columnBody--hover"]
        )}
      >
        {hours.map(({ time, timeId }) => (
          <Row
            mode="displayTime"
            time={time}
            key={timeId}
            timeId={timeId}
            deleteTime={deleteTimeHandler}
          />
        ))}

        {columnHover && !maxBookedHoursReached && (
          <Row mode="addTime" addTime={addTimeHandler} />
        )}
      </div>
    </div>
  );
};

export default Column;
