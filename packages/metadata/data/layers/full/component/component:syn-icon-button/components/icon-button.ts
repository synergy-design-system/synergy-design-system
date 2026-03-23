/* eslint-disable */
import SynIconButton from './icon-button.component.js';

export * from './icon-button.component.js';
export default SynIconButton;

SynIconButton.define('syn-icon-button');

declare global {
  interface HTMLElementTagNameMap {
    'syn-icon-button': SynIconButton;
  }
}
