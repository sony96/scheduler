import { useEffect, useMemo, useState } from "react";
import { addHours, eachDayOfInterval, format, setHours } from "date-fns";
import styles from "./App.module.scss";
import { BUTTON_TYPE } from "./App.constants";

import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Button from "./components/Button";

function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [dates, setDates] = useState<
    { dateId: string; date: Date; hours: { timeId: string; time: Date }[] }[]
  >([]);

  console.log("CMP RERENDERED");

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

  const isResetButtonDisabled = useMemo(
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
      />

      <Calendar
        dates={dates}
        addTime={addTimeHandler}
        deleteTime={deleteTimeHandler}
      />

      <div className={styles.actions}>
        <Button
          type={BUTTON_TYPE.RESET}
          disabled={isResetButtonDisabled}
          onClick={resetHandler}
        >
          Reset
        </Button>
        <Button
          type={BUTTON_TYPE.AUTOCOMPLETE}
          disabled={false}
          onClick={() => {}}
        >
          Autocomplete
        </Button>
        <Button type={BUTTON_TYPE.UPLOAD} disabled={false} onClick={() => {}}>
          Upload
        </Button>
      </div>
    </>
  );
}

export default App;
