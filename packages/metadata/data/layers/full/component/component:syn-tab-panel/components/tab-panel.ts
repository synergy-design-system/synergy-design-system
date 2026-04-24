/* eslint-disable */
import SynTabPanel from './tab-panel.component.js';

export * from './tab-panel.component.js';
export default SynTabPanel;

SynTabPanel.define('syn-tab-panel');

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab-panel': SynTabPanel;
  }
}
