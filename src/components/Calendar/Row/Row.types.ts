export type RowProps = {
  mode: "displayTime" | "addTime";
  time?: Date;
  id?: string;
  onAddTime?: () => void;
  onDeleteTime?: (id: string) => void;
};
