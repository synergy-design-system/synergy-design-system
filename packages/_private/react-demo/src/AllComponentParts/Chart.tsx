import '@synergy-design-system/components/components/chart/chart.js';
import { mockData } from '@synergy-design-system/demo-utilities';

export const Chart = () => (
  <syn-chart config={mockData('lineChartConfig')} />
);
