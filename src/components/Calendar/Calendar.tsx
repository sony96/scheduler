import React, { forwardRef } from "react";
import styles from "./Calendar.module.scss";
import type { CalendarProps } from "./Calendar.types";

import Column from "./Column";

const Calendar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarProps
> = ({ dates, addTime, deleteTime }, ref) => {
  return (
    <div className={styles.calendarWrapper} ref={ref}>
      <div className={styles.calendar}>
        {dates.map(({ date, dateId, hours, type }) => (
          <Column
            key={dateId}
            date={date}
            dateId={dateId}
            hours={hours}
            type={type}
            addTime={addTime}
            deleteTime={deleteTime}
          />
        ))}
      </div>
    </div>
  );
};

export default forwardRef(Calendar);
