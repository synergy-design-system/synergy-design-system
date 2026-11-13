import '@synergy-design-system/components/components/chart/chart.js';
import { charts } from '@synergy-design-system/demo-utilities';

export const BulletChart = () => (
  <syn-chart config={charts.bulletChartConfigCallback} />
);
