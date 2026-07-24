/* eslint-disable */
import SynOption from './option.component.js';

export * from './option.component.js';
export default SynOption;

SynOption.define('syn-option');

declare global {
  interface HTMLElementTagNameMap {
    'syn-option': SynOption;
  }
}
