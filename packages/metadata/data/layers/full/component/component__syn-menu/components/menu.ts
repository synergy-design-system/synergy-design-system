/* eslint-disable */
import SynMenu from './menu.component.js';

export * from './menu.component.js';
export default SynMenu;

SynMenu.define('syn-menu');

declare global {
  interface HTMLElementTagNameMap {
    'syn-menu': SynMenu;
  }
}
