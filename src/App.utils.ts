import { SchedulerDate } from "./App.types";

export const extendArrayWithCopies = (array: SchedulerDate[], copyCount: number) => {
  const copyArray = [...array];

  let extendedArray = [...array];

  for (let i = 0; i < copyCount; i++) {
    extendedArray = [...extendedArray, ...copyArray];
  }

  return extendedArray;
};
