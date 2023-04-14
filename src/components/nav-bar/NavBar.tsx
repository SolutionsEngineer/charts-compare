import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { LibraryNameEnum } from "../../enums/LibraryNameEnum";
import RechartsLogo from "../../logos/RechartsLogo";
import { ChartTypeEnum } from "../../enums/ChartTypeEnum";
import VictoryChartsLogo from "../../logos/VictoryChartsLogo";

import styles from "./NavBar.styles.module.scss";
import VisxLogo from "../../logos/VisxLogo";

import { startCase } from "lodash";

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

  const visxNestedNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.Visx + ChartTypeEnum.LineChart,
      label: startCase(ChartTypeEnum.LineChart),
    },
    {
      key: LibraryNameEnum.Visx + ChartTypeEnum.BarChart,
      label: startCase(ChartTypeEnum.BarChart),
    },
    {
      key: LibraryNameEnum.Visx + ChartTypeEnum.ComposedSingleAxisChart,
      label: startCase(ChartTypeEnum.ComposedSingleAxisChart),
    },
    {
      key: LibraryNameEnum.Visx + ChartTypeEnum.ComposedMultiAxisChart,
      label: startCase(ChartTypeEnum.ComposedMultiAxisChart),
    },
  ];

  const rechartsNestedNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.Recharts + ChartTypeEnum.LineChart,
      label: startCase(ChartTypeEnum.LineChart),
    },
    {
      key: LibraryNameEnum.Recharts + ChartTypeEnum.BarChart,
      label: startCase(ChartTypeEnum.BarChart),
    },
    {
      key: LibraryNameEnum.Recharts + ChartTypeEnum.ComposedSingleAxisChart,
      label: startCase(ChartTypeEnum.ComposedSingleAxisChart),
    },
    {
      key: LibraryNameEnum.Recharts + ChartTypeEnum.ComposedMultiAxisChart,
      label: startCase(ChartTypeEnum.ComposedMultiAxisChart),
    },
  ];

  const victoryNestedNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.Victory + ChartTypeEnum.LineChart,
      label: startCase(ChartTypeEnum.LineChart),
    },
    {
      key: LibraryNameEnum.Victory + ChartTypeEnum.BarChart,
      label: startCase(ChartTypeEnum.BarChart),
    },
    {
      key: LibraryNameEnum.Victory + ChartTypeEnum.ComposedSingleAxisChart,
      label: startCase(ChartTypeEnum.ComposedSingleAxisChart),
    },
    {
      key: LibraryNameEnum.Victory + ChartTypeEnum.ComposedMultiAxisChart,
      label: startCase(ChartTypeEnum.ComposedMultiAxisChart),
    },
  ];

  const mainNavItems: NavItemType[] = [
    {
      key: LibraryNameEnum.Recharts,
      label: startCase(LibraryNameEnum.Recharts),
      icon: RechartsLogo,
      children: rechartsNestedNavItems,
    },
    {
      key: LibraryNameEnum.Victory,
      label: startCase(LibraryNameEnum.Victory),
      icon: VictoryChartsLogo,
      children: victoryNestedNavItems,
    },
    {
      key: LibraryNameEnum.Visx,
      label: startCase(LibraryNameEnum.Visx),
      icon: VisxLogo,
      children: visxNestedNavItems,
    },
  ];
  return (
    <Sider
      className={styles.navWrapper}
      collapsedWidth={100}
      width={240}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={styles.navHeaderText}>Charts Compare</div>
      <Menu
        theme="dark"
        mode="inline"
        items={mainNavItems}
        onSelect={(info) => {
          onSelect({
            chartType: info.keyPath[0].replace(
              info.keyPath[1],
              ""
            ) as keyof typeof ChartTypeEnum,
            library: info.keyPath[1] as keyof typeof LibraryNameEnum,
          });
        }}
      />
    </Sider>
  );
};

export default React.memo(NavBar);
