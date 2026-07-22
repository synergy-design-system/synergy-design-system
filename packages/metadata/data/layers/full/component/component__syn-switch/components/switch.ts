/* eslint-disable */
import SynSwitch from './switch.component.js';

export * from './switch.component.js';
export default SynSwitch;

SynSwitch.define('syn-switch');

declare global {
  interface HTMLElementTagNameMap {
    'syn-switch': SynSwitch;
  }
}
