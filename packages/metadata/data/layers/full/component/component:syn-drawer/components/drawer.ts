/* eslint-disable */
import SynDrawer from './drawer.component.js';

export * from './drawer.component.js';
export default SynDrawer;

SynDrawer.define('syn-drawer');

declare global {
  interface HTMLElementTagNameMap {
    'syn-drawer': SynDrawer;
  }
}
