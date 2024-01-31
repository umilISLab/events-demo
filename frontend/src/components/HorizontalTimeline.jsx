import { ResponsiveCalendar } from "@nivo/calendar";
import "./HorizontalTimeline.css";

function parseData(data) {
  const parsedData = {};

  data.forEach((event) => {
    if (parsedData[event.date]) {
      parsedData[event.date] = parsedData[event.date] + 1;
    } else {
      parsedData[event.date] = 1;
    }
  });

  const mappedData = [];

  for (const key in parsedData) {
    mappedData.push({
      day: new Date(key).toLocaleDateString().split("/").reverse().join("-"),
      value: parsedData[key],
    });
  }

  return mappedData;
}

function HorizontalTimeline({ data }) {
  const timelineColors = ["#0E4429", "#166D32", "#26A641", "#39D353"].reverse();

  return (
    <div className="HorizontalTimeline">
      <ResponsiveCalendar
        theme={{
          fontSize: 16,
          textColor: "white",
        }}
        data={parseData(data)}
        from="1948-01-01"
        to="1948-12-31"
        emptyColor="#eeeeee"
        // colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        colors={timelineColors}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        onClick={(event) => {
          window.location.hash = new Date(event.day).toLocaleDateString();
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
      <div className="HorizontalTimelineLegend">
        <span>Less</span>
        {timelineColors.map((color) => (
          <div
            key={color}
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: color,
              margin: "0 5px",
            }}
          ></div>
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default HorizontalTimeline;

// const _data = data.map((event) => {
//   let _parsedData = {};

//   if (_parsedData[event.date]) {
//     _parsedData[event.date] = _parsedData[event.date] + 1;
//   } else {
//     _parsedData[event.date] = 1;
//   }

//   return {
//     day: event.date,
//     value: Math.floor(Math.random() * 3),
//   };
// });

// console.log("parsedData", parsedData);
