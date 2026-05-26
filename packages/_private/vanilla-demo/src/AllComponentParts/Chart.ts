import '@synergy-design-system/components/components/chart/chart.js';
import { mockData } from '@synergy-design-system/demo-utilities';
import { html } from 'lit';

export const Chart = () => html`
  <syn-chart
    .config=${mockData('lineChartConfig')}
  ></syn-chart>
`;
