import React from "react";
import {
  Axis,
  Grid,
  XYChart,
  AnimatedLineSeries,
  AnimatedBarSeries,
} from "@visx/xychart";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";

import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const tOutsideAccessors = {
  xAccessor: (d: ChartDataSource) => new Date(d.time).toISOString(),
  yAccessor: (d: ChartDataSource) => d.t_outside as never,
};

const tSensedAccessors = {
  xAccessor: (d: ChartDataSource) => new Date(d.time).toISOString(),
  yAccessor: (d: ChartDataSource) => d.t_sensed as never,
};

const insolationHistAccessors = {
  xAccessor: (d: ChartDataSource) => new Date(d.time).toISOString(),
  yAccessor: (d: ChartDataSource) => d.insolation_hist as never,
};

const VisxComposedMultiAxisChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VisxComposedMultiAxisChart" onFinish={onFinish}>
      <div style={{ position: "relative", width: 900 }}>
        <XYChart
          height={300}
          width={900}
          xScale={{ type: "band", padding: 0.4 }}
          yScale={{ type: "linear" }}
        >
          <Axis
            orientation="bottom"
            numTicks={4}
            tickFormat={(date) => new Date(date).toLocaleString()}
          />
          <Axis orientation="left" numTicks={4} label={"Insolation [W/m²]"} />
          <Grid numTicks={4} />
          <AnimatedBarSeries
            data={dataSet}
            dataKey="insolation"
            {...insolationHistAccessors}
            colorAccessor={() => "red"}
          />
        </XYChart>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 300,
            width: 900,
          }}
        >
          <XYChart
            height={300}
            width={900}
            xScale={{ type: "band" }}
            yScale={{ type: "linear" }}
          >
            <Axis orientation="right" numTicks={3} label={"Temp [℃]"} />
            <AnimatedLineSeries
              data={dataSet}
              dataKey="sensed"
              {...tSensedAccessors}
              color="green"
            />
            <AnimatedLineSeries
              data={dataSet}
              dataKey="outside"
              {...tOutsideAccessors}
              color="blue"
            />
          </XYChart>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LegendOrdinal
            scale={scaleOrdinal({
              domain: ["T_outside", "T_sensed", "Insolation"],
              range: ["blue", "green", "red"],
            })}
          >
            {(labels) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {labels.map((label, i) => (
                  <LegendItem key={`legend-quantile-${i}`} margin="0 5px">
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
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxComposedMultiAxisChart);
