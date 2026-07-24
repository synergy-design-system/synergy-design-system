/* eslint-disable */
import SynMenuItem from './menu-item.component.js';

export * from './menu-item.component.js';
export default SynMenuItem;

SynMenuItem.define('syn-menu-item');

declare global {
  interface HTMLElementTagNameMap {
    'syn-menu-item': SynMenuItem;
  }
}
