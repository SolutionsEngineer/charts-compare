import React, { useCallback, useMemo, useState } from "react";

import { debounce } from "lodash";
import { largeDataSet } from "../../charts-data/LargeChartsDataSource";
import { SelectedChart } from "../nav-bar/NavBar";
import VictoryLineChartComponent from "../../charts/victory-charts/VictoryLineChart";

type ChartGeneratorProps = {
  selectedChart?: SelectedChart;
};

const ChartGenerator = ({ selectedChart }: ChartGeneratorProps) => {
  const [state, updateState] = useState<number>(0);
  const forceUpdate = useCallback(
    () => updateState((prevState) => prevState + 1),
    []
  );

  const debouncedUpdateHandler = useMemo(
    () => debounce(forceUpdate, 1000),
    [forceUpdate]
  );

  return (
    <div key={state}>
      {/* <RechartsLineChart dataSet={mediumDataSet} />;
      <RechartsLineChart dataSet={largeDataSet} />; */}
      {/* <RechartsAreaChart
        dataSet={largeDataSet}
        onFinish={debouncedUpdateHandler}
      /> */}
      {/* <VictoryAreaChartComponent
        dataSet={largeDataSet}
        onFinish={debouncedUpdateHandler}
      /> */}
      {/* <VictoryAreaChartComponent
        dataSet={largeDataSet}
        onFinish={debouncedUpdateHandler}
      /> */}
      <VictoryLineChartComponent
        dataSet={largeDataSet}
        onFinish={debouncedUpdateHandler}
      />
    </div>
  );
};

export default React.memo(ChartGenerator);
