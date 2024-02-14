import "./Charts.css";
import { ResponsivePie } from "@nivo/pie";
import WaffleChart from "./WaffleChart";
import SpiderChart from "./SpiderChart";

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
      <div className="ChartsContent">
        <h1>
          Here's some <strong>charts</strong> for you
        </h1>
        <p>
          Aenean elementum ultrices vehicula. Vivamus lobortis consequat nibh,
          sit amet tempor velit tempor id. Cras ligula tortor, tristique vitae
          mi sed, convallis porta nibh. Pellentesque id tincidunt leo, vitae
          dapibus turpis. Integer vitae malesuada odio. Donec vel bibendum
          tortor. Curabitur sed aliquam augue. Nam suscipit convallis pharetra.
        </p>
        <div className="PieChartContainer">
          <h1>
            a <strong>pie</strong>
          </h1>
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
          />
        </div>
        {/* <div className="WaffleChartContainer">
          <h1>
            a <strong>waffle</strong>
          </h1>
          <WaffleChart data={chartData} />
        </div> */}
        <div className="SpiderChartContainer">
          <h1>
            a <strong>spider</strong> web
          </h1>
          <SpiderChart data={data.unit} />
        </div>
      </div>
    </div>
  );
}

export default Charts;
