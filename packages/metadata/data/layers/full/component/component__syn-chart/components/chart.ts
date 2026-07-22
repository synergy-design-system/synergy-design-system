import SynChart from './chart.component.js';

export * from './chart.component.js';
export default SynChart;

SynChart.define('syn-chart');

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – false positive: conflict between source and dist declaration
    'syn-chart': SynChart;
  }
}
