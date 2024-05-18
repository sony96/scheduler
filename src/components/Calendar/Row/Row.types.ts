export type RowProps = {
  mode: "displayTime" | "addTime";
  time?: Date;
  onAddTime?: () => void;
  onDeletetime?: () => void;
};
