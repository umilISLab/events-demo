import "./Charts.css";
import { ResponsivePie } from "@nivo/pie";
import killings from "../assets/killings.json";
import investigations from "../assets/investigations.json";
import robberies from "../assets/robberies.json";
import suicides from "../assets/suicides.json";
import eq from "../assets/earthquakes.json";

function Charts({ data }) {
  const chartData = data.unit.map((el) => {
    return {
      id: el.event,
      label: el.event,
      value: el.results.length,
    };
  });

  return (
    <div className="Charts">
      <h1>
        Here's a <strong>chart</strong> for you
      </h1>
      <p>
        Aenean elementum ultrices vehicula. Vivamus lobortis consequat nibh, sit
        amet tempor velit tempor id. Cras ligula tortor, tristique vitae mi sed,
        convallis porta nibh. Pellentesque id tincidunt leo, vitae dapibus
        turpis. Integer vitae malesuada odio. Donec vel bibendum tortor.
        Curabitur sed aliquam augue. Nam suscipit convallis pharetra.
      </p>
      <div className="ChartContainer">
        <ResponsivePie
          theme={{
            fontSize: 16,
          }}
          tooltip={() => <></>}
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="white"
          arcLinkLabelsThickness={8}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "column",
              justify: false,
              translateX: 450,
              translateY: -50,
              itemsSpacing: 50,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "transparent",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 0,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Charts;
