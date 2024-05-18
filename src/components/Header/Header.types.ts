export type HeaderProps = {};

export type DateHandler = (date: string, type: "start" | "end") => void;

export enum DATE_TYPE {
  START = "start",
  END = "end",
}
