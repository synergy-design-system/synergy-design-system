/* eslint-disable */
import SynSelect from './select.component.js';

export * from './select.component.js';
export default SynSelect;

SynSelect.define('syn-select');

declare global {
  interface HTMLElementTagNameMap {
    'syn-select': SynSelect;
  }
}
