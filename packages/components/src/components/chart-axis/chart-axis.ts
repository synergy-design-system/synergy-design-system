import SynChartAxis from './chart-axis.component.js';

export * from './chart-axis.component.js';
export default SynChartAxis;

SynChartAxis.define('syn-chart-axis');

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - false positive from source and dist declaration overlap
    'syn-chart-axis': SynChartAxis;
  }
}
