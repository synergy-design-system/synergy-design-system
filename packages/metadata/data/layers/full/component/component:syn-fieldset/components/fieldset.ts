import SynFieldset from './fieldset.component.js';

export * from './fieldset.component.js';
export default SynFieldset;

SynFieldset.define('syn-fieldset');

declare global {
  interface HTMLElementTagNameMap {
    'syn-fieldset': SynFieldset;
  }
}
