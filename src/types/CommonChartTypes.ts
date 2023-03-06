export type ChartDataSource = {
  id: number;
  t_outside: number;
  wind_speed_hist: number;
  wind_direction_hist: number;
  cloudiness_hist: number;
  insolation_hist: number;
  time: string;
  insolation_distributed: number;
  insolation_direct: number;
  insolation_estimated: number;
  humidity_relative: number;
  t_sensed: number;
  id_building: number;
};

export type CommonChartProps = {
  dataSet: ChartDataSource[];
  onFinish: () => void;
}
