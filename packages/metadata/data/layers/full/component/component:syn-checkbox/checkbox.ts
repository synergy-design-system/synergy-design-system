/* eslint-disable */
import SynCheckbox from './checkbox.component.js';

export * from './checkbox.component.js';
export default SynCheckbox;

SynCheckbox.define('syn-checkbox');

declare global {
  interface HTMLElementTagNameMap {
    'syn-checkbox': SynCheckbox;
  }
}
