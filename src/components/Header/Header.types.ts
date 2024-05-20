import { SCROLL_DIRECTION } from "../../App.constants";

export type HeaderProps = {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  onScroll: (direction: SCROLL_DIRECTION) => void;
  daysCount: number;
};

export type DateHandler = (date: string, type: "start" | "end") => void;
