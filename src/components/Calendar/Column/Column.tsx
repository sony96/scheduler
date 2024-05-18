import React, { useState } from "react";
import styles from "./Column.module.scss";
import type { ColumnProps } from "./Column.types";

import {
  format,
  getDate,
  getMonth,
  getYear,
  setHours as setHoursFNS,
  addHours,
  getHours,
} from "date-fns";
import Row from "../Row/Row";

const Column: React.FC<ColumnProps> = ({ date }) => {
  const weekDayName = format(date, "EEEE");
  const [hours, setHours] = useState<{ id: string; time: Date }[]>([]);

  const addTimeHandler = () => {
    if (!hours.length) {
      setHours([{ id: crypto.randomUUID(), time: setHoursFNS(date, 9) }]);
      return;
    }

    const hoursCopy = [...hours];
    const latestHour = hours.at(-1)!.time;
    const latestHourFormatted = format(latestHour, "HH:mm");

    if (latestHourFormatted === "00:00") {
      return;
    }

    const incrementedHour = addHours(
      latestHour,
      +latestHourFormatted.split(":")[0] < 12 ? 3 : 4
    );

    hoursCopy.push({
      id: crypto.randomUUID(),
      time: incrementedHour,
    });

    setHours(hoursCopy);
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHead}>
        <p>{weekDayName}</p>

        <span>{`${getDate(date)}.${getMonth(date)}.${getYear(date)}`}</span>
      </div>

      <div className={styles.columnBody}>
        {hours.map(({ time, id }) => (
          <Row mode="displayTime" time={time} key={id} />
        ))}

        <Row mode="addTime" onAddTime={addTimeHandler} />
      </div>
    </div>
  );
};

export default Column;
