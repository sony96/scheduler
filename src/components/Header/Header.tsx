import React, { useState } from "react";
import styles from "./Header.module.scss";
import { HeaderProps, DateHandler, DATE_TYPE } from "./Header.types";

import { isAfter, isBefore } from "date-fns";

import DatePicker from "../DatePicker";

const Header: React.FC<HeaderProps> = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");

  const handleDate: DateHandler = (date, type) => {
    if (type === DATE_TYPE.START) {
      if (endDate && isAfter(date, endDate)) {
        setError("Start Date is After End Date!");

        return;
      }

      setStartDate(date);
    }

    if (type === DATE_TYPE.END) {
      if (endDate && isBefore(date, startDate)) {
        setError("End Date is Before Start Date!");
        return;
      }

      setEndDate(date);
    }

    !!error && setError("");
  };

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
      </div>

      {!!error && <p>{error}</p>}
    </div>
  );
};

export default Header;
