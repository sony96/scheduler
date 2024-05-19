export type CalendarProps = {
  dates: {
    dateId: string;
    date: Date;
    hours: { timeId: string; time: Date }[];
  }[];
  addTime: (dayId: string) => void;
  deleteTime: (dateId: string, timeId: string) => void;
};
