import SynChart from './chart.component.js';

export * from './chart.component.js';
export default SynChart;

SynChart.define('syn-chart');

declare global {
  interface HTMLElementTagNameMap {
    'syn-chart': SynChart;
  }
}
