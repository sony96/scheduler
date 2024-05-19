import { useEffect, useMemo, useState } from "react";
import { addHours, eachDayOfInterval, format, setHours } from "date-fns";
import styles from "./App.module.scss";
import { BUTTON_TYPE } from "./App.constants";
import type { SchedulerDate } from "./App.types";
import chunk from "lodash/chunk";

import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Button from "./components/Button";
import { extendArrayWithCopies } from "./App.utils";

function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [dates, setDates] = useState<SchedulerDate[]>([]);

  useEffect(() => {
    if (!!startDate && !!endDate) {
      const dates = eachDayOfInterval({ start: startDate, end: endDate }).map(
        (date) => ({
          dateId: crypto.randomUUID(),
          date: date,
          hours: [],
        })
      );

      setDates(dates);
    }
  }, [startDate, endDate]);

  const addTimeHandler = (dayId: string) => {
    const currentDay = dates.find((day) => day.dateId === dayId);

    if (!currentDay?.hours.length) {
      const result = dates.map((date) => {
        if (date.dateId === dayId) {
          return {
            dateId: date.dateId,
            date: date.date,
            hours: [
              { timeId: crypto.randomUUID(), time: setHours(date.date, 9) },
            ],
          };
        }

        return date;
      });

      setDates(result);

      return;
    }

    const latestHour = currentDay?.hours.at(-1)!.time;

    const latestHourFormatted = format(latestHour, "HH:mm");

    if (latestHourFormatted === "00:00") {
      return;
    }

    const incrementedHour = addHours(
      latestHour,
      +latestHourFormatted.split(":")[0] < 12 ? 3 : 4
    );

    const result = dates.map((date) => {
      if (date.dateId === dayId) {
        const hoursCopy = [...date.hours];

        hoursCopy.push({
          timeId: crypto.randomUUID(),
          time: incrementedHour,
        });

        return {
          dateId: date.dateId,
          date: date.date,
          hours: hoursCopy,
        };
      }

      return date;
    });

    setDates(result);
  };

  const deleteTimeHandler = (dateId: string, timeId: string) => {
    const result = dates.map((date) => {
      if (date.dateId === dateId) {
        const filteredHours = date.hours.filter(
          (hours) => hours.timeId !== timeId
        );

        return {
          date: date.date,
          dateId: date.dateId,
          hours: filteredHours,
        };
      }

      return date;
    });

    setDates(result);
  };

  const resetHandler = () => {
    const result = dates.map((date) => ({
      date: date.date,
      dateId: date.dateId,
      hours: [],
    }));

    setDates(result);
  };

  const handleAutocomplete = () => {
    const nonEmptyIndexes = dates
      .map((date, index) => (date.hours.length ? index : null))
      .filter((index) => index !== null);

    const maxIndex = nonEmptyIndexes.at(-1);

    const result = chunk(dates, (maxIndex || 0) + 1);
    console.log(result);

    const mappedResult = result.map((arr, index) => {
      return [
        ...arr.map((date, index) => ({
          date: date.date,
          dateId: date.dateId,
          hours: result[0][index].hours,
        })),
      ];
    });

    setDates(mappedResult.flat());
  };

  const doesHaveHoursBooked = useMemo(
    () => !Boolean(dates.find((date) => date.hours.length)),
    [dates]
  );

  return (
    <>
      <Header
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        daysCount={dates.length}
      />

      <Calendar
        dates={dates}
        addTime={addTimeHandler}
        deleteTime={deleteTimeHandler}
      />

      <div className={styles.actions}>
        <Button
          type={BUTTON_TYPE.RESET}
          disabled={doesHaveHoursBooked}
          onClick={resetHandler}
        >
          Reset
        </Button>
        <Button
          type={BUTTON_TYPE.AUTOCOMPLETE}
          disabled={doesHaveHoursBooked}
          onClick={handleAutocomplete}
        >
          Autocomplete
        </Button>
        <Button type={BUTTON_TYPE.UPLOAD} disabled={true} onClick={() => {}}>
          Upload
        </Button>
      </div>
    </>
  );
}

export default App;
