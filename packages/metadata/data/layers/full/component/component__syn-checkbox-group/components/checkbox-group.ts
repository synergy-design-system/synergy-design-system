/* eslint-disable */
import SynCheckboxGroup from './checkbox-group.component.js';

export * from './checkbox-group.component.js';
export default SynCheckboxGroup;

SynCheckboxGroup.define('syn-checkbox-group');

declare global {
  interface HTMLElementTagNameMap {
    'syn-checkbox-group': SynCheckboxGroup;
  }
}
