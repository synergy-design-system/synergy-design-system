/* eslint-disable */
import SynIcon from './icon.component.js';

export * from './icon.component.js';
export default SynIcon;

SynIcon.define('syn-icon');

declare global {
  interface HTMLElementTagNameMap {
    'syn-icon': SynIcon;
  }
}
