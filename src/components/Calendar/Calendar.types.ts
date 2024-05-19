import { SchedulerDate } from "../../App.types";

export type CalendarProps = {
  dates: SchedulerDate[];
  addTime: (dayId: string) => void;
  deleteTime: (dateId: string, timeId: string) => void;
};
