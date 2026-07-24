/* eslint-disable */
import SynSpinner from './spinner.component.js';

export * from './spinner.component.js';
export default SynSpinner;

SynSpinner.define('syn-spinner');

declare global {
  interface HTMLElementTagNameMap {
    'syn-spinner': SynSpinner;
  }
}
