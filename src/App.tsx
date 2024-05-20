import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addHours,
  eachDayOfInterval,
  format,
  setHours,
  isEqual,
} from "date-fns";
import styles from "./App.module.scss";
import {
  BUTTON_TYPE,
  DATE_AUTOCOMPLETE_TYPE,
  SCROLL_DIRECTION,
} from "./App.constants";
import type { SchedulerDate } from "./App.types";
import chunk from "lodash/chunk";

import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dates, setDates] = useState<SchedulerDate[]>([]);
  const [autoDates, setAutoDates] = useState<SchedulerDate[]>([]);
  const [isAutocompleteUsed, setIsAutocompleteUsed] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const handleScroll = () => {
    setScrollOffset(calendarRef.current!.scrollLeft);
  };

  useEffect(() => {
    const scrollableElement = calendarRef.current;

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);

      return () => {
        scrollableElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const doesHaveHoursBooked = useMemo(
    () => !!dates.find((date) => date.hours.length),
    [dates]
  );

  useEffect(() => {
    if (!!startDate && !!endDate) {
      const datesResult = eachDayOfInterval({
        start: startDate,
        end: endDate,
      }).map((newDate) => {
        const prevHours =
          dates.length &&
          dates.find((existingDate) => isEqual(existingDate.date, newDate))
            ?.hours;

        return {
          dateId: crypto.randomUUID(),
          date: newDate,
          hours: prevHours || [],
        };
      });

      setDates(datesResult);
    }
  }, [startDate, endDate]);

  const addTimeHandler = useCallback(
    (dayId: string) => {
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

      if (latestHourFormatted === "20:00") {
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
    },
    [dates]
  );

  const deleteTimeHandler = useCallback(
    (dateId: string, timeId: string) => {
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
    },
    [dates]
  );

  const resetHandler = () => {
    const result = dates.map((date) => ({
      date: date.date,
      dateId: date.dateId,
      hours: [],
      type: null,
    }));

    setIsAutocompleteUsed(false);
    setDates(result);
  };

  const handleAutocomplete = (predictMode: boolean) => {
    if (!doesHaveHoursBooked) {
      return;
    }

    !predictMode && setIsAutocompleteUsed(true);

    const nonEmptyIndexes = dates
      .map((date, index) => (date.hours.length ? index : null))
      .filter((index) => index !== null);

    const maxIndex = nonEmptyIndexes.at(-1);

    const result = chunk(dates, (maxIndex || 0) + 1);

    const mappedResult = result.map((arr, mainIndex) => {
      return [
        ...arr.map((date, index) => ({
          date: date.date,
          dateId: date.dateId,
          hours: result[0][index].hours,
          type: predictMode
            ? mainIndex === 0
              ? DATE_AUTOCOMPLETE_TYPE.TEMPLATE
              : DATE_AUTOCOMPLETE_TYPE.COPY
            : null,
        })),
      ];
    });

    if (predictMode) {
      setAutoDates(mappedResult.flat());
      return;
    }

    setIsAutocompleteUsed(true);
    setDates(mappedResult.flat());
  };

  const handleResetApp = () => {
    setStartDate(null);
    setEndDate(null);
    setDates([]);
  };

  const handleOnScroll = (direction: SCROLL_DIRECTION) => {
    let offset;

    if (direction === SCROLL_DIRECTION.LEFT) {
      offset = scrollOffset - calendarRef.current!.clientWidth;
    }

    if (direction === SCROLL_DIRECTION.RIGHT) {
      offset = scrollOffset + calendarRef.current!.clientWidth;
    }

    calendarRef.current?.scrollTo({
      top: 0,
      left: offset,
      behavior: "auto",
    });
  };

  return (
    <div className={styles.app}>
      {isModalOpened && (
        <Modal
          onClose={() => setIsModalOpened(false)}
          onConfirm={handleResetApp}
          message="Schedule successfully created."
          buttonText="Create another plan"
        />
      )}

      <Header
        startDate={startDate}
        endDate={endDate}
        daysCount={dates.length}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onScroll={handleOnScroll}
      />

      <Calendar
        dates={autoDates.length ? autoDates : dates}
        addTime={addTimeHandler}
        deleteTime={deleteTimeHandler}
        ref={calendarRef}
      />

      <div className={styles.actions}>
        <Button
          type={BUTTON_TYPE.RESET}
          disabled={!doesHaveHoursBooked}
          onClick={resetHandler}
        >
          Reset
        </Button>
        <Button
          type={BUTTON_TYPE.AUTOCOMPLETE}
          disabled={isAutocompleteUsed}
          onClick={() => handleAutocomplete(false)}
          onMouseEnter={() => handleAutocomplete(true)}
          onMouseLeave={() => setAutoDates([])}
        >
          Autocomplete
        </Button>
        <Button
          type={BUTTON_TYPE.UPLOAD}
          disabled={!doesHaveHoursBooked}
          onClick={() => {
            console.log("DATA:", dates);
            setIsModalOpened(true);
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default App;
