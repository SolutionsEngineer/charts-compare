import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const RechartsLineChart = ({ dataSet }: { dataSet: any[] }) => {
  return (
    <RenderTimingCounter id="RechartsLineChart" onFinish={() => {}}>
      <LineChart width={500} height={300} data={dataSet}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="x" stroke="#82ca9d" /> */}
      </LineChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsLineChart);
