import React from "react";
import styles from "./DatePicker.module.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";

import { DatePickerProps } from "./DatePicker.types";
import dayjs from "dayjs";

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  value,
  setDate,
  disabled,
  className,
  minDate,
}) => {
  return (
    <div className={styles.datePicker}>
      <h2>{title}</h2>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePickerMui
            onChange={(date: any) => setDate(new Date(date))}
            disabled={disabled}
            format="DD/MM/YYYY"
            className={className}
            disablePast
            minDate={dayjs(minDate)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
