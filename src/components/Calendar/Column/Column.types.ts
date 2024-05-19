export type ColumnProps = {
  dateId: string;
  date: Date;
  hours: { timeId: string; time: Date }[];
  addTime: (id: string) => void;
  deleteTime: (dateId: string, timeId: string) => void;
};
