import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";
import { CommonChartProps } from "../../types/CommonChartTypes";

const RechartsComposedSingleAxisChart = ({
  dataSet,
  onFinish,
}: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="RechartsComposedSingleAxisChart"
      onFinish={onFinish}
    >
      <ComposedChart width={900} height={300} data={dataSet}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis>
          <Label value="Temp [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <Line
          type="monotone"
          dataKey="t_outside"
          stroke="#8884d8"
          isAnimationActive={true}
        />
        <Bar dataKey="t_sensed" fill="#8884d8" isAnimationActive={true} />
        <Legend />
      </ComposedChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsComposedSingleAxisChart);
