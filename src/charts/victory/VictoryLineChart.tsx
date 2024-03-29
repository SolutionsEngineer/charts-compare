import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from "victory";
import { CommonChartProps } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const VictoryLineChart = ({
  dataSet,
  animated,
  onFinish,
}: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="VictoryLineChart"
      key="VictoryLineChart"
      onFinish={onFinish}
    >
      <div style={{ width: 900, height: 300 }}>
        <VictoryChart width={900} height={300}>
          <VictoryAxis
            fixLabelOverlap={true}
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-12} />}
            label={"Temp. [℃]"}
            style={{
              grid: {
                stroke: "#cccccc",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              },
            }}
          />
          <VictoryAxis
            tickLabelComponent={<VictoryLabel dx={20} />}
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
            animate={
              animated
                ? {
                    duration: 1000,
                    onLoad: { duration: 1000 },
                  }
                : false
            }
            style={{
              data: { stroke: "blue" },
              parent: { border: "1px solid #ccc" },
            }}
            data={dataSet}
            x="time"
            y="t_outside"
          />
          <VictoryLegend
            x={375}
            y={10}
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "Temperatura zewnętrzna   ", symbol: { fill: "blue" } },
            ]}
          />
        </VictoryChart>
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryLineChart);
