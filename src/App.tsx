import { useEffect, useState } from "react";
import { eachDayOfInterval } from "date-fns";

import Header from "./components/Header";
import Calendar from "./components/Calendar";

function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!!startDate && !!endDate) {
      const dates = eachDayOfInterval({ start: startDate, end: endDate });

      setDates(dates);
    }
  }, [startDate, endDate]);

  return (
    <>
      <Header
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <Calendar dates={dates} />
    </>
  );
}

export default App;
