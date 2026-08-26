import SynChartSeries from './chart-series.component.js';

export * from './chart-series.component.js';
export default SynChartSeries;

SynChartSeries.define('syn-chart-series');

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - false positive from source and dist declaration overlap
    'syn-chart-series': SynChartSeries;
  }
}
