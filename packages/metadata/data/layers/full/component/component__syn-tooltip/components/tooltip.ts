/* eslint-disable */
import SynTooltip from './tooltip.component.js';

export * from './tooltip.component.js';
export default SynTooltip;

SynTooltip.define('syn-tooltip');

declare global {
  interface HTMLElementTagNameMap {
    'syn-tooltip': SynTooltip;
  }
}
