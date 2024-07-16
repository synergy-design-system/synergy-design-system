import SynHeader from './header.component.js';

export * from './header.component.js';
export default SynHeader;

SynHeader.define('syn-header');

declare global {
  interface HTMLElementTagNameMap {
    'syn-header': SynHeader;
  }
}
