import React from "react";
import {
  Axis,
  Grid,
  XYChart,
  AnimatedLineSeries,
  AnimatedBarSeries,
  LineSeries,
  BarSeries,
} from "@visx/xychart";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";

import {
  ChartDataSource,
  CommonChartProps,
} from "../../types/CommonChartTypes";
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
  animated,
  onFinish,
}: CommonChartProps) => {
  return (
    <RenderTimingCounter
      id="VisxComposedMultiAxisChart"
      key="VisxComposedMultiAxisChart"
      onFinish={onFinish}
    >
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
          <Axis
            orientation="left"
            numTicks={4}
            label={"Nasłonecznienie [W/m²]"}
          />
          <Grid numTicks={4} />
          {animated ? (
            <AnimatedBarSeries
              data={dataSet}
              dataKey="insolation"
              {...insolationHistAccessors}
              colorAccessor={() => "red"}
            />
          ) : (
            <BarSeries
              data={dataSet}
              dataKey="insolation"
              {...insolationHistAccessors}
              colorAccessor={() => "red"}
            />
          )}
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
            <Axis orientation="right" numTicks={3} label={"Temp. [℃]"} />
            {animated ? (
              <>
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
              </>
            ) : (
              <>
                <LineSeries
                  data={dataSet}
                  dataKey="sensed"
                  {...tSensedAccessors}
                  color="green"
                />
                <LineSeries
                  data={dataSet}
                  dataKey="outside"
                  {...tOutsideAccessors}
                  color="blue"
                />
              </>
            )}
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
              domain: [
                "Temperatura zewnętrzna",
                "Temperatura odczuwalna",
                "Nasłonecznienie",
              ],
              range: ["blue", "green", "red"],
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
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxComposedMultiAxisChart);
