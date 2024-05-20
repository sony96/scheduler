export type DatePickerProps = {
  title: string;
  value: string | null;
  setDate: (date: string) => void;
  disabled?: boolean;
  className?: string;
};
