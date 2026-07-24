/* eslint-disable */
import SynDropdown from './dropdown.component.js';

export * from './dropdown.component.js';
export default SynDropdown;

SynDropdown.define('syn-dropdown');

declare global {
  interface HTMLElementTagNameMap {
    'syn-dropdown': SynDropdown;
  }
}
