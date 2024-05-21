import { SCROLL_DIRECTION } from "../../App.constants";

export type HeaderProps = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  onScroll: (direction: SCROLL_DIRECTION) => void;
  daysCount: number;
  disableLeftArrow: boolean;
  disableRightArrow: boolean;
};

export type DateHandler = (date: Date, type: "start" | "end") => void;
