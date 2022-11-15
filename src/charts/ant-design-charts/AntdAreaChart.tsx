import React from "react";
import { Area } from "@ant-design/plots";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const AntdAreaChart = ({ dataSet }: { dataSet: any[] }) => {
  const config = {
    data: dataSet,
    xField: "x",
    yField: "y",
    xAxis: {
      range: [0, 1],
    },
  };

  return (
    <RenderTimingCounter id="AntdAreaChart" onFinish={() => {}}>
      <Area {...config} />
    </RenderTimingCounter>
  );
};

export default React.memo(AntdAreaChart);
