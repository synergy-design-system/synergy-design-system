import SynChartPropPartial from './chart-prop-partial.component.js';

export * from './chart-prop-partial.component.js';
export default SynChartPropPartial;

SynChartPropPartial.define('syn-chart-prop-partial');

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - false positive from source and dist declaration overlap
    'syn-chart-prop-partial': SynChartPropPartial;
  }
}
