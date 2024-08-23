import SynRangeTick from './range-tick.component.js';

export * from './range-tick.component.js';
export default SynRangeTick;

SynRangeTick.define('syn-range-tick');

declare global {
  interface HTMLElementTagNameMap {
    'syn-range-tick': SynRangeTick;
  }
}
