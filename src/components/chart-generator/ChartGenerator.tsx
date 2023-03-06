import React, { useCallback, useMemo, useState } from "react";

import { debounce } from "lodash";
import { SelectedChart } from "../nav-bar/NavBar";
import { MonthlyWeather } from "../../charts-datasource/MonthlyWeather";
import VictoryLineChart from "../../charts/victory/VictoryLineChart";

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

  const dataSet = useMemo(() => MonthlyWeather, []);

  return (
    <div key={state}>
      {/* <RechartsLineChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <RechartsBarChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <VictoryBarChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      <VictoryLineChart dataSet={dataSet} onFinish={debouncedUpdateHandler} />
      {/* <VisxBarChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
    </div>
  );
};

export default React.memo(ChartGenerator);
