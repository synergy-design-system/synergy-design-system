/* eslint-disable */
import SynTab from './tab.component.js';

export * from './tab.component.js';
export default SynTab;

SynTab.define('syn-tab');

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab': SynTab;
  }
}
