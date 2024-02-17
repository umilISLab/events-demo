import { ResponsiveRadar } from "@nivo/radar";

function mapData(data) {
  return data.map((el) => ({
    event: el.event,
    events: el.results.length,
  }));
}

function SpiderChart({ data }) {
  const formattedData = mapData(data);

  return (
    <div className="SpiderChart">
      <ResponsiveRadar
        data={formattedData}
        keys={["events"]}
        indexBy="event"
        valueFormat=">-.2f"
        margin={{ bottom: 170, top: 50 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "nivo" }}
        theme={{
          text: {
            fill: "white",
            fontSize: "16px",
          },
        }}
        blendMode="multiply"
        motionConfig="wobbly"
      />
    </div>
  );
}

export default SpiderChart;
