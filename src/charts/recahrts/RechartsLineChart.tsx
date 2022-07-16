import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { smallDataSet } from "../../charts-data/ChartsDataSource";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const RechartsLineChart = () => {
  return (
    <RenderTimingCounter id="LineChart">
      <LineChart width={500} height={300} data={smallDataSet}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </RenderTimingCounter>
  );
};

export default RechartsLineChart;
