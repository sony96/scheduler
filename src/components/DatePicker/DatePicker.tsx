import React from "react";
import styles from "./DatePicker.module.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { DatePickerProps } from "./DatePicker.types";

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  value,
  setDate,
  disabled,
  className,
}) => {
  return (
    <div className={styles.datePicker}>
      <h2>{title}</h2>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePickerMui
            value={dayjs(value)}
            label={title}
            onChange={({ $d }: any) => setDate($d)}
            disabled={disabled}
            format="DD/MM/YYYY"
            className={className}
            disablePast
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
