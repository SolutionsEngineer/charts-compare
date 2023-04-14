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
  animated,
  onFinish,
}: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="RechartsComposedMultiAxisChart"
      key="RechartsComposedMultiAxisChart"
      onFinish={onFinish}
    >
      <ComposedChart width={900} height={300} data={dataSet}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="temperature">
          <Label value="Temp. [℃]" angle={-90} position="insideLeft" />
        </YAxis>
        <YAxis yAxisId="insolation" orientation="right">
          <Label
            value="Nasłonecznienie [W/m²]"
            angle={-90}
            position="insideTopRight"
            offset={10}
          />
        </YAxis>
        <Line
          type="monotone"
          dataKey="t_sensed"
          stroke="#8884d8"
          isAnimationActive={animated}
          yAxisId="temperature"
        />
        <Line
          type="monotone"
          dataKey="t_outside"
          stroke="#82ca9d"
          isAnimationActive={animated}
          yAxisId="temperature"
        />
        <Bar
          dataKey="insolation_hist"
          fill="#8884d8"
          isAnimationActive={animated}
          yAxisId="insolation"
        />
        <Legend
          payload={[
            {
              value: "Temperatura zewnętrzna",
              id: "t_outside",
              type: "line",
              color: "#82ca9d",
            },
            {
              value: "Temperatura odczuwalna",
              id: "t_outside",
              type: "line",
              color: "#8884d8",
            },
            {
              value: "Nasłonecznienie",
              id: "insolation",
              type: "rect",
              color: "#8884d8",
            },
          ]}
        />
      </ComposedChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsComposedMultiAxisChart);
