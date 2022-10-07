import React from "react";
import "./App.scss";
import { largeDataSet } from "./charts-data/LargeChartsDataSource";
import { tinyDataSet } from "./charts-data/TinyChartsDataSource";
import RechartsAreaChart from "./charts/recahrts/RechartsAreaChart";

function App() {
  return (
    <>
      {/* <RechartsLineChart dataSet={mediumDataSet} />;
      <RechartsLineChart dataSet={largeDataSet} />; */}
      <RechartsAreaChart dataSet={tinyDataSet} />;
      <RechartsAreaChart dataSet={largeDataSet} />;
    </>
  );
}

export default App;
