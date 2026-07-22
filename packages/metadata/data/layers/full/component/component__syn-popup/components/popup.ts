/* eslint-disable */
import SynPopup from './popup.component.js';

export * from './popup.component.js';
export default SynPopup;

SynPopup.define('syn-popup');

declare global {
  interface HTMLElementTagNameMap {
    'syn-popup': SynPopup;
  }
}
