import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";
import { CommonChartProps } from "../../types/CommonChartTypes";

const RechartsBarChart = ({ dataSet, onFinish }: CommonChartProps) => {
  return (
    <RenderTimingCounter id="RechartsBarChart" onFinish={onFinish}>
      <BarChart width={900} height={300} data={dataSet}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis>
          <Label value="Temp [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <Bar dataKey="t_outside" fill="#8884d8" isAnimationActive={true} />
        <Legend
          payload={[
            {
              value: "Temperatura zewnętrzna",
              id: "t_outside",
              type: "rect",
              color: "#8884d8",
            },
          ]}
        />
      </BarChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsBarChart);
