export type DatePickerProps = {
  title: string;
  value: Date | undefined;
  setDate: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
};
