import React, { useEffect, useState } from "react";
import styles from "./Column.module.scss";
import type { ColumnProps } from "./Column.types";

import { format, getDate, getMonth, getYear } from "date-fns";
import Row from "../Row/Row";
import clsx from "clsx";
import { DATE_AUTOCOMPLETE_TYPE } from "../../../App.constants";

const Column: React.FC<ColumnProps> = ({
  date,
  dateId,
  hours,
  type,
  addTime,
  deleteTime,
}) => {
  const weekDayName = format(date, "EEEE");
  const [columnHover, setColumnHover] = useState(false);
  const [maxBookedHoursReached, setMaxBookedHoursReached] = useState(false);

  useEffect(() => {
    hours.length === 4
      ? setMaxBookedHoursReached(true)
      : setMaxBookedHoursReached(false);
  }, [hours]);

  const addTimeHandler = () => {
    addTime(dateId);
  };

  const deleteTimeHandler = (timeId: string) => {
    deleteTime(dateId, timeId);
  };

  const isColumnInCopyMode = !!type && type === DATE_AUTOCOMPLETE_TYPE.COPY;

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
          !!type && styles["columnBody--copyMode"],
          columnHover && styles["columnBody--hover"]
        )}
      >
        {hours.map(({ time, timeId }) => (
          <Row
            mode="displayTime"
            time={time}
            key={timeId}
            timeId={timeId}
            copyMode={isColumnInCopyMode}
            deleteTime={deleteTimeHandler}
          />
        ))}

        {columnHover && !maxBookedHoursReached && (
          <Row mode="addTime" addTime={addTimeHandler} />
        )}
      </div>
      {!!type && <p className={styles.copyType}>{type}</p>}
    </div>
  );
};

export default Column;
