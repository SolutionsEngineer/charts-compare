import React, { useCallback, useMemo, useState } from "react";

import { debounce } from "lodash";
import { SelectedChart } from "../nav-bar/NavBar";
import { MonthlyWeather } from "../../charts-datasource/MonthlyWeather";
import { DailyWeather } from "../../charts-datasource/DailyWeather";
import VictoryLineChart from "../../charts/victory/VictoryLineChart";
import RechartsComposedSingleAxisChart from "../../charts/recharts/RechartsComposedSingleAxisChart";
import VictoryComposedSingleAxisChart from "../../charts/victory/VictoryComposedSingleAxisChart";
import VisxComposedSingleAxisChart from "../../charts/visx/VisxComposedSingleAxisChart";
import RechartsComposedMultiAxisChart from "../../charts/recharts/RechartsComposedMultiAxisChart";
import VictoryComposedMultiAxisChart from "../../charts/victory/VictoryComposedMultiAxisChart";

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

  const dataSet = useMemo(() => DailyWeather, []);

  return (
    <div key={state}>
      {/* <RechartsLineChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <RechartsBarChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <VictoryBarChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <VictoryLineChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <VisxBarChart dataSet={dataSet} onFinish={debouncedUpdateHandler} /> */}
      {/* <RechartsComposedSingleAxisChart
        dataSet={dataSet}
        onFinish={debouncedUpdateHandler}
      /> */}
      {/* <VictoryComposedSingleAxisChart
        dataSet={dataSet}
        onFinish={debouncedUpdateHandler}
      /> */}
      {/* <VisxComposedSingleAxisChart
        dataSet={dataSet}
        onFinish={debouncedUpdateHandler}
      /> */}
      <RechartsComposedMultiAxisChart
        dataSet={dataSet}
        onFinish={debouncedUpdateHandler}
      />
      <VictoryComposedMultiAxisChart
        dataSet={dataSet}
        onFinish={debouncedUpdateHandler}
      />
    </div>
  );
};

export default React.memo(ChartGenerator);
