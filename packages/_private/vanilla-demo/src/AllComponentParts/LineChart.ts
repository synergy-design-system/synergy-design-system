import '@synergy-design-system/components/components/chart/chart.js';
import { charts } from '@synergy-design-system/demo-utilities';
import { html } from 'lit';

export const LineChart = () => html`
  <syn-chart
    .config=${charts.lineChartConfigCallback}
  ></syn-chart>
`;
