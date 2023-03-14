import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine } from "victory";
import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const VictoryComposedSingleAxisChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter
      id="VictoryComposedSingleAxisChart"
      onFinish={onFinish}
    >
      <div style={{ width: 500, height: 300 }}>
        <VictoryChart>
          <VictoryAxis fixLabelOverlap={true} dependentAxis />
          <VictoryAxis fixLabelOverlap={true} />
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
            y="t_sensed"
          />
        </VictoryChart>
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryComposedSingleAxisChart);
