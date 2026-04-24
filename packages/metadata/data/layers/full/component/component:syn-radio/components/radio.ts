/* eslint-disable */
import SynRadio from './radio.component.js';

export * from './radio.component.js';
export default SynRadio;

SynRadio.define('syn-radio');

declare global {
  interface HTMLElementTagNameMap {
    'syn-radio': SynRadio;
  }
}
