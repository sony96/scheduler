import { ScheduleHour } from "../../../App.types";

export type ColumnProps = {
  dateId: string;
  date: Date;
  hours: ScheduleHour[];
  addTime: (id: string) => void;
  deleteTime: (dateId: string, timeId: string) => void;
};
