/* eslint-disable */
import SynRadioButton from './radio-button.component.js';

export * from './radio-button.component.js';
export default SynRadioButton;

SynRadioButton.define('syn-radio-button');

declare global {
  interface HTMLElementTagNameMap {
    'syn-radio-button': SynRadioButton;
  }
}
