import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const VictoryLineChartComponent = ({
  dataSet,
  onFinish,
}: {
  dataSet: any[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VictoryLineChartComponent" onFinish={onFinish}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={dataSet}
        />
      </VictoryChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryLineChartComponent);
