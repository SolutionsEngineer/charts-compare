import React from "react";
import {
  Axis,
  Grid,
  XYChart,
  AnimatedLineSeries,
  AnimatedBarSeries,
} from "@visx/xychart";

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
      <div style={{ position: "relative" }}>
        <XYChart
          height={300}
          width={900}
          xScale={{ type: "band", padding: 0.4 }}
          yScale={{ type: "linear" }}
        >
          <Axis orientation="bottom" numTicks={2} />
          <Axis orientation="left" numTicks={2} />
          <Grid columns={false} numTicks={2} />
          <AnimatedBarSeries
            data={dataSet}
            dataKey="insolation"
            {...insolationHistAccessors}
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
            <Axis orientation="right" numTicks={2} />
            <AnimatedLineSeries
              data={dataSet}
              dataKey="sensed"
              {...tSensedAccessors}
            />
            <AnimatedLineSeries
              data={dataSet}
              dataKey="outside"
              {...tOutsideAccessors}
            />
          </XYChart>
        </div>
      </div>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxComposedMultiAxisChart);
