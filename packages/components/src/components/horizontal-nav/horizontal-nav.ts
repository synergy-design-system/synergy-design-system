import SynHorizontalNav from './horizontal-nav.component.js';

export * from './horizontal-nav.component.js';
export default SynHorizontalNav;

SynHorizontalNav.define('syn-horizontal-nav');

declare global {
  interface HTMLElementTagNameMap {
    'syn-horizontal-nav': SynHorizontalNav;
  }
}
