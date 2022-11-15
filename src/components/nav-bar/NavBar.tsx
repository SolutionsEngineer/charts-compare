import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { LibraryNameEnum } from "../../enums/LibraryNameEnum";
import RechartsLogo from "../../logos/RechartsLogo";
import { ChartTypeEnum } from "../../enums/ChartTypeEnum";
import AtndChartLogo from "../../logos/AntdChartLogo";
import VictoryChartsLogo from "../../logos/VictoryChartsLogo";

import styles from "./NavBar.styles.module.scss";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

type NavItemType = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

export type SelectedChart = {
  library: keyof typeof LibraryNameEnum;
  chartType: keyof typeof ChartTypeEnum;
};

type NavBarProps = {
  onSelect: (selectedChart: SelectedChart) => void;
};

const NavBar = ({ onSelect }: NavBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const antDesignNestedNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.AntDesign + ChartTypeEnum.LineChart,
      label: LibraryNameEnum.AntDesign + ChartTypeEnum.LineChart,
    },
    {
      key: LibraryNameEnum.AntDesign + ChartTypeEnum.AreaChart,
      label: LibraryNameEnum.AntDesign + ChartTypeEnum.AreaChart,
    },
  ];

  const rechartsNestedNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.Recharts + ChartTypeEnum.LineChart,
      label: LibraryNameEnum.Recharts + ChartTypeEnum.LineChart,
    },
    {
      key: LibraryNameEnum.Recharts + ChartTypeEnum.AreaChart,
      label: LibraryNameEnum.Recharts + ChartTypeEnum.AreaChart,
    },
  ];

  const victoryNestedNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.Victory + ChartTypeEnum.LineChart,
      label: LibraryNameEnum.Victory + ChartTypeEnum.LineChart,
    },
    {
      key: LibraryNameEnum.Victory + ChartTypeEnum.AreaChart,
      label: LibraryNameEnum.Victory + ChartTypeEnum.AreaChart,
    },
  ];

  const mainNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.AntDesign,
      label: LibraryNameEnum.AntDesign,
      icon: AtndChartLogo,
      children: antDesignNestedNavItems,
    },
    {
      key: LibraryNameEnum.Recharts,
      label: LibraryNameEnum.Recharts,
      icon: RechartsLogo,
      children: rechartsNestedNavItems,
    },
    {
      key: LibraryNameEnum.Victory,
      label: LibraryNameEnum.Victory,
      icon: VictoryChartsLogo,
      children: victoryNestedNavItems,
    },
  ];
  return (
    <Sider
      className={styles.navWrapper}
      collapsedWidth={100}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={styles.navHeaderText}>Charts Compare</div>
      <Menu
        theme="dark"
        mode="inline"
        items={mainNavItems}
        onSelect={(info) =>
          onSelect({
            chartType: info.keyPath[0] as keyof typeof ChartTypeEnum,
            library: info.keyPath[1] as keyof typeof LibraryNameEnum,
          })
        }
      />
    </Sider>
  );
};

export default React.memo(NavBar);
