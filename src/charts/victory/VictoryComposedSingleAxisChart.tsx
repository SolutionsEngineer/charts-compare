import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from "victory";
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
      <div style={{ width: 900, height: 300 }}>
        <VictoryChart width={900} height={300}>
          <VictoryAxis
            fixLabelOverlap={true}
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-12} />}
            label={"Temp [℃]"}
            style={{
              grid: {
                stroke: "#cccccc",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              },
            }}
          />
          <VictoryAxis
            tickLabelComponent={<VictoryLabel dx={20} dy={70} />}
            fixLabelOverlap={true}
            style={{
              grid: {
                stroke: "#cccccc",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              },
            }}
          />
          <VictoryLine
            animate={true}
            style={{
              data: { stroke: "blue" },
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
              data: { fill: "green" },
              parent: { border: "1px solid #ccc" },
            }}
            data={dataSet}
            x="time"
            y="t_sensed"
          />
          <VictoryLegend
            x={350}
            y={10}
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "T_Sensed", symbol: { fill: "green" } },
              { name: "T_Outside", symbol: { fill: "blue" } },
            ]}
          />
        </VictoryChart>
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryComposedSingleAxisChart);
