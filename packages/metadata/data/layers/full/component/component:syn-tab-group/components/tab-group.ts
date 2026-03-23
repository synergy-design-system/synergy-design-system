/* eslint-disable */
import SynTabGroup from './tab-group.component.js';

export * from './tab-group.component.js';
export default SynTabGroup;

SynTabGroup.define('syn-tab-group');

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab-group': SynTabGroup;
  }
}
