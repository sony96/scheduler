import { DATE_AUTOCOMPLETE_TYPE } from "../../../App.constants";
import { ScheduleHour } from "../../../App.types";

export type ColumnProps = {
  dateId: string;
  date: Date;
  hours: ScheduleHour[];
  type?: DATE_AUTOCOMPLETE_TYPE | null;
  addTime: (id: string) => void;
  deleteTime: (dateId: string, timeId: string) => void;
};
