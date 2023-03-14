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

const lineAccessors = {
  xAccessor: (d: ChartDataSource) => new Date(d.time).toISOString(),
  yAccessor: (d: ChartDataSource) => d.t_outside as never,
};

const barAccessors = {
  xAccessor: (d: ChartDataSource) => new Date(d.time).toISOString(),
  yAccessor: (d: ChartDataSource) => d.t_sensed as never,
};

const VisxComposedSingleAxisChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VisxComposedSingleAxisChart" onFinish={onFinish}>
      <XYChart
        height={300}
        width={500}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <Axis orientation="bottom" numTicks={2} />
        <Axis orientation="left" numTicks={2} />
        <Grid columns={false} numTicks={2} />
        <AnimatedLineSeries
          data={dataSet}
          dataKey="outside"
          {...lineAccessors}
        />
        <AnimatedBarSeries data={dataSet} dataKey="sensed" {...barAccessors} />
      </XYChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxComposedSingleAxisChart);
