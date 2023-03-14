import React from "react";
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";
import { CommonChartProps } from "../../types/CommonChartTypes";

const RechartsBarChart = ({ dataSet, onFinish }: CommonChartProps) => {
  return (
    <RenderTimingCounter id="RechartsBarChart" onFinish={onFinish}>
      <BarChart width={500} height={300} data={dataSet}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis>
          <Label value="Temp [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <Bar dataKey="t_outside" fill="#8884d8" isAnimationActive={true} />
      </BarChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsBarChart);
