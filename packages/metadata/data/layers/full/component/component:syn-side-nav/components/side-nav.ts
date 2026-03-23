import SynSideNav from './side-nav.component.js';

export * from './side-nav.component.js';
export default SynSideNav;

SynSideNav.define('syn-side-nav');

declare global {
  interface HTMLElementTagNameMap {
    'syn-side-nav': SynSideNav;
  }
}
