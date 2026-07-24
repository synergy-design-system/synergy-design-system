import SynNavItem from './nav-item.component.js';

export * from './nav-item.component.js';
export default SynNavItem;

SynNavItem.define('syn-nav-item');

declare global {
  interface HTMLElementTagNameMap {
    'syn-nav-item': SynNavItem;
  }
}
