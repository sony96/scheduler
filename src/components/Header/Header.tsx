import React, { useCallback, useState } from "react";
import styles from "./Header.module.scss";
import type { HeaderProps, DateHandler } from "./Header.types";
import { DATE_TYPE } from "./Header.constants";
import { isAfter } from "date-fns";

import DatePicker from "../DatePicker";
import LeftArrow from "../../assets/chevron-left.svg";
import RightArrow from "../../assets/chevron-right.svg";
import clsx from "clsx";
import { SCROLL_DIRECTION } from "../../App.constants";

const Header: React.FC<HeaderProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onScroll,
  daysCount,
  disableLeftArrow,
  disableRightArrow,
}) => {
  const [error, setError] = useState("");

  const handleDate: DateHandler = useCallback(
    (date, type) => {
      !!error && setError("");

      if (type === DATE_TYPE.START) {
        if (endDate && isAfter(date, endDate)) {
          setError(`Error: Start Date is after End Date`);

          return;
        }

        setStartDate(date);
      }

      if (type === DATE_TYPE.END) {
        setEndDate(date);
      }
    },
    [startDate, endDate]
  );

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <h1>Create new Schedule</h1>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.datePickers}>
          <DatePicker
            value={startDate}
            className={styles.picker}
            title="Start-Date"
            setDate={(date) => {
              handleDate(date, DATE_TYPE.START);
            }}
          />

          <DatePicker
            value={endDate}
            className={styles.picker}
            title="End-Date"
            setDate={(date) => handleDate(date, DATE_TYPE.END)}
            minDate={startDate}
          />

          <p className={styles.daysCounter}>{`${daysCount} days`}</p>
        </div>

        {(!disableLeftArrow || !disableRightArrow) && (
          <div className={styles.actions}>
            <button
              disabled={disableLeftArrow}
              onClick={() => onScroll(SCROLL_DIRECTION.LEFT)}
            >
              <img
                src={LeftArrow}
                alt="left arrow"
                className={clsx(
                  styles.arrow,
                  disableLeftArrow && styles["arrow--inactive"]
                )}
              />
            </button>

            <button
              disabled={disableRightArrow}
              onClick={() => onScroll(SCROLL_DIRECTION.RIGHT)}
            >
              <img
                src={RightArrow}
                alt="right arrow"
                className={clsx(
                  styles.arrow,
                  disableRightArrow && styles["arrow--inactive"]
                )}
              />
            </button>
          </div>
        )}
      </div>

      {!!error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Header;
