import React from "react";
import styles from "./Calendar.module.scss";
import type { CalendarProps } from "./Calendar.types";

import Column from "./Column";

const Calendar: React.FC<CalendarProps> = ({ dates }) => {
  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        {dates.map((date) => (
          <Column date={date} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
