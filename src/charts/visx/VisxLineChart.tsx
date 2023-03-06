import React from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  XYChart,
  Tooltip,
  AnimatedLineSeries,
} from "@visx/xychart";

import { ChartDataSource } from "../../types/CommonChartTypes";
import RenderTimingCounter from "../../utils/RenderTimingCounter";

const accessors = {
  xAccessor: (d: ChartDataSource) => d.time as never,
  yAccessor: (d: ChartDataSource) => d.t_outside as never,
};

const VisxLineChartComponent = ({
  dataSet,
  onFinish,
}: {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}) => {
  return (
    <RenderTimingCounter id="VisxBarChartComponent" onFinish={onFinish}>
      <XYChart
        height={300}
        width={500}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries data={dataSet} dataKey="time" {...accessors} />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }: any) => (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {", "}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        />
      </XYChart>
    </RenderTimingCounter>
  );
};

export default React.memo(VisxLineChartComponent);
