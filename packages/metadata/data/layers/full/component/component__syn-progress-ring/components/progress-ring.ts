/* eslint-disable */
import SynProgressRing from './progress-ring.component.js';

export * from './progress-ring.component.js';
export default SynProgressRing;

SynProgressRing.define('syn-progress-ring');

declare global {
  interface HTMLElementTagNameMap {
    'syn-progress-ring': SynProgressRing;
  }
}
