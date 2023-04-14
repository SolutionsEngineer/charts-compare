import React, { useCallback, useMemo, useState, useEffect } from "react";

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
  animated: boolean;
};

const ChartGenerator = ({ selectedChart, animated }: ChartGeneratorProps) => {
  const [renderIteration, updateRenderIteration] = useState<number>(1);

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
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "BarChart":
        return (
          <RechartsBarChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedSingleAxisChart":
        return (
          <RechartsComposedSingleAxisChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedMultiAxisChart":
        return (
          <RechartsComposedMultiAxisChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
    }
  }, [
    animated,
    dataSet,
    debouncedIterationUpdateHandler,
    selectedChart?.chartType,
  ]);

  const properVictoryChart = useMemo(() => {
    switch (selectedChart?.chartType) {
      case "LineChart":
        return (
          <VictoryLineChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "BarChart":
        return (
          <VictoryBarChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedSingleAxisChart":
        return (
          <VictoryComposedSingleAxisChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedMultiAxisChart":
        return (
          <VictoryComposedMultiAxisChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
    }
  }, [
    animated,
    dataSet,
    debouncedIterationUpdateHandler,
    selectedChart?.chartType,
  ]);

  const properVisxChart = useMemo(() => {
    switch (selectedChart?.chartType) {
      case "LineChart":
        return (
          <VisxLineChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "BarChart":
        return (
          <VisxBarChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedSingleAxisChart":
        return (
          <VisxComposedSingleAxisChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
      case "ComposedMultiAxisChart":
        return (
          <VisxComposedMultiAxisChart
            dataSet={dataSet}
            animated={animated}
            onFinish={debouncedIterationUpdateHandler}
          />
        );
    }
  }, [
    animated,
    dataSet,
    debouncedIterationUpdateHandler,
    selectedChart?.chartType,
  ]);

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

  useEffect(() => {
    updateRenderIteration(1);
  }, [selectedChart, animated]);

  return (
    <div key={renderIteration}>
      <h1>Iteration: {renderIteration}</h1>
      {properChart}
    </div>
  );
};

export default React.memo(ChartGenerator);
