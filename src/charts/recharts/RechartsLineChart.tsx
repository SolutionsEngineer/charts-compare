import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";
import { CommonChartProps } from "../../types/CommonChartTypes";

const RechartsLineChart = ({
  dataSet,
  animated,
  onFinish,
}: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="RechartsLineChart"
      key="RechartsLineChart"
      onFinish={onFinish}
    >
      <LineChart width={900} height={300} data={dataSet}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis>
          <Label value="Temp. [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <Line
          type="monotone"
          dataKey="t_outside"
          stroke="#8884d8"
          isAnimationActive={animated}
          animationDuration={1000}
        />
        <Legend
          payload={[
            {
              value: "Temperatura zewnętrzna",
              id: "t_outside",
              type: "line",
              color: "#8884d8",
            },
          ]}
        />
      </LineChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsLineChart);
