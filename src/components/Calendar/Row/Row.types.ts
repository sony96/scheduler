export type RowProps = {
  mode: "displayTime" | "addTime";
  time?: Date;
  timeId?: string;
  copyMode?: boolean;
  addTime?: () => void;
  deleteTime?: (timeId: string) => void;
};
