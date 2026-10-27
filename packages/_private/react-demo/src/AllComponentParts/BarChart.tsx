import '@synergy-design-system/components/components/chart/chart.js';
import { charts } from '@synergy-design-system/demo-utilities';

export const BarChart = () => (
  <syn-chart config={charts.barChartConfigCallback} />
);
