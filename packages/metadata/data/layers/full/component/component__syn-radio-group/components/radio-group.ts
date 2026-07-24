/* eslint-disable */
import SynRadioGroup from './radio-group.component.js';

export * from './radio-group.component.js';
export default SynRadioGroup;

SynRadioGroup.define('syn-radio-group');

declare global {
  interface HTMLElementTagNameMap {
    'syn-radio-group': SynRadioGroup;
  }
}
