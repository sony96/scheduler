export type RowProps = {
  mode: "displayTime" | "addTime";
  time?: Date;
  timeId?: string;
  addTime?: () => void;
  deleteTime?: (timeId: string) => void;
};
