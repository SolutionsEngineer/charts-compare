import React, { useMemo } from "react";
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

const VictoryComposedMultiAxisChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  const maxInsolationHist = useMemo(
    () => Math.max(...dataSet.map((d) => d.insolation_hist)),
    [dataSet]
  );

  const maxTemp = useMemo(
    () =>
      Math.max(
        ...dataSet.map((d) => d.t_outside),
        ...dataSet.map((d) => d.t_sensed)
      ),
    [dataSet]
  );

  const tempTickValues = useMemo(
    () =>
      [...dataSet.map((d) => d.t_outside), ...dataSet.map((d) => d.t_sensed)]
        .sort()
        .map((t) => Math.round(t / (maxTemp || 1))),
    [dataSet, maxTemp]
  );

  const insolationTickValues = useMemo(
    () =>
      [...dataSet.map((d) => d.insolation_hist)]
        .sort()
        .map((i) => Math.round(i / (maxInsolationHist || 1))),
    [dataSet, maxInsolationHist]
  );

  return (
    <RenderTimingCounter id="VictoryComposedMultiAxisChart" onFinish={onFinish}>
      <div style={{ width: 900, height: 300 }}>
        <VictoryChart width={900} height={300} domain={{ y: [-1, 1] }}>
          <VictoryAxis
            fixLabelOverlap={true}
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-12} dx={30} />}
            key="temp"
            tickValues={tempTickValues}
            tickFormat={(t) => t * maxTemp}
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
            fixLabelOverlap={true}
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={12} dx={30} />}
            key={"insolation"}
            tickValues={insolationTickValues}
            tickFormat={(t) => t * maxInsolationHist}
            orientation="right"
            label="Insolation [W/m²]"
          />
          <VictoryAxis
            tickLabelComponent={<VictoryLabel dx={20} dy={95} />}
            fixLabelOverlap={true}
            tickCount={5}
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
            y={(d: ChartDataSource) => d.t_outside / maxTemp}
            key="temp"
          />
          <VictoryLine
            animate={true}
            style={{
              data: { stroke: "green" },
              parent: { border: "1px solid #ccc" },
            }}
            data={dataSet}
            x="time"
            y={(d: ChartDataSource) => d.t_sensed / maxTemp}
            key="temp"
          />
          <VictoryBar
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            style={{
              data: { fill: "red" },
              parent: { border: "1px solid #ccc" },
            }}
            data={dataSet}
            x="time"
            y={(d: ChartDataSource) => d.insolation_hist / maxInsolationHist}
            key="insolation"
          />
          <VictoryLegend
            x={300}
            y={10}
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "T_Sensed", symbol: { fill: "green" } },
              { name: "T_Outside", symbol: { fill: "blue" } },
              { name: "Insulation", symbol: { fill: "red" } },
            ]}
          />
        </VictoryChart>
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VictoryComposedMultiAxisChart);
