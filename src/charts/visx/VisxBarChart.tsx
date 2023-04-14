import React from "react";
import {
  Axis,
  Grid,
  XYChart,
  AnimatedBarSeries,
  BarSeries,
} from "@visx/xychart";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";

import {
  ChartDataSource,
  CommonChartProps,
} from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const accessors = {
  xAccessor: (d: ChartDataSource) => d.time as never,
  yAccessor: (d: ChartDataSource) => d.t_outside as never,
};

const VisxBarChart = ({ dataSet, animated, onFinish }: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="VisxBarChart"
      key="VisxBarChart"
      onFinish={onFinish}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 900,
        }}
      >
        <XYChart
          height={300}
          width={900}
          xScale={{ type: "band", padding: 0.2 }}
          yScale={{ type: "linear" }}
        >
          <Axis
            orientation="bottom"
            numTicks={4}
            tickFormat={(date) => new Date(date).toLocaleString()}
          />
          <Axis orientation="left" numTicks={4} label={"Temp. [℃]"} />
          <Grid numTicks={4} />
          {animated ? (
            <AnimatedBarSeries
              data={dataSet}
              dataKey="outside"
              {...accessors}
              colorAccessor={() => "blue"}
            />
          ) : (
            <BarSeries
              data={dataSet}
              dataKey="outside"
              {...accessors}
              colorAccessor={() => "blue"}
            />
          )}
        </XYChart>
        <LegendOrdinal
          scale={scaleOrdinal({
            domain: ["Temperatura zewnętrzna"],
            range: ["blue"],
          })}
        >
          {(labels) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {labels.map((label) => (
                <LegendItem
                  key={`legend-quantile-${label.text}-${label.index}`}
                  margin="0 5px"
                >
                  <svg width={15} height={15}>
                    <rect fill={label.value} width={15} height={15} />
                  </svg>
                  <LegendLabel align="left" margin="0 0 0 4px">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxBarChart);
