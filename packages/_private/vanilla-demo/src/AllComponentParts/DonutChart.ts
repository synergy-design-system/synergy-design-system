import '@synergy-design-system/components/components/chart/chart.js';
import { charts } from '@synergy-design-system/demo-utilities';
import { html } from 'lit';

export const DonutChart = () => html`
  <syn-chart
    .config=${charts.donutChartConfigCallback}
  ></syn-chart>
`;
