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

const RechartsComposedMultiAxisChart = ({
  dataSet,
  onFinish,
}: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="RechartsComposedMultiAxisChart"
      onFinish={onFinish}
    >
      <ComposedChart width={500} height={300} data={dataSet}>
        <XAxis dataKey="time" />
        <YAxis yAxisId="temperature">
          <Label value="Temp [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <YAxis yAxisId="insolation" orientation="right">
          <Label
            value="Insolation [W/m2]"
            angle={-90}
            position="insideTopRight"
            offset={10}
          />
        </YAxis>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="t_sensed"
          stroke="#8884d8"
          isAnimationActive={true}
          yAxisId="temperature"
        />
        <Line
          type="monotone"
          dataKey="t_outside"
          stroke="#82ca9d"
          isAnimationActive={true}
          yAxisId="temperature"
        />
        <Bar
          dataKey="insolation_hist"
          fill="#8884d8"
          isAnimationActive={true}
          yAxisId="insolation"
        />
        <Legend />
      </ComposedChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsComposedMultiAxisChart);
