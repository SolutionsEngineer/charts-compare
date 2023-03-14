import React from "react";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";
import { CommonChartProps } from "../../types/CommonChartTypes";

const RechartsLineChart = ({ dataSet, onFinish }: CommonChartProps) => {
  return (
    <RenderTimingCounter id="RechartsLineChart" onFinish={onFinish}>
      <LineChart width={500} height={300} data={dataSet}>
        <XAxis dataKey="time" />
        <YAxis>
          <Label value="Temp [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="t_outside"
          stroke="#8884d8"
          isAnimationActive={true}
        />
      </LineChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsLineChart);
