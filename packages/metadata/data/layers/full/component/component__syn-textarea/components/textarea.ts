/* eslint-disable */
import SynTextarea from './textarea.component.js';

export * from './textarea.component.js';
export default SynTextarea;

SynTextarea.define('syn-textarea');

declare global {
  interface HTMLElementTagNameMap {
    'syn-textarea': SynTextarea;
  }
}
