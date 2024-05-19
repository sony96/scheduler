import React from "react";
import styles from "./Calendar.module.scss";
import type { CalendarProps } from "./Calendar.types";

import Column from "./Column";

const Calendar: React.FC<CalendarProps> = ({ dates, addTime, deleteTime }) => {
  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        {dates.map(({ date, dateId, hours }) => (
          <Column
            date={date}
            dateId={dateId}
            hours={hours}
            addTime={addTime}
            deleteTime={deleteTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
