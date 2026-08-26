import SynChartProp from './chart-prop.component.js';

export * from './chart-prop.component.js';
export default SynChartProp;

SynChartProp.define('syn-chart-prop');

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - false positive from source and dist declaration overlap
    'syn-chart-prop': SynChartProp;
  }
}
