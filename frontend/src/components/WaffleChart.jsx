import { ResponsiveWaffle } from "@nivo/waffle";

const fakedata = [
  {
    id: "cats",
    label: "Cats",
    value: 30.786118725387155,
  },
  {
    id: "dogs",
    label: "Dogs",
    value: 16.1250044449008,
  },
  {
    id: "rabbits",
    label: "Rabits",
    value: 22.765605546479893,
  },
];

function WaffleChart({ data }) {
  let total = 0;
  data.forEach((el) => {
    total += el.value;
  });

  return (
    <div className="WaffleChart">
      <ResponsiveWaffle
        data={data}
        total={total}
        rows={18}
        columns={14}
        padding={1}
        valueFormat=".2f"
        margin={{ bottom: 100 }}
        colors={{ scheme: "nivo" }}
        borderRadius={3}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        motionStagger={2}
      />
    </div>
  );
}

export default WaffleChart;
