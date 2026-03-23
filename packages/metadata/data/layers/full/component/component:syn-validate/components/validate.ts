import SynValidate from './validate.component.js';

export * from './validate.component.js';
export default SynValidate;

SynValidate.define('syn-validate');

declare global {
  interface HTMLElementTagNameMap {
    'syn-validate': SynValidate;
  }
}
