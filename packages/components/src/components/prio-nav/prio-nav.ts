import SynPrioNav from './prio-nav.component.js';

export * from './prio-nav.component.js';
export default SynPrioNav;

SynPrioNav.define('syn-prio-nav');

declare global {
  interface HTMLElementTagNameMap {
    'syn-prio-nav': SynPrioNav;
  }
}
