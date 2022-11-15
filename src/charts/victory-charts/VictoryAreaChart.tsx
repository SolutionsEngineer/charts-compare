import React from "react";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const VictoryAreaChartComponent = ({
  dataSet,
  onFinish,
}: {
  dataSet: any[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="RechartsAreaChart" onFinish={onFinish}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea style={{ data: { fill: "#c43a31" } }} data={dataSet} />
      </VictoryChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryAreaChartComponent);
