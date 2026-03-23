/* eslint-disable */
import SynMenuLabel from './menu-label.component.js';

export * from './menu-label.component.js';
export default SynMenuLabel;

SynMenuLabel.define('syn-menu-label');

declare global {
  interface HTMLElementTagNameMap {
    'syn-menu-label': SynMenuLabel;
  }
}
