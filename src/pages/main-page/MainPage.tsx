import React, { ReactElement, useState } from "react";
import { Layout } from "antd";
import NavBar, { SelectedChart } from "../../components/nav-bar/NavBar";
import ChartGenerator from "../../components/chart-generator/ChartGenerator";

const { Header, Content, Footer } = Layout;

const MainPage: () => ReactElement = () => {
  const [selectedChart, setSelectedChart] = useState<SelectedChart>();
  const [animated, setAnimated] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar onSelect={setSelectedChart} setAnimated={setAnimated} />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <ChartGenerator
              selectedChart={selectedChart}
              animated={animated}
              key={
                selectedChart?.library ??
                "lib" + selectedChart?.chartType ??
                "type" + String(animated)
              }
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Chutkowski Daniel©</Footer>
      </Layout>
    </Layout>
  );
};

export default React.memo(MainPage);
