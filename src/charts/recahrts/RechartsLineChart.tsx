import React, { Profiler } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { smallDataSet } from "../../charts-data/ChartsDataSource";
import { logTimes } from "../../utils/TimingUtils";

const RechartsLineChart = () => {
  return (
    <>
      <Profiler id="LineChart" onRender={logTimes}>
        <LineChart width={500} height={300} data={smallDataSet}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
      </Profiler>
    </>
  );
};

export default RechartsLineChart;
