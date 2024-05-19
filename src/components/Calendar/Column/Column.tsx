import React, { useEffect, useState } from "react";
import styles from "./Column.module.scss";
import type { ColumnProps } from "./Column.types";

import { format, getDate, getMonth, getYear } from "date-fns";
import Row from "../Row/Row";

const Column: React.FC<ColumnProps> = ({
  date,
  dateId,
  hours,
  addTime,
  deleteTime,
}) => {
  const weekDayName = format(date, "EEEE");
  //   const [hours, setHours] = useState<{ id: string; time: Date }[]>([]);
  const [showAddButton, setShowAddButton] = useState(false);
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
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => setShowAddButton(false)}
    >
      <div className={styles.columnHead}>
        <p>{weekDayName}</p>

        <span>{`${getDate(date)}.${getMonth(date)}.${getYear(date)}`}</span>
      </div>

      <div className={styles.columnBody}>
        {hours.map(({ time, timeId }) => (
          <Row
            mode="displayTime"
            time={time}
            key={timeId}
            timeId={timeId}
            deleteTime={deleteTimeHandler}
          />
        ))}

        {showAddButton && !maxBookedHoursReached && (
          <Row mode="addTime" addTime={addTimeHandler} />
        )}
      </div>
    </div>
  );
};

export default Column;
