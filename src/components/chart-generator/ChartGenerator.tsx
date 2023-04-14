import React, { useCallback, useMemo, useState } from "react";

import { debounce } from "lodash";
import { SelectedChart } from "../nav-bar/NavBar";
import { DailyWeather } from "../../charts-datasource/DailyWeather";
import VictoryLineChart from "../../charts/victory/VictoryLineChart";
import RechartsComposedSingleAxisChart from "../../charts/recharts/RechartsComposedSingleAxisChart";
import VictoryComposedSingleAxisChart from "../../charts/victory/VictoryComposedSingleAxisChart";
import VisxComposedSingleAxisChart from "../../charts/visx/VisxComposedSingleAxisChart";
import RechartsComposedMultiAxisChart from "../../charts/recharts/RechartsComposedMultiAxisChart";
import VictoryComposedMultiAxisChart from "../../charts/victory/VictoryComposedMultiAxisChart";
import RechartsLineChart from "../../charts/recharts/RechartsLineChart";
import RechartsBarChart from "../../charts/recharts/RechartsBarChart";
import VictoryBarChart from "../../charts/victory/VictoryBarChart";
import VisxBarChart from "../../charts/visx/VisxBarChart";
import VisxLineChart from "../../charts/visx/VisxLineChart";
import VisxComposedMultiAxisChart from "../../charts/visx/VisxComposedMultiAxisChart";

type ChartGeneratorProps = {
  selectedChart?: SelectedChart;
};

const ChartGenerator = ({ selectedChart }: ChartGeneratorProps) => {
  const [renderIteration, updateRenderIteration] = useState<number>(0);

  const forceIterationUpdate = useCallback(
    () => updateRenderIteration((prevState) => prevState + 1),
    []
  );

  const debouncedIterationUpdateHandler = useMemo(
    () => debounce(forceIterationUpdate, 1000),
    [forceIterationUpdate]
  );

  const dataSet = useMemo(() => DailyWeather, []);

  const properRechartsChart = useMemo(() => {
    switch (selectedChart?.chartType) {
      case "LineChart":
        return (
          <RechartsLineChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "BarChart":
        return (
          <RechartsBarChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedSingleAxisChart":
        return (
          <RechartsComposedSingleAxisChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedMultiAxisChart":
        return (
          <RechartsComposedMultiAxisChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
    }
  }, [dataSet, debouncedIterationUpdateHandler, selectedChart?.chartType]);

  const properVictoryChart = useMemo(() => {
    switch (selectedChart?.chartType) {
      case "LineChart":
        return (
          <VictoryLineChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "BarChart":
        return (
          <VictoryBarChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedSingleAxisChart":
        return (
          <VictoryComposedSingleAxisChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedMultiAxisChart":
        return (
          <VictoryComposedMultiAxisChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
    }
  }, [dataSet, debouncedIterationUpdateHandler, selectedChart?.chartType]);

  const properVisxChart = useMemo(() => {
    switch (selectedChart?.chartType) {
      case "LineChart":
        return (
          <VisxLineChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "BarChart":
        return (
          <VisxBarChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedSingleAxisChart":
        return (
          <VisxComposedSingleAxisChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedMultiAxisChart":
        return (
          <VisxComposedMultiAxisChart
            dataSet={dataSet}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
    }
  }, [dataSet, debouncedIterationUpdateHandler, selectedChart?.chartType]);

  const properChart = useMemo(() => {
    switch (selectedChart?.library) {
      case "Recharts":
        return properRechartsChart;
      case "Victory":
        return properVictoryChart;
      case "Visx":
        return properVisxChart;
    }
  }, [
    properRechartsChart,
    properVictoryChart,
    properVisxChart,
    selectedChart?.library,
  ]);

  return <div key={renderIteration}>{properChart}</div>;
};

export default React.memo(ChartGenerator);
