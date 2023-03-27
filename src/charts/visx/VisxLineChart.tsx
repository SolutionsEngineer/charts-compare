import React from "react";
import { Axis, Grid, XYChart, AnimatedLineSeries } from "@visx/xychart";

import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const accessors = {
  xAccessor: (d: ChartDataSource) => new Date(d.time).toISOString(),
  yAccessor: (d: ChartDataSource) => d.t_outside as never,
};

const VisxLineChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VisxLineChart" onFinish={onFinish}>
      <XYChart
        height={300}
        width={900}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <Axis orientation="bottom" numTicks={2} />
        <Axis orientation="left" numTicks={2} />
        <Grid columns={false} numTicks={2} />
        <AnimatedLineSeries data={dataSet} dataKey="outside" {...accessors} />
      </XYChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxLineChart);
