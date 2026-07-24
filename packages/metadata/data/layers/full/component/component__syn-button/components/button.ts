/* eslint-disable */
import SynButton from './button.component.js';

export * from './button.component.js';
export default SynButton;

SynButton.define('syn-button');

declare global {
  interface HTMLElementTagNameMap {
    'syn-button': SynButton;
  }
}
