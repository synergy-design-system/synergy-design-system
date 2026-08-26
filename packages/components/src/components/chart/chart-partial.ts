import SynChartPartial from './chart-partial.component.js';

export * from './chart-partial.component.js';
export default SynChartPartial;

SynChartPartial.define('syn-chart-partial');

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – false positive: conflict between source and dist declaration
    'syn-chart-partial': SynChartPartial;
  }
}
