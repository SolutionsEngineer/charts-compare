import React from "react";
import { Axis, Grid, XYChart, AnimatedBarSeries } from "@visx/xychart";

import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const accessors = {
  xAccessor: (d: ChartDataSource) => d.time as never,
  yAccessor: (d: ChartDataSource) => d.t_outside as never,
};

const VisxBarChart = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VisxBarChart" onFinish={onFinish}>
      <XYChart
        height={300}
        width={500}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <Axis orientation="bottom" />
        <Axis orientation="left" />
        <Grid columns={false} numTicks={4} />
        <AnimatedBarSeries data={dataSet} dataKey="outside" {...accessors} />
      </XYChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxBarChart);
