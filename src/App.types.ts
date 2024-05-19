import { DATE_AUTOCOMPLETE_TYPE } from "./App.constants";

export type ScheduleHour = { timeId: string; time: Date };

export type SchedulerDate = {
  dateId: string;
  date: Date;
  hours: ScheduleHour[];
  type?: DATE_AUTOCOMPLETE_TYPE | null;
};
