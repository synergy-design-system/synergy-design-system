import SynRange from './range.component.js';

export * from './range.component.js';
export default SynRange;

SynRange.define('syn-range');

declare global {
  interface HTMLElementTagNameMap {
    'syn-range': SynRange;
  }
}
