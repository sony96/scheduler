import React, { useCallback, useState } from "react";
import styles from "./Header.module.scss";
import type { HeaderProps, DateHandler } from "./Header.types";
import { DATE_TYPE } from "./Header.constants";

import { isAfter, isBefore } from "date-fns";

import DatePicker from "../DatePicker";

const Header: React.FC<HeaderProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  daysCount,
}) => {
  const [error, setError] = useState("");

  const handleDate: DateHandler = useCallback(
    (date, type) => {
      !!error && setError("");

      if (type === DATE_TYPE.START) {
        if (endDate && isAfter(date, endDate)) {
          setError("Error: Start Date is after End Date!");

          return;
        }

        setStartDate(date);
      }

      if (type === DATE_TYPE.END) {
        if (startDate && isBefore(date, startDate)) {
          setError("Error: End Date is before Start Date!");
          return;
        }

        setEndDate(date);
      }
    },
    [startDate, endDate]
  );

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>Create new Schledule</h1>
      </div>

      <div className={styles.datePickers}>
        <DatePicker
          className={styles.picker}
          title="Start-Date"
          setDate={(date) => {
            handleDate(date, DATE_TYPE.START);
          }}
        />

        <DatePicker
          className={styles.picker}
          title="End-Date"
          setDate={(date) => handleDate(date, DATE_TYPE.END)}
          disabled={!startDate}
        />

        <p className={styles.daysCounter}>{`${daysCount} days`}</p>
      </div>

      {!!error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Header;
