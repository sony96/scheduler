import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";

import Header from "./components/Header";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [days, setDays] = useState(0);

  useEffect(() => {
    if (!!startDate && !!endDate) {
      setDays(differenceInCalendarDays(endDate, startDate));
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
      {days}
    </>
  );
}

export default App;
