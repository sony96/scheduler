export type ScheduleHour = { timeId: string; time: Date };

export type SchedulerDate = {
  dateId: string;
  date: Date;
  hours: ScheduleHour[];
};
