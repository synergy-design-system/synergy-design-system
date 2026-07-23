/* eslint-disable */
import SynAlert from './alert.component.js';

export * from './alert.component.js';
export default SynAlert;

SynAlert.define('syn-alert');

declare global {
  interface HTMLElementTagNameMap {
    'syn-alert': SynAlert;
  }
}
