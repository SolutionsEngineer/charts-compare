import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Label,
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
      <ComposedChart width={500} height={300} data={dataSet}>
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
        <Bar dataKey="t_sensed" fill="#8884d8" isAnimationActive={true} />
      </ComposedChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsComposedSingleAxisChart);
