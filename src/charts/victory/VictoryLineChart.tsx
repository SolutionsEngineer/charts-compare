import React from "react";
import { VictoryChart, VictoryLine } from "victory";
import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const VictoryLineChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VictoryLineChart" onFinish={onFinish}>
      <VictoryChart width={500} height={300}>
        <VictoryLine
          animate={true}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={dataSet}
          x="time"
          y="t_outside"
        />
      </VictoryChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryLineChart);
