/* eslint-disable */
import SynDivider from './divider.component.js';

export * from './divider.component.js';
export default SynDivider;

SynDivider.define('syn-divider');

declare global {
  interface HTMLElementTagNameMap {
    'syn-divider': SynDivider;
  }
}
