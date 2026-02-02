/* eslint-disable */
import SynInput from './input.component.js';

export * from './input.component.js';
export default SynInput;

SynInput.define('syn-input');

declare global {
  interface HTMLElementTagNameMap {
    'syn-input': SynInput;
  }
}
