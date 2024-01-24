import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Timeline from "./components/Timeline";
import Hero from "./components/Hero";
import Charts from "./components/Charts";
import { ApiConnector } from "./api/ApiConnector";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const [data, setData] = useState(null);
  const { getEvent, getEventsGroup } = ApiConnector();

  let query = useQuery();
  const includeBody = query.get("includeBody");
  const eventsString = query.get("events");
  const startDate = query.get("startDate");
  const endDate = query.get("endDate");
  const eventsArray = eventsString.split(",");

  async function getEventsData() {
    const eventsPromise = [];

    eventsArray.forEach((event) => {
      eventsPromise.push(getEvent(event, includeBody, startDate, endDate));
    });
    const _data = await Promise.all(eventsPromise);

    const _groupData = await getEventsGroup(
      eventsString,
      includeBody,
      startDate,
      endDate
    );

    setData({
      unit: _data,
      group: _groupData,
    });
  }

  useEffect(() => {
    getEventsData();
  }, [eventsString]);

  return (
    <>
      {data && (
        <>
          <Charts data={data} />
          <Timeline data={data} />
        </>
      )}
    </>
  );
}

export default App;

// const l = [];
// data.map((event) => {
//   let _data;
//   if (event.spans) {
//     const spansKeys = Object.keys(event.spans);
//     spansKeys.forEach((s) => {
//       if (s.includes("ROBBERY")) {
//         _data = event;
//       }
//     });
//   }
//   if (_data) l.push(_data);
// });
