/* eslint-disable */
import SynButtonGroup from './button-group.component.js';

export * from './button-group.component.js';
export default SynButtonGroup;

SynButtonGroup.define('syn-button-group');

declare global {
  interface HTMLElementTagNameMap {
    'syn-button-group': SynButtonGroup;
  }
}
