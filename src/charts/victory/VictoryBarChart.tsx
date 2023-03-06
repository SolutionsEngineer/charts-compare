import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const VictoryBarChartComponent = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VictoryBarChartComponent" onFinish={onFinish}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBar
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
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

export default React.memo(VictoryBarChartComponent);
