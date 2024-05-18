import React from "react";
import styles from "./DatePicker.module.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";

import { DatePickerProps } from "./DatePicker.types";

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  setDate,
  disabled,
  className,
}) => {
  const handleDateChange = ({ $d }: any) => {
    setDate($d);
  };

  return (
    <div className={styles.datePicker}>
      <h2>{title}</h2>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePickerMui
            label={title}
            onChange={handleDateChange}
            disabled={disabled}
            format="DD/MM/YYYY"
            className={className}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
