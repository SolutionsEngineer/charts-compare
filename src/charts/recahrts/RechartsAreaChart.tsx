import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const RechartsAreaChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: any[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="RechartsAreaChart" onFinish={onFinish}>
      <AreaChart
        width={500}
        height={400}
        data={dataSet}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </RenderTimingCounter>
  );
};

export default React.memo(RechartsAreaChart);
