export type DatePickerProps = {
  title: string;
  value?: Date | null;
  setDate: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
};
