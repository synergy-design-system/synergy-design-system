import SynAccordion from './accordion.component.js';

export * from './accordion.component.js';
export default SynAccordion;

SynAccordion.define('syn-accordion');

declare global {
  interface HTMLElementTagNameMap {
    'syn-accordion': SynAccordion;
  }
}
